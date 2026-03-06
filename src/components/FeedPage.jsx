import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Heart, Eye, MessageCircle, Plus, Flame, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { usePosts } from "../contexts/PostsContext";
import InfiniteScroll from "react-infinite-scroll-component";
import CreatePostDialog from "./CreatePostDialog";
import PostComments from "./PostComments";
import { Skeleton, SkeletonCircle } from "./Skeleton";
import { PlusBtn } from "./ProfilePage";
import dayjs from "dayjs";
import PremiumBadgeIcon from "./PremiumBadge";
import { formatChatTime } from "../utils/dateUtils";

/* ── Animations ── */
const fadeSlide = keyframes`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`;

/* ── Page Layout ── */
const FeedContainer = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  overflow: hidden;
`;

const FeedScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const FeedInner = styled.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;
`;

/* ── Header ── */
const FeedHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 20;
`;

const FeedHeaderInner = styled.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;
`;

const FeedTitle = styled.div`
  padding: 16px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 20px;
    font-weight: 800;
    color: var(--text-color);
    margin: 0;
  }
`;

const NewPostBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  background: var(--primary-color);
  color: white;
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.45);
  }
`;

/* ── Tabs ── */
const TabsRow = styled.div`
  display: flex;
  margin-top: 12px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 3px solid
    ${(p) => (p.active ? "var(--primary-color)" : "transparent")};
  color: ${(p) => (p.active ? "var(--text-color)" : "var(--text-muted-color)")};
  font-size: 15px;
  font-weight: ${(p) => (p.active ? "700" : "500")};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`;

/* ── Compose Prompt ── */
const ComposeBar = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 10px;
  border-radius: 16px;
  border-bottom: 1px solid var(--border-color);
  background: transparent;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.15s;
  &:hover {
    background: var(--hover-color);
  }
`;

const ComposeAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ComposePlaceholder = styled.span`
  font-size: 15px;
  color: var(--text-muted-color);
  flex: 1;
  text-align: left;
`;

/* ── Post Card ── */
const PostCard = styled.div`
  padding: 16px 10px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  gap: 12px;
  border-radius: 16px;
  animation: ${fadeSlide} 0.3s ease both;
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: var(--hover-color);
  }
`;

const PostAvatarCol = styled.div`
  flex-shrink: 0;
`;

const COLORS = [
  "#5865f2",
  "#3ba55d",
  "#faa61a",
  "#ed4245",
  "#9b59b6",
  "#00b0f4",
];
const colorOf = (str) => COLORS[(str || "A").charCodeAt(0) % COLORS.length];

const PostAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${(p) => p.color || "#5865f2"}, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const PostAuthor = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PostHandle = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;
const PostDot = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;
const PostTime = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;

const PostText = styled.div`
  font-size: 15px;
  line-height: 1.65;
  color: var(--text-color);
  white-space: pre-wrap;
  word-break: break-word;
  margin-bottom: 10px;
  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(p) =>
    p.active ? p.activeColor || "#ed4245" : "var(--text-muted-color)"};
  font-size: 13px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.15s;
  &:hover {
    color: ${(p) => p.activeColor || "var(--text-secondary-color)"};
    transform: scale(1.12);
  }
`;

/* ── Empty State ── */
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 15px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
  margin-bottom: 4px;
`;

/* ── Markdown renderer ── */
export const renderText = (raw) => {
  if (!raw) return "";
  const parts = [];
  let key = 0;
  const RE = /\*\*(.+?)\*\*|_(.+?)_/g;
  let last = 0,
    m;
  while ((m = RE.exec(raw)) !== null) {
    if (m.index > last)
      parts.push(<span key={key++}>{raw.slice(last, m.index)}</span>);
    if (m[1] !== undefined) parts.push(<strong key={key++}>{m[1]}</strong>);
    else parts.push(<em key={key++}>{m[2]}</em>);
    last = m.index + m[0].length;
  }
  if (last < raw.length) parts.push(<span key={key++}>{raw.slice(last)}</span>);
  return parts.length ? parts : raw;
};

export const formatTime = (iso) => {
  const now = Date.now();
  const diff = now - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Hozir";
  if (mins < 60) return `${mins} daqiqa`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} soat`;
  return dayjs(iso).format("DD MMM YYYY");
};

