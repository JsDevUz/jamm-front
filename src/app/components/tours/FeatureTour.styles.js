import styled from "styled-components";

export const TourRoot = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20000;
  pointer-events: none;
`;

export const TourMask = styled.div`
  position: fixed;
  background: rgba(7, 10, 16, 0.64);
  pointer-events: auto;
`;

export const TourHighlight = styled.div`
  position: fixed;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 18px 48px rgba(0, 0, 0, 0.32);
  pointer-events: none;
`;

export const TourCard = styled.div`
  position: fixed;
  width: min(320px, calc(100vw - 32px));
  background: color-mix(in srgb, var(--secondary-color) 88%, transparent);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
  padding: 14px;
  color: var(--text-color);
  pointer-events: auto;
`;

export const TourStep = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
  margin-bottom: 8px;
`;

export const TourTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 6px;
`;

export const TourDescription = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary-color);
`;

export const TourFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
`;

export const TourTextButton = styled.button`
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 10px;

  &:hover {
    color: var(--text-color);
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const TourPrimaryButton = styled.button`
  border: 1px solid color-mix(in srgb, var(--primary-color) 46%, transparent);
  background: var(--primary-color);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  padding: 9px 14px;
  border-radius: 12px;
  box-shadow: 0 10px 24px color-mix(in srgb, var(--primary-color) 24%, transparent);

  &:hover {
    filter: brightness(1.04);
  }
`;
