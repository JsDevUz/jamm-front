import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Hand, Maximize2, MicOff, Minimize2, MonitorUp } from "lucide-react";
import { TrackEvent, type TrackPublication } from "livekit-client";
import { cn } from "../../../../lib/utils";

export type TileParticipant = {
  identity: string;
  name: string;
  isLocal: boolean;
  isSpeaking: boolean;
  isMuted: boolean;
  hasCamera: boolean;
  isHandRaised?: boolean;
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
  hideLabel?: boolean;
  overlayTopInset?: string;
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
  fullscreen = false,
  onFullscreen,
  compact = false,
  dominant = false,
  isMobile = false,
  tiny = false,
  hideLabel = false,
  overlayTopInset,
}: VideoTileProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [, setPublicationVersion] = useState(0);
  const refreshPublicationState = useCallback(() => {
    setPublicationVersion((current) => current + 1);
  }, []);

  const mediaTrack = participant.publication?.track;
  const publicationMuted = Boolean(participant.publication?.isMuted);
  const showVideo = Boolean(
    mediaTrack &&
      !publicationMuted &&
      (participant.source === "screen" || participant.hasCamera),
  );

  useEffect(() => {
    const publication = participant.publication;
    if (!publication) return undefined;

    publication.on(TrackEvent.Subscribed, refreshPublicationState);
    publication.on(TrackEvent.Unsubscribed, refreshPublicationState);
    publication.on(TrackEvent.Muted, refreshPublicationState);
    publication.on(TrackEvent.Unmuted, refreshPublicationState);
    publication.on(TrackEvent.SubscriptionStatusChanged, refreshPublicationState);

    return () => {
      publication.off(TrackEvent.Subscribed, refreshPublicationState);
      publication.off(TrackEvent.Unsubscribed, refreshPublicationState);
      publication.off(TrackEvent.Muted, refreshPublicationState);
      publication.off(TrackEvent.Unmuted, refreshPublicationState);
      publication.off(TrackEvent.SubscriptionStatusChanged, refreshPublicationState);
    };
  }, [participant.publication, refreshPublicationState]);

  useEffect(() => {
    if (!mediaTrack) return undefined;

    mediaTrack.on(TrackEvent.Restarted, refreshPublicationState);
    mediaTrack.on(TrackEvent.Ended, refreshPublicationState);
    mediaTrack.on(TrackEvent.VideoDimensionsChanged, refreshPublicationState);

    return () => {
      mediaTrack.off(TrackEvent.Restarted, refreshPublicationState);
      mediaTrack.off(TrackEvent.Ended, refreshPublicationState);
      mediaTrack.off(TrackEvent.VideoDimensionsChanged, refreshPublicationState);
    };
  }, [mediaTrack, refreshPublicationState]);

  useEffect(() => {
    const element = videoRef.current;
    if (!mediaTrack || !element || !showVideo) return undefined;

    mediaTrack.attach(element);
    return () => {
      mediaTrack.detach(element);
    };
  }, [mediaTrack, participant.identity, participant.source, showVideo]);

  const avatarTone = useMemo(
    () => getAvatarTone(participant.identity),
    [participant.identity],
  );

  const bottomLabelClass = tiny
    ? "text-[10px]"
    : compact
    ? "text-[13px]"
    : dominant
      ? "text-[15px]"
      : "text-[15px]";
  const floatingButtonVisibility = isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100";
  const topInsetStyle = overlayTopInset ? { top: overlayTopInset } : undefined;

  return (
    <div
      className={cn(
        "group relative h-full w-full overflow-hidden bg-[var(--meet-tile-bg)] transition duration-200 ease-out sm:rounded-[1.35rem]",
        tiny
          ? "rounded-[10px] shadow-[0_10px_26px_rgba(15,23,42,0.18)] sm:rounded-[10px]"
          : "rounded-[1.6rem] shadow-[var(--meet-shadow-color)] hover:scale-[1.01] hover:brightness-105",
        "min-h-[136px] sm:min-h-[132px]",
        compact && "min-h-[112px] sm:min-h-[132px]",
        dominant && "rounded-[1.35rem] sm:rounded-[1.5rem]",
        tiny && "!min-h-0 !rounded-[10px] sm:!rounded-[10px]",
        participant.isSpeaking &&
          "shadow-[0_0_0_1px_rgba(52,168,83,0.5),0_0_40px_rgba(52,168,83,0.18)]",
      )}
    >
      {participant.isSpeaking ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-40 border-2 border-emerald-400/85 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.38)]",
            tiny ? "rounded-[10px]" : dominant ? "rounded-[1.35rem] sm:rounded-[1.5rem]" : "rounded-[1.6rem]",
          )}
        />
      ) : null}

      {showVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted={participant.isLocal}
          playsInline
          className={cn(
            "h-full w-full bg-[var(--meet-tile-bg)]",
            "object-contain",
          )}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-[var(--meet-tile-bg)]",
            tiny && "bg-gradient-to-br from-white/90 via-slate-100 to-slate-200",
          )}
        >
          <div
            className={cn(
              "flex aspect-square items-center justify-center rounded-full bg-gradient-to-br text-white shadow-lg",
              tiny
                ? "w-[44%] max-h-[62%] max-w-[96px] min-w-[42px]"
                : compact
                ? "w-[28%] max-h-[100px] max-w-[112px] min-w-[72px]"
                : dominant
                  ? "w-[24%] max-h-[44%] max-w-[160px] min-w-[96px]"
                  : "w-[26%] max-h-[100px] max-w-[140px] min-w-[80px]",
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
        <div
          className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-[var(--meet-overlay-bg)] px-2.5 py-1.5 text-[11px] font-medium text-[var(--meet-text-color)] backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:text-xs"
          style={topInsetStyle}
        >
          <MonitorUp className="h-4 w-4" />
          Presenting
        </div>
      ) : null}

      {!tiny && isMobile ? (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24"
            style={{ background: "var(--meet-dim-overlay-top)" }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: "var(--meet-dim-overlay-bottom)" }}
          />
        </>
      ) : null}

      {onFullscreen && showVideo ? (
        <button
          type="button"
          onClick={onFullscreen}
          className={cn(
            "absolute bottom-3 right-3 z-50 inline-flex items-center justify-center rounded-full bg-[var(--meet-overlay-bg)] text-[var(--meet-text-color)] backdrop-blur-md transition hover:bg-[var(--meet-control-hover-bg)] sm:bottom-4 sm:right-4",
            tiny ? "h-7 w-7" : compact ? "h-9 w-9" : "h-11 w-11",
            fullscreen ? "opacity-100" : floatingButtonVisibility,
          )}
          aria-label={fullscreen ? "Exit full screen tile" : "Full screen tile"}
        >
          {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      ) : null}

      <div
        className={cn(
          "absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4",
          tiny &&
            "bottom-1 left-1 right-auto max-w-[calc(100%-3rem)] sm:bottom-1 sm:left-1 sm:right-auto",
        )}
      >
        <div className="flex max-w-full items-center gap-1.5">
          {!hideLabel ? (
            <div
              className={cn(
                "inline-flex min-w-0 max-w-full items-center gap-1.5 rounded-full bg-[var(--meet-overlay-bg)] px-2.5 py-1.5 font-medium text-[var(--meet-text-color)] backdrop-blur-md",
                "meet-participant-name-badge",
                tiny ? "px-2 py-1" : compact ? "px-2.5 py-1.5" : "px-3 py-1.5",
                bottomLabelClass,
              )}
              style={{
                textShadow: "var(--meet-text-shadow)",
                ...(tiny
                  ? {
                      background:
                        "color-mix(in srgb, var(--meet-overlay-bg) 62%, transparent)",
                    }
                  : {}),
              }}
            >
              <span className="truncate">
                {participant.name}
                {participant.isLocal && !tiny ? (
                  <span className="ml-1 text-[var(--meet-text-muted-color)]">(You)</span>
                ) : null}
              </span>
              {participant.isMuted ? (
                <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black/10 text-[var(--meet-text-color)]">
                  <MicOff className={tiny ? "h-2.5 w-2.5" : "h-3 w-3"} />
                </span>
              ) : null}
            </div>
          ) : participant.isMuted ? (
            <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--meet-overlay-bg)] text-[var(--meet-text-color)] backdrop-blur-md">
              <MicOff className="h-3 w-3" />
            </span>
          ) : null}
          {participant.isHandRaised ? (
            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-200/50 bg-amber-100/85 px-2 py-1 align-middle font-medium text-amber-900 shadow-[0_6px_18px_rgba(251,191,36,0.16)]",
                tiny ? "text-[9px]" : "text-[11px]",
              )}
            >
              <Hand className={tiny ? "h-3 w-3" : "h-3.5 w-3.5"} />
              {!tiny && !hideLabel ? "Hand raised" : null}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
