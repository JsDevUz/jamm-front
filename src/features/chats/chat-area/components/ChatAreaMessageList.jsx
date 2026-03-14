import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
  Check,
  CheckCheck,
  ChevronDown,
  MoreVertical,
  Timer,
  X,
} from "lucide-react";
import PremiumBadgeIcon from "../../../../shared/ui/badges/PremiumBadge";
import { useChatAreaContext } from "../context/ChatAreaContext";
import useKeyboardAvoid from "../../../../shared/hooks/useKeyboardAvoid";

const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
  position: relative;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 8px calc(20px + env(safe-area-inset-bottom, 0px));
  display: flex;
  flex-direction: column;
  min-height: 0;
  -webkit-overflow-scrolling: touch;
  scroll-padding-bottom: calc(92px + env(safe-area-inset-bottom, 0px));
  transition:
    padding-bottom 0.25s ease,
    scroll-padding-bottom 0.25s ease;

  html[data-mobile-keyboard-open="true"] & {
    padding-bottom: calc(96px + env(safe-area-inset-bottom, 0px));
    scroll-padding-bottom: calc(124px + env(safe-area-inset-bottom, 0px));
  }

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
  flex-shrink: 0;
  cursor: pointer;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const BubbleRow = styled.div`
  display: flex;
  align-items: flex-end;
  max-width: 90%;
  gap: 6px;
  flex-direction: ${(props) => (props.$isOwn ? "row-reverse" : "row")};
`;

const MessageContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isOwn ? "flex-end" : "flex-start")};
  min-width: 0;
  max-width: 100%;
  gap: 6px;
`;

const MessageActionsButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  color: var(--text-secondary-color);
  background: transparent;
  opacity: 0.72;
  transition:
    opacity 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease;

  &:hover {
    opacity: 1;
    color: var(--text-color);
    background: color-mix(in srgb, var(--input-color) 76%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 34px;
    height: 34px;
    opacity: 0.95;
    background: color-mix(in srgb, var(--input-color) 58%, transparent);
  }
`;

const ReplyIndicator = styled.button`
  width: 100%;
  background: 
  ${(props) =>
    props.$isOwn
      ? "color-mix(in srgb, white 10%, var(--hover-color))"
      : "color-mix(in srgb, var(--primary-color) 12%, var(--input-color))"};
  box-shadow: 
  ${(props) =>
    props.$isOwn
      ? "inset 2px 0 0 color-mix(in srgb, white 28%, transparent)"
      : "inset 2px 0 0 var(--primary-color)"};
  border: none;
  padding: 4px 12px;
  margin: 0;
  border-radius: 10px;
  color: var(--text-muted-color);
  cursor: pointer;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isOwn ? "flex-end" : "flex-start")};
  text-align: ${(props) => (props.$isOwn ? "right" : "left")};
  max-width: 320px;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 72%, transparent);
  }
`;

const SenderInlineName = styled.div`
  color: ${(props) =>
    props.$isOwn
      ? "color-mix(in srgb, white 88%, transparent)"
      : "var(--primary-color)"};
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 8px;
`;

const ReplyIndicatorAuthor = styled.span`
  color: 
  ${(props) =>
    props.$isOwn
      ? "color-mix(in srgb, white 88%, transparent)"
      : "var(--primary-color)"};
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
  position: relative;
  width: fit-content;
  min-width: 60px;
  max-width: 100%;
  padding: ${(props) => (props.$hasReply ? "7px 10px" : "8px 12px")};
  border-radius: ${(props) => (props.$hasReply ? "10px" : "10px")};
  word-wrap: break-word;
  background-color: ${(props) =>
    props.$isOwn ? "var(--hover-color)" : "var(--input-color)"};
  color: ${(props) => (props.$isOwn ? "white" : "var(--text-color)")};
  text-align: ${(props) => (props.$isOwn ? "right" : "left")};
  transform: translateX(${(props) => props.$swipeOffset ?? 0}px);
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    opacity 0.18s ease;
  opacity: ${(props) => (props.$navigating ? 0.72 : 1)};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: ${(props) =>
      props.$navigating
        ? "color-mix(in srgb, var(--hover-color) 58%, transparent)"
        : "transparent"};
    transition: background-color 0.18s ease;
    pointer-events: none;
  }
`;

