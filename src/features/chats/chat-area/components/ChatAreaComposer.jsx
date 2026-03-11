import React from "react";
import styled from "styled-components";
import { Plus, Smile, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { CHAT_EMOJIS } from "../constants/emojis";
import { useChatAreaContext } from "../context/ChatAreaContext";

const MessageInputContainer = styled.div`
  padding: 12px 16px 16px;
  background-color: var(--secondary-color);
  border-top: 1px solid var(--border-color);
  position: relative;
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

  &:focus-within {
    background-color: var(--hover-color);
  }
`;

const InputButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
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

  &:hover {
    color: var(--text-color);
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
`;

const EmojiPicker = styled.div`
  position: fixed;
  bottom: 100px;
  right: 40px;
  width: min(360px, calc(100vw - 24px));
  background: var(--secondary-color-with-opacity);
  border: 1px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  border-radius: 18px;
  padding: 12px;
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  backdrop-filter: blur(2px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: min(420px, calc(100vh - 140px));
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    right: 12px;
    left: 12px;
    bottom: 88px;
    width: auto;
  }
`;

const EmojiPickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: sticky;
  top: -12px;
  z-index: 2;
  margin: -12px -12px 0;
  padding: 12px;
  background:    var(--secondary-color-with-opacity);
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 62%, transparent);
  backdrop-filter: blur(5px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
`;

const EmojiPickerTitleBlock = styled.div`
  min-width: 0;
`;

const EmojiPickerTitle = styled.div`
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
`;

const EmojiPickerHint = styled.div`
  color: var(--text-secondary-color);
  font-size: 12px;
  margin-top: 2px;
`;

const EmojiPickerClose = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background: color-mix(in srgb, var(--input-color) 82%, transparent);
  color: var(--text-secondary-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 74%, transparent);
    color: var(--text-color);
  }
`;

const EmojiSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EmojiSectionLabel = styled.div`
  color: var(--text-secondary-color);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0 4px;
`;

const EmojiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 6px;
`;

const EmojiButton = styled.button`
  background: color-mix(in srgb, var(--input-color) 76%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 70%, transparent);
  font-size: 22px;
  cursor: pointer;
  padding: 8px;
  border-radius: 12px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 78%, transparent);
    border-color: color-mix(in srgb, var(--primary-color) 26%, var(--border-color));
    transform: translateY(-1px) scale(1.04);
  }
`;

const ChatAreaComposer = () => {
  const {
    currentChat,
    previewChat,
    navigate,
    joinGroupChat,
    replyMessage,
    setReplyMessage,
    focusReplyTargetMessage,
    toggleEmojiPicker,
    showEmojiPicker,
    handleEmojiClick,
    messageInputRef,
    messageInput,
    handleInputChange,
    handleSendMessage,
  } = useChatAreaContext();
  const emojiSections = [
    { label: "Faces", emojis: CHAT_EMOJIS.slice(0, 35) },
    { label: "Mood", emojis: CHAT_EMOJIS.slice(35, 80) },
    { label: "Fun", emojis: CHAT_EMOJIS.slice(80) },
  ];

  if (previewChat && !currentChat && previewChat.type !== "user") {
    return (
      <MessageInputContainer>
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
    <MessageInputContainer>
      <ComposerStack>
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
                    messageInputRef.current?.focus();
                  }, 0);
                }}
              >
                ✕
              </CloseReplyButton>
            </ReplyPreviewRow>
          </ReplyPreview>
        )}

        <InputWrapper>
          <InputButtons>
            <InputButton>
              <Plus size={20} />
            </InputButton>
          
          </InputButtons>

          <MessageInput
            id="message-input"
            ref={messageInputRef}
            value={messageInput}
            onChange={handleInputChange}
            onKeyDown={handleSendMessage}
            placeholder="Xabar..."
            rows={1}
            maxLength={400}
          />
          <InputButtons>
         
            <InputButton onClick={toggleEmojiPicker} className="emoji-button">
              <Smile size={20} />
            </InputButton>
          </InputButtons>
        </InputWrapper>
      </ComposerStack>

      {showEmojiPicker && (
        <EmojiPicker className="emoji-picker-container">
          <EmojiPickerHeader>
            <EmojiPickerTitleBlock>
              <EmojiPickerTitle>Emoji</EmojiPickerTitle>
              <EmojiPickerHint>Tez qo‘shish uchun bosing</EmojiPickerHint>
            </EmojiPickerTitleBlock>
            <EmojiPickerClose type="button" onClick={toggleEmojiPicker}>
              <X size={16} />
            </EmojiPickerClose>
          </EmojiPickerHeader>

          {emojiSections.map((section) => (
            <EmojiSection key={section.label}>
              <EmojiSectionLabel>{section.label}</EmojiSectionLabel>
              <EmojiGrid>
                {section.emojis.map((emoji, index) => (
                  <EmojiButton
                    key={`${section.label}-${emoji}-${index}`}
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </EmojiButton>
                ))}
              </EmojiGrid>
            </EmojiSection>
          ))}
        </EmojiPicker>
      )}
    </MessageInputContainer>
  );
};

export default ChatAreaComposer;
