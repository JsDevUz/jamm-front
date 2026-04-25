import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import {
  Check,
  ChevronDown,
  Loader2,
  Mic,
  MicOff,
  Minimize2,
  MonitorUp,
  PhoneOff,
  Signal,
  Video,
  VideoOff,
  Volume1,
  Volume2,
  X,
} from "lucide-react";
import {
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useConnectionState,
  useLocalParticipant,
  useParticipants,
  useRoomContext,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";
import { createLivekitToken } from "../../../api/livekitApi";
import { LIVEKIT_URL } from "../../../config/env";
import useAuthStore from "../../../store/authStore";
import { applyPreferredAudioOutput } from "../utils/audioOutput";
import {
  buildCameraDeviceOptions,
  parseCameraDeviceSelection,
} from "../utils/cameraOptions";
import { useIdleTimeout } from "./meet-ui/useIdleTimeout";

const detectMobileViewport = () => {
  if (typeof window === "undefined") return false;
  return Boolean(
    window.matchMedia?.("(max-width: 980px)")?.matches ||
      window.matchMedia?.("(pointer: coarse)")?.matches,
  );
};

const getDisplayName = (user, fallback) =>
  user?.nickname || user?.username || user?.name || fallback;

const getAvatarInitials = (name) => {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return "?";
  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};

const formatDuration = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const getConnectionLabel = (connectionState) => {
  const normalized = String(connectionState || "").toLowerCase();
  if (normalized.includes("connected")) return "connected";
  if (normalized.includes("reconnect")) return "reconnecting";
  if (normalized.includes("connect")) return "connecting";
  return "preparing";
};

const hasRenderableTrack = (trackRef) =>
  Boolean(trackRef?.publication?.track || trackRef?.track);

const Overlay = styled.div`
  --private-text: #ffffff;
  --private-text-muted: rgba(255, 255, 255, 0.84);
  --private-text-soft: rgba(255, 255, 255, 0.64);
  --private-panel: rgba(255, 255, 255, 0.16);
  --private-panel-strong: rgba(18, 15, 31, 0.68);
  --private-border: rgba(255, 255, 255, 0.14);
  --private-shadow: 0 24px 54px rgba(24, 12, 65, 0.22);
  --private-danger: #ff5645;
  --private-success: #61d64b;
  --private-video-bg: rgba(19, 15, 29, 0.92);
  --private-gradient:
    radial-gradient(circle at 16% 22%, rgba(115, 176, 255, 0.3), transparent 28%),
    radial-gradient(circle at 82% 16%, rgba(185, 114, 235, 0.3), transparent 24%),
    linear-gradient(135deg, #6790e5 0%, #8d62dc 100%);

  position: fixed;
  inset: 0;
  z-index: 10000;
  overflow: hidden;
  background: var(--private-gradient);
  color: var(--private-text);

  .lk-participant-tile {
    height: 100%;
    width: 100%;
    border: none;
    border-radius: 0;
    background: var(--private-video-bg);
  }

  .lk-participant-media-video {
    height: 100%;
    width: 100%;
    object-fit: contain !important;
    object-position: center;
    background: var(--private-video-bg);
  }

  .lk-participant-placeholder,
  .lk-participant-metadata,
  .lk-focus-toggle-button {
    display: none !important;
  }
`;

const Shell = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Stage = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const VideoStage = styled.div`
  position: absolute;
  inset: 0;
  background: var(--private-gradient);
`;

const VideoFallbackSurface = styled.div`
  position: absolute;
  inset: 0;
  background: var(--private-gradient);
`;

const VideoChrome = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(13, 8, 21, 0.52) 0%, rgba(13, 8, 21, 0.08) 16%, rgba(13, 8, 21, 0.08) 78%, rgba(13, 8, 21, 0.38) 100%);
  pointer-events: none;
`;

const CenterIdentity = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 2;
  display: grid;
  justify-items: center;
  gap: 12px;
  text-align: center;
  transform: translate(-50%, -46%);
  padding: 0 16px;
`;

const AvatarHalo = styled.div`
  display: grid;
  place-items: center;
  height: 118px;
  width: 118px;
  border-radius: 50%;
  background: transparent;
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.18),
    0 24px 56px rgba(24, 12, 65, 0.18);

  @media (max-width: 768px) {
    height: 104px;
    width: 104px;
  }
`;

const IdentityAvatar = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #5865f2 0%, #4f6df6 100%);
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -0.04em;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    font-size: 38px;
  }
`;

const IdentityName = styled.div`
  max-width: min(88vw, 540px);
  font-size: clamp(22px, 2.8vw, 36px);
  font-weight: 400;
  line-height: 1.02;
`;

const IdentityStatus = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: clamp(13px, 1.2vw, 17px);
  font-weight: 400;
  color: var(--private-text-muted);
`;

const HeaderLayer = styled.div`
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 4;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: calc(env(safe-area-inset-top, 0px) + 18px) calc(env(safe-area-inset-right, 0px) + 18px) 0
    calc(env(safe-area-inset-left, 0px) + 18px);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: none;
  transform: translateY(${(props) => (props.$visible ? "0" : "-18px")});
  transition:
    opacity 0.24s ease,
    transform 0.24s ease,
    visibility 0s linear ${(props) => (props.$visible ? "0s" : "0.24s")};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};

  @media (max-width: 768px) {
    padding: calc(env(safe-area-inset-top, 0px) + 16px)
      calc(env(safe-area-inset-right, 0px) + 14px) 0
      calc(env(safe-area-inset-left, 0px) + 14px);
  }
`;

const HeaderSpacer = styled.div`
  width: 24px;
  height: 24px;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const HeaderTools = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 24px;
  pointer-events: auto;

  @media (max-width: 980px) {
    display: none;
  }
`;

const HeaderToolButton = styled.button`
  display: inline-flex;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 18px 38px rgba(18, 9, 44, 0.16);
  backdrop-filter: blur(22px);
  transition:
    background 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.26);
    transform: translateY(-1px);
  }
`;

const HeaderCenter = styled.div`
  display: grid;
  justify-items: center;
  gap: 4px;
  padding-top: 2px;
  text-align: center;
`;

const HeaderName = styled.div`
  font-size: clamp(18px, 1.8vw, 24px);
  font-weight: 500;
  line-height: 1;
`;

const HeaderMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--private-text-muted);
  font-size: clamp(11px, 0.9vw, 14px);
  font-weight: 500;
`;

const WeakSignalPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 1px;
  border-radius: 999px;
  background: rgba(255, 241, 231, 0.48);
  padding: 6px 11px;
  color: #fff8f4;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 18px 32px rgba(25, 14, 34, 0.14);
  backdrop-filter: blur(18px);
`;

const SettingsPanel = styled.div`
  position: absolute;
  right: calc(env(safe-area-inset-right, 0px) + 18px);
  top: calc(env(safe-area-inset-top, 0px) + 66px);
  z-index: 6;
  width: min(360px, calc(100vw - 28px));
  max-height: min(70vh, 520px);
  overflow-y: auto;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(24, 17, 37, 0.82);
  padding: 16px;
  box-shadow: 0 32px 80px rgba(16, 10, 28, 0.28);
  backdrop-filter: blur(26px);

  @media (max-width: 768px) {
    right: calc(env(safe-area-inset-right, 0px) + 12px);
    top: calc(env(safe-area-inset-top, 0px) + 58px);
    width: min(340px, calc(100vw - 24px));
    border-radius: 24px;
    padding: 14px;
  }
`;

const SettingsTitle = styled.div`
  padding: 2px 4px 12px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.62);
`;

const SettingsSection = styled.div`
  display: grid;
  gap: 8px;

  & + & {
    margin-top: 14px;
  }
`;

const SettingsSectionTitle = styled.div`
  padding: 0 4px;
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.76);
`;

const SettingsButton = styled.button`
  width: 100%;
  border: 1px solid
    ${(props) => (props.$active ? "rgba(255, 255, 255, 0.26)" : "rgba(255, 255, 255, 0.06)")};
  border-radius: 18px;
  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0.06)"};
  color: #fff;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  text-align: left;
  cursor: pointer;
`;

const SettingsLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PreviewWindow = styled.div`
  position: absolute;
  z-index: 5;
  width: min(18vw, 126px);
  aspect-ratio: 9 / 16;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(17, 13, 25, 0.82);
  box-shadow: 0 28px 68px rgba(16, 10, 28, 0.34);
  user-select: none;
  touch-action: none;
  cursor: grab;
  transition:
    top 0.22s ease,
    right 0.22s ease,
    bottom 0.22s ease,
    left 0.22s ease,
    transform 0.18s ease;

  &:active {
    cursor: grabbing;
  }

  ${(props) =>
    props.$dragging
      ? `
    transition: none;
    transform: scale(1.02);
  `
      : ""}

  @media (max-width: 768px) {
    width: min(22vw, 94px);
    border-radius: 10px;
  }
`;

const SecondaryPreviewWindow = styled(PreviewWindow)`
  width: min(14vw, 104px);
  z-index: 4;

  @media (max-width: 768px) {
    width: min(18vw, 78px);
  }
`;

const PreviewFallback = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  place-items: center;
  background: var(--private-gradient);
`;

const PreviewFallbackAvatar = styled(IdentityAvatar)`
  aspect-ratio: 1 / 1;
  height: auto;
  width: min(58%, 92px);
  min-height: 44px;
  min-width: 44px;
  font-size: clamp(22px, 3.4vw, 34px);
`;

const PreviewBadge = styled.div`
  position: absolute;
  left: 6px;
  right: 6px;
  bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border-radius: 999px;
  background: rgba(22, 16, 34, 0.58);
  padding: 5px 7px;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  backdrop-filter: blur(14px);
`;

const BottomLayer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: none;
  padding: 0 calc(env(safe-area-inset-right, 0px) + 14px)
    calc(env(safe-area-inset-bottom, 0px) + 14px)
    calc(env(safe-area-inset-left, 0px) + 14px);
  transform: translateY(${(props) => (props.$visible ? "0" : "22px")});
  transition:
    opacity 0.24s ease,
    transform 0.24s ease,
    visibility 0s linear ${(props) => (props.$visible ? "0s" : "0.24s")};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};

  @media (max-width: 768px) {
    padding: 0 calc(env(safe-area-inset-right, 0px) + 12px)
      calc(env(safe-area-inset-bottom, 0px) + 12px)
      calc(env(safe-area-inset-left, 0px) + 12px);
  }
`;

const StatusToastStack = styled.div`
  display: grid;
  justify-items: center;
  gap: 6px;
  margin-bottom: 10px;
`;

const StatusToast = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  max-width: min(92vw, 460px);
  border-radius: 999px;
  background: rgba(219, 214, 214, 0.46);
  padding: 7px 12px;
  color: #fff;
  font-size: clamp(12px, 0.95vw, 14px);
  font-weight: 500;
  box-shadow: 0 18px 38px rgba(18, 9, 44, 0.12);
  backdrop-filter: blur(18px);
`;

const ReconnectOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 12;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(19, 12, 31, 0.28);
  backdrop-filter: blur(4px);
`;

const ReconnectCard = styled.div`
  width: min(100%, 360px);
  display: grid;
  justify-items: center;
  gap: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 28px;
  background: rgba(32, 33, 36, 0.88);
  padding: 22px 20px;
  text-align: center;
  color: #fff;
  box-shadow: 0 28px 70px rgba(18, 9, 44, 0.28);
  backdrop-filter: blur(26px);
`;

const ReconnectIcon = styled.div`
  display: grid;
  height: 52px;
  width: 52px;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.14);
`;

const ReconnectTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const ReconnectText = styled.div`
  max-width: 300px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
  line-height: 1.45;
`;

const ReconnectTimer = styled.div`
  margin-top: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  padding: 8px 16px;
  font-size: 24px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

const Controls = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  pointer-events: auto;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const DeviceControl = styled.div`
  position: relative;
  display: grid;
  min-width: 76px;
  justify-items: center;
  gap: 6px;
`;

const DeviceButtonGroup = styled.div`
  display: inline-flex;
  height: 48px;
  align-items: stretch;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 20px 40px rgba(18, 9, 44, 0.16);
  backdrop-filter: blur(22px);
`;

const DeviceToggleButton = styled.button`
  display: inline-flex;
  width: 48px;
  align-items: center;
  justify-content: center;
  border: none;
  background: ${(props) => (props.$active ? "rgba(255, 255, 255, 0.24)" : "transparent")};
  color: #fff;
  cursor: pointer;