/* ════════════════════════════════════ Component ════════════════════ */
const FeedPage = () => {
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const {
    forYouPosts,
    forYouPage,
    forYouHasMore,
    followingPosts,
    followingPage,
    followingHasMore,
    loading,
    fetchFeed,
    createPost,
    likePost,
    viewPost,
  } = usePosts();

  const [activeTab, setActiveTab] = useState("foryou");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [commentPost, setCommentPost] = useState(null);

  const activePosts = activeTab === "foryou" ? forYouPosts : followingPosts;
  const activeHasMore =
    activeTab === "foryou" ? forYouHasMore : followingHasMore;
  const activePage = activeTab === "foryou" ? forYouPage : followingPage;

  const fetchMoreData = () => {
    fetchFeed(activeTab, activePage + 1);
  };

  // Fetch only on first load of the tab
  useEffect(() => {
    if (
      (activeTab === "foryou" && forYouPosts.length === 0) ||
      (activeTab === "following" && followingPosts.length === 0)
    ) {
      fetchFeed(activeTab, 1);
    }
  }, [activeTab, fetchFeed, forYouPosts.length, followingPosts.length]);

  // Track views — fire once per post, never re-trigger on state change
  const viewedRef = useRef(new Set());

  useEffect(() => {
    const unviewedPosts = activePosts.filter(
      (p) => p._id && !viewedRef.current.has(p._id),
    );

    if (unviewedPosts.length > 0) {
      // Add a small delay to debounce StrictMode double mounts
      const timeout = setTimeout(() => {
        unviewedPosts.forEach((p) => {
          if (!viewedRef.current.has(p._id)) {
            viewedRef.current.add(p._id);
            viewPost(p._id);
          }
        });
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [activePosts, viewPost]);

  const displayName = currentUser?.nickname || currentUser?.username || "Siz";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleCreate = async (text) => {
    await createPost(text);
    if (activeTab !== "foryou") setActiveTab("foryou");
  };

  const goToProfile = (author) => {
    const authorId = typeof author === "string" ? author : author?._id;
    const authorJammId = typeof author === "object" ? author?.jammId : null;
    const myId = currentUser?._id || currentUser?.id;
    if (authorId === myId) {
      navigate("/profile");
    } else {
      navigate(`/profile/${authorJammId || authorId}`);
    }
  };

  return (
    <FeedContainer>
      <FeedHeader>
        <FeedHeaderInner>
          <FeedTitle>
            <h1>Gurunglar</h1>
            <PlusBtn onClick={() => setIsCreateOpen(true)}>
              <Plus size={14} />
            </PlusBtn>
          </FeedTitle>
          <TabsRow>
            <Tab
              active={activeTab === "foryou"}
              onClick={() => setActiveTab("foryou")}
            >
              Siz uchun
            </Tab>
            <Tab
              active={activeTab === "following"}
              onClick={() => setActiveTab("following")}
            >
              Obunachidan
            </Tab>
          </TabsRow>
        </FeedHeaderInner>
      </FeedHeader>

      <FeedScroll id="scrollableFeed">
        <FeedInner>
          <InfiniteScroll
            dataLength={activePosts.length}
            next={fetchMoreData}
            hasMore={activeHasMore}
            loader={
              <div
                style={{
                  textAlign: "center",
                  padding: "16px",
                  color: "var(--text-muted-color)",
                }}
              >
                Yuklanmoqda...
              </div>
            }
            endMessage={
              activePosts.length > 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    color: "var(--text-muted-color)",
                    fontSize: "13px",
                  }}
                >
                  Barcha xabarlar ko'rsatildi.
                </div>
              ) : null
            }
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "visible",
            }}
            scrollableTarget="scrollableFeed"
          >
            <ComposeBar onClick={() => setIsCreateOpen(true)}>
              <ComposeAvatar>
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt={displayName} />
                ) : (
                  avatarLetter
                )}
              </ComposeAvatar>
              <ComposePlaceholder>
                Fikringizni baham ko'ring…
              </ComposePlaceholder>
            </ComposeBar>

            {loading && activePosts.length === 0 ? (
              <div style={{ padding: "16px 0", width: "100%" }}>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "12px",
                      marginBottom: "24px",
                      width: "100%",
                    }}
                  >
                    <SkeletonCircle size="44px" />
                    <div style={{ flex: 1 }}>
                      <Skeleton height="15px" width="120px" mb="12px" />
                      <Skeleton height="14px" width="90%" mb="8px" />
                      <Skeleton height="14px" width="70%" mb="8px" />
                      <Skeleton height="14px" width="40%" mb="16px" />
                      <div style={{ display: "flex", gap: "24px" }}>
                        <Skeleton height="16px" width="40px" mb="0" />
                        <Skeleton height="16px" width="40px" mb="0" />
                        <Skeleton height="16px" width="40px" mb="0" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : activePosts.length === 0 ? (
              <EmptyState>
                <EmptyIcon>
                  {activeTab === "following" ? (
                    <Users size={28} color="var(--text-muted-color)" />
                  ) : (
                    <Flame size={28} color="var(--text-muted-color)" />
                  )}
                </EmptyIcon>
                {activeTab === "following"
                  ? "Obuna bo'lgan foydalanuvchilar gurunglarini ko'rasiz"
                  : "Hali gurunglar yo'q. Birinchi bo'ling!"}
              </EmptyState>
            ) : (
              activePosts.map((post) => {
                const author = post.author || {};
                const authorName =
                  author.nickname || author.username || "Foydalanuvchi";
                const authorHandle = author.username || "user";

                return (
                  <PostCard key={post._id}>
                    <PostAvatarCol>
                      <PostAvatar
                        color={colorOf(authorName)}
                        onClick={() => goToProfile(author._id)}
                      >
                        {author.avatar ? (
                          <img src={author.avatar} alt={authorName} />
                        ) : (
                          authorName.charAt(0).toUpperCase()
                        )}
                      </PostAvatar>
                    </PostAvatarCol>

                    <PostBody>
                      <PostHeader>
                        <PostAuthor onClick={() => goToProfile(author._id)}>
                          {authorName}
                          {author.premiumStatus === "active" && (
                            <PremiumBadgeIcon width={16} height={16} />
                          )}
                        </PostAuthor>
                        <PostHandle>@{authorHandle}</PostHandle>
                        <PostDot>·</PostDot>
                        <PostTime>{formatChatTime(post.createdAt)}</PostTime>
                      </PostHeader>

                      <PostText>{renderText(post.content)}</PostText>

                      <PostActions>
                        <ActionBtn
                          active={post.liked}
                          activeColor="#ed4245"
                          onClick={(e) => {
                            e.stopPropagation();
                            likePost(post._id);
                          }}
                        >
                          <Heart
                            size={16}
                            fill={post.liked ? "#ed4245" : "none"}
                          />
                          {post.likes}
                        </ActionBtn>

                        <ActionBtn
                          activeColor="#5865f2"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCommentPost(post);
                          }}
                        >
                          <MessageCircle size={16} />
                          {post.comments}
                        </ActionBtn>

                        <ActionBtn activeColor="var(--text-secondary-color)">
                          <Eye size={16} />
                          {post.views}
                        </ActionBtn>
                      </PostActions>
                    </PostBody>
                  </PostCard>
                );
              })
            )}
          </InfiniteScroll>
        </FeedInner>
      </FeedScroll>

      <CreatePostDialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
        currentUser={currentUser}
      />

      {commentPost && (
        <PostComments post={commentPost} onClose={() => setCommentPost(null)} />
      )}
    </FeedContainer>
  );
};

export default FeedPage;
