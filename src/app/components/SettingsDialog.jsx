import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useChats } from "../../contexts/ChatsContext";
import {
  X,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mic,
  HelpCircle,
  LogOut,
  Camera,
  Check,
  AlertCircle,
  Loader,
  Star,
  Zap,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useTheme } from "../../contexts/ThemeContext";
import useAuthStore from "../../store/authStore";
import { API_BASE_URL } from "../../config/env";
import { getUserByUsername, createChat, fetchChats } from "../../api/chatApi";
import {
  Skeleton,
  SkeletonCircle,
} from "../../shared/ui/feedback/Skeleton";
import PremiumBadgeIcon from "../../shared/ui/badges/PremiumBadge";
import { SidebarIconButton as ButtonWrapper } from "../../shared/ui/buttons/IconButton";
import {
  getDesktopNotificationsEnabled,
  getSoundNotificationsEnabled,
  requestDesktopNotificationPermission,
  setDesktopNotificationsEnabled,
  setSoundNotificationsEnabled,
} from "../../utils/desktopNotifications";

const SettingsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 10003;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SettingsDialogComponent = styled.div`
  background-color: var(--secondary-color);
  border-radius: 8px;
  width: 740px;
  height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const SettingsHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SettingsTitle = styled.div`
  color: var(--text-color);
  font-size: 20px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--hover-color);
    color: var(--text-color);
  }
`;

const SettingsContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 240px;
  background-color: #202225;
  padding: 8px 0;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    overflow-x: auto;
    padding: 0;
    flex-shrink: 0;

    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const SidebarItem = styled.div`
  padding: 8px 16px;
  color: ${(props) => (props.active ? "#fff" : "#b9bbbe")};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
  }

  ${(props) =>
    props.active &&
    `
    background-color: #5865f2;
    color: #fff;
    border-radius: 4px;
  `}

  @media (max-width: 768px) {
    padding: 12px 16px;
    white-space: nowrap;
    border-radius: 0;
    ${(props) =>
      props.active &&
      `
      border-bottom: 2px solid #5865f2;
      border-radius: 0;
    `}
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SectionTitle = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const SectionDescription = styled.div`
  color: #b9bbbe;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.4;
`;

const SettingGroup = styled.div`
  margin-bottom: 32px;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #40444b;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const SettingLabel = styled.div`
  color: #dcddde;
  font-size: 16px;
  font-weight: 500;
`;

const SettingDescription = styled.div`
  color: #b9bbbe;
  font-size: 14px;
  margin-top: 4px;
`;

const Toggle = styled.label`
  position: relative;
  width: 44px;
  height: 24px;
  background-color: ${(props) => (props.checked ? "#5865f2" : "#72767d")};
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const ToggleSlider = styled.div`
  position: absolute;
  top: 2px;
  left: ${(props) => (props.checked ? "22px" : "2px")};
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  transition: left 0.2s ease;
`;

const Select = styled.select`
  background-color: #40444b;
  color: #dcddde;
  border: 1px solid #202225;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #5865f2;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 12px;
  }
`;

const Input = styled.input`
  background-color: #40444b;
  color: #dcddde;
  border: 1px solid #202225;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #5865f2;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 12px;
  }
`;

const Button = styled.button`
  background-color: #5865f2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #4752c4;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 16px;
  }
`;

const DangerButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 16px;
  }
`;

// ─── Extra styled for My Account ──────────────────────────────────────────────

const AvatarWrap = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover div {
    opacity: 1;
  }
`;

const AvatarImg = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7289da, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  color: #fff;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const FieldLabel = styled.div`
  color: #b9bbbe;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: #40444b;
  color: #dcddde;
  border: 1px solid #202225;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: #5865f2;
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const SaveBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SaveBtn = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background: #5865f2;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;
  &:hover {
    background: #4752c4;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 14px 20px;
  }
`;

const StatusMsg = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(p) => (p.$error ? "#f04747" : "#43b581")};
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.div`
  background: #2f3136;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #40444b;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PromoCodeGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PremiumStatusCard = styled.div`
  background: var(--input-color);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 32px;
  border: 1px solid
    ${(props) =>
      props.$active ? "var(--primary-color)" : "var(--border-color)"};
