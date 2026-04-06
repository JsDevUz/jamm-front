import React from "react";
import { useTranslation } from "react-i18next";
import { useChats } from "../../../contexts/ChatsContext";
import useAuthStore from "../../../store/authStore";
import {
  AdminSolidIcon,
  ArticlesSolidIcon,
  ChatsSolidIcon,
  CoursesSolidIcon,
  FeedSolidIcon,
} from "../../../shared/ui/icons/NavSolidIcons";
import {
  AvatarButton,
  AvatarFallback,
  AvatarImage,
  IconSlot,
  NavBadge,
  NavButton,
  NavLabel,
  ProfileAvatarWrap,
  ProfileStatusDot,
  SidebarContainer,
  Spacer,
} from "../styles/ServerSidebar.styles";

const baseNavItems = [
  { id: "feed", icon: FeedSolidIcon, labelKey: "navigation.feed" },
  { id: "chats", icon: ChatsSolidIcon, labelKey: "navigation.chats" },
  { id: "articles", icon: ArticlesSolidIcon, labelKey: "navigation.articles" },
  { id: "courses", icon: CoursesSolidIcon, labelKey: "navigation.courses" },
];

export default function ServerSidebar({
  onSelectNav,
  onPreloadNav,
}) {
  const { t } = useTranslation();
  const { chats, selectedNav, setSelectedNav } = useChats();
  const currentUser = useAuthStore((state) => state.user);
  const totalUnreadCount = chats.reduce(
    (total, chat) => total + Math.max(0, Number(chat.unread) || 0),
    0,
  );

  const handleNav = (navId) => {
    if (onSelectNav) {
      onSelectNav(navId);
      return;
    }

    setSelectedNav(navId);
  };

  const displayName = currentUser?.nickname || currentUser?.username || "U";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const isPremium = currentUser?.premiumStatus === "active";
  const navItems =
    currentUser?.officialBadgeKey === "ceo"
      ? [
          ...baseNavItems,
          { id: "admin", icon: AdminSolidIcon, labelKey: "navigation.admin" },
        ]
      : baseNavItems;

  return (
    <SidebarContainer>
      {navItems.map((item) => (
        <NavButton
          key={item.id}
          $active={
            item.id === "chats"
              ? ["chats", "users", "groups", "meets"].includes(selectedNav)
              : selectedNav === item.id
          }
          onClick={() => handleNav(item.id)}
          onMouseEnter={() => onPreloadNav && onPreloadNav(item.id)}
          title={t(item.labelKey)}
        >
          <IconSlot>
            <item.icon size={20} />
            {item.id === "chats" && totalUnreadCount > 0 && (
              <NavBadge>{totalUnreadCount}</NavBadge>
            )}
          </IconSlot>
          <NavLabel
            $active={
              item.id === "chats"
                ? ["chats", "users", "groups", "meets"].includes(selectedNav)
                : selectedNav === item.id
            }
          >
            {t(item.labelKey)}
          </NavLabel>
        </NavButton>
      ))}

      <Spacer />

      <AvatarButton
        data-tour="nav-profile"
        $active={selectedNav === "profile"}
        $premium={isPremium}
        onClick={() => handleNav("profile")}
        onMouseEnter={() => onPreloadNav && onPreloadNav("profile")}
        title={`${displayName} — ${t("navigation.profile")}`}
      >
        <IconSlot>
          <ProfileAvatarWrap>
            {currentUser?.avatar ? (
              <AvatarImage src={currentUser.avatar} alt={displayName} />
            ) : (
              <AvatarFallback>{avatarLetter}</AvatarFallback>
            )}
            <ProfileStatusDot />
          </ProfileAvatarWrap>
        </IconSlot>
        <NavLabel $active={selectedNav === "profile"}>
          {t("navigation.profile")}
        </NavLabel>
      </AvatarButton>
    </SidebarContainer>
  );
}
