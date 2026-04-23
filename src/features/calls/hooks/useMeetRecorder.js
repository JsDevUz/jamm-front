import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { RoomEvent, Track } from "livekit-client";
import {
  createRecordingSession,
  finishRecordingSession,
  uploadRecordingChunk,
} from "../../../api/videoRecordingApi";
import { API_BASE_URL, RESOLVED_APP_BASE_URL } from "../../../config/env";

const CHUNK_TIMESLICE_MS = 3000;
const FRAME_RATE = 30;
const AUDIO_BITRATE = 128_000;
const VIDEO_BITRATE = 2_500_000;
const MAX_BACKOFF_MS = 15_000;
const INITIAL_BACKOFF_MS = 500;
const STATUS_IDLE = "idle";
const STATUS_STARTING = "starting";
const STATUS_RECORDING = "recording";
const STATUS_STOPPING = "stopping";
const STATUS_FINALIZING = "finalizing";
const STATUS_READY = "ready";
const STATUS_FAILED = "failed";

const pickRecorderMimeType = () => {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm;codecs=h264,opus",
    "video/webm",
  ];
  for (const candidate of candidates) {
    if (MediaRecorder.isTypeSupported(candidate)) return candidate;
  }
  return "";
};

const findCanvasesInside = (root) => {
  if (!root) return [];
  if (root.tagName === "CANVAS") return [root];
  return Array.from(root.querySelectorAll("canvas"));
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isOnline = () =>
  typeof navigator === "undefined" || navigator.onLine !== false;

const buildBeaconUrl = (sessionId) => {
  const base = API_BASE_URL || "";
  return `${base}/video/recordings/sessions/${sessionId}/finish`;
};

export const useMeetRecorder = ({
  roomId,
  isCreator,
  roomCreatorId,
  surfaceNode,
  surfaceType,
  livekitRoom,
  onStatusChange,
  onError,
}) => {
  const [status, setStatus] = useState(STATUS_IDLE);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [lastError, setLastError] = useState("");

  const statusRef = useRef(status);
  const sessionIdRef = useRef("");
  const startedAtRef = useRef(0);
  const chunkCounterRef = useRef(0);
  const uploadQueueRef = useRef([]);
  const uploadInFlightRef = useRef(false);
  const compositeCanvasRef = useRef(null);
  const rafHandleRef = useRef(0);
  const audioContextRef = useRef(null);
  const audioDestinationRef = useRef(null);
  const audioSourceMapRef = useRef(new Map());
  const trackSubscriptionCleanupRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const combinedStreamRef = useRef(null);
  const videoStreamRef = useRef(null);
  const timerIntervalRef = useRef(0);
  const surfaceNodeRef = useRef(null);
  const mimeTypeRef = useRef("");
  const fileExtensionRef = useRef("webm");
  const finalizeRequestedRef = useRef(false);
  const unloadHandlersAttachedRef = useRef(false);
  const pendingStopPromiseRef = useRef(null);

  useEffect(() => {
    surfaceNodeRef.current = surfaceNode;
  }, [surfaceNode]);

  const updateStatus = useCallback(
    (nextStatus, error = "") => {
      statusRef.current = nextStatus;
      setStatus(nextStatus);
      setLastError(error || "");
      onStatusChange?.(nextStatus, error || "");
      if (error) onError?.(error);
    },
    [onError, onStatusChange],
  );

  const tearDownComposite = useCallback(() => {
    if (rafHandleRef.current) {
      cancelAnimationFrame(rafHandleRef.current);
      rafHandleRef.current = 0;
    }
    compositeCanvasRef.current = null;
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          /* noop */
        }
      });
      videoStreamRef.current = null;
    }
  }, []);

  const tearDownAudio = useCallback(() => {
    try {
      trackSubscriptionCleanupRef.current?.();
    } catch {
      /* noop */
    }
    trackSubscriptionCleanupRef.current = null;

    audioSourceMapRef.current.forEach((entry) => {
      try {
        entry.source.disconnect();
      } catch {
        /* noop */
      }
    });
    audioSourceMapRef.current.clear();

    if (audioDestinationRef.current) {
      try {
        audioDestinationRef.current.disconnect();
      } catch {
        /* noop */
      }
      audioDestinationRef.current = null;
    }

    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {
        /* noop */
      }
      audioContextRef.current = null;
    }
  }, []);

  const tearDownRecorder = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    mediaRecorderRef.current = null;
    if (recorder && recorder.state !== "inactive") {
      try {
        recorder.stop();
      } catch {
        /* noop */
      }
    }

    if (combinedStreamRef.current) {
      combinedStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          /* noop */
        }
      });
      combinedStreamRef.current = null;
    }
  }, []);

  const stopTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = 0;
    }
  }, []);

  const fullTearDown = useCallback(() => {
    stopTimer();
    tearDownRecorder();
    tearDownComposite();
    tearDownAudio();
  }, [stopTimer, tearDownAudio, tearDownComposite, tearDownRecorder]);

  const drainQueue = useCallback(async () => {
    if (uploadInFlightRef.current) return;
    uploadInFlightRef.current = true;
    try {
      while (uploadQueueRef.current.length > 0) {
        const job = uploadQueueRef.current[0];
        let attempt = 0;
        let fatalClientError = false;
        while (!fatalClientError) {
          if (!isOnline()) {
            await sleep(1500);
            continue;
          }
          try {
            await uploadRecordingChunk({
              sessionId: job.sessionId,
              chunkIndex: job.chunkIndex,
              blob: job.blob,
              extension: fileExtensionRef.current,
            });
            break;
          } catch (error) {
            attempt += 1;
            const responseStatus = error?.response?.status || 0;
            const isClient4xx =
              responseStatus >= 400 &&
              responseStatus < 500 &&
              responseStatus !== 408 &&
              responseStatus !== 429;
            if (isClient4xx && attempt >= 3) {
              // Non-retryable client error — drop chunk, keep going
              fatalClientError = true;
              // eslint-disable-next-line no-console
              console.error(
                `[recorder] chunk ${job.chunkIndex} upload abandoned after ${attempt} attempts (HTTP ${responseStatus})`,
                error?.response?.data?.message || error?.message,
              );
              break;
            }
            const backoff = Math.min(
              MAX_BACKOFF_MS,
              INITIAL_BACKOFF_MS * 2 ** Math.min(attempt, 5),
            );
            // eslint-disable-next-line no-console
            console.warn(
              `[recorder] chunk ${job.chunkIndex} upload failed (attempt ${attempt}, HTTP ${responseStatus || "network"}), retrying in ${backoff}ms`,
            );
            await sleep(backoff);
          }
        }
        uploadQueueRef.current.shift();
      }
    } finally {
      uploadInFlightRef.current = false;
    }
  }, []);

  const enqueueChunk = useCallback(
    (blob) => {
      if (!blob || blob.size === 0 || !sessionIdRef.current) return;
      const chunkIndex = chunkCounterRef.current;
      chunkCounterRef.current += 1;
      uploadQueueRef.current.push({
        sessionId: sessionIdRef.current,
        chunkIndex,
        blob,
      });
      void drainQueue();
    },
    [drainQueue],
  );

  const buildCompositeStream = useCallback(
    (node) => {
      if (!node) throw new Error("Recording surface topilmadi");
      const rect = node.getBoundingClientRect?.() || { width: 1280, height: 720 };
      const width = Math.max(320, Math.floor(rect.width || 1280));
      const height = Math.max(180, Math.floor(rect.height || 720));

      const composite = document.createElement("canvas");
      composite.width = width;
      composite.height = height;
      const ctx = composite.getContext("2d", { alpha: false });
      if (!ctx) throw new Error("Canvas 2D context mavjud emas");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      compositeCanvasRef.current = composite;

      let cachedSurface = null;
      let cachedCanvases = [];
      let lastCacheAt = 0;

      const drawFrame = () => {
        const surface = surfaceNodeRef.current;
        if (!surface) {
          rafHandleRef.current = requestAnimationFrame(drawFrame);
          return;
        }

        const sourceRect = surface.getBoundingClientRect();
        const sourceWidth = sourceRect.width || width;
        const sourceHeight = sourceRect.height || height;

        if (
          sourceWidth > 0 &&
          sourceHeight > 0 &&
          (Math.abs(sourceWidth - composite.width) > 2 ||
            Math.abs(sourceHeight - composite.height) > 2)
        ) {
          composite.width = Math.floor(sourceWidth);
          composite.height = Math.floor(sourceHeight);
        }

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, composite.width, composite.height);

        const now = performance.now();
        if (cachedSurface !== surface || now - lastCacheAt > 500) {
          cachedSurface = surface;
          cachedCanvases = findCanvasesInside(surface);
          lastCacheAt = now;
        }

        for (let i = 0; i < cachedCanvases.length; i += 1) {
          const canvas = cachedCanvases[i];
          if (!canvas.isConnected) {
            cachedCanvases = findCanvasesInside(surface);
            lastCacheAt = now;
            break;
          }
          if (!canvas.width || !canvas.height) continue;
          try {
            const childRect = canvas.getBoundingClientRect();
            const offsetX = childRect.left - sourceRect.left;
            const offsetY = childRect.top - sourceRect.top;
            ctx.drawImage(
              canvas,
              0,
              0,
              canvas.width,
              canvas.height,
              offsetX,
              offsetY,
              childRect.width,
              childRect.height,
            );
          } catch {
            /* skip frame for this canvas */
          }
        }

        rafHandleRef.current = requestAnimationFrame(drawFrame);
      };

      rafHandleRef.current = requestAnimationFrame(drawFrame);

      const videoStream = composite.captureStream(FRAME_RATE);
      videoStreamRef.current = videoStream;
      return videoStream;
    },
    [],
  );

  const attachAudioSource = useCallback((trackKey, mediaStreamTrack) => {
    const context = audioContextRef.current;
    const destination = audioDestinationRef.current;
    if (!context || !destination || !mediaStreamTrack) return;
    if (audioSourceMapRef.current.has(trackKey)) return;

    try {
      const stream = new MediaStream([mediaStreamTrack]);
      const source = context.createMediaStreamSource(stream);
      source.connect(destination);
      audioSourceMapRef.current.set(trackKey, { source, stream });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("[recorder] failed to connect audio track", error);
    }
  }, []);

  const detachAudioSource = useCallback((trackKey) => {
    const entry = audioSourceMapRef.current.get(trackKey);
    if (!entry) return;
    try {
      entry.source.disconnect();
    } catch {
      /* noop */
    }
    audioSourceMapRef.current.delete(trackKey);
  }, []);

  const buildAudioStream = useCallback(() => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;

    const context = new AudioCtx();
    audioContextRef.current = context;
    const destination = context.createMediaStreamDestination();
    audioDestinationRef.current = destination;

    const room = livekitRoom;
    if (!room) return destination.stream;

    const buildKey = (participantSid, trackSid, source) =>
      `${participantSid || "local"}:${trackSid || source || "audio"}`;

    const enrolTrackPublication = (participant, publication) => {
      if (!publication) return;
      if (publication.kind !== Track.Kind.Audio) return;
      const mediaTrack = publication.track?.mediaStreamTrack;
      if (!mediaTrack) return;
      const key = buildKey(
        participant?.sid,
        publication.trackSid,
        publication.source,
      );
      attachAudioSource(key, mediaTrack);
    };

    const enrolParticipant = (participant) => {
      if (!participant) return;
      const publications = participant.trackPublications
        ? Array.from(participant.trackPublications.values())
        : [];
      publications.forEach((publication) =>
        enrolTrackPublication(participant, publication),
      );
    };

    enrolParticipant(room.localParticipant);
    room.remoteParticipants?.forEach((participant) =>
      enrolParticipant(participant),
    );

    const handleTrackSubscribed = (track, publication, participant) => {
      if (publication?.kind !== Track.Kind.Audio) return;
      const mediaTrack = track?.mediaStreamTrack;
      if (!mediaTrack) return;
      const key = buildKey(
        participant?.sid,
        publication?.trackSid,
        publication?.source,
      );
      attachAudioSource(key, mediaTrack);
    };

    const handleTrackUnsubscribed = (_track, publication, participant) => {
      if (publication?.kind !== Track.Kind.Audio) return;
      const key = buildKey(
        participant?.sid,
        publication?.trackSid,
        publication?.source,
      );
      detachAudioSource(key);
    };

    const handleLocalPublished = (publication) => {
      if (publication?.kind !== Track.Kind.Audio) return;
      enrolTrackPublication(room.localParticipant, publication);
    };

    const handleLocalUnpublished = (publication) => {
      if (publication?.kind !== Track.Kind.Audio) return;
      const key = buildKey(
        room.localParticipant?.sid,
        publication?.trackSid,
        publication?.source,
      );
      detachAudioSource(key);
    };

    const handleParticipantDisconnected = (participant) => {
      const publications = participant?.trackPublications
        ? Array.from(participant.trackPublications.values())
        : [];
      publications.forEach((publication) => {
        if (publication?.kind !== Track.Kind.Audio) return;
        const key = buildKey(
          participant?.sid,
          publication?.trackSid,
          publication?.source,
        );
        detachAudioSource(key);
      });
    };

    room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
    room.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);
    room.on(RoomEvent.LocalTrackPublished, handleLocalPublished);
    room.on(RoomEvent.LocalTrackUnpublished, handleLocalUnpublished);
    room.on(RoomEvent.ParticipantDisconnected, handleParticipantDisconnected);

    trackSubscriptionCleanupRef.current = () => {
      try {
        room.off(RoomEvent.TrackSubscribed, handleTrackSubscribed);
        room.off(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed);
        room.off(RoomEvent.LocalTrackPublished, handleLocalPublished);
        room.off(RoomEvent.LocalTrackUnpublished, handleLocalUnpublished);
        room.off(
          RoomEvent.ParticipantDisconnected,
          handleParticipantDisconnected,
        );
      } catch {
        /* noop */
      }
    };

    return destination.stream;
  }, [attachAudioSource, detachAudioSource, livekitRoom]);

  const sendFinishBeacon = useCallback((durationMs) => {
    if (!sessionIdRef.current) return;
    const url = buildBeaconUrl(sessionIdRef.current);
    const payload = JSON.stringify({ durationMs: Math.max(0, durationMs) });
    try {
      if (typeof fetch !== "undefined") {
        fetch(url, {
          method: "POST",
          credentials: "include",
          keepalive: true,
          headers: { "Content-Type": "application/json" },
          body: payload,
        }).catch(() => {
          /* noop */
        });
        return;
      }
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(url, blob);
      }
    } catch {
      /* noop */
    }
  }, []);

  const finalizeBackend = useCallback(
    async (durationMs) => {
      if (!sessionIdRef.current) return;
      const sessionId = sessionIdRef.current;
      updateStatus(STATUS_FINALIZING);
      try {
        await finishRecordingSession({
          sessionId,
          durationMs: Math.max(0, durationMs),
        });
        updateStatus(STATUS_READY);
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Recording finalize xatoligi";
        updateStatus(STATUS_FAILED, message);
      } finally {
        sessionIdRef.current = "";
        chunkCounterRef.current = 0;
        startedAtRef.current = 0;
        setElapsedMs(0);
      }
    },
    [updateStatus],
  );

  const start = useCallback(async () => {
    if (statusRef.current !== STATUS_IDLE && statusRef.current !== STATUS_FAILED && statusRef.current !== STATUS_READY) {
      return { ok: false, error: "Recording allaqachon boshlangan" };
    }
    if (!isCreator) {
      return { ok: false, error: "Faqat host record qila oladi" };
    }
    const node = surfaceNodeRef.current;
    if (!node) {
      return { ok: false, error: "Whiteboard hali tayyor emas" };
    }
    if (typeof MediaRecorder === "undefined") {
      return { ok: false, error: "Brauzer MediaRecorder ni qo'llab-quvvatlamaydi" };
    }

    updateStatus(STATUS_STARTING);
    finalizeRequestedRef.current = false;
    chunkCounterRef.current = 0;
    uploadQueueRef.current = [];

    const mimeType = pickRecorderMimeType();
    mimeTypeRef.current = mimeType;
    fileExtensionRef.current = mimeType.includes("mp4") ? "mp4" : "webm";

    try {
      const videoStream = buildCompositeStream(node);
      const audioStream = buildAudioStream();

      const combined = new MediaStream();
      videoStream.getVideoTracks().forEach((track) => combined.addTrack(track));
      if (audioStream) {
        audioStream.getAudioTracks().forEach((track) => combined.addTrack(track));
      }
      combinedStreamRef.current = combined;

      const session = await createRecordingSession({
        kind: "whiteboard",
        roomId,
        mimeType: mimeType || "video/webm",
        filename: `whiteboard-${roomId}-${Date.now()}.${fileExtensionRef.current}`,
        apiBaseUrl: API_BASE_URL,
        appBaseUrl: RESOLVED_APP_BASE_URL,
        roomCreatorId: roomCreatorId || undefined,
      });

      if (!session?.sessionId) {
        throw new Error("Recording session yaratilmadi");
      }
      sessionIdRef.current = session.sessionId;

      const recorderOptions = {
        videoBitsPerSecond: VIDEO_BITRATE,
        audioBitsPerSecond: AUDIO_BITRATE,
      };
      if (mimeType) recorderOptions.mimeType = mimeType;

      const recorder = new MediaRecorder(combined, recorderOptions);
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          enqueueChunk(event.data);
        }
      };
      recorder.onerror = (event) => {
        const message = event?.error?.message || "MediaRecorder xatoligi";
        updateStatus(STATUS_FAILED, message);
        fullTearDown();
      };

      mediaRecorderRef.current = recorder;
      recorder.start(CHUNK_TIMESLICE_MS);
      startedAtRef.current = Date.now();
      setElapsedMs(0);
      timerIntervalRef.current = setInterval(() => {
        if (!startedAtRef.current) return;
        setElapsedMs(Date.now() - startedAtRef.current);
      }, 500);

      updateStatus(STATUS_RECORDING);
      return { ok: true };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Recording boshlanmadi";
      updateStatus(STATUS_FAILED, message);
      fullTearDown();
      sessionIdRef.current = "";
      return { ok: false, error: message };
    }
  }, [
    buildAudioStream,
    buildCompositeStream,
    enqueueChunk,
    fullTearDown,
    isCreator,
    roomCreatorId,
    roomId,
    updateStatus,
  ]);

  const stop = useCallback(async () => {
    if (statusRef.current !== STATUS_RECORDING) return { ok: false };
    if (pendingStopPromiseRef.current) return pendingStopPromiseRef.current;

    const durationMs = startedAtRef.current
      ? Date.now() - startedAtRef.current
      : elapsedMs;

    updateStatus(STATUS_STOPPING);
    stopTimer();

    const promise = new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        resolve();
        return;
      }
      const handleStop = () => {
        recorder.removeEventListener("stop", handleStop);
        resolve();
      };
      recorder.addEventListener("stop", handleStop);
      try {
        recorder.stop();
      } catch {
        resolve();
      }
    })
      .then(async () => {
        while (uploadQueueRef.current.length > 0 || uploadInFlightRef.current) {
          await sleep(200);
        }
        await finalizeBackend(durationMs);
      })
      .finally(() => {
        tearDownRecorder();
        tearDownComposite();
        tearDownAudio();
        pendingStopPromiseRef.current = null;
      });

    pendingStopPromiseRef.current = promise;
    return promise.then(() => ({ ok: true }));
  }, [
    elapsedMs,
    finalizeBackend,
    stopTimer,
    tearDownAudio,
    tearDownComposite,
    tearDownRecorder,
    updateStatus,
  ]);

  useEffect(() => {
    if (unloadHandlersAttachedRef.current) return undefined;
    unloadHandlersAttachedRef.current = true;

    const flushLastChunkAndBeacon = (event) => {
      if (statusRef.current !== STATUS_RECORDING) return;
      const persisted = Boolean(event && event.persisted);
      const durationMs = startedAtRef.current
        ? Date.now() - startedAtRef.current
        : 0;

      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state !== "inactive") {
        try {
          recorder.requestData?.();
        } catch {
          /* noop */
        }
        if (!persisted) {
          try {
            recorder.stop();
          } catch {
            /* noop */
          }
        }
      }

      sendFinishBeacon(durationMs);
    };

    window.addEventListener("pagehide", flushLastChunkAndBeacon);
    window.addEventListener("beforeunload", flushLastChunkAndBeacon);

    return () => {
      window.removeEventListener("pagehide", flushLastChunkAndBeacon);
      window.removeEventListener("beforeunload", flushLastChunkAndBeacon);
      unloadHandlersAttachedRef.current = false;
    };
  }, [sendFinishBeacon]);

  useEffect(() => {
    const handleOnline = () => {
      if (uploadQueueRef.current.length > 0) {
        void drainQueue();
      }
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [drainQueue]);

  const unmountCleanupRef = useRef({ fullTearDown, sendFinishBeacon });
  useEffect(() => {
    unmountCleanupRef.current = { fullTearDown, sendFinishBeacon };
  }, [fullTearDown, sendFinishBeacon]);

  useEffect(
    () => () => {
      if (statusRef.current === STATUS_RECORDING) {
        const durationMs = startedAtRef.current
          ? Date.now() - startedAtRef.current
          : 0;
        try {
          mediaRecorderRef.current?.stop();
        } catch {
          /* noop */
        }
        unmountCleanupRef.current?.sendFinishBeacon?.(durationMs);
      }
      unmountCleanupRef.current?.fullTearDown?.();
    },
    [],
  );

  const toggle = useCallback(async () => {
    if (
      statusRef.current === STATUS_RECORDING ||
      statusRef.current === STATUS_STOPPING
    ) {
      return stop();
    }
    return start();
  }, [start, stop]);

  const recordingReady = useMemo(
    () => Boolean(isCreator && surfaceNode && livekitRoom && API_BASE_URL),
    [isCreator, livekitRoom, surfaceNode],
  );

  const isBusy =
    status === STATUS_STARTING ||
    status === STATUS_STOPPING ||
    status === STATUS_FINALIZING;

  return {
    status,
    isRecording: status === STATUS_RECORDING,
    isBusy,
    elapsedMs,
    lastError,
    recordingReady,
    start,
    stop,
    toggle,
  };
};

export default useMeetRecorder;

// Re-exports useful for status comparisons outside the hook
export const MEET_RECORDER_STATUS = {
  IDLE: STATUS_IDLE,
  STARTING: STATUS_STARTING,
  RECORDING: STATUS_RECORDING,
  STOPPING: STATUS_STOPPING,
  FINALIZING: STATUS_FINALIZING,
  READY: STATUS_READY,
  FAILED: STATUS_FAILED,
};

