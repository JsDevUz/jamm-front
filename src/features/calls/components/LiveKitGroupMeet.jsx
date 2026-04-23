import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes, StyleSheetManager } from "styled-components";
import { toast } from "react-hot-toast";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Clock,
  Copy,
  Maximize2,
  MessageCircle,
  Minimize2,
  MonitorUp,
  PhoneOff,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  X,
} from "lucide-react";
import {
  CarouselLayout,
  ChatEntry,
  ConnectionQualityIndicator,
  ControlBar,
  DisconnectButton,
  FocusLayout,
  FocusToggleIcon,
  FocusLayoutContainer,
  FocusToggle,
  LayoutContextProvider,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  formatChatMessageLinks,
  useChat,
  useConnectionState,
  useIsRecording,
  useMaybeLayoutContext,
  useMaybeTrackRefContext,
  useParticipants,
  usePinnedTracks,
  useRoomContext,
  useRoomInfo,
  useSortedParticipants,
  useSpeakingParticipants,
  useTracks,
  UnfocusToggleIcon,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { createLivekitToken } from "../../../api/livekitApi";
import useAuthStore from "../../../store/authStore";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";
import WhiteboardTile from "./WhiteboardTile";
import { useLiveKitMeetSignaling } from "../hooks/useLiveKitMeetSignaling";

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
  inset: ${(props) => (props.$minimized ? "auto 18px 18px auto" : "0")};
  width: ${(props) => (props.$minimized ? "340px" : "100vw")};
  height: ${(props) => (props.$minimized ? "190px" : "100vh")};
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
    background: var(--meet-panel);
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
`;

const Shell = styled.div`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 14px;
  height: 100%;
  padding: clamp(12px, 2vw, 22px);
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
`;

const WhiteboardStage = styled.div`
  position: relative;
  min-width: 0;
  min-height: 0;
  height: 100%;
  grid-column: ${(props) => (props.$fullscreen ? "2" : "auto")};
  border: 1px solid var(--meet-border);
  border-radius: 15px;
  padding: ${(props) => (props.$fullscreen ? "10px" : "8px")};
  background: var(--meet-panel);
  overflow: hidden;

  @media (max-width: 980px) {
    grid-column: auto;
    height: auto;
    min-height: ${(props) => (props.$fullscreen ? "min(68vh, 680px)" : "clamp(240px, 36vh, 420px)")};
  }

  > div {
    height: 100%;
  }
`;

const WhiteboardFocusStage = styled(FocusLayoutContainer)`
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

  .lk-carousel {
    height: 100%;
  }

  @media (min-width: 600px) and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, calc(100dvh - 420px)) auto;
    height: 100%;

    > :first-child {
      order: ${(props) => (props.$mobileRailLast ? 2 : 1)};
      height: auto;
      max-height: 180px;
    }

    > :last-child {
      order: ${(props) => (props.$mobileRailLast ? 1 : 2)};
      min-height: 0;
    }

    .lk-carousel {
      height: auto;
      min-height: 0;
    }

    .lk-carousel .lk-participant-tile {
      min-height: 180px;
      max-height: 180px;
    }
  }

  @media (min-width: 601px) and (max-width: 980px) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;
    height: 100%;

    > :first-child {
      order: ${(props) => (props.$mobileRailLast ? 2 : 1)};
      height: auto;
      max-height: 220px;
    }

    > :last-child {
      order: ${(props) => (props.$mobileRailLast ? 1 : 2)};
      min-height: 0;
    }

    .lk-carousel {
      height: auto;
      min-height: 0;
    }

    .lk-carousel .lk-participant-tile {
      /* min-height: 220px; */
      /* max-height: 220px; */
    }
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    height: ${(props) => (props.$railHidden ? "100%" : "auto")};

    > :first-child {
      order: ${(props) => (props.$mobileRailLast ? 2 : 1)};
    }

    > :last-child {
      order: ${(props) => (props.$mobileRailLast ? 1 : 2)};
      height: ${(props) => (props.$railHidden ? "100%" : "auto")};
    }
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

  .lk-carousel {
    height: 100%;
  }

  @media (min-width: 600px) and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, calc(100dvh - 420px)) auto;
    height: 100%;

    > :first-child {
      order: ${(props) => (props.$mobileRailLast ? 2 : 1)};
      height: auto;
      max-height: 180px;
    }

    > :last-child {
      order: ${(props) => (props.$mobileRailLast ? 1 : 2)};
      min-height: 0;
    }

    .lk-carousel {
      height: auto;
      min-height: 0;
    }

    .lk-carousel .lk-participant-tile {
    }
  }

  @media (min-width: 601px) and (max-width: 980px) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;
    height: 100%;

    > :first-child {
      order: ${(props) => (props.$mobileRailLast ? 2 : 1)};
      height: auto;
      max-height: 220px;
    }

    > :last-child {
      order: ${(props) => (props.$mobileRailLast ? 1 : 2)};
      min-height: 0;
    }

    .lk-carousel {
      height: auto;
      min-height: 0;
    }

    .lk-carousel .lk-participant-tile {
      /* min-height: 220px; */
      max-height: 220px;
    }
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    height: ${(props) => (props.$railHidden ? "100%" : "auto")};

    > :first-child {
      order: ${(props) => (props.$mobileRailLast ? 2 : 1)};
    }

    > :last-child {
      order: ${(props) => (props.$mobileRailLast ? 1 : 2)};
      height: ${(props) => (props.$railHidden ? "100%" : "auto")};
    }
  }
