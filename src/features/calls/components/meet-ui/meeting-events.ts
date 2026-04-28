export type MeetingChatPayload = {
  kind: "chat";
  id: string;
  senderIdentity: string;
  senderName: string;
  text: string;
  sentAt: number;
};

export type MeetingReactionPayload = {
  kind: "reaction";
  id: string;
  senderIdentity: string;
  senderName: string;
  emoji: string;
  label: string;
  sentAt: number;
};

export type MeetingHandPayload = {
  kind: "hand";
  id: string;
  senderIdentity: string;
  senderName: string;
  raised: boolean;
  sentAt: number;
};

export type MeetingDataPayload =
  | MeetingChatPayload
  | MeetingReactionPayload
  | MeetingHandPayload;

export type ReactionOption = {
  emoji: string;
  label: string;
};

export const MEETING_REACTION_OPTIONS: ReactionOption[] = [
  { emoji: "\u{1F496}", label: "Love" },
  { emoji: "\u{1F44D}", label: "Like" },
  { emoji: "\u{1F389}", label: "Celebrate" },
  { emoji: "\u{1F44F}", label: "Clap" },
  { emoji: "\u{1F602}", label: "Laugh" },
  { emoji: "\u{1F62E}", label: "Wow" },
  { emoji: "\u{1F622}", label: "Sad" },
  { emoji: "\u{1F914}", label: "Thinking" },
  { emoji: "\u{1F44E}", label: "Dislike" },
];

export function parseMeetingDataPayload(raw: string): MeetingDataPayload | null {
  try {
    const data = JSON.parse(raw) as Partial<MeetingDataPayload> & { text?: string };
    if (!data || typeof data !== "object") return null;

    if (data.kind === "reaction" && typeof data.emoji === "string") {
      return data as MeetingReactionPayload;
    }

    if (data.kind === "hand" && typeof data.raised === "boolean") {
      return data as MeetingHandPayload;
    }

    if (
      data.kind === "chat" ||
      (typeof data.text === "string" && data.text.trim().length > 0)
    ) {
      return {
        kind: "chat",
        id: String(data.id || ""),
        senderIdentity: String(data.senderIdentity || ""),
        senderName: String(data.senderName || ""),
        text: String(data.text || ""),
        sentAt: Number(data.sentAt || Date.now()),
      };
    }
  } catch {
    return null;
  }

  return null;
}
