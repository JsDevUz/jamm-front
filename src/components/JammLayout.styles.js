import styled from "styled-components";

const focusedPaneStyles = `
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 72px;
  width: calc(100vw - 72px);
  height: 100vh;
  z-index: 1500;
  background: var(--background-color);
  box-shadow: 0 0 0 1px var(--border-color), 0 24px 80px rgba(0, 0, 0, 0.28);
  animation: rightPaneFocusIn 0.22s ease-out;

  @keyframes rightPaneFocusIn {
    from {
      opacity: 0.92;
      transform: scale(0.985);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: var(--app-height, 100dvh);
  background-color: var(--background-color);
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;

export const NotificationPromptBanner = styled.div`
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2200;
  width: min(520px, calc(100vw - 32px));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 14px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--primary-color) 28%, var(--border-color));
  background: color-mix(in srgb, var(--secondary-color) 90%, black 10%);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width: 700px) {
    top: max(12px, env(safe-area-inset-top, 0px));
    width: calc(100vw - 24px);
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const NotificationPromptText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  color: var(--text-color);
`;

export const NotificationPromptTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
`;

export const NotificationPromptDescription = styled.div`
  font-size: 13px;
  line-height: 1.4;
  color: var(--text-secondary-color);
`;

export const NotificationPromptActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 700px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

export const NotificationPromptButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 9px 14px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    opacity 0.18s ease;
  background: ${(props) =>
    props.$secondary ? "var(--hover-color)" : "var(--primary-color)"};
  color: ${(props) => (props.$secondary ? "var(--text-color)" : "white")};

  &:hover {
    opacity: 0.92;
  }
`;

export const AppLockOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30040;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(circle at top, rgba(88, 101, 242, 0.2), transparent 42%),
    rgba(8, 10, 18, 0.78);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
`;

export const AppLockShell = styled.div`
  width: min(460px, 100%);
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  text-align: center;
`;

export const AppLockTitle = styled.h2`
  margin: 0;
  color: var(--text-color);
  font-size: 28px;
  font-weight: 800;
  line-height: 1.15;
`;

export const AppLockDescription = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.6;
  max-width: 360px;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
`;

export const PaneDivider = styled.div`
  position: relative;
  width: 0;
  flex: 0 0 0;
  border-left: 1px solid var(--border-color);
  z-index: ${(props) => (props.$focused ? 1601 : 2)};

  ${(props) =>
    props.$focused
      ? `
    position: fixed;
    top: 0;
    left: 72px;
    bottom: 0;
    border-left: none;
  `
      : ""}

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PaneDividerButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateX(-50%);
  width: 24px;
  height: 35px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition:
    background 0.16s ease,
    color 0.16s ease,
    border-color 0.16s ease,
    transform 0.16s ease;

  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
    border-color: var(--text-muted-color);
  }
`;

export const ContentPane = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  position: relative;

  ${(props) => props.$focused && focusedPaneStyles}
`;

export const ScrollPane = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  scrollbar-gutter: stable both-edges;

  @supports not (scrollbar-gutter: stable) {
    overflow-y: scroll;
  }

  ${(props) => props.$focused && focusedPaneStyles}
`;

export const EmptyPane = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted-color);
`;
