import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes, StyleSheetManager } from "styled-components";
import { toast } from "react-hot-toast";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  VideoOff,
} from "lucide-react";
import {
  ChatEntry,
  ConnectionQualityIndicator,
  FocusLayout,
  FocusToggleIcon,
  FocusLayoutContainer,
  FocusToggle,
  LayoutContextProvider,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  formatChatMessageLinks,
  useConnectionState,
  useIsRecording,
  useMaybeLayoutContext,
  useMaybeTrackRefContext,
  useParticipants,
  usePinnedTracks,
  useRoomContext,
  useRoomInfo,
  useSpeakingParticipants,
  useTracks,
  UnfocusToggleIcon,
} from "@livekit/components-react";
import { Track, VideoPresets, ScreenSharePresets } from "livekit-client";
import { createLivekitToken } from "../../../api/livekitApi";
import useAuthStore from "../../../store/authStore";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";
// WhiteboardTile is lazy — it pulls in pdfjs (~1.5 MB parsed JS) which can OOM
// mobile Safari on /join. Only load it when the host actually opens the
// whiteboard (`hasWhiteboard === true`).
const WhiteboardTile = lazy(() => import("./WhiteboardTile"));
import MeetingUI from "./meet-ui/MeetingUI";
import MeetAttendancePanel from "./MeetAttendancePanel";
import { useLiveKitMeetSignaling } from "../hooks/useLiveKitMeetSignaling";
import { useMeetRecorder } from "../hooks/useMeetRecorder";
import { applyPreferredAudioOutput } from "../utils/audioOutput";
import {
  buildCameraDeviceOptions,
  parseCameraDeviceSelection,
} from "../utils/cameraOptions";

const WHITEBOARD_DEFAULT_COLOR = "#0f172a";
const WHITEBOARD_DEFAULT_FILL_COLOR = "";
const WHITEBOARD_DEFAULT_SHAPE_EDGE = "sharp";
const WHITEBOARD_DEFAULT_TOOL = "pen";
const WHITEBOARD_DEFAULT_BRUSH_SIZE = 4;
const WHITEBOARD_DEFAULT_TEXT_FONT_FAMILY = "sans";
const WHITEBOARD_DEFAULT_TEXT_SIZE = "m";
const WHITEBOARD_DEFAULT_TEXT_ALIGN = "left";
const CONNECTION_STATE_TOAST_ID = "meet-connection-state";
const MINIMIZED_ROOM_CONTAINER_STYLE = {
  position: "fixed",
  inset: "0 auto auto 0",
  width: "0",
  height: "0",
  overflow: "visible",
};

const detectMeetMobileViewport = () => {
  if (typeof window === "undefined") return false;

  const userAgent = window.navigator?.userAgent || "";
  return (
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(pointer: coarse)").matches ||
    /iPhone|iPad|iPod|Android/i.test(userAgent)
  );
};

const entrance = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
  --meet-bg: var(--background-color);
  --meet-panel: var(--secondary-color);
  --meet-panel-strong: var(--tertiary-color);
  --meet-border: var(--border-color);
  --meet-text: var(--text-color);
  --meet-muted: var(--text-secondary-color);
  --meet-accent: var(--primary-color);
  --meet-danger: var(--danger-color);
  --meet-success: var(--success-color);
  --meet-warning: var(--warning-color);
  --meet-hover: var(--hover-color);
  --meet-input: var(--input-color);

  position: fixed;
  inset: ${(props) =>
    props.$minimized
      ? "calc(env(safe-area-inset-top, 0px) + 18px) calc(env(safe-area-inset-right, 0px) + 18px) auto auto"
      : "var(--visual-viewport-offset-top, 0px) 0 auto 0"};
  width: ${(props) => (props.$minimized ? "340px" : "100vw")};
  height: ${(props) =>
    props.$minimized ? "190px" : "var(--visual-viewport-height, var(--app-height, 100dvh))"};
  min-height: ${(props) =>
    props.$minimized ? "190px" : "var(--visual-viewport-height, var(--app-height, 100dvh))"};
  max-height: ${(props) =>
    props.$minimized ? "190px" : "var(--visual-viewport-height, var(--app-height, 100dvh))"};
  z-index: 9999;
  color: var(--meet-text);
  background: var(--meet-bg);
  overflow: hidden;
  border: ${(props) => (props.$minimized ? "1px solid var(--meet-border)" : "none")};
  border-radius: ${(props) => (props.$minimized ? "15px" : "0")};
  animation: ${entrance} 0.28s ease both;

  [data-lk-theme="default"] {
    --lk-bg: var(--background-color);
    --lk-bg2: var(--secondary-color);
    --lk-bg3: var(--tertiary-color);
    --lk-bg4: var(--input-color);
    --lk-bg5: var(--input-color);
    --lk-fg: var(--meet-text);
    --lk-fg2: var(--text-secondary-color);
    --lk-fg3: var(--text-secondary-color);
    --lk-fg5: var(--text-muted-color);
    --lk-border-color: var(--border-color);
    --lk-control-bg: var(--meet-input);
    --lk-control-hover-bg: var(--meet-hover);
    --lk-control-active-bg: var(--active-color);
    --lk-control-active-hover-bg: var(--active-color);
    --lk-accent-fg: #fff;
    --lk-accent-bg: var(--meet-accent);
    --lk-box-shadow: none;
    --lk-danger-fg: #fff;
    --lk-danger: var(--meet-danger);
  }

  [data-theme="light"] &[data-lk-theme="default"] {
    color-scheme: light;
  }

  [data-theme="dark"] &[data-lk-theme="default"] {
    color-scheme: dark;
  }

  .lk-grid-layout {
    gap: 12px;
    padding: 0;
    height: 100%;
  }

  .lk-focus-layout {
    height: 100%;
    min-height: 0;
    gap: 12px;
    padding: 0;
  }

  .lk-focus-layout > * {
    height: 100%;
    min-height: 0;
  }

  .lk-carousel {
    min-height: 0;
  }

  .lk-participant-media-video {
    object-fit: contain !important;
    object-position: center;
    background: var(--meet-tile-bg, var(--meet-panel));
  }

  .lk-focus-layout .lk-participant-media-video {
    object-fit: contain !important;
  }

  .lk-focus-layout .lk-participant-tile,
  .lk-focus-layout [data-lk-source] {
    height: 100% !important;
    min-height: 100%;
  }

  .lk-participant-tile {
    position: relative;
    min-height: 100%;
    overflow: hidden;
    border-radius: 14px;
    background: var(--meet-panel);
    border: 1px solid var(--meet-border);
    box-shadow: none;
    transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease,
      transform 0.18s ease;
  }

  .lk-participant-tile::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    pointer-events: none;
    opacity: 0;
    box-shadow:
      inset 0 0 0 2px var(--meet-accent),
      inset 0 0 0 6px var(--active-color);
    transition: opacity 0.18s ease;
  }

  .lk-participant-tile::after {
    display: none;
  }

  .lk-participant-tile[data-lk-speaking="true"]:not([data-lk-source="screen_share"]) {
    border-color: var(--meet-accent);
    box-shadow: none;
  }

  .lk-participant-tile[data-lk-speaking="true"]:not([data-lk-source="screen_share"])::before {
    opacity: 1;
  }

  .lk-control-bar {
    justify-content: center;
    gap: 8px;
    border: 1px solid var(--meet-border);
    border-radius: 15px;
    padding: 8px;
    background: var(--meet-panel);
  }

  .lk-control-bar .lk-button,
  .lk-control-bar .lk-start-audio-button,
  .lk-control-bar .lk-chat-toggle,
  .lk-control-bar .lk-disconnect-button,
  .lk-control-bar .lk-button-group > .lk-button,
  .lk-control-bar .lk-button-group-menu > .lk-button {
    background: var(--meet-input);
    color: var(--meet-text);
    border: 1px solid var(--meet-border);
    box-shadow: none;
  }

  .lk-control-bar .lk-button:hover,
  .lk-control-bar .lk-start-audio-button:hover,
  .lk-control-bar .lk-chat-toggle:hover,
  .lk-control-bar .lk-disconnect-button:hover,
  .lk-control-bar .lk-button-group > .lk-button:hover,
  .lk-control-bar .lk-button-group-menu > .lk-button:hover {
    background: var(--meet-panel-strong);
  }

  .lk-control-bar .lk-button-menu {
    color: var(--meet-text);
    background: var(--meet-input);
    border: 1px solid var(--meet-border);
  }

  .lk-control-bar .lk-button-menu:hover {
    background: var(--meet-panel-strong);
  }

  .lk-control-bar .lk-button[aria-pressed="true"],
  .lk-control-bar .lk-button[data-lk-enabled="true"],
  .lk-control-bar .lk-button[aria-expanded="true"],
  .lk-control-bar .lk-button-group > .lk-button[aria-pressed="true"],
  .lk-control-bar .lk-button-group > .lk-button[data-lk-enabled="true"],
  .lk-control-bar .lk-button-group > .lk-button[aria-expanded="true"],
  .lk-control-bar .lk-button-group-menu > .lk-button[aria-pressed="true"],
  .lk-control-bar .lk-button-group-menu > .lk-button[aria-expanded="true"] {
    background: var(--active-color);
    color: var(--meet-accent);
    border-color: var(--meet-accent);
    box-shadow: inset 0 0 0 1px var(--meet-accent);
  }

  .lk-control-bar .lk-button-menu[aria-pressed="true"],
  .lk-control-bar .lk-button-menu[aria-expanded="true"] {
    background: var(--active-color);
    color: var(--meet-accent);
    border-color: var(--meet-accent);
    box-shadow: inset 0 0 0 1px var(--meet-accent);
  }

  .lk-disconnect-button {
    background: var(--meet-input);
    color: var(--meet-danger);
    border: 1px solid var(--meet-border);
    box-shadow: none;
  }

  .lk-disconnect-button:hover {
    background: var(--meet-panel-strong);
    color: var(--meet-danger);
  }

  .lk-focus-toggle-button,
  .lk-participant-tile .lk-focus-toggle-button {
    color: var(--meet-text);
    background: var(--meet-panel);
    border: 1px solid var(--meet-border);
    box-shadow: none;
  }

  .lk-focus-toggle-button:hover,
  .lk-participant-tile .lk-focus-toggle-button:hover {
    background: var(--meet-panel-strong);
  }

  .lk-focus-toggle-button[aria-pressed="true"],
  .lk-participant-tile .lk-focus-toggle-button[aria-pressed="true"] {
    color: var(--meet-accent);
    background: var(--active-color);
    border-color: var(--meet-accent);
    box-shadow: inset 0 0 0 1px var(--meet-accent);
  }

  .lk-chat {
    height: 100%;
    border: none;
    background: var(--meet-bg);
    width: 100%;
    max-width: 100%;
    min-width: 0;
    grid-template-rows: minmax(0, 1fr) auto;
  }

  .lk-chat-header {
    display: none;
  }

  .lk-chat-messages {
    padding: 14px;
    background: var(--meet-bg);
  }

  .lk-chat-entry .lk-message-body {
    max-width: 100%;
  }

  .lk-chat-entry[data-lk-message-origin="local"] .lk-message-body {
    background: var(--meet-input);
    color: var(--meet-text);
  }

  .lk-chat-entry[data-lk-message-origin="remote"] .lk-message-body {
    background: var(--meet-panel-strong);
    color: var(--meet-text);
  }

  .lk-chat-form {
    gap: 8px;
    padding: 12px;
    max-height: none;
    border-top: 1px solid var(--meet-border);
    background: var(--meet-panel);
  }

  .lk-chat-form-input {
    min-width: 0;
    color: var(--meet-text);
    background: var(--meet-input);
    border: 1px solid var(--meet-border);
  }

  .lk-chat-form-input::placeholder {
    color: var(--placeholder-color);
  }

  .lk-chat-form-button {
    flex: 0 0 auto;
    background: var(--meet-accent);
    color: #fff;
  }

  .lk-chat-form-button:hover {
    background: var(--meet-accent);
    opacity: 0.92;
  }

  .lk-device-menu,
  .lk-settings-menu-modal,
  .lk-pagination-control,
  .lk-pagination-indicator {
    background: var(--meet-panel);
    border-color: var(--meet-border);
    box-shadow: none;
  }

  .lk-device-menu,
  .lk-settings-menu-modal {
    color: var(--meet-text);
  }

  .lk-device-menu .lk-button,
  .lk-device-menu .lk-button-group > .lk-button,
  .lk-device-menu .lk-button-group-menu > .lk-button,
  .lk-settings-menu-modal .lk-button,
  .lk-settings-menu-modal .lk-button-group > .lk-button,
  .lk-settings-menu-modal .lk-button-group-menu > .lk-button {
    color: var(--meet-text);
    background: var(--meet-input);
    border: 1px solid var(--meet-border);
    box-shadow: none;
  }

  .lk-device-menu .lk-button-menu {
    color: var(--meet-text);
    background: var(--meet-input);
    border: 1px solid var(--meet-border);
  }

  .lk-device-menu .lk-button:hover,
  .lk-device-menu .lk-button-group > .lk-button:hover,
  .lk-device-menu .lk-button-group-menu > .lk-button:hover,
  .lk-device-menu .lk-button-menu:hover,
  .lk-settings-menu-modal .lk-button:hover,
  .lk-settings-menu-modal .lk-button-group > .lk-button:hover,
  .lk-settings-menu-modal .lk-button-group-menu > .lk-button:hover {
    background: var(--meet-panel-strong);
  }

  .lk-device-menu-heading,
  .lk-settings-menu-modal label,
  .lk-settings-menu-modal h1,
  .lk-settings-menu-modal h2,
  .lk-settings-menu-modal h3,
  .lk-settings-menu-modal p {
    color: var(--meet-text);
  }

  .lk-media-device-select:not(:last-child) {
    border-bottom-color: var(--meet-border);
  }

  .lk-media-device-select [data-lk-active="true"] > .lk-button {
    color: #fff;
    background: var(--meet-accent);
  }

  .lk-media-device-select [data-lk-active="false"] > .lk-button {
    background: transparent;
  }

  .lk-media-device-select li:not([data-lk-active="true"]) > .lk-button:not(:disabled):hover,
  .lk-media-device-select li:not([data-lk-active=true]) > .lk-button:not(:disabled):hover,
  .lk-media-device-select [data-lk-active="false"] > .lk-button:hover {
    background: var(--meet-panel-strong);
    background-color: var(--meet-panel-strong);
  }

  .lk-start-audio-button {
    display: none !important;
  }
  .lk-participant-metadata{
    bottom: 0.6rem;
    left: 0.6rem;
    right: 0.6rem;
  }
  .lk-participant-metadata-item {
    background: var(--meet-panel-strong);
    color: var(--meet-text);
    border: 1px solid var(--meet-border);
    padding: 6px;
    border-radius: 7px;
  }
  .lk-connection-quality{
    width: auto;
    height: auto;
  }
  .lk-participant-placeholder {
    background: var(--meet-panel-strong);
  }

  .lk-toast,
  .lk-toast-connection-state {
    color: var(--meet-text);
    background: var(--meet-panel);
    border: 1px solid var(--meet-border);
    box-shadow: none;
  }

  @media (max-width: 980px) {
    width: 100vw;
    height: var(--visual-viewport-height, var(--app-height, 100dvh));
    min-height: var(--visual-viewport-height, var(--app-height, 100dvh));
    max-height: var(--visual-viewport-height, var(--app-height, 100dvh));
    overflow: hidden;

    .lk-grid-layout,
    .lk-focus-layout {
      width: 100%;
      max-width: 100%;
      min-width: 0;
    }

    .lk-focus-layout {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto !important;
    }
  }
