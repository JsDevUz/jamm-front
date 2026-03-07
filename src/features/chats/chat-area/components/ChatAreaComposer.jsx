import React from "react";
import styled from "styled-components";
import { Plus, Smile } from "lucide-react";
import { toast } from "react-hot-toast";
import { CHAT_EMOJIS } from "../constants/emojis";
import { useChatAreaContext } from "../context/ChatAreaContext";

const MessageInputContainer = styled.div`
  padding: 12px 16px 16px;
  background-color: var(--secondary-color);
  border-top: 1px solid var(--border-color);
  position: relative;
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
  background-color: var(--hover-color);
  border-left: 2px solid var(--primary-color);
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 4px;
  font-size: 13px;
  color: var(--text-muted-color);
  position: relative;
  cursor: pointer;
`;

const ReplyPreviewRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReplyPreviewText = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-top: 2px;
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
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
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
  line-height: 20px;
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
  background-color: var(--secondary-color);
  border: 3px solid var(--primary-color);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 12px 24px var(--shadow-color-strong, rgba(0, 0, 0, 0.6));
  z-index: 9999;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 6px;
  max-width: 360px;
  max-height: 240px;
  overflow-y: auto;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--hover-color);
    transform: scale(1.1);
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
      {replyMessage && (
        <ReplyPreview onClick={() => focusReplyTargetMessage(replyMessage.id)}>
          <ReplyPreviewRow>
            <div>
              <ReplyAuthor>{replyMessage.user}</ReplyAuthor>
              <ReplyPreviewText>{replyMessage.content}</ReplyPreviewText>
            </div>
            <CloseReplyButton
              className="replay-close"
              onClick={(event) => {
                event.stopPropagation();
                setReplyMessage(null);
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
          <InputButton onClick={toggleEmojiPicker} className="emoji-button">
            <Smile size={20} />
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
      </InputWrapper>

      {showEmojiPicker && (
        <EmojiPicker className="emoji-picker-container">
          {CHAT_EMOJIS.map((emoji) => (
            <EmojiButton key={emoji} onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </EmojiButton>
          ))}
        </EmojiPicker>
      )}
    </MessageInputContainer>
  );
};

export default ChatAreaComposer;
