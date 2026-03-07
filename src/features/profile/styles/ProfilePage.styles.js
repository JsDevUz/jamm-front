import styled from "styled-components";

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

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
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
