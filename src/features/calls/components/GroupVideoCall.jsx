import React, { useRef, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes, css } from "styled-components";
import { createPortal } from "react-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Copy,
  Check,
  Users,
  Loader,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Monitor,
  MonitorOff,
  Circle,
  Maximize,
  Hand,
  Lock,
  UserMinus,
  Link2,
  ArrowLeft,
  Timer,
  CheckSquare,
  User,
  ShieldAlert,
  Minimize2,
} from "lucide-react";
import { useWebRTC } from "../../../hooks/useWebRTC";
import useAuthStore from "../../../store/authStore";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`;

// ─── Layout ───────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: ${(p) => (p.$minimized ? "auto 20px 20px auto" : "0")};
  width: ${(p) => (p.$minimized ? "320px" : "auto")};
  height: ${(p) => (p.$minimized ? "180px" : "auto")};
  z-index: 10000;
  background: #0b0d0f;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease-out;
  border-radius: ${(p) => (p.$minimized ? "18px" : "0")};
  border: ${(p) => (p.$minimized ? "1px solid rgba(255,255,255,0.08)" : "none")};
  box-shadow: ${(p) =>
    p.$minimized ? "0 20px 50px rgba(0,0,0,0.45)" : "none"};
  overflow: hidden;
`;

const FloatingActionBar = styled.div`
  position: absolute;
  bottom: 88px;
  right: 14px;
  z-index: 10020;
  display: flex;
  gap: 8px;
  pointer-events: none;
`;

const FloatingActionBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(11, 13, 15, 0.72);
  backdrop-filter: blur(10px);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.16s ease, transform 0.16s ease;

  &:hover {
    background: rgba(24, 28, 34, 0.92);
    transform: translateY(-1px);
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  flex-shrink: 0;
`;

const CallInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const CallTitle = styled.span`
  color: #fff;
  font-size: 15px;
  font-weight: 700;
`;
const CallSub = styled.span`
  color: #72767d;
  font-size: 11px;
  font-family: monospace;
`;

const TopActions = styled.div`
  display: flex;
  gap: 8px;
`;

const TinyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 8px;
  border: 1px solid
    ${(p) => (p.$danger ? "rgba(240,71,71,0.3)" : "rgba(255,255,255,0.1)")};
  background: ${(p) =>
    p.$danger ? "rgba(240,71,71,0.1)" : "rgba(255,255,255,0.06)"};
  color: ${(p) => (p.$danger ? "#f04747" : "#b9bbbe")};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  &:hover {
    background: ${(p) =>
      p.$danger ? "rgba(240,71,71,0.2)" : "rgba(255,255,255,0.12)"};
    color: ${(p) => (p.$danger ? "#ff6060" : "#fff")};
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const PiPFrame = styled.div`
  width: 100%;
  height: 100%;
  background: #0b0d0f;
  display: flex;
  flex-direction: column;
`;

const MinimizedBody = styled.button`
  flex: 1;
  border: none;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.02)
  );
  color: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
`;

const MiniTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const MiniMeta = styled.div`
  color: #9ca3af;
  font-size: 12px;
  line-height: 1.5;
`;

const MiniActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// ─── Video Grid ───────────────────────────────────────────────────────────────

const VideoGrid = styled.div`
  flex: 1;
  display: grid;
  padding: 14px;
  gap: 10px;
  overflow: hidden;
  ${(p) => {
    const n = p.$count;
    if (n === 1)
      return css`
        grid-template-columns: 1fr;
      `;
    if (n === 2)
      return css`
        grid-template-columns: 1fr 1fr;
      `;
    if (n <= 4)
      return css`
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
      `;
    return css`
      grid-template-columns: repeat(3, 1fr);
    `;
  }}
`;

const VideoTile = styled.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  background: #1e2124;
  border: 2px solid
    ${(p) => (p.$isLocal ? "rgba(114,137,218,0.4)" : "rgba(255,255,255,0.05)")};
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: ${(p) => (p.$isLocal ? "scaleX(-1)" : "none")};
  }
`;

const TileLabel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const NoCamera = styled.div`
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: #4f545c;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7289da, #5e73bc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: white;
`;

// ─── Waiting Room Panel ───────────────────────────────────────────────────────

