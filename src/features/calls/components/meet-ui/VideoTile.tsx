import React, { useEffect, useMemo, useRef } from "react";
import { Maximize2, MicOff, Minimize2, MonitorUp, Pin } from "lucide-react";
import type { TrackPublication } from "livekit-client";
import { cn } from "../../../../lib/utils";

export type TileParticipant = {
  identity: string;
  name: string;
  isLocal: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  hasCamera: boolean;
  publication: TrackPublication | null;
  source: "camera" | "screen";
};

type VideoTileProps = {
  participant: TileParticipant;
  pinned: boolean;
  onPin: (identity: string | null) => void;
  fullscreen?: boolean;
  onFullscreen?: () => void;
  compact?: boolean;
  dominant?: boolean;
  isMobile?: boolean;
  tiny?: boolean;
};

function getAvatarTone(identity: string) {
  const palette = [
    "from-violet-500/90 to-fuchsia-500/80",
    "from-sky-500/90 to-cyan-500/80",
    "from-emerald-500/90 to-lime-500/80",
    "from-amber-500/90 to-orange-500/80",
    "from-rose-500/90 to-red-500/80",
    "from-indigo-500/90 to-blue-500/80",
  ];

  const sum = Array.from(identity).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return palette[sum % palette.length];
}

export default function VideoTile({
  participant,
  pinned,
  onPin,
  fullscreen = false,
  onFullscreen,
  compact = false,
  dominant = false,
  isMobile = false,
  tiny = false,
}: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const track = participant.publication?.track;
    const element = videoRef.current;
    if (!track || !element) return undefined;

    track.attach(element);
    return () => {
      track.detach(element);
    };
  }, [participant.publication]);

  const avatarTone = useMemo(
    () => getAvatarTone(participant.identity),
    [participant.identity],
  );

  const showVideo = Boolean(participant.publication?.track) && participant.hasCamera;
  const bottomLabelClass = tiny
    ? "text-[10px]"
    : compact
    ? "text-[13px]"
    : dominant
      ? "text-[15px]"
      : "text-[15px]";
  const muteBadgeClass = tiny ? "h-7 w-7" : compact ? "h-10 w-10" : "h-11 w-11";
  const pinButtonClass = tiny ? "h-7 w-7" : compact ? "h-8 w-8" : "h-9 w-9";
  const floatingButtonVisibility = isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100";

  return (
    <div
      className={cn(
        "group relative h-full w-full overflow-hidden rounded-[1.6rem] bg-[var(--meet-tile-bg)] shadow-[var(--meet-shadow-color)] transition duration-200 ease-out hover:scale-[1.01] hover:brightness-105 sm:rounded-[2rem]",
        "min-h-[136px] sm:min-h-[180px]",
        compact && "min-h-[112px] sm:min-h-[132px]",
        dominant && "rounded-[1.35rem] sm:rounded-[1.5rem]",
        tiny && "!min-h-0 rounded-[1.1rem] shadow-xl sm:rounded-[1.1rem]",
        participant.isSpeaking &&
          "border-emerald-400/70 ring-2 ring-emerald-400/70 shadow-[0_0_0_1px_rgba(52,168,83,0.5),0_0_40px_rgba(52,168,83,0.18)]",
      )}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted={participant.isLocal}
          playsInline
          className={cn(
            "h-full w-full bg-[var(--meet-panel-bg)]",
            participant.source === "screen" ? "object-contain" : "object-cover",
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[var(--meet-tile-bg)]">
          <div
            className={cn(
              "flex aspect-square items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg",
              tiny
                ? "w-[46%] min-w-[34px]"
                : compact
                ? "w-[34%] min-w-[72px]"
                : dominant
                  ? "w-[28%] min-w-[110px]"
                  : "w-[30%] min-w-[88px]",
              avatarTone,
            )}
          >
            <span className="text-[clamp(2rem,4vw,4rem)] font-semibold">
              {participant.name.charAt(0).toUpperCase() || "?"}
            </span>
          </div>
        </div>
      )}

      {participant.source === "screen" ? (
        <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-[var(--meet-overlay-bg)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--meet-text-color)] backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:text-xs">
          <MonitorUp className="h-4 w-4" />
          Presenting
        </div>
      ) : null}

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24"
        style={{ background: "var(--meet-dim-overlay-top)" }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "var(--meet-dim-overlay-bottom)" }}
      />

      {!tiny ? (
        <button
          type="button"
          onClick={() => onPin(pinned ? null : participant.identity)}
          className={cn(
            "absolute left-3 inline-flex items-center justify-center rounded-full bg-[var(--meet-overlay-bg)] text-[var(--meet-text-color)] backdrop-blur-md transition hover:bg-[var(--meet-control-hover-bg)] sm:left-4",
            participant.source === "screen" ? "top-14 sm:top-[4.25rem]" : "top-3 sm:top-4",
            pinButtonClass,
            pinned ? "opacity-100" : floatingButtonVisibility,
          )}
          aria-label={pinned ? "Unpin participant" : "Pin participant"}
        >
          <Pin className={cn("h-4 w-4 transition-transform", pinned && "rotate-45 text-[#8ab4f8]")} />
        </button>
      ) : null}

      {onFullscreen ? (
        <button
          type="button"
          onClick={onFullscreen}
          className={cn(
            "absolute bottom-3 right-3 inline-flex items-center justify-center rounded-full bg-[var(--meet-overlay-bg)] text-[var(--meet-text-color)] backdrop-blur-md transition hover:bg-[var(--meet-control-hover-bg)] sm:bottom-4 sm:right-4",
            tiny ? "h-7 w-7" : compact ? "h-9 w-9" : "h-11 w-11",
            fullscreen ? "opacity-100" : floatingButtonVisibility,
          )}
          aria-label={fullscreen ? "Exit full screen tile" : "Full screen tile"}
        >
          {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      ) : null}

      {participant.isMuted ? (
        <div
          className={cn(
            "absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-[var(--meet-overlay-bg)] text-[var(--meet-text-color)] backdrop-blur-md sm:right-4 sm:top-4",
            muteBadgeClass,
          )}
        >
          <MicOff className={tiny ? "h-3.5 w-3.5" : "h-4 w-4"} />
        </div>
      ) : null}

      <div
        className={cn(
          "absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4",
          tiny && "bottom-1.5 left-1.5 right-1.5 sm:bottom-1.5 sm:left-1.5 sm:right-1.5",
        )}
      >
        <div
          className={cn(
            "max-w-[82%] truncate font-medium text-[var(--meet-text-color)]",
          bottomLabelClass,
        )}
        style={{ textShadow: "var(--meet-text-shadow)" }}
      >
          {participant.name}
          {participant.isLocal ? <span className="ml-1 text-[var(--meet-text-muted-color)]">(You)</span> : null}
        </div>
      </div>
    </div>
  );
}
