import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes, css } from "styled-components";
import { createPortal } from "react-dom";
import { toast } from "react-hot-toast";
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
  PenSquare,
  RefreshCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useWebRTC } from "../../../hooks/useWebRTC";
import useAuthStore from "../../../store/authStore";
import useMeetCallStore from "../../../store/meetCallStore";
import { API_BASE_URL, RESOLVED_APP_BASE_URL } from "../../../config/env";
import { updateMeetPrivacy } from "../../../utils/meetStore";
import {
  createRecordingSession,
  finishRecordingSession,
  uploadRecordingChunk,
} from "../../../api/videoRecordingApi";
import WhiteboardTile from "./WhiteboardTile";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
`;

const WHITEBOARD_DEFAULT_COLOR = "#0f172a";
const WHITEBOARD_DEFAULT_FILL_COLOR = "";
const WHITEBOARD_DEFAULT_SHAPE_EDGE = "sharp";
const WHITEBOARD_DEFAULT_TOOL = "pen";
const WHITEBOARD_DEFAULT_BRUSH_SIZE = 4;
const WHITEBOARD_DEFAULT_TEXT_FONT_FAMILY = "sans";
const WHITEBOARD_DEFAULT_TEXT_SIZE = "m";
const WHITEBOARD_DEFAULT_TEXT_ALIGN = "left";
const WHITEBOARD_RECORDING_WEBM_AUDIO_MIME_TYPES = [
  "video/webm;codecs=vp8,opus",
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=h264,opus",
  "video/webm",
];
const WHITEBOARD_RECORDING_WEBM_VIDEO_ONLY_MIME_TYPES = [
  "video/webm;codecs=vp8",
  "video/webm;codecs=vp9",
  "video/webm;codecs=h264",
  "video/webm",
];
const RECORDING_AUTOSAVE_SEGMENT_MS = 1000;

const formatRecordingElapsed = (elapsedMs) => {
  const totalSeconds = Math.max(0, Math.floor((Number(elapsedMs) || 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const resolveSupportedRecorderMimeType = (stream) => {
  const hasAudioTrack = Boolean(stream?.getAudioTracks?.()?.length);
  const candidates = hasAudioTrack
    ? WHITEBOARD_RECORDING_WEBM_AUDIO_MIME_TYPES
    : WHITEBOARD_RECORDING_WEBM_VIDEO_ONLY_MIME_TYPES;

  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) || "";
};

const getRecordingFileExtension = (mimeType) => {
  const normalized = String(mimeType || "").toLowerCase();
  if (normalized.includes("mp4")) {
    return "mp4";
  }
  return "webm";
};

const drawBoardRecordingBackground = (ctx, width, height) => {
  ctx.fillStyle = "#fbfcfe";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "rgba(148, 163, 184, 0.3)";
  for (let y = 0; y <= height + 20; y += 40) {
    for (let x = 0; x <= width + 20; x += 40) {
      ctx.beginPath();
      ctx.arc(x + 10, y + 10, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

const drawPdfRecordingBackground = (ctx, width, height) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "rgba(239, 242, 247, 0.98)");
  gradient.addColorStop(1, "rgba(228, 232, 238, 0.98)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
};

const drawVisibleTextAreas = (ctx, surface, surfaceRect) => {
  const textAreas = surface.querySelectorAll("textarea");
  textAreas.forEach((node) => {
    const value = typeof node.value === "string" ? node.value : "";
    const placeholder = node.getAttribute("placeholder") || "";
    const text = value || placeholder;
    if (!text) {
      return;
    }

    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const x = rect.left - surfaceRect.left;
    const y = rect.top - surfaceRect.top;
    if (x >= surfaceRect.width || y >= surfaceRect.height || x + rect.width <= 0 || y + rect.height <= 0) {
      return;
    }

    const style = window.getComputedStyle(node);
    const fontSize = Number.parseFloat(style.fontSize) || 16;
    const lineHeight = Number.parseFloat(style.lineHeight) || fontSize * 1.25;
    const textAlign = style.textAlign === "center" ? "center" : style.textAlign === "right" ? "right" : "left";

    ctx.save();
    ctx.fillStyle = style.color || "#0f172a";
    ctx.font = `${style.fontWeight || 500} ${fontSize}px ${style.fontFamily || "sans-serif"}`;
    ctx.textBaseline = "top";
    ctx.textAlign = textAlign;
    const lines = text.split("\n");
    const baseX =
      textAlign === "center" ? x + rect.width / 2 : textAlign === "right" ? x + rect.width : x;
    lines.forEach((line, index) => {
      ctx.fillText(line || " ", baseX, y + index * lineHeight);
    });
    ctx.restore();
  });
};

const renderWhiteboardSurfaceToCanvas = (surface, targetCanvas, heartbeatValue = 0) => {
  if (!surface || !targetCanvas) {
    return false;
  }

  const surfaceRect = surface.getBoundingClientRect();
  const width = Math.max(1, Math.round(surface.clientWidth || surfaceRect.width || 0));
  const height = Math.max(1, Math.round(surface.clientHeight || surfaceRect.height || 0));
  if (!width || !height) {
    return false;
  }

  const pixelRatio = Math.min(2, window.devicePixelRatio || 1);
  const targetWidth = Math.round(width * pixelRatio);
  const targetHeight = Math.round(height * pixelRatio);
  if (targetCanvas.width !== targetWidth || targetCanvas.height !== targetHeight) {
    targetCanvas.width = targetWidth;
    targetCanvas.height = targetHeight;
  }

  const ctx = targetCanvas.getContext("2d");
  if (!ctx) {
    return false;
  }

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  if (surface.dataset.recordSurfaceType === "board") {
    drawBoardRecordingBackground(ctx, width, height);
  } else {
    drawPdfRecordingBackground(ctx, width, height);
  }

  const canvases = Array.from(surface.querySelectorAll("canvas"));
  canvases.forEach((canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }

    const x = rect.left - surfaceRect.left;
    const y = rect.top - surfaceRect.top;
    if (x >= width || y >= height || x + rect.width <= 0 || y + rect.height <= 0) {
      return;
    }

    try {
      ctx.drawImage(canvas, x, y, rect.width, rect.height);
    } catch (error) {
      console.error("Failed to draw whiteboard canvas frame", error);
    }
  });

  drawVisibleTextAreas(ctx, surface, surfaceRect);

  // Keep the captured canvas changing even when the board is visually static.
  ctx.save();
  ctx.globalAlpha = 0.02;
  ctx.fillStyle = heartbeatValue % 2 === 0 ? "#010101" : "#020202";
  ctx.fillRect(width - 2, height - 2, 1, 1);
  ctx.restore();
  return true;
};

// ─── Layout ───────────────────────────────────────────────────────────────────

const Overlay = styled.div`
  --call-bg: var(--background-color);
  --call-surface: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  --call-panel: color-mix(in srgb, var(--input-color) 90%, black 10%);
  --call-border: color-mix(in srgb, var(--border-color) 80%, transparent);
  --call-text: var(--text-color);
  --call-muted: var(--text-muted-color);
  --call-success: var(--success-color);
  --call-warning: var(--warning-color);
  --call-danger: var(--danger-color);
  --call-primary: var(--primary-color);
  position: fixed;
  inset: ${(p) => (p.$minimized ? "auto 20px 20px auto" : "0")};
  width: ${(p) => (p.$minimized ? "320px" : "auto")};
  height: ${(p) => (p.$minimized ? "180px" : "auto")};
  z-index: 10000;
  background: var(--call-bg);
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease-out;
  border-radius: ${(p) => (p.$minimized ? "18px" : "0")};
  border: ${(p) => (p.$minimized ? "1px solid var(--call-border)" : "none")};
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
  border: 1px solid var(--call-border);
  background: color-mix(in srgb, var(--call-surface) 74%, transparent);
  backdrop-filter: blur(10px);
  color: var(--call-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.16s ease, transform 0.16s ease;

  &:hover {
    background: color-mix(in srgb, var(--call-panel) 92%, transparent);
    transform: translateY(-1px);
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background: color-mix(in srgb, var(--call-bg) 78%, transparent);
  border-bottom: 1px solid var(--call-border);
  backdrop-filter: blur(10px);
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: calc(12px + env(safe-area-inset-top, 0px)) 14px 12px;
  }
`;

const CallInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;
const CallTitle = styled.span`
  color: var(--call-text);
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;
const CallSub = styled.span`
  color: var(--call-muted);
  font-size: 11px;
  font-family: monospace;
`;

const TopActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
`;

const TinyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 7px 13px;
  border-radius: 8px;
  border: 1px solid
    ${(p) =>
      p.$danger
        ? "color-mix(in srgb, var(--call-danger) 30%, transparent)"
        : "var(--call-border)"};
  background: ${(p) =>
    p.$danger
      ? "color-mix(in srgb, var(--call-danger) 10%, transparent)"
      : "color-mix(in srgb, var(--call-panel) 88%, transparent)"};
  color: ${(p) => (p.$danger ? "var(--call-danger)" : "var(--call-text)")};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  &:hover {
    background: ${(p) =>
      p.$danger
        ? "color-mix(in srgb, var(--call-danger) 18%, transparent)"
        : "color-mix(in srgb, var(--call-panel) 96%, transparent)"};
    color: ${(p) => (p.$danger ? "var(--call-danger)" : "var(--call-text)")};
  }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  box-sizing: border-box;
  padding-bottom: ${(p) => (p.$immersive ? "0" : "104px")};

  @media (max-width: 768px) {
    padding-bottom: ${(p) =>
      p.$immersive ? "0" : "calc(92px + env(safe-area-inset-bottom, 0px))"};
  }
`;

const PiPFrame = styled.div`
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 500px;
  background: var(--call-bg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MinimizedBody = styled.button`
  flex: 1;
  border: none;
  background: var(--call-surface);
  color: var(--call-text);
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const MiniTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const MiniMeta = styled.div`
  color: var(--call-muted);
  font-size: 12px;
  line-height: 1.5;
`;

const MiniActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MiniPreview = styled.div`
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--call-panel) 88%, black 12%);
`;

const MiniPreviewVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: black;
  transform: ${(props) => (props.$mirror ? "scaleX(-1)" : "none")};
`;

const MiniPreviewFallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: ${(props) => props.$bg || "#315f14"};
`;

const MiniPreviewAvatar = styled.div`
  width: 108px;
  height: 108px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.16);
  font-size: 56px;
  font-weight: 700;
  line-height: 1;
`;

const AudioLayer = styled.div`
  position: fixed;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
`;

const MiniOverlay = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.24) 0%,
    rgba(0, 0, 0, 0.08) 36%,
    rgba(0, 0, 0, 0.58) 100%
  );
`;

const PiPStage = styled.button`
  position: relative;
  flex: 1;
  min-height: 0;
  border: none;
  background: transparent;
  padding: 14px 18px 0;
  cursor: pointer;
`;

const PiPStageInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0;
  border-radius: 24px;
  overflow: hidden;
  background: #234f10;
`;

const PiPBottomControls = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 20px;
  background: rgba(22, 22, 24, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.3);
  margin: 12px 18px 18px;
  width: calc(100% - 36px);
  justify-content: center;
  z-index: 3;
`;

const PiPControlBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$danger
      ? "#d64a3a"
      : props.$off
        ? "rgba(247, 200, 204, 0.96)"
        : "rgba(54, 54, 56, 0.98)"};
  color: ${(props) => (props.$danger ? "white" : props.$off ? "#7b241f" : "#f5f5f5")};
  cursor: pointer;
`;

const PiPNameLabel = styled.div`
  position: absolute;
  left: 18px;
  bottom: 16px;
  z-index: 2;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
`;

// ─── Video Grid ───────────────────────────────────────────────────────────────

const VideoGrid = styled.div`
  flex: 1;
  display: grid;
  padding: 14px;
  gap: 10px;
  overflow: hidden;
  min-width: 0;
  min-height: 0;

  grid-template-columns: ${(p) =>
    p.$count <= 1 ? "minmax(0, 1fr)" : "repeat(2, minmax(0, 1fr))"};
  grid-template-rows: ${(p) =>
    p.$count <= 1
      ? "minmax(0, 1fr)"
      : `repeat(${Math.max(1, Math.ceil(p.$count / 2))}, minmax(0, 1fr))`};

  & > * {
    min-width: 0;
    min-height: 0;
  }

  ${(p) =>
    p.$count === 3 || p.$count === 5
      ? css`
          & > *:last-child {
            grid-column: 1 / span 2;
            width: min(100%, calc((100% - 10px) / 2));
            justify-self: center;
          }
        `
      : ""}
`;

