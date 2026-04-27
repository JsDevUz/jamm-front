import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Camera,
  CameraOff,
  ChevronDown,
  Hand,
  Mic,
  MicOff,
  MonitorUp,
  PhoneOff,
  Sparkles,
} from "lucide-react";
import { cn } from "../../../../lib/utils";
import { MEETING_REACTION_OPTIONS } from "./meeting-events";

export type DeviceOption = {
  id: string;
  label: string;
};

type BottomMenuProps = {
  isVisible: boolean;
  isMobile: boolean;
  isLandscape?: boolean;
  isMicrophoneEnabled: boolean;
  isCameraEnabled: boolean;
  isScreenShareEnabled: boolean;
  onToggleMicrophone: () => void;
  onToggleCamera: () => void;
  onToggleScreenShare: () => void;
  onLeave: () => void;
  micDevices: DeviceOption[];
  cameraDevices: DeviceOption[];
  selectedMicId?: string;
  selectedCameraId?: string;
  onSelectMic?: (id: string) => void;
  onSelectCamera?: (id: string) => void;
  isHandRaised?: boolean;
  onToggleRaiseHand?: () => void;
  onSendReaction?: (emoji: string, label: string) => void;
};

type ControlButtonProps = {
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
};

type MenuKey = "mic" | "camera" | "reaction" | null;

function FloatingMenu({
  open,
  anchorRef,
  surfaceRef,
  align = "left",
  minWidth = 220,
  children,
}: {
  open: boolean;
  anchorRef: React.RefObject<HTMLElement | null>;
  surfaceRef: React.RefObject<HTMLDivElement | null>;
  align?: "left" | "right";
  minWidth?: number;
  children: React.ReactNode;
}) {
  const [style, setStyle] = useState<CSSProperties | null>(null);

  useEffect(() => {
    if (!open || typeof window === "undefined" || !anchorRef.current) {
      setStyle(null);
      return undefined;
    }

    const updatePosition = () => {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const viewportPadding = 8;
      const desiredWidth = Math.max(minWidth, rect.width);
      const maxWidth = Math.max(180, window.innerWidth - viewportPadding * 2);
      const width = Math.min(desiredWidth, maxWidth);
      const unclampedLeft = align === "right" ? rect.right - width : rect.left;
      const left = Math.min(
        Math.max(viewportPadding, unclampedLeft),
        window.innerWidth - width - viewportPadding,
      );

      setStyle({
        position: "fixed",
        left,
        top: Math.max(viewportPadding, rect.top - 10),
        width,
        zIndex: 10060,
        transform: "translateY(-100%)",
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [align, anchorRef, minWidth, open]);

  if (!open || !style || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={surfaceRef}
      style={style}
      className="rounded-2xl border border-[var(--meet-border-color)] bg-[var(--meet-panel-muted-bg)] p-2 text-[var(--meet-text-color)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl"
    >
      {children}
    </div>,
    document.body,
  );
}

function ControlButton({
  active = false,
  danger = false,
  onClick,
  icon,
  label,
}: ControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] border transition-all sm:h-12 sm:w-12 sm:rounded-2xl lg:h-10 lg:w-10 lg:rounded-[14px]",
        danger
          ? "border-red-400/30 bg-red-500 text-white hover:bg-red-400"
          : active
            ? "border-[#8ab4f8] bg-[var(--meet-control-active-bg)] text-[var(--meet-text-color)]"
            : "border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]",
      )}
      aria-label={label}
    >
      {icon}
    </button>
  );
}

