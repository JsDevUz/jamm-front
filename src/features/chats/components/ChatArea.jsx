import React from "react";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import { OutgoingCallRequest } from "../../calls/components";
import EditGroupDialog from "./EditGroupDialog";
import {
  ChatAreaComposer,
  ChatAreaContextMenu,
  ChatAreaDeleteDialog,
  ChatAreaHeader,
  ChatAreaInfoSidebar,
  ChatAreaMessageList,
} from "../chat-area/components";
import { ChatAreaProvider } from "../chat-area/context/ChatAreaContext";
import useChatAreaController from "../chat-area/hooks/useChatAreaController";
import {
  ChatContainer,
  ChatMain,
  ChatMainColumn,
  OuterChatWrapper,
} from "../chat-area/styles/layout";
import useKeyboardAvoid from "../../../shared/hooks/useKeyboardAvoid";

const ChatArea = ({
  onBack,
  selectedChatId,
  selectedNav,
  navigate,
  chats = [],
}) => {
  const {
    closeEditGroupDialog,
    closeMessageDeleteDialog,
    confirmDeleteMessage,
    contextValue,
    currentChat,
    currentChatName,
    currentUser,
    displayChat,
    editGroupUsers,
    handleCopyChatLink,
    handleDeleteChat,
    handleEditGroupSave,
    handleMemberClick,
    handleInfoSidebarClose,
    handleInfoSidebarToggle,
    headerMenuRef,
    isEditGroupDialogOpen,
    isOnline,
    isUserOnline,
    getUserLastSeen,
    lastSeenText,
    onlineCount,
    startPrivateVideoCall,
    typingText,
    otherMember,
    pendingDeleteMessage,
  } = useChatAreaController({
    selectedChatId,
    selectedNav,
    navigate,
    chats,
  });
  const { keyboardHeight } = useKeyboardAvoid();
  const keyboardOpen = keyboardHeight > 40;

  if (!displayChat && !selectedChatId) return null;

  return (
    <ChatAreaProvider value={contextValue}>
      <OuterChatWrapper>
        <ChatContainer
          data-chat-keyboard-open={keyboardOpen ? "true" : "false"}
          style={{ "--chat-keyboard-height": `${keyboardHeight}px` }}
        >
          <ChatAreaHeader
            onBack={onBack}
            selectedNav={selectedNav}
            currentChat={currentChat}
            displayChat={displayChat}
            otherMember={otherMember}
            currentChatName={currentChatName}
            currentUser={currentUser}
            typingText={typingText}
            onlineCount={onlineCount}
            isOnline={isOnline}
            lastSeenText={lastSeenText}
            onStartPrivateVideoCall={startPrivateVideoCall}
            onToggleInfoSidebar={handleInfoSidebarToggle}
            headerMenuRef={headerMenuRef}
          />

          <ChatMain>
            <ChatMainColumn>
              <ChatAreaMessageList keyboardHeight={keyboardHeight} />
              <ChatAreaComposer keyboardOpen={keyboardOpen} />
            </ChatMainColumn>
          </ChatMain>

          <ChatAreaContextMenu />
        </ChatContainer>

        <ChatAreaInfoSidebar
          currentChat={currentChat}
          displayChat={displayChat}
          currentUser={currentUser}
          onlineCount={onlineCount}
          isUserOnline={isUserOnline}
          getUserLastSeen={getUserLastSeen}
          onMemberClick={handleMemberClick}
          onCopyLink={handleCopyChatLink}
          onClose={handleInfoSidebarClose}
        />

        <OutgoingCallRequest />

        <EditGroupDialog
          isOpen={isEditGroupDialogOpen}
          onClose={closeEditGroupDialog}
          group={currentChat}
          users={editGroupUsers}
          onSave={handleEditGroupSave}
        />

        <ChatAreaDeleteDialog
          currentChat={currentChat}
          currentUser={currentUser}
          onConfirm={handleDeleteChat}
        />

        <ConfirmDialog
          isOpen={Boolean(pendingDeleteMessage)}
          onClose={closeMessageDeleteDialog}
          title="Xabarni o'chirish"
          description="Siz haqiqatan ham ushbu xabarni o'chirmoqchimisiz?"
          confirmText="O'chirish"
          onConfirm={confirmDeleteMessage}
          isDanger
        />
      </OuterChatWrapper>
    </ChatAreaProvider>
  );
};

export default ChatArea;
