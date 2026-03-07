import InfiniteScroll from "react-infinite-scroll-component";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (min-width: 600px) {
    align-items: center;
  }
`;

export const Modal = styled.div`
  background: var(--secondary-color);
  width: 100%;
  max-width: 520px;
  height: 85vh;
  border-radius: 16px 16px 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -4px 40px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 0.25s ease;

  @media (min-width: 600px) {
    height: auto;
    max-height: 80vh;
    border-radius: 16px;
  }
`;

export const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.span`
  font-weight: 700;
  font-size: 17px;
  color: var(--text-color);
`;

export const CommentsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }
`;

export const CommentsFeed = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: visible;
`;

export const ListStatus = styled.div`
  text-align: center;
  padding: 16px;
  color: var(--text-muted-color);
  font-size: ${(props) => (props.$small ? "13px" : "14px")};
`;

export const CommentRow = styled.div`
  display: flex;
  gap: 12px;
  animation: ${fadeIn} 0.2s ease;
`;

export const Avatar = styled.div`
  width: ${(props) => props.$size || 36}px;
  height: ${(props) => props.$size || 36}px;
  min-width: ${(props) => props.$size || 36}px;
  border-radius: 50%;
  background: ${(props) => props.$color || "var(--primary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.$size ? Math.floor(props.$size * 0.38) : 13)}px;
  font-weight: 700;
  color: white;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CommentContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const CommentBubble = styled.div`
  background: var(--background-color);
  padding: 10px 14px;
  border-radius: 4px 14px 14px 14px;
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const AuthorName = styled.span`
  font-weight: 700;
  font-size: 13px;
  color: var(--text-color);
`;

export const CommentTime = styled.span`
  font-size: 11px;
  color: var(--text-muted-color);
`;

export const CommentText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
  word-break: break-word;
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 6px;
  padding-left: 2px;
`;

export const ReplyButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 0;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: var(--primary-color);
  }
`;

export const RepliesContainer = styled.div`
  margin-top: 10px;
  padding-left: 4px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ReplyRow = styled.div`
  display: flex;
  gap: 10px;
  animation: ${fadeIn} 0.2s ease;
`;

export const ReplyBubble = styled.div`
  background: var(--background-color);
  padding: 8px 12px;
  border-radius: 4px 12px 12px 12px;
`;

export const MentionTag = styled.span`
  color: var(--primary-color);
  font-weight: 600;
  font-size: 13px;
  margin-right: 4px;
`;

export const InputWrapper = styled.div`
  border-top: 1px solid var(--border-color);
  padding: 12px 20px;
`;

export const ReplyingToBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: var(--hover-color);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-muted-color);

  span {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

export const CancelReplyButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 2px;
  display: flex;

  &:hover {
    color: var(--text-color);
  }
`;

export const InputRow = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Input = styled.input`
  flex: 1;
  background: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 10px 18px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--primary-color);
  }

  &::placeholder {
    color: var(--text-muted-color);
  }
`;

export const SendButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  opacity: ${(props) => (props.$disabled ? 0.4 : 1)};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};

  &:hover {
    filter: brightness(1.05);
    transform: scale(1.05);
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 14px;
  text-align: center;
`;
