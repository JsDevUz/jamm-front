import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Settings,
  Bell,
  LogOut,
  Search,
  Users,
  Compass,
  MessageSquare,
  Zap,
  Bookmark,
  Hash,
  Video,
  Trash2,
  Lock,
  Globe,
  Star,
} from "lucide-react";
import { Skeleton, SkeletonCircle, SkeletonRow } from "./Skeleton";
import { useChats } from "../contexts/ChatsContext";
import { usePresence } from "../contexts/PresenceContext";
import { getMeets, removeMeet } from "../utils/meetStore";
import useAuthStore from "../store/authStore";
import InfiniteScroll from "react-infinite-scroll-component";

const SidebarContainer = styled.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  border-right: 1px solid var(--border-color);
  flex-direction: column;
  flex-shrink: 0;

  /* Mobile responsive */
  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh);
    // height: calc(100vh - 60px);
  }
`;

const TopHeader = styled.div`
  padding: 16px;
  display: flex;
  height: 56px;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
`;

const AddButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background-color: var(--hover-color);
  }
`;

const HeaderTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
`;

const SearchContainer = styled.div`
  padding: 12px 16px;
  height: 56px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  background-color: var(--input-color);
  border: none;
  border-radius: 4px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    background-color: #4a4d52;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`;

const ChatsTabsRow = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`;

const ChatsTab = styled.button`
  flex: 1;
  padding: 11px 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${(p) => (p.active ? "var(--primary-color)" : "transparent")};
  color: ${(p) => (p.active ? "var(--text-color)" : "var(--text-muted-color)")};
  font-size: 14px;
  font-weight: ${(p) => (p.active ? "700" : "500")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`;

const FilterButton = styled.button`
  padding: 4px 12px;
  background-color: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--input-color)"};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.active ? "var(--primary-color)" : "var(--hover-color)"};
  }
`;

const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--text-secondary-color);

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
  }

  ${(props) =>
    props.active &&
    `
    background-color: var(--active-color);
    color: var(--text-color);
    font-weight: 600;
  `}
`;

const ChatLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const AvatarWrapper = styled.div`
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
`;

const ChatAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.$isGroup
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "#7289da"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`;

const OnlineDot = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.$online ? "#43b581" : "#72767d")};
  border: 2px solid var(--secondary-color);
  z-index: 1;
`;

const OnlineSubtext = styled.span`
  font-size: 12px;
  color: #43b581;
`;

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChatName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ChatMessage = styled.div`
  font-size: 14px;
  color: var(--text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ChatMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 8px;
`;

const ChatTime = styled.div`
  font-size: 12px;
  color: #72767d;
  margin-bottom: 2px;
`;

const UnreadBadge = styled.div`
  background-color: #7289da;
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
`;

const UserList = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #35373c;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #7289da;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  margin-right: 12px;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Username = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
`;

const Status = styled.div`
  font-size: 12px;
  color: var(--primary-color);
