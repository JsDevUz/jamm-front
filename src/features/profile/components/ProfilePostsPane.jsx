import React from "react";
import styled from "styled-components";
import {
  ArrowLeft,
  ArrowBigDown,
  Edit2,
  Eye,
  Heart,
  Loader2,
  MessageCircle,
  MessageSquare,
  Plus,
  Trash2,
} from "lucide-react";
import OfficalBadge from "../../../shared/ui/badges/OfficalBadge";
import ImageLightbox from "../../../shared/ui/media/ImageLightbox";
import {
  ProfileMobileBackButton,
  ProfilePaneBody,
  ProfilePaneEmptyIcon,
  ProfilePaneEmptyState,
  ProfilePaneHeader,
  ProfilePaneTitle,
} from "../ui";
import { SidebarIconButton } from "../../../shared/ui/buttons/IconButton";
import {
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
} from "../../posts/styles/FeedPage.styles";

const MobileBackBtn = styled(ProfileMobileBackButton)``;
const ButtonWrapper = styled(SidebarIconButton)``;

const PostCard = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
  transition: background 0.15s;

  &:hover {
    background: var(--hover-color);
  }

  &:first-child {
    border-top: 1px solid var(--border-color);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const PostAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0 0 2px;
    color: var(--text-color);
    font-size: 13px;
    font-weight: 700;
  }

  span {
    color: var(--text-muted-color);
    font-size: 11px;
  }
`;

const PostText = styled.div`
  color: var(--text-color);
  font-size: 13px;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;

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
  gap: 14px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${(props) =>
    props.$active ? props.$activeColor || "#ed4245" : "var(--text-muted-color)"};
  font-size: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const OwnerActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const ProfilePostImages = ({ post, onOpenImage }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [revealedImages, setRevealedImages] = React.useState({});
  const [loadingImages, setLoadingImages] = React.useState({});
  const [loadedImages, setLoadedImages] = React.useState({});
  const touchStartXRef = React.useRef(0);
  const images = Array.isArray(post?.images) ? post.images : [];

  if (!images.length) return null;

  const clampIndex = (nextIndex) =>
    Math.max(0, Math.min(nextIndex, images.length - 1));

  return (
    <PostImageCarousel>
      <PostImageViewport
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
        const isRevealed = Boolean(revealedImages[key]);
        const isLoading = Boolean(loadingImages[key]);
        const isLoaded = Boolean(loadedImages[key]);

        return (
          <PostImageSlide key={key}>
            <PostImageBlur
              src={image.blurDataUrl || image.url}
              alt=""
              aria-hidden="true"
              $hidden={Boolean(isRevealed && isLoaded)}
            />
            {!isRevealed ? (
              <PostImageOverlay
                onClick={(event) => {
                  event.stopPropagation();
                  setLoadingImages((prev) => ({ ...prev, [key]: true }));
                  setRevealedImages((prev) => ({ ...prev, [key]: true }));
                }}
              >
                <ArrowBigDown size={18} />
              </PostImageOverlay>
            ) : (
              <>
                <PostImageReal
                  src={image.url}
                  alt="Post image"
                  loading={index === activeIndex ? "eager" : "lazy"}
                  $loaded={isLoaded}
                  onLoad={() => {
                    setLoadingImages((prev) => ({ ...prev, [key]: false }));
                    setLoadedImages((prev) => ({ ...prev, [key]: true }));
                  }}
                  onError={() =>
                    setLoadingImages((prev) => ({ ...prev, [key]: false }))
                  }
                />
                {isLoading ? (
                  <PostImageOverlay $loading>
                    <Loader2 size={18} />
                  </PostImageOverlay>
                ) : null}
                {isLoaded ? (
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
            )}
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

const ProfilePostsPane = ({
  posts,
  isOwnProfile,
  userAvatar,
  displayName,
  isPremium,
  formatTime,
  renderText,
  likePost,
  onEditPost,
  onDeletePost,
  onCreatePost,
  onBack,
}) => {
  const [lightboxImage, setLightboxImage] = React.useState("");

  return (
    <div data-tour="profile-pane-groups" style={{ display: "contents" }}>
      <ProfilePaneHeader>
        <MobileBackBtn onClick={onBack}>
          <ArrowLeft size={20} />
        </MobileBackBtn>
        <ProfilePaneTitle>Gurunglar</ProfilePaneTitle>
        {isOwnProfile ? (
          <ButtonWrapper onClick={onCreatePost} title="Gurung yarating">
            <Plus size={16} />
          </ButtonWrapper>
        ) : null}
      </ProfilePaneHeader>

      {posts.length === 0 ? (
        <ProfilePaneBody>
          <ProfilePaneEmptyState>
            <ProfilePaneEmptyIcon>
              <MessageSquare size={28} color="var(--text-muted-color)" />
            </ProfilePaneEmptyIcon>
            <span>Birinchi gurungi yozing!</span>
          </ProfilePaneEmptyState>
        </ProfilePaneBody>
      ) : (
        posts.map((post) => (
          <PostCard key={post._id}>
            <PostHeader>
              <PostAvatar>
                {userAvatar ? (
                  <img src={userAvatar} alt={displayName} />
                ) : (
                  displayName.charAt(0).toUpperCase()
                )}
              </PostAvatar>
              <PostMeta>
                <h4>
                  {displayName}
                  {isPremium ? <OfficalBadge width={14} height={14} variant="premium" /> : null}
                </h4>
                <span>{formatTime(post.createdAt)}</span>
              </PostMeta>
            </PostHeader>

            <PostText>{renderText(post.content)}</PostText>
            <ProfilePostImages
              post={post}
              onOpenImage={(imageUrl) => setLightboxImage(imageUrl)}
            />

            <PostActions>
              <ActionBtn
                $active={post.liked}
                $activeColor="#ed4245"
                onClick={() => likePost(post._id)}
              >
                <Heart size={16} fill={post.liked ? "#ed4245" : "none"} />
                {post.likes}
              </ActionBtn>

              <ActionBtn $activeColor="#5865f2">
                <MessageCircle size={16} />
                {post.comments}
              </ActionBtn>

              <ActionBtn $activeColor="var(--text-muted-color)">
                <Eye size={16} />
                {post.views}
              </ActionBtn>
            </PostActions>

            {isOwnProfile ? (
              <OwnerActions>
                <ActionBtn
                  $activeColor="var(--primary-color)"
                  onClick={() => onEditPost(post)}
                >
                  <Edit2 size={16} />
                  Tahrirlash
                </ActionBtn>
                <ActionBtn
                  $activeColor="#ed4245"
                  onClick={() => onDeletePost(post)}
                >
                  <Trash2 size={16} />
                  O'chirish
                </ActionBtn>
              </OwnerActions>
            ) : null}
          </PostCard>
        ))
      )}
      <ImageLightbox
        isOpen={Boolean(lightboxImage)}
        imageSrc={lightboxImage}
        alt="Post image"
        onClose={() => setLightboxImage("")}
      />
    </div>
  );
};

export default ProfilePostsPane;