`;

const Shell = styled.div`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 14px;
  height: 100%;
  min-height: 0;
  padding: clamp(12px, 2vw, 0px);

  @media (max-width: 980px) {
    gap: 10px;
    padding:
      calc(env(safe-area-inset-top, 0px) + 10px)
      calc(env(safe-area-inset-right, 0px) + 10px)
      calc(env(safe-area-inset-bottom, 0px) + 10px)
      calc(env(safe-area-inset-left, 0px) + 10px);
  }
`;

const TopBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  min-height: 58px;
  padding: 10px 12px 10px 16px;
  border: 1px solid var(--meet-border);
  border-radius: 15px;
  background: var(--meet-panel);

  @media (max-width: 980px) {
    min-height: 52px;
    padding: 8px 10px;
    border-radius: 18px;
  }
`;

const TopActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
  width: 100%;
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
  padding: 0 10px;
  border: 1px solid var(--meet-border);
  border-radius: 15px;
  color: ${(props) => props.$tone || "var(--meet-muted)"};
  background: var(--meet-bg);
  font-size: 12px;
  font-weight: 800;
`;

const IconButton = styled.button`
  position: relative;
  min-width: 38px;
  height: 38px;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--meet-accent)" : "var(--meet-border)"};
  border-radius: 15px;
  background: ${(props) =>
    props.$danger
      ? "var(--active-color)"
      : props.$active
        ? "var(--active-color)"
        : "var(--meet-panel)"};
  color: ${(props) =>
    props.$danger ? "var(--meet-danger)" : props.$active ? "var(--meet-accent)" : "var(--meet-text)"};
  box-shadow: ${(props) =>
    props.$danger
      ? "inset 0 0 0 1px var(--meet-danger)"
      : props.$active
        ? "inset 0 0 0 1px var(--meet-accent)"
        : "none"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 0 11px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 850;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: ${(props) =>
      props.$danger
        ? "var(--active-color)"
        : props.$active
          ? "var(--active-color)"
          : "var(--meet-panel-strong)"};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const Stage = styled.main`
  min-height: 0;
  height: 100%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$drawerOpen ? "minmax(0, 1fr) clamp(240px, 24vw, 320px)" : "minmax(0, 1fr)"};
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const StagePanel = styled.section`
  position: relative;
  min-width: 0;
  min-height: 0;
  height: 100%;
`;

const VideoPanel = styled.div`
  min-height: 0;
  height: 100%;
  border: 1px solid var(--meet-border);
  border-radius: 15px;
  padding: 12px;
  background: var(--meet-panel);
  overflow: hidden;

  > div {
    height: 100%;
    min-height: 100%;
  }

  @media (max-width: 980px) {
    padding: 8px;
    border-radius: 18px;
    min-width: 0;
  }
`;

const VideoFocusStage = styled(FocusLayoutContainer)`
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: ${(props) =>
    props.$railHidden ? "minmax(0, 1fr)" : "clamp(160px, 18vw, 320px) minmax(0, 1fr)"};
  gap: 12px;

  > * {
    min-width: 0;
    min-height: 0;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    grid-template-rows: ${(props) =>
      props.$railHidden ? "minmax(0, 1fr)" : "minmax(0, 1fr) clamp(120px, 20vh, 200px)"};
    height: 100%;
    width: 100%;
    max-width: 100%;

    > :first-child {
      order: ${(props) => (props.$mobileRailLast ? 2 : 1)};
      min-height: 0;
      height: 100%;
    }

    > :last-child {
      order: ${(props) => (props.$mobileRailLast ? 1 : 2)};
      min-height: 0;
      height: 100%;
    }
  }
`;

const ParticipantGrid = styled.div`
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  grid-auto-rows: minmax(220px, 1fr);
  gap: 12px;

  @media (max-width: 980px) {
    height: auto;
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(160px, 1fr);
  }
`;

const ParticipantGridItem = styled.div`
  min-width: 0;
  min-height: 0;
`;

const WhiteboardRailList = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 2px;

  @media (max-width: 980px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding-right: 0;
    padding-bottom: 2px;
    height: 100%;
  }
`;

const WhiteboardRailItem = styled.div`
  flex: 0 0 clamp(180px, 24vh, 260px);
  width: 100%;
  max-width: 100%;
  min-width: 0;
  min-height: 180px;
  overflow: hidden;

  > * {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  @media (max-width: 980px) {
    flex: 0 0 clamp(180px, 60vw, 260px);
    width: clamp(180px, 60vw, 260px);
    max-width: clamp(180px, 60vw, 260px);
    min-height: 0;
    height: 100%;
  }
`;

const ParticipantTileFrame = styled.div.attrs((props) => ({
  "data-focused-tile": props.$focused ? "true" : undefined,
  "data-rail-hidden": props.$railHidden ? "true" : undefined,
}))`
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
  align-self: stretch;

  .lk-participant-tile {
    width: 100%;
    height: 100%;
    min-height: 100%;
  }

  @media (max-width: 600px) {
    &[data-focused-tile="true"][data-rail-hidden="true"] .lk-participant-tile {
      min-height: calc(100dvh - 195px);
    }
  }

  .lk-participant-tile > .lk-focus-toggle-button {
    display: none;
  }
`;

const TileFocusToggleButton = styled(FocusToggle)`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 4;
  width: 36px;
  height: 36px;
  border: 1px solid var(--meet-border);
  border-radius: 12px;
  padding: 0;
  color: var(--meet-text);
  background: var(--meet-panel);
  opacity: 0;
  pointer-events: auto;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    background 0.18s ease;

  ${ParticipantTileFrame}:hover &,
  ${ParticipantTileFrame}:focus-within &,
  &[aria-pressed="true"] {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-1px);
    background: var(--meet-hover);
  }
`;

const RailToggleButton = styled.button`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 4;
  width: 36px;
  height: 36px;
  border: 1px solid var(--meet-border);
  border-radius: 12px;
  padding: 0;
  color: var(--meet-text);
  background: var(--meet-panel);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
    background: var(--meet-hover);
  }
`;

const Rail = styled.div`
  min-height: 0;
  min-width: 0;
  grid-column: ${(props) => (props.$left ? "1" : "auto")};
  padding: ${(props) => (props.$compact ? "6px" : "8px")};
  border: 1px solid var(--meet-border);
  border-radius: 14px;
  background: var(--meet-panel);
  overflow: hidden;

  .lk-carousel[data-lk-orientation="vertical"] {
    justify-content: flex-start;
    align-items: stretch;
  }

  @media (max-width: 980px) {
    grid-column: auto;
  }
`;

const Drawer = styled.aside`
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--meet-border);
  border-radius: 14px;
  background: var(--meet-panel);
  overflow: hidden;

  @media (max-width: 980px) {
    position: fixed;
    inset: 12px 12px 88px;
    z-index: 5;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px;
  border-bottom: 1px solid var(--meet-border);

  @media (max-width: 980px) {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--meet-panel);
  }
`;

const DrawerTabs = styled.div`
  display: flex;
  gap: 6px;
`;

const DrawerTab = styled.button`
  border: 1px solid ${(props) => (props.$active ? "var(--meet-accent)" : "transparent")};
  border-radius: 15px;
  padding: 8px 10px;
  background: ${(props) => (props.$active ? "var(--active-color)" : "var(--meet-bg)")};
  color: var(--meet-text);
  cursor: pointer;
  font-size: 12px;
  font-weight: 800;
`;

const DrawerBody = styled.div`
  min-height: 0;
  flex: 1;
  overflow: auto;
  padding: ${(props) => (props.$flush ? "0" : "14px")};
`;

const DrawerCloseButton = styled.button`
  display: none;

  @media (max-width: 980px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--meet-border);
    border-radius: 12px;
    background: var(--meet-input);
    color: var(--meet-text);
    cursor: pointer;
    flex: 0 0 auto;
  }
`;

const ParticipantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ParticipantRow = styled.div`
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 15px;
  background: var(--meet-bg);
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--meet-border);
  color: var(--meet-accent);
  background: var(--meet-input);
  font-weight: 900;
`;

const ParticipantMeta = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ParticipantNameText = styled.strong`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
`;

const ParticipantSub = styled.span`
  color: var(--meet-muted);
  font-size: 11px;
`;

const KnockCard = styled.div`
  display: grid;
  gap: 9px;
  padding: 12px;
  border-radius: 15px;
  border: 1px solid var(--meet-warning);
  background: var(--meet-bg);
`;

const KnockActions = styled.div`
  display: flex;
  gap: 8px;
`;

const KnockButton = styled.button`
  flex: 1;
  min-height: 34px;
  border: 1px solid transparent;
  border-radius: 15px;
  background: ${(props) =>
    props.$approve ? "var(--meet-success)" : "var(--meet-danger)"};
  color: #fff;
  cursor: pointer;
  font-weight: 850;
`;

const BottomBar = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 58px;

  @media (max-width: 980px) {
    position: sticky;
    bottom: 0;
    z-index: 4;
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }
`;

const BottomControlDock = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 58px;
  padding: 8px;
  border: 1px solid var(--meet-border);
  border-radius: 15px;
  background: var(--meet-panel);
  max-width: 100%;

  .lk-control-bar {
    border: none;
    background: transparent;
    padding: 0;
  }

  @media (max-width: 980px) {
    width: fit-content;
    max-width: calc(100vw - 20px - env(safe-area-inset-left, 0px) - env(safe-area-inset-right, 0px));
    min-height: 54px;
    padding: 6px;
    border-radius: 18px;
    justify-content: center;
    overflow: visible;
  }
`;

const CenterState = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: var(--meet-bg);
  color: var(--meet-text);
`;

const StateCard = styled.div`
  width: min(100%, 430px);
  display: grid;
  gap: 16px;
  justify-items: center;
  text-align: center;
  padding: 28px;
  border: 1px solid var(--meet-border);
  border-radius: 15px;
  background: var(--meet-panel);
`;

const StateIcon = styled.div`
  width: 64px;
  height: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background: var(--meet-input);
`;

const StateTitle = styled.h2`
  margin: 0;
  font-size: 22px;
`;

const StateText = styled.p`
  margin: 0;
  color: var(--meet-muted);
  line-height: 1.55;
`;

const LoadingLine = styled.div`
  width: 100%;
  height: 8px;
  overflow: hidden;
  border-radius: 14px;
  background: var(--meet-input);

  &::before {
    content: "";
    display: block;
    width: 55%;
    height: 100%;
    border-radius: inherit;
    background: var(--meet-accent);
  }
`;

const MiniCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  border: none;
  color: var(--meet-pip-text);
  background: var(--meet-pip-shell);
  text-align: left;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 8px;
  padding: 8px;
  overflow: hidden;
`;

const MiniBody = styled.div`
  position: relative;
  min-height: 0;
  overflow: hidden;
  border-radius: 14px;
  background:
    radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.06), transparent 34%),
    linear-gradient(135deg, #324965 0%, #617692 100%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);

  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: transparent;
  }
`;

const MiniAvatarWrap = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
`;

const MiniAvatar = styled.div`
  width: 58px;
  height: 58px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(236, 240, 246, 0.92));
  color: #1f2937;
  font-size: 20px;
  font-weight: 800;
  box-shadow:
    0 12px 32px rgba(15, 23, 42, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.72);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MiniMutedBadge = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #0b3d85;
  color: #dbeafe;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.18);
