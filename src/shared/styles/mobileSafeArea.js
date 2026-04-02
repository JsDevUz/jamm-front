import { css } from "styled-components";

export const MOBILE_SAFE_AREA_TOP = "env(safe-area-inset-top, 0px)";
export const MOBILE_SAFE_AREA_BOTTOM = "env(safe-area-inset-bottom, 0px)";

export const mobileFullscreenPane = css`
  @media (max-width: 768px) {
    position: fixed;
    inset: 0;
    width: 100%;
    height: var(--app-height, 100dvh);
    min-height: var(--app-height, 100dvh);
    box-sizing: border-box;
  }
`;

export const mobileTopSafePadding = (topPx = 0, rightPx = 0, bottomPx = 0, leftPx = 0) => css`
  @media (max-width: 768px) {
    padding-top: calc(${topPx}px + ${MOBILE_SAFE_AREA_TOP});
    padding-right: ${rightPx}px;
    padding-bottom: ${bottomPx}px;
    padding-left: ${leftPx}px;
  }
`;
