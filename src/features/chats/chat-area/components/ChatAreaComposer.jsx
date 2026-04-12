// ✅ iOS Safari ✅ Android Chrome ✅ visualViewport API
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Plus, SendHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";
import { useChatAreaContext } from "../context/ChatAreaContext";

const MessageInputContainer = styled.div`
  padding: 12px 16px
    ${(props) =>
      props.$keyboardOpen
        ? "0px"
        : "calc(8px + env(safe-area-inset-bottom, 0px))"};
  background-color: var(--secondary-color);
  border-top: 1px solid var(--border-color);
  position: relative;
  transition:
    padding-bottom 0.25s ease,
    border-color 0.25s ease;

  @media (max-width: 768px) {
    padding: 8px 12px
      ${(props) =>
        props.$keyboardOpen
          ? "0px"
          : "calc(8px + env(safe-area-inset-bottom, 0px))"};
  }
`;

const ComposerStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const JoinPreview = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const JoinPreviewText = styled.div`
  color: var(--text-muted-color);
`;

const JoinPreviewButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
`;

const ReplyPreview = styled.div`
  background: color-mix(in srgb, var(--secondary-color) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 84%, transparent);
  border-left: 3px solid var(--primary-color);
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 13px;
  color: var(--text-muted-color);
  cursor: pointer;
  box-shadow: inset 0 1px 0 color-mix(in srgb, white 8%, transparent);
`;

const ReplyPreviewRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const ReplyPreviewBody = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const ReplyPreviewText = styled.div`
  font-size: 12px;
  color: var(--text-secondary-color);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const ReplyAuthor = styled.strong`
  color: var(--primary-color);
`;

const CloseReplyButton = styled.span`
  color: var(--text-secondary-color);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 2px;
  flex-shrink: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--input-color);
  border-radius: 20px;
  padding: 8px 12px;
  min-height: 44px;
  transition: background-color 0.2s ease;
  opacity: ${(props) => (props.$disabled ? 0.72 : 1)};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};

  &:focus-within {
    background-color: var(--hover-color);
  }
`;

const InputButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  flex-shrink: 0;
  min-width: ${(props) => (props.$side === "right" ? "72px" : "0px")};
  justify-content: ${(props) =>
    props.$side === "right" ? "flex-end" : "flex-start"};
  margin-right: ${(props) => (props.$side === "left" ? "16px" : "0")};
  margin-left: ${(props) => (props.$side === "right" ? "16px" : "0")};
`;

const InputButton = styled.button`
  color: var(--text-muted-color);
  cursor: pointer;
  transition: color 0.2s ease;
  border: none;
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  opacity: ${(props) => (props.disabled ? 0.45 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    color: var(--text-color);
  }
`;

const InlineTooltip = styled.div`
  position: absolute;
  left: 0;
  bottom: calc(100% + 10px);
  padding: 8px 10px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--secondary-color) 92%, black 8%);
  border: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
  color: var(--text-color);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
  z-index: 12;
  pointer-events: none;
