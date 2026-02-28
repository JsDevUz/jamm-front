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
  Edit2,
  Trash2,
  Check,
  CheckCheck,
  Bookmark,
} from "lucide-react";
import PrivateVideoCall from "./PrivateVideoCall";
import IncomingCallRequest from "./IncomingCallRequest";
import OutgoingCallRequest from "./OutgoingCallRequest";
import EditGroupDialog from "./EditGroupDialog";
import { usePresence } from "../contexts/PresenceContext";
import { useChats } from "../contexts/ChatsContext";

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

const BackButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-right: 12px;

  &:hover {
    background-color: #4a4d52;
    color: #dcddde;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    display: flex;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChannelIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${(props) =>
    props.isGroup
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "#7289da"};
  color: white;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
`;

const ChannelName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);

  /* Mobile responsive */
  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
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
  padding: 8px 16px;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  align-items: ${(props) => (props.isOwn ? "flex-end" : "flex-start")};
  cursor: pointer;
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

const channelMessages = {
  // Channel messages
  0: [
    // general
    {
      id: 1,
      user: "Alice",
      content: "Hey everyone! How's it going?",
      timestamp: "2:30 PM",
    },
    {
      id: 2,
      user: "Bob",
      content: "Pretty good! Just working on some code.",
      timestamp: "2:32 PM",
    },
    {
      id: 3,
      user: "Charlie",
      content: "Same here, building a Jamm!",
      timestamp: "2:35 PM",
    },
    {
      id: 4,
      user: "Alice",
      content: "That's awesome! What tech stack are you using?",
      timestamp: "2:36 PM",
    },
    {
      id: 5,
      user: "Bob",
      content: "React with styled-components and Vite",
      timestamp: "2:38 PM",
    },
  ],

  // User chats (Alice Johnson)
  200: [
    // Alice Johnson
    {
      id: 1,
      user: "Alice Johnson",
      content: "Yaxshimisiz, qalaysiz?",
      timestamp: "10:28 AM",
    },
    {
      id: 2,
      user: "You",
      content: "Yaxshi, rahmat! Siz qalaysiz?",
      timestamp: "10:29 AM",
    },
    {
      id: 3,
      user: "Alice Johnson",
      content: "Men ham yaxshi. Bugun nima qilyapsiz?",
      timestamp: "10:30 AM",
    },
    {
      id: 4,
      user: "You",
      content: "Ishlayapman, Jamm project ustida ishlayapman",
      timestamp: "10:31 AM",
    },
    {
      id: 5,
      user: "Alice Johnson",
      content: "Qiziqarli! Qanday progress?",
      timestamp: "10:32 AM",
    },
  ],

  // User chats (Bob Smith)
  201: [
    // Bob Smith
    {
      id: 1,
      user: "Bob Smith",
      content: "Bugun uchrashamizmi?",
      timestamp: "Dushanba",
    },
    { id: 2, user: "You", content: "Ha, qachon kerak?", timestamp: "Dushanba" },
    {
      id: 3,
      user: "Bob Smith",
      content: "5:00 da bo'ladi",
      timestamp: "Dushanba",
    },
  ],

  // User chats (Charlie Wilson)
  202: [
    // Charlie Wilson
    {
      id: 1,
      user: "Charlie Wilson",
      content: "Rahmat, yaxshi kun!",
      timestamp: "Kecha",
    },
    { id: 2, user: "You", content: "Siz ham rahmat!", timestamp: "Kecha" },
  ],

  // User chats (Diana Brown)
  203: [
    // Diana Brown
    {
      id: 1,
      user: "Diana Brown",
      content: "Qiziqarli, shu yerda",
      timestamp: "Kecha",
    },
    { id: 2, user: "You", content: "Ha, ajoyib joy!", timestamp: "Kecha" },
  ],

  // Group messages
  100: [
    // Oila Guruhlari
    { id: 1, user: "Ona", content: "Noncha yaxshi!", timestamp: "10:28 AM" },
    {
      id: 2,
      user: "Ota",
      content: "Bugun kechqurun kelinglar",
      timestamp: "10:29 AM",
    },
    {
      id: 3,
      user: "Akasi",
      content: "Yaxshi, men ham kelaman",
      timestamp: "10:30 AM",
    },
    { id: 4, user: "Opasi", content: "Noncha yaxshi!", timestamp: "10:31 AM" },
  ],
  101: [
    // Do'stlar
    { id: 1, user: "Ali", content: "Kelasizmi?", timestamp: "Dushanba" },
    { id: 2, user: "Vali", content: "Qachon?", timestamp: "Dushanba" },
    { id: 3, user: "Sami", content: "Men ham boraman", timestamp: "Dushanba" },
  ],
  102: [
    // Ish Guruhlari
    {
      id: 1,
      user: "Manager",
      content: "Meeting 3:00 da",
      timestamp: "09:15 AM",
    },
    {
      id: 2,
      user: "Colleague1",
      content: "Qanday mavzu?",
      timestamp: "09:16 AM",
    },
    {
      id: 3,
      user: "Manager",
      content: "Yangi loyiha haqida",
      timestamp: "09:17 AM",
    },
    {
      id: 4,
      user: "Colleague2",
      content: "Yaxshi, tayyor bo'laman",
      timestamp: "09:18 AM",
    },
  ],
  103: [
    // O'quvchilar
    {
      id: 1,
      user: "Teacher",
      content: "Uyga vazifa berildi",
      timestamp: "Kecha",
    },
    {
      id: 2,
      user: "Student1",
      content: "Qaysi fanlardan?",
      timestamp: "Kecha",
    },
    {
      id: 3,
      user: "Teacher",
      content: "Matematika va fizikadan",
      timestamp: "Kecha",
    },
  ],
};

const channelNames = {
  // Channel names
  0: "general",

  // User names
  200: "Alice Johnson",
  201: "Bob Smith",
  202: "Charlie Wilson",
  203: "Diana Brown",

  // Group names
  100: "Oila Guruhlari",
  101: "Do'stlar",
  102: "Ish Guruhlari",
  103: "O'quvchilar",
};

const RightSidebar = styled.div`
  width: 300px;
  background-color: var(--secondary-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 300px;
    z-index: 10;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    width: 100%;
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
  padding: 4px;

  &:hover {
    color: var(--text-color);
  }
`;

const SidebarContent = styled.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`;

const GroupProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LargeAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 16px;
  overflow: hidden;

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
`;

const SectionTitle = styled.h4`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-muted-color);
  margin-bottom: 8px;
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
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5b6eae;
  }
