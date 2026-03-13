import React, { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../../store/authStore";
import { usePosts } from "../../../contexts/PostsContext";
import { useCourses } from "../../../contexts/CoursesContext";
import { useNavigate } from "react-router-dom";
import { fetchUserBlogs as fetchProfileBlogs } from "../../../api/blogsApi";
import {
  ProfileBlogsPanel,
  ProfileEditDialog,
  ProfileUtilityPanel,
} from ".";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import { CreatePostDialog } from "../../posts/components";
import {
  ProfileCoursesPane,
  ProfilePostsPane,
  ProfileSidebar,
} from ".";
import { renderInlineMarkup } from "../../../shared/utils/renderInlineMarkup";
import {
  PaneDivider,
  PaneDividerButton,
  ProfileContainer,
  RightPanel,
} from "../styles/ProfilePage.styles";
import FeatureTour from "../../../app/components/tours/FeatureTour";

const ProfilePage = ({ profileUserId, isFocused = false, onToggleFocus }) => {
  const { t } = useTranslation();
  const currentUser = useAuthStore((state) => state.user);
  const {
    userPosts,
    fetchUserPosts,
    createPost,
    editPost,
    deletePost,
    likePost,
    getPublicProfile,
    toggleFollow,
  } = usePosts();
  const { courses } = useCourses();
  const navigate = useNavigate();
  const isRestoringHistoryRef = useRef(false);
  const previousActiveTabRef = useRef(null);

  const isMobile = window.innerWidth <= 768;
  const [activeTab, setActiveTab] = useState(() => {
    const storedTab = sessionStorage.getItem("profile_initial_tab");
    if (storedTab) {
      sessionStorage.removeItem("profile_initial_tab");
      return storedTab;
    }
    return isMobile ? null : "groups";
  });
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [blogCount, setBlogCount] = useState(0);
  const [editingPost, setEditingPost] = useState(null);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isProfileTourOpen, setIsProfileTourOpen] = useState(false);

  const myId = currentUser?._id || currentUser?.id;
  const isOwnProfile = !profileUserId || profileUserId === myId;

  useEffect(() => {
    if (isOwnProfile) {
      if (myId) fetchUserPosts(myId);
      return;
    }

    getPublicProfile(profileUserId).then((profile) => {
      if (profile) {
        setOtherUser(profile);
        setIsFollowing(profile.isFollowing);
      }
    });
    fetchUserPosts(profileUserId);
  }, [profileUserId, myId, isOwnProfile, fetchUserPosts, getPublicProfile]);

  useEffect(() => {
    const identifier = isOwnProfile ? myId : profileUserId;
    if (!identifier) {
      setBlogCount(0);
      return;
    }

    fetchProfileBlogs(identifier)
      .then((items) => setBlogCount(items?.length || 0))
      .catch(() => setBlogCount(0));
  }, [isOwnProfile, myId, profileUserId]);

  useEffect(() => {
    if (!isOwnProfile) return undefined;

    const handleStartGuidedTour = () => {
      sessionStorage.setItem("jamm-tour-manual-sequence", "profile");
      setActiveTab(null);
      setIsProfileEditOpen(false);
      setIsProfileTourOpen(true);
    };

    window.addEventListener("jamm:start-guided-tour", handleStartGuidedTour);
    return () => {
      window.removeEventListener("jamm:start-guided-tour", handleStartGuidedTour);
    };
  }, [isOwnProfile]);

  useEffect(() => {
    const handlePopState = () => {
      const nextTab = window.history.state?.profilePaneTab || null;
      isRestoringHistoryRef.current = true;
      setActiveTab(nextTab);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const previousTab = previousActiveTabRef.current;

    if (isRestoringHistoryRef.current) {
      previousActiveTabRef.current = activeTab;
      isRestoringHistoryRef.current = false;
      return;
    }

    if (!activeTab) {
      previousActiveTabRef.current = null;
      if (window.history.state?.profilePaneTab) {
        window.history.replaceState(
          { ...window.history.state, profilePaneTab: null },
          "",
          window.location.href,
        );
      }
      return;
    }

    const nextState = {
      ...(window.history.state || {}),
      profilePaneTab: activeTab,
    };

    if (!previousTab) {
      window.history.pushState(nextState, "", window.location.href);
    } else {
      window.history.replaceState(nextState, "", window.location.href);
    }

    previousActiveTabRef.current = activeTab;
  }, [activeTab]);

  const handlePaneBack = () => {
    if (window.history.state?.profilePaneTab) {
      window.history.back();
      return;
    }

    setActiveTab(null);
  };

  const handleCreatePost = async (text) => {
    await createPost(text);
    if (myId) fetchUserPosts(myId);
  };

  const handleEditPost = async (text) => {
    if (!editingPost?._id) return;
    await editPost(editingPost._id, text);
    setEditingPost(null);
  };

  const handleDeletePost = async () => {
    if (!postToDelete?._id) return;
    await deletePost(postToDelete._id);
    setPostToDelete(null);
  };

  const handleToggleFollow = async () => {
    const result = await toggleFollow(profileUserId);
    if (!result) return;
    setIsFollowing(result.following);
    setOtherUser((prev) =>
      prev ? { ...prev, followersCount: result.followersCount } : prev,
    );
  };

  const targetUser = useMemo(() => {
    if (isOwnProfile) return currentUser;
    return otherUser;
  }, [currentUser, isOwnProfile, otherUser]);

  const userCourses = useMemo(() => {
    if (!targetUser) return [];

    return courses.filter((course) => {
      if (!course?.createdBy) return false;
      const createdBy =
        typeof course.createdBy === "string"
          ? course.createdBy
          : course.createdBy._id || course.createdBy.id;
      return String(createdBy) === String(targetUser._id || targetUser.id);
    });
  }, [courses, targetUser]);

  if (!currentUser) return null;
  if (!isOwnProfile && !otherUser) return null;
  if (!targetUser) return null;

  const displayName =
    targetUser.nickname || targetUser.username || "Foydalanuvchi";
  const isPremium = targetUser.premiumStatus === "active";
  const userAvatar = isOwnProfile ? currentUser.avatar : targetUser.avatar;

  return (
    <ProfileContainer>
      <ProfileSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        targetUser={targetUser}
        isOwnProfile={isOwnProfile}
        isFollowing={isFollowing}
        blogCount={blogCount}
        postCount={userPosts.length}
        courseCount={userCourses.length}
        onToggleFollow={handleToggleFollow}
        onOpenProfileEdit={() => setIsProfileEditOpen(true)}
        onOpenDirectMessage={() => {
          const targetSlug = targetUser.jammId || targetUser._id;
          navigate(`/a/${targetSlug}`);
        }}
      />

      {activeTab ? (
        <PaneDivider $focused={isFocused}>
          <PaneDividerButton
            type="button"
            onClick={onToggleFocus}
            title={isFocused ? t("layout.minimizePane") : t("layout.maximizePane")}
            aria-label={isFocused ? t("layout.minimizePane") : t("layout.maximizePane")}
          >
            {isFocused ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </PaneDividerButton>
        </PaneDivider>
      ) : null}

      <RightPanel $visible={Boolean(activeTab)} $focused={isFocused}>
        {activeTab === "groups" ? (
          <ProfilePostsPane
            posts={userPosts}
            isOwnProfile={isOwnProfile}
            userAvatar={userAvatar}
            displayName={displayName}
            isPremium={isPremium}
            formatTime={(iso) => dayjs(iso).format("D-MMM · HH:mm")}
            renderText={renderInlineMarkup}
            likePost={likePost}
            onEditPost={setEditingPost}
            onDeletePost={setPostToDelete}
            onCreatePost={() => setIsCreatePostOpen(true)}
            onBack={handlePaneBack}
          />
        ) : null}

        {activeTab === "courses" ? (
          <ProfileCoursesPane
            courses={userCourses}
            onBack={handlePaneBack}
            onOpenCourse={(course) =>
              navigate(`/courses/${course.urlSlug || course.id || course._id}`)
            }
          />
        ) : null}

        {activeTab === "blogs" ? (
          <ProfileBlogsPanel
            profileUser={targetUser}
            profileUserId={profileUserId}
            isOwnProfile={isOwnProfile}
            onBack={handlePaneBack}
            onCountChange={setBlogCount}
          />
        ) : null}

        {isOwnProfile &&
        ["appearance", "language", "security", "premium", "support", "favorites", "learn"].includes(
          activeTab,
        ) ? (
          <ProfileUtilityPanel
            section={activeTab}
            currentUser={currentUser}
            onBack={handlePaneBack}
          />
        ) : null}
      </RightPanel>

      <CreatePostDialog
        isOpen={isCreatePostOpen || Boolean(editingPost)}
        onClose={() => {
          setIsCreatePostOpen(false);
          setEditingPost(null);
        }}
        onSubmit={editingPost ? handleEditPost : handleCreatePost}
        currentUser={currentUser}
        initialContent={editingPost?.content || ""}
        title={editingPost ? "Gurungni tahrirlash" : "Yangi Gurung"}
        submitLabel={editingPost ? "Saqlash" : "Yuborish"}
      />

      <ProfileEditDialog
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
      />

      <ConfirmDialog
        isOpen={Boolean(postToDelete)}
        onClose={() => setPostToDelete(null)}
        title="Gurungni o'chirish"
        description="Bu gurung o'chirilsa, uni qayta tiklab bo'lmaydi."
        confirmText="O'chirish"
        cancelText="Bekor qilish"
        onConfirm={handleDeletePost}
        isDanger
      />

      <FeatureTour
        isOpen={isProfileTourOpen}
        onClose={() => {
          setIsProfileTourOpen(false);
          setIsProfileEditOpen(false);
          if (sessionStorage.getItem("jamm-tour-manual-sequence") === "profile") {
            sessionStorage.setItem("jamm-tour-manual-sequence", "courses");
            navigate("/courses");
          }
        }}
        storageKey="jamm-tour-profile-v1"
        onStepChange={(stepIndex) => {
          setActiveTab(null);
          if (stepIndex === 10) {
            setIsProfileEditOpen(true);
            return;
          }
          setIsProfileEditOpen(false);
        }}
        steps={[
          {
            selector: '[data-tour="profile-overview"]',
            title: t("featureTour.profile.overviewTitle"),
            description: t("featureTour.profile.overviewDescription"),
          },
          {
            selector: '[data-tour="profile-tab-groups"]',
            title: t("featureTour.profile.groupsTabTitle"),
            description: t("featureTour.profile.groupsTabDescription"),
          },
          {
            selector: '[data-tour="profile-tab-courses"]',
            title: t("featureTour.profile.coursesTabTitle"),
            description: t("featureTour.profile.coursesTabDescription"),
          },
          {
            selector: '[data-tour="profile-tab-blogs"]',
            title: t("featureTour.profile.blogsTabTitle"),
            description: t("featureTour.profile.blogsTabDescription"),
          },
          {
            selector: '[data-tour="profile-tab-appearance"]',
            title: t("featureTour.profile.appearanceTabTitle"),
            description: t("featureTour.profile.appearanceTabDescription"),
          },
          {
            selector: '[data-tour="profile-tab-language"]',
            title: t("featureTour.profile.languageTabTitle"),
            description: t("featureTour.profile.languageTabDescription"),
          },
          {
            selector: '[data-tour="profile-tab-premium"]',
            title: t("featureTour.profile.premiumTabTitle"),
            description: t("featureTour.profile.premiumTabDescription"),
          },
          {
            selector: '[data-tour="profile-tab-support"]',
            title: t("featureTour.profile.supportTabTitle"),
            description: t("featureTour.profile.supportTabDescription"),
          },
          {
            selector: '[data-tour="profile-tab-favorites"]',
            title: t("featureTour.profile.favoritesTabTitle"),
            description: t("featureTour.profile.favoritesTabDescription"),
          },
          {
            selector: '[data-tour="profile-edit-trigger"]',
            title: t("featureTour.profile.editTriggerTitle"),
            description: t("featureTour.profile.editTriggerDescription"),
            onNext: async () => {
              setIsProfileEditOpen(true);
            },
          },
          {
            selector: '[data-tour="profile-edit-dialog"]',
            title: t("featureTour.profile.editDialogTitle"),
            description: t("featureTour.profile.editDialogDescription"),
            onNext: async () => {
              setIsProfileEditOpen(false);
            },
          },
        ]}
      />
    </ProfileContainer>
  );
};

export default ProfilePage;
