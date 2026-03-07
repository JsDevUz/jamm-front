import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  MessageSquare,
  GraduationCap,
  BookOpen,
  Palette,
  Globe,
  Shield,
  Headphones,
  MessageCircle,
  ArrowLeft,
  Camera,
  Settings,
  Calendar,
  Plus,
  Heart,
  Eye,
  Trash2,
  ChevronRight,
  Star,
  Store,
  Gift,
  Coins,
  Edit2,
} from "lucide-react";
import PremiumBadgeIcon from "./PremiumBadge";
import useAuthStore from "../store/authStore";
import CreatePostDialog from "./CreatePostDialog";
import { usePosts } from "../contexts/PostsContext";
import { useCourses } from "../contexts/CoursesContext";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import PremiumBadge from "./PremiumBadge";
import ProfileBlogsPanel from "./ProfileBlogsPanel";
import { fetchUserBlogs as fetchProfileBlogs } from "../api/blogsApi";
import ProfileUtilityPanel from "./ProfileUtilityPanel";
import ProfileEditDialog from "./ProfileEditDialog";
import { ButtonWrapper } from "./BlogsSidebar";
import ConfirmDialog from "./ConfirmDialog";

const MobileBackBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  margin-right: 12px;
  cursor: pointer;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

/* ── Animations ──────────────────────────────────────────── */
const fadeIn = keyframes`from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); }`;
const shimmer = keyframes`from { background-position: -200% 0; } to { background-position: 200% 0; }`;

/* ── Layout ──────────────────────────────────────────────── */
const ProfileContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  overflow: hidden;
  background-color: var(--background-color);
`;

/* ── Left Sidebar (same width as CourseSidebar) ──────────── */
const ProfileSidebar = styled.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease;

  /* hide scrollbar visually */
  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
  }
`;

/* ── Cover ───────────────────────────────────────────────── */
const CoverSection = styled.div`
  position: relative;
  height: 140px;
  background: linear-gradient(135deg, #5865f2 0%, #7289da 50%, #9b59b6 100%);
  flex-shrink: 0;
  overflow: hidden;
`;

const CoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

const CoverEditBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 50px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;

  ${CoverSection}:hover & {
    opacity: 1;
  }
`;

const SettingsBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.65);
    transform: scale(1.05);
  }
`;

/* ── Avatar ──────────────────────────────────────────────── */
const AvatarWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin: -40px 0 0 20px;
  flex-shrink: 0;
  z-index: 2;
`;

const AvatarRing = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid var(--secondary-color);
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: white;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(88, 101, 242, 0.4);
  cursor: pointer;
  transition: transform 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const AvatarEditBadge = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 2px solid var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.15);
  }
`;

/* ── Info Section ────────────────────────────────────────── */
const InfoSection = styled.div`
  padding: 12px 20px 0;
  animation: ${fadeIn} 0.35s ease 0.05s both;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const UserName = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: var(--text-color);
  margin: 0 0 2px;
  line-height: 1.2;
`;

const UserHandle = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
  margin-bottom: 10px;