const StageLayout = styled.div`
  flex: 1;
  display: grid;
  gap: ${(p) => (p.$whiteboardFullscreen ? "0" : "12px")};
  padding: ${(p) => (p.$whiteboardFullscreen ? "0" : "14px")};
  min-width: 0;
  min-height: 0;
  position: relative;
  grid-template-columns: ${(p) => {
    if (p.$mobile) return "minmax(0, 1fr)";
    if (p.$immersive) return "minmax(0, 1fr)";
    return "minmax(0, 1fr) minmax(220px, 0.3fr)";
  }};
  grid-template-rows: ${(p) =>
    p.$immersive && !p.$mobile ? "minmax(0, 1fr) auto" : "minmax(0, 1fr)"};
  overflow: hidden;

  @media (max-width: 768px) {
    ${(p) =>
      p.$whiteboardFullscreen
        ? css`
            position: fixed;
            inset: 0;
            z-index: 10040;
            width: 100vw;
            height: 100dvh;
            padding: 0;
            gap: 0;
            background: var(--call-bg);
          `
        : ""}
    padding-top: ${(p) =>
      p.$whiteboardFullscreen ? "0" : p.$mobileCompactCount > 0 ? "132px" : "14px"};
  }
`;

const StageMain = styled.div`
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border-radius: ${(p) => (p.$whiteboardFullscreen ? "0" : "18px")};
  background: ${(p) =>
    p.$whiteboardFullscreen
      ? "transparent"
      : "color-mix(in srgb, var(--call-surface) 92%, black 8%)"};
  border: ${(p) => (p.$whiteboardFullscreen ? "none" : "1px solid var(--call-border)")};
  padding: ${(p) => (p.$immersive ? "0" : "4px")};
  box-sizing: border-box;
`;

const StageRail = styled.div`
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StageRailGrid = styled.div`
  flex: ${(p) => (p.$immersive && !p.$mobile ? "0" : "1")};
  min-height: 0;
  overflow-x: ${(p) => (p.$immersive && !p.$mobile ? "auto" : "hidden")};
  overflow-y: ${(p) => (p.$immersive && !p.$mobile ? "hidden" : "auto")};
  display: grid;
  gap: 10px;
  align-content: start;
  grid-template-columns: ${(p) => {
    if (p.$mobile && p.$immersive) return "1fr";
    if (p.$mobile) return "repeat(2, minmax(0, 1fr))";
    return p.$immersive ? "unset" : "1fr";
  }};
  grid-template-rows: ${(p) =>
    p.$immersive && !p.$mobile ? "minmax(0, 1fr)" : "unset"};
  grid-auto-flow: ${(p) => (p.$immersive && !p.$mobile ? "column" : "row")};
  grid-auto-columns: ${(p) =>
    p.$immersive && !p.$mobile ? "minmax(180px, 220px)" : "auto"};
  grid-auto-rows: ${(p) => (p.$immersive ? "minmax(120px, 1fr)" : "minmax(132px, 1fr)")};
  padding-right: ${(p) => (p.$mobile && !p.$immersive ? "0" : "4px")};
  padding-bottom: ${(p) => (p.$immersive && !p.$mobile ? "4px" : "0")};
`;

const StageRailLabel = styled.div`
  color: var(--call-muted);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 10px;
  padding-left: 4px;
`;

const MobileImmersiveRail = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  width: min(28vw, 122px);
  max-height: calc(100% - 36px);
  display: grid;
  gap: 8px;
  overflow: auto;
  z-index: 7;
`;

const MobileTopRail = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  z-index: 8;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 8px;
  align-items: stretch;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 2px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MobileTopRailTile = styled.div`
  width: min(42vw, 164px);
  min-width: min(42vw, 164px);
  height: min(24vw, 112px);
  min-height: 76px;
`;

const StageActions = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 8;
  display: flex;
  gap: 8px;
`;

const StageActionBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.58);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.16s ease, background 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(0, 0, 0, 0.72);
  }
`;

const VideoTile = styled.div`
  position: relative;
  border-radius: ${(p) => (p.$compact ? "20px" : "14px")};
  overflow: hidden;
  background: var(--call-panel);
  min-width: 0;
  min-height: 0;
  height: 100%;
  isolation: isolate;
  border: 2px solid
    ${(p) =>
      p.$isLocal
        ? "color-mix(in srgb, var(--call-primary) 44%, transparent)"
        : "var(--call-border)"};
  box-shadow: ${(p) =>
    p.$active ? "0 0 0 1px rgba(255,255,255,0.12), 0 18px 36px rgba(0,0,0,0.24)" : "none"};
  cursor: ${(p) => (p.$clickable ? "pointer" : "default")};
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: ${(p) => (p.$clickable ? "translateY(-1px)" : "none")};
    border-color: ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--call-primary) 78%, white 6%)"
        : "color-mix(in srgb, var(--call-primary) 42%, transparent)"};
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: ${(p) => {
      if (p.$screenShare) return "contain";
      if (p.$compact) return "cover";
      return p.$mobile ? "contain" : "cover";
    }};
    display: block;
    transform: ${(p) => (p.$mirror ? "scaleX(-1)" : "none")};
    background: ${(p) =>
      p.$screenShare
        ? "color-mix(in srgb, var(--call-surface) 94%, black 6%)"
        : "black"};
  }
`;

const TileLabel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  color: white;
  font-size: ${(p) => (p.$compact ? "11px" : "12px")};
  font-weight: 600;
  padding: ${(p) => (p.$compact ? "4px 8px" : "3px 10px")};
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: calc(100% - 20px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoCamera = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${(p) => (p.$compact ? "76px" : "120px")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: ${(p) => p.$bg || "#315f14"};
`;

const Avatar = styled.div`
  width: ${(p) => (p.$compact ? "44px" : "60px")};
  height: ${(p) => (p.$compact ? "44px" : "60px")};
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(p) => (p.$compact ? "20px" : "26px")};
  font-weight: 700;
  color: #fff;
`;

const TileMuteBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(32, 72, 10, 0.76);
  color: #d6f0a0;
  z-index: 3;
`;

// ─── Waiting Room Panel ───────────────────────────────────────────────────────

const WaitingBackdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10030;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const WaitingPanel = styled.div`
  width: min(520px, 100%);
  max-height: min(78dvh, 720px);
  background: color-mix(in srgb, var(--call-surface) 96%, transparent);
  border: 1px solid var(--call-border);
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.34);
  animation: ${slideIn} 0.2s ease;
`;

const PanelHead = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid var(--call-border);
  background: color-mix(in srgb, var(--call-panel) 92%, transparent);
  color: var(--call-text);
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
  -webkit-overflow-scrolling: touch;
`;

const PrivacyRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px 14px;
  border-bottom: 1px solid color-mix(in srgb, var(--call-border) 82%, transparent);
  margin-bottom: 10px;
`;

const PrivacyMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    color: var(--call-text);
    font-size: 13px;
  }

  span {
    color: var(--call-muted);
    font-size: 12px;
    line-height: 1.4;
  }
`;

const PrivacyToggle = styled.button`
  position: relative;
  width: 52px;
  height: 30px;
  border: none;
  border-radius: 999px;
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--warning-color) 72%, black 8%)"
      : "color-mix(in srgb, var(--call-border) 82%, transparent)"};
  cursor: pointer;
  transition: background 0.18s ease, opacity 0.18s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${(props) => (props.$active ? "25px" : "3px")};
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: white;
    transition: left 0.18s ease;
  }
`;

const KnockCard = styled.div`
  background: color-mix(in srgb, var(--call-panel) 88%, transparent);
  border: 1px solid var(--call-border);
  border-radius: 10px;
  padding: 12px;
  animation: ${slideIn} 0.2s ease;
`;

const KnockName = styled.div`
  color: var(--call-text);
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
      ? `background: color-mix(in srgb, var(--call-success) 14%, transparent); color: var(--call-success); border: 1px solid color-mix(in srgb, var(--call-success) 30%, transparent); &:hover { background: color-mix(in srgb, var(--call-success) 24%, transparent); }`
      : `background: color-mix(in srgb, var(--call-danger) 12%, transparent); color: var(--call-danger); border: 1px solid color-mix(in srgb, var(--call-danger) 25%, transparent); &:hover { background: color-mix(in srgb, var(--call-danger) 22%, transparent); }`}
`;

const EmptyWaiting = styled.div`
  text-align: center;
  color: var(--call-muted);
  font-size: 13px;
  padding: 28px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  transition: background 0.12s;
  &:hover {
    background: color-mix(in srgb, var(--call-panel) 88%, transparent);
  }
`;

const MemberAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--call-panel);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--call-text);
`;

const MemberInfo = styled.div`
  flex: 1;
  min-width: 0;
  color: var(--call-text);
  font-size: 13px;
  font-weight: 500;
  display: grid;
  gap: 6px;
`;

const MemberName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MemberIcons = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
  color: var(--call-muted);
  flex-shrink: 0;
`;

const MemberActionBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid
    ${(props) =>
      props.$danger
        ? "color-mix(in srgb, var(--call-danger) 32%, transparent)"
        : props.$success
          ? "color-mix(in srgb, var(--call-success) 32%, transparent)"
          : "var(--call-border)"};
  background: ${(props) =>
    props.$danger
      ? "color-mix(in srgb, var(--call-danger) 14%, transparent)"
      : props.$success
        ? "color-mix(in srgb, var(--call-success) 14%, transparent)"
        : "color-mix(in srgb, var(--call-panel) 92%, transparent)"};
  color: ${(props) =>
    props.$danger
      ? "var(--call-danger)"
      : props.$success
        ? "var(--call-success)"
        : "var(--call-text)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.16s ease, background 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${(props) =>
      props.$danger
        ? "color-mix(in srgb, var(--call-danger) 20%, transparent)"
        : props.$success
          ? "color-mix(in srgb, var(--call-success) 20%, transparent)"
          : "color-mix(in srgb, var(--call-panel) 100%, transparent)"};
  }
`;

const SectionLabel = styled.div`
  color: var(--call-muted);
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
  background: var(--call-danger);
  color: white;
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
  color: var(--call-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s;
  &:hover {
    color: var(--call-text);
  }
`;

// ─── Controls ─────────────────────────────────────────────────────────────────

const ControlBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: max-content;
  max-width: calc(100% - 24px);
  padding: 12px 24px;
  background: rgba(24, 24, 27, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 30px;
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.32);
  flex-shrink: 0;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  pointer-events: auto;
  transition: transform 0.22s ease, opacity 0.22s ease;
  transform: translateY(${(p) => (p.$collapsed ? "calc(100% + 24px)" : "0")});
  opacity: ${(p) => (p.$collapsed ? 0 : 1)};
  pointer-events: ${(p) => (p.$collapsed ? "none" : "auto")};

  @media (max-width: 768px) {
    gap: 10px;
    max-width: calc(100% - 16px);
    padding: 10px 18px;
    border-radius: 24px;
    bottom: calc(10px + env(safe-area-inset-bottom, 0px));
  }

  @media (max-width: 420px) {
    gap: 8px;
    padding: 8px 14px;
    max-width: calc(100% - 12px);
    border-radius: 22px;
  }
`;

const ControlBarDock = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(14px + env(safe-area-inset-bottom, 0px));
  transform: translateX(-50%);
  z-index: 10060;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: max-content;
  max-width: calc(100% - 24px);
  pointer-events: none;

  @media (max-width: 768px) {
    bottom: calc(10px + env(safe-area-inset-bottom, 0px));
    max-width: calc(100% - 16px);
  }

  @media (max-width: 420px) {
    max-width: calc(100% - 12px);
  }
`;

const ControlBarToggle = styled.button`
  pointer-events: auto;
  width: 48px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(24, 24, 27, 0.92);
  color: #f5f5f5;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;
  order: 2;

  &:hover {
    transform: translateY(-1px);
    background: rgba(32, 32, 35, 0.96);
  }
`;

