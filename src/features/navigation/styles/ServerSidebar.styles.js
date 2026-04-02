import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 72px;
  height: var(--app-height, 100dvh);
  background-color: var(--tertiary-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 700px) {
    order: 2;
    width: 100%;
    height: auto;
    min-height: 64px;
    min-height: calc(64px + constant(safe-area-inset-bottom));
    min-height: calc(64px + env(safe-area-inset-bottom, 0px));
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 6px 10px 12px;
    padding: 6px 10px calc(12px + constant(safe-area-inset-bottom));
    padding: 6px 10px calc(12px + env(safe-area-inset-bottom, 0px));
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    background: var(--background-color);
    overflow: visible;

    html[data-mobile-keyboard-open="true"] & {
      display: none;
    }
  }
`;

export const NavButton = styled.button`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) =>
    props.$active ? "var(--primary-color)" : "transparent"};
  color: ${(props) =>
    props.$active ? "white" : "var(--text-secondary-color)"};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  flex-shrink: 0;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--hover-color)"};
    color: ${(props) => (props.$active ? "white" : "var(--text-color)")};
    transform: scale(1.1);
  }

  @media (max-width: 700px) {
    width: auto;
    height: auto;
    flex: 1;
    margin-bottom: 0;
    padding: 0 4px;
    border-radius: 0;
    background: transparent;
    color: ${(props) => (props.$active ? "#fff" : "var(--text-secondary-color)")};
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 3px;

    &:hover {
      background: transparent;
      color: ${(props) => (props.$active ? "#fff" : "var(--text-color)")};
      transform: none;
    }
  }
`;

export const IconSlot = styled.div`
  min-width: 44px;
  height: 44px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const NavLabel = styled.span`
  display: none;

  @media (max-width: 700px) {
    display: block;
    font-size: 11px;
    line-height: 14px;
    font-weight: 600;
    color: ${(props) => (props.$active ? "#fff" : "var(--text-secondary-color)")};
    text-align: center;
    white-space: nowrap;
  }
`;

export const NavBadge = styled.span`
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 0 0 2px var(--tertiary-color);

  @media (max-width: 700px) {
    top: -4px;
    right: -4px;
  }
`;

export const Spacer = styled.div`
  flex: 1;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const AvatarButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.$active
        ? "var(--primary-color)"
        : props.$premium
          ? "var(--warning-color)"
          : "var(--border-color)"};
  background: var(--primary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
  padding: 0;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: ${(props) =>
    props.$active
      ? "0 0 0 2px color-mix(in srgb, var(--primary-color) 40%, transparent)"
      : "none"};

  &:hover {
    transform: scale(1.08);
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px
      color-mix(in srgb, var(--primary-color) 40%, transparent);
  }

  @media (max-width: 700px) {
    width: auto;
    height: auto;
    flex: 1;
    margin-bottom: 0;
    padding: 0 4px;
    border: none;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 3px;

    &:hover {
      transform: none;
      border-color: transparent;
      box-shadow: none;
    }
  }
`;

export const ProfileAvatarWrap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  overflow: visible;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 700px) {
    width: 24px;
    height: 24px;
    border-radius: 12px;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

export const AvatarFallback = styled.span`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  color: white;
  line-height: 1;
  background: var(--primary-color);

  @media (max-width: 700px) {
    font-size: 11px;
  }
`;

export const ProfileStatusDot = styled.span`
  display: none;
  position: absolute;
  right: -2px;
  bottom: -1px;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #46c46b;
  border: 1.5px solid var(--background-color);

  @media (max-width: 700px) {
    display: block;
  }
`;
