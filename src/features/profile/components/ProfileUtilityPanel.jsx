import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  Globe,
  Heart,
  Headphones,
  Palette,
  Shield,
  Sparkles,
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
import { normalizeLanguageCode } from "../../../i18n";
import {
  ProfilePaneBody as Body,
  ProfilePaneHeader as Header,
  ProfilePaneSection as Group,
  ProfilePaneTitle as HeaderTitle,
  ProfilePaneWrapper as Wrapper,
  ProfilePaneEmptyState as EmptyState,
} from "../ui/ProfilePane";

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
  grid-template-columns: minmax(0, 1fr) minmax(180px, 320px);
  gap: 12px;

  & > :last-child {
    width: 100%;
    min-width: 0;
    justify-self: end;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    & > :last-child {
      justify-self: stretch;
    }
  }
`;

const SettingMeta = styled.div`
  min-width: 0;

  strong {
    display: block;
    color: var(--text-color);
    font-size: 13px;
    margin-bottom: 3px;
  }

  span {
    color: var(--text-muted-color);
    font-size: 12px;
    line-height: 1.45;
  }
`;

const Select = styled.select`
  width: 100%;
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
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  padding: 0 10px;
  font-size: 12px;
  outline: none;
  min-width: 0;
`;

const Button = styled.button`
  height: 36px;
  padding: 0 12px;
  border-radius: 10px;
  border: none;
  background: ${(p) =>
    p.$secondary ? "var(--input-color)" : "var(--primary-color)"};
  color: ${(p) => (p.$secondary ? "var(--text-color)" : "white")};
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.55 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
  white-space: nowrap;
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

const ProfileUtilityPanel = ({ section, currentUser }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { getUserByUsername, createChat, fetchChats } = useChats();
  const { fetchLikedPosts } = usePosts();
  const { fetchLikedLessons } = useCourses();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);
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
  const [likedPosts, setLikedPosts] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [likedLessons, setLikedLessons] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

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
    }),
    [t],
  );

  const meta = useMemo(
    () => sectionMeta[section] || sectionMeta.appearance,
    [section, sectionMeta],
  );
  const Icon = meta.icon;

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
    setAuth({ ...(authUser || {}), ...data }, token);
  };

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

  const renderAppearance = () => (
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
        <SettingRow>
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

  return (
    <Wrapper>
      <Header>
        <Icon size={22} color="var(--primary-color)" />
        <HeaderTitle>{meta.title}</HeaderTitle>
      </Header>
      <Body>
        {section === "appearance" && renderAppearance()}
        {section === "language" && renderLanguage()}
        {section === "premium" && renderPremium()}
        {section === "support" && renderSupport()}
        {section === "favorites" && renderFavorites()}
      </Body>
    </Wrapper>
  );
};

export default ProfileUtilityPanel;
