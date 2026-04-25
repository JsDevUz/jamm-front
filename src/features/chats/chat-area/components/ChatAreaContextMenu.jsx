import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Edit2, Reply, Trash2 } from "lucide-react";
import { useChatAreaContext } from "../context/ChatAreaContext";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.92) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: transparent;
  animation: ${fadeIn} 0.14s ease-out;

  @media (max-width: 768px) {
    background: rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }
`;

const ContextMenu = styled.div`
  position: fixed;
  left: ${(props) => `${props.$x}px`};
  top: ${(props) => `${props.$y}px`};
  background: var(--secondary-color-with-opacity, var(--secondary-color));
  backdrop-filter: blur(18px) saturate(170%);
  -webkit-backdrop-filter: blur(18px) saturate(170%);
  border: 1px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  border-radius: 14px;
  padding: 6px;
  min-width: 200px;
  box-shadow:
    0 20px 48px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  transform-origin: top left;
  animation: ${popIn} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, opacity;

  @media (max-width: 768px) {
    /* Convert into a bottom action-sheet on mobile — matches iMessage/Telegram
       feel: a large finger-friendly list slides up from the bottom. */
    left: 0 !important;
    top: auto !important;
    right: 0;
    bottom: 0;
    min-width: 0;
    width: 100%;
    max-width: none;
    padding: 8px 8px calc(12px + env(safe-area-inset-bottom, 0px));
    border-radius: 18px 18px 0 0;
    border-bottom: none;
    animation: ${slideUp} 0.22s cubic-bezier(0.22, 1, 0.36, 1);
    transform-origin: bottom center;
    max-height: 70vh;
    background: color-mix(in srgb, var(--secondary-color) 96%, transparent);
  }
`;

const SheetHandle = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 36px;
    height: 4px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--text-muted-color) 42%, transparent);
    margin: 4px auto 10px;
  }
`;

const ContextMenuItem = styled.button`
  width: 100%;
  padding: 10px 14px;
  color: ${(props) =>
    props.$danger ? "var(--danger-color, var(--primary-color))" : "var(--text-color)"};
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  border: none;
  background: transparent;
  transition: background-color 0.14s ease, color 0.14s ease;
  margin-bottom: 2px;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover,
  &:focus-visible {
    background: ${(props) =>
      props.$danger
        ? "color-mix(in srgb, var(--danger-color, var(--primary-color)) 18%, transparent)"
        : "color-mix(in srgb, var(--text-color) 8%, transparent)"};
    outline: none;
  }

  &:active {
    background: ${(props) =>
      props.$danger
        ? "color-mix(in srgb, var(--danger-color, var(--primary-color)) 26%, transparent)"
        : "color-mix(in srgb, var(--text-color) 14%, transparent)"};
    transform: scale(0.985);
  }

  @media (max-width: 768px) {
    padding: 14px 16px;
    font-size: 16px;
    gap: 14px;
  }
`;

const ChatAreaContextMenu = () => {
  const {
    contextMenu,
    currentChat,
    currentUser,
    handleContextMenuAction,
    closeContextMenu,
  } = useChatAreaContext();

  useEffect(() => {
    if (!contextMenu) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") {
        closeContextMenu?.();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [contextMenu, closeContextMenu]);

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

  const handleBackdropClick = () => {
    closeContextMenu?.();
  };

  return (
    <>
      <Backdrop onClick={handleBackdropClick} onContextMenu={(e) => e.preventDefault()} />
      <ContextMenu
        $x={contextMenu.x}
        $y={contextMenu.y}
        role="menu"
        onClick={(event) => event.stopPropagation()}
        onContextMenu={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <SheetHandle aria-hidden="true" />
        <ContextMenuItem
          role="menuitem"
          onClick={() => handleContextMenuAction("reply", contextMenu.message)}
        >
          <Reply size={18} /> Javob yozish
        </ContextMenuItem>

        {(isOwnMessage || canDeleteOthers) && (
          <>
            {isOwnMessage && (
              <ContextMenuItem
                role="menuitem"
                onClick={() => handleContextMenuAction("edit", contextMenu.message)}
              >
                <Edit2 size={18} /> Tahrirlash
              </ContextMenuItem>
            )}
            <ContextMenuItem
              role="menuitem"
              $danger
              onClick={() =>
                handleContextMenuAction("delete", contextMenu.message)
              }
            >
              <Trash2 size={18} /> O&apos;chirish
            </ContextMenuItem>
          </>
        )}
      </ContextMenu>
    </>
  );
};

export default ChatAreaContextMenu;
