import React, { useEffect, useMemo, useRef, useState } from "react";
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
  onMinimize?: () => void;
  focusContent?: React.ReactNode;
  focusKey?: string;
  isRecording?: boolean;
  whiteboardActive?: boolean;
  isMicrophoneEnabled: boolean;
  isCameraEnabled: boolean;
  isScreenShareEnabled: boolean;
  onToggleMicrophone: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
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
  senderName: string;
};

type RaisedHandState = {
  senderName: string;
  raised: boolean;
  updatedAt: number;
};

function FloatingReactionToast({
  reaction,
  index,
  bottomOffset,
}: {
  reaction: ActiveReaction;
  index: number;
  bottomOffset: string;
}) {
  const [animated, setAnimated] = useState(false);
  const motion = useMemo(() => {
    const seed = Array.from(reaction.id).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const horizontalStart = ((seed % 7) - 3) * 10;
    const horizontalTravel = ((seed % 9) - 4) * 28 + (index % 2 === 0 ? 22 : -22);
    const lift = 320 + (seed % 6) * 48 + index * 26;
    const rotate = ((seed % 11) - 5) * 3;
    const scale = 1 + (seed % 3) * 0.08;

    return {
      horizontalStart,
      horizontalTravel,
      lift,
      rotate,
      scale,
    };
  }, [index, reaction.id]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => setAnimated(true));
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      className="absolute left-1/2 flex flex-col items-center text-center text-white"
      style={{
        bottom: bottomOffset,
        opacity: animated ? 0 : 1,
        transform: animated
          ? `translate(calc(-50% + ${motion.horizontalTravel}px), -${motion.lift}px) rotate(${motion.rotate}deg) scale(${motion.scale})`
          : `translate(calc(-50% + ${motion.horizontalStart}px), 22px) rotate(0deg) scale(0.92)`,
        transition:
          "transform 4200ms cubic-bezier(0.16, 0.78, 0.22, 1), opacity 4200ms ease-out",
        textShadow:
          "0 2px 12px rgba(15,23,42,0.52), 0 10px 28px rgba(15,23,42,0.34), 0 0 2px rgba(15,23,42,0.45)",
        WebkitTextStroke: "0.35px rgba(15,23,42,0.3)",
      }}
    >
      <span className="text-[36px] leading-none sm:text-[42px]">{reaction.emoji}</span>
      <span className="mt-1 text-[11px] font-semibold tracking-[0.01em] text-white/95 sm:text-[13px]">
        {reaction.senderName}
      </span>
    </div>
  );
}

function getParticipantName(participant: Participant) {
  return participant.name || participant.identity || "Guest";
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
  onMinimize,
  focusContent,
  focusKey,
  isRecording = false,
  whiteboardActive = false,
  isMicrophoneEnabled,
  isCameraEnabled,
  isScreenShareEnabled,
  onToggleMicrophone,
  onToggleCamera,
  onToggleScreenShare,
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
  const reactionTimeoutsRef = useRef<number[]>([]);
  const autoFullscreenWhiteboardKeyRef = useRef<string | null>(null);

  const enqueueReaction = (reaction: ActiveReaction) => {
    setActiveReactions((current) => [...current.slice(-5), reaction]);
    const timeoutId = window.setTimeout(() => {
      setActiveReactions((current) => current.filter((item) => item.id !== reaction.id));
      reactionTimeoutsRef.current = reactionTimeoutsRef.current.filter((id) => id !== timeoutId);
    }, 4200);
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
          senderName: nextReaction.senderName,
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
      senderName: payload.senderName,
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

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden bg-[var(--meet-shell-bg)] text-[var(--meet-text-color)] [padding-bottom:env(safe-area-inset-bottom)]">
      {!whiteboardFullscreen ? (
        <Header
          meetingName={meetingName}
          participantCount={participantCount}
          chatCount={chatCount}
          handRaisedCount={handRaisedCount}
          pendingKnockCount={isCreator ? knockRequests.length : 0}
          isVisible={controlsVisible}
          isMobile={isMobile}
          isMobileLandscape={isMobile && isLandscape}
          isRecording={isRecording}
          whiteboardActive={whiteboardActive}
          speakerMode={mobileSpeakerMode}
          onCopyLink={onCopyLink}
          onToggleWhiteboard={onToggleWhiteboard}
          onToggleParticipants={() => setParticipantsOpen(true)}
          onToggleChat={() => setChatOpen(true)}
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
            focusContent={focusContent}
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
            {activeReactions.map((reaction, index) => (
              <FloatingReactionToast
                key={reaction.id}
                reaction={reaction}
                index={index}
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
