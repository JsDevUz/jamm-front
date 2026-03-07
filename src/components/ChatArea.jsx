import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  Hash,
  Gift,
  Sticker,
  Smile,
  Plus,
  ArrowLeft,
  Users2,
  Search,
  MoreVertical,
  Bell,
  Users,
  Pin,
  Phone,
  X,
  Reply,
  Link,
  BellOff,
  Trash2,
  Check,
  CheckCheck,
  Bookmark,
  Star,
  Info,
  AtSign,
  Copy,
  QrCode,
  CopyIcon,
  Link2,
  LogOut,
  Edit2,
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import PremiumBadgeIcon from "./PremiumBadge";
import EditGroupDialog from "./EditGroupDialog";
import { useChats } from "../contexts/ChatsContext";
import { usePresence } from "../contexts/PresenceContext";
import { useCall } from "../contexts/CallContext";
import useAuthStore from "../store/authStore";
import dayjs from "dayjs";
import { formatMessageDate } from "../utils/dateUtils";
import { toast } from "react-hot-toast";
import OutgoingCallRequest from "./OutgoingCallRequest";

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--background-color);
  height: 100vh;
  overflow: hidden;

  /* Mobile responsive */
  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100vh;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const OuterChatWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const ProfileInfoSection = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const ProfileInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;

  &:hover {
    background-color: var(--hover-color);
  }
`;

const ProfileInfoIcon = styled.div`
  color: var(--primary-color);
  margin-top: 2px;
`;

const ProfileInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProfileInfoLabel = styled.div`
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.4;
`;

const ProfileInfoValue = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

const ProfileActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border-color);
  margin: 0 16px;
`;

const ProfileActionBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  span {
    font-size: 12px;
    font-weight: 500;
  }
`;

const AdminBadge = styled.span`
  font-size: 11px;
  color: var(--primary-color);
  background: rgba(88, 101, 242, 0.1);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: auto;
`;

const GroupInfoCard = styled.div`
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid var(--border-color);
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
`;

const InfoLabel = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
  font-weight: 400;
`;

const InfoValue = styled.div`
  font-size: 15px;
  color: var(--text-color);
  line-height: 1.5;
  word-break: break-word;
`;

const InfoLink = styled.div`
  font-size: 15px;
  color: #0088cc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ShowMoreBtn = styled.span`
  color: #0088cc;
  cursor: pointer;
  font-weight: 500;
  margin-left: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const MentionsText = ({ text }) => {
  if (!text) return null;
  const parts = text.split(/(@\w+)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("@") ? (
          <span key={i} style={{ color: "#0088cc", cursor: "pointer" }}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--secondary-color);
  min-height: 56px;

  /* Mobile responsive */
  @media (max-width: 768px) {
    padding: 12px 16px;
    background-color: var(--secondary-color);
    border-bottom: 1px solid var(--border-color);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    min-height: 48px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

const ChatAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.$isSavedMessages
      ? "#0288D1"
      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
    margin-right: 10px;
  }
`;

const ChatInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ChatName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  display: block;
  margin-bottom: 2px;

  /* Mobile responsive */
  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ChatStatus = styled.span`
  font-size: 13px;
  color: var(--text-secondary-color);
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.online ? "#43b581" : "#72767d")};
  animation: ${(props) => (props.online ? "pulse 2s infinite" : "none")};

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(67, 181, 129, 0.7);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(67, 181, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(67, 181, 129, 0);
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-right: 8px;

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    &:hover {
      background-color: transparent;
      color: var(--text-secondary-color);
    }
  }
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderIcon = styled.button`
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #4a4d52;
    color: #dcddde;
  }
`;

const HeaderDropdown = styled.div`
  position: absolute;
  top: 55px;
  right: 16px;
  background-color: rgba(20, 20, 20, 0.1);
  backdrop-filter: blur(5px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  display: flex;
  flex-direction: column;

  transform-origin: top right;
  animation: headerMenuFadeIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;

  @keyframes headerMenuFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const DropdownItem = styled.div`
  padding: 10px 14px;
  color: #dcddde;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  transition: all 0.15s ease;
  margin-bottom: 2px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--primary-color);
    color: #ffffff;
    transform: translateX(4px);
  }

  ${(props) =>
    props.danger &&
    `
    color: #f04747;
    &:hover {
      background-color: #f04747;
      color: #ffffff;
    }
  `}
`;

const ConfirmDialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ConfirmDialog = styled.div`
  background-color: var(--secondary-color);
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const ConfirmTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: var(--text-color);
`;

const ConfirmText = styled.p`
  margin: 0 0 24px 0;
  font-size: 15px;
  color: var(--text-muted-color);
  line-height: 1.5;
`;

const ConfirmActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${(props) => (props.danger ? "#ff4d4d" : "transparent")};
  color: ${(props) => (props.danger ? "white" : "var(--text-muted-color)")};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--text-muted-color);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--text-secondary-color);
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  cursor: pointer;
  border-radius: 16px;
  padding: 0 5px 5px 0;
  transition: background-color 0.2s ease;

  // &:hover {
  //   background-color: rgba(255, 255, 255, 0.05);
  //   border-radius: 8px;
  // }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
  gap: 8px;

  ${(props) =>
    props.isOwn
      ? `
    color: #b9bbbe;
    justify-content: flex-end;
  `
      : `
    color: #72767d;
    justify-content: flex-start;
  `}
`;

const MessageBubble = styled.div`
  width: fit-content;
  min-width: 60px;
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 12px;
  word-wrap: break-word;

  ${(props) =>
    props.isOwn
      ? `
    background-color: #4a4d52;
    color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 4px;
    text-align: right;
  `
      : `
    background-color: #40444b;
    color: #dcddde;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 12px;
    text-align: left;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;`}

  ${(props) =>
    props.isOwn
      ? `
    color: #ffffff;
    text-align: right;
    justify-content: flex-end;
    flex-direction: row-reverse;
  `
      : `
    color: #ffffff;
    text-align: left;
    justify-content: flex-start;
    flex-direction: row;
  `}
`;

const MessageText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 2px;
  white-space: pre-wrap;
  // user-select: none;

  ${(props) =>
    props.isOwn
      ? `
    text-align: right;
  `
      : `
    text-align: left;
  `}
`;

const MessageTime = styled.div`
  font-size: 11px;
  opacity: 0.7;

  ${(props) =>
    props.isOwn
      ? `
    text-align: right;
  `
      : `
    text-align: left;
  `}
`;

const ContextMenu = styled.div`
  position: fixed;
  /* Ultra-low opacity for maximum transparent iOS look */
  background-color: rgba(20, 20, 20, 0.1);
  backdrop-filter: blur(5px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  padding: 8px;
  min-width: 180px;
  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;

  transform-origin: top left;
  animation: contextMenuFadeIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;

  @keyframes contextMenuFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9) translateY(-10px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

const ContextMenuItem = styled.div`
  padding: 10px 14px;
  color: #dcddde;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  transition: all 0.15s ease;
  margin-bottom: 2px;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: var(--primary-color);
    color: #ffffff;
    transform: translateX(4px);
  }

  ${(props) =>
    props.$danger &&
    `
    color: #f04747;
    &:hover {
      background-color: #f04747;
      color: #ffffff;
    }
  `}
`;

const EditInput = styled.input`
  background: none;
  border: none;
  color: #dcddde;
  font-size: 14px;
  outline: none;
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);

  &::placeholder {
    color: #72767d;
  }

  &.edit-input {
    /* This class is used for click outside detection */
  }
`;

const EditContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const EditedIndicator = styled.span`
  font-size: 11px;
  color: #72767d;
  font-style: italic;
  margin-left: 4px;
`;

const ReplayIndicator = styled.div`
  background-color: #4a4d52;
  border-left: 2px solid #7289da;
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 4px;
  font-size: 13px;
  color: #b9bbbe;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #54585e;
  }

  .replay-close {
    position: absolute;
    top: 4px;
    right: 8px;
    color: #72767d;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    padding: 2px;

    &:hover {
      color: #dcddde;
    }
  }
`;

const DateSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
  position: relative;

  span {
    background-color: #36393f;
    color: #72767d;
    font-size: 12px;
    font-weight: 600;
    padding: 0 16px;
    position: relative;
    z-index: 2;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const ClickableUsername = styled.span`
  color: #dcddde;
  font-weight: 500;
  cursor: default;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  flex-shrink: 0;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

const EmojiPicker = styled.div`
  position: fixed;
  bottom: 100px;
  right: 40px;
  background-color: #36393f;
  border: 3px solid #7289da;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 6px;
  max-width: 360px;
  max-height: 240px;
  overflow-y: auto;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #4a4d52;
    transform: scale(1.1);
  }
`;

const MessageInputContainer = styled.div`
  padding: 12px 16px 16px;
  background-color: #2f3136;
  border-top: 1px solid #40444b;
  position: relative;
`;

const HeaderTypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--primary-color);
  font-size: 13px;
  font-weight: 500;

  .dots {
    display: flex;
    gap: 2px;
    align-items: center;
  }

  .dot {
    width: 3px;
    height: 3px;
    background-color: var(--primary-color);
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
  }

  .dot:nth-child(1) {
    animation-delay: -0.32s;
  }
  .dot:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: #40444b;
  border-radius: 20px;
  padding: 8px 12px;
  min-height: 44px;
  transition: background-color 0.2s ease;

  &:focus-within {
    background-color: #4a4d52;
  }
`;

const InputButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-right: 16px;
`;

const InputButton = styled.button`
  color: #b9bbbe;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #dcddde;
  }
