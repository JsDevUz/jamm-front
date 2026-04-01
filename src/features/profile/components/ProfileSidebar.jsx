import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";
import {
  Calendar,
  Camera,
  ChevronRight,
  Download,
  Edit2,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  Lock,
  LogOut,
  MessageSquare,
  Newspaper,
  Palette,
  Sparkles,
  Shield,
} from "lucide-react";
import UserNameWithDecoration from "../../../shared/ui/users/UserNameWithDecoration";
import ImageLightbox from "../../../shared/ui/media/ImageLightbox";
import useAuthStore from "../../../store/authStore";
import packageJson from "../../../../package.json";
import { OPEN_INSTALL_APP_PROMPT_EVENT } from "../../../app/components/InstallAppPrompt";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Sidebar = styled.aside`
  width: 340px;
  height: 100vh;
  background: var(--secondary-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const isStandaloneMode = () => {
  if (typeof window === "undefined") return false;
  return Boolean(
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
      window.navigator.standalone === true,
  );
};

const Cover = styled.div`
  position: relative;
  height: 132px;
  background: var(--primary-color);
  flex-shrink: 0;
`;

const CoverShade = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.18);
`;

const SettingsBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  border: none;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
`;

const AvatarWrap = styled.div`
  position: relative;
  width: 76px;
  height: 76px;
  margin: -38px 0 0 18px;
  z-index: 2;
  cursor: ${(props) => (props.$clickable ? "zoom-in" : "default")};
