import React, { useEffect, useState } from "react";
import {
  ClipboardList,
  Copy,
  Hand,
  MessageSquare,
  Minimize2,
  MonitorUp,
  Radio,
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
  compactOverlay?: boolean;
  whiteboardActive?: boolean;
  whiteboardStreamActive?: boolean;
  isRecording?: boolean;
  speakerMode?: "speaker" | "receiver";
  onCopyLink?: () => void;
  onToggleWhiteboard?: () => void;
  onToggleWhiteboardStream?: () => void;
  onToggleParticipants?: () => void;
  onToggleChat?: () => void;
  onToggleLessonControls?: () => void;
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
  compactOverlay = false,
  whiteboardActive = false,
  whiteboardStreamActive = false,
  isRecording = false,
  speakerMode = "speaker",
  onCopyLink,
  onToggleWhiteboard,
  onToggleWhiteboardStream,
  onToggleParticipants,
  onToggleChat,
  onToggleLessonControls,
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

  const openLessonControls = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleLessonControls?.();
  };
  const compactButtonClass =
    "!h-10 !min-w-10 !px-3 sm:!h-10 sm:!min-w-10 sm:!px-3 lg:!h-10 lg:!min-w-10 lg:!px-3";
  const compactIconClass = "h-4 w-4 lg:h-4 lg:w-4";
  const compactCountClass = "inline text-[13px] font-semibold leading-none lg:inline";

  return (
    <header
      className={cn(
        compactOverlay
          ? "absolute right-4 top-0 z-40 w-max max-w-[calc(100vw-48px)] px-0 pt-0 transition duration-300"
          : "absolute inset-x-0 top-0 z-30 px-2 pt-2 transition duration-300 sm:px-6 sm:pt-4 lg:px-5 lg:pt-3",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0",
      )}
      style={{
        paddingTop: compactOverlay
          ? "calc(env(safe-area-inset-top, 0px) + 10px)"
          : "calc(env(safe-area-inset-top, 0px) + 8px)",
      }}
    >
      <div
        className={cn(
          "mx-auto flex items-center justify-between border border-[var(--meet-border-color)] bg-[var(--meet-overlay-bg)] text-[var(--meet-text-color)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl",
          compactOverlay
            ? "w-max max-w-[calc(100vw-48px)] gap-2 rounded-[22px] px-2.5 py-2"
            : "max-w-[1600px] gap-3 rounded-[22px] px-3 py-2.5 sm:gap-4 sm:rounded-[28px] sm:px-5 sm:py-3 lg:gap-2.5 lg:rounded-[18px] lg:px-3 lg:py-2",
        )}
      >
        <div className={cn("min-w-0", compactOverlay ? "hidden" : "")}>
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
        <div
          className={cn(
            "flex items-center gap-1.5 sm:gap-2 lg:gap-1.5",
            compactOverlay ? "gap-1.5 sm:gap-1.5 lg:gap-1.5" : "",
          )}
        >
          {isRecording ? (
            <div
              className={cn(
                "hidden items-center gap-2 rounded-full bg-red-500/20 px-3 py-2 text-sm font-medium text-red-300 sm:inline-flex lg:px-2.5 lg:py-1.5 lg:text-xs",
                compactOverlay ? "sm:h-10 sm:px-3 sm:py-0 sm:text-[13px]" : "",
              )}
            >
              <span className={cn("h-2 w-2 rounded-full bg-red-400 lg:h-1.5 lg:w-1.5", compactOverlay ? "lg:h-2 lg:w-2" : "")} />
              REC
            </div>
          ) : null}
          {handRaisedCount > 0 ? (
            <button
              type="button"
              onClick={openParticipants}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-full border border-[#f4b942]/45 bg-[#fff2cc] px-3 text-sm font-semibold text-[#7a3b08] shadow-[0_10px_24px_rgba(180,83,9,0.14)] transition hover:bg-[#ffe7a3] sm:h-11 sm:px-4 lg:h-9 lg:px-3 lg:text-xs",
                compactOverlay ? "h-10 px-3 text-[13px] sm:h-10 sm:px-3 lg:h-10" : "",
              )}
              title="Ko'tarilgan qo'llar"
            >
              <Hand className={cn("h-4 w-4 lg:h-3.5 lg:w-3.5", compactOverlay ? compactIconClass : "")} />
              <span>{handRaisedCount > 99 ? "99+" : handRaisedCount}</span>
            </button>
          ) : null}
          {onCopyLink && !isMobileLandscape ? (
            <button
              type="button"
              onClick={onCopyLink}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-auto sm:gap-2 sm:px-4 lg:h-9 lg:gap-1.5 lg:px-3",
                compactOverlay ? "!w-auto gap-2 " + compactButtonClass : "",
              )}
              title="Havolani nusxalash"
            >
              <Copy className={cn("h-4 w-4 lg:h-3.5 lg:w-3.5", compactOverlay ? compactIconClass : "")} />
              <span className={cn("hidden text-sm lg:inline lg:text-xs", compactOverlay ? "lg:hidden" : "")}>Copy</span>
            </button>
          ) : null}
          {onToggleWhiteboard && !isMobile ? (
            <button
              type="button"
              onClick={onToggleWhiteboard}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--meet-text-color)] transition sm:h-11 sm:w-auto sm:gap-2 sm:px-4 lg:h-9 lg:gap-1.5 lg:px-3",
                compactOverlay ? "!w-auto gap-2 " + compactButtonClass : "",
                whiteboardActive
                  ? "bg-[var(--meet-control-active-bg)] ring-1 ring-[#8ab4f8]"
                  : "border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] hover:bg-[var(--meet-control-hover-bg)]",
              )}
              title="Whiteboard"
            >
              <MonitorUp className={cn("h-4 w-4 lg:h-3.5 lg:w-3.5", compactOverlay ? compactIconClass : "")} />
              <span className={cn("hidden text-sm lg:inline lg:text-xs", compactOverlay ? "lg:hidden" : "")}>Board</span>
            </button>
          ) : null}
          {onToggleWhiteboardStream && !isMobile ? (
            <button
              type="button"
              onClick={onToggleWhiteboardStream}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--meet-text-color)] transition sm:h-11 sm:w-auto sm:gap-2 sm:px-4 lg:h-9 lg:gap-1.5 lg:px-3",
                compactOverlay ? "!w-auto gap-2 " + compactButtonClass : "",
                whiteboardStreamActive
                  ? "bg-[var(--meet-control-active-bg)] ring-1 ring-[#8ab4f8]"
                  : "border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] hover:bg-[var(--meet-control-hover-bg)]",
              )}
              title="Whiteboard live stream"
            >
              <Radio className={cn("h-4 w-4 lg:h-3.5 lg:w-3.5", compactOverlay ? compactIconClass : "")} />
              <span className={cn("hidden text-sm lg:inline lg:text-xs", compactOverlay ? "lg:hidden" : "")}>Live</span>
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
                compactOverlay ? "!w-auto " + compactButtonClass : "",
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
              <Users className={cn("h-4 w-4 lg:h-3.5 lg:w-3.5", compactOverlay ? compactIconClass : "")} />
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
              <span className={compactOverlay ? compactCountClass : "hidden text-sm lg:inline lg:text-xs"}>
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
              className={cn(
                "relative inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-auto sm:px-4 lg:h-9 lg:gap-1.5 lg:px-3",
                compactOverlay ? "!w-auto " + compactButtonClass : "",
              )}
              title="Chat"
            >
              <MessageSquare className={cn("h-4 w-4 lg:h-3.5 lg:w-3.5", compactOverlay ? compactIconClass : "")} />
              {chatCount > 0 ? (
                <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#111827] px-1 text-[10px] font-semibold leading-[18px] text-white shadow-[0_4px_12px_rgba(15,23,42,0.28)]">
                  {chatCount > 99 ? "99+" : chatCount}
                </span>
              ) : null}
              <span className={compactOverlay ? compactCountClass : "hidden text-sm sm:inline lg:text-xs"}>
                {chatCount > 99 ? "99+" : chatCount}
              </span>
            </button>
          ) : null}
          {onToggleLessonControls ? (
            <button
              type="button"
              onClick={openLessonControls}
              className={cn(
                "relative inline-flex h-9 w-9 items-center justify-center gap-2 rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-auto sm:px-4 lg:h-9 lg:gap-1.5 lg:px-3",
                compactOverlay ? "!w-auto " + compactButtonClass : "",
              )}
              title="Dars boshqaruvi"
              aria-label="Dars boshqaruvini ochish"
            >
              <ClipboardList className={cn("h-4 w-4 lg:h-3.5 lg:w-3.5", compactOverlay ? compactIconClass : "")} />
              <span className={cn("hidden text-sm sm:inline lg:text-xs", compactOverlay ? "lg:hidden" : "")}>
                Dars
              </span>
            </button>
          ) : null}
          {onMinimize && !isMobile ? (
            <button
              type="button"
              onClick={onMinimize}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-11 sm:w-11 lg:h-9 lg:w-9",
                compactOverlay ? "h-10 w-10 sm:h-10 sm:w-10 lg:h-10 lg:w-10" : "",
              )}
              title="Minimize"
            >
              <Minimize2 className={cn("h-4 w-4 lg:h-3.5 lg:w-3.5", compactOverlay ? compactIconClass : "")} />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