`;

const UniversalSidebar = ({ onOpenCreateGroup, onOpenCreateMeet }) => {
  const {
    chats,
    chatsPage,
    chatsHasMore,
    fetchChats,
    searchUsers,
    createChat,
    selectedNav,
    getAllUsers,
    setSelectedNav,
    selectedChannel,
    setSelectedChannel,
    previewChat,
  } = useChats();
  const { isUserOnline, getOnlineCount, fetchBulkStatuses } = usePresence();

  const currentUser = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedNav !== "meets") {
      fetchChats();
    }
  }, [fetchChats, selectedNav]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [allUsers, setAllUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [chatTab, setChatTab] = useState(() => {
    if (selectedNav === "groups") return "group";
    return "private";
  }); // 'private' | 'group'
  const [meets, setMeets] = useState([]);

  // Sync chatTab with selectedNav on mount or change
  useEffect(() => {
    if (selectedNav === "groups") {
      setChatTab("group");
    } else if (selectedNav === "users") {
      setChatTab("private");
    }
  }, [selectedNav]);

  // Fetch initial online statuses for all members in all chats
  useEffect(() => {
    if (!chats || chats.length === 0 || selectedNav === "meets") return;

    const uniqueMemberIds = new Set();
    chats.forEach((chat) => {
      if (chat.members) {
        chat.members.forEach((m) => {
          if (m._id) uniqueMemberIds.add(m._id);
          else if (m.id) uniqueMemberIds.add(m.id); // fallback
        });
      }
    });

    const userIds = Array.from(uniqueMemberIds);
    if (userIds.length > 0) {
      fetchBulkStatuses(userIds);
    }
  }, [chats, fetchBulkStatuses, selectedNav]);

  // Tracks which nav we've already fetched users for — prevents duplicate calls
  const fetchedNavRef = React.useRef(null);

  // Load all users when entering users tab; search when query changes
  useEffect(() => {
    if (selectedNav !== "users") {
      setAllUsers([]);
      fetchedNavRef.current = null;
      return;
    }
    if (searchQuery.trim().length > 0) {
      fetchedNavRef.current = null; // reset so full list re-fetches after clearing
      const timer = setTimeout(async () => {
        setLoadingUsers(true);
        const results = await searchUsers(searchQuery);
        setAllUsers(
          results.map((u) => ({
            id: u.id || u._id,
            name: u.name,
            username: u.username,
            avatar: u.avatar,
            premiumStatus: u.premiumStatus,
          })),
        );
        setLoadingUsers(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      // Only fetch all users once per nav visit (guard against re-renders)
      if (fetchedNavRef.current === "users") return;
      fetchedNavRef.current = "users";
      setLoadingUsers(true);
      getAllUsers().then((users) => {
        setAllUsers(users);
        setLoadingUsers(false);
      });
    }
  }, [searchQuery, selectedNav, searchUsers, getAllUsers]);

  const handleStartPrivateChat = async (targetUser) => {
    // Check if chat already exists with this user
    const currentUserId = currentUser?._id || currentUser?.id;
    const targetId = targetUser.id || targetUser._id;

    const existingChat = chats.find((c) => {
      if (c.isGroup || !c.members) return false;

      if (targetId === currentUserId) {
        return c.isSavedMessages;
      }

      return (
        !c.isSavedMessages &&
        c.members.some((m) => (m._id || m.id) === targetId)
      );
    });

    if (existingChat) {
      if (existingChat.type === "group") {
        navigate(`/groups/${existingChat.urlSlug}`);
      } else {
        navigate(`/users/${existingChat.urlSlug}`);
      }
    } else {
      // Create new private chat
      try {
        const chat = await createChat({
          isGroup: false,
          memberIds: [targetUser._id || targetUser.id],
        });
        const chatSlug = chat?.urlSlug || chat?.jammId || chat?._id || chat?.id;
        if (chatSlug) {
          navigate(`/users/${chatSlug}`);
          setSearchQuery(""); // Clear search
        }
      } catch (error) {
        console.error("Failed to start private chat", error);
      }
    }
  };

  // Filter chats based on selectedNav/chatTab and search
  const filteredChats = React.useMemo(() => {
    let result = chats;

    // Unified filter: chats, users, and groups all use chatTab
    if (
      selectedNav === "chats" ||
      selectedNav === "users" ||
      selectedNav === "groups"
    ) {
      if (chatTab === "private") {
        result = result.filter(
          (chat) =>
            chat.type === "user" &&
            (chat.isSavedMessages ||
              chat.hasMessages ||
              String(chat.id) === String(selectedChannel)),
        );
      } else {
        result = result.filter((chat) => chat.type === "group");
      }
    } else if (selectedNav === "home") {
      result = result.filter(
        (chat) =>
          chat.type === "group" ||
          (chat.type === "user" &&
            (chat.isSavedMessages ||
              chat.hasMessages ||
              String(chat.id) === String(selectedChannel))),
      );
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by date
    if (activeFilter === "today") {
      result = result.filter((chat) => {
        return chat.time.includes(":") || chat.time === "Kecha";
      });
    } else if (activeFilter === "week") {
      result = result.filter((chat) => {
        return chat.time.includes("Dushanba") || chat.time.includes("Kecha");
      });
    }

    // Check if we have a preview user that hasn't been added to chats
    if (
      (selectedNav === "users" ||
        (selectedNav === "chats" && chatTab === "private")) &&
      previewChat &&
      previewChat.type === "user" &&
      !result.some((c) =>
        c.members?.some((m) => (m._id || m.id) === previewChat.targetUserId),
      )
    ) {
      // Create a virtual chat object for the previewed user so they show up in the active list
      const virtualChat = {
        id: `virtual-${previewChat.targetUserId}`,
        urlSlug: previewChat.targetUserId,
        type: "user",
        name: previewChat.name,
        avatar: previewChat.avatar,
        hasMessages: false,
        members: [{ _id: previewChat.targetUserId }],
        lastMessage: "Xabar yozishni boshlang...",
      };

      // Add it to the top of the list if we're on their slug
      if (String(selectedChannel) === String(previewChat.targetUserId)) {
        result = [virtualChat, ...result];
      }
    }

    return result;
  }, [
    selectedNav,
    chatTab,
    searchQuery,
    activeFilter,
    chats,
    selectedChannel,
    previewChat,
  ]);

  const getHeaderText = () => {
    switch (selectedNav) {
      case "chats":
        return chatTab === "private" ? "Shaxsiy suhbatlar" : "Guruhlar";
      case "home":
        return "Barcha suhbatlar";
      case "users":
        return "Shaxsiy suhbatlar";
      case "groups":
        return "Guruhlar";
      case "meets":
        return "Video Meetlar";
      default:
        return "Barcha suhbatlar";
    }
  };

  // Meet list helpers
  const meetsFetchedRef = React.useRef(false);
  useEffect(() => {
    if (selectedNav === "meets" && !meetsFetchedRef.current) {
      meetsFetchedRef.current = true;
      getMeets().then((data) => setMeets(Array.isArray(data) ? data : []));
    }
    if (selectedNav !== "meets") {
      meetsFetchedRef.current = false;
    }
  }, [selectedNav]);

  function timeAgo(ts) {
    const diff = (Date.now() - ts) / 1000;
    if (diff < 60) return "hozir";
    if (diff < 3600) return `${Math.floor(diff / 60)} daq oldin`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} soat oldin`;
    return `${Math.floor(diff / 86400)} kun oldin`;
  }

  const handleDeleteMeet = (e, roomId) => {
    e.preventDefault();
    e.stopPropagation();
    removeMeet(roomId);
    setMeets(getMeets());
  };

  return (
    <SidebarContainer>
      <TopHeader>
        <SearchInput
          type="text"
          placeholder="Qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            marginRight:
              selectedNav === "groups" ||
              selectedNav === "meets" ||
              (selectedNav === "chats" && chatTab === "group")
                ? "12px"
                : "0",
          }}
        />
        {(selectedNav === "groups" ||
          (selectedNav === "chats" && chatTab === "group")) && (
          <AddButton onClick={onOpenCreateGroup} title="Guruh yaratish">
            <Plus size={18} />
          </AddButton>
        )}
        {selectedNav === "meets" && (
          <AddButton onClick={onOpenCreateMeet} title="Yangi meet">
            <Plus size={18} />
          </AddButton>
        )}
      </TopHeader>

      {/* Internal tabs when chats nav is active */}
      {(selectedNav === "chats" ||
        selectedNav === "users" ||
        selectedNav === "groups") && (
        <ChatsTabsRow>
          <ChatsTab
            active={chatTab === "private"}
            onClick={() => setChatTab("private")}
          >
            Shaxsiy
          </ChatsTab>
          <ChatsTab
            active={chatTab === "group"}
            onClick={() => setChatTab("group")}
          >
            Guruhlar
          </ChatsTab>
        </ChatsTabsRow>
      )}

      {selectedNav === "home" && (
        <FilterContainer>
          <FilterButton
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          >
            Barchasi
          </FilterButton>
          <FilterButton
            active={activeFilter === "today"}
            onClick={() => setActiveFilter("today")}
          >
            Bugun
          </FilterButton>
          <FilterButton
            active={activeFilter === "week"}
            onClick={() => setActiveFilter("week")}
          >
            Hafta
          </FilterButton>
        </FilterContainer>
      )}

      <ChatList id="sidebarScrollArea">
        {/* ─── Meets List ─── */}
        {selectedNav === "meets" ? (
          meets.length === 0 ? (
            <div
              style={{
                padding: 32,
                textAlign: "center",
                color: "var(--text-muted-color)",
              }}
            >
              <Video size={32} style={{ marginBottom: 10, opacity: 0.4 }} />
              <div>Hali hech qanday meet yo'q</div>
            </div>
          ) : (
            meets.map((m) => (
              <ChatLink key={m.roomId} to={`/join/${m.roomId}`}>
                <ChatItem>
                  <AvatarWrapper>
                    <ChatAvatar isGroup>
                      <Video size={18} />
                    </ChatAvatar>
                  </AvatarWrapper>
                  <ChatInfo>
                    <ChatName>{m.title || "Nomsiz meet"}</ChatName>
                    <ChatMessage>
                      {m.isPrivate ? <Lock size={12} /> : <Globe size={12} />}

                      <span>{m.isCreator ? "Admin" : "Ishtirokchi"}</span>
                    </ChatMessage>
                  </ChatInfo>
                  <ChatMeta>
                    <ChatTime>{timeAgo(m.joinedAt)}</ChatTime>
                    <button
                      onClick={(e) => handleDeleteMeet(e, m.roomId)}
                      title="O'chirish"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#4f545c",
                        cursor: "pointer",
                        padding: 2,
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </ChatMeta>
                </ChatItem>
              </ChatLink>
            ))
          )
        ) : (
          <>
            <InfiniteScroll
              dataLength={filteredChats.length}
              next={() => fetchChats(chatsPage + 1)}
              hasMore={
                chatsHasMore && activeFilter === "all" && searchQuery === ""
              }
              loader={
                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    color: "var(--text-muted-color)",
                    fontSize: "12px",
                  }}
                >
                  Yuklanmoqda...
                </div>
              }
              endMessage={
                filteredChats.length > 0 &&
                activeFilter === "all" &&
                searchQuery === "" ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "var(--text-muted-color)",
                      fontSize: "12px",
                    }}
                  >
                    Barcha suhbatlar ko'rsatildi.
                  </div>
                ) : null
              }
              scrollableTarget="sidebarScrollArea"
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "visible",
              }}
            >
              {filteredChats.map((chat) => {
                // Get the other user's ID for private chats
                const currentUserId = currentUser?._id || currentUser?.id;
                const otherMember =
                  chat.type !== "group" && chat.members
                    ? chat.members.find((m) => m._id !== currentUserId)
                    : null;
                const otherUserId = otherMember?._id;
                const isOnline = otherUserId
                  ? isUserOnline(otherUserId)
                  : false;
                const onlineCount =
                  chat.type === "group" ? getOnlineCount(chat.members) : 0;

                return (
                  <ChatLink
                    key={chat.id}
                    to={`/${chat.type === "group" ? "groups" : "users"}/${chat.urlSlug}`}
                  >
                    <ChatItem active={selectedChannel === chat.urlSlug}>
                      <AvatarWrapper>
                        <ChatAvatar
                          $isGroup={
                            chat.type === "group" || chat.isSavedMessages
                          }
                          style={
                            chat.isSavedMessages
                              ? { backgroundColor: "#0288D1" }
                              : {}
                          }
                        >
                          {chat.isSavedMessages ? (
                            <Bookmark size={18} color="white" fill="white" />
                          ) : chat.avatar?.length > 1 ? (
                            <img
                              src={chat.avatar}
                              alt={chat.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : chat.type === "group" ? (
                            chat.name.charAt(0)
                          ) : (
                            chat.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          )}
                        </ChatAvatar>
                        {chat.type !== "group" && !chat.isSavedMessages && (
                          <OnlineDot $online={isOnline} />
                        )}
                      </AvatarWrapper>
                      <ChatInfo>
                        <ChatName>
                          {chat.name}
                          {chat.premiumStatus === "active" && (
                            <Star
                              size={14}
                              fill="#ffaa00"
                              color="#ffaa00"
                              style={{ marginLeft: 4 }}
                            />
                          )}
                        </ChatName>
                        <ChatMessage>
                          {chat.type === "group" && onlineCount > 0 ? (
                            <>
                              {chat.lastMessage}
                              {" · "}
                              <OnlineSubtext>
                                {onlineCount} online
                              </OnlineSubtext>
                            </>
                          ) : (
                            chat.lastMessage
                          )}
                        </ChatMessage>
                      </ChatInfo>
                      <ChatMeta>
                        <ChatTime>{chat.time}</ChatTime>
                        {chat.unread > 0 && (
                          <UnreadBadge>{chat.unread}</UnreadBadge>
                        )}
                      </ChatMeta>
                    </ChatItem>
                  </ChatLink>
                );
              })}
            </InfiniteScroll>

            {/* ─── Global Platform Users List (Users tab only) ─── */}
            {selectedNav === "users" && (
              <>
                {loadingUsers ? (
                  <div
                    style={{
                      padding: "20px 16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {[...Array(4)].map((_, i) => (
                      <SkeletonRow key={i}>
                        <SkeletonCircle size="40px" />
                        <div style={{ flex: 1 }}>
                          <Skeleton height="14px" width="60%" mb="6px" />
                          <Skeleton height="12px" width="40%" mb="0" />
                        </div>
                      </SkeletonRow>
                    ))}
                  </div>
                ) : (
                  allUsers
                    .filter((u) => {
                      const targetUserId = u.id || u._id;
                      const currentUserId = currentUser?._id || currentUser?.id;

                      // Skip me
                      if (targetUserId === currentUserId) return false;

                      // Check if this user is ALREADY displayed in the 'filteredChats' list above
                      const isAlreadyDisplayed = filteredChats.some(
                        (c) =>
                          !c.isGroup &&
                          !c.isSavedMessages &&
                          c.members?.some(
                            (m) => (m._id || m.id) === targetUserId,
                          ),
                      );

                      return !isAlreadyDisplayed;
                    })
                    .map((user) => (
                      <ChatItem
                        key={user.id}
                        onClick={() => handleStartPrivateChat(user)}
                        style={{ cursor: "pointer" }}
                      >
                        <ChatAvatar isGroup={false}>
                          {user?.avatar?.length > 1 ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            (user.name || "?").charAt(0)
                          )}
                        </ChatAvatar>
                        <ChatInfo>
                          <ChatName>
                            {user.name}
                            {user.premiumStatus === "active" && (
                              <Star
                                size={14}
                                fill="#ffaa00"
                                color="#ffaa00"
                                style={{ marginLeft: 4 }}
                              />
                            )}
                          </ChatName>
                          <ChatMessage>@{user.username}</ChatMessage>
                        </ChatInfo>
                      </ChatItem>
                    ))
                )}
              </>
            )}
          </>
        )}
      </ChatList>
    </SidebarContainer>
  );
};

export default UniversalSidebar;
