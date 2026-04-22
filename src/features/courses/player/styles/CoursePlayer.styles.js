import styled from "styled-components";
import {
  mobileFullscreenPane,
} from "../../../../shared/styles/mobileSafeArea";

export const PlayerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--background-color);
  overflow-y: auto;

  @media (max-width: 768px) {
    ${mobileFullscreenPane};
    z-index: 9999;
    animation: slideInFromRight 0.3s ease-out;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }
`;

export const VideoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;

  @media (max-width: 768px) {
    flex: 0 0 auto;
    padding-top: env(safe-area-inset-top, 0px);
  }
`;

export const VideoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: #000;
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  overflow: hidden;

  &:fullscreen {
    aspect-ratio: auto;
  }
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;

  &::-webkit-media-controls {
    display: none !important;
    -webkit-appearance: none;
  }

  &::-webkit-media-controls-enclosure {
    display: none !important;
    -webkit-appearance: none;
  }
`;

export const YouTubeIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.42);
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: ${(props) =>
    props.$pointerEvents ? props.$pointerEvents : "auto"};
`;

export const TransparentVideoOverlay = styled(VideoOverlay)`
  background: transparent;
  pointer-events: none;
`;

export const TopBar = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const TopBarTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TopBarTitleWrap = styled.div`
  min-width: 0;
  flex: 1;
  display: grid;
  gap: 2px;
`;

export const TopBarSubtitle = styled.div`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.72);
  font-size: 11px;
  font-weight: 500;
`;

const MobileBackButtonBase = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PlayerBackButton = styled(MobileBackButtonBase)`
  color: white;
`;

export const FloatingBackButton = styled(PlayerBackButton)`
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 8px;
`;

export const CenterPlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--primary-color) 80%, transparent);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  pointer-events: ${(props) => (props.$visible ? "auto" : "none")};
  z-index: 30;
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px
    color-mix(in srgb, var(--primary-color) 50%, transparent);

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: var(--primary-color);
  }
`;

export const ControlsBar = styled.div`
  padding: 10px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: linear-gradient(180deg, rgba(7, 10, 18, 0.08), rgba(7, 10, 18, 0.9));
`;

export const ProgressContainer = styled.div`
  width: 100%;
  height: ${(props) => (props.$scrubbing ? "10px" : "8px")};
  background: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  cursor: pointer;
  position: relative;
  touch-action: none;
  user-select: none;
  transition: height 0.1s ease;
  padding: 2px 0;
  margin: -8px 0;
  box-sizing: content-box;

  &:hover {
    height: 10px;
  }

  &::before {
    content: "";
    position: absolute;
    inset: -8px 0;
  }
`;

export const ProgressSegmentDivider = styled.div`
  position: absolute;
  top: -1px;
  left: ${(props) => `${props.$left}%`};
  width: 2px;
  height: calc(100% + 2px);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  transform: translateX(-50%);
  z-index: 3;
  pointer-events: none;
`;

export const ProgressFilled = styled.div`
  height: 100%;
  background: var(--primary-color);
  border-radius: 999px;
  position: relative;
  transition: ${(props) => (props.$scrubbing ? "none" : "width 0.1s linear")};
  width: ${(props) => `${props.$width}%`};
`;

export const BufferedProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  width: ${(props) => `${props.$width}%`};
`;

export const ProgressThumb = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => `${props.$left}%`};
  width: ${(props) => (props.$active ? "18px" : "14px")};
  height: ${(props) => (props.$active ? "18px" : "14px")};
  border-radius: 999px;
  background: var(--primary-color);
  box-shadow: 0 0 ${(props) => (props.$active ? "14px" : "10px")} color-mix(in srgb, var(--primary-color) ${(props) => (props.$active ? "60%" : "40%")}, transparent);
  transform: translate(-50%, -50%) scale(${(props) => (props.$active ? 1.15 : 1)});
  pointer-events: none;
  z-index: 4;
  transition: width 0.1s ease, height 0.1s ease, transform 0.1s ease, box-shadow 0.1s ease;
