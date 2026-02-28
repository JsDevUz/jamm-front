import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ServerSidebar from "./ServerSidebar";
import ChannelSidebar from "./ChannelSidebar";
import ChatArea from "./ChatArea";
import CreateGroupDialog from "./CreateGroupDialog";
import { useChats } from "../contexts/ChatsContext";
import CourseSidebar from "./CourseSidebar";
import CoursePlayer from "./CoursePlayer";
import CoursesDashboard from "./CoursesDashboard";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #36393f;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    position: relative;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const JammLayout = ({ initialNav = "home", initialChannel = 0 }) => {
  const {
    chats,
    createChat,
    selectedNav,
    setSelectedNav,
    selectedChannel,
    setSelectedChannel,
  } = useChats();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (initialNav && initialNav !== selectedNav) {
      setSelectedNav(initialNav);
    }
    if (initialChannel !== undefined && initialChannel !== selectedChannel) {
      setSelectedChannel(initialChannel);
    }
  }, [initialNav, initialChannel]);

  const handleSelectNav = (navId) => {
    setSelectedNav(navId);
    setSelectedChannel(0);
    navigate(`/${navId}`);
  };

  const handleCreateGroup = async (groupData) => {
    try {
      const chatId = await createChat({
        isGroup: true,
        name: groupData.name,
        description: groupData.description,
        avatar: groupData.image,
        memberIds: groupData.members,
      });
      setIsCreateGroupOpen(false);
      if (chatId) {
        navigate(`/a/${chatId}`);
      }
    } catch (error) {
      console.error("Failed to create group", error);
    }
  };

  return (
    <AppContainer>
      <ServerSidebar selectedNav={selectedNav} onSelectNav={handleSelectNav} />
      <MainContent>
        {selectedNav === "courses" ? (
          <>
            <CourseSidebar onSelectCourse={setSelectedCourse} />
            <CoursePlayer courseId={selectedCourse} />
          </>
        ) : selectedNav === "home" ? (
          <CoursesDashboard
            onNavigateToCourse={(c) => {
              setSelectedCourse(c);
              handleSelectNav("courses");
            }}
          />
        ) : (
          <>
            {!isMobile || !selectedChannel || selectedChannel === "0" ? (
              <ChannelSidebar
                selectedChannel={selectedChannel}
                selectedNav={selectedNav}
                chats={chats}
                onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
              />
            ) : null}
            <ChatContainer>
              {selectedChannel && selectedChannel !== "0" ? (
                <ChatArea
                  selectedChannel={selectedChannel}
                  selectedNav={selectedNav}
                  chats={chats}
                  onBack={() => {
                    setSelectedChannel(0);
                    navigate(`/${selectedNav}`);
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    color: "#8e9297",
                  }}
                >
                  Suhbatni tanlang
                </div>
              )}
            </ChatContainer>
          </>
        )}
      </MainContent>
      <CreateGroupDialog
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreate={handleCreateGroup}
        users={chats
          .filter((c) => c.type === "user" && !c.isSavedMessages)
          .map((c) => {
            const currentUser = JSON.parse(
              localStorage.getItem("user") || "{}",
            );
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
      />
    </AppContainer>
  );
};

export default JammLayout;
