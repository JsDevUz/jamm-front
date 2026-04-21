import React from "react";
import styled, { keyframes } from "styled-components";
import { ArrowLeft, LogOut, X } from "lucide-react";

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
    padding: 0;
    align-items: stretch;
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
    min-height: 100vh;
    max-height: 100vh;
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
`;

const AccountUserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
`;

const AccountNavDivider = styled.div`
  height: 1px;
  background: color-mix(in srgb, var(--border-color) 82%, transparent);
  margin: 4px 0;
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
    padding: 14px;
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
              <AccountUserSub>Edit Profiles</AccountUserSub>
            </AccountUserMeta>
          </AccountUserRow>
          <AccountNavSection>
            <AccountNavLabel>User Settings</AccountNavLabel>
            {settingsMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <AccountNavItem
                  key={item.id}
                  type="button"
                  $active={accountSettingsSection === item.id}
                  onClick={() => onSectionSelect(item.id)}
                >
                  <Icon size={18} />
                  {item.label}
                </AccountNavItem>
              );
            })}
            <AccountNavDivider />
            <AccountNavItem type="button" $danger onClick={onLogout}>
              <LogOut size={18} />
              Log out
            </AccountNavItem>
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
                <ArrowLeft size={18} />
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