`;

const PremiumSection = ({
  profile,
  API_URL,
  getHeaders,
  loadProfile,
  onClose,
}) => {
  const { getUserByUsername, createChat, fetchChats } = useChats();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    setLoadingPlans(true);
    try {
      const res = await fetch(`${API_URL}/premium/plans`, {
        headers: getHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setPlans(data);
      }
    } catch (err) {
      console.error("Failed to load plans", err);
    }
    setLoadingPlans(false);
  };

  const handleRedeem = async () => {
    if (!promoCode.trim()) return;
    setRedeeming(true);
    setStatus(null);
    try {
      const res = await fetch(`${API_URL}/premium/redeem`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ code: promoCode }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ text: "Premium faollashtirildi!", error: false });
        loadProfile();
        setPromoCode("");
      } else {
        setStatus({ text: data.message || "Promo-kod yaroqsiz", error: true });
      }
    } catch {
      setStatus({ text: "Tarmoq xatosi", error: true });
    }
    setRedeeming(false);
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <>
      <SectionTitle style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Shield size={20} color="var(--primary-color)" /> Jamm Premium
      </SectionTitle>
      <SectionDescription>
        Qo'shimcha imkoniyatlarni ochish uchun Premium obunani faollashtiring:
        Fayllar hajmini oshirish, qo'shimcha guruhlar ochish va maxsus
        imtiyozlar.
      </SectionDescription>

      <PremiumStatusCard $active={profile.premiumStatus === "active"}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "var(--text-color)",
            marginBottom: 8,
          }}
        >
          Holat:{" "}
          {profile.premiumStatus === "active" ? (
            <span style={{ color: "var(--primary-color)" }}>Aktiv</span>
          ) : (
            <span style={{ color: "var(--text-muted-color)" }}>
              Oddiy (Faol emas)
            </span>
          )}
        </div>
        {profile.premiumStatus === "active" && (
          <div style={{ color: "var(--text-muted-color)", fontSize: 13 }}>
            Amal qilish muddati:{" "}
            <strong style={{ color: "var(--text-color)" }}>
              {new Date(profile.premiumExpiresAt).toLocaleDateString()}
            </strong>{" "}
            gacha
          </div>
        )}
      </PremiumStatusCard>

      <SettingGroup>
        <FieldLabel>Promo-kod orqali faollashtirish</FieldLabel>
        <PromoCodeGroup>
          <FieldInput
            placeholder="Kodni kiriting"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button
            onClick={handleRedeem}
            disabled={redeeming || !promoCode}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
            }}
          >
            {redeeming ? (
              <Loader
                size={14}
                style={{ animation: "spin 1s linear infinite" }}
              />
            ) : (
              <Zap size={14} />
            )}
            <span>{redeeming ? "Tekshirilmoqda..." : "Tasdiqlash"}</span>
          </Button>
        </PromoCodeGroup>
        {status && (
          <StatusMsg style={{ marginTop: 10 }} $error={status.error}>
            {status.text}
          </StatusMsg>
        )}
      </SettingGroup>

      <SectionTitle style={{ fontSize: 18, marginTop: 40 }}>
        Obuna rejalari
      </SectionTitle>

      <PlansGrid>
        {plans.map((plan) => (
          <PlanCard key={plan._id}>
            <div
              style={{
                color: "var(--text-color)",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {plan.name}
            </div>
            <div
              style={{
                color: "var(--text-color)",
                fontSize: 24,
                fontWeight: 700,
                margin: "8px 0",
              }}
            >
              ${plan.price}
            </div>
            <div style={{ color: "var(--text-muted-color)", fontSize: 13 }}>
              {plan.durationInDays} kunlik muddat
            </div>
            <Button
              style={{ marginTop: 16, width: "100%" }}
              onClick={async () => {
                try {
                  const admin = await getUserByUsername("premium");
                  if (!admin) return;
                  const chat = await createChat({
                    isGroup: false,
                    memberIds: [admin._id || admin.id],
                  });
                  await fetchChats();
                  onClose?.();
                  navigate(
                    `/groups/${chat.urlSlug || chat.jammId || chat._id || chat.id}`,
                  );
                } catch (e) {
                  console.error("Admin chat open error", e);
                }
              }}
            >
              Ulanish uchun murojaat
            </Button>
          </PlanCard>
        ))}
        {loadingPlans && (
          <Loader size={20} style={{ animation: "spin 1s linear infinite" }} />
        )}
      </PlansGrid>
    </>
  );
};

const SettingsDialog = ({ isOpen, onClose, initialSection = "my-account" }) => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    if (isOpen) {
      setActiveSection(initialSection);
    }
  }, [isOpen, initialSection]);
  const [settings, setSettings] = useState({
    inputDevice: "default",
    outputDevice: "default",
    autoInputSensitivity: true,
    noiseSuppression: true,
    desktopNotifications: getDesktopNotificationsEnabled(),
    soundNotifications: getSoundNotificationsEnabled(),
    theme,
    messageDisplay: "compact",
    twoFactorAuth: false,
    privacyMode: "friends",
    language: "uz",
    region: "US",
  });

  // ── My Account state ──────────────────────────────────────────────────────
  const API_URL = API_BASE_URL;

  // Initialize from Zustand store for immediate accurate rendering
  const initialUser = useAuthStore((state) => state.user) || {};
  const [profile, setProfile] = useState({
    nickname: initialUser.nickname || "",
    username: initialUser.username || "",
    phone: initialUser.phone || "",
    avatar: initialUser.avatar || "",
    premiumStatus: initialUser.premiumStatus || "none",
    premiumExpiresAt: initialUser.premiumExpiresAt || null,
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // null | 'ok' | 'error'
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef(null);

  useEffect(() => {
    // Always load fresh profile data when dialog opens, regardless of section
    if (isOpen) {
      loadProfile();
    }
  }, [isOpen]);

  const getHeaders = () => ({
    "Content-Type": "application/json",
  });

  const loadProfile = async () => {
    setProfileLoading(true);
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: getHeaders(),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setProfile({
          nickname: data.nickname || "",
          username: data.username || "",
          phone: data.phone || "",
          avatar: data.avatar || "",
          bio: data.bio || "",
          premiumStatus: data.premiumStatus || "none",
          premiumExpiresAt: data.premiumExpiresAt,
        });
        // Sync to Zustand store
        const { user: storedUser, setAuth } = useAuthStore.getState();
        setAuth({ ...storedUser, ...data });
      }
    } catch {}
    setProfileLoading(false);
  };

  const handleSave = async () => {
    // Frontend Validations
    if (
      profile.nickname &&
      (profile.nickname.length < 3 || profile.nickname.length > 30)
    ) {
      setSaveStatus("Nickname 3 tadan 30 tagacha belgi bo'lishi kerak");
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }
    if (profile.username) {
      if (!/^[a-zA-Z0-9]{8,30}$/.test(profile.username)) {
        setSaveStatus(
          "Username kamida 8 ta harf va raqamdan (min 8) iborat bo'lishi kerak",
        );
        setTimeout(() => setSaveStatus(null), 3000);
        return;
      }
    }
    if (profile.bio && profile.bio.length > 30) {
      setSaveStatus(
        "Haqida (Bio) ko'pi bilan 30 ta belgidan iborat bo'lishi kerak",
      );
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }
    if (profile.phone) {
      if (!/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(profile.phone)) {
        setSaveStatus(
          "Telefon raqam aniq '+998 XX XXX XX XX' formatida bo'lishi kerak",
        );
        setTimeout(() => setSaveStatus(null), 3000);
        return;
      }
    }

    setSaving(true);
    setSaveStatus(null);
    const { premiumStatus, premiumExpiresAt, phone, ...rest } = profile;
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        method: "PATCH",
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({ ...rest, phone: phone.replace(/\s/g, "") }),
      });
      if (res.ok) {
        const updated = await res.json();
        const { user: storedUser, setAuth } = useAuthStore.getState();
        setAuth({ ...storedUser, ...updated });
        setSaveStatus("ok");
      } else {
        const errorData = await res.json().catch(() => null);
        const errMsg = Array.isArray(errorData?.message)
          ? errorData.message[0]
          : errorData?.message;
        setSaveStatus(errMsg || "Xatolik yuz berdi");
      }
    } catch (err) {
      console.log(err);

      setSaveStatus("Tarmoq xatosi yuz berdi");
    }
    setSaving(false);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleAvatarClick = () => {
    if (avatarInputRef.current) {
      avatarInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 2MB for now)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Fayl hajmi juda katta (maksimum 2MB)");
      return;
    }

    setUploadingAvatar(true);
    setSaveStatus(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/users/avatar`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setProfile((p) => ({ ...p, avatar: updatedUser.avatar }));

        // Update Zustand store
        const { user: storedUser, setAuth } = useAuthStore.getState();
        setAuth({ ...storedUser, ...updatedUser });

        setSaveStatus("Avatar yuklandi!");
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error(err.message || "Avatar yuklashda xatolik");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Tarmoq xatosi yuz berdi");
    } finally {
      setUploadingAvatar(false);
    }
  };
  // ─────────────────────────────────────────────────────────────────────────

  const sections = [
    { id: "my-account", label: "My Account", icon: User },
    { id: "voice-video", label: "Voice & Video", icon: Mic },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "language", label: "Language & Region", icon: Globe },
    { id: "keybinds", label: "Keybinds", icon: HelpCircle },
    { id: "premium", label: "Jamm Premium", icon: Star, color: "#ffaa00" },
  ];

  const handleToggle = async (key) => {
    const nextValue = !settings[key];

    if (key === "desktopNotifications") {
      if (nextValue) {
        const permission = await requestDesktopNotificationPermission();
        const enabled = permission === "granted";

        setDesktopNotificationsEnabled(enabled);
        setSettings((prev) => ({
          ...prev,
          [key]: enabled,
        }));

        if (!enabled) {
          toast.error("Browser notification ruxsati berilmagan");
        }
        return;
      }

      setDesktopNotificationsEnabled(false);
    }

    if (key === "soundNotifications") {
      setSoundNotificationsEnabled(nextValue);
    }

    setSettings((prev) => ({
      ...prev,
      [key]: nextValue,
    }));
  };

  const handleChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));

    // If theme changed, update global theme
    if (key === "theme") {
      toggleTheme(value);
    }
  };

  const renderMyAccount = () => {
    if (profileLoading)
      return (
        <div
          style={{
            paddingTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <Skeleton height="24px" width="150px" mb="0" />
          <SkeletonCircle size="80px" mb="0" />
          <div>
            <Skeleton height="16px" width="80px" mb="8px" />
            <Skeleton height="40px" width="100%" mb="0" />
          </div>
          <div>
            <Skeleton height="16px" width="80px" mb="8px" />
            <Skeleton height="40px" width="100%" mb="0" />
          </div>
          <div>
            <Skeleton height="16px" width="80px" mb="8px" />
            <Skeleton height="40px" width="100%" mb="0" />
          </div>
        </div>
      );
    return (
      <>
        <SectionTitle>My Account</SectionTitle>

        {/* Avatar */}
        <input
          type="file"
          ref={avatarInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <AvatarWrap onClick={handleAvatarClick} title="Rasm yuklash">
          <AvatarImg>
            {uploadingAvatar ? (
              <Loader
                size={32}
                style={{ animation: "spin 1s linear infinite" }}
              />
            ) : profile.avatar ? (
              <img src={profile.avatar} alt="avatar" />
            ) : (
              (profile.nickname || profile.username || "?")
                .charAt(0)
                .toUpperCase()
            )}
          </AvatarImg>
          <AvatarOverlay>
            <Camera size={22} />
          </AvatarOverlay>
        </AvatarWrap>

        <FormField>
          <FieldLabel style={{ display: "flex", alignItems: "center", gap: 6 }}>
            Nickname{" "}
            {profile.premiumStatus === "active" && (
              <PremiumBadgeIcon width={14} height={14} />
            )}
          </FieldLabel>
          <FieldInput
            value={profile.nickname}
            onChange={(e) =>
              setProfile((p) => ({ ...p, nickname: e.target.value }))
            }
            placeholder="Nickname"
          />
        </FormField>

        <FormField>
          <FieldLabel>Username</FieldLabel>
          <FieldInput
            value={profile.username}
            onChange={(e) =>
              setProfile((p) => ({ ...p, username: e.target.value }))
            }
            placeholder="username"
          />
        </FormField>

        <FormField>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <FieldLabel>Haqida (Bio)</FieldLabel>
            <span
              style={{
                fontSize: "11px",
                color:
                  profile.bio?.length > 30
                    ? "#f04747"
                    : "var(--text-muted-color)",
              }}
            >
              {profile.bio?.length || 0}/30
            </span>
          </div>
          <FieldInput
            as="textarea"
            rows={2}
            value={profile.bio || ""}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            placeholder="O'zingiz haqingizda maksimal 30 ta belgi..."
            maxLength={30}
            style={{ resize: "none" }}
          />
        </FormField>

        <FormField>
          <FieldLabel>Telefon raqam</FieldLabel>
          <FieldInput
            value={profile.phone || "+998"}
            onChange={(e) => {
              let val = e.target.value;
              // Ensure +998 is always present at start
              if (!val.startsWith("+998")) {
                val = "+998";
              }
              // Extract only digits after +998, max 9 digits
              const digits = val.slice(4).replace(/[^\d]/g, "").slice(0, 9);

              // Format as +998 XX XXX XX XX
              let formatted = "+998";
              if (digits.length > 0) formatted += " " + digits.slice(0, 2);
              if (digits.length > 2) formatted += " " + digits.slice(2, 5);
              if (digits.length > 5) formatted += " " + digits.slice(5, 7);
              if (digits.length > 7) formatted += " " + digits.slice(7, 9);

              setProfile((p) => ({ ...p, phone: formatted }));
            }}
            placeholder="+998 90 000 00 00"
          />
        </FormField>

        <SaveBar>
          <SaveBtn onClick={handleSave} disabled={saving}>
            {saving ? <Loader size={14} /> : <Check size={14} />}
            {saving ? "Saqlanmoqda…" : "Saqlash"}
          </SaveBtn>
          {saveStatus === "ok" && (
            <StatusMsg>
              <Check size={13} />
              Muvaffaqiyatli saqlandi!
            </StatusMsg>
          )}
          {saveStatus && saveStatus !== "ok" && (
            <StatusMsg $error>
              <AlertCircle size={13} />
              {saveStatus}
            </StatusMsg>
          )}
        </SaveBar>
      </>
    );
  };

  const renderVoiceVideo = () => (
    <>
      <SectionTitle>Voice & Video</SectionTitle>
      <SectionDescription>
        Configure your input and output devices for voice and video.
      </SectionDescription>

      <SettingGroup>
        <SettingItem>
          <div>
            <SettingLabel>INPUT DEVICE</SettingLabel>
            <SettingDescription>Choose your microphone</SettingDescription>
          </div>
          <Select
            value={settings.inputDevice}
            onChange={(e) => handleChange("inputDevice", e.target.value)}
          >
            <option value="default">Default Microphone</option>
            <option value="mic1">Built-in Microphone</option>
            <option value="mic2">USB Microphone</option>
          </Select>
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>OUTPUT DEVICE</SettingLabel>
            <SettingDescription>Choose your speakers</SettingDescription>
          </div>
          <Select
            value={settings.outputDevice}
            onChange={(e) => handleChange("outputDevice", e.target.value)}
          >
            <option value="default">Default Speakers</option>
            <option value="speakers1">Built-in Speakers</option>
            <option value="speakers2">USB Headphones</option>
          </Select>
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>VIDEO DEVICE</SettingLabel>
            <SettingDescription>Choose your camera</SettingDescription>
          </div>
          <Select
            value={settings.videoDevice}
            onChange={(e) => handleChange("videoDevice", e.target.value)}
          >
            <option value="default">Default Camera</option>
            <option value="camera1">Built-in Camera</option>
            <option value="camera2">USB Camera</option>
          </Select>
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>AUTOMATIC INPUT SENSITIVITY</SettingLabel>
            <SettingDescription>
              Automatically adjust input volume
            </SettingDescription>
          </div>
          <Toggle checked={settings.autoInputSensitivity}>
            <input
              type="checkbox"
              checked={settings.autoInputSensitivity}
              onChange={() => handleToggle("autoInputSensitivity")}
            />
            <ToggleSlider checked={settings.autoInputSensitivity} />
          </Toggle>
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>NOISE SUPPRESSION</SettingLabel>
            <SettingDescription>
              Remove background noise from your voice
            </SettingDescription>
          </div>
          <Toggle checked={settings.noiseSuppression}>
            <input
              type="checkbox"
              checked={settings.noiseSuppression}
              onChange={() => handleToggle("noiseSuppression")}
            />
            <ToggleSlider checked={settings.noiseSuppression} />
          </Toggle>
        </SettingItem>
      </SettingGroup>
    </>
  );

  const renderNotifications = () => (
    <>
      <SectionTitle>Notifications</SectionTitle>
      <SectionDescription>
        Manage how you receive notifications.
      </SectionDescription>

      <SettingGroup>
        <SettingItem>
          <div>
            <SettingLabel>DESKTOP NOTIFICATIONS</SettingLabel>
            <SettingDescription>
              Show notifications on your desktop
            </SettingDescription>
          </div>
          <Toggle checked={settings.desktopNotifications}>
            <input
              type="checkbox"
              checked={settings.desktopNotifications}
              onChange={() => handleToggle("desktopNotifications")}
            />
            <ToggleSlider checked={settings.desktopNotifications} />
          </Toggle>
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>SOUND NOTIFICATIONS</SettingLabel>
            <SettingDescription>
              Play sound when you receive a message
            </SettingDescription>
          </div>
          <Toggle checked={settings.soundNotifications}>
            <input
              type="checkbox"
              checked={settings.soundNotifications}
              onChange={() => handleToggle("soundNotifications")}
            />
            <ToggleSlider checked={settings.soundNotifications} />
          </Toggle>
        </SettingItem>
      </SettingGroup>
    </>
  );

  const renderAppearance = () => (
    <>
      <SectionTitle>Appearance</SectionTitle>
      <SectionDescription>
        Customize how Jamm looks on your device.
      </SectionDescription>

      <SettingGroup>
        <SettingItem>
          <div>
            <SettingLabel>THEME</SettingLabel>
            <SettingDescription>
              Choose your preferred color theme
            </SettingDescription>
          </div>
          <Select
            value={settings.theme}
            onChange={(e) => handleChange("theme", e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="auto">Auto</option>
          </Select>
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>MESSAGE DISPLAY</SettingLabel>
            <SettingDescription>
              Choose how messages are displayed
            </SettingDescription>
          </div>
          <Select
            value={settings.messageDisplay}
            onChange={(e) => handleChange("messageDisplay", e.target.value)}
          >
            <option value="compact">Compact</option>
            <option value="cozy">Cozy</option>
            <option value="roomy">Roomy</option>
          </Select>
        </SettingItem>
      </SettingGroup>
    </>
  );

  const renderPrivacy = () => (
    <>
      <SectionTitle>Privacy & Security</SectionTitle>
      <SectionDescription>
        Manage your privacy and security settings.
      </SectionDescription>

      <SettingGroup>
        <SettingItem>
          <div>
            <SettingLabel>TWO-FACTOR AUTHENTICATION</SettingLabel>
            <SettingDescription>
              Add an extra layer of security to your account
            </SettingDescription>
          </div>
          <Toggle checked={settings.twoFactorAuth}>
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={() => handleToggle("twoFactorAuth")}
            />
            <ToggleSlider checked={settings.twoFactorAuth} />
          </Toggle>
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>PRIVACY MODE</SettingLabel>
            <SettingDescription>Control who can contact you</SettingDescription>
          </div>
          <Select
            value={settings.privacyMode}
            onChange={(e) => handleChange("privacyMode", e.target.value)}
          >
            <option value="everyone">Everyone</option>
            <option value="friends">Friends of Friends</option>
            <option value="friends">Friends Only</option>
          </Select>
        </SettingItem>
      </SettingGroup>

      <SettingGroup>
        <DangerButton onClick={() => toast("Log out functionality WIP")}>
          <LogOut size={16} style={{ marginRight: "8px" }} />
          Log Out
        </DangerButton>
      </SettingGroup>
    </>
  );

  const renderLanguage = () => (
    <>
      <SectionTitle>Language & Region</SectionTitle>
      <SectionDescription>
        Set your language and region preferences.
      </SectionDescription>

      <SettingGroup>
        <SettingItem>
          <div>
            <SettingLabel>LANGUAGE</SettingLabel>
            <SettingDescription>
              Choose your preferred language
            </SettingDescription>
          </div>
          <Select
            value={settings.language}
            onChange={(e) => handleChange("language", e.target.value)}
          >
            <option value="en-US">English (US)</option>
            <option value="es-ES">Español</option>
            <option value="fr-FR">Français</option>
            <option value="de-DE">Deutsch</option>
            <option value="ja-JP">日本語</option>
            <option value="zh-CN">中文</option>
            <option value="ru-RU">Русский</option>
            <option value="uz-UZ">O'zbekcha</option>
          </Select>
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>REGION</SettingLabel>
            <SettingDescription>Choose your server region</SettingDescription>
          </div>
          <Select
            value={settings.region}
            onChange={(e) => handleChange("region", e.target.value)}
          >
            <option value="US">United States</option>
            <option value="EU">Europe</option>
            <option value="Asia">Asia</option>
            <option value="RU">Russia</option>
          </Select>
        </SettingItem>
      </SettingGroup>
    </>
  );

  const renderKeybinds = () => (
    <>
      <SectionTitle>Keybinds</SectionTitle>
      <SectionDescription>
        Customize your keyboard shortcuts.
      </SectionDescription>

      <SettingGroup>
        <SettingItem>
          <div>
            <SettingLabel>PUSH TO MUTE</SettingLabel>
            <SettingDescription>
              Hold to temporarily mute your microphone
            </SettingDescription>
          </div>
          <Input type="text" value="Ctrl + M" readOnly />
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>PUSH TO TALK</SettingLabel>
            <SettingDescription>Hold to speak</SettingDescription>
          </div>
          <Input type="text" value="Ctrl + T" readOnly />
        </SettingItem>

        <SettingItem>
          <div>
            <SettingLabel>TOGGLE MUTE</SettingLabel>
            <SettingDescription>Toggle microphone on/off</SettingDescription>
          </div>
          <Input type="text" value="Ctrl + Shift + M" readOnly />
        </SettingItem>
      </SettingGroup>
    </>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "my-account":
        return renderMyAccount();
      case "voice-video":
        return renderVoiceVideo();
      case "notifications":
        return renderNotifications();
      case "appearance":
        return renderAppearance();
      case "privacy":
        return renderPrivacy();
      case "language":
        return renderLanguage();
      case "keybinds":
        return renderKeybinds();
      case "premium":
        return (
          <PremiumSection
            profile={profile}
            API_URL={API_URL}
            getHeaders={getHeaders}
            loadProfile={loadProfile}
            onClose={onClose}
          />
        );
      default:
        return renderMyAccount();
    }
  };

  if (!isOpen) return null;

  return (
    <SettingsOverlay onClick={onClose}>
      <SettingsDialogComponent onClick={(e) => e.stopPropagation()}>
        <SettingsHeader>
          <SettingsTitle>User Settings</SettingsTitle>
          <ButtonWrapper onClick={onClose}>
            <X size={20} />
          </ButtonWrapper>
        </SettingsHeader>

        <SettingsContent>
          <Sidebar>
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <SidebarItem
                  key={section.id}
                  active={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon size={18} />
                  {section.label}
                </SidebarItem>
              );
            })}
          </Sidebar>

          <MainContent>{renderContent()}</MainContent>
        </SettingsContent>
      </SettingsDialogComponent>
    </SettingsOverlay>
  );
};

export default SettingsDialog;
