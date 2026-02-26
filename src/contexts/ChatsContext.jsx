import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ChatsContext = createContext();

// Use the API URL from process.env or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useChats = () => {
  return useContext(ChatsContext);
};

export const ChatsProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchChats = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_URL}/chats`, {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch chats");
      const data = await res.json();

      // Map MongoDB _id to frontend id, and format the structure
      const formattedChats = data.map((chat) => {
        // Find other member if it is a 1-to-1 chat to display their info
        let displayInfo = { name: "Noma'lum", avatar: "A" };

        if (chat.isGroup) {
          displayInfo = {
            name: chat.name || "Guruh",
            avatar: chat.avatar || chat.name?.charAt(0) || "G",
          };
        } else {
          // It's a 1-on-1 private chat. Get currentUser from localStorage first
          const currentUserStr = localStorage.getItem("user");
          const currentUser = currentUserStr
            ? JSON.parse(currentUserStr)
            : null;

          if (currentUser && chat.members) {
            const otherMember = chat.members.find(
              (m) => m._id !== currentUser.id,
            );
            if (otherMember) {
              displayInfo = {
                name: otherMember.nickname || otherMember.username,
                avatar:
                  otherMember.avatar ||
                  (otherMember.nickname || otherMember.username).charAt(0),
              };
            }
          }
        }

        return {
          id: chat._id,
          type: chat.isGroup ? "group" : "user",
          name: displayInfo.name,
          avatar: displayInfo.avatar,
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
          unread: 0, // Not implemented yet
          members: chat.members,
        };
      });

      setChats(formattedChats);
    } catch (error) {
      console.error("Error fetching user chats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createChat = async ({
    isGroup,
    name,
    memberIds,
    description,
    avatar,
  }) => {
    try {
      const res = await fetch(`${API_URL}/chats`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ isGroup, name, memberIds, description, avatar }),
      });
      if (!res.ok) throw new Error("Failed to create chat");
      const newChat = await res.json();
      await fetchChats(); // Refresh list
      return newChat._id;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      if (!chatId) return [];
      const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();

      return data.map((msg) => ({
        id: msg._id,
        user: msg.senderId?.nickname || msg.senderId?.username,
        avatar:
          msg.senderId?.avatar ||
          (msg.senderId?.nickname || msg.senderId?.username)?.charAt(0) ||
          "U",
        senderId: msg.senderId?._id,
        content: msg.content,
        timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date(msg.createdAt).toDateString(),
        edited: msg.isEdited,
        isDeleted: msg.isDeleted,
        replayTo: msg.replayTo
          ? {
              id: msg.replayTo._id,
              user:
                msg.replayTo.senderId?.nickname ||
                msg.replayTo.senderId?.username,
              content: msg.replayTo.content,
            }
          : null,
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  const sendMessage = async (chatId, content, replayToId = null) => {
    try {
      const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ content, replayToId }),
      });
      if (!res.ok) throw new Error("Failed to send message");

      // Refresh chats list to update lastMessage
      fetchChats();

      return await res.json();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  const editMessage = async (messageId, content) => {
    try {
      const res = await fetch(`${API_URL}/chats/messages/${messageId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error("Failed to edit message");
      return await res.json();
    } catch (error) {
      console.error("Error editing message:", error);
      throw error;
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const res = await fetch(`${API_URL}/chats/messages/${messageId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (!res.ok) throw new Error("Failed to delete message");
      return await res.json();
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  };

  // ─── Video Call API ────────────────────────────────────────────────────────

  const startVideoCall = async (chatId) => {
    const res = await fetch(`${API_URL}/chats/${chatId}/call/start`, {
      method: "POST",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to start video call");
    return await res.json(); // { roomId }
  };

  const endVideoCall = async (chatId) => {
    const res = await fetch(`${API_URL}/chats/${chatId}/call`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to end video call");
  };

  const getCallStatus = async (chatId) => {
    const res = await fetch(`${API_URL}/chats/${chatId}/call/status`);
    if (!res.ok) return { active: false };
    return await res.json(); // { active, roomId, creatorId }
  };

  const requestJoinCall = async (chatId, name, userId = null) => {
    const res = await fetch(`${API_URL}/chats/${chatId}/call/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userId }),
    });
    if (!res.ok) throw new Error("Failed to request join");
    return await res.json(); // { requestId }
  };

  const getJoinRequestStatus = async (chatId, requestId) => {
    const res = await fetch(
      `${API_URL}/chats/${chatId}/call/join/${requestId}/status`,
    );
    if (!res.ok) throw new Error("Failed to get request status");
    return await res.json(); // { status, roomId? }
  };

  const getJoinRequests = async (chatId) => {
    const res = await fetch(`${API_URL}/chats/${chatId}/call/requests`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to get join requests");
    return await res.json();
  };

  const respondToJoinRequest = async (chatId, requestId, approved) => {
    const res = await fetch(
      `${API_URL}/chats/${chatId}/call/requests/${requestId}`,
      {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ approved }),
      },
    );
    if (!res.ok) throw new Error("Failed to respond to join request");
  };

  const searchUsers = async (query) => {
    try {
      if (!query) return [];
      const res = await fetch(
        `${API_URL}/users/search?q=${encodeURIComponent(query)}`,
        {
          headers: getHeaders(),
        },
      );
      if (!res.ok) throw new Error("Failed to search users");
      const data = await res.json();

      return data.map((user) => ({
        id: user._id,
        name: user.nickname || user.username,
        username: user.username,
        avatar: user.avatar || (user.nickname || user.username).charAt(0),
      }));
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  const value = {
    chats,
    loading,
    fetchChats,
    createChat,
    fetchMessages,
    sendMessage,
    editMessage,
    deleteMessage,
    searchUsers,
    startVideoCall,
    endVideoCall,
    getCallStatus,
    requestJoinCall,
    getJoinRequestStatus,
    getJoinRequests,
    respondToJoinRequest,
  };

  return (
    <ChatsContext.Provider value={value}>{children}</ChatsContext.Provider>
  );
};
