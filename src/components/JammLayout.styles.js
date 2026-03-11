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
  height: 100vh;
  background-color: var(--background-color);
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
  }
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
  overflow: hidden;
  position: relative;

  ${(props) => props.$focused && focusedPaneStyles}
`;

export const ScrollPane = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;

  ${(props) => props.$focused && focusedPaneStyles}
`;

export const EmptyPane = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted-color);
`;
