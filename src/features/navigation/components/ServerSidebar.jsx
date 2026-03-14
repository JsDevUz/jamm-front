import React from "react";
import {
  Flame,
  GraduationCap,
  LayoutDashboard,
  MessagesSquare,
  Newspaper,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useChats } from "../../../contexts/ChatsContext";
import useAuthStore from "../../../store/authStore";
import {
  AvatarButton,
  AvatarFallback,
  AvatarImage,
  NavBadge,
  NavButton,
  SidebarContainer,
  Spacer,
} from "../styles/ServerSidebar.styles";

const baseNavItems = [
  { id: "feed", icon: Flame, labelKey: "navigation.feed" },
  { id: "chats", icon: MessagesSquare, labelKey: "navigation.chats" },
  { id: "articles", icon: Newspaper, labelKey: "navigation.articles" },
  { id: "courses", icon: GraduationCap, labelKey: "navigation.courses" },
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
          { id: "admin", icon: LayoutDashboard, labelKey: "navigation.admin" },
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
          <item.icon size={20} />
          {item.id === "chats" && totalUnreadCount > 0 && (
            <NavBadge>{totalUnreadCount}</NavBadge>
          )}
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
        {currentUser?.avatar ? (
          <AvatarImage src={currentUser.avatar} alt={displayName} />
        ) : (
          <AvatarFallback>{avatarLetter}</AvatarFallback>
        )}
      </AvatarButton>
    </SidebarContainer>
  );
}