`;

const SendButton = styled(InputButton)`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  flex-shrink: 0;
  opacity: ${(props) => (props.disabled ? 0.45 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};

  &:hover {
    color: white;
    filter: brightness(1.06);
  }
`;

const MessageInput = styled.textarea`
  flex: 1;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 15px;
  line-height: 25px;
  outline: none;
  resize: none;
  min-height: 25px;
  max-height: 400px;
  padding: 0;
  font-family: inherit;

  &::placeholder {
    color: var(--text-secondary-color);
  }

  &:disabled,
  &:read-only {
    cursor: not-allowed;
  }

  -webkit-overflow-scrolling: touch;
`;

const ChatAreaComposer = ({
  keyboardHeight = 0,
  keyboardOpen = false,
}) => {
  const [showComingSoonTooltip, setShowComingSoonTooltip] = useState(false);
  const {
    currentChat,
    previewChat,
    navigate,
    joinGroupChat,
    replyMessage,
    setReplyMessage,
    editingMessage,
    cancelEditMessage,
    focusReplyTargetMessage,
    submitMessage,
    messageInputRef,
    messageInput,
    handleInputChange,
    handleSendMessage,
    isLoadingMessages,
  } = useChatAreaContext();
  const isComposerDisabled = Boolean(currentChat?.id) && isLoadingMessages;
  const canSend = Boolean(messageInput.trim()) && !isComposerDisabled;
  const focusMessageInput = () => {
    if (!messageInputRef.current) return;

    messageInputRef.current.focus({ preventScroll: true });
    const caretPosition = messageInputRef.current.value.length;
    messageInputRef.current.setSelectionRange(caretPosition, caretPosition);
  };

  useEffect(() => {
    if (!showComingSoonTooltip) return undefined;

    const timer = window.setTimeout(() => {
      setShowComingSoonTooltip(false);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [showComingSoonTooltip]);

  if (previewChat && !currentChat && previewChat.type !== "user") {
    return (
      <MessageInputContainer $keyboardOpen={keyboardOpen}>
        <JoinPreview>
          <JoinPreviewText>Siz ushbu guruh a'zosi emassiz</JoinPreviewText>
          <JoinPreviewButton
            onClick={async () => {
              try {
                await joinGroupChat(previewChat.privateurl || previewChat.jammId);
                navigate(
                  `/groups/${previewChat.jammId || previewChat.privateurl}`,
                  { replace: true },
                );
              } catch (error) {
                toast.error(error.message || "Xatolik yuz berdi");
              }
            }}
          >
            Guruhga qo'shilish
          </JoinPreviewButton>
        </JoinPreview>
      </MessageInputContainer>
    );
  }

  return (
    <MessageInputContainer $keyboardOpen={keyboardOpen}>
      <ComposerStack>
        {editingMessage && (
          <ReplyPreview>
            <ReplyPreviewRow>
              <ReplyPreviewBody>
                <ReplyAuthor>Tahrirlanmoqda</ReplyAuthor>
                <ReplyPreviewText>{editingMessage.content}</ReplyPreviewText>
              </ReplyPreviewBody>
              <CloseReplyButton
                className="edit-close"
                onClick={(event) => {
                  event.stopPropagation();
                  cancelEditMessage();
                }}
              >
                ✕
              </CloseReplyButton>
            </ReplyPreviewRow>
          </ReplyPreview>
        )}
        {replyMessage && (
          <ReplyPreview onClick={() => focusReplyTargetMessage(replyMessage.id)}>
            <ReplyPreviewRow>
              <ReplyPreviewBody>
                <ReplyAuthor>{replyMessage.user}</ReplyAuthor>
                <ReplyPreviewText>{replyMessage.content}</ReplyPreviewText>
              </ReplyPreviewBody>
              <CloseReplyButton
              className="replay-close"
              onClick={(event) => {
                event.stopPropagation();
                setReplyMessage(null);
                setTimeout(() => {
                    focusMessageInput();
                  }, 0);
                }}
              >
                ✕
              </CloseReplyButton>
            </ReplyPreviewRow>
          </ReplyPreview>
        )}

        <InputWrapper $disabled={isComposerDisabled}>
          <InputButtons $side="left">
            {showComingSoonTooltip ? (
              <InlineTooltip>Tez kunda...</InlineTooltip>
            ) : null}
            <InputButton
              type="button"
              disabled={isComposerDisabled}
              onClick={() => setShowComingSoonTooltip(true)}
              title="Tez kunda..."
              aria-label="Tez kunda..."
            >
              <Plus size={20} />
            </InputButton>
          </InputButtons>

          <MessageInput
            id="message-input"
            ref={messageInputRef}
            value={messageInput}
            onChange={handleInputChange}
            onKeyDown={handleSendMessage}
            readOnly={isComposerDisabled}
            disabled={isComposerDisabled}
            placeholder={isComposerDisabled ? "Suhbat yuklanmoqda..." : "Xabar..."}
            rows={1}
            maxLength={400}
            style={{
              scrollPaddingBottom: `${keyboardHeight}px`,
            }}
          />
          <InputButtons $side="right">
           
            <SendButton
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => submitMessage({ keepFocus: true })}
              disabled={!canSend}
              $visible={canSend}
              title={editingMessage ? "Tahrirni saqlash" : "Yuborish"}
              aria-label={editingMessage ? "Tahrirni saqlash" : "Yuborish"}
            >
              <SendHorizontal size={16} />
            </SendButton>
          </InputButtons>
        </InputWrapper>
      </ComposerStack>
    </MessageInputContainer>
  );
};

export default ChatAreaComposer;
