import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import {
  ArrowLeft,
  Globe,
  Heart,
  Headphones,
  Lock,
  Monitor,
  Palette,
  Shield,
  Smartphone,
  Sparkles,
  Tablet,
  Trash2,
  Zap,
} from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../contexts/ThemeContext";
import { useChats } from "../../../contexts/ChatsContext";
import { usePosts } from "../../../contexts/PostsContext";
import { useCourses } from "../../../contexts/CoursesContext";
import useAuthStore from "../../../store/authStore";
import axiosInstance from "../../../api/axiosInstance";
import { fetchLikedArticles } from "../../../api/articlesApi";
import {
  updateProfileDecoration,
} from "../../../api/usersApi";
import { normalizeLanguageCode } from "../../../i18n";
import {
  ProfilePaneBody as Body,
  ProfilePaneHeader as Header,
  ProfilePaneSection as Group,
  ProfilePaneTitle as HeaderTitle,
  ProfilePaneWrapper as Wrapper,
  ProfilePaneEmptyState as EmptyState,
} from "../ui/ProfilePane";
import { ProfileMobileBackButton } from "../ui";
import AppLockPinPad from "../../../app/components/AppLockPinPad";
import usePremiumUpgradeModalStore from "../../../app/store/usePremiumUpgradeModalStore";
import useProfileDecorationsStore from "../../../store/profileDecorationsStore";
import { MarkdownRenderer } from "../../articles/components";
import OfficalBadge from "../../../shared/ui/badges/OfficalBadge";

const MobileBackBtn = styled(ProfileMobileBackButton)``;

const GroupHeader = styled.div`
  padding: 12px 14px 0;

  h4 {
    margin: 0 0 4px;
    color: var(--text-color);
    font-size: 14px;
    font-weight: 700;
  }

  p {
    margin: 0 0 12px;
    color: var(--text-muted-color);
    font-size: 12px;
    line-height: 1.45;
  }
`;

const SettingRow = styled.div`
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 12px;
  row-gap: 4px;
  align-items: start;

  & > :last-child {
    width: auto;
    min-width: ${(props) => (props.$wideControl ? "220px" : "96px")};
    max-width: ${(props) => (props.$wideControl ? "none" : "160px")};
    justify-self: end;
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: start;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;

    & > :last-child {
      justify-self: stretch;
      width: 100%;
      max-width: none;
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const SettingMeta = styled.div`
  min-width: 0;
  display: contents;

  strong {
    display: block;
    grid-column: 1;
    color: var(--text-color);
    font-size: 13px;
    line-height: 1.3;
  }

  span {
    display: block;
    grid-column: 1;
    color: var(--text-muted-color);
    font-size: 12px;
    line-height: 1.45;
    margin-top: 1px;
  }

  @media (max-width: 768px) {
    display: grid;
    gap: 3px;

    strong,
    span {
      grid-column: auto;
    }
  }
`;

const Select = styled.select`
  width: auto;
  min-width: 96px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  padding: 0 10px;
  font-size: 12px;
  outline: none;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 10px;
  min-width: 96px;
  border-radius: 999px;
  background: ${(p) =>
    p.$active ? "rgba(250, 166, 26, 0.12)" : "rgba(88,101,242,0.08)"};
  color: ${(p) => (p.$active ? "#faa61a" : "var(--primary-color)")};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

const PromoRow = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  min-width: 0;

  > * {
    min-width: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  height: 44px;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  padding: 0 14px;
  font-size: 14px;
  outline: none;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 50px;
    min-height: 50px;
    font-size: 16px;
    padding: 0 16px;
  }
`;

const Button = styled.button`
  height: 44px;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  background: ${(p) =>
    p.$secondary ? "var(--input-color)" : "var(--primary-color)"};
  color: ${(p) => (p.$secondary ? "var(--text-color)" : "white")};
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.55 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
  white-space: nowrap;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: 50px;
    min-height: 50px;
    font-size: 14px;
  }
`;

const DecorationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
`;

const DecorationCard = styled.button`
  text-align: left;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--border-color)"};
  background: ${(props) =>
    props.$active ? "rgba(88,101,242,0.08)" : "var(--secondary-color)"};
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DecorationPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 13px;
  font-weight: 700;
`;

const DecorationEmoji = styled.div`
  width: 26px;
  height: 26px;
  min-width: 26px;
  border-radius: 999px;
  border: 1px solid
    ${(props) => (props.$plain ? "transparent" : "var(--border-color)")};
  background: ${(props) => (props.$plain ? "transparent" : "var(--input-color)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  overflow: hidden;
`;

