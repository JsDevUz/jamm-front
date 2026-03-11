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

export const AddBlogButton = styled(SidebarIconButton)``;

export const BlogList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  overflow: visible;
`;

export const BlogItem = styled.button`
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

export const BlogItemActions = styled.div`
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

export const BlogCopyButton = styled(SidebarIconButton)`
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

export const BlogItemSkeleton = styled.div`
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
`;

export const BlogItemSkeletonThumb = styled(Skeleton)`
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 14px;
  margin-bottom: 0;
`;

export const BlogItemSkeletonBody = styled.div`
  flex: 1;
  min-width: 0;
`;
