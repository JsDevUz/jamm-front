import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
  ArrowLeft,
  Globe,
  Heart,
  Headphones,
  ImagePlus,
  Lock,
  Palette,
  Shield,
  Sparkles,
  Sticker,
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
import { fetchLikedBlogs } from "../../../api/blogsApi";
import {
  updateProfileDecoration,
  uploadProfileDecorationImage,
} from "../../../api/usersApi";
import { normalizeLanguageCode } from "../../../i18n";
import useProfileDecorationsStore from "../../../store/profileDecorationsStore";
import UserNameWithDecoration from "../../../shared/ui/users/UserNameWithDecoration";
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
    max-width: ${(props) => (props.$wideControl ? "none" : "140px")};
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
  border: 1px solid var(--border-color);
  background: var(--input-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const DecorationMeta = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  line-height: 1.4;
`;

const HiddenFileInput = styled.input`
  display: none;
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

const ProfileUtilityPanel = ({ section, currentUser, onBack }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { getUserByUsername, createChat, fetchChats } = useChats();
  const { fetchLikedPosts } = usePosts();
  const { fetchLikedLessons } = useCourses();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);
  const updateUser = useAuthStore((state) => state.updateUser);
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
  const [updatingDecoration, setUpdatingDecoration] = useState(false);
  const [uploadingDecorationImage, setUploadingDecorationImage] = useState(false);
  const decorationFileInputRef = useRef(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [likedLessons, setLikedLessons] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);
  const [appLockEnabled, setAppLockEnabled] = useState(
    Boolean(currentUser?.appLockEnabled),
  );
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
    fetchDecorations();
  }, [fetchDecorations, section]);

  useEffect(() => {
    if (section !== "favorites") return;

    const loadFavorites = async () => {
      setLoadingFavorites(true);
      try {
        const [posts, blogs, lessons] = await Promise.all([
          fetchLikedPosts(),
          fetchLikedBlogs(),
          fetchLikedLessons(),
        ]);
        setLikedPosts(Array.isArray(posts) ? posts : []);
        setLikedBlogs(Array.isArray(blogs) ? blogs : []);
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
      const chat = await createChat({
        isGroup: false,
        memberIds: [user._id || user.id],
      });
      await fetchChats();
      navigate(`/groups/${chat.urlSlug || chat.jammId || chat._id || chat.id}`);
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

  const handleSelectDecoration = async (decorationId) => {
    if (updatingDecoration) return;

    setUpdatingDecoration(true);
    try {
      const updatedUser = await updateProfileDecoration(decorationId);
      setAuth({
        ...(authUser || {}),
        ...updatedUser,
      });
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
      setUpdatingDecoration(false);
    }
  };

  const handleUploadDecorationImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || uploadingDecorationImage) return;

    setUploadingDecorationImage(true);
    try {
      const updatedUser = await uploadProfileDecorationImage(file);
      setAuth({
        ...(authUser || {}),
        ...updatedUser,
      });
      toast.success(t("profileUtility.premium.decorationImageSaved"));
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          t("profileUtility.premium.decorationImageError"),
      );
    } finally {
      setUploadingDecorationImage(false);
    }
  };

  const handleCustomDecorationCardClick = async () => {
    if (!currentUser?.customProfileDecorationImage || uploadingDecorationImage) {
      decorationFileInputRef.current?.click();
      return;
    }

    if (currentUser?.selectedProfileDecorationId !== "custom-upload") {
      await handleSelectDecoration("custom-upload");
      return;
    }

    decorationFileInputRef.current?.click();
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
      </Group>

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

      <Group>
        <GroupHeader>
          <h4>{t("profileUtility.premium.decorationTitle")}</h4>
          <p>{t("profileUtility.premium.decorationDescription")}</p>
        </GroupHeader>
        <div style={{ padding: "0 14px 14px" }}>
          {currentUser?.premiumStatus === "active" ? (
            <>
              <DecorationsGrid>
                <DecorationCard
                  type="button"
                  $active={
                    currentUser?.selectedProfileDecorationId === "premium-badge"
                  }
                  onClick={() => handleSelectDecoration("premium-badge")}
                  disabled={updatingDecoration}
                >
                  <DecorationPreview>
                    <UserNameWithDecoration
                      user={{
                        nickname:
                          currentUser?.nickname ||
                          currentUser?.username ||
                          t("common.userFallback"),
                        username: currentUser?.username,
                        premiumStatus: "active",
                        selectedProfileDecorationId: "premium-badge",
                      }}
                      fallback={t("common.userFallback")}
                    />
                  </DecorationPreview>
                  <DecorationMeta>
                    {t("profileUtility.premium.decorationBadgeMeta")}
                  </DecorationMeta>
                </DecorationCard>
                <DecorationCard
                  type="button"
                  $active={!currentUser?.selectedProfileDecorationId}
                  onClick={() => handleSelectDecoration(null)}
                  disabled={updatingDecoration}
                >
                  <DecorationPreview>
                    <DecorationEmoji>∅</DecorationEmoji>
                    <span>{t("profileUtility.premium.decorationNone")}</span>
                  </DecorationPreview>
                  <DecorationMeta>
                    {t("profileUtility.premium.decorationNoneMeta")}
                  </DecorationMeta>
                </DecorationCard>
                <DecorationCard
                  type="button"
                  $active={
                    currentUser?.selectedProfileDecorationId === "custom-upload"
                  }
                  onClick={handleCustomDecorationCardClick}
                  disabled={uploadingDecorationImage || updatingDecoration}
                >
                  <HiddenFileInput
                    ref={decorationFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadDecorationImage}
                  />
                  <DecorationPreview>
                    <UserNameWithDecoration
                      user={{
                        nickname:
                          currentUser?.nickname ||
                          currentUser?.username ||
                          t("common.userFallback"),
                        username: currentUser?.username,
                        premiumStatus: currentUser?.premiumStatus,
                        selectedProfileDecorationId:
                          currentUser?.customProfileDecorationImage
                            ? "custom-upload"
                            : null,
                        customProfileDecorationImage:
                          currentUser?.customProfileDecorationImage || null,
                      }}
                      fallback={t("common.userFallback")}
                    />
                  </DecorationPreview>
                  <DecorationMeta>
                    {uploadingDecorationImage
                      ? t("profileUtility.premium.decorationImageUploading")
                      : currentUser?.customProfileDecorationImage
                        ? t("profileUtility.premium.decorationImageReplace")
                        : t("profileUtility.premium.decorationImageUpload")}
                  </DecorationMeta>
                </DecorationCard>
                {decorations.map((decoration) => (
                  <DecorationCard
                    key={decoration.key || decoration._id}
                    type="button"
                    $active={
                      currentUser?.selectedProfileDecorationId === decoration.key
                    }
                    onClick={() => handleSelectDecoration(decoration.key)}
                    disabled={updatingDecoration}
                  >
                    <DecorationPreview>
                      <UserNameWithDecoration
                        user={{
                          nickname:
                            currentUser?.nickname ||
                            currentUser?.username ||
                            t("common.userFallback"),
                          username: currentUser?.username,
                          premiumStatus: currentUser?.premiumStatus,
                          selectedProfileDecorationId: decoration.key,
                        }}
                        fallback={t("common.userFallback")}
                      />
                    </DecorationPreview>
                    <DecorationMeta>{decoration.label}</DecorationMeta>
                  </DecorationCard>
                ))}
              </DecorationsGrid>
            </>
          ) : (
            <InfoCard>
              <h4>{t("profileUtility.premium.decorationLockedTitle")}</h4>
              <p>{t("profileUtility.premium.decorationLockedDescription")}</p>
              <Button onClick={() => openSupportChat("premium")}>
                <Sticker size={14} />
                {t("profileUtility.premium.contactPremium")}
              </Button>
            </InfoCard>
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
                      `/courses/${lesson.course?.urlSlug || lesson.course?._id}/${lesson.urlSlug || lesson._id}`,
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
                  <FavoriteMeta>
                    {String(post.content || "").slice(0, 160)}
                  </FavoriteMeta>
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
          <h4>{t("profileUtility.favorites.blogsTitle")}</h4>
          <p>{t("profileUtility.favorites.blogsDescription")}</p>
        </GroupHeader>
        <div style={{ padding: "0 14px 14px" }}>
          {likedBlogs.length ? (
            <CardsGrid>
              {likedBlogs.map((blog) => (
                <FavoriteCard
                  key={blog._id}
                  onClick={() => navigate(`/blogs/${blog.slug || blog._id}`)}
                >
                  <FavoriteTitle>{blog.title}</FavoriteTitle>
                  <FavoriteMeta>
                    {blog.author?.nickname || blog.author?.username || t("common.author")}
                    {" · "}
                    {blog.likes || 0} {t("common.like")}
                  </FavoriteMeta>
                </FavoriteCard>
              ))}
            </CardsGrid>
          ) : (
            <EmptyState>
              {loadingFavorites
                ? t("common.loading")
                : t("profileUtility.favorites.blogsEmpty")}
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

  return (
    <Wrapper data-tour={`profile-pane-${section}`}>
      <Header>
        <MobileBackBtn onClick={onBack}>
          <ArrowLeft size={20} />
        </MobileBackBtn>
        <HeaderTitle>{meta.title}</HeaderTitle>
      </Header>
      <Body>
        {section === "appearance" && renderAppearance()}
        {section === "language" && renderLanguage()}
        {section === "security" && renderSecurity()}
        {section === "premium" && renderPremium()}
        {section === "support" && renderSupport()}
        {section === "favorites" && renderFavorites()}
        {section === "learn" && renderLearn()}
      </Body>
    </Wrapper>
  );
};

export default ProfileUtilityPanel;
