import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChats } from "../contexts/ChatsContext";
import {
  ChatArea,
  ChatsSidebar,
  CreateGroupDialog,
} from "../features/chats/components";
import {
  CoursePlayer,
  CourseSidebar,
} from "../features/courses/components";

import OnboardingModal from "../app/components/OnboardingModal";
import PremiumUpgradeModal from "../app/components/PremiumUpgradeModal";
import { saveMeet, getMeets } from "../utils/meetStore";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import { ArenaDashboard } from "../features/arena/components";
import { BlogReaderPane, BlogsSidebar } from "../features/blogs/components";
import { UniversalDialog } from "../features/calls/components";
import { ServerSidebar } from "../features/navigation/components";
import { FeedPage } from "../features/posts/components";
import { ProfilePage } from "../features/profile/components";
import {
  AppContainer,
  ContentPane,
  EmptyPane,
  MainContent,
  ScrollPane,
} from "./JammLayout.styles";

const JammLayout = ({
  initialNav = "home",
  initialResourceId = 0,
  initialLesson,
}) => {
  const {
    chats,
    createChat,
    selectedNav,
    setSelectedNav,
    selectedChatId,
    setSelectedChatId,
  } = useChats();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
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

  // Sync URL params → state. When URL is /a/:chatId, auto-detect nav type
  // from the current chat so selectedNav is ALWAYS meaningful (never "a").
  useEffect(() => {
    if (initialResourceId !== undefined && initialResourceId !== selectedChatId) {
      setSelectedChatId(initialResourceId);
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
        "sentence-builder": "sentenceBuilders",
        "sentence-builders": "sentenceBuilders",
        sentences: "sentenceBuilders",
        gap: "sentenceBuilders",
        "gap-tuzish": "sentenceBuilders",
        minemonika: "mnemonics",
        mnemonika: "mnemonics",
        mnemonic: "mnemonics",
        mnemonics: "mnemonics",
        battle: "battles",
        battles: "battles",
      };

      let targetTab = null;
      if (path.includes("/arena/quiz-link")) targetTab = "tests";
      else if (path.includes("/arena/quiz")) targetTab = "tests";
      else if (path.includes("/arena/flashcard")) targetTab = "flashcards";
      else if (path.includes("/arena/sentence-builder")) {
        targetTab = "sentenceBuilders";
      }
      else if (path.includes("/arena/minemonika")) targetTab = "mnemonics";
      else if (path.includes("/arena/battle")) targetTab = "battles";
      else targetTab = tabMap[initialResourceId] || initialResourceId;

      if (
        targetTab &&
        ["tests", "flashcards", "sentenceBuilders", "mnemonics", "battles"].includes(
          targetTab,
        )
      ) {
        setActiveArenaTab(targetTab);
      } else if (path === "/arena") {
        setActiveArenaTab(null);
      }
    } else if (initialNav !== selectedNav) {
      setSelectedNav(initialNav);
      if (initialNav === "courses") setViewMode("courses");
    }

    if (initialNav === "courses" || initialNav === "arena") {
      if (initialResourceId && initialResourceId !== "0" && initialNav !== "arena") {
        setSelectedCourse(initialResourceId);
      } else if (
        initialNav === "courses" &&
        (!initialResourceId || initialResourceId === "0")
      ) {
        // If we are on /courses and no specific course is selected, clear it
        setSelectedCourse(null);
      }
    }
  }, [initialNav, initialResourceId, chats]);

  const handleSelectNav = (navId) => {
    setSelectedNav(navId);
    setSelectedChatId(0);
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
      />
      <MainContent>
        {selectedNav === "courses" ||
        selectedNav === "arena" ||
        selectedNav === "home" ? (
          <>
            <CourseSidebar
              onSelectCourse={setSelectedCourse}
              onOpenPremium={() => setIsUpgradeModalOpen(true)}
              viewMode={selectedNav === "arena" ? "arena" : viewMode}
              onToggleViewMode={setViewMode}
              selectedCourse={selectedCourse}
              activeArenaTab={activeArenaTab}
              setActiveArenaTab={setActiveArenaTab}
            />
            {selectedNav === "arena" ||
            selectedNav === "home" ||
            viewMode === "arena" ? (
              <ScrollPane>
                <ArenaDashboard
                  activeTab={activeArenaTab}
                  initialId={
                    initialNav === "arena" &&
                    initialResourceId &&
                    ![
                      "tests",
                      "flashcards",
                      "sentenceBuilders",
                      "mnemonics",
                      "battles",
                      "quiz",
                      "quiz-link",
                      "flashcard",
                      "sentence-builder",
                      "minemonika",
                      "battle",
                      "0",
                    ].includes(initialResourceId)
                      ? initialResourceId
                      : initialLesson
                  }
                  onBack={() => {
                    setActiveArenaTab(null);
                    navigate("/arena");
                  }}
                />
              </ScrollPane>
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
              initialResourceId && initialResourceId !== 0 && initialResourceId !== "0"
                ? String(initialResourceId)
                : null
            }
          />
        ) : selectedNav === "blogs" ? (
          <>
            {!isMobile || !selectedChatId || selectedChatId === "0" ? (
              <BlogsSidebar selectedBlogId={selectedChatId} />
            ) : null}
            <ContentPane>
              <BlogReaderPane
                blogIdentifier={selectedChatId}
                onBack={() => {
                  setSelectedChatId(0);
                  navigate("/blogs");
                }}
              />
            </ContentPane>
          </>
        ) : selectedNav === "feed" ? (
          <FeedPage />
        ) : (
          <>
            {!isMobile || !selectedChatId || selectedChatId === "0" ? (
              <ChatsSidebar
                selectedChatId={selectedChatId}
                selectedNav={selectedNav}
                chats={chats}
                onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
                onOpenCreateMeet={() => setIsCreateMeetOpen(true)}
              />
            ) : null}
            <ContentPane>
              {selectedChatId && selectedChatId !== "0" ? (
                <ChatArea
                  selectedChatId={selectedChatId}
                  selectedNav={selectedNav}
                  chats={chats}
                  navigate={navigate}
                  onBack={() => {
                    setSelectedChatId(0);
                    navigate(`/${selectedNav}`);
                  }}
                />
              ) : (
                <EmptyPane>
                  {selectedNav === "meets"
                    ? t("layout.selectMeet")
                    : t("layout.selectChat")}
                </EmptyPane>
              )}
            </ContentPane>
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

      <PremiumUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={() => {
          setIsUpgradeModalOpen(false);
          sessionStorage.setItem("profile_initial_tab", "premium");
          setSelectedNav("profile");
          setSelectedChatId(0);
          navigate("/profile");
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
