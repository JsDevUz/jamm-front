import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SidebarSearchField from "../../../shared/ui/forms/SidebarSearchField";

export const SidebarContainer = styled.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  border-right: 1px solid var(--border-color);
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`;

export const TopHeader = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  justify-content: space-between;
`;

export const HeaderSearch = styled(SidebarSearchField).attrs((props) => ({
  containerStyle: {
    flex: 1,
    marginRight: props.$hasAction ? "12px" : "0",
  },
}))`
  flex: 1;
  min-width: 0;
`;

export const FilterContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`;

export const ChatsTabsRow = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
`;

export const ChatsTab = styled.button`
  flex: 1;
  padding: 11px 0;
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "transparent")};
  color: ${(props) =>
    props.$active ? "var(--text-color)" : "var(--text-muted-color)"};
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background: var(--hover-color);
  }
`;

export const ChatsTabLabel = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const ChatsTabBadge = styled.span`
  min-width: 18px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.$active ? "rgba(255, 255, 255, 0.18)" : "var(--primary-color)"};
  color: white;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
`;

export const FilterButton = styled.button`
  padding: 4px 12px;
  background-color: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--input-color)"};
  color: ${(props) =>
    props.$active ? "white" : "var(--text-secondary-color)"};
  border: none;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--hover-color)"};
  }
`;

export const ChatList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--text-secondary-color);

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
  }

  ${(props) =>
    props.$active &&
    `
      background-color: var(--active-color);
      color: var(--text-color);
      font-weight: 600;
    `}
`;

export const SearchResultItem = styled(ChatItem)`
  cursor: pointer;
`;

export const ChatLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  margin-right: 12px;
  flex-shrink: 0;
`;

export const ChatAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.$isGroup
      ? "var(--tertiary-color)"
      : props.$isSavedMessages
        ? "var(--primary-color)"
        : "var(--tertiary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
  overflow: hidden;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const OnlineDot = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$online ? "var(--success-color)" : "var(--text-muted-color)"};
  border: 2px solid var(--secondary-color);
  z-index: 1;
`;

export const OnlineSubtext = styled.span`
  font-size: 12px;
  color: var(--success-color);
`;

export const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ChatName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ChatMessage = styled.div`
  font-size: 14px;
  color: var(--text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
  span {
    font-size: 10px;
    color: var(--text-color);
  }
`;

export const ChatMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 8px;
`;

export const ChatTime = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  margin-bottom: 2px;
`;

export const UnreadBadge = styled.div`
  background-color: var(--primary-color);
  color: white;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  text-align: center;
`;

export const SidebarItemSkeleton = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
`;

export const SidebarItemSkeletonBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const SidebarItemSkeletonMeta = styled.div`
  width: 44px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
`;

export const EmptyState = styled.div`
  padding: 32px;
  text-align: center;
  color: var(--text-muted-color);
`;

export const EmptyStateIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  opacity: 0.4;
`;

export const MeetDeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 2px;

  &:hover {
    color: var(--danger-color);
  }
`;

export const InfiniteList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export const EndMessage = styled.div`
  text-align: center;
  padding: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`;

export const SearchLoadingContainer = styled.div`
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SearchLoadingBody = styled.div`
  flex: 1;
`;

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;