`;

const MessageInput = styled.textarea`
  flex: 1;
  background: none;
  border: none;
  color: #dcddde;
  font-size: 15px;
  line-height: 20px;
  outline: none;
  resize: none;
  min-height: 25px;
  max-height: 400px;
  padding: 0;
  font-family: inherit;

  &::placeholder {
    color: #72767d;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4a4d52;
    border-radius: 2px;
  }

  &:hover {
    color: #dcddde;
  }
`;

const RightSidebar = styled.div`
  width: 350px;
  background-color: var(--secondary-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;

  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 350px;
    z-index: 10;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background-color: var(--secondary-color);
    animation: slideInFromRight 0.3s ease-out;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const SidebarHeader = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-color);
`;

const SidebarCloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  height: 20px;
  &:hover {
    color: var(--text-color);
  }
`;

const SidebarContent = styled.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
`;

const GroupProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LargeAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const GroupName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 4px;
`;

const GroupStatus = styled.div`
  font-size: 14px;
  color: var(--text-secondary-color);
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`;

const SectionTitle = styled.h4`
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--text-muted-color);
`;

const InfoText = styled.p`
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
  word-break: break-all;
`;

const CopyButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;

  &:hover {
    background-color: #4752c4;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MembersList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 12px;
  gap: 14px;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-color, rgba(255, 255, 255, 0.05));
  }
