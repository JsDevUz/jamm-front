import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { searchArticles } from "../../api/articlesApi";
import { searchCourses } from "../../api/coursesApi";
import { useChats } from "../../contexts/ChatsContext";
import useAuthStore from "../../store/authStore";
import {
  mobileFullscreenPane,
  mobileTopSafePadding,
} from "../../shared/styles/mobileSafeArea";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(36px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Shell = styled.div`
  min-height: 100dvh;
  background: var(--secondary-color);
  color: var(--text-color);
  animation: ${slideIn} 0.24s ease-out;

  @media (max-width: 768px) {
    ${mobileFullscreenPane};
    z-index: 9999;
    width: 100vw;
    max-width: 100vw;
    overflow: hidden;
    background: var(--secondary-color);
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: none;
    width: 100%;
    min-height: var(--app-height, 100dvh);
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

const Header = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    ${mobileTopSafePadding(12, 16, 0, 16)};
    padding-bottom: 14px;
  }
`;

const BackButton = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 16px;
  background: transparent;
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchField = styled.label`
  flex: 1;
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 18px;
  border-radius: 28px;
  background: #202225;
  color: var(--text-muted-color);
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  color: var(--text-color);
  font-size: 18px;
  outline: none;

  &::placeholder {
    color: var(--text-muted-color);
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 22px;
  padding: 0 16px;
  justify-content: space-around;
  overflow-x: auto;

  @media (max-width: 768px) {
    gap: 18px;
    justify-content: flex-start;
    padding: 0 16px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const TabButton = styled.button`
  min-height: 54px;
  padding: 0;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "transparent")};
  background: transparent;
  color: ${(props) => (props.$active ? "var(--primary-color)" : "var(--text-muted-color)")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  }
`;

const EmptyState = styled.div`
  flex: 1;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--text-muted-color);
  text-align: center;