`;

const MiniName = styled.div`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 10px;
  overflow: hidden;
  color: #fff;
  font-size: 14px;
  font-weight: 650;
  line-height: 1.1;
  text-overflow: ellipsis;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  white-space: nowrap;
`;

const MiniControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const MiniControlButton = styled.button`
  width: ${(props) =>
    props.$wide ? "clamp(48px, 14vw, 60px)" : "clamp(38px, 10vw, 44px)"};
  height: clamp(38px, 10vw, 44px);
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$danger ? "#ea4335" : props.$active ? "#fde1e1" : "#2d2f33"};
  color: ${(props) => (props.$active ? "#7f1d1d" : "#fff")};
  cursor: pointer;
  transition: filter 0.16s ease, transform 0.16s ease;

  &:hover {
    filter: brightness(1.06);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const PiPFrame = styled(Overlay)`
  --meet-pip-shell: #111214;
  --meet-pip-text: #fff;

  position: static;
  inset: auto;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
  background: #111214;
  animation: none;
`;

const HiddenOnMobile = styled.span`
  @media (max-width: 760px) {
    display: none;
  }
`;

const buildMeetUrl = (roomId) => `${RESOLVED_APP_BASE_URL}/join/${roomId}`;

const resolveDisplayName = (preferredDisplayName, currentUser) =>
  preferredDisplayName?.trim() ||
  currentUser?.nickname ||
  currentUser?.name ||
  currentUser?.displayName ||
  currentUser?.username ||
  currentUser?.email ||
  "Guest";

const getConnectionToastConfig = (state) => {
  switch (state) {
    case "connected":
      return {
        kind: "success",
        message: "Meetga ulandingiz",
      };
    case "connecting":
      return {
        kind: "loading",
        message: "Meetga ulanmoqda",
      };
    case "reconnecting":
      return {
        kind: "loading",
        message: "Ulanish qayta tiklanmoqda",
      };
    case "disconnected":
      return {
        kind: "error",
        message: "Ulanish uzildi",
      };
    default:
      return {
        kind: "default",
        message: `Connection: ${state}`,
      };
  }
};

function LoadingState({ title, description, icon: Icon = Sparkles, onCancel }) {
  return (
    <Overlay data-lk-theme="default">
      <CenterState>
        <StateCard>
          <StateIcon>
            <Icon size={30} />
          </StateIcon>
          <div>
            <StateTitle>{title}</StateTitle>
            <StateText>{description}</StateText>
          </div>
          <LoadingLine />
          {onCancel ? (
            <IconButton type="button" onClick={onCancel}>
              Bekor qilish
            </IconButton>
          ) : null}
        </StateCard>
      </CenterState>
    </Overlay>
  );
}

function ErrorState({ title, description, onClose }) {
  return (
    <Overlay data-lk-theme="default">
      <CenterState>
        <StateCard>
          <StateIcon>
            <AlertCircle size={32} color="var(--danger-color)" />
          </StateIcon>
          <div>
            <StateTitle>{title}</StateTitle>
            <StateText>{description}</StateText>
          </div>
          <IconButton type="button" $danger onClick={onClose}>
            <PhoneOff size={16} />
            Chiqish
          </IconButton>
        </StateCard>
      </CenterState>
    </Overlay>
  );
}

const getMiniParticipantName = (participant, fallback = "Guest") =>
  participant?.name || participant?.identity || fallback;

const getParticipantStableKey = (participant) => {
  const metadata = String(participant?.metadata || "").trim();
  if (metadata) {
    try {
      const parsed = JSON.parse(metadata);
      const metadataKey =
        parsed?.userId ||
        parsed?.user_id ||
        parsed?.user?.id ||
        parsed?.user?.userId;

      if (typeof metadataKey === "string" && metadataKey.trim()) {
        return `metadata:${metadataKey.trim()}`;
      }
    } catch {
      // LiveKit metadata is optional and can be arbitrary text.
    }
  }

  const identity = String(participant?.identity || "").trim();
  if (!identity) return "";
  return identity.replace(/-[a-z0-9]{4,16}$/i, "") || identity;
};

const getParticipantMediaScore = (participant) => {
  if (!participant?.trackPublications?.values) return 0;

  let score = 0;
  for (const publication of participant.trackPublications.values()) {
    if (publication?.track) score += 4;
    if (publication?.isSubscribed) score += 2;
    if (!publication?.isMuted) score += 1;
  }
  return score;
};

const shouldUseParticipantCandidate = (candidate, current, localIdentity) => {
  if (!current) return true;
  if (candidate?.identity === localIdentity) return true;
  if (current?.identity === localIdentity) return false;

  const candidateScore = getParticipantMediaScore(candidate);
  const currentScore = getParticipantMediaScore(current);
  if (candidateScore !== currentScore) return candidateScore > currentScore;

  return true;
};

const dedupeParticipantsByStableKey = (participants, localParticipant) => {
  const orderedParticipants = [
    localParticipant,
    ...participants.filter(
      (participant) =>
        participant?.sid !== localParticipant?.sid &&
        participant?.identity !== localParticipant?.identity,
    ),
  ];
  const byStableKey = new Map();

  for (const participant of orderedParticipants) {
    const stableKey =
      getParticipantStableKey(participant) || participant?.sid || participant?.identity;
    if (!stableKey) continue;

    const current = byStableKey.get(stableKey);
    if (shouldUseParticipantCandidate(participant, current, localParticipant?.identity)) {
      byStableKey.set(stableKey, participant);
    }
  }

  return Array.from(byStableKey.values());
};

const getMiniParticipantAvatar = (participant) => {
  const metadata = String(participant?.metadata || "").trim();
  if (!metadata) return "";

  try {
    const parsed = JSON.parse(metadata);
    return parsed?.avatar || parsed?.avatarUrl || parsed?.picture || "";
  } catch {
    return "";
  }
};

function MiniParticipantPreview({ trackRef, participant }) {
  const videoRef = useRef(null);
  const track = trackRef?.publication?.track || trackRef?.track || null;
  const participantForPreview = participant || trackRef?.participant;
  const previewSource = String(trackRef?.publication?.source || trackRef?.source || "");
  const isScreenPreview = previewSource.includes("screen");
  const canShowTrack = Boolean(
    track &&
      !trackRef?.publication?.isMuted &&
      (isScreenPreview || participantForPreview?.isCameraEnabled !== false),
  );
  const name = getMiniParticipantName(participantForPreview);
  const avatar = getMiniParticipantAvatar(participantForPreview);
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase() || "?";

  useEffect(() => {
    const element = videoRef.current;
    if (!element || !canShowTrack || !track) return undefined;

    track.attach(element);
    return () => {
      track.detach(element);
    };
  }, [canShowTrack, track]);

  if (canShowTrack) {
    return (
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={Boolean(participantForPreview?.isLocal)}
      />
    );
  }

  return (
    <MiniAvatarWrap>
      <MiniAvatar>
        {avatar ? <img src={avatar} alt="" /> : initials}
      </MiniAvatar>
    </MiniAvatarWrap>
  );
}

function ParticipantsPanel({
  participants,
  knockRequests,
  isCreator,
  roomIsPrivate,
  onApproveKnock,
  onRejectKnock,
  onSetRoomPrivacy,
}) {
  return (
    <ParticipantList>
      {isCreator ? (
        <>
          <IconButton
            type="button"
            $active={roomIsPrivate}
            onClick={() => onSetRoomPrivacy(!roomIsPrivate)}
          >
            <ShieldCheck size={15} />
            {roomIsPrivate ? "Ruxsat so'rash yoniq" : "Ruxsat so'rash o'chiq"}
          </IconButton>
          {knockRequests.map((request) => (
            <KnockCard key={request.peerId}>
              <ParticipantNameText>
                {request.displayName || "Guest"} kutmoqda
              </ParticipantNameText>
              <KnockActions>
                <KnockButton
                  type="button"
                  $approve
                  onClick={() => onApproveKnock(request.peerId)}
                >
                  Qabul
                </KnockButton>
                <KnockButton
                  type="button"
                  onClick={() => onRejectKnock(request.peerId)}
                >
                  Rad etish
                </KnockButton>
              </KnockActions>
            </KnockCard>
          ))}
        </>
      ) : null}

      {participants.map((participant) => {
        const name = participant.name || participant.identity || "Guest";
        return (
          <ParticipantRow key={participant.sid || participant.identity}>
            <Avatar>{name.charAt(0).toUpperCase()}</Avatar>
            <ParticipantMeta>
              <ParticipantNameText>
                {name}
                {participant.isLocal ? " (Sen)" : ""}
              </ParticipantNameText>
              <ParticipantSub>
                {participant.isSpeaking ? "Gapiryapti" : "Ulangan"}
              </ParticipantSub>
            </ParticipantMeta>
            <ConnectionQualityIndicator participant={participant} />
          </ParticipantRow>
        );
      })}
    </ParticipantList>
  );
}

const getTrackReferenceKey = (trackRef) => {
  if (!trackRef) return "";
  const participantKey =
    trackRef.participant?.sid || trackRef.participant?.identity || "participant";
  const publicationKey =
    trackRef.publication?.trackSid ||
    trackRef.publication?.sid ||
    trackRef.publication?.trackName ||
    trackRef.source ||
    "placeholder";
  return `${participantKey}:${trackRef.source || "unknown"}:${publicationKey}`;
};

const isSameTrackReference = (first, second) =>
  Boolean(first && second && getTrackReferenceKey(first) === getTrackReferenceKey(second));

const WHITEBOARD_TILE_KEY = "jamm-whiteboard-tile";

const WhiteboardPseudoTile = styled.div.attrs({
  className: "lk-participant-tile",
  "data-lk-source": "whiteboard",
})`
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 100%;
  display: block;
  padding: 0;
  overflow: hidden;
  border: none !important;
  border-radius: 14px;
  background: transparent !important;
  box-shadow: none !important;

  &::before,
  &::after {
    display: none !important;
  }

  > * {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    height: 100%;
  }
`;

function WhiteboardTileFrame({ children, onTogglePin, isPinned }) {
  return (
    <ParticipantTileFrame>
      <WhiteboardPseudoTile>{children}</WhiteboardPseudoTile>
      {onTogglePin ? (
        <TileFocusToggleButton
          as="button"
          type="button"
          aria-pressed={isPinned ? "true" : "false"}
          onClick={onTogglePin}
          title={isPinned ? "Whiteboard fullscreen'dan chiqish" : "Whiteboard fullscreen"}
          aria-label={isPinned ? "Whiteboard fullscreen'dan chiqish" : "Whiteboard fullscreen"}
        >
          {isPinned ? <UnfocusToggleIcon /> : <FocusToggleIcon />}
        </TileFocusToggleButton>
      ) : null}
    </ParticipantTileFrame>
  );
}

function FocusableParticipantTile({ trackRef }) {
  const contextTrackRef = useMaybeTrackRefContext();
  const resolvedTrackRef = trackRef || contextTrackRef;

  if (!resolvedTrackRef) return null;

  return (
    <ParticipantTileFrame>
      <ParticipantTile trackRef={resolvedTrackRef} />
      <TileFocusToggleButton
        trackRef={resolvedTrackRef}
        title="Tile fullscreen"
        aria-label="Tile fullscreen"
      />
    </ParticipantTileFrame>
  );
}

function FocusableParticipantLayout({ tracks, whiteboardTile }) {
  const layoutContext = useMaybeLayoutContext();
  const pinnedTracks = usePinnedTracks();
  const autoFocusedWhiteboardRef = useRef(false);
  const [isRailHidden, setIsRailHidden] = useState(false);
  const [isWhiteboardPinned, setIsWhiteboardPinned] = useState(false);
  const visibleTracks = useMemo(() => tracks.filter(Boolean), [tracks]);
  const focusedTrack = useMemo(
    () =>
      pinnedTracks.find((pinnedTrack) =>
        visibleTracks.some((trackRef) => isSameTrackReference(trackRef, pinnedTrack)),
      ) || null,
    [pinnedTracks, visibleTracks],
  );
  const whiteboardFocused = Boolean(whiteboardTile) && isWhiteboardPinned && !focusedTrack;
  const carouselTracks = useMemo(
    () =>
      focusedTrack
        ? visibleTracks.filter((trackRef) => !isSameTrackReference(trackRef, focusedTrack))
        : visibleTracks,
    [focusedTrack, visibleTracks],
  );

  useEffect(() => {
    if (whiteboardTile) {
      if (!autoFocusedWhiteboardRef.current) {
        setIsWhiteboardPinned(true);
        autoFocusedWhiteboardRef.current = true;
      }
    } else if (autoFocusedWhiteboardRef.current) {
      setIsWhiteboardPinned(false);
      autoFocusedWhiteboardRef.current = false;
    }
  }, [whiteboardTile]);

  useEffect(() => {
    if (focusedTrack && isWhiteboardPinned) {
      setIsWhiteboardPinned(false);
    }
  }, [focusedTrack, isWhiteboardPinned]);

  const railHasContent = whiteboardFocused
    ? visibleTracks.length > 0
    : Boolean(whiteboardTile) || carouselTracks.length > 0;

  useEffect(() => {
    if ((!focusedTrack && !whiteboardFocused) || !railHasContent) {
      setIsRailHidden(false);
    }
  }, [focusedTrack, whiteboardFocused, railHasContent]);

  if (visibleTracks.length === 0 && !whiteboardTile) return null;

  const handleToggleWhiteboardPin = () => {
    setIsWhiteboardPinned((current) => {
      if (!current) {
        const pinDispatch = layoutContext?.pin?.dispatch;
        if (pinDispatch && focusedTrack) {
          pinDispatch({ msg: "clear_pin" });
        }
      }
      return !current;
    });
  };

  if (whiteboardFocused) {
    return (
      <VideoFocusStage $railHidden={isRailHidden || !railHasContent} $mobileRailLast>
        {!isRailHidden && visibleTracks.length > 0 ? (
          <Rail $left $compact>
            <WhiteboardRailList>
              {visibleTracks.map((trackRef) => (
                <WhiteboardRailItem key={getTrackReferenceKey(trackRef)}>
                  <FocusableParticipantTile trackRef={trackRef} />
                </WhiteboardRailItem>
              ))}
            </WhiteboardRailList>
          </Rail>
        ) : null}
        <ParticipantTileFrame $focused $railHidden={isRailHidden || !railHasContent}>
          {railHasContent ? (
            <RailToggleButton
              type="button"
              onClick={() => setIsRailHidden((current) => !current)}
              aria-label={isRailHidden ? "Chap tile panelini ko'rsatish" : "Chap tile panelini yashirish"}
              title={isRailHidden ? "Chap tile panelini ko'rsatish" : "Chap tile panelini yashirish"}
            >
              {isRailHidden ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </RailToggleButton>
          ) : null}
          <WhiteboardPseudoTile>{whiteboardTile}</WhiteboardPseudoTile>
          <TileFocusToggleButton
            as="button"
            type="button"
            aria-pressed="true"
            onClick={handleToggleWhiteboardPin}
            title="Whiteboard fullscreen'dan chiqish"
            aria-label="Whiteboard fullscreen'dan chiqish"
          >
            <UnfocusToggleIcon />
          </TileFocusToggleButton>
        </ParticipantTileFrame>
      </VideoFocusStage>
    );
  }

  if (focusedTrack) {
    return (
      <VideoFocusStage
        $railHidden={isRailHidden || !railHasContent}
        $mobileRailLast
      >
        {!isRailHidden && railHasContent ? (
          <Rail $left $compact>
            <WhiteboardRailList>
              {whiteboardTile ? (
                <WhiteboardRailItem>
                  <WhiteboardTileFrame
                    onTogglePin={handleToggleWhiteboardPin}
                    isPinned={false}
                  >
                    {whiteboardTile}
                  </WhiteboardTileFrame>
                </WhiteboardRailItem>
              ) : null}
              {carouselTracks.map((trackRef) => (
                <WhiteboardRailItem key={getTrackReferenceKey(trackRef)}>
                  <FocusableParticipantTile trackRef={trackRef} />
                </WhiteboardRailItem>
              ))}
            </WhiteboardRailList>
          </Rail>
        ) : null}
        <ParticipantTileFrame $focused $railHidden={isRailHidden || !railHasContent}>
          {railHasContent ? (
            <RailToggleButton
              type="button"
              onClick={() => setIsRailHidden((current) => !current)}
              aria-label={isRailHidden ? "Chap tile panelini ko'rsatish" : "Chap tile panelini yashirish"}
              title={isRailHidden ? "Chap tile panelini ko'rsatish" : "Chap tile panelini yashirish"}
            >
              {isRailHidden ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </RailToggleButton>
          ) : null}
          <FocusLayout trackRef={focusedTrack} />
          <TileFocusToggleButton
            trackRef={focusedTrack}
            title="Tile fullscreen'dan chiqish"
            aria-label="Tile fullscreen'dan chiqish"
          />
        </ParticipantTileFrame>
      </VideoFocusStage>
    );
  }

  return (
    <ParticipantGrid>
      {whiteboardTile ? (
        <ParticipantGridItem key={WHITEBOARD_TILE_KEY}>
          <WhiteboardTileFrame
            onTogglePin={handleToggleWhiteboardPin}
            isPinned={false}
          >
            {whiteboardTile}
          </WhiteboardTileFrame>
        </ParticipantGridItem>
      ) : null}
      {visibleTracks.map((trackRef) => (
        <ParticipantGridItem key={getTrackReferenceKey(trackRef)}>
          <FocusableParticipantTile trackRef={trackRef} />
        </ParticipantGridItem>
      ))}
    </ParticipantGrid>
  );
}

function PersistentChatPanel({
  chatMessages,
  chatDraft,
  isSending,
  onChatDraftChange,
  onChatSubmit,
}) {
  const listRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [chatMessages.length]);

  return (
    <div className="lk-chat">
      <ul className="lk-list lk-chat-messages" ref={listRef}>
        {chatMessages.map((message, index, allMessages) => {
          const hideName = index >= 1 && allMessages[index - 1].from === message.from;
          const hideTimestamp =
            index >= 1 && message.timestamp - allMessages[index - 1].timestamp < 60_000;

          return (
            <ChatEntry
              key={message.id ?? index}
              hideName={hideName}
              hideTimestamp={hideName === false ? false : hideTimestamp}
              entry={message}
              messageFormatter={formatChatMessageLinks}
            />
          );
        })}
      </ul>
      <form className="lk-chat-form" onSubmit={onChatSubmit}>
        <input
          className="lk-form-control lk-chat-form-input"
          disabled={isSending}
          type="text"
          value={chatDraft}
          placeholder="Enter a message..."
          onChange={(event) => onChatDraftChange(event.target.value)}
          onInput={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
          onKeyUp={(event) => event.stopPropagation()}
        />
        <button
          type="submit"
          className="lk-button lk-chat-form-button"
          disabled={isSending || !chatDraft.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}

function MeetContent({
  roomId,
  title,
  isCreator,
  isMinimized,
  onMinimize,
  onMaximize,
  onClose,
  signaling,
  roomCreatorId,
}) {
  const [pipWindow, setPipWindow] = useState(null);
  const [pipContainer, setPipContainer] = useState(null);
  const [documentPipMinimized, setDocumentPipMinimized] = useState(false);
  const connectionToastStateRef = useRef(null);
  const lastSpeakingParticipantKeyRef = useRef(null);
  const pipCloseIntentRef = useRef(false);
  const pipWindowRef = useRef(null);
  const [whiteboardTool, setWhiteboardTool] = useState(WHITEBOARD_DEFAULT_TOOL);
  const [whiteboardColor, setWhiteboardColor] = useState(WHITEBOARD_DEFAULT_COLOR);
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
  const [recordSurfaceNode, setRecordSurfaceNode] = useState(null);
  const [recordSurfaceType, setRecordSurfaceType] = useState(null);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [microphoneDevices, setMicrophoneDevices] = useState([]);
  const [speakerDevices, setSpeakerDevices] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [selectedMicrophoneId, setSelectedMicrophoneId] = useState("");
  const [selectedSpeakerId, setSelectedSpeakerId] = useState("");
  const [lessonControlsOpen, setLessonControlsOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(detectMeetMobileViewport);

  const room = useRoomContext();
  const roomInfo = useRoomInfo();
  const connectionState = useConnectionState(room);
  const supportsDocumentPiP =
    typeof window !== "undefined" && Boolean(window.documentPictureInPicture?.requestWindow);
  const rawParticipants = useParticipants({ room });
  const participants = useMemo(
    () => dedupeParticipantsByStableKey(rawParticipants, room.localParticipant),
    [rawParticipants, room.localParticipant],
  );
  const speakingParticipants = useSpeakingParticipants();
  const liveKitServerIsRecording = useIsRecording(room);

  useEffect(() => {
    const handleViewportChange = () => {
      setIsMobileViewport(detectMeetMobileViewport());
    };

    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);
    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
    };
  }, []);

  const recorder = useMeetRecorder({
    roomId,
    isCreator,
    roomCreatorId,
    surfaceNode: recordSurfaceNode,
    surfaceType: recordSurfaceType,
    livekitRoom: room,
    onError: (message) => {
      if (message) toast.error(message, { id: "meet-recorder-error" });
    },
    onStatusChange: (nextStatus) => {
      const toastId = "meet-recorder-status";
      if (nextStatus === "starting") {
        toast.loading("Recording boshlanmoqda...", { id: toastId });
      } else if (nextStatus === "recording") {
        toast.success("Recording boshlandi", { id: toastId });
      } else if (nextStatus === "stopping") {
        toast.loading("Recording to'xtatilmoqda...", { id: toastId });
      } else if (nextStatus === "finalizing") {
        toast.loading("Recording saqlanmoqda...", { id: toastId });
      } else if (nextStatus === "ready") {
        toast.success("Recording saqlandi, saved messages'ga yuborildi", {
          id: toastId,
        });
      } else if (nextStatus === "failed") {
        toast.dismiss(toastId);
      }
    },
  });

  const handleRecordSurfaceChange = useCallback((node, type) => {
    setRecordSurfaceNode(node || null);
    setRecordSurfaceType(type || null);
  }, []);

  const handleToggleRecording = useCallback(async () => {
    if (recorder.isBusy) return;
    const result = await recorder.toggle();
    if (result && result.ok === false && result.error) {
      toast.error(result.error);
    }
  }, [recorder]);
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  const participantSids = useMemo(
    () => new Set(participants.map((participant) => participant?.sid).filter(Boolean)),
    [participants],
  );
  const visibleTracks = useMemo(
    () =>
      tracks.filter((trackRef) => {
        const participant = trackRef?.participant;
        if (!participant?.sid) return true;
        return participantSids.has(participant.sid);
      }),
    [participantSids, tracks],
  );
  const cameraTracks = visibleTracks.filter((trackRef) => trackRef.source === Track.Source.Camera);
  const fallbackParticipantTracks = useMemo(
    () =>
      participants.map((participant) => ({
        participant,
        source: Track.Source.Camera,
      })),
    [participants],
  );
  const stageTracks = visibleTracks.length > 0 ? visibleTracks : fallbackParticipantTracks;
  const hasWhiteboard = signaling.whiteboardState.isActive;
  const canShowLessonControls = Boolean(isCreator && signaling.lessonMeet);
  const primaryTitle = title || roomInfo.name || "Jamm Meet";
  const previewTracks = useMemo(
    () =>
      cameraTracks.length > 0
        ? cameraTracks
        : fallbackParticipantTracks,
    [cameraTracks, fallbackParticipantTracks],
  );

  const getParticipantKey = useCallback(
    (participant) => participant?.sid || participant?.identity || null,
    [],
  );

  const currentSpeakingParticipantKey = useMemo(
    () => getParticipantKey(speakingParticipants?.[0]),
    [getParticipantKey, speakingParticipants],
  );

  useEffect(() => {
    if (currentSpeakingParticipantKey) {
      lastSpeakingParticipantKeyRef.current = currentSpeakingParticipantKey;
    }
  }, [currentSpeakingParticipantKey]);

  const previewTrackRef = useMemo(() => {
    const preferredParticipantKey =
      currentSpeakingParticipantKey || lastSpeakingParticipantKeyRef.current;

    if (preferredParticipantKey) {
      const matchedTrack = previewTracks.find(
        (trackRef) => getParticipantKey(trackRef?.participant) === preferredParticipantKey,
      );

      if (matchedTrack) {
        return matchedTrack;
      }
    }

    return previewTracks[0] || null;
  }, [currentSpeakingParticipantKey, getParticipantKey, previewTracks]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(buildMeetUrl(roomId));
      toast.success("Meet havolasi nusxalandi");
    } catch {
      toast.error("Havolani nusxalab bo'lmadi");
    }
  }, [roomId]);

  const closePiPWindow = useCallback(() => {
    const activePipWindow = pipWindowRef.current;
    if (activePipWindow && !activePipWindow.closed) {
      pipCloseIntentRef.current = true;
      activePipWindow.close();
    }

    pipWindowRef.current = null;
    setPipWindow(null);
    setPipContainer(null);
    setDocumentPipMinimized(false);
  }, []);

  useEffect(() => () => closePiPWindow(), [closePiPWindow]);

  const handleLeave = useCallback(async () => {
    closePiPWindow();
    if (recorder.isRecording || recorder.isBusy) {
      try {
        await recorder.stop();
      } catch {
        /* noop */
      }
    }
    signaling.leaveSignaling();
    room.disconnect();
    onClose?.();
  }, [closePiPWindow, onClose, recorder, room, signaling]);

  const handleWhiteboardToggle = useCallback(() => {
    const ok = signaling.toggleWhiteboard();
    if (!ok && !isCreator) {
      toast("Whiteboardni faqat host boshqaradi");
    }
  }, [isCreator, signaling]);

  const handleRoomPrivacyChange = useCallback(
    async (nextIsPrivate) => {
      try {
        await signaling.setRoomPrivacy(nextIsPrivate);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Meet turi saqlanmadi",
        );
      }
    },
    [signaling],
  );

  const handlePdfUpload = useCallback(
    async (file) => {
      const result = await signaling.uploadWhiteboardPdf(file);
      if (!result?.ok) toast.error(result?.error || "PDF yuklanmadi");
      return result;
    },
    [signaling],
  );

  const handlePdfOpen = useCallback(
    (item, options) => {
      const result = signaling.addWhiteboardPdfTab(item, options);
      if (!result?.ok) toast.error(result?.error || "PDF ochilmadi");
      return result;
    },
    [signaling],
  );

  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return;

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const nextCameraDevices = buildCameraDeviceOptions(
        devices.filter((device) => device.kind === "videoinput"),
      );
      const nextMicrophoneDevices = devices
        .filter((device) => device.kind === "audioinput")
        .map((device, index) => ({
          id: device.deviceId,
          label: device.label || `Microphone ${index + 1}`,
        }));
      const nextSpeakerDevices = devices
        .filter((device) => device.kind === "audiooutput")
        .map((device, index) => ({
          id: device.deviceId,
          label: device.label || `Speaker ${index + 1}`,
        }));

      setCameraDevices(nextCameraDevices);
      setMicrophoneDevices(nextMicrophoneDevices);
      setSpeakerDevices(nextSpeakerDevices);
      setSelectedCameraId((current) => current || nextCameraDevices[0]?.id || "");
      setSelectedMicrophoneId((current) => current || nextMicrophoneDevices[0]?.id || "");
      setSelectedSpeakerId((current) => current || nextSpeakerDevices[0]?.id || "");
    } catch {
      // ignore device enumeration failures
    }
  }, []);

  useEffect(() => {
    refreshDevices();
    if (!navigator.mediaDevices?.addEventListener) return undefined;

    navigator.mediaDevices.addEventListener("devicechange", refreshDevices);
    return () => navigator.mediaDevices.removeEventListener("devicechange", refreshDevices);
  }, [refreshDevices]);

  const handleToggleMicrophone = useCallback(async () => {
    if (signaling.localMediaLocks?.micLocked) {
      toast("Mikrofon host tomonidan bloklangan");
      return;
    }
    try {
      await room.localParticipant.setMicrophoneEnabled(
        !room.localParticipant.isMicrophoneEnabled,
      );
    } catch {
      toast.error("Mikrofonni boshqarib bo'lmadi");
    }
  }, [room.localParticipant, signaling.localMediaLocks?.micLocked]);

  const handleToggleCamera = useCallback(async () => {
    if (signaling.localMediaLocks?.camLocked) {
      toast("Kamera host tomonidan bloklangan");
      return;
    }
    try {
      if (!room.localParticipant.isCameraEnabled) {
        const nextSelection = parseCameraDeviceSelection(selectedCameraId);
        if (nextSelection.mode === "facing") {
          await room.localParticipant.setCameraEnabled(true, {
            deviceId: nextSelection.deviceId || undefined,
            facingMode: nextSelection.facingMode,
          });
        } else {
          await room.localParticipant.setCameraEnabled(true);
        }
      } else {
        await room.localParticipant.setCameraEnabled(false);
      }
    } catch {
      toast.error("Kamerani boshqarib bo'lmadi");
    }
  }, [room.localParticipant, selectedCameraId, signaling.localMediaLocks?.camLocked]);

  useEffect(() => {
    if (!room?.localParticipant || !signaling.localMediaLocks?.micLocked) return;
    void room.localParticipant.setMicrophoneEnabled(false).catch(() => {});
  }, [room, signaling.localMediaLocks?.micLocked]);

  useEffect(() => {
    if (!room?.localParticipant || !signaling.localMediaLocks?.camLocked) return;
    void room.localParticipant.setCameraEnabled(false).catch(() => {});
  }, [room, signaling.localMediaLocks?.camLocked]);

  const handleToggleScreenShare = useCallback(async () => {
    try {
      const nextEnabled = !room.localParticipant.isScreenShareEnabled;
      // Lessons are taught over screenshare — make it the highest quality
      // surface in the meet:
      //   • 1080p @ 30fps (was 15fps; cursor and code now look smooth)
      //   • H.264 codec — hardware decode on iOS Safari, lower CPU than VP8
      //   • contentHint "detail" — tells the encoder to preserve text/edges
      //     instead of smoothing them like motion video
      //   • maintain-resolution — under bandwidth pressure the framerate drops
      //     before the resolution does, so the picture stays crisp
      //   • simulcast off — single high-quality layer, no decode duplication
      await room.localParticipant.setScreenShareEnabled(
        nextEnabled,
        nextEnabled
          ? {
              selfBrowserSurface: "include",
              surfaceSwitching: "include",
              resolution: ScreenSharePresets.h1080fps30.resolution,
              contentHint: "detail",
              suppressLocalAudioPlayback: true,
            }
          : undefined,
        nextEnabled
          ? {
              videoCodec: "h264",
              videoEncoding: ScreenSharePresets.h1080fps30.encoding,
              simulcast: false,
              degradationPreference: "maintain-resolution",
              backupCodec: false,
            }
          : undefined,
      );
      // Apply the contentHint to the live track too — some browsers only honour
      // it when set on the MediaStreamTrack directly.
      if (nextEnabled) {
        const screenPub = Array.from(
          room.localParticipant.videoTrackPublications.values(),
        ).find((p) => p.source === Track.Source.ScreenShare);
        const mst = screenPub?.track?.mediaStreamTrack;
        if (mst && "contentHint" in mst) {
          try {
            mst.contentHint = "detail";
          } catch {}
        }
      }
    } catch {
      toast.error("Screen share boshqarib bo'lmadi");
    }
  }, [room.localParticipant]);

  const handleSelectCamera = useCallback(
    async (deviceId) => {
      const selection = parseCameraDeviceSelection(deviceId);
      try {
        if (selection.mode === "facing") {
          const cameraPublication = Array.from(
            room.localParticipant.videoTrackPublications.values(),
          ).find((publication) => publication.source === Track.Source.Camera);
          const cameraTrack = cameraPublication?.videoTrack;

          if (cameraTrack) {
            await cameraTrack.restartTrack({
              deviceId: selection.deviceId || undefined,
              facingMode: selection.facingMode,
            });
          } else if (room.localParticipant.isCameraEnabled) {
            await room.localParticipant.setCameraEnabled(true, {
              deviceId: selection.deviceId || undefined,
              facingMode: selection.facingMode,
            });
          } else if (selection.deviceId) {
            await room.switchActiveDevice("videoinput", selection.deviceId);
          }
        } else {
          await room.switchActiveDevice("videoinput", deviceId);
        }
        setSelectedCameraId(deviceId);
      } catch {
        toast.error("Kamera almashtirilmadi");
      }
    },
    [room],
  );

  const handleSelectMicrophone = useCallback(
    async (deviceId) => {
      try {
        await room.switchActiveDevice("audioinput", deviceId);
        setSelectedMicrophoneId(deviceId);
      } catch {
        toast.error("Mikrofon almashtirilmadi");
      }
    },
    [room],
  );

  const handleSelectSpeaker = useCallback(
    async (deviceId) => {
      const selectedDevice = speakerDevices.find((device) => device.id === deviceId);
      const label = String(selectedDevice?.label || "").toLowerCase();
      const prefersReceiver =
        deviceId === "communications" ||
        deviceId === "receiver" ||
        /(receiver|earpiece|phone|communication|kichik)/i.test(label);

      try {
        let switchedByRoom = false;
        if (
          typeof room.switchActiveDevice === "function" &&
          deviceId &&
          deviceId !== "receiver" &&
          deviceId !== "speaker"
        ) {
          await room.switchActiveDevice("audiooutput", deviceId);
          switchedByRoom = true;
        }

        const switchedBySink = await applyPreferredAudioOutput(!prefersReceiver);
        if (!switchedByRoom && !switchedBySink && !deviceId) {
          throw new Error("speaker-switch-failed");
        }

        setSelectedSpeakerId(deviceId);
      } catch {
        toast.error("Speaker almashtirilmadi");
      }
    },
    [room, speakerDevices],
  );

  const openPiPWindow = useCallback(async () => {
    if (!supportsDocumentPiP) {
      return false;
    }

    const documentPiP = window.documentPictureInPicture;

    if (pipWindow && !pipWindow.closed && pipContainer) {
      return true;
    }

    try {
      const nextPipWindow = await documentPiP.requestWindow({
        width: 210,
        height: 280,
      });
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const themeBackground = "#111214";

      nextPipWindow.document.title = title || "Jamm Meet";
      nextPipWindow.document.body.innerHTML = "";
      nextPipWindow.document.documentElement.style.margin = "0";
      nextPipWindow.document.documentElement.style.width = "100%";
      nextPipWindow.document.documentElement.style.height = "100%";
      nextPipWindow.document.documentElement.setAttribute("data-theme", currentTheme);
      nextPipWindow.document.documentElement.style.colorScheme = currentTheme;
      nextPipWindow.document.documentElement.style.backgroundColor = themeBackground;
      nextPipWindow.document.body.style.margin = "0";
      nextPipWindow.document.body.style.width = "100%";
      nextPipWindow.document.body.style.height = "100%";
      nextPipWindow.document.body.style.background = themeBackground;
      nextPipWindow.document.body.style.overflow = "hidden";

      const stylesheetLoadTasks = [...document.styleSheets].map((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
          const style = document.createElement("style");
          style.textContent = cssRules;
          nextPipWindow.document.head.appendChild(style);
          return Promise.resolve();
        } catch {
          if (!styleSheet.href) {
            return Promise.resolve();
          }

          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = styleSheet.href;

          const loadTask = new Promise((resolve) => {
            link.onload = () => resolve();
            link.onerror = () => resolve();
          });

          nextPipWindow.document.head.appendChild(link);
          return loadTask;
        }
      });

      await Promise.all(stylesheetLoadTasks);

      const mountNode = nextPipWindow.document.createElement("div");
      mountNode.style.width = "100%";
      mountNode.style.height = "100%";
      nextPipWindow.document.body.appendChild(mountNode);

      pipCloseIntentRef.current = false;
      pipWindowRef.current = nextPipWindow;
      setDocumentPipMinimized(true);
      setPipWindow(nextPipWindow);
      setPipContainer(mountNode);
      return true;
    } catch {
      return false;
    }
  }, [pipContainer, pipWindow, supportsDocumentPiP, title]);

  const handleMinimize = useCallback(async () => {
    const opened = await openPiPWindow();

    if (supportsDocumentPiP && !opened) {
      toast.error("PiP oynasini ochib bo'lmadi");
      return;
    }

    if (supportsDocumentPiP) {
      setDocumentPipMinimized(true);
      onMinimize?.();
      return;
    }

    onMinimize?.();
  }, [onMinimize, openPiPWindow, supportsDocumentPiP]);

  const handleMaximize = useCallback(() => {
    setDocumentPipMinimized(false);
    closePiPWindow();
    if (isMinimized) {
      onMaximize?.();
    }
  }, [closePiPWindow, isMinimized, onMaximize]);

  const whiteboardTile = hasWhiteboard ? (
    <Suspense fallback={<div style={{ width: "100%", height: "100%", background: "rgba(0,0,0,0.04)" }} />}>
    <WhiteboardTile
      label="Whiteboard"
      workspace={signaling.whiteboardState}
      remoteCursor={signaling.whiteboardCursor}
      compact={false}
      isActive
      isMobile={isMobileViewport}
      canFullscreen={false}
      isFullscreen={false}
      interactive={Boolean(isCreator)}
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
      onClear={signaling.clearWhiteboard}
      onClearPage={signaling.clearWhiteboardPage}
      onUndo={signaling.undoWhiteboard}
      onRedo={signaling.redoWhiteboard}
      onTabActivate={signaling.setWhiteboardActiveTab}
      onPdfUpload={handlePdfUpload}
      onPdfOpen={handlePdfOpen}
      onTabRemove={signaling.removeWhiteboardTab}
      onPdfViewportChange={signaling.syncWhiteboardPdfViewport}
      onBoardZoomChange={signaling.syncWhiteboardBoardZoom}
      onCursorMove={signaling.syncWhiteboardCursor}
      onCursorLeave={signaling.clearWhiteboardCursor}
      participantCount={participants.length}
      onStrokeStart={signaling.startWhiteboardStroke}
      onStrokeAppend={signaling.appendWhiteboardStroke}
      onStrokeRemove={signaling.removeWhiteboardStroke}
      onStrokeUpdate={signaling.updateWhiteboardStroke}
      showToolbar={Boolean(isCreator)}
      onRecordSurfaceChange={handleRecordSurfaceChange}
      onToggleRecording={handleToggleRecording}
      isRecording={recorder.isRecording}
      recordingElapsedMs={recorder.elapsedMs}
      recordingReady={recorder.recordingReady && !recorder.isBusy}
    />
    </Suspense>
  ) : null;
  const activeFocusTile = whiteboardTile;
  const activeFocusKey = hasWhiteboard ? WHITEBOARD_TILE_KEY : undefined;

  useEffect(() => {
    if (!connectionState || connectionToastStateRef.current === connectionState) {
      return;
    }

    connectionToastStateRef.current = connectionState;
    const nextToast = getConnectionToastConfig(connectionState);
    const toastOptions = { id: CONNECTION_STATE_TOAST_ID };

    if (nextToast.kind === "success") {
      toast.success(nextToast.message, toastOptions);
      return;
    }

    if (nextToast.kind === "loading") {
      toast.loading(nextToast.message, toastOptions);
      return;
    }

    if (nextToast.kind === "error") {
      toast.error(nextToast.message, toastOptions);
      return;
    }

    toast(nextToast.message, toastOptions);
  }, [connectionState]);

  useEffect(
    () => () => {
      toast.dismiss(CONNECTION_STATE_TOAST_ID);
    },
    [],
  );

  useEffect(() => {
    if (!isMinimized && !documentPipMinimized && pipWindow) {
      closePiPWindow();
    }
  }, [closePiPWindow, documentPipMinimized, isMinimized, pipWindow]);

  useEffect(() => {
    if (!canShowLessonControls) {
      setLessonControlsOpen(false);
    }
  }, [canShowLessonControls]);

  useEffect(() => {
    if (!pipWindow) {
      return undefined;
    }

    const handlePageHide = () => {
      pipWindowRef.current = null;
      setPipWindow(null);
      setPipContainer(null);
      setDocumentPipMinimized(false);

      if (pipCloseIntentRef.current) {
        pipCloseIntentRef.current = false;
        return;
      }

      if (isMinimized) {
        onMaximize?.();
      }
    };

    pipWindow.addEventListener("pagehide", handlePageHide);
    return () => pipWindow.removeEventListener("pagehide", handlePageHide);
  }, [isMinimized, onMaximize, pipWindow]);

  const miniParticipant = previewTrackRef?.participant || participants[0] || room.localParticipant;
  const miniParticipantName = getMiniParticipantName(miniParticipant, primaryTitle);
  const miniParticipantMuted = miniParticipant?.isMicrophoneEnabled === false;
  const localMicEnabled = Boolean(room.localParticipant?.isMicrophoneEnabled);
  const localCamEnabled = Boolean(room.localParticipant?.isCameraEnabled);
  const localScreenEnabled = Boolean(room.localParticipant?.isScreenShareEnabled);
  const miniView = (
    <MiniCard>
      <MiniBody onDoubleClick={handleMaximize}>
        <MiniParticipantPreview
          trackRef={previewTrackRef}
          participant={miniParticipant}
        />
        {miniParticipantMuted ? (
          <MiniMutedBadge>
            <MicOff size={12} />
          </MiniMutedBadge>
        ) : null}
        <MiniName>{miniParticipantName}</MiniName>
      </MiniBody>
      <MiniControls>
        <MiniControlButton
          type="button"
          $active={!localMicEnabled}
          onClick={handleToggleMicrophone}
          aria-label={localMicEnabled ? "Mikrofonni o'chirish" : "Mikrofonni yoqish"}
        >
          {localMicEnabled ? <Mic size={19} /> : <MicOff size={19} />}
        </MiniControlButton>
        <MiniControlButton
          type="button"
          $active={!localCamEnabled}
          onClick={handleToggleCamera}
          aria-label={localCamEnabled ? "Kamerani o'chirish" : "Kamerani yoqish"}
        >
          {localCamEnabled ? <Video size={19} /> : <VideoOff size={19} />}
        </MiniControlButton>
        <MiniControlButton
          type="button"
          $active={localScreenEnabled}
          onClick={handleToggleScreenShare}
          aria-label={localScreenEnabled ? "Screen shareni to'xtatish" : "Screen share"}
        >
          <MonitorUp size={19} />
        </MiniControlButton>
        <MiniControlButton
          type="button"
          $danger
          $wide
          onClick={handleLeave}
          aria-label="Meetdan chiqish"
        >
          <PhoneOff size={22} />
        </MiniControlButton>
      </MiniControls>
    </MiniCard>
  );

  const pipPortalContent = pipContainer ? (
    pipWindow?.document?.head ? (
      <StyleSheetManager target={pipWindow.document.head}>
        <PiPFrame $minimized data-lk-theme="default">
          {miniView}
        </PiPFrame>
      </StyleSheetManager>
    ) : (
      <PiPFrame $minimized data-lk-theme="default">{miniView}</PiPFrame>
    )
  ) : null;
  const pipPortal = pipContainer ? createPortal(pipPortalContent, pipContainer) : null;

  if (isMinimized) {
    if (pipPortal) {
      return (
        <>
          {pipPortal}
          <RoomAudioRenderer />
        </>
      );
    }

    if (supportsDocumentPiP) {
      return <RoomAudioRenderer />;
    }

    return (
      <Overlay $minimized data-lk-theme="default">
        {miniView}
        <RoomAudioRenderer />
      </Overlay>
    );
  }

  return (
    <>
      {pipPortal}
      <Overlay data-lk-theme="default">
        <MeetingUI
          room={room}
          meetingName={
            signaling.lessonMeet
              ? `${primaryTitle || "Jonli dars"}`
              : primaryTitle || roomId
          }
          isCreator={isCreator}
          onLeave={handleLeave}
          onCopyLink={handleCopy}
          onToggleWhiteboard={isCreator ? handleWhiteboardToggle : undefined}
          onToggleLessonControls={
            canShowLessonControls ? () => setLessonControlsOpen(true) : undefined
          }
          onMinimize={onMinimize ? handleMinimize : undefined}
          focusContent={activeFocusTile}
          focusKey={activeFocusKey}
          isRecording={liveKitServerIsRecording || recorder.isRecording}
          whiteboardActive={hasWhiteboard}
          isMicrophoneEnabled={Boolean(room.localParticipant?.isMicrophoneEnabled)}
          isCameraEnabled={Boolean(room.localParticipant?.isCameraEnabled)}
          isScreenShareEnabled={Boolean(room.localParticipant?.isScreenShareEnabled)}
          onToggleMicrophone={handleToggleMicrophone}
          onToggleCamera={handleToggleCamera}
          onToggleScreenShare={handleToggleScreenShare}
          cameraDevices={cameraDevices}
          micDevices={microphoneDevices}
          speakerDevices={speakerDevices}
          selectedCameraId={selectedCameraId}
          selectedMicId={selectedMicrophoneId}
          selectedSpeakerId={selectedSpeakerId}
          onSelectCamera={handleSelectCamera}
          onSelectMic={handleSelectMicrophone}
          onSelectSpeaker={handleSelectSpeaker}
          remoteMediaLocks={signaling.remoteMediaLocks}
          roomIsPrivate={signaling.roomIsPrivate}
          roomPrivacyUpdating={signaling.roomPrivacyUpdating}
          knockRequests={signaling.knockRequests}
          onForceMuteMic={signaling.forceMuteMic}
          onForceMuteCam={signaling.forceMuteCam}
          onAllowMic={signaling.allowMic}
          onAllowCam={signaling.allowCam}
          onSetRoomPrivacy={handleRoomPrivacyChange}
          onApproveKnock={signaling.approveKnock}
          onRejectKnock={signaling.rejectKnock}
        />
        {canShowLessonControls ? (
          <MeetAttendancePanel
            open={lessonControlsOpen}
            onOpenChange={setLessonControlsOpen}
            lessonMeet={signaling.lessonMeet}
            onSetAttendance={signaling.setLessonAttendance}
            onSetGrade={signaling.setLessonGrade}
            onSelectLesson={signaling.selectLessonInMeet}
            onRefresh={signaling.refreshLessonRoster}
            onFetchTestDetail={signaling.fetchTestDetail}
            onReviewHomework={signaling.reviewLessonHomework}
          />
        ) : null}
        <RoomAudioRenderer />
      </Overlay>
    </>
  );
}

