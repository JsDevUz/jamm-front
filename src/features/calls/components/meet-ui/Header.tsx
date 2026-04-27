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
  pendingKnockCount?: number;
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
  pendingKnockCount = 0,
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
  const hasPendingKnocks = pendingKnockCount > 0;
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
        "absolute inset-x-0 top-0 z-30 px-2 pt-2 transition duration-300 sm:px-6 sm:pt-4 lg:px-5 lg:pt-3",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0",
      )}
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 8px)",
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 rounded-[22px] border border-[var(--meet-border-color)] bg-[var(--meet-overlay-bg)] px-3 py-2.5 text-[var(--meet-text-color)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl sm:gap-4 sm:rounded-[28px] sm:px-5 sm:py-3 lg:gap-2.5 lg:rounded-[18px] lg:px-3 lg:py-2">
        <div className="min-w-0">
          <div className="truncate text-[15px] font-medium sm:text-lg lg:text-sm">
            {isMobileLandscape ? currentTime : meetId}
          </div>
          <div className="mt-1 flex items-center gap-2.5 text-[11px] text-[var(--meet-text-muted-color)] sm:hidden">
            <span>{isMobileLandscape ? meetId : currentTime}</span>
          </div>
          <div className="mt-1 hidden items-center gap-3 text-sm text-[var(--meet-text-muted-color)] sm:flex lg:mt-0.5 lg:text-xs">
            <span>{currentTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-1.5">
          {isRecording ? (
            <div className="hidden items-center gap-2 rounded-full bg-red-500/20 px-3 py-2 text-sm font-medium text-red-300 sm:inline-flex lg:px-2.5 lg:py-1.5 lg:text-xs">
              <span className="h-2 w-2 rounded-full bg-red-400 lg:h-1.5 lg:w-1.5" />
              REC
            </div>
          ) : null}
          {handRaisedCount > 0 ? (
            <button
              type="button"
              onClick={openParticipants}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-[#f4b942]/45 bg-[#fff2cc] px-3 text-sm font-semibold text-[#7a3b08] shadow-[0_10px_24px_rgba(180,83,9,0.14)] transition hover:bg-[#ffe7a3] sm:h-11 sm:px-4 lg:h-9 lg:px-3 lg:text-xs"
              title="Ko'tarilgan qo'llar"
            >
              <Hand className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
              <span>{handRaisedCount > 99 ? "99+" : handRaisedCount}</span>
            </button>
          ) : null}
          {onCopyLink && !isMobileLandscape ? (
            <button
              type="button"
              onClick={onCopyLink}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-auto sm:gap-2 sm:px-4 lg:h-9 lg:gap-1.5 lg:px-3"
              title="Havolani nusxalash"
            >
              <Copy className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
              <span className="hidden text-sm lg:inline lg:text-xs">Copy</span>
            </button>
          ) : null}
          {onToggleWhiteboard && !isMobile ? (
            <button
              type="button"
              onClick={onToggleWhiteboard}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--meet-text-color)] transition sm:h-11 sm:w-auto sm:gap-2 sm:px-4 lg:h-9 lg:gap-1.5 lg:px-3",
                whiteboardActive
                  ? "bg-[var(--meet-control-active-bg)] ring-1 ring-[#8ab4f8]"
                  : "border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] hover:bg-[var(--meet-control-hover-bg)]",
              )}
              title="Whiteboard"
            >
              <MonitorUp className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
              <span className="hidden text-sm lg:inline lg:text-xs">Board</span>
            </button>
          ) : null}
          {isMobile && onToggleSpeakerMode ? (
            <button
              type="button"
              onClick={onToggleSpeakerMode}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-11 lg:h-9 lg:w-9"
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
              className={cn(
                "relative inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border text-[var(--meet-text-color)] transition sm:h-11 sm:w-auto sm:px-4 lg:h-9 lg:gap-1.5 lg:px-3",
                hasPendingKnocks
                  ? "border-amber-300 bg-amber-100 text-amber-950 shadow-[0_0_0_3px_rgba(245,158,11,0.18)] hover:bg-amber-200 dark:bg-amber-400/18 dark:text-amber-100 dark:hover:bg-amber-400/24"
                  : "border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] hover:bg-[var(--meet-control-hover-bg)]",
              )}
              title={
                hasPendingKnocks
                  ? `${pendingKnockCount > 99 ? "99+" : pendingKnockCount} kishi kutyapti`
                  : "People"
              }
            >
              <Users className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
              {isMobile || hasPendingKnocks ? (
                <span
                  className={cn(
                    "absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-semibold leading-[18px] text-white",
                    hasPendingKnocks
                      ? "bg-amber-500 shadow-[0_4px_14px_rgba(245,158,11,0.42)]"
                      : "bg-[#2b7fff] shadow-[0_4px_12px_rgba(43,127,255,0.35)]",
                  )}
                >
                  {hasPendingKnocks
                    ? pendingKnockCount > 99
                      ? "99+"
                      : pendingKnockCount
                    : participantCount > 99
                      ? "99+"
                      : participantCount}
                </span>
              ) : null}
              <span className="hidden text-sm lg:inline lg:text-xs">
                {hasPendingKnocks
                  ? pendingKnockCount > 99
                    ? "99+"
                    : pendingKnockCount
                  : participantCount}
              </span>
            </button>
          ) : null}
          {onToggleChat ? (
            <button
              type="button"
              onClick={openChat}
              className="relative inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-auto sm:px-4 lg:h-9 lg:gap-1.5 lg:px-3"
              title="Chat"
            >
              <MessageSquare className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
              {chatCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#111827] px-1 text-[10px] font-semibold leading-[18px] text-white shadow-[0_4px_12px_rgba(15,23,42,0.28)]">
                  {chatCount > 99 ? "99+" : chatCount}
                </span>
              ) : null}
              <span className="hidden text-sm sm:inline lg:text-xs">
                {chatCount > 99 ? "99+" : chatCount}
              </span>
            </button>
          ) : null}
          {onMinimize && !isMobile ? (
            <button
              type="button"
              onClick={onMinimize}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-11 lg:h-9 lg:w-9"
              title="Minimize"
            >
              <Minimize2 className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