const DecorationMeta = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
`;

const PlanCard = styled.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid
    ${(p) => (p.$premium ? "rgba(250, 166, 26, 0.35)" : "var(--border-color)")};
  background: ${(p) =>
    p.$premium
      ? "linear-gradient(180deg, rgba(250,166,26,0.08), rgba(255,255,255,0.02))"
      : "var(--secondary-color)"};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PlanName = styled.div`
  color: ${(p) => (p.$premium ? "#faa61a" : "var(--text-color)")};
  font-size: 14px;
  font-weight: 700;
`;

const PlanPrice = styled.div`
  color: var(--text-color);
  font-size: 22px;
  font-weight: 800;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
`;

const InfoCard = styled.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);

  h4 {
    margin: 0 0 6px;
    color: var(--text-color);
    font-size: 14px;
    font-weight: 700;
  }

  p {
    margin: 0 0 12px;
    color: var(--text-muted-color);
    font-size: 12px;
    line-height: 1.45;
  }
`;

const DangerButton = styled(Button)`
  background: rgba(239, 68, 68, 0.14);
  color: #ef4444;
`;

const SecurityStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SecurityStatus = styled(Badge)`
  min-width: 110px;
`;

const SessionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const SessionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-top: 1px solid var(--border-color);

  &:first-child {
    border-top: none;
  }
