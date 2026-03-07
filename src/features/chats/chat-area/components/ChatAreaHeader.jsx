import React from "react";
import styled from "styled-components";
import {
  ArrowLeft,
  Bookmark,
  Edit2,
  Info,
  LogOut,
  MoreVertical,
  Phone,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import PremiumBadgeIcon from "../../../../shared/ui/badges/PremiumBadge";
import useChatAreaUiStore from "../store/useChatAreaUiStore";

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  border-bottom: 1px solid var(--border-color);
  background-color: var(--secondary-color);
  min-height: 56px;

  @media (max-width: 768px) {
    padding: 12px 16px;
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
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
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

const ChatAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) =>
    props.$isSavedMessages
      ? "var(--primary-color)"
      : "var(--primary-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-right: 12px;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

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
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;

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
  background-color: ${(props) =>
    props.$online
      ? "var(--success-color, var(--primary-color))"
      : "var(--text-secondary-color)"};
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderMenuAnchor = styled.div`
  position: relative;
`;

const GroupStatusIcon = styled(Users)`
  margin-right: 4px;
`;

const HeaderDropdown = styled.div`
  position: absolute;
  top: 55px;
  right: 16px;
  background-color: var(--secondary-color);
  backdrop-filter: blur(5px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 8px;
  min-width: 200px;
  z-index: 1000;
  box-shadow:
    0 24px 48px var(--shadow-color-strong, rgba(0, 0, 0, 0.4)),
    0 0 0 1px var(--border-color) inset;
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 10px 14px;
  color: ${(props) =>
    props.$danger ? "var(--danger-color, var(--primary-color))" : "var(--text-color)"};
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  transition: all 0.15s ease;
  margin-bottom: 2px;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background-color: ${(props) =>
      props.$danger
        ? "var(--danger-color, var(--primary-color))"
        : "var(--primary-color)"};
    color: white;
    transform: translateX(4px);
  }
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

const Divider = styled.div`
  height: 1px;
  background: var(--border-color);
  margin: 4px 8px;
`;

const canOpenInfo = (selectedNav) =>
  ["groups", "users", "a", "chats"].includes(selectedNav);

const ChatAreaHeader = ({
  onBack,
  selectedNav,
  currentChat,
  displayChat,
  currentChatName,
  currentUser,
  typingText,
  onlineCount,
  isOnline,
  lastSeenText,
  onStartPrivateVideoCall,
  headerMenuRef,
}) => {
  const isHeaderMenuOpen = useChatAreaUiStore((state) => state.isHeaderMenuOpen);
  const toggleInfoSidebar = useChatAreaUiStore(
    (state) => state.toggleInfoSidebar,
  );
  const openInfoSidebar = useChatAreaUiStore((state) => state.openInfoSidebar);
  const openEditGroupDialog = useChatAreaUiStore(
    (state) => state.openEditGroupDialog,
  );
  const toggleHeaderMenu = useChatAreaUiStore((state) => state.toggleHeaderMenu);
  const openDeleteDialog = useChatAreaUiStore((state) => state.openDeleteDialog);

  const activeChat = currentChat || displayChat;
  const currentUserId = currentUser?._id || currentUser?.id;
  const isOfficial = ["jamm", "premium"].includes(displayChat?.username);
  const isGroupOwnerLeaving =
    activeChat?.isGroup && activeChat?.createdBy !== currentUserId;

  const myAdminRecord = currentChat?.admins?.find(
    (admin) => (admin.userId || admin.id || admin._id) === currentUserId,
  );
  const canEditGroup =
    currentChat?.type === "group" &&
    (currentChat?.createdBy === currentUserId ||
      (myAdminRecord && myAdminRecord.permissions?.length > 0));

  return (
    <ChatHeader>
      <HeaderLeft
        $clickable={canOpenInfo(selectedNav)}
        onClick={() => {
          if (canOpenInfo(selectedNav)) {
            toggleInfoSidebar();
          }
        }}
      >
        <HeaderButton
          onClick={(event) => {
            event.stopPropagation();
            onBack();
          }}
        >
          <ArrowLeft size={20} />
        </HeaderButton>

        <ChatAvatar $isSavedMessages={activeChat?.isSavedMessages}>
          {activeChat?.isSavedMessages ? (
            <Bookmark size={20} color="white" fill="white" />
          ) : activeChat?.avatar?.length > 1 ? (
            <img src={activeChat.avatar} alt={currentChatName} />
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
            {typingText ? (
              <HeaderTypingIndicator>
                <div className="dots">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                {typingText}
              </HeaderTypingIndicator>
            ) : displayChat?.type === "group" ? (
              <>
                <GroupStatusIcon size={14} />
                {displayChat?.members?.length || 0} a'zo
                {onlineCount > 0 && `, ${onlineCount} online`}
              </>
            ) : displayChat?.isSavedMessages ? (
              <>o'zim</>
            ) : isOfficial ? (
              <>Rasmiy</>
            ) : (
              <>
                <StatusDot $online={isOnline} />
                {lastSeenText}
              </>
            )}
          </ChatStatus>
        </ChatInfo>
      </HeaderLeft>

      <HeaderRight>
        {displayChat?.type === "user" &&
          !displayChat?.isSavedMessages &&
          !isOfficial && (
            <HeaderButton
              onClick={() => {
                if (isOnline) {
                  onStartPrivateVideoCall();
                } else {
                  toast.error(
                    "Foydalanuvchi offline. Hozirda qo'ng'iroq qilib bo'lmaydi.",
                  );
                }
              }}
              disabled={!isOnline}
              title={!isOnline ? "Foydalanuvchi offline" : "Video qo'ng'iroq"}
            >
              <Phone size={20} />
            </HeaderButton>
          )}

        <HeaderMenuAnchor ref={headerMenuRef}>
          {!isOfficial && (
            <HeaderButton onClick={toggleHeaderMenu}>
              <MoreVertical size={20} />
            </HeaderButton>
          )}

          {isHeaderMenuOpen && (
            <HeaderDropdown>
              <DropdownItem
                onClick={() => {
                  openInfoSidebar();
                }}
              >
                <Info size={18} />
                {displayChat?.type === "group"
                  ? "Guruh ma'lumotlari"
                  : "Foydalanuvchi ma'lumotlari"}
              </DropdownItem>

              {canEditGroup && (
                <DropdownItem onClick={openEditGroupDialog}>
                  <Edit2 size={18} />
                  Guruhni tahrirlash
                </DropdownItem>
              )}

              <Divider />

              <DropdownItem $danger onClick={openDeleteDialog}>
                {isGroupOwnerLeaving ? <LogOut size={18} /> : <Trash2 size={18} />}
                {isGroupOwnerLeaving ? "Guruhni tark etish" : "Suhbatni o'chirish"}
              </DropdownItem>
            </HeaderDropdown>
          )}
        </HeaderMenuAnchor>
      </HeaderRight>
    </ChatHeader>
  );
};

export default ChatAreaHeader;
