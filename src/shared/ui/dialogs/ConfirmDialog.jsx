import React from "react";
import { X, AlertTriangle } from "lucide-react";
import styled from "styled-components";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalTitle,
} from "./ModalShell";

const Content = styled.div`
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    color: ${(props) =>
      props.$danger ? "var(--danger-color)" : "var(--primary-color)"};
    flex-shrink: 0;
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
    <ModalOverlay onClick={onClose} $overlay="rgba(0, 0, 0, 0.8)" $zIndex={10000}>
      <ModalPanel
        $width="min(100%, 450px)"
        $maxWidth="95vw"
        $maxHeight="90vh"
        $radius="14px"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader $padding="16px 18px">
          <TitleRow $danger={isDanger}>
            {isDanger && <AlertTriangle size={20} />}
            <ModalTitle $size="18px">{title}</ModalTitle>
          </TitleRow>
          <ModalCloseButton onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody $padding="16px 18px 8px">
          <Content>{description}</Content>
        </ModalBody>

        <ModalFooter $padding="14px 18px">
          <DialogActionButton $variant="ghost" onClick={onClose}>
            {cancelText}
          </DialogActionButton>
          <DialogActionButton
            $variant={isDanger ? "danger" : "primary"}
            onClick={() => {
              onConfirm();
            }}
          >
            {confirmText}
          </DialogActionButton>
        </ModalFooter>
      </ModalPanel>
    </ModalOverlay>
  );
};

export default ConfirmDialog;
