import React, {
  Suspense,
  lazy,
  useState,
  useEffect,
  startTransition,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChats } from "../contexts/ChatsContext";
import { SystemLoadingScreen } from "../app/components/SystemStateScreen";
import { saveMeet, getMeets } from "../utils/meetStore";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import { APP_LIMITS, isPremiumUser } from "../constants/appLimits";
import {
  AppContainer,
  ContentPane,
  EmptyPane,
  MainContent,
  PaneDivider,
  PaneDividerButton,
  ScrollPane,
} from "./JammLayout.styles";
import usePremiumUpgradeModalStore from "../app/store/usePremiumUpgradeModalStore";

const ChatArea = lazy(() =>
  import("../features/chats/components").then((module) => ({
    default: module.ChatArea,
  })),
);
const ChatsSidebar = lazy(() =>
  import("../features/chats/components").then((module) => ({
    default: module.ChatsSidebar,
  })),
);
const CreateGroupDialog = lazy(() =>
  import("../features/chats/components").then((module) => ({
    default: module.CreateGroupDialog,
  })),
);
const CoursePlayer = lazy(() =>
  import("../features/courses/components").then((module) => ({
    default: module.CoursePlayer,
  })),
);
const CourseSidebar = lazy(() =>
  import("../features/courses/components").then((module) => ({
    default: module.CourseSidebar,
  })),
);
const OnboardingModal = lazy(() => import("../app/components/OnboardingModal"));
const PremiumUpgradeModal = lazy(
  () => import("../app/components/PremiumUpgradeModal"),
);
import InstallAppPrompt from "../app/components/InstallAppPrompt";
const FeatureTour = lazy(() => import("../app/components/tours/FeatureTour"));
const ArenaDashboard = lazy(() =>
  import("../features/arena/components").then((module) => ({
    default: module.ArenaDashboard,
  })),
);
const BlogReaderPane = lazy(() =>
  import("../features/blogs/components").then((module) => ({
    default: module.BlogReaderPane,
  })),
);
const BlogsSidebar = lazy(() =>
  import("../features/blogs/components").then((module) => ({
    default: module.BlogsSidebar,
  })),
);
const UniversalDialog = lazy(() =>
  import("../features/calls/components").then((module) => ({
    default: module.UniversalDialog,
  })),
);
import { ServerSidebar } from "../features/navigation/components";
const FeedPage = lazy(() =>
  import("../features/posts/components").then((module) => ({
    default: module.FeedPage,
  })),
);
const ProfilePage = lazy(() =>
  import("../features/profile/components").then((module) => ({
    default: module.ProfilePage,
  })),
);
const AdminPanel = lazy(() =>
  import("../features/admin/components").then((module) => ({
    default: module.AdminPanel,
  })),
);