`;

export const ProgressHoverTooltip = styled.div`
  position: absolute;
  bottom: 14px;
  left: ${(props) => `${props.$left}px`};
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  display: grid;
  gap: 2px;
  min-width: 0;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 20;
  letter-spacing: 0.5px;

  strong {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0;
  }

  span {
    font-size: 10px;
    color: rgba(255, 255, 255, 0.82);
    letter-spacing: 0;
  }
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
    gap: 10px;
  }
`;

export const ControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 8px;
  min-width: 0;

  @media (max-width: 768px) {
    min-width: 0;
    margin-right: 0;
    flex-wrap: wrap;
    row-gap: 6px;
  }
`;

export const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-shrink: 0;
    justify-content: flex-end;
  }
`;

export const ControlButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 17px;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;

export const CenterControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  padding: 0 24px;
`;

export const SeekControlButton = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 29px;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.54);
    transform: scale(1.04);
  }
`;

export const MainPlayButton = styled.button`
  width: 54px;
  height: 54px;
  border-radius: 37px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.44);
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.58);
    transform: scale(1.04);
  }
`;

export const SpeedMenuAnchor = styled.div`
  position: relative;
`;

export const SpeedToggleButton = styled(ControlButton)`
  width: auto;
  min-width: 34px;
  height: 34px;
  padding: 0 10px;
  gap: 6px;
  border-radius: 17px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--primary-color)" : "rgba(255, 255, 255, 0.2)"};
  color: ${(props) => (props.$accent ? "var(--primary-color)" : "white")};
`;

export const SpeedMenu = styled.div`
  position: absolute;
  bottom: 46px;
  right: 0;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  overflow: hidden;
  min-width: 220px;
  max-width: min(280px, calc(100vw - 32px));
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  z-index: 50;
`;

export const MobileSettingsSheetOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10020;
  display: flex;
  align-items: flex-end;
  justify-content: stretch;
  background: rgba(0, 0, 0, 0.52);
  backdrop-filter: blur(4px);

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileSettingsSheetPanel = styled.div`
  width: 100%;
  max-height: min(72vh, 640px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--secondary-color);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-top: 1px solid var(--border-color);
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.34);
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  animation: coursePlayerSheetIn 0.18s ease-out;

  @keyframes coursePlayerSheetIn {
    from {
      transform: translateY(24px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const MobileSettingsSheetHandle = styled.div`
  width: 42px;
  height: 5px;
  border-radius: 999px;
  background: var(--border-color);
  margin: 10px auto 8px;
  flex-shrink: 0;
`;

export const MobileSettingsSheetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 18px 12px;
  border-bottom: 1px solid var(--border-color);
`;

export const MobileSettingsSheetTitle = styled.div`
  color: var(--text-color);
  font-size: 17px;
  font-weight: 800;
`;

export const MobileSettingsSheetClose = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 10px;
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const MobileSettingsSheetBody = styled.div`
  overflow-y: auto;
  padding: 12px 0 4px;
`;

export const SpeedMenuHeader = styled.div`
  padding: 8px 12px;
  font-size: 11px;
  color: var(--text-muted-color);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid var(--border-color);
`;

export const SpeedOption = styled.button`
  width: 100%;
  padding: 9px 16px;
  font-size: 13px;
  cursor: pointer;
  border: none;
  text-align: left;
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--text-color)"};
  font-weight: ${(props) => (props.$active ? 700 : 400)};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 16%, transparent)"
      : "transparent"};
  transition: background 0.15s;

  &:hover {
    background: ${(props) =>
      props.$active
        ? "color-mix(in srgb, var(--primary-color) 16%, transparent)"
        : "var(--hover-color)"};
  }
`;

export const SpeedSection = styled.div`
  display: grid;
`;

export const SegmentList = styled.div`
  border-top: 1px solid var(--border-color);
  display: grid;
`;

export const SegmentOption = styled.button`
  width: 100%;
  padding: 11px 14px;
  display: grid;
  gap: 3px;
  text-align: left;
  border: none;
  cursor: pointer;
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 16%, transparent)"
      : "transparent"};
  transition: background 0.15s ease;

  &:hover {
    background: ${(props) =>
      props.$active
        ? "color-mix(in srgb, var(--primary-color) 16%, transparent)"
        : "var(--hover-color)"};
  }
