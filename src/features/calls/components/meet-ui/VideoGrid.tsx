import React, { useEffect, useMemo, useRef, useState } from "react";
import { Grid2x2, Maximize2, Minimize2, Pin } from "lucide-react";
import { cn } from "../../../../lib/utils";
import VideoTile, { type TileParticipant } from "./VideoTile";

type VideoGridProps = {
  participants: TileParticipant[];
  pinnedIdentity: string | null;
  onPin: (identity: string | null) => void;
  fullscreenTileKey?: string | null;
  onFullscreenTileChange?: (tileKey: string | null) => void;
  focusContent?: React.ReactNode;
  focusKey?: string;
  isMobile?: boolean;
  isLandscape?: boolean;
  controlsVisible?: boolean;
  mobileTopOverlayInset?: string;
  mobilePipTopInset?: string;
};

type GridLayoutSpec = {
  columns: number;
  rows: number;
  rowTemplate?: string;
  tileClassName?: string;
  containerClassName?: string;
  itemStyles?: Array<React.CSSProperties | undefined>;
};

type FocusStripSpec = {
  containerStyles: React.CSSProperties;
  itemClassName: string;
};

type PipCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
type PipPosition = {
  x: number;
  y: number;
};
type FullscreenCompanionMode = "pip" | "rail";

