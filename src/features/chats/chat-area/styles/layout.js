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
    /* Pin to the visual viewport on mobile. Using visualViewport (not layout
       viewport) means when iOS Safari shows/hides its chrome the container
       tracks the real visible area — no empty strip under the composer and
       no header jumping when the keyboard opens. */
    height: var(--visual-viewport-height, var(--app-height, 100dvh));
    min-height: var(--visual-viewport-height, var(--app-height, 100dvh));
    max-height: var(--visual-viewport-height, var(--app-height, 100dvh));
    position: fixed;
    top: var(--visual-viewport-offset-top, 0px);
    left: 0;
    right: 0;
    z-index: 1000;
    transform: translateZ(0);
    overscroll-behavior: contain;
    touch-action: manipulation;
    will-change: height, top;
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
    height: var(--visual-viewport-height, var(--app-height, 100dvh));
    min-height: var(--visual-viewport-height, var(--app-height, 100dvh));
    max-height: var(--visual-viewport-height, var(--app-height, 100dvh));
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
  background: var(--background-color);

  @media (max-width: 768px) {
    padding-bottom: 0;
    flex: 1 1 auto;
    height: auto;
  }
`;

export const ChatMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  @media (max-width: 768px) {
    position: relative;
    isolation: isolate;
  }
`;
