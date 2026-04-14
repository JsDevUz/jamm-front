import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Check,
  CheckCheck,
  ChevronDown,
  MoreVertical,
  Timer,
  X,
} from "lucide-react";
import OfficalBadge from "../../../../shared/ui/badges/OfficalBadge";
import UserNameWithDecoration from "../../../../shared/ui/users/UserNameWithDecoration";
import { useChatAreaContext } from "../context/ChatAreaContext";

const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
  position: relative;
  overflow: hidden;
`;

const skeletonPulse = keyframes`
  0% {
    opacity: 0.58;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.58;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 8px
    ${(props) =>
      props.$keyboardOpen
        ? "72px"
        : "calc(10px + env(safe-area-inset-bottom, 0px))"};
  display: flex;
  flex-direction: column;
  min-height: 0;
  background-image: url("/chat-area-bg.JPG");
  background-size: 420px auto;
  background-repeat: repeat;
  background-position: center;
  -webkit-overflow-scrolling: touch;
  scroll-padding-bottom: ${(props) =>
    props.$keyboardOpen
      ? "92px"
      : "calc(72px + env(safe-area-inset-bottom, 0px))"};
  transition:
    padding-bottom 0.25s ease,
    scroll-padding-bottom 0.25s ease;

  @media (max-width: 768px) {
    padding: 8px 8px
      ${(props) =>
        props.$keyboardOpen
          ? "72px"
          : "calc(10px + env(safe-area-inset-bottom, 0px))"};
  }

  @media (max-width: 480px) {
    padding: 4px 8px
      ${(props) =>
        props.$keyboardOpen
          ? "72px"
          : "calc(10px + env(safe-area-inset-bottom, 0px))"};
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
  flex: 1 0 auto;
  min-height: 100%;
  justify-content: flex-end;

  & > * {
    flex-shrink: 0;
  }
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
    background-color: var(--background-color);
    padding: 0 16px;
    text-transform: uppercase;
    border-radius: 10px;
    letter-spacing: 0.5px;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
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
    props.$isOwn ? "var(--input-color)" : "var(--input-color)"};
  color: ${(props) => (props.$isOwn ? "white" : "var(--text-color)")};
  /* text-align: ${(props) => (props.$isOwn ? "right" : "left")}; */
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
  white-space: pre-wrap;
  text-align: 'left';
`;

const MessageTextRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 10px;
`;

const MessageTextContent = styled(MessageText)`
  flex: 1;
  min-width: 0;
  margin-bottom: 0;
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
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 7;
  text-align: center;
  padding: 10px 16px;
  border-radius: 18px;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--surface-color) 96%, white 4%) 0%,
      color-mix(in srgb, var(--surface-color) 88%, black 12%) 100%
    );
  border: 1px solid color-mix(in srgb, white 12%, var(--border-color));
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.22),
    inset 0 1px 0 color-mix(in srgb, white 10%, transparent);
  color: color-mix(in srgb, var(--text-color) 84%, white 16%);
  margin: 0;
  pointer-events: none;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;

  &::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 10px;
    border-radius: 999px;
    background: linear-gradient(
      135deg,
      var(--primary-color) 0%,
      color-mix(in srgb, var(--primary-color) 54%, white 46%) 100%
    );
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary-color) 18%, transparent);
    animation: ${skeletonPulse} 1.1s ease-in-out infinite;
    vertical-align: middle;
  }
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

const EmptyState = styled.div`
  flex: 1;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--text-secondary-color);
  font-size: 14px;
  padding: 24px 16px;
`;

const InitialLayoutSkeleton = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 12px;
  padding: 16px 8px calc(10px + env(safe-area-inset-bottom, 0px));
  background-image: url("/chat-area-bg.JPG");
  background-size: 420px auto;
  background-repeat: repeat;
  background-position: center;
  pointer-events: none;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        180deg,
        rgba(8, 10, 18, 0.82) 0%,
        rgba(8, 10, 18, 0.7) 18%,
        rgba(8, 10, 18, 0.48) 44%,
        rgba(8, 10, 18, 0.62) 100%
      );
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  @media (max-width: 768px) {
    padding: 8px 8px calc(10px + env(safe-area-inset-bottom, 0px));
  }

  @media (max-width: 480px) {
    padding: 4px 8px calc(10px + env(safe-area-inset-bottom, 0px));
  }
`;

const SkeletonRow = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: ${(props) => (props.$isOwn ? "flex-end" : "flex-start")};
  gap: 8px;
