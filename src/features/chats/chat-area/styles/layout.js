import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--background-color);
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }

    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const OuterChatWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

export const ChatMain = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

export const ChatMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

