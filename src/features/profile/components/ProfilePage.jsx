import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  Lock,
  MessageSquare,
  Palette,
  Settings,
  Shield,
  Sparkles,
  UserCheck,
  UserPlus,
} from "lucide-react";
import useAuthStore from "../../../store/authStore";
import { usePosts } from "../../../contexts/PostsContext";
import { useCourses } from "../../../contexts/CoursesContext";
import { fetchUserArticles as fetchProfileArticles } from "../../../api/articlesApi";
import NewProfileModal from "../../courses/components/NewProfileModal";
import NewSettingsModal from "../../courses/components/NewSettingsModal";
import ProfileEditDialog from "./ProfileEditDialog";
import ProfileUtilityPanel from "./ProfileUtilityPanel";
import {
  getCourseMemberStatus,
  getCourseNavigationPath,
} from "../../courses/utils/courseNavigation";

function formatDate(value) {
  if (!value) return "Yaqinda";
  try {
    return new Date(value).toLocaleDateString("uz-UZ");
  } catch {
    return "Yaqinda";
  }
}

function getPublishedLessons(course) {
  return Array.isArray(course?.lessons)
    ? course.lessons.filter((lesson) => (lesson?.status || "published") !== "draft")
    : [];
}

const ProfilePage = ({ profileUserId, onClose }) => {
  const MODAL_CLOSE_DURATION = 180;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { userPosts, fetchUserPosts, getPublicProfile, toggleFollow } = usePosts();
  const { courses } = useCourses();
  const [targetUser, setTargetUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [isAccountSettingsClosing, setIsAccountSettingsClosing] = useState(false);
  const [isAccountMobilePanelOpen, setIsAccountMobilePanelOpen] = useState(false);
  const [accountSettingsSection, setAccountSettingsSection] = useState("my-account");
  const [profileArticles, setProfileArticles] = useState([]);
  const [profileArticlesLoading, setProfileArticlesLoading] = useState(false);
  const [activeTabId, setActiveTabId] = useState("posts");
  const [visibleCounts, setVisibleCounts] = useState({
    posts: 8,
    articles: 8,
    courses: 8,
  });
  const [isLoadingMoreItems, setIsLoadingMoreItems] = useState(false);
  const loadMoreTimerRef = useRef(null);

  const currentUserId = currentUser?._id || currentUser?.id || "";
  const isOwnProfile =
    !profileUserId || String(profileUserId) === String(currentUserId);

  useEffect(() => {
    let cancelled = false;

    if (isOwnProfile) {
      setTargetUser(currentUser || null);
      return () => {
        cancelled = true;
      };
    }

    if (!profileUserId) {
      setTargetUser(null);
      return () => {
        cancelled = true;
      };
    }

    getPublicProfile(profileUserId).then((profile) => {
      if (!cancelled) {
        setTargetUser(profile || null);
        setIsFollowing(Boolean(profile?.isFollowing));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [currentUser, getPublicProfile, isOwnProfile, profileUserId]);

  useEffect(() => {
    const identifier = isOwnProfile ? currentUserId : profileUserId;
    if (!identifier) return;
    fetchUserPosts(identifier);
  }, [currentUserId, fetchUserPosts, isOwnProfile, profileUserId]);

  useEffect(() => {
    const identifier =
      targetUser?.username ||
      targetUser?.nickname ||
      targetUser?.jammId ||
      targetUser?._id ||
      targetUser?.id ||
      profileUserId ||
      currentUserId;
    if (!identifier) return;

    let cancelled = false;
    setProfileArticlesLoading(true);
    fetchProfileArticles(identifier)
      .then((items) => {
        if (!cancelled) {
          setProfileArticles(Array.isArray(items) ? items : []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProfileArticles([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setProfileArticlesLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    currentUserId,
    profileUserId,
    targetUser?._id,
    targetUser?.id,
    targetUser?.jammId,
    targetUser?.nickname,
    targetUser?.username,
  ]);

  useEffect(
    () => () => {
      window.clearTimeout(loadMoreTimerRef.current);
    },
    [],
  );

  const targetUserId = targetUser?._id || targetUser?.id || "";
  const displayName =
    targetUser?.nickname || targetUser?.username || targetUser?.name || "Foydalanuvchi";
  const avatarLetter = String(displayName || "J").charAt(0).toUpperCase();
  const userCourses = useMemo(
    () =>
      courses.filter((course) => {
        const createdBy =
          typeof course?.createdBy === "string"
            ? course.createdBy
            : course?.createdBy?._id || course?.createdBy?.id;
        return String(createdBy || "") === String(targetUserId || "");
      }),
    [courses, targetUserId],
  );

  const profileTabs = useMemo(
    () => [
      {
        id: "posts",
        label: "Gurunglar",
        title: "Yaratilgan gurunglaringiz",
        description:
          "Profilga tegishli gurunglar pastga scroll qilingan sari ko'proq ko'rinadi.",
        items: userPosts,
      },
      {
        id: "articles",
        label: "Maqolalar",
        title: "Yozgan maqolalar",
        description: "Profilga tegishli maqolalar ro'yxati shu yerda ko'rinadi.",
        items: profileArticles,
      },
      {
        id: "courses",
        label: "Darslar",
        title: "Darslar va kurslar",
        description: "Yaratilgan kurslar shu yerda ketma-ket ko'rinadi.",
        items: userCourses,
      },
    ],
    [profileArticles, userCourses, userPosts],
  );

  const activeProfileTab =
    profileTabs.find((tab) => tab.id === activeTabId) || profileTabs[0];
  const activeItems = activeProfileTab.items || [];
  const activeVisibleCount = visibleCounts[activeProfileTab.id] || 8;
  const visibleItems = activeItems.slice(0, activeVisibleCount);
  const hasMoreVisibleItems = activeVisibleCount < activeItems.length;

  const handleListScroll = useCallback(
    (event) => {
      const target = event.currentTarget;
      const remaining = target.scrollHeight - target.scrollTop - target.clientHeight;
      if (remaining > 160 || !hasMoreVisibleItems || isLoadingMoreItems) return;

      setIsLoadingMoreItems(true);
      window.clearTimeout(loadMoreTimerRef.current);
      loadMoreTimerRef.current = window.setTimeout(() => {
        setVisibleCounts((prev) => ({
          ...prev,
          [activeProfileTab.id]: Math.min(
            (prev[activeProfileTab.id] || 8) + 8,
            activeItems.length,
          ),
        }));
        setIsLoadingMoreItems(false);
      }, 420);
    },
    [
      activeItems.length,
      activeProfileTab.id,
      hasMoreVisibleItems,
      isLoadingMoreItems,
    ],
  );

  const closeProfile = useCallback(() => {
    if (onClose) {
      onClose();
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/courses");
  }, [navigate, onClose]);

  const handleDirectMessage = useCallback(() => {
    const targetSlug = targetUser?.jammId || targetUser?._id || targetUser?.id;
    if (!targetSlug) return;
    navigate(`/a/${targetSlug}`);
  }, [navigate, targetUser?._id, targetUser?.id, targetUser?.jammId]);

  const handleToggleFollow = useCallback(async () => {
    const targetId = profileUserId || targetUser?.jammId || targetUser?._id || targetUser?.id;
    if (!targetId) return;
    const result = await toggleFollow(targetId);
    if (!result) return;
    setIsFollowing(Boolean(result.following));
    setTargetUser((prev) =>
      prev
        ? {
            ...prev,
            isFollowing: Boolean(result.following),
            followersCount: result.followersCount,
          }
        : prev,
    );
  }, [
    profileUserId,
    targetUser?._id,
    targetUser?.id,
    targetUser?.jammId,
    toggleFollow,
  ]);

  const profileActions = useMemo(() => {
    if (isOwnProfile) return [];

    return [
      {
        id: "message",
        label: "Xabar yozish",
        icon: MessageSquare,
        onClick: handleDirectMessage,
      },
      {
        id: "follow",
        label: isFollowing ? "Obunasiz" : "Obuna bo'lish",
        icon: isFollowing ? UserCheck : UserPlus,
        primary: !isFollowing,
        onClick: handleToggleFollow,
      },
    ];
  }, [handleDirectMessage, handleToggleFollow, isFollowing, isOwnProfile]);

  const settingsMenuItems = useMemo(
    () => [
      { id: "my-account", label: "My Account", icon: Settings },
      { id: "appearance", label: t("profile.tabs.appearance"), icon: Palette },
      { id: "language", label: t("profile.tabs.language"), icon: Globe },
      { id: "security", label: t("profile.tabs.security"), icon: Lock },
      { id: "premium", label: t("profile.tabs.premium"), icon: Shield },
      { id: "support", label: t("profile.tabs.support"), icon: Headphones },
      { id: "favorites", label: t("profile.tabs.favorites"), icon: Heart },
      { id: "learn", label: t("profile.tabs.learn"), icon: Sparkles },
    ],
    [t],
  );

  const openAccountSettings = useCallback(() => {
    setIsAccountSettingsClosing(false);
    setIsAccountSettingsOpen(true);
    setIsAccountMobilePanelOpen(false);
  }, []);

  const closeAccountSettings = useCallback(() => {
    setIsAccountSettingsClosing(true);
    window.setTimeout(() => {
      setIsAccountSettingsOpen(false);
      setIsAccountSettingsClosing(false);
      setIsAccountMobilePanelOpen(false);
    }, MODAL_CLOSE_DURATION);
  }, []);

  const renderSettingsContent = () => {
    if (accountSettingsSection !== "my-account") {
      return (
        <ProfileUtilityPanel
          section={accountSettingsSection}
          currentUser={currentUser}
          onBack={() => setAccountSettingsSection("my-account")}
          embedded
        />
      );
    }

    return (
      <div style={{ display: "grid", gap: 14 }}>
        <div
          style={{
            border: "1px solid var(--border-color)",
            borderRadius: 18,
            padding: 16,
            background: "var(--secondary-color)",
            display: "grid",
            gap: 12,
          }}
        >
          <strong style={{ color: "var(--text-color)", fontSize: 18 }}>
            {displayName}
          </strong>
          <span style={{ color: "var(--text-muted-color)", fontSize: 13 }}>
            @{currentUser?.username || currentUser?.nickname || "jamm-user"}
          </span>
          <button
            type="button"
            onClick={() => setIsProfileEditOpen(true)}
            style={{
              justifySelf: "start",
              minHeight: 38,
              padding: "0 14px",
              border: "none",
              borderRadius: 10,
              background: "var(--primary-color)",
              color: "#fff",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Edit User Profile
          </button>
        </div>
      </div>
    );
  };

  if (!currentUser || !targetUser) return null;

  return (
    <>
      <NewProfileModal
        open
        currentUser={targetUser}
        displayName={displayName}
        avatarLetter={avatarLetter}
        createdAtLabel={formatDate(targetUser.createdAt)}
        isCeoUser={targetUser?.officialBadgeKey === "ceo"}
        profileTabs={profileTabs}
        activeProfileTab={activeProfileTab}
        profileArticlesLoading={profileArticlesLoading}
        visibleItems={visibleItems}
        hasMoreVisibleItems={hasMoreVisibleItems}
        isLoadingMoreItems={isLoadingMoreItems}
        currentUserId={currentUserId}
        showSettingsButton={isOwnProfile}
        onOpenAccountSettings={openAccountSettings}
        profileActions={profileActions}
        showTeacherAction={Boolean(targetUser?.isInstructor)}
        showAdminAction={isOwnProfile && targetUser?.officialBadgeKey === "ceo"}
        onClose={closeProfile}
        onSetTab={setActiveTabId}
        onListScroll={handleListScroll}
        onNavigate={(path) => navigate(path)}
        onCourseNavigate={(course) => {
          navigate(getCourseNavigationPath(course, currentUserId));
        }}
        getPublishedLessons={getPublishedLessons}
        getMemberStatus={getCourseMemberStatus}
        formatCreatedDate={formatDate}
      />
      <NewSettingsModal
        open={isOwnProfile && isAccountSettingsOpen}
        closing={isAccountSettingsClosing}
        currentUser={currentUser}
        displayName={currentUser?.nickname || currentUser?.username || "User"}
        avatarLetter={String(currentUser?.nickname || currentUser?.username || "U")
          .charAt(0)
          .toUpperCase()}
        settingsMenuItems={settingsMenuItems}
        accountSettingsSection={accountSettingsSection}
        isAccountMobilePanelOpen={isAccountMobilePanelOpen}
        content={renderSettingsContent()}
        onClose={closeAccountSettings}
        onSectionSelect={(sectionId) => {
          setAccountSettingsSection(sectionId);
          setIsAccountMobilePanelOpen(true);
        }}
        onBackMobile={() => setIsAccountMobilePanelOpen(false)}
        onLogout={() => logout()}
      />
      <ProfileEditDialog
        isOpen={isOwnProfile && isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
      />
    </>
  );
};

export default ProfilePage;