`;

export const SegmentOptionTitle = styled.div`
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--text-color)"};
  font-size: 13px;
  font-weight: ${(props) => (props.$active ? 700 : 600)};
  line-height: 1.3;
`;

export const SegmentOptionMeta = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 500;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background: rgba(0, 0, 0, 0.3);
  pointer-events: none;
`;

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const NonSelectableVideo = styled(StyledVideo)`
  user-select: none;
  -webkit-user-select: none;
`;

export const PlaybackErrorOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: var(--danger-color);
  padding: 20px;
  text-align: center;
  z-index: 20;
  flex-direction: column;
  gap: 12px;
`;

export const PlaybackErrorText = styled.p`
  font-weight: 600;
  max-width: 400px;
  line-height: 1.5;
`;

export const TimeDisplay = styled.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  user-select: none;

  @media (max-width: 768px) {
    order: 10;
    flex-shrink: 0;
    font-size: 12px;
    line-height: 1.25;
  }
`;

export const CurrentSegmentLabel = styled.div`
  max-width: 220px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;

  @media (max-width: 768px) {
    order: 11;
    flex: 1 1 100%;
    width: 100%;
    max-width: none;
    min-width: 0;
    font-size: 11px;
    padding: 5px 9px;
    line-height: 1.2;
  }
`;

export const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const VolumeSlider = styled.input`
  width: 0;
  opacity: 0;
  transition: all 0.3s ease;
  accent-color: var(--primary-color);
  cursor: pointer;
  height: 4px;

  ${VolumeContainer}:hover & {
    width: 70px;
    opacity: 1;
  }
`;

export const VideoInfo = styled.div`
  padding: 18px 24px 14px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: block;
    padding: 12px 16px;
    background: var(--background-color);
  }
`;

export const VideoTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 10px;
  }
`;

export const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 10px 14px;
  }
`;

export const LessonDescriptionCard = styled.div`
  margin: 5px;
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  display: grid;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 12px 14px;
    border-radius: 12px;
  }
`;

export const LessonExtrasCard = styled.div`
  margin: 10px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);

  @media (max-width: 768px) {
    margin: 16px;
    border-radius: 12px;
  }
`;

export const LessonExtrasHeader = styled.button`
  width: 100%;
  display: grid;
  gap: 10px;
  padding: 12px 14px;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  text-align: left;
`;

export const LessonExtrasHeaderMeta = styled.div`
  min-width: 0;
  display: grid;
  gap: 4px;
`;

export const LessonExtrasTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
`;

export const LessonExtrasHint = styled.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`;

export const LessonExtrasBadges = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 6px;
`;

export const LessonExtrasBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  border: 1px solid
    color-mix(in srgb, var(--success-color) 24%, var(--border-color));
  background: color-mix(in srgb, var(--success-color) 10%, transparent);
  color: var(--success-color);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`;

export const LessonExtrasBody = styled.div`
  border-top: 1px solid var(--border-color);
`;

export const LessonDescriptionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const LessonDescriptionTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`;

export const LessonDescriptionBody = styled.div`
  font-size: 13px;
  line-height: 1.62;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.$expanded ? "unset" : 3)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const LessonDescriptionToggle = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary-color);
  cursor: pointer;
`;

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-muted-color);
`;

export const ViewCount = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: var(--text-secondary-color);
  font-weight: 500;
`;

export const LikeButton = styled(ViewCount).attrs({
  as: "button",
  type: "button",
})`
  border: none;
  cursor: pointer;
  background: transparent;
  color: ${(props) =>
    props.$liked ? "var(--danger-color)" : "var(--text-muted-color)"};
  padding: 0;
`;

export const EnrollmentSection = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  flex-shrink: 0;
`;

export const CompactEnrollmentSection = styled(EnrollmentSection)`
  padding: 12px 24px;
  border-bottom: none;
`;

