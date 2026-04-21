import React from "react";
import styled, { keyframes } from "styled-components";
import { ArrowLeft, ChevronRight, LogOut, Search, X } from "lucide-react";

const modalOverlayIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalSurfaceIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const AccountOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  animation: ${modalOverlayIn} 0.18s ease;
  opacity: ${(props) => (props.$closing ? 0 : 1)};
  transition: opacity 0.18s ease;

  @media (max-width: 768px) {
    inset: auto 0 auto 0;
    top: var(--visual-viewport-offset-top, 0px);
    height: var(--visual-viewport-height, var(--app-height, 100dvh));
    max-height: var(--visual-viewport-height, var(--app-height, 100dvh));
    padding: 0;
    align-items: stretch;
    overflow: hidden;
  }
`;

const AccountModal = styled.div`
  width: min(1180px, 100%);
  min-height: min(700px, calc(100vh - 40px));
  max-height: calc(100vh - 40px);
  border-radius: 22px;
  border: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  background: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  color: var(--text-color);
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  overflow: hidden;
  box-shadow: 0 30px 100px rgba(0, 0, 0, 0.45);
  position: relative;
  animation: ${modalSurfaceIn} 0.22s ease;
  opacity: ${(props) => (props.$closing ? 0 : 1)};
  transform: ${(props) =>
    props.$closing ? "translateY(12px) scale(0.985)" : "translateY(0) scale(1)"};
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  @media (max-width: 768px) {
    width: 100vw;
    height: 100%;
    min-height: 0;
    max-height: 100%;
    border-radius: 0;
    overflow: hidden;
  }
`;

const AccountSidebar = styled.div`
  background: transparent;
  border-right: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  padding: 16px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 900px) {
    border-right: none;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  }

  @media (max-width: 768px) {
    height: 100%;
    min-height: 0;
    overflow-y: auto;
    border-bottom: none;
    padding: 0 10px calc(28px + env(safe-area-inset-bottom, 0px));
    gap: 18px;
    background: color-mix(in srgb, var(--background-color) 88%, var(--secondary-color));
    -webkit-overflow-scrolling: touch;
  }
`;

const MobileSettingsHeader = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 38px minmax(0, 1fr) 38px;
    align-items: center;
    min-height: 46px;
    padding: calc(14px + env(safe-area-inset-top, 0px)) 0 14px;
    margin: 0 -7px;
    border-bottom: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
  }
`;

const MobileCloseButton = styled.button`
  border: none;
  background: transparent;
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const MobileSettingsTitle = styled.h2`
  margin: 0;
  color: var(--text-color);
  font-size: 1.08rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-align: center;
`;

const MobileSearchBox = styled.div`
  display: none;

  @media (max-width: 768px) {
    min-height: 42px;
    border-radius: 15px;
    background: color-mix(in srgb, var(--tertiary-color) 80%, black 20%);
    color: var(--text-muted-color);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 12px;
    font-size: 0.92rem;
    font-weight: 600;
  }
`;

const AccountUserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AccountUserAvatar = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 15px;
  overflow: hidden;
  background: linear-gradient(
    160deg,
    color-mix(in srgb, var(--primary-color) 88%, white 12%) 0%,
    color-mix(in srgb, var(--primary-color) 76%, black 24%) 100%
  );
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 800;
  flex-shrink: 0;
`;

const AccountUserAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AccountUserMeta = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AccountUserName = styled.div`
  color: var(--text-color);
  font-size: 0.95rem;
  font-weight: 800;
`;

const AccountUserSub = styled.div`
  color: var(--text-secondary-color);
  font-size: 0.78rem;
`;

const AccountNavSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AccountNavLabel = styled.div`
  color: var(--text-muted-color);
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0 8px;
  margin-top: 2px;

  @media (max-width: 768px) {
    color: var(--text-secondary-color);
    font-size: 0.82rem;
    font-weight: 800;
    padding: 0 2px;
    margin: 0;
  }
`;

const AccountNavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 0;
    overflow: hidden;
    border-radius: 15px;
    background: color-mix(in srgb, var(--secondary-color) 94%, var(--background-color));
  }
`;

const AccountNavItem = styled.button`
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 11px 12px;
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--hover-color) 88%, transparent)"
      : "transparent"};
  color: ${(props) =>
    props.$danger
      ? "var(--danger-color)"
      : props.$active
        ? "var(--text-color)"
        : "var(--text-secondary-color)"};
  display: flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-primary, "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif);
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
  text-align: left;
  transition:
    background-color 0.16s ease,
    color 0.16s ease;

  &:hover {
    background: ${(props) =>
      props.$active
        ? "color-mix(in srgb, var(--hover-color) 88%, transparent)"
        : "color-mix(in srgb, var(--hover-color) 72%, transparent)"};
    color: ${(props) =>
      props.$danger ? "var(--danger-color)" : "var(--text-color)"};
  }

  @media (max-width: 768px) {
    min-height: 54px;
    border-radius: 0;
    padding: 0 14px;
    gap: 14px;
    background: transparent;
    color: ${(props) => (props.$danger ? "var(--danger-color)" : "var(--text-color)")};
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.01em;

    &:not(:last-child) {
      border-bottom: 1px solid color-mix(in srgb, var(--border-color) 58%, transparent);
    }

    svg:first-child {
      width: 22px;
      height: 22px;
      color: ${(props) =>
        props.$danger ? "var(--danger-color)" : "var(--text-secondary-color)"};
      flex-shrink: 0;
    }
  }
