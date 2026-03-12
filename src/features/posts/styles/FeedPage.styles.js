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
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  overflow: hidden;
`;

export const FeedScroll = styled.div`
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
  transition: background 0.15s;

  &:hover {
    background: var(--hover-color);
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
`;

export const ListStatus = styled.div`
  text-align: center;
  padding: 16px;
  color: var(--text-muted-color);
  font-size: ${(props) => (props.$small ? "13px" : "14px")};
`;

export const PostCard = styled.div`
  position: relative;
  padding: 16px 10px;
  display: flex;
  gap: 12px;
  border-radius: 10px;
  overflow: hidden;
  animation: ${fadeSlide} 0.3s ease both;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: var(--hover-color);
  }
`;

export const PostAvatarCol = styled.div`
  flex-shrink: 0;
`;

export const PostAvatar = styled.div`
  width: 44px;
  height: 44px;
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
  flex: 1;
  min-width: 0;
`;

export const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

export const PostAuthor = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const PostHandle = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;

export const PostDot = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;

export const PostTime = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;

export const PostText = styled.div`
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

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) =>
    props.$active
      ? props.$activeColor || "var(--danger-color)"
      : "var(--text-muted-color)"};
  font-size: 13px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    color: ${(props) => props.$activeColor || "var(--text-secondary-color)"};
    transform: scale(1.12);
  }
`;

export const OwnerActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
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
