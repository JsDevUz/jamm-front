import React, { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useConnectionState, useParticipants } from "@livekit/components-react";
import { RoomEvent } from "livekit-client";
import type { Participant, Room, TrackPublication } from "livekit-client";
import Header from "./Header";
import BottomMenu, { type DeviceOption } from "./BottomMenu";
import VideoGrid from "./VideoGrid";
import ChatPanel from "./ChatPanel";
import ParticipantsPanel from "./ParticipantsPanel";
import type { TileParticipant } from "./VideoTile";
import { useIdleTimeout } from "./useIdleTimeout";
import {
  parseMeetingDataPayload,
  type MeetingHandPayload,
  type MeetingReactionPayload,
} from "./meeting-events";

type MeetingUIProps = {
  room: Room;
  meetingName?: string;
  isCreator?: boolean;
  onLeave: () => void;
  onCopyLink?: () => void;
  onToggleWhiteboard?: () => void;
  onToggleLessonControls?: () => void;
  onMinimize?: () => void;
  focusContent?: React.ReactNode;
  focusKey?: string;
  isRecording?: boolean;
  whiteboardActive?: boolean;
  whiteboardStreamActive?: boolean;
  isMicrophoneEnabled: boolean;
  isCameraEnabled: boolean;
  isScreenShareEnabled: boolean;
  onToggleMicrophone: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
  onToggleWhiteboardStream?: () => void;
  cameraDevices?: DeviceOption[];
  micDevices?: DeviceOption[];
  speakerDevices?: DeviceOption[];
  selectedCameraId?: string;
  selectedMicId?: string;
  selectedSpeakerId?: string;
  onSelectCamera?: (id: string) => void;
  onSelectMic?: (id: string) => void;
  onSelectSpeaker?: (id: string) => void;
  remoteMediaLocks?: Record<string, { micLocked?: boolean; camLocked?: boolean }>;
  roomIsPrivate?: boolean;
  roomPrivacyUpdating?: boolean;
  knockRequests?: Array<{ peerId: string; displayName?: string }>;
  onForceMuteMic?: (identity: string) => void;
  onForceMuteCam?: (identity: string) => void;
  onAllowMic?: (identity: string) => void;
  onAllowCam?: (identity: string) => void;
  onSetRoomPrivacy?: (isPrivate: boolean) => void | Promise<unknown>;
  onApproveKnock?: (peerId: string) => void;
  onRejectKnock?: (peerId: string) => void;
};

type ActiveReaction = {
  id: string;
  emoji: string;
  label: string;
  senderIdentity: string;
  senderName: string;
  motion: ReactionMotion;
};

type ReactionDraft = Omit<ActiveReaction, "motion">;

type ReactionMotion = {
  leftPercent: number;
  startBottom: number;
  scale: number;
};

type RaisedHandState = {
  senderName: string;
  raised: boolean;
  updatedAt: number;
};

function FloatingReactionToast({
  reaction,
  bottomOffset,
}: {
  reaction: ActiveReaction;
  bottomOffset: string;
}) {
  return (
    <div
      className="absolute flex flex-col items-center text-center"
      style={{
        left: `clamp(18px, ${reaction.motion.leftPercent}%, calc(100% - 92px))`,
        bottom: `calc(${bottomOffset} + ${reaction.motion.startBottom}px)`,
        opacity: 1,
        transform: `translateY(0) scale(${reaction.motion.scale})`,
        ["--reaction-scale" as string]: reaction.motion.scale,
        animation: "meeting-reaction-rise 5000ms linear forwards",
      } as CSSProperties}
    >
      <span
        className="text-[34px] leading-none sm:text-[38px]"
        style={{
          filter:
            "drop-shadow(0 2px 4px rgba(15,23,42,0.36)) drop-shadow(0 8px 18px rgba(15,23,42,0.28))",
        }}
      >
        {reaction.emoji}
      </span>
      <span className="mt-1 rounded-full bg-[#8ab4f8] px-3 py-0.5 text-[13px] font-bold leading-5 text-[#21314f] shadow-[0_2px_7px_rgba(15,23,42,0.28)] sm:text-[14px]">
        {reaction.senderName}
      </span>
    </div>
  );
}

function getParticipantName(participant: Participant) {
  return participant.name || participant.identity || "Guest";
}