`;

const MemberAvatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

const ChatArea = ({
  onBack,
  selectedChannel,
  selectedNav,
  navigate,
  chats = [],
}) => {
  console.log(chats, selectedNav, selectedChannel);

  const [showInfo, setShowInfo] = useState(false);
  useEffect(() => {
    setShowInfo(false);
  }, [selectedChannel]);
  const {
    fetchMessages,
    sendMessage,
    editMessage,
    deleteMessage,
    getUserByUsername,
    createChat,
    editChat,
    previewGroupChat,
    joinGroupChat,
    deleteChat,
    leaveChat,
    chatSocket,
    markMessagesAsRead,
    typingUsers,
    sendTypingStatus,
    previewChat,
    setPreviewChat,
    searchGlobalUsers,
  } = useChats();
  const { isUserOnline, getOnlineCount } = usePresence();
  const { startPrivateCall } = useCall();
  const currentChat = chats.find(
    (c) => c.urlSlug === selectedChannel || c.id === selectedChannel,
  );
  console.log(currentChat, "----------");

  const [messageInput, setMessageInput] = useState("");
  const typingTimeoutRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesHasMore, setMessagesHasMore] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);

  // Get current user to identify own messages
  const currentUser = useAuthStore((state) => state.user);

  const handleMemberClick = async (targetUser) => {
    const currentUserId = currentUser?._id || currentUser?.id;
    const targetId = targetUser._id || targetUser.id;
    // if (targetId === currentUserId) return; // Prevent clicking self to start private chat

    const existingChat = chats.find((c) => {
      if (c.isGroup || !c.members || c.isSavedMessages) return false;
      return c.members.some((m) => (m._id || m.id) === targetId);
    });
    console.log(targetUser, existingChat);

    console.log(existingChat);

    if (!existingChat) {
      navigate(`/users/${existingChat.jammId}`);
      setShowInfo(false);
    } else {
      try {
        const chatId = await createChat({
          isGroup: false,
          memberIds: [targetId],
        });
        if (chatId) {
          navigate(`/users/${chatId.jammId}`);
          setShowInfo(false);
        }
      } catch (error) {
        console.error("Failed to start private chat", error);
      }
    }
  };
  const [replayMessage, setReplayMessage] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editInput, setEditInput] = useState("");

  const displayChat = currentChat || previewChat;

  const [showSearch, setShowSearch] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const headerMenuRef = useRef(null);
  const messageRefs = useRef({});
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null); // Ref for message elements
  const messageInputRef = useRef(null); // Ref for message input

  // Presence check helpers
  const otherMember =
    displayChat?.type !== "group" && displayChat?.members
      ? displayChat.members.find((m) => {
          const mid = m._id || m.id;
          const currentId = currentUser?._id || currentUser?.id;
          return String(mid) !== String(currentId);
        })
      : null;
  const isOnline = otherMember ? isUserOnline(otherMember._id) : false;
  const onlineCount =
    displayChat?.type === "group" ? getOnlineCount(displayChat.members) : 0;

  // Format last seen text
  const lastSeenText = React.useMemo(() => {
    if (!otherMember || isOnline) return "Online";
    if (!otherMember.lastSeen) return "Offline";
    const date = new Date(otherMember.lastSeen);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);

    if (diffMins < 60) return `Last seen ${diffMins}m ago`;
    if (diffHours < 24) return `Last seen ${diffHours}h ago`;
    return `Last seen ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  }, [otherMember, isOnline]);

  // Track attempts to prevent infinite loops
  const previewLocationRef = useRef(null);
  // Fetch group or user preview if channel exists but user is not in it
  useEffect(() => {
    if (
      (selectedNav === "groups" ||
        selectedNav === "users" ||
        selectedNav === "a" ||
        selectedNav === "chats") &&
      selectedChannel &&
      !currentChat
    ) {
      if (previewLocationRef.current !== selectedChannel) {
        previewLocationRef.current = selectedChannel;

        const fetchPreview = async () => {
          try {
            if (selectedNav === "users") {
              const { getPublicProfile } = await import("../api/chatApi");
              console.log(getPublicProfile);

              const user = await getPublicProfile(selectedChannel);

              if (user) {
                setPreviewChat({
                  type: "user",
                  id: null,
                  name: user.nickname || user.username,
                  avatar: user.avatar,
                  description: user.bio,
                  targetUserId: user._id || user.id,
                });
                return;
              }
            }

            if (
              selectedNav === "groups" ||
              selectedNav === "a" ||
              selectedNav === "chats"
            ) {
              try {
                const chat = await previewGroupChat(selectedChannel);

                setPreviewChat(chat);
              } catch (err) {
                if (selectedNav === "groups") {
                  console.error(
                    "Group Preview failed, trying user resolution:",
                    err,
                  );
                }
                if (selectedNav !== "groups") {
                  const { getPublicProfile } = await import("../api/chatApi");
                  const user = await getPublicProfile(selectedChannel);
                  console.log(user, "kjhkkkkkkk");

                  if (user) {
                    setPreviewChat({
                      type: "user",
                      id: null,
                      name: user.nickname || user.username,
                      avatar: user.avatar,
                      description: user.bio,
                      targetUserId: user._id || user.id,
                    });
                  } else {
                    setPreviewChat(null);
                  }
                } else {
                  setPreviewChat(null);
                }
              }
            } else {
              setPreviewChat(null);
            }
          } catch (error) {
            console.error("Preview resolution completely failed:", error);
            setPreviewChat(null);
          }
        };

        fetchPreview();
      }
    } else {
      previewLocationRef.current = null;
      setPreviewChat(null);
    }
  }, [selectedNav, selectedChannel, currentChat]);

  // Output fetching messages on channel select
  useEffect(() => {
    if (!currentChat) return;

    const loadMessages = async () => {
      setIsLoadingMessages(true);
      const res = await fetchMessages(currentChat.id, 1, 30);
      setMessages(res.data || []);
      setMessagesPage(res.page || 1);
      setMessagesHasMore((res.page || 1) < (res.totalPages || 1));
      setIsLoadingMessages(false);

      const msgs = res.data || [];
      const currentUserId = currentUser?._id || currentUser?.id;
      const firstUnread = msgs.find(
        (m) =>
          m.senderId !== currentUserId && !m.readBy?.includes(currentUserId),
      );

      setTimeout(() => {
        const msgId = firstUnread ? firstUnread.id || firstUnread._id : null;
        if (msgId && messageRefs.current[msgId]) {
          messageRefs.current[msgId].scrollIntoView({
            behavior: "auto",
            block: "center",
          });
        } else {
          scrollToBottom("auto");
        }
      }, 100);
    };

    loadMessages();
  }, [currentChat?.id, fetchMessages]);

  const fetchMoreMessages = async () => {
    if (!currentChat || isLoadingMessages || !messagesHasMore) return;
    setIsLoadingMessages(true);

    // Save current scroll height to preserve position
    const scrollContainer = document.getElementById("scrollableChatArea");
    const previousScrollHeight = scrollContainer
      ? scrollContainer.scrollHeight
      : 0;
    const previousScrollTop = scrollContainer ? scrollContainer.scrollTop : 0;

    const nextPage = messagesPage + 1;
    const res = await fetchMessages(currentChat.id, nextPage, 30);
    const newMsgs = res.data || [];

    setMessages((prev) => [...newMsgs, ...prev]);
    setMessagesPage(nextPage);
    setMessagesHasMore(nextPage < (res.totalPages || 1));
    setIsLoadingMessages(false);

    // Restore scroll position so it doesn't jump to the top
    setTimeout(() => {
      if (scrollContainer) {
        scrollContainer.scrollTop =
          scrollContainer.scrollHeight -
          previousScrollHeight +
          previousScrollTop;
      }
    }, 0);
  };

  // Handle Socket Rooms
  useEffect(() => {
    if (!chatSocket || !currentChat) return;

    chatSocket.emit("join_chat", { chatId: currentChat.id });

    return () => {
      chatSocket.emit("leave_chat", { chatId: currentChat.id });
    };
  }, [chatSocket, currentChat?.id]);

  // Listen to Real-time Events
  useEffect(() => {
    if (!chatSocket) return;

    const handleNewMessage = (rawMsg) => {
      if (rawMsg.chatId !== currentChat?.id) return;

      const msg = {
        id: rawMsg._id,
        user: rawMsg.senderId?.nickname || rawMsg.senderId?.username,
        avatar:
          rawMsg.senderId?.avatar ||
          (rawMsg.senderId?.nickname || rawMsg.senderId?.username)?.charAt(0) ||
          "U",
        senderId: rawMsg.senderId?._id || rawMsg.senderId,
        content: rawMsg.content,
        timestamp: dayjs(rawMsg.createdAt).format("HH:mm"),
        date: dayjs(rawMsg.createdAt).format("YYYY-MM-DD"),
        edited: rawMsg.isEdited,
        isDeleted: rawMsg.isDeleted,
        readBy: rawMsg.readBy || [],
        replayTo: rawMsg.replayTo
          ? {
              id: rawMsg.replayTo._id,
              user:
                rawMsg.replayTo.senderId?.nickname ||
                rawMsg.replayTo.senderId?.username,
              content: rawMsg.replayTo.content,
            }
          : null,
      };

      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });

      const currentUserId = currentUser?._id || currentUser?.id;
      if (msg.senderId === currentUserId) {
        setTimeout(() => scrollToBottom("smooth"), 100);
      }
    };

    const handleUpdatedMessage = (rawMsg) => {
      if (rawMsg.chatId !== currentChat?.id) return;

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === rawMsg._id) {
            return { ...m, content: rawMsg.content, edited: true };
          }
          return m;
        }),
      );
    };

    const handleDeletedMessage = (rawMsg) => {
      if (rawMsg.chatId !== currentChat?.id) return;

      setMessages((prev) => prev.filter((m) => m.id !== rawMsg._id));
    };

    const handleMessagesRead = ({ chatId, readByUserId, messageIds }) => {
      if (currentChat?.id !== chatId) return;
      setMessages((prev) =>
        prev.map((m) => {
          const senderIdStr =
            m.senderId && typeof m.senderId === "object"
              ? m.senderId._id || m.senderId.id
              : m.senderId;

          if (
            senderIdStr !== readByUserId &&
            messageIds?.includes(m.id || m._id) &&
            !m.readBy?.includes(readByUserId)
          ) {
            return { ...m, readBy: [...(m.readBy || []), readByUserId] };
          }
          return m;
        }),
      );
    };

    chatSocket.on("message_new", handleNewMessage);
    chatSocket.on("message_updated", handleUpdatedMessage);
    chatSocket.on("message_deleted", handleDeletedMessage);
    chatSocket.on("messages_read", handleMessagesRead);

    return () => {
      chatSocket.off("message_new", handleNewMessage);
      chatSocket.off("message_updated", handleUpdatedMessage);
      chatSocket.off("message_deleted", handleDeletedMessage);
      chatSocket.off("messages_read", handleMessagesRead);
    };
  }, [chatSocket, currentChat?.id]);

  // IntersectionObserver for read receipts
  useEffect(() => {
    if (!currentChat) return;

    // We only need to mark as read if there are unread messages from the other person
    const currentUserId = currentUser?._id || currentUser?.id;
    const unreadMessages = messages.filter((m) => {
      const senderIdStr =
        m.senderId && typeof m.senderId === "object"
          ? m.senderId._id || m.senderId.id
          : m.senderId;
      return (
        senderIdStr !== currentUserId && !m.readBy?.includes(currentUserId)
      );
    });

    if (unreadMessages.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const newlyReadIds = [];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.dataset.messageId;
            const msg = messages.find(
              (m) =>
                String(m.id) === String(messageId) ||
                String(m._id) === String(messageId),
            );
            if (msg) {
              const senderIdStr =
                msg.senderId && typeof msg.senderId === "object"
                  ? msg.senderId._id || msg.senderId.id
                  : msg.senderId;

              if (
                String(senderIdStr) !== String(currentUserId) &&
                !msg.readBy?.includes(currentUserId)
              ) {
                newlyReadIds.push(msg.id || msg._id);
              }
            }
          }
        });

        if (newlyReadIds.length > 0) {
          markMessagesAsRead(currentChat.id, newlyReadIds);
        }
      },
      { threshold: 0.1 },
    );

    // Observe unread messages
    unreadMessages.forEach((msg) => {
      const el = messageRefs.current[msg.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [messages, currentChat, currentUser, markMessagesAsRead]);

  // Keep focus on message input
  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
      // Set cursor to end
      messageInputRef.current.setSelectionRange(
        messageInputRef.current.value.length,
        messageInputRef.current.value.length,
      );
    }
  }, [selectedChannel, selectedNav, replayMessage]);

  // Auto-resize message input height
  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.style.height = "25px";
      messageInputRef.current.style.height = `${messageInputRef.current.scrollHeight}px`;
    }
  }, [messageInput]);

  const [clickCount, setClickCount] = useState(0);
  const [clickedMessageId, setClickedMessageId] = useState(null);
  const [clickTimer, setClickTimer] = useState(null);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = (targetSlug) => {
    const link = `${window.location.origin}/${targetSlug}`;
    navigator.clipboard.writeText(link).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // useEffect(() => {
  //   // Check if navigation is for video call
  //   if (selectedNav === "group-video-call") {
  //     startPrivateVideoCall("Group Call");
  //   }

  //   // Simulate incoming call after 8 seconds for testing
  //   const incomingCallTimer = setTimeout(() => {
  //     setIncomingCall({ name: "Alice" });
  //   }, 8000);

  //   return () => {
  //     if (incomingCallTimer) {
  //       clearTimeout(incomingCallTimer);
  //     }
  //   };
  // }, [selectedNav]);

  useEffect(() => {
    return () => {
      if (clickTimer) {
        clearTimeout(clickTimer);
      }
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
    };
  }, [clickTimer, longPressTimer]);

  const currentMessages = React.useMemo(() => {
    return messages;
  }, [messages]);

  const currentChatName = displayChat?.name || "Chat";

  const scrollToBottom = (behavior = "auto") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  const focusToReplayedMessage = (messageId) => {
    const messageElement = messageRefs.current[messageId];
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
      // Add highlight effect
      messageElement.style.backgroundColor = "rgba(114, 137, 218, 0.3)";
      setTimeout(() => {
        messageElement.style.backgroundColor = "";
      }, 2000);
    }
  };

  const handleMessageDoubleClick = (message, event) => {
    // Prevent double click on mobile from causing zooming
    if (event) event.preventDefault();

    // If clicking on a different message, reset click count
    if (clickedMessageId !== message.id) {
      setClickCount(1);
      setClickedMessageId(message.id);
    } else {
      setClickCount((prev) => prev + 1);
    }

    // Clear previous timer
    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    // Set new timer
    const timer = setTimeout(() => {
      if (clickCount === 1 && clickedMessageId === message.id) {
        // This is the second click on the same message - trigger replay
        // Always replace with new replay, even if one exists
        setReplayMessage(message);
        console.log("Replay triggered for message:", message);

        // Focus input and set cursor to end after replay
        setTimeout(() => {
          if (messageInputRef.current) {
            messageInputRef.current.focus();
            // Set cursor to end
            messageInputRef.current.setSelectionRange(
              messageInputRef.current.value.length,
              messageInputRef.current.value.length,
            );
          }
        }, 0);
      }
      setClickCount(0);
      setClickedMessageId(null);
    }, 300);

    setClickTimer(timer);
  };

  const showContextMenu = (message, event) => {
    const x = event.clientX;
    const y = event.clientY;

    // Get menu dimensions (approximate)
    const menuWidth = 180;
    const menuHeight = message.user === "You" ? 120 : 40;

    // Check boundaries and adjust position
    let adjustedX = x;
    let adjustedY = y;

    if (x + menuWidth > window.innerWidth) {
      adjustedX = window.innerWidth - menuWidth - 10;
    }

    if (y + menuHeight > window.innerHeight) {
      adjustedY = window.innerHeight - menuHeight - 10;
    }

    if (adjustedX < 10) adjustedX = 10;
    if (adjustedY < 10) adjustedY = 10;

    setContextMenu({
      x: adjustedX,
      y: adjustedY,
      message,
    });
  };

  const handleContextMenuAction = async (action, message) => {
    switch (action) {
      case "delete":
        try {
          // Optimistically remove from UI
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === message.id
                ? { ...msg, isDeleted: true, content: "Bu xabar o'chirildi" }
                : msg,
            ),
          );
          await deleteMessage(message.id);
          console.log("Message deleted:", message);
        } catch (error) {
          console.error("Failed to delete message", error);
        }
        break;
      case "edit":
        if (message.isDeleted) return; // Cannot edit deleted message
        // Edit message logic - start edit mode
        setEditingMessage(message);
        setEditInput(message.content);
        console.log("Edit mode started for message:", message);
        break;
      case "replay":
        // Replay message logic
        setReplayMessage(message);
        setMessageInput("");
        console.log("Replay message:", message);

        // Focus input and set cursor to end after replay
        setTimeout(() => {
          if (messageInputRef.current) {
            messageInputRef.current.focus();
            // Set cursor to end
            messageInputRef.current.setSelectionRange(
              messageInputRef.current.value.length,
              messageInputRef.current.value.length,
            );
          }
        }, 0);
        break;
    }
    setContextMenu(null);
  };

  const handleEditMessage = async (e) => {
    if (e.key === "Enter" && editInput.trim()) {
      try {
        const newContent = editInput.trim();

        // Update the message optimistically
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === editingMessage.id
              ? { ...msg, content: newContent, edited: true }
              : msg,
          ),
        );

        // Clear edit mode immediately
        const msgId = editingMessage.id;
        setEditingMessage(null);
        setEditInput("");

        // Call backend API
        await editMessage(msgId, newContent);
        console.log("Message edited on backend:", msgId, "->", newContent);
      } catch (error) {
        console.error("Failed to edit message", error);
      }
    } else if (e.key === "Escape") {
      // Cancel edit mode
      setEditingMessage(null);
      setEditInput("");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageInput(value);

    const chatId = currentChat?.id || currentChat?._id;
    if (chatId && value.trim()) {
      if (!typingTimeoutRef.current) {
        sendTypingStatus(chatId, true);
      }

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingStatus(chatId, false);
        typingTimeoutRef.current = null;
      }, 3000);
    } else if (chatId && !value.trim() && typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      sendTypingStatus(chatId, false);
      typingTimeoutRef.current = null;
    }
  };

  const getTypingText = () => {
    const chatId = currentChat?.id || currentChat?._id;
    if (!chatId || !typingUsers[chatId]) return null;
    const usersInChat = typingUsers[chatId];
    const typingIds = Object.keys(usersInChat);
    if (typingIds.length === 0) return null;

    const currentUserId = currentUser?._id || currentUser?.id;
    const othersTyping = typingIds.filter(
      (id) => String(id) !== String(currentUserId),
    );
    if (othersTyping.length === 0) return null;

    if (currentChat.type === "user") {
      return "yozmoqda";
    } else {
      const names = othersTyping.map((id) => {
        const member = currentChat.members?.find(
          (m) => String(m._id || m.id) === String(id),
        );
        return member?.nickname || member?.username || "Kimdir";
      });
      if (names.length === 1) return `${names[0]} yozmoqda`;
      if (names.length === 2) return `${names[0]} va ${names[1]} yozmoqdalar`;
      return "Bir necha kishi yozmoqda";
    }
  };

  const handleUsernameClick = (username, e) => {
    e.stopPropagation();
    // Find user ID from username (simplified logic)
    const userChats = [
      { id: 200, name: "Ota" },
      { id: 201, name: "Bob Smith" },
      { id: 202, name: "Charlie Wilson" },
      { id: 203, name: "Diana Brown" },
    ];
    console.log("click", username, e);

    const userChat = userChats.find((chat) => chat.name === username);
    if (userChat && navigate) {
      navigate(`/a/${userChat.id}`);
    }
  };

  const getUserAvatar = (username) => {
    // Get initials from username
    const names = username.split(" ");
    if (names.length >= 2) {
      return names[0][0] + names[names.length - 1][0];
    } else {
      return names[0].substring(0, 2).toUpperCase();
    }
  };

  const parseMessageContent = (content) => {
    // Parse @username mentions and URLs
    const mentionRegex = /@(\w+)/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const parts = [];
    let lastIndex = 0;

    // Find all matches (mentions and URLs)
    const allMatches = [];
    let match;

    // Find mentions
    while ((match = mentionRegex.exec(content)) !== null) {
      allMatches.push({
        type: "mention",
        index: match.index,
        length: match[0].length,
        username: match[1],
        content: match[0],
      });
    }

    // Find URLs
    while ((match = urlRegex.exec(content)) !== null) {
      allMatches.push({
        type: "url",
        index: match.index,
        length: match[0].length,
        url: match[0],
        content: match[0],
      });
    }

    // Sort matches by index
    allMatches.sort((a, b) => a.index - b.index);

    // Build parts array
    allMatches.forEach((match) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({
          type: "text",
          content: content.substring(lastIndex, match.index),
        });
      }

      // Add match (mention or URL)
      parts.push(match);
      lastIndex = match.index + match.length;
    });

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push({
        type: "text",
        content: content.substring(lastIndex),
      });
    }

    return parts.length > 0 ? parts : [{ type: "text", content }];
  };

  const handleMentionClick = async (username, e) => {
    e.stopPropagation();
    try {
      // Find user ID from username using backend API
      const user = await getUserByUsername(username);
      console.log(user, navigate, currentUser);

      if (user && navigate) {
        // Stop if user is clicking on themselves
        if (currentUser && user.i_d === currentUser._id) {
          toast.error("Siz o'zingiz bilan suhbat qura olmaysiz");
          return;
        }

        // Find existing chat with this user
        const existingChat = chats.find(
          (c) =>
            !c.isGroup &&
            c.members &&
            c.members.some((m) => m._id === user._id),
        );

        if (existingChat) {
          if (existingChat?.isGroup) {
            navigate(`/groups/${existingChat.jammId}`);
          } else {
            navigate(`/users/${existingChat.jammId}`);
          }
        } else {
          // Create new private chat
          const chatId = await createChat({
            isGroup: false,
            memberIds: [user._id],
          });
          console.log(chatId);

          if (chatId) {
            if (chatId?.isGroup) {
              navigate(`/groups/${chatId?.jammId}`);
            } else {
              navigate(`/users/${chatId?.jammId}`);
            }
          }
        }
      } else {
        toast.error("Bunday foydalanuvchi topilmadi");
      }
    } catch (error) {
      console.error("Error handling mention click:", error);
      toast.error("Foydalanuvchini qidirishda xatolik yuz berdi");
    }
  };

  const renderMessageContent = (content) => {
    const parts = parseMessageContent(content);

    return parts.map((part, index) => {
      if (part.type === "mention") {
        return (
          <span
            key={index}
            onClick={(e) => handleMentionClick(part.username, e)}
            style={{
              pointerEvents: "auto",
              color: "var(--primary-color)",
              padding: "2px 4px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--active-color)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            {part.content}
          </span>
        );
      } else if (part.type === "url") {
        return (
          <a
            href={part.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--primary-color)",
              textDecoration: "none",
              borderBottom: "1px solid transparent",
              transition: "border-color 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderBottomColor = "var(--primary-color)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderBottomColor = "transparent";
            }}
          >
            {part.content}
          </a>
        );
      }
      return <span key={index}>{part.content}</span>;
    });
  };

  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😏",
    "😒",
    "🙄",
    "😬",
    "🤥",
    "😌",
    "😔",
    "😪",
    "🤤",
    "😴",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "🥵",
    "🥶",
    "🥴",
    "😵",
    "🤯",
    "🤠",
    "🥳",
    "😎",
    "🤓",
    "🧐",
    "😕",
    "😟",
    "🙁",
    "☹️",
    "😮",
    "😯",
    "😲",
    "😳",
    "🥺",
    "😦",
    "😧",
    "😨",
    "😰",
    "😱",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🤪",
    "😵",
    "🥴",
    "😵‍💫",
    "🤯",
    "🥶",
    "🥵",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
  ];

  const handleEmojiClick = (emoji) => {
    setMessageInput((prev) => prev + emoji);
    setShowEmojiPicker(false);

    // Focus input and set cursor to end after emoji selection
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus();
        // Set cursor to end
        messageInputRef.current.setSelectionRange(
          messageInputRef.current.value.length,
          messageInputRef.current.value.length,
        );
      }
    }, 0);
  };

  const toggleEmojiPicker = (e) => {
    e.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);

    // Focus input and set cursor to end when closing emoji picker
    if (showEmojiPicker) {
      setTimeout(() => {
        if (messageInputRef.current) {
          messageInputRef.current.focus();
          // Set cursor to end
          messageInputRef.current.setSelectionRange(
            messageInputRef.current.value.length,
            messageInputRef.current.value.length,
          );
        }
      }, 0);
    }
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const startPrivateVideoCall = () => {
    if (!displayChat || !otherMember) return;
    startPrivateCall({
      _id: otherMember._id || otherMember.id,
      name: otherMember.nickname || otherMember.username || displayChat.name,
      avatar: otherMember.avatar || displayChat.avatar,
    });
  };

  const handleIncomingCall = () => {
    // Simulate incoming call after 5 seconds
    setTimeout(() => {
      setIncomingCall({ name: "Alice" });
    }, 5000);
  };

  const handleDeleteChat = async () => {
    if (!currentChat?.id) return;
    const isLeave =
      currentChat.isGroup && currentChat.createdBy !== currentUser?._id;

    try {
      if (isLeave) {
        await leaveChat(currentChat.id);
        toast.success("Guruhdan muvaffaqiyatli chiqdingiz");
      } else {
        await deleteChat(currentChat.id);
        toast.success("Suhbat muvaffaqiyatli o'chirildi");
      }
      setShowDeleteConfirm(false);
      navigate("/chats");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          (isLeave
            ? "Guruhdan chiqishda xatolik yuz berdi"
            : "Suhbatni o'chirishda xatolik yuz berdi"),
      );
    }
  };

  const handleAcceptCall = () => {
    setPrivateVideoCallUser(incomingCall.name);
    setIsPrivateVideoCallOpen(true);
    setIncomingCall(null);
  };

  const handleRejectCall = () => {
    setIncomingCall(null);
  };

  const handleCancelCall = () => {
    setOutgoingCall(null);
  };

  const endPrivateVideoCall = () => {
    setIsPrivateVideoCallOpen(false);
    setPrivateVideoCallUser("");
  };

  // Use explicit scrolling for better UX

  useEffect(() => {
    // Close context menu when clicking outside
    const handleClickOutside = (e) => {
      if (contextMenu) {
        closeContextMenu();
      }
    };

    // Close emoji picker when clicking outside
    const handleEmojiPickerClickOutside = (e) => {
      if (
        showEmojiPicker &&
        !e.target.closest(".emoji-picker-container") &&
        !e.target.closest(".emoji-button")
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleEmojiPickerClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleEmojiPickerClickOutside);
    };
  }, [contextMenu, showEmojiPicker]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showHeaderMenu &&
        headerMenuRef.current &&
        !headerMenuRef.current.contains(e.target)
      ) {
        setShowHeaderMenu(false);
      }
    };

    if (showHeaderMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showHeaderMenu]);

  useEffect(() => {
    // Cancel edit mode when clicking outside
    const handleClickOutside = (e) => {
      if (editingMessage && !e.target.closest(".edit-input")) {
        setEditingMessage(null);
        setEditInput("");
      }
    };

    if (editingMessage) {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [editingMessage]);

  // Group messages by date
  const groupMessagesByDate = (messages) => {
    const groups = [];
    let currentDate = null;

    messages.forEach((message) => {
      // Handle messages without date field (use timestamp to create date)
      let messageDate;
      if (message.date) {
        messageDate = message.date;
      } else {
        // Extract date from timestamp or create current date
        if (message.timestamp) {
          const timestamp = new Date(message.timestamp);
          if (!isNaN(timestamp.getTime())) {
            messageDate = dayjs(timestamp).format("YYYY-MM-DD");
          } else {
            messageDate = dayjs().format("YYYY-MM-DD");
          }
        } else {
          messageDate = dayjs().format("YYYY-MM-DD");
        }
      }

      if (messageDate !== currentDate) {
        currentDate = messageDate;
        groups.push({
          type: "date",
          date: messageDate,
          messages: [],
        });
      }

      groups.push({
        type: "message",
        ...message,
        date: messageDate, // Ensure date field exists
      });
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate(currentMessages);

  const formatDate = (dateString) => {
    return formatMessageDate(dateString);
  };

  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (messageInput.trim()) {
        const content = messageInput.trim();
        const replayId = replayMessage ? replayMessage.id : null;

        // Clear input and replay state immediately for snappy UI
        setMessageInput("");
        setReplayMessage(null);

        // Refocus input and set cursor to end
        setTimeout(() => {
          if (messageInputRef.current) {
            messageInputRef.current.focus();
          }
        }, 0);

        try {
          let targetChatId = currentChat?.id;

          // Auto-create private chat on first message
          if (!targetChatId && previewChat?.type === "user") {
            const { createChat } = await import("../api/chatApi");
            targetChatId = await createChat({
              isGroup: false,
              memberIds: [previewChat.targetUserId],
            });
            if (targetChatId) {
              navigate(`/users/${targetChatId}`);
            }
          }

          if (targetChatId) {
            const lastMessage = await sendMessage(
              targetChatId,
              content,
              replayId,
            );

            setTimeout(() => scrollToBottom("smooth"), 100);
            console.log("Message sent to backend:", lastMessage);
          }
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      }
    }
  };

  return (
    <OuterChatWrapper>
      <ChatContainer>
        <ChatHeader>
          <HeaderLeft
            onClick={() => {
              if (["groups", "users", "a", "chats"].includes(selectedNav)) {
                setShowInfo((prev) => !prev);
              }
            }}
            style={{
              cursor: ["groups", "users", "a", "chats"].includes(selectedNav)
                ? "pointer"
                : "default",
            }}
          >
            <HeaderButton
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
            >
              <ArrowLeft size={20} />
            </HeaderButton>
            <ChatAvatar $isSavedMessages={currentChat?.isSavedMessages}>
              {currentChat?.isSavedMessages ? (
                <Bookmark size={20} color="white" fill="white" />
              ) : currentChat?.avatar?.length > 1 ? (
                <img
                  src={currentChat.avatar}
                  alt={currentChatName}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                currentChatName.charAt(0).toUpperCase()
              )}
            </ChatAvatar>
            <ChatInfo>
              <ChatName>
                {currentChatName}
                {displayChat?.premiumStatus === "active" && (
                  <PremiumBadgeIcon width={16} height={16} />
                )}
              </ChatName>
              <ChatStatus>
                {getTypingText() ? (
                  <HeaderTypingIndicator>
                    <div className="dots">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                    </div>
                    {getTypingText()}
                  </HeaderTypingIndicator>
                ) : displayChat?.type === "group" ? (
                  <>
                    <Users size={14} style={{ marginRight: 4 }} />
                    {displayChat?.members?.length || 0} a'zo
                    {onlineCount > 0 && `, ${onlineCount} online`}
                  </>
                ) : displayChat?.isSavedMessages ? (
                  <>o'zim</>
                ) : ["jamm", "premium"].includes(displayChat?.username) ? (
                  <>Rasmiy</>
                ) : (
                  <>
                    <StatusDot online={isOnline} />
                    {lastSeenText}
                  </>
                )}
              </ChatStatus>
            </ChatInfo>
          </HeaderLeft>

          <HeaderRight>
            {displayChat?.type === "user" &&
              !displayChat?.isSavedMessages &&
              !["jamm", "premium"].includes(displayChat?.username) && (
                <HeaderButton
                  onClick={() => {
                    if (isOnline) {
                      startPrivateVideoCall();
                    } else {
                      toast.error(
                        "Foydalanuvchi offline. Hozirda qo'ng'iroq qilib bo'lmaydi.",
                      );
                    }
                  }}
                  disabled={!isOnline}
                  title={
                    !isOnline ? "Foydalanuvchi offline" : "Video qo'ng'iroq"
                  }
                >
                  <Phone size={20} />
                </HeaderButton>
              )}

            <div style={{ position: "relative" }} ref={headerMenuRef}>
              {!["jamm", "premium"].includes(displayChat?.username) && (
                <HeaderButton
                  onClick={() => setShowHeaderMenu(!showHeaderMenu)}
                >
                  <MoreVertical size={20} />
                </HeaderButton>
              )}

              {showHeaderMenu && (
                <HeaderDropdown>
                  <DropdownItem
                    onClick={() => {
                      setShowHeaderMenu(false);
                      setShowInfo(true);
                    }}
                  >
                    <Info size={18} />
                    {displayChat?.type === "group"
                      ? "Guruh ma'lumotlari"
                      : "Foydalanuvchi ma'lumotlari"}
                  </DropdownItem>

                  {displayChat?.type === "group" &&
                    (() => {
                      const currentUserId = currentUser?._id || currentUser?.id;
                      const isOwner = currentChat.createdBy === currentUserId;
                      const myAdminRecord = currentChat.admins?.find(
                        (a) => (a.userId || a.id || a._id) === currentUserId,
                      );
                      const canEdit =
                        isOwner ||
                        (myAdminRecord &&
                          myAdminRecord.permissions?.length > 0);

                      if (!canEdit) return null;

                      return (
                        <DropdownItem
                          onClick={() => {
                            setShowHeaderMenu(false);
                            setIsEditGroupOpen(true);
                          }}
                        >
                          <Edit2 size={18} />
                          Guruhni tahrirlash
                        </DropdownItem>
                      );
                    })()}

                  <div
                    style={{
                      height: "1px",
                      background: "rgba(255, 255, 255, 0.1)",
                      margin: "4px 8px",
                    }}
                  />

                  {displayChat?.isGroup &&
                  displayChat?.createdBy !== currentUser?._id ? (
                    <DropdownItem
                      danger
                      onClick={() => {
                        setShowHeaderMenu(false);
                        setShowDeleteConfirm(true);
                      }}
                    >
                      <LogOut size={18} />
                      Guruhni tark etish
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      danger
                      onClick={() => {
                        setShowHeaderMenu(false);
                        setShowDeleteConfirm(true);
                      }}
                    >
                      <Trash2 size={18} />
                      Suhbatni o'chirish
                    </DropdownItem>
                  )}
                </HeaderDropdown>
              )}
            </div>
          </HeaderRight>
        </ChatHeader>

        <div
          style={{
            display: "flex",
            flex: 1,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
            }}
          >
            <MessagesContainer
              id="scrollableChatArea"
              onContextMenu={(e) => e.preventDefault()}
            >
              <InfiniteScroll
                dataLength={messages.length}
                next={fetchMoreMessages}
                style={{ display: "flex", flexDirection: "column" }}
                inverse={false} // Custom inverted scroll handling above
                hasMore={messagesHasMore}
                loader={
                  <h4
                    style={{
                      textAlign: "center",
                      padding: "10px",
                      color: "var(--text-muted-color)",
                    }}
                  >
                    Yuklanmoqda...
                  </h4>
                }
                scrollableTarget="scrollableChatArea"
              >
                <MessageContainer>
                  {messageGroups.map((group, index) => {
                    if (group.type === "date") {
                      return (
                        <DateSeparator key={`date-${index}`}>
                          <span>{formatDate(group.date)}</span>
                        </DateSeparator>
                      );
                    }

                    const currentUserId = currentUser
                      ? currentUser._id || currentUser.id
                      : null;

                    // Safely extract the sender ID, handling the case where it's a populated Mongoose object
                    const senderIdString =
                      group.senderId && typeof group.senderId === "object"
                        ? group.senderId._id || group.senderId.id
                        : group.senderId;

                    const isCurrentUserMessage =
                      currentUserId && senderIdString === currentUserId;

                    return (
                      <MessageWrapper
                        key={group.id}
                        data-message-id={group.id}
                        isOwn={isCurrentUserMessage}
                        onClick={() => handleMessageDoubleClick(group)}
                        ref={(el) => {
                          messageRefs.current[group.id] = el;
                        }}
                      >
                        {!isCurrentUserMessage ? (
                          <>
                            {displayChat?.type === "group" && (
                              <MessageHeader isOwn={false}>
                                <div
                                  style={{
                                    flex: 1,
                                    marginLeft: "40px",
                                  }}
                                >
                                  <ClickableUsername>
                                    {group.user}
                                    {group.senderId?.premiumStatus ===
                                      "active" && (
                                      <PremiumBadgeIcon
                                        width={14}
                                        height={14}
                                      />
                                    )}
                                  </ClickableUsername>
                                </div>
                              </MessageHeader>
                            )}
                            {group.replayTo && (
                              <ReplayIndicator
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Find the original message from messages array
                                  const allMessages = messages;
                                  const originalMessage = allMessages.find(
                                    (msg) =>
                                      msg.user === group.replayTo.user &&
                                      msg.content === group.replayTo.content,
                                  );
                                  if (originalMessage) {
                                    focusToReplayedMessage(originalMessage.id);
                                  }
                                }}
                              >
                                {group.replayTo.user} - "
                                {group.replayTo.content}"
                              </ReplayIndicator>
                            )}
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {selectedNav === "groups" && (
                                <UserAvatar
                                  onClick={(e) =>
                                    handleUsernameClick(group.user, e)
                                  }
                                >
                                  {getUserAvatar(group.user)}
                                </UserAvatar>
                              )}
                              <MessageBubble
                                isOwn={false}
                                onContextMenu={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  showContextMenu(group, e);
                                }}
                              >
                                {editingMessage?.id === group.id ? (
                                  <EditContainer>
                                    <EditInput
                                      className="edit-input"
                                      type="text"
                                      value={editInput}
                                      onChange={(e) =>
                                        setEditInput(e.target.value)
                                      }
                                      onKeyDown={handleEditMessage}
                                      placeholder="Xabarni tahrirlang..."
                                      maxLength={400}
                                      autoFocus
                                    />
                                  </EditContainer>
                                ) : (
                                  <>
                                    <MessageText isOwn={false}>
                                      {renderMessageContent(group.content)}
                                    </MessageText>
                                    {group.edited && (
                                      <EditedIndicator>
                                        (tahrirlandi)
                                      </EditedIndicator>
                                    )}
                                  </>
                                )}
                              </MessageBubble>
                            </div>
                          </>
                        ) : (
                          <>
                            {group.replayTo && (
                              <ReplayIndicator
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Find the original message from messages array
                                  const allMessages = messages;
                                  const originalMessage = allMessages.find(
                                    (msg) =>
                                      msg.user === group.replayTo.user &&
                                      msg.content === group.replayTo.content,
                                  );
                                  if (originalMessage) {
                                    focusToReplayedMessage(originalMessage.id);
                                  }
                                }}
                              >
                                {group.replayTo.user} - "
                                {group.replayTo.content}"
                              </ReplayIndicator>
                            )}
                            <MessageBubble
                              isOwn={true}
                              onContextMenu={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                showContextMenu(group, e);
                              }}
                            >
                              {editingMessage?.id === group.id ? (
                                <EditContainer>
                                  <EditInput
                                    className="edit-input"
                                    type="text"
                                    value={editInput}
                                    onChange={(e) =>
                                      setEditInput(e.target.value)
                                    }
                                    onKeyDown={handleEditMessage}
                                    placeholder="Xabarni tahrirlang..."
                                    maxLength={400}
                                    autoFocus
                                  />
                                </EditContainer>
                              ) : (
                                <>
                                  <MessageText isOwn={true}>
                                    {renderMessageContent(group.content)}
                                  </MessageText>
                                  {group.edited && (
                                    <EditedIndicator>
                                      (tahrirlandi)
                                    </EditedIndicator>
                                  )}
                                </>
                              )}
                            </MessageBubble>
                            <MessageHeader isOwn={true}>
                              <span>{group.timestamp}</span>
                              {!group.isDeleted && (
                                <span
                                  style={{
                                    marginLeft: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {group.readBy && group.readBy.length > 0 ? (
                                    <CheckCheck size={14} color="#4ade80" />
                                  ) : (
                                    <Check size={14} color="#72767d" />
                                  )}
                                </span>
                              )}
                            </MessageHeader>
                          </>
                        )}
                      </MessageWrapper>
                    );
                  })}
                </MessageContainer>
              </InfiniteScroll>
              <div ref={messagesEndRef} />
            </MessagesContainer>

            <MessageInputContainer>
              {previewChat && !currentChat && previewChat.type !== "user" ? (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div style={{ color: "var(--text-muted-color)" }}>
                    Siz ushbu guruh a'zosi emassiz
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await joinGroupChat(
                          previewChat.privateurl || previewChat.jammId,
                        );
                        navigate(
                          `/groups/${previewChat.jammId || previewChat.privateurl}`,
                          {
                            replace: true,
                          },
                        );
                      } catch (err) {
                        toast.error(err.message || "Xatolik yuz berdi");
                      }
                    }}
                    style={{
                      background: "#5865F2",
                      color: "white",
                      border: "none",
                      padding: "10px 24px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "14px",
                    }}
                  >
                    Guruhga qo'shilish
                  </button>
                </div>
              ) : (
                <>
                  {replayMessage && (
                    <ReplayIndicator
                      onClick={() => {
                        focusToReplayedMessage(replayMessage.id);
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <strong style={{ color: "#7289da" }}>
                            {replayMessage.user}
                          </strong>
                          <div
                            style={{
                              fontSize: "12px",
                              opacity: 0.8,
                              marginTop: "2px",
                            }}
                          >
                            {replayMessage.content}
                          </div>
                        </div>
                        <span
                          className="replay-close"
                          onClick={(e) => {
                            e.stopPropagation();
                            setReplayMessage(null);
                          }}
                        >
                          ✕
                        </span>
                      </div>
                    </ReplayIndicator>
                  )}
                  <InputWrapper>
                    <InputButtons>
                      <InputButton>
                        <Plus size={20} />
                      </InputButton>
                      <InputButton
                        onClick={toggleEmojiPicker}
                        className="emoji-button"
                      >
                        <Smile size={20} />
                      </InputButton>
                    </InputButtons>
                    <MessageInput
                      id="message-input"
                      ref={messageInputRef}
                      value={messageInput}
                      onChange={handleInputChange}
                      onKeyDown={handleSendMessage}
                      placeholder="Xabar..."
                      rows={1}
                      maxLength={400}
                    />
                  </InputWrapper>

                  {showEmojiPicker && (
                    <EmojiPicker
                      className="emoji-picker-container"
                      style={{
                        position: "fixed",
                        bottom: "100px",
                        right: "40px",
                        backgroundColor: "#36393f",
                        border: "3px solid #7289da",
                        borderRadius: "12px",
                        padding: "16px",
                        boxShadow: "0 12px 24px rgba(0, 0, 0, 0.6)",
                        zIndex: 9999,
                        display: "grid",
                        gridTemplateColumns: "repeat(8, 1fr)",
                        gap: "6px",
                        maxWidth: "360px",
                        maxHeight: "240px",
                        overflowY: "auto",
                      }}
                    >
                      {emojis.map((emoji, index) => (
                        <EmojiButton
                          key={index}
                          onClick={() => handleEmojiClick(emoji)}
                          style={{
                            background: "none",
                            border: "none",
                            fontSize: "24px",
                            cursor: "pointer",
                            padding: "8px",
                            borderRadius: "6px",
                            minWidth: "32px",
                            minHeight: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {emoji}
                        </EmojiButton>
                      ))}
                    </EmojiPicker>
                  )}
                </>
              )}
            </MessageInputContainer>
          </div>
        </div>

        {/* Context Menu */}
        {contextMenu && (
          <ContextMenu
            style={{
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <ContextMenuItem
              onClick={() =>
                handleContextMenuAction("replay", contextMenu.message)
              }
            >
              <Reply size={16} /> Javob yozish
            </ContextMenuItem>
            {(() => {
              if (!currentUser || !contextMenu.message) return null;

              const currentUserId = currentUser._id || currentUser.id;
              const msgSenderIdStr =
                contextMenu.message.senderId &&
                typeof contextMenu.message.senderId === "object"
                  ? contextMenu.message.senderId._id ||
                    contextMenu.message.senderId.id
                  : contextMenu.message.senderId;

              const isOwnMessage = msgSenderIdStr === currentUserId;

              // Permission check for groups
              let canDeleteOthers = false;
              if (!isOwnMessage && currentChat?.type === "group") {
                const isOwner = currentChat.createdBy === currentUserId;
                const myAdminRecord = currentChat.admins?.find(
                  (a) => (a.userId || a.id || a._id) === currentUserId,
                );
                canDeleteOthers =
                  isOwner ||
                  (myAdminRecord &&
                    myAdminRecord.permissions?.includes(
                      "delete_others_messages",
                    ));
              }

              if (!isOwnMessage && !canDeleteOthers) return null;

              return (
                <>
                  {isOwnMessage && (
                    <ContextMenuItem
                      onClick={() =>
                        handleContextMenuAction("edit", contextMenu.message)
                      }
                    >
                      <Edit2 size={16} /> Tahrirlash
                    </ContextMenuItem>
                  )}
                  <ContextMenuItem
                    onClick={() =>
                      handleContextMenuAction("delete", contextMenu.message)
                    }
                    $danger={true}
                  >
                    <Trash2 size={16} /> O'chirish
                  </ContextMenuItem>
                </>
              );
            })()}
          </ContextMenu>
        )}

        {/* Call Requests */}
        {/* Group Video Call and JoinCallModal are handled in JammLayout */}
      </ChatContainer>

      {showInfo && currentChat && (
        <RightSidebar>
          <SidebarHeader>
            <SidebarCloseButton onClick={() => setShowInfo(false)}>
              <X size={20} />
            </SidebarCloseButton>
            <span style={{ flex: 1, textAlign: "center" }}>
              {currentChat.type === "user"
                ? "Foydalanuvchi haqida"
                : "Guruh ma'lumotlari"}
            </span>
            {currentChat.type === "group" ? (
              (() => {
                const currentUserId = currentUser?._id || currentUser?.id;
                const isOwner = currentChat.createdBy === currentUserId;
                const myAdminRecord = currentChat.admins?.find(
                  (a) => (a.userId || a.id || a._id) === currentUserId,
                );
                const canEditAnything =
                  isOwner ||
                  (myAdminRecord && myAdminRecord.permissions?.length > 0);

                if (!canEditAnything) return <div style={{ width: 28 }} />;

                return (
                  <SidebarCloseButton onClick={() => setIsEditGroupOpen(true)}>
                    <Edit2 size={18} />
                  </SidebarCloseButton>
                );
              })()
            ) : (
              <div style={{ width: 28 }} />
            )}
          </SidebarHeader>
          <SidebarContent>
            <GroupProfile>
              <LargeAvatar
                style={
                  currentChat?.isSavedMessages ? { background: "#0288D1" } : {}
                }
              >
                {currentChat?.isSavedMessages ? (
                  <Bookmark size={40} color="white" fill="white" />
                ) : currentChat?.avatar?.length > 1 ? (
                  <img src={currentChat.avatar} alt={currentChat.name} />
                ) : (
                  currentChat.name.charAt(0)
                )}
              </LargeAvatar>
              <GroupName style={{ fontSize: "22px", margin: "0 0 6px" }}>
                {currentChat.name}
              </GroupName>
              <GroupStatus style={{ fontSize: "14px" }}>
                {currentChat.type === "user" ? (
                  (() => {
                    const otherUser = currentChat.members?.find((m) => {
                      const mId = m._id || m.id;
                      return (
                        mId !== currentUser?.id && mId !== currentUser?._id
                      );
                    });
                    const targetId = otherUser?._id || otherUser?.id;

                    if (!targetId) return null;

                    return (
                      <span
                        style={{
                          color: isUserOnline(targetId)
                            ? "var(--primary-color)"
                            : "var(--text-muted-color)",
                        }}
                      >
                        {isUserOnline(targetId)
                          ? "Online"
                          : otherUser.lastSeen || otherUser.lastActive
                            ? `Oxirgi marta: ${dayjs(
                                otherUser.lastSeen || otherUser.lastActive,
                              ).format("HH:mm")}`
                            : "Offline"}
                      </span>
                    );
                  })()
                ) : (
                  <>
                    {currentChat.members?.length || 0} a'zo
                    {onlineCount > 0 && ` · ${onlineCount} online`}
                  </>
                )}
              </GroupStatus>
            </GroupProfile>

            {currentChat.type === "user" && !currentChat?.isSavedMessages && (
              <GroupInfoCard>
                {(() => {
                  const otherUser = currentChat.members?.find((m) => {
                    const mId = m._id || m.id;
                    return (
                      String(mId) !==
                      String(currentUser?.id || currentUser?._id)
                    );
                  });
                  if (!otherUser) return null;

                  return (
                    <>
                      <InfoItem>
                        <InfoLabel>foydalanuvchi nomi</InfoLabel>
                        <InfoLink
                          style={{ color: "#0088cc", fontWeight: "500" }}
                          onClick={() => {
                            if (otherUser.username) {
                              navigator.clipboard.writeText(
                                `@${otherUser.username}`,
                              );
                              toast.success("Nusxa olindi!");
                            }
                          }}
                        >
                          <span>@{otherUser.username || "user"}</span>
                          <Link2 size={20} style={{ color: "#0088cc" }} />
                        </InfoLink>
                      </InfoItem>

                      {otherUser.bio && (
                        <>
                          <div
                            style={{
                              height: "1px",
                              backgroundColor: "var(--border-color)",
                              margin: "0 -16px",
                            }}
                          />
                          <InfoItem>
                            <InfoLabel>tarjimayi hol</InfoLabel>
                            <InfoValue>
                              <MentionsText text={otherUser.bio} />
                            </InfoValue>
                          </InfoItem>
                        </>
                      )}

                      {otherUser.jammId && (
                        <>
                          <div
                            style={{
                              height: "1px",
                              backgroundColor: "var(--border-color)",
                              margin: "0 -16px",
                            }}
                          />
                          <InfoItem>
                            <InfoLabel>jamm id</InfoLabel>
                            <InfoValue>#{otherUser.jammId}</InfoValue>
                          </InfoItem>
                        </>
                      )}
                    </>
                  );
                })()}
              </GroupInfoCard>
            )}

            {currentChat.type === "group" && (
              <GroupInfoCard>
                {(displayChat?.privateurl || displayChat?.urlSlug) && (
                  <InfoItem>
                    <InfoLabel>havolani ulashish</InfoLabel>
                    <InfoLink
                      onClick={() =>
                        handleCopyLink(
                          displayChat.privateurl || displayChat.urlSlug,
                        )
                      }
                    >
                      <span>
                        {window.location.origin}/
                        {displayChat.privateurl || displayChat.urlSlug}
                      </span>
                      <Link2
                        size={20}
                        style={{ color: "var(--text-muted-color)" }}
                      />
                    </InfoLink>
                  </InfoItem>
                )}

                {currentChat.description && (
                  <>
                    <div
                      style={{
                        height: "1px",
                        backgroundColor: "var(--border-color)",
                        margin: "0 -16px",
                      }}
                    />
                    <InfoItem>
                      <InfoLabel>tasnif</InfoLabel>
                      <InfoValue>
                        <MentionsText
                          text={
                            !isDescExpanded &&
                            currentChat.description.length > 100
                              ? currentChat.description.substring(0, 100) +
                                "..."
                              : currentChat.description
                          }
                        />
                        {currentChat.description.length > 100 && (
                          <ShowMoreBtn
                            onClick={() => setIsDescExpanded(!isDescExpanded)}
                          >
                            {isDescExpanded ? "yopish" : "yana"}
                          </ShowMoreBtn>
                        )}
                      </InfoValue>
                    </InfoItem>
                  </>
                )}
              </GroupInfoCard>
            )}

            {displayChat?.type === "group" && (
              <InfoSection>
                <SectionTitle>A'zolar</SectionTitle>
                <MembersList>
                  {displayChat?.members &&
                    displayChat.members.map((memberData) => {
                      const member =
                        typeof memberData === "object" ? memberData : null;
                      if (!member) return null;

                      const id = member._id || member.id;
                      const name =
                        member.name ||
                        member.nickname ||
                        member.username ||
                        "Foydalanuvchi";

                      return (
                        <MemberItem
                          key={id}
                          onClick={() => handleMemberClick(member)}
                        >
                          <MemberAvatar>
                            {member.avatar?.length > 1 ? (
                              <img
                                src={member.avatar}
                                alt={name}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              name.charAt(0)
                            )}
                          </MemberAvatar>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              {name}
                              {member.premiumStatus === "active" && (
                                <PremiumBadgeIcon width={12} height={12} />
                              )}
                            </span>
                            <span
                              style={{
                                fontSize: "12px",
                                color: isUserOnline(id)
                                  ? "var(--primary-color)"
                                  : "var(--text-muted-color)",
                              }}
                            >
                              {isUserOnline(id)
                                ? "Online"
                                : member.lastSeen || member.lastActive
                                  ? `Oxirgi marta: ${dayjs(
                                      member.lastSeen || member.lastActive,
                                    ).format("HH:mm")}`
                                  : "Offline"}
                            </span>
                          </div>
                          {(() => {
                            const isAdmin = currentChat.admins?.some(
                              (a) => (a.userId || a.id || a._id) === id,
                            );
                            const isOwner = currentChat.createdBy === id;
                            if (isOwner) return <AdminBadge>Ega</AdminBadge>;
                            if (isAdmin) return <AdminBadge>Admin</AdminBadge>;
                            return null;
                          })()}
                        </MemberItem>
                      );
                    })}

                  {(!displayChat?.members ||
                    displayChat.members.length === 0) && (
                    <div
                      style={{ fontSize: 13, color: "var(--text-muted-color)" }}
                    >
                      A'zolar ro'yxati mavjud emas
                    </div>
                  )}
                </MembersList>
              </InfoSection>
            )}
          </SidebarContent>
        </RightSidebar>
      )}

      {/* Outgoing Call Overlay */}
      <OutgoingCallRequest />

      {/* Edit Group Dialog */}
      <EditGroupDialog
        isOpen={isEditGroupOpen}
        onClose={() => setIsEditGroupOpen(false)}
        group={currentChat}
        users={chats
          .filter((c) => c.type === "user" && !c.isSavedMessages)
          .map((c) => {
            const other = c.members?.find(
              (m) => (m._id || m.id) !== (currentUser?._id || currentUser?.id),
            );
            return {
              ...other,
              id: other?._id || other?.id,
              name: other?.nickname || other?.username || "Noma'lum",
            };
          })
          .filter((u) => u.id)}
        onSave={async (updatedData) => {
          console.log(updatedData);

          try {
            await editChat(currentChat.id || currentChat._id, updatedData);
          } catch (error) {
            console.error("Guruhni tahrirlashda xatolik", error);
          }
        }}
      />

      {showDeleteConfirm && (
        <ConfirmDialogOverlay onClick={() => setShowDeleteConfirm(false)}>
          <ConfirmDialog onClick={(e) => e.stopPropagation()}>
            <ConfirmTitle>
              {currentChat?.isGroup &&
              currentChat?.createdBy !== currentUser?._id
                ? "Guruhni tark etish"
                : "Suhbatni o'chirish"}
            </ConfirmTitle>
            <ConfirmText>
              {currentChat?.isGroup &&
              currentChat?.createdBy !== currentUser?._id
                ? "Siz haqiqatan ham ushbu guruhni tark etmoqchimisiz?"
                : "Siz haqiqatan ham ushbu suhbatni o'chirib tashlamoqchimisiz? Bu amal barcha xabarlarni ikkala tomon uchun ham o'chirib yuboradi."}
            </ConfirmText>
            <ConfirmActions>
              <ConfirmButton onClick={() => setShowDeleteConfirm(false)}>
                Bekor qilish
              </ConfirmButton>
              <ConfirmButton danger onClick={handleDeleteChat}>
                {currentChat?.isGroup &&
                currentChat?.createdBy !== currentUser?._id
                  ? "Chiqish"
                  : "O'chirish"}
              </ConfirmButton>
            </ConfirmActions>
          </ConfirmDialog>
        </ConfirmDialogOverlay>
      )}
    </OuterChatWrapper>
  );
};

export default ChatArea;
