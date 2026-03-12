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
    position: fixed;
    bottom: calc(12px + env(safe-area-inset-bottom, 0px));
    left: 14px;
    right: 14px;
    width: auto;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 10px 12px calc(10px + env(safe-area-inset-bottom, 0px));
    border-radius: 20px;
    background: rgba(var(--tertiary-color-rgb, 32, 34, 37), 0.7);
    backdrop-filter: blur(4px) saturate(160%);
    -webkit-backdrop-filter: blur(4px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
    z-index: 100;
    overflow: visible;
    opacity: ${(props) => (props.$keyboardOpen ? 0 : 1)};
    transform: ${(props) =>
      props.$keyboardOpen ? "translateY(calc(100% + 48px))" : "translateY(0)"};
    pointer-events: ${(props) => (props.$keyboardOpen ? "none" : "auto")};
    transition:
      opacity 0.18s ease,
      transform 0.22s ease;
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
    margin-bottom: 0;
    width: 44px;
    height: 44px;
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
    margin-bottom: 0;
    width: 40px;
    height: 40px;
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarFallback = styled.span`
  font-size: 16px;
  font-weight: 800;
  color: white;
  line-height: 1;
`;
