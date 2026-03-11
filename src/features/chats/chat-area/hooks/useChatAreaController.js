import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
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
  normalizeSenderId,
} from "../utils/chatAreaMessageUtils";

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
    markMessagesAsRead,
    typingUsers,
    sendTypingStatus,
    previewChat,
    setPreviewChat,
  } = useChats();
  const { isUserOnline, getOnlineCount } = usePresence();
  const { startPrivateCall } = useCall();
  const currentUser = useAuthStore((state) => state.user);
  const isEditGroupDialogOpen = useChatAreaUiStore(
    (state) => state.isEditGroupDialogOpen,
  );
  const isHeaderMenuOpen = useChatAreaUiStore(
    (state) => state.isHeaderMenuOpen,
  );
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

  const currentChat = chats.find(
    (chat) => chat.urlSlug === selectedChatId || chat.id === selectedChatId,
  );

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [messagesCursor, setMessagesCursor] = useState(null);
  const [messagesHasMore, setMessagesHasMore] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [replyMessage, setReplyMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [contextMenu, setContextMenu] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [clickedMessageId, setClickedMessageId] = useState(null);
  const [clickTimer, setClickTimer] = useState(null);

  const typingTimeoutRef = useRef(null);
  const previewLocationRef = useRef(null);
  const headerMenuRef = useRef(null);
  const messageRefs = useRef({});
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  useEffect(() => {
    resetChatAreaUi();
  }, [selectedChatId, resetChatAreaUi]);

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
  const isOnline = otherMember ? isUserOnline(otherMember._id) : false;
  const onlineCount =
    displayChat?.type === "group" ? getOnlineCount(displayChat.members) : 0;

  const lastSeenText = useMemo(() => {
    if (!otherMember || isOnline) return "Online";
    if (!otherMember.lastSeen) return "Offline";

    const date = new Date(otherMember.lastSeen);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / 60000);
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffMinutes < 60) return `Last seen ${diffMinutes}m ago`;
    if (diffHours < 24) return `Last seen ${diffHours}h ago`;
    return `Last seen ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  }, [otherMember, isOnline]);

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
    if (!currentChat) return;

    const loadMessages = async () => {
      setIsLoadingMessages(true);
      const result = await fetchMessages(currentChat.id);
      const loadedMessages = result.data || [];

      setMessages(loadedMessages);
      setMessagesCursor(result.nextCursor || null);
      setMessagesHasMore(Boolean(result.hasMore));
      setIsLoadingMessages(false);

      const currentUserId = currentUser?._id || currentUser?.id;
      const firstUnread = loadedMessages.find(
        (message) =>
          message.senderId !== currentUserId &&
          !message.readBy?.includes(currentUserId),
      );

      setTimeout(() => {
        const firstUnreadId = firstUnread
          ? firstUnread.id || firstUnread._id
          : null;
        if (firstUnreadId && messageRefs.current[firstUnreadId]) {
          messageRefs.current[firstUnreadId].scrollIntoView({
            behavior: "auto",
            block: "center",
          });
        } else {
          messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
        }
      }, 100);
    };

    loadMessages();
  }, [currentChat?.id, currentUser?._id, currentUser?.id, fetchMessages]);

  const fetchMoreMessages = async () => {
    if (
      !currentChat ||
      isLoadingMessages ||
      !messagesHasMore ||
      !messagesCursor
    ) {
      return;
    }

    setIsLoadingMessages(true);
    const scrollContainer = document.getElementById("scrollableChatArea");
    const previousScrollHeight = scrollContainer?.scrollHeight || 0;
    const previousScrollTop = scrollContainer?.scrollTop || 0;
    const result = await fetchMessages(currentChat.id, messagesCursor);
    const nextMessages = result.data || [];

    setMessages((previous) => [...nextMessages, ...previous]);
    setMessagesCursor(result.nextCursor || null);
    setMessagesHasMore(Boolean(result.hasMore));
    setIsLoadingMessages(false);

    setTimeout(() => {
      if (scrollContainer) {
        scrollContainer.scrollTop =
          scrollContainer.scrollHeight -
          previousScrollHeight +
          previousScrollTop;
      }
    }, 0);
  };

  useEffect(() => {
    if (!chatSocket || !currentChat) return;

    chatSocket.emit("join_chat", { chatId: currentChat.id });

    return () => {
      chatSocket.emit("leave_chat", { chatId: currentChat.id });
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
      return (
        senderId !== currentUserId && !message.readBy?.includes(currentUserId)
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
            !matchingMessage.readBy?.includes(currentUserId)
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

    messageInputRef.current.focus();
    messageInputRef.current.setSelectionRange(
      messageInputRef.current.value.length,
      messageInputRef.current.value.length,
    );
  }, [selectedChatId, selectedNav, replyMessage, currentChat?.id]);

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

      if (
        showEmojiPicker &&
        !event.target.closest(".emoji-picker-container") &&
        !event.target.closest(".emoji-button")
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [contextMenu, showEmojiPicker]);

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

  useEffect(() => {
    if (!editingMessage) return undefined;

    const handleClickOutside = (event) => {
      if (!event.target.closest(".edit-input")) {
        setEditingMessage(null);
        setEditInput("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [editingMessage]);

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

  const scrollToBottom = (behavior = "auto") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
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
          setMessages((previous) =>
            previous.map((item) =>
              item.id === message.id
                ? { ...item, isDeleted: true, content: "Bu xabar o'chirildi" }
                : item,
            ),
          );
          await deleteMessage(message.id);
        } catch (error) {
          console.error("Failed to delete message", error);
        }
        break;
      case "edit":
        if (message.isDeleted) return;
        setEditingMessage(message);
        setEditInput(message.content);
        break;
      case "reply":
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

  const handleEditMessage = async (event) => {
    if (event.key === "Enter" && editInput.trim()) {
      try {
        const nextContent = editInput.trim();
        const editedMessageId = editingMessage.id;

        setMessages((previous) =>
          previous.map((message) =>
            message.id === editingMessage.id
              ? { ...message, content: nextContent, edited: true }
              : message,
          ),
        );

        setEditingMessage(null);
        setEditInput("");
        await editMessage(editedMessageId, nextContent);
      } catch (error) {
        console.error("Failed to edit message", error);
      }
      return;
    }

    if (event.key === "Escape") {
      setEditingMessage(null);
      setEditInput("");
    }
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

  const handleMentionClick = async (username, event) => {
    event.stopPropagation();

    try {
      const user = await getUserByUsername(username);
      if (!user || !navigate) {
        toast.error("Bunday foydalanuvchi topilmadi");
        return;
      }

      const targetUserId = user._id || user.id;

      if (
        currentUser &&
        String(targetUserId) === String(currentUser._id || currentUser.id)
      ) {
        toast.error("Siz o'zingiz bilan suhbat qura olmaysiz");
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
        navigate(`/users/${existingChat.jammId}`);
        return;
      }

      const chatId = await createChat({
        isGroup: false,
        memberIds: [targetUserId],
      });

      if (chatId?.jammId) {
        navigate(`/users/${chatId.jammId}`);
      }
    } catch (error) {
      console.error("Error handling mention click:", error);
      toast.error("Foydalanuvchini qidirishda xatolik yuz berdi");
    }
  };

  const renderMessageContent = (content) =>
    renderChatMessageContent(content, handleMentionClick);

  const handleEmojiClick = (emoji) => {
    setMessageInput((previous) => previous + emoji);

    setTimeout(() => {
      if (!messageInputRef.current) return;
      messageInputRef.current.focus();
      messageInputRef.current.setSelectionRange(
        messageInputRef.current.value.length,
        messageInputRef.current.value.length,
      );
    }, 0);
  };

  const toggleEmojiPicker = (event) => {
    event.stopPropagation();
    setShowEmojiPicker((previous) => !previous);

    if (showEmojiPicker) {
      setTimeout(() => {
        if (!messageInputRef.current) return;
        messageInputRef.current.focus();
        messageInputRef.current.setSelectionRange(
          messageInputRef.current.value.length,
          messageInputRef.current.value.length,
        );
      }, 0);
    }
  };

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

  const handleSendMessage = async (event) => {
    if (event.key !== "Enter" || event.shiftKey || !messageInput.trim()) {
      return;
    }

    event.preventDefault();
    const content = messageInput.trim();
    const replyToMessageId = replyMessage ? replyMessage.id : null;

    setMessageInput("");
    setReplyMessage(null);

    setTimeout(() => {
      messageInputRef.current?.focus();
    }, 0);

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

      const nextMessage = await sendMessage(
        targetChatId,
        content,
        replyToMessageId,
      );

      setMessages((previous) => {
        if (
          !nextMessage ||
          previous.some((message) => message.id === nextMessage.id)
        ) {
          return previous;
        }

        return [...previous, nextMessage];
      });

      setTimeout(() => scrollToBottom("smooth"), 100);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
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
    }
  };

  const handleCopyChatLink = (slug) => {
    navigator.clipboard.writeText(`${RESOLVED_APP_BASE_URL}/${slug}`);
    toast.success("Havola nusxalandi");
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
      messageGroups,
      contextMenu,
      replyMessage,
      setReplyMessage,
      editingMessage,
      editInput,
      setEditInput,
      showEmojiPicker,
      messageInput,
      messageRefs,
      messagesEndRef,
      messageInputRef,
      fetchMoreMessages,
      handleMessageDoubleClick,
      focusReplyTargetMessage,
      showContextMenu,
      handleContextMenuAction,
      handleEditMessage,
      handleUsernameClick,
      getUserAvatar: getUserAvatarInitials,
      renderMessageContent,
      formatDate: formatMessageDate,
      handleInputChange,
      handleSendMessage,
      toggleEmojiPicker,
      handleEmojiClick,
    }),
    [
      contextMenu,
      currentChat,
      currentUser,
      displayChat,
      editInput,
      editingMessage,
      fetchMoreMessages,
      handleEditMessage,
      handleInputChange,
      handleSendMessage,
      joinGroupChat,
      messageGroups,
      messageInput,
      messages,
      messagesHasMore,
      isLoadingMessages,
      navigate,
      previewChat,
      replyMessage,
      selectedNav,
      showEmojiPicker,
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
    headerMenuRef,
    isEditGroupDialogOpen,
    isOnline,
    isUserOnline,
    lastSeenText,
    onlineCount,
    otherMember,
    startPrivateVideoCall,
    typingText,
  };
}
