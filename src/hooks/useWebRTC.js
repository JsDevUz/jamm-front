import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import useAuthStore from "../store/authStore";

const SIGNAL_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
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
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionsRef = useRef({});

  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
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
  const screenStreamRef = useRef(null);
  const screenSendersRef = useRef({});
  const knownStreamsRef = useRef({});
  const candidateQueuesRef = useRef({}); // Store candidates until remote sdp is set

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  const addRemoteStream = useCallback((peerId, stream, name) => {
    setRemoteStreams((prev) => {
      if (prev.find((r) => r.peerId === peerId)) {
        return prev.map((r) => (r.peerId === peerId ? { ...r, stream } : r));
      }
      return [...prev, { peerId, stream, displayName: name || peerId }];
    });
  }, []);

  const removeRemoteStream = useCallback((peerId) => {
    setRemoteStreams((prev) => prev.filter((r) => r.peerId !== peerId));
    setRemoteScreenStreams((prev) => prev.filter((r) => r.peerId !== peerId));
    delete knownStreamsRef.current[peerId];
    if (peerConnectionsRef.current[peerId]) {
      peerConnectionsRef.current[peerId].close();
      delete peerConnectionsRef.current[peerId];
    }
  }, []);

  // ─── Peer connection factory ──────────────────────────────────────────────────

  const createPeerConnection = useCallback(
    (peerId, peerDisplayName) => {
      const pc = new RTCPeerConnection(ICE_SERVERS);

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
        if (["failed", "disconnected"].includes(pc.connectionState)) {
          removeRemoteStream(peerId);
        }
      };

      peerConnectionsRef.current[peerId] = pc;
      return pc;
    },
    [addRemoteStream, removeRemoteStream],
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
        // 1. Get local media
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        localStreamRef.current = stream;
        setLocalStream(stream);

        // Apply initial mic/cam state
        const audioTrack = stream.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = initialMicOn;
        const videoTrack = stream.getVideoTracks()[0];
        if (videoTrack) videoTrack.enabled = initialCamOn;

        // 2. Connect to signaling server
        const token = useAuthStore.getState().token;
        const socket = io(`${SIGNAL_URL}/video`, {
          transports: ["websocket"],
          auth: { token },
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
      setKnockRequests([]);
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
      setJoinStatus("idle");
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
      return;
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
    } catch (err) {
      console.error("Screen share error:", err);
    }
  }, [isScreenSharing, roomId]);

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
  };
}
