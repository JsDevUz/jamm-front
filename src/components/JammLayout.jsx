import React, {
  Suspense,
  lazy,
  useState,
  useEffect,
  useRef,
  startTransition,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useChats } from "../contexts/ChatsContext";
import { SystemLoadingScreen } from "../app/components/SystemStateScreen";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { API_BASE_URL } from "../config/env";
import {
  AppContainer,
  ContentPane,
  EmptyPane,
  MainContent,
  NotificationPromptActions,
  NotificationPromptBanner,
  NotificationPromptButton,
  NotificationPromptDescription,
  NotificationPromptText,
  NotificationPromptTitle,
  PaneDivider,
  PaneDividerButton,
  ScrollPane,
} from "./JammLayout.styles";
import usePremiumUpgradeModalStore from "../app/store/usePremiumUpgradeModalStore";
import {
  getDesktopNotificationsBannerDismissed,
  getDesktopNotificationsEnabled,
  requestDesktopNotificationPermission,
  setDesktopNotificationsBannerDismissed,
} from "../utils/desktopNotifications";
import AppLockPinPad from "../app/components/AppLockPinPad";
import styled from "styled-components";

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
const ArticleReaderPane = lazy(() =>
  import("../features/articles/components").then((module) => ({
    default: module.ArticleReaderPane,
  })),
);
const ArticlesSidebar = lazy(() =>
  import("../features/articles/components").then((module) => ({
    default: module.ArticlesSidebar,
  })),
);
const CreateMeetDialog = lazy(() =>
  import("../features/calls/components").then((module) => ({
    default: module.CreateMeetDialog,
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

const APP_LOCK_ARMED_KEY = "jamm-app-lock-armed";
const APP_LOCK_SKIP_ONCE_KEY = "jamm-app-lock-skip-once";
const APP_UNLOCK_TOKEN_KEY = "jamm-app-unlock-token";
const APP_LOCK_CLEARED_EVENT = "jamm-app-lock-cleared";
const APP_LOCK_TOAST_SHOWN_KEY = "jamm-app-lock-toast-shown";

const LockFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const LockFooterLink = styled.button`
  border: none;
  background: transparent;
  color: var(--primary-color);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

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
  const [showNotificationPromptBanner, setShowNotificationPromptBanner] =
    useState(false);
  const [isCoursesTourOpen, setIsCoursesTourOpen] = useState(false);
  const [isChatsTourOpen, setIsChatsTourOpen] = useState(false);
  const [isAppLocked, setIsAppLocked] = useState(false);
  const [lockPin, setLockPin] = useState("");
  const [lockError, setLockError] = useState("");
  const [verifyingLock, setVerifyingLock] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const updateUser = useAuthStore((state) => state.updateUser);
  const {
    isOpen: isUpgradeModalOpen,
    message: premiumUpgradeMessage,
    openPremiumUpgradeModal,
    closePremiumUpgradeModal,
  } = usePremiumUpgradeModalStore();
  const mainContentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const shouldSkipLockOnce =
      sessionStorage.getItem(APP_LOCK_SKIP_ONCE_KEY) === "1";
    if (shouldSkipLockOnce && currentUser?._id && currentUser?.appLockEnabled) {
      sessionStorage.removeItem(APP_LOCK_SKIP_ONCE_KEY);
      sessionStorage.removeItem(APP_LOCK_ARMED_KEY);
      setIsAppLocked(false);
      setLockPin("");
      setLockError("");
      setVerifyingLock(false);
      return;
    }

    if (!currentUser?._id || !currentUser?.appLockEnabled) {
      sessionStorage.removeItem(APP_LOCK_ARMED_KEY);
      setIsAppLocked(false);
      setLockPin("");
      setLockError("");
      setVerifyingLock(false);
      return;
    }

    const shouldLock =
      sessionStorage.getItem(APP_LOCK_ARMED_KEY) === "1" ||
      currentUser?.appLockSessionUnlocked === false;
    setIsAppLocked(shouldLock);
    if (!shouldLock) {
      setLockPin("");
      setLockError("");
      setVerifyingLock(false);
    }
  }, [
    currentUser?._id,
    currentUser?.appLockEnabled,
    currentUser?.appLockSessionUnlocked,
  ]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !currentUser?._id ||
      !currentUser?.appLockEnabled
    ) {
      return;
    }

    const dismissActiveKeyboard = () => {
      const activeElement = document.activeElement;

      if (
        activeElement &&
        typeof activeElement.blur === "function" &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable)
      ) {
        activeElement.blur();
      }
    };

    const armAppLock = () => {
      if (sessionStorage.getItem(APP_LOCK_SKIP_ONCE_KEY) === "1") {
        sessionStorage.removeItem(APP_LOCK_ARMED_KEY);
        return;
      }
      dismissActiveKeyboard();
      sessionStorage.setItem(APP_LOCK_ARMED_KEY, "1");
      sessionStorage.removeItem(APP_UNLOCK_TOKEN_KEY);
      updateUser({ appLockSessionUnlocked: false });
      fetch(`${API_BASE_URL}/users/me/app-lock/lock-session`, {
        method: "POST",
        credentials: "include",
        keepalive: true,
      }).catch(() => {});
      setIsAppLocked(true);
      setLockPin("");
      setLockError("");
      setVerifyingLock(false);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        armAppLock();
      }
    };

    window.addEventListener("pagehide", armAppLock);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pagehide", armAppLock);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentUser?._id, currentUser?.appLockEnabled, updateUser]);

  useEffect(() => {
    if (!isAppLocked || typeof document === "undefined") {
      return;
    }

    const activeElement = document.activeElement;

    if (
      activeElement &&
      typeof activeElement.blur === "function" &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable)
    ) {
      activeElement.blur();
    }
  }, [isAppLocked]);

  useEffect(() => {
    if (!isAppLocked || lockPin.length !== 4 || verifyingLock) {
      return;
    }

    const timer = window.setTimeout(async () => {
      setVerifyingLock(true);
      setLockError("");

      try {
        const { data } = await axiosInstance.post("/users/me/app-lock/verify", {
          pin: lockPin,
        });

        if (!data?.valid) {
          setLockPin("");
          setLockError(t("profileUtility.security.invalidPin"));
          setVerifyingLock(false);
          return;
        }

        sessionStorage.removeItem(APP_LOCK_ARMED_KEY);
        sessionStorage.removeItem(APP_LOCK_TOAST_SHOWN_KEY);
        if (data?.unlockToken) {
          sessionStorage.setItem(APP_UNLOCK_TOKEN_KEY, data.unlockToken);
        }
        updateUser({ appLockSessionUnlocked: true });
        setIsAppLocked(false);
        setLockPin("");
        setLockError("");
        setVerifyingLock(false);
        window.dispatchEvent(new CustomEvent(APP_LOCK_CLEARED_EVENT));
      } catch {
        setLockPin("");
        setLockError(t("profileUtility.security.invalidPin"));
        setVerifyingLock(false);
      }
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isAppLocked, lockPin, t, updateUser, verifyingLock]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof Notification === "undefined") {
      return;
    }

    if (!getDesktopNotificationsEnabled()) {
      return;
    }

    if (Notification.permission !== "default") {
      return;
    }

    requestDesktopNotificationPermission().catch(() => {});
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof Notification === "undefined") {
      return;
    }

    const shouldShowBanner =
      getDesktopNotificationsEnabled() &&
      Notification.permission === "default" &&
      !getDesktopNotificationsBannerDismissed();

    setShowNotificationPromptBanner(shouldShowBanner);
  }, []);

  const handleEnableNotifications = async () => {
    const permission = await requestDesktopNotificationPermission();

    if (permission === "granted") {
      setDesktopNotificationsBannerDismissed(true);
      setShowNotificationPromptBanner(false);
      return;
    }

    if (permission === "denied") {
      setDesktopNotificationsBannerDismissed(true);
      setShowNotificationPromptBanner(false);
    }
  };

  const handleDismissNotificationBanner = () => {
    setDesktopNotificationsBannerDismissed(true);
    setShowNotificationPromptBanner(false);
  };

  const handleLockDigit = (digit) => {
    setLockPin((currentValue) => {
      if (verifyingLock || currentValue.length >= 4) {
        return currentValue;
      }

      return `${currentValue}${digit}`;
    });
    setLockError("");
  };

  const handleLockBackspace = () => {
    setLockPin((currentValue) => currentValue.slice(0, -1));
    setLockError("");
  };

  const handleLockedLogout = async () => {
    sessionStorage.removeItem(APP_LOCK_ARMED_KEY);
    sessionStorage.removeItem(APP_UNLOCK_TOKEN_KEY);
    sessionStorage.removeItem(APP_LOCK_TOAST_SHOWN_KEY);
    setIsAppLocked(false);
    setLockPin("");
    setLockError("");
    setVerifyingLock(false);
    window.dispatchEvent(new CustomEvent(APP_LOCK_CLEARED_EVENT));
    await logout();
  };

  useEffect(() => {
    const handleAppLockRequired = () => {
      if (isAppLocked && currentUser?.appLockSessionUnlocked === false) {
        return;
      }

      setIsAppLocked(true);
      setLockPin("");
      setLockError("");
      setVerifyingLock(false);
      updateUser({ appLockSessionUnlocked: false });
    };

    window.addEventListener("jamm-app-lock-required", handleAppLockRequired);
    return () => {
      window.removeEventListener(
        "jamm-app-lock-required",
        handleAppLockRequired,
      );
    };
  }, [currentUser?.appLockSessionUnlocked, isAppLocked, updateUser]);

  useEffect(() => {
    setIsRightPaneFocused(false);
  }, [selectedNav, selectedChatId, selectedCourse, activeArenaTab, isMobile]);

  useEffect(() => {
    if (selectedNav !== "courses" || viewMode !== "courses") return;
    if (sessionStorage.getItem("jamm-tour-manual-sequence") !== "courses")
      return;

    const timer = window.setTimeout(() => {
      setIsCoursesTourOpen(true);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [selectedNav, viewMode]);

  useEffect(() => {
    if (!["chats", "users", "groups"].includes(selectedNav)) return;
    if (selectedChatId && selectedChatId !== "0" && selectedChatId !== 0)
      return;
    if (sessionStorage.getItem("jamm-tour-manual-sequence") !== "chats")
      return;

    const timer = window.setTimeout(() => {
      setIsChatsTourOpen(true);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [selectedNav, selectedChatId]);

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
    } else if (initialNav === "meets") {
      if (selectedNav !== "users") setSelectedNav("users");
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
    articles: () => import("../features/articles/components"),
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

  useEffect(() => {
    if (selectedNav !== "meets") return;

    setSelectedNav("users");
    setSelectedChatId(0);
    navigate("/users", { replace: true });
  }, [navigate, selectedNav, setSelectedChatId, setSelectedNav]);

  useEffect(() => {
    if (!isMobile || typeof window === "undefined") return;

    const hasChatDetailOpen =
      ["chats", "users", "groups"].includes(selectedNav) &&
      selectedChatId &&
      selectedChatId !== "0" &&
      selectedChatId !== 0;
    const hasCourseDetailOpen =
      selectedNav === "courses" && viewMode === "courses" && selectedCourse;
    const hasBlockingOverlay =
      isCreateGroupOpen ||
      isCreateMeetOpen ||
      isUpgradeModalOpen ||
      isCoursesTourOpen ||
      isChatsTourOpen ||
      (currentUser && !currentUser.isOnboardingCompleted);

    if (hasChatDetailOpen || hasCourseDetailOpen || hasBlockingOverlay) {
      return;
    }

    const element = mainContentRef.current;
    if (!element) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const navigateChatTabs = (direction) => {
      const orderedTabs = ["users", "groups"];
      const currentTab = selectedNav === "groups" ? "groups" : "users";
      const currentIndex = orderedTabs.indexOf(currentTab);
      const nextIndex = currentIndex + direction;

      if (nextIndex < 0 || nextIndex >= orderedTabs.length) return;

      const nextTab = orderedTabs[nextIndex];
      setSelectedNav(nextTab);
      setSelectedChatId(0);
      navigate(`/${nextTab}`);
    };

    const navigateCourseTabs = (direction) => {
      if (direction > 0 && viewMode === "courses") {
        setViewMode("arena");
        setSelectedNav("arena");
        setActiveArenaTab(null);
        navigate("/arena");
        return;
      }

      if (direction < 0 && (selectedNav === "arena" || viewMode === "arena")) {
        setViewMode("courses");
        setSelectedNav("courses");
        navigate("/courses");
      }
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) return;

      const target =
        event.target instanceof Element ? event.target : event.target?.parentElement;
      if (
        target &&
        target.closest(
          "[data-disable-layout-swipe], [data-classic-flashcard-fullscreen]",
        )
      ) {
        tracking = false;
        return;
      }
      if (
        target &&
        target.closest("input, textarea, button, [role='button'], [contenteditable='true']")
      ) {
        tracking = false;
        return;
      }

      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = true;
    };

    const handleTouchEnd = (event) => {
      if (!tracking || event.changedTouches.length !== 1) return;
      tracking = false;

      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) < 70 || Math.abs(deltaY) > 50) return;
      if (Math.abs(deltaX) < Math.abs(deltaY)) return;

      const direction = deltaX < 0 ? 1 : -1;

      if (["chats", "users", "groups"].includes(selectedNav)) {
        navigateChatTabs(direction);
        return;
      }

      if (selectedNav === "courses" || selectedNav === "arena") {
        navigateCourseTabs(direction);
      }
    };

    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    currentUser,
    isChatsTourOpen,
    isCoursesTourOpen,
    isCreateGroupOpen,
    isCreateMeetOpen,
    isMobile,
    isUpgradeModalOpen,
    navigate,
    selectedChatId,
    selectedCourse,
    selectedNav,
    setSelectedChatId,
    setSelectedNav,
    viewMode,
  ]);

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
      throw error;
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
    <>
      <AppLockPinPad
        open={Boolean(
          currentUser?._id && currentUser?.appLockEnabled && isAppLocked,
        )}
        title={t("profileUtility.security.unlockTitle")}
        description={t("profileUtility.security.unlockDescription")}
        valueLength={lockPin.length}
        error={lockError}
        loading={verifyingLock}
        allowClose={false}
        onDigit={handleLockDigit}
        onBackspace={handleLockBackspace}
        footer={
          <LockFooter>
            <span>{t("profileUtility.security.forgotHelp")}</span>
            <LockFooterLink type="button" onClick={handleLockedLogout}>
              {t("profileUtility.security.logoutAction")}
            </LockFooterLink>
          </LockFooter>
        }
      />
      <AppContainer>
      {showNotificationPromptBanner && (
        <NotificationPromptBanner>
          <NotificationPromptText>
            <NotificationPromptTitle>
              Yangi xabarlar haqida bildirishnoma yoqilsinmi?
            </NotificationPromptTitle>
            <NotificationPromptDescription>
              Boshqa chatda yoki boshqa ilovada bo‘lsangiz ham yangi xabarni
              darrov ko‘rasiz.
            </NotificationPromptDescription>
          </NotificationPromptText>
          <NotificationPromptActions>
            <NotificationPromptButton
              type="button"
              $secondary
              onClick={handleDismissNotificationBanner}
            >
              Keyinroq
            </NotificationPromptButton>
            <NotificationPromptButton
              type="button"
              onClick={handleEnableNotifications}
            >
              Yoqish
            </NotificationPromptButton>
          </NotificationPromptActions>
        </NotificationPromptBanner>
      )}
      <ServerSidebar
        selectedNav={selectedNav}
        onSelectNav={handleSelectNav}
        onPreloadNav={handlePreloadNav}
      />
      <MainContent ref={mainContentRef}>
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
        ) : selectedNav === "articles" ? (
          <>
            {!isMobile || !selectedChatId || selectedChatId === "0" ? (
              <LazyPane message="Maqolalar yuklanmoqda...">
                <ArticlesSidebar selectedArticleId={selectedChatId} />
              </LazyPane>
            ) : null}
            {renderPaneDivider(
              Boolean(selectedChatId && selectedChatId !== "0"),
            )}
            <ContentPane $focused={isRightPaneFocused}>
              <LazyPane message="Maqola yuklanmoqda...">
                <ArticleReaderPane
                  articleIdentifier={selectedChatId}
                  onBack={() => {
                    setSelectedChatId(0);
                    navigate("/articles");
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
                  {t("layout.selectChat")}
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
          <CreateMeetDialog
            isOpen={isCreateMeetOpen}
            onClose={() => setIsCreateMeetOpen(false)}
            onStart={(roomId) => {
              setIsCreateMeetOpen(false);
              navigate(`/join/${roomId}`);
            }}
          />
        </LazyPane>
      )}
      {isCoursesTourOpen && (
        <LazyPane message="Tour yuklanmoqda...">
          <FeatureTour
            isOpen={isCoursesTourOpen}
            onClose={() => {
              setIsCoursesTourOpen(false);

              if (sessionStorage.getItem("jamm-tour-manual-sequence") === "courses") {
                sessionStorage.setItem("jamm-tour-manual-sequence", "chats");
                setSelectedNav("users");
                setSelectedChatId(0);
                navigate("/users");
              }
            }}
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
            onClose={() => {
              setIsChatsTourOpen(false);
              if (sessionStorage.getItem("jamm-tour-manual-sequence") === "chats") {
                sessionStorage.removeItem("jamm-tour-manual-sequence");
              }
            }}
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
      {currentUser && currentUser.isOnboardingCompleted && (
        <InstallAppPrompt currentUser={currentUser} />
      )}
      {currentUser && !currentUser.isOnboardingCompleted && (
        <LazyPane message="Onboarding yuklanmoqda...">
          <OnboardingModal />
        </LazyPane>
      )}
    </AppContainer>
    </>
  );
};

export default JammLayout;
