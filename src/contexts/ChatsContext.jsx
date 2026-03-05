import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import useAuthStore from "../store/authStore";
import * as chatApi from "../api/chatApi";
import { formatChatTime } from "../utils/dateUtils";
import dayjs from "dayjs";

const ChatsContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useChats = () => {
  return useContext(ChatsContext);
};

export const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatsPage, setChatsPage] = useState(1);
  const [chatsHasMore, setChatsHasMore] = useState(true);
  const [selectedNav, setSelectedNav] = useState(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const first = parts[0] || "home";
    const knownNavs = [
      "home",
      "feed",
      "chats",
      "users",
      "groups",
      "meets",
      "courses",
      "arena",
      "profile",
    ];
    if (first === "a") return "chats";
    return knownNavs.includes(first) ? first : "feed";
  });
  const [selectedChannel, setSelectedChannel] = useState(() => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (
      (parts[0] === "a" ||
        parts[0] === "users" ||
        parts[0] === "groups" ||
        parts[0] === "chats") &&
      parts[1]
    )
      return parts[1];
    return 0;
  });
  const [chatSocket, setChatSocket] = useState(null);
  const [typingUsers, setTypingUsers] = useState({});
  const [previewChat, setPreviewChat] = useState(null);

  useEffect(() => {
    const token = useAuthStore.getState().token;
    if (!token) return;

    const baseUrl = API_URL.replace(/\/$/, "");
    const socket = io(`${baseUrl}/chats`, {
      auth: { token },
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      console.log("Connected to /chats namespace");
    });

    setChatSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!chatSocket) return;

    const handleGlobalNewMessage = (rawMsg) => {
      setChats((prev) => {
        const chatIndex = prev.findIndex((c) => c.id === rawMsg.chatId);
        if (chatIndex === -1) {
          fetchChats();
          return prev;
        }

        const newChats = [...prev];
        const chat = { ...newChats[chatIndex] };

        const isCurrentChat =
          String(chat.urlSlug) === String(selectedChannel) ||
          String(chat.id) === String(selectedChannel);

        chat.lastMessage = rawMsg.content;
        chat.hasMessages = true;
        chat.time = formatChatTime(rawMsg.createdAt);
        chat.date = dayjs(rawMsg.createdAt).format("YYYY-MM-DD");

        const currentUser = useAuthStore.getState().user || {};
        const currentUserId = currentUser._id || currentUser.id;
        const isOurMessage =
          (rawMsg.senderId?._id || rawMsg.senderId) === currentUserId;

        if (!isCurrentChat && !isOurMessage) {
          chat.unread = (chat.unread || 0) + 1;
        }

        newChats.splice(chatIndex, 1);
        newChats.unshift(chat);
        return newChats;
      });
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
          };
          return newChats;
        }
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

    chatSocket.on("message_new", handleGlobalNewMessage);
    chatSocket.on("messages_read", handleGlobalMessagesRead);
    chatSocket.on("chat_updated", handleChatUpdated);
    chatSocket.on("user_typing", handleUserTyping);

    return () => {
      chatSocket.off("message_new");
      chatSocket.off("messages_read");
      chatSocket.off("chat_updated");
      chatSocket.off("user_typing");
    };
  }, [chatSocket, selectedChannel]);

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

  const fetchChats = useCallback(async (page = 1) => {
    try {
      if (page === 1) setLoading(true);
      const token = useAuthStore.getState().token;
      if (!token) return;

      const res = await chatApi.fetchChats(page, 15);
      const rawChats = res?.data || [];
      const totalPages = res?.totalPages || 1;

      const currentUser = useAuthStore.getState().user || {};
      const currentUserId = currentUser._id || currentUser.id;

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
              name: other.nickname || other.username,
              avatar:
                other.avatar || (other.nickname || other.username).charAt(0),
              urlSlug: other.username,
              premiumStatus: other.premiumStatus,
            };
          } else {
            displayInfo = {
              name: "Saqlangan xabarlar",
              avatar: "",
              urlSlug: chat._id,
              isSavedMessages: true,
            };
          }
        }

        return {
          id: chat._id,
          jammId: chat.jammId,
          type: chat.isGroup ? "group" : "user",
          name: displayInfo.name,
          avatar: displayInfo.avatar,
          isSavedMessages: displayInfo.isSavedMessages,
          premiumStatus: displayInfo.premiumStatus,
          urlSlug: chat.jammId
            ? String(chat.jammId)
            : displayInfo.urlSlug || chat._id,
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
    } catch (error) {
      console.error(error);
    } finally {
      if (page === 1) setLoading(false);
    }
  }, []);

  const createChat = async (dto) => {
    const data = await chatApi.createChat(dto);
    fetchChats();
    return data;
  };

  const editChat = async (chatId, dto) => {
    await chatApi.editChat({ chatId, dto });
    fetchChats();
  };

  const fetchMessages = useCallback(async (chatId, page = 1, limit = 30) => {
    if (!chatId) return { data: [], totalPages: 1 };
    const res = await chatApi.fetchMessages(chatId, page, limit);
    return {
      data: (res.data || []).map((msg) => ({
        id: msg._id,
        user: msg.senderId?.nickname || msg.senderId?.username,
        senderId: msg.senderId?._id || msg.senderId,
        avatar:
          msg.senderId?.avatar ||
          (msg.senderId?.nickname || msg.senderId?.username)?.charAt(0) ||
          "U",
        content: msg.content,
        timestamp: dayjs(msg.createdAt).format("HH:mm"),

        readBy: msg.readBy || [],
      })),
      totalPages: res.totalPages || 1,
      page: res.page || 1,
    };
  }, []);

  const sendMessage = useCallback(async (chatId, content, replayToId) => {
    const msg = await chatApi.sendMessage({ chatId, content, replayToId });
    return {
      id: msg._id,
      user: msg.senderId?.nickname || msg.senderId?.username,
      senderId: msg.senderId?._id || msg.senderId,
      avatar:
        msg.senderId?.avatar ||
        (msg.senderId?.nickname || msg.senderId?.username)?.charAt(0) ||
        "U",
      content: msg.content,
      timestamp: dayjs(msg.createdAt).format("HH:mm"),
      readBy: msg.readBy || [],
      replayTo: msg.replayTo || null,
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

  const searchUsers = useCallback(async (query) => {
    if (!query) return [];
    const data = await chatApi.searchUsers(query);
    return data.map((u) => ({
      id: u._id,
      name: u.nickname || u.username,
      username: u.username,
      avatar: u.avatar || (u.nickname || u.username).charAt(0),
    }));
  }, []);

  const getUserByUsername = async (username) => {
    try {
      return await chatApi.getUserByUsername(username);
    } catch {
      return null;
    }
  };

  const getAllUsers = useCallback(async () => {
    try {
      const data = await chatApi.getAllUsers();
      return data.map((u) => ({
        id: u._id,
        name: u.nickname || u.username,
        username: u.username,
        avatar: u.avatar || (u.nickname || u.username || "").charAt(0),
        premiumStatus: u.premiumStatus,
      }));
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    // Moved to ChannelSidebar for lazy loading
  }, []);

  useEffect(() => {
    if (!selectedChannel || selectedChannel === "0") return;
    setChats((prev) =>
      prev.map((c) => {
        if (
          String(c.urlSlug) === String(selectedChannel) ||
          String(c.id) === String(selectedChannel)
        ) {
          return { ...c, unread: 0 };
        }
        return c;
      }),
    );
  }, [selectedChannel]);

  const value = {
    chats,
    loading,
    chatsPage,
    chatsHasMore,
    fetchChats,
    createChat,
    editChat,
    fetchMessages,
    sendMessage,
    markMessagesAsRead,
    resolveChatSlug,
    searchUsers,
    getUserByUsername,
    getAllUsers,
    selectedNav,
    setSelectedNav,
    selectedChannel,
    setSelectedChannel,
    chatSocket,
    typingUsers,
    sendTypingStatus,
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
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
};
