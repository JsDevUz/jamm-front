import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { io } from "socket.io-client";

const ChatsContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useChats = () => {
  return useContext(ChatsContext);
};

export const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNav, setSelectedNav] = useState("home");
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [chatSocket, setChatSocket] = useState(null);
  const [typingUsers, setTypingUsers] = useState({}); // { chatId: { userId: timestamp } }

  useEffect(() => {
    const token = localStorage.getItem("token");
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
        chat.time = new Date(rawMsg.createdAt).toLocaleDateString("uz-UZ", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
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
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
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
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
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

  const fetchChats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_URL}/chats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      const currentUserId = currentUser._id || currentUser.id;

      const formatted = data.map((chat) => {
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
          urlSlug: chat.jammId
            ? String(chat.jammId)
            : displayInfo.urlSlug || chat._id,
          unread: chat.unreadCount || 0,
          lastMessage:
            chat.lastMessage ||
            (chat.isGroup ? "Guruh yaratildi" : "Suhbat boshlandi"),
          time: chat.lastMessageAt
            ? new Date(chat.lastMessageAt).toLocaleDateString("uz-UZ", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Oldin",
          members: chat.members,
          createdBy: chat.createdBy,
          admins: chat.admins || [],
        };
      });

      setChats(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createChat = async (dto) => {
    const res = await fetch(`${API_URL}/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(dto),
    });
    const newChat = await res.json();
    fetchChats();
    return String(newChat.jammId || newChat._id);
  };

  const editChat = async (chatId, dto) => {
    await fetch(`${API_URL}/chats/${chatId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(dto),
    });
    fetchChats();
  };

  const fetchMessages = useCallback(async (chatId) => {
    if (!chatId) return [];
    const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    return data.map((msg) => ({
      id: msg._id,
      user: msg.senderId?.nickname || msg.senderId?.username,
      senderId: msg.senderId?._id || msg.senderId,
      avatar:
        msg.senderId?.avatar ||
        (msg.senderId?.nickname || msg.senderId?.username)?.charAt(0) ||
        "U",
      content: msg.content,
      timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      readBy: msg.readBy || [],
    }));
  }, []);

  const sendMessage = useCallback(
    async (chatId, content, replayToId) => {
      const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content, replayToId }),
      });
      fetchChats();
      return res.json();
    },
    [fetchChats],
  );

  const markMessagesAsRead = useCallback(
    (chatId, messageIds) => {
      if (!chatSocket || !chatId || !messageIds?.length) return;
      chatSocket.emit("read_messages", { chatId, messageIds });
    },
    [chatSocket],
  );

  const resolveChatSlug = useCallback(async (slug) => {
    const res = await fetch(`${API_URL}/chats/resolve/${slug}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  }, []);

  const searchUsers = async (query) => {
    if (!query) return [];
    const res = await fetch(`${API_URL}/users/search?q=${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    return data.map((u) => ({
      id: u._id,
      name: u.nickname || u.username,
      username: u.username,
      avatar: u.avatar || (u.nickname || u.username).charAt(0),
    }));
  };

  const getUserByUsername = async (username) => {
    const res = await fetch(`${API_URL}/users/by-username/${username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!res.ok) return null;
    return res.json();
  };

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

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
    fetchChats,
    createChat,
    editChat,
    fetchMessages,
    sendMessage,
    markMessagesAsRead,
    resolveChatSlug,
    searchUsers,
    getUserByUsername,
    selectedNav,
    setSelectedNav,
    selectedChannel,
    setSelectedChannel,
    chatSocket,
    typingUsers,
    sendTypingStatus,
    previewGroupChat: async (slug) => {
      const res = await fetch(`${API_URL}/chats/preview/${slug}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Guruh topilmadi");
      return res.json();
    },
    joinGroupChat: async (slug) => {
      const res = await fetch(`${API_URL}/chats/join/${slug}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Guruhga qo'shilish imkonsiz");
      fetchChats();
      return res.json();
    },
    deleteMessage: async (messageId) => {
      await fetch(`${API_URL}/chats/messages/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchChats();
    },
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
};
