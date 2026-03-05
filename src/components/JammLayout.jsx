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

import ArenaDashboard from "./arena/ArenaDashboard";
import ProfilePage from "./ProfilePage";
import FeedPage from "./FeedPage";
import SettingsDialog from "./SettingsDialog";
import PremiumUpgradeModal from "./PremiumUpgradeModal";
import UniversalDialog from "./UniversalDialog";
import OnboardingModal from "./OnboardingModal";
import { saveMeet, getMeets } from "../utils/meetStore";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #36393f;
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding-bottom: 88px;
    box-sizing: border-box;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const JammLayout = ({
  initialNav = "home",
  initialChannel = 0,
  initialLesson,
}) => {
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPremiumOpen, setIsPremiumOpen] = useState(false);
  const [viewMode, setViewMode] = useState("courses"); // "courses" | "arena"
  const [activeArenaTab, setActiveArenaTab] = useState(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isCreateMeetOpen, setIsCreateMeetOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.user);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync URL params → state. When URL is /a/:channelId, auto-detect nav type
  // from the current chat so selectedNav is ALWAYS meaningful (never "a").
  useEffect(() => {
    if (initialChannel !== undefined && initialChannel !== selectedChannel) {
      setSelectedChannel(initialChannel);
    }
    if (initialNav === "a" || initialNav === "chats") {
      // Direct message routing - always show chats
      if (selectedNav !== "chats") setSelectedNav("chats");
    } else if (initialNav === "users" || initialNav === "groups") {
      if (selectedNav !== initialNav) setSelectedNav(initialNav);
    } else if (initialNav === "arena") {
      setSelectedNav("arena");
      setViewMode("arena");

      const path = window.location.pathname;
      const tabMap = {
        quiz: "tests",
        test: "tests",
        flashcard: "flashcards",
        falshcard: "flashcards",
        flashcards: "flashcards",
        battle: "battles",
        battles: "battles",
      };

      let targetTab = null;
      if (path.includes("/arena/quiz")) targetTab = "tests";
      else if (path.includes("/arena/flashcard")) targetTab = "flashcards";
      else if (path.includes("/arena/battle")) targetTab = "battles";
      else targetTab = tabMap[initialChannel] || initialChannel;

      if (targetTab && ["tests", "flashcards", "battles"].includes(targetTab)) {
        setActiveArenaTab(targetTab);
      } else if (path === "/arena") {
        setActiveArenaTab(null);
      }
    } else if (initialNav !== selectedNav) {
      setSelectedNav(initialNav);
      if (initialNav === "courses") setViewMode("courses");
    }

    if (initialNav === "courses" || initialNav === "arena") {
      if (initialChannel && initialChannel !== "0" && initialNav !== "arena") {
        setSelectedCourse(initialChannel);
      } else if (
        initialNav === "courses" &&
        (!initialChannel || initialChannel === "0")
      ) {
        // If we are on /courses and no specific course is selected, clear it
        setSelectedCourse(null);
      }
    }
  }, [initialNav, initialChannel, chats]);

  const handleSelectNav = (navId) => {
    setSelectedNav(navId);
    setSelectedChannel(0);
    if (navId === "arena") {
      setViewMode("arena");
      setActiveArenaTab(null);
    } else if (navId === "courses") {
      setViewMode("courses");
    }
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
      const chatSlug =
        chatId?.urlSlug || chatId?.jammId || chatId?._id || chatId?.id;
      if (chatSlug) {
        navigate(`/a/${chatSlug}`);
      }
    } catch (error) {
      console.error("Failed to create group", error);
      if (
        error.message.includes("Premium") ||
        error.message.includes("maksimal")
      ) {
        setIsUpgradeModalOpen(true);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <AppContainer>
      <ServerSidebar
        selectedNav={selectedNav}
        onSelectNav={handleSelectNav}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenPremium={() => setIsPremiumOpen(true)}
      />
      <MainContent>
        {selectedNav === "courses" ||
        selectedNav === "arena" ||
        selectedNav === "home" ? (
          <>
            <CourseSidebar
              onSelectCourse={setSelectedCourse}
              onOpenPremium={() => setIsPremiumOpen(true)}
              viewMode={selectedNav === "arena" ? "arena" : viewMode}
              onToggleViewMode={setViewMode}
              selectedCourse={selectedCourse}
              activeArenaTab={activeArenaTab}
              setActiveArenaTab={setActiveArenaTab}
            />
            {selectedNav === "arena" ||
            selectedNav === "home" ||
            viewMode === "arena" ? (
              <div style={{ flex: 1, overflowY: "auto" }}>
                <ArenaDashboard
                  activeTab={activeArenaTab}
                  initialId={
                    initialNav === "arena" &&
                    initialChannel &&
                    ![
                      "tests",
                      "flashcards",
                      "battles",
                      "quiz",
                      "flashcard",
                      "battle",
                      "0",
                    ].includes(initialChannel)
                      ? initialChannel
                      : initialLesson
                  }
                  onBack={() => {
                    setActiveArenaTab(null);
                    navigate("/arena");
                  }}
                />
              </div>
            ) : (
              <CoursePlayer
                courseId={selectedCourse}
                initialLessonSlug={initialLesson}
                onClose={() => {
                  setSelectedCourse(null);
                  navigate("/courses");
                }}
              />
            )}
          </>
        ) : selectedNav === "profile" ? (
          <ProfilePage
            profileUserId={
              initialChannel && initialChannel !== 0 && initialChannel !== "0"
                ? String(initialChannel)
                : null
            }
          />
        ) : selectedNav === "feed" ? (
          <FeedPage />
        ) : (
          <>
            {!isMobile || !selectedChannel || selectedChannel === "0" ? (
              <ChannelSidebar
                selectedChannel={selectedChannel}
                selectedNav={selectedNav}
                chats={chats}
                onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
                onOpenCreateMeet={() => setIsCreateMeetOpen(true)}
              />
            ) : null}
            <ChatContainer>
              {selectedChannel && selectedChannel !== "0" ? (
                <ChatArea
                  selectedChannel={selectedChannel}
                  selectedNav={selectedNav}
                  chats={chats}
                  navigate={navigate}
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
                  {selectedNav === "meets"
                    ? "Meet tanlang"
                    : "Suhbatni tanlang"}
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

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <SettingsDialog
        isOpen={isPremiumOpen}
        onClose={() => setIsPremiumOpen(false)}
        initialSection="premium"
      />

      <PremiumUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={() => {
          setIsUpgradeModalOpen(false);
          setIsPremiumOpen(true);
        }}
      />
      <UniversalDialog
        isOpen={isCreateMeetOpen}
        onClose={() => setIsCreateMeetOpen(false)}
        onCreateCall={async ({ title, isPrivate }) => {
          if (currentUser) {
            const isPremium = currentUser.premiumStatus === "active";
            const myMeets = await getMeets();
            const createdMeets = myMeets.filter(
              (m) =>
                m.creator === currentUser?._id ||
                m.creator?._id === currentUser?._id,
            );
            const limit = isPremium ? 3 : 1;

            if (createdMeets.length >= limit) {
              setIsCreateMeetOpen(false);
              setIsUpgradeModalOpen(true);
              return;
            }
          }

          const roomId =
            title.toLowerCase().replace(/\s+/g, "-") +
            "-" +
            Date.now().toString().slice(-4);
          await saveMeet({ roomId, title, isPrivate, isCreator: true });
          navigate(`/join/${roomId}`);
        }}
      />
      {currentUser && !currentUser.isOnboardingCompleted && <OnboardingModal />}
    </AppContainer>
  );
};

export default JammLayout;
