import React from "react";
import styled from "styled-components";
import { X, AlertTriangle } from "lucide-react";

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DialogContainer = styled.div`
  background-color: #36393f;
  border-radius: 12px;
  padding: 24px;
  max-width: 450px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    width: 95%;
    max-width: 95%;
    padding: 16px;
    margin: 0 16px;
  }
`;

const DialogHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DialogTitle = styled.h2`
  color: #dcddde;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  /* If danger, we can style icon */
  svg {
    color: ${(props) => (props.isDanger ? "#ef4444" : "#7289da")};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #4a4d52;
    color: #dcddde;
  }
`;

const DialogContent = styled.div`
  color: #b9bbbe;
  margin-bottom: 24px;
  line-height: 1.5;
  font-size: 15px;
`;

const DialogActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => {
    if (props.variant === "danger") {
      return `
        background-color: #da373c;
        color: white;
        &:hover {
          background-color: #a1282c;
          transform: translateY(-1px);
        }
      `;
    } else if (props.variant === "primary") {
      return `
        background-color: #7289da;
        color: white;
        &:hover {
          background-color: #677bc4;
          transform: translateY(-1px);
        }
      `;
    } else {
      return `
        background-color: transparent;
        color: #dcddde;
        &:hover {
          text-decoration: underline;
        }
      `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ConfirmDialog = ({
  isOpen,
  onClose,
  title,
  description,
  confirmText = "Tasdiqlash",
  cancelText = "Bekor qilish",
  onConfirm,
  isDanger = false,
}) => {
  if (!isOpen) return null;

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContainer onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle isDanger={isDanger}>
            {isDanger && <AlertTriangle size={24} />}
            {title}
          </DialogTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </DialogHeader>

        <DialogContent>{description}</DialogContent>

        <DialogActions>
          <Button onClick={onClose}>{cancelText}</Button>
          <Button
            variant={isDanger ? "danger" : "primary"}
            onClick={() => {
              onConfirm();
            }}
          >
            {confirmText}
          </Button>
        </DialogActions>
      </DialogContainer>
    </DialogOverlay>
  );
};

export default ConfirmDialog;