`;

const SkeletonIntroCard = styled.div`
  position: relative;
  z-index: 1;
  align-self: center;
  width: min(100%, 360px);
  margin: 2px auto 10px;
  padding: 16px 18px;
  border-radius: 22px;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--surface-color) 92%, white 8%) 0%,
      color-mix(in srgb, var(--surface-color) 84%, black 16%) 100%
    );
  border: 1px solid color-mix(in srgb, white 14%, var(--border-color));
  box-shadow: 0 22px 48px rgba(0, 0, 0, 0.28);
  text-align: center;
`;

const SkeletonIntroTitle = styled.div`
  color: color-mix(in srgb, white 86%, var(--text-color));
  font-size: 18px;
  font-weight: 800;
  line-height: 1.2;
`;

const SkeletonIntroSubtitle = styled.div`
  margin-top: 8px;
  color: color-mix(in srgb, white 58%, var(--text-secondary-color));
  font-size: 13px;
  line-height: 1.45;
`;

const SkeletonAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: color-mix(in srgb, white 16%, transparent);
  margin-bottom: 8px;
  flex-shrink: 0;
  animation: ${skeletonPulse} 1.35s ease-in-out infinite;
`;

const SkeletonAvatarSpacer = styled.div`
  width: 34px;
  flex-shrink: 0;
`;

const SkeletonBubble = styled.div`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height}px;
  max-width: 88%;
  border-radius: 18px;
  background:
    linear-gradient(
      90deg,
      color-mix(in srgb, white 10%, transparent) 0%,
      color-mix(in srgb, white 18%, transparent) 50%,
      color-mix(in srgb, white 10%, transparent) 100%
    );
  border: 1px solid color-mix(in srgb, white 9%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in srgb, white 8%, transparent);
  animation: ${skeletonPulse} 1.35s ease-in-out infinite;
  animation-delay: ${(props) => props.$delay || "0s"};
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
  bottom: ${(props) =>
    props.$keyboardOpen
      ? "calc(136px + env(safe-area-inset-bottom, 0px))"
      : "calc(92px + env(safe-area-inset-bottom, 0px))"};
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

  @media (max-width: 768px) {
    right: 12px;
    bottom: ${(props) =>
      props.$keyboardOpen
        ? "calc(136px + env(safe-area-inset-bottom, 0px))"
        : "calc(96px + env(safe-area-inset-bottom, 0px))"};
    padding: 10px;
  }
`;

const NewMessagesChip = styled.span`
  min-width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--primary-color);
  color:white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  padding: 0 6px;
`;