const MessageText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 2px;
  white-space: pre-wrap;
  text-align: ${(props) => (props.$isOwn ? "right" : "left")};
`;

const RepliedMessageRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const RepliedMessageText = styled(MessageText)`
  flex: 1;
  min-width: 0;
  margin-bottom: 0;
`;

const InlineTimestamp = styled.span`
  flex-shrink: 0;
  font-size: 11px;
  line-height: 1;
  color: ${(props) =>
    props.$isOwn
      ? "color-mix(in srgb, white 74%, transparent)"
      : "var(--text-secondary-color)"};
`;

const EditedIndicator = styled.span`
  font-size: 11px;
  color: var(--text-secondary-color);
  font-style: italic;
  margin-left: 4px;
`;

const LoaderText = styled.h4`
  text-align: center;
  padding: 10px;
  color: var(--text-muted-color);
  margin: 0;
`;

const InitialLoaderState = styled.div`
  flex: 1;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-secondary-color);
  font-size: 14px;
  font-weight: 600;
`;

const ReceiptStatus = styled.span`
  margin-left: 4px;
  display: flex;
  align-items: center;
`;

const FailedReceiptButton = styled.button`
  margin-left: 4px;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  background: color-mix(in srgb, #ef4444 14%, transparent);
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease;

  &:hover {
    color: #f87171;
    background: color-mix(in srgb, #ef4444 20%, transparent);
  }

  &:active {
    transform: scale(0.94);
  }
`;

const NewMessagesButton = styled.button`
  position: absolute;
  right: 16px;
  bottom: calc(92px + env(safe-area-inset-bottom, 0px));
  z-index: 6;
  border: none;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hover-color) 92%, transparent);
  color: white;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.24);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease,
    background-color 0.18s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  html[data-mobile-keyboard-open="true"] & {
    bottom: calc(136px + env(safe-area-inset-bottom, 0px));
  }

  @media (max-width: 768px) {
    right: 12px;
    bottom: calc(96px + env(safe-area-inset-bottom, 0px));
    padding: 10px;
  }
