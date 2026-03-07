import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  Eye,
  Flame,
  Heart,
  MessageCircle,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/authStore";
import { usePosts } from "../../../contexts/PostsContext";
import {
  Skeleton,
  SkeletonCircle,
} from "../../../shared/ui/feedback/Skeleton";
import PremiumBadgeIcon from "../../../shared/ui/badges/PremiumBadge";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import { formatChatTime } from "../../../utils/dateUtils";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import { renderInlineMarkup } from "../../../shared/utils/renderInlineMarkup";
import CreatePostDialog from "./CreatePostDialog";
import PostComments from "./PostComments";
import {
  ActionButton,
  ComposeAvatar,
  ComposeBar,
  ComposePlaceholder,
  EmptyIcon,
  EmptyState,
  FeedContainer,
  FeedHeader,
  FeedHeaderInner,
  FeedInner,
  FeedList,
  FeedScroll,
  FeedSkeletonActions,
  FeedSkeletonBody,
  FeedSkeletonRow,
  FeedSkeletonWrap,
  FeedTitle,
  ListStatus,
  OwnerActions,
  PostActions,
  PostAuthor,
  PostAvatar,
  PostAvatarCol,
  PostBody,
  PostCard,
  PostDot,
  PostHandle,
  PostHeader,
  PostText,
  PostTime,
  Tab,
  TabsRow,
} from "../styles/FeedPage.styles";

const avatarColors = [
  "var(--primary-color)",
  "var(--success-color)",
  "var(--warning-color)",
  "var(--danger-color)",
  "var(--accent-color, var(--primary-color))",
  "var(--link-color, var(--primary-color))",
];

const colorOf = (value) =>
  avatarColors[(value || "A").charCodeAt(0) % avatarColors.length];

const renderText = renderInlineMarkup;

