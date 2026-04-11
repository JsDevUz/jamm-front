import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {
  createChat as createDirectChat,
  getPublicProfile,
} from "../../../../api/chatApi";
import { useChats } from "../../../../contexts/ChatsContext";
import { usePresence } from "../../../../contexts/PresenceContext";
import { useCall } from "../../../../contexts/CallContext";
import useAuthStore from "../../../../store/authStore";
import { formatMessageDate } from "../../../../utils/dateUtils";
import { renderChatMessageContent } from "../utils/renderChatMessageContent";
import useChatAreaUiStore from "../store/useChatAreaUiStore";
import { RESOLVED_APP_BASE_URL } from "../../../../config/env";
import {
  getUserAvatarInitials,
  groupMessagesByDate,
  mapIncomingMessage,
  normalizeReadByIds,
  normalizeSenderId,
} from "../utils/chatAreaMessageUtils";

const CHAT_MESSAGES_CACHE_VERSION = 1;
const CHAT_MESSAGES_CACHE_PREFIX = "jamm.chat-area.messages";
const CHAT_SCROLL_CACHE_PREFIX = "jamm.chat-area.scroll";
const OLDER_HISTORY_FETCH_SAFETY_LIMIT = 20;

const getScopedCacheKey = (prefix, userId, chatId) =>
  `${prefix}.${encodeURIComponent(String(userId || "guest"))}.${encodeURIComponent(
    String(chatId || "unknown"),
  )}`;

const readStorageEnvelope = (storageKey) => {
  if (typeof window === "undefined") return null;

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue);
    if (parsed?.version !== CHAT_MESSAGES_CACHE_VERSION) {
      window.localStorage.removeItem(storageKey);
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
};

const writeStorageEnvelope = (storageKey, data) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    storageKey,
    JSON.stringify({
      version: CHAT_MESSAGES_CACHE_VERSION,
      updatedAt: new Date().toISOString(),
      data,
    }),
  );
};

const normalizeComparableOrigin = (value) => {
  try {
    const parsed = new URL(String(value || ""));
    return `${parsed.protocol}//${parsed.host}`.replace(/^https?:\/\/www\./, (match) =>
      match.replace("www.", ""),
    );
  } catch {
    return String(value || "").trim().replace(/\/+$/, "");
  }
};

const loadCachedChatMessages = (userId, chatId) => {
  const storageKey = getScopedCacheKey(CHAT_MESSAGES_CACHE_PREFIX, userId, chatId);
  const envelope = readStorageEnvelope(storageKey);
  const messages = envelope?.data?.messages;

  if (!Array.isArray(messages)) {
    return null;
  }

  return {
    messages: messages.filter(Boolean),
    nextCursor: envelope?.data?.nextCursor || null,
    hasMore: Boolean(envelope?.data?.hasMore),
  };
};

const saveCachedChatMessages = (userId, chatId, payload) => {
  const storageKey = getScopedCacheKey(CHAT_MESSAGES_CACHE_PREFIX, userId, chatId);
  writeStorageEnvelope(storageKey, {
    messages: Array.isArray(payload?.messages) ? payload.messages : [],
    nextCursor: payload?.nextCursor || null,
    hasMore: Boolean(payload?.hasMore),
  });
};

const loadCachedChatScrollOffset = (userId, chatId) => {
  const storageKey = getScopedCacheKey(CHAT_SCROLL_CACHE_PREFIX, userId, chatId);
  const envelope = readStorageEnvelope(storageKey);
  const offset = Number(envelope?.data);
  return Number.isFinite(offset) && offset >= 0 ? offset : null;
};

const saveCachedChatScrollOffset = (userId, chatId, offset) => {
  const storageKey = getScopedCacheKey(CHAT_SCROLL_CACHE_PREFIX, userId, chatId);
  writeStorageEnvelope(storageKey, Math.max(0, Number(offset) || 0));
};

const getMessageTimestamp = (message) => {
  const parsed = new Date(message?.createdAt || 0).getTime();
  return Number.isFinite(parsed) ? parsed : null;
};

const getDayStartTimestamp = (value) => {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  return date.getTime();
};

const formatLastSeenLabel = (value) => {
  if (!value) return "Offline";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Offline";
  }

  const now = new Date();
  const timeLabel = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (date.toDateString() === now.toDateString()) {
    return `Oxirgi marta: ${timeLabel}`;
  }

  const dateLabel = date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
  return `Oxirgi marta: ${dateLabel} ${timeLabel}`;
};

const getOldestLoadedDayStart = (messages) => {
  for (const message of messages || []) {
    const timestamp = getMessageTimestamp(message);
    if (timestamp !== null) {
      return getDayStartTimestamp(timestamp);
    }
  }

  return null;
};

const mergeChronologicalMessages = (existingMessages, incomingMessages) => {
  const mergedById = new Map();

  for (const message of existingMessages || []) {
    const messageId = String(message?.id || message?._id || "");
    if (!messageId) continue;
    mergedById.set(messageId, message);
  }

  for (const message of incomingMessages || []) {
    const messageId = String(message?.id || message?._id || "");
    if (!messageId) continue;
    mergedById.set(messageId, {
      ...(mergedById.get(messageId) || {}),
      ...message,
    });
  }

  return Array.from(mergedById.values()).sort((left, right) => {
    const leftTime = getMessageTimestamp(left) || 0;
    const rightTime = getMessageTimestamp(right) || 0;
    return leftTime - rightTime;
  });
};

const matchesSelectedChat = (chat, targetId) => {
  if (!chat || !targetId) return false;

  const normalizedTargetId = String(targetId);
  return [
    chat.urlSlug,
    chat.privateurl,
    chat.jammId,
    chat.id,
    chat._id,
    chat.username,
  ]
    .filter(Boolean)
    .some((value) => String(value) === normalizedTargetId);
};

