import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AlertCircle, Camera, Check, Loader, X } from "lucide-react";
import toast from "react-hot-toast";
import PremiumBadgeIcon from "../../../shared/ui/badges/PremiumBadge";
import axiosInstance from "../../../api/axiosInstance";
import useAuthStore from "../../../store/authStore";
import { APP_LIMITS } from "../../../constants/appLimits";
import {
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalTitle,
} from "../../../shared/ui/dialogs/ModalShell";

const formatPhone = (value = "") => {
  const raw = String(value || "").trim();
  const digits = raw.replace(/\D/g, "");

  if (!digits.length) {
    return "+998";
  }

  let localDigits = digits;
  if (localDigits.startsWith("998")) {
    localDigits = localDigits.slice(3);
  }
  localDigits = localDigits.slice(0, 9);

  let formatted = "+998";
  if (localDigits.length > 0) formatted += ` ${localDigits.slice(0, 2)}`;
  if (localDigits.length > 2) formatted += ` ${localDigits.slice(2, 5)}`;
  if (localDigits.length > 5) formatted += ` ${localDigits.slice(5, 7)}`;
  if (localDigits.length > 7) formatted += ` ${localDigits.slice(7, 9)}`;

  return formatted;
};

const AvatarWrap = styled.button`
  position: relative;
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
  margin-bottom: 22px;
`;

const AvatarImg = styled.div`
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7289da, #5865f2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 800;
  color: white;
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
  background: rgba(0, 0, 0, 0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.2s ease;

  ${AvatarWrap}:hover & {
    opacity: 1;
  }
`;

const FormField = styled.div`
  margin-bottom: 18px;
`;