`;

const Bio = styled.p`
  font-size: 13px;
  color: var(--text-secondary-color);
  line-height: 1.55;
  margin: 0 0 14px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted-color);
  margin-bottom: 6px;

  a {
    color: var(--primary-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

/* ── Stats ───────────────────────────────────────────────── */
const StatsGrid = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin: 0 20px 20px;
  padding: 16px 0;
  animation: ${fadeIn} 0.35s ease 0.1s both;
`;

const StatCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-right: 1px solid var(--border-color);

  &:last-child {
    border-right: none;
  }
`;

const StatValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--text-muted-color);
`;

/* ── Action Buttons ──────────────────────────────────────── */
const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 20px 16px;
  animation: ${fadeIn} 0.35s ease 0.15s both;
`;

const EditProfileBtn = styled.button`
  flex: 1;
  padding: 9px 0;
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.3);

  &:hover {
    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.5);
    transform: translateY(-1px);
  }
`;

const FollowBtn = styled.button`
  flex: 1;
  padding: 8px 0;
  border-radius: 8px;
  background: ${(p) => (p.following ? "transparent" : "var(--primary-color)")};
  color: ${(p) => (p.following ? "var(--text-color)" : "white")};
  font-size: 14px;
  font-weight: 600;
  border: ${(p) =>
    p.following
      ? "1px solid var(--border-color)"
      : "1px solid var(--primary-color)"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(p) => (p.following ? "rgba(237, 66, 69, 0.1)" : "#4752c4")};
    color: ${(p) => (p.following ? "#ed4245" : "white")};
    border-color: ${(p) => (p.following ? "#ed4245" : "#4752c4")};
  }
`;

const MessageBtn = styled.button`
  flex: 1;
  padding: 8px 0;
  border-radius: 8px;
  background: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  border: 1px solid var(--border-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: var(--hover-color);
  }
`;

const MoreBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: var(--input-color);
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: var(--hover-color);
    color: var(--text-color);
  }
`;

/* ── Divider ─────────────────────────────────────────────── */
const SectionDivider = styled.div`
  height: 24px;
`;

/* ── Tabs Section ───────────────────────────────────────── */
const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px;
  background: var(--secondary-color, #2f3136);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  animation: ${fadeIn} 0.35s ease 0.2s both;
`;

const TabItem = styled.button`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 16px;
  background: ${(p) => (p.active ? "var(--hover-color)" : "transparent")};
  border: none;
  cursor: pointer;
  color: var(--text-color);
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
  min-height: 56px;

  &:hover {
    background: var(--hover-color);
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 60px;
    right: 0;
    height: 1px;
    background: var(--border-color);
    opacity: 0.3;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: ${(p) => p.iconBg || "var(--primary-color)"};
    color: white;
    flex-shrink: 0;
  }

  .label {
    flex: 1;
    text-align: left;
    white-space: normal;
    line-height: 1.35;
    padding-top: 4px;
  }

  .chevron {
    color: var(--text-muted-color);
    opacity: 0.5;
    flex-shrink: 0;
    margin-top: 8px;
  }
`;

/* ── Right Panel (Content Area) ──────────────────────────── */
const RightPanel = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  overflow-y: auto;
  border-left: 1px solid var(--border-color);

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    animation: slideInFromRight 0.3s ease-out;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const ContentHeader = styled.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-color);
  }
`;

const ContentBody = styled.div`
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted-color);
  font-size: 13px;
  gap: 10px;
  margin-top: 48px;
`;

const EmptyIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;

/* ──────────────────────────────────────────────────────────
   Gurung (Post) Card
   ────────────────────────────────────────────────────────── */
const PostCard = styled.div`
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background 0.15s;
  &:hover {
    background: var(--hover-color);
  }
  &:first-child {
    border-top: 1px solid var(--border-color);
  }
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const PostAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5865f2, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-color);
    margin: 0 0 2px;
  }
  span {
    font-size: 11px;
    color: var(--text-muted-color);
  }
`;

const PostText = styled.div`
  font-size: 13px;
  line-height: 1.55;
  color: var(--text-color);
  white-space: pre-wrap;
  word-break: break-word;

  /* simple markdown rendering */
  strong {
    font-weight: 700;
  }
  em {
    font-style: italic;
  }
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(p) =>
    p.active ? p.activeColor || "#ed4245" : "var(--text-muted-color)"};
  font-size: 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    color: ${(p) => p.activeColor || "var(--text-secondary-color)"};
    transform: scale(1.1);
  }
`;

const PostOwnerActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

export const PlusBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  margin-left: auto;
  box-shadow: 0 2px 8px rgba(88, 101, 242, 0.4);
  &:hover {
    transform: scale(1.12) rotate(90deg);
    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.55);
  }
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
`;