const LiveKitGroupMeet = ({
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
  roomCreatorId,
}) => {
  const currentUser = useAuthStore((state) => state.user);
  const displayName = resolveDisplayName(preferredDisplayName, currentUser);
  const [liveKitSession, setLiveKitSession] = useState(null);
  const [liveKitError, setLiveKitError] = useState("");
  const tokenRequestIdRef = useRef(0);
  const signaling = useLiveKitMeetSignaling({
    roomId,
    displayName,
    enabled: Boolean(isOpen && roomId),
    isCreator,
    isPrivate,
    chatTitle,
  });

  useEffect(() => {
    setLiveKitSession(null);
    setLiveKitError("");
    tokenRequestIdRef.current += 1;
  }, [roomId, displayName]);

  useEffect(() => {
    if (!isOpen || !roomId || !signaling.canConnectLiveKit) {
      return undefined;
    }

    const requestId = tokenRequestIdRef.current + 1;
    tokenRequestIdRef.current = requestId;
    let cancelled = false;
    setLiveKitError("");

    createLivekitToken({
      roomId,
      participantName: displayName,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    })
      .then((session) => {
        if (cancelled || tokenRequestIdRef.current !== requestId) return;
        setLiveKitSession(session);
      })
      .catch((tokenError) => {
        if (cancelled || tokenRequestIdRef.current !== requestId) return;
        setLiveKitError(
          tokenError?.response?.data?.message ||
            tokenError?.message ||
            "Suhbat token olinmadi",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [displayName, isOpen, roomId, signaling.canConnectLiveKit]);

  const handleClose = useCallback(() => {
    signaling.leaveSignaling();
    onClose?.();
  }, [onClose, signaling]);

  const liveKitTitle = signaling.roomTitle || chatTitle || "Jamm Meet";
  const waitingDescription = isCreator
    ? "Meet xonasi tayyorlanmoqda."
    : "Host tasdig'ini kutyapmiz. Tasdiqlangach roomga ulanamiz.";

  if (!isOpen) return null;

  if (signaling.joinStatus === "waiting") {
    return (
      <LoadingState
        icon={Clock}
        title="Kirish tasdiqlanishini kutyapmiz"
        description={waitingDescription}
        onCancel={handleClose}
      />
    );
  }

  if (signaling.joinStatus === "rejected") {
    return (
      <ErrorState
        title="Meetga kira olmadingiz"
        description={signaling.error || "Kirish rad etildi"}
        onClose={handleClose}
      />
    );
  }

  if (signaling.error && signaling.joinStatus !== "joined") {
    return (
      <ErrorState
        title="Meet signal xatosi"
        description={signaling.error}
        onClose={handleClose}
      />
    );
  }

  if (!signaling.canConnectLiveKit || (!liveKitSession && !liveKitError)) {
    return (
      <LoadingState
        title="Suhbat roomga ulanmoqda"
        description="Xona, token va media sozlamalari tayyorlanmoqda."
        onCancel={handleClose}
      />
    );
  }

  if (liveKitError) {
    return (
      <ErrorState
        title="Suhbat ulanish xatosi"
        description={liveKitError}
        onClose={handleClose}
      />
    );
  }

  return (
    <LiveKitRoom
      style={isMinimized ? MINIMIZED_ROOM_CONTAINER_STYLE : undefined}
      serverUrl={liveKitSession?.url}
      token={liveKitSession?.token}
      connect={Boolean(liveKitSession?.token)}
      audio={initialMicOn}
      video={initialCamOn}
      options={{
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults: {
          resolution: VideoPresets.h720.resolution,
        },
        screenShareCaptureDefaults: {
          resolution: ScreenSharePresets.h1080fps30.resolution,
          contentHint: "detail",
        },
        publishDefaults: {
          simulcast: true,
          videoCodec: "vp8",
          videoSimulcastLayers: [VideoPresets.h180, VideoPresets.h360],
          // Screenshare is the lesson surface — full 1080p @ 30fps, H.264 so
          // iOS hardware decoder kicks in. h1080fps30 ≈ 5 Mbps, plenty of
          // headroom on broadband and Safari handles it without thermals.
          screenShareEncoding: ScreenSharePresets.h1080fps30.encoding,
          screenShareSimulcast: false,
          stopMicTrackOnMute: true,
          backupCodec: { codec: "vp8", encoding: VideoPresets.h540.encoding },
        },
      }}
      connectOptions={{
        autoSubscribe: true,
      }}
      onDisconnected={() => {
        // LiveKit may emit this during temporary network loss; keep the meet UI open
        // and let the reconnect overlay handle the waiting state.
      }}
      onError={(error) => {
        setLiveKitError(error?.message || "Suhbat ulanishida xatolik");
      }}
      data-lk-theme="default"
    >
      <LayoutContextProvider>
        <MeetContent
          roomId={roomId}
          title={liveKitTitle}
          isCreator={isCreator}
          isMinimized={isMinimized}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onClose={handleClose}
          signaling={signaling}
          roomCreatorId={roomCreatorId}
        />
      </LayoutContextProvider>
    </LiveKitRoom>
  );
};

export default LiveKitGroupMeet;
