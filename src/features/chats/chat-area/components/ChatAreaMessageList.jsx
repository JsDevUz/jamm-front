import React from "react";
import styled from "styled-components";
import { Check, CheckCheck } from "lucide-react";
import PremiumBadgeIcon from "../../../../shared/ui/badges/PremiumBadge";
import { useChatAreaContext } from "../context/ChatAreaContext";

const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--text-muted-color);
    border-radius: 4px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DateSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;

  span {
    color: var(--text-secondary-color);
    font-size: 12px;
    font-weight: 600;
    padding: 0 16px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: ${(props) => (props.$isOwn ? "flex-end" : "flex-start")};
  cursor: pointer;
  border-radius: 16px;
  padding: 0 5px 5px 0;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
  gap: 8px;
  color: ${(props) =>
    props.$isOwn ? "var(--text-muted-color)" : "var(--text-secondary-color)"};
  justify-content: ${(props) => (props.$isOwn ? "flex-end" : "flex-start")};
`;

const SenderHeaderSpacer = styled.div`
  flex: 1;
  margin-left: 40px;
`;

const ClickableUsername = styled.span`
  color: var(--text-color);
  font-weight: 500;
  cursor: default;
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  flex-shrink: 0;
  cursor: pointer;
`;

const BubbleRow = styled.div`
  display: flex;
  align-items: center;
  max-width: 90%;
`;

const ReplyIndicator = styled.button`
  background: color-mix(in srgb, var(--input-color) 88%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 72%, transparent);
  ${(props) =>
    props.$isOwn
      ? "border-left: 3px solid var(--primary-color);"
      : "border-right: 3px solid var(--primary-color);"}
  padding: 8px 10px;
  margin: 8px 0;
  border-radius: 10px;
  color: var(--text-muted-color);
  cursor: pointer;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isOwn ? "flex-end" : "flex-start")};
  gap: 2px;
  text-align: ${(props) => (props.$isOwn ? "right" : "left")};
  max-width: 320px;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 72%, transparent);
  }
`;

const ReplyIndicatorAuthor = styled.span`
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 700;
`;

const ReplyIndicatorText = styled.span`
  color: var(--text-secondary-color);
  font-size: 12px;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const MessageBubble = styled.div`
  width: fit-content;
  min-width: 60px;
  max-width: 100%;
  padding: 8px 12px;
  border-radius: 12px;
  word-wrap: break-word;
  background-color: ${(props) =>
    props.$isOwn ? "var(--hover-color)" : "var(--input-color)"};
  color: ${(props) => (props.$isOwn ? "white" : "var(--text-color)")};
  text-align: ${(props) => (props.$isOwn ? "right" : "left")};
`;

const MessageText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 2px;
  white-space: pre-wrap;
  text-align: ${(props) => (props.$isOwn ? "right" : "left")};
`;

const EditedIndicator = styled.span`
  font-size: 11px;
  color: var(--text-secondary-color);
  font-style: italic;
  margin-left: 4px;
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const EditInput = styled.input`
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  background-color: color-mix(in srgb, var(--input-color) 72%, transparent);
`;

const LoaderText = styled.h4`
  text-align: center;
  padding: 10px;
  color: var(--text-muted-color);
  margin: 0;
`;

const ReceiptStatus = styled.span`
  margin-left: 4px;
  display: flex;
  align-items: center;
`;