function getTileKey(participant: TileParticipant) {
  return `${participant.identity}:${participant.source}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPipCornerStyle(corner: PipCorner): React.CSSProperties {
  const offset = 24;
  const rightOffset = 84;
  if (corner === "top-left") return { left: offset, top: offset };
  if (corner === "top-right") return { right: rightOffset, top: offset };
  if (corner === "bottom-left") return { left: offset, bottom: offset };
  return { right: rightOffset, bottom: offset };
}

function getGridColumnCount(count: number, isMobile: boolean, isLandscape: boolean) {
  if (isMobile) {
    if (count <= 1) return 1;
    if (count === 2) return isLandscape ? 2 : 1;
    if (isLandscape) return 2;
    return 2;
  }

  if (count <= 1) return 1;
  if (count <= 4) return 2;
  if (count <= 9) return 3;
  if (count <= 16) return 4;
  if (count <= 25) return 5;
  return 6;
}

function getGridLayoutSpec(count: number, isMobile: boolean, isLandscape: boolean): GridLayoutSpec {
  const columns = getGridColumnCount(count, isMobile, isLandscape);
  const rows = Math.max(1, Math.ceil(count / columns));

  if (isMobile) {
    if (count === 2 && !isLandscape) {
      return {
        columns: 1,
        rows: 2,
      };
    }

    if (count === 3 && !isLandscape) {
      return {
        columns: 2,
        rows: 2,
        rowTemplate: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
        itemStyles: [{ gridColumn: "1 / span 2" }, undefined, undefined],
      };
    }

    return {
      columns,
      rows,
      tileClassName: count === 1 ? "mx-auto w-full max-w-[min(100%,480px)]" : undefined,
      containerClassName: "mx-auto w-full max-w-[540px]",
    };
  }

  if (count === 1) {
    return {
      columns: 1,
      rows: 1,
      tileClassName: "mx-auto max-w-[min(100%,1180px)]",
      containerClassName: "mx-auto w-full max-w-[1280px]",
    };
  }

  if (count === 2) {
    return {
      columns: 2,
      rows: 1,
      containerClassName: "mx-auto w-full max-w-[1960px]",
    };
  }

  if (count === 3) {
    return {
      columns: 3,
      rows: 1,
      containerClassName: "mx-auto w-full max-w-[1960px]",
    };
  }

  if (count === 4) {
    return {
      columns: 2,
      rows: 2,
      containerClassName: "mx-auto w-full max-w-[1780px]",
    };
  }

  return {
    columns,
    rows,
    containerClassName: "mx-auto w-full max-w-[1880px]",
  };
}

function getFocusStripSpec(count: number, isMobile: boolean, isLandscape: boolean): FocusStripSpec {
  if (isMobile) {
    if (isLandscape) {
      if (count <= 1) {
        return {
          containerStyles: { gridTemplateColumns: "minmax(0, 1fr) 132px" },
          itemClassName: "h-full min-w-[126px] flex-none",
        };
      }

      if (count <= 3) {
        return {
          containerStyles: { gridTemplateColumns: "minmax(0, 1fr) 144px" },
          itemClassName: "h-full min-w-[132px] flex-none",
        };
      }

      return {
        containerStyles: { gridTemplateColumns: "minmax(0, 1fr) 152px" },
        itemClassName: "h-full min-w-[132px] flex-none",
      };
    }

    if (count <= 1) {
      return {
        containerStyles: { gridTemplateRows: "minmax(0, 1fr) 116px" },
        itemClassName: "h-full min-w-[152px] flex-none",
      };
    }

    if (count <= 3) {
      return {
        containerStyles: { gridTemplateRows: "minmax(0, 1fr) 124px" },
        itemClassName: "h-full min-w-[148px] flex-none",
      };
    }

    return {
      containerStyles: { gridTemplateRows: "minmax(0, 1fr) 132px" },
      itemClassName: "h-full min-w-[148px] flex-none",
    };
  }

  if (count <= 1) {
    return {
      containerStyles: {
        gridTemplateColumns: "minmax(0, 1fr) minmax(320px, clamp(320px, 26vw, 640px))",
      },
      itemClassName: "min-h-0 flex-1",
    };
  }

  if (count <= 3) {
    return {
      containerStyles: {
        gridTemplateColumns: "minmax(0, 1fr) minmax(320px, clamp(340px, 26vw, 640px))",
      },
      itemClassName: "min-h-0 flex-1",
    };
  }

  return {
    containerStyles: {
      gridTemplateColumns: "minmax(0, 1fr) minmax(320px, clamp(360px, 24vw, 620px))",
    },
    itemClassName: "min-h-0 flex-1",
  };
}

export default function VideoGrid({
  participants,
  pinnedIdentity,
  onPin,
  fullscreenTileKey = null,
  onFullscreenTileChange,
  focusContent,
  focusKey = "focus-content",
  isMobile = false,
  isLandscape = false,
  controlsVisible = true,
  mobileTopOverlayInset,
  mobilePipTopInset,
}: VideoGridProps) {
  const fullscreenStageRef = useRef<HTMLDivElement | null>(null);
  const pipRef = useRef<HTMLDivElement | null>(null);
  const pipDragOffsetRef = useRef<PipPosition>({ x: 0, y: 0 });
  const pipDragPositionRef = useRef<PipPosition | null>(null);
  const [pipCorner, setPipCorner] = useState<PipCorner>("bottom-right");
  const [pipDragPosition, setPipDragPosition] = useState<PipPosition | null>(null);
  const [lastSpeakingPipKey, setLastSpeakingPipKey] = useState<string | null>(null);
  const [visibleMobilePipLabelKey, setVisibleMobilePipLabelKey] = useState<string | null>(null);
  const [fullscreenCompanionMode, setFullscreenCompanionMode] =
    useState<FullscreenCompanionMode>("pip");

  const { dominantTile, stripTiles, gridTiles } = useMemo(() => {
    const screenShareTile = participants.find((participant) => participant.source === "screen") || null;
    const cameraTiles = participants.filter((participant) => participant.source === "camera");
    const fullscreenTile =
      (fullscreenTileKey &&
        participants.find((participant) => getTileKey(participant) === fullscreenTileKey)) ||
      null;

    const orderedCameraTiles = [...cameraTiles].sort((left, right) => {
      if (pinnedIdentity && left.identity === pinnedIdentity) return -1;
      if (pinnedIdentity && right.identity === pinnedIdentity) return 1;
      if (left.isSpeaking && !right.isSpeaking) return -1;
      if (!left.isSpeaking && right.isSpeaking) return 1;
      if (left.isLocal && !right.isLocal) return 1;
      if (!left.isLocal && right.isLocal) return -1;
      return left.name.localeCompare(right.name);
    });

    if (fullscreenTile) {
      return {
        dominantTile: fullscreenTile,
        stripTiles: participants
          .filter((participant) => getTileKey(participant) !== getTileKey(fullscreenTile))
          .sort((left, right) => {
            if (pinnedIdentity && left.identity === pinnedIdentity) return -1;
            if (pinnedIdentity && right.identity === pinnedIdentity) return 1;
            if (left.source === "screen" && right.source !== "screen") return -1;
            if (left.source !== "screen" && right.source === "screen") return 1;
            if (left.isSpeaking && !right.isSpeaking) return -1;
            if (!left.isSpeaking && right.isSpeaking) return 1;
            return left.name.localeCompare(right.name);
          }),
        gridTiles: [] as TileParticipant[],
      };
    }

    if (screenShareTile) {
      return {
        dominantTile: screenShareTile,
        stripTiles: orderedCameraTiles,
        gridTiles: [] as TileParticipant[],
      };
    }

    return {
      dominantTile: null,
      stripTiles: [] as TileParticipant[],
      gridTiles: orderedCameraTiles,
    };
  }, [fullscreenTileKey, participants, pinnedIdentity]);

  useEffect(() => {
    if (
      visibleMobilePipLabelKey &&
      !participants.some((participant) => getTileKey(participant) === visibleMobilePipLabelKey)
    ) {
      setVisibleMobilePipLabelKey(null);
    }
  }, [participants, visibleMobilePipLabelKey]);

  const gridLayout = useMemo(
    () => getGridLayoutSpec(gridTiles.length, isMobile, isLandscape),
    [gridTiles.length, isLandscape, isMobile],
  );
  const focusPinned = Boolean(focusContent && pinnedIdentity === focusKey);
  const focusFullscreen = Boolean(focusContent && fullscreenTileKey === focusKey);
  const defaultFocusGridLayout = useMemo(
    () => getGridLayoutSpec(gridTiles.length + (focusContent ? 1 : 0), isMobile, isLandscape),
    [focusContent, gridTiles.length, isLandscape, isMobile],
  );
  const focusAsRegularTile = Boolean(focusContent && !focusPinned && !focusFullscreen);
  const dominantStripCount = stripTiles.length + (focusAsRegularTile ? 1 : 0);
  const focusStrip = useMemo(
    () =>
      getFocusStripSpec(
        Math.max(1, participants.length + (focusAsRegularTile ? 1 : 0)),
        isMobile,
        isLandscape,
      ),
    [focusAsRegularTile, isLandscape, isMobile, participants.length],
  );
  const focusContainerStyles =
    dominantStripCount || isMobile ? focusStrip.containerStyles : { gridTemplateColumns: "minmax(0, 1fr)" };
  const pipStyle: React.CSSProperties = pipDragPosition
    ? {
        left: pipDragPosition.x,
        top: pipDragPosition.y,
      }
    : getPipCornerStyle(pipCorner);

  const localCameraTile = useMemo(
    () => participants.find((participant) => participant.isLocal && participant.source === "camera") || null,
    [participants],
  );
  const lastSpeakingCandidateKey = useMemo(() => {
    const speakingRemoteCamera = participants.find(
      (participant) =>
        participant.source === "camera" &&
        !participant.isLocal &&
        participant.isSpeaking &&
        (!fullscreenTileKey || getTileKey(participant) !== fullscreenTileKey),
    );
    return speakingRemoteCamera ? getTileKey(speakingRemoteCamera) : null;
  }, [fullscreenTileKey, participants]);

  useEffect(() => {
    if (lastSpeakingCandidateKey) {
      setLastSpeakingPipKey(lastSpeakingCandidateKey);
    }
  }, [lastSpeakingCandidateKey]);

  useEffect(() => {
    if (!fullscreenTileKey && !focusFullscreen) {
      setFullscreenCompanionMode("pip");
    }
  }, [focusFullscreen, fullscreenTileKey]);

  const mobileFullscreenPipTiles = useMemo(() => {
    if (!dominantTile) return [];
    const dominantKey = getTileKey(dominantTile);
    const tiles: TileParticipant[] = [];

    if (localCameraTile && getTileKey(localCameraTile) !== dominantKey) {
      tiles.push(localCameraTile);
    }

    const lastSpeakingTile =
      (lastSpeakingPipKey &&
        participants.find(
          (participant) =>
            getTileKey(participant) === lastSpeakingPipKey &&
            participant.source === "camera" &&
            !participant.isLocal &&
            getTileKey(participant) !== dominantKey,
        )) ||
      participants.find(
        (participant) =>
          participant.source === "camera" &&
          !participant.isLocal &&
          getTileKey(participant) !== dominantKey &&
          (!localCameraTile || getTileKey(participant) !== getTileKey(localCameraTile)),
      ) ||
      null;

    if (
      lastSpeakingTile &&
      !tiles.some((participant) => getTileKey(participant) === getTileKey(lastSpeakingTile))
    ) {
      tiles.push(lastSpeakingTile);
    }

    return tiles.slice(0, 2);
  }, [dominantTile, lastSpeakingPipKey, localCameraTile, participants]);

  const desktopFullscreenPipTiles = useMemo(() => {
    if (!dominantTile || !localCameraTile) return [];
    return getTileKey(localCameraTile) === getTileKey(dominantTile) ? [] : [localCameraTile];
  }, [dominantTile, localCameraTile]);
  const focusMobilePipTiles = useMemo(() => {
    if (!focusContent) return [];
    const tiles: TileParticipant[] = [];

    if (localCameraTile) {
      tiles.push(localCameraTile);
    }

    const lastSpeakingTile =
      (lastSpeakingPipKey &&
        participants.find(
          (participant) =>
            getTileKey(participant) === lastSpeakingPipKey &&
            participant.source === "camera" &&
            !participant.isLocal,
        )) ||
      participants.find(
        (participant) =>
          participant.source === "camera" &&
          !participant.isLocal &&
          (!localCameraTile || getTileKey(participant) !== getTileKey(localCameraTile)),
      ) ||
      null;

    if (
      lastSpeakingTile &&
      !tiles.some((participant) => getTileKey(participant) === getTileKey(lastSpeakingTile))
    ) {
      tiles.push(lastSpeakingTile);
    }

    return tiles.slice(0, 2);
  }, [focusContent, lastSpeakingPipKey, localCameraTile, participants]);
  const focusDesktopPipTiles = useMemo(
    () => (focusContent && localCameraTile ? [localCameraTile] : []),
    [focusContent, localCameraTile],
  );
  const toggleFocusPin = () => onPin(focusPinned ? null : focusKey);
  const toggleFocusFullscreen = () => {
    onFullscreenTileChange?.(focusFullscreen ? null : focusKey);
  };
  const renderFocusContentFrame = (fullscreen = false) => (
    <div
      className={cn(
        "group relative h-full min-h-0 overflow-hidden bg-[var(--meet-tile-bg)] shadow-[var(--meet-shadow-color)]",
        fullscreen ? "rounded-none" : "rounded-[1.5rem]",
      )}
    >
      {focusContent}
      <button
        type="button"
        onClick={toggleFocusPin}
        className={cn(
          "absolute left-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--meet-overlay-bg)] text-[var(--meet-text-color)] backdrop-blur-md transition hover:bg-[var(--meet-control-hover-bg)] sm:left-4 sm:top-4",
          focusPinned ? "opacity-100" : isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
        style={isMobile ? { top: mobileTopOverlayInset || "12px" } : undefined}
        aria-pressed={focusPinned}
        aria-label={focusPinned ? "Whiteboard pinini olib tashlash" : "Whiteboard pin qilish"}
        title={focusPinned ? "Whiteboard pinini olib tashlash" : "Whiteboard pin qilish"}
      >
        <Pin className={cn("h-4 w-4 transition-transform", focusPinned && "rotate-45 text-[#8ab4f8]")} />
      </button>
      {onFullscreenTileChange ? (
        <button
          type="button"
          onClick={toggleFocusFullscreen}
          className={cn(
            "absolute right-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--meet-overlay-bg)] text-[var(--meet-text-color)] backdrop-blur-md transition hover:bg-[var(--meet-control-hover-bg)] sm:right-4",
            fullscreen ? "top-3 sm:top-4" : "bottom-3 sm:bottom-4",
            focusFullscreen ? "opacity-100" : isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}
          style={fullscreen && isMobile ? { top: mobileTopOverlayInset || "12px" } : undefined}
          aria-label={focusFullscreen ? "Whiteboard fullscreen'dan chiqish" : "Whiteboard fullscreen"}
          title={focusFullscreen ? "Whiteboard fullscreen'dan chiqish" : "Whiteboard fullscreen"}
        >
          {focusFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      ) : null}
    </div>
  );

  const handlePipPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button")) return;

    const stageRect = fullscreenStageRef.current?.getBoundingClientRect();
    const pipRect = pipRef.current?.getBoundingClientRect();
    if (!stageRect || !pipRect) return;

    const nextPosition = {
      x: pipRect.left - stageRect.left,
      y: pipRect.top - stageRect.top,
    };

    pipDragOffsetRef.current = {
      x: event.clientX - pipRect.left,
      y: event.clientY - pipRect.top,
    };
    pipDragPositionRef.current = nextPosition;
    setPipDragPosition(nextPosition);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePipPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pipDragPositionRef.current) return;

    const stageRect = fullscreenStageRef.current?.getBoundingClientRect();
    const pipRect = pipRef.current?.getBoundingClientRect();
    if (!stageRect || !pipRect) return;

    const nextPosition = {
      x: clamp(
        event.clientX - stageRect.left - pipDragOffsetRef.current.x,
        8,
        Math.max(8, stageRect.width - pipRect.width - 8),
      ),
      y: clamp(
        event.clientY - stageRect.top - pipDragOffsetRef.current.y,
        8,
        Math.max(8, stageRect.height - pipRect.height - 8),
      ),
    };

    pipDragPositionRef.current = nextPosition;
    setPipDragPosition(nextPosition);
  };

  const handlePipPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const stageRect = fullscreenStageRef.current?.getBoundingClientRect();
    const pipRect = pipRef.current?.getBoundingClientRect();
    const dragPosition = pipDragPositionRef.current;
    if (!stageRect || !pipRect || !dragPosition) return;

    const pipCenterX = dragPosition.x + pipRect.width / 2;
    const pipCenterY = dragPosition.y + pipRect.height / 2;
    const horizontal = pipCenterX < stageRect.width / 2 ? "left" : "right";
    const vertical = pipCenterY < stageRect.height / 2 ? "top" : "bottom";

    setPipCorner(`${vertical}-${horizontal}` as PipCorner);
    pipDragPositionRef.current = null;
    setPipDragPosition(null);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const renderTileModeActions = (participant: TileParticipant) => (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 transition group-hover/pip:opacity-100"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-black/45 p-1 text-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => onPin(pinnedIdentity === participant.identity ? null : participant.identity)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10"
          aria-label="Ekranga qadash"
        >
          <Pin className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            setFullscreenCompanionMode((current) => (current === "rail" ? "pip" : "rail"))
          }
          className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10"
          aria-label={
            fullscreenCompanionMode === "rail" ? "PiP mode ga qaytish" : "Katakchada ko'rsatish"
          }
        >
          <Grid2x2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  const renderFloatingPipTile = (participant: TileParticipant, keySuffix: string) => (
    <div
      key={`${participant.identity}-${participant.source}-${keySuffix}`}
      className="group/pip relative h-[100px] w-[200px] max-w-[calc(100vw-1.5rem)] overflow-visible"
    >
      <div className="relative h-full overflow-hidden rounded-[1.35rem] shadow-[0_18px_46px_rgba(15,23,42,0.24)]">
        <VideoTile
          participant={participant}
          pinned={pinnedIdentity === participant.identity}
          onPin={onPin}
          fullscreen={fullscreenTileKey === getTileKey(participant)}
          onFullscreen={
            onFullscreenTileChange
              ? () => onFullscreenTileChange(getTileKey(participant))
              : undefined
          }
          compact
          tiny
        />
        {renderTileModeActions(participant)}
      </div>
    </div>
  );

  const renderRailTile = (
    participant: TileParticipant,
    className: string,
    keySuffix: string,
  ) => (
    <div
      key={`${participant.identity}-${participant.source}-${keySuffix}`}
      className={cn("group/pip relative overflow-visible", className)}
    >
      <div className="relative h-full min-h-0 overflow-hidden rounded-[1.35rem]">
        <VideoTile
          participant={participant}
          pinned={pinnedIdentity === participant.identity}
          onPin={onPin}
          fullscreen={fullscreenTileKey === getTileKey(participant)}
          onFullscreen={
            onFullscreenTileChange
              ? () =>
                  onFullscreenTileChange(
                    fullscreenTileKey === getTileKey(participant)
                      ? null
                      : getTileKey(participant),
                  )
              : undefined
          }
          compact
        />
        {renderTileModeActions(participant)}
      </div>
    </div>
  );

  if (focusContent && isMobile && focusFullscreen) {
    return (
      <div className="relative h-full min-h-0 w-full">
        {renderFocusContentFrame(true)}

        {focusMobilePipTiles.length ? (
          <div
            className="absolute right-3 z-10 flex gap-2 sm:right-4"
            style={{ top: mobilePipTopInset || "12px" }}
          >
            {focusMobilePipTiles.map((participant) => (
              <div
                key={`${participant.identity}-${participant.source}-focus-mobile-pip`}
                className="h-[4.5rem] w-[4.5rem]"
                onClick={() => setVisibleMobilePipLabelKey(getTileKey(participant))}
              >
                <VideoTile
                  participant={participant}
                  pinned={pinnedIdentity === participant.identity}
                  onPin={onPin}
                  compact
                  tiny
                  isMobile
                  hideLabel={visibleMobilePipLabelKey !== getTileKey(participant)}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (focusContent && !isMobile && focusFullscreen) {
    if (fullscreenCompanionMode === "rail") {
      return (
        <div
          className="grid h-full min-h-0 gap-4 transition-all duration-300"
          style={{
            gridTemplateColumns: "minmax(0, 1fr) minmax(320px, clamp(340px, 24vw, 560px))",
          }}
        >
          <div className="min-h-0">{renderFocusContentFrame(true)}</div>
          {participants.length ? (
            <div className="scrollbar-thin flex min-h-0 flex-col gap-3 overflow-y-auto overflow-x-hidden">
              {participants.map((participant) =>
                renderRailTile(
                  participant,
                  "aspect-video w-full flex-none min-h-0",
                  "focus-fullscreen-rail",
                ),
              )}
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div ref={fullscreenStageRef} className="relative h-full min-h-0 w-full">
        {renderFocusContentFrame(true)}

        {focusDesktopPipTiles.length ? (
          <div
            ref={pipRef}
            className={cn(
              "absolute z-10 flex max-h-[calc(100%-2.5rem)] cursor-grab touch-none select-none flex-col-reverse gap-3 transition-[left,top,right,bottom,transform] duration-200 active:cursor-grabbing",
              pipDragPosition && "transition-none",
            )}
            style={pipStyle}
            onPointerDown={handlePipPointerDown}
            onPointerMove={handlePipPointerMove}
            onPointerUp={handlePipPointerUp}
            onPointerCancel={handlePipPointerUp}
          >
            {focusDesktopPipTiles.map((participant) =>
              renderFloatingPipTile(participant, "focus-pip"),
            )}
          </div>
        ) : null}
      </div>
    );
  }

  if (focusContent && !focusPinned && !focusFullscreen && !dominantTile) {
    return (
      <div
        className={cn(
          "grid h-full min-h-0 content-stretch",
          isMobile
            ? controlsVisible
              ? "gap-2.5"
              : "gap-1.5"
            : controlsVisible
              ? "gap-4"
              : "gap-2 sm:gap-3",
          defaultFocusGridLayout.containerClassName,
        )}
        style={{
          gridTemplateColumns: `repeat(${defaultFocusGridLayout.columns}, minmax(0, 1fr))`,
          gridTemplateRows:
            defaultFocusGridLayout.rowTemplate ||
            `repeat(${defaultFocusGridLayout.rows}, minmax(0, 1fr))`,
        }}
      >
        <div
          className={cn("h-full min-h-0 w-full", defaultFocusGridLayout.tileClassName)}
          style={defaultFocusGridLayout.itemStyles?.[0]}
        >
          {renderFocusContentFrame(false)}
        </div>
        {gridTiles.map((participant, index) => (
          <div
            key={`${participant.identity}-${participant.source}`}
            className={cn("h-full min-h-0 w-full", defaultFocusGridLayout.tileClassName)}
            style={defaultFocusGridLayout.itemStyles?.[index + 1]}
          >
            <VideoTile
              participant={participant}
              pinned={pinnedIdentity === participant.identity}
              onPin={onPin}
              fullscreen={fullscreenTileKey === getTileKey(participant)}
              onFullscreen={
                onFullscreenTileChange
                  ? () =>
                      onFullscreenTileChange(
                        fullscreenTileKey === getTileKey(participant)
                          ? null
                          : getTileKey(participant),
                      )
                  : undefined
              }
              isMobile={isMobile}
              overlayTopInset={
                isMobile && index + 1 < defaultFocusGridLayout.columns
                  ? mobileTopOverlayInset
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    );
  }

  if (dominantTile && isMobile && fullscreenTileKey) {
    return (
      <div className="relative h-full min-h-0 w-full">
        <VideoTile
          participant={dominantTile}
          pinned={pinnedIdentity === dominantTile.identity}
          onPin={onPin}
          fullscreen
          onFullscreen={
            onFullscreenTileChange ? () => onFullscreenTileChange(null) : undefined
          }
          dominant
          isMobile
          overlayTopInset={mobileTopOverlayInset}
        />

        {mobileFullscreenPipTiles.length ? (
          <div
            className="absolute right-3 z-10 flex gap-2 sm:right-4"
            style={{ top: mobilePipTopInset || "12px" }}
          >
            {mobileFullscreenPipTiles.map((participant) => (
              <div
                key={`${participant.identity}-${participant.source}-mobile-pip`}
                className="h-[4.5rem] w-[4.5rem]"
                onClick={() => setVisibleMobilePipLabelKey(getTileKey(participant))}
              >
                <VideoTile
                  participant={participant}
                  pinned={pinnedIdentity === participant.identity}
                  onPin={onPin}
                  compact
                  tiny
                  isMobile
                  hideLabel={visibleMobilePipLabelKey !== getTileKey(participant)}
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (dominantTile && !isMobile && fullscreenTileKey) {
    if (fullscreenCompanionMode === "rail") {
      return (
        <div
          className="grid h-full min-h-0 gap-4 transition-all duration-300"
          style={focusContainerStyles}
        >
          <div className="min-h-0">
            <VideoTile
              participant={dominantTile}
              pinned={pinnedIdentity === dominantTile.identity}
              onPin={onPin}
              fullscreen
              onFullscreen={
                onFullscreenTileChange ? () => onFullscreenTileChange(null) : undefined
              }
              dominant
            />
          </div>
          {dominantStripCount ? (
            <div className="scrollbar-thin flex min-h-0 flex-col gap-3 overflow-y-auto overflow-x-hidden">
              {focusAsRegularTile ? (
                <div key={`${focusKey}-fullscreen-rail`} className={focusStrip.itemClassName}>
                  {renderFocusContentFrame(false)}
                </div>
              ) : null}
              {stripTiles.map((participant) =>
                renderRailTile(
                  participant,
                  "aspect-video w-full flex-none min-h-0",
                  "dominant-fullscreen-rail",
                ),
              )}
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div ref={fullscreenStageRef} className="relative h-full min-h-0 w-full">
        <VideoTile
          participant={dominantTile}
          pinned={pinnedIdentity === dominantTile.identity}
          onPin={onPin}
          fullscreen
          onFullscreen={
            onFullscreenTileChange ? () => onFullscreenTileChange(null) : undefined
          }
          dominant
        />

        {desktopFullscreenPipTiles.length ? (
          <div
            ref={pipRef}
            className={cn(
              "absolute z-10 flex max-h-[calc(100%-2.5rem)] cursor-grab touch-none select-none flex-col-reverse gap-3 transition-[left,top,right,bottom,transform] duration-200 active:cursor-grabbing",
              pipDragPosition && "transition-none",
            )}
            style={pipStyle}
            onPointerDown={handlePipPointerDown}
            onPointerMove={handlePipPointerMove}
            onPointerUp={handlePipPointerUp}
            onPointerCancel={handlePipPointerUp}
          >
            {desktopFullscreenPipTiles.map((participant) =>
              renderFloatingPipTile(participant, "desktop-pip"),
            )}
          </div>
        ) : null}
      </div>
    );
  }

  if (focusContent && focusPinned) {
    return (
      <div
        className={cn(
          "grid h-full min-h-0 transition-all duration-300",
          isMobile ? "gap-2.5" : "gap-4",
        )}
        style={{
          ...(isMobile
            ? isLandscape
              ? { gridTemplateRows: "minmax(0, 1fr)" }
              : { gridTemplateColumns: "minmax(0, 1fr)" }
            : { gridTemplateRows: "minmax(0, 1fr)" }),
          ...focusContainerStyles,
        }}
        >
        <div className="min-h-0">{renderFocusContentFrame(false)}</div>
        {participants.length ? (
          <div
            className={cn(
              "scrollbar-thin flex min-h-0 gap-2.5 overflow-x-auto overflow-y-hidden lg:gap-3 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden",
              isMobile && isLandscape && "flex-col overflow-y-auto overflow-x-hidden",
            )}
          >
            {participants.map((participant) => (
              <div
                key={`${focusKey}-${participant.identity}-${participant.source}`}
                className={focusStrip.itemClassName}
              >
                <VideoTile
                  participant={participant}
                  pinned={pinnedIdentity === participant.identity}
                  onPin={onPin}
                  fullscreen={fullscreenTileKey === getTileKey(participant)}
                  onFullscreen={
                    onFullscreenTileChange
                      ? () =>
                          onFullscreenTileChange(
                            fullscreenTileKey === getTileKey(participant)
                              ? null
                              : getTileKey(participant),
                          )
                      : undefined
                  }
                  isMobile={isMobile}
                  compact
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (dominantTile) {
    if (isMobile && !isLandscape) {
      return (
        <div
          className={cn(
            "scrollbar-thin h-full min-h-0 overflow-y-auto overflow-x-hidden transition-all duration-300",
            controlsVisible ? "space-y-3 pb-2" : "overflow-hidden",
          )}
        >
          <div
            className={cn(
              "mx-auto w-full max-w-[760px]",
              controlsVisible
                ? dominantStripCount
                  ? "h-[min(58vh,560px)] min-h-[280px]"
                  : "h-full min-h-[360px]"
                : "h-full min-h-0",
            )}
          >
            <VideoTile
              participant={dominantTile}
              pinned={pinnedIdentity === dominantTile.identity}
              onPin={onPin}
              fullscreen={fullscreenTileKey === getTileKey(dominantTile)}
              onFullscreen={
                onFullscreenTileChange
                  ? () =>
                      onFullscreenTileChange(
                        fullscreenTileKey === getTileKey(dominantTile)
                          ? null
                          : getTileKey(dominantTile),
                      )
                  : undefined
              }
              dominant
              isMobile
              overlayTopInset={mobileTopOverlayInset}
            />
          </div>

          {controlsVisible && dominantStripCount ? (
            <div className="mx-auto grid w-full max-w-[760px] grid-cols-2 gap-3 pb-2">
              {focusAsRegularTile ? (
                <div className="h-[clamp(150px,26vh,240px)] min-h-0">
                  {renderFocusContentFrame(false)}
                </div>
              ) : null}
              {stripTiles.map((participant) => (
                <div
                  key={`${participant.identity}-${participant.source}`}
                  className="h-[clamp(150px,26vh,240px)] min-h-0"
                >
                  <VideoTile
                    participant={participant}
                    pinned={pinnedIdentity === participant.identity}
                    onPin={onPin}
                    fullscreen={fullscreenTileKey === getTileKey(participant)}
                    onFullscreen={
                      onFullscreenTileChange
                        ? () =>
                            onFullscreenTileChange(
                              fullscreenTileKey === getTileKey(participant)
                                ? null
                                : getTileKey(participant),
                            )
                        : undefined
                    }
                    compact
                    isMobile
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      );
    }

    return (
      <div
        className={cn(
          "grid h-full min-h-0 transition-all duration-300",
          isMobile ? "gap-2.5" : "gap-4",
        )}
        style={{
          ...(isMobile
            ? isLandscape
              ? { gridTemplateRows: "minmax(0, 1fr)" }
              : { gridTemplateColumns: "minmax(0, 1fr)" }
            : { gridTemplateRows: "minmax(0, 1fr)" }),
          ...focusContainerStyles,
        }}
      >
        <div className="min-h-0">
          <VideoTile
            participant={dominantTile}
            pinned={pinnedIdentity === dominantTile.identity}
            onPin={onPin}
            fullscreen={fullscreenTileKey === getTileKey(dominantTile)}
            onFullscreen={
              onFullscreenTileChange
                ? () =>
                    onFullscreenTileChange(
                      fullscreenTileKey === getTileKey(dominantTile)
                        ? null
                        : getTileKey(dominantTile),
                    )
                : undefined
            }
            isMobile={isMobile}
            dominant
            overlayTopInset={isMobile && index < gridLayout.columns ? mobileTopOverlayInset : undefined}
          />
        </div>
        {dominantStripCount ? (
          <div
            className={cn(
              "scrollbar-thin flex min-h-0 gap-2.5 overflow-x-auto overflow-y-hidden lg:gap-3 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden",
              isMobile && isLandscape && "flex-col overflow-y-auto overflow-x-hidden",
            )}
          >
            {focusAsRegularTile ? (
              <div key={`${focusKey}-dominant-strip`} className={focusStrip.itemClassName}>
                {renderFocusContentFrame(false)}
              </div>
            ) : null}
            {stripTiles.map((participant) => (
              <div
                key={`${participant.identity}-${participant.source}`}
                className={focusStrip.itemClassName}
              >
                <VideoTile
                  participant={participant}
                  pinned={pinnedIdentity === participant.identity}
                  onPin={onPin}
                  fullscreen={fullscreenTileKey === getTileKey(participant)}
                  onFullscreen={
                    onFullscreenTileChange
                      ? () =>
                          onFullscreenTileChange(
                            fullscreenTileKey === getTileKey(participant)
                              ? null
                              : getTileKey(participant),
                          )
                      : undefined
                  }
                  isMobile={isMobile}
                  compact
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
      <div
        className={cn(
          "grid h-full min-h-0 content-stretch",
          isMobile
            ? controlsVisible
              ? "gap-2.5"
              : "gap-1.5"
          : controlsVisible
            ? "gap-4"
            : "gap-2 sm:gap-3",
          gridLayout.containerClassName,
        )}
      style={{
        gridTemplateColumns: `repeat(${gridLayout.columns}, minmax(0, 1fr))`,
        gridTemplateRows:
          gridLayout.rowTemplate || `repeat(${gridLayout.rows}, minmax(0, 1fr))`,
      }}
    >
      {gridTiles.map((participant, index) => (
        <div
          key={`${participant.identity}-${participant.source}`}
          className={cn("h-full min-h-0 w-full", gridLayout.tileClassName)}
          style={gridLayout.itemStyles?.[index]}
        >
          <VideoTile
            participant={participant}
            pinned={pinnedIdentity === participant.identity}
            onPin={onPin}
            fullscreen={fullscreenTileKey === getTileKey(participant)}
            onFullscreen={
              onFullscreenTileChange
                ? () =>
                    onFullscreenTileChange(
                      fullscreenTileKey === getTileKey(participant)
                        ? null
                        : getTileKey(participant),
                    )
                : undefined
            }
            isMobile={isMobile}
            overlayTopInset={mobileTopOverlayInset}
          />
        </div>
      ))}
    </div>
  );
}
