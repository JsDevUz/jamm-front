import styled, { keyframes } from "styled-components";

const overlayIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  animation: ${overlayIn} 0.2s ease;
`;

export const Dialog = styled.div`
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  animation: ${slideUp} 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

export const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
`;

export const DialogTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;

export const ComposerBody = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px 20px;
`;

export const AvatarSmall = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  font-size: 15px;
  font-weight: 700;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TextareaWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AttachmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 8px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const AttachmentCard = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 14px;
  background: var(--input-color);
  border: 1px solid var(--border-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const AttachmentRemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 999px;
  background: rgba(10, 12, 20, 0.78);
  color: white;
  cursor: pointer;
  backdrop-filter: blur(10px);
`;

export const AttachmentStatus = styled.div`
  position: absolute;
  inset: auto 8px 8px 8px;
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 10px;
  background: rgba(10, 12, 20, 0.72);
  color: white;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(10px);
`;

export const AuthorName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.6;
  font-family: inherit;
  caret-color: var(--primary-color);

  &::placeholder {
    color: var(--text-muted-color);
  }
`;

export const CharCounter = styled.div`
  align-self: flex-end;
  color: ${(props) =>
    props.$warn ? "var(--danger-color)" : "var(--text-muted-color)"};
  font-size: 12px;
  font-variant-numeric: tabular-nums;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 20px 16px;
`;

export const ToolBtn = styled.button`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted-color);
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--input-color);
    color: var(--primary-color);
  }
`;

export const ToolDivider = styled.div`
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: var(--border-color);
`;

export const Spacer = styled.div`
  flex: 1;
`;

export const SubmitBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 20px;
  border: none;
  border-radius: 20px;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;