const ChatAreaMessageList = ({ keyboardHeight = 0 }) => {
  const chatSkeletonItems = [
    { id: "s1", own: false, width: "66%", height: 96, delay: "0s" },
    { id: "s2", own: false, width: "54%", height: 84, delay: "0.08s" },
    { id: "s3", own: true, width: "78%", height: 88, delay: "0.16s" },
    { id: "s4", own: false, width: "61%", height: 92, delay: "0.24s" },
    { id: "s5", own: true, width: "86%", height: 90, delay: "0.32s" },
    { id: "s6", own: false, width: "71%", height: 92, delay: "0.4s" },
    { id: "s7", own: true, width: "58%", height: 82, delay: "0.48s" },
  ];
  const {
    messages,
    messageGroups,
    messagesHasMore,
    isLoadingMessages,
    messagesCacheHydrated,
    initialHistoryReady,
    savedScrollOffset,
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
    initialScrollTargetMessageId,
    setInitialScrollTargetMessageId,
    persistScrollOffset,
  } = useChatAreaContext();
  const suppressClickRef = useRef(false);
  const swipeGestureRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const shouldStickToBottomRef = useRef(true);
  const previousContainerHeightRef = useRef(0);
  const previousLastMessageIdRef = useRef(null);
  const previousMessageCountRef = useRef(0);
  const initialAnchorResolvedRef = useRef(false);
  const scrollPersistTimeoutRef = useRef(null);
  const [swipeState, setSwipeState] = useState({ messageId: null, offset: 0 });
  const [pendingNewMessageIds, setPendingNewMessageIds] = useState([]);
  const [messageListVisible, setMessageListVisible] = useState(false);
  const keyboardOpen = keyboardHeight > 0;
  const showInitialLoader =
    !messageListVisible &&
    (!messagesCacheHydrated ||
      !initialHistoryReady ||
      (isLoadingMessages && messages.length === 0));
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
    previousLastMessageIdRef.current = null;
    previousMessageCountRef.current = 0;
    initialAnchorResolvedRef.current = false;
    if (scrollPersistTimeoutRef.current) {
      window.clearTimeout(scrollPersistTimeoutRef.current);
      scrollPersistTimeoutRef.current = null;
    }
    setPendingNewMessageIds([]);
    setMessageListVisible(false);
  }, [currentChat?.id]);

  useEffect(() => {
    return () => {
      if (scrollPersistTimeoutRef.current) {
        window.clearTimeout(scrollPersistTimeoutRef.current);
        scrollPersistTimeoutRef.current = null;
      }

      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        persistScrollOffset(scrollContainer.scrollTop || 0);
      }
    };
  }, [persistScrollOffset]);

  useEffect(() => {
    if (savedScrollOffset == null) return;
    if (!messagesCacheHydrated || !initialHistoryReady) return;
    if (messageListVisible) return;
    if (initialAnchorResolvedRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const frameId = window.requestAnimationFrame(() => {
      scrollContainer.scrollTop = savedScrollOffset;
      shouldStickToBottomRef.current = isNearBottom(scrollContainer);
      if (shouldStickToBottomRef.current) {
        setPendingNewMessageIds([]);
      }
      initialAnchorResolvedRef.current = true;
      setMessageListVisible(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [
    initialHistoryReady,
    messageListVisible,
    messagesCacheHydrated,
    savedScrollOffset,
  ]);

  useEffect(() => {
    if (savedScrollOffset != null) return;
    if (!initialScrollTargetMessageId) return;

    const frameId = window.requestAnimationFrame(() => {
      if (initialScrollTargetMessageId === "__bottom__") {
        shouldStickToBottomRef.current = true;
        scrollToBottom("auto");
        initialAnchorResolvedRef.current = true;
        setInitialScrollTargetMessageId(null);
        return;
      }

      const targetElement = messageRefs.current[initialScrollTargetMessageId];
      if (!targetElement) {
        initialAnchorResolvedRef.current = true;
        setInitialScrollTargetMessageId(null);
        return;
      }

      shouldStickToBottomRef.current = false;
      setPendingNewMessageIds([]);
      targetElement.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
      initialAnchorResolvedRef.current = true;
      setInitialScrollTargetMessageId(null);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [
    initialHistoryReady,
    initialScrollTargetMessageId,
    messageRefs,
    messages,
    savedScrollOffset,
    setInitialScrollTargetMessageId,
  ]);

  useEffect(() => {
    if (messageListVisible) return;
    if (!messagesCacheHydrated || !initialHistoryReady) return;
    if (isLoadingMessages) return;
    if (messages.length === 0) return;
    if (initialAnchorResolvedRef.current) return;

    initialAnchorResolvedRef.current = true;

    const frameId = window.requestAnimationFrame(() => {
      setMessageListVisible(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [
    initialHistoryReady,
    isLoadingMessages,
    messageListVisible,
    messages.length,
    messagesCacheHydrated,
  ]);

  useEffect(() => {
    if (isLoadingMessages || messageListVisible) return;
    if (!messagesCacheHydrated || !initialHistoryReady) return;

    const frameId = window.requestAnimationFrame(() => {
      setMessageListVisible(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [
    initialHistoryReady,
    isLoadingMessages,
    messageListVisible,
    messagesCacheHydrated,
  ]);

  useEffect(() => {
    if (messageListVisible) return;
    if (isLoadingMessages) return;
    if (!messagesCacheHydrated || !initialHistoryReady) return;
    if (initialScrollTargetMessageId) return;
    if (savedScrollOffset != null) return;
    if (initialAnchorResolvedRef.current) return;

    initialAnchorResolvedRef.current = true;

    const frameId = window.requestAnimationFrame(() => {
      setMessageListVisible(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [
    initialHistoryReady,
    initialScrollTargetMessageId,
    isLoadingMessages,
    messageListVisible,
    messagesCacheHydrated,
    savedScrollOffset,
  ]);

  useEffect(() => {
    if (messageListVisible) return;
    if (!initialAnchorResolvedRef.current) return;
    if (isLoadingMessages) return;

    const frameId = window.requestAnimationFrame(() => {
      setMessageListVisible(true);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [
    isLoadingMessages,
    messageListVisible,
  ]);

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
    if (!messageListVisible) {
      return;
    }

    const element = event.currentTarget;
    if (scrollPersistTimeoutRef.current) {
      window.clearTimeout(scrollPersistTimeoutRef.current);
    }
    scrollPersistTimeoutRef.current = window.setTimeout(() => {
      persistScrollOffset(element.scrollTop || 0);
      scrollPersistTimeoutRef.current = null;
    }, 140);
    shouldStickToBottomRef.current = isNearBottom(element);

    if (shouldStickToBottomRef.current) {
      setPendingNewMessageIds([]);
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
      setPendingNewMessageIds([]);
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
          setPendingNewMessageIds([]);
        } else {
          setPendingNewMessageIds((previous) => {
            const nextIds = appendedMessages
              .map((message) => message.id || message._id)
              .filter(Boolean);
            return [...new Set([...previous, ...nextIds])];
          });
        }
      }
    }

    previousLastMessageIdRef.current = lastMessageId;
    previousMessageCountRef.current = messages.length;
  }, [messages, currentUser?._id, currentUser?.id]);

  useEffect(() => {
    if (!pendingNewMessageIds.length) return;

    const currentUserId = String(currentUser?._id || currentUser?.id || "");
    const unreadMessageIds = new Set(
      messages
        .filter((message) => {
          const senderId = String(
            message?.senderId?._id ||
              message?.senderId?.id ||
              message?.senderId ||
              "",
          );
          const readBy = Array.isArray(message?.readBy) ? message.readBy : [];

          return (
            senderId &&
            senderId !== currentUserId &&
            !readBy.includes(currentUserId) &&
            message?.deliveryStatus !== "failed"
          );
        })
        .map((message) => String(message.id || message._id))
        .filter(Boolean),
    );

    setPendingNewMessageIds((previous) => {
      const next = previous.filter((id) => unreadMessageIds.has(String(id)));
      return next.length === previous.length ? previous : next;
    });
  }, [messages, currentUser?._id, currentUser?.id, pendingNewMessageIds.length]);

  const handleJumpToBottom = () => {
    setPendingNewMessageIds([]);
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
      {showInitialLoader ? (
        <InitialLayoutSkeleton>
          <SkeletonIntroCard>
            <SkeletonIntroTitle>Suhbat yuklanmoqda</SkeletonIntroTitle>
            <SkeletonIntroSubtitle>
              Xabarlar tayyorlanmoqda, hozir chat ochiladi.
            </SkeletonIntroSubtitle>
          </SkeletonIntroCard>
          {chatSkeletonItems.map((item) => (
            <SkeletonRow key={item.id} $isOwn={item.own}>
              {!item.own ? <SkeletonAvatar /> : null}
              <SkeletonBubble
                $width={item.width}
                $height={item.height}
                $delay={item.delay}
              />
              {item.own ? <SkeletonAvatarSpacer /> : null}
            </SkeletonRow>
          ))}
        </InitialLayoutSkeleton>
      ) : null}
      <MessagesContainer
        id="scrollableChatArea"
        ref={scrollContainerRef}
        $keyboardOpen={keyboardOpen}
        onContextMenu={(event) => event.preventDefault()}
        onScroll={handleMessagesScroll}
        style={showInitialLoader ? { visibility: "hidden" } : undefined}
      >
        {isLoadingMessages && messages.length > 0 ? (
          <LoaderText>Oldingi xabarlar yuklanmoqda...</LoaderText>
        ) : null}
        <MessageContainer>
          {!isLoadingMessages && messageGroups.length === 0 ? (
            <EmptyState>Hozircha xabarlar yo&apos;q</EmptyState>
          ) : null}
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
                            <UserNameWithDecoration
                              user={senderMember || group.senderId}
                              fallback={group.user}
                              size="sm"
                            />
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
                          <MessageTextRow>
                            <MessageTextContent $isOwn={isOwnMessage}>
                              {renderMessageContent(group.content, group.id)}
                            </MessageTextContent>
                            <InlineTimestamp $isOwn={isOwnMessage}>
                              {group.timestamp}
                            </InlineTimestamp>
                          </MessageTextRow>
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
      {pendingNewMessageIds.length > 0 ? (
        <NewMessagesButton
          type="button"
          $keyboardOpen={keyboardOpen}
          onClick={handleJumpToBottom}
          aria-label="Yangi xabarlarga tushish"
          title="Yangi xabarlarga tushish"
        >
          <ChevronDown size={18} />
          <NewMessagesChip>
            {pendingNewMessageIds.length > 99 ? "99+" : pendingNewMessageIds.length}
          </NewMessagesChip>
        </NewMessagesButton>
      ) : null}
    </ScrollArea>
  );
};

export default ChatAreaMessageList;