const WaitingPanel = styled.div`
  width: 280px;
  flex-shrink: 0;
  background: #18191c;
  border-left: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  flex-direction: column;
`;

const PanelHead = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PanelBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const KnockCard = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 12px;
  animation: ${slideIn} 0.2s ease;
`;

const KnockName = styled.div`
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const KnockActions = styled.div`
  display: flex;
  gap: 6px;
`;

const KnockBtn = styled.button`
  flex: 1;
  padding: 6px;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all 0.15s;
  ${(p) =>
    p.$approve
      ? `background: rgba(67,181,129,0.14); color: #43b581; border: 1px solid rgba(67,181,129,0.3); &:hover { background: rgba(67,181,129,0.24); }`
      : `background: rgba(240,71,71,0.12); color: #f04747; border: 1px solid rgba(240,71,71,0.25); &:hover { background: rgba(240,71,71,0.22); }`}
`;

const EmptyWaiting = styled.div`
  text-align: center;
  color: #4f545c;
  font-size: 13px;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background 0.12s;
  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

const MemberAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #7289da, #5e73bc);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
`;

const MemberInfo = styled.div`
  flex: 1;
  min-width: 0;
  color: #dcddde;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemberIcons = styled.div`
  display: flex;
  gap: 4px;
  color: #4f545c;
  flex-shrink: 0;
`;

const SectionLabel = styled.div`
  color: #72767d;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 14px 4px;
`;

const NotifBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #f04747;
  color: #fff;
  font-size: 9px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const DrawerClose = styled.button`
  background: none;
  border: none;
  color: #72767d;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
  &:hover {
    color: #fff;
  }
`;

// ─── Controls ─────────────────────────────────────────────────────────────────

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
`;

const CtrlBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  ${(p) =>
    p.$danger
      ? `background: #f04747; color: white; &:hover { background: #d84040; transform: scale(1.08); }`
      : p.$active
        ? `background: rgba(255,255,255,0.09); color: #fff; &:hover { background: rgba(255,255,255,0.15); }`
        : `background: rgba(240,71,71,0.15); color: #f04747; border: 1px solid rgba(240,71,71,0.3); &:hover { background: rgba(240,71,71,0.25); }`}
`;

const CenterBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: #b9bbbe;
  font-size: 15px;
`;

const Spin = styled(Loader)`
  animation: ${pulse} 1.2s linear infinite;
`;

const recPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const RecBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(240, 71, 71, 0.15);
  border: 1px solid rgba(240, 71, 71, 0.3);
  border-radius: 20px;
  padding: 4px 12px 4px 8px;
  color: #f04747;
  font-size: 11px;
  font-weight: 700;
  animation: ${recPulse} 1.5s ease infinite;
`;

const RecordMenu = styled.div`
  position: absolute;
  bottom: 62px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e2124;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 6px;
  min-width: 220px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.15s ease;
  z-index: 100;
`;

const RecordOption = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #dcddde;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.12s;
  text-align: left;
  &:hover {
    background: rgba(114, 137, 218, 0.15);
    color: #fff;
  }
`;

const RecordOptionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.$bg || "rgba(255,255,255,0.06)"};
  flex-shrink: 0;
`;

// ─── VideoEl ──────────────────────────────────────────────────────────────────

const FullscreenBtn = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.55);
  border: none;
  border-radius: 6px;
  color: #fff;
  padding: 5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s;
  z-index: 5;
  &:hover {
    background: rgba(114, 137, 218, 0.7);
  }
`;

