import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import SidebarSearchField from "../../../shared/ui/forms/SidebarSearchField";
import { Skeleton } from "../../../shared/ui/feedback/Skeleton";
import { SidebarIconButton } from "../../../shared/ui/buttons/IconButton";

export const SidebarContainer = styled.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchWrap = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`;

export const SearchInput = styled(SidebarSearchField)``;

export const AddArticleButton = styled(SidebarIconButton)``;

export const TabsRow = styled.div`
  display: flex;
  flex-shrink: 0;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SortTab = styled.button`
  appearance: none;
  -webkit-appearance: none;
  flex: 0 0 auto;
  min-height: 52px;
  min-width: 92px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "transparent")};
  color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--text-muted-color)"};
  font-size: 14px;
  line-height: 16px;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  outline: none;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }

  &:focus,
  &:focus-visible,
  &:active {
    outline: none;
    box-shadow: none;
    background: transparent;
  }
`;

export const ArticleList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  overflow: visible;
`;

export const ArticleItem = styled.button`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border-color);
  background: ${(props) => (props.$active ? "var(--active-color)" : "transparent")};
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  color: inherit;
  transition: background 0.2s ease;

  &:hover {
    background: var(--hover-color);
  }
`;

export const ArticleItemActions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

export const Cover = styled.div`
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted-color);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.div`
  color: var(--text-color);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 6px;
`;

export const Excerpt = styled.div`
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.55;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`;

export const ArticleCopyButton = styled(SidebarIconButton)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 10px;
  margin-left: 0;
`;

export const EmptyState = styled.div`
  padding: 40px 24px;
  text-align: center;
  color: var(--text-muted-color);
`;

export const ArticleItemSkeleton = styled.div`
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
`;

export const ArticleItemSkeletonThumb = styled(Skeleton)`
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 14px;
  margin-bottom: 0;
`;

export const ArticleItemSkeletonBody = styled.div`
  flex: 1;
  min-width: 0;
`;
