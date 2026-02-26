import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import ServerSidebar from "./ServerSidebar";
import ChannelSidebar from "./ChannelSidebar";
import ChatArea from "./ChatArea";
import UniversalDialog from "./UniversalDialog";
import GroupVideoCall from "./GroupVideoCall";
import CourseSidebar from "./CourseSidebar";
import CoursePlayer from "./CoursePlayer";
import CoursesDashboard from "./CoursesDashboard";
import CreateGroupDialog from "./CreateGroupDialog";
import { useTheme } from "../contexts/ThemeContext";
import { CoursesProvider } from "../contexts/CoursesContext";
import { useChats } from "../contexts/ChatsContext";
import { saveMeet } from "../utils/meetStore";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: ${(props) =>
    props.currentTheme?.colors?.background || "#36393f"};

  /* Mobile responsive */
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;

  /* Mobile responsive */
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

  /* Mobile responsive */
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const JammLayout = ({ initialNav = "home", initialChannel = 0 }) => {
  const { currentTheme } = useTheme();
  const { chats, createChat } = useChats();
  const [selectedNav, setSelectedNav] = useState(initialNav);
  const [selectedChannel, setSelectedChannel] = useState(initialChannel);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isUserNavigation, setIsUserNavigation] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [groupCallInfo, setGroupCallInfo] = useState({});
  const [isGroupVideoCallOpen, setIsGroupVideoCallOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const location = useLocation();

  // Handle ?joinCall=<roomId> — guest joining via invite link
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const joinRoomId = params.get("joinCall");
    if (joinRoomId) {
      setGroupCallInfo({
        roomId: joinRoomId,
        title: "Meet",
        isCreator: false,
      });
      setIsGroupVideoCallOpen(true);
      // Clean up URL without page reload
      const clean = window.location.pathname;
      window.history.replaceState({}, "", clean);
    }
  }, [location.search]);

  const handleCreateGroup = async (groupData) => {
    try {
      const chatId = await createChat({
        isGroup: true,
        name: groupData.name,
        description: groupData.description,
        avatar: groupData.image, // URL or null
        memberIds: groupData.members, // IDs of selected users
      });
      setIsCreateGroupOpen(false);

      // Optionally navigate to the new chat
      if (chatId) {
        setSelectedNav("groups");
        setSelectedChannel(chatId);
      }
    } catch (error) {
      console.error("Failed to create group", error);
    }
  };

  const handleSelectNav = (navId) => {
    setIsUserNavigation(true);
    setSelectedNav(navId);
    if (navId === "group-video-call") {
      setIsDialogOpen(true);
    } else {
      setSelectedChannel(0);
    }
  };

  // Update URL when selection changes (only if user initiated)
  useEffect(() => {
    if (navigate && isUserNavigation) {
      if (selectedChannel > 0) {
        navigate(`/${selectedNav}/${selectedChannel}`);
      } else if (selectedNav !== "home") {
        navigate(`/${selectedNav}`);
      } else {
        navigate("/home");
      }
      setIsUserNavigation(false); // Reset flag
    }
  }, [selectedNav, selectedChannel, navigate, isUserNavigation]);

  // Handle navigation changes
  const handleNavChange = (nav) => {
    handleSelectNav(nav);
  };

  const handleCreateCall = (callInfo) => {
    const roomId = `jamm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    saveMeet({
      roomId,
      title: callInfo.title,
      isPrivate: callInfo.isPrivate || false,
      isCreator: true,
    });
    // Navigate to the same unified /join/:roomId URL (creator auto-skips form)
    navigate(`/join/${roomId}`);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseGroupCall = () => {
    setIsGroupVideoCallOpen(false);
    setGroupCallInfo({});
    navigate("/");
  };

  useEffect(() => {
    // Sync state when URL params change (not user initiated)
    if (!isUserNavigation) {
      setSelectedNav(initialNav);
      setSelectedChannel(initialChannel);
    }
  }, [initialNav, initialChannel, isUserNavigation]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <AppContainer>
        <ServerSidebar
          selectedNav={selectedNav}
          onSelectNav={handleNavChange}
        />
        <MainContent>
          <CoursesProvider>
            <ChatContainer>
              {selectedNav === "courses" ? (
                selectedCourse ? (
                  <CoursePlayer
                    selectedCourseId={selectedCourse}
                    onBack={() => setSelectedCourse(null)}
                  />
                ) : (
                  <CourseSidebar
                    selectedCourse={selectedCourse}
                    onSelectCourse={setSelectedCourse}
                  />
                )
              ) : selectedNav === "home" ? (
                <CoursesDashboard
                  onNavigateToCourse={(courseId) => {
                    setSelectedCourse(courseId);
                    handleNavChange("courses");
                  }}
                />
              ) : selectedChannel &&
                selectedChannel !== "0" &&
                selectedChannel !== 0 &&
                !isUserNavigation ? (
                <ChatArea
                  onBack={handleBackToSidebar}
                  selectedChannel={selectedChannel}
                  selectedNav={selectedNav}
                  onChangeState={handleChangeState}
                  navigate={navigate}
                  chats={chats}
                />
              ) : (
                <ChannelSidebar
                  selectedChannel={selectedChannel}
                  selectedNav={selectedNav}
                  chats={chats}
                  onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
                  onOpenCreateMeet={() => setIsDialogOpen(true)}
                />
              )}
            </ChatContainer>
          </CoursesProvider>
          {/* <UserPanel /> */}
        </MainContent>
        {/* Create Group Dialog */}
        <CreateGroupDialog
          isOpen={isCreateGroupOpen}
          onClose={() => setIsCreateGroupOpen(false)}
          onCreate={handleCreateGroup}
          users={chats.filter((c) => c.type === "user")}
        />
        {/* Universal Dialog for creating group video call */}
        <UniversalDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onCreateCall={handleCreateCall}
        />

        {/* GroupVideoCall now lives at /join/:roomId — no in-app render needed */}
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <ServerSidebar selectedNav={selectedNav} onSelectNav={handleNavChange} />
      <MainContent>
        <CoursesProvider>
          {selectedNav === "courses" ? (
            <>
              <CourseSidebar
                selectedCourse={selectedCourse}
                onSelectCourse={setSelectedCourse}
              />
              <CoursePlayer selectedCourseId={selectedCourse} />
            </>
          ) : selectedNav === "home" ? (
            <CoursesDashboard
              onNavigateToCourse={(courseId) => {
                setSelectedCourse(courseId);
                handleNavChange("courses");
              }}
            />
          ) : (
            <>
              <ChannelSidebar
                selectedChannel={selectedChannel}
                selectedNav={selectedNav}
                chats={chats}
                onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
                onOpenCreateMeet={() => setIsDialogOpen(true)}
              />
              <ChatContainer>
                {selectedChannel &&
                selectedChannel !== "0" &&
                selectedChannel !== 0 ? (
                  <ChatArea
                    onBack={handleNavChange}
                    selectedChannel={selectedChannel}
                    selectedNav={selectedNav}
                    navigate={navigate}
                    chats={chats}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--text-secondary-color)",
                      fontSize: "16px",
                    }}
                  >
                    Select a channel to start chatting
                  </div>
                )}
              </ChatContainer>
            </>
          )}
        </CoursesProvider>
        {/* <UserPanel /> */}
      </MainContent>

      {/* Create Group Dialog */}
      <CreateGroupDialog
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreate={handleCreateGroup}
        users={chats.filter((c) => c.type === "user")}
      />

      {/* Universal Dialog for creating group video call */}
      <UniversalDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onCreateCall={handleCreateCall}
      />

      {/* Group Video Call (standalone, like Google Meet) */}
      <GroupVideoCall
        isOpen={isGroupVideoCallOpen}
        onClose={handleCloseGroupCall}
        roomId={groupCallInfo.roomId}
        chatTitle={groupCallInfo.title || "Meet"}
        isCreator={groupCallInfo.isCreator !== false}
      />
    </AppContainer>
  );
};

export default JammLayout;
