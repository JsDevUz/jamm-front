import React, { useEffect, useRef, useState } from "react";
import { Bold, Hash, Italic, Send, X } from "lucide-react";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import { APP_LIMITS, countWords } from "../../../constants/appLimits";
import {
  AuthorName,
  AvatarSmall,
  CharCounter,
  ComposerBody,
  Dialog,
  DialogHeader,
  DialogTitle,
  Overlay,
  Spacer,
  SubmitBtn,
  Textarea,
  TextareaWrapper,
  ToolBtn,
  ToolDivider,
  Toolbar,
} from "../styles/CreatePostDialog.styles";

const CreatePostDialog = ({
  isOpen,
  onClose,
  onSubmit,
  currentUser,
  initialContent = "",
  title = "Yangi Gurung",
  submitLabel = "Yuborish",
}) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setText(initialContent || "");
      setTimeout(() => textareaRef.current?.focus(), 80);
      return;
    }

    setText("");
  }, [initialContent, isOpen]);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    if (countWords(text) > APP_LIMITS.postWords) return;
    await onSubmit(text.trim());
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") onClose();
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      handleSubmit();
    }
  };

  const insertMarkdown = (prefix, suffix = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = text.slice(start, end);
    const before = text.slice(0, start);
    const after = text.slice(end);
    const wrappedText = `${before}${prefix}${selected}${suffix}${after}`;

    if (countWords(wrappedText) > APP_LIMITS.postWords) return;

    setText(wrappedText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  if (!isOpen) return null;

  const displayName = currentUser?.nickname || currentUser?.username || "Siz";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const usedWords = countWords(text);

  return (
    <Overlay onClick={(event) => event.target === event.currentTarget && onClose()}>
      <Dialog>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <ButtonWrapper onClick={onClose}>
            <X size={18} />
          </ButtonWrapper>
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
              ref={textareaRef}
              value={text}
              onChange={(event) => {
                if (countWords(event.target.value) <= APP_LIMITS.postWords) {
                  setText(event.target.value);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="Fikringizni yozing… markdown qo'llab-quvvatlanadi: **qalin**, _kursiv_, #teg"
              spellCheck={false}
            />
            <CharCounter $warn={usedWords > APP_LIMITS.postWords - 10}>
              {usedWords}/{APP_LIMITS.postWords} so'z
            </CharCounter>
          </TextareaWrapper>
        </ComposerBody>

        <Toolbar>
          <ToolBtn title="Qalin (Ctrl+B)" onClick={() => insertMarkdown("**", "**")}>
            <Bold size={15} />
          </ToolBtn>
          <ToolBtn title="Kursiv (Ctrl+I)" onClick={() => insertMarkdown("_", "_")}>
            <Italic size={15} />
          </ToolBtn>
          <ToolBtn title="Teg qo'shish" onClick={() => insertMarkdown("#")}>
            <Hash size={15} />
          </ToolBtn>

          <ToolDivider />

          <Spacer />

          <SubmitBtn disabled={!text.trim()} onClick={handleSubmit}>
            <Send size={14} />
            {submitLabel}
          </SubmitBtn>
        </Toolbar>
      </Dialog>
    </Overlay>
  );
};

export default CreatePostDialog;
