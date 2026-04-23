import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import {
  ChevronDown,
  Check,
  Loader2,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Video,
  VideoOff,
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

const detectMobileViewport = () => {
  if (typeof window === "undefined") return false;
  return Boolean(
    window.matchMedia?.("(max-width: 980px)")?.matches ||
      window.matchMedia?.("(pointer: coarse)")?.matches,
  );
};

const getDisplayName = (user, fallback) =>
  user?.nickname || user?.username || user?.name || fallback;

const Overlay = styled.div`
  --private-bg: radial-gradient(circle at top, rgba(255, 255, 255, 0.06), transparent 38%),
    linear-gradient(180deg, #141518 0%, #0d0e11 100%);
  --private-panel: rgba(20, 21, 24, 0.76);
  --private-panel-strong: rgba(10, 11, 14, 0.84);
  --private-card: rgba(255, 255, 255, 0.08);
  --private-border: rgba(255, 255, 255, 0.1);
  --private-text: #f5f7fb;
  --private-muted: rgba(245, 247, 251, 0.7);
  --private-accent: #7387ff;
  --private-danger: #ff5a67;

  position: fixed;
  inset: 0;
  z-index: 10000;
  color: var(--private-text);
  background: var(--private-bg);
  overflow: hidden;

  .lk-participant-tile {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    background: #111214;
  }

  .lk-participant-media-video {
    width: 100%;
    height: 100%;
    object-fit: cover !important;
    background: #111214;
  }

  .lk-participant-placeholder {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
  }

  .lk-participant-metadata,
  .lk-focus-toggle-button {
    display: none !important;
  }
`;

const Shell = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  padding: 10px;

  @media (max-width: 768px) {
    padding:
      calc(18px + env(safe-area-inset-top, 0px))
      calc(16px + env(safe-area-inset-right, 0px))
      calc(18px + env(safe-area-inset-bottom, 0px))
      calc(16px + env(safe-area-inset-left, 0px));
  }
`;

const Stage = styled.div`
  position: relative;
  min-height: 0;
  overflow: hidden;
  border-radius: 34px;
  border: 1px solid var(--private-border);
  background: var(--private-panel);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);

  @media (max-width: 768px) {
    border-radius: 28px;
  }
`;

const MainFeed = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const MainFallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  padding: 32px;
  background:
    radial-gradient(circle at top right, rgba(115, 135, 255, 0.18), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
`;

const FallbackCard = styled.div`
  display: grid;
  justify-items: center;
  gap: 16px;
  text-align: center;
`;

const FallbackAvatar = styled.div`
  width: ${(props) => (props.$small ? "60px" : "120px")};
  height: ${(props) => (props.$small ? "60px" : "120px")};
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(115, 135, 255, 0.45), rgba(255, 255, 255, 0.16));
  border: 1px solid rgba(255, 255, 255, 0.14);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: ${(props) => (props.$small ? "22px" : "42px")};
`;

const FallbackTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const FallbackDescription = styled.div`
  max-width: 280px;
  color: var(--private-muted);
  line-height: 1.5;
`;

const TopBadges = styled.div`
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  z-index: 3;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  pointer-events: none;
`;

const BadgeStack = styled.div`
  display: grid;
  gap: 10px;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 11, 14, 0.5);
  backdrop-filter: blur(14px);
  color: ${(props) => props.$tone || "var(--private-text)"};
  font-size: 13px;
  font-weight: 600;
`;

const LocalPreview = styled.div`
  position: absolute;
  z-index: 3;
  width: min(23vw, 188px);
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(11, 12, 14, 0.72);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition:
    top 0.22s ease,
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
    width: min(30vw, 118px);
    border-radius: 20px;
  }
`;

const SecondaryPreview = styled(LocalPreview)`
  z-index: 2;
`;

const PreviewFallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
`;

const PreviewLabel = styled.div`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(10, 11, 14, 0.58);
  color: white;
  font-size: 12px;
  font-weight: 700;
  backdrop-filter: blur(10px);
`;

const ControlDockWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 14px;
`;

const ControlDock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 999px;
  border: 1px solid var(--private-border);
  background: rgba(11, 12, 15, 0.82);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(18px);

  @media (max-width: 768px) {
    gap: 8px;
    padding: 10px 12px;
  }
`;

const ControlGroup = styled.div`
  position: relative;
