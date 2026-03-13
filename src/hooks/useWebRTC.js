import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import axiosInstance from "../api/axiosInstance";
import useAuthStore from "../store/authStore";
import { API_BASE_URL } from "../config/env";

const SIGNAL_URL = API_BASE_URL;

const TURN_URLS = import.meta.env.VITE_TURN_URLS
  ? import.meta.env.VITE_TURN_URLS.split(",").map((item) => item.trim())
  : [];

const buildFallbackIceConfig = () => ({
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    ...(TURN_URLS.length > 0
      ? [
          {
            urls: TURN_URLS,
            username: import.meta.env.VITE_TURN_USERNAME || "",
            credential: import.meta.env.VITE_TURN_CREDENTIAL || "",
          },
        ]
      : []),
  ],
});

const CALL_QUALITY_PROFILES = {
  balanced: {
    key: "balanced",
    label: "balanced",
    width: 640,
    height: 360,
    frameRate: 18,
    videoBitrate: 380_000,
    audioBitrate: 32_000,
    scaleResolutionDownBy: 1,
  },
  crowded: {
    key: "crowded",
    label: "crowded",
    width: 480,
    height: 270,
    frameRate: 15,
    videoBitrate: 220_000,
    audioBitrate: 32_000,
    scaleResolutionDownBy: 1.2,
  },
  poor: {
    key: "poor",
    label: "audio-priority",
    width: 320,
    height: 180,
    frameRate: 10,
    videoBitrate: 110_000,
    audioBitrate: 40_000,
    scaleResolutionDownBy: 1.6,
  },
  screen: {
    key: "screen",
    label: "screen-share",
    width: 854,
    height: 480,
    frameRate: 12,
    videoBitrate: 350_000,
    audioBitrate: 32_000,
    scaleResolutionDownBy: 1,
  },
};

const getNavigatorConnectionState = () => {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  return {
    saveData: Boolean(connection?.saveData),
    effectiveType: connection?.effectiveType || "unknown",
    downlink: Number(connection?.downlink || 0),
  };
};

const resolveCallQualityProfile = ({
  peerCount,
  isScreenSharing,
  networkQuality,
  navigatorState,
}) => {
  if (isScreenSharing) return CALL_QUALITY_PROFILES.screen;

  const isVeryWeakNetwork =
    networkQuality === "poor" ||
    navigatorState.saveData ||
    navigatorState.effectiveType === "slow-2g" ||
    navigatorState.effectiveType === "2g" ||
    (navigatorState.downlink > 0 && navigatorState.downlink < 1);

  if (isVeryWeakNetwork) return CALL_QUALITY_PROFILES.poor;
  if (peerCount >= 6 || networkQuality === "limited") {
    return CALL_QUALITY_PROFILES.crowded;
  }
  return CALL_QUALITY_PROFILES.balanced;
};

/**
 * useWebRTC — self-hosted WebRTC hook
 *
 * @param {string}  roomId       – unique room identifier
 * @param {string}  displayName  – local user's display name
 * @param {boolean} enabled      – start when true
 * @param {boolean} isCreator    – creator vs guest
 * @param {boolean} isPrivate    – creator only: create private room (approval required)
 *
 * Returns:
 *   localStream      – MediaStream of local camera+mic
 *   remoteStreams     – Array<{ peerId, stream, displayName }>
 *   knockRequests     – Array<{ peerId, displayName }> (creator only)
 *   approveKnock(peerId)  – approve a waiting guest
 *   rejectKnock(peerId)   – reject a waiting guest
 *   joinStatus        – 'idle' | 'connecting' | 'waiting' | 'rejected' | 'joined'
 *   isMicOn / isCamOn
 *   toggleMic / toggleCam
 *   leaveCall
 *   error
 */
