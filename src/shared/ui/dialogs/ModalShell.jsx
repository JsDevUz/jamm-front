import styled, { keyframes } from "styled-components";

const overlayIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const panelIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${(props) => props.$zIndex || 1000};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.$padding || "20px"};
  background: ${(props) => props.$overlay || "var(--overlay-color, rgba(0, 0, 0, 0.7))"};
  backdrop-filter: ${(props) => props.$backdrop || "blur(4px)"};
  animation: ${overlayIn} 0.18s ease-out;
`;

export const ModalPanel = styled.div`
  width: ${(props) => props.$width || "min(100%, 520px)"};
  max-width: ${(props) => props.$maxWidth || "100%"};
  max-height: ${(props) => props.$maxHeight || "90vh"};
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: ${(props) => props.$radius || "18px"};
  box-shadow: 0 16px 48px var(--shadow-color-strong, rgba(0, 0, 0, 0.28));
  animation: ${panelIn} 0.22s ease-out;

  @media (max-width: 768px) {
    width: ${(props) => (props.$mobileFull ? "100%" : props.$width || "100%")};
    max-width: 100%;
    max-height: ${(props) => (props.$mobileFull ? "100vh" : props.$maxHeight || "90vh")};
    height: ${(props) => (props.$mobileFull ? "100%" : "auto")};
    border-radius: ${(props) => (props.$mobileFull ? "0" : props.$radius || "18px")};
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: ${(props) => props.$padding || "16px 18px"};
  border-bottom: 1px solid var(--border-color);
`;

export const ModalTitleBlock = styled.div`
  min-width: 0;
  flex: 1;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: var(--text-color);
  font-size: ${(props) => props.$size || "17px"};
  font-weight: 700;
`;

export const ModalSubtitle = styled.p`
  margin: 6px 0 0;
  color: var(--text-muted-color);
  font-size: 13px;
`;

export const ModalCloseButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: none;
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.15s ease;

  &:hover {
    background: var(--hover-color);
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: ${(props) => props.$padding || "18px"};
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: ${(props) => props.$padding || "14px 18px"};
  border-top: 1px solid var(--border-color);
  background: ${(props) => props.$background || "transparent"};
`;

export const DialogActionButton = styled.button`
  height: 38px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.15s ease,
    opacity 0.15s ease,
    transform 0.15s ease;
  opacity: ${(props) => (props.disabled ? 0.55 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  ${(props) => {
    if (props.$variant === "danger") {
      return `
        background: var(--danger-color, var(--primary-color));
        color: white;

        &:hover {
          background: var(--danger-hover-color, var(--hover-color));
          transform: translateY(-1px);
        }
      `;
    }

    if (props.$variant === "ghost") {
      return `
        background: transparent;
        color: var(--text-color);

        &:hover {
          background: var(--hover-color);
        }
      `;
    }

    return `
      background: var(--primary-color);
      color: white;

      &:hover {
        transform: translateY(-1px);
      }
    `;
  }}
`;