function DeviceControl({
  anchorRef,
  label,
  enabled,
  onToggle,
  onSelect,
  options,
  selectedId,
  iconOn,
  iconOff,
  menuKey,
  openMenu,
  onMenuToggle,
}: {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  enabled: boolean;
  onToggle: () => void;
  onSelect?: (id: string) => void;
  options: DeviceOption[];
  selectedId?: string;
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
  menuKey: Exclude<MenuKey, "reaction" | null>;
  openMenu: MenuKey;
  onMenuToggle: (menu: MenuKey) => void;
}) {
  return (
    <div
      ref={anchorRef}
      className="relative inline-flex shrink-0 items-center overflow-visible rounded-[18px] border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] sm:rounded-2xl lg:rounded-[14px]"
    >
      <ControlButton
        active={enabled}
        onClick={onToggle}
        icon={enabled ? iconOn : iconOff}
        label={label}
      />
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onMenuToggle(openMenu === menuKey ? null : menuKey);
        }}
        className="inline-flex min-h-[44px] min-w-[38px] items-center justify-center rounded-r-[18px] border-l border-[var(--meet-border-color)] px-2.5 text-[var(--meet-text-color)] transition-colors hover:bg-transparent sm:min-h-[48px] sm:min-w-[42px] sm:rounded-r-2xl sm:px-3 lg:min-h-[40px] lg:min-w-[34px] lg:rounded-r-[14px] lg:px-2"
        aria-label={`${label} devices`}
        aria-expanded={openMenu === menuKey}
      >
        <ChevronDown className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
      </button>
    </div>
  );
}