`;

const DeviceMenuButton = styled.button`
  display: inline-flex;
  width: 32px;
  align-items: center;
  justify-content: center;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  background: ${(props) => (props.$open ? "rgba(255, 255, 255, 0.2)" : "transparent")};
  color: #fff;
  cursor: pointer;
`;

const Control = styled.button`
  border: none;
  background: transparent;
  color: #fff;
  display: grid;
  justify-items: center;
  gap: 6px;
  cursor: pointer;
  min-width: 48px;

  &:disabled {
    opacity: 0.48;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    min-width: 48px;
  }
`;

const ControlCircle = styled.span`
  display: inline-flex;
  height: ${(props) => (props.$danger ? "48px" : "48px")};
  width: ${(props) => (props.$danger ? "48px" : "48px")};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: ${(props) =>
    props.$danger ? "none" : "1px solid rgba(255, 255, 255, 0.08)"};
  background: ${(props) => {
    if (props.$danger) return "var(--private-danger)";
    if (props.$active) return "rgba(255, 255, 255, 0.24)";
    return "rgba(255, 255, 255, 0.16)";
  }};
  box-shadow: 0 20px 40px rgba(18, 9, 44, 0.16);
  backdrop-filter: blur(22px);

  @media (max-width: 768px) {
    height: ${(props) => (props.$danger ? "48px" : "48px")};
    width: ${(props) => (props.$danger ? "48px" : "48px")};
  }
`;

const ControlLabel = styled.span`
  font-size: clamp(10px, 0.8vw, 13px);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.96);
`;

const DeviceMenu = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(100% + 12px);
  z-index: 8;
  width: min(292px, calc(100vw - 28px));
  transform: translateX(-50%);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.18);
  padding: 7px;
  box-shadow: 0 24px 52px rgba(18, 9, 44, 0.2);
  backdrop-filter: blur(28px);
`;

const DeviceMenuTitle = styled.div`
  padding: 7px 10px 9px;
  color: rgba(255, 255, 255, 0.66);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const DeviceMenuOption = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid ${(props) => (props.$active ? "rgba(255, 255, 255, 0.18)" : "transparent")};
  border-radius: 16px;
  background: ${(props) => (props.$active ? "rgba(255, 255, 255, 0.24)" : "rgba(255, 255, 255, 0.16)")};
  color: #fff;
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;

  & + & {
    margin-top: 5px;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.14);
    background: rgba(255, 255, 255, 0.22);
    transform: translateY(-1px);
  }
`;

const DeviceMenuLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
`;

const DeviceMenuSelected = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  color: rgba(255, 255, 255, 0.9);
`;

