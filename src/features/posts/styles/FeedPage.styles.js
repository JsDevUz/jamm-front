import InfiniteScroll from "react-infinite-scroll-component";
import styled, { keyframes } from "styled-components";

const fadeSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const FeedContainer = styled.div`
  flex: 1;
  height: 100vh;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  overflow: hidden;
`;

export const FeedScroll = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  touch-action: pan-y;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const FeedInner = styled.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;
  transition: transform 0.18s ease-out;
  transform: translateX(
    ${(props) =>
      props.$swipeHintDirection === "left"
        ? "-14px"
        : props.$swipeHintDirection === "right"
          ? "14px"
          : "0"}
  );

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const FeedHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 20;
`;

export const FeedHeaderInner = styled.div`
  width: 100%;
  max-width: 680px;
  padding: 0 16px;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

export const FeedTitle = styled.div`
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

export const TabsRow = styled.div`
  display: flex;
  margin-top: 12px;
`;

export const Tab = styled.button`
  flex: 1;
  padding: 12px 0;
  background: transparent;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "transparent")};
  color: ${(props) =>
    props.$active ? "var(--text-color)" : "var(--text-muted-color)"};
  font-size: 15px;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`;

export const ComposeBar = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 10px;
  border-bottom: 1px solid var(--border-color);
  background: transparent;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
  margin-top: 8px;
  transition: none;
  -webkit-tap-highlight-color: transparent;

  &:hover,
  &:active,
  &:focus-visible {
    background: transparent;
    outline: none;
  }
`;

export const ComposeAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--primary-color);
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

export const ComposePlaceholder = styled.span`
  font-size: 15px;
  color: var(--text-muted-color);
  flex: 1;
  text-align: left;
`;

export const FeedList = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  overflow: visible;
  width: 100%;
`;

export const ListStatus = styled.div`
  text-align: center;
  padding: 16px;
  color: var(--text-muted-color);
  font-size: ${(props) => (props.$small ? "13px" : "14px")};
`;

export const PostCard = styled.div`
  position: relative;
  padding: 18px 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 92%, transparent);
  animation: ${fadeSlide} 0.3s ease both;
  transition: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:hover,
  &:active,
  &:focus-within {
    background: transparent;
  }
`;

export const PostTopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const PostAvatar = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${(props) => props.$color || "var(--primary-color)"};
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

export const PostBody = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PostMeta = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
`;

export const PostHeaderMain = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PostAuthor = styled.span`
  font-size: 17px;
  font-weight: 800;
  color: var(--text-color);
  cursor: pointer;
  min-width: 0;
  flex: 0 1 auto;

  &:hover {
    text-decoration: none;
  }
`;

export const PostTime = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
  flex-shrink: 0;
`;

export const PostUsername = styled.span`
  font-size: 15px;
  color: var(--text-muted-color);
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PostText = styled.div`
  font-size: ${(props) => (props.$compact ? "16px" : "17px")};
  line-height: ${(props) => (props.$compact ? "1.55" : "1.72")};
  color: var(--text-color);
  white-space: pre-wrap;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${(props) => (props.$expanded ? "unset" : props.$compact ? 3 : 8)};
  overflow: hidden;

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }
`;

export const PostImageCarousel = styled.div`
  margin: 0 -16px;
  width: calc(100% + 32px);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostImageViewport = styled.div`
  position: relative;
  overflow: hidden;
  background: var(--input-color);
  aspect-ratio: 16 / 15;
  touch-action: pan-x pan-y;
`;

export const PostImageTrack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transform: translateX(${(props) => `-${props.$index * 100}%`});
  transition: transform 0.28s ease;
`;

export const PostImageSlide = styled.div`
  position: relative;
  min-width: 100%;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--input-color);
`;

export const PostImageButton = styled.button`
  position: absolute;
  inset: 0;
  border: none;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: none;
  }
`;

export const PostImageBlur = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(18px);
  transform: scale(1.08);
  opacity: ${(props) => (props.$hidden ? 0 : 1)};
  transition: opacity 0.2s ease;
`;

export const PostImageReal = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.$loaded ? 1 : 0)};
  transition: opacity 0.2s ease;
`;

export const PostImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 12, 20, 0.22);
  color: white;
  backdrop-filter: blur(2px);

  svg {
    filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.24));
    animation: ${(props) => (props.$loading ? "postImageSpin 0.9s linear infinite" : "none")};
  }

  @keyframes postImageSpin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const PostCarouselDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const PostCarouselDot = styled.button`
  width: ${(props) => (props.$active ? "10px" : "8px")};
  height: ${(props) => (props.$active ? "10px" : "8px")};
  border-radius: 999px;
  border: none;
  padding: 0;
  background: ${(props) =>
    props.$active
      ? "var(--primary-color)"
      : "color-mix(in srgb, var(--text-muted-color) 55%, transparent)"};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

export const PostHeaderMenuWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const PostHeaderMenuButton = styled.button`
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: var(--text-color);
    background: color-mix(in srgb, var(--hover-color) 72%, transparent);
  }
`;

export const PostHeaderDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 148px;
  padding: 6px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--secondary-color) 94%, black 6%);
  border: 1px solid color-mix(in srgb, var(--border-color) 82%, transparent);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
  z-index: 8;
`;

export const PostHeaderDropdownItem = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: ${(props) =>
    props.$danger ? "var(--danger-color)" : "var(--text-color)"};
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: color-mix(in srgb, var(--hover-color) 80%, transparent);
  }
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;
export const ActionDivider = styled.div`
display: flex;
align-items: center;
gap: 8px;
`;
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) =>
    props.$active
      ? props.$activeColor || "var(--danger-color)"
      : "var(--text-muted-color)"};
  font-size: 15px;
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  border-radius: 0;
  transition: color 0.15s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: ${(props) => props.$activeColor || "var(--text-secondary-color)"};
    transform: none;
  }
`;

export const PostCommentsLink = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  color: var(--text-muted-color);
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: var(--text-secondary-color);
  }
`;

export const PostFooterMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 14px;
`;

export const PostMoreButton = styled.button`
  border: none;
  background: transparent;
  color: var(--primary-color);
  font-size: 16px;
  padding: 0;
  cursor: pointer;
  align-self: flex-start;
  -webkit-tap-highlight-color: transparent;
`;

export const EmptyState = styled.div`
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

export const EmptyIcon = styled.div`
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

export const FeedSkeletonWrap = styled.div`
  padding: 16px 0;
  width: 100%;
`;

export const FeedSkeletonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  width: 100%;
`;

export const FeedSkeletonBody = styled.div`
  flex: 1;
`;

export const FeedSkeletonActions = styled.div`
  display: flex;
  gap: 24px;
`;