export const EnrollmentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MiniAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${(props) => props.$bg || "var(--primary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid var(--background-color);
  margin-left: ${(props) => (props.$index > 0 ? "-8px" : "0")};
  position: relative;
  z-index: ${(props) => 10 - (props.$index || 0)};
`;

export const CreatorAvatar = styled(MiniAvatar)`
  width: 40px;
  height: 40px;
  font-size: 16px;
  overflow: hidden;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const CreatorMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreatorName = styled.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 15px;
`;

export const CreatorCount = styled.span`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const EnrollmentActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const MemberAvatars = styled.div`
  display: flex;
  align-items: center;
`;

export const MemberCountBadge = styled.div`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const EnrollButton = styled.button`
  padding: 8px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;

  ${(props) => {
    switch (props.$variant) {
      case "enroll":
        return `
          background: var(--primary-color);
          color: white;
        `;
      case "pending":
        return `
          background: color-mix(in srgb, var(--warning-color) 15%, transparent);
          color: var(--warning-color);
          cursor: default;
        `;
      case "enrolled":
        return `
          background: color-mix(in srgb, var(--success-color) 15%, transparent);
          color: var(--success-color);
          cursor: default;
        `;
      case "owner":
        return `
          background: color-mix(in srgb, var(--primary-color) 14%, transparent);
          color: var(--primary-color);
          cursor: default;
        `;
      case "leave":
        return `
          background: color-mix(in srgb, var(--danger-color) 12%, transparent);
          color: var(--danger-color);
          cursor: pointer;
          &:hover { background: color-mix(in srgb, var(--danger-color) 18%, transparent); }
        `;
      case "admin":
        return `
          background: color-mix(in srgb, var(--primary-color) 15%, transparent);
          color: var(--primary-color);
          cursor: pointer;
          &:hover { background: color-mix(in srgb, var(--primary-color) 24%, transparent); }
        `;
      default:
        return "background: var(--input-color); color: var(--text-color);";
    }
  }}
`;

export const RoundedEnrollButton = styled(EnrollButton)`
  border-radius: 20px;
`;

export const ManageEnrollButton = styled(RoundedEnrollButton)`
  padding: 8px 16px;
`;

export const AdminPanel = styled.div`
  background: var(--secondary-color);
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
  max-height: ${(props) => (props.$open ? "400px" : "0")};
  transition: max-height 0.3s ease;
  flex-shrink: 0;
`;

export const AdminPanelInner = styled.div`
  padding: 16px 24px;
`;

export const AdminSectionTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted-color);
  margin-top: ${(props) => (props.$spaced ? "16px" : "0")};
  margin-bottom: 12px;
`;

export const MemberRow = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  gap: 12px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }
`;

export const MemberAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  overflow: hidden;
`;

export const MemberAvatarImage = styled(AvatarImage)``;

export const MemberInfo = styled.div`
  flex: 1;
`;

export const MemberName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-color);
`;

export const MemberStatus = styled.div`
  font-size: 12px;
  color: ${(props) =>
    props.$pending ? "var(--warning-color)" : "var(--success-color)"};
`;

export const MemberActions = styled.div`
  display: flex;
  gap: 6px;
`;

export const ActionBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  ${(props) =>
    props.$approve
      ? `
        background: color-mix(in srgb, var(--success-color) 15%, transparent);
        color: var(--success-color);

        &:hover {
          background: color-mix(in srgb, var(--success-color) 30%, transparent);
        }
      `
      : `
        background: color-mix(in srgb, var(--danger-color) 15%, transparent);
        color: var(--danger-color);

        &:hover {
          background: color-mix(in srgb, var(--danger-color) 30%, transparent);
        }
      `}
`;

export const LockedView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  gap: 16px;
`;

export const LockedIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

export const NoCourseSelected = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary-color);
  gap: 16px;
  padding: 40px;
  text-align: center;
`;

export const NoCourseIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoCourseTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
`;

export const NoCourseText = styled.p`
  font-size: 14px;
  color: var(--text-muted-color);
  max-width: 300px;
  line-height: 1.5;
`;

export const LockedTitle = styled.h3`
  color: var(--text-color);
  font-weight: 700;
`;

export const LockedText = styled.p`
  color: var(--text-muted-color);
  font-size: 14px;
  max-width: ${(props) => (props.$wide ? "350px" : "none")};
`;

export const PendingMembersEmptyText = styled.div`
  color: var(--text-muted-color);
  font-size: 13px;
  padding: 8px 0;
`;

export const PlayerTabsBar = styled.div`
  display: flex;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border-color);