export default function useChatAreaController({
  selectedChatId,
  selectedNav,
  navigate,
  chats,
}) {
  const {
    fetchMessages,
    sendMessage,
    editMessage,
    deleteMessage,
    getUserByUsername,
    createChat,
    editChat,
    previewGroupChat,
    joinGroupChat,
    deleteChat,
    leaveChat,
    chatSocket,
    chatReconnectKey,
    markMessagesAsRead,
    typingUsers,
    sendTypingStatus,
    previewChat,
    setPreviewChat,
  } = useChats();
  const { isUserOnline, getOnlineCount, getUserLastSeen, fetchBulkStatuses } =
    usePresence();
  const { startPrivateCall } = useCall();
  const currentUser = useAuthStore((state) => state.user);
  const location = useLocation();
  const isEditGroupDialogOpen = useChatAreaUiStore(
    (state) => state.isEditGroupDialogOpen,
  );
  const isInfoSidebarOpen = useChatAreaUiStore(
    (state) => state.isInfoSidebarOpen,
  );
  const isHeaderMenuOpen = useChatAreaUiStore(
    (state) => state.isHeaderMenuOpen,
  );
  const openInfoSidebar = useChatAreaUiStore((state) => state.openInfoSidebar);
  const closeHeaderMenu = useChatAreaUiStore((state) => state.closeHeaderMenu);
  const closeDeleteDialog = useChatAreaUiStore(
    (state) => state.closeDeleteDialog,
  );
  const closeInfoSidebar = useChatAreaUiStore(
    (state) => state.closeInfoSidebar,
  );
  const closeEditGroupDialog = useChatAreaUiStore(
    (state) => state.closeEditGroupDialog,
  );
  const resetChatAreaUi = useChatAreaUiStore((state) => state.resetChatAreaUi);

  const currentChat = chats.find((chat) =>
    matchesSelectedChat(chat, selectedChatId),
  );

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesCursor, setMessagesCursor] = useState(null);
  const [messagesHasMore, setMessagesHasMore] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [messagesCacheHydrated, setMessagesCacheHydrated] = useState(false);
  const [savedScrollOffset, setSavedScrollOffset] = useState(null);
  const [initialHistoryReady, setInitialHistoryReady] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [clickedMessageId, setClickedMessageId] = useState(null);
  const [clickTimer, setClickTimer] = useState(null);
  const [navigatingMessageId, setNavigatingMessageId] = useState(null);
  const [initialScrollTargetMessageId, setInitialScrollTargetMessageId] =
    useState(null);

  const typingTimeoutRef = useRef(null);
  const previewLocationRef = useRef(null);
  const headerMenuRef = useRef(null);
  const messageRefs = useRef({});
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);
  const isRestoringChatInfoHistoryRef = useRef(false);
  const previousInfoSidebarStateRef = useRef(false);
  const currentUserId = String(currentUser?._id || currentUser?.id || "");
  const currentChatId = currentChat?.id || currentChat?._id || null;

  useEffect(() => {
    resetChatAreaUi();
    setEditingMessage(null);
    setInitialScrollTargetMessageId(null);
  }, [selectedChatId, resetChatAreaUi]);

  useEffect(() => {
    if (!navigatingMessageId) return;
    setNavigatingMessageId(null);
  }, [location.pathname, location.search, location.hash, navigatingMessageId]);

  useEffect(() => {
    const handlePopState = () => {
      const shouldShowInfoSidebar = Boolean(window.history.state?.chatInfoSidebar);
      isRestoringChatInfoHistoryRef.current = true;

      if (shouldShowInfoSidebar) {
        openInfoSidebar();
      } else {
        closeInfoSidebar();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeInfoSidebar, openInfoSidebar]);

  useEffect(() => {
    const wasOpen = previousInfoSidebarStateRef.current;

    if (isRestoringChatInfoHistoryRef.current) {
      previousInfoSidebarStateRef.current = isInfoSidebarOpen;
      isRestoringChatInfoHistoryRef.current = false;
      return;
    }

    if (!isInfoSidebarOpen) {
      previousInfoSidebarStateRef.current = false;
      if (window.history.state?.chatInfoSidebar) {
        window.history.replaceState(
          { ...window.history.state, chatInfoSidebar: null },
          "",
          window.location.href,
        );
      }
      return;
    }

    const nextState = {
      ...(window.history.state || {}),
      chatInfoSidebar: true,
    };

    if (!wasOpen) {
      window.history.pushState(nextState, "", window.location.href);
    } else {
      window.history.replaceState(nextState, "", window.location.href);
    }

    previousInfoSidebarStateRef.current = true;
  }, [isInfoSidebarOpen]);

  const displayChat = currentChat || previewChat;
  const currentChatName = displayChat?.name || "Chat";
  const otherMember =
    displayChat?.type !== "group" && displayChat?.members
      ? displayChat.members.find((member) => {
          const memberId = member._id || member.id;
          const currentUserId = currentUser?._id || currentUser?.id;
          return String(memberId) !== String(currentUserId);
        })
      : null;
  const otherMemberId = otherMember?._id || otherMember?.id;
  const isOnline = otherMemberId ? isUserOnline(otherMemberId) : false;
  const onlineCount =
    displayChat?.type === "group" ? getOnlineCount(displayChat.members) : 0;
  const otherMemberLastSeen =
    (otherMemberId ? getUserLastSeen(otherMemberId) : null) ||
    otherMember?.lastSeen ||
    otherMember?.lastActive ||
    null;

  useEffect(() => {
    if (!otherMemberId) return;
    void fetchBulkStatuses([String(otherMemberId)]);
  }, [fetchBulkStatuses, otherMemberId]);

  const lastSeenText = useMemo(() => {
    if (!otherMember || isOnline) return "Online";
    return formatLastSeenLabel(otherMemberLastSeen);
  }, [otherMember, isOnline, otherMemberLastSeen]);

  useEffect(() => {
    if (
      !["groups", "users", "a", "chats"].includes(selectedNav) ||
      !selectedChatId ||
      currentChat
    ) {
      previewLocationRef.current = null;
      setPreviewChat(null);
      return;
    }

    if (previewLocationRef.current === selectedChatId) {
      return;
    }

    previewLocationRef.current = selectedChatId;

    const fetchPreview = async () => {
      try {
        if (selectedNav === "users") {
          const user = await getPublicProfile(selectedChatId);

          if (user) {
            setPreviewChat({
              type: "user",
              id: null,
              name: user.nickname || user.username,
              avatar: user.avatar,
              description: user.bio,
              targetUserId: user._id || user.id,
            });
            return;
          }
        }

        try {
          const chat = await previewGroupChat(selectedChatId);
          setPreviewChat(chat);
        } catch {
          if (selectedNav === "groups") {
            setPreviewChat(null);
            return;
          }

          const user = await getPublicProfile(selectedChatId);
          if (user) {
            setPreviewChat({
              type: "user",
              id: null,
              name: user.nickname || user.username,
              avatar: user.avatar,
              description: user.bio,
              targetUserId: user._id || user.id,
            });
          } else {
            setPreviewChat(null);
          }
        }
      } catch {
        setPreviewChat(null);
      }
    };

    fetchPreview();
  }, [
    selectedNav,
    selectedChatId,
    currentChat,
    previewGroupChat,
    setPreviewChat,
  ]);

  useEffect(() => {
    setMessages([]);
    setMessagesCursor(null);
    setMessagesHasMore(true);
    setInitialScrollTargetMessageId(null);
    setSavedScrollOffset(null);
    setMessagesCacheHydrated(false);
    setInitialHistoryReady(false);
    setIsLoadingMessages(false);

    if (!currentChatId || !currentUserId) {
      setMessagesCacheHydrated(true);
      return;
    }

    const cachedMessages = loadCachedChatMessages(currentUserId, currentChatId);
    const cachedScrollOffset = loadCachedChatScrollOffset(
      currentUserId,
      currentChatId,
    );

    if (cachedMessages) {
      setMessages(cachedMessages.messages);
      setMessagesCursor(cachedMessages.nextCursor || null);
      setMessagesHasMore(Boolean(cachedMessages.hasMore));
      setSavedScrollOffset(cachedScrollOffset);
      setInitialHistoryReady(true);
    } else {
      setSavedScrollOffset(cachedScrollOffset);
    }

    setMessagesCacheHydrated(true);
  }, [currentChatId, currentUserId]);

  useEffect(() => {
    if (!currentChatId || !currentUserId || !messagesCacheHydrated) {
      return;
    }

    saveCachedChatMessages(currentUserId, currentChatId, {
      messages,
      nextCursor: messagesCursor,
      hasMore: messagesHasMore,
    });
  }, [
    currentChatId,
    currentUserId,
    messages,
    messagesCacheHydrated,
    messagesCursor,
    messagesHasMore,
  ]);

  useEffect(() => {
    if (!currentChat || !messagesCacheHydrated) return;
    if (messages.length > 0 && initialHistoryReady) return;

    let cancelled = false;

    const loadMessages = async () => {
      setIsLoadingMessages(true);
      setInitialScrollTargetMessageId(null);

      try {
        let result = await fetchMessages(currentChat.id);
        let loadedMessages = result.data || [];
        let nextCursor = result.nextCursor || null;
        let nextHasMore = Boolean(result.hasMore);

        if (cancelled) {
          return;
        }

        setMessages(loadedMessages);
        setMessagesCursor(nextCursor);
        setMessagesHasMore(nextHasMore);

        const unreadMessageIds = loadedMessages
          .filter((message) => {
            const senderId = String(normalizeSenderId(message.senderId) || "");
            const readBy = normalizeReadByIds(message.readBy);
            return (
              senderId &&
              senderId !== currentUserId &&
              !readBy.includes(currentUserId)
            );
          })
          .map((message) => message.id || message._id)
          .filter(Boolean);

        if (unreadMessageIds.length > 0) {
          markMessagesAsRead(currentChat.id, unreadMessageIds);
        }

        const firstUnread = loadedMessages.find(
          (message) =>
            String(normalizeSenderId(message.senderId) || "") !== currentUserId &&
            !normalizeReadByIds(message.readBy).includes(currentUserId),
        );

        setInitialScrollTargetMessageId(
          firstUnread ? firstUnread.id || firstUnread._id : "__bottom__",
        );
      } finally {
        if (!cancelled) {
          setIsLoadingMessages(false);
          setInitialHistoryReady(true);
        }
      }
    };

    void loadMessages();

    return () => {
      cancelled = true;
    };
  }, [
    currentChat,
    currentUserId,
    fetchMessages,
    initialHistoryReady,
    markMessagesAsRead,
    messages.length,
    messagesCacheHydrated,
    chatReconnectKey,
  ]);

  useEffect(() => {
    if (!currentChat || !messagesCacheHydrated || !initialHistoryReady) {
      return;
    }

    if (messages.length === 0) {
      return;
    }

    let cancelled = false;

    const refreshLatestMessages = async () => {
      try {
        const latestResult = await fetchMessages(currentChat.id);
        const latestMessages = latestResult.data || [];

        if (cancelled || latestMessages.length === 0) {
          return;
        }

        setMessages((previous) =>
          mergeChronologicalMessages(previous, latestMessages),
        );
        setMessagesHasMore((previous) => previous || Boolean(latestResult.hasMore));
        setMessagesCursor((previous) => previous || latestResult.nextCursor || null);
      } catch {
        // Cache-first refresh should stay silent.
      }
    };

    void refreshLatestMessages();

    return () => {
      cancelled = true;
    };
  }, [
    currentChat,
    fetchMessages,
    initialHistoryReady,
    messages.length,
    messagesCacheHydrated,
  ]);

  const fetchMoreMessages = async () => {
    if (
      !currentChat ||
      isLoadingMessages ||
      !messagesHasMore ||
      !messagesCursor
    ) {
      return;
    }

    const oldestLoadedDayStart = getOldestLoadedDayStart(messages);
    if (!oldestLoadedDayStart) {
      return;
    }

    setIsLoadingMessages(true);
    const scrollContainer = document.getElementById("scrollableChatArea");
    const previousScrollHeight = scrollContainer?.scrollHeight || 0;
    const previousScrollTop = scrollContainer?.scrollTop || 0;

    try {
      let nextCursor = messagesCursor;
      let nextHasMore = messagesHasMore;
      let collectedMessages = [];

      for (
        let attempt = 0;
        attempt < OLDER_HISTORY_FETCH_SAFETY_LIMIT &&
        nextHasMore &&
        nextCursor;
        attempt += 1
      ) {
        const result = await fetchMessages(currentChat.id, nextCursor);
        const olderMessages = result.data || [];

        nextCursor = result.nextCursor || null;
        nextHasMore = Boolean(result.hasMore);

        if (!olderMessages.length) {
          break;
        }

        collectedMessages = [...olderMessages, ...collectedMessages];
        const combinedMessages = [...collectedMessages, ...messages];
        const combinedOldestDayStart = getOldestLoadedDayStart(combinedMessages);

        if (
          combinedOldestDayStart === null ||
          combinedOldestDayStart < oldestLoadedDayStart
        ) {
          break;
        }
      }

      if (!collectedMessages.length) {
        setMessagesCursor(nextCursor);
        setMessagesHasMore(nextHasMore);
        return;
      }

      setMessages((previous) => [...collectedMessages, ...previous]);
      setMessagesCursor(nextCursor);
      setMessagesHasMore(nextHasMore);

      setTimeout(() => {
        if (scrollContainer) {
          scrollContainer.scrollTop =
            scrollContainer.scrollHeight -
            previousScrollHeight +
            previousScrollTop;
        }
      }, 0);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  useEffect(() => {
    if (!chatSocket || !currentChat) return;

    const joinCurrentChat = () => {
      chatSocket.emit("join_chat", { chatId: currentChat.id });
    };

    joinCurrentChat();
    chatSocket.on("connect", joinCurrentChat);

    return () => {
      chatSocket.emit("leave_chat", { chatId: currentChat.id });
      chatSocket.off("connect", joinCurrentChat);
    };
  }, [chatSocket, currentChat?.id]);

  useEffect(() => {
    if (!chatSocket) return;

    const handleNewMessage = (rawMessage) => {
      if (rawMessage.chatId !== currentChat?.id) return;

      const nextMessage = mapIncomingMessage(rawMessage);

      setMessages((previous) => {
        if (previous.some((message) => message.id === nextMessage.id)) {
          return previous;
        }

        const optimisticIndex = previous.findIndex((message) =>
          isMatchingOptimisticMessage(message, nextMessage),
        );

        if (optimisticIndex !== -1) {
          const nextMessages = [...previous];
          nextMessages[optimisticIndex] = nextMessage;
          return nextMessages;
        }

        return [...previous, nextMessage];
      });

      const currentUserId = currentUser?._id || currentUser?.id;
      if (nextMessage.senderId === currentUserId) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };

    const handleUpdatedMessage = (rawMessage) => {
      if (rawMessage.chatId !== currentChat?.id) return;

      setMessages((previous) =>
        previous.map((message) =>
          message.id === rawMessage._id
            ? { ...message, content: rawMessage.content, edited: true }
            : message,
        ),
      );
    };

    const handleDeletedMessage = (rawMessage) => {
      if (rawMessage.chatId !== currentChat?.id) return;

      setMessages((previous) =>
        previous.filter((message) => message.id !== rawMessage._id),
      );
    };

    const handleMessagesRead = ({ chatId, readByUserId, messageIds }) => {
      if (currentChat?.id !== chatId) return;

      setMessages((previous) =>
        previous.map((message) => {
          const senderId = normalizeSenderId(message.senderId);

          if (
            senderId !== readByUserId &&
            messageIds?.includes(message.id || message._id) &&
            !message.readBy?.includes(readByUserId)
          ) {
            return {
              ...message,
              readBy: [...(message.readBy || []), readByUserId],
              deliveryStatus:
                message.deliveryStatus === "failed" ? "failed" : "read",
            };
          }

          return message;
        }),
      );
    };

    chatSocket.on("message_new", handleNewMessage);
    chatSocket.on("message_updated", handleUpdatedMessage);
    chatSocket.on("message_deleted", handleDeletedMessage);
    chatSocket.on("messages_read", handleMessagesRead);

    return () => {
      chatSocket.off("message_new", handleNewMessage);
      chatSocket.off("message_updated", handleUpdatedMessage);
      chatSocket.off("message_deleted", handleDeletedMessage);
      chatSocket.off("messages_read", handleMessagesRead);
    };
  }, [chatSocket, currentChat?.id, currentUser?._id, currentUser?.id]);

  useEffect(() => {
    if (!currentChat) return;

    const currentUserId = currentUser?._id || currentUser?.id;
    const unreadMessages = messages.filter((message) => {
      const senderId = normalizeSenderId(message.senderId);
      const readBy = normalizeReadByIds(message.readBy);
      return (
        String(senderId) !== String(currentUserId) &&
        !readBy.includes(String(currentUserId))
      );
    });

    if (!unreadMessages.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const newlyReadIds = [];

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const messageId = entry.target.dataset.messageId;
          const matchingMessage = messages.find(
            (message) =>
              String(message.id) === String(messageId) ||
              String(message._id) === String(messageId),
          );

          if (!matchingMessage) return;

          const senderId = normalizeSenderId(matchingMessage.senderId);

          if (
            String(senderId) !== String(currentUserId) &&
            !normalizeReadByIds(matchingMessage.readBy).includes(
              String(currentUserId),
            )
          ) {
            newlyReadIds.push(matchingMessage.id || matchingMessage._id);
          }
        });

        if (newlyReadIds.length > 0) {
          markMessagesAsRead(currentChat.id, newlyReadIds);
        }
      },
      { threshold: 0.1 },
    );

    unreadMessages.forEach((message) => {
      const element = messageRefs.current[message.id];
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [messages, currentChat, currentUser, markMessagesAsRead]);

  useEffect(() => {
    if (!messageInputRef.current) return;
    if (!replyMessage && !editingMessage) return;

    messageInputRef.current.focus();
    messageInputRef.current.setSelectionRange(
      messageInputRef.current.value.length,
      messageInputRef.current.value.length,
    );
  }, [editingMessage, replyMessage]);

  useEffect(() => {
    if (!messageInputRef.current) return;
    messageInputRef.current.style.height = "25px";
    messageInputRef.current.style.height = `${messageInputRef.current.scrollHeight}px`;
  }, [messageInput]);

  useEffect(() => {
    return () => {
      if (clickTimer) clearTimeout(clickTimer);
    };
  }, [clickTimer]);

  useEffect(() => {
    const handleGlobalClick = (event) => {
      if (contextMenu) {
        setContextMenu(null);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [contextMenu]);

  useEffect(() => {
    if (!isHeaderMenuOpen) return undefined;

    const handleClickOutside = (event) => {
      if (
        headerMenuRef.current &&
        !headerMenuRef.current.contains(event.target)
      ) {
        closeHeaderMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeHeaderMenu, isHeaderMenuOpen]);

  const handleMemberClick = async (targetUser) => {
    const currentUserId = currentUser?._id || currentUser?.id;
    const targetId = targetUser._id || targetUser.id;

    if (String(targetId) === String(currentUserId)) {
      closeInfoSidebar();
      return;
    }

    const existingChat = chats.find((chat) => {
      if (chat.isGroup || !chat.members || chat.isSavedMessages) return false;
      return chat.members.some(
        (member) => (member._id || member.id) === targetId,
      );
    });

    if (existingChat) {
      navigate(
        `/users/${existingChat.jammId || existingChat.urlSlug || existingChat.id}`,
      );
      closeInfoSidebar();
      return;
    }

    try {
      const chatId = await createChat({
        isGroup: false,
        memberIds: [targetId],
      });

      if (chatId) {
        navigate(`/users/${chatId.jammId || chatId}`);
        closeInfoSidebar();
      }
    } catch (error) {
      console.error("Failed to start private chat", error);
    }
  };

  const handleInfoSidebarToggle = () => {
    if (isInfoSidebarOpen && window.history.state?.chatInfoSidebar) {
      window.history.back();
      return;
    }

    if (isInfoSidebarOpen) {
      closeInfoSidebar();
      return;
    }

    openInfoSidebar();
  };

  const handleInfoSidebarClose = () => {
    if (window.history.state?.chatInfoSidebar) {
      window.history.back();
      return;
    }

    closeInfoSidebar();
  };

  const scrollToBottom = (behavior = "auto") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const createOptimisticMessage = (content, sourceReplyMessage = null) => {
    const createdAt = new Date().toISOString();
    const currentUserId = currentUser?._id || currentUser?.id;
    const currentUserName =
      currentUser?.nickname || currentUser?.username || currentUser?.name || "You";

    return {
      id: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      user: currentUserName,
      senderId: currentUserId,
      avatar:
        currentUser?.avatar ||
        currentUserName.slice(0, 1).toUpperCase() ||
        "U",
      username: currentUser?.username,
      premiumStatus: currentUser?.premiumStatus,
      selectedProfileDecorationId: currentUser?.selectedProfileDecorationId,
      customProfileDecorationImage: currentUser?.customProfileDecorationImage,
      isOfficialProfile: currentUser?.isOfficialProfile,
      officialBadgeKey: currentUser?.officialBadgeKey,
      officialBadgeLabel: currentUser?.officialBadgeLabel,
      content,
      timestamp: new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: createdAt.split("T")[0],
      createdAt,
      edited: false,
      isDeleted: false,
      readBy: [],
      replayTo: sourceReplyMessage
        ? {
            id: sourceReplyMessage.id,
            user: sourceReplyMessage.user,
            content: sourceReplyMessage.content,
          }
        : null,
      deliveryStatus: "pending",
      isLocalOnly: true,
    };
  };

  const isMatchingOptimisticMessage = (message, nextMessage) => {
    if (message.deliveryStatus !== "pending") return false;

    const currentUserId = String(currentUser?._id || currentUser?.id || "");
    const messageSenderId = String(normalizeSenderId(message.senderId) || "");
    const nextSenderId = String(normalizeSenderId(nextMessage.senderId) || "");

    if (!currentUserId || messageSenderId !== currentUserId || nextSenderId !== currentUserId) {
      return false;
    }

    if (String(message.content || "").trim() !== String(nextMessage.content || "").trim()) {
      return false;
    }

    if (String(message.replayTo?.id || "") !== String(nextMessage.replayTo?.id || "")) {
      return false;
    }

    const optimisticTime = new Date(message.createdAt || 0).getTime();
    const nextTime = new Date(nextMessage.createdAt || Date.now()).getTime();
    return Math.abs(nextTime - optimisticTime) < 120000;
  };

  const dismissLocalMessage = (messageId) => {
    setMessages((previous) =>
      previous.filter(
        (message) => String(message.id || message._id) !== String(messageId),
      ),
    );
  };

  const focusReplyTargetMessage = (messageId) => {
    const messageElement = messageRefs.current[messageId];
    if (!messageElement) return;

    messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
    messageElement.style.backgroundColor =
      "color-mix(in srgb, var(--primary-color) 28%, transparent)";

    setTimeout(() => {
      messageElement.style.backgroundColor = "";
    }, 2000);

    setTimeout(() => {
      messageInputRef.current?.focus();
    }, 0);
  };

  const handleMessageDoubleClick = (message, event) => {
    if (event) event.preventDefault();

    if (clickedMessageId !== message.id) {
      setClickCount(1);
      setClickedMessageId(message.id);
    } else {
      setClickCount((previous) => previous + 1);
    }

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    const timer = setTimeout(() => {
      if (clickCount === 1 && clickedMessageId === message.id) {
        setReplyMessage(message);
        setTimeout(() => {
          if (!messageInputRef.current) return;
          messageInputRef.current.focus();
          messageInputRef.current.setSelectionRange(
            messageInputRef.current.value.length,
            messageInputRef.current.value.length,
          );
        }, 0);
      }

      setClickCount(0);
      setClickedMessageId(null);
    }, 300);

    setClickTimer(timer);
  };

  const showContextMenu = (message, event) => {
    const menuWidth = 180;
    const menuHeight = message.user === "You" ? 120 : 40;
    let x = event.clientX;
    let y = event.clientY;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }

    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    setContextMenu({
      x: Math.max(x, 10),
      y: Math.max(y, 10),
      message,
    });
  };

  const handleContextMenuAction = async (action, message) => {
    switch (action) {
      case "delete":
        try {
          dismissLocalMessage(message.id);
          if (!message.isLocalOnly && message.deliveryStatus !== "failed") {
            await deleteMessage(message.id);
          }
        } catch (error) {
          console.error("Failed to delete message", error);
        }
        break;
      case "edit":
        if (message.isDeleted) return;
        setEditingMessage(message);
        setReplyMessage(null);
        setMessageInput(message.content || "");
        setTimeout(() => {
          if (!messageInputRef.current) return;
          messageInputRef.current.focus();
          messageInputRef.current.setSelectionRange(
            messageInputRef.current.value.length,
            messageInputRef.current.value.length,
          );
        }, 0);
        break;
      case "reply":
        setEditingMessage(null);
        setReplyMessage(message);
        setMessageInput("");
        setTimeout(() => {
          if (!messageInputRef.current) return;
          messageInputRef.current.focus();
          messageInputRef.current.setSelectionRange(
            messageInputRef.current.value.length,
            messageInputRef.current.value.length,
          );
        }, 0);
        break;
      default:
        break;
    }

    setContextMenu(null);
  };

  const cancelEditMessage = () => {
    setEditingMessage(null);
    setMessageInput("");
    setTimeout(() => {
      messageInputRef.current?.focus();
    }, 0);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    const chatId = currentChat?.id || currentChat?._id;

    setMessageInput(value);

    if (chatId && value.trim()) {
      if (!typingTimeoutRef.current) {
        sendTypingStatus(chatId, true);
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        sendTypingStatus(chatId, false);
        typingTimeoutRef.current = null;
      }, 3000);
    } else if (chatId && !value.trim() && typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      sendTypingStatus(chatId, false);
      typingTimeoutRef.current = null;
    }
  };

  const typingText = useMemo(() => {
    const chatId = currentChat?.id || currentChat?._id;
    if (!chatId || !typingUsers[chatId]) return null;

    const typingIds = Object.keys(typingUsers[chatId]);
    const currentUserId = currentUser?._id || currentUser?.id;
    const otherTypingIds = typingIds.filter(
      (id) => String(id) !== String(currentUserId),
    );

    if (!otherTypingIds.length) return null;

    if (currentChat.type === "user") {
      return "yozmoqda";
    }

    const names = otherTypingIds.map((id) => {
      const member = currentChat.members?.find(
        (item) => String(item._id || item.id) === String(id),
      );
      return member?.nickname || member?.username || "Kimdir";
    });

    if (names.length === 1) return `${names[0]} yozmoqda`;
    if (names.length === 2) return `${names[0]} va ${names[1]} yozmoqdalar`;
    return "Bir necha kishi yozmoqda";
  }, [currentChat, currentUser?._id, currentUser?.id, typingUsers]);

  const handleUsernameClick = (username, event) => {
    event.stopPropagation();

    const targetMember = currentChat?.members?.find((member) => {
      const label = member.nickname || member.username || member.name;
      return label === username;
    });

    if (targetMember) {
      handleMemberClick(targetMember);
    }
  };

  const handleMemberProfileOpen = (targetUser, event) => {
    event?.stopPropagation?.();

    if (!targetUser || !navigate) return;

    const targetProfileId =
      targetUser.jammId || targetUser._id || targetUser.id || null;

    if (!targetProfileId) return;

    navigate(`/profile/${targetProfileId}`);
  };

  const handleMentionClick = async (username, event, messageId = null) => {
    event.stopPropagation();
    setNavigatingMessageId(messageId);

    try {
      const user = await getUserByUsername(username);
      if (!user || !navigate) {
        setNavigatingMessageId(null);
        toast.error("Bunday foydalanuvchi topilmadi");
        return;
      }

      const targetUserId = user._id || user.id;
      const currentUserId = currentUser?._id || currentUser?.id;

      if (
        currentUser &&
        String(targetUserId) === String(currentUserId)
      ) {
        const savedMessagesChat = chats.find(
          (chat) => !chat.isGroup && chat.isSavedMessages,
        );

        if (
          savedMessagesChat?.urlSlug ||
          savedMessagesChat?.privateurl ||
          savedMessagesChat?.jammId ||
          savedMessagesChat?.id
        ) {
          navigate(
            `/users/${savedMessagesChat.urlSlug || savedMessagesChat.privateurl || savedMessagesChat.jammId || savedMessagesChat.id}`,
          );
          return;
        }

        const chatId = await createChat({
          isGroup: false,
          memberIds: [String(currentUserId)],
        });

        if (chatId?.jammId || chatId?.urlSlug || chatId?._id || chatId?.id) {
          navigate(
            `/users/${chatId.jammId || chatId.urlSlug || chatId._id || chatId.id}`,
          );
          return;
        }

        setNavigatingMessageId(null);
        return;
      }

      const existingChat = chats.find(
        (chat) =>
          !chat.isGroup &&
          chat.members &&
          chat.members.some(
            (member) =>
              String(member._id || member.id) === String(targetUserId),
          ),
      );

      if (existingChat) {
        navigate(
          `/users/${existingChat.urlSlug || existingChat.privateurl || existingChat.jammId || existingChat.id}`,
        );
        return;
      }

      const chatId = await createChat({
        isGroup: false,
        memberIds: [targetUserId],
      });

      if (chatId?.jammId) {
        navigate(`/users/${chatId.jammId}`);
        return;
      }

      setNavigatingMessageId(null);
    } catch (error) {
      setNavigatingMessageId(null);
      console.error("Error handling mention click:", error);
      toast.error("Foydalanuvchini qidirishda xatolik yuz berdi");
    }
  };

  const isInternalMessageUrl = (url) => {
    try {
      const parsedUrl = new URL(
        url,
        typeof window !== "undefined" ? window.location.origin : RESOLVED_APP_BASE_URL,
      );
      const normalizedOrigin = `${parsedUrl.protocol}//${parsedUrl.host}`.replace(
        /^https?:\/\/www\./,
        (match) => match.replace("www.", ""),
      );
      const currentOrigin =
        typeof window !== "undefined"
          ? `${window.location.protocol}//${window.location.host}`.replace(
              /^https?:\/\/www\./,
              (match) => match.replace("www.", ""),
            )
          : normalizeComparableOrigin(RESOLVED_APP_BASE_URL);

      return normalizedOrigin === currentOrigin;
    } catch {
      return false;
    }
  };

  const normalizeInternalPath = (url) => {
    const parsedUrl = new URL(
      url,
      typeof window !== "undefined" ? window.location.origin : RESOLVED_APP_BASE_URL,
    );
    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  };

  const handleMessageLinkClick = (url, event, messageId = null) => {
    if (!navigate) return;

    if (!isInternalMessageUrl(url)) {
      event.preventDefault();
      event.stopPropagation();
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    setNavigatingMessageId(messageId);
    navigate(normalizeInternalPath(url));
  };

  const renderMessageContent = (content, messageId = null) =>
    renderChatMessageContent(content, {
      onMentionClick: (username, event) =>
        handleMentionClick(username, event, messageId),
      onLinkClick: (url, event) =>
        handleMessageLinkClick(url, event, messageId),
    });

  const startPrivateVideoCall = () => {
    if (!displayChat || !otherMember) return;

    startPrivateCall({
      _id: otherMember._id || otherMember.id,
      name: otherMember.nickname || otherMember.username || displayChat.name,
      avatar: otherMember.avatar || displayChat.avatar,
    });
  };

  const handleDeleteChat = async () => {
    if (!currentChat?.id) return;

    const isLeavingGroup =
      currentChat.isGroup && currentChat.createdBy !== currentUser?._id;

    try {
      if (isLeavingGroup) {
        await leaveChat(currentChat.id);
        toast.success("Guruhdan muvaffaqiyatli chiqdingiz");
      } else {
        await deleteChat(currentChat.id);
        toast.success("Suhbat muvaffaqiyatli o'chirildi");
      }

      closeDeleteDialog();
      navigate("/chats");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          (isLeavingGroup
            ? "Guruhdan chiqishda xatolik yuz berdi"
            : "Suhbatni o'chirishda xatolik yuz berdi"),
      );
    }
  };

  const messageGroups = useMemo(
    () => groupMessagesByDate(messages),
    [messages],
  );

  const submitMessage = async ({ keepFocus = false } = {}) => {
    if (!messageInput.trim()) return;

    const shouldBlurAfterSend =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches &&
      !keepFocus;
    const content = messageInput.trim();
    const sourceReplyMessage = replyMessage;
    const replyToMessageId = sourceReplyMessage ? sourceReplyMessage.id : null;
    const optimisticMessage = createOptimisticMessage(
      content,
      sourceReplyMessage,
    );
    const editingTargetMessage = editingMessage;

    setMessageInput("");
    setReplyMessage(null);
    if (editingTargetMessage) {
      setEditingMessage(null);
    }

    try {
      let targetChatId = currentChat?.id;

      if (!targetChatId && previewChat?.type === "user") {
        targetChatId = await createDirectChat({
          isGroup: false,
          memberIds: [previewChat.targetUserId],
        });

        if (targetChatId) {
          navigate(`/users/${targetChatId}`);
        }
      }

      if (!targetChatId) return;

      if (editingTargetMessage?.id) {
        const previousContent = editingTargetMessage.content;

        setMessages((previous) =>
          previous.map((message) =>
            String(message.id) === String(editingTargetMessage.id)
              ? { ...message, content, edited: true }
              : message,
          ),
        );

        try {
          await editMessage(editingTargetMessage.id, content);
        } catch (error) {
          setMessages((previous) =>
            previous.map((message) =>
              String(message.id) === String(editingTargetMessage.id)
                ? { ...message, content: previousContent }
                : message,
            ),
          );
          setEditingMessage(editingTargetMessage);
          setMessageInput(content);
          console.error("Failed to edit message:", error);
        }

        setTimeout(() => {
          if (!messageInputRef.current) return;

          if (shouldBlurAfterSend) {
            messageInputRef.current.blur();
            return;
          }

          messageInputRef.current.focus();
        }, 0);

        return;
      }

      setMessages((previous) => [...previous, optimisticMessage]);
      setTimeout(() => scrollToBottom("smooth"), 0);

      const nextMessage = await sendMessage(
        targetChatId,
        content,
        replyToMessageId,
      );

      setMessages((previous) => {
        if (!nextMessage) {
          return previous;
        }

        const existingServerMessageIndex = previous.findIndex(
          (message) => String(message.id) === String(nextMessage.id),
        );
        const optimisticIndex = previous.findIndex(
          (message) => String(message.id) === String(optimisticMessage.id),
        );

        if (existingServerMessageIndex !== -1 && optimisticIndex === -1) {
          return previous;
        }

        if (existingServerMessageIndex !== -1 && optimisticIndex !== -1) {
          return previous.filter(
            (message) => String(message.id) !== String(optimisticMessage.id),
          );
        }

        if (optimisticIndex === -1) {
          return [...previous, nextMessage];
        }

        const nextMessages = [...previous];
        nextMessages[optimisticIndex] = nextMessage;
        return nextMessages;
      });

      setTimeout(() => {
        if (!messageInputRef.current) return;

        if (shouldBlurAfterSend) {
          messageInputRef.current.blur();
          return;
        }

        messageInputRef.current.focus();
      }, 0);

      setTimeout(() => scrollToBottom("smooth"), 100);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((previous) =>
        previous.map((message) =>
          String(message.id) === String(optimisticMessage.id)
            ? { ...message, deliveryStatus: "failed" }
            : message,
        ),
      );
    }
  };

  const handleSendMessage = async (event) => {
    if (event.key !== "Enter" || event.shiftKey || !messageInput.trim()) {
      return;
    }

    event.preventDefault();
    await submitMessage();
  };

  const editGroupUsers = chats
    .filter((chat) => chat.type === "user" && !chat.isSavedMessages)
    .map((chat) => {
      const other = chat.members?.find(
        (member) =>
          (member._id || member.id) !== (currentUser?._id || currentUser?.id),
      );

      return {
        ...other,
        id: other?._id || other?.id,
        name: other?.nickname || other?.username || "Noma'lum",
      };
    })
    .filter((user) => user.id);

  const handleEditGroupSave = async (updatedData) => {
    try {
      await editChat(currentChat.id || currentChat._id, updatedData);
    } catch (error) {
      console.error("Guruhni tahrirlashda xatolik", error);
      throw error;
    }
  };

  const handleCopyChatLink = (slug) => {
    navigator.clipboard.writeText(`${RESOLVED_APP_BASE_URL}/${slug}`);
    toast.success("Havola nusxalandi");
  };

  const persistScrollOffset = (offset) => {
    if (!currentChatId || !currentUserId) {
      return;
    }

    saveCachedChatScrollOffset(currentUserId, currentChatId, offset);
  };

  const contextValue = useMemo(
    () => ({
      currentChat,
      currentUser,
      displayChat,
      selectedNav,
      previewChat,
      navigate,
      joinGroupChat,
      messages,
      messagesHasMore,
      isLoadingMessages,
      messagesCacheHydrated,
      initialHistoryReady,
      savedScrollOffset,
      messageGroups,
      contextMenu,
      replyMessage,
      setReplyMessage,
      editingMessage,
      cancelEditMessage,
      messageInput,
      messageRefs,
      messagesEndRef,
      initialScrollTargetMessageId,
      setInitialScrollTargetMessageId,
      messageInputRef,
      fetchMoreMessages,
      handleMessageDoubleClick,
      focusReplyTargetMessage,
      showContextMenu,
      handleContextMenuAction,
      handleUsernameClick,
      handleMemberProfileOpen,
      getUserAvatar: getUserAvatarInitials,
      renderMessageContent,
      navigatingMessageId,
      formatDate: formatMessageDate,
      handleInputChange,
      submitMessage,
      dismissLocalMessage,
      handleSendMessage,
      persistScrollOffset,
    }),
    [
      contextMenu,
      currentChat,
      currentUser,
      displayChat,
      editingMessage,
      cancelEditMessage,
      fetchMoreMessages,
      handleInputChange,
      submitMessage,
      dismissLocalMessage,
      handleSendMessage,
      joinGroupChat,
      handleMemberProfileOpen,
      messageGroups,
      messageInput,
      messages,
      messagesHasMore,
      isLoadingMessages,
      initialHistoryReady,
      messagesCacheHydrated,
      initialScrollTargetMessageId,
      navigate,
      previewChat,
      persistScrollOffset,
      replyMessage,
      savedScrollOffset,
      selectedNav,
      setInitialScrollTargetMessageId,
    ],
  );

  return {
    closeEditGroupDialog,
    contextValue,
    currentChat,
    currentChatName,
    currentUser,
    displayChat,
    editGroupUsers,
    handleCopyChatLink,
    handleDeleteChat,
    handleEditGroupSave,
    handleMemberClick,
    handleInfoSidebarClose,
    handleInfoSidebarToggle,
    headerMenuRef,
    isEditGroupDialogOpen,
    isOnline,
    isUserOnline,
    getUserLastSeen,
    lastSeenText,
    onlineCount,
    otherMember,
    startPrivateVideoCall,
    typingText,
  };
}
