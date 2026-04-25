import React from "react";
import { Hand, Lock, Mic, MicOff, Pin, UserCheck, Users, X } from "lucide-react";
import type { Room } from "livekit-client";
import { Sheet, SheetContent } from "../../../../components/ui/sheet";
import type { TileParticipant } from "./VideoTile";

type ParticipantsPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participants: TileParticipant[];
  room: Room;
  isCreator?: boolean;
  roomIsPrivate?: boolean;
  roomPrivacyUpdating?: boolean;
  knockRequests?: Array<{ peerId: string; displayName?: string }>;
  pinnedIdentity: string | null;
  onPin: (identity: string | null) => void;
  remoteMediaLocks?: Record<string, { micLocked?: boolean; camLocked?: boolean }>;
  onForceMuteMic?: (identity: string) => void;
  onForceMuteCam?: (identity: string) => void;
  onAllowMic?: (identity: string) => void;
  onAllowCam?: (identity: string) => void;
  onSetRoomPrivacy?: (isPrivate: boolean) => void | Promise<unknown>;
  onApproveKnock?: (peerId: string) => void;
  onRejectKnock?: (peerId: string) => void;
  raisedHands?: Record<string, { senderName?: string; raised?: boolean }>;
};

export default function ParticipantsPanel({
  open,
  onOpenChange,
  participants,
  room,
  isCreator = false,
  roomIsPrivate = false,
  roomPrivacyUpdating = false,
  knockRequests = [],
  pinnedIdentity,
  onPin,
  remoteMediaLocks = {},
  onForceMuteMic,
  onForceMuteCam,
  onAllowMic,
  onAllowCam,
  onSetRoomPrivacy,
  onApproveKnock,
  onRejectKnock,
  raisedHands = {},
}: ParticipantsPanelProps) {
  const uniqueParticipants = participants
    .filter(
      (participant, index, allParticipants) =>
        participant.source === "camera" &&
        allParticipants.findIndex((item) => item.identity === participant.identity) === index,
    )
    .sort((left, right) => {
      const leftRaised = Boolean(raisedHands[left.identity]?.raised);
      const rightRaised = Boolean(raisedHands[right.identity]?.raised);
      if (leftRaised && !rightRaised) return -1;
      if (!leftRaised && rightRaised) return 1;
      if (left.isLocal && !right.isLocal) return -1;
      if (!left.isLocal && right.isLocal) return 1;
      return left.name.localeCompare(right.name);
    });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <div className="flex items-center justify-between border-b border-[var(--meet-border-color)] px-4 py-4 sm:px-5">
          <div>
            <div className="text-lg font-semibold text-[var(--meet-text-color)]">People</div>
            <div className="text-sm text-[var(--meet-text-muted-color)]">{uniqueParticipants.length} participants</div>
          </div>
          <button type="button" onClick={() => onOpenChange(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="scrollbar-thin flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          <div className="space-y-3">
            {isCreator ? (
              <div className="rounded-2xl border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] p-3">
                <div className="mb-3">
                  <div className="text-sm font-semibold text-[var(--meet-text-color)]">Meet turi</div>
                  <div className="mt-1 text-xs text-[var(--meet-text-muted-color)]">
                    {roomIsPrivate
                      ? "Yangi kiruvchilar avval ruxsat so'raydi."
                      : "Link bilan kirganlar ruxsatsiz qo'shiladi."}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={roomPrivacyUpdating}
                    onClick={() => onSetRoomPrivacy?.(true)}
                    className={[
                      "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-2 text-xs font-semibold transition",
                      roomIsPrivate
                        ? "border-[#8ab4f8] bg-[var(--meet-control-active-bg)] text-[var(--meet-text-color)]"
                        : "border-[var(--meet-border-color)] bg-[var(--meet-shell-bg)] text-[var(--meet-text-muted-color)] hover:bg-[var(--meet-control-hover-bg)]",
                      roomPrivacyUpdating ? "opacity-60" : "",
                    ].join(" ")}
                  >
                    <Lock className="h-3.5 w-3.5" />
                    Ruxsat bilan
                  </button>
                  <button
                    type="button"
                    disabled={roomPrivacyUpdating}
                    onClick={() => onSetRoomPrivacy?.(false)}
                    className={[
                      "inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border px-2 text-xs font-semibold transition",
                      !roomIsPrivate
                        ? "border-[#8ab4f8] bg-[var(--meet-control-active-bg)] text-[var(--meet-text-color)]"
                        : "border-[var(--meet-border-color)] bg-[var(--meet-shell-bg)] text-[var(--meet-text-muted-color)] hover:bg-[var(--meet-control-hover-bg)]",
                      roomPrivacyUpdating ? "opacity-60" : "",
                    ].join(" ")}
                  >
                    <Users className="h-3.5 w-3.5" />
                    Ruxsatsiz
                  </button>
                </div>
              </div>
            ) : null}

            {isCreator && roomIsPrivate ? (
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--meet-text-muted-color)]">
                  Kutayotganlar ({knockRequests.length})
                </div>
                {knockRequests.length ? (
                  knockRequests.map((request) => (
                    <div
                      key={request.peerId}
                      className="rounded-2xl border border-amber-300/50 bg-amber-100/10 p-3"
                    >
                      <div className="text-sm font-semibold text-[var(--meet-text-color)]">
                        {request.displayName || "Guest"}
                      </div>
                      <div className="mt-1 text-xs text-[var(--meet-text-muted-color)]">
                        Meetga qo'shilmoqchi
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => onApproveKnock?.(request.peerId)}
                          className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-3 text-xs font-semibold text-white hover:bg-emerald-400"
                        >
                          <UserCheck className="h-3.5 w-3.5" />
                          Qabul
                        </button>
                        <button
                          type="button"
                          onClick={() => onRejectKnock?.(request.peerId)}
                          className="inline-flex min-h-9 items-center justify-center rounded-xl border border-[var(--meet-border-color)] bg-[var(--meet-shell-bg)] px-3 text-xs font-semibold text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]"
                        >
                          Rad
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-[var(--meet-border-color)] px-4 py-3 text-sm text-[var(--meet-text-muted-color)]">
                    Hech kim kutmayapti
                  </div>
                )}
              </div>
            ) : null}

            {uniqueParticipants.map((participant) => (
              (() => {
                const mediaLock = remoteMediaLocks[participant.identity] || {};
                const micLocked = Boolean(mediaLock.micLocked);
                const camLocked = Boolean(mediaLock.camLocked);
                const handRaised = Boolean(raisedHands[participant.identity]?.raised);
                return (
                <div
                  key={participant.identity}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-[var(--meet-text-color)]">
                      {participant.name} {participant.isLocal ? <span className="text-[var(--meet-text-muted-color)]">(You)</span> : null}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-[var(--meet-text-muted-color)]">
                      {participant.isMuted ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
                      {participant.isMuted ? "Muted" : "Microphone on"}
                      {handRaised ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 font-medium text-amber-700">
                          <Hand className="h-3.5 w-3.5" />
                          Hand raised
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {participant.isLocal ? (
                      <button
                        type="button"
                        onClick={() => room.localParticipant.setMicrophoneEnabled(participant.isMuted)}
                        className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] px-3 text-sm text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]"
                      >
                        {participant.isMuted ? "Unmute" : "Mute"}
                      </button>
                    ) : null}
                    {isCreator && !participant.isLocal ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            micLocked
                              ? onAllowMic?.(participant.identity)
                              : onForceMuteMic?.(participant.identity)
                          }
                          className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] px-3 text-sm text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]"
                        >
                          {micLocked ? "Allow mic" : "Mute mic"}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            camLocked
                              ? onAllowCam?.(participant.identity)
                              : onForceMuteCam?.(participant.identity)
                          }
                          className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] px-3 text-sm text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]"
                        >
                          {camLocked ? "Allow cam" : "Stop cam"}
                        </button>
                      </>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => onPin(pinnedIdentity === participant.identity ? null : participant.identity)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]"
                    >
                      <Pin className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                );
              })()
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