`;

export const PlayerTab = styled.button`
  flex: 1;
  appearance: none;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "transparent")};
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--text-muted-color)"};
  font-size: 13px;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
  white-space: nowrap;

  &:hover {
    color: var(--text-color);
  }
`;

export const PlayerTabContent = styled.div`
  flex: 0 0 auto;
  overflow-y: auto;
  min-height: 0;
`;

export const CourseInfoCard = styled.div`
  padding: 20px 24px;
  display: grid;
  gap: 14px;
`;

export const CourseInfoTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.4;
  margin: 0;
`;

export const CourseInfoDescription = styled.p`
  font-size: 14px;
  color: var(--text-muted-color);
  line-height: 1.6;
  margin: 0;
  white-space: pre-wrap;
`;

export const CourseInfoMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 20px;
`;

export const CourseInfoMetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--text-muted-color);
`;

export const ShareRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-top: 1px solid var(--border-color);
`;

export const ShareLabel = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
  flex: 1;
`;

export const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: var(--hover-color);
  }
`;

export const NotesArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 12px 14px;
  background: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    border-color: var(--primary-color);
  }

  &::placeholder {
    color: var(--text-muted-color);
  }
`;

export const NotesHintText = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 13px;
  line-height: 1.55;
`;

export const NotesEmptyState = styled.div`
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px dashed var(--border-color);
  color: var(--text-muted-color);
  font-size: 13px;
  line-height: 1.6;
  background: color-mix(in srgb, var(--input-color) 80%, white 20%);
`;

export const TimedNotesList = styled.div`
  display: grid;
  gap: 10px;
`;

export const TimedNoteItem = styled.div`
  display: grid;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 14px;
  border: 1px solid
    ${(props) =>
      props.$active
        ? "color-mix(in srgb, var(--primary-color) 52%, var(--border-color))"
        : "var(--border-color)"};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 10%, var(--input-color))"
      : "color-mix(in srgb, var(--input-color) 92%, white 8%)"};
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const TimedNoteHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const TimedNoteJumpButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 6px 12px;
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
  color: var(--primary-color);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  }
`;

export const TimedNoteText = styled.div`
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const NoteDialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10010;
  background: rgba(10, 14, 24, 0.58);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const NoteDialogCard = styled.div`
  width: min(100%, 460px);
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 22px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
  display: grid;
  gap: 16px;
  padding: 22px;
`;

export const NoteDialogHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const NoteDialogTitleWrap = styled.div`
  display: grid;
  gap: 6px;
`;

export const NoteDialogTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--text-color);
`;

export const NoteDialogSubtitle = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 13px;
  line-height: 1.55;
`;

export const NoteDialogCloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: color-mix(in srgb, var(--input-color) 88%, white 12%);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const NoteDialogTimeBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
  color: var(--primary-color);
  font-size: 13px;
  font-weight: 700;
  width: fit-content;
`;

export const NoteDialogActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

export const NoteDialogSecondaryButton = styled.button`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: transparent;
  color: var(--text-color);
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const NoteDialogPrimaryButton = styled.button`
  border: none;
  border-radius: 12px;
  background: var(--primary-color);
  color: white;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const NoteStatusText = styled.div`
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 600;
  min-height: 16px;
`;

export const RatingForm = styled.div`
  display: grid;
  gap: 12px;
`;

export const RatingStars = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const RatingStarButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 10px;
  background: ${(props) =>
    props.$active
      ? "rgba(250, 166, 26, 0.15)"
      : "color-mix(in srgb, var(--hover-color) 72%, transparent)"};
  color: ${(props) => (props.$active ? "var(--warning-color)" : "var(--text-muted-color)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    color: var(--warning-color);
  }
`;

export const ReviewSaveButton = styled.button`
  justify-self: start;
  min-height: 38px;
  padding: 0 16px;
  border: none;
  border-radius: 10px;
  background: var(--primary-color);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.55 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
`;

