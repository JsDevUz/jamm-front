import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";

export const CommentsSection = styled.div`
  padding: 20px 24px;
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
`;

export const CommentsSectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const CommentsTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CommentsCount = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted-color);
`;

export const MinimapCommentsBox = styled.div`
  background: var(--input-color);
  border-radius: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: var(--hover-color);
  }
`;

export const CollapsedPlaceholder = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
`;

export const CollapseRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const CollapseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 600;
`;

export const CommentInputArea = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: flex-start;
`;

export const CommentAvatar = styled.div`
  width: ${(props) => (props.$small ? "28px" : "36px")};
  height: ${(props) => (props.$small ? "28px" : "36px")};
  border-radius: 50%;
  background: ${(props) =>
    props.$isAdmin ? "var(--primary-color)" : "var(--tertiary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${(props) => (props.$small ? "10px" : "13px")};
  font-weight: 700;
  flex-shrink: 0;
  overflow: hidden;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const CommentInputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 20px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
    background-color: var(--secondary-color);
  }
`;

export const CommentInputActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const CommentBtn = styled.button`
  padding: 6px 16px;
  border-radius: 18px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: ${(props) => (props.$primary ? "var(--primary-color)" : "transparent")};
  color: ${(props) => (props.$primary ? "white" : "var(--text-secondary-color)")};

  &:hover {
    opacity: ${(props) => (props.$primary ? 0.9 : 1)};
    color: ${(props) => (props.$primary ? "white" : "var(--text-color)")};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const CommentsLoader = styled.div`
  text-align: center;
  padding: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`;

export const CommentsFeed = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 32px;
`;

export const CommentThread = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const CommentBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const CommentAuthor = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) =>
    props.$isAdmin ? "var(--primary-color)" : "var(--text-color)"};
`;

export const AdminBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--primary-color) 15%, transparent);
  color: var(--primary-color);
`;

export const CommentTime = styled.span`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const CommentText = styled.p`
  font-size: 14px;
  color: var(--text-secondary-color);
  line-height: 1.5;
  margin-bottom: 6px;
  word-break: break-word;
`;

export const ReplyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted-color);
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 8px;
  border-radius: 12px;
  transition: all 0.15s;

  &:hover {
    color: var(--primary-color);
    background: color-mix(in srgb, var(--primary-color) 8%, transparent);
  }
`;

export const RepliesContainer = styled.div`
  margin-left: 48px;
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ReplyInputArea = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-left: 48px;
  margin-top: 8px;
`;

export const ReplyInput = styled.input`
  flex: 1;
  padding: 8px 14px;
  background-color: var(--input-color);
  border: 1px solid transparent;
  border-radius: 18px;
  color: var(--text-color);
  font-size: 13px;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: var(--placeholder-color);
  }

  &:focus {
    border-color: var(--primary-color);
  }
`;

export const SendBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;
