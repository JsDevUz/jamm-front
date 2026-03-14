import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  ArrowBigDown,
  Eye,
  Flame,
  Heart,
  Loader2,
  MessageCircle,
  MoreHorizontal,
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
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import { renderInlineMarkup } from "../../../shared/utils/renderInlineMarkup";
import UserNameWithDecoration from "../../../shared/ui/users/UserNameWithDecoration";
import ImageLightbox from "../../../shared/ui/media/ImageLightbox";
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
  PostActions,
  PostAuthor,
  PostAvatar,
  PostBody,
  PostCard,
  PostCommentsLink,
  PostFooterMeta,
  PostHeader,
  PostHeaderDropdown,
  PostHeaderDropdownItem,
  PostHeaderMain,
  PostHeaderMenuButton,
  PostHeaderMenuWrap,
  PostMoreButton,
  PostImageBlur,
  PostImageButton,
  PostImageCarousel,
  PostCarouselDot,
  PostCarouselDots,
  PostImageOverlay,
  PostImageReal,
  PostImageSlide,
  PostImageTrack,
  PostImageViewport,
  PostMeta,
  PostTopRow,
  PostText,
  PostTime,
  PostUsername,
  Tab,
  TabsRow,
  ActionDivider,
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

const FeedPostImages = ({ post, onOpenImage }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedImages, setRevealedImages] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const [loadedImages, setLoadedImages] = useState({});
  const touchStartXRef = useRef(0);

  const images = Array.isArray(post?.images) ? post.images : [];
  if (!images.length) return null;

  const clampIndex = (nextIndex) =>
    Math.max(0, Math.min(nextIndex, images.length - 1));

  const currentImage = images[activeIndex];
  const currentKey =
    currentImage?.url || `${post._id || "post"}-${activeIndex}`;
  const isRevealed = Boolean(revealedImages[currentKey]);
  const isLoading = Boolean(loadingImages[currentKey]);

  return (
    <PostImageCarousel>
      <PostImageViewport
        data-disable-feed-tab-swipe
        data-disable-layout-swipe
        onTouchStart={(event) => {
          touchStartXRef.current = event.touches[0]?.clientX || 0;
        }}
        onTouchEnd={(event) => {
          const endX = event.changedTouches[0]?.clientX || 0;
          const deltaX = endX - touchStartXRef.current;

          if (Math.abs(deltaX) < 40) return;

          setActiveIndex((current) =>
            clampIndex(current + (deltaX < 0 ? 1 : -1)),
          );
        }}
      >
        <PostImageTrack $index={activeIndex}>
          {images.map((image, index) => {
            const key = image.url || `${post._id}-${index}`;
            const slideRevealed = Boolean(revealedImages[key]);
            const slideLoading = Boolean(loadingImages[key]);

            return (
              <PostImageSlide key={key}>
                <PostImageBlur
                  src={image.blurDataUrl || image.url}
                  alt=""
                  aria-hidden="true"
                  $hidden={Boolean(slideRevealed && loadedImages[key])}
                />

                {!slideRevealed ? (
                  <PostImageOverlay
                    onClick={(event) => {
                      event.stopPropagation();
                      setLoadingImages((prev) => ({ ...prev, [key]: true }));
                      setRevealedImages((prev) => ({ ...prev, [key]: true }));
                    }}
                  >
                    <ArrowBigDown size={18} />
                  </PostImageOverlay>
                ) : null}

                {slideRevealed ? (
                  <>
                    <PostImageReal
                      src={image.url}
                      alt="Feed image"
                      loading={index === activeIndex ? "eager" : "lazy"}
                      $loaded={Boolean(loadedImages[key])}
                      onLoad={() => {
                        setLoadingImages((prev) => ({ ...prev, [key]: false }));
                        setLoadedImages((prev) => ({ ...prev, [key]: true }));
                      }}
                      onError={() =>
                        setLoadingImages((prev) => ({ ...prev, [key]: false }))
                      }
                    />
                    {slideLoading ? (
                      <PostImageOverlay $loading>
                        <Loader2 size={18} />
                      </PostImageOverlay>
                    ) : null}
                    {loadedImages[key] ? (
                      <PostImageButton
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onOpenImage?.(image.url);
                        }}
                        aria-label="Rasmni kattalashtirish"
                      />
                    ) : null}
                  </>
                ) : null}
              </PostImageSlide>
            );
          })}
        </PostImageTrack>
      </PostImageViewport>

      {images.length > 1 ? (
        <PostCarouselDots>
          {images.map((image, index) => (
            <PostCarouselDot
              key={image.url || `${post._id}-dot-${index}`}
              type="button"
              $active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              aria-label={`${index + 1}-rasm`}
            />
          ))}
        </PostCarouselDots>
      ) : null}
    </PostImageCarousel>
  );
};

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
  const [swipeHintDirection, setSwipeHintDirection] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});
  const [lightboxImage, setLightboxImage] = useState("");
  const [openPostMenuId, setOpenPostMenuId] = useState(null);

  const activePosts = activeTab === "foryou" ? forYouPosts : followingPosts;
  const activeHasMore = activeTab === "foryou" ? forYouHasMore : followingHasMore;
  const activePage = activeTab === "foryou" ? forYouPage : followingPage;
  const viewedRef = useRef(new Set());
  const viewTimeoutsRef = useRef(new Map());
  const feedScrollRef = useRef(null);

  useEffect(() => {
    if (
      (activeTab === "foryou" && forYouPosts.length === 0) ||
      (activeTab === "following" && followingPosts.length === 0)
    ) {
      fetchFeed(activeTab, 1);
    }
  }, [activeTab, fetchFeed, forYouPosts.length, followingPosts.length]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest("[data-post-menu]")) return;
      setOpenPostMenuId(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth > 768) return undefined;

    const element = feedScrollRef.current;
    if (!element) return undefined;

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const orderedTabs = ["foryou", "following"];

    const triggerSwipeHint = (direction) => {
      setSwipeHintDirection(direction);
      window.setTimeout(() => {
        setSwipeHintDirection((current) =>
          current === direction ? null : current,
        );
      }, 180);
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) return;

      const target =
        event.target instanceof Element ? event.target : event.target?.parentElement;
      if (
        target &&
        target.closest(
          "input, textarea, button, a, [role='button'], [contenteditable='true'], [data-disable-feed-tab-swipe]",
        )
      ) {
        tracking = false;
        return;
      }

      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = true;
    };

    const handleTouchEnd = (event) => {
      if (!tracking || event.changedTouches.length !== 1) return;
      tracking = false;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) < 70 || Math.abs(deltaY) > 50) return;
      if (Math.abs(deltaX) < Math.abs(deltaY)) return;

      const currentIndex = orderedTabs.indexOf(activeTab);
      const nextIndex = currentIndex + (deltaX < 0 ? 1 : -1);

      if (nextIndex < 0 || nextIndex >= orderedTabs.length) return;

      triggerSwipeHint(deltaX < 0 ? "left" : "right");
      setActiveTab(orderedTabs[nextIndex]);
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeTab]);

  useEffect(() => {
    const scrollRoot = document.getElementById("scrollableFeed");
    if (!scrollRoot || activePosts.length === 0) return undefined;

    const clearViewTimeout = (postId) => {
      const timeoutId = viewTimeoutsRef.current.get(postId);
      if (timeoutId) {
        clearTimeout(timeoutId);
        viewTimeoutsRef.current.delete(postId);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const postId = entry.target.getAttribute("data-post-id");
          if (!postId || viewedRef.current.has(postId)) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            if (!viewTimeoutsRef.current.has(postId)) {
              const timeoutId = setTimeout(() => {
                viewedRef.current.add(postId);
                viewTimeoutsRef.current.delete(postId);
                viewPost(postId);
              }, 800);
              viewTimeoutsRef.current.set(postId, timeoutId);
            }
            return;
          }

          clearViewTimeout(postId);
        });
      },
      {
        root: scrollRoot,
        threshold: [0.6],
      },
    );

    const postElements = scrollRoot.querySelectorAll("[data-post-id]");
    postElements.forEach((element) => observer.observe(element));

    activePosts.forEach((post) => {
      if (post?._id && post.previouslySeen) {
        viewedRef.current.add(post._id);
      }
    });

    return () => {
      observer.disconnect();
      activePosts.forEach((post) => {
        if (post?._id && !viewedRef.current.has(post._id)) {
          clearViewTimeout(post._id);
        }
      });
    };
  }, [activePosts, viewPost]);

  const displayName =
    currentUser?.nickname || currentUser?.username || t("common.you");
  const avatarLetter = displayName.charAt(0).toUpperCase();

  const handleCreate = async (payload) => {
    await createPost(payload);
    if (activeTab !== "foryou") setActiveTab("foryou");
  };

  const handleEdit = async (payload) => {
    if (!editingPost?._id) return;
    await editPost(editingPost._id, payload);
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

  const getPostTimestamp = (createdAt) =>
    dayjs(createdAt).format("h:mm A · D MMM YYYY");

  const shouldClampPost = (content = "", hasImages = false) => {
    if (!content) return false;

    if (hasImages) {
      return content.length > 120 || content.includes("\n");
    }

    return content.length > 280 || content.split("\n").length > 6;
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

      <FeedScroll id="scrollableFeed" ref={feedScrollRef}>
        <FeedInner $swipeHintDirection={swipeHintDirection}>
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
                const hasImages = Array.isArray(post.images) && post.images.length > 0;
                const isExpanded = Boolean(expandedPosts[post._id]);
                const shouldClamp = shouldClampPost(post.content, hasImages);
                const isOwner =
                  String(author._id || "") ===
                  String(currentUser?._id || currentUser?.id || "");

                return (
                  <PostCard key={post._id} data-post-id={post._id}>
                    <PostBody>
                      <PostTopRow>
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

                        <PostMeta>
                          <PostHeader>
                            <PostHeaderMain>
                              <PostAuthor onClick={() => goToProfile(author._id)}>
                                <UserNameWithDecoration
                                  user={author}
                                  fallback={t("common.userFallback")}
                                />
                              </PostAuthor>
                              ·
                              <PostUsername>@{author.username || "user"}</PostUsername>
                            </PostHeaderMain>

                            {isOwner ? (
                              <PostHeaderMenuWrap data-post-menu>
                                <PostHeaderMenuButton
                                  type="button"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setOpenPostMenuId((current) =>
                                      current === post._id ? null : post._id,
                                    );
                                  }}
                                  aria-label="Post amallari"
                                >
                                  <MoreHorizontal size={18} />
                                </PostHeaderMenuButton>

                                {openPostMenuId === post._id ? (
                                  <PostHeaderDropdown>
                                    <PostHeaderDropdownItem
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setOpenPostMenuId(null);
                                        setEditingPost(post);
                                      }}
                                    >
                                      <Pencil size={16} />
                                      {t("common.edit")}
                                    </PostHeaderDropdownItem>
                                    <PostHeaderDropdownItem
                                      type="button"
                                      $danger
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setOpenPostMenuId(null);
                                        setPostToDelete(post);
                                      }}
                                    >
                                      <Trash2 size={16} />
                                      {t("common.delete")}
                                    </PostHeaderDropdownItem>
                                  </PostHeaderDropdown>
                                ) : null}
                              </PostHeaderMenuWrap>
                            ) : null}
                          </PostHeader>
                        </PostMeta>
                      </PostTopRow>

                      {!hasImages ? (
                        <PostText $expanded={isExpanded}>{renderText(post.content)}</PostText>
                      ) : null}

                      {hasImages ? (
                        <FeedPostImages
                          post={post}
                          onOpenImage={(imageUrl) => setLightboxImage(imageUrl)}
                        />
                      ) : null}

                      {hasImages ? (
                        <PostText $compact $expanded={isExpanded}>
                          {renderText(post.content)}
                        </PostText>
                      ) : null}

                      {shouldClamp && !isExpanded ? (
                        <PostMoreButton
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setExpandedPosts((prev) => ({ ...prev, [post._id]: true }));
                          }}
                        >
                          Show more
                        </PostMoreButton>
                      ) : null}

                      <PostActions>
                        <ActionDivider>

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
                        </ActionDivider>
                      <PostFooterMeta>
                        <PostTime>{getPostTimestamp(post.createdAt)}</PostTime>
                      </PostFooterMeta>
                      </PostActions>

                      


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
        initialImages={editingPost?.images || []}
        title={editingPost ? t("feed.editTitle") : t("feed.createTitle")}
        submitLabel={editingPost ? t("common.save") : t("common.send")}
        allowImages={!editingPost}
      />

      <ImageLightbox
        src={lightboxImage}
        alt="Feed image preview"
        onClose={() => setLightboxImage("")}
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