const FeedPage = () => {
  const { t } = useTranslation();
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
    editPost,
    likePost,
    viewPost,
    deletePost,
  } = usePosts();

  const [activeTab, setActiveTab] = useState("foryou");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [commentPost, setCommentPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);

  const activePosts = activeTab === "foryou" ? forYouPosts : followingPosts;
  const activeHasMore = activeTab === "foryou" ? forYouHasMore : followingHasMore;
  const activePage = activeTab === "foryou" ? forYouPage : followingPage;
  const viewedRef = useRef(new Set());

  useEffect(() => {
    if (
      (activeTab === "foryou" && forYouPosts.length === 0) ||
      (activeTab === "following" && followingPosts.length === 0)
    ) {
      fetchFeed(activeTab, 1);
    }
  }, [activeTab, fetchFeed, forYouPosts.length, followingPosts.length]);

  useEffect(() => {
    const unviewedPosts = activePosts.filter(
      (post) => post._id && !viewedRef.current.has(post._id),
    );

    if (unviewedPosts.length === 0) return;

    const timeout = setTimeout(() => {
      unviewedPosts.forEach((post) => {
        if (!viewedRef.current.has(post._id)) {
          viewedRef.current.add(post._id);
          viewPost(post._id);
        }
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [activePosts, viewPost]);

  const displayName =
    currentUser?.nickname || currentUser?.username || t("common.you");
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleCreate = async (text) => {
    await createPost(text);
    if (activeTab !== "foryou") setActiveTab("foryou");
  };

  const handleEdit = async (text) => {
    if (!editingPost?._id) return;
    await editPost(editingPost._id, text);
    setEditingPost(null);
  };

  const handleDelete = async () => {
    if (!postToDelete?._id) return;
    await deletePost(postToDelete._id);
    setPostToDelete(null);
  };

  const goToProfile = (author) => {
    const authorId = typeof author === "string" ? author : author?._id;
    const authorJammId = typeof author === "object" ? author?.jammId : null;
    const myId = currentUser?._id || currentUser?.id;

    if (authorId === myId) {
      navigate("/profile");
      return;
    }

    navigate(`/profile/${authorJammId || authorId}`);
  };

  return (
    <FeedContainer>
      <FeedHeader>
        <FeedHeaderInner>
          <FeedTitle>
            <h1>{t("feed.title")}</h1>
            <ButtonWrapper onClick={() => setIsCreateOpen(true)}>
              <Plus size={14} />
            </ButtonWrapper>
          </FeedTitle>
          <TabsRow>
            <Tab $active={activeTab === "foryou"} onClick={() => setActiveTab("foryou")}>
              {t("feed.tabs.forYou")}
            </Tab>
            <Tab
              $active={activeTab === "following"}
              onClick={() => setActiveTab("following")}
            >
              {t("feed.tabs.following")}
            </Tab>
          </TabsRow>
        </FeedHeaderInner>
      </FeedHeader>

      <FeedScroll id="scrollableFeed">
        <FeedInner>
          <FeedList
            dataLength={activePosts.length}
            next={() => fetchFeed(activeTab, activePage + 1)}
            hasMore={activeHasMore}
            loader={<ListStatus>{t("common.loading")}</ListStatus>}
            endMessage={
              activePosts.length > 0 ? (
                <ListStatus $small>{t("feed.allShown")}</ListStatus>
              ) : null
            }
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
              <ComposePlaceholder>{t("feed.composePlaceholder")}</ComposePlaceholder>
            </ComposeBar>

            {loading && activePosts.length === 0 ? (
              <FeedSkeletonWrap>
                {[...Array(3)].map((_, index) => (
                  <FeedSkeletonRow key={index}>
                    <SkeletonCircle size="44px" />
                    <FeedSkeletonBody>
                      <Skeleton height="15px" width="120px" mb="12px" />
                      <Skeleton height="14px" width="90%" mb="8px" />
                      <Skeleton height="14px" width="70%" mb="8px" />
                      <Skeleton height="14px" width="40%" mb="16px" />
                      <FeedSkeletonActions>
                        <Skeleton height="16px" width="40px" mb="0" />
                        <Skeleton height="16px" width="40px" mb="0" />
                        <Skeleton height="16px" width="40px" mb="0" />
                      </FeedSkeletonActions>
                    </FeedSkeletonBody>
                  </FeedSkeletonRow>
                ))}
              </FeedSkeletonWrap>
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
                  ? t("feed.emptyFollowing")
                  : t("feed.emptyForYou")}
              </EmptyState>
            ) : (
              activePosts.map((post) => {
                const author = post.author || {};
                const authorName =
                  author.nickname || author.username || t("common.userFallback");
                const authorHandle = author.username || "user";
                const isOwner =
                  String(author._id || "") ===
                  String(currentUser?._id || currentUser?.id || "");

                return (
                  <PostCard key={post._id}>
                    <PostAvatarCol>
                      <PostAvatar
                        $color={colorOf(authorName)}
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
                        <ActionButton
                          $active={post.liked}
                          $activeColor="var(--danger-color)"
                          onClick={(event) => {
                            event.stopPropagation();
                            likePost(post._id);
                          }}
                        >
                          <Heart
                            size={16}
                            fill={post.liked ? "currentColor" : "none"}
                          />
                          {post.likes}
                        </ActionButton>

                        <ActionButton
                          $activeColor="var(--primary-color)"
                          onClick={(event) => {
                            event.stopPropagation();
                            setCommentPost(post);
                          }}
                        >
                          <MessageCircle size={16} />
                          {post.comments}
                        </ActionButton>

                        <ActionButton $activeColor="var(--text-secondary-color)">
                          <Eye size={16} />
                          {post.views}
                        </ActionButton>
                      </PostActions>

                      {isOwner && (
                        <OwnerActions>
                          <ActionButton
                            $activeColor="var(--primary-color)"
                            onClick={(event) => {
                              event.stopPropagation();
                              setEditingPost(post);
                            }}
                          >
                            <Pencil size={16} />
                            {t("common.edit")}
                          </ActionButton>
                          <ActionButton
                            $activeColor="var(--danger-color)"
                            onClick={(event) => {
                              event.stopPropagation();
                              setPostToDelete(post);
                            }}
                          >
                            <Trash2 size={16} />
                            {t("common.delete")}
                          </ActionButton>
                        </OwnerActions>
                      )}
                    </PostBody>
                  </PostCard>
                );
              })
            )}
          </FeedList>
        </FeedInner>
      </FeedScroll>

      <CreatePostDialog
        isOpen={isCreateOpen || Boolean(editingPost)}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingPost(null);
        }}
        onSubmit={editingPost ? handleEdit : handleCreate}
        currentUser={currentUser}
        initialContent={editingPost?.content || ""}
        title={editingPost ? t("feed.editTitle") : t("feed.createTitle")}
        submitLabel={editingPost ? t("common.save") : t("common.send")}
      />

      {commentPost && (
        <PostComments post={commentPost} onClose={() => setCommentPost(null)} />
      )}

      <ConfirmDialog
        isOpen={Boolean(postToDelete)}
        onClose={() => setPostToDelete(null)}
        title={t("feed.deleteTitle")}
        description={t("feed.deleteDescription")}
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        onConfirm={handleDelete}
        isDanger
      />
    </FeedContainer>
  );
};

export default FeedPage;
