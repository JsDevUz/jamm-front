import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
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
  ProfileContainer,
  RightPanel,
} from "../styles/ProfilePage.styles";

const ProfilePage = ({ profileUserId }) => {
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

      <RightPanel $visible={Boolean(activeTab)}>
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
            onBack={() => setActiveTab(null)}
          />
        ) : null}

        {activeTab === "courses" ? (
          <ProfileCoursesPane
            courses={userCourses}
            onBack={() => setActiveTab(null)}
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
            onBack={() => setActiveTab(null)}
            onCountChange={setBlogCount}
          />
        ) : null}

        {isOwnProfile &&
        ["appearance", "language", "premium", "support", "favorites"].includes(
          activeTab,
        ) ? (
          <ProfileUtilityPanel
            section={activeTab}
            currentUser={currentUser}
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
    </ProfileContainer>
  );
};

export default ProfilePage;
