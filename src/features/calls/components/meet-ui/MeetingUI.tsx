import React, { useEffect, useMemo, useState } from "react";
import { useConnectionState, useParticipants } from "@livekit/components-react";
import type { Participant, Room, TrackPublication } from "livekit-client";
import Header from "./Header";
import BottomMenu, { type DeviceOption } from "./BottomMenu";
import VideoGrid from "./VideoGrid";
import ChatPanel from "./ChatPanel";
import ParticipantsPanel from "./ParticipantsPanel";
import type { TileParticipant } from "./VideoTile";
import { useIdleTimeout } from "./useIdleTimeout";

type MeetingUIProps = {
  room: Room;
  meetingName?: string;
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
};

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
}: MeetingUIProps) {
  const participants = useParticipants({ room });
  const connectionState = useConnectionState(room);
  const { isVisible, isMobile, isLandscape } = useIdleTimeout();
  const controlsVisible = isMobile ? isVisible : true;
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [pinnedIdentity, setPinnedIdentity] = useState<string | null>(null);
  const [fullscreenTileKey, setFullscreenTileKey] = useState<string | null>(null);
  const [mobileSpeakerMode, setMobileSpeakerMode] = useState<"speaker" | "receiver">(
    "speaker",
  );
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const [reconnectSecondsLeft, setReconnectSecondsLeft] = useState(60);

  const allParticipants = useMemo(() => {
    const everyone = [
      room.localParticipant,
      ...participants.filter(
        (participant) => participant.identity !== room.localParticipant.identity,
      ),
    ];
    return everyone.flatMap(toTileParticipant);
  }, [participants, room.localParticipant]);

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

  const stagePaddingClass = isMobile
    ? isLandscape
      ? controlsVisible
        ? "px-2 pb-[74px] pt-[62px]"
        : "px-1 pb-1 pt-1"
      : controlsVisible
        ? "px-2 pb-[84px] pt-[74px]"
        : "px-1 pb-1 pt-1"
    : "px-4 pb-[104px] pt-[96px] sm:px-6";

  const hasConnectionProblem = useMemo(() => {
    const normalized = String(connectionState || "").toLowerCase();
    return !isOnline || normalized.includes("reconnect") || normalized.includes("disconnect");
  }, [connectionState, isOnline]);

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

    if (!onSelectSpeaker || speakerDevices.length === 0) return;

    const findByLabel = (patterns: RegExp[]) =>
      speakerDevices.find((device) =>
        patterns.some((pattern) => pattern.test(device.label.toLowerCase())),
      );

    const nextDevice =
      nextMode === "speaker"
        ? findByLabel([/speaker/, /kalonka/, /loud/]) || speakerDevices[0]
        : findByLabel([/receiver/, /earpiece/, /phone/, /kichik/]) ||
          speakerDevices[1] ||
          speakerDevices[0];

    if (nextDevice?.id && nextDevice.id !== selectedSpeakerId) {
      onSelectSpeaker(nextDevice.id);
    }
  };

  return (
    <div className="relative h-full min-h-screen w-full overflow-hidden bg-[var(--meet-shell-bg)] text-[var(--meet-text-color)] [padding-bottom:env(safe-area-inset-bottom)]">
      <Header
        meetingName={meetingName}
        participantCount={participants.length + 1}
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

      <main
        className={`absolute inset-0 transition-[padding] duration-300 ${stagePaddingClass}`}
        style={{
          paddingTop: isMobile
            ? controlsVisible
              ? "calc(env(safe-area-inset-top, 0px) + 12px)"
              : "max(env(safe-area-inset-top, 0px), 4px)"
            : undefined,
          paddingBottom: isMobile
            ? controlsVisible
              ? "calc(env(safe-area-inset-bottom, 0px) + 80px)"
              : "calc(env(safe-area-inset-bottom, 0px) + 4px)"
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
          />
        </div>
      </main>

      <BottomMenu
        isVisible={controlsVisible}
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
        speakerDevices={speakerDevices}
        selectedMicId={selectedMicId}
        selectedCameraId={selectedCameraId}
        selectedSpeakerId={selectedSpeakerId}
        onSelectMic={onSelectMic}
        onSelectCamera={onSelectCamera}
        onSelectSpeaker={onSelectSpeaker}
      />

      <ChatPanel room={room} open={chatOpen} onOpenChange={setChatOpen} />
      <ParticipantsPanel
        open={participantsOpen}
        onOpenChange={setParticipantsOpen}
        participants={sortedParticipants}
        room={room}
        pinnedIdentity={pinnedIdentity}
        onPin={setPinnedIdentity}
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
