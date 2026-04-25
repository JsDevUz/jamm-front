import React from "react";
import {
  Camera,
  CameraOff,
  ChevronDown,
  Mic,
  MicOff,
  MoreVertical,
  MonitorUp,
  PhoneOff,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../../../components/ui/dropdown-menu";
import { cn } from "../../../../lib/utils";

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
  speakerDevices?: DeviceOption[];
  selectedMicId?: string;
  selectedCameraId?: string;
  selectedSpeakerId?: string;
  onSelectMic?: (id: string) => void;
  onSelectCamera?: (id: string) => void;
  onSelectSpeaker?: (id: string) => void;
};

type ControlButtonProps = {
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  hideLabel?: boolean;
};

function ControlButton({
  active = false,
  danger = false,
  onClick,
  icon,
  label,
  hideLabel = false,
}: ControlButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-[18px] border px-3 py-2.5 text-sm font-medium transition-all sm:min-h-[48px] sm:rounded-2xl sm:px-4 sm:py-3",
        danger
          ? "border-red-400/30 bg-red-500 text-white hover:bg-red-400"
          : active
            ? "border-[#8ab4f8] bg-[var(--meet-control-active-bg)] text-[var(--meet-text-color)]"
            : "border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)]",
      )}
    >
      {icon}
      {!hideLabel ? <span>{label}</span> : null}
    </button>
  );
}

function DeviceControl({
  label,
  enabled,
  onToggle,
  onSelect,
  options,
  selectedId,
  iconOn,
  iconOff,
  hideLabel,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
  onSelect?: (id: string) => void;
  options: DeviceOption[];
  selectedId?: string;
  iconOn: React.ReactNode;
  iconOff: React.ReactNode;
  hideLabel: boolean;
}) {
  return (
    <div className="inline-flex shrink-0 items-center overflow-hidden rounded-[18px] border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] sm:rounded-2xl">
      <ControlButton
        active={enabled}
        onClick={onToggle}
        icon={enabled ? iconOn : iconOff}
        label={label}
        hideLabel={hideLabel}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[38px] items-center justify-center border-l border-[var(--meet-border-color)] px-2.5 text-[var(--meet-text-color)] hover:bg-[var(--meet-control-hover-bg)] sm:min-h-[48px] sm:min-w-[42px] sm:px-3"
            aria-label={`${label} devices`}
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel>{label} devices</DropdownMenuLabel>
          {options.map((option) => (
            <DropdownMenuItem key={option.id} onSelect={() => onSelect?.(option.id)}>
              <span className="truncate">{option.label}</span>
              {selectedId === option.id ? (
                <span className="text-xs text-[var(--meet-text-muted-color)]">Selected</span>
              ) : null}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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
  speakerDevices = [],
  selectedMicId,
  selectedCameraId,
  selectedSpeakerId,
  onSelectMic,
  onSelectCamera,
  onSelectSpeaker,
}: BottomMenuProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-30 px-2 transition duration-300 sm:px-6",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
      style={{
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + ${isMobile && isLandscape ? 6 : 10}px)`,
      }}
    >
      <div className="mx-auto flex max-w-max justify-center">
        <div
          className={cn(
            "pointer-events-auto scrollbar-thin flex items-center overflow-x-auto rounded-[24px] border border-[var(--meet-border-color)] bg-[var(--meet-overlay-bg)] shadow-[var(--meet-shadow-color)] backdrop-blur-2xl sm:max-w-[calc(100vw-3rem)] sm:gap-3 sm:rounded-[28px] sm:px-5 sm:py-3",
            isMobile
              ? isLandscape
                ? "max-w-[calc(100vw-0.75rem)] gap-1.5 px-2 py-2"
                : "max-w-[calc(100vw-1rem)] gap-2 px-2.5 py-2.5"
              : "gap-3 px-4 py-3",
          )}
        >
          <DeviceControl
            label="Mic"
            enabled={isMicrophoneEnabled}
            onToggle={onToggleMicrophone}
            onSelect={onSelectMic}
            options={micDevices}
            selectedId={selectedMicId}
            iconOn={<Mic className="h-5 w-5" />}
            iconOff={<MicOff className="h-5 w-5" />}
            hideLabel={isMobile}
          />

          <DeviceControl
            label="Camera"
            enabled={isCameraEnabled}
            onToggle={onToggleCamera}
            onSelect={onSelectCamera}
            options={cameraDevices}
            selectedId={selectedCameraId}
            iconOn={<Camera className="h-5 w-5" />}
            iconOff={<CameraOff className="h-5 w-5" />}
            hideLabel={isMobile}
          />

          {!isMobile ? (
            <ControlButton
              active={isScreenShareEnabled}
              onClick={onToggleScreenShare}
              icon={<MonitorUp className="h-5 w-5" />}
              label="Present now"
            />
          ) : null}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-[18px] border border-[var(--meet-border-color)] bg-[var(--meet-control-bg)] px-3 py-2.5 text-sm font-medium text-[var(--meet-text-color)] transition hover:bg-[var(--meet-control-hover-bg)] sm:min-h-[48px] sm:rounded-2xl sm:px-4 sm:py-3"
              >
                <MoreVertical className="h-5 w-5" />
                {!isMobile ? <span>More</span> : null}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>More options</DropdownMenuLabel>
              {speakerDevices.map((option) => (
                <DropdownMenuItem key={option.id} onSelect={() => onSelectSpeaker?.(option.id)}>
                  <span className="truncate">{option.label}</span>
                  {selectedSpeakerId === option.id ? (
                    <span className="text-xs text-[var(--meet-text-muted-color)]">Selected</span>
                  ) : null}
                </DropdownMenuItem>
              ))}
              {!speakerDevices.length ? (
                <DropdownMenuItem>
                  <span className="truncate">Settings</span>
                </DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>

          <ControlButton
            danger
            onClick={onLeave}
            icon={<PhoneOff className="h-5 w-5" />}
            label="Leave call"
            hideLabel={isMobile}
          />
        </div>
      </div>
    </div>
  );
}