const ChatAreaMessageList = () => {
  const {
    messages,
    messageGroups,
    messagesHasMore,
    isLoadingMessages,
    fetchMoreMessages,
    currentUser,
    currentChat,
    displayChat,
    selectedNav,
    messageRefs,
    messagesEndRef,
    editingMessage,
    editInput,
    setEditInput,
    handleEditMessage,
    handleMessageDoubleClick,
    renderMessageContent,
    focusReplyTargetMessage,
    showContextMenu,
    handleUsernameClick,
    getUserAvatar,
    formatDate,
  } = useChatAreaContext();

  const handleMessagesScroll = (event) => {
    const element = event.currentTarget;
    if (element.scrollTop > 120 || isLoadingMessages || !messagesHasMore) {
      return;
    }

    fetchMoreMessages();
  };

  return (
    <ScrollArea>
      <MessagesContainer
        id="scrollableChatArea"
        onContextMenu={(event) => event.preventDefault()}
        onScroll={handleMessagesScroll}
      >
        {isLoadingMessages && messages.length > 0 ? (
          <LoaderText>Oldingi xabarlar yuklanmoqda...</LoaderText>
        ) : null}
        <MessageContainer>
          {messageGroups.map((group, index) => {
            if (group.type === "date") {
              return (
                <DateSeparator key={`date-${index}`}>
                  <span>{formatDate(group.date)}</span>
                </DateSeparator>
              );
            }

            const currentUserId = currentUser?._id || currentUser?.id;
            const senderId =
              group.senderId && typeof group.senderId === "object"
                ? group.senderId._id || group.senderId.id
                : group.senderId;
            const isOwnMessage =
              currentUserId && String(senderId) === String(currentUserId);

            return (
              <MessageWrapper
                key={group.id}
                data-message-id={group.id}
                $isOwn={isOwnMessage}
                onClick={() => handleMessageDoubleClick(group)}
                ref={(element) => {
                  messageRefs.current[group.id] = element;
                }}
              >
                {!isOwnMessage && displayChat?.type === "group" && (
                  <MessageHeader $isOwn={false}>
                    <SenderHeaderSpacer>
                      <ClickableUsername>
                        {group.user}
                        {group.senderId?.premiumStatus === "active" && (
                          <PremiumBadgeIcon width={14} height={14} />
                        )}
                      </ClickableUsername>
                    </SenderHeaderSpacer>
                  </MessageHeader>
                )}

                {group.replayTo && (
                  <ReplyIndicator
                    type="button"
                    $isOwn={isOwnMessage}
                    onClick={(event) => {
                      event.stopPropagation();
                      const originalMessage = messages.find(
                        (message) =>
                          String(message.id || message._id) ===
                          String(group.replayTo.id),
                      );
                      if (originalMessage) {
                        focusReplyTargetMessage(originalMessage.id);
                      }
                    }}
                  >
                    <ReplyIndicatorAuthor>
                      {group.replayTo.user}
                    </ReplyIndicatorAuthor>
                    <ReplyIndicatorText>
                      {group.replayTo.content}
                    </ReplyIndicatorText>
                  </ReplyIndicator>
                )}

                <BubbleRow>
                  {!isOwnMessage && selectedNav === "groups" && (
                    <UserAvatar
                      onClick={(event) =>
                        handleUsernameClick(group.user, event)
                      }
                    >
                      {getUserAvatar(group.user)}
                    </UserAvatar>
                  )}

                  <MessageBubble
                    $isOwn={isOwnMessage}
                    onContextMenu={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      showContextMenu(group, event);
                    }}
                  >
                    {editingMessage?.id === group.id ? (
                      <EditContainer>
                        <EditInput
                          className="edit-input"
                          type="text"
                          value={editInput}
                          onChange={(event) => setEditInput(event.target.value)}
                          onKeyDown={handleEditMessage}
                          placeholder="Xabarni tahrirlang..."
                          maxLength={400}
                          autoFocus
                        />
                      </EditContainer>
                    ) : (
                      <>
                        <MessageText $isOwn={isOwnMessage}>
                          {renderMessageContent(group.content)}
                        </MessageText>
                        {group.edited && (
                          <EditedIndicator>(tahrirlandi)</EditedIndicator>
                        )}
                      </>
                    )}
                  </MessageBubble>
                </BubbleRow>

                <MessageHeader $isOwn={isOwnMessage}>
                  <span>{group.timestamp}</span>
                  {isOwnMessage && !group.isDeleted && (
                    <ReceiptStatus>
                      {group.readBy && group.readBy.length > 0 ? (
                        <CheckCheck
                          size={14}
                          color="var(--success-color, var(--primary-color))"
                        />
                      ) : (
                        <Check size={14} color="var(--text-secondary-color)" />
                      )}
                    </ReceiptStatus>
                  )}
                </MessageHeader>
              </MessageWrapper>
            );
          })}
        </MessageContainer>
        <div ref={messagesEndRef} />
      </MessagesContainer>
    </ScrollArea>
  );
};

export default ChatAreaMessageList;
