import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bookmark,
  MessageSquare,
  Users,
} from "lucide-react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonRow,
} from "../../../shared/ui/feedback/Skeleton";
import UserNameWithDecoration from "../../../shared/ui/users/UserNameWithDecoration";
import { useChats } from "../../../contexts/ChatsContext";
import { usePresence } from "../../../contexts/PresenceContext";
import useAuthStore from "../../../store/authStore";
import SectionHeader from "../../../shared/ui/navigation/SectionHeader";
import {
  AvatarImage,
  AvatarWrapper,
  ChatAvatar,
  ChatInfo,
  ChatItem,
  ChatLink,
  ChatList,
  ChatMessage,
  ChatMeta,
  ChatName,
  ChatsTabBadge,
  ChatsTabLabel,
  ChatsTab,
  ChatsTabsRow,
  EmptyState,
  EmptyStateIcon,
  EndMessage,
  FilterButton,
  FilterContainer,
  OnlineDot,
  OnlineSubtext,
  SearchLoadingBody,
  SearchLoadingContainer,
  SearchResultItem,
  SidebarContainer,
  SidebarItemSkeleton,
  SidebarItemSkeletonBody,
  SidebarItemSkeletonMeta,
  StyledInfiniteScroll,
  UnreadBadge,
  ChatTime,
} from "../styles/ChatsSidebar.styles";