function LazyPane({ children, message }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

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
  const [isCreateMeetOpen, setIsCreateMeetOpen] = useState(false);
  const [isRightPaneFocused, setIsRightPaneFocused] = useState(false);
  const [isCoursesTourOpen, setIsCoursesTourOpen] = useState(false);
  const [isChatsTourOpen, setIsChatsTourOpen] = useState(false);
  const [isProfileIntroTourOpen, setIsProfileIntroTourOpen] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  const {
    isOpen: isUpgradeModalOpen,
    message: premiumUpgradeMessage,
    openPremiumUpgradeModal,
    closePremiumUpgradeModal,
  } = usePremiumUpgradeModalStore();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsRightPaneFocused(false);
  }, [selectedNav, selectedChatId, selectedCourse, activeArenaTab, isMobile]);

  useEffect(() => {
    if (!currentUser?.isOnboardingCompleted) return;
    if (selectedNav !== "courses" || viewMode !== "courses") return;
    if (localStorage.getItem("jamm-tour-courses-v1") === "done") return;

    const timer = window.setTimeout(() => {
      setIsCoursesTourOpen(true);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [currentUser?.isOnboardingCompleted, selectedNav, viewMode]);

  useEffect(() => {
    if (!currentUser?.isOnboardingCompleted) return;
    if (!["chats", "users", "groups", "meets"].includes(selectedNav)) return;
    if (selectedChatId && selectedChatId !== "0" && selectedChatId !== 0)
      return;
    if (localStorage.getItem("jamm-tour-profile-v1") !== "done") return;
    if (localStorage.getItem("jamm-tour-chats-v1") === "done") return;

    const timer = window.setTimeout(() => {
      setIsChatsTourOpen(true);
    }, 450);

    return () => window.clearTimeout(timer);
  }, [currentUser?.isOnboardingCompleted, selectedNav, selectedChatId]);

  useEffect(() => {
    if (!currentUser?.isOnboardingCompleted) return;
    if (selectedNav === "profile") return;
    if (localStorage.getItem("jamm-tour-profile-v1") === "done") return;
    if (sessionStorage.getItem("jamm-tour-profile-started") === "done") return;

    let attempts = 0;
    let timeoutId = null;

    const tryOpenProfileIntro = () => {
      const target = document.querySelector('[data-tour="nav-profile"]');
      if (target) {
        setIsProfileIntroTourOpen(true);
        return;
      }

      if (attempts >= 15) return;
      attempts += 1;
      timeoutId = window.setTimeout(tryOpenProfileIntro, 120);
    };

    timeoutId = window.setTimeout(tryOpenProfileIntro, 500);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [currentUser?.isOnboardingCompleted, selectedNav]);

  // Sync URL params → state. When URL is /a/:chatId, auto-detect nav type
  // from the current chat so selectedNav is ALWAYS meaningful (never "a").
  useEffect(() => {
    if (
      initialResourceId !== undefined &&
      initialResourceId !== selectedChatId
    ) {
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
      } else if (path.includes("/arena/minemonika")) targetTab = "mnemonics";
      else if (path.includes("/arena/battle")) targetTab = "battles";
      else targetTab = tabMap[initialResourceId] || initialResourceId;

      if (
        targetTab &&
        [
          "tests",
          "flashcards",
          "sentenceBuilders",
          "mnemonics",
          "battles",
        ].includes(targetTab)
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
      if (
        initialResourceId &&
        initialResourceId !== "0" &&
        initialNav !== "arena"
      ) {
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

  // Preload maps for lazy components
  const preloaders = {
    feed: () => import("../features/posts/components"),
    chats: () =>
      Promise.all([
        import("../features/chats/components"),
        import("../features/calls/components"),
      ]),
    blogs: () => import("../features/blogs/components"),
    courses: () => import("../features/courses/components"),
    arena: () => import("../features/arena/components"),
    profile: () => import("../features/profile/components"),
    admin: () => import("../features/admin/components"),
  };

  const handlePreloadNav = (navId) => {
    if (preloaders[navId]) {
      const p = preloaders[navId]();
      if (p && p.catch) {
        p.catch(() => {});
      }
    }
  };

  const handleSelectNav = (navId) => {
    startTransition(() => {
      setSelectedNav(navId);
      setSelectedChatId(0);
      if (navId === "arena") {
        setViewMode("arena");
        setActiveArenaTab(null);
      } else if (navId === "courses") {
        setViewMode("courses");
      }
      navigate(`/${navId}`);
    });
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
        openPremiumUpgradeModal({
          message: error.message,
          source: "create-group",
        });
      } else {
        toast.error(error.message);
      }
    }
  };

  const focusToggleTitle = isRightPaneFocused
    ? t("layout.minimizePane")
    : t("layout.maximizePane");

  const renderPaneDivider = (isVisible = true) =>
    isVisible ? (
      <PaneDivider $focused={isRightPaneFocused}>
        <PaneDividerButton
          type="button"
          onClick={() => setIsRightPaneFocused((prev) => !prev)}
          title={focusToggleTitle}
          aria-label={focusToggleTitle}
        >
          {!isRightPaneFocused ? (
            <ChevronLeft size={18} />
          ) : (
            <ChevronRight size={18} />
          )}
        </PaneDividerButton>
      </PaneDivider>
    ) : null;

  return (
    <AppContainer>
      <ServerSidebar
        selectedNav={selectedNav}
        onSelectNav={handleSelectNav}
        onPreloadNav={handlePreloadNav}
      />
      <MainContent>
        {selectedNav === "courses" ||
        selectedNav === "arena" ||
        selectedNav === "home" ? (
          <>
            <LazyPane message="Kurslar yuklanmoqda...">
              <CourseSidebar
                onSelectCourse={setSelectedCourse}
                onOpenPremium={() =>
                  openPremiumUpgradeModal({ source: "courses-sidebar" })
                }
                viewMode={selectedNav === "arena" ? "arena" : viewMode}
                onToggleViewMode={setViewMode}
                selectedCourse={selectedCourse}
                activeArenaTab={activeArenaTab}
                setActiveArenaTab={setActiveArenaTab}
              />
            </LazyPane>
            {selectedNav === "arena" ||
            selectedNav === "home" ||
            viewMode === "arena" ? (
              <>
                {renderPaneDivider(true)}
                <ScrollPane $focused={isRightPaneFocused}>
                  <LazyPane message="Arena yuklanmoqda...">
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
                  </LazyPane>
                </ScrollPane>
              </>
            ) : (
              <>
                {renderPaneDivider(Boolean(selectedCourse))}
                <ContentPane
                  $focused={isRightPaneFocused}
                  data-tour="courses-content"
                >
                  <LazyPane message="Dars yuklanmoqda...">
                    <CoursePlayer
                      courseId={selectedCourse}
                      initialLessonSlug={initialLesson}
                      onClose={() => {
                        setSelectedCourse(null);
                        navigate("/courses");
                      }}
                    />
                  </LazyPane>
                </ContentPane>
              </>
            )}
          </>
        ) : selectedNav === "profile" ? (
          <LazyPane message="Profil yuklanmoqda...">
            <ProfilePage
              profileUserId={
                initialResourceId &&
                initialResourceId !== 0 &&
                initialResourceId !== "0"
                  ? String(initialResourceId)
                  : null
              }
              isFocused={isRightPaneFocused}
              onToggleFocus={() => setIsRightPaneFocused((prev) => !prev)}
            />
          </LazyPane>
        ) : selectedNav === "admin" ? (
          <LazyPane message="Admin panel yuklanmoqda...">
            <AdminPanel />
          </LazyPane>
        ) : selectedNav === "blogs" ? (
          <>
            {!isMobile || !selectedChatId || selectedChatId === "0" ? (
              <LazyPane message="Bloglar yuklanmoqda...">
                <BlogsSidebar selectedBlogId={selectedChatId} />
              </LazyPane>
            ) : null}
            {renderPaneDivider(
              Boolean(selectedChatId && selectedChatId !== "0"),
            )}
            <ContentPane $focused={isRightPaneFocused}>
              <LazyPane message="Blog yuklanmoqda...">
                <BlogReaderPane
                  blogIdentifier={selectedChatId}
                  onBack={() => {
                    setSelectedChatId(0);
                    navigate("/blogs");
                  }}
                />
              </LazyPane>
            </ContentPane>
          </>
        ) : selectedNav === "feed" ? (
          <LazyPane message="Lenta yuklanmoqda...">
            <FeedPage />
          </LazyPane>
        ) : (
          <>
            {!isMobile || !selectedChatId || selectedChatId === "0" ? (
              <LazyPane message="Chatlar yuklanmoqda...">
                <ChatsSidebar
                  selectedChatId={selectedChatId}
                  selectedNav={selectedNav}
                  chats={chats}
                  onOpenCreateGroup={() => setIsCreateGroupOpen(true)}
                  onOpenCreateMeet={() => setIsCreateMeetOpen(true)}
                />
              </LazyPane>
            ) : null}
            {renderPaneDivider(
              Boolean(selectedChatId && selectedChatId !== "0"),
            )}
            <ContentPane
              $focused={isRightPaneFocused}
              data-tour="chats-content"
            >
              {selectedChatId && selectedChatId !== "0" ? (
                <LazyPane message="Suhbat yuklanmoqda...">
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
                </LazyPane>
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
      {isCreateGroupOpen && (
        <LazyPane message="Dialog yuklanmoqda...">
          <CreateGroupDialog
            isOpen={isCreateGroupOpen}
            onClose={() => setIsCreateGroupOpen(false)}
            onCreate={handleCreateGroup}
            users={chats
              .filter((c) => c.type === "user" && !c.isSavedMessages)
              .map((c) => {
                const other = c.members?.find(
                  (m) =>
                    (m._id || m.id) !== (currentUser?._id || currentUser?.id),
                );
                return {
                  ...other,
                  id: other?._id || other?.id,
                  name: other?.nickname || other?.username || "Noma'lum",
                };
              })
              .filter((u) => u.id)}
          />
        </LazyPane>
      )}

      {isUpgradeModalOpen && (
        <LazyPane message="Premium oynasi yuklanmoqda...">
          <PremiumUpgradeModal
            isOpen={isUpgradeModalOpen}
            message={premiumUpgradeMessage}
            onClose={closePremiumUpgradeModal}
            onUpgrade={() => {
              closePremiumUpgradeModal();
              sessionStorage.setItem("profile_initial_tab", "premium");
              setSelectedNav("profile");
              setSelectedChatId(0);
              navigate("/profile");
            }}
          />
        </LazyPane>
      )}
      {isCreateMeetOpen && (
        <LazyPane message="Video qo‘ng‘iroq oynasi yuklanmoqda...">
          <UniversalDialog
            isOpen={isCreateMeetOpen}
            onClose={() => setIsCreateMeetOpen(false)}
            onCreateCall={async ({ title, isPrivate }) => {
              if (currentUser) {
                const isPremium = isPremiumUser(currentUser);
                const myMeets = await getMeets();
                const createdMeets = myMeets.filter(
                  (m) =>
                    m.creator === currentUser?._id ||
                    m.creator?._id === currentUser?._id,
                );
                const limit = isPremium
                  ? APP_LIMITS.meetsCreated.premium
                  : APP_LIMITS.meetsCreated.ordinary;

                if (createdMeets.length >= limit) {
                  setIsCreateMeetOpen(false);
                  openPremiumUpgradeModal({
                    message: t("premiumModal.meetCreateLimit", {
                      count: limit,
                    }),
                    source: "meet-create",
                  });
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
        </LazyPane>
      )}
      {isCoursesTourOpen && (
        <LazyPane message="Tour yuklanmoqda...">
          <FeatureTour
            isOpen={isCoursesTourOpen}
            onClose={() => setIsCoursesTourOpen(false)}
            storageKey="jamm-tour-courses-v1"
            steps={[
              {
                selector: '[data-tour="courses-search"]',
                title: t("featureTour.courses.searchTitle"),
                description: t("featureTour.courses.searchDescription"),
              },
              {
                selector: '[data-tour="courses-tabs"]',
                title: t("featureTour.courses.tabsTitle"),
                description: t("featureTour.courses.tabsDescription"),
              },
              {
                selector: '[data-tour="courses-create"]',
                title: t("featureTour.courses.createTitle"),
                description: t("featureTour.courses.createDescription"),
              },
              {
                selector: '[data-tour="courses-list"]',
                title: t("featureTour.courses.listTitle"),
                description: t("featureTour.courses.listDescription"),
              },
              {
                selector: '[data-tour="courses-content"]',
                title: t("featureTour.courses.contentTitle"),
                description: t("featureTour.courses.contentDescription"),
              },
            ]}
          />
        </LazyPane>
      )}
      {isChatsTourOpen && (
        <LazyPane message="Tour yuklanmoqda...">
          <FeatureTour
            isOpen={isChatsTourOpen}
            onClose={() => setIsChatsTourOpen(false)}
            storageKey="jamm-tour-chats-v1"
            onStepChange={(stepIndex) => {
              setSelectedChatId(0);
              if (stepIndex <= 2) {
                setSelectedNav("users");
                navigate("/users", { replace: true });
                return;
              }
              if (stepIndex === 3) {
                setSelectedNav("groups");
                navigate("/groups", { replace: true });
                return;
              }
              if (stepIndex === 4) {
                setSelectedNav("meets");
                navigate("/meets", { replace: true });
                return;
              }
              setSelectedNav("users");
              navigate("/users", { replace: true });
            }}
            steps={[
              {
                selector: '[data-tour="chats-search"]',
                title: t("featureTour.chats.searchTitle"),
                description: t("featureTour.chats.searchDescription"),
              },
              {
                selector: '[data-tour="chats-tabs"]',
                title: t("featureTour.chats.tabsTitle"),
                description: t("featureTour.chats.tabsDescription"),
              },
              {
                selector: '[data-tour="chats-tab-private"]',
                title: t("featureTour.chats.privateTabTitle"),
                description: t("featureTour.chats.privateTabDescription"),
              },
              {
                selector: '[data-tour="chats-tab-groups"]',
                title: t("featureTour.chats.groupsTabTitle"),
                description: t("featureTour.chats.groupsTabDescription"),
              },
              {
                selector: '[data-tour="chats-tab-video"]',
                title: t("featureTour.chats.videoTabTitle"),
                description: t("featureTour.chats.videoTabDescription"),
              },
              {
                selector: '[data-tour="chats-list"]',
                title: t("featureTour.chats.listTitle"),
                description: t("featureTour.chats.listDescription"),
              },
              {
                selector: '[data-tour="chats-content"]',
                title: t("featureTour.chats.contentTitle"),
                description: t("featureTour.chats.contentDescription"),
              },
            ]}
          />
        </LazyPane>
      )}
      {isProfileIntroTourOpen && (
        <LazyPane message="Tour yuklanmoqda...">
          <FeatureTour
            isOpen={isProfileIntroTourOpen}
            onClose={() => {
              sessionStorage.setItem("jamm-tour-profile-started", "done");
              setIsProfileIntroTourOpen(false);
            }}
            steps={[
              {
                selector: '[data-tour="nav-profile"]',
                title: t("featureTour.profile.entryTitle"),
                description: t("featureTour.profile.entryDescription"),
                onNext: async () => {
                  sessionStorage.setItem("jamm-tour-profile-autostart", "1");
                  sessionStorage.setItem("jamm-tour-profile-started", "done");
                  setIsProfileIntroTourOpen(false);
                  setSelectedNav("profile");
                  setSelectedChatId(0);
                  navigate("/profile");
                },
              },
            ]}
          />
        </LazyPane>
      )}
      {currentUser && currentUser.isOnboardingCompleted && (
        <InstallAppPrompt currentUser={currentUser} />
      )}
      {currentUser && !currentUser.isOnboardingCompleted && (
        <LazyPane message="Onboarding yuklanmoqda...">
          <OnboardingModal />
        </LazyPane>
      )}
    </AppContainer>
  );
};

export default JammLayout;
