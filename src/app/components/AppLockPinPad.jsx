import React from "react";
import styled from "styled-components";
import { Delete, Lock, X } from "lucide-react";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2600;
  background: rgba(8, 10, 18, 0.78);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const Dialog = styled.div`
  width: min(420px, 100%);
  border-radius: 28px;
  border: 1px solid var(--border-color);
  background: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.34);
  overflow: hidden;
`;

const Header = styled.div`
  position: relative;
  padding: 26px 24px 18px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 999px;
  background: var(--hover-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const IconWrap = styled.div`
  width: 56px;
  height: 56px;
  margin: 0 auto 14px;
  border-radius: 20px;
  background: rgba(88, 101, 242, 0.14);
  color: var(--primary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 22px;
  font-weight: 800;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 10px 0 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.5;
`;

const PinPreview = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 24px 20px;
`;

const PinDot = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 999px;
  border: 2px solid
    ${(props) =>
      props.$filled ? "var(--primary-color)" : "var(--border-color)"};
  background: ${(props) =>
    props.$filled ? "var(--primary-color)" : "transparent"};
  transition: 0.18s ease;
`;

const ErrorText = styled.div`
  min-height: 22px;
  padding: 0 24px 6px;
  text-align: center;
  color: #ef4444;
  font-size: 13px;
  font-weight: 600;
`;

const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  padding: 12px 24px 28px;
`;

const Key = styled.button`
  height: 68px;
  border: 1px solid var(--border-color);
  border-radius: 22px;
  background: ${(props) =>
    props.$ghost ? "transparent" : "var(--input-color)"};
  color: var(--text-color);
  font-size: 26px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    opacity 0.18s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:active {
    transform: scale(0.97);
  }
`;

const Footer = styled.div`
  padding: 0 24px 24px;
  color: var(--text-muted-color);
  font-size: 12px;
  text-align: center;
`;

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const AppLockPinPad = ({
  open,
  title,
  description,
  valueLength = 0,
  maxLength = 4,
  error,
  loading,
  allowClose = true,
  onClose,
  onDigit,
  onBackspace,
  footer,
}) => {
  if (!open) return null;

  return (
    <Overlay>
      <Dialog>
        <Header>
          {allowClose ? (
            <CloseButton type="button" onClick={onClose}>
              <X size={18} />
            </CloseButton>
          ) : null}
          <IconWrap>
            <Lock size={24} />
          </IconWrap>
          <Title>{title}</Title>
          {description ? <Description>{description}</Description> : null}
        </Header>

        <PinPreview>
          {Array.from({ length: maxLength }).map((_, index) => (
            <PinDot key={index} $filled={index < valueLength} />
          ))}
        </PinPreview>

        <ErrorText>{error || " "}</ErrorText>

        <Keypad>
          {KEYS.map((key) => (
            <Key
              key={key}
              type="button"
              disabled={loading}
              onClick={() => onDigit?.(key)}
            >
              {key}
            </Key>
          ))}
          <Key type="button" $ghost disabled />
          <Key type="button" disabled={loading} onClick={() => onDigit?.("0")}>
            0
          </Key>
          <Key
            type="button"
            disabled={loading || valueLength === 0}
            onClick={onBackspace}
          >
            <Delete size={22} />
          </Key>
        </Keypad>

        {footer ? <Footer>{footer}</Footer> : null}
      </Dialog>
    </Overlay>
  );
};

export default AppLockPinPad;