`;

const Avatar = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 3px solid var(--secondary-color);
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 800;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarEditBadge = styled.div`
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 2px solid var(--secondary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  padding: 12px 18px 0;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const Name = styled.h2`
  margin: 0 0 2px;
  color: var(--text-color);
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
`;

const Handle = styled.div`
  color: var(--text-muted-color);
  font-size: 13px;
  margin-bottom: 10px;
`;

const Bio = styled.p`
  margin: 0 0 14px;
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.55;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-muted-color);
  margin-bottom: 14px;
  font-size: 12px;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 0 18px 14px;
`;

const ActionBtn = styled.button`
  flex: 1;
  min-height: 36px;
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.$primary ? "var(--primary-color)" : "var(--border-color)"};
  background: ${(props) =>
    props.$primary ? "var(--primary-color)" : "var(--input-color)"};
  color: ${(props) => (props.$primary ? "white" : "var(--text-color)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 18px;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  margin: 0 18px 16px;
  padding: 14px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
`;

const Stat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border-right: 1px solid var(--border-color);

  &:last-child {
    border-right: none;
  }
`;

const StatValue = styled.div`
  color: var(--text-color);
  font-size: 17px;
  font-weight: 700;
  line-height: 1;
`;

const StatLabel = styled.div`
  color: var(--text-muted-color);
  font-size: 12px;
`;

const NavScroll = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 18px;

  &::-webkit-scrollbar {
    width: 0;
  }

  @media (max-width: 768px) {
    padding-bottom: 80px; /* Space for mobile bottom navigation */
  }
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--secondary-color);
  overflow: hidden;
`;

const SidebarFooter = styled.div`
  margin: 0 14px 18px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--secondary-color);
  overflow: hidden;
`;

const FooterRow = styled.div`
  width: 100%;
  min-height: 48px;
  padding: 10px 14px;
  border: none;
  background: transparent;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  text-align: left;
  cursor: ${(props) => (props.as === "button" ? "pointer" : "default")};

  &:not(:last-child) {
    border-bottom: 1px solid var(--border-color);
  }

  &:hover {
    background: ${(props) => (props.as === "button" ? "var(--hover-color)" : "transparent")};
  }
`;

const FooterMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong {
    font-size: 13px;
    line-height: 1.3;
  }

  span {
    color: var(--text-muted-color);
    font-size: 12px;
    line-height: 1.4;
  }
`;

const VersionBadge = styled.div`
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(88, 101, 242, 0.08);
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

const LogoutAction = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #ef4444;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

const Tab = styled.button`
  width: 100%;
  min-height: 52px;
  padding: 10px 14px;
  border: none;
  background: ${(props) =>
    props.$active ? "var(--hover-color)" : "transparent"};
  color: var(--text-color);
  display: flex;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  cursor: pointer;

  &:hover {
    background: var(--hover-color);
  }

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 52px;
    right: 0;
    bottom: 0;
    height: 1px;
    background: var(--border-color);
    opacity: 0.3;
  }
`;

const TabIcon = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: ${(props) =>
    props.$active ? "var(--hover-color)" : "var(--input-color)"};
  color: ${(props) =>
    props.$active ? "var(--text-color)" : "var(--text-secondary-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TabLabel = styled.span`
  flex: 1;
  text-align: left;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  padding-top: 3px;
`;

const TabChevron = styled(ChevronRight)`
  color: var(--text-muted-color);
  opacity: 0.5;
  flex-shrink: 0;
  margin-top: 5px;
`;

const primaryTabs = [
  {
    key: "groups",
    labelKey: "profile.tabs.groups",
    icon: MessageSquare,
    color: "#3ba55d",
  },
  {
    key: "articles",
    labelKey: "profile.tabs.articles",
    icon: Newspaper,
    color: "#2563eb",
  },
  {
    key: "courses",
    labelKey: "profile.tabs.courses",
    icon: GraduationCap,
    color: "#f59e0b",
  },
];

const ownTabs = [
  {
    key: "appearance",
    labelKey: "profile.tabs.appearance",
    icon: Palette,
    color: "#5865f2",
  },
  {
    key: "language",
    labelKey: "profile.tabs.language",
    icon: Globe,
    color: "#0ea5e9",
  },
  {
    key: "security",
    labelKey: "profile.tabs.security",
    icon: Lock,
    color: "#ef4444",
  },
  {
    key: "premium",
    labelKey: "profile.tabs.premium",
    icon: Shield,
    color: "#f59e0b",
  },
  {
    key: "support",
    labelKey: "profile.tabs.support",
    icon: Headphones,
    color: "#16a34a",
  },
  {
    key: "favorites",
    labelKey: "profile.tabs.favorites",
    icon: Heart,
    color: "#ec4899",
  },
  {
    key: "learn",
    labelKey: "profile.tabs.learn",
    icon: Sparkles,
    color: "#8b5cf6",
  },
];

const ProfileSidebar = ({
  activeTab,
  onTabChange,
  targetUser,
  isOwnProfile,
  isFollowing,
  articleCount,
  postCount,
  courseCount,
  onToggleFollow,
  onOpenProfileEdit,
  onOpenDirectMessage,
}) => {
  const { t } = useTranslation();
  const [isAvatarPreviewOpen, setIsAvatarPreviewOpen] = useState(false);
  const displayName =
    targetUser?.nickname || targetUser?.username || t("common.userFallback");
  const logout = useAuthStore((state) => state.logout);
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const canInstallApp = isOwnProfile && isMobile && !isStandaloneMode();
  const handle = `@${(targetUser?.username || "user").toLowerCase()}`;
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const userAvatar = targetUser?.avatar;
  const stats = [
    {
      value: isOwnProfile
        ? targetUser?.followers?.length || "0"
        : String(targetUser?.followersCount || 0),
      label: t("profile.stats.members"),
    },
    { value: String(postCount), label: t("profile.stats.posts") },
    { value: String(articleCount), label: t("profile.stats.articles") },
    { value: String(courseCount), label: t("profile.stats.courses") },
  ];

  const openInstallAppPrompt = () => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent(OPEN_INSTALL_APP_PROMPT_EVENT));
  };

  return (
    <Sidebar data-tour="profile-overview">
      <Cover>
        <CoverShade />
        {isOwnProfile ? (
          <SettingsBtn
            title={t("profile.settings")}
            onClick={onOpenProfileEdit}
            data-tour="profile-edit-trigger"
          >
            <Edit2 size={16} />
          </SettingsBtn>
        ) : null}
      </Cover>

      <AvatarWrap
        $clickable={Boolean(userAvatar)}
        onClick={() => {
          if (userAvatar) {
            setIsAvatarPreviewOpen(true);
          }
        }}
      >
        <Avatar>
          {userAvatar ? (
            <img src={userAvatar} alt={displayName} />
          ) : (
            avatarLetter
          )}
        </Avatar>
        {/* {isOwnProfile ? (
          <AvatarEditBadge title={t("profile.avatarChange")}>
            <Camera size={10} />
          </AvatarEditBadge>
        ) : null} */}
      </AvatarWrap>
      <ImageLightbox
        src={isAvatarPreviewOpen ? userAvatar : null}
        alt={displayName}
        onClose={() => setIsAvatarPreviewOpen(false)}
      />

      <Info>
        <NameRow>
          <Name as="div">
            <UserNameWithDecoration
              user={targetUser}
              fallback={t("common.userFallback")}
              size="lg"
            />
          </Name>
        </NameRow>
        <Handle>{handle}</Handle>
        <Bio>
          {targetUser?.bio ||
            (isOwnProfile
              ? t("profile.bioMissingOwn")
              : t("profile.bioMissingOther"))}
        </Bio>
        <MetaRow>
          <Calendar size={13} />
          <span>
            {targetUser?.createdAt
              ? new Date(targetUser.createdAt).toLocaleDateString("uz-UZ")
              : ""}
          </span>
        </MetaRow>
      </Info>

      {!isOwnProfile ? (
        <ActionRow>
          <ActionBtn $primary={!isFollowing} onClick={onToggleFollow}>
            {isFollowing ? t("profile.following") : t("profile.follow")}
          </ActionBtn>
          <ActionBtn onClick={onOpenDirectMessage}>
            <MessageSquare size={15} />
            {t("common.message")}
          </ActionBtn>
        </ActionRow>
      ) : null}

      <Divider />

      <Stats>
        {stats.map((item) => (
          <Stat key={item.label}>
            <StatValue>{item.value}</StatValue>
            <StatLabel>{item.label}</StatLabel>
          </Stat>
        ))}
      </Stats>

      <NavScroll>
        <Tabs>
          {primaryTabs.map((item) => {
            const Icon = item.icon;
            return (
              <Tab
                key={item.key}
                $active={activeTab === item.key}
                onClick={() => onTabChange(item.key)}
                data-tour={`profile-tab-${item.key}`}
              >
                <TabIcon $active={activeTab === item.key}>
                  <Icon size={15} />
                </TabIcon>
                <TabLabel>{t(item.labelKey)}</TabLabel>
                <TabChevron size={16} />
              </Tab>
            );
          })}
        </Tabs>

        {isOwnProfile ? (
          <Tabs>
            {ownTabs.map((item) => {
              const Icon = item.icon;
              return (
                <Tab
                  key={item.key}
                  $active={activeTab === item.key}
                  onClick={() => onTabChange(item.key)}
                  data-tour={`profile-tab-${item.key}`}
                >
                  <TabIcon $active={activeTab === item.key}>
                    <Icon size={15} />
                  </TabIcon>
                  <TabLabel>{t(item.labelKey)}</TabLabel>
                  <TabChevron size={16} />
                </Tab>
              );
            })}
          </Tabs>
        ) : null}

        {isOwnProfile ? (
          <SidebarFooter>
            <FooterRow as="div">
              <FooterMeta>
                <strong>App version</strong>
                <span>Current production version</span>
              </FooterMeta>
              <VersionBadge>v{packageJson.version}</VersionBadge>
            </FooterRow>
            {canInstallApp ? (
              <FooterRow as="button" type="button" onClick={openInstallAppPrompt}>
                <FooterMeta>
                  <strong>{t("installPrompt.menuTitle")}</strong>
                  <span>{t("installPrompt.subtitle")}</span>
                </FooterMeta>
                <LogoutAction as="span" style={{ color: "var(--primary-color)" }}>
                  <Download size={14} />
                  {t("installPrompt.install")}
                </LogoutAction>
              </FooterRow>
            ) : null}
            <FooterRow as="button" type="button" onClick={() => logout()}>
              <FooterMeta>
                <strong>Log out</strong>
                <span>Sign out from this device</span>
              </FooterMeta>
              <LogoutAction>
                <LogOut size={14} />
                Log out
              </LogoutAction>
            </FooterRow>
          </SidebarFooter>
        ) : null}
      </NavScroll>
    </Sidebar>
  );
};

export default ProfileSidebar;