function getReactionMotion(id: string, sequence: number): ReactionMotion {
  const seed = Array.from(id).reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return {
    leftPercent: 4 + ((seed + sequence * 11) % 16),
    startBottom: 12 + ((seed + sequence * 17) % 84),
    scale: 0.96 + (seed % 4) * 0.03,
  };
}

function getPublication(
  participant: Participant,
  sources: string[],
): TrackPublication | null {
  for (const publication of participant.trackPublications.values()) {
    if (sources.includes(String(publication.source)) && !publication.isMuted) {
      return publication;
    }
  }
  return null;
}

function toTileParticipant(participant: Participant): TileParticipant[] {
  const cameraPublication = getPublication(participant, ["camera", "webcam"]);
  const screenPublication = getPublication(participant, ["screen_share", "screen"]);

  const base = {
    identity: participant.identity,
    name: getParticipantName(participant),
    isLocal: participant.isLocal,
    isSpeaking: participant.isSpeaking,
    isMuted: !participant.isMicrophoneEnabled,
    hasCamera: participant.isCameraEnabled,
  };

  const cameraTile: TileParticipant = {
    ...base,
    publication: cameraPublication,
    source: "camera",
  };

  return screenPublication
    ? [
        {
          ...base,
          publication: screenPublication,
          source: "screen",
          hasCamera: true,
        },
        cameraTile,
      ]
    : [cameraTile];
}

