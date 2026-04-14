import styled from "styled-components";

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--background-color);
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    height: var(--app-height, 100dvh);
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
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  position: relative;

  @media (max-width: 768px) {
    height: var(--app-height, 100dvh);
  }
`;

export const ChatMain = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 768px) {
    /* Header fixed bo'lgani uchun padding kerak */
    padding-top: calc(
      56px + env(safe-area-inset-top, 0px) + ${(props) => (props.$keyboardOpen ? "4px" : "10px")}
    );
    padding-bottom: 0;
    transition: padding-top 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media (max-width: 480px) {
    padding-top: calc(
      48px + env(safe-area-inset-top, 0px) + ${(props) => (props.$keyboardOpen ? "2px" : "8px")}
    );
  }
`;

export const ChatMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
`;
