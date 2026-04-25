import React, { useEffect, useMemo, useRef, useState } from "react";
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

function getTileKey(participant: TileParticipant) {
  return `${participant.identity}:${participant.source}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPipCornerStyle(corner: PipCorner): React.CSSProperties {
  const offset = 20;
  if (corner === "top-left") return { left: offset, top: offset };
  if (corner === "top-right") return { right: offset, top: offset };
  if (corner === "bottom-left") return { left: offset, bottom: offset };
  return { right: offset, bottom: offset };
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
}: VideoGridProps) {
  const fullscreenStageRef = useRef<HTMLDivElement | null>(null);
  const pipRef = useRef<HTMLDivElement | null>(null);
  const pipDragOffsetRef = useRef<PipPosition>({ x: 0, y: 0 });
  const pipDragPositionRef = useRef<PipPosition | null>(null);
  const [pipCorner, setPipCorner] = useState<PipCorner>("bottom-right");
  const [pipDragPosition, setPipDragPosition] = useState<PipPosition | null>(null);
  const [lastSpeakingPipKey, setLastSpeakingPipKey] = useState<string | null>(null);

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

  const gridLayout = useMemo(
    () => getGridLayoutSpec(gridTiles.length, isMobile, isLandscape),
    [gridTiles.length, isLandscape, isMobile],
  );
  const focusStrip = useMemo(
    () =>
      getFocusStripSpec(
        participants.filter((participant) => participant.source === "camera").length,
        isMobile,
        isLandscape,
      ),
    [isLandscape, isMobile, participants],
  );
  const focusContainerStyles =
    stripTiles.length || isMobile ? focusStrip.containerStyles : { gridTemplateColumns: "minmax(0, 1fr)" };
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
        />

        {mobileFullscreenPipTiles.length ? (
          <div className="absolute right-4 top-[calc(env(safe-area-inset-top,0px)+84px)] z-10 flex gap-2">
            {mobileFullscreenPipTiles.map((participant) => (
              <div
                key={`${participant.identity}-${participant.source}-mobile-pip`}
                className="h-20 w-20 overflow-hidden rounded-[1.1rem] shadow-[0_12px_30px_rgba(0,0,0,0.38)]"
              >
                <VideoTile
                  participant={participant}
                  pinned={pinnedIdentity === participant.identity}
                  onPin={onPin}
                  compact
                  tiny
                  isMobile
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (dominantTile && !isMobile && fullscreenTileKey) {
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
            {desktopFullscreenPipTiles.map((participant) => (
              <div
                key={`${participant.identity}-${participant.source}`}
                className="aspect-video w-[clamp(360px,28vw,560px)] min-w-[320px] max-w-[min(560px,calc(100vw-4rem))]"
              >
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
                />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (focusContent) {
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
        <div className="min-h-0 overflow-hidden rounded-[1.5rem] border border-[var(--meet-border-color)] bg-[var(--meet-tile-bg)] shadow-[var(--meet-shadow-color)]">
          {focusContent}
        </div>
        {participants.filter((participant) => participant.source === "camera").length ? (
          <div
            className={cn(
              "scrollbar-thin flex min-h-0 gap-2.5 overflow-x-auto overflow-y-hidden lg:gap-3 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden",
              isMobile && isLandscape && "flex-col overflow-y-auto overflow-x-hidden",
            )}
          >
            {participants
              .filter((participant) => participant.source === "camera")
              .map((participant) => (
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
                ? stripTiles.length
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
            />
          </div>

          {controlsVisible && stripTiles.length ? (
            <div className="mx-auto grid w-full max-w-[760px] grid-cols-2 gap-3 pb-2">
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
          />
        </div>
        {stripTiles.length ? (
          <div
            className={cn(
              "scrollbar-thin flex min-h-0 gap-2.5 overflow-x-auto overflow-y-hidden lg:gap-3 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden",
              isMobile && isLandscape && "flex-col overflow-y-auto overflow-x-hidden",
            )}
          >
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
          />
        </div>
      ))}
    </div>
  );
}