export default function MeetingUI({
  room,
  meetingName = "Quick meeting",
  isCreator = false,
  onLeave,
  onCopyLink,
  onToggleWhiteboard,
  onToggleLessonControls,
  onMinimize,
  focusContent,
  focusKey,
  isRecording = false,
  whiteboardActive = false,
  whiteboardStreamActive = false,
  isMicrophoneEnabled,
  isCameraEnabled,
  isScreenShareEnabled,
  onToggleMicrophone,
  onToggleCamera,
  onToggleScreenShare,
  onToggleWhiteboardStream,
  cameraDevices = [],
  micDevices = [],
  speakerDevices = [],
  selectedCameraId,
  selectedMicId,
  selectedSpeakerId,
  onSelectCamera,
  onSelectMic,
  onSelectSpeaker,
  remoteMediaLocks = {},
  roomIsPrivate = false,
  roomPrivacyUpdating = false,
  knockRequests = [],
  onForceMuteMic,
  onForceMuteCam,
  onAllowMic,
  onAllowCam,
  onSetRoomPrivacy,
  onApproveKnock,
  onRejectKnock,
}: MeetingUIProps) {
  const participants = useParticipants({ room });
  const connectionState = useConnectionState(room);
  const { isVisible, isMobile, isLandscape } = useIdleTimeout();
  const controlsVisible = isMobile ? isVisible : true;
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [pinnedIdentity, setPinnedIdentity] = useState<string | null>(null);
  const [fullscreenTileKey, setFullscreenTileKey] = useState<string | null>(null);
  const [mobileSpeakerMode, setMobileSpeakerMode] = useState<"speaker" | "receiver">(
    "speaker",
  );
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const [reconnectSecondsLeft, setReconnectSecondsLeft] = useState(60);
  const [hasEstablishedConnection, setHasEstablishedConnection] = useState(false);
  const [activeReactions, setActiveReactions] = useState<ActiveReaction[]>([]);
  const [raisedHands, setRaisedHands] = useState<Record<string, RaisedHandState>>({});
  const reactionSequenceRef = useRef(0);
  const reactionTimeoutsRef = useRef<number[]>([]);
  const autoFullscreenWhiteboardKeyRef = useRef<string | null>(null);
  const whiteboardBrowserFullscreenRef = useRef(false);

  const enqueueReaction = (reaction: ReactionDraft) => {
    const sequence = reactionSequenceRef.current;
    reactionSequenceRef.current += 1;
    const nextReaction: ActiveReaction = {
      ...reaction,
      motion: getReactionMotion(reaction.id, sequence),
    };

    setActiveReactions((current) => [...current.slice(-5), nextReaction]);
    const timeoutId = window.setTimeout(() => {
      setActiveReactions((current) => current.filter((item) => item.id !== reaction.id));
      reactionTimeoutsRef.current = reactionTimeoutsRef.current.filter((id) => id !== timeoutId);
    }, 5200);
    reactionTimeoutsRef.current.push(timeoutId);
  };

  useEffect(() => {
    return () => {
      reactionTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
      reactionTimeoutsRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!whiteboardActive) {
      autoFullscreenWhiteboardKeyRef.current = null;
      if (fullscreenTileKey === focusKey) {
        setFullscreenTileKey(null);
      }
      return;
    }

    if (
      focusContent &&
      focusKey &&
      autoFullscreenWhiteboardKeyRef.current !== focusKey
    ) {
      autoFullscreenWhiteboardKeyRef.current = focusKey;
      setFullscreenTileKey(focusKey);
    }
  }, [focusContent, focusKey, fullscreenTileKey, whiteboardActive]);

  const allParticipants = useMemo(() => {
    const everyone = [
      room.localParticipant,
      ...participants.filter(
        (participant) => participant.identity !== room.localParticipant.identity,
      ),
    ];
    return everyone.flatMap(toTileParticipant).map((participant) => ({
      ...participant,
      isHandRaised: Boolean(raisedHands[participant.identity]?.raised),
    }));
  }, [participants, raisedHands, room.localParticipant]);

  const participantCount = useMemo(
    () =>
      new Set(
        allParticipants
          .filter((participant) => participant.source === "camera")
          .map((participant) => participant.identity),
      ).size,
    [allParticipants],
  );

  const sortedParticipants = useMemo(() => {
    const ordered = [...allParticipants];
    if (pinnedIdentity) {
      ordered.sort((left, right) => {
        if (left.identity === pinnedIdentity) return -1;
        if (right.identity === pinnedIdentity) return 1;
        return 0;
      });
      return ordered;
    }

    ordered.sort((left, right) => {
      if (left.isHandRaised && !right.isHandRaised) return -1;
      if (!left.isHandRaised && right.isHandRaised) return 1;
      if (left.isSpeaking && !right.isSpeaking) return -1;
      if (!left.isSpeaking && right.isSpeaking) return 1;
      if (left.source === "screen" && right.source !== "screen") return -1;
      if (left.source !== "screen" && right.source === "screen") return 1;
      if (left.isLocal && !right.isLocal) return 1;
      if (!left.isLocal && right.isLocal) return -1;
      return left.name.localeCompare(right.name);
    });
    return ordered;
  }, [allParticipants, pinnedIdentity]);

  const whiteboardFullscreen = Boolean(whiteboardActive && focusContent && fullscreenTileKey === focusKey);
  const bottomMenuVisible = whiteboardFullscreen && !isMobile ? true : controlsVisible;
  const stagePaddingClass = whiteboardFullscreen
    ? "p-0"
    : isMobile
        ? isLandscape
          ? controlsVisible
          ? "px-2 pb-[58px] pt-[62px]"
          : "px-1 pb-1 pt-1"
        : controlsVisible
          ? "px-2 pb-[64px] pt-[74px]"
        : "px-1 pb-1 pt-1"
      : "px-4 pb-[86px] pt-[72px] sm:px-6";
  const mobileTopOverlayInset = isMobile
    ? whiteboardFullscreen
      ? "calc(env(safe-area-inset-top, 0px) + 12px)"
      : controlsVisible
      ? "calc(env(safe-area-inset-top, 0px) + 84px)"
      : "12px"
    : undefined;
  const mobilePipTopInset = isMobile
    ? whiteboardFullscreen
      ? "calc(env(safe-area-inset-top, 0px) + 12px)"
      : controlsVisible
      ? "calc(env(safe-area-inset-top, 0px) + 96px)"
      : "12px"
    : undefined;

  const requestWhiteboardBrowserFullscreen = () => {
    const fullscreenDocument = document as Document & {
      webkitFullscreenElement?: Element | null;
    };
    const fullscreenElement = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };
    const activeFullscreenElement =
      document.fullscreenElement || fullscreenDocument.webkitFullscreenElement || null;

    if (activeFullscreenElement) return;

    const requestTask = fullscreenElement.requestFullscreen
      ? fullscreenElement.requestFullscreen({ navigationUI: "hide" })
      : fullscreenElement.webkitRequestFullscreen?.();
    whiteboardBrowserFullscreenRef.current = true;
    void Promise.resolve(requestTask).catch(() => {
      whiteboardBrowserFullscreenRef.current = false;
    });
  };

  const handleHeaderWhiteboardToggle = () => {
    if (!whiteboardActive) {
      requestWhiteboardBrowserFullscreen();
    }
    onToggleWhiteboard?.();
  };

  useEffect(() => {
    const fullscreenDocument = document as Document & {
      webkitFullscreenElement?: Element | null;
      webkitExitFullscreen?: () => Promise<void> | void;
    };
    const fullscreenElement = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };
    const getFullscreenElement = () =>
      document.fullscreenElement || fullscreenDocument.webkitFullscreenElement || null;
    const exitFullscreen = () => {
      if (!whiteboardBrowserFullscreenRef.current) return;
      if (!getFullscreenElement()) {
        whiteboardBrowserFullscreenRef.current = false;
        return;
      }
      whiteboardBrowserFullscreenRef.current = false;
      const exitTask = document.exitFullscreen
        ? document.exitFullscreen()
        : fullscreenDocument.webkitExitFullscreen?.();
      void Promise.resolve(exitTask).catch(() => {});
    };

    if (!whiteboardFullscreen) {
      exitFullscreen();
      return undefined;
    }

    if (!getFullscreenElement()) {
      requestWhiteboardBrowserFullscreen();
    }

    return exitFullscreen;
  }, [whiteboardFullscreen]);

  const hasConnectionProblem = useMemo(() => {
    const normalized = String(connectionState || "").toLowerCase();
    return (
      hasEstablishedConnection &&
      (!isOnline || normalized.includes("reconnect") || normalized.includes("disconnect"))
    );
  }, [connectionState, hasEstablishedConnection, isOnline]);
  const handRaisedCount = useMemo(
    () => Object.values(raisedHands).filter((entry) => entry.raised).length,
    [raisedHands],
  );

  useEffect(() => {
    const decoder = new TextDecoder();
    const handleDataReceived = (
      payload: Uint8Array,
      participant?: { identity?: string; name?: string | undefined },
    ) => {
      const data = parseMeetingDataPayload(decoder.decode(payload));
      if (!data) return;

      if (data.kind === "chat") {
        setChatCount((current) => current + 1);
        return;
      }

      if (data.kind === "reaction") {
        const nextReaction: MeetingReactionPayload = {
          ...data,
          senderIdentity: data.senderIdentity || participant?.identity || "unknown",
          senderName: data.senderName || participant?.name || "Participant",
        };
        enqueueReaction({
          id: nextReaction.id,
          emoji: nextReaction.emoji,
          label: nextReaction.label,
          senderIdentity: nextReaction.senderIdentity,
          senderName:
            nextReaction.senderIdentity === room.localParticipant.identity
              ? "Siz"
              : nextReaction.senderName,
        });
        return;
      }

      if (data.kind === "hand") {
        const nextHand: MeetingHandPayload = {
          ...data,
          senderIdentity: data.senderIdentity || participant?.identity || "unknown",
          senderName: data.senderName || participant?.name || "Participant",
        };
        setRaisedHands((current) => ({
          ...current,
          [nextHand.senderIdentity]: {
            senderName: nextHand.senderName,
            raised: nextHand.raised,
            updatedAt: nextHand.sentAt,
          },
        }));
      }
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);
    return () => {
      room.off(RoomEvent.DataReceived, handleDataReceived);
    };
  }, [room]);

  useEffect(() => {
    const validIdentities = new Set(allParticipants.map((participant) => participant.identity));
    setRaisedHands((current) => {
      const nextEntries = Object.entries(current).filter(([identity]) =>
        validIdentities.has(identity),
      );
      if (nextEntries.length === Object.keys(current).length) return current;
      return Object.fromEntries(nextEntries);
    });
  }, [allParticipants]);

  useEffect(() => {
    if (String(connectionState || "").toLowerCase() === "connected") {
      setHasEstablishedConnection(true);
    }
  }, [connectionState]);

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

  const reconnectTimeLabel = `${String(Math.floor(reconnectSecondsLeft / 60)).padStart(
    2,
    "0",
  )}:${String(reconnectSecondsLeft % 60).padStart(2, "0")}`;

  const handleToggleMobileSpeaker = () => {
    const nextMode = mobileSpeakerMode === "speaker" ? "receiver" : "speaker";
    setMobileSpeakerMode(nextMode);

    if (!onSelectSpeaker) return;

    const fallbackRouteId = nextMode === "speaker" ? "default" : "communications";
    const findByLabel = (patterns: RegExp[]) =>
      speakerDevices.find((device) =>
        patterns.some((pattern) => pattern.test(device.label.toLowerCase())),
      )?.id;

    const nextDeviceId =
      nextMode === "speaker"
        ? findByLabel([/speaker/, /kalonka/, /loud/, /default/, /external/]) || fallbackRouteId
        : findByLabel([/receiver/, /earpiece/, /phone/, /kichik/, /communication/]) ||
          fallbackRouteId;

    if (nextDeviceId !== selectedSpeakerId) {
      onSelectSpeaker(nextDeviceId);
    }
  };

  const handleSendReaction = async (emoji: string, label: string) => {
    const payload: MeetingReactionPayload = {
      kind: "reaction",
      id: `${room.localParticipant.identity}-reaction-${Date.now()}`,
      senderIdentity: room.localParticipant.identity,
      senderName: room.localParticipant.name || room.localParticipant.identity,
      emoji,
      label,
      sentAt: Date.now(),
    };

    enqueueReaction({
      id: payload.id,
      emoji: payload.emoji,
      label: payload.label,
      senderIdentity: payload.senderIdentity,
      senderName: "Siz",
    });

    await room.localParticipant.publishData(
      new TextEncoder().encode(JSON.stringify(payload)),
      { reliable: true },
    );
  };

  const handleToggleRaiseHand = async () => {
    const identity = room.localParticipant.identity;
    const currentRaised = Boolean(raisedHands[identity]?.raised);
    const payload: MeetingHandPayload = {
      kind: "hand",
      id: `${identity}-hand-${Date.now()}`,
      senderIdentity: identity,
      senderName: room.localParticipant.name || identity,
      raised: !currentRaised,
      sentAt: Date.now(),
    };

    setRaisedHands((current) => ({
      ...current,
      [identity]: {
        senderName: payload.senderName,
        raised: payload.raised,
        updatedAt: payload.sentAt,
      },
    }));

    await room.localParticipant.publishData(
      new TextEncoder().encode(JSON.stringify(payload)),
      { reliable: true },
    );
  };

  const reactionsBottomOffset =
    isMobile && bottomMenuVisible
      ? isLandscape
        ? "calc(env(safe-area-inset-bottom, 0px) + 112px)"
        : "calc(env(safe-area-inset-bottom, 0px) + 132px)"
      : isMobile
        ? "calc(env(safe-area-inset-bottom, 0px) + 28px)"
        : "128px";
  const focusContentWithToolbarActions = focusContent;

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[var(--meet-shell-bg)] text-[var(--meet-text-color)] [padding-bottom:env(safe-area-inset-bottom)]">
      <style>
        {`
          @keyframes meeting-reaction-rise {
            0% {
              opacity: 1;
              transform: translateY(0) scale(var(--reaction-scale, 1));
            }
            80% {
              opacity: 1;
              transform: translateY(-64vh) scale(var(--reaction-scale, 1));
            }
            100% {
              opacity: 0;
              transform: translateY(-80vh) scale(var(--reaction-scale, 1));
            }
          }
        `}
      </style>
      {!whiteboardFullscreen || !isMobile ? (
        <Header
          meetingName={meetingName}
          participantCount={participantCount}
          chatCount={chatCount}
          handRaisedCount={handRaisedCount}
          pendingKnockCount={isCreator ? knockRequests.length : 0}
          isVisible={controlsVisible}
          isMobile={isMobile}
          isMobileLandscape={isMobile && isLandscape}
          compactOverlay={whiteboardFullscreen && !isMobile}
          isRecording={isRecording}
          whiteboardActive={whiteboardActive}
          whiteboardStreamActive={whiteboardStreamActive}
          speakerMode={mobileSpeakerMode}
          onCopyLink={onCopyLink}
          onToggleWhiteboard={onToggleWhiteboard ? handleHeaderWhiteboardToggle : undefined}
          onToggleWhiteboardStream={onToggleWhiteboardStream}
          onToggleParticipants={() => setParticipantsOpen(true)}
          onToggleChat={() => setChatOpen(true)}
          onToggleLessonControls={onToggleLessonControls}
          onToggleSpeakerMode={handleToggleMobileSpeaker}
          onMinimize={onMinimize}
        />
      ) : null}

      <main
        className={`absolute inset-0 transition-[padding] duration-300 ${stagePaddingClass}`}
        style={{
          paddingTop: whiteboardFullscreen
            ? "0px"
            : isMobile
              ? controlsVisible
                ? "calc(env(safe-area-inset-top, 0px) + 12px)"
                : "max(env(safe-area-inset-top, 0px), 4px)"
              : undefined,
          paddingBottom: whiteboardFullscreen
            ? "0px"
            : isMobile
              ? controlsVisible
                ? isLandscape
                  ? "calc(max(env(safe-area-inset-bottom, 0px), 12px) + 78px)"
                  : "calc(max(env(safe-area-inset-bottom, 0px), 12px) + 92px)"
                : "calc(max(env(safe-area-inset-bottom, 0px), 12px) + 4px)"
              : undefined,
        }}
      >
        <div className="h-full min-h-0 transition-all duration-300">
          <VideoGrid
            participants={sortedParticipants}
            pinnedIdentity={pinnedIdentity}
            onPin={setPinnedIdentity}
            fullscreenTileKey={fullscreenTileKey}
            onFullscreenTileChange={setFullscreenTileKey}
            focusContent={focusContentWithToolbarActions}
            focusKey={focusKey}
            isMobile={isMobile}
            isLandscape={isLandscape}
            controlsVisible={controlsVisible}
            mobileTopOverlayInset={mobileTopOverlayInset}
            mobilePipTopInset={mobilePipTopInset}
          />
        </div>
        {activeReactions.length ? (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {activeReactions.map((reaction) => (
              <FloatingReactionToast
                key={reaction.id}
                reaction={reaction}
                bottomOffset={reactionsBottomOffset}
              />
            ))}
          </div>
        ) : null}
      </main>

      <BottomMenu
        isVisible={bottomMenuVisible}
        isMobile={isMobile}
        isLandscape={isLandscape}
        isMicrophoneEnabled={isMicrophoneEnabled}
        isCameraEnabled={isCameraEnabled}
        isScreenShareEnabled={isScreenShareEnabled}
        onToggleMicrophone={onToggleMicrophone}
        onToggleCamera={onToggleCamera}
        onToggleScreenShare={onToggleScreenShare}
        onLeave={onLeave}
        micDevices={micDevices}
        cameraDevices={cameraDevices}
        selectedMicId={selectedMicId}
        selectedCameraId={selectedCameraId}
        onSelectMic={onSelectMic}
        onSelectCamera={onSelectCamera}
        isHandRaised={Boolean(raisedHands[room.localParticipant.identity]?.raised)}
        onToggleRaiseHand={() => void handleToggleRaiseHand()}
        onSendReaction={(emoji, label) => void handleSendReaction(emoji, label)}
      />

      <ChatPanel
        room={room}
        open={chatOpen}
        onOpenChange={setChatOpen}
        onLocalMessageSent={() => setChatCount((current) => current + 1)}
      />
      <ParticipantsPanel
        open={participantsOpen}
        onOpenChange={setParticipantsOpen}
        participants={sortedParticipants}
        room={room}
        isCreator={isCreator}
        roomIsPrivate={roomIsPrivate}
        roomPrivacyUpdating={roomPrivacyUpdating}
        knockRequests={knockRequests}
        pinnedIdentity={pinnedIdentity}
        onPin={setPinnedIdentity}
        remoteMediaLocks={remoteMediaLocks}
        onForceMuteMic={onForceMuteMic}
        onForceMuteCam={onForceMuteCam}
        onAllowMic={onAllowMic}
        onAllowCam={onAllowCam}
        onSetRoomPrivacy={onSetRoomPrivacy}
        onApproveKnock={onApproveKnock}
        onRejectKnock={onRejectKnock}
        raisedHands={raisedHands}
      />

      {hasConnectionProblem ? (
        <div className="pointer-events-none absolute inset-0 z-[70] flex items-start justify-center bg-black/25 px-4 pt-[calc(env(safe-area-inset-top,0px)+86px)] backdrop-blur-[2px] sm:items-center sm:pt-0">
          <div className="pointer-events-auto w-full max-w-[360px] rounded-[1.75rem] border border-white/10 bg-[#202124]/95 p-5 text-center text-white shadow-2xl">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#3c4043]">
              <span className="h-3 w-3 animate-pulse rounded-full bg-[#fbbc04]" />
            </div>
            <div className="text-lg font-semibold">Internet qayta ulanish kutilmoqda...</div>
            <div className="mt-2 text-sm text-white/70">
              Meet ochiq turadi. Ulanish tiklanganda suhbat avtomatik davom etadi.
            </div>
            <div className="mt-4 inline-flex min-w-24 items-center justify-center rounded-full bg-white/10 px-4 py-2 text-2xl font-semibold tabular-nums">
              {reconnectTimeLabel}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