const CourseCard = styled.button`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
  background: var(--secondary-color);
  cursor: pointer;
  text-align: left;
  padding: 0;
  transition:
    transform 0.16s ease,
    border-color 0.16s ease,
    background-color 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--text-muted-color);
  }
`;

const CourseThumb = styled.div`
  height: 108px;
  background: var(--primary-color);
  background-image: ${(p) => (p.$image ? `url(${p.$image})` : "none")};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 34px;
  font-weight: 800;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
`;

const CourseContent = styled.div`
  padding: 10px 12px 12px;
`;

const CourseTitle = styled.h4`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CourseMeta = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/* ──────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────── */
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

  // Fetch profile data
  useEffect(() => {
    if (isOwnProfile) {
      const userId = myId;
      if (userId) fetchUserPosts(userId);
    } else {
      // Fetch other user's profile + posts
      getPublicProfile(profileUserId).then((profile) => {
        if (profile) {
          setOtherUser(profile);
          setIsFollowing(profile.isFollowing);
        }
      });
      fetchUserPosts(profileUserId);
    }
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
    const userId = myId;
    if (userId) fetchUserPosts(userId);
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
    if (result) {
      setIsFollowing(result.following);
      setOtherUser((prev) =>
        prev ? { ...prev, followersCount: result.followersCount } : prev,
      );
    }
  };

  const formatTime = (iso) => {
    return dayjs(iso).format("D-MMM · HH:mm");
  };

  /* Simple markdown → JSX text renderer */
  const renderText = (raw) => {
    if (!raw) return "";
    const parts = [];
    let key = 0;
    const RE = /\*\*(.+?)\*\*|_(.+?)_/g;
    let last = 0,
      m;
    while ((m = RE.exec(raw)) !== null) {
      if (m.index > last)
        parts.push(<span key={key++}>{raw.slice(last, m.index)}</span>);
      if (m[1] !== undefined) parts.push(<strong key={key++}>{m[1]}</strong>);
      else parts.push(<em key={key++}>{m[2]}</em>);
      last = m.index + m[0].length;
    }
    if (last < raw.length)
      parts.push(<span key={key++}>{raw.slice(last)}</span>);
    return parts.length ? parts : raw;
  };

  if (!currentUser) return null;
  if (!isOwnProfile && !otherUser) return null;

  const targetUser = isOwnProfile ? currentUser : otherUser;
  const displayName =
    targetUser.nickname || targetUser.username || "Foydalanuvchi";
  const handle = `@${(targetUser.username || "user").toLowerCase()}`;
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const isPremium = targetUser.premiumStatus === "active";
  const userAvatar = isOwnProfile ? currentUser.avatar : targetUser.avatar;

  const userCourses = courses.filter((c) => {
    if (!c || !c.createdBy) return false;

    // Safely extract creator string ID
    let rawCreator = c.createdBy;
    let creatorStr = "";
    if (typeof rawCreator === "string") {
      creatorStr = rawCreator;
    } else if (typeof rawCreator === "object") {
      creatorStr =
        rawCreator._id || rawCreator.id || JSON.stringify(rawCreator);
    }

    // Safely extract target string ID
    let targetStr = String(targetUser._id || targetUser.id);

    // Strict match
    return creatorStr.toString() === targetStr.toString();
  });

  const stats = [
    {
      value: isOwnProfile
        ? currentUser.followers?.length || "0"
        : String(targetUser.followersCount || 0),
      label: "A'zolar",
    },
    { value: String(userPosts.length), label: "Gurunglar" },
    { value: String(blogCount), label: "Bloglar" },
    { value: String(userCourses.length), label: "Darslar" },
  ];

  return (
    <ProfileContainer>
      {/* ── LEFT: Profile Sidebar ── */}
      <ProfileSidebar>
        {/* Cover */}
        <CoverSection>
          <CoverOverlay />
          {isOwnProfile && (
            <>
              <CoverEditBtn title="Muqovani o'zgartirish">
                <Camera size={14} />
              </CoverEditBtn>
              <SettingsBtn
                title="Sozlamalar"
                onClick={() => setIsProfileEditOpen(true)}
              >
                <Edit2 size={16} />
              </SettingsBtn>
            </>
          )}
        </CoverSection>

        {/* Avatar */}
        <AvatarWrapper>
          <AvatarRing>
            {userAvatar ? (
              <img src={userAvatar} alt={displayName} />
            ) : (
              avatarLetter
            )}
          </AvatarRing>
          {isOwnProfile && (
            <AvatarEditBadge title="Avatarni o'zgartirish">
              <Camera size={10} />
            </AvatarEditBadge>
          )}
        </AvatarWrapper>

        {/* User Info */}
        <InfoSection>
          <NameRow>
            <UserName>{displayName}</UserName>
            {isPremium && <PremiumBadgeIcon />}
          </NameRow>
          <UserHandle>{handle}</UserHandle>

          <Bio>
            {targetUser.bio ||
              (isOwnProfile
                ? "Hali tavsif qo'shilmagan. O'z profilingizni to'ldiring!"
                : "Tavsif qo'shilmagan.")}
          </Bio>

          <MetaRow>
            <Calendar size={13} />
            <span>
              {dayjs(targetUser.createdAt).format("DD MMMM YYYY")} dan a'zo
            </span>
          </MetaRow>
        </InfoSection>

        {/* Action Buttons */}
        {!isOwnProfile && (
          <ActionRow>
            <FollowBtn following={isFollowing} onClick={handleToggleFollow}>
              {isFollowing ? (
                <>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Obunasiz
                </>
              ) : (
                <>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                  Obuna bo'lish
                </>
              )}
            </FollowBtn>
            <MessageBtn
              onClick={() => {
                const targetSlug = targetUser.jammId || targetUser._id;
                navigate(`/a/${targetSlug}`);
              }}
            >
              <MessageSquare size={16} />
              Xabar
            </MessageBtn>
          </ActionRow>
        )}

        <SectionDivider />

        {/* Stats */}
        <StatsGrid>
          {stats.map((s, i) => (
            <StatCard key={i}>
              <StatValue>{s.value}</StatValue>
              <StatLabel>{s.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            "::-webkit-scrollbar-thumb": {
              display: "none",
            },
          }}
        >
          <TabsContainer>
            <TabItem
              active={activeTab === "groups"}
              onClick={() => setActiveTab("groups")}
              iconBg="linear-gradient(135deg, #3ba55d, #248147)"
            >
              <div className="icon-wrapper">
                <MessageSquare size={16} />
              </div>
              <span className="label">Gurunglar</span>
              <ChevronRight className="chevron" size={16} />
            </TabItem>
            <TabItem
              active={activeTab === "blogs"}
              onClick={() => setActiveTab("blogs")}
              iconBg="linear-gradient(135deg, #2563eb, #0f9d8f)"
            >
              <div className="icon-wrapper">
                <BookOpen size={16} />
              </div>
              <span className="label">Bloglar</span>
              <ChevronRight className="chevron" size={16} />
            </TabItem>
            <TabItem
              active={activeTab === "courses"}
              onClick={() => setActiveTab("courses")}
              iconBg="linear-gradient(135deg, #faa61a, #bd7b0a)"
            >
              <div className="icon-wrapper">
                <GraduationCap size={16} />
              </div>
              <span className="label">Darslar</span>
              <ChevronRight className="chevron" size={16} />
            </TabItem>
          </TabsContainer>

          {isOwnProfile && (
            <TabsContainer>
              <TabItem
                active={activeTab === "appearance"}
                onClick={() => setActiveTab("appearance")}
                iconBg="linear-gradient(135deg, #5865f2, #7289da)"
              >
                <div className="icon-wrapper">
                  <Palette size={16} />
                </div>
                <span className="label">Theme</span>
                <ChevronRight className="chevron" size={16} />
              </TabItem>
              <TabItem
                active={activeTab === "language"}
                onClick={() => setActiveTab("language")}
                iconBg="linear-gradient(135deg, #00b0f4, #2d6cdf)"
              >
                <div className="icon-wrapper">
                  <Globe size={16} />
                </div>
                <span className="label">Language</span>
                <ChevronRight className="chevron" size={16} />
              </TabItem>
              <TabItem
                active={activeTab === "premium"}
                onClick={() => setActiveTab("premium")}
                iconBg="linear-gradient(135deg, #faa61a, #f57c00)"
              >
                <div className="icon-wrapper">
                  <Shield size={16} />
                </div>
                <span className="label">Jamm Premium</span>
                <ChevronRight className="chevron" size={16} />
              </TabItem>
              <TabItem
                active={activeTab === "support"}
                onClick={() => setActiveTab("support")}
                iconBg="linear-gradient(135deg, #3ba55d, #248147)"
              >
                <div className="icon-wrapper">
                  <Headphones size={16} />
                </div>
                <span className="label">Qo'llab-quvvatlash</span>
                <ChevronRight className="chevron" size={16} />
              </TabItem>
              <TabItem
                active={activeTab === "favorites"}
                onClick={() => setActiveTab("favorites")}
                iconBg="linear-gradient(135deg, #ec4899, #9b59b6)"
              >
                <div className="icon-wrapper">
                  <Heart size={16} />
                </div>
                <span className="label">Sevimlilarim</span>
                <ChevronRight className="chevron" size={16} />
              </TabItem>
            </TabsContainer>
          )}
        </div>

        {/* <TabsContainer>
          <TabItem iconBg="linear-gradient(135deg, #8E2DE2, #4A00E0)">
            <div className="icon-wrapper">
              <Star size={16} />
            </div>
            <span className="label">Jamm Premium</span>
            <ChevronRight className="chevron" size={16} />
          </TabItem>

          <TabItem iconBg="linear-gradient(135deg, #f8c333, #f57c00)">
            <div className="icon-wrapper">
              <Star size={16} />
            </div>
            <span className="label">Yulduzlarim</span>
            <ChevronRight className="chevron" size={16} />
          </TabItem>

          <TabItem iconBg="linear-gradient(135deg, #ec008c, #673ab7)">
            <div className="icon-wrapper">
              <Store size={16} />
            </div>
            <span className="label">Jamm Biznes</span>
            <ChevronRight className="chevron" size={16} />
          </TabItem>

          <TabItem iconBg="linear-gradient(135deg, #00d2ff, #3a7bd5)">
            <div className="icon-wrapper">
              <Gift size={16} />
            </div>
            <span className="label">Hadya yuborish</span>
            <ChevronRight className="chevron" size={16} />
          </TabItem>
        </TabsContainer> */}
      </ProfileSidebar>

      {/* ── RIGHT: Content Area ── */}
      <RightPanel style={{ display: !activeTab ? "none" : "flex" }}>
        {activeTab === "groups" && (
          <>
            <ContentHeader>
              <MobileBackBtn onClick={() => setActiveTab(null)}>
                <ArrowLeft size={20} />
              </MobileBackBtn>
              <MessageSquare size={24} color="#3ba55d" />
              <h2>Gurunglar</h2>
              {isOwnProfile && (
                <ButtonWrapper
                  onClick={() => setIsCreatePostOpen(true)}
                  title="Gurung yarating"
                >
                  <Plus size={16} />
                </ButtonWrapper>
              )}
            </ContentHeader>

            {userPosts.length === 0 ? (
              <ContentBody>
                <EmptyStateContainer>
                  <EmptyIcon>
                    <MessageSquare size={28} color="var(--text-muted-color)" />
                  </EmptyIcon>
                  <span>Birinchi gurungi yozing!</span>
                </EmptyStateContainer>
              </ContentBody>
            ) : (
              userPosts.map((post) => (
                <PostCard key={post._id}>
                  <PostHeader>
                    <PostAvatar>
                      {userAvatar ? (
                        <img src={userAvatar} alt={displayName} />
                      ) : (
                        displayName.charAt(0).toUpperCase()
                      )}
                    </PostAvatar>
                    <PostMeta>
                      <h4>
                        {displayName}
                        <PremiumBadge isPremium={isPremium} />
                      </h4>
                      <span>{formatTime(post.createdAt)}</span>
                    </PostMeta>
                  </PostHeader>

                  <PostText>{renderText(post.content)}</PostText>

                  <PostActions>
                    <ActionBtn
                      active={post.liked}
                      activeColor="#ed4245"
                      onClick={() => likePost(post._id)}
                    >
                      <Heart size={16} fill={post.liked ? "#ed4245" : "none"} />
                      {post.likes}
                    </ActionBtn>

                    <ActionBtn activeColor="#5865f2">
                      <MessageCircle size={16} />
                      {post.comments}
                    </ActionBtn>

                    <ActionBtn activeColor="var(--text-muted-color)">
                      <Eye size={16} />
                      {post.views}
                    </ActionBtn>
                  </PostActions>

                  {isOwnProfile && (
                    <PostOwnerActions>
                      <ActionBtn
                        activeColor="var(--primary-color)"
                        onClick={() => setEditingPost(post)}
                      >
                        <Edit2 size={16} />
                        Tahrirlash
                      </ActionBtn>
                      <ActionBtn
                        activeColor="#ed4245"
                        onClick={() => setPostToDelete(post)}
                      >
                        <Trash2 size={16} />
                        O'chirish
                      </ActionBtn>
                    </PostOwnerActions>
                  )}
                </PostCard>
              ))
            )}
          </>
        )}

        {activeTab === "courses" && (
          <>
            <ContentHeader>
              <MobileBackBtn onClick={() => setActiveTab(null)}>
                <ArrowLeft size={20} />
              </MobileBackBtn>
              <GraduationCap size={24} color="#faa61a" />
              <h2>Darslar</h2>
            </ContentHeader>
            <ContentBody>
              {userCourses.length === 0 ? (
                <EmptyStateContainer>
                  <EmptyIcon>
                    <GraduationCap size={28} color="var(--text-muted-color)" />
                  </EmptyIcon>
                  <span>Siz qo'shgan darslar yo'q</span>
                </EmptyStateContainer>
              ) : (
                <CourseGrid>
                  {userCourses.map((course) => (
                    <CourseCard
                      key={course._id || course.id}
                      onClick={() =>
                        navigate(
                          `/courses/${course.urlSlug || course.id || course._id}`,
                        )
                      }
                    >
                      <CourseThumb
                        $image={course.image}
                        style={{
                          background: course.image
                            ? undefined
                            : "var(--primary-color)",
                        }}
                      >
                        {!course.image && (course.name || "?").charAt(0)}
                      </CourseThumb>
                      <CourseContent>
                        <CourseTitle>{course.name}</CourseTitle>
                        <CourseMeta>
                          {(course.lessons || []).length > 0
                            ? `${course.lessons.length} ta dars`
                            : "Hali dars yo'q"}
                        </CourseMeta>
                      </CourseContent>
                    </CourseCard>
                  ))}
                </CourseGrid>
              )}
            </ContentBody>
          </>
        )}

        {activeTab === "blogs" && (
          <ProfileBlogsPanel
            profileUser={targetUser}
            profileUserId={profileUserId}
            isOwnProfile={isOwnProfile}
            onBack={() => setActiveTab(null)}
            onCountChange={setBlogCount}
          />
        )}

        {isOwnProfile &&
          [
            "appearance",
            "language",
            "premium",
            "support",
            "favorites",
          ].includes(activeTab) && (
            <ProfileUtilityPanel
              section={activeTab}
              currentUser={currentUser}
            />
          )}
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
