import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { X, Send, Bold, Italic, Hash } from "lucide-react";

const overlayIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideUp = keyframes`from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); }`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${overlayIn} 0.2s ease;
  padding: 20px;
`;

const Dialog = styled.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.4);
`;

const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
`;

const DialogTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;

const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--input-color);
  color: var(--text-secondary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
  }
`;

/* ── Composer area (like Threads/Twitter) ── */
const ComposerBody = styled.div`
  padding: 16px 20px;
  display: flex;
  gap: 12px;
`;

const AvatarSmall = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextareaWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AuthorName = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`;

const Textarea = styled.textarea`
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

const CharCounter = styled.div`
  font-size: 12px;
  color: ${(p) => (p.warn ? "#ed4245" : "var(--text-muted-color)")};
  align-self: flex-end;
  font-variant-numeric: tabular-nums;
`;

/* ── Toolbar ── */
const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 20px 16px 20px;
`;

const ToolBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.15s;
  &:hover {
    background: var(--input-color);
    color: var(--primary-color);
  }
`;

const ToolDivider = styled.div`
  width: 1px;
  height: 20px;
  background: var(--border-color);
  margin: 0 4px;
`;

const Spacer = styled.div`
  flex: 1;
`;

const SubmitBtn = styled.button`
  padding: 9px 20px;
  border-radius: 20px;
  background: var(--primary-color);
  color: white;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  opacity: ${(p) => (p.disabled ? 0.4 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.35);
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.5);
  }
`;

const MAX_CHARS = 500;

const CreatePostDialog = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const [text, setText] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => ref.current?.focus(), 80);
    } else {
      setText("");
    }
  }, [isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleSubmit();
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    onClose();
  };

  const insertMarkdown = (prefix, suffix = "") => {
    const el = ref.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = text.slice(start, end);
    const before = text.slice(0, start);
    const after = text.slice(end);
    const wrapped = `${before}${prefix}${selected}${suffix}${after}`;
    if (wrapped.length <= MAX_CHARS) {
      setText(wrapped);
      setTimeout(() => {
        el.focus();
        el.setSelectionRange(start + prefix.length, end + prefix.length);
      }, 0);
    }
  };

  const displayName = currentUser?.nickname || currentUser?.username || "Siz";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const remaining = MAX_CHARS - text.length;

  if (!isOpen) return null;

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <Dialog>
        <DialogHeader>
          <DialogTitle>Yangi Gurung</DialogTitle>
          <CloseBtn onClick={onClose}>
            <X size={16} />
          </CloseBtn>
        </DialogHeader>

        <ComposerBody>
          <AvatarSmall>
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={displayName} />
            ) : (
              avatarLetter
            )}
          </AvatarSmall>
          <TextareaWrapper>
            <AuthorName>{displayName}</AuthorName>
            <Textarea
              ref={ref}
              value={text}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARS) setText(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Fikringizni yozing… markdown qo'llab-quvvatlanadi: **qalin**, _kursiv_, #teg"
              spellCheck={false}
            />
            <CharCounter warn={remaining < 50}>{remaining}</CharCounter>
          </TextareaWrapper>
        </ComposerBody>

        <Toolbar>
          <ToolBtn
            title="Qalin (Ctrl+B)"
            onClick={() => insertMarkdown("**", "**")}
          >
            <Bold size={15} />
          </ToolBtn>
          <ToolBtn
            title="Kursiv (Ctrl+I)"
            onClick={() => insertMarkdown("_", "_")}
          >
            <Italic size={15} />
          </ToolBtn>
          <ToolBtn title="Teg qo'shish" onClick={() => insertMarkdown("#")}>
            <Hash size={15} />
          </ToolBtn>

          <ToolDivider />

          <Spacer />

          <SubmitBtn disabled={!text.trim()} onClick={handleSubmit}>
            <Send size={14} />
            Yuborish
          </SubmitBtn>
        </Toolbar>
      </Dialog>
    </Overlay>
  );
};

export default CreatePostDialog;