`;

const NewMessagesChip = styled.span`
  min-width: 20px;
  height: 20px;
  border-radius: 999px;
  background: white;
  color: var(--hover-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  padding: 0 6px;
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
    handleMessageDoubleClick,
    renderMessageContent,
    focusReplyTargetMessage,
    showContextMenu,
    setReplyMessage,
    messageInputRef,
    handleUsernameClick,
    handleMemberProfileOpen,
    getUserAvatar,
    formatDate,
    navigatingMessageId,
    dismissLocalMessage,
  } = useChatAreaContext();
  const suppressClickRef = useRef(false);
  const swipeGestureRef = useRef(null);
  const autoFillAttemptsRef = useRef(0);
  const scrollContainerRef = useRef(null);
  const shouldStickToBottomRef = useRef(true);
  const previousContainerHeightRef = useRef(0);
  const previousLastMessageIdRef = useRef(null);
  const previousMessageCountRef = useRef(0);
  const [swipeState, setSwipeState] = useState({ messageId: null, offset: 0 });
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const { keyboardHeight } = useKeyboardAvoid();
  const currentChatMembers = useMemo(
    () => currentChat?.members || [],
    [currentChat?.members],
  );

  const isNearBottom = (element, threshold = 96) => {
    if (!element) return true;

    return (
      element.scrollHeight - element.scrollTop - element.clientHeight <= threshold
    );
  };

  const scrollToBottom = (behavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
  };

  useEffect(() => {
    autoFillAttemptsRef.current = 0;
    previousLastMessageIdRef.current = null;
    previousMessageCountRef.current = 0;
    setNewMessagesCount(0);
  }, [currentChat?.id]);

  const resetSwipeState = () => {
    swipeGestureRef.current = null;
    setSwipeState({ messageId: null, offset: 0 });
  };

  const handleTouchStart = (group, event) => {
    if (!event.touches?.length) return;

    const touch = event.touches[0];
    swipeGestureRef.current = {
      messageId: group.id,
      startX: touch.clientX,
      startY: touch.clientY,
      offset: 0,
      isHorizontal: false,
    };
    setSwipeState({ messageId: group.id, offset: 0 });
    longPressTimerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = true;
      suppressClickRef.current = true;
      resetSwipeState();
      showContextMenu(group, {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
    }, 3000);
  };

  const triggerReply = (message) => {
    setReplyMessage(message);
    setTimeout(() => {
      if (!messageInputRef?.current) return;
      messageInputRef.current.focus();
      messageInputRef.current.setSelectionRange(
        messageInputRef.current.value.length,
        messageInputRef.current.value.length,
      );
    }, 0);
  };

  const handleTouchMove = (group, event) => {
    if (!event.touches?.length || !swipeGestureRef.current) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - swipeGestureRef.current.startX;
    const deltaY = touch.clientY - swipeGestureRef.current.startY;

    if (
      !swipeGestureRef.current.isHorizontal &&
      Math.abs(deltaY) > Math.abs(deltaX) &&
      Math.abs(deltaY) > 10
    ) {
      resetSwipeState();
      return;
    }

    if (Math.abs(deltaX) < 10) return;

    swipeGestureRef.current.isHorizontal = true;

    const nextOffset = Math.max(-92, Math.min(0, deltaX));
    swipeGestureRef.current.offset = nextOffset;
    setSwipeState({ messageId: group.id, offset: nextOffset });
  };

  const handleTouchEnd = (group) => {
    const finalOffset = swipeGestureRef.current?.offset ?? 0;
    const shouldReply = finalOffset <= -72;

    resetSwipeState();

    if (shouldReply) {
      suppressClickRef.current = true;
      triggerReply(group);
    }

    if (shouldReply) {
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const handleMessagesScroll = (event) => {
    const element = event.currentTarget;
    shouldStickToBottomRef.current = isNearBottom(element);

    if (shouldStickToBottomRef.current) {
      setNewMessagesCount(0);
    }

    if (element.scrollTop > 120 || isLoadingMessages || !messagesHasMore) {
      return;
    }

    fetchMoreMessages();
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    shouldStickToBottomRef.current = isNearBottom(scrollContainer);
    if (shouldStickToBottomRef.current) {
      setNewMessagesCount(0);
    }
  }, [messages.length]);

  useEffect(() => {
    const currentUserId = String(currentUser?._id || currentUser?.id || "");
    const lastMessage = messages[messages.length - 1];
    const lastMessageId = lastMessage?.id || lastMessage?._id || null;
    const previousLastMessageId = previousLastMessageIdRef.current;
    const previousMessageCount = previousMessageCountRef.current;

    if (!lastMessageId) {
      previousLastMessageIdRef.current = null;
      previousMessageCountRef.current = messages.length;
      return;
    }

    if (!previousLastMessageId) {
      previousLastMessageIdRef.current = lastMessageId;
      previousMessageCountRef.current = messages.length;
      return;
    }

    const appendedAtBottom =
      messages.length >= previousMessageCount &&
      String(lastMessageId) !== String(previousLastMessageId);

    if (appendedAtBottom) {
      const appendedMessages = messages
        .slice(previousMessageCount)
        .filter((message) => {
          const senderId = String(
            (message?.senderId?._id || message?.senderId?.id || message?.senderId || ""),
          );

          return (
            senderId &&
            senderId !== currentUserId &&
            message?.deliveryStatus !== "failed"
          );
        });

      if (appendedMessages.length > 0) {
        if (shouldStickToBottomRef.current) {
          setNewMessagesCount(0);
        } else {
          setNewMessagesCount((previous) => previous + appendedMessages.length);
        }
      }
    }

    previousLastMessageIdRef.current = lastMessageId;
    previousMessageCountRef.current = messages.length;
  }, [messages, currentUser?._id, currentUser?.id]);

  const handleJumpToBottom = () => {
    setNewMessagesCount(0);
    shouldStickToBottomRef.current = true;
    scrollToBottom("smooth");
  };

  useEffect(() => {
    if (!keyboardHeight || !shouldStickToBottomRef.current) return;

    const isIOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream;
    const delay = isIOS ? 360 : 80;
    const timer = window.setTimeout(() => {
      scrollToBottom("smooth");
    }, delay);

    return () => window.clearTimeout(timer);
  }, [keyboardHeight]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    previousContainerHeightRef.current = scrollContainer.clientHeight;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const nextHeight =
        entry?.contentRect?.height || scrollContainer.clientHeight || 0;
      const previousHeight = previousContainerHeightRef.current || nextHeight;
      const delta = nextHeight - previousHeight;

      previousContainerHeightRef.current = nextHeight;

      if (!shouldStickToBottomRef.current || Math.abs(delta) < 4) {
        return;
      }

      window.requestAnimationFrame(() => {
        scrollToBottom("auto");

        window.setTimeout(() => {
          scrollToBottom("smooth");
        }, 120);
      });
    });

    observer.observe(scrollContainer);

    return () => {
      observer.disconnect();
    };
  }, [currentChat?.id]);

  useEffect(() => {
    const scrollContainer = document.getElementById("scrollableChatArea");

    if (
      !scrollContainer ||
      !currentChat?.id ||
      isLoadingMessages ||
      !messagesHasMore ||
      messages.length === 0
    ) {
      return;
    }

    if (scrollContainer.scrollHeight > scrollContainer.clientHeight + 16) {
      autoFillAttemptsRef.current = 0;
      return;
    }

    if (autoFillAttemptsRef.current >= 10) {
      return;
    }

    autoFillAttemptsRef.current += 1;
    fetchMoreMessages();
  }, [
    currentChat?.id,
    fetchMoreMessages,
    isLoadingMessages,
    messages.length,
    messagesHasMore,
  ]);

  const handleOpenMessageMenu = (message, event) => {
    event.preventDefault();
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    showContextMenu(message, {
      clientX: rect.left + rect.width / 2,
      clientY: rect.bottom + 8,
    });
  };

  const renderReplyPreview = (group, isOwnMessage) => {
    if (!group.replayTo) return null;

    return (
      <ReplyIndicator
        type="button"
        $isOwn={isOwnMessage}
        onClick={(event) => {
          event.stopPropagation();
          const originalMessage = messages.find(
            (message) =>
              String(message.id || message._id) === String(group.replayTo.id),
          );
          if (originalMessage) {
            focusReplyTargetMessage(originalMessage.id);
          }
        }}
      >
        <ReplyIndicatorAuthor $isOwn={isOwnMessage}>{group.replayTo.user}</ReplyIndicatorAuthor>
        <ReplyIndicatorText>{group.replayTo.content}</ReplyIndicatorText>
      </ReplyIndicator>
    );
  };

  return (
    <ScrollArea>
      <MessagesContainer
        id="scrollableChatArea"
        ref={scrollContainerRef}
        onContextMenu={(event) => event.preventDefault()}
        onScroll={handleMessagesScroll}
      >
        {isLoadingMessages && messages.length === 0 ? (
          <InitialLoaderState>Xabarlar yuklanmoqda...</InitialLoaderState>
        ) : null}
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
            const senderMember = !isOwnMessage
              ? currentChatMembers.find(
                  (member) =>
                    String(member?._id || member?.id || "") ===
                    String(senderId || ""),
                )
              : null;
            const avatarSource =
              senderMember?.avatar ||
              (typeof group.avatar === "string" && group.avatar.length > 1
                ? group.avatar
                : "");
            const senderDisplayName =
              senderMember?.nickname ||
              senderMember?.username ||
              senderMember?.name ||
              group.user;

            return (
              <MessageWrapper
                key={group.id}
                data-message-id={group.id}
                $isOwn={isOwnMessage}
                onClick={(event) => {
                  if (suppressClickRef.current) {
                    event.preventDefault();
                    event.stopPropagation();
                    suppressClickRef.current = false;
                    return;
                  }

                  handleMessageDoubleClick(group, event);
                }}
                ref={(element) => {
                  messageRefs.current[group.id] = element;
                }}
              >
                <BubbleRow $isOwn={isOwnMessage}>
                  {!isOwnMessage && selectedNav === "groups" && (
                    <UserAvatar
                      onClick={(event) =>
                        handleMemberProfileOpen(
                          senderMember || {
                            _id: senderId,
                            id: senderId,
                          },
                          event,
                        )
                      }
                      title={`${senderDisplayName} profilini ochish`}
                      aria-label={`${senderDisplayName} profilini ochish`}
                    >
                      {avatarSource ? (
                        <img src={avatarSource} alt={senderDisplayName} />
                      ) : (
                        getUserAvatar(group.user)
                      )}
                    </UserAvatar>
                  )}

                  <MessageContentColumn $isOwn={isOwnMessage}>
                    <MessageBubble
                      $isOwn={isOwnMessage}
                      $hasReply={Boolean(group.replayTo)}
                      $navigating={navigatingMessageId === group.id}
                      $swipeOffset={
                        swipeState.messageId === group.id
                          ? swipeState.offset
                          : 0
                      }
                      onContextMenu={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        showContextMenu(group, event);
                      }}
                      onTouchStart={(event) => handleTouchStart(group, event)}
                      onTouchEnd={() => handleTouchEnd(group)}
                      onTouchCancel={() => handleTouchEnd(group)}
                      onTouchMove={(event) => handleTouchMove(group, event)}
                    >
                      <>
                        {!isOwnMessage && displayChat?.type === "group" && (
                          <SenderInlineName>
                            {group.user}
                            {group.senderId?.premiumStatus === "active" && (
                              <PremiumBadgeIcon width={14} height={14} />
                            )}
                          </SenderInlineName>
                        )}
                        {renderReplyPreview(group, isOwnMessage)}
                        {group.replayTo ? (
                          <RepliedMessageRow>
                            <RepliedMessageText $isOwn={isOwnMessage}>
                            {renderMessageContent(group.content, group.id)}
                          </RepliedMessageText>
                            <InlineTimestamp $isOwn={isOwnMessage}>
                              {group.timestamp}
                            </InlineTimestamp>
                          </RepliedMessageRow>
                        ) : (
                          <MessageText $isOwn={isOwnMessage}>
                            {renderMessageContent(group.content, group.id)}
                          </MessageText>
                        )}
                        {group.edited && (
                          <EditedIndicator>(tahrirlandi)</EditedIndicator>
                        )}
                      </>
                    </MessageBubble>
                  </MessageContentColumn>

                  <MessageActionsButton
                    type="button"
                    aria-label="Xabar amallari"
                    onClick={(event) => handleOpenMessageMenu(group, event)}
                  >
                    <MoreVertical size={16} />
                  </MessageActionsButton>
                </BubbleRow>

                <MessageHeader $isOwn={isOwnMessage}>
                  {!group.replayTo && <span>{group.timestamp}</span>}
                  {isOwnMessage && !group.isDeleted && (
                    <ReceiptStatus>
                      {group.deliveryStatus === "failed" ? (
                        <FailedReceiptButton
                          type="button"
                          title="Yuborilmadi. Olib tashlash"
                          aria-label="Yuborilmadi. Olib tashlash"
                          onClick={(event) => {
                            event.stopPropagation();
                            dismissLocalMessage(group.id);
                          }}
                        >
                          <X size={12} />
                        </FailedReceiptButton>
                      ) : group.deliveryStatus === "pending" ? (
                        <Timer
                          size={14}
                          color="var(--text-secondary-color)"
                        />
                      ) : group.readBy && group.readBy.length > 0 ? (
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
        <div
          ref={messagesEndRef}
          style={{ height: "1px", flexShrink: 0, scrollMarginBottom: "124px" }}
        />
      </MessagesContainer>
      {newMessagesCount > 0 ? (
        <NewMessagesButton
          type="button"
          onClick={handleJumpToBottom}
          aria-label="Yangi xabarlarga tushish"
          title="Yangi xabarlarga tushish"
        >
          <ChevronDown size={18} />
          <NewMessagesChip>{newMessagesCount > 99 ? "99+" : newMessagesCount}</NewMessagesChip>
        </NewMessagesButton>
      ) : null}
    </ScrollArea>
  );
};

export default ChatAreaMessageList;