`;

const SessionIcon = styled.div`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 10px;
  background: ${(p) => p.$current ? "rgba(88,101,242,0.12)" : "var(--input-color)"};
  border: 1px solid ${(p) => p.$current ? "var(--primary-color)" : "var(--border-color)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.$current ? "var(--primary-color)" : "var(--text-muted-color)"};
`;

const SessionInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SessionName = styled.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const SessionCurrentBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 999px;
  background: rgba(88,101,242,0.12);
  color: var(--primary-color);
  white-space: nowrap;
  flex-shrink: 0;
`;

const SessionMeta = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SessionDeleteBtn = styled.button`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.4 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
`;

const FavoritesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FavoriteCard = styled.button`
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  cursor: pointer;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FavoriteTitle = styled.div`
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
`;

const FavoriteMeta = styled.div`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`;

const FavoriteMarkdownPreview = styled(MarkdownRenderer)`
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
  max-height: calc(1.45em * 4);
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(180deg, #000 0%, #000 72%, transparent 100%);
  -webkit-mask-image: linear-gradient(
    180deg,
    #000 0%,
    #000 72%,
    transparent 100%
  );

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  blockquote,
  pre,
  hr,
  details,
  img {
    display: none;
  }

  p,
  ul,
  ol {
    margin: 0;
    font-size: inherit;
    line-height: inherit;
  }

  ul,
  ol {
    padding-left: 1rem;
  }

  li + li {
    margin-top: 0.2rem;
  }

  p + p,
  p + ul,
  p + ol,
  ul + p,
  ol + p {
    margin-top: 0.35rem;
  }

  code {
    font-size: 0.95em;
    padding: 0.08rem 0.28rem;
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const getFavoriteMarkdown = (item) =>
  String(
    item?.content ||
      item?.markdown ||
      item?.excerpt ||
      item?.summary ||
      item?.description ||
      "",
  ).trim();

const ProfileUtilityPanel = ({ section, currentUser, onBack, embedded = false }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { getUserByUsername, createChat, fetchChats } = useChats();
  const { fetchLikedPosts } = usePosts();
  const { fetchLikedLessons } = useCourses();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const updateUser = useAuthStore((state) => state.updateUser);
  const openPremiumUpgradeModal = usePremiumUpgradeModalStore(
    (state) => state.openPremiumUpgradeModal,
  );
  const decorations = useProfileDecorationsStore((state) => state.decorations);
  const fetchDecorations = useProfileDecorationsStore(
    (state) => state.fetchDecorations,
  );
  const [language, setLanguage] = useState(
    () =>
      normalizeLanguageCode(
        i18n.resolvedLanguage || localStorage.getItem("language") || "uz",
      ),
  );
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [decorationsLoading, setDecorationsLoading] = useState(false);
  const [decorationSaving, setDecorationSaving] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [likedArticles, setLikedArticles] = useState([]);
  const [likedLessons, setLikedLessons] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [appLockEnabled, setAppLockEnabled] = useState(
    Boolean(currentUser?.appLockEnabled),
  );
  const [sessions, setSessions] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [deletingSessionId, setDeletingSessionId] = useState(null);
  const [pinPadState, setPinPadState] = useState({
    open: false,
    mode: "setup",
    step: "new",
    pin: "",
    firstPin: "",
    currentPin: "",
    error: "",
    loading: false,
  });

  const languages = useMemo(
    () => [
      { value: "uz", label: t("language.uz") },
      { value: "en", label: t("language.en") },
      { value: "ru", label: t("language.ru") },
    ],
    [t],
  );

  const themes = useMemo(
    () => [
      { value: "dark", label: t("theme.dark") },
      { value: "light", label: t("theme.light") },
    ],
    [t],
  );

  const sectionMeta = useMemo(
    () => ({
      appearance: {
        icon: Palette,
        title: t("profileUtility.sections.appearance.title"),
        description: t("profileUtility.sections.appearance.description"),
      },
      language: {
        icon: Globe,
        title: t("profileUtility.sections.language.title"),
        description: t("profileUtility.sections.language.description"),
      },
      security: {
        icon: Lock,
        title: t("profileUtility.sections.security.title"),
        description: t("profileUtility.sections.security.description"),
      },
      premium: {
        icon: Shield,
        title: t("profileUtility.sections.premium.title"),
        description: t("profileUtility.sections.premium.description"),
      },
      support: {
        icon: Headphones,
        title: t("profileUtility.sections.support.title"),
        description: t("profileUtility.sections.support.description"),
      },
      favorites: {
        icon: Heart,
        title: t("profileUtility.sections.favorites.title"),
        description: t("profileUtility.sections.favorites.description"),
      },
      learn: {
        icon: Sparkles,
        title: t("profileUtility.sections.learn.title"),
        description: t("profileUtility.sections.learn.description"),
      },
    }),
    [t],
  );

  const meta = useMemo(
    () => sectionMeta[section] || sectionMeta.appearance,
    [section, sectionMeta],
  );
  useEffect(() => {
    setAppLockEnabled(Boolean(currentUser?.appLockEnabled));
  }, [currentUser?.appLockEnabled]);

  useEffect(() => {
    if (section !== "language") return;
    const normalizedLanguage = normalizeLanguageCode(language);
    if (normalizedLanguage === normalizeLanguageCode(i18n.resolvedLanguage)) {
      return;
    }
    localStorage.setItem("language", normalizedLanguage);
    i18n.changeLanguage(normalizedLanguage);
  }, [i18n, language, section]);

  useEffect(() => {
    const nextLanguage = normalizeLanguageCode(i18n.resolvedLanguage);
    setLanguage((currentLanguage) =>
      currentLanguage === nextLanguage ? currentLanguage : nextLanguage,
    );
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (section !== "premium") return;

    const loadPlans = async () => {
      setLoadingPlans(true);
      try {
        const { data } = await axiosInstance.get("/premium/plans");
        setPlans(Array.isArray(data) ? data : []);
      } catch {
        setPlans([]);
      } finally {
        setLoadingPlans(false);
      }
    };

    loadPlans();
  }, [section]);

  useEffect(() => {
    if (section !== "premium") return;

    const loadDecorations = async () => {
      setDecorationsLoading(true);
      try {
        await fetchDecorations(true);
      } finally {
        setDecorationsLoading(false);
      }
    };

    loadDecorations();
  }, [fetchDecorations, section]);

  useEffect(() => {
    if (section !== "favorites") return;

    const loadFavorites = async () => {
      setLoadingFavorites(true);
      try {
        const [posts, articles, lessons] = await Promise.all([
          fetchLikedPosts(),
          fetchLikedArticles(),
          fetchLikedLessons(),
        ]);
        setLikedPosts(Array.isArray(posts) ? posts : []);
        setLikedArticles(Array.isArray(articles) ? articles : []);
        setLikedLessons(Array.isArray(lessons) ? lessons : []);
      } finally {
        setLoadingFavorites(false);
      }
    };

    loadFavorites();
  }, [fetchLikedLessons, fetchLikedPosts, section]);

  const refreshMe = async () => {
    const { data } = await axiosInstance.get("/users/me");
    setAuth({ ...(authUser || {}), ...data });
  };

  const loadSessions = useCallback(async () => {
    setSessionsLoading(true);
    try {
      const { data } = await axiosInstance.get("/auth/sessions");
      setSessions(Array.isArray(data) ? data : []);
    } catch {
      setSessions([]);
    } finally {
      setSessionsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (section !== "security") return;
    loadSessions();
  }, [section, loadSessions]);

  const handleDeleteSession = async (sessionId) => {
    if (deletingSessionId) return;
    setDeletingSessionId(sessionId);
    try {
      await axiosInstance.delete(`/auth/sessions/${sessionId}`);
      setSessions((prev) => prev.filter((s) => s._id !== sessionId));
      toast.success(t("profileUtility.security.sessionDeleted"));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || t("profileUtility.security.sessionDeleteError"),
      );
    } finally {
      setDeletingSessionId(null);
    }
  };

  const resetPinPad = () => {
    setPinPadState({
      open: false,
      mode: "setup",
      step: "new",
      pin: "",
      firstPin: "",
      currentPin: "",
      error: "",
      loading: false,
    });
  };

  const openPinPad = (mode) => {
    setPinPadState({
      open: true,
      mode,
      step: mode === "disable" ? "current" : mode === "change" ? "current" : "new",
      pin: "",
      firstPin: "",
      currentPin: "",
      error: "",
      loading: false,
    });
  };

  const updatePinPadStatus = (updates) => {
    setPinPadState((current) => ({ ...current, ...updates }));
  };

  const persistAppLockEnabled = (enabled) => {
    setAppLockEnabled(enabled);
    updateUser({ appLockEnabled: enabled });
  };

  const handlePinPadBackspace = () => {
    setPinPadState((current) => ({
      ...current,
      error: "",
      pin: current.pin.slice(0, -1),
    }));
  };

  const handlePinPadDigit = (digit) => {
    setPinPadState((current) => {
      if (current.loading || current.pin.length >= 4) {
        return current;
      }

      return {
        ...current,
        error: "",
        pin: `${current.pin}${digit}`,
      };
    });
  };

  const handlePinPadSubmit = async (completedPin) => {
    if (pinPadState.loading) return;

    if (pinPadState.mode === "disable") {
      updatePinPadStatus({ loading: true, error: "" });
      try {
        const { data } = await axiosInstance.post("/users/me/app-lock/remove", {
          pin: completedPin,
        });
        persistAppLockEnabled(Boolean(data?.enabled));
        sessionStorage.removeItem("jamm-app-lock-armed");
        toast.success(t("profileUtility.security.removed"));
        resetPinPad();
      } catch (error) {
        updatePinPadStatus({
          loading: false,
          pin: "",
          error:
            error?.response?.data?.message || t("profileUtility.security.invalidPin"),
        });
      }
      return;
    }

    if (pinPadState.step === "current") {
      updatePinPadStatus({ loading: true, error: "" });
      try {
        const { data } = await axiosInstance.post("/users/me/app-lock/verify", {
          pin: completedPin,
        });
        if (!data?.valid) {
          updatePinPadStatus({
            loading: false,
            pin: "",
            error: t("profileUtility.security.invalidPin"),
          });
          return;
        }

        updatePinPadStatus({
          loading: false,
          currentPin: completedPin,
          pin: "",
          step: "new",
        });
      } catch {
        updatePinPadStatus({
          loading: false,
          pin: "",
          error: t("profileUtility.security.invalidPin"),
        });
      }
      return;
    }

    if (pinPadState.step === "new") {
      updatePinPadStatus({
        pin: "",
        firstPin: completedPin,
        step: "confirm",
        error: "",
      });
      return;
    }

    if (pinPadState.step === "confirm") {
      if (completedPin !== pinPadState.firstPin) {
        updatePinPadStatus({
          pin: "",
          firstPin: "",
          step: "new",
          error: t("profileUtility.security.pinMismatch"),
        });
        return;
      }

      updatePinPadStatus({ loading: true, error: "" });
      try {
        const payload = { pin: completedPin };
        if (pinPadState.currentPin) {
          payload.currentPin = pinPadState.currentPin;
        }
        const { data } = await axiosInstance.post("/users/me/app-lock", payload);
        persistAppLockEnabled(Boolean(data?.enabled));
        toast.success(
          pinPadState.mode === "change"
            ? t("profileUtility.security.updated")
            : t("profileUtility.security.enabled"),
        );
        resetPinPad();
      } catch (error) {
        updatePinPadStatus({
          loading: false,
          pin: "",
          firstPin: "",
          currentPin: "",
          step: pinPadState.mode === "change" ? "current" : "new",
          error:
            error?.response?.data?.message || t("profileUtility.security.saveError"),
        });
      }
    }
  };

  useEffect(() => {
    if (!pinPadState.open || pinPadState.pin.length !== 4 || pinPadState.loading) {
      return;
    }

    const timer = window.setTimeout(() => {
      handlePinPadSubmit(pinPadState.pin);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [pinPadState.loading, pinPadState.open, pinPadState.pin]);

  const openSupportChat = async (username) => {
    try {
      const user = await getUserByUsername(username);
      if (!user) return;
      await createChat({
        isGroup: false,
        memberIds: [user._id || user.id],
      });
      await fetchChats();
      const userSlug = user.username || user.jammId || user._id || user.id;
      navigate(`/users/${userSlug}`);
    } catch {
      toast.error(t("profileUtility.support.chatError"));
    }
  };

  const redeemPromo = async () => {
    if (!promoCode.trim()) return;
    setRedeeming(true);
    try {
      await axiosInstance.post("/premium/redeem", { code: promoCode.trim() });
      await refreshMe();
      setPromoCode("");
      toast.success(t("profileUtility.premium.activated"));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || t("profileUtility.premium.invalidPromo"),
      );
    } finally {
      setRedeeming(false);
    }
  };

  const visibleDecorations = useMemo(
    () =>
      (decorations || []).filter(
        (item) =>
          item?.key &&
          item.key !== "custom-upload" &&
          item.key !== "official-badge",
      ),
    [decorations],
  );

  const renderDecorationIcon = (item) => {
    if (item?.key === "premium-badge") {
      return (
        <DecorationEmoji $plain>
          <OfficalBadge
            width={18}
            height={18}
            variant="premium"
            style={{ marginLeft: 0 }}
          />
        </DecorationEmoji>
      );
    }

    if (item?.key === "official-badge") {
      return (
        <DecorationEmoji $plain>
          <OfficalBadge
            width={18}
            height={18}
            color="var(--primary-color)"
            style={{ marginLeft: 0, filter: "none" }}
          />
        </DecorationEmoji>
      );
    }

    return <DecorationEmoji>{item?.emoji}</DecorationEmoji>;
  };

  const handleDecorationSelect = async (decorationId) => {
    if (decorationSaving) return;

    setDecorationSaving(true);
    try {
      const updatedUser = await updateProfileDecoration(decorationId);
      setAuth({ ...(authUser || {}), ...updatedUser });
      toast.success(
        decorationId
          ? t("profileUtility.premium.decorationSaved")
          : t("profileUtility.premium.decorationCleared"),
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          t("profileUtility.premium.decorationError"),
      );
    } finally {
      setDecorationSaving(false);
    }
  };

  const renderAppearance = () => (
    <>
      <Group>
        <GroupHeader>
          <h4>{t("profileUtility.appearance.groupTitle")}</h4>
          <p>{t("profileUtility.appearance.groupDescription")}</p>
        </GroupHeader>
        <SettingRow>
          <SettingMeta>
            <strong>{t("profileUtility.appearance.themeLabel")}</strong>
            <span>{t("profileUtility.appearance.themeDescription")}</span>
          </SettingMeta>
          <Select value={theme} onChange={(e) => toggleTheme(e.target.value)}>
            {themes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Select>
        </SettingRow>
      </Group>
    </>
  );

  const renderLanguage = () => (
    <Group>
      <GroupHeader>
        <h4>{t("profileUtility.language.groupTitle")}</h4>
        <p>{t("profileUtility.language.groupDescription")}</p>
      </GroupHeader>
      <SettingRow>
        <SettingMeta>
          <strong>{t("profileUtility.language.languageLabel")}</strong>
          <span>{t("profileUtility.language.languageDescription")}</span>
        </SettingMeta>
        <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </SettingRow>
      <SettingRow>
        <SettingMeta>
          <strong>{t("profileUtility.language.regionLabel")}</strong>
          <span>{t("profileUtility.language.regionDescription")}</span>
        </SettingMeta>
        <Badge>{t("common.global")}</Badge>
      </SettingRow>
    </Group>
  );

  const renderPremium = () => (
    <>
      <Group>
        <GroupHeader>
          <h4>{t("profileUtility.premium.statusTitle")}</h4>
          <p>{t("profileUtility.premium.statusDescription")}</p>
        </GroupHeader>
      <SettingRow>
        <SettingMeta>
          <strong>{t("profileUtility.premium.statusLabel")}</strong>
          <span>{t("profileUtility.premium.statusMeta")}</span>
          </SettingMeta>
          <Badge $active={currentUser?.premiumStatus === "active"}>
            <Sparkles size={14} />
            {currentUser?.premiumStatus === "active"
              ? t("common.active")
              : t("profileUtility.premium.freeAccount")}
          </Badge>
        </SettingRow>
        {currentUser?.premiumStatus !== "active" ? (
          <SettingRow $wideControl>
            <SettingMeta>
              <strong>{t("profileUtility.premium.promoLabel")}</strong>
              <span>{t("profileUtility.premium.promoDescription")}</span>
            </SettingMeta>
            <PromoRow>
              <Input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={t("profileUtility.premium.promoPlaceholder")}
              />
              <Button
                disabled={redeeming || !promoCode.trim()}
                onClick={redeemPromo}
              >
                <Zap size={14} />
                {redeeming
                  ? t("profileUtility.premium.checking")
                  : t("common.activate")}
              </Button>
            </PromoRow>
          </SettingRow>
        ) : null}
        <SettingRow>
          <SettingMeta>
            <strong>{t("profileUtility.premium.aboutTitle")}</strong>
            <span>{t("profileUtility.premium.aboutDescription")}</span>
          </SettingMeta>
          <Button
            $secondary
            onClick={() =>
              openPremiumUpgradeModal({ source: "profile-premium-panel" })
            }
          >
            <Sparkles size={14} />
            {t("profileUtility.premium.aboutAction")}
          </Button>
        </SettingRow>
      </Group>

      {currentUser?.premiumStatus !== "active" ? (
        <Group>
          <GroupHeader>
            <h4>{t("profileUtility.premium.plansTitle")}</h4>
            <p>{t("profileUtility.premium.plansDescription")}</p>
          </GroupHeader>
          <div style={{ padding: "0 14px 14px" }}>
            <PlansGrid>
              {plans.map((plan) => (
                <PlanCard key={plan._id} $premium>
                  <PlanName $premium>{plan.name}</PlanName>
                  <PlanPrice>${plan.price}</PlanPrice>
                  <div style={{ color: "var(--text-muted-color)", fontSize: 12 }}>
                    {plan.durationInDays} {t("profileUtility.premium.days")}
                  </div>
                  <Button onClick={() => openSupportChat("premium")}>
                    {t("profileUtility.premium.contactPremium")}
                  </Button>
                </PlanCard>
              ))}
              {!plans.length && !loadingPlans && (
                <PlanCard>
                  <PlanName>Premium</PlanName>
                  <div style={{ color: "var(--text-muted-color)", fontSize: 12 }}>
                    {t("profileUtility.premium.plansUnavailable")}
                  </div>
                  <Button onClick={() => openSupportChat("premium")}>
                    {t("common.contact")}
                  </Button>
                </PlanCard>
              )}
            </PlansGrid>
          </div>
        </Group>
      ) : null}

      <Group>
        <GroupHeader>
          <h4>{t("profileUtility.premium.decorationTitle")}</h4>
          <p>{t("profileUtility.premium.decorationDescription")}</p>
        </GroupHeader>
        <div style={{ padding: "0 14px 14px" }}>
          {decorationsLoading ? (
            <EmptyState>{t("common.loading")}</EmptyState>
          ) : (
            <DecorationsGrid>
              <DecorationCard
                type="button"
                $active={!currentUser?.selectedProfileDecorationId}
                onClick={() => handleDecorationSelect(null)}
                disabled={decorationSaving}
              >
                <DecorationPreview>
                  <DecorationEmoji>•</DecorationEmoji>
                  {t("profileUtility.premium.decorationNone")}
                </DecorationPreview>
                <DecorationMeta>
                  {t("profileUtility.premium.decorationNoneMeta")}
                </DecorationMeta>
              </DecorationCard>

              {visibleDecorations.map((item) => {
                const isLocked =
                  Boolean(item?.premiumOnly) &&
                  currentUser?.premiumStatus !== "active";
                const isActive =
                  currentUser?.selectedProfileDecorationId === item.key ||
                  currentUser?.selectedProfileDecorationId === item._id;

                return (
                  <DecorationCard
                    key={item._id || item.key}
                    type="button"
                    $active={isActive}
                    onClick={() =>
                      isLocked
                        ? openPremiumUpgradeModal({
                            source: "profile-decoration-lock",
                          })
                        : handleDecorationSelect(item.key)
                    }
                    disabled={decorationSaving}
                  >
                    <DecorationPreview>
                      {renderDecorationIcon(item)}
                      {item.label}
                    </DecorationPreview>
                    <DecorationMeta>
                      {isLocked
                        ? t("profileUtility.premium.decorationLockedDescription")
                        : t("profileUtility.premium.decorationBadgeMeta")}
                    </DecorationMeta>
                  </DecorationCard>
                );
              })}
            </DecorationsGrid>
          )}
        </div>
      </Group>

    </>
  );

  const renderSupport = () => (
    <CardsGrid>
      <InfoCard>
        <h4>{t("profileUtility.support.premiumTitle")}</h4>
        <p>{t("profileUtility.support.premiumDescription")}</p>
        <Button onClick={() => openSupportChat("premium")}>
          {t("profileUtility.support.premiumAction")}
        </Button>
      </InfoCard>
      <InfoCard>
        <h4>{t("profileUtility.support.jammTitle")}</h4>
        <p>{t("profileUtility.support.jammDescription")}</p>
        <Button $secondary onClick={() => openSupportChat("jamm")}>
          {t("profileUtility.support.jammAction")}
        </Button>
      </InfoCard>
    </CardsGrid>
  );

  const renderFavorites = () => (
    <FavoritesStack>
      <Group>
        <GroupHeader>
          <h4>{t("profileUtility.favorites.lessonsTitle")}</h4>
          <p>{t("profileUtility.favorites.lessonsDescription")}</p>
        </GroupHeader>
        <div style={{ padding: "0 14px 14px" }}>
          {likedLessons.length ? (
            <CardsGrid>
              {likedLessons.map((lesson) => (
                <FavoriteCard
                  key={lesson._id}
                  onClick={() =>
                    navigate(
                      `/my-courses/${lesson.course?.urlSlug || lesson.course?._id}/${lesson.urlSlug || lesson._id}`,
                    )
                  }
                >
                  <FavoriteTitle>{lesson.title}</FavoriteTitle>
                  <FavoriteMeta>
                    {lesson.course?.name || t("common.course")} · {lesson.likes || 0}{" "}
                    {t("common.like")} · {lesson.views || 0} {t("common.views")}
                  </FavoriteMeta>
                </FavoriteCard>
              ))}
            </CardsGrid>
          ) : (
            <EmptyState>
              {loadingFavorites
                ? t("common.loading")
                : t("profileUtility.favorites.lessonsEmpty")}
            </EmptyState>
          )}
        </div>
      </Group>

      <Group>
        <GroupHeader>
          <h4>{t("profileUtility.favorites.postsTitle")}</h4>
          <p>{t("profileUtility.favorites.postsDescription")}</p>
        </GroupHeader>
        <div style={{ padding: "0 14px 14px" }}>
          {likedPosts.length ? (
            <CardsGrid>
              {likedPosts.map((post) => (
                <FavoriteCard key={post._id} onClick={() => navigate("/feed")}>
                  <FavoriteTitle>
                    {post.author?.nickname || post.author?.username || t("common.author")}
                  </FavoriteTitle>
                  {getFavoriteMarkdown(post) ? (
                    <FavoriteMarkdownPreview content={getFavoriteMarkdown(post)} />
                  ) : (
                    <FavoriteMeta>Kontent yo'q</FavoriteMeta>
                  )}
                </FavoriteCard>
              ))}
            </CardsGrid>
          ) : (
            <EmptyState>
              {loadingFavorites
                ? t("common.loading")
                : t("profileUtility.favorites.postsEmpty")}
            </EmptyState>
          )}
        </div>
      </Group>

      <Group>
        <GroupHeader>
          <h4>{t("profileUtility.favorites.articlesTitle")}</h4>
          <p>{t("profileUtility.favorites.articlesDescription")}</p>
        </GroupHeader>
        <div style={{ padding: "0 14px 14px" }}>
          {likedArticles.length ? (
            <CardsGrid>
              {likedArticles.map((article) => (
                <FavoriteCard
                  key={article._id}
                  onClick={() => navigate(`/articles/${article.slug || article._id}`)}
                >
                  <FavoriteTitle>{article.title}</FavoriteTitle>
                  {getFavoriteMarkdown(article) ? (
                    <FavoriteMarkdownPreview content={getFavoriteMarkdown(article)} />
                  ) : null}
                  <FavoriteMeta>
                    {article.author?.nickname || article.author?.username || t("common.author")}
                    {" · "}
                    {article.likes || 0} {t("common.like")}
                  </FavoriteMeta>
                </FavoriteCard>
              ))}
            </CardsGrid>
          ) : (
            <EmptyState>
              {loadingFavorites
                ? t("common.loading")
                : t("profileUtility.favorites.articlesEmpty")}
            </EmptyState>
          )}
        </div>
      </Group>
    </FavoritesStack>
  );

  const renderLearn = () => (
    <CardsGrid>
      <InfoCard>
        <h4>{t("profileUtility.learn.title")}</h4>
        <p>{t("profileUtility.learn.description")}</p>
        <Button
          onClick={() => {
            window.dispatchEvent(new Event("jamm:start-guided-tour"));
          }}
        >
          <Sparkles size={14} />
          {t("profileUtility.learn.start")}
        </Button>
      </InfoCard>
    </CardsGrid>
  );

  const pinPadTitle =
    pinPadState.mode === "disable"
      ? t("profileUtility.security.turnOffTitle")
      : pinPadState.mode === "change" && pinPadState.step === "current"
        ? t("profileUtility.security.currentPinTitle")
        : pinPadState.step === "confirm"
          ? t("profileUtility.security.confirmPinTitle")
          : t("profileUtility.security.newPinTitle");

  const pinPadDescription =
    pinPadState.mode === "disable"
      ? t("profileUtility.security.turnOffDescription")
      : pinPadState.step === "current"
        ? t("profileUtility.security.currentPinDescription")
        : pinPadState.step === "confirm"
          ? t("profileUtility.security.confirmPinDescription")
          : t("profileUtility.security.newPinDescription");

  const getSessionIcon = (deviceType) => {
    if (deviceType === "mobile") return <Smartphone size={18} />;
    if (deviceType === "tablet") return <Tablet size={18} />;
    return <Monitor size={18} />;
  };

  const formatLastUsed = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);
    if (diffMin < 1) return t("profileUtility.security.sessionJustNow");
    if (diffMin < 60) return t("profileUtility.security.sessionMinutesAgo", { count: diffMin });
    if (diffHr < 24) return t("profileUtility.security.sessionHoursAgo", { count: diffHr });
    if (diffDay < 30) return t("profileUtility.security.sessionDaysAgo", { count: diffDay });
    return date.toLocaleDateString();
  };

  // Current session is older than 1 day → can delete others
  const currentSession = sessions.find((s) => s.isCurrent);
  const canDeleteOthers = currentSession
    ? Date.now() - new Date(currentSession.createdAt).getTime() >= 24 * 60 * 60 * 1000
    : false;

  const renderSecurity = () => (
    <SecurityStack>
      <Group>
        <GroupHeader>
          <h4>{t("profileUtility.security.statusTitle")}</h4>
          <p>{t("profileUtility.security.statusDescription")}</p>
        </GroupHeader>
        <SettingRow>
          <SettingMeta>
            <strong>{t("profileUtility.security.appLockLabel")}</strong>
            <span>{t("profileUtility.security.appLockMeta")}</span>
          </SettingMeta>
          <SecurityStatus $active={appLockEnabled}>
            <Lock size={14} />
            {appLockEnabled
              ? t("profileUtility.security.enabledBadge")
              : t("profileUtility.security.disabledBadge")}
          </SecurityStatus>
        </SettingRow>
      </Group>

      <CardsGrid>
        <InfoCard>
          <h4>{t("profileUtility.security.passcodeTitle")}</h4>
          <p>{t("profileUtility.security.passcodeDescription")}</p>
          <Button onClick={() => openPinPad(appLockEnabled ? "change" : "setup")}>
            <Lock size={14} />
            {appLockEnabled
              ? t("profileUtility.security.changeAction")
              : t("profileUtility.security.enableAction")}
          </Button>
        </InfoCard>

        <InfoCard>
          <h4>{t("profileUtility.security.autoLockTitle")}</h4>
          <p>{t("profileUtility.security.autoLockDescription")}</p>
          <DangerButton
            disabled={!appLockEnabled}
            onClick={() => openPinPad("disable")}
          >
            <Lock size={14} />
            {t("profileUtility.security.disableAction")}
          </DangerButton>
        </InfoCard>
      </CardsGrid>

      <Group>
        <GroupHeader>
          <h4>{t("profileUtility.security.sessionsTitle")}</h4>
          <p>{t("profileUtility.security.sessionsDescription")}</p>
        </GroupHeader>
        {sessionsLoading ? (
          <div style={{ padding: "14px", color: "var(--text-muted-color)", fontSize: 13 }}>
            {t("common.loading")}
          </div>
        ) : sessions.length === 0 ? (
          <div style={{ padding: "14px", color: "var(--text-muted-color)", fontSize: 13 }}>
            {t("profileUtility.security.sessionsEmpty")}
          </div>
        ) : (
          <SessionsList>
            {sessions.map((session) => (
              <SessionItem key={session._id}>
                <SessionIcon $current={session.isCurrent}>
                  {getSessionIcon(session.deviceType)}
                </SessionIcon>
                <SessionInfo>
                  <SessionName>
                    {session.deviceName || t("profileUtility.security.unknownDevice")}
                    {session.isCurrent && (
                      <SessionCurrentBadge>
                        {t("profileUtility.security.currentSession")}
                      </SessionCurrentBadge>
                    )}
                  </SessionName>
                  <SessionMeta>
                    {session.ipAddress ? `${session.ipAddress} · ` : ""}
                    {t("profileUtility.security.sessionLastUsed")}: {formatLastUsed(session.lastUsedAt)}
                  </SessionMeta>
                </SessionInfo>
                {!session.isCurrent && (
                  <SessionDeleteBtn
                    title={
                      !canDeleteOthers
                        ? t("profileUtility.security.sessionDeleteRestriction")
                        : t("common.delete")
                    }
                    disabled={!!deletingSessionId || !canDeleteOthers}
                    onClick={() => handleDeleteSession(session._id)}
                  >
                    <Trash2 size={15} />
                  </SessionDeleteBtn>
                )}
              </SessionItem>
            ))}
          </SessionsList>
        )}
        {!canDeleteOthers && sessions.length > 1 && (
          <div style={{ padding: "8px 14px 12px", color: "var(--text-muted-color)", fontSize: 11 }}>
            {t("profileUtility.security.sessionDeleteRestriction")}
          </div>
        )}
      </Group>

      <AppLockPinPad
        open={pinPadState.open}
        title={pinPadTitle}
        description={pinPadDescription}
        valueLength={pinPadState.pin.length}
        error={pinPadState.error}
        loading={pinPadState.loading}
        onClose={resetPinPad}
        onDigit={handlePinPadDigit}
        onBackspace={handlePinPadBackspace}
        footer={t("profileUtility.security.footer")}
      />
    </SecurityStack>
  );

  const content = (
    <Body>
      {section === "appearance" && renderAppearance()}
      {section === "language" && renderLanguage()}
      {section === "security" && renderSecurity()}
      {section === "premium" && renderPremium()}
      {section === "support" && renderSupport()}
      {section === "favorites" && renderFavorites()}
      {section === "learn" && renderLearn()}
    </Body>
  );

  if (embedded) {
    return content;
  }

  return (
    <Wrapper data-tour={`profile-pane-${section}`}>
      <Header>
        <MobileBackBtn onClick={onBack}>
          <ArrowLeft size={20} />
        </MobileBackBtn>
        <HeaderTitle>{meta.title}</HeaderTitle>
      </Header>
      {content}
    </Wrapper>
  );
};

export default ProfileUtilityPanel;
