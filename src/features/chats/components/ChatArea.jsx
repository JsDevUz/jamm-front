import React from "react";
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

const ChatArea = ({
  onBack,
  selectedChatId,
  selectedNav,
  navigate,
  chats = [],
}) => {
  const {
    closeEditGroupDialog,
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
    headerMenuRef,
    isEditGroupDialogOpen,
    isOnline,
    isUserOnline,
    lastSeenText,
    onlineCount,
    startPrivateVideoCall,
    typingText,
    otherMember,
  } = useChatAreaController({
    selectedChatId,
    selectedNav,
    navigate,
    chats,
  });

  if (!displayChat && !selectedChatId) return null;

  return (
    <ChatAreaProvider value={contextValue}>
      <OuterChatWrapper>
        <ChatContainer>
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
            headerMenuRef={headerMenuRef}
          />

          <ChatMain>
            <ChatMainColumn>
              <ChatAreaMessageList />
              <ChatAreaComposer />
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
          onMemberClick={handleMemberClick}
          onCopyLink={handleCopyChatLink}
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
      </OuterChatWrapper>
    </ChatAreaProvider>
  );
};

export default ChatArea;