`;

const ResultCard = styled.button`
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: var(--background-color);
  color: inherit;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  cursor: pointer;
  transition: border-color 0.16s ease, transform 0.16s ease;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-1px);
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  overflow: hidden;
  flex-shrink: 0;
  background: ${(props) => (props.$image ? "var(--input-color)" : "var(--primary-color)")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 800;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ResultBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const ResultTitle = styled.div`
  color: var(--text-color);
  font-size: 15px;
  font-weight: 700;
`;

const ResultMeta = styled.div`
  margin-top: 4px;
  color: var(--text-muted-color);
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SearchTabs = [
  { key: "private" },
  { key: "groups" },
  { key: "articles" },
  { key: "courses" },
];

const MIN_SEARCH_LENGTH = 1;

const getInitial = (value = "") => value.trim().charAt(0).toUpperCase() || "?";

function SearchAvatar({ src, label, alt }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const showImage = Boolean(src) && !hasError;

  return (
    <Avatar $image={showImage}>
      {showImage ? (
        <img src={src} alt={alt} onError={() => setHasError(true)} />
      ) : (
        getInitial(label)
      )}
    </Avatar>
  );
}

export default function GlobalSearchPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = useAuthStore((state) => state.user);
  const { chats, createChat, searchGlobalUsers, searchGroups } = useChats();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "private");
  const [loading, setLoading] = useState(false);
  const [privateResults, setPrivateResults] = useState([]);
  const [groupResults, setGroupResults] = useState([]);
  const [articleResults, setArticleResults] = useState([]);
  const [courseResults, setCourseResults] = useState([]);
  const normalizedQuery = query.trim();

  useEffect(() => {
    const next = new URLSearchParams();
    next.set("tab", activeTab);
    if (query.trim()) {
      next.set("q", query.trim());
    } else {
      next.delete("q");
    }
    setSearchParams(next, { replace: true });
  }, [activeTab, query, setSearchParams]);

  useEffect(() => {
    let cancelled = false;

    if (normalizedQuery.length < MIN_SEARCH_LENGTH) {
      setLoading(false);
      setPrivateResults([]);
      setGroupResults([]);
      setArticleResults([]);
      setCourseResults([]);
      return () => {
        cancelled = true;
      };
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        if (activeTab === "private") {
          const results = await searchGlobalUsers(normalizedQuery);
          if (!cancelled) setPrivateResults(results);
          return;
        }

        if (activeTab === "groups") {
          const results = await searchGroups(normalizedQuery);
          if (!cancelled) setGroupResults(results);
          return;
        }

        if (activeTab === "articles") {
          const results = await searchArticles(normalizedQuery, 30);
          if (!cancelled) {
            setArticleResults(Array.isArray(results) ? results : []);
          }
          return;
        }

        const results = await searchCourses(normalizedQuery, 30);
        if (!cancelled) {
          setCourseResults(Array.isArray(results) ? results : []);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 240);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [activeTab, normalizedQuery, searchGlobalUsers, searchGroups]);

  const activeResults = useMemo(() => {
    if (activeTab === "private") return privateResults;
    if (activeTab === "groups") return groupResults;
    if (activeTab === "articles") return articleResults;
    return courseResults;
  }, [activeTab, articleResults, courseResults, groupResults, privateResults]);

  const handleOpenPrivateChat = useCallback(
    async (targetUser) => {
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
        navigate(
          `/${existingChat.type === "group" ? "groups" : "users"}/${existingChat.urlSlug}`,
        );
        return;
      }

      const chat = await createChat({
        isGroup: false,
        memberIds: [targetUserId],
      });
      const chatSlug = chat?.urlSlug || chat?.jammId || chat?._id || chat?.id;
      if (chatSlug) {
        navigate(`/users/${chatSlug}`);
      }
    },
    [chats, createChat, currentUser?._id, currentUser?.id, navigate],
  );

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/chats", { replace: true });
  }, [navigate]);

  return (
    <Shell>
      <Inner>
        <Header>
          <BackButton type="button" onClick={handleBack}>
            <ArrowLeft size={25} />
          </BackButton>
          <SearchField>
            <Search size={22} />
            <SearchInput
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("arenaShared.results.searchPlaceholder", {
                defaultValue: "Qidirish...",
              })}
              autoFocus
            />
          </SearchField>
        </Header>

        <Tabs>
          {SearchTabs.map((tab) => {
            const label =
              tab.key === "private"
                ? t("chatsSidebar.tabs.private", { defaultValue: "Shaxsiy" })
                : tab.key === "groups"
                  ? t("chatsSidebar.tabs.groups", { defaultValue: "Guruhlar" })
                  : tab.key === "articles"
                    ? t("navigation.articles", { defaultValue: "Maqolalar" })
                    : t("navigation.courses", { defaultValue: "Kurslar" });

            return (
              <TabButton
                key={tab.key}
                type="button"
                $active={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              >
                {label}
              </TabButton>
            );
          })}
        </Tabs>

        <Content>
          {activeResults.length === 0 ? (
            <EmptyState>
              {loading ? (
                <>Yuklanmoqda...</>
              ) : normalizedQuery.length < MIN_SEARCH_LENGTH ? (
                <>
                  <strong>Qidirishni boshlang</strong>
                  <span>Shaxsiy, guruh, maqola yoki kursni toping.</span>
                </>
              ) : (
                <>
                  <strong>Hech narsa topilmadi</strong>
                  <span>Boshqa kalit so‘z bilan urinib ko‘ring.</span>
                </>
              )}
            </EmptyState>
          ) : activeTab === "private" ? (
            privateResults.map((user) => (
              <ResultCard
                key={user.id || user._id}
                type="button"
                onClick={() => void handleOpenPrivateChat(user)}
              >
                <SearchAvatar
                  src={user.avatar}
                  alt={user.username || "user"}
                  label={user.nickname || user.username}
                />
                <ResultBody>
                  <ResultTitle>{user.nickname || user.username}</ResultTitle>
                  <ResultMeta>@{user.username}</ResultMeta>
                </ResultBody>
              </ResultCard>
            ))
          ) : activeTab === "groups" ? (
            groupResults.map((group) => (
              <ResultCard
                key={group.id || group._id}
                type="button"
                onClick={() => navigate(`/groups/${group.urlSlug || group.id || group._id}`)}
              >
                <SearchAvatar
                  src={group.avatar}
                  alt={group.name || "group"}
                  label={group.name}
                />
                <ResultBody>
                  <ResultTitle>{group.name || "Guruh"}</ResultTitle>
                  <ResultMeta>{group.membersCount ? `${group.membersCount} a'zo` : "Guruh"}</ResultMeta>
                </ResultBody>
              </ResultCard>
            ))
          ) : activeTab === "articles" ? (
            articleResults.map((article) => (
              <ResultCard
                key={article._id}
                type="button"
                onClick={() => navigate(`/articles/${article.slug || article._id}`)}
              >
                <SearchAvatar
                  src={article.coverImage}
                  alt={article.title || "article"}
                  label={article.title}
                />
                <ResultBody>
                  <ResultTitle>{article.title || "Maqola"}</ResultTitle>
                  <ResultMeta>{article.excerpt || article.author?.nickname || article.author?.username || ""}</ResultMeta>
                </ResultBody>
              </ResultCard>
            ))
          ) : (
            courseResults.map((course) => (
              <ResultCard
                key={course._id}
                type="button"
                onClick={() => navigate(`/courses/${course.urlSlug || course._id}`)}
              >
                <SearchAvatar
                  src={course.image}
                  alt={course.name || "course"}
                  label={course.name}
                />
                <ResultBody>
                  <ResultTitle>{course.name || "Kurs"}</ResultTitle>
                  <ResultMeta>{course.description || ""}</ResultMeta>
                </ResultBody>
              </ResultCard>
            ))
          )}
        </Content>
      </Inner>
    </Shell>
  );
}