const ChatsSidebar = ({
  onOpenCreateGroup,
  onOpenCreateMeet,
  selectedChatId,
}) => {
  const MIN_SEARCH_LENGTH = 3;
  const { t } = useTranslation();
  const {
    chats,
    loading,
    chatsPage,
    chatsHasMore,
    fetchChats,
    searchUsers,
    searchGroups,
    createChat,
    selectedNav,
    previewChat,
  } = useChats();
  const { isUserOnline, getOnlineCount, fetchBulkStatuses } = usePresence();
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [chatTab, setChatTab] = useState(() => {
    if (selectedNav === "groups") return "group";
    return "private";
  });

  const effectiveChatTab =
    selectedNav === "groups" ? "group" : "private";
  const normalizedSearchQuery = searchQuery.trim();
  const hasMinimumSearchLength =
    normalizedSearchQuery.length >= MIN_SEARCH_LENGTH;

  const emptyListConfig = useMemo(() => {
    if (selectedNav === "groups") {
      return {
        icon: <Users size={32} />,
        text: "Sizda hozircha guruh yo'q",
      };
    }

    if (selectedNav === "users") {
      return {
        icon: <MessageSquare size={32} />,
        text: "Sizda hozircha chat yo'q",
      };
    }

    return null;
  }, [selectedNav]);

  useEffect(() => {
    if (selectedNav === "groups") {
      setChatTab("group");
    } else {
      setChatTab("private");
    }
  }, [selectedNav]);

  useEffect(() => {
    if (!chats.length) return;

    const memberIds = new Set();
    chats.forEach((chat) => {
      chat.members?.forEach((member) => {
        const memberId = member._id || member.id;
        if (memberId) memberIds.add(memberId);
      });
    });

    if (memberIds.size > 0) {
      fetchBulkStatuses(Array.from(memberIds));
    }
  }, [chats, fetchBulkStatuses]);

  useEffect(() => {
    const supportsRemoteSearch =
      selectedNav === "users" ||
      selectedNav === "groups" ||
      selectedNav === "chats";

    if (!supportsRemoteSearch || !["private", "group"].includes(effectiveChatTab)) {
      setSearchResults([]);
      return;
    }

    if (!normalizedSearchQuery || !hasMinimumSearchLength) {
      setSearchResults([]);
      setLoadingSearch(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        if (effectiveChatTab === "group") {
          const results = await searchGroups(normalizedSearchQuery);
          setSearchResults(
            results.map((group) => ({
              resultType: "group",
              id: group.id,
              urlSlug: group.urlSlug,
              name: group.name,
              avatar: group.avatar,
              membersCount: group.membersCount,
              lastMessage: group.lastMessage,
            })),
          );
        } else {
          const results = await searchUsers(normalizedSearchQuery);
          setSearchResults(
            results.map((user) => ({
              resultType: "user",
              id: user.id || user._id,
              name: user.name,
              username: user.username,
              avatar: user.avatar,
              premiumStatus: user.premiumStatus,
              selectedProfileDecorationId: user.selectedProfileDecorationId,
              customProfileDecorationImage: user.customProfileDecorationImage,
            })),
          );
        }
      } finally {
        setLoadingSearch(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    effectiveChatTab,
    hasMinimumSearchLength,
    normalizedSearchQuery,
    searchGroups,
    searchUsers,
    selectedNav,
  ]);

  const handleStartPrivateChat = async (targetUser) => {
    const currentUserId = currentUser?._id || currentUser?.id;
    const targetUserId = targetUser.id || targetUser._id;

    const existingChat = chats.find((chat) => {
      if (chat.isGroup || !chat.members) return false;

      if (targetUserId === currentUserId) {
        return chat.isSavedMessages;
      }

      return (
        !chat.isSavedMessages &&
        chat.members.some(
          (member) => (member._id || member.id) === targetUserId,
        )
      );
    });

    if (existingChat) {
      setSearchQuery("");
      navigate(
        `/${existingChat.type === "group" ? "groups" : "users"}/${existingChat.urlSlug}`,
      );
      return;
    }

    try {
      const chat = await createChat({
        isGroup: false,
        memberIds: [targetUser._id || targetUser.id],
      });
      const chatSlug = chat?.urlSlug || chat?.jammId || chat?._id || chat?.id;

      if (chatSlug) {
        navigate(`/users/${chatSlug}`);
        setSearchQuery("");
      }
    } catch (error) {
      console.error("Failed to start private chat", error);
    }
  };

  const filteredChats = useMemo(() => {
    let result = chats;

    if (
      selectedNav === "chats" ||
      selectedNav === "users" ||
      selectedNav === "groups"
    ) {
      if (effectiveChatTab === "private") {
        result = result.filter(
          (chat) =>
            !chat.isGroup &&
            (chat.isSavedMessages ||
              chat.hasMessages ||
              String(chat.id) === String(selectedChatId)),
        );
      } else if (effectiveChatTab === "group") {
        result = result.filter((chat) => chat.isGroup);
      }
    } else if (selectedNav === "home") {
      result = result.filter(
        (chat) =>
          chat.isGroup ||
          (!chat.isGroup &&
            (chat.isSavedMessages ||
              chat.hasMessages ||
              String(chat.id) === String(selectedChatId))),
      );
    }

    if (
      hasMinimumSearchLength &&
      !(
        selectedNav === "users" ||
        selectedNav === "groups" ||
        selectedNav === "chats"
      )
    ) {
      result = result.filter((chat) =>
        chat.name.toLowerCase().includes(normalizedSearchQuery.toLowerCase()),
      );
    }

    if (activeFilter === "today") {
      result = result.filter(
        (chat) => chat.time.includes(":") || chat.time === "Kecha",
      );
    } else if (activeFilter === "week") {
      result = result.filter(
        (chat) => chat.time.includes("Dushanba") || chat.time.includes("Kecha"),
      );
    }

    if (
      (selectedNav === "users" ||
        (selectedNav === "chats" && effectiveChatTab === "private")) &&
      previewChat &&
      previewChat.type === "user" &&
      !result.some((chat) =>
        chat.members?.some(
          (member) => (member._id || member.id) === previewChat.targetUserId,
        ),
      )
    ) {
      const previewEntry = {
        id: `virtual-${previewChat.targetUserId}`,
        urlSlug: previewChat.targetUserId,
        isGroup: false,
        type: "user",
        name: previewChat.name,
        avatar: previewChat.avatar,
        hasMessages: false,
        members: [{ _id: previewChat.targetUserId }],
        lastMessage: t("chatsSidebar.search.startMessage"),
      };

      if (String(selectedChatId) === String(previewChat.targetUserId)) {
        result = [previewEntry, ...result];
      }
    }

    return result;
  }, [
    activeFilter,
    chats,
    effectiveChatTab,
    previewChat,
    hasMinimumSearchLength,
    normalizedSearchQuery,
    selectedChatId,
    selectedNav,
  ]);

  const privateUnreadTotal = useMemo(
    () =>
      chats.reduce((total, chat) => {
        if (chat.isGroup) return total;
        return total + Math.max(0, Number(chat.unread) || 0);
      }, 0),
    [chats],
  );

  const groupUnreadTotal = useMemo(
    () =>
      chats.reduce((total, chat) => {
        if (!chat.isGroup) return total;
        return total + Math.max(0, Number(chat.unread) || 0);
      }, 0),
    [chats],
  );

  const renderSidebarSkeleton = (count = 6) =>
    [...Array(count)].map((_, index) => (
      <SidebarItemSkeleton key={index}>
        <SkeletonCircle size="40px" />
        <SidebarItemSkeletonBody>
          <Skeleton
            height="15px"
            width={index % 2 === 0 ? "56%" : "48%"}
            mb="4px"
          />
          <Skeleton
            height="13px"
            width={index % 3 === 0 ? "72%" : "64%"}
            mb="0"
          />
        </SidebarItemSkeletonBody>
        <SidebarItemSkeletonMeta>
          <Skeleton height="10px" width="34px" mb="0" />
          <Skeleton height="18px" width="22px" borderRadius="999px" mb="0" />
        </SidebarItemSkeletonMeta>
      </SidebarItemSkeleton>
    ));

  const headerTitle =
    selectedNav === "groups" || effectiveChatTab === "group"
      ? t("chatsSidebar.tabs.groups")
      : t("navigation.chats", { defaultValue: "Chatlar" });

  const renderAvatarContent = (chat) => {
    if (chat.isSavedMessages) {
      return <Bookmark size={18} color="white" fill="white" />;
    }

    if (chat.avatar?.length > 1) {
      return <AvatarImage src={chat.avatar} alt={chat.name} />;
    }

    if (chat.isGroup) {
      return chat.name.charAt(0);
    }

    return chat.name
      .split(" ")
      .map((part) => part[0])
      .join("");
  };

  const timeAgo = (timestamp) => {
    if (!timestamp) return t("chatsSidebar.timeAgo.now");
    const parsedTimestamp =
      typeof timestamp === "number" ? timestamp : new Date(timestamp).getTime();

    if (!Number.isFinite(parsedTimestamp)) {
      return t("chatsSidebar.timeAgo.now");
    }

    const diff = (Date.now() - parsedTimestamp) / 1000;
    if (!Number.isFinite(diff) || diff < 0) {
      return t("chatsSidebar.timeAgo.now");
    }

    if (diff < 60) return t("chatsSidebar.timeAgo.now");
    if (diff < 3600) {
      return t("chatsSidebar.timeAgo.minutes", {
        count: Math.floor(diff / 60),
      });
    }
    if (diff < 86400) {
      return t("chatsSidebar.timeAgo.hours", {
        count: Math.floor(diff / 3600),
      });
    }
    return t("chatsSidebar.timeAgo.days", {
      count: Math.floor(diff / 86400),
    });
  };

  return (
    <SidebarContainer>
      <SectionHeader
        title={headerTitle}
        onSearch={() =>
          navigate(
            `/search?tab=${effectiveChatTab === "group" ? "groups" : "private"}`,
            {
              state: { from: `${location.pathname}${location.search}` },
            },
          )
        }
        onAdd={
          effectiveChatTab === "group" ? onOpenCreateGroup : onOpenCreateMeet
        }
        searchTitle={t("chatsSidebar.searchPlaceholder")}
        addTitle={
          effectiveChatTab === "group"
            ? t("chatsSidebar.createGroup")
            : t("chatsSidebar.createMeet")
        }
        searchTargetProps={{ "data-tour": "chats-search" }}
      />

      {(selectedNav === "chats" ||
        selectedNav === "users" ||
        selectedNav === "groups") && (
        <ChatsTabsRow data-tour="chats-tabs">
          <ChatsTab
            data-tour="chats-tab-private"
            $active={effectiveChatTab === "private"}
            onClick={() => {
              setChatTab("private");
              navigate("/users");
            }}
          >
            <ChatsTabLabel>
              {t("chatsSidebar.tabs.private")}
              {privateUnreadTotal > 0 && (
                <ChatsTabBadge $active={effectiveChatTab === "private"}>
                  {privateUnreadTotal}
                </ChatsTabBadge>
              )}
            </ChatsTabLabel>
          </ChatsTab>
          <ChatsTab
            data-tour="chats-tab-groups"
            $active={effectiveChatTab === "group"}
            onClick={() => {
              setChatTab("group");
              navigate("/groups");
            }}
          >
            <ChatsTabLabel>
              {t("chatsSidebar.tabs.groups")}
              {groupUnreadTotal > 0 && (
                <ChatsTabBadge $active={effectiveChatTab === "group"}>
                  {groupUnreadTotal}
                </ChatsTabBadge>
              )}
            </ChatsTabLabel>
          </ChatsTab>
        </ChatsTabsRow>
      )}

      {selectedNav === "home" && (
        <FilterContainer>
          <FilterButton
            $active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          >
            {t("chatsSidebar.filters.all")}
          </FilterButton>
          <FilterButton
            $active={activeFilter === "today"}
            onClick={() => setActiveFilter("today")}
          >
            {t("chatsSidebar.filters.today")}
          </FilterButton>
          <FilterButton
            $active={activeFilter === "week"}
            onClick={() => setActiveFilter("week")}
          >
            {t("chatsSidebar.filters.week")}
          </FilterButton>
        </FilterContainer>
      )}

      <ChatList id="sidebarScrollArea" data-tour="chats-list">
          <>
            {hasMinimumSearchLength &&
            ["private", "group"].includes(effectiveChatTab) &&
            (selectedNav === "users" ||
              selectedNav === "groups" ||
              selectedNav === "chats") ? (
              loadingSearch ? (
                <SearchLoadingContainer>
                  {[...Array(3)].map((_, index) => (
                    <SkeletonRow key={index}>
                      <SkeletonCircle size="40px" />
                      <SearchLoadingBody>
                        <Skeleton height="14px" width="60%" mb="6px" />
                        <Skeleton height="12px" width="40%" mb="0" />
                      </SearchLoadingBody>
                    </SkeletonRow>
                  ))}
                </SearchLoadingContainer>
              ) : searchResults.length ? (
                searchResults.map((result) => {
                  if (result.resultType === "group") {
                    return (
                      <ChatLink
                        key={result.id}
                        to={`/groups/${result.urlSlug}`}
                        onClick={() => setSearchQuery("")}
                      >
                        <SearchResultItem>
                          <AvatarWrapper>
                            <ChatAvatar $isGroup>
                              {result.avatar?.length > 1 ? (
                                <AvatarImage
                                  src={result.avatar}
                                  alt={result.name}
                                />
                              ) : (
                                result.name?.charAt(0)
                              )}
                            </ChatAvatar>
                          </AvatarWrapper>
                          <ChatInfo>
                            <ChatName>{result.name}</ChatName>
                            <ChatMessage>
                              {result.lastMessage ||
                                t("chatsSidebar.search.groupMeta", {
                                  count: result.membersCount || 0,
                                })}
                            </ChatMessage>
                          </ChatInfo>
                        </SearchResultItem>
                      </ChatLink>
                    );
                  }

                  return (
                    <SearchResultItem
                      key={result.id}
                      onClick={() => handleStartPrivateChat(result)}
                    >
                      <AvatarWrapper>
                        <ChatAvatar>
                          {result.avatar?.length > 1 ? (
                            <AvatarImage
                              src={result.avatar}
                              alt={result.name}
                            />
                          ) : (
                            result.name
                              ?.split(" ")
                              ?.map((part) => part[0])
                              ?.join("")
                          )}
                        </ChatAvatar>
                      </AvatarWrapper>
                      <ChatInfo>
                        <ChatName>
                          <UserNameWithDecoration
                            user={result}
                            fallback={t("common.userFallback")}
                            size="sm"
                          />
                        </ChatName>
                        <ChatMessage>@{result.username}</ChatMessage>
                      </ChatInfo>
                    </SearchResultItem>
                  );
                })
              ) : (
                <EmptyState>{t("chatsSidebar.search.notFound")}</EmptyState>
              )
            ) : loading && !normalizedSearchQuery ? (
              <>{renderSidebarSkeleton(1)}</>
            ) : !normalizedSearchQuery &&
              emptyListConfig &&
              filteredChats.length === 0 ? (
              <EmptyState>
                <EmptyStateIcon>{emptyListConfig.icon}</EmptyStateIcon>
                <div>{emptyListConfig.text}</div>
              </EmptyState>
            ) : (
              <StyledInfiniteScroll
                dataLength={filteredChats.length}
                next={() => fetchChats(chatsPage + 1)}
                hasMore={
                  chatsHasMore &&
                  activeFilter === "all" &&
                  normalizedSearchQuery === ""
                }
                loader={<>{renderSidebarSkeleton(2)}</>}
                endMessage={
                  filteredChats.length > 0 &&
                  activeFilter === "all" &&
                  normalizedSearchQuery === "" ? (
                    <EndMessage>{t("chatsSidebar.allShown")}</EndMessage>
                  ) : null
                }
                scrollableTarget="sidebarScrollArea"
              >
                {filteredChats.map((chat) => {
                  const currentUserId = currentUser?._id || currentUser?.id;
                  const otherMember =
                    !chat.isGroup && chat.members
                      ? chat.members.find(
                          (member) =>
                            String(member._id || member.id) !==
                            String(currentUserId),
                        )
                      : null;
                  const otherUserId = otherMember?._id || otherMember?.id;
                  const isOnline = otherUserId
                    ? isUserOnline(otherUserId)
                    : false;
                  const isOfficialUser = Boolean(chat.isOfficialProfile);
                  const onlineCount = chat.isGroup
                    ? getOnlineCount(chat.members)
                    : 0;

                  return (
                    <ChatLink
                      key={chat.id}
                      to={`/${chat.isGroup ? "groups" : "users"}/${chat.urlSlug}`}
                    >
                      <ChatItem $active={selectedChatId === chat.urlSlug}>
                        <AvatarWrapper>
                          <ChatAvatar
                            $isGroup={chat.isGroup}
                            $isSavedMessages={chat.isSavedMessages}
                          >
                            {renderAvatarContent(chat)}
                          </ChatAvatar>
                          {!chat.isGroup &&
                            !chat.isSavedMessages &&
                            !isOfficialUser && <OnlineDot $online={isOnline} />}
                        </AvatarWrapper>
                        <ChatInfo>
                          <ChatName>
                            <UserNameWithDecoration
                              user={otherMember || chat}
                              fallback={t("common.userFallback")}
                              size="sm"
                            />
                          </ChatName>
                          <ChatMessage>
                            {chat.isGroup && onlineCount > 0 ? (
                              <>
                                {chat.lastMessage}
                                {" · "}
                                <OnlineSubtext>
                                  {t("chatsSidebar.online", {
                                    count: onlineCount,
                                  })}
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
              </StyledInfiniteScroll>
            )}

          </>
      </ChatList>
    </SidebarContainer>
  );
};

export default ChatsSidebar;