`;

const SplitControl = styled.div`
  display: flex;
  align-items: stretch;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid
    ${(props) =>
      props.$active
        ? "rgba(115, 135, 255, 0.55)"
        : "rgba(255, 255, 255, 0.08)"};
  background: ${(props) =>
    props.$active ? "rgba(115, 135, 255, 0.2)" : "rgba(255, 255, 255, 0.06)"};

  @media (max-width: 768px) {
    border-radius: 16px;
  }
`;

const ControlButton = styled.button`
  width: ${(props) => (props.$danger ? "66px" : "56px")};
  height: 56px;
  border-radius: 20px;
  border: 1px solid
    ${(props) =>
      props.$danger
        ? "transparent"
        : props.$active
          ? "rgba(115, 135, 255, 0.55)"
          : "rgba(255, 255, 255, 0.08)"};
  background: ${(props) =>
    props.$danger
      ? "var(--private-danger)"
      : props.$active
        ? "rgba(115, 135, 255, 0.2)"
        : "rgba(255, 255, 255, 0.06)"};
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: ${(props) => (props.$danger ? "58px" : "48px")};
    height: 48px;
    border-radius: 16px;
  }
`;

const SplitPrimaryButton = styled(ControlButton)`
  width: ${(props) => (props.$danger ? "66px" : "56px")};
  border: none;
  border-radius: 0;
  background: transparent;
`;

const SplitMenuButton = styled(ControlButton)`
  width: 36px;
  border: none;
  border-radius: 0;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.06)" : "transparent"};

  @media (max-width: 768px) {
    width: 30px;
  }
`;

const DeviceMenu = styled.div`
  position: absolute;
  bottom: calc(100% + 14px);
  min-width: 220px;
  max-width: min(88vw, 320px);
  max-height: min(52vh, 320px);
  overflow-y: auto;
  padding: 10px;
  border-radius: 22px;
  border: 1px solid var(--private-border);
  background: rgba(11, 12, 15, 0.94);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
  display: grid;
  gap: 6px;
  z-index: 5;
  ${(props) =>
    props.$align === "end"
      ? `
    right: 0;
  `
      : `
    left: 0;
  `}
`;

const DeviceMenuTitle = styled.div`
  padding: 6px 8px 10px;
  color: var(--private-muted);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const DeviceMenuButton = styled.button`
  width: 100%;
  border: 1px solid ${(props) => (props.$active ? "rgba(115, 135, 255, 0.55)" : "transparent")};
  border-radius: 16px;
  background: ${(props) => (props.$active ? "rgba(115, 135, 255, 0.18)" : "transparent")};
  color: var(--private-text);
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  text-align: left;
`;

const DeviceLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CenterState = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 24px;
  color: var(--private-text, #f5f7fb);
  background:
    radial-gradient(circle at top, rgba(255, 255, 255, 0.06), transparent 38%),
    linear-gradient(180deg, #141518 0%, #0d0e11 100%);
`;

const StateCard = styled.div`
  width: min(100%, 420px);
  padding: 28px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(18, 19, 23, 0.84);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(18px);
  display: grid;
  justify-items: center;
  gap: 16px;
  text-align: center;
`;

const StateAction = styled.button`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: var(--private-danger, #ff5a67);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

function DevicePopover({ title, options, selectedValue, onSelect, align = "start" }) {
  if (!options.length) {
    return (
      <DeviceMenu $align={align}>
        <DeviceMenuTitle>{title}</DeviceMenuTitle>
        <DeviceMenuButton as="div">
          <DeviceLabel>Qurilma topilmadi</DeviceLabel>
        </DeviceMenuButton>
      </DeviceMenu>
    );
  }

  return (
    <DeviceMenu $align={align}>
      <DeviceMenuTitle>{title}</DeviceMenuTitle>
      {options.map((option) => (
        <DeviceMenuButton
          key={option.value}
          type="button"
          $active={selectedValue === option.value}
          onClick={() => onSelect(option.value)}
        >
          <DeviceLabel>{option.label}</DeviceLabel>
          {selectedValue === option.value ? <Check size={16} /> : null}
        </DeviceMenuButton>
      ))}
    </DeviceMenu>
  );
}

function PrivateLiveKitContent({
  localName,
  remoteName,
  isMobileViewport,
  onLeave,
  renderRootRef,
}) {
  const room = useRoomContext();
  const participants = useParticipants();
  const connectionState = useConnectionState(room);
  const { localParticipant } = useLocalParticipant();
  const stageRef = useRef(null);
  const primaryPreviewRef = useRef(null);
  const secondaryPreviewRef = useRef(null);
  const primaryDragStateRef = useRef(null);
  const secondaryDragStateRef = useRef(null);
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
  const [openMenu, setOpenMenu] = useState(null);
  const [cameraDevices, setCameraDevices] = useState([]);
  const [audioInputDevices, setAudioInputDevices] = useState([]);
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState("");
  const [selectedAudioInputId, setSelectedAudioInputId] = useState("");
  const [audioRoute, setAudioRoute] = useState("speaker");
  const [primaryPreviewCorner, setPrimaryPreviewCorner] = useState("top-left");
  const [primaryPreviewPosition, setPrimaryPreviewPosition] = useState(null);
  const [secondaryPreviewCorner, setSecondaryPreviewCorner] = useState("bottom-left");
  const [secondaryPreviewPosition, setSecondaryPreviewPosition] = useState(null);

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
  const isCamEnabled = localParticipant?.isCameraEnabled ?? true;
  const isScreenShareEnabled = localParticipant?.isScreenShareEnabled ?? false;
  const mainTrack = useMemo(
    () => activeScreenShareTrack || remoteCameraTrack || localCameraTrack || null,
    [activeScreenShareTrack, localCameraTrack, remoteCameraTrack],
  );
  const primaryPreviewTrack = useMemo(() => {
    if (localCameraTrack) return localCameraTrack;
    if (!activeScreenShareTrack && mainTrack === remoteCameraTrack) return remoteCameraTrack || null;
    return null;
  }, [activeScreenShareTrack, localCameraTrack, mainTrack, remoteCameraTrack]);
  const secondaryPreviewTrack = useMemo(() => {
    if (!activeScreenShareTrack || !remoteCameraTrack) return null;
    if (localCameraTrack) return remoteCameraTrack;
    return remoteCameraTrack;
  }, [activeScreenShareTrack, localCameraTrack, remoteCameraTrack]);

  const snapPreviewToNearestCorner = useCallback(
    ({ position, previewRef, currentCorner, setCorner, setPosition }) => {
      const stageRect = stageRef.current?.getBoundingClientRect();
      const previewRect = previewRef.current?.getBoundingClientRect();
      if (!stageRect || !previewRect) return;

      const inset = isMobileViewport ? 18 : 22;
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
    setPosition({ x: clampedX, y: clampedY });
  }, []);

  const handlePreviewPointerUp = useCallback(
    ({ event, dragRef, previewRef, position, currentCorner, setCorner, setPosition }) => {
      if (!dragRef.current || !position) return;
      event.currentTarget.releasePointerCapture?.(dragRef.current.pointerId);
      dragRef.current = null;
      snapPreviewToNearestCorner({
        position,
        previewRef,
        currentCorner,
        setCorner,
        setPosition,
      });
    },
    [snapPreviewToNearestCorner],
  );

  useEffect(() => {
    setPrimaryPreviewCorner("top-left");
    setPrimaryPreviewPosition(null);
    setSecondaryPreviewCorner("bottom-left");
    setSecondaryPreviewPosition(null);
  }, [isMobileViewport, mainTrack?.publication?.trackSid]);

  const refreshDevices = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) return;

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices
        .filter((device) => device.kind === "videoinput")
        .map((device, index) => ({
          value: device.deviceId,
          label: device.label || `Camera ${index + 1}`,
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
      await room.localParticipant.setCameraEnabled(!isCamEnabled);
      if (!selectedCameraId) {
        void refreshDevices();
      }
    } catch {
      toast.error("Kamerani boshqarib bo'lmadi");
    }
  }, [isCamEnabled, refreshDevices, room.localParticipant, selectedCameraId]);

  const handleSwitchCamera = useCallback(
    async (deviceId) => {
      try {
        await room.switchActiveDevice("videoinput", deviceId);
        setSelectedCameraId(deviceId);
        setOpenMenu(null);
      } catch {
        toast.error("Kamera almashtirilmadi");
      }
    },
    [room],
  );

  const handleSwitchMic = useCallback(
    async (deviceId) => {
      try {
        await room.switchActiveDevice("audioinput", deviceId);
        setSelectedAudioInputId(deviceId);
        setOpenMenu(null);
      } catch {
        toast.error("Mikrofon almashtirilmadi");
      }
    },
    [room],
  );

  const handleSwitchSpeaker = useCallback(
    async (mode) => {
      setAudioRoute(mode);
      setOpenMenu(null);

      if (audioOutputDevices.length && typeof room.switchActiveDevice === "function") {
        const output = audioOutputDevices.find((item) => item.value === mode);
        if (output) {
          try {
            await room.switchActiveDevice("audiooutput", output.value);
            return;
          } catch {}
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

  const handleToggleScreenShare = useCallback(async () => {
    if (isMobileViewport) return;
    try {
      await room.localParticipant.setScreenShareEnabled(!isScreenShareEnabled);
    } catch {
      toast.error("Screen share boshqarib bo'lmadi");
    }
  }, [isMobileViewport, isScreenShareEnabled, room.localParticipant]);

  const connectionLabel = useMemo(() => {
    const normalized = String(connectionState || "").toLowerCase();
    if (normalized.includes("connected")) return "Connected";
    if (normalized.includes("reconnect")) return "Reconnecting";
    if (normalized.includes("connect")) return "Connecting";
    return "Preparing";
  }, [connectionState]);

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

  const previewInset = isMobileViewport ? 18 : 22;
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
  }, [primaryPreviewCorner, previewInset, primaryPreviewPosition]);

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

    return positions[secondaryPreviewCorner] || positions["bottom-left"];
  }, [previewInset, secondaryPreviewCorner, secondaryPreviewPosition]);

  return (
    <Shell ref={renderRootRef}>
      <Stage ref={stageRef}>
        <MainFeed>
          {mainTrack ? (
            <ParticipantTile trackRef={mainTrack} />
          ) : (
            <MainFallback>
              <FallbackCard>
                <FallbackAvatar>{remoteName.charAt(0).toUpperCase()}</FallbackAvatar>
                <FallbackTitle>{remoteName}</FallbackTitle>
                <FallbackDescription>
                  Suhbatdosh LiveKit roomga ulanmoqda. Kamera yoqilgach video shu yerda ko'rinadi.
                </FallbackDescription>
              </FallbackCard>
            </MainFallback>
          )}

          <TopBadges>
            <BadgeStack>
              <Pill>{remoteName}</Pill>
              <Pill $tone="var(--private-muted)">{connectionLabel}</Pill>
            </BadgeStack>
            <BadgeStack>
              {remoteParticipant && remoteParticipant.isMicrophoneEnabled === false ? (
                <Pill $tone="var(--private-muted)">
                  <MicOff size={14} />
                  Mute
                </Pill>
              ) : null}
            </BadgeStack>
          </TopBadges>

          {primaryPreviewTrack ? (
            <LocalPreview
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
              <ParticipantTile trackRef={primaryPreviewTrack} />
              <PreviewLabel>
                <span>
                  {primaryPreviewTrack.participant?.isLocal
                    ? localName
                    : primaryPreviewTrack.participant?.name || remoteName}
                </span>
                {primaryPreviewTrack.participant?.isLocal ? (
                  isMicEnabled ? (
                    <Mic size={13} />
                  ) : (
                    <MicOff size={13} />
                  )
                ) : null}
              </PreviewLabel>
            </LocalPreview>
          ) : (
            <LocalPreview
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
              <PreviewFallback>
                <FallbackAvatar $small>{localName.charAt(0).toUpperCase()}</FallbackAvatar>
              </PreviewFallback>
              <PreviewLabel>
                <span>{localName}</span>
                {isMicEnabled ? <Mic size={13} /> : <MicOff size={13} />}
              </PreviewLabel>
            </LocalPreview>
          )}

          {secondaryPreviewTrack && primaryPreviewTrack !== secondaryPreviewTrack ? (
            <SecondaryPreview
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
              <ParticipantTile trackRef={secondaryPreviewTrack} />
              <PreviewLabel>
                <span>{secondaryPreviewTrack.participant?.name || remoteName}</span>
              </PreviewLabel>
            </SecondaryPreview>
          ) : null}
        </MainFeed>
      </Stage>

      <ControlDockWrap>
        <ControlDock>
          <ControlGroup>
            <SplitControl $active={isCamEnabled || openMenu === "camera"}>
              <SplitPrimaryButton type="button" $active={isCamEnabled} onClick={handleToggleCam}>
                {isCamEnabled ? <Video size={20} /> : <VideoOff size={20} />}
              </SplitPrimaryButton>
              <SplitMenuButton
                type="button"
                aria-label="Select camera"
                onClick={() => setOpenMenu((current) => (current === "camera" ? null : "camera"))}
                $active={openMenu === "camera"}
                disabled={!cameraDevices.length}
              >
                <ChevronDown size={15} />
              </SplitMenuButton>
            </SplitControl>
            {openMenu === "camera" ? (
              <DevicePopover
                title="Camera"
                options={cameraDevices}
                selectedValue={selectedCameraId}
                onSelect={handleSwitchCamera}
                align="start"
              />
            ) : null}
          </ControlGroup>

          <ControlGroup>
            <SplitControl $active={isMicEnabled || openMenu === "device"}>
              <SplitPrimaryButton type="button" $active={isMicEnabled} onClick={handleToggleMic}>
                {isMicEnabled ? <Mic size={20} /> : <MicOff size={20} />}
              </SplitPrimaryButton>
              <SplitMenuButton
                type="button"
                aria-label={isMobileViewport ? "Select speaker" : "Select microphone"}
                onClick={() => setOpenMenu((current) => (current === "device" ? null : "device"))}
                $active={openMenu === "device"}
                disabled={!(isMobileViewport ? speakerOptions.length : audioInputDevices.length)}
              >
                <ChevronDown size={15} />
              </SplitMenuButton>
            </SplitControl>
            {openMenu === "device" ? (
              <DevicePopover
                title={isMobileViewport ? "Speaker" : "Microphone"}
                options={isMobileViewport ? speakerOptions : audioInputDevices}
                selectedValue={isMobileViewport ? audioRoute : selectedAudioInputId}
                onSelect={isMobileViewport ? handleSwitchSpeaker : handleSwitchMic}
                align="start"
              />
            ) : null}
          </ControlGroup>

          {!isMobileViewport ? (
            <ControlGroup>
              <ControlButton
                type="button"
                $active={isScreenShareEnabled}
                onClick={handleToggleScreenShare}
              >
                <MonitorUp size={20} />
              </ControlButton>
            </ControlGroup>
          ) : null}

          <ControlGroup>
            <ControlButton type="button" $danger onClick={onLeave}>
              <PhoneOff size={22} />
            </ControlButton>
          </ControlGroup>
        </ControlDock>
      </ControlDockWrap>

      <RoomAudioRenderer />
    </Shell>
  );
}

const PrivateVideoCall = ({ isOpen, onClose, roomId, remoteUser }) => {
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
          <FallbackAvatar>
            <X size={34} />
          </FallbackAvatar>
          <FallbackTitle>{t("privateCall.titleFallback")}</FallbackTitle>
          <FallbackDescription>{liveKitError}</FallbackDescription>
          <StateAction type="button" onClick={handleLeave}>
            <PhoneOff size={24} />
          </StateAction>
        </StateCard>
      </CenterState>
    );
  }

  if (!liveKitSession?.token || !liveKitSession?.url) {
    return (
      <CenterState>
        <StateCard>
          <FallbackAvatar>
            <LoadingIcon size={34} />
          </FallbackAvatar>
          <FallbackTitle>{remoteName}</FallbackTitle>
          <FallbackDescription>Private call LiveKit room tayyorlanmoqda.</FallbackDescription>
          <StateAction type="button" onClick={handleLeave}>
            <PhoneOff size={24} />
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
        audio
        video
        options={{
          adaptiveStream: true,
          dynacast: true,
          publishDefaults: {
            simulcast: true,
            videoCodec: "vp8",
          },
        }}
        connectOptions={{ autoSubscribe: true }}
        onDisconnected={handleLeave}
        onError={(error) => {
          setLiveKitError(error?.message || "Private call ulanishida xatolik");
        }}
      >
        <PrivateLiveKitContent
          remoteName={remoteName}
          localName={localName}
          isMobileViewport={isMobileViewport}
          onLeave={handleLeave}
          renderRootRef={renderRootRef}
        />
      </LiveKitRoom>
    </Overlay>
  );
};

export default PrivateVideoCall;
