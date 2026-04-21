import styled from "styled-components";
import {
  mobileFullscreenPane,
  mobileTopSafePadding,
} from "../../../shared/styles/mobileSafeArea";

export const Pane = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  background: var(--background-color);

  @media (max-width: 700px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(100%, calc(100% - 72px));
    z-index: 10;
    background-color: var(--secondary-color);
    box-shadow: -4px 0 18px rgba(0, 0, 0, 0.22);
    animation: slideInFromRight 0.28s ease-out;
  }

  @media (max-width: 768px) {
    ${mobileFullscreenPane};
    z-index: 9999;
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

export const Empty = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: var(--text-muted-color);
  text-align: center;
  padding: 40px;
`;

export const Wrap = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 28px 28px 72px;

  @media (max-width: 768px) {
    padding: 18px 16px 96px;
  }
`;

export const ReaderHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 8;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 12px;
  min-height: 64px;
  padding: 12px 24px;
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 88%, transparent);
  background: color-mix(in srgb, var(--secondary-color) 90%, transparent);
  backdrop-filter: blur(16px);

  @media (max-width: 768px) {
    ${mobileTopSafePadding(12, 16, 12, 16)};
    min-height: calc(64px + env(safe-area-inset-top, 0px));
  }
`;

export const ReaderHeaderTitle = styled.div`
  min-width: 0;
  color: var(--text-color);
  font-size: 15px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ReaderHeaderSpacer = styled.div`
  width: 40px;
  height: 40px;
`;

export const ReaderScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const BackButton = styled.button`
  display: inline-flex;
  border: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--input-color) 85%, transparent);
  color: var(--text-color);
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const CoverButton = styled.button`
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
`;

export const CoverImage = styled.img`
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 28px;
  margin-bottom: 26px;
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.05;
  color: var(--text-color);
`;

export const Excerpt = styled.p`
  margin: 0 0 16px;
  color: var(--text-secondary-color);
  font-size: 17px;
  line-height: 1.7;
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
  margin-bottom: 20px;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
`;

export const ActionButton = styled.button`
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--danger-color)" : "var(--border-color)"};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--danger-color) 8%, transparent)"
      : "transparent"};
  color: ${(props) =>
    props.$active ? "var(--danger-color)" : "var(--text-secondary-color)"};
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
`;

export const Divider = styled.div`
  height: 1px;
  background: var(--border-color);
  margin-bottom: 28px;
`;

export const LightboxOverlay = styled.button`
  position: fixed;
  inset: 0;
  border: none;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(6px);
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
`;

export const LightboxImage = styled.img`
  max-width: min(94vw, 1600px);
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 18px;
  object-fit: contain;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
`;