`;

const MembersList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 0 -8px;
  gap: 12px;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--hover-color, rgba(255, 255, 255, 0.05));
  }
`;

const MemberAvatar = styled.div`
  width: 32px;
  height: 32px;
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
  const [showInfo, setShowInfo] = useState(false);
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
    chatSocket,
    markMessagesAsRead,
    typingUsers,
    sendTypingStatus,
  } = useChats();
  const { isUserOnline, getOnlineCount } = usePresence();
  const currentChat = chats.find(
    (c) => c.urlSlug === selectedChannel || c.id === selectedChannel,
  );
  const [messageInput, setMessageInput] = useState("");
  const typingTimeoutRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isEditGroupOpen, setIsEditGroupOpen] = useState(false);

  const handleMemberClick = async (targetUser) => {
    const currentUserStr = localStorage.getItem("user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : {};
    const currentUserId = currentUser._id || currentUser.id;
    const targetId = targetUser._id || targetUser.id;

    if (targetId === currentUserId) return; // Prevent clicking self to start private chat

    const existingChat = chats.find((c) => {
      if (c.isGroup || !c.members || c.isSavedMessages) return false;
      return c.members.some((m) => (m._id || m.id) === targetId);
    });

    if (existingChat) {
      navigate(`/a/${existingChat.urlSlug}`);
      setShowInfo(false);
    } else {
      try {
        const chatId = await createChat({
          isGroup: false,
          memberIds: [targetId],
        });
        if (chatId) {
          navigate(`/a/${chatId}`);
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
  const [previewChat, setPreviewChat] = useState(null);

  const displayChat = currentChat || previewChat;

  const [contextMenu, setContextMenu] = useState(null);
  const messageRefs = useRef({});
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null); // Ref for message elements
  const messageInputRef = useRef(null); // Ref for message input

  // Get current user to identify own messages
  const currentUser = React.useMemo(() => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }, []);

  // Presence check helpers
  const otherMember =
    displayChat?.type !== "group" && displayChat?.members
      ? displayChat.members.find(
          (m) => m._id !== (currentUser?._id || currentUser?.id),
        )
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

  // Fetch group preview if channel exists but user is not in it
  useEffect(() => {
    if (
      (selectedNav === "groups" || selectedNav === "a") &&
      selectedChannel &&
      !currentChat
    ) {
      previewGroupChat(selectedChannel)
        .then((chat) => setPreviewChat(chat))
        .catch((err) => {
          console.error("Preview failed:", err);
          setPreviewChat(null);
        });
    } else {
      setPreviewChat(null);
    }
  }, [selectedNav, selectedChannel, currentChat, previewGroupChat]);

  // Output fetching messages on channel select
  useEffect(() => {
    if (!currentChat) return;

    const loadMessages = async () => {
      const msgs = await fetchMessages(currentChat.id);
      setMessages(msgs);

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
        timestamp: new Date(rawMsg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date(rawMsg.createdAt).toDateString(),
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
  const [isPrivateVideoCallOpen, setIsPrivateVideoCallOpen] = useState(false);
  const [privateVideoCallUser, setPrivateVideoCallUser] = useState("");
  const [incomingCall, setIncomingCall] = useState(null);
  const [outgoingCall, setOutgoingCall] = useState(null);
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

  const currentChannelName = displayChat?.name || "Chat";

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
      return "yozmoqda...";
    } else {
      const names = othersTyping.map((id) => {
        const member = currentChat.members?.find(
          (m) => String(m._id || m.id) === String(id),
        );
        return member?.nickname || member?.username || "Kimdir";
      });
      if (names.length === 1) return `${names[0]} yozmoqda...`;
      if (names.length === 2)
        return `${names[0]} va ${names[1]} yozmoqdalar...`;
      return "Bir necha kishi yozmoqda...";
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

      if (user && navigate) {
        // Stop if user is clicking on themselves
        if (currentUser && user.id === currentUser.id) {
          alert("Siz o'zingiz bilan suhbat qura olmaysiz");
          return;
        }

        // Find existing chat with this user
        const existingChat = chats.find(
          (c) =>
            !c.isGroup && c.members && c.members.some((m) => m._id === user.id),
        );

        if (existingChat) {
          navigate(`/a/${existingChat.urlSlug}`);
        } else {
          // Create new private chat
          const chatId = await createChat({
            isGroup: false,
            memberIds: [user.id],
          });
          if (chatId) {
            navigate(`/a/${chatId}`);
          }
        }
      } else {
        alert("Bunday foydalanuvchi topilmadi");
      }
    } catch (error) {
      console.error("Error handling mention click:", error);
      alert("Foydalanuvchini qidirishda xatolik yuz berdi");
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
              backgroundColor: "var(--hover-color)",
              padding: "2px 4px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--active-color)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--hover-color)";
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

  const startPrivateVideoCall = (user) => {
    setOutgoingCall({ name: user });
    // Simulate call connection after 3 seconds
    setTimeout(() => {
      setOutgoingCall(null);
      setPrivateVideoCallUser(user);
      setIsPrivateVideoCallOpen(true);
    }, 3000);
  };

  const handleIncomingCall = () => {
    // Simulate incoming call after 5 seconds
    setTimeout(() => {
      setIncomingCall({ name: "Alice" });
    }, 5000);
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
            messageDate = timestamp.toDateString();
          } else {
            messageDate = new Date().toDateString();
          }
        } else {
          messageDate = new Date().toDateString();
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
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year:
          date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
      });
    }
  };

  const handleSendMessage = async (e) => {
    if (e.key === "Enter" && messageInput.trim()) {
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
        const sentMessage = await sendMessage(
          currentChat.id,
          content,
          replayId,
        );

        // Fetch fresh messages to ensure we have the correct DB IDs and populated fields
        const msgs = await fetchMessages(currentChat.id);
        setMessages(msgs);
        setTimeout(() => scrollToBottom("smooth"), 100);

        console.log("Message sent to backend:", sentMessage);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <OuterChatWrapper>
      <ChatContainer>
        <ChatHeader>
          <HeaderLeft
            onClick={() =>
              (selectedNav === "groups" ||
                selectedNav === "users" ||
                selectedNav === "a") &&
              setShowInfo((prev) => !prev)
            }
            style={{
              cursor:
                selectedNav === "groups" ||
                selectedNav === "users" ||
                selectedNav === "a"
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
                  alt={currentChannelName}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                currentChannelName.charAt(0).toUpperCase()
              )}
            </ChatAvatar>
            <ChatInfo>
              <ChatName>
                {selectedNav === "channels" ? (
                  <>{currentChannelName}</>
                ) : (
                  <>{currentChannelName}</>
                )}
              </ChatName>
              <ChatStatus>
                {displayChat?.type === "group" ? (
                  <>
                    <Users size={14} style={{ marginRight: 4 }} />
                    {displayChat?.members?.length || 0} members
                    {onlineCount > 0 && `, ${onlineCount} online`}
                  </>
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
            {selectedNav == "users" && (
              <>
                <HeaderButton
                  onClick={() => startPrivateVideoCall(currentChat?.name)}
                >
                  <Phone size={20} />
                </HeaderButton>
                <HeaderButton>
                  <MoreVertical size={20} />
                </HeaderButton>
              </>
            )}
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
            <MessagesContainer onContextMenu={(e) => e.preventDefault()}>
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
                          <MessageHeader isOwn={false}>
                            {selectedNav === "groups" && (
                              <UserAvatar
                                onClick={(e) =>
                                  handleUsernameClick(group.user, e)
                                }
                              >
                                {getUserAvatar(group.user)}
                              </UserAvatar>
                            )}
                            <div style={{ flex: 1 }}>
                              <ClickableUsername>
                                {group.user}
                              </ClickableUsername>
                            </div>
                          </MessageHeader>
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
                              {group.replayTo.user} - "{group.replayTo.content}"
                            </ReplayIndicator>
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
                                  onChange={(e) => setEditInput(e.target.value)}
                                  onKeyDown={handleEditMessage}
                                  placeholder="Xabarni tahrirlang..."
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
                              {group.replayTo.user} - "{group.replayTo.content}"
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
                                  onChange={(e) => setEditInput(e.target.value)}
                                  onKeyDown={handleEditMessage}
                                  placeholder="Xabarni tahrirlang..."
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
              <div ref={messagesEndRef} />
            </MessagesContainer>

            <MessageInputContainer>
              {previewChat && !currentChat ? (
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
                          `/a/${previewChat.jammId || previewChat.privateurl}`,
                          {
                            replace: true,
                          },
                        );
                      } catch (err) {
                        alert(
                          err.message ||
                            "Guruhga qo'shilishda xatolik yuz berdi",
                        );
                      }
                    }}
                    style={{
                      background: "#5865F2",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: "bold",
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
                  {getTypingText() && (
                    <TypingIndicator>{getTypingText()}</TypingIndicator>
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
                      placeholder="Message..."
                      rows={1}
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
        <IncomingCallRequest
          isOpen={!!incomingCall}
          onAccept={handleAcceptCall}
          onReject={handleRejectCall}
          caller={incomingCall}
        />

        <OutgoingCallRequest
          isOpen={!!outgoingCall}
          onCancel={handleCancelCall}
          target={outgoingCall}
        />

        {/* Private Video Call */}
        <PrivateVideoCall
          isOpen={isPrivateVideoCallOpen}
          onClose={endPrivateVideoCall}
          user={privateVideoCallUser}
        />
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
                ? "Foydalanuvchi ma'lumotlari"
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
              <GroupName>{currentChat.name}</GroupName>
              <GroupStatus>
                {currentChat.type === "user" ? (
                  (() => {
                    const currentUserStr = localStorage.getItem("user");
                    const userObj = currentUserStr
                      ? JSON.parse(currentUserStr)
                      : null;
                    const otherUser = currentChat.members?.find((m) => {
                      const mId = m._id || m.id;
                      return mId !== userObj?.id;
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
                            ? `Oxirgi marta: ${new Date(
                                otherUser.lastSeen || otherUser.lastActive,
                              ).toLocaleTimeString("uz-UZ", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}`
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

            {currentChat.description && (
              <InfoSection>
                <SectionTitle>Haqida</SectionTitle>
                <InfoText>{currentChat.description}</InfoText>
              </InfoSection>
            )}

            {displayChat?.type === "group" && (
              <InfoSection>
                <SectionTitle>Taklif havolasi</SectionTitle>
                <InfoText
                  style={{ fontSize: "12px", color: "var(--text-muted-color)" }}
                >
                  {window.location.origin}/
                  {displayChat.privateurl || displayChat.urlSlug}
                </InfoText>
                <CopyButton
                  onClick={() =>
                    handleCopyLink(
                      displayChat.privateurl || displayChat.urlSlug,
                    )
                  }
                >
                  {isCopied ? "Nusxa olindi!" : "Nusxa olish"}
                </CopyButton>
              </InfoSection>
            )}

            {displayChat?.type === "group" && (
              <InfoSection>
                <SectionTitle>
                  A'zolar —{" "}
                  {displayChat?.memberCount ||
                    displayChat?.members?.length ||
                    0}
                </SectionTitle>
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
                              style={{ fontSize: "14px", fontWeight: "500" }}
                            >
                              {name}
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
                                  ? `Oxirgi marta: ${new Date(
                                      member.lastSeen || member.lastActive,
                                    ).toLocaleTimeString("uz-UZ", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}`
                                  : "Offline"}
                            </span>
                          </div>
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
        users={chats.filter((c) => c.type === "user")}
        onSave={async (updatedData) => {
          try {
            await editChat(currentChat.id || currentChat._id, updatedData);
          } catch (error) {
            console.error("Guruhni tahrirlashda xatolik", error);
          }
        }}
      />
    </OuterChatWrapper>
  );
};

export default ChatArea;