const CtrlBtn = styled.button`
  width: ${(p) => (p.$danger ? "92px" : "62px")};
  height: 58px;
  border-radius: ${(p) => (p.$danger ? "22px" : "20px")};
  border: 1px solid
    ${(p) =>
      p.$danger
        ? "rgba(255,255,255,0.06)"
        : p.$state === "off"
          ? "rgba(244, 114, 182, 0.16)"
          : p.$state === "accent"
            ? "rgba(250, 166, 26, 0.18)"
            : "rgba(255,255,255,0.06)"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  position: relative;
  flex-shrink: 0;
  ${(p) =>
    p.$danger
      ? `background: #d64a3a; color: white; &:hover { background: #c63f30; transform: translateY(-1px); }`
      : p.$state === "off"
        ? `background: rgba(247, 200, 204, 0.96); color: #7b241f; &:hover { background: rgba(248, 214, 217, 1); transform: translateY(-1px); }`
        : p.$state === "accent"
          ? `background: rgba(54, 54, 56, 0.98); color: #faa61a; &:hover { background: rgba(66, 66, 68, 1); transform: translateY(-1px); }`
          : `background: rgba(54, 54, 56, 0.98); color: #f5f5f5; &:hover { background: rgba(66, 66, 68, 1); transform: translateY(-1px); }`}

  @media (max-width: 480px) {
    width: ${(p) => (p.$danger ? "84px" : "58px")};
    height: 54px;
    border-radius: ${(p) => (p.$danger ? "20px" : "18px")};

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 420px) {
    width: ${(p) => (p.$danger ? "76px" : "52px")};
    height: 48px;
    border-radius: ${(p) => (p.$danger ? "18px" : "16px")};

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const ControlDivider = styled.div`
  width: 1px;
  height: 34px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  flex-shrink: 0;

  @media (max-width: 420px) {
    height: 28px;
  }
`;

const CenterBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: var(--call-muted);
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
  opacity: ${(p) => (p.$visible ? 1 : 0)};
  transition: opacity 0.15s;
  z-index: 5;
  &:hover {
    background: rgba(114, 137, 218, 0.7);
  }

  @media (max-width: 768px) {
    opacity: 1;
  }
`;

const VideoEl = ({
  stream,
  muted = false,
  isLocal = false,
  label,
  isCamOn = true,
  hasVideo = false,
  hasAudio = false,
  isScreenShare = false,
  canFullscreen = false,
  isFullscreen = false,
  onToggleFullscreen,
  onSelect,
  isActive = false,
  compact = false,
  handRaised = false,
  isMobile = false,
}) => {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !stream || !isCamOn) return undefined;

    if (node.srcObject !== stream) {
      node.srcObject = stream;
    }

    let cancelled = false;
    let retryTimeoutId = null;

    const ensurePlayback = () => {
      if (cancelled || !ref.current) return;

      const playPromise = ref.current.play?.();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          if (cancelled) return;
          retryTimeoutId = window.setTimeout(() => {
            ensurePlayback();
          }, 180);
        });
      }
    };

    const handleReady = () => {
      ensurePlayback();
    };

    node.onloadedmetadata = handleReady;
    node.oncanplay = handleReady;
    ensurePlayback();

    return () => {
      cancelled = true;
      if (retryTimeoutId) {
        window.clearTimeout(retryTimeoutId);
      }
      if (node) {
        node.onloadedmetadata = null;
        node.oncanplay = null;
      }
    };
  }, [isCamOn, stream]);

  const handleTileClick = useCallback(() => {
    onSelect?.();
  }, [onSelect]);

  const handleToggleFullscreen = useCallback(
    (event) => {
      event.stopPropagation();
      onToggleFullscreen?.();
    },
    [onToggleFullscreen],
  );
  const hasRenderableVideo = Boolean(stream) && Boolean(hasVideo) && Boolean(isCamOn);
  const fallbackBg = "#315f14";

  return (
    <VideoTile
      $isLocal={isLocal}
      $compact={compact}
      $mobile={isMobile}
      $mirror={isLocal && !isScreenShare}
      $screenShare={isScreenShare}
      $active={isActive}
      $clickable={Boolean(onSelect)}
      onClick={handleTileClick}
    >
      {canFullscreen ? (
        <FullscreenBtn
          type="button"
          $visible={isActive || compact}
          onClick={handleToggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen tile" : "Fullscreen tile"}
        >
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize size={14} />}
        </FullscreenBtn>
      ) : null}
      {handRaised ? (
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
      ) : null}
      {hasRenderableVideo ? (
        <video ref={ref} autoPlay playsInline muted />
      ) : (
        <NoCamera $compact={compact} $bg={fallbackBg}>
          {!hasAudio ? (
            <TileMuteBadge>
              <MicOff size={18} />
            </TileMuteBadge>
          ) : null}
          <Avatar $compact={compact}>{label?.charAt(0)?.toUpperCase() || "?"}</Avatar>
        </NoCamera>
      )}
      <TileLabel $compact={compact}>
        {!isCamOn && !isScreenShare && <VideoOff size={11} />}
        {label}
        {isLocal && t("groupCall.localSuffix")}
      </TileLabel>
    </VideoTile>
  );
};

const HiddenAudioEl = ({ stream }) => {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !stream) return undefined;

    if (node.srcObject !== stream) {
      node.srcObject = stream;
    }

    let cancelled = false;
    let retryTimeoutId = null;

    const ensurePlayback = () => {
      if (cancelled || !ref.current) return;

      const playPromise = ref.current.play?.();
      if (playPromise?.catch) {
        playPromise.catch(() => {
          if (cancelled) return;
          retryTimeoutId = window.setTimeout(() => {
            ensurePlayback();
          }, 220);
        });
      }
    };

    node.onloadedmetadata = ensurePlayback;
    node.oncanplay = ensurePlayback;
    ensurePlayback();

    return () => {
      cancelled = true;
      if (retryTimeoutId) {
        window.clearTimeout(retryTimeoutId);
      }
      if (node) {
        node.onloadedmetadata = null;
        node.oncanplay = null;
        node.srcObject = null;
      }
    };
  }, [stream]);

  return <audio ref={ref} autoPlay playsInline />;
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
  displayName: preferredDisplayName,
  isCreator = true,
  isPrivate = false,
  initialMicOn = true,
  initialCamOn = true,
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedTileId, setSelectedTileId] = useState(null);
  const [fullscreenTileId, setFullscreenTileId] = useState(null);
  const [isControlBarCollapsed, setIsControlBarCollapsed] = useState(false);
  const [lastSpeakerPeerId, setLastSpeakerPeerId] = useState(null);
  const [pipWindow, setPipWindow] = useState(null);
  const [pipContainer, setPipContainer] = useState(null);
  const pipCloseIntentRef = useRef(false);
  const whiteboardWasActiveRef = useRef(false);
  const [viewport, setViewport] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 720,
  }));

  const currentUser = useAuthStore((state) => state.user);
  const updateActiveCall = useMeetCallStore((state) => state.updateActiveCall);

  const displayName =
    preferredDisplayName?.trim() ||
    currentUser?.nickname ||
    currentUser?.username ||
    t("groupCall.guest");

  const {
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
    switchCamera,
    leaveCall,
    error,
    roomTitle,
    roomIsPrivate,
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
    setRoomPrivacy,
    networkQuality,
    qualityProfile,
    whiteboardState,
    toggleWhiteboard,
    clearWhiteboard,
    clearWhiteboardPage,
    undoWhiteboard,
    redoWhiteboard,
    setWhiteboardActiveTab,
    uploadWhiteboardPdf,
    addWhiteboardPdfTab,
    removeWhiteboardTab,
    syncWhiteboardPdfViewport,
    syncWhiteboardBoardZoom,
    startWhiteboardStroke,
    appendWhiteboardStroke,
    removeWhiteboardStroke,
    updateWhiteboardStroke,
    canSwitchCamera,
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

  const [privacyUpdating, setPrivacyUpdating] = useState(false);
  const [whiteboardTool, setWhiteboardTool] = useState(WHITEBOARD_DEFAULT_TOOL);
  const [whiteboardColor, setWhiteboardColor] = useState(
    WHITEBOARD_DEFAULT_COLOR,
  );
  const [whiteboardFillColor, setWhiteboardFillColor] = useState(
    WHITEBOARD_DEFAULT_FILL_COLOR,
  );
  const [whiteboardShapeEdge, setWhiteboardShapeEdge] = useState(
    WHITEBOARD_DEFAULT_SHAPE_EDGE,
  );
  const [whiteboardBrushSize, setWhiteboardBrushSize] = useState(
    WHITEBOARD_DEFAULT_BRUSH_SIZE,
  );
  const [whiteboardTextFontFamily, setWhiteboardTextFontFamily] = useState(
    WHITEBOARD_DEFAULT_TEXT_FONT_FAMILY,
  );
  const [whiteboardTextSize, setWhiteboardTextSize] = useState(
    WHITEBOARD_DEFAULT_TEXT_SIZE,
  );
  const [whiteboardTextAlign, setWhiteboardTextAlign] = useState(
    WHITEBOARD_DEFAULT_TEXT_ALIGN,
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updateActiveCall?.({ isPrivate: roomIsPrivate });
  }, [roomIsPrivate, updateActiveCall]);

  const handleToggleRoomPrivacy = useCallback(async () => {
    if (!isCreator || privacyUpdating) return;

    const nextIsPrivate = !roomIsPrivate;
    setPrivacyUpdating(true);
    setRoomPrivacy(nextIsPrivate);
    updateActiveCall?.({ isPrivate: nextIsPrivate });

    try {
      await updateMeetPrivacy(roomId, nextIsPrivate);
      toast.success(
        nextIsPrivate
          ? "Endi kirish tasdiq bilan bo'ladi"
          : "Endi kirish tasdiqsiz bo'ladi",
      );
    } catch (error) {
      setRoomPrivacy(!nextIsPrivate);
      updateActiveCall?.({ isPrivate: !nextIsPrivate });
      toast.error("Meet kirish sozlamasini saqlab bo'lmadi");
    } finally {
      setPrivacyUpdating(false);
    }
  }, [
    isCreator,
    privacyUpdating,
    roomIsPrivate,
    roomId,
    setRoomPrivacy,
    updateActiveCall,
  ]);

  const isWhiteboardActive = whiteboardState.isActive;
  const whiteboardOwnerName =
    whiteboardState.ownerDisplayName || t("groupCall.guest");
  const whiteboardLabel = t("groupCall.whiteboard.sharedBy", {
    name: whiteboardOwnerName,
  });

  const handleWhiteboardTopAction = useCallback(() => {
    if (!isCreator) {
      if (isWhiteboardActive) {
        setSelectedTileId("whiteboard");
        setFullscreenTileId(null);
      }
      return;
    }

    const success = toggleWhiteboard();
    if (!success) {
      toast.error(t("groupCall.whiteboard.toggleFailed"));
      return;
    }

    if (!isWhiteboardActive) {
      setSelectedTileId("whiteboard");
      setFullscreenTileId(null);
      return;
    }

    setSelectedTileId((current) => (current === "whiteboard" ? null : current));
    setFullscreenTileId((current) => (current === "whiteboard" ? null : current));
  }, [isCreator, isWhiteboardActive, t, toggleWhiteboard]);

  // ─── Recording logic ─────────────────────────────────────────────────────────
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordScreenStreamRef = useRef(null);
  const [isWhiteboardRecording, setIsWhiteboardRecording] = useState(false);
  const [whiteboardRecordingElapsedMs, setWhiteboardRecordingElapsedMs] = useState(0);
  const [whiteboardRecordingSurfaceReady, setWhiteboardRecordingSurfaceReady] = useState(false);
  const whiteboardSurfaceRef = useRef(null);
  const whiteboardSurfaceTypeRef = useRef("board");
  const whiteboardRecorderRef = useRef(null);
  const whiteboardRecordCanvasRef = useRef(null);
  const whiteboardRecordCanvasHostRef = useRef(null);
  const whiteboardRecordStreamRef = useRef(null);
  const whiteboardRecordVideoTrackRef = useRef(null);
  const whiteboardLocalRecordingAudioTracksRef = useRef([]);
  const whiteboardRecordHeartbeatRef = useRef(0);
  const whiteboardAudioContextRef = useRef(null);
  const whiteboardRenderFrameRef = useRef(0);
  const whiteboardRecordingStartedAtRef = useRef(0);
  const meetRecordingStartedAtRef = useRef(0);
  const meetRecordingAudioContextRef = useRef(null);
  const meetRecordingAudioStreamRef = useRef(null);
  const whiteboardRecordingSessionRef = useRef(null);
  const meetRecordingSessionRef = useRef(null);
  const whiteboardStopPromiseRef = useRef(null);
  const meetStopPromiseRef = useRef(null);

  const resolveRecordingApiBaseUrl = useCallback(() => {
    const windowOrigin = typeof window !== "undefined" ? window.location.origin : "";
    return API_BASE_URL || windowOrigin;
  }, []);

  const resolveRecordingAppBaseUrl = useCallback(() => {
    const windowOrigin = typeof window !== "undefined" ? window.location.origin : "";
    return RESOLVED_APP_BASE_URL || windowOrigin;
  }, []);

  const wait = useCallback(
    (ms) =>
      new Promise((resolve) => {
        window.setTimeout(resolve, ms);
      }),
    [],
  );

  const waitForRecorderDrain = useCallback(
    async (sessionRef, idleMs = 350, timeoutMs = 5000) => {
      const startedAt = Date.now();
      let lastKnownIndex = sessionRef.current?.nextChunkIndex ?? 0;
      let stableSince = Date.now();

      while (Date.now() - startedAt < timeoutMs) {
        await wait(80);
        const transport = sessionRef.current;
        const currentIndex = transport?.nextChunkIndex ?? 0;

        if (currentIndex !== lastKnownIndex) {
          lastKnownIndex = currentIndex;
          stableSince = Date.now();
          continue;
        }

        if (Date.now() - stableSince >= idleMs) {
          return;
        }
      }
    },
    [wait],
  );

  const stopRecorderWithFlush = useCallback(
    async (recorder, { stopTracks } = {}) => {
      if (!recorder) {
        stopTracks?.();
        return;
      }

      if (recorder.state === "inactive") {
        stopTracks?.();
        return;
      }

      await new Promise((resolve) => {
        let settled = false;
        let quietTimerId = 0;
        let hardTimeoutId = 0;
        let stopSeen = false;
        let capturedStopEvent = null;
        let capturedErrorEvent = null;

        const previousOnDataAvailable = recorder.ondataavailable;
        const previousOnStop = recorder.onstop;
        const previousOnError = recorder.onerror;

        const cleanup = () => {
          window.clearTimeout(quietTimerId);
          window.clearTimeout(hardTimeoutId);
          recorder.ondataavailable = previousOnDataAvailable;
          recorder.onstop = previousOnStop;
          recorder.onerror = previousOnError;
        };

        const finish = () => {
          if (settled) {
            return;
          }
          settled = true;
          if (capturedErrorEvent) {
            previousOnError?.(capturedErrorEvent);
          }
          if (capturedStopEvent) {
            previousOnStop?.(capturedStopEvent);
          }
          cleanup();
          stopTracks?.();
          resolve();
        };

        const scheduleFinish = (delay = 450) => {
          window.clearTimeout(quietTimerId);
          quietTimerId = window.setTimeout(() => {
            if (stopSeen || recorder.state === "inactive") {
              finish();
            }
          }, delay);
        };

        recorder.ondataavailable = (event) => {
          previousOnDataAvailable?.(event);
          if (event?.data?.size > 0) {
            scheduleFinish(2200);
          }
        };

        recorder.onstop = (event) => {
          capturedStopEvent = event;
          stopSeen = true;
          scheduleFinish(2200);
        };

        recorder.onerror = (event) => {
          capturedErrorEvent = event;
          stopSeen = true;
          scheduleFinish(100);
        };

        hardTimeoutId = window.setTimeout(() => {
          finish();
        }, 5000);

        const stopRecorder = () => {
          try {
            recorder.stop();
          } catch (error) {
            console.error("Failed to stop recorder:", error);
            stopSeen = true;
            scheduleFinish(100);
          }
        };

        try {
          recorder.requestData?.();
          window.setTimeout(() => {
            try {
              recorder.requestData?.();
            } catch (error) {
              console.error("Failed to request final recorder chunk before stop:", error);
            }
          }, 180);
          window.setTimeout(stopRecorder, 360);
        } catch (error) {
          console.error("Failed to flush recorder before stop:", error);
          stopRecorder();
        }
      });
    },
    [],
  );

  const createServerRecordingTransport = useCallback(
    async (kind, mimeType, filename) => {
      const session = await createRecordingSession({
        kind,
        roomId,
        mimeType: mimeType || "video/webm",
        filename,
        apiBaseUrl: resolveRecordingApiBaseUrl(),
        appBaseUrl: resolveRecordingAppBaseUrl(),
      });

      return {
        sessionId: session.sessionId,
        kind,
        nextChunkIndex: 0,
        uploadQueue: Promise.resolve(),
        uploadError: null,
        uploadedChunkCount: 0,
        capturedChunks: [],
        failureHandled: false,
        stopRequested: false,
        loopPromise: null,
      };
    },
    [resolveRecordingApiBaseUrl, resolveRecordingAppBaseUrl, roomId],
  );

  const createSafeRecorder = useCallback((stream, options = {}) => {
    const preferredMimeType = String(options?.preferredMimeType || "").trim();
    let recorder = null;
    let selectedMimeType = "";

    try {
      if (preferredMimeType && MediaRecorder.isTypeSupported(preferredMimeType)) {
        selectedMimeType = preferredMimeType;
        recorder = new MediaRecorder(stream, { mimeType: selectedMimeType });
      }
    } catch (preferredMimeError) {
      console.error("Failed to create recorder with preferred mime type:", preferredMimeError);
      recorder = null;
      selectedMimeType = "";
    }

    if (!recorder) {
      try {
        recorder = new MediaRecorder(stream);
      } catch (defaultError) {
        selectedMimeType = resolveSupportedRecorderMimeType(stream);
        if (!selectedMimeType) {
          throw defaultError;
        }
        recorder = new MediaRecorder(stream, { mimeType: selectedMimeType });
      }
    }

    const actualMimeType = String(
      recorder?.mimeType || selectedMimeType || "video/webm",
    ).toLowerCase();

    return {
      recorder,
      mimeType: actualMimeType,
      fileExtension: getRecordingFileExtension(actualMimeType),
    };
  }, []);

  const uploadRecordingChunkWithRetry = useCallback(
    async (sessionId, chunkIndex, blob) => {
      let attempt = 0;
      let lastError = null;

      while (attempt < 6) {
        try {
          await uploadRecordingChunk({
            sessionId,
            chunkIndex,
            blob,
            extension: getRecordingFileExtension(blob?.type),
          });
          return;
        } catch (error) {
          lastError = error;
          attempt += 1;

          const statusCode = Number(error?.response?.status || 0);
          const shouldRetry = !statusCode;

          if (attempt >= 6 || !shouldRetry) {
            break;
          }
          await wait(Math.min(6000, attempt * 1000));
        }
      }

      throw lastError || new Error("Recording chunk upload failed");
    },
    [wait],
  );

  const enqueueRecordingChunkUpload = useCallback(
    (sessionRef, blob) => {
      const transport = sessionRef.current;
      if (!transport || !blob || blob.size <= 0) {
        return Promise.resolve();
      }

      const chunkIndex = transport.nextChunkIndex;
      transport.nextChunkIndex += 1;
      const previousQueue = transport.uploadQueue || Promise.resolve();

      transport.uploadQueue = previousQueue
        .catch(() => undefined)
        .then(async () => {
          await uploadRecordingChunkWithRetry(transport.sessionId, chunkIndex, blob);
          transport.uploadError = null;
          transport.uploadedChunkCount = (transport.uploadedChunkCount || 0) + 1;
        })
        .catch((error) => {
          transport.uploadError = error;
          if (!transport.failureHandled) {
            transport.failureHandled = true;
            transport.stopRequested = true;

            if (transport.kind === "whiteboard") {
              setIsWhiteboardRecording(false);
              setWhiteboardRecordingElapsedMs(0);
              if (whiteboardRecorderRef.current?.state !== "inactive") {
                try {
                  whiteboardRecorderRef.current.stop();
                } catch (stopError) {
                  console.error("Failed to stop whiteboard recorder after chunk upload error:", stopError);
                }
              }
              toast.error(t("groupCall.whiteboard.recordFailed"));
            } else {
              setIsRecording(false);
              emitRecording(false);
              if (mediaRecorderRef.current?.state !== "inactive") {
                try {
                  mediaRecorderRef.current.stop();
                } catch (stopError) {
                  console.error("Failed to stop meet recorder after chunk upload error:", stopError);
                }
              }
              toast.error(t("groupCall.meetRecordingFinalizeFailed"));
            }
          }
          throw error;
        });

      return transport.uploadQueue;
    },
    [emitRecording, t, uploadRecordingChunkWithRetry],
  );

  const awaitRecordingUploadQueue = useCallback(
    async (sessionRef, timeoutMs = 60_000) => {
      const transport = sessionRef.current;
      if (!transport?.uploadQueue) {
        return;
      }

      let timeoutId;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = window.setTimeout(() => {
          reject(new Error("Recording upload queue timed out"));
        }, timeoutMs);
      });

      try {
        await Promise.race([transport.uploadQueue, timeoutPromise]);
        if (transport.uploadError) {
          throw transport.uploadError;
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    },
    [],
  );

  const finalizeServerRecording = useCallback(
    async (sessionRef, { durationMs = 0, kind, ignoreUploadError = false, silentSuccess = false } = {}) => {
      const transport = sessionRef.current;
      if (!transport?.sessionId) {
        return { ok: false, skipped: true };
      }

      try {
        if (ignoreUploadError) {
          await Promise.resolve(transport.uploadQueue).catch(() => undefined);
        } else {
          await awaitRecordingUploadQueue(sessionRef);
        }

        if (!transport.uploadedChunkCount || transport.uploadedChunkCount <= 0) {
          throw new Error("Recording chunklari yaratilmadi");
        }

        const result = await finishRecordingSession({
          sessionId: transport.sessionId,
          durationMs,
        });
        if (!result?.ok) {
          throw new Error(result?.lastError || "Recording finalize failed");
        }
        if (!silentSuccess) {
          toast.success(
            kind === "meet"
              ? t("groupCall.meetRecordingSavedToSavedMessages")
              : t("groupCall.whiteboard.recordingSavedToSavedMessages"),
          );
        }
        return { ok: true };
      } catch (error) {
        console.error("Failed to finalize server recording:", error);
        if (!silentSuccess) {
          toast.error(
            kind === "meet"
              ? t("groupCall.meetRecordingFinalizeFailed")
              : t("groupCall.whiteboard.recordingFinalizeFailed"),
          );
        }
        return { ok: false, error };
      } finally {
        sessionRef.current = null;
      }
    },
    [awaitRecordingUploadQueue, t],
  );

  const cleanupMeetRecordingTransport = useCallback(() => {
    if (recordScreenStreamRef.current) {
      recordScreenStreamRef.current.getTracks().forEach((track) => track.stop());
      recordScreenStreamRef.current = null;
    }

    if (meetRecordingAudioStreamRef.current) {
      meetRecordingAudioStreamRef.current.getTracks().forEach((track) => track.stop());
      meetRecordingAudioStreamRef.current = null;
    }

    if (meetRecordingAudioContextRef.current) {
      meetRecordingAudioContextRef.current.close().catch(() => {});
      meetRecordingAudioContextRef.current = null;
    }
  }, []);

  const startStreamingRecording = useCallback(
    ({
      sessionRef,
      kind,
      recorderRef,
      recorder,
      cleanupTransport,
      onRecordingStop,
      getDurationMs,
    }) => {
      const transport = sessionRef.current;
      if (!transport || !recorder) {
        return Promise.resolve();
      }

      const loopPromise = new Promise((resolve) => {
        let finalized = false;

        const finish = async () => {
          if (finalized) {
            return;
          }
          finalized = true;

          try {
            const hasAnyChunk =
              (transport.nextChunkIndex || 0) > 0 ||
              (transport.uploadedChunkCount || 0) > 0 ||
              (transport.capturedChunks?.length || 0) > 0;

            if (hasAnyChunk) {
              await finalizeServerRecording(sessionRef, {
                durationMs: getDurationMs?.() || 0,
                kind,
                ignoreUploadError: Boolean(transport.failureHandled),
                silentSuccess: Boolean(transport.failureHandled),
              });
            } else if (transport.failureHandled) {
              sessionRef.current = null;
            } else {
              throw new Error("Recording chunklari yaratilmadi");
            }
          } catch (error) {
            console.error(`Failed during ${kind} recording finalization:`, error);
            if (!transport.failureHandled) {
              transport.failureHandled = true;
              toast.error(
                kind === "meet"
                  ? t("groupCall.meetRecordingFinalizeFailed")
                  : t("groupCall.whiteboard.recordFailed"),
              );
            }

            if ((transport.uploadedChunkCount || 0) > 0) {
              await finalizeServerRecording(sessionRef, {
                durationMs: getDurationMs?.() || 0,
                kind,
                ignoreUploadError: true,
                silentSuccess: true,
              }).catch(() => undefined);
            } else {
              sessionRef.current = null;
            }
          } finally {
            cleanupTransport?.();
            recorderRef.current = null;
            onRecordingStop?.();
            resolve();
          }
        };

        recorder.ondataavailable = (event) => {
          if (event?.data?.size > 0 && !transport.failureHandled) {
            transport.capturedChunks = transport.capturedChunks || [];
            transport.capturedChunks.push({
              size: event.data.size,
              type: event.data.type || recorder.mimeType || "",
              capturedAt: Date.now(),
            });
            void enqueueRecordingChunkUpload(sessionRef, event.data);
          }
        };

        recorder.onerror = (event) => {
          console.error(`Streaming ${kind} recorder failed:`, event);
          if (!transport.failureHandled) {
            transport.failureHandled = true;
            transport.stopRequested = true;
            toast.error(
              kind === "meet"
                ? t("groupCall.meetRecordingFinalizeFailed")
                : t("groupCall.whiteboard.recordFailed"),
            );
          }

          if (recorder.state !== "inactive") {
            try {
              recorder.stop();
            } catch (stopError) {
              console.error(`Failed to stop ${kind} recorder after error:`, stopError);
            }
          } else {
            void finish();
          }
        };

        recorder.onstop = () => {
          recorderRef.current = null;
          void finish();
        };

        recorderRef.current = recorder;
        recorder.start(RECORDING_AUTOSAVE_SEGMENT_MS);
      });

      transport.loopPromise = loopPromise;
      return loopPromise;
    },
    [
      enqueueRecordingChunkUpload,
      finalizeServerRecording,
      t,
    ],
  );

  const createMixedAudioCapture = useCallback(async ({ includeLocal = true, includeRemote = true } = {}) => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      return {
        stream: new MediaStream(),
        audioContext: null,
      };
    }

    const audioContext = new AudioContextClass();
    const destination = audioContext.createMediaStreamDestination();
    const allStreams = [
      ...(includeLocal ? [localStream] : []),
      ...(includeRemote ? remoteStreams.map((entry) => entry.stream) : []),
    ].filter(Boolean);
    let connectedSourceCount = 0;

    allStreams.forEach((stream) => {
      const audioTracks = stream
        .getAudioTracks()
        .filter((track) => track.readyState === "live");
      if (audioTracks.length === 0) {
        return;
      }

      const source = audioContext.createMediaStreamSource(new MediaStream(audioTracks));
      source.connect(destination);
      connectedSourceCount += 1;
    });

    if (!connectedSourceCount) {
      audioContext.close().catch(() => {});
      return {
        stream: new MediaStream(),
        audioContext: null,
      };
    }

    if (audioContext.state === "suspended") {
      try {
        await audioContext.resume();
      } catch (error) {
        console.error("Failed to resume mixed audio context:", error);
      }
    }

    return {
      stream: destination.stream,
      audioContext,
    };
  }, [localStream, remoteStreams]);

  const mixAllAudio = useCallback(async () => {
    const mixedAudio = await createMixedAudioCapture();
    return mixedAudio.stream;
  }, [createMixedAudioCapture]);

  const handleWhiteboardRecordSurfaceChange = useCallback((node, type) => {
    whiteboardSurfaceRef.current = node;
    whiteboardSurfaceTypeRef.current = type || "board";
    setWhiteboardRecordingSurfaceReady(Boolean(node));
  }, []);

  const cleanupWhiteboardRecordingTransport = useCallback(() => {
    if (whiteboardRenderFrameRef.current) {
      window.cancelAnimationFrame(whiteboardRenderFrameRef.current);
      whiteboardRenderFrameRef.current = 0;
    }

    if (whiteboardRecordStreamRef.current) {
      whiteboardRecordStreamRef.current.getTracks().forEach((track) => track.stop());
      whiteboardRecordStreamRef.current = null;
    }

    whiteboardLocalRecordingAudioTracksRef.current = [];
    whiteboardRecordVideoTrackRef.current = null;
    whiteboardRecordHeartbeatRef.current = 0;

    if (whiteboardRecordCanvasHostRef.current) {
      whiteboardRecordCanvasHostRef.current.remove();
      whiteboardRecordCanvasHostRef.current = null;
    }

    if (whiteboardAudioContextRef.current) {
      whiteboardAudioContextRef.current.close().catch(() => {});
      whiteboardAudioContextRef.current = null;
    }

    whiteboardRecordCanvasRef.current = null;
  }, []);

  const renderWhiteboardRecordingFrame = useCallback(() => {
    if (!whiteboardRecordCanvasRef.current) {
      return;
    }

    const surface = whiteboardSurfaceRef.current;
    if (surface) {
      whiteboardRecordHeartbeatRef.current += 1;
      renderWhiteboardSurfaceToCanvas(
        surface,
        whiteboardRecordCanvasRef.current,
        whiteboardRecordHeartbeatRef.current,
      );
      try {
        whiteboardRecordVideoTrackRef.current?.requestFrame?.();
      } catch (error) {
        console.error("Failed to request whiteboard recording frame:", error);
      }
    }

    whiteboardRenderFrameRef.current = window.requestAnimationFrame(renderWhiteboardRecordingFrame);
  }, []);

  useEffect(() => {
    const localRecordingTracks = whiteboardLocalRecordingAudioTracksRef.current || [];
    localRecordingTracks.forEach((track) => {
      if (track?.readyState === "live") {
        track.enabled = Boolean(isMicOn);
      }
    });
  }, [isMicOn]);

  const stopWhiteboardRecording = useCallback(
    async () => {
      if (whiteboardStopPromiseRef.current) {
        return whiteboardStopPromiseRef.current;
      }

      const stopPromise = (async () => {
        const transport = whiteboardRecordingSessionRef.current;
        const recorder = whiteboardRecorderRef.current;

        setIsWhiteboardRecording(false);
        setWhiteboardRecordingElapsedMs(0);

      if (!transport) {
        cleanupWhiteboardRecordingTransport();
        return;
      }

      if (!transport.failureHandled) {
        toast.success(t("groupCall.whiteboard.recordingQueuedToSavedMessages"));
      }

      transport.stopRequested = true;

        if (recorder?.state && recorder.state !== "inactive") {
          await stopRecorderWithFlush(recorder);
        }

        await Promise.resolve(transport.loopPromise).catch(() => undefined);
      })()
        .finally(() => {
          whiteboardStopPromiseRef.current = null;
        });

      whiteboardStopPromiseRef.current = stopPromise;
      return stopPromise;
    },
    [
      cleanupWhiteboardRecordingTransport,
      stopRecorderWithFlush,
    ],
  );

  const startWhiteboardRecording = useCallback(async () => {
    if (isWhiteboardRecording) {
      await stopWhiteboardRecording();
      return;
    }

    const surface = whiteboardSurfaceRef.current;
    if (!surface) {
      toast.error(t("groupCall.whiteboard.recordUnavailable"));
      return;
    }

    if (typeof MediaRecorder === "undefined") {
      toast.error(t("groupCall.whiteboard.recordUnsupported"));
      return;
    }

    const recordCanvas = document.createElement("canvas");
    if (typeof recordCanvas.captureStream !== "function") {
      toast.error(t("groupCall.whiteboard.recordUnsupported"));
      return;
    }

    whiteboardRecordHeartbeatRef.current = 1;
    const initialFrameReady = renderWhiteboardSurfaceToCanvas(
      surface,
      recordCanvas,
      whiteboardRecordHeartbeatRef.current,
    );
    if (!initialFrameReady) {
      toast.error(t("groupCall.whiteboard.recordUnavailable"));
      return;
    }

    try {
      const remoteMixedAudio = await createMixedAudioCapture({
        includeLocal: false,
        includeRemote: true,
      });
      whiteboardAudioContextRef.current = remoteMixedAudio.audioContext;
      whiteboardRecordCanvasRef.current = recordCanvas;
      const recordCanvasHost = document.createElement("div");
      recordCanvasHost.setAttribute("aria-hidden", "true");
      recordCanvasHost.style.position = "fixed";
      recordCanvasHost.style.left = "-10000px";
      recordCanvasHost.style.top = "-10000px";
      recordCanvasHost.style.width = "1px";
      recordCanvasHost.style.height = "1px";
      recordCanvasHost.style.opacity = "0";
      recordCanvasHost.style.pointerEvents = "none";
      recordCanvasHost.style.overflow = "hidden";
      recordCanvasHost.appendChild(recordCanvas);
      document.body.appendChild(recordCanvasHost);
      whiteboardRecordCanvasHostRef.current = recordCanvasHost;

      const videoStream = recordCanvas.captureStream(30);
      whiteboardRecordVideoTrackRef.current = videoStream.getVideoTracks?.()?.[0] || null;
      if (whiteboardRecordVideoTrackRef.current) {
        whiteboardRecordVideoTrackRef.current.contentHint = "detail";
      }
      try {
        whiteboardRecordVideoTrackRef.current?.requestFrame?.();
      } catch (error) {
        console.error("Failed to request initial whiteboard recording frame:", error);
      }

      let localRecordingAudioStream = null;
      if (navigator.mediaDevices?.getUserMedia) {
        try {
          localRecordingAudioStream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
              channelCount: 1,
            },
            video: false,
          });
        } catch (error) {
          console.error("Failed to capture dedicated whiteboard recording microphone:", error);
        }
      }

      const dedicatedLocalAudioTracks = (localRecordingAudioStream?.getAudioTracks?.() || []).map(
        (track) => {
          track.enabled = Boolean(isMicOn);
          return track;
        },
      );
      const fallbackLocalAudioTracks =
        localRecordingAudioStream?.getAudioTracks?.()?.length
          ? []
          : (localStream?.getAudioTracks?.() || [])
              .filter((track) => track.readyState === "live" && track.enabled !== false)
              .map((track) => {
                const clonedTrack = track.clone();
                clonedTrack.enabled = Boolean(isMicOn);
                return clonedTrack;
              });
      whiteboardLocalRecordingAudioTracksRef.current = [
        ...dedicatedLocalAudioTracks,
        ...fallbackLocalAudioTracks,
      ];

      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...dedicatedLocalAudioTracks,
        ...fallbackLocalAudioTracks,
        ...(remoteMixedAudio?.stream?.getAudioTracks?.() || []),
      ]);
      whiteboardRecordStreamRef.current = combinedStream;

      const preferredMimeType = resolveSupportedRecorderMimeType(combinedStream);
      const { recorder, mimeType, fileExtension } = createSafeRecorder(combinedStream, {
        preferredMimeType,
      });
      whiteboardRecordingSessionRef.current = await createServerRecordingTransport(
        "whiteboard",
        mimeType,
        `whiteboard-${roomId}-${Date.now()}.${fileExtension}`,
      );
      whiteboardRecordingStartedAtRef.current = Date.now();
      setWhiteboardRecordingElapsedMs(0);
      setIsWhiteboardRecording(true);
      whiteboardRenderFrameRef.current = window.requestAnimationFrame(renderWhiteboardRecordingFrame);
      startStreamingRecording({
        sessionRef: whiteboardRecordingSessionRef,
        kind: "whiteboard",
        recorderRef: whiteboardRecorderRef,
        recorder,
        cleanupTransport: cleanupWhiteboardRecordingTransport,
        onRecordingStop: () => {
          setIsWhiteboardRecording(false);
          setWhiteboardRecordingElapsedMs(0);
        },
        getDurationMs: () =>
          Math.max(0, Date.now() - whiteboardRecordingStartedAtRef.current),
      });
    } catch (error) {
      console.error("Whiteboard recording error:", error);
      cleanupWhiteboardRecordingTransport();
      whiteboardRecorderRef.current = null;
      whiteboardRecordingSessionRef.current = null;
      toast.error(t("groupCall.whiteboard.recordFailed"));
    }
  }, [
    cleanupWhiteboardRecordingTransport,
    createSafeRecorder,
    createServerRecordingTransport,
    createMixedAudioCapture,
    isWhiteboardRecording,
    isMicOn,
    localStream,
    remoteStreams,
    renderWhiteboardRecordingFrame,
    startStreamingRecording,
    stopWhiteboardRecording,
    roomId,
    t,
  ]);

  const startRecording = useCallback(
    async () => {
      try {
        const screen = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });
        recordScreenStreamRef.current = screen;
        const videoStream = screen;
        screen.getVideoTracks()[0].onended = () => stopRecording();

        // Mix all audio
        const mixedAudio = await createMixedAudioCapture();
        meetRecordingAudioContextRef.current = mixedAudio.audioContext;
        meetRecordingAudioStreamRef.current = mixedAudio.stream;

        // Combine video + audio
        const combined = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...(mixedAudio?.stream?.getAudioTracks?.() || []),
        ]);
        const { recorder, mimeType, fileExtension } = createSafeRecorder(combined);
        meetRecordingSessionRef.current = await createServerRecordingTransport(
          "meet",
          mimeType,
          `meet-${roomId}-${Date.now()}.${fileExtension}`,
        );

        meetRecordingStartedAtRef.current = Date.now();
        setIsRecording(true);
        emitRecording(true);
        startStreamingRecording({
          sessionRef: meetRecordingSessionRef,
          kind: "meet",
          recorderRef: mediaRecorderRef,
          recorder,
          cleanupTransport: cleanupMeetRecordingTransport,
          onRecordingStop: () => {
            setIsRecording(false);
            emitRecording(false);
          },
          getDurationMs: () =>
            Math.max(0, Date.now() - meetRecordingStartedAtRef.current),
        });
      } catch (err) {
        console.error("Recording error:", err);
        cleanupMeetRecordingTransport();
        meetRecordingSessionRef.current = null;
      }
    },
    [
      cleanupMeetRecordingTransport,
      createSafeRecorder,
      createMixedAudioCapture,
      createServerRecordingTransport,
      emitRecording,
      roomId,
      startStreamingRecording,
    ],
  );

  const stopRecording = useCallback(async () => {
    if (meetStopPromiseRef.current) {
      return meetStopPromiseRef.current;
    }

    const stopPromise = (async () => {
      const transport = meetRecordingSessionRef.current;
      const recorder = mediaRecorderRef.current;
      setIsRecording(false);
      emitRecording(false);

      if (!transport) {
        cleanupMeetRecordingTransport();
        return;
      }

      if (!transport.failureHandled) {
        toast.success(t("groupCall.recordingQueuedToSavedMessages"));
      }

      transport.stopRequested = true;

      if (recorder && recorder.state !== "inactive") {
        await stopRecorderWithFlush(recorder);
      }

      await Promise.resolve(transport.loopPromise).catch(() => undefined);
    })().finally(() => {
      meetStopPromiseRef.current = null;
    });

    meetStopPromiseRef.current = stopPromise;
    return stopPromise;
  }, [
    cleanupMeetRecordingTransport,
    emitRecording,
    stopRecorderWithFlush,
  ]);

  useEffect(() => {
    if (!isWhiteboardRecording) {
      return undefined;
    }

    setWhiteboardRecordingElapsedMs(Date.now() - whiteboardRecordingStartedAtRef.current);
    const intervalId = window.setInterval(() => {
      setWhiteboardRecordingElapsedMs(Date.now() - whiteboardRecordingStartedAtRef.current);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isWhiteboardRecording]);

  useEffect(
    () => () => {
      cleanupWhiteboardRecordingTransport();
    },
    [cleanupWhiteboardRecordingTransport],
  );

  const handleLeave = async () => {
    try {
      if (isRecording) await stopRecording();
    } catch (e) {
      console.error("Failed to stop recording:", e);
    }

    try {
      if (isWhiteboardRecording) {
        await stopWhiteboardRecording();
      }
    } catch (e) {
      console.error("Failed to stop whiteboard recording:", e);
    }

    try {
      leaveCall();
    } catch (e) {
      console.error("Failed to leave call:", e);
    }

    try {
      if (pipWindow && !pipWindow.closed) {
        pipCloseIntentRef.current = true;
        pipWindow.close();
      }
      setPipWindow(null);
      setPipContainer(null);
    } catch (e) {
      console.error("Failed to close PiP window:", e);
    }

    onClose();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${RESOLVED_APP_BASE_URL}/join/${roomId}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy meet link:", error);
      toast.error(t("groupCall.copyFailed", "Linkni nusxalab bo'lmadi"));
    }
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
        width: 300,
        height: 500,
      });

      nextPipWindow.document.documentElement.style.margin = "0";
      nextPipWindow.document.documentElement.style.width = "100%";
      nextPipWindow.document.documentElement.style.height = "100%";
      nextPipWindow.document.body.innerHTML = "";
      nextPipWindow.document.body.style.margin = "0";
      nextPipWindow.document.body.style.width = "100%";
      nextPipWindow.document.body.style.height = "100%";
      nextPipWindow.document.body.style.display = "flex";
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
      mountNode.style.minWidth = "300px";
      mountNode.style.minHeight = "500px";
      mountNode.style.display = "flex";
      mountNode.style.flex = "1 1 auto";
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

  const remoteParticipantIds = useMemo(
    () =>
      Array.from(
        new Set([
          ...Object.keys(remotePeerStates || {}),
          ...remoteStreams.map((item) => item.peerId),
          ...remoteScreenStreams.map((item) => item.peerId),
        ]),
      ),
    [remotePeerStates, remoteScreenStreams, remoteStreams],
  );

  const participantsCount = 1 + remoteParticipantIds.length;
  const primaryRemote = remoteStreams[0] || null;

  const remoteAudioEntries = useMemo(() => {
    const entries = [];
    const seenAudioKeys = new Set();

    const pushStream = (stream, enabled = true) => {
      if (!enabled || !stream) return;
      const liveAudioTracks =
        stream
          .getAudioTracks?.()
          ?.filter((track) => track.readyState === "live" && track.enabled !== false) || [];

      if (!liveAudioTracks.length) return;

      const audioKey = liveAudioTracks
        .map((track) => track.id || track.label || "audio")
        .sort()
        .join("|");

      if (seenAudioKeys.has(audioKey)) return;
      seenAudioKeys.add(audioKey);
      entries.push({
        id: audioKey,
        stream: new MediaStream(liveAudioTracks),
      });
    };

    remoteStreams.forEach(({ peerId, stream }) => {
      const peerState = remotePeerStates?.[peerId];
      const isAudioOn = peerState?.hasAudio !== false && peerState?.audioMuted !== true;
      pushStream(stream, isAudioOn);
    });

    remoteScreenStreams.forEach(({ stream }) => {
      pushStream(stream, true);
    });

    return entries;
  }, [remotePeerStates, remoteScreenStreams, remoteStreams]);

  const isMobileViewport = viewport.width <= 768;
  const isLandscapeViewport = viewport.width > viewport.height;

  const videoTiles = useMemo(() => {
    const tiles = [
      {
        id: "local",
        kind: "video",
        peerId: "local",
        stream: localStream,
        label: displayName,
        isLocal: true,
        isScreenShare: false,
        hasVideo: Boolean(localStream) && isCamOn,
        hasAudio: Boolean(localStream?.getAudioTracks?.().length),
        canFullscreen: Boolean(localStream) && isCamOn,
        handRaised: false,
        isCamOn,
        muted: true,
      },
    ];

    if (screenStream) {
      tiles.unshift({
        id: "local-screen",
        kind: "video",
        peerId: "local",
        stream: screenStream,
        label: `${displayName} · Ekran`,
        isLocal: true,
        isScreenShare: true,
        hasVideo: true,
        hasAudio: Boolean(screenStream?.getAudioTracks?.().length),
        canFullscreen: true,
        handRaised: false,
        isCamOn: true,
        muted: true,
      });
    }

    const renderedRemotePeerIds = new Set();

    remoteStreams.forEach(({ peerId, stream, displayName: remoteName }) => {
      const peerState = remotePeerStates[peerId];
      const resolvedRemoteName = peerState?.displayName || remoteName || peerId;
      const isRemoteCamOn =
        peerState?.hasVideo !== false && peerState?.videoMuted !== true;
      const isRemoteAudioOn =
        peerState?.hasAudio !== false && peerState?.audioMuted !== true;

      renderedRemotePeerIds.add(peerId);

      tiles.push({
        id: peerId,
        kind: "video",
        peerId,
        stream,
        label: resolvedRemoteName,
        isLocal: false,
        isScreenShare: false,
        hasVideo: Boolean(stream) && isRemoteCamOn,
        hasAudio: Boolean(stream) && isRemoteAudioOn,
        canFullscreen: Boolean(stream) && isRemoteCamOn,
        handRaised: raisedHands.has(peerId),
        isCamOn: isRemoteCamOn,
        muted: false,
      });
    });

    Object.entries(remotePeerStates || {}).forEach(([peerId, peerState]) => {
      if (renderedRemotePeerIds.has(peerId)) {
        return;
      }

      const remoteName = peerState?.displayName || peerId;
      const isRemoteCamOn =
        peerState?.hasVideo !== false && peerState?.videoMuted !== true;
      const isRemoteAudioOn =
        peerState?.hasAudio !== false && peerState?.audioMuted !== true;

      tiles.push({
        id: peerId,
        kind: "video",
        peerId,
        stream: null,
        label: remoteName,
        isLocal: false,
        isScreenShare: false,
        hasVideo: false,
        hasAudio: isRemoteAudioOn,
        canFullscreen: false,
        handRaised: raisedHands.has(peerId),
        isCamOn: isRemoteCamOn,
        muted: false,
      });
    });

    remoteScreenStreams.forEach(({ peerId, stream, displayName: remoteName }) => {
      const peerState = remotePeerStates[peerId];
      const resolvedRemoteName = peerState?.displayName || remoteName || peerId;
      tiles.unshift({
        id: `screen-${peerId}`,
        kind: "video",
        peerId,
        stream,
        label: `${resolvedRemoteName} · Ekran`,
        isLocal: false,
        isScreenShare: true,
        hasVideo: Boolean(stream),
        hasAudio: Boolean(stream?.getAudioTracks?.().length),
        canFullscreen: Boolean(stream),
        handRaised: false,
        isCamOn: true,
        muted: false,
      });
    });

    return tiles;
  }, [
    displayName,
    isCamOn,
    localStream,
    raisedHands,
    remotePeerStates,
    remoteScreenStreams,
    remoteStreams,
    screenStream,
  ]);

  const allTiles = useMemo(() => {
    const tiles = [...videoTiles];

    if (isWhiteboardActive) {
      tiles.unshift({
        id: "whiteboard",
        kind: "whiteboard",
        peerId: whiteboardState.ownerPeerId || "whiteboard",
        label: whiteboardLabel,
        canFullscreen: true,
      });
    }

    return tiles;
  }, [
    isWhiteboardActive,
    videoTiles,
    whiteboardLabel,
    whiteboardState.ownerPeerId,
  ]);

  const minimizedPreviewTile = useMemo(() => {
    const tileByPeer = (peerId) =>
      allTiles.find(
        (tile) => tile.kind === "video" && tile.peerId === peerId && !tile.isScreenShare,
      ) || null;

    return (
      (lastSpeakerPeerId ? tileByPeer(lastSpeakerPeerId) : null) ||
      allTiles.find(
        (tile) =>
          tile.kind === "video" &&
          !tile.isLocal &&
          !tile.isScreenShare &&
          tile.hasVideo,
      ) ||
      allTiles.find((tile) => tile.kind === "video" && tile.isScreenShare && tile.hasVideo) ||
      allTiles.find((tile) => tile.kind === "video" && tile.id === "local") ||
      allTiles.find((tile) => tile.kind === "whiteboard") ||
      allTiles[0] ||
      null
    );
  }, [allTiles, lastSpeakerPeerId]);

  const minimizedPreviewStream =
    minimizedPreviewTile?.kind === "video" && minimizedPreviewTile?.hasVideo
      ? minimizedPreviewTile.stream || null
      : null;
  const minimizedPreviewMirror =
    Boolean(minimizedPreviewStream) &&
    minimizedPreviewTile?.kind === "video" &&
    minimizedPreviewTile?.isLocal &&
    !minimizedPreviewTile?.isScreenShare;
  const minimizedPreviewLabel =
    minimizedPreviewTile?.label || roomTitle || chatTitle || t("groupCall.roomDefault");
  const minimizedPreviewBg = useMemo(() => {
    const seedSource = minimizedPreviewLabel || "meet";
    let hash = 0;
    for (let index = 0; index < seedSource.length; index += 1) {
      hash = (hash * 31 + seedSource.charCodeAt(index)) % 360;
    }
    return `hsl(${hash} 54% 30%)`;
  }, [minimizedPreviewLabel]);
  const minimizedPreviewRef = useCallback(
    (node) => {
      if (node && minimizedPreviewStream) {
        if (node.srcObject !== minimizedPreviewStream) {
          node.srcObject = minimizedPreviewStream;
        }
        const playPromise = node.play?.();
        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }
      }
    },
    [minimizedPreviewStream],
  );

  const tileCount = allTiles.length;

  useEffect(() => {
    setSelectedTileId((current) =>
      current && allTiles.some((tile) => tile.id === current) ? current : null,
    );
  }, [allTiles]);

  useEffect(() => {
    setFullscreenTileId((current) => {
      if (!current) return null;
      const currentTile = allTiles.find((tile) => tile.id === current);
      if (!currentTile?.canFullscreen) {
        return null;
      }
      return current;
    });
  }, [allTiles]);

  useEffect(() => {
    if (!isWhiteboardActive && whiteboardWasActiveRef.current) {
      setSelectedTileId((current) => (current === "whiteboard" ? null : current));
      setFullscreenTileId((current) => (current === "whiteboard" ? null : current));
    }

    whiteboardWasActiveRef.current = isWhiteboardActive;
  }, [isWhiteboardActive]);

  useEffect(() => {
    if (!remoteStreams.length) {
      setLastSpeakerPeerId(null);
      return;
    }

    setLastSpeakerPeerId((current) => {
      if (current && remoteStreams.some((streamItem) => streamItem.peerId === current)) {
        return current;
      }
      return remoteStreams[0]?.peerId || null;
    });
  }, [remoteStreams]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof (window.AudioContext || window.webkitAudioContext) !== "function" ||
      (remoteStreams.length === 0 && !localStream?.getAudioTracks?.().length)
    ) {
      return undefined;
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContextCtor();
    let rafId = 0;
    let disposed = false;
    let lastCommittedPeerId = null;
    let lastCommitAt = 0;

    const analysers = [
      ...(localStream?.getAudioTracks?.().length
        ? [
            {
              peerId: "local",
              stream: localStream,
              forceEnabled: isMicOn,
            },
          ]
        : []),
      ...remoteStreams.map(({ peerId, stream }) => ({
        peerId,
        stream,
        forceEnabled: remotePeerStates[peerId]?.audioMuted !== true,
      })),
    ]
      .map(({ peerId, stream, forceEnabled }) => {
        const peerState = remotePeerStates[peerId];
        const audioTracks =
          stream
            ?.getAudioTracks?.()
            ?.filter((track) => {
              if (track.readyState !== "live") return false;
              if (peerId === "local") return forceEnabled !== false;
              return peerState?.audioMuted !== true && forceEnabled !== false;
            }) || [];

        if (audioTracks.length === 0) return null;

        try {
          const source = audioContext.createMediaStreamSource(new MediaStream(audioTracks));
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          analyser.smoothingTimeConstant = 0.82;
          source.connect(analyser);

          return {
            peerId,
            source,
            analyser,
            data: new Uint8Array(analyser.frequencyBinCount),
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    if (!analysers.length) {
      audioContext.close().catch(() => {});
      return undefined;
    }

    audioContext.resume?.().catch(() => {});

    const detectSpeaker = () => {
      if (disposed) return;

      let strongestPeerId = null;
      let strongestLevel = 0;

      analysers.forEach((item) => {
        item.analyser.getByteTimeDomainData(item.data);

        let totalDelta = 0;
        for (let index = 0; index < item.data.length; index += 1) {
          totalDelta += Math.abs(item.data[index] - 128);
        }

        const averageDelta = totalDelta / item.data.length;
        if (averageDelta > strongestLevel) {
          strongestLevel = averageDelta;
          strongestPeerId = item.peerId;
        }
      });

      if (strongestPeerId && strongestLevel > 10) {
        const now = performance.now();
        if (strongestPeerId !== lastCommittedPeerId || now - lastCommitAt > 1200) {
          lastCommittedPeerId = strongestPeerId;
          lastCommitAt = now;
          setLastSpeakerPeerId((current) =>
            current === strongestPeerId ? current : strongestPeerId,
          );
        } else {
          lastCommitAt = now;
        }
      }

      rafId = window.requestAnimationFrame(detectSpeaker);
    };

    rafId = window.requestAnimationFrame(detectSpeaker);

    return () => {
      disposed = true;
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      analysers.forEach((item) => {
        try {
          item.source.disconnect();
        } catch {}
        try {
          item.analyser.disconnect();
        } catch {}
      });
      audioContext.close().catch(() => {});
    };
  }, [isMicOn, localStream, remotePeerStates, remoteStreams]);

  const activeStageTileId = fullscreenTileId || null;
  const activeStageTile = allTiles.find((tile) => tile.id === activeStageTileId) || null;
  const sideTiles = allTiles.filter((tile) => tile.id !== activeStageTileId);
  const hasStageLayout = Boolean(activeStageTile);
  const isWhiteboardFullscreen =
    Boolean(fullscreenTileId) && activeStageTile?.kind === "whiteboard";

  useEffect(() => {
    if (!isWhiteboardFullscreen) {
      setIsControlBarCollapsed(false);
    }
  }, [isWhiteboardFullscreen]);

  const mobileCompactTiles = useMemo(() => {
    if (!isMobileViewport || !hasStageLayout) return [];

    const activePeerId = activeStageTile?.peerId || null;
    const compactTiles = [];
    const pushUnique = (tile) => {
      if (!tile || compactTiles.some((entry) => entry.id === tile.id)) {
        return;
      }
      compactTiles.push(tile);
    };

    pushUnique(
      sideTiles.find(
        (tile) =>
          tile.kind === "video" &&
          !tile.isLocal &&
          !tile.isScreenShare &&
          tile.peerId !== activePeerId &&
          tile.peerId === lastSpeakerPeerId,
      ) || null,
    );
    pushUnique(
      sideTiles.find(
        (tile) =>
          tile.kind === "video" &&
          !tile.isLocal &&
          !tile.isScreenShare &&
          tile.peerId !== activePeerId,
      ) || null,
    );
    pushUnique(
      sideTiles.find(
        (tile) => tile.kind === "video" && !tile.isLocal && tile.peerId !== activePeerId,
      ) || null,
    );
    pushUnique(
      sideTiles.find(
        (tile) => tile.kind === "video" && tile.id === "local" && tile.peerId !== activePeerId,
      ) || null,
    );
    sideTiles.forEach((tile) => {
      if (tile.peerId !== activePeerId || tile.kind !== "video" || tile.isScreenShare) {
        pushUnique(tile);
      }
    });

    return compactTiles.slice(0, 2);
  }, [
    activeStageTile?.peerId,
    hasStageLayout,
    isMobileViewport,
    lastSpeakerPeerId,
    sideTiles,
  ]);

  const qualityTone =
    networkQuality === "poor"
      ? "var(--call-warning)"
      : networkQuality === "limited"
        ? "var(--call-primary)"
        : "var(--call-success)";

  const handleStageSelect = useCallback((tileId) => {
    setSelectedTileId((current) => (current === tileId ? null : tileId));
    setFullscreenTileId((current) => (current === tileId ? null : current));
  }, []);

  const handleToggleTileFullscreen = useCallback(
    (tileId) => {
      const tile = allTiles.find((entry) => entry.id === tileId);
      if (!tile?.canFullscreen) return;

      setSelectedTileId(tileId);
      setFullscreenTileId((current) => (current === tileId ? null : tileId));
    },
    [allTiles],
  );

  const handleResetStage = useCallback(() => {
    setFullscreenTileId(null);
    setSelectedTileId(null);
  }, []);

  const renderVideoTile = (
    tile,
    { compact = false, selectable = true, showFullscreenControl = true } = {},
  ) => (
    <VideoEl
      key={tile.id}
      stream={tile.stream}
      muted={tile.muted}
      isLocal={tile.isLocal}
      label={tile.label}
      isCamOn={tile.isCamOn}
      hasVideo={tile.hasVideo}
      hasAudio={tile.hasAudio}
      isScreenShare={tile.isScreenShare}
      canFullscreen={showFullscreenControl && tile.hasVideo}
      isFullscreen={fullscreenTileId === tile.id}
      onToggleFullscreen={() => handleToggleTileFullscreen(tile.id)}
      onSelect={selectable ? () => handleStageSelect(tile.id) : undefined}
      isActive={activeStageTileId === tile.id}
      compact={compact}
      handRaised={tile.handRaised}
      isMobile={isMobileViewport}
    />
  );

  const renderWhiteboardTile = (
    tile,
    { compact = false, selectable = true, showFullscreenControl = true } = {},
  ) => (
    <WhiteboardTile
      key={tile.id}
      label={tile.label}
      workspace={whiteboardState}
      compact={compact}
      isActive={activeStageTileId === tile.id}
      isMobile={isMobileViewport}
      canFullscreen={showFullscreenControl && tile.canFullscreen}
      isFullscreen={fullscreenTileId === tile.id}
      onToggleFullscreen={() => handleToggleTileFullscreen(tile.id)}
      onSelect={selectable ? () => handleStageSelect(tile.id) : undefined}
      interactive={Boolean(isCreator && activeStageTileId === tile.id && !compact)}
      tool={whiteboardTool}
      color={whiteboardColor}
      fillColor={whiteboardFillColor}
      shapeEdge={whiteboardShapeEdge}
      brushSize={whiteboardBrushSize}
      textFontFamily={whiteboardTextFontFamily}
      textSize={whiteboardTextSize}
      textAlign={whiteboardTextAlign}
      onToolChange={setWhiteboardTool}
      onColorChange={setWhiteboardColor}
      onFillColorChange={setWhiteboardFillColor}
      onShapeEdgeChange={setWhiteboardShapeEdge}
      onBrushSizeChange={setWhiteboardBrushSize}
      onTextFontFamilyChange={setWhiteboardTextFontFamily}
      onTextSizeChange={setWhiteboardTextSize}
      onTextAlignChange={setWhiteboardTextAlign}
      onClear={() => clearWhiteboard()}
      onClearPage={clearWhiteboardPage}
      onUndo={undoWhiteboard}
      onRedo={redoWhiteboard}
      onTabActivate={setWhiteboardActiveTab}
      onPdfUpload={async (file) => {
        const result = await uploadWhiteboardPdf(file);
        if (!result?.ok) {
          toast.error(result?.error || t("groupCall.whiteboard.pdfUploadFailed"));
        }
        return result;
      }}
      onPdfOpen={(item, options) => {
        const result = addWhiteboardPdfTab(item, options);
        if (!result?.ok) {
          toast.error(result?.error || t("groupCall.whiteboard.pdfOpenFailed"));
        }
        return result;
      }}
      onTabRemove={removeWhiteboardTab}
      onPdfViewportChange={syncWhiteboardPdfViewport}
      onBoardZoomChange={syncWhiteboardBoardZoom}
      onRecordSurfaceChange={handleWhiteboardRecordSurfaceChange}
      onToggleRecording={startWhiteboardRecording}
      isRecording={isWhiteboardRecording}
      recordingElapsedMs={whiteboardRecordingElapsedMs}
      recordingReady={whiteboardRecordingSurfaceReady}
      onStrokeStart={startWhiteboardStroke}
      onStrokeAppend={appendWhiteboardStroke}
      onStrokeRemove={removeWhiteboardStroke}
      onStrokeUpdate={updateWhiteboardStroke}
      showToolbar={Boolean(isCreator && activeStageTileId === tile.id && !compact)}
    />
  );

  const renderTile = (
    tile,
    { compact = false, selectable = true, showFullscreenControl = true } = {},
  ) =>
    tile.kind === "whiteboard"
      ? renderWhiteboardTile(tile, {
          compact,
          selectable,
          showFullscreenControl,
        })
      : renderVideoTile(tile, {
          compact,
          selectable,
          showFullscreenControl,
        });

  const remoteAudioLayer = (
    <AudioLayer aria-hidden="true">
      {remoteAudioEntries.map((entry) => (
        <HiddenAudioEl key={entry.id} stream={entry.stream} />
      ))}
    </AudioLayer>
  );

  const handleScreenShareToggle = useCallback(async () => {
    const isIOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream;
    const supportsScreenShare =
      typeof navigator !== "undefined" &&
      Boolean(navigator.mediaDevices?.getDisplayMedia);

    if (!isScreenSharing && (!supportsScreenShare || isIOS)) {
      toast.error(t("groupCall.screenShareUnavailable"));
      return;
    }

    const success = await toggleScreenShare();

    if (!isScreenSharing && success === false) {
      toast.error(t("groupCall.screenShareFailed"));
    }
  }, [isScreenSharing, t, toggleScreenShare]);

  const topBarContent = (
    <TopBar>
      <CallInfo>
        <CallTitle>
          {roomTitle || chatTitle || "Meet"}
          {roomIsPrivate && (
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
        {(isRecording || isWhiteboardRecording || remoteIsRecording) && (
          <RecBadge>
            <Circle size={8} fill="#f04747" /> {t("groupCall.recording")}
          </RecBadge>
        )}
        <TinyBtn
          as="div"
          style={{
            cursor: "default",
            color: qualityTone,
            borderColor: qualityTone,
          }}
        >
          {qualityProfile.label}
        </TinyBtn>
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
        {(isCreator || isWhiteboardActive) && !isMinimized ? (
          <TinyBtn onClick={handleWhiteboardTopAction}>
            <PenSquare size={13} />
            {isCreator
              ? isWhiteboardActive
                ? t("groupCall.whiteboard.hide")
                : t("groupCall.whiteboard.show")
              : t("groupCall.whiteboard.open")}
          </TinyBtn>
        ) : null}
        {!isMinimized && (
          <TinyBtn
            onClick={() => setShowDrawer((p) => !p)}
            style={{ position: "relative" }}
          >
            <Users size={13} />
            {participantsCount}
            {isCreator && knockRequests.length > 0 && (
              <NotifBadge>{knockRequests.length}</NotifBadge>
            )}
          </TinyBtn>
        )}
      </TopActions>
    </TopBar>
  );

  const minimizedPreviewNode = (
    <MiniPreview>
      {minimizedPreviewStream ? (
        <MiniPreviewVideo
          ref={minimizedPreviewRef}
          autoPlay
          muted
          playsInline
          $mirror={minimizedPreviewMirror}
        />
      ) : (
        <MiniPreviewFallback $bg={minimizedPreviewBg}>
          <MiniPreviewAvatar>
            {minimizedPreviewLabel?.charAt(0)?.toUpperCase() || "?"}
          </MiniPreviewAvatar>
        </MiniPreviewFallback>
      )}
    </MiniPreview>
  );

  const stopPiPControlClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const pipMinimizedContent = (
    <PiPFrame>
      <PiPStage type="button" onClick={handleMaximizeFromPiP}>
        <PiPStageInner>
          {minimizedPreviewNode}
          <PiPNameLabel>{minimizedPreviewLabel}</PiPNameLabel>
        </PiPStageInner>
      </PiPStage>
      <PiPBottomControls onClick={stopPiPControlClick}>
        <PiPControlBtn type="button" $off={!isMicOn} onClick={toggleMic}>
          {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
        </PiPControlBtn>
        <PiPControlBtn type="button" $off={!isCamOn} onClick={toggleCam}>
          {isCamOn ? <Video size={20} /> : <VideoOff size={20} />}
        </PiPControlBtn>
        <PiPControlBtn type="button" onClick={handleMaximizeFromPiP}>
          <Maximize size={20} />
        </PiPControlBtn>
        <PiPControlBtn type="button" $danger onClick={handleLeave}>
          <PhoneOff size={20} />
        </PiPControlBtn>
      </PiPBottomControls>
    </PiPFrame>
  );

  const minimizedContent = (
    <>
      {topBarContent}

      <MinimizedBody
        type="button"
        onClick={pipContainer ? handleMaximizeFromPiP : onMaximize}
      >
        {minimizedPreviewNode}
        <MiniOverlay>
          <div>
            <MiniTitle>{minimizedPreviewLabel}</MiniTitle>
            <MiniMeta>
              {t("groupCall.participants", { count: participantsCount })} •{" "}
              {roomIsPrivate ? t("groupCall.privateRoom") : t("groupCall.publicRoom")}
            </MiniMeta>
          </div>
          <MiniActions>
            <MiniMeta>{roomId}</MiniMeta>
            {isMicOn ? <Mic size={16} color="#43b581" /> : <MicOff size={16} color="#f04747" />}
            {isCamOn ? <Video size={16} color="#43b581" /> : <VideoOff size={16} color="#f04747" />}
          </MiniActions>
        </MiniOverlay>
      </MinimizedBody>
    </>
  );

  if (isMinimized && pipContainer) {
    return (
      <>
        {remoteAudioLayer}
        {createPortal(pipMinimizedContent, pipContainer)}
      </>
    );
  }

  return (
    <Overlay $minimized={isMinimized}>
      {remoteAudioLayer}
      {isMinimized ? (
        <MinimizedBody type="button" onClick={onMaximize}>
          {minimizedPreviewNode}
          <MiniOverlay>
            <div>
            <MiniTitle>{minimizedPreviewLabel}</MiniTitle>
            <MiniMeta>
                {t("groupCall.participants", { count: participantsCount })} •{" "}
                {roomIsPrivate ? t("groupCall.privateRoom") : t("groupCall.publicRoom")}
              </MiniMeta>
            </div>
            <MiniActions>
              <MiniMeta>{roomId}</MiniMeta>
              {isMicOn ? <Mic size={16} color="#43b581" /> : <MicOff size={16} color="#f04747" />}
              {isCamOn ? <Video size={16} color="#43b581" /> : <VideoOff size={16} color="#f04747" />}
            </MiniActions>
          </MiniOverlay>
        </MinimizedBody>
      ) : (
      <>
      {topBarContent}
      <Body $immersive={Boolean(fullscreenTileId)}>
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
        ) : hasStageLayout && activeStageTile ? (
          <StageLayout
            $mobile={isMobileViewport}
            $immersive={Boolean(fullscreenTileId)}
            $whiteboardFullscreen={isWhiteboardFullscreen}
            $landscape={isLandscapeViewport}
            $mobileCompactCount={mobileCompactTiles.length}
          >
            {isMobileViewport && mobileCompactTiles.length > 0 && !isWhiteboardFullscreen ? (
              <MobileTopRail>
                {mobileCompactTiles.map((tile) => (
                  <MobileTopRailTile key={`compact-${tile.id}`}>
                    {renderTile(tile, {
                      compact: true,
                      showFullscreenControl: false,
                    })}
                  </MobileTopRailTile>
                ))}
              </MobileTopRail>
            ) : null}

            <StageMain
              $immersive={Boolean(fullscreenTileId)}
              $whiteboardFullscreen={isWhiteboardFullscreen}
            >
              <div style={{ height: "100%" }}>
                {renderTile(activeStageTile, {
                  selectable: false,
                  showFullscreenControl: isWhiteboardFullscreen,
                })}
              </div>
              {!isWhiteboardFullscreen ? (
              <StageActions>
                {selectedTileId && !fullscreenTileId ? (
                  <StageActionBtn type="button" onClick={handleResetStage}>
                    <ArrowLeft size={18} />
                  </StageActionBtn>
                ) : null}
                {activeStageTile.canFullscreen ? (
                  <StageActionBtn
                    type="button"
                    onClick={() => handleToggleTileFullscreen(activeStageTile.id)}
                  >
                    {fullscreenTileId === activeStageTile.id ? (
                      <Minimize2 size={18} />
                    ) : (
                      <Maximize size={18} />
                    )}
                  </StageActionBtn>
                ) : null}
              </StageActions>
              ) : null}
            </StageMain>

            {!isMobileViewport && !isWhiteboardFullscreen ? (
              <StageRail>
                {sideTiles.length > 0 ? <StageRailLabel>Qolganlar</StageRailLabel> : null}
                <StageRailGrid
                  $mobile={isMobileViewport}
                  $immersive={Boolean(fullscreenTileId)}
                >
                  {sideTiles.map((tile) =>
                    renderTile(tile, {
                      compact: true,
                    }),
                  )}
                </StageRailGrid>
              </StageRail>
            ) : null}
          </StageLayout>
        ) : (
          <VideoGrid $count={tileCount}>
            {allTiles.map((tile) =>
              renderTile(tile, {
                selectable: false,
                showFullscreenControl: true,
              }),
            )}
          </VideoGrid>
        )}

        {/* Members Drawer */}
        {showDrawer && (
          <WaitingBackdrop onClick={() => setShowDrawer(false)}>
          <WaitingPanel onClick={(event) => event.stopPropagation()}>
            <PanelHead>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Users size={15} color="#7289da" />
                {t("groupCall.members", { count: participantsCount })}
              </span>
              <DrawerClose onClick={() => setShowDrawer(false)}>
                <XCircle size={16} />
              </DrawerClose>
            </PanelHead>
            <PanelBody>
              {/* Waiting section — only creator of private room */}
              {isCreator && (
                <>
                  <PrivacyRow>
                    <PrivacyMeta>
                      <strong>Meetga kirishni tasdiqlash</strong>
                      <span>
                        {roomIsPrivate
                          ? "Yoqilgan. Yangi kiruvchilar avval kutadi."
                          : "O‘chiq. Link bilan kirganlar darrov qo‘shiladi."}
                      </span>
                    </PrivacyMeta>
                    <PrivacyToggle
                      type="button"
                      $active={roomIsPrivate}
                      disabled={privacyUpdating}
                      onClick={handleToggleRoomPrivacy}
                      aria-label="Meetga kirish tasdiqlash rejimini almashtirish"
                    />
                  </PrivacyRow>

                  {roomIsPrivate ? (
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
                  ) : null}
                </>
              )}

              {/* Joined members */}
              <SectionLabel
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <CheckSquare size={12} color="#43b581" /> Qo'shilganlar (
                {participantsCount})
              </SectionLabel>
              {/* Local user */}
              <MemberRow>
                <MemberAvatar>
                  {displayName?.charAt(0)?.toUpperCase() || "?"}
                </MemberAvatar>
                <MemberInfo>
                  <MemberName>{displayName} (Sen)</MemberName>
                </MemberInfo>
                <MemberIcons>
                  {isMicOn ? (
                    <Mic size={13} color="var(--call-success)" />
                  ) : (
                    <MicOff size={13} color="var(--call-danger)" />
                  )}
                  {isCamOn ? (
                    <Video size={13} color="var(--call-success)" />
                  ) : (
                    <VideoOff size={13} color="var(--call-danger)" />
                  )}
                </MemberIcons>
              </MemberRow>
              {/* Remote peers */}
              {remoteStreams.map(({ peerId, displayName: n }) => {
                const peerState = remotePeerStates[peerId] || {};
                const resolvedDisplayName =
                  peerState.displayName || n || peerId;
                const isPeerMicOn =
                  peerState.hasAudio !== false && peerState.audioMuted !== true;
                const isPeerCamOn =
                  peerState.hasVideo !== false && peerState.videoMuted !== true;

                return (
                  <MemberRow key={peerId}>
                    <MemberAvatar>
                      {resolvedDisplayName?.charAt(0)?.toUpperCase() || "?"}
                    </MemberAvatar>
                    <MemberInfo>
                      <MemberName>
                        {raisedHands.has(peerId) && (
                          <Hand size={14} color="#faa61a" fill="#faa61a" />
                        )}
                        {resolvedDisplayName}
                      </MemberName>
                    </MemberInfo>
                    <MemberIcons>
                      {isCreator ? (
                        <>
                          <MemberActionBtn
                            onClick={() =>
                              isPeerMicOn ? forceMuteMic(peerId) : allowMic(peerId)
                            }
                            title={isPeerMicOn ? "Mic o'chirish" : "Mic yoqish"}
                            $danger={!isPeerMicOn}
                            $success={isPeerMicOn}
                          >
                            {isPeerMicOn ? <MicOff size={16} /> : <Mic size={16} />}
                          </MemberActionBtn>
                          <MemberActionBtn
                            onClick={() =>
                              isPeerCamOn ? forceMuteCam(peerId) : allowCam(peerId)
                            }
                            title={isPeerCamOn ? "Cam o'chirish" : "Cam yoqish"}
                            $danger={!isPeerCamOn}
                            $success={isPeerCamOn}
                          >
                            {isPeerCamOn ? (
                              <VideoOff size={16} />
                            ) : (
                              <Video size={16} />
                            )}
                          </MemberActionBtn>
                          <MemberActionBtn
                            onClick={() => kickPeer(peerId)}
                            title="Chiqarib yuborish"
                            $danger
                          >
                            <UserMinus size={16} />
                          </MemberActionBtn>
                        </>
                      ) : (
                        <>
                          {isPeerMicOn ? (
                            <Mic size={13} color="var(--call-success)" />
                          ) : (
                            <MicOff size={13} color="var(--call-danger)" />
                          )}
                          {isPeerCamOn ? (
                            <Video size={13} color="var(--call-success)" />
                          ) : (
                            <VideoOff size={13} color="var(--call-danger)" />
                          )}
                        </>
                      )}
                    </MemberIcons>
                  </MemberRow>
                );
              })}
            </PanelBody>
          </WaitingPanel>
          </WaitingBackdrop>
        )}
      </Body>
      </>
        )}

      {!isMinimized && (
      <ControlBarDock>
        {isWhiteboardFullscreen ? (
          <ControlBarToggle
            type="button"
            onClick={() => setIsControlBarCollapsed((current) => !current)}
            aria-label={
              isControlBarCollapsed ? "Show bottom controls" : "Hide bottom controls"
            }
            title={
              isControlBarCollapsed ? "Show bottom controls" : "Hide bottom controls"
            }
          >
            {isControlBarCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </ControlBarToggle>
        ) : null}
      <ControlBar $collapsed={isWhiteboardFullscreen && isControlBarCollapsed}>
        <CtrlBtn
          $state={isMicOn ? "on" : "off"}
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
          $state={isCamOn ? "on" : "off"}
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
        {!isMobileViewport && (
          <CtrlBtn $state={isScreenSharing ? "accent" : "neutral"} onClick={handleScreenShareToggle}>
            {isScreenSharing ? <MonitorOff size={21} /> : <Monitor size={21} />}
          </CtrlBtn>
        )}
        {isMobileViewport && canSwitchCamera ? (
          <CtrlBtn
            $state="neutral"
            onClick={switchCamera}
            aria-label={t("privateCall.switchCamera", "Switch camera")}
            title={t("privateCall.switchCamera", "Switch camera")}
          >
            <RefreshCcw size={21} />
          </CtrlBtn>
        ) : null}
        <CtrlBtn
          $state={isHandRaised ? "accent" : "neutral"}
          onClick={toggleHandRaise}
        >
          <Hand size={21} />
        </CtrlBtn>
        {isCreator && !isMobileViewport && (
          <CtrlBtn
            $state={isRecording ? "accent" : "neutral"}
            onClick={() => (isRecording ? stopRecording() : startRecording())}
          >
            <Circle size={21} fill={isRecording ? "#f04747" : "none"} />
          </CtrlBtn>
        )}
        <ControlDivider />
        <CtrlBtn $danger onClick={handleLeave}>
          <PhoneOff size={21} />
        </CtrlBtn>
      </ControlBar>
      </ControlBarDock>
      )}
    </Overlay>
  );
};

export default GroupVideoCall;