const FieldLabel = styled.div`
  color: var(--text-muted-color);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  background: var(--input-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
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
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  border: none;
  background: var(--primary-color);
  color: white;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.55 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StatusMsg = styled.div`
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${(p) => (p.$error ? "#f04747" : "#43b581")};
`;

const Skeleton = styled.div`
  height: ${(p) => p.$h || "16px"};
  width: ${(p) => p.$w || "100%"};
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    rgba(148, 163, 184, 0.08),
    rgba(148, 163, 184, 0.18),
    rgba(148, 163, 184, 0.08)
  );
  background-size: 200% 100%;
  animation: shimmer 1.2s linear infinite;
  margin-bottom: ${(p) => p.$mb || "12px"};

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`;

const ProfileEditDialog = ({ isOpen, onClose }) => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const setAuth = useAuthStore((state) => state.setAuth);
  const [profile, setProfile] = useState({
    nickname: "",
    username: "",
    phone: "+998",
    avatar: "",
    bio: "",
    premiumStatus: "none",
    premiumExpiresAt: null,
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const loadProfile = async () => {
      setProfileLoading(true);
      try {
        const { data } = await axiosInstance.get("/users/me");
        setProfile({
          nickname: data.nickname || "",
          username: data.username || "",
          phone: formatPhone(data.phone),
          avatar: data.avatar || "",
          bio: data.bio || "",
          premiumStatus: data.premiumStatus || "none",
          premiumExpiresAt: data.premiumExpiresAt,
        });
        setAuth({ ...(user || {}), ...data }, token);
      } catch {
        setProfile({
          nickname: user?.nickname || "",
          username: user?.username || "",
          phone: formatPhone(user?.phone),
          avatar: user?.avatar || "",
          bio: user?.bio || "",
          premiumStatus: user?.premiumStatus || "none",
          premiumExpiresAt: user?.premiumExpiresAt || null,
        });
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    if (
      profile.nickname &&
      (profile.nickname.length < 3 || profile.nickname.length > 30)
    ) {
      return "Nickname 3 tadan 30 tagacha belgi bo'lishi kerak";
    }

    if (profile.username && !/^[a-zA-Z0-9]{8,30}$/.test(profile.username)) {
      return "Username kamida 8 ta harf va raqamdan iborat bo'lishi kerak";
    }

    if (profile.bio && profile.bio.length > 30) {
      return "Haqida (Bio) ko'pi bilan 30 ta belgi bo'lishi kerak";
    }

    if (
      profile.phone &&
      !/^\+998 \d{2} \d{3} \d{2} \d{2}$/.test(profile.phone)
    ) {
      return "Telefon raqam '+998 XX XXX XX XX' formatida bo'lishi kerak";
    }

    return null;
  };

  const handleSave = async () => {
    const error = validate();
    if (error) {
      setSaveStatus(error);
      setTimeout(() => setSaveStatus(null), 3000);
      return;
    }

    setSaving(true);
    setSaveStatus(null);
    try {
      const { premiumStatus, premiumExpiresAt, phone, ...rest } = profile;
      const { data } = await axiosInstance.patch("/users/me", {
        ...rest,
        phone: (phone || "").replace(/\s/g, ""),
      });
      setAuth({ ...(user || {}), ...data }, token);
      setProfile((prev) => ({ ...prev, ...data }));
      setSaveStatus("ok");
      setTimeout(() => {
        setSaveStatus(null);
        onClose?.();
      }, 900);
    } catch (error) {
      const message = Array.isArray(error?.response?.data?.message)
        ? error.response.data.message[0]
        : error?.response?.data?.message || "Tarmoq xatosi yuz berdi";
      setSaveStatus(message);
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Fayl hajmi juda katta (maksimum 2MB)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setUploadingAvatar(true);

    try {
      const { data } = await axiosInstance.post("/users/avatar", formData);
      setProfile((prev) => ({ ...prev, avatar: data.avatar }));
      setAuth({ ...(user || {}), ...data }, token);
      toast.success("Avatar yangilandi");
    } catch {
      toast.error("Avatar yuklashda xatolik");
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <ModalOverlay
      onClick={onClose}
      $overlay="rgba(0, 0, 0, 0.78)"
      $backdrop="blur(8px)"
      $zIndex={12000}
    >
      <ModalPanel
        $width="min(100%, 560px)"
        $maxHeight="min(88vh, 760px)"
        $radius="22px"
        $mobileFull
        onClick={(event) => event.stopPropagation()}
      >
        <ModalHeader $padding="18px 20px">
          <ModalTitle $size="18px">Profilni tahrirlash</ModalTitle>
          <ModalCloseButton onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody $padding="22px 20px 24px">
          {profileLoading ? (
            <>
              <Skeleton $h="92px" $w="92px" $mb="22px" />
              <Skeleton />
              <Skeleton />
              <Skeleton $h="64px" />
              <Skeleton />
            </>
          ) : (
            <>
              <input
                type="file"
                ref={avatarInputRef}
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />

              <AvatarWrap
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                title="Avatarni o'zgartirish"
              >
                <AvatarImg>
                  {uploadingAvatar ? (
                    <Loader
                      size={30}
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
                  <Camera size={20} />
                </AvatarOverlay>
              </AvatarWrap>

              <FormField>
                <FieldLabel>
                  Nickname
                  {profile.premiumStatus === "active" && (
                    <PremiumBadgeIcon width={14} height={14} />
                  )}
                </FieldLabel>
                <FieldInput
                  value={profile.nickname}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      nickname: e.target.value.slice(
                        0,
                        APP_LIMITS.nicknameChars,
                      ),
                    }))
                  }
                  placeholder="Nickname"
                  maxLength={APP_LIMITS.nicknameChars}
                />
              </FormField>

              <FormField>
                <FieldLabel>Username</FieldLabel>
                <FieldInput
                  value={profile.username}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      username: e.target.value
                        .toLowerCase()
                        .slice(0, APP_LIMITS.usernameChars),
                    }))
                  }
                  placeholder="username"
                  maxLength={APP_LIMITS.usernameChars}
                />
              </FormField>

              <FormField>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <FieldLabel>Haqida (Bio)</FieldLabel>
                  <span
                    style={{
                      fontSize: "11px",
                      color:
                        (profile.bio?.length || 0) > APP_LIMITS.bioChars
                          ? "#f04747"
                          : "var(--text-muted-color)",
                    }}
                  >
                    {profile.bio?.length || 0}/{APP_LIMITS.bioChars}
                  </span>
                </div>
                <FieldInput
                  as="textarea"
                  rows={2}
                  value={profile.bio || ""}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      bio: e.target.value.slice(0, APP_LIMITS.bioChars),
                    }))
                  }
                  placeholder="O'zingiz haqingizda qisqacha yozing..."
                  maxLength={APP_LIMITS.bioChars}
                  style={{ resize: "none", minHeight: 76, paddingTop: 12 }}
                />
              </FormField>

              <FormField>
                <FieldLabel>Telefon raqam</FieldLabel>
                <FieldInput
                  value={profile.phone || "+998"}
                  onChange={(e) => {
                    setProfile((prev) => ({
                      ...prev,
                      phone: formatPhone(e.target.value),
                    }));
                  }}
                  placeholder="+998 90 000 00 00"
                />
              </FormField>

              <SaveBar>
                <SaveBtn
                  onClick={handleSave}
                  disabled={saving || uploadingAvatar}
                >
                  {saving ? <Loader size={14} /> : <Check size={14} />}
                  {saving ? "Saqlanmoqda..." : "Saqlash"}
                </SaveBtn>
                {saveStatus === "ok" && (
                  <StatusMsg>
                    <Check size={13} />
                    Muvaffaqiyatli saqlandi
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
          )}
        </ModalBody>
      </ModalPanel>
    </ModalOverlay>
  );
};

export default ProfileEditDialog;
