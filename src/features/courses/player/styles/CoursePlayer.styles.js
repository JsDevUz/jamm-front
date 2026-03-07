import styled from "styled-components";

export const PlayerContainer = styled.div`
  flex: 1;
  display: flex;
  height: 100vh;
  background-color: var(--background-color);
  overflow: hidden;

  @media (max-width: 1300px) {
    flex-direction: column;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100vh;
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
  overflow-y: auto;

  @media (max-width: 1300px) {
    flex: none;
    overflow: visible;
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
  pointer-events: ${(props) => (props.$pointerEvents ? props.$pointerEvents : "auto")};
`;

export const TransparentVideoOverlay = styled(VideoOverlay)`
  background: transparent;
  pointer-events: none;
`;

export const TopBar = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
`;

export const TopBarTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
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
  transition: all 0.3s ease;
  box-shadow: 0 4px 24px color-mix(in srgb, var(--primary-color) 50%, transparent);

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: var(--primary-color);
  }
`;

export const ControlsBar = styled.div`
  padding: 0 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: height 0.15s ease;

  &:hover {
    height: 6px;
  }
`;

export const ProgressFilled = styled.div`
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
  position: relative;
  transition: width 0.1s linear;
  width: ${(props) => `${props.$width}%`};

  &::after {
    content: "";
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    box-shadow: 0 0 4px color-mix(in srgb, var(--primary-color) 50%, transparent);
    opacity: 0;
    transition: opacity 0.15s;
  }

  ${ProgressContainer}:hover &::after {
    opacity: 1;
  }
`;

export const BufferedProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  width: ${(props) => `${props.$width}%`};
`;

export const ProgressHoverTooltip = styled.div`
  position: absolute;
  bottom: 14px;
  left: ${(props) => `${props.$left}px`};
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 3px 7px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 20;
  letter-spacing: 0.5px;
`;

export const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ControlsRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ControlButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
  }
`;

export const SpeedMenuAnchor = styled.div`
  position: relative;
`;

export const SpeedToggleButton = styled(ControlButton)`
  font-size: 11px;
  font-weight: 700;
  width: auto;
  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--primary-color)" : "rgba(255, 255, 255, 0.2)"};
  color: ${(props) => (props.$accent ? "var(--primary-color)" : "white")};
`;

export const SpeedMenu = styled.div`
  position: absolute;
  bottom: 44px;
  right: 0;
  background: rgba(15, 15, 20, 0.97);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  min-width: 110px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  z-index: 50;
`;

export const SpeedMenuHeader = styled.div`
  padding: 8px 12px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const SpeedOption = styled.button`
  width: 100%;
  padding: 9px 16px;
  font-size: 13px;
  cursor: pointer;
  border: none;
  text-align: left;
  color: ${(props) => (props.$active ? "var(--primary-color)" : "white")};
  font-weight: ${(props) => (props.$active ? 700 : 400)};
  background: ${(props) =>
    props.$active ? "color-mix(in srgb, var(--primary-color) 16%, transparent)" : "transparent"};
  transition: background 0.15s;

  &:hover {
    background: ${(props) =>
      props.$active
        ? "color-mix(in srgb, var(--primary-color) 16%, transparent)"
        : "rgba(255, 255, 255, 0.06)"};
  }
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
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`;

export const VideoTitle = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
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
