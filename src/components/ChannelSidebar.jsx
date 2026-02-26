import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Video, Lock, Globe, Trash2 } from "lucide-react";
import { useChats } from "../contexts/ChatsContext";
import { getMeets, removeMeet } from "../utils/meetStore";

const SidebarContainer = styled.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
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
  padding: 16px 16px 8px;
  display: flex;
  align-items: center;
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
  height: 65px;
  border-bottom: 1px solid var(--border-color);
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

const ChatAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.isGroup
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "#7289da"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  margin-right: 12px;
  flex-shrink: 0;
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

const UniversalSidebar = ({
  selectedNav,
  selectedChannel,
  chats = [],
  onOpenCreateGroup,
  onOpenCreateMeet,
}) => {
  const { searchUsers, createChat } = useChats();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [isSearchingUsers, setIsSearchingUsers] = useState(false);

  // When searchQuery changes and we are in 'users' tab, query the backend
  useEffect(() => {
    if (selectedNav === "users" && searchQuery.trim().length > 0) {
      const delayDebounceFn = setTimeout(async () => {
        setIsSearchingUsers(true);
        const results = await searchUsers(searchQuery);
        setUserSearchResults(results);
        setIsSearchingUsers(false);
      }, 500); // Debounce for 500ms
      return () => clearTimeout(delayDebounceFn);
    } else {
      setUserSearchResults([]);
    }
  }, [searchQuery, selectedNav, searchUsers]);

  const handleStartPrivateChat = async (targetUser) => {
    // Check if chat already exists with this user
    const existingChat = chats.find(
      (c) =>
        !c.isGroup &&
        c.members &&
        c.members.some((m) => m._id === targetUser.id),
    );

    if (existingChat) {
      navigate(`/users/${existingChat.id}`);
    } else {
      // Create new private chat
      try {
        const chatId = await createChat({
          isGroup: false,
          memberIds: [targetUser.id],
        });
        if (chatId) {
          navigate(`/users/${chatId}`);
          setSearchQuery(""); // Clear search
        }
      } catch (error) {
        console.error("Failed to start private chat", error);
      }
    }
  };

  // Filter chats based on selectedNav and search
  const filteredChats = React.useMemo(() => {
    let result = chats;

    // Filter by type
    if (selectedNav === "users") {
      result = result.filter((chat) => chat.type === "user");
    } else if (selectedNav === "groups") {
      result = result.filter((chat) => chat.type === "group");
    }

    // Filter by search
    if (searchQuery) {
      result = result.filter((chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by date
    if (activeFilter === "today") {
      const today = new Date().toDateString();
      result = result.filter((chat) => {
        // Simple date filtering logic
        return chat.time.includes(":") || chat.time === "Kecha";
      });
    } else if (activeFilter === "week") {
      result = result.filter((chat) => {
        return chat.time.includes("Dushanba") || chat.time.includes("Kecha");
      });
    }

    return result;
  }, [selectedNav, searchQuery, activeFilter, chats]);

  const getHeaderText = () => {
    switch (selectedNav) {
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
  const [meets, setMeets] = useState([]);
  useEffect(() => {
    if (selectedNav === "meets") setMeets(getMeets());
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
        <HeaderTitle>{getHeaderText()}</HeaderTitle>
        {selectedNav === "groups" && (
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

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Qidirish..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

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

      <ChatList>
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
                  <ChatAvatar isGroup>
                    <Video size={18} />
                  </ChatAvatar>
                  <ChatInfo>
                    <ChatName>{m.title || "Nomsiz meet"}</ChatName>
                    <ChatMessage>
                      {m.isPrivate ? "🔒 Private" : "🌐 Open"}
                      {" · "}
                      {m.isCreator ? "Yaratuvchi" : "Ishtirokchi"}
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
        ) : selectedNav === "users" && searchQuery.trim() ? (
          <>
            {isSearchingUsers ? (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "var(--text-muted-color)",
                }}
              >
                Qidirilmoqda...
              </div>
            ) : userSearchResults.length > 0 ? (
              userSearchResults.map((user) => (
                <ChatItem
                  key={user.id}
                  onClick={() => handleStartPrivateChat(user)}
                  style={{ cursor: "pointer" }}
                >
                  <ChatAvatar isGroup={false}>
                    {user.avatar || user.name.charAt(0)}
                  </ChatAvatar>
                  <ChatInfo>
                    <ChatName>{user.name}</ChatName>
                    <ChatMessage>@{user.username}</ChatMessage>
                  </ChatInfo>
                </ChatItem>
              ))
            ) : (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "var(--text-muted-color)",
                }}
              >
                Foydalanuvchi topilmadi
              </div>
            )}
          </>
        ) : (
          filteredChats.map((chat) => (
            <ChatLink key={chat.id} to={`/${selectedNav}/${chat.id}`}>
              <ChatItem active={selectedChannel === chat.id}>
                <ChatAvatar isGroup={chat.type === "group"}>
                  {chat.type === "group"
                    ? chat.name.charAt(0)
                    : chat.avatar ||
                      chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </ChatAvatar>
                <ChatInfo>
                  <ChatName>{chat.name}</ChatName>
                  <ChatMessage>{chat.lastMessage}</ChatMessage>
                </ChatInfo>
                <ChatMeta>
                  <ChatTime>{chat.time}</ChatTime>
                  {chat.unread > 0 && <UnreadBadge>{chat.unread}</UnreadBadge>}
                </ChatMeta>
              </ChatItem>
            </ChatLink>
          ))
        )}
      </ChatList>
    </SidebarContainer>
  );
};

export default UniversalSidebar;