const VideoEl = ({
  stream,
  muted = false,
  isLocal = false,
  label,
  isCamOn = true,
}) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const tileRef = useRef(null);
  useEffect(() => {
    if (ref.current && stream) ref.current.srcObject = stream;
  }, [stream, isCamOn]);

  const goFullscreen = () => {
    const el = tileRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.() || el.webkitRequestFullscreen?.();
    }
  };

  return (
    <VideoTile
      $isLocal={isLocal}
      ref={tileRef}
      onDoubleClick={goFullscreen}
      style={{ cursor: "pointer" }}
      onMouseEnter={(e) => {
        const b = e.currentTarget.querySelector(".fs-btn");
        if (b) b.style.opacity = 1;
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget.querySelector(".fs-btn");
        if (b) b.style.opacity = 0;
      }}
    >
      <FullscreenBtn className="fs-btn" onClick={goFullscreen}>
        <Maximize size={14} />
      </FullscreenBtn>
      {isCamOn && stream ? (
        <video ref={ref} autoPlay playsInline muted={muted} />
      ) : (
        <NoCamera>
          <Avatar>{label?.charAt(0)?.toUpperCase() || "?"}</Avatar>
          <span style={{ fontSize: 12 }}>{label}</span>
        </NoCamera>
      )}
      <TileLabel>
        {!isCamOn && <VideoOff size={11} />}
        {label}
        {isLocal && t("groupCall.localSuffix")}
      </TileLabel>
    </VideoTile>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const GroupVideoCall = ({
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  isMinimized = false,
  roomId,
  chatTitle,
  isCreator = true,
  isPrivate = false,
  initialMicOn = true,
  initialCamOn = true,
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [pipWindow, setPipWindow] = useState(null);
  const [pipContainer, setPipContainer] = useState(null);
  const pipCloseIntentRef = useRef(false);

  const currentUser = useAuthStore((state) => state.user);

  const displayName =
    currentUser?.nickname || currentUser?.username || t("groupCall.guest");

  const {
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
  } = useWebRTC({
    roomId,
    displayName,
    enabled: isOpen && !!roomId,
    isCreator,
    isPrivate,
    chatTitle,
    initialMicOn,
    initialCamOn,
  });

  // ─── Recording logic ─────────────────────────────────────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const [showRecordMenu, setShowRecordMenu] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const canvasRef = useRef(null);
  const drawIntervalRef = useRef(null);
  const recordScreenStreamRef = useRef(null);

  const mixAllAudio = useCallback(() => {
    const audioCtx = new AudioContext();
    const dest = audioCtx.createMediaStreamDestination();
    const allStreams = [
      localStream,
      ...remoteStreams.map((r) => r.stream),
    ].filter(Boolean);
    allStreams.forEach((s) => {
      const audioTracks = s.getAudioTracks();
      if (audioTracks.length > 0) {
        const source = audioCtx.createMediaStreamSource(
          new MediaStream(audioTracks),
        );
        source.connect(dest);
      }
    });
    return dest.stream;
  }, [localStream, remoteStreams]);

  const startRecording = useCallback(
    async (mode) => {
      try {
        setShowRecordMenu(false);
        let videoStream;

        if (mode === "screen") {
          // Record screen share via getDisplayMedia
          const screen = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: false,
          });
          recordScreenStreamRef.current = screen;
          videoStream = screen;
          // Auto stop when user stops share
          screen.getVideoTracks()[0].onended = () => stopRecording();
        } else {
          // Record all tiles via canvas composite
          const canvas = document.createElement("canvas");
          canvas.width = 1280;
          canvas.height = 720;
          canvasRef.current = canvas;
          const ctx = canvas.getContext("2d");
          const drawFrame = () => {
            const videos = document.querySelectorAll("video");
            const count = videos.length || 1;
            const cols = count <= 1 ? 1 : count <= 4 ? 2 : 3;
            const rows = Math.ceil(count / cols);
            const w = canvas.width / cols;
            const h = canvas.height / rows;
            ctx.fillStyle = "#0b0d0f";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            videos.forEach((video, i) => {
              const col = i % cols;
              const row = Math.floor(i / cols);
              try {
                ctx.drawImage(video, col * w, row * h, w, h);
              } catch {}
            });
          };
          drawIntervalRef.current = setInterval(drawFrame, 33);
          videoStream = canvas.captureStream(30);
        }

        // Mix all audio
        const mixedAudio = mixAllAudio();

        // Combine video + audio
        const combined = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...mixedAudio.getAudioTracks(),
        ]);

        chunksRef.current = [];
        const recorder = new MediaRecorder(combined, {
          mimeType: "video/webm;codecs=vp9,opus",
        });
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
        mediaRecorderRef.current = recorder;
        recorder.start(1000);

        setIsRecording(true);
        emitRecording(true);
      } catch (err) {
        console.error("Recording error:", err);
        setShowRecordMenu(false);
      }
    },
    [mixAllAudio, emitRecording],
  );

  const stopRecording = useCallback(() => {
    if (drawIntervalRef.current) {
      clearInterval(drawIntervalRef.current);
      drawIntervalRef.current = null;
    }
    if (recordScreenStreamRef.current) {
      recordScreenStreamRef.current.getTracks().forEach((t) => t.stop());
      recordScreenStreamRef.current = null;
    }
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `meet-${roomId}-${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        chunksRef.current = [];
      };
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    emitRecording(false);
  }, [roomId, emitRecording]);

  const handleLeave = () => {
    try {
      if (isRecording) stopRecording();
    } catch (e) {
      console.error("Failed to stop recording:", e);
    }

    try {
      leaveCall();
    } catch (e) {
      console.error("Failed to leave call:", e);
    }

    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/join/${roomId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closePiPWindow = useCallback(() => {
    if (pipWindow && !pipWindow.closed) {
      pipCloseIntentRef.current = true;
      pipWindow.close();
    }
    setPipWindow(null);
    setPipContainer(null);
  }, [pipWindow]);

  useEffect(() => {
    if (!isMinimized || !pipWindow) return undefined;

    const handlePageHide = () => {
      setPipWindow(null);
      setPipContainer(null);
      if (pipCloseIntentRef.current) {
        pipCloseIntentRef.current = false;
        return;
      }
      onMaximize?.();
    };

    pipWindow.addEventListener("pagehide", handlePageHide);
    return () => {
      pipWindow.removeEventListener("pagehide", handlePageHide);
    };
  }, [isMinimized, onMaximize, pipWindow]);

  useEffect(() => {
    if (!isOpen && pipWindow) {
      closePiPWindow();
    }
  }, [closePiPWindow, isOpen, pipWindow]);

  useEffect(() => {
    if (!isMinimized && pipWindow) {
      closePiPWindow();
    }
  }, [closePiPWindow, isMinimized, pipWindow]);

  const handleMinimizeToggle = useCallback(async () => {
    if (isMinimized) {
      onMaximize?.();
      return;
    }

    const documentPiP = window?.documentPictureInPicture;
    if (!documentPiP?.requestWindow) {
      onMinimize?.();
      return;
    }

    try {
      const nextPipWindow = await documentPiP.requestWindow({
        width: 360,
        height: 220,
      });

      nextPipWindow.document.body.innerHTML = "";
      nextPipWindow.document.body.style.margin = "0";
      nextPipWindow.document.body.style.background = "#0b0d0f";
      nextPipWindow.document.body.style.overflow = "hidden";

      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules]
            .map((rule) => rule.cssText)
            .join("");
          const style = document.createElement("style");
          style.textContent = cssRules;
          nextPipWindow.document.head.appendChild(style);
        } catch {
          if (styleSheet.href) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = styleSheet.type;
            link.media = styleSheet.media;
            link.href = styleSheet.href;
            nextPipWindow.document.head.appendChild(link);
          }
        }
      });

      const mountNode = nextPipWindow.document.createElement("div");
      mountNode.style.width = "100%";
      mountNode.style.height = "100%";
      nextPipWindow.document.body.appendChild(mountNode);

      pipCloseIntentRef.current = false;
      setPipWindow(nextPipWindow);
      setPipContainer(mountNode);
      onMinimize?.();
    } catch (error) {
      console.error("Document PiP ochilmadi:", error);
      onMinimize?.();
    }
  }, [isMinimized, onMaximize, onMinimize]);

  const handleMaximizeFromPiP = useCallback(() => {
    onMaximize?.();
  }, [onMaximize]);

  if (!isOpen || !roomId) return null;

  const totalTiles =
    1 +
    remoteStreams.length +
    (screenStream ? 1 : 0) +
    remoteScreenStreams.length;

  const minimizedContent = (
    <>
      <TopBar>
        <CallInfo>
          <CallTitle>
            {roomTitle || chatTitle || "Meet"}
            {isPrivate && (
              <span
                style={{
                  fontSize: 11,
                  color: "#faa61a",
                  marginLeft: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <ShieldAlert size={12} /> {t("groupCall.privateBadge")}
              </span>
            )}
          </CallTitle>
          <CallSub>{roomId}</CallSub>
        </CallInfo>
        <TopActions>
          {(isRecording || remoteIsRecording) && (
            <RecBadge>
              <Circle size={8} fill="#f04747" /> {t("groupCall.recording")}
            </RecBadge>
          )}
          {(onMinimize || isMinimized) && (
            <TinyBtn onClick={handleMinimizeToggle}>
              {isMinimized ? <Maximize size={13} /> : <Minimize2 size={13} />}
              {isMinimized ? t("groupCall.open") : t("groupCall.minimize")}
            </TinyBtn>
          )}
          <TinyBtn onClick={handleCopy}>
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? t("groupCall.copied") : t("groupCall.copyLink")}
          </TinyBtn>
          {!isMinimized && (
            <TinyBtn
              onClick={() => setShowDrawer((p) => !p)}
              style={{ position: "relative" }}
            >
              <Users size={13} />
              {totalTiles}
              {isCreator && knockRequests.length > 0 && (
                <NotifBadge>{knockRequests.length}</NotifBadge>
              )}
            </TinyBtn>
          )}
        </TopActions>
      </TopBar>

      <MinimizedBody
        type="button"
        onClick={pipContainer ? handleMaximizeFromPiP : onMaximize}
      >
        <div>
          <MiniTitle>{roomTitle || chatTitle || t("groupCall.roomDefault")}</MiniTitle>
          <MiniMeta>
            {t("groupCall.participants", { count: totalTiles })} •{" "}
            {isPrivate ? t("groupCall.privateRoom") : t("groupCall.publicRoom")}
          </MiniMeta>
        </div>
        <MiniActions>
          <MiniMeta>{roomId}</MiniMeta>
          {isMicOn ? <Mic size={16} color="#43b581" /> : <MicOff size={16} color="#f04747" />}
          {isCamOn ? <Video size={16} color="#43b581" /> : <VideoOff size={16} color="#f04747" />}
        </MiniActions>
      </MinimizedBody>
    </>
  );

  if (isMinimized && pipContainer) {
    return createPortal(<PiPFrame>{minimizedContent}</PiPFrame>, pipContainer);
  }

  return (
    <Overlay $minimized={isMinimized}>
      {!isMinimized && (
        <FloatingActionBar>
          <FloatingActionBtn
            type="button"
            title={t("groupCall.minimizeTitle")}
            aria-label={t("groupCall.minimizeTitle")}
            onClick={handleMinimizeToggle}
          >
            <Minimize2 size={18} />
          </FloatingActionBtn>
        </FloatingActionBar>
      )}
      {isMinimized ? (
        <MinimizedBody type="button" onClick={onMaximize}>
          <div>
            <MiniTitle>{roomTitle || chatTitle || t("groupCall.roomDefault")}</MiniTitle>
            <MiniMeta>
              {t("groupCall.participants", { count: totalTiles })} •{" "}
              {isPrivate ? t("groupCall.privateRoom") : t("groupCall.publicRoom")}
            </MiniMeta>
          </div>
          <MiniActions>
            <MiniMeta>{roomId}</MiniMeta>
            {isMicOn ? <Mic size={16} color="#43b581" /> : <MicOff size={16} color="#f04747" />}
            {isCamOn ? <Video size={16} color="#43b581" /> : <VideoOff size={16} color="#f04747" />}
          </MiniActions>
        </MinimizedBody>
      ) : (
      <Body>
        {error ? (
          <CenterBox>
            <AlertCircle size={38} color="#f04747" />
            <span>{error}</span>
            <TinyBtn onClick={onClose}>{t("groupCall.close")}</TinyBtn>
          </CenterBox>
        ) : joinStatus === "connecting" ? (
          <CenterBox>
            <Spin size={38} color="#7289da" />
            <span>{t("groupCall.connecting")}</span>
          </CenterBox>
        ) : joinStatus === "waiting" ? (
          <CenterBox>
            <Clock size={48} color="#faa61a" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              {t("groupCall.waiting")}
            </span>
            <span>{t("groupCall.waitingDescription")}</span>
            <TinyBtn onClick={handleLeave}>{t("common.cancel")}</TinyBtn>
          </CenterBox>
        ) : joinStatus === "rejected" ? (
          <CenterBox>
            <XCircle size={48} color="#f04747" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>
              {t("groupCall.rejected")}
            </span>
            <span>{t("groupCall.rejectedDescription")}</span>
            <TinyBtn onClick={onClose}>{t("groupCall.close")}</TinyBtn>
          </CenterBox>
        ) : (
          <VideoGrid $count={totalTiles}>
            <VideoEl
              stream={localStream}
              muted
              isLocal
              label={displayName}
              isCamOn={isCamOn}
            />
            {/* Local screen share tile */}
            {screenStream && (
              <VideoEl
                stream={screenStream}
                muted
                label={`${displayName} (Ekran)`}
                isCamOn
              />
            )}
            {remoteStreams.map(({ peerId, stream, displayName: n }) => (
              <div key={peerId} style={{ position: "relative" }}>
                <VideoEl stream={stream} label={n} isCamOn />
                {raisedHands.has(peerId) && (
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      fontSize: 24,
                      zIndex: 5,
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                    }}
                  >
                    <Hand size={20} color="#faa61a" fill="#faa61a" />
                  </span>
                )}
              </div>
            ))}
            {/* Remote screen share tiles */}
            {remoteScreenStreams.map(({ peerId, stream, displayName: n }) => (
              <VideoEl
                key={`screen-${peerId}`}
                stream={stream}
                label={`${n} (Ekran)`}
                isCamOn
              />
            ))}
          </VideoGrid>
        )}

        {/* Members Drawer */}
        {showDrawer && (
          <WaitingPanel>
            <PanelHead>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Users size={15} color="#7289da" />
                {t("groupCall.members", { count: totalTiles })}
              </span>
              <DrawerClose onClick={() => setShowDrawer(false)}>
                <XCircle size={16} />
              </DrawerClose>
            </PanelHead>
            <PanelBody>
              {/* Waiting section — only creator of private room */}
              {isCreator && isPrivate && (
                <>
                  <SectionLabel
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Timer size={12} />{" "}
                    {t("groupCall.waitingMembers", {
                      count: knockRequests.length,
                    })}
                  </SectionLabel>
                  {knockRequests.length === 0 ? (
                    <div
                      style={{
                        padding: "8px 14px",
                        color: "#4f545c",
                        fontSize: 12,
                      }}
                    >
                      Hech kim kutmayapti
                    </div>
                  ) : (
                    knockRequests.map(({ peerId, displayName: n }) => (
                      <KnockCard key={peerId}>
                        <KnockName
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <User size={14} /> {n}
                        </KnockName>
                        <KnockActions>
                          <KnockBtn
                            $approve
                            onClick={() => approveKnock(peerId)}
                          >
                            <CheckCircle size={12} /> Qabul
                          </KnockBtn>
                          <KnockBtn onClick={() => rejectKnock(peerId)}>
                            <XCircle size={12} /> Rad
                          </KnockBtn>
                        </KnockActions>
                      </KnockCard>
                    ))
                  )}
                </>
              )}

              {/* Joined members */}
              <SectionLabel
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <CheckSquare size={12} color="#43b581" /> Qo'shilganlar (
                {totalTiles})
              </SectionLabel>
              {/* Local user */}
              <MemberRow>
                <MemberAvatar>
                  {displayName?.charAt(0)?.toUpperCase() || "?"}
                </MemberAvatar>
                <MemberInfo>{displayName} (Sen)</MemberInfo>
                <MemberIcons>
                  {isMicOn ? (
                    <Mic size={13} color="#43b581" />
                  ) : (
                    <MicOff size={13} color="#f04747" />
                  )}
                  {isCamOn ? (
                    <Video size={13} color="#43b581" />
                  ) : (
                    <VideoOff size={13} color="#f04747" />
                  )}
                </MemberIcons>
              </MemberRow>
              {/* Remote peers */}
              {remoteStreams.map(({ peerId, displayName: n }) => (
                <MemberRow key={peerId}>
                  <MemberAvatar>
                    {n?.charAt(0)?.toUpperCase() || "?"}
                  </MemberAvatar>
                  <MemberInfo
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {raisedHands.has(peerId) && (
                      <Hand size={14} color="#faa61a" fill="#faa61a" />
                    )}
                    {n}
                  </MemberInfo>
                  <MemberIcons>
                    {isCreator ? (
                      <>
                        <span
                          onClick={() => forceMuteMic(peerId)}
                          style={{ cursor: "pointer" }}
                          title="Mic o'chirish"
                        >
                          <MicOff size={13} color="#f04747" />
                        </span>
                        <span
                          onClick={() => allowMic(peerId)}
                          style={{ cursor: "pointer" }}
                          title="Mic ruxsat"
                        >
                          <Mic size={13} color="#43b581" />
                        </span>
                        <span
                          onClick={() => forceMuteCam(peerId)}
                          style={{ cursor: "pointer" }}
                          title="Cam o'chirish"
                        >
                          <VideoOff size={13} color="#f04747" />
                        </span>
                        <span
                          onClick={() => allowCam(peerId)}
                          style={{ cursor: "pointer" }}
                          title="Cam ruxsat"
                        >
                          <Video size={13} color="#43b581" />
                        </span>
                        <span
                          onClick={() => kickPeer(peerId)}
                          style={{ cursor: "pointer", marginLeft: 8 }}
                          title="Chiqarib yuborish"
                        >
                          <UserMinus size={13} color="#f04747" />
                        </span>
                      </>
                    ) : (
                      <>
                        <Mic size={13} color="#43b581" />
                        <Video size={13} color="#43b581" />
                      </>
                    )}
                  </MemberIcons>
                </MemberRow>
              ))}
            </PanelBody>
          </WaitingPanel>
        )}
      </Body>
        )}

      {!isMinimized && <ControlBar>
        <CtrlBtn
          $active={isMicOn}
          onClick={toggleMic}
          style={micLocked ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          {isMicOn ? <Mic size={21} /> : <MicOff size={21} />}
          {micLocked && (
            <Lock
              size={10}
              style={{ position: "absolute", bottom: 4, right: 4 }}
            />
          )}
        </CtrlBtn>
        <CtrlBtn
          $active={isCamOn}
          onClick={toggleCam}
          style={camLocked ? { opacity: 0.5, cursor: "not-allowed" } : {}}
        >
          {isCamOn ? <Video size={21} /> : <VideoOff size={21} />}
          {camLocked && (
            <Lock
              size={10}
              style={{ position: "absolute", bottom: 4, right: 4 }}
            />
          )}
        </CtrlBtn>
        <CtrlBtn $active={isScreenSharing} onClick={toggleScreenShare}>
          {isScreenSharing ? <MonitorOff size={21} /> : <Monitor size={21} />}
        </CtrlBtn>
        <CtrlBtn
          $active={isHandRaised}
          onClick={toggleHandRaise}
          style={
            isHandRaised
              ? { background: "rgba(250,166,26,0.2)", color: "#faa61a" }
              : {}
          }
        >
          <Hand size={21} />
        </CtrlBtn>
        {isCreator && (
          <div style={{ position: "relative" }}>
            <CtrlBtn
              $active={isRecording}
              onClick={() =>
                isRecording ? stopRecording() : setShowRecordMenu((p) => !p)
              }
              style={
                isRecording
                  ? { background: "rgba(240,71,71,0.2)", color: "#f04747" }
                  : {}
              }
            >
              <Circle size={21} fill={isRecording ? "#f04747" : "none"} />
            </CtrlBtn>
            {showRecordMenu && !isRecording && (
              <RecordMenu>
                <RecordOption onClick={() => startRecording("screen")}>
                  <RecordOptionIcon $bg="rgba(114,137,218,0.15)">
                    <Monitor size={16} color="#7289da" />
                  </RecordOptionIcon>
                  <div>
                    <div style={{ fontWeight: 600 }}>Ekranni yozish</div>
                    <div style={{ fontSize: 11, color: "#72767d" }}>
                      Faqat ekran + barcha ovozlar
                    </div>
                  </div>
                </RecordOption>
                <RecordOption onClick={() => startRecording("all")}>
                  <RecordOptionIcon $bg="rgba(240,71,71,0.12)">
                    <Circle size={16} color="#f04747" />
                  </RecordOptionIcon>
                  <div>
                    <div style={{ fontWeight: 600 }}>Hammasini yozish</div>
                    <div style={{ fontSize: 11, color: "#72767d" }}>
                      Barcha oynalar + barcha ovozlar
                    </div>
                  </div>
                </RecordOption>
              </RecordMenu>
            )}
          </div>
        )}
        <CtrlBtn $danger onClick={handleLeave}>
          <PhoneOff size={21} />
        </CtrlBtn>
      </ControlBar>}
    </Overlay>
  );
};

export default GroupVideoCall;
