import styled from "styled-components";
import { PaneDivider, PaneDividerButton } from "../../../components/JammLayout.styles";
import { mobileFullscreenPane } from "../../../shared/styles/mobileSafeArea";

export const ProfileContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  overflow: hidden;
  background: var(--background-color);
`;

export const RightPanel = styled.div`
  flex: 1;
  height: 100vh;
  display: ${(props) => (props.$visible ? "flex" : "none")};
  flex-direction: column;
  background: var(--background-color);
  overflow-y: auto;
  border-left: 1px solid var(--border-color);
  position: relative;

  ${(props) =>
    props.$focused
      ? `
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 72px;
    width: calc(100vw - 72px);
    height: 100vh;
    z-index: 1500;
    border-left: none;
    box-shadow: 0 0 0 1px var(--border-color), 0 24px 80px rgba(0, 0, 0, 0.28);
  `
      : ""}

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

export { PaneDivider, PaneDividerButton };
