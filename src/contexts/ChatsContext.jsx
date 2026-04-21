import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { io } from "socket.io-client";
import useAuthStore from "../store/authStore";
import * as chatApi from "../api/chatApi";
import { formatChatTime } from "../utils/dateUtils";
import dayjs from "dayjs";
import { buildSocketNamespaceUrl } from "../config/env";
import { showDesktopChatNotification } from "../utils/desktopNotifications";
import { normalizeReadByIds } from "../features/chats/chat-area/utils/chatAreaMessageUtils";
import {
  generateAndStoreKeyPair,
  loadStoredKeyPair,
  exportPublicKeyBase64,
  importPublicKeyFromBase64,
  deriveSharedKey,
  clearDerivedKey,
  clearStoredKeyPair,
  encryptMessage as e2eEncrypt,
  decryptMessage as e2eDecrypt,
  isE2EEnvelope,
} from "../utils/e2eCrypto";

const ChatsContext = createContext();
const deliveredNotificationKeys = new Set();

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

export const useChats = () => {
  return useContext(ChatsContext);
};

export const ChatsProvider = ({ children }) => {
  const authUser = useAuthStore((state) => state.user);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatsPage, setChatsPage] = useState(1);
  const [chatsHasMore, setChatsHasMore] = useState(true);
  const hasLoadedChatsRef = React.useRef(false);
  const [selectedNav, setSelectedNav] = useState(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const first = parts[0] || "chats";
    const knownNavs = [
      "home",
      "feed",
      "articles",
      "chats",
      "users",
      "groups",
      "courses",
      "my-courses",
      "arena",
      "profile",
    ];
    if (first === "a") return "chats";
    if (first === "my-courses") return "courses";
    return knownNavs.includes(first) ? first : "chats";
  });
  const [selectedChatId, setSelectedChatId] = useState(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (
      (parts[0] === "a" ||
        parts[0] === "articles" ||
        parts[0] === "users" ||
        parts[0] === "groups" ||
        parts[0] === "chats") &&
      parts[1]
    )
      return parts[1];
    return 0;
  });
  const [chatSocket, setChatSocket] = useState(null);
  const [chatReconnectKey, setChatReconnectKey] = useState(0);
  const [typingUsers, setTypingUsers] = useState({});
  const [previewChat, setPreviewChat] = useState(null);

  // E2EE state: chatId → { isE2EEnabled, e2ePublicKeys }
  const [e2eState, setE2EState] = useState({});
  // My own key pair (loaded from IndexedDB once)
  const myKeyPairRef = useRef(null);

  // Load (or generate) E2EE key pair once per authenticated session
  useEffect(() => {
    const currentUserId = authUser?._id || authUser?.id;
    if (!currentUserId) {
      myKeyPairRef.current = null;
      return;
    }
    loadStoredKeyPair().then((kp) => {
      if (kp) {
        myKeyPairRef.current = kp;
      }
      // Key pair is generated lazily in enableE2E() when user first activates E2EE
    });
  }, [authUser?._id, authUser?.id]);

  useEffect(() => {
    const currentUserId = authUser?._id || authUser?.id;
    if (!currentUserId) {
      setChatSocket((previousSocket) => {
        previousSocket?.disconnect();
        return null;
      });
      return undefined;
    }

    const socket = io(buildSocketNamespaceUrl("/chats"), {
      withCredentials: true,
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("Connected to /chats namespace");
      setChatReconnectKey((prev) => prev + 1);
    });

    setChatSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [authUser?._id, authUser?.id]);

  useEffect(() => {
    if (!chatSocket) return;

    const handleGlobalNewMessage = (rawMsg) => {
      let notificationChat = null;
      let shouldNotify = false;

      setChats((prev) => {
        const chatIndex = prev.findIndex((c) => c.id === rawMsg.chatId);
        if (chatIndex === -1) {
          fetchChats();
          return prev;
        }

        const newChats = [...prev];
        const chat = { ...newChats[chatIndex] };

        const isCurrentChat = matchesSelectedChat(chat, selectedChatId);

        chat.lastMessage = rawMsg.content;
        chat.hasMessages = true;
        chat.time = formatChatTime(rawMsg.createdAt);
        chat.date = dayjs(rawMsg.createdAt).format("YYYY-MM-DD");

        const currentUser = useAuthStore.getState().user || {};
        const currentUserId = currentUser._id || currentUser.id;
        const isOurMessage =
          (rawMsg.senderId?._id || rawMsg.senderId) === currentUserId;

        notificationChat = chat;

        if (!isCurrentChat && !isOurMessage) {
          chat.unread = (chat.unread || 0) + 1;
          shouldNotify = true;
        }

        newChats.splice(chatIndex, 1);
        newChats.unshift(chat);
        return newChats;
      });

      if (shouldNotify) {
        const notificationKey = String(
          rawMsg._id ||
            rawMsg.id ||
            `${rawMsg.chatId}:${rawMsg.senderId?._id || rawMsg.senderId}:${rawMsg.createdAt || rawMsg.content}`,
        );

        if (deliveredNotificationKeys.has(notificationKey)) {
          return;
        }

        deliveredNotificationKeys.add(notificationKey);
        window.setTimeout(() => {
          deliveredNotificationKeys.delete(notificationKey);
        }, 60_000);

        const senderName =
          rawMsg.senderId?.nickname || rawMsg.senderId?.username || "Yangi xabar";
        const notificationPath = notificationChat?.isGroup
          ? `/groups/${notificationChat.urlSlug || notificationChat.jammId || notificationChat.id}`
          : `/users/${notificationChat?.urlSlug || notificationChat?.jammId || notificationChat?.id}`;
        const body = notificationChat?.isGroup
          ? `${notificationChat.name || "Guruh"}: ${rawMsg.content || "Yangi xabar"}`
          : rawMsg.content || "Yangi xabar";

        showDesktopChatNotification({
          title: senderName,
          body,
          icon: rawMsg.senderId?.avatar || undefined,
          path: notificationPath,
        });
      }
    };

    const handleGlobalMessagesRead = ({ chatId, readByUserId, messageIds }) => {
      const currentUser = useAuthStore.getState().user || {};
      const currentUserId = currentUser._id || currentUser.id;

      if (String(readByUserId) === String(currentUserId)) {
        setChats((prev) =>
          prev.map((c) => {
            if (String(c.id) === String(chatId)) {
              return {
                ...c,
                unread: Math.max(0, (c.unread || 0) - messageIds.length),
              };
            }
            return c;
          }),
        );
      }
    };

    const handleChatUpdated = (data) => {
      const currentUser = useAuthStore.getState().user || {};
      const currentUserId = currentUser?._id || currentUser?.id;

      if (data.members && currentUserId) {
        const isStillMember = data.members.some((m) => {
          const mid = m._id || m.id || m;
          return String(mid) === String(currentUserId);
        });

        if (!isStillMember) {
          setChats((prev) => prev.filter((c) => c.id !== data.chatId));
          return;
        }
      }

      setChats((prev) => {
        const index = prev.findIndex((c) => c.id === data.chatId);
        if (index !== -1) {
          const newChats = [...prev];
          newChats[index] = {
            ...newChats[index],
            ...data,
            time:
              data.lastMessageAt === null
                ? "Oldin"
                : data.lastMessageAt
                  ? formatChatTime(data.lastMessageAt)
                  : newChats[index].time,
            date:
              data.lastMessageAt === null
                ? "Oldin"
                : data.lastMessageAt
                  ? dayjs(data.lastMessageAt).format("YYYY-MM-DD")
                  : newChats[index].date,
            hasMessages:
              typeof data.lastMessage === "string"
                ? Boolean(data.lastMessage)
                : newChats[index].hasMessages,
          };
          return newChats;
        }
        fetchChats(1);
        return prev;
      });
    };

    const handleUserTyping = ({ chatId, userId, isTyping }) => {
      setTypingUsers((prev) => {
        const chatTyping = { ...(prev[chatId] || {}) };
        if (isTyping) {
          chatTyping[userId] = Date.now();
        } else {
          delete chatTyping[userId];
        }
        return { ...prev, [chatId]: chatTyping };
      });
    };

    const handleChatDeleted = ({ chatId }) => {
      setChats((prev) => prev.filter((c) => c.id !== chatId));
      if (
        String(selectedChatId) === String(chatId) ||
        String(selectedChatId) === "0"
      ) {
        // Option: navigate back or clear selection if the deleted chat was active
        // But context doesn't have navigate easily here without passing it
        // The component using the chat will handle it by seeing currentChat is undefined
      }
    };

    const handleE2EUpdated = ({ chatId, isE2EEnabled, e2ePublicKeys }) => {
      setE2EState((prev) => ({
        ...prev,
        [chatId]: { isE2EEnabled, e2ePublicKeys: e2ePublicKeys || {} },
      }));
      // Invalidate cached derived key so it's re-derived with new public key
      clearDerivedKey(chatId);
    };

    chatSocket.on("message_new", handleGlobalNewMessage);
    chatSocket.on("messages_read", handleGlobalMessagesRead);
    chatSocket.on("chat_updated", handleChatUpdated);
    chatSocket.on("user_typing", handleUserTyping);
    chatSocket.on("chat_deleted", handleChatDeleted);
    chatSocket.on("chat_e2e_updated", handleE2EUpdated);

    return () => {
      chatSocket.off("message_new");
      chatSocket.off("messages_read");
      chatSocket.off("chat_updated");
      chatSocket.off("user_typing");
      chatSocket.off("chat_deleted");
      chatSocket.off("chat_e2e_updated");
    };
  }, [chatSocket, selectedChatId]);

  // Clean up stale typing indicators (older than 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTypingUsers((prev) => {
        let changed = false;
        const newState = { ...prev };
        Object.keys(newState).forEach((chatId) => {
          const chatTyping = { ...newState[chatId] };
          Object.keys(chatTyping).forEach((userId) => {
            if (now - chatTyping[userId] > 5000) {
              delete chatTyping[userId];
              changed = true;
            }
          });
          if (Object.keys(chatTyping).length === 0) {
            delete newState[chatId];
          } else {
            newState[chatId] = chatTyping;
          }
        });
        return changed ? newState : prev;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const sendTypingStatus = useCallback(
    (chatId, isTyping) => {
      if (!chatSocket || !chatId) return;
      chatSocket.emit(isTyping ? "typing_start" : "typing_stop", { chatId });
    },
    [chatSocket],
  );

  /**
   * Get or derive the AES shared key for the given chat.
   * Returns null if E2EE is not active or keys are missing.
   */
  const getSharedKeyForChat = useCallback(
    async (chatId) => {
      const state = e2eState[chatId];
      if (!state?.isE2EEnabled) return null;

      const myKP = myKeyPairRef.current;
      if (!myKP) return null;

      const currentUser = useAuthStore.getState().user || {};
      const myId = String(currentUser._id || currentUser.id);
      const keys = state.e2ePublicKeys || {};
      const theirKey = Object.entries(keys).find(([id]) => id !== myId)?.[1];
      if (!theirKey) return null;

      try {
        const theirCryptoKey = await importPublicKeyFromBase64(theirKey);
        return deriveSharedKey(chatId, myKP.privateKey, theirCryptoKey);
      } catch {
        return null;
      }
    },
    [e2eState],
  );

  /**
   * Decrypt a single message content string if it is an E2E envelope.
   * Falls back to returning the original content if decryption fails.
   */
  const decryptContent = useCallback(
    async (chatId, content) => {
      if (!isE2EEnvelope(content)) return content;
      const sharedKey = await getSharedKeyForChat(chatId);
      if (!sharedKey) return content; // can't decrypt yet
      const plaintext = await e2eDecrypt(content, sharedKey);
      return plaintext ?? content;
    },
    [getSharedKeyForChat],
  );

  const fetchChats = useCallback(async (page = 1) => {
    try {
      if (page === 1) setLoading(true);
      const currentUser = useAuthStore.getState().user;
      if (!currentUser?._id && !currentUser?.id) return;

      const res = await chatApi.fetchChats(page, 15);
      const rawChats = res?.data || [];
      const totalPages = res?.totalPages || 1;

      const resolvedCurrentUser = useAuthStore.getState().user || {};
      const currentUserId = resolvedCurrentUser._id || resolvedCurrentUser.id;

      const formatted = rawChats.map((chat) => {
        let displayInfo = { name: "Noma'lum", avatar: "" };

        if (chat.isGroup) {
          displayInfo = {
            name: chat.name,
            avatar: chat.avatar || chat.name?.charAt(0),
            urlSlug: chat.privateurl || chat._id,
          };
        } else {
          const other = chat.members.find(
            (m) => String(m._id || m.id) !== String(currentUserId),
          );
          if (other) {
            displayInfo = {
              name: other.nickname,
              username: other.username,
              avatar:
                other.avatar || (other.nickname || other.username).charAt(0),
              urlSlug: other.username,
              premiumStatus: other.premiumStatus,
              selectedProfileDecorationId: other.selectedProfileDecorationId,
              customProfileDecorationImage: other.customProfileDecorationImage,
              isOfficialProfile: other.isOfficialProfile,
              officialBadgeKey: other.officialBadgeKey,
              officialBadgeLabel: other.officialBadgeLabel,
              hidePresence: other.hidePresence,
              disableCalls: other.disableCalls,
              disableGroupInvites: other.disableGroupInvites,
            };
          } else {
            displayInfo = {
              name: "Saqlangan xabarlar",
              avatar: "",
              username: resolvedCurrentUser.username,
              urlSlug: resolvedCurrentUser.username || chat._id,
              isSavedMessages: true,
            };
          }
        }

        return {
          id: chat._id,
          jammId: chat.jammId,
          privateurl: chat.privateurl || displayInfo.urlSlug || null,
          isGroup: !!chat.isGroup,
          type: chat.isGroup ? "group" : "user",
          name: displayInfo.name,
          username: displayInfo.username,
          avatar: displayInfo.avatar,
          isSavedMessages: displayInfo.isSavedMessages,
          premiumStatus: displayInfo.premiumStatus,
          selectedProfileDecorationId: displayInfo.selectedProfileDecorationId,
          customProfileDecorationImage:
            displayInfo.customProfileDecorationImage,
          isOfficialProfile: displayInfo.isOfficialProfile,
          officialBadgeKey: displayInfo.officialBadgeKey,
          officialBadgeLabel: displayInfo.officialBadgeLabel,
          hidePresence: displayInfo.hidePresence,
          disableCalls: displayInfo.disableCalls,
          disableGroupInvites: displayInfo.disableGroupInvites,
          urlSlug:
            chat.privateurl ||
            displayInfo.urlSlug ||
            (chat.jammId ? String(chat.jammId) : chat._id),
          unread: chat.unreadCount || 0,
          lastMessage:
            chat.lastMessage ||
            (chat.isGroup ? "Guruh yaratildi" : "Suhbat boshlandi"),
          time: chat.lastMessageAt
            ? formatChatTime(chat.lastMessageAt)
            : "Oldin",
          date: chat.lastMessageAt
            ? dayjs(chat.lastMessageAt).format("YYYY-MM-DD")
            : "Oldin",
          members: chat.members,
          createdBy: chat.createdBy,
          admins: chat.admins || [],
          hasMessages: !!chat.lastMessage,
        };
      });

      setChats((prev) => (page === 1 ? formatted : [...prev, ...formatted]));
      setChatsPage(page);
      setChatsHasMore(page < totalPages);
      if (page === 1) {
        hasLoadedChatsRef.current = true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (page === 1) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const currentUserId = authUser?._id || authUser?.id;
    if (!currentUserId) return undefined;

    const handleOnline = () => {
      fetchChats(1);
      setChatReconnectKey((prev) => prev + 1);
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [authUser?._id, authUser?.id, fetchChats]);

  useEffect(() => {
    const currentUserId = authUser?._id || authUser?.id;
    if (!currentUserId || chatReconnectKey === 0) return;
    fetchChats(1);
  }, [authUser?._id, authUser?.id, chatReconnectKey, fetchChats]);

  const ensureChatsLoaded = useCallback(async () => {
    if (hasLoadedChatsRef.current) return;
    await fetchChats(1);
  }, [fetchChats]);

  const createChat = async (dto) => {
    const data = await chatApi.createChat(dto);
    fetchChats();
    return data;
  };

  const editChat = async (chatId, dto) => {
    await chatApi.editChat({ chatId, dto });
    fetchChats();
  };

  const deleteChat = async (chatId) => {
    await chatApi.deleteChat(chatId);
    setChats((prev) => prev.filter((c) => c.id !== chatId));
  };

  const leaveChat = async (chatId) => {
    await chatApi.leaveChat(chatId);
    setChats((prev) => prev.filter((c) => c.id !== chatId));
  };

  const fetchMessages = useCallback(
    async (chatId, before = null) => {
      if (!chatId) return { data: [], hasMore: false, nextCursor: null };
      const res = await chatApi.fetchMessages(chatId, before);

      const mapped = await Promise.all(
        (res.data || []).map(async (msg) => {
          const rawContent = msg.content;
          const content = await decryptContent(chatId, rawContent);
          const replayToContent = msg.replayTo?.content
            ? await decryptContent(chatId, msg.replayTo.content)
            : null;

          return {
            id: msg._id,
            user: msg.senderId?.nickname || msg.senderId?.username,
            senderId: msg.senderId?._id || msg.senderId,
            avatar:
              msg.senderId?.avatar ||
              (msg.senderId?.nickname || msg.senderId?.username)?.charAt(0) ||
              "U",
            username: msg.senderId?.username,
            premiumStatus: msg.senderId?.premiumStatus,
            selectedProfileDecorationId:
              msg.senderId?.selectedProfileDecorationId,
            customProfileDecorationImage:
              msg.senderId?.customProfileDecorationImage,
            isOfficialProfile: msg.senderId?.isOfficialProfile,
            officialBadgeKey: msg.senderId?.officialBadgeKey,
            officialBadgeLabel: msg.senderId?.officialBadgeLabel,
            content,
            timestamp: dayjs(msg.createdAt).format("HH:mm"),
            date: dayjs(msg.createdAt).format("YYYY-MM-DD"),
            createdAt: msg.createdAt,
            edited: msg.isEdited,
            isDeleted: msg.isDeleted,
            replayTo: msg.replayTo
              ? {
                  id: msg.replayTo._id,
                  user:
                    msg.replayTo.senderId?.nickname ||
                    msg.replayTo.senderId?.username,
                  content: replayToContent,
                }
              : null,
            readBy: normalizeReadByIds(msg.readBy),
          };
        }),
      );

      return {
        data: mapped,
        hasMore: Boolean(res.hasMore),
        nextCursor: res.nextCursor || null,
      };
    },
    [decryptContent],
  );

  const sendMessage = useCallback(async (chatId, content, replayToId) => {
    // If E2EE is active for this chat, encrypt before sending
    let outgoingContent = content;
    const sharedKey = await getSharedKeyForChat(chatId);
    if (sharedKey) {
      outgoingContent = await e2eEncrypt(content, sharedKey);
    }

    const msg = await chatApi.sendMessage({
      chatId,
      content: outgoingContent,
      replayToId,
    });
    return {
      id: msg._id,
      user: msg.senderId?.nickname || msg.senderId?.username,
      senderId: msg.senderId?._id || msg.senderId,
      avatar:
        msg.senderId?.avatar ||
        (msg.senderId?.nickname || msg.senderId?.username)?.charAt(0) ||
        "U",
      username: msg.senderId?.username,
      premiumStatus: msg.senderId?.premiumStatus,
      selectedProfileDecorationId: msg.senderId?.selectedProfileDecorationId,
      customProfileDecorationImage: msg.senderId?.customProfileDecorationImage,
      isOfficialProfile: msg.senderId?.isOfficialProfile,
      officialBadgeKey: msg.senderId?.officialBadgeKey,
      officialBadgeLabel: msg.senderId?.officialBadgeLabel,
      // For E2E: server echoes the ciphertext back; we already know the plaintext
      content: sharedKey ? content : msg.content,
      timestamp: dayjs(msg.createdAt).format("HH:mm"),
      date: dayjs(msg.createdAt).format("YYYY-MM-DD"),
      createdAt: msg.createdAt,
      edited: msg.isEdited,
      isDeleted: msg.isDeleted,
      readBy: normalizeReadByIds(msg.readBy),
      replayTo: msg.replayTo
        ? {
            id: msg.replayTo._id || msg.replayTo.id,
            user:
              msg.replayTo.senderId?.nickname ||
              msg.replayTo.senderId?.username ||
              msg.replayTo.user,
            content: msg.replayTo.content,
      }
        : null,
    };
  }, [getSharedKeyForChat]);

  const editMessage = useCallback(async (messageId, content) => {
    const msg = await chatApi.editMessage({ messageId, content });
    return {
      id: msg._id,
      content: msg.content,
      edited: msg.isEdited,
      createdAt: msg.createdAt,
    };
  }, []);

  const markMessagesAsRead = useCallback(
    (chatId, messageIds) => {
      if (!chatSocket || !chatId || !messageIds?.length) return;
      chatSocket.emit("read_messages", { chatId, messageIds });
    },
    [chatSocket],
  );

  const resolveChatSlug = useCallback(async (slug) => {
    return chatApi.resolveChatSlug(slug);
  }, []);

  const searchGlobalUsers = useCallback(async (query) => {
    if (!query) return [];
    const data = await chatApi.searchGlobalUsers(query);
    return data.map((u) => ({
      id: u._id,
      name: u.nickname || u.username,
      username: u.username,
      avatar: u.avatar || (u.nickname || u.username).charAt(0),
      isOfficialProfile: u.isOfficialProfile,
      officialBadgeKey: u.officialBadgeKey,
      officialBadgeLabel: u.officialBadgeLabel,
      hidePresence: u.hidePresence,
      disableCalls: u.disableCalls,
      disableGroupInvites: u.disableGroupInvites,
    }));
  }, []);

  const searchUsers = useCallback(async (query) => {
    if (!query) return [];
    const data = await chatApi.searchPrivateUsers(query);
    return data.map((u) => ({
      id: u.id || u._id,
      name: u.name || u.nickname || u.username,
      username: u.username,
      avatar: u.avatar || (u.name || u.nickname || u.username).charAt(0),
      premiumStatus: u.premiumStatus,
      selectedProfileDecorationId: u.selectedProfileDecorationId,
      customProfileDecorationImage: u.customProfileDecorationImage,
      isOfficialProfile: u.isOfficialProfile,
      officialBadgeKey: u.officialBadgeKey,
      officialBadgeLabel: u.officialBadgeLabel,
      hidePresence: u.hidePresence,
      disableCalls: u.disableCalls,
      disableGroupInvites: u.disableGroupInvites,
    }));
  }, []);

  const searchGroups = useCallback(async (query) => {
    if (!query) return [];
    const data = await chatApi.searchGroupChats(query);
    return data.map((group) => ({
      id: group.id || group._id,
      privateurl: group.privateurl || group.urlSlug || null,
      urlSlug: group.privateurl || group.urlSlug || group.jammId || group.id,
      name: group.name,
      avatar: group.avatar || (group.name || "").charAt(0),
      lastMessage: group.lastMessage || "",
      membersCount: group.membersCount || 0,
      lastMessageAt: group.lastMessageAt || null,
    }));
  }, []);

  const getUserByUsername = async (username) => {
    try {
      return await chatApi.getUserByUsername(username);
    } catch {
      return null;
    }
  };

  /**
   * Enable E2EE for the given private chat.
   * Generates a key pair if not already done, registers the public key with the server.
   * When the other participant does the same, the server activates E2EE automatically.
   */
  const enableE2E = useCallback(
    async (chatId) => {
      // Generate key pair if not yet created
      if (!myKeyPairRef.current) {
        myKeyPairRef.current = await generateAndStoreKeyPair();
      }

      const publicKeyBase64 = await exportPublicKeyBase64();
      if (!publicKeyBase64) throw new Error("E2E kalit generatsiya qilinmadi");

      const result = await chatApi.registerE2EPublicKey(chatId, publicKeyBase64);

      // Fetch current E2E status to get the other participant's key
      const status = await chatApi.getE2EStatus(chatId);
      setE2EState((prev) => ({
        ...prev,
        [chatId]: {
          isE2EEnabled: status.isE2EEnabled,
          e2ePublicKeys: status.e2ePublicKeys || {},
        },
      }));
      clearDerivedKey(chatId);

      return result;
    },
    [],
  );

  /**
   * Disable E2EE for a chat and clear local crypto state.
   */
  const disableE2E = useCallback(async (chatId) => {
    await chatApi.disableE2E(chatId);
    setE2EState((prev) => {
      const next = { ...prev };
      delete next[chatId];
      return next;
    });
    clearDerivedKey(chatId);
  }, []);

  /**
   * Load E2E status from server for the given chat (e.g., on chat open).
   */
  const loadE2EStatus = useCallback(async (chatId) => {
    if (!chatId) return;
    try {
      const status = await chatApi.getE2EStatus(chatId);
      setE2EState((prev) => ({
        ...prev,
        [chatId]: {
          isE2EEnabled: status.isE2EEnabled,
          e2ePublicKeys: status.e2ePublicKeys || {},
        },
      }));
    } catch {
      // not a private chat or network error — silently ignore
    }
  }, []);

  const getAllUsers = useCallback(async () => {
    try {
      const data = await chatApi.getAllUsers();
      return data.map((u) => ({
        id: u._id,
        name: u.nickname || u.username,
        username: u.username,
        avatar: u.avatar || (u.nickname || u.username || "").charAt(0),
        premiumStatus: u.premiumStatus,
        selectedProfileDecorationId: u.selectedProfileDecorationId,
        customProfileDecorationImage: u.customProfileDecorationImage,
        isOfficialProfile: u.isOfficialProfile,
        officialBadgeKey: u.officialBadgeKey,
        officialBadgeLabel: u.officialBadgeLabel,
        hidePresence: u.hidePresence,
        disableCalls: u.disableCalls,
        disableGroupInvites: u.disableGroupInvites,
      }));
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    if (["chats", "groups", "users"].includes(selectedNav)) {
      ensureChatsLoaded();
    }
  }, [ensureChatsLoaded, selectedNav, authUser]);

  useEffect(() => {
    if (!selectedChatId || selectedChatId === "0") return;
    setChats((prev) =>
      prev.map((c) => {
        if (matchesSelectedChat(c, selectedChatId)) {
          return { ...c, unread: 0 };
        }
        return c;
      }),
    );
  }, [selectedChatId]);

  const value = {
    chats,
    loading,
    chatsPage,
    chatsHasMore,
    fetchChats,
    ensureChatsLoaded,
    createChat,
    editChat,
    deleteChat,
    leaveChat,
    fetchMessages,
    sendMessage,
    editMessage,
    markMessagesAsRead,
    resolveChatSlug,
    searchUsers,
    searchGroups,
    getUserByUsername,
    getAllUsers,
    selectedNav,
    setSelectedNav,
    selectedChatId,
    setSelectedChatId,
    chatSocket,
    chatReconnectKey,
    typingUsers,
    sendTypingStatus,
    searchGlobalUsers,
    previewGroupChat: async (slug) => {
      return chatApi.previewGroupChat(slug);
    },
    joinGroupChat: async (slug) => {
      const data = await chatApi.joinGroupChat(slug);
      fetchChats();
      return data;
    },
    deleteMessage: async (messageId) => {
      await chatApi.deleteMessage(messageId);
      fetchChats();
    },
    previewChat,
    setPreviewChat,
    // E2EE
    e2eState,
    enableE2E,
    disableE2E,
    loadE2EStatus,
    decryptContent,
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
};
