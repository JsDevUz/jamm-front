import React from "react";
import { Mic, MicOff, Pin, X } from "lucide-react";
import type { Room } from "livekit-client";
import { Sheet, SheetContent } from "../../../../components/ui/sheet";
import type { TileParticipant } from "./VideoTile";

type ParticipantsPanelProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participants: TileParticipant[];
  room: Room;
  pinnedIdentity: string | null;
  onPin: (identity: string | null) => void;
};

export default function ParticipantsPanel({
  open,
  onOpenChange,
  participants,
  room,
  pinnedIdentity,
  onPin,
}: ParticipantsPanelProps) {
  const uniqueParticipants = participants.filter(
    (participant, index, allParticipants) =>
      participant.source === "camera" &&
      allParticipants.findIndex((item) => item.identity === participant.identity) === index,
  );

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
            {uniqueParticipants.map((participant) => (
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
                    <button
                      type="button"
                      onClick={() => onPin(pinnedIdentity === participant.identity ? null : participant.identity)}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]"
                    >
                      <Pin className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
