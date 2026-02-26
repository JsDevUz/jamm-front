import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

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
}) {
  const socketRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnectionsRef = useRef({});

  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [screenStream, setScreenStream] = useState(null); // local screen share
  const [remoteScreenStreams, setRemoteScreenStreams] = useState([]); // remote screen shares
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [knockRequests, setKnockRequests] = useState([]);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const [joinStatus, setJoinStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [roomTitle, setRoomTitle] = useState(chatTitle || "");
  const screenStreamRef = useRef(null);
  const screenSendersRef = useRef({}); // peerId -> RTCRtpSender
  const knownStreamsRef = useRef({}); // peerId -> first camera streamId

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
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { targetId: senderId, sdp: answer });
      });

      socket.on("answer", async ({ senderId, sdp }) => {
        const pc = peerConnectionsRef.current[senderId];
        if (pc) await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      });

      socket.on("ice-candidate", async ({ senderId, candidate }) => {
        const pc = peerConnectionsRef.current[senderId];
        if (pc && candidate) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(candidate));
          } catch {}
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

        // 2. Connect to signaling server
        const socket = io(`${SIGNAL_URL}/video`, { transports: ["websocket"] });
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

          socket.on("knock-approved", () => {
            setJoinStatus("joined");
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
          // Remove screen stream entry and reset known stream tracking
          // so re-shared streams are detected correctly
          setRemoteScreenStreams((prev) =>
            prev.filter((r) => r.peerId !== sharerPeerId),
          );
          // Reset known streams so only camera remains tracked
          delete knownStreamsRef.current[sharerPeerId];
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
          socket.emit("join-room", { roomId, displayName });
          // Don't set joined here — wait for server to confirm via
          // "existing-peers" (open) or "knock-approved" (private)
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

  // ─── Controls ─────────────────────────────────────────────────────────────────

  const toggleMic = useCallback(() => {
    const t = localStreamRef.current?.getAudioTracks()[0];
    if (t) {
      t.enabled = !t.enabled;
      setIsMicOn(t.enabled);
    }
  }, []);

  const toggleCam = useCallback(() => {
    const t = localStreamRef.current?.getVideoTracks()[0];
    if (t) {
      t.enabled = !t.enabled;
      setIsCamOn(t.enabled);
    }
  }, []);

  const leaveCall = useCallback(() => {
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
    setLocalStream(null);
    setScreenStream(null);
    setIsScreenSharing(false);
    setRemoteStreams([]);
    setRemoteScreenStreams([]);
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
    toggleMic,
    toggleCam,
    leaveCall,
    error,
    roomTitle,
  };
}