`;

const WhiteboardGrid = styled.div`
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  grid-auto-rows: minmax(220px, 1fr);
  gap: 12px;

  @media (min-width: 600px) and (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    height: auto;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(160px, auto);
    height: auto;
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
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: minmax(160px, 1fr);
  }
`;

const ParticipantGridItem = styled.div`
  min-width: 0;
  min-height: 0;
`;

const WhiteboardGridItem = styled.div`
  min-width: 0;
  min-height: 0;

  @media (min-width: 600px) and (max-width: 800px) {
    min-height: ${(props) => (props.$board ? "clamp(280px, 42vh, 520px)" : "180px")};
    min-width: ${(props) => (props.$mobileRailItem ? "220px" : "0")};
    flex: ${(props) => (props.$mobileRailItem ? "0 0 220px" : "initial")};
  }

  @media (max-width: 980px) {
    min-height: ${(props) => (props.$board ? "clamp(240px, 36vh, 420px)" : "clamp(140px, 20vh, 200px)")};
    min-width: ${(props) => (props.$mobileRailItem ? "min(220px, 72vw)" : "0")};
    flex: ${(props) => (props.$mobileRailItem ? "0 0 min(220px, 72vw)" : "initial")};
  }
`;

const WhiteboardParticipantRail = styled.div`
  display: contents;

  @media (min-width: 600px) and (max-width: 800px) {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 2px;
    scroll-snap-type: x proximity;
  }

  @media (max-width: 980px) {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 2px;
    scroll-snap-type: x proximity;
  }
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
`;

const WhiteboardRailItem = styled.div`
  flex: 0 0 clamp(180px, 24vh, 260px);
  min-height: 180px;

  @media (max-width: 980px) {
    flex-basis: clamp(140px, 20vh, 200px);
    min-height: 140px;
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

const WhiteboardToggleButton = styled.button.attrs((props) => ({
  className: "lk-focus-toggle-button",
  "aria-pressed": props.$active ? "true" : "false",
}))`
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
    background: ${(props) =>
      props.$active ? "var(--active-color)" : "var(--meet-panel-strong)"};
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

  .lk-control-bar {
    border: none;
    background: transparent;
    padding: 0;
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

const MiniCard = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  color: var(--meet-text);
  background: transparent;
  text-align: left;
  cursor: pointer;
  display: grid;
  grid-template-rows: 1fr auto;
  padding: 0;
`;

const MiniBody = styled.div`
  min-height: 0;
  padding: 10px;

  .lk-participant-tile {
    width: 100%;
    height: 100%;
    min-height: 100%;
    border-radius: 12px;
  }
`;

const MiniFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-top: 1px solid var(--meet-border);
  background: var(--meet-panel);
`;

const MiniActions = styled.div`
  display: flex;
  gap: 6px;
`;

const PiPFrame = styled(Overlay)`
  position: static;
  inset: auto;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
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

function FocusableParticipantLayout({ tracks }) {
  const layoutContext = useMaybeLayoutContext();
  const pinnedTracks = usePinnedTracks();
  const autoFocusedScreenShareRef = useRef(null);
  const [isRailHidden, setIsRailHidden] = useState(false);
  const visibleTracks = useMemo(() => tracks.filter(Boolean), [tracks]);
  const screenShareTrack = useMemo(
    () =>
      visibleTracks.find((trackRef) => trackRef.source === Track.Source.ScreenShare) || null,
    [visibleTracks],
  );
  const focusedTrack = useMemo(
    () =>
      pinnedTracks.find((pinnedTrack) =>
        visibleTracks.some((trackRef) => isSameTrackReference(trackRef, pinnedTrack)),
      ) || null,
    [pinnedTracks, visibleTracks],
  );
  const carouselTracks = useMemo(
    () =>
      focusedTrack
        ? visibleTracks.filter((trackRef) => !isSameTrackReference(trackRef, focusedTrack))
        : visibleTracks,
    [focusedTrack, visibleTracks],
  );

  useEffect(() => {
    const pinDispatch = layoutContext?.pin?.dispatch;
    if (!pinDispatch) return;

    if (screenShareTrack) {
      if (
        !autoFocusedScreenShareRef.current ||
        !isSameTrackReference(autoFocusedScreenShareRef.current, screenShareTrack)
      ) {
        pinDispatch({ msg: "set_pin", trackReference: screenShareTrack });
        autoFocusedScreenShareRef.current = screenShareTrack;
      }
      return;
    }

    if (autoFocusedScreenShareRef.current) {
      if (
        focusedTrack &&
        isSameTrackReference(focusedTrack, autoFocusedScreenShareRef.current)
      ) {
        pinDispatch({ msg: "clear_pin" });
      }
      autoFocusedScreenShareRef.current = null;
    }
  }, [focusedTrack, layoutContext, screenShareTrack]);

  useEffect(() => {
    if (!focusedTrack || carouselTracks.length === 0) {
      setIsRailHidden(false);
    }
  }, [carouselTracks.length, focusedTrack]);

  if (visibleTracks.length === 0) return null;

  if (focusedTrack) {
    return (
      <VideoFocusStage
        $railHidden={isRailHidden || carouselTracks.length === 0}
        $mobileRailLast
      >
        {!isRailHidden && carouselTracks.length > 0 ? (
          <CarouselLayout tracks={carouselTracks}>
            <FocusableParticipantTile />
          </CarouselLayout>
        ) : null}
        <ParticipantTileFrame $focused $railHidden={isRailHidden || carouselTracks.length === 0}>
          {carouselTracks.length > 0 ? (
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

function WhiteboardParticipantTiles({ tracks }) {
  const visibleTracks = useMemo(() => tracks.filter(Boolean), [tracks]);

  return (
    <WhiteboardParticipantRail>
      {visibleTracks.map((trackRef) => (
        <WhiteboardGridItem key={getTrackReferenceKey(trackRef)} $mobileRailItem>
          <FocusableParticipantTile trackRef={trackRef} />
        </WhiteboardGridItem>
      ))}
    </WhiteboardParticipantRail>
  );
}

function WhiteboardFullscreenRail({ tracks }) {
  const visibleTracks = useMemo(() => tracks.filter(Boolean), [tracks]);

  return (
    <WhiteboardRailList>
      {visibleTracks.map((trackRef) => (
        <WhiteboardRailItem key={getTrackReferenceKey(trackRef)}>
          <FocusableParticipantTile trackRef={trackRef} />
        </WhiteboardRailItem>
      ))}
    </WhiteboardRailList>
  );
}

function WhiteboardCollaborativeLayout({ tracks, boardTile }) {
  const pinnedTracks = usePinnedTracks();
  const [isRailHidden, setIsRailHidden] = useState(false);
  const visibleTracks = useMemo(() => tracks.filter(Boolean), [tracks]);
  const focusedTrack = useMemo(
    () =>
      pinnedTracks.find((pinnedTrack) =>
        visibleTracks.some((trackRef) => isSameTrackReference(trackRef, pinnedTrack)),
      ) || null,
    [pinnedTracks, visibleTracks],
  );
  const railTracks = useMemo(
    () =>
      focusedTrack
        ? visibleTracks.filter((trackRef) => !isSameTrackReference(trackRef, focusedTrack))
        : visibleTracks,
    [focusedTrack, visibleTracks],
  );
  const hasRailContent = Boolean(boardTile) || railTracks.length > 0;

  useEffect(() => {
    if (!focusedTrack || !hasRailContent) {
      setIsRailHidden(false);
    }
  }, [focusedTrack, hasRailContent]);

  if (focusedTrack) {
    return (
      <VideoFocusStage $railHidden={isRailHidden || !hasRailContent} $mobileRailLast>
        {!isRailHidden && hasRailContent ? (
          <Rail $left $compact>
            <WhiteboardRailList>
              {boardTile ? <WhiteboardRailItem>{boardTile}</WhiteboardRailItem> : null}
              {railTracks.map((trackRef) => (
                <WhiteboardRailItem key={getTrackReferenceKey(trackRef)}>
                  <FocusableParticipantTile trackRef={trackRef} />
                </WhiteboardRailItem>
              ))}
            </WhiteboardRailList>
          </Rail>
        ) : null}
        <ParticipantTileFrame $focused $railHidden={isRailHidden || !hasRailContent}>
          {hasRailContent ? (
            <RailToggleButton
              type="button"
              onClick={() => setIsRailHidden((current) => !current)}
              aria-label={isRailHidden ? "Chap panelni ko'rsatish" : "Chap panelni yashirish"}
              title={isRailHidden ? "Chap panelni ko'rsatish" : "Chap panelni yashirish"}
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
    <WhiteboardGrid>
      <WhiteboardGridItem $board>{boardTile}</WhiteboardGridItem>
      <WhiteboardParticipantTiles tracks={visibleTracks} />
    </WhiteboardGrid>
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
}) {
  const [drawer, setDrawer] = useState(null);
  const [isWhiteboardFullscreen, setIsWhiteboardFullscreen] = useState(false);
  const [isWhiteboardRailHidden, setIsWhiteboardRailHidden] = useState(false);
  const [pipWindow, setPipWindow] = useState(null);
  const [pipContainer, setPipContainer] = useState(null);
  const connectionToastStateRef = useRef(null);
  const previousWhiteboardActiveRef = useRef(false);
  const lastSpeakingParticipantKeyRef = useRef(null);
  const pipCloseIntentRef = useRef(false);
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

  const room = useRoomContext();
  const roomInfo = useRoomInfo();
  const connectionState = useConnectionState(room);
  const supportsDocumentPiP =
    typeof window !== "undefined" && Boolean(window.documentPictureInPicture?.requestWindow);
  const participants = useParticipants({ room });
  const sortedParticipants = useSortedParticipants(participants);
  const speakingParticipants = useSpeakingParticipants();
  const isRecording = useIsRecording(room);
  const { chatMessages, send, isSending } = useChat();
  const [chatDraft, setChatDraft] = useState("");
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  const cameraTracks = tracks.filter((trackRef) => trackRef.source === Track.Source.Camera);
  const fallbackParticipantTracks = useMemo(
    () =>
      participants.map((participant) => ({
        participant,
        source: Track.Source.Camera,
      })),
    [participants],
  );
  const stageTracks = tracks.length > 0 ? tracks : fallbackParticipantTracks;
  const hasWhiteboard = signaling.whiteboardState.isActive;
  const whiteboardRailTracks = useMemo(
    () =>
      cameraTracks.length > 0
        ? cameraTracks
        : tracks.length > 0
          ? tracks.filter((trackRef) => trackRef.source !== Track.Source.ScreenShare)
          : fallbackParticipantTracks,
    [cameraTracks, fallbackParticipantTracks, tracks],
  );
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

  const handleLeave = useCallback(() => {
    signaling.leaveSignaling();
    room.disconnect();
    onClose?.();
  }, [onClose, room, signaling]);

  const handleWhiteboardToggle = useCallback(() => {
    const ok = signaling.toggleWhiteboard();
    if (!ok && !isCreator) {
      toast("Whiteboardni faqat host boshqaradi");
    }
  }, [isCreator, signaling]);

  const handleWhiteboardFullscreenToggle = useCallback(() => {
    setIsWhiteboardFullscreen((current) => !current);
  }, []);

  useEffect(() => {
    if (!isWhiteboardFullscreen || whiteboardRailTracks.length === 0) {
      setIsWhiteboardRailHidden(false);
    }
  }, [isWhiteboardFullscreen, whiteboardRailTracks.length]);

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

  const closePiPWindow = useCallback(() => {
    if (pipWindow && !pipWindow.closed) {
      pipCloseIntentRef.current = true;
      pipWindow.close();
    }

    setPipWindow(null);
    setPipContainer(null);
  }, [pipWindow]);

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
        width: 360,
        height: 220,
      });
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const themeBackground =
        getComputedStyle(document.documentElement).getPropertyValue("--background-color").trim() ||
        (currentTheme === "dark" ? "#111315" : "#ffffff");

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

    onMinimize?.();
  }, [onMinimize, openPiPWindow, supportsDocumentPiP]);

  const handleMaximize = useCallback(() => {
    closePiPWindow();
    onMaximize?.();
  }, [closePiPWindow, onMaximize]);

  const handleChatSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const nextMessage = chatDraft.trim();
      if (!nextMessage) return;

      await send(nextMessage);
      setChatDraft("");
    },
    [chatDraft, send],
  );

  const embeddedWhiteboardStage = (
    <WhiteboardStage>
      <WhiteboardToggleButton
        type="button"
        $active={false}
        onClick={handleWhiteboardFullscreenToggle}
        aria-label="Whiteboard fullscreen"
        title="Whiteboard fullscreen"
      >
        <FocusToggleIcon />
      </WhiteboardToggleButton>
      <WhiteboardTile
        label="Whiteboard"
        workspace={signaling.whiteboardState}
        remoteCursor={signaling.whiteboardCursor}
        compact={false}
        isActive
        isMobile={false}
        canFullscreen={false}
        isFullscreen={false}
        onToggleFullscreen={handleWhiteboardFullscreenToggle}
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
      />
    </WhiteboardStage>
  );

  useEffect(() => {
    if (hasWhiteboard && !previousWhiteboardActiveRef.current) {
      setIsWhiteboardFullscreen(true);
    }

    if (!hasWhiteboard) {
      setIsWhiteboardFullscreen(false);
    }

    previousWhiteboardActiveRef.current = hasWhiteboard;
  }, [hasWhiteboard]);

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
    if (!isMinimized && pipWindow) {
      closePiPWindow();
    }
  }, [closePiPWindow, isMinimized, pipWindow]);

  useEffect(() => {
    if (!isMinimized || !pipWindow) {
      return undefined;
    }

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
    return () => pipWindow.removeEventListener("pagehide", handlePageHide);
  }, [isMinimized, onMaximize, pipWindow]);

  const miniView = (
    <MiniCard type="button" onClick={handleMaximize}>
      <MiniBody>
        {previewTrackRef ? <ParticipantTile trackRef={previewTrackRef} /> : <Video size={24} />}
      </MiniBody>
      <MiniFooter>
        <span>
          {participants.length} odam
          {hasWhiteboard ? " • Whiteboard" : ""}
        </span>
        <MiniActions onClick={(event) => event.stopPropagation()}>
          <IconButton type="button" onClick={handleMaximize}>
            <Maximize2 size={15} />
          </IconButton>
          <IconButton type="button" onClick={handleLeave}>
            <PhoneOff size={15} />
          </IconButton>
        </MiniActions>
      </MiniFooter>
    </MiniCard>
  );

  if (isMinimized) {
    if (pipContainer) {
      const pipPortalContent = pipWindow?.document?.head ? (
        <StyleSheetManager target={pipWindow.document.head}>
          <PiPFrame $minimized data-lk-theme="default">
            {miniView}
          </PiPFrame>
        </StyleSheetManager>
      ) : (
        <PiPFrame $minimized data-lk-theme="default">{miniView}</PiPFrame>
      );

      return (
        <>
          {createPortal(pipPortalContent, pipContainer)}
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
    <Overlay data-lk-theme="default">
      <Shell>
        <TopBar>
          <TopActions>
            {isRecording ? (
              <Pill $tone="var(--danger-color)">
                <Clipboard size={13} />
                REC
              </Pill>
            ) : null}
            <IconButton type="button" onClick={handleCopy} title="Havolani nusxalash">
              <Copy size={16} />
              <HiddenOnMobile>Copy</HiddenOnMobile>
            </IconButton>
            <IconButton
              type="button"
              $active={hasWhiteboard}
              onClick={handleWhiteboardToggle}
              title="Whiteboard"
            >
              <MonitorUp size={16} />
              <HiddenOnMobile>Board</HiddenOnMobile>
            </IconButton>
            <IconButton
              type="button"
              $active={drawer === "chat"}
              onClick={() => setDrawer((current) => (current === "chat" ? null : "chat"))}
              title="Chat"
            >
              <MessageCircle size={16} />
              <HiddenOnMobile>{chatMessages.length}</HiddenOnMobile>
            </IconButton>
            <IconButton
              type="button"
              $active={drawer === "people"}
              onClick={() => setDrawer((current) => (current === "people" ? null : "people"))}
              title="Ishtirokchilar"
            >
              <Users size={16} />
              <HiddenOnMobile>{participants.length}</HiddenOnMobile>
            </IconButton>
            {onMinimize ? (
              <IconButton type="button" onClick={handleMinimize} title="Minimize">
                <Minimize2 size={16} />
              </IconButton>
            ) : null}
          </TopActions>
        </TopBar>

        <Stage $drawerOpen={Boolean(drawer)}>
          <StagePanel>
            {hasWhiteboard ? (
              isWhiteboardFullscreen ? (
                <WhiteboardFocusStage
                  $railHidden={isWhiteboardRailHidden || whiteboardRailTracks.length === 0}
                  $mobileRailLast
                >
                  {!isWhiteboardRailHidden && whiteboardRailTracks.length > 0 ? (
                    <Rail $left>
                      <WhiteboardFullscreenRail tracks={whiteboardRailTracks} />
                    </Rail>
                  ) : null}
                  <WhiteboardStage $fullscreen>
                    {whiteboardRailTracks.length > 0 ? (
                      <RailToggleButton
                        type="button"
                        onClick={() => setIsWhiteboardRailHidden((current) => !current)}
                        aria-label={
                          isWhiteboardRailHidden
                            ? "Chap tile panelini ko'rsatish"
                            : "Chap tile panelini yashirish"
                        }
                        title={
                          isWhiteboardRailHidden
                            ? "Chap tile panelini ko'rsatish"
                            : "Chap tile panelini yashirish"
                        }
                      >
                        {isWhiteboardRailHidden ? (
                          <ChevronRight size={18} />
                        ) : (
                          <ChevronLeft size={18} />
                        )}
                      </RailToggleButton>
                    ) : null}
                    <WhiteboardToggleButton
                      type="button"
                      $active={isWhiteboardFullscreen}
                      onClick={handleWhiteboardFullscreenToggle}
                      aria-label="Whiteboard minimize"
                      title="Whiteboard minimize"
                    >
                      <UnfocusToggleIcon />
                    </WhiteboardToggleButton>
                    <WhiteboardTile
                      label="Whiteboard"
                      workspace={signaling.whiteboardState}
                      remoteCursor={signaling.whiteboardCursor}
                      compact={false}
                      isActive
                      isMobile={false}
                      canFullscreen={false}
                      isFullscreen={isWhiteboardFullscreen}
                      onToggleFullscreen={handleWhiteboardFullscreenToggle}
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
                    />
                  </WhiteboardStage>
                </WhiteboardFocusStage>
              ) : (
                <WhiteboardCollaborativeLayout
                  tracks={whiteboardRailTracks}
                  boardTile={embeddedWhiteboardStage}
                />
              )
            ) : (
              <VideoPanel>
                <FocusableParticipantLayout tracks={stageTracks} />
              </VideoPanel>
            )}
          </StagePanel>

          {drawer ? (
            <Drawer>
              <DrawerHeader>
                <DrawerTabs>
                  <DrawerTab
                    type="button"
                    $active={drawer === "people"}
                    onClick={() => setDrawer("people")}
                  >
                    Odamlar
                  </DrawerTab>
                  <DrawerTab
                    type="button"
                    $active={drawer === "chat"}
                    onClick={() => setDrawer("chat")}
                  >
                    Chat
                  </DrawerTab>
                </DrawerTabs>
                <DrawerCloseButton
                  type="button"
                  onClick={() => setDrawer(null)}
                  aria-label="Panelni yopish"
                  title="Panelni yopish"
                >
                  <X size={18} />
                </DrawerCloseButton>
              </DrawerHeader>
              <DrawerBody $flush={drawer === "chat"}>
                {drawer === "chat" ? (
                  <PersistentChatPanel
                    chatMessages={chatMessages}
                    chatDraft={chatDraft}
                    isSending={isSending}
                    onChatDraftChange={setChatDraft}
                    onChatSubmit={handleChatSubmit}
                  />
                ) : (
                  <ParticipantsPanel
                    participants={sortedParticipants}
                    knockRequests={signaling.knockRequests}
                    isCreator={isCreator}
                    roomIsPrivate={signaling.roomIsPrivate}
                    onApproveKnock={signaling.approveKnock}
                    onRejectKnock={signaling.rejectKnock}
                    onSetRoomPrivacy={signaling.setRoomPrivacy}
                  />
                )}
              </DrawerBody>
            </Drawer>
          ) : null}
        </Stage>

        <BottomBar>
          <BottomControlDock>
            <ControlBar
              variation="minimal"
              controls={{
                microphone: true,
                camera: true,
                screenShare: true,
                chat: false,
                leave: false,
                settings: false,
              }}
            />
            <DisconnectButton
              stopTracks
              className="lk-disconnect-button"
              onClick={handleLeave}
            >
              <PhoneOff size={18} />
            </DisconnectButton>
          </BottomControlDock>
        </BottomBar>
      </Shell>
      <RoomAudioRenderer />
    </Overlay>
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
    : "Host tasdig'ini kutyapmiz. Tasdiqlangach LiveKit roomga ulanamiz.";

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
        publishDefaults: {
          simulcast: true,
          videoCodec: "vp8",
        },
      }}
      connectOptions={{
        autoSubscribe: true,
      }}
      onDisconnected={() => {
        signaling.leaveSignaling();
        onClose?.();
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
        />
      </LayoutContextProvider>
    </LiveKitRoom>
  );
};

export default LiveKitGroupMeet;
