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
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useChats } from "../contexts/ChatsContext";
import { usePosts } from "../contexts/PostsContext";
import { useCourses } from "../contexts/CoursesContext";
import useAuthStore from "../store/authStore";
import axiosInstance from "../api/axiosInstance";
import { fetchLikedBlogs } from "../api/blogsApi";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
`;

const Header = styled.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  background: var(--secondary-color);
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-color);
  }
`;

const Body = styled.div`
  padding: 16px 18px 22px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const Hero = styled.div`
  padding: 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);

  h3 {
    margin: 0 0 6px;
    color: var(--text-color);
    font-size: 18px;
    font-weight: 800;
  }

  p {
    margin: 0;
    color: var(--text-secondary-color);
    line-height: 1.5;
    max-width: 620px;
    font-size: 12px;
  }
`;

const Group = styled.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
`;

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

const EmptyState = styled.div`
  padding: 18px 14px;
  border-radius: 12px;
  border: 1px dashed var(--border-color);
  color: var(--text-muted-color);
  text-align: center;
  line-height: 1.5;
  font-size: 12px;
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

const languages = [
  { value: "uz-UZ", label: "O'zbekcha" },
  { value: "en-US", label: "English (US)" },
  { value: "ru-RU", label: "Русский" },
];

const themes = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
];

const sectionMeta = {
  appearance: {
    icon: Palette,
    title: "Theme",
    description: "Interfeys ko'rinishini boshqaring.",
  },
  language: {
    icon: Globe,
    title: "Language",
    description: "Til va region parametrlarini saqlang.",
  },
  premium: {
    icon: Shield,
    title: "Jamm Premium",
    description: "Premium holati, promo-kod va obuna rejalarini boshqaring.",
  },
  support: {
    icon: Headphones,
    title: "Qo'llab-quvvatlash",
    description: "Muammo yoki savollar uchun tez aloqa nuqtalari.",
  },
  favorites: {
    icon: Heart,
    title: "Sevimlilarim",
    description: "Saqlangan kontentlar uchun alohida bo'lim.",
  },
};

const ProfileUtilityPanel = ({ section, currentUser }) => {
  const { theme, toggleTheme } = useTheme();
  const { getUserByUsername, createChat, fetchChats } = useChats();
  const { fetchLikedPosts } = usePosts();
  const { fetchLikedLessons } = useCourses();
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "uz-UZ",
  );
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [likedLessons, setLikedLessons] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  const meta = useMemo(
    () => sectionMeta[section] || sectionMeta.appearance,
    [section],
  );
  const Icon = meta.icon;

  useEffect(() => {
    if (section !== "language") return;
    localStorage.setItem("language", language);
  }, [section, language]);

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
      toast.error("Chatni ochib bo'lmadi");
    }
  };

  const redeemPromo = async () => {
    if (!promoCode.trim()) return;
    setRedeeming(true);
    try {
      await axiosInstance.post("/premium/redeem", { code: promoCode.trim() });
      await refreshMe();
      setPromoCode("");
      toast.success("Premium faollashtirildi");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Promo-kod yaroqsiz");
    } finally {
      setRedeeming(false);
    }
  };

  const renderAppearance = () => (
    <Group>
      <GroupHeader>
        <h4>Ko'rinish</h4>
        <p>Hozircha faqat asosiy mavzu almashinuvi mavjud.</p>
      </GroupHeader>
      <SettingRow>
        <SettingMeta>
          <strong>Theme</strong>
          <span>Jamm interfeysi dark yoki light ko'rinishda ishlaydi.</span>
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
        <h4>Til va region</h4>
        <p>Tanlangan qiymatlar local storage’da saqlanadi.</p>
      </GroupHeader>
      <SettingRow>
        <SettingMeta>
          <strong>Language</strong>
          <span>Asosiy interfeys tili uchun tayyor parametr.</span>
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
          <strong>Region</strong>
          <span>Hozircha global rejim ishlatiladi.</span>
        </SettingMeta>
        <Badge>Global</Badge>
      </SettingRow>
    </Group>
  );

  const renderPremium = () => (
    <>
      <Group>
        <GroupHeader>
          <h4>Premium holati</h4>
          <p>Joriy obuna va promo-kod orqali faollashtirish.</p>
        </GroupHeader>
        <SettingRow>
          <SettingMeta>
            <strong>Status</strong>
            <span>Profilingizdagi premium holati.</span>
          </SettingMeta>
          <Badge $active={currentUser?.premiumStatus === "active"}>
            <Sparkles size={14} />
            {currentUser?.premiumStatus === "active" ? "Aktiv" : "Oddiy hisob"}
          </Badge>
        </SettingRow>
        <SettingRow>
          <SettingMeta>
            <strong>Promo-kod</strong>
            <span>Premium’ni tez yoqish uchun kod kiriting.</span>
          </SettingMeta>
          <PromoRow>
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Kodni kiriting"
            />
            <Button
              disabled={redeeming || !promoCode.trim()}
              onClick={redeemPromo}
            >
              <Zap size={14} />
              {redeeming ? "Tekshirilmoqda..." : "Faollashtirish"}
            </Button>
          </PromoRow>
        </SettingRow>
      </Group>

      <Group>
        <GroupHeader>
          <h4>Obuna rejalari</h4>
          <p>Qo'shimcha imkoniyatlar uchun premium rejalari.</p>
        </GroupHeader>
        <div style={{ padding: "0 14px 14px" }}>
          <PlansGrid>
            {plans.map((plan) => (
              <PlanCard key={plan._id} $premium>
                <PlanName $premium>{plan.name}</PlanName>
                <PlanPrice>${plan.price}</PlanPrice>
                <div style={{ color: "var(--text-muted-color)", fontSize: 12 }}>
                  {plan.durationInDays} kun
                </div>
                <Button onClick={() => openSupportChat("premium")}>
                  Premium bilan bog'lanish
                </Button>
              </PlanCard>
            ))}
            {!plans.length && !loadingPlans && (
              <PlanCard>
                <PlanName>Premium</PlanName>
                <div style={{ color: "var(--text-muted-color)", fontSize: 12 }}>
                  Rejalar vaqtincha ko'rsatilmayapti.
                </div>
                <Button onClick={() => openSupportChat("premium")}>
                  Aloqa
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
        <h4>Premium support</h4>
        <p>Obuna, promo-kod yoki limitlar bo'yicha savollar uchun.</p>
        <Button onClick={() => openSupportChat("premium")}>
          @premium ga yozish
        </Button>
      </InfoCard>
      <InfoCard>
        <h4>Jamm support</h4>
        <p>Umumiy texnik muammo yoki account masalalari uchun.</p>
        <Button $secondary onClick={() => openSupportChat("jamm")}>
          @jamm ga yozish
        </Button>
      </InfoCard>
    </CardsGrid>
  );

  const renderFavorites = () => (
    <FavoritesStack>
      <Group>
        <GroupHeader>
          <h4>Like bosgan darslar</h4>
          <p>Sevimli lessonlar shu yerda jamlanadi.</p>
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
                    {lesson.course?.name || "Kurs"} · {lesson.likes || 0} like
                    · {lesson.views || 0} ko'rish
                  </FavoriteMeta>
                </FavoriteCard>
              ))}
            </CardsGrid>
          ) : (
            <EmptyState>
              {loadingFavorites
                ? "Yuklanmoqda..."
                : "Hozircha like bosilgan darslar yo'q."}
            </EmptyState>
          )}
        </div>
      </Group>

      <Group>
        <GroupHeader>
          <h4>Like bosgan gurunglar</h4>
          <p>Yoqtirgan gurunglaringiz ro'yxati.</p>
        </GroupHeader>
        <div style={{ padding: "0 14px 14px" }}>
          {likedPosts.length ? (
            <CardsGrid>
              {likedPosts.map((post) => (
                <FavoriteCard key={post._id} onClick={() => navigate("/feed")}>
                  <FavoriteTitle>
                    {post.author?.nickname || post.author?.username || "Muallif"}
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
                ? "Yuklanmoqda..."
                : "Hozircha like bosilgan gurunglar yo'q."}
            </EmptyState>
          )}
        </div>
      </Group>

      <Group>
        <GroupHeader>
          <h4>Like bosgan bloglar</h4>
          <p>Yoqtirgan bloglaringiz shu yerda turadi.</p>
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
                    {blog.author?.nickname || blog.author?.username || "Muallif"}
                    {" · "}
                    {blog.likes || 0} like
                  </FavoriteMeta>
                </FavoriteCard>
              ))}
            </CardsGrid>
          ) : (
            <EmptyState>
              {loadingFavorites
                ? "Yuklanmoqda..."
                : "Hozircha like bosilgan bloglar yo'q."}
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
        <h2>{meta.title}</h2>
      </Header>
      <Body>
        <Hero>
          <h3>{meta.title}</h3>
          <p>{meta.description}</p>
        </Hero>
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
