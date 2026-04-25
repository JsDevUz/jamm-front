import React, { useEffect, useState } from "react";
import {
  Copy,
  Hand,
  MessageSquare,
  Minimize2,
  MonitorUp,
  Users,
  Volume1,
  Volume2,
} from "lucide-react";
import { cn } from "../../../../lib/utils";

type HeaderProps = {
  meetingName: string;
  participantCount: number;
  chatCount?: number;
  handRaisedCount?: number;
  isVisible: boolean;
  isMobile?: boolean;
  isMobileLandscape?: boolean;
  whiteboardActive?: boolean;
  isRecording?: boolean;
  speakerMode?: "speaker" | "receiver";
  onCopyLink?: () => void;
  onToggleWhiteboard?: () => void;
  onToggleParticipants?: () => void;
  onToggleChat?: () => void;
  onToggleSpeakerMode?: () => void;
  onMinimize?: () => void;
};

export default function Header({
  meetingName,
  participantCount,
  chatCount = 0,
  handRaisedCount = 0,
  isVisible,
  isMobile = false,
  isMobileLandscape = false,
  whiteboardActive = false,
  isRecording = false,
  speakerMode = "speaker",
  onCopyLink,
  onToggleWhiteboard,
  onToggleParticipants,
  onToggleChat,
  onToggleSpeakerMode,
  onMinimize,
}: HeaderProps) {
  const meetId = meetingName;
  const [currentTime, setCurrentTime] = useState(() =>
    new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date()),
  );

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(
        new Intl.DateTimeFormat([], {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    }, 30000);

    return () => window.clearInterval(intervalId);
  }, []);

  const openParticipants = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleParticipants?.();
  };

  const openChat = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleChat?.();
  };

  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-30 px-2 pt-2 transition duration-300 sm:px-6 sm:pt-4",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0",
      )}
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 rounded-[22px] border border-[var(--meet-border-color)] bg-[var(--meet-overlay-bg)] px-3 py-2.5 text-[var(--meet-text-color)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl sm:gap-4 sm:rounded-[28px] sm:px-5 sm:py-3">
        <div className="min-w-0">
          <div className="truncate text-[15px] font-medium sm:text-lg">
            {isMobileLandscape ? currentTime : meetId}
          </div>
          <div className="mt-1 flex items-center gap-2.5 text-[11px] text-[var(--meet-text-muted-color)] sm:hidden">
            <span>{isMobileLandscape ? meetId : currentTime}</span>
          </div>
          <div className="mt-1 hidden items-center gap-3 text-sm text-[var(--meet-text-muted-color)] sm:flex">
            <span>{currentTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {isRecording ? (
            <div className="hidden items-center gap-2 rounded-full bg-red-500/20 px-3 py-2 text-sm font-medium text-red-300 sm:inline-flex">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              REC
            </div>
          ) : null}
          {handRaisedCount > 0 ? (
            <button
              type="button"
              onClick={openParticipants}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/15 px-3 text-sm font-medium text-amber-100 transition hover:bg-amber-400/20 sm:h-11 sm:px-4"
              title="Ko'tarilgan qo'llar"
            >
              <Hand className="h-4 w-4" />
              <span>{handRaisedCount > 99 ? "99+" : handRaisedCount}</span>
            </button>
          ) : null}
          {onCopyLink && !isMobileLandscape ? (
            <button
              type="button"
              onClick={onCopyLink}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-auto sm:gap-2 sm:px-4"
              title="Havolani nusxalash"
            >
              <Copy className="h-4 w-4" />
              <span className="hidden text-sm lg:inline">Copy</span>
            </button>
          ) : null}
          {onToggleWhiteboard && !isMobile ? (
            <button
              type="button"
              onClick={onToggleWhiteboard}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--meet-text-color)] transition sm:h-11 sm:w-auto sm:gap-2 sm:px-4",
                whiteboardActive
                  ? "bg-[var(--meet-control-active-bg)] ring-1 ring-[#8ab4f8]"
                  : "border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] hover:bg-[var(--meet-control-hover-bg)]",
              )}
              title="Whiteboard"
            >
              <MonitorUp className="h-4 w-4" />
              <span className="hidden text-sm lg:inline">Board</span>
            </button>
          ) : null}
          {isMobile && onToggleSpeakerMode ? (
            <button
              type="button"
              onClick={onToggleSpeakerMode}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-11"
              title={speakerMode === "speaker" ? "Katta kalonka" : "Kichik kalonka"}
              aria-label={speakerMode === "speaker" ? "Katta kalonka" : "Kichik kalonka"}
            >
              {speakerMode === "speaker" ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <Volume1 className="h-4 w-4" />
              )}
            </button>
          ) : null}
          {onToggleParticipants ? (
            <button
              type="button"
              onClick={openParticipants}
              className="relative inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-auto sm:px-4"
              title="People"
            >
              <Users className="h-4 w-4" />
              {isMobile ? (
                <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#2b7fff] px-1 text-[10px] font-semibold leading-[18px] text-white shadow-[0_4px_12px_rgba(43,127,255,0.35)]">
                  {participantCount > 99 ? "99+" : participantCount}
                </span>
              ) : null}
              <span className="hidden text-sm lg:inline">{participantCount}</span>
            </button>
          ) : null}
          {onToggleChat ? (
            <button
              type="button"
              onClick={openChat}
              className="relative inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-auto sm:px-4"
              title="Chat"
            >
              <MessageSquare className="h-4 w-4" />
              {chatCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#111827] px-1 text-[10px] font-semibold leading-[18px] text-white shadow-[0_4px_12px_rgba(15,23,42,0.28)]">
                  {chatCount > 99 ? "99+" : chatCount}
                </span>
              ) : null}
              <span className="hidden text-sm sm:inline">
                {chatCount > 99 ? "99+" : chatCount}
              </span>
            </button>
          ) : null}
          {onMinimize && !isMobile ? (
            <button
              type="button"
              onClick={onMinimize}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-11"
              title="Minimize"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