export const NotionSurface = styled.section`
  margin: 0;
  border-top: ${(props) => (props.$compact ? "1px solid var(--border-color)" : "none")};
  padding: ${(props) => (props.$compact ? "18px 20px 0" : "20px 20px 0")};
  display: grid;
  gap: 12px;

  @media (max-width: 768px) {
    margin: ${(props) => (props.$compact ? "14px 14px 0" : "0")};
    padding: ${(props) => (props.$compact ? "14px 14px 0" : "14px 14px 0")};
  }
`;

export const NotionSurfaceHeader = styled.div`
  display: grid;
  gap: 4px;
`;

export const NotionSurfaceTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;

export const NotionSurfaceText = styled.div`
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-muted-color);

  a {
    color: var(--primary-color);
    text-decoration: none;
  }
`;

export const NotionSurfaceBody = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--background-color);
  min-height: ${(props) => (props.$compact ? "420px" : "calc(100vh - 320px)")};
  padding: 18px;
  overflow: auto;

  .jamm-notion-root {
    max-width: 840px;
    margin: 0 auto;
    color: var(--text-color);
    font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .jamm-notion-root a {
    color: var(--primary-color);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .jamm-notion-page-title {
    font-size: 2.55rem;
    line-height: 1.08;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 30px;
    color: var(--text-color);
  }

  .jamm-notion-paragraph {
    margin: 0 0 14px;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-color);
    white-space: normal;
  }

  .jamm-notion-heading {
    margin: 28px 0 12px;
    color: var(--text-color);
  }

  .jamm-notion-heading-lg {
    font-size: 1.75rem;
    line-height: 1.25;
    font-weight: 700;
  }

  .jamm-notion-heading-md {
    font-size: 1.35rem;
    line-height: 1.3;
    font-weight: 700;
  }

  .jamm-notion-heading-sm {
    font-size: 1.1rem;
    line-height: 1.35;
    font-weight: 700;
  }

  .jamm-notion-list {
    margin: 8px 0 18px 22px;
    padding: 0;
    color: var(--text-color);
    line-height: 1.7;
  }

  .jamm-notion-list li {
    margin-bottom: 8px;
  }

  .jamm-notion-todo {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 10px 0 12px;
    font-size: 1rem;
    line-height: 1.65;
    color: var(--text-color);
  }

  .jamm-notion-todo input {
    margin-top: 4px;
    accent-color: var(--primary-color);
  }

  .jamm-notion-quote {
    margin: 16px 0 18px;
    padding: 4px 0 4px 16px;
    border-left: 3px solid color-mix(in srgb, var(--text-color) 18%, transparent);
    color: var(--text-secondary-color);
    font-size: 1rem;
    line-height: 1.7;
  }

  .jamm-notion-callout {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin: 16px 0 18px;
    padding: 14px 16px;
    border-radius: 16px;
    background: color-mix(in srgb, var(--hover-color) 72%, var(--background-color));
    border: 1px solid var(--border-color);
  }

  .jamm-notion-callout-icon {
    flex: 0 0 auto;
    font-size: 1.1rem;
    line-height: 1.2;
  }

  .jamm-notion-callout-text {
    color: var(--text-color);
    line-height: 1.65;
  }

  .jamm-notion-divider {
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 22px 0;
  }

  .jamm-notion-code {
    margin: 16px 0 20px;
    padding: 16px 18px;
    border-radius: 16px;
    background: color-mix(in srgb, var(--input-color) 88%, var(--background-color));
    border: 1px solid color-mix(in srgb, var(--border-color) 92%, transparent);
    overflow-x: auto;
  }

  .jamm-notion-code code {
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 0.95rem;
    line-height: 1.65;
    color: var(--text-color);
    white-space: pre-wrap;
  }

  .jamm-notion-image {
    display: block;
    max-width: 100%;
    border-radius: 14px;
    margin: 16px 0 20px;
  }

  @media (max-width: 768px) {
    min-height: ${(props) => (props.$compact ? "340px" : "360px")};
    padding: 14px;

    .jamm-notion-root {
      max-width: 100%;
    }

    .jamm-notion-page-title {
      font-size: 2rem;
      margin-bottom: 24px;
    }
  }
`;

export const NotionSurfaceFrame = styled.iframe`
  width: 100%;
  min-height: inherit;
  height: 100%;
  border: 0;
  border-radius: 12px;
  background: var(--background-color);
`;