export default function BottomMenu({
  isVisible,
  isMobile,
  isLandscape = false,
  isMicrophoneEnabled,
  isCameraEnabled,
  isScreenShareEnabled,
  onToggleMicrophone,
  onToggleCamera,
  onToggleScreenShare,
  onLeave,
  micDevices,
  cameraDevices,
  selectedMicId,
  selectedCameraId,
  onSelectMic,
  onSelectCamera,
  isHandRaised = false,
  onToggleRaiseHand,
  onSendReaction,
}: BottomMenuProps) {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuSurfaceRef = useRef<HTMLDivElement | null>(null);
  const micAnchorRef = useRef<HTMLDivElement | null>(null);
  const cameraAnchorRef = useRef<HTMLDivElement | null>(null);
  const reactionAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!openMenu) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target) || menuSurfaceRef.current?.contains(target)) return;
      setOpenMenu(null);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [openMenu]);

  return (
    <div
      ref={rootRef}
      className={cn(
        "absolute inset-x-0 bottom-0 z-30 px-2 transition duration-300 sm:px-6 max-w-min mx-auto",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
      style={{
        paddingBottom: `calc(max(env(safe-area-inset-bottom, 0px), ${
          isMobile ? 12 : 0
        }px) + ${isMobile ? (isLandscape ? 8 : 12) : 8}px)`,
      }}
    >
      <div className="mx-auto flex max-w-max justify-center">
        <div
          className={cn(
            "scrollbar-thin flex items-center overflow-x-auto rounded-[24px] border border-[var(--meet-border-color)] bg-[var(--meet-overlay-bg)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl sm:max-w-[calc(100vw-3rem)] sm:gap-3 sm:rounded-[28px] sm:px-5 sm:py-3 lg:gap-2 lg:rounded-[22px] lg:px-3 lg:py-2",
            isMobile
              ? isLandscape
                ? "max-w-[calc(100vw-0.75rem)] gap-1.5 px-2 py-2"
                : "max-w-[calc(100vw-1rem)] gap-2 px-2.5 py-2.5"
              : "gap-3 px-4 py-3",
          )}
        >
          <DeviceControl
            anchorRef={micAnchorRef}
            label="Mic"
            enabled={isMicrophoneEnabled}
            onToggle={onToggleMicrophone}
            onSelect={onSelectMic}
            options={micDevices}
            selectedId={selectedMicId}
            iconOn={<Mic className="h-5 w-5 lg:h-4 lg:w-4" />}
            iconOff={<MicOff className="h-5 w-5 lg:h-4 lg:w-4" />}
            menuKey="mic"
            openMenu={openMenu}
            onMenuToggle={setOpenMenu}
          />

          <DeviceControl
            anchorRef={cameraAnchorRef}
            label="Camera"
            enabled={isCameraEnabled}
            onToggle={onToggleCamera}
            onSelect={onSelectCamera}
            options={cameraDevices}
            selectedId={selectedCameraId}
            iconOn={<Camera className="h-5 w-5 lg:h-4 lg:w-4" />}
            iconOff={<CameraOff className="h-5 w-5 lg:h-4 lg:w-4" />}
            menuKey="camera"
            openMenu={openMenu}
            onMenuToggle={setOpenMenu}
          />

          {!isMobile ? (
            <ControlButton
              active={isScreenShareEnabled}
              onClick={onToggleScreenShare}
              icon={<MonitorUp className="h-5 w-5 lg:h-4 lg:w-4" />}
              label="Present now"
            />
          ) : null}

          <div className="relative shrink-0">
            <ControlButton
              active={isHandRaised}
              onClick={onToggleRaiseHand}
              icon={<Hand className="h-5 w-5 lg:h-4 lg:w-4" />}
              label="Hand"
            />
          </div>

          <div ref={reactionAnchorRef} className="relative shrink-0">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setOpenMenu(openMenu === "reaction" ? null : "reaction");
              }}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:h-12 sm:w-12 sm:rounded-2xl lg:h-10 lg:w-10 lg:rounded-[14px]"
              aria-label="React"
              aria-expanded={openMenu === "reaction"}
            >
              <Sparkles className="h-5 w-5 lg:h-4 lg:w-4" />
            </button>
          </div>

          <ControlButton
            danger
            onClick={onLeave}
            icon={<PhoneOff className="h-5 w-5 lg:h-4 lg:w-4" />}
            label="Leave call"
          />
        </div>
      </div>

      <FloatingMenu
        open={openMenu === "mic"}
        anchorRef={micAnchorRef}
        surfaceRef={menuSurfaceRef}
      >
        <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--meet-text-muted-color)]">
          Mic devices
        </div>
        {micDevices.map((option) => (
          <button
            key={option.id}
            type="button"
            className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-[var(--meet-text-color)] transition-colors hover:bg-[var(--meet-control-hover-bg)]"
            onClick={() => {
              onSelectMic?.(option.id);
              setOpenMenu(null);
            }}
          >
            <span className="truncate">{option.label}</span>
            {selectedMicId === option.id ? (
              <span className="text-xs text-[var(--meet-text-muted-color)]">Selected</span>
            ) : null}
          </button>
        ))}
      </FloatingMenu>

      <FloatingMenu
        open={openMenu === "camera"}
        anchorRef={cameraAnchorRef}
        surfaceRef={menuSurfaceRef}
      >
        <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--meet-text-muted-color)]">
          Camera devices
        </div>
        {cameraDevices.map((option) => (
          <button
            key={option.id}
            type="button"
            className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm text-[var(--meet-text-color)] transition-colors hover:bg-[var(--meet-control-hover-bg)]"
            onClick={() => {
              onSelectCamera?.(option.id);
              setOpenMenu(null);
            }}
          >
            <span className="truncate">{option.label}</span>
            {selectedCameraId === option.id ? (
              <span className="text-xs text-[var(--meet-text-muted-color)]">Selected</span>
            ) : null}
          </button>
        ))}
      </FloatingMenu>

      <FloatingMenu
        open={openMenu === "reaction"}
        anchorRef={reactionAnchorRef}
        surfaceRef={menuSurfaceRef}
        align="right"
      >
        <div className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--meet-text-muted-color)]">
          Quick reactions
        </div>
        <div className="grid grid-cols-3 gap-2">
          {MEETING_REACTION_OPTIONS.map((option) => (
            <button
              key={option.label}
              type="button"
              className="flex flex-col items-center justify-center rounded-2xl border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] px-3 py-3 text-center text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)]"
              onClick={() => {
                onSendReaction?.(option.emoji, option.label);
                setOpenMenu(null);
              }}
            >
              <span className="text-2xl leading-none">{option.emoji}</span>
              <span className="mt-1 text-[11px] font-medium text-[var(--meet-text-muted-color)]">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </FloatingMenu>
    </div>
  );
}