export function useWebRTC({
  roomId,
  displayName,
  enabled,
  isCreator = false,
  isPrivate = false,
  chatTitle = "",
  initialMicOn = true,
  initialCamOn = true,
}) {
  const currentUser = useAuthStore((state) => state.user);
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionsRef = useRef({});
  const iceConfigRef = useRef(buildFallbackIceConfig());

  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [remotePeerStates, setRemotePeerStates] = useState({});
  const [screenStream, setScreenStream] = useState(null);
  const [remoteScreenStreams, setRemoteScreenStreams] = useState([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [knockRequests, setKnockRequests] = useState([]);
  const [isMicOn, setIsMicOn] = useState(initialMicOn);
  const [isCamOn, setIsCamOn] = useState(initialCamOn);
  const [micLocked, setMicLocked] = useState(false);
  const [camLocked, setCamLocked] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [raisedHands, setRaisedHands] = useState(new Set());
  const [joinStatus, setJoinStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [roomTitle, setRoomTitle] = useState(chatTitle || "");
  const [remoteIsRecording, setRemoteIsRecording] = useState(false);
  const [networkQuality, setNetworkQuality] = useState("good");
  const [qualityProfile, setQualityProfile] = useState(
    CALL_QUALITY_PROFILES.balanced,
  );
  const screenStreamRef = useRef(null);
  const screenSendersRef = useRef({});
  const knownStreamsRef = useRef({});
  const candidateQueuesRef = useRef({}); // Store candidates until remote sdp is set
  const statsIntervalRef = useRef(null);
  const qualityProfileRef = useRef(CALL_QUALITY_PROFILES.balanced);

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const addRemoteStream = useCallback((peerId, stream, name) => {
    setRemoteStreams((prev) => {
      if (prev.find((r) => r.peerId === peerId)) {
        return prev.map((r) => (r.peerId === peerId ? { ...r, stream } : r));
      }
      return [...prev, { peerId, stream, displayName: name || peerId }];
    });
    setRemotePeerStates((prev) => ({
      ...prev,
      [peerId]: {
        hasVideo: Boolean(stream?.getVideoTracks?.().length),
        hasAudio: Boolean(stream?.getAudioTracks?.().length),
        videoMuted: false,
        audioMuted: false,
        connectionState: prev[peerId]?.connectionState || "connecting",
        displayName: name || prev[peerId]?.displayName || peerId,
      },
    }));
  }, []);

  const updateRemotePeerState = useCallback((peerId, patch) => {
    setRemotePeerStates((prev) => ({
      ...prev,
      [peerId]: {
        ...(prev[peerId] || {}),
        ...patch,
      },
    }));
  }, []);

  const removeRemoteStream = useCallback((peerId) => {
    setRemoteStreams((prev) => prev.filter((r) => r.peerId !== peerId));
    setRemoteScreenStreams((prev) => prev.filter((r) => r.peerId !== peerId));
    setRemotePeerStates((prev) => {
      const next = { ...prev };
      delete next[peerId];
      return next;
    });
    delete knownStreamsRef.current[peerId];
    if (peerConnectionsRef.current[peerId]) {
      peerConnectionsRef.current[peerId].close();
      delete peerConnectionsRef.current[peerId];
    }
  }, []);

  const applyMediaOptimization = useCallback(async (profile) => {
    const stream = localStreamRef.current;
    if (!stream) return;

    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) {
      try {
        audioTrack.contentHint = "speech";
        await audioTrack.applyConstraints({
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
        });
      } catch {}
    }

    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      try {
        videoTrack.contentHint = isScreenSharing ? "detail" : "motion";
        await videoTrack.applyConstraints({
          width: { ideal: profile.width, max: profile.width },
          height: { ideal: profile.height, max: profile.height },
          frameRate: { ideal: profile.frameRate, max: profile.frameRate },
        });
      } catch {}
    }

    const senderTasks = [];

    Object.values(peerConnectionsRef.current).forEach((pc) => {
      pc.getSenders().forEach((sender) => {
        if (!sender.track) return;
        senderTasks.push(
          (async () => {
            const params = sender.getParameters();
            const encodings =
              params.encodings && params.encodings.length > 0
                ? [...params.encodings]
                : [{}];

            if (sender.track.kind === "audio") {
              encodings[0] = {
                ...encodings[0],
                maxBitrate: profile.audioBitrate,
                networkPriority: "high",
              };
              params.encodings = encodings;
            }

            if (sender.track.kind === "video") {
              encodings[0] = {
                ...encodings[0],
                maxBitrate: profile.videoBitrate,
                maxFramerate: profile.frameRate,
                scaleResolutionDownBy: profile.scaleResolutionDownBy,
                networkPriority: "medium",
              };
              params.encodings = encodings;
              params.degradationPreference = "maintain-framerate";
            }

            try {
              await sender.setParameters(params);
            } catch {}
          })(),
        );
      });
    });

    await Promise.all(senderTasks);
  }, [isScreenSharing]);

  const refreshQualityProfile = useCallback(async () => {
    const peerCount =
      remoteStreams.length + remoteScreenStreams.length + (isScreenSharing ? 1 : 0);
    const navigatorState = getNavigatorConnectionState();
    const nextProfile = resolveCallQualityProfile({
      peerCount,
      isScreenSharing,
      networkQuality,
      navigatorState,
    });

    if (qualityProfileRef.current.key === nextProfile.key) return;
    qualityProfileRef.current = nextProfile;
    setQualityProfile(nextProfile);
    await applyMediaOptimization(nextProfile);
  }, [
    applyMediaOptimization,
    isScreenSharing,
    networkQuality,
    remoteScreenStreams.length,
    remoteStreams.length,
  ]);

  const evaluateConnectionHealth = useCallback(async () => {
    let nextQuality = "good";

    for (const pc of Object.values(peerConnectionsRef.current)) {
      try {
        const stats = await pc.getStats();
        let rtt = 0;
        let availableBitrate = 0;

        stats.forEach((report) => {
          if (
            report.type === "candidate-pair" &&
            report.state === "succeeded" &&
            report.nominated
          ) {
            rtt = Math.max(rtt, Number(report.currentRoundTripTime || 0));
            availableBitrate = Math.max(
              availableBitrate,
              Number(report.availableOutgoingBitrate || 0),
            );
          }
        });

        if (rtt > 0.45 || (availableBitrate > 0 && availableBitrate < 180_000)) {
          nextQuality = "poor";
          break;
        }

        if (
          nextQuality !== "poor" &&
          (rtt > 0.25 || (availableBitrate > 0 && availableBitrate < 420_000))
        ) {
          nextQuality = "limited";
        }
      } catch {}
    }

    setNetworkQuality((prev) => (prev === nextQuality ? prev : nextQuality));
  }, []);

  // ─── Peer connection factory ──────────────────────────────────────────────────

  const createPeerConnection = useCallback(
    (peerId, peerDisplayName) => {
      const pc = new RTCPeerConnection(iceConfigRef.current);
      updateRemotePeerState(peerId, {
        displayName: peerDisplayName || peerId,
        connectionState: "connecting",
      });

      if (localStreamRef.current) {
        localStreamRef.current
          .getTracks()
          .forEach((t) => pc.addTrack(t, localStreamRef.current));
      }

      // Also add screen tracks if we're currently sharing
      if (screenStreamRef.current) {
        screenStreamRef.current
          .getTracks()
          .forEach((t) => pc.addTrack(t, screenStreamRef.current));
      }

      pc.ontrack = (e) => {
        const [s] = e.streams;
        if (!s) return;

        const syncTrackState = () => {
          const videoTracks = s.getVideoTracks();
          const audioTracks = s.getAudioTracks();

          updateRemotePeerState(peerId, {
            hasVideo: videoTracks.length > 0,
            hasAudio: audioTracks.length > 0,
            videoMuted:
              videoTracks.length > 0
                ? videoTracks.every(
                    (track) =>
                      track.readyState !== "live" || track.muted === true,
                  )
                : true,
            audioMuted:
              audioTracks.length > 0
                ? audioTracks.every(
                    (track) =>
                      track.readyState !== "live" || track.muted === true,
                  )
                : true,
          });
        };

        [...s.getVideoTracks(), ...s.getAudioTracks()].forEach((track) => {
          track.onmute = syncTrackState;
          track.onunmute = syncTrackState;
          track.onended = syncTrackState;
        });
        syncTrackState();

        const known = knownStreamsRef.current[peerId];

        if (!known) {
          // First stream from this peer = camera
          knownStreamsRef.current[peerId] = s.id;
          addRemoteStream(peerId, s, peerDisplayName);
        } else if (known === s.id) {
          // Same camera stream (renegotiation update)
          addRemoteStream(peerId, s, peerDisplayName);
        } else {
          // New different stream = screen share
          setRemoteScreenStreams((prev) => {
            if (prev.find((r) => r.peerId === peerId)) {
              return prev.map((r) =>
                r.peerId === peerId ? { ...r, stream: s } : r,
              );
            }
            return [
              ...prev,
              { peerId, stream: s, displayName: peerDisplayName },
            ];
          });
        }
      };

      pc.onicecandidate = (e) => {
        if (e.candidate && socketRef.current) {
          socketRef.current.emit("ice-candidate", {
            targetId: peerId,
            candidate: e.candidate,
          });
        }
      };

      pc.onconnectionstatechange = () => {
        updateRemotePeerState(peerId, {
          connectionState: pc.connectionState,
        });
        if (["failed", "disconnected"].includes(pc.connectionState)) {
          removeRemoteStream(peerId);
        }
      };

      peerConnectionsRef.current[peerId] = pc;
      return pc;
    },
    [addRemoteStream, removeRemoteStream, updateRemotePeerState],
  );

  // ─── Socket signaling listeners ──────────────────────────────────────────────

  const attachSignalingListeners = useCallback(
    (socket) => {
      socket.on("offer", async ({ senderId, sdp }) => {
        let pc = peerConnectionsRef.current[senderId];
        if (!pc) pc = createPeerConnection(senderId, senderId);
        await pc.setRemoteDescription(new RTCSessionDescription(sdp));

        // Process queued ice candidates
        const queue = candidateQueuesRef.current[senderId] || [];
        while (queue.length > 0) {
          const cand = queue.shift();
          await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
        }

        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { targetId: senderId, sdp: answer });
      });

      socket.on("answer", async ({ senderId, sdp }) => {
        const pc = peerConnectionsRef.current[senderId];
        if (pc) {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          // Process queued ice candidates
          const queue = candidateQueuesRef.current[senderId] || [];
          while (queue.length > 0) {
            const cand = queue.shift();
            await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
          }
        }
      });

      socket.on("ice-candidate", async ({ senderId, candidate }) => {
        const pc = peerConnectionsRef.current[senderId];
        if (pc && pc.remoteDescription && pc.remoteDescription.type) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch {}
        } else {
          // Queue candidates if connection not ready for them
          if (!candidateQueuesRef.current[senderId]) {
            candidateQueuesRef.current[senderId] = [];
          }
          candidateQueuesRef.current[senderId].push(candidate);
        }
      });

      socket.on("peer-joined", async ({ peerId, displayName: peerName }) => {
        const pc = createPeerConnection(peerId, peerName);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { targetId: peerId, sdp: offer });
      });

      socket.on("existing-peers", ({ peers }) => {
        // Server confirmed we're in the room
        setJoinStatus("joined");
        // Don't create offers here — existing peers will send us
        // offers via their "peer-joined" handler to avoid glare
      });

      socket.on("peer-left", ({ peerId }) => {
        removeRemoteStream(peerId);
      });
    },
    [createPeerConnection, removeRemoteStream],
  );

  // ─── Main effect ──────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!enabled || !roomId) return;
    let isMounted = true;

    const start = async () => {
      setJoinStatus("connecting");
      setError(null);

      try {
        if (currentUser?._id || currentUser?.id) {
          try {
            const { data } = await axiosInstance.get("/video/ice-config");
            if (Array.isArray(data?.iceServers) && data.iceServers.length > 0) {
              iceConfigRef.current = { iceServers: data.iceServers };
            } else {
              iceConfigRef.current = buildFallbackIceConfig();
            }
          } catch {
            iceConfigRef.current = buildFallbackIceConfig();
          }
        } else {
          iceConfigRef.current = buildFallbackIceConfig();
        }

        // 1. Get local media
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640, max: 640 },
            height: { ideal: 360, max: 360 },
            frameRate: { ideal: 18, max: 18 },
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            channelCount: 1,
          },
        });
        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        localStreamRef.current = stream;
        setLocalStream(stream);
        await applyMediaOptimization(qualityProfileRef.current);

        // Apply initial mic/cam state
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = initialMicOn;
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) videoTrack.enabled = initialCamOn;

        // 2. Connect to signaling server
        const socket = io(`${SIGNAL_URL}/video`, {
          transports: ["websocket"],
          withCredentials: true,
        });
        socketRef.current = socket;

        // 3. Attach signaling
        attachSignalingListeners(socket);

        // 4. Creator: knock-request listener
        if (isCreator) {
          socket.on("knock-request", ({ peerId, displayName: guestName }) => {
            setKnockRequests((prev) => [
              ...prev,
              { peerId, displayName: guestName },
            ]);
          });
        }

        // 5. Guest: approval / rejection listeners
        if (!isCreator) {
          socket.on("waiting-for-approval", () => {
            setJoinStatus("waiting");
          });

          socket.on("knock-approved", ({ mediaLocked }) => {
            setJoinStatus("joined");
            // Private rooms: lock mic/cam until creator allows
            if (mediaLocked) {
              setMicLocked(true);
              setCamLocked(true);
              const audio = localStreamRef.current?.getAudioTracks()[0];
              if (audio) {
                audio.enabled = false;
                setIsMicOn(false);
              }
              const video = localStreamRef.current?.getVideoTracks()[0];
              if (video) {
                video.enabled = false;
                setIsCamOn(false);
              }
            }
          });

          socket.on("knock-rejected", ({ reason }) => {
            setJoinStatus("rejected");
            setError(reason || "Rad etildi");
          });
        }

        // 5b. Listen for room-info (title, isPrivate) from server
        socket.on("room-info", ({ title }) => {
          if (title) setRoomTitle(title);
        });

        // 5c. Screen share signals from peers
        socket.on("screen-share-stopped", ({ peerId: sharerPeerId }) => {
          setRemoteScreenStreams((prev) =>
            prev.filter((r) => r.peerId !== sharerPeerId),
          );
          delete knownStreamsRef.current[sharerPeerId];
        });

        // 5d. Recording signals from peers
        socket.on("recording-started", () => setRemoteIsRecording(true));
        socket.on("recording-stopped", () => setRemoteIsRecording(false));

        // 5e. Kicked signal
        socket.on("kicked", () => {
          setError("Siz yaratuvchi tomonidan chiqarib yuborildingiz");
          setJoinStatus("rejected");
          leaveCall();
        });

        // 5e. Creator media control signals
        socket.on("force-mute-mic", () => {
          const t = localStreamRef.current?.getAudioTracks()[0];
          if (t) {
            t.enabled = false;
            setIsMicOn(false);
          }
          setMicLocked(true);
        });
        socket.on("force-mute-cam", () => {
          const t = localStreamRef.current?.getVideoTracks()[0];
          if (t) {
            t.enabled = false;
            setIsCamOn(false);
          }
          setCamLocked(true);
        });
        socket.on("allow-mic", () => setMicLocked(false));
        socket.on("allow-cam", () => setCamLocked(false));

        // 5f. Hand raise signals
        socket.on("hand-raised", ({ peerId: pid }) => {
          setRaisedHands((prev) => new Set([...prev, pid]));
        });
        socket.on("hand-lowered", ({ peerId: pid }) => {
          setRaisedHands((prev) => {
            const s = new Set(prev);
            s.delete(pid);
            return s;
          });
        });

        // 5g. Server-side error (e.g. premium limit, auth failed)
        socket.on("error", ({ message }) => {
          if (!isMounted) return;

          // If Room not found and we are a guest, we have retry logic below
          if (message === "Room not found" && !isCreator) {
            return;
          }

          setError(message || "Server xatosi yuz berdi");
          setJoinStatus("idle");
        });

        socket.on("connect_error", (err) => {
          if (isMounted) {
            setError("Serverga ulanib bo'lmadi: " + err.message);
            setJoinStatus("idle");
          }
        });

        // 6. Join or create room
        if (isCreator) {
          socket.emit("create-room", {
            roomId,
            displayName,
            isPrivate,
            title: chatTitle,
          });
          socket.once("room-created", () => {
            setJoinStatus("joined");
          });
        } else {
          // Join with retry if room not found (creator might still be creating)
          let retryCount = 0;
          const MAX_RETRIES = 6; // ~10 seconds total

          const join = () => {
            if (!socketRef.current) return;
            socketRef.current.emit("join-room", { roomId, displayName });
          };

          const handleRoomError = ({ message }) => {
            if (message === "Room not found" && isMounted) {
              if (retryCount < MAX_RETRIES) {
                retryCount++;
                console.log(
                  `[useWebRTC] Room not found, retrying join (${retryCount}/${MAX_RETRIES})...`,
                );
                setTimeout(join, 1500); // Retry after 1.5s
              } else {
                setError("Xona topilmadi yoki hali boshlanmagan");
                setJoinStatus("idle");
              }
            }
          };
          socket.on("error", handleRoomError);
          join();
        }
      } catch (err) {
        console.error("[useWebRTC]", err);
        if (isMounted) {
          setError(err.message || "Kamera/mikrofonga ruxsat berilmadi");
          setJoinStatus("idle");
        }
      }
    };

    start();

    return () => {
      isMounted = false;
      Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
      peerConnectionsRef.current = {};
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((t) => t.stop());
        localStreamRef.current = null;
      }
      setLocalStream(null);
      setRemoteStreams([]);
      setRemotePeerStates({});
      setNetworkQuality("good");
      setQualityProfile(CALL_QUALITY_PROFILES.balanced);
      qualityProfileRef.current = CALL_QUALITY_PROFILES.balanced;
      setKnockRequests([]);
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }
      if (socketRef.current) {
        socketRef.current.emit("leave-room", { roomId });
        socketRef.current.disconnect();
      }
    };
  }, [
    enabled,
    roomId,
    displayName,
    isCreator,
    isPrivate,
    attachSignalingListeners,
    currentUser?._id,
    currentUser?.id,
  ]);

  // ─── Creator: approve / reject ────────────────────────────────────────────────

  const approveKnock = useCallback(
    (peerId) => {
      if (socketRef.current) {
        socketRef.current.emit("approve-knock", { roomId, peerId });
        setKnockRequests((prev) => prev.filter((r) => r.peerId !== peerId));
      }
    },
    [roomId],
  );

  const rejectKnock = useCallback(
    (peerId) => {
      if (socketRef.current) {
        socketRef.current.emit("reject-knock", { roomId, peerId });
        setKnockRequests((prev) => prev.filter((r) => r.peerId !== peerId));
      }
    },
    [roomId],
  );

  const toggleMic = useCallback(() => {
    if (micLocked) return; // creator locked
    const t = localStreamRef.current?.getAudioTracks()[0];
    if (t) {
      t.enabled = !t.enabled;
      setIsMicOn(t.enabled);
    }
  }, [micLocked]);

  const toggleCam = useCallback(() => {
    if (camLocked) return; // creator locked
    const t = localStreamRef.current?.getVideoTracks()[0];
    if (t) {
      t.enabled = !t.enabled;
      setIsCamOn(t.enabled);
    }
  }, [camLocked]);

  const leaveCall = useCallback(() => {
    try {
      if (socketRef.current) {
        socketRef.current.emit("leave-room", { roomId });
        socketRef.current.disconnect();
      }
      Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
      peerConnectionsRef.current = {};
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    } catch (e) {
      console.error("Error in leaveCall:", e);
    } finally {
      setLocalStream(null);
      setScreenStream(null);
      setIsScreenSharing(false);
      setRemoteStreams([]);
      setRemoteScreenStreams([]);
      setRemotePeerStates({});
      setJoinStatus("idle");
      setNetworkQuality("good");
      setQualityProfile(CALL_QUALITY_PROFILES.balanced);
      qualityProfileRef.current = CALL_QUALITY_PROFILES.balanced;
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }
    }
  }, [roomId]);

  // ─── Screen Share ─────────────────────────────────────────────────────────────

  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      // Stop screen share
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      // Remove screen track from all peer connections
      Object.entries(screenSendersRef.current).forEach(([peerId, sender]) => {
        const pc = peerConnectionsRef.current[peerId];
        if (pc && sender) {
          try {
            pc.removeTrack(sender);
          } catch {}
        }
      });
      screenSendersRef.current = {};
      screenStreamRef.current = null;
      setScreenStream(null);
      setIsScreenSharing(false);
      // Notify peers
      if (socketRef.current) {
        socketRef.current.emit("screen-share-stopped", { roomId });
      }
      // Renegotiate with all peers
      for (const [peerId, pc] of Object.entries(peerConnectionsRef.current)) {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socketRef.current?.emit("offer", { targetId: peerId, sdp: offer });
        } catch {}
      }
      return true;
    }

    // Start screen share
    try {
      const screen = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });
      screenStreamRef.current = screen;
      setScreenStream(screen);
      setIsScreenSharing(true);

      // When user stops via browser UI
      screen.getVideoTracks()[0].onended = () => {
        toggleScreenShare(); // recursion: will hit the stop branch
      };

      // Add screen track to all existing peer connections
      for (const [peerId, pc] of Object.entries(peerConnectionsRef.current)) {
        const sender = pc.addTrack(screen.getVideoTracks()[0], screen);
        screenSendersRef.current[peerId] = sender;
      }

      // Notify peers
      if (socketRef.current) {
        socketRef.current.emit("screen-share-started", { roomId });
      }

      // Renegotiate with all peers
      for (const [peerId, pc] of Object.entries(peerConnectionsRef.current)) {
        try {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          socketRef.current?.emit("offer", { targetId: peerId, sdp: offer });
        } catch {}
      }
      return true;
    } catch (err) {
      console.error("Screen share error:", err);
      return false;
    }
  }, [isScreenSharing, roomId]);

  useEffect(() => {
    refreshQualityProfile();
  }, [refreshQualityProfile]);

  useEffect(() => {
    if (!enabled || joinStatus !== "joined") return undefined;

    evaluateConnectionHealth();
    statsIntervalRef.current = setInterval(evaluateConnectionHealth, 5000);

    return () => {
      if (statsIntervalRef.current) {
        clearInterval(statsIntervalRef.current);
        statsIntervalRef.current = null;
      }
    };
  }, [enabled, evaluateConnectionHealth, joinStatus]);

  // ─── Recording signal ─────────────────────────────────────────────────────────

  const emitRecording = useCallback(
    (started) => {
      if (socketRef.current) {
        socketRef.current.emit(
          started ? "recording-started" : "recording-stopped",
          { roomId },
        );
      }
    },
    [roomId],
  );

  // ─── Creator media controls ─────────────────────────────────────────────────

  const forceMuteMic = useCallback(
    (peerId) => {
      socketRef.current?.emit("force-mute-mic", { roomId, peerId });
    },
    [roomId],
  );

  const forceMuteCam = useCallback(
    (peerId) => {
      socketRef.current?.emit("force-mute-cam", { roomId, peerId });
    },
    [roomId],
  );

  const allowMic = useCallback(
    (peerId) => {
      socketRef.current?.emit("allow-mic", { roomId, peerId });
    },
    [roomId],
  );

  const allowCam = useCallback(
    (peerId) => {
      socketRef.current?.emit("allow-cam", { roomId, peerId });
    },
    [roomId],
  );

  const kickPeer = useCallback(
    (peerId) => {
      socketRef.current?.emit("kick-peer", { roomId, peerId });
    },
    [roomId],
  );

  // ─── Hand raise ─────────────────────────────────────────────────────────

  const toggleHandRaise = useCallback(() => {
    const next = !isHandRaised;
    setIsHandRaised(next);
    socketRef.current?.emit(next ? "hand-raised" : "hand-lowered", { roomId });
  }, [isHandRaised, roomId]);

  return {
    localStream,
    remoteStreams,
    remotePeerStates,
    screenStream,
    remoteScreenStreams,
    isScreenSharing,
    toggleScreenShare,
    knockRequests,
    approveKnock,
    rejectKnock,
    joinStatus,
    isMicOn,
    isCamOn,
    micLocked,
    camLocked,
    toggleMic,
    toggleCam,
    leaveCall,
    error,
    roomTitle,
    remoteIsRecording,
    emitRecording,
    forceMuteMic,
    forceMuteCam,
    allowMic,
    allowCam,
    isHandRaised,
    raisedHands,
    toggleHandRaise,
    kickPeer,
    networkQuality,
    qualityProfile,
  };
}