`;

const AccountNavItemLabel = styled.span`
  flex: 1;
  min-width: 0;
`;

const AccountNavChevron = styled(ChevronRight)`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 19px;
    height: 19px;
    color: var(--text-secondary-color);
    flex-shrink: 0;
  }
`;

const AccountNavDivider = styled.div`
  height: 1px;
  background: color-mix(in srgb, var(--border-color) 82%, transparent);
  margin: 4px 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const AccountMain = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  padding: 14px 18px 18px;

  @media (max-width: 768px) {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
    padding: 0;
    transform: translateX(${(props) => (props.$mobileOpen ? "0" : "100%")});
    opacity: ${(props) => (props.$mobileOpen ? 1 : 0)};
    pointer-events: ${(props) => (props.$mobileOpen ? "auto" : "none")};
    transition:
      transform 0.22s ease,
      opacity 0.22s ease;
  }
`;

const AccountHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);

  @media (max-width: 768px) {
    padding: calc(14px + env(safe-area-inset-top, 0px)) 14px 12px;
  }
`;

const AccountHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const AccountBackButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 12px;
    background: color-mix(in srgb, var(--hover-color) 72%, transparent);
    color: var(--text-color);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
  }
`;

const AccountTitle = styled.h3`
  margin: 0;
  font-size: 1.28rem;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const AccountCloseButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 12px;
  background: color-mix(in srgb, var(--hover-color) 72%, transparent);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 92%, transparent);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const AccountContent = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 16px;
  padding-right: 4px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default function NewSettingsModal({
  open,
  closing,
  currentUser,
  displayName,
  avatarLetter,
  settingsMenuItems,
  accountSettingsSection,
  isAccountMobilePanelOpen,
  content,
  onClose,
  onSectionSelect,
  onBackMobile,
  onLogout,
}) {
  if (!open) return null;

  return (
    <AccountOverlay $closing={closing} onClick={onClose}>
      <AccountModal $closing={closing} onClick={(event) => event.stopPropagation()}>
        <AccountSidebar>
          <MobileSettingsHeader>
            <MobileCloseButton
              type="button"
              aria-label="Close settings"
              onClick={onClose}
            >
              <ArrowLeft size={26} />
            </MobileCloseButton>
            <MobileSettingsTitle>Settings</MobileSettingsTitle>
            <span />
          </MobileSettingsHeader>
          <AccountUserRow>
            <AccountUserAvatar>
              {currentUser?.avatar ? (
                <AccountUserAvatarImage src={currentUser.avatar} alt={displayName} />
              ) : (
                avatarLetter
              )}
            </AccountUserAvatar>
            <AccountUserMeta>
              <AccountUserName>{displayName}</AccountUserName>
              <AccountUserSub>Bu siz</AccountUserSub>
            </AccountUserMeta>
          </AccountUserRow>
          <AccountNavSection>
            <AccountNavLabel>Account Settings</AccountNavLabel>
            <AccountNavItems>
              {settingsMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <AccountNavItem
                    key={item.id}
                    type="button"
                    $active={accountSettingsSection === item.id}
                    onClick={() => onSectionSelect(item.id)}
                  >
                    <Icon size={14} />
                    <AccountNavItemLabel>{item.label}</AccountNavItemLabel>
                    <AccountNavChevron />
                  </AccountNavItem>
                );
              })}
              <AccountNavDivider />
              <AccountNavItem type="button" $danger onClick={onLogout}>
                <LogOut size={14} />
                <AccountNavItemLabel>Log out</AccountNavItemLabel>
                <AccountNavChevron />
              </AccountNavItem>
            </AccountNavItems>
          </AccountNavSection>
        </AccountSidebar>

        <AccountMain $mobileOpen={isAccountMobilePanelOpen}>
          <AccountHeader>
            <AccountHeaderLeft>
              <AccountBackButton
                type="button"
                aria-label="Back to settings menu"
                onClick={onBackMobile}
              >
                <ArrowLeft size={14} />
              </AccountBackButton>
              <AccountTitle>
                {settingsMenuItems.find((item) => item.id === accountSettingsSection)
                  ?.label || "My Account"}
              </AccountTitle>
            </AccountHeaderLeft>
            <AccountCloseButton
              type="button"
              aria-label="Close account settings"
              onClick={onClose}
            >
              <X size={20} />
            </AccountCloseButton>
          </AccountHeader>

          <AccountContent>{content}</AccountContent>
        </AccountMain>
      </AccountModal>
    </AccountOverlay>
  );
}
