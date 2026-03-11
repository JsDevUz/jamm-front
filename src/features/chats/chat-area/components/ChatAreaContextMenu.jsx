import React from "react";
import styled from "styled-components";
import { Edit2, Reply, Trash2 } from "lucide-react";
import { useChatAreaContext } from "../context/ChatAreaContext";

const ContextMenu = styled.div`
  position: fixed;
  left: ${(props) => `${props.$x}px`};
  top: ${(props) => `${props.$y}px`};
    background:var(--secondary-color-with-opacity);
  backdrop-filter: blur(5px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  border: 1px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  border-radius: 14px;
  padding: 8px;
  min-width: 180px;
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
`;

const ContextMenuItem = styled.button`
  width: 100%;
  padding: 10px 14px;
  color: ${(props) =>
    props.$danger ? "var(--danger-color, var(--primary-color))" : "var(--text-color)"};
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 6px;
  border: none;
  background: transparent;
  transition: all 0.15s ease;
  margin-bottom: 2px;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${(props) =>
      props.$danger
        ? "color-mix(in srgb, var(--danger-color, var(--primary-color)) 18%, transparent)"
        : "color-mix(in srgb, var(--text-color) 8%, transparent)"};
    color: ${(props) =>
      props.$danger ? "var(--danger-color, var(--primary-color))" : "var(--text-color)"};
  }
`;

const ChatAreaContextMenu = () => {
  const {
    contextMenu,
    currentChat,
    currentUser,
    handleContextMenuAction,
  } = useChatAreaContext();

  if (!contextMenu) return null;

  const currentUserId = currentUser?._id || currentUser?.id;
  const senderId =
    contextMenu.message.senderId &&
    typeof contextMenu.message.senderId === "object"
      ? contextMenu.message.senderId._id || contextMenu.message.senderId.id
      : contextMenu.message.senderId;
  const isOwnMessage = senderId === currentUserId;

  let canDeleteOthers = false;
  if (!isOwnMessage && currentChat?.type === "group") {
    const isOwner = currentChat.createdBy === currentUserId;
    const myAdminRecord = currentChat.admins?.find(
      (admin) => (admin.userId || admin.id || admin._id) === currentUserId,
    );
    canDeleteOthers =
      isOwner ||
      (myAdminRecord &&
        myAdminRecord.permissions?.includes("delete_others_messages"));
  }

  return (
    <ContextMenu
      $x={contextMenu.x}
      $y={contextMenu.y}
      onClick={(event) => event.stopPropagation()}
      onContextMenu={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <ContextMenuItem
        onClick={() => handleContextMenuAction("reply", contextMenu.message)}
      >
        <Reply size={16} /> Javob yozish
      </ContextMenuItem>

      {(isOwnMessage || canDeleteOthers) && (
        <>
          {isOwnMessage && (
            <ContextMenuItem
              onClick={() => handleContextMenuAction("edit", contextMenu.message)}
            >
              <Edit2 size={16} /> Tahrirlash
            </ContextMenuItem>
          )}
          <ContextMenuItem
            $danger
            onClick={() =>
              handleContextMenuAction("delete", contextMenu.message)
            }
          >
            <Trash2 size={16} /> O'chirish
          </ContextMenuItem>
        </>
      )}
    </ContextMenu>
  );
};

export default ChatAreaContextMenu;