const CenterState = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 24px;
  color: #fff;
  background: var(--private-gradient, linear-gradient(135deg, #6790e5 0%, #8d62dc 100%));
`;

const StateCard = styled.div`
  width: min(100%, 320px);
  display: grid;
  justify-items: center;
  gap: 12px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(25, 18, 39, 0.36);
  padding: 20px 18px;
  text-align: center;
  box-shadow: 0 28px 64px rgba(24, 12, 65, 0.22);
  backdrop-filter: blur(24px);
`;

const StateAction = styled.button`
  display: inline-flex;
  height: 48px;
  width: 48px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: var(--private-danger, #ff5645);
  color: #fff;
  cursor: pointer;
`;

const LoadingIcon = styled(Loader2)`
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

function DeviceSection({ title, options, selectedValue, onSelect }) {
  return (
    <SettingsSection>
      <SettingsSectionTitle>{title}</SettingsSectionTitle>
      {options.length ? (
        options.map((option) => (
          <SettingsButton
            key={option.value}
            type="button"
            $active={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          >
            <SettingsLabel>{option.label}</SettingsLabel>
            {selectedValue === option.value ? <Check size={16} /> : null}
          </SettingsButton>
        ))
      ) : (
        <SettingsButton as="div">
          <SettingsLabel>Qurilma topilmadi</SettingsLabel>
        </SettingsButton>
      )}
    </SettingsSection>
  );
}

function PrivateLiveKitContent({
  localName,
  localAvatar,
  remoteName,
  remoteAvatar,
  callType,
  isMobileViewport,
  onLeave,
  renderRootRef,
}) {
  const room = useRoomContext();
  const participants = useParticipants();
  const connectionState = useConnectionState(room);
  const { localParticipant } = useLocalParticipant();
  const { isVisible: chromeVisible } = useIdleTimeout({ mobileDelay: 3000 });
  const stageRef = useRef(null);
  const videoStageRef = useRef(null);
  const primaryPreviewRef = useRef(null);
  const secondaryPreviewRef = useRef(null);
  const primaryDragStateRef = useRef(null);
  const secondaryDragStateRef = useRef(null);
  const settingsRef = useRef(null);
  const controlsRef = useRef(null);
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  const cameraTracks = useMemo(
    () => tracks.filter((trackRef) => trackRef.source === Track.Source.Camera),
    [tracks],
  );
  const screenShareTracks = useMemo(
    () => tracks.filter((trackRef) => trackRef.source === Track.Source.ScreenShare),
    [tracks],
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [selectedAudioInputId, setSelectedAudioInputId] = useState("");
  const [audioRoute, setAudioRoute] = useState("speaker");
  const [primaryPreviewCorner, setPrimaryPreviewCorner] = useState("top-left");
  const [primaryPreviewPosition, setPrimaryPreviewPosition] = useState(null);
  const [secondaryPreviewCorner, setSecondaryPreviewCorner] = useState("top-right");
  const [secondaryPreviewPosition, setSecondaryPreviewPosition] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [cameraMenuOpen, setCameraMenuOpen] = useState(false);
  const [micMenuOpen, setMicMenuOpen] = useState(false);
  const [mainCameraOwner, setMainCameraOwner] = useState("remote");
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const [hasEstablishedConnection, setHasEstablishedConnection] = useState(false);
  const [hadRemoteParticipant, setHadRemoteParticipant] = useState(false);
  const [reconnectSecondsLeft, setReconnectSecondsLeft] = useState(60);
  const controlsVisible = !isMobileViewport || chromeVisible || cameraMenuOpen || micMenuOpen;

  const localCameraTrack = useMemo(
    () => cameraTracks.find((trackRef) => trackRef.participant?.isLocal) || null,
    [cameraTracks],
  );
  const remoteCameraTrack = useMemo(
    () => cameraTracks.find((trackRef) => !trackRef.participant?.isLocal) || null,
    [cameraTracks],
  );
  const activeScreenShareTrack = useMemo(
    () =>
      screenShareTracks.find((trackRef) => !trackRef.participant?.isLocal) ||
      screenShareTracks[0] ||
      null,
    [screenShareTracks],
  );
  const remoteParticipant = useMemo(
    () => participants.find((participant) => !participant.isLocal) || null,
    [participants],
  );

  const isMicEnabled = localParticipant?.isMicrophoneEnabled ?? true;
  const isCamEnabled = localParticipant?.isCameraEnabled ?? false;
  const isScreenShareEnabled = localParticipant?.isScreenShareEnabled ?? false;
  const remoteMuted = remoteParticipant?.isMicrophoneEnabled === false;
  const primaryPreviewOwner = mainCameraOwner === "local" ? "remote" : "local";
  const mainTrack = useMemo(
    () =>
      activeScreenShareTrack ||
      (mainCameraOwner === "local" ? localCameraTrack : remoteCameraTrack) ||
      null,
    [activeScreenShareTrack, localCameraTrack, mainCameraOwner, remoteCameraTrack],
  );
  const mainTrackHasVideo = hasRenderableTrack(mainTrack);
  const primaryPreviewTrack = useMemo(
    () =>
      primaryPreviewOwner === "local"
        ? localCameraTrack || null
        : remoteCameraTrack || null,
    [localCameraTrack, primaryPreviewOwner, remoteCameraTrack],
  );
  const primaryPreviewHasVideo = hasRenderableTrack(primaryPreviewTrack);
  const secondaryPreviewTrack = useMemo(() => {
    if (activeScreenShareTrack && remoteCameraTrack) return remoteCameraTrack;
    return null;
  }, [activeScreenShareTrack, remoteCameraTrack]);
  const secondaryPreviewHasVideo = hasRenderableTrack(secondaryPreviewTrack);
  const primaryPreviewName = primaryPreviewOwner === "local" ? localName : remoteName;
  const primaryPreviewAvatar = primaryPreviewOwner === "local" ? localAvatar : remoteAvatar;
  const primaryPreviewMuted =
    primaryPreviewOwner === "local" ? !isMicEnabled : remoteMuted;
  const mainFallbackName =
    activeScreenShareTrack?.participant?.name ||
    activeScreenShareTrack?.participant?.identity ||
    (mainCameraOwner === "local" ? localName : remoteName);
  const mainFallbackAvatar = mainCameraOwner === "local" ? localAvatar : remoteAvatar;
  const shouldShowPrimaryPreview =
    primaryPreviewOwner === "local"
      ? Boolean(primaryPreviewTrack || isCamEnabled)
      : Boolean(primaryPreviewTrack || remoteParticipant);

  const previewInset = isMobileViewport ? 16 : 24;
  const previewStyle = useMemo(() => {
    if (primaryPreviewPosition) {
      return {
        left: `${primaryPreviewPosition.x}px`,
        top: `${primaryPreviewPosition.y}px`,
      };
    }

    const inset = `${previewInset}px`;
    const positions = {
      "top-left": { top: inset, left: inset },
      "top-right": { top: inset, right: inset },
      "bottom-left": { bottom: inset, left: inset },
      "bottom-right": { bottom: inset, right: inset },
    };

    return positions[primaryPreviewCorner] || positions["top-left"];
  }, [previewInset, primaryPreviewCorner, primaryPreviewPosition]);

  const secondaryPreviewStyle = useMemo(() => {
    if (secondaryPreviewPosition) {
      return {
        left: `${secondaryPreviewPosition.x}px`,
        top: `${secondaryPreviewPosition.y}px`,
      };
    }

    const inset = `${previewInset}px`;
    const positions = {
      "top-left": { top: inset, left: inset },
      "top-right": { top: inset, right: inset },
      "bottom-left": { bottom: inset, left: inset },
      "bottom-right": { bottom: inset, right: inset },
    };

    return positions[secondaryPreviewCorner] || positions["top-right"];
  }, [previewInset, secondaryPreviewCorner, secondaryPreviewPosition]);

  const connectionLabel = useMemo(
    () => getConnectionLabel(connectionState),
    [connectionState],
  );
  const hasConnectionProblem = useMemo(() => {
    const normalized = String(connectionState || "").toLowerCase();
    return (
      hasEstablishedConnection &&
      (!isOnline ||
        normalized.includes("reconnect") ||
        normalized.includes("disconnect") ||
        (hadRemoteParticipant && !remoteParticipant))
    );
  }, [
    connectionState,
    hadRemoteParticipant,
    hasEstablishedConnection,
    isOnline,
    remoteParticipant,
  ]);
  const reconnectTimeLabel = `${String(Math.floor(reconnectSecondsLeft / 60)).padStart(
    2,
    "0",
  )}:${String(reconnectSecondsLeft % 60).padStart(2, "0")}`;
  const showWeakSignal = connectionLabel === "reconnecting";
  const headerStatus = connectionLabel === "connected" ? formatDuration(elapsedSeconds) : connectionLabel;
  const showCenteredIdentity = !mainTrackHasVideo || callType === "audio";

  const snapPreviewToNearestCorner = useCallback(
    ({ position, previewRef, currentCorner, setCorner, setPosition }) => {
      const stageRect = stageRef.current?.getBoundingClientRect();
      const previewRect = previewRef.current?.getBoundingClientRect();
      if (!stageRect || !previewRect) return;

      const inset = isMobileViewport ? 16 : 24;
      const corners = {
        "top-left": { x: inset, y: inset },
        "top-right": { x: stageRect.width - previewRect.width - inset, y: inset },
        "bottom-left": { x: inset, y: stageRect.height - previewRect.height - inset },
        "bottom-right": {
          x: stageRect.width - previewRect.width - inset,
          y: stageRect.height - previewRect.height - inset,
        },
      };

      const nextCorner =
        Object.entries(corners).reduce(
          (closest, [corner, coords]) => {
            const distance = Math.hypot(coords.x - position.x, coords.y - position.y);
            if (distance < closest.distance) {
              return { corner, distance };
            }
            return closest;
          },
          { corner: currentCorner, distance: Number.POSITIVE_INFINITY },
        ).corner || currentCorner;

      setCorner(nextCorner);
      setPosition(null);
    },
    [isMobileViewport],
  );

  const handlePreviewPointerDown = useCallback(
    ({ event, previewRef, dragRef, setPosition }) => {
      const stageRect = stageRef.current?.getBoundingClientRect();
      const previewRect = previewRef.current?.getBoundingClientRect();
      if (!stageRect || !previewRect) return;

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        moved: false,
        offsetX: event.clientX - previewRect.left,
        offsetY: event.clientY - previewRect.top,
        width: previewRect.width,
        height: previewRect.height,
      };
      setPosition({
        x: previewRect.left - stageRect.left,
        y: previewRect.top - stageRect.top,
      });
      event.currentTarget.setPointerCapture?.(event.pointerId);
    },
    [],
  );

  const handlePreviewPointerMove = useCallback(({ event, dragRef, setPosition }) => {
    const dragState = dragRef.current;
    const stageRect = stageRef.current?.getBoundingClientRect();
    if (!dragState || !stageRect) return;

    const nextX = event.clientX - stageRect.left - dragState.offsetX;
    const nextY = event.clientY - stageRect.top - dragState.offsetY;
    const clampedX = Math.min(Math.max(0, nextX), stageRect.width - dragState.width);
    const clampedY = Math.min(Math.max(0, nextY), stageRect.height - dragState.height);
    dragState.moved = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY) > 6;
    setPosition({ x: clampedX, y: clampedY });
  }, []);

  const handlePreviewPointerUp = useCallback(
    ({ event, dragRef, previewRef, position, currentCorner, setCorner, setPosition, onTap }) => {
      if (!dragRef.current || !position) return;
      const wasTap = !dragRef.current.moved;
      event.currentTarget.releasePointerCapture?.(dragRef.current.pointerId);
      dragRef.current = null;
      snapPreviewToNearestCorner({
        position,
        previewRef,
        currentCorner,
        setCorner,
        setPosition,
      });
      if (wasTap) {
        onTap?.();
      }
    },
    [snapPreviewToNearestCorner],
  );

  useEffect(() => {
    setPrimaryPreviewCorner("top-left");
    setPrimaryPreviewPosition(null);
    setSecondaryPreviewCorner("top-right");
    setSecondaryPreviewPosition(null);
  }, [isMobileViewport, mainTrack?.publication?.trackSid]);

  useEffect(() => {
    setElapsedSeconds(0);
    if (connectionLabel !== "connected") return undefined;

    const timerId = window.setInterval(() => {
      setElapsedSeconds((current) => current + 1);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [connectionLabel]);

  useEffect(() => {
    if (connectionLabel === "connected") {
      setHasEstablishedConnection(true);
    }
  }, [connectionLabel]);

  useEffect(() => {
    if (remoteParticipant) {
      setHadRemoteParticipant(true);
    }
  }, [remoteParticipant]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!hasConnectionProblem) {
      setReconnectSecondsLeft(60);
      return undefined;
    }

    setReconnectSecondsLeft(60);
    const intervalId = window.setInterval(() => {
      setReconnectSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [hasConnectionProblem]);

  useEffect(() => {
    if (!hasConnectionProblem || reconnectSecondsLeft > 0) return;
    toast.error("Ulanish tiklanmadi");
    onLeave();
  }, [hasConnectionProblem, onLeave, reconnectSecondsLeft]);

  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return;

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = buildCameraDeviceOptions(
        devices.filter((device) => device.kind === "videoinput"),
      ).map((device) => ({
        value: device.id,
        label: device.label,
      }));
      const audioInputs = devices
        .filter((device) => device.kind === "audioinput")
        .map((device, index) => ({
          value: device.deviceId,
          label: device.label || `Microphone ${index + 1}`,
        }));
      const audioOutputs = devices
        .filter((device) => device.kind === "audiooutput")
        .map((device, index) => ({
          value: device.deviceId,
          label: device.label || `Speaker ${index + 1}`,
        }));

      setCameraDevices(cameras);
      setAudioInputDevices(audioInputs);
      setAudioOutputDevices(audioOutputs);
      setSelectedCameraId((current) => current || cameras[0]?.value || "");
      setSelectedAudioInputId((current) => current || audioInputs[0]?.value || "");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    refreshDevices();
    if (!navigator.mediaDevices?.addEventListener) return undefined;
    navigator.mediaDevices.addEventListener("devicechange", refreshDevices);
    return () => navigator.mediaDevices.removeEventListener("devicechange", refreshDevices);
  }, [refreshDevices]);

  useEffect(() => {
    if (!isMobileViewport) return;
    applyPreferredAudioOutput(audioRoute === "speaker", renderRootRef.current).catch(() => false);
  }, [audioRoute, isMobileViewport, renderRootRef]);

  useEffect(() => {
    if (!cameraMenuOpen && !micMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (controlsRef.current?.contains(event.target)) return;
      setCameraMenuOpen(false);
      setMicMenuOpen(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [cameraMenuOpen, micMenuOpen]);

  useEffect(() => {
    if (!settingsOpen) return undefined;

    const handlePointerDown = (event) => {
      if (settingsRef.current?.contains(event.target)) return;
      setSettingsOpen(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [settingsOpen]);

  const handleToggleMic = useCallback(async () => {
    try {
      await room.localParticipant.setMicrophoneEnabled(!isMicEnabled);
      if (!selectedAudioInputId) {
        void refreshDevices();
      }
    } catch {
      toast.error("Mikrofonni boshqarib bo'lmadi");
    }
  }, [isMicEnabled, refreshDevices, room.localParticipant, selectedAudioInputId]);

  const handleToggleCam = useCallback(async () => {
    try {
      if (!isCamEnabled) {
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

      if (!selectedCameraId) {
        void refreshDevices();
      }
    } catch {
      toast.error("Kamerani boshqarib bo'lmadi");
    }
  }, [isCamEnabled, refreshDevices, room.localParticipant, selectedCameraId]);

  const handleToggleScreenShare = useCallback(async () => {
    if (isMobileViewport) return;
    try {
      const nextEnabled = !isScreenShareEnabled;
      await room.localParticipant.setScreenShareEnabled(
        nextEnabled,
        nextEnabled
          ? {
              selfBrowserSurface: "include",
              surfaceSwitching: "include",
            }
          : undefined,
      );
    } catch {
      toast.error("Screen share boshqarib bo'lmadi");
    }
  }, [isMobileViewport, isScreenShareEnabled, room.localParticipant]);

  const handleOpenPictureInPicture = useCallback(async () => {
    const video = videoStageRef.current?.querySelector("video");

    if (!video) {
      toast.error("PiP uchun video topilmadi");
      return;
    }

    if (!document.pictureInPictureEnabled || typeof video.requestPictureInPicture !== "function") {
      toast.error("Bu browser PiP oynasini qo'llamaydi");
      return;
    }

    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
        return;
      }

      await video.requestPictureInPicture();
    } catch {
      toast.error("PiP oynasini ochib bo'lmadi");
    }
  }, []);

  const handleSwitchCamera = useCallback(
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
          } else if (isCamEnabled) {
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
        setCameraMenuOpen(false);
        setMicMenuOpen(false);
        setSettingsOpen(false);
      } catch {
        toast.error("Kamera almashtirilmadi");
      }
    },
    [isCamEnabled, room],
  );

  const handleSwitchMic = useCallback(
    async (deviceId) => {
      try {
        await room.switchActiveDevice("audioinput", deviceId);
        setSelectedAudioInputId(deviceId);
        setMicMenuOpen(false);
        setSettingsOpen(false);
      } catch {
        toast.error("Mikrofon almashtirilmadi");
      }
    },
    [room],
  );

  const handleSwitchSpeaker = useCallback(
    async (mode) => {
      setAudioRoute(mode);

      if (audioOutputDevices.length && typeof room.switchActiveDevice === "function") {
        const output = audioOutputDevices.find((item) => item.value === mode);
        if (output) {
          try {
            await room.switchActiveDevice("audiooutput", output.value);
            return;
          } catch {
            // fall through
          }
        }
      }

      try {
        await applyPreferredAudioOutput(mode === "speaker", renderRootRef.current);
      } catch {
        toast.error("Kalonkani almashtirib bo'lmadi");
      }
    },
    [audioOutputDevices, renderRootRef, room],
  );

  const handleQuickSpeakerToggle = useCallback(() => {
    const nextMode = audioRoute === "speaker" ? "receiver" : "speaker";
    void handleSwitchSpeaker(nextMode);
  }, [audioRoute, handleSwitchSpeaker]);

  const speakerOptions = useMemo(() => {
    if (isMobileViewport) {
      return [
        { value: "speaker", label: "Katta kalonka" },
        { value: "receiver", label: "Kichik kalonka" },
      ];
    }

    if (audioOutputDevices.length) return audioOutputDevices;

    return [
      { value: "speaker", label: "Speaker" },
      { value: "receiver", label: "Receiver" },
    ];
  }, [audioOutputDevices, isMobileViewport]);

  return (
    <Shell ref={renderRootRef}>
      <Stage ref={stageRef}>
        <VideoStage ref={videoStageRef}>
          {mainTrackHasVideo && callType !== "audio" ? (
            <ParticipantTile trackRef={mainTrack} />
          ) : (
            <VideoFallbackSurface />
          )}
        </VideoStage>
        <VideoChrome />

        <HeaderLayer $visible={controlsVisible}>
          <HeaderSpacer />
          <HeaderCenter>
            <HeaderName>{mainFallbackName || remoteName}</HeaderName>
            <HeaderMeta>
              <Signal size={16} />
              <span>{headerStatus}</span>
            </HeaderMeta>
            {showWeakSignal ? <WeakSignalPill>Weak network signal</WeakSignalPill> : null}
          </HeaderCenter>
          <HeaderTools>
            <HeaderToolButton
              type="button"
              onClick={handleOpenPictureInPicture}
              title="Picture in picture"
              aria-label="Picture in picture"
            >
              <Minimize2 size={18} />
            </HeaderToolButton>
          </HeaderTools>
        </HeaderLayer>

        {showCenteredIdentity ? (
          <CenterIdentity>
            <AvatarHalo>
              <IdentityAvatar>
                {mainFallbackAvatar ? (
                  <img src={mainFallbackAvatar} alt={mainFallbackName} />
                ) : (
                  getAvatarInitials(mainFallbackName)
                )}
              </IdentityAvatar>
            </AvatarHalo>
            <IdentityName>{mainFallbackName}</IdentityName>
            <IdentityStatus>
              <Signal size={18} />
              <span>
                {connectionLabel === "connected"
                  ? formatDuration(elapsedSeconds)
                  : connectionLabel === "connecting"
                    ? "ulanyapti..."
                    : connectionLabel === "reconnecting"
                      ? "qayta ulanmoqda..."
                      : "tayyorlanmoqda..."}
              </span>
            </IdentityStatus>
          </CenterIdentity>
        ) : null}

        {shouldShowPrimaryPreview ? (
          <PreviewWindow
            ref={primaryPreviewRef}
            style={previewStyle}
            $dragging={Boolean(primaryPreviewPosition)}
            onPointerDown={(event) =>
              handlePreviewPointerDown({
                event,
                previewRef: primaryPreviewRef,
                dragRef: primaryDragStateRef,
                setPosition: setPrimaryPreviewPosition,
              })
            }
            onPointerMove={(event) =>
              handlePreviewPointerMove({
                event,
                dragRef: primaryDragStateRef,
                setPosition: setPrimaryPreviewPosition,
              })
            }
            onPointerUp={(event) =>
              handlePreviewPointerUp({
                event,
                dragRef: primaryDragStateRef,
                previewRef: primaryPreviewRef,
                position: primaryPreviewPosition,
                currentCorner: primaryPreviewCorner,
                setCorner: setPrimaryPreviewCorner,
                setPosition: setPrimaryPreviewPosition,
                onTap: () => setMainCameraOwner(primaryPreviewOwner),
              })
            }
            onPointerCancel={(event) =>
              handlePreviewPointerUp({
                event,
                dragRef: primaryDragStateRef,
                previewRef: primaryPreviewRef,
                position: primaryPreviewPosition,
                currentCorner: primaryPreviewCorner,
                setCorner: setPrimaryPreviewCorner,
                setPosition: setPrimaryPreviewPosition,
              })
            }
          >
            {primaryPreviewHasVideo ? (
              <ParticipantTile trackRef={primaryPreviewTrack} />
            ) : (
              <PreviewFallback>
                <PreviewFallbackAvatar>
                  {primaryPreviewAvatar ? (
                    <img src={primaryPreviewAvatar} alt={primaryPreviewName} />
                  ) : (
                    getAvatarInitials(primaryPreviewName)
                  )}
                </PreviewFallbackAvatar>
              </PreviewFallback>
            )}
            {controlsVisible ? (
              <PreviewBadge>
                <span>{primaryPreviewName}</span>
                {primaryPreviewMuted ? <MicOff size={13} /> : <Mic size={13} />}
              </PreviewBadge>
            ) : null}
          </PreviewWindow>
        ) : null}

        {secondaryPreviewTrack ? (
          <SecondaryPreviewWindow
            ref={secondaryPreviewRef}
            style={secondaryPreviewStyle}
            $dragging={Boolean(secondaryPreviewPosition)}
            onPointerDown={(event) =>
              handlePreviewPointerDown({
                event,
                previewRef: secondaryPreviewRef,
                dragRef: secondaryDragStateRef,
                setPosition: setSecondaryPreviewPosition,
              })
            }
            onPointerMove={(event) =>
              handlePreviewPointerMove({
                event,
                dragRef: secondaryDragStateRef,
                setPosition: setSecondaryPreviewPosition,
              })
            }
            onPointerUp={(event) =>
              handlePreviewPointerUp({
                event,
                dragRef: secondaryDragStateRef,
                previewRef: secondaryPreviewRef,
                position: secondaryPreviewPosition,
                currentCorner: secondaryPreviewCorner,
                setCorner: setSecondaryPreviewCorner,
                setPosition: setSecondaryPreviewPosition,
              })
            }
            onPointerCancel={(event) =>
              handlePreviewPointerUp({
                event,
                dragRef: secondaryDragStateRef,
                previewRef: secondaryPreviewRef,
                position: secondaryPreviewPosition,
                currentCorner: secondaryPreviewCorner,
                setCorner: setSecondaryPreviewCorner,
                setPosition: setSecondaryPreviewPosition,
              })
            }
          >
            {secondaryPreviewHasVideo ? (
              <ParticipantTile trackRef={secondaryPreviewTrack} />
            ) : (
              <PreviewFallback>
                <PreviewFallbackAvatar>
                  {remoteAvatar ? (
                    <img src={remoteAvatar} alt={remoteName} />
                  ) : (
                    getAvatarInitials(remoteName)
                  )}
                </PreviewFallbackAvatar>
              </PreviewFallback>
            )}
            {controlsVisible ? (
              <PreviewBadge>
                <span>{remoteName}</span>
              </PreviewBadge>
            ) : null}
          </SecondaryPreviewWindow>
        ) : null}
      </Stage>

      <BottomLayer $visible={controlsVisible}>
        {controlsVisible ? (
          <StatusToastStack>
            {remoteMuted ? (
              <StatusToast>
                <MicOff size={18} />
                {remoteName} mikrofoni o'chirilgan
              </StatusToast>
            ) : null}
            {!isMicEnabled ? (
              <StatusToast>
                <MicOff size={18} />
                Mikrofoningiz o'chiq
              </StatusToast>
            ) : null}
          </StatusToastStack>
        ) : null}

        <Controls ref={controlsRef}>
          {isMobileViewport ? (
            <Control type="button" onClick={handleQuickSpeakerToggle}>
              <ControlCircle $active={audioRoute === "speaker"}>
                {audioRoute === "speaker" ? <Volume2 size={20} /> : <Volume1 size={20} />}
              </ControlCircle>
              <ControlLabel>karnay</ControlLabel>
            </Control>
          ) : null}
          <DeviceControl>
            <DeviceButtonGroup>
              <DeviceToggleButton type="button" $active={isCamEnabled} onClick={handleToggleCam}>
                {isCamEnabled ? <Video size={20} /> : <VideoOff size={20} />}
              </DeviceToggleButton>
              <DeviceMenuButton
                type="button"
                $open={cameraMenuOpen}
                onClick={(event) => {
                  event.stopPropagation();
                  setCameraMenuOpen((current) => !current);
                  setMicMenuOpen(false);
                  if (!cameraDevices.length) {
                    void refreshDevices();
                  }
                }}
                aria-label="Camera devices"
                aria-expanded={cameraMenuOpen}
              >
                <ChevronDown size={16} />
              </DeviceMenuButton>
            </DeviceButtonGroup>
            <ControlLabel>video</ControlLabel>
            {cameraMenuOpen ? (
              <DeviceMenu>
                <DeviceMenuTitle>Kamera tanlash</DeviceMenuTitle>
                {cameraDevices.length ? (
                  cameraDevices.map((option) => (
                    <DeviceMenuOption
                      key={option.value}
                      type="button"
                      $active={selectedCameraId === option.value}
                      onClick={() => handleSwitchCamera(option.value)}
                    >
                      <DeviceMenuLabel>{option.label}</DeviceMenuLabel>
                      {selectedCameraId === option.value ? (
                        <DeviceMenuSelected>
                          <Check size={14} />
                        </DeviceMenuSelected>
                      ) : null}
                    </DeviceMenuOption>
                  ))
                ) : (
                  <DeviceMenuOption as="div">
                    <DeviceMenuLabel>Kamera topilmadi</DeviceMenuLabel>
                  </DeviceMenuOption>
                )}
              </DeviceMenu>
            ) : null}
          </DeviceControl>
          {!isMobileViewport ? (
            <Control type="button" onClick={handleToggleScreenShare}>
              <ControlCircle $active={isScreenShareEnabled}>
                <MonitorUp size={20} />
              </ControlCircle>
              <ControlLabel>screen</ControlLabel>
            </Control>
          ) : null}
          <DeviceControl>
            <DeviceButtonGroup>
              <DeviceToggleButton type="button" $active={isMicEnabled} onClick={handleToggleMic}>
                {isMicEnabled ? <Mic size={20} /> : <MicOff size={20} />}
              </DeviceToggleButton>
              <DeviceMenuButton
                type="button"
                $open={micMenuOpen}
                onClick={(event) => {
                  event.stopPropagation();
                  setMicMenuOpen((current) => !current);
                  setCameraMenuOpen(false);
                  if (!audioInputDevices.length) {
                    void refreshDevices();
                  }
                }}
                aria-label="Microphone devices"
                aria-expanded={micMenuOpen}
              >
                <ChevronDown size={16} />
              </DeviceMenuButton>
            </DeviceButtonGroup>
            <ControlLabel>sukut</ControlLabel>
            {micMenuOpen ? (
              <DeviceMenu>
                <DeviceMenuTitle>Mikrofon tanlash</DeviceMenuTitle>
                {audioInputDevices.length ? (
                  audioInputDevices.map((option) => (
                    <DeviceMenuOption
                      key={option.value}
                      type="button"
                      $active={selectedAudioInputId === option.value}
                      onClick={() => handleSwitchMic(option.value)}
                    >
                      <DeviceMenuLabel>{option.label}</DeviceMenuLabel>
                      {selectedAudioInputId === option.value ? (
                        <DeviceMenuSelected>
                          <Check size={14} />
                        </DeviceMenuSelected>
                      ) : null}
                    </DeviceMenuOption>
                  ))
                ) : (
                  <DeviceMenuOption as="div">
                    <DeviceMenuLabel>Mikrofon topilmadi</DeviceMenuLabel>
                  </DeviceMenuOption>
                )}
              </DeviceMenu>
            ) : null}
          </DeviceControl>
          <Control type="button" onClick={onLeave}>
            <ControlCircle $danger>
              <PhoneOff size={20} />
            </ControlCircle>
            <ControlLabel>tugatish</ControlLabel>
          </Control>
        </Controls>
      </BottomLayer>

      {hasConnectionProblem ? (
        <ReconnectOverlay>
          <ReconnectCard>
            <ReconnectIcon>
              <LoadingIcon size={24} />
            </ReconnectIcon>
            <ReconnectTitle>Qayta ulanmoqda...</ReconnectTitle>
            <ReconnectText>
              Qo'ng'iroq ochiq turadi. Internet tiklansa suhbat avtomatik davom etadi.
            </ReconnectText>
            <ReconnectTimer>{reconnectTimeLabel}</ReconnectTimer>
          </ReconnectCard>
        </ReconnectOverlay>
      ) : null}

      <RoomAudioRenderer />
    </Shell>
  );
}

const PrivateVideoCall = ({
  isOpen,
  onClose,
  roomId,
  remoteUser,
  callType = "video",
}) => {
  const { t } = useTranslation();
  const currentUser = useAuthStore((state) => state.user);
  const [liveKitSession, setLiveKitSession] = useState(null);
  const [liveKitError, setLiveKitError] = useState("");
  const [isMobileViewport, setIsMobileViewport] = useState(detectMobileViewport);
  const tokenRequestIdRef = useRef(0);
  const renderRootRef = useRef(null);

  const localName = useMemo(
    () => getDisplayName(currentUser, t("privateCall.localLabel")),
    [currentUser, t],
  );
  const remoteName = useMemo(
    () => getDisplayName(remoteUser, t("privateCall.remoteLabel")),
    [remoteUser, t],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleViewportChange = () => setIsMobileViewport(detectMobileViewport());
    handleViewportChange();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("orientationchange", handleViewportChange);
    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("orientationchange", handleViewportChange);
    };
  }, [isOpen]);

  useEffect(() => {
    setLiveKitSession(null);
    setLiveKitError("");
    tokenRequestIdRef.current += 1;
  }, [localName, roomId]);

  useEffect(() => {
    if (!isOpen || !roomId) return undefined;

    const requestId = tokenRequestIdRef.current + 1;
    tokenRequestIdRef.current = requestId;
    let cancelled = false;
    setLiveKitError("");

    createLivekitToken({
      roomId,
      participantName: localName,
      canPublish: true,
      canPublishData: true,
      canSubscribe: true,
    })
      .then((session) => {
        if (cancelled || tokenRequestIdRef.current !== requestId) return;
        setLiveKitSession({
          token: session?.token || "",
          url: session?.url || LIVEKIT_URL || "",
        });
      })
      .catch((tokenError) => {
        if (cancelled || tokenRequestIdRef.current !== requestId) return;
        setLiveKitError(
          tokenError?.response?.data?.message ||
            tokenError?.message ||
            "LiveKit token olinmadi",
        );
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, localName, roomId]);

  const handleLeave = useCallback(() => {
    onClose?.();
  }, [onClose]);

  if (!isOpen) return null;

  if (liveKitError) {
    return (
      <CenterState>
        <StateCard>
          <AvatarHalo>
            <IdentityAvatar>
              <X size={42} />
            </IdentityAvatar>
          </AvatarHalo>
          <IdentityName>{t("privateCall.titleFallback")}</IdentityName>
          <IdentityStatus>{liveKitError}</IdentityStatus>
          <StateAction type="button" onClick={handleLeave}>
            <PhoneOff size={30} />
          </StateAction>
        </StateCard>
      </CenterState>
    );
  }

  if (!liveKitSession?.token || !liveKitSession?.url) {
    return (
      <CenterState>
        <StateCard>
          <AvatarHalo>
            <IdentityAvatar>
              <LoadingIcon size={40} />
            </IdentityAvatar>
          </AvatarHalo>
          <IdentityName>{remoteName}</IdentityName>
          <IdentityStatus>Private call tayyorlanmoqda...</IdentityStatus>
          <StateAction type="button" onClick={handleLeave}>
            <PhoneOff size={20} />
          </StateAction>
        </StateCard>
      </CenterState>
    );
  }

  return (
    <Overlay>
      <LiveKitRoom
        serverUrl={liveKitSession.url}
        token={liveKitSession.token}
        connect={Boolean(liveKitSession.token)}
        audio={false}
        video={false}
        options={{
          adaptiveStream: true,
          dynacast: true,
          publishDefaults: {
            simulcast: true,
            videoCodec: "vp8",
          },
        }}
        connectOptions={{ autoSubscribe: true }}
        onError={(error) => {
          toast.error(error?.message || "Private call ulanayotganda vaqtinchalik xatolik yuz berdi");
        }}
      >
        <PrivateLiveKitContent
          remoteName={remoteName}
          localName={localName}
          localAvatar={currentUser?.avatar}
          remoteAvatar={remoteUser?.avatar}
          callType={callType}
          isMobileViewport={isMobileViewport}
          onLeave={handleLeave}
          renderRootRef={renderRootRef}
        />
      </LiveKitRoom>
    </Overlay>
  );
};

export default PrivateVideoCall;
