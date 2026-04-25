import React, { useEffect, useMemo, useState } from "react";
import { SendHorizontal, X } from "lucide-react";
import type { Room } from "livekit-client";
import { RoomEvent } from "livekit-client";
import { Sheet, SheetContent } from "../../../../components/ui/sheet";
import { Button } from "../../../../components/ui/button";

type ChatMessage = {
  id: string;
  senderName: string;
  senderIdentity: string;
  text: string;
  sentAt: number;
};

type ChatPanelProps = {
  room: Room;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ChatPanel({ room, open, onOpenChange }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const encoder = new TextDecoder();

    const handleDataReceived = (payload: Uint8Array, participant?: { identity?: string; name?: string | undefined }) => {
      try {
        const data = JSON.parse(encoder.decode(payload)) as Omit<ChatMessage, "id" | "sentAt"> & Partial<Pick<ChatMessage, "id" | "sentAt">>;
        if (!data?.text) return;
        setMessages((current) => [
          ...current,
          {
            id: data.id || `${participant?.identity || "peer"}-${Date.now()}`,
            senderIdentity: data.senderIdentity || participant?.identity || "unknown",
            senderName: data.senderName || participant?.name || "Participant",
            text: data.text,
            sentAt: data.sentAt || Date.now(),
          },
        ]);
      } catch {
        // ignore invalid payloads
      }
    };

    room.on(RoomEvent.DataReceived, handleDataReceived);
    return () => {
      room.off(RoomEvent.DataReceived, handleDataReceived);
    };
  }, [room]);

  const sortedMessages = useMemo(
    () => [...messages].sort((left, right) => left.sentAt - right.sentAt),
    [messages],
  );

  const handleSend = async () => {
    const text = draft.trim();
    if (!text) return;

    const message: ChatMessage = {
      id: `${room.localParticipant.identity}-${Date.now()}`,
      senderIdentity: room.localParticipant.identity,
      senderName: room.localParticipant.name || room.localParticipant.identity,
      text,
      sentAt: Date.now(),
    };

    setMessages((current) => [...current, message]);
    setDraft("");

    await room.localParticipant.publishData(
      new TextEncoder().encode(JSON.stringify(message)),
      { reliable: true },
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <div className="flex items-center justify-between border-b border-[var(--meet-border-color)] px-4 py-4 sm:px-5">
          <div>
            <div className="text-lg font-semibold text-[var(--meet-text-color)]">In-call messages</div>
            <div className="text-sm text-[var(--meet-text-muted-color)]">Messages are visible to everyone in the room</div>
          </div>
          <button type="button" onClick={() => onOpenChange(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="scrollbar-thin flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
          {sortedMessages.length ? (
            sortedMessages.map((message) => (
              <div key={message.id} className="rounded-2xl border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] p-3">
                <div className="text-sm font-medium text-[var(--meet-text-color)]">{message.senderName}</div>
                <div className="mt-1 text-sm leading-6 text-[var(--meet-text-muted-color)]">{message.text}</div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] p-5 text-sm text-[var(--meet-text-muted-color)]">
              No messages yet.
            </div>
          )}
        </div>
        <div className="border-t border-[var(--meet-border-color)] px-4 py-4 sm:px-5">
          <div className="flex gap-3">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void handleSend();
                }
              }}
              placeholder="Send a message to everyone"
              className="h-12 flex-1 rounded-2xl border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] px-4 text-sm text-[var(--meet-text-color)] outline-none placeholder:text-[var(--meet-text-muted-color)] focus:border-[#8ab4f8]"
            />
            <Button variant="secondary" className="w-12 px-0" onClick={() => void handleSend()}>
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
