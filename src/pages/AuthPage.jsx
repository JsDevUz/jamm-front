import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import {
  Mail,
  Lock,
  User,
  AtSign,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Hash,
  MessageSquare,
  Zap,
  Shield,
  GraduationCap,
} from "lucide-react";

/* ============================
   ANIMATIONS
   ============================ */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(3deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

/* ============================
   LAYOUT
   ============================ */
const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1b2e 0%, #16171d 50%, #0d0e14 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
`;

const BackgroundOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  pointer-events: none;

  &:nth-child(1) {
    width: 400px;
    height: 400px;
    background: #5865f2;
    top: -100px;
    right: -100px;
    animation: ${float} 8s ease-in-out infinite;
  }

  &:nth-child(2) {
    width: 300px;
    height: 300px;
    background: #eb459e;
    bottom: -50px;
    left: -50px;
    animation: ${float} 10s ease-in-out infinite reverse;
  }

  &:nth-child(3) {
    width: 200px;
    height: 200px;
    background: #57f287;
    top: 50%;
    left: 50%;
    animation: ${float} 12s ease-in-out infinite;
  }
`;

const AuthCard = styled.div`
  width: 900px;
  max-width: 100%;
  display: flex;
  background: rgba(47, 49, 54, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(88, 101, 242, 0.15);
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 20px 80px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(88, 101, 242, 0.08);
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 420px;
    flex-direction: column;
  }
`;

const LeftPanel = styled.div`
  width: 340px;
  background: linear-gradient(160deg, #5865f2 0%, #4752c4 60%, #3c45a5 100%);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -40px;
    left: -40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LeftTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.2;
  position: relative;
  z-index: 1;
`;

const LeftSubtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  z-index: 1;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(4px);
`;

const FeatureIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FeatureText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 40px;

  @media (max-width: 480px) {
    padding: 28px 20px;
  }
`;

/* ============================
   HEADER
   ============================ */
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 28px;
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #5865f2, #7b6cf6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(88, 101, 242, 0.35);
`;

const LogoText = styled.h1`
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff, #b9bbbe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 4px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #b9bbbe;
  text-align: center;
  margin-bottom: 24px;
`;

/* ============================
   TABS
   ============================ */
const TabRow = styled.div`
  display: flex;
  background: rgba(32, 34, 37, 0.7);
  border-radius: 12px;
  padding: 4px;
  margin-bottom: 24px;
  gap: 4px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
  background: ${(props) =>
    props.$active
      ? "linear-gradient(135deg, #5865f2, #4752c4)"
      : "transparent"};
  color: ${(props) => (props.$active ? "#fff" : "#b9bbbe")};
  box-shadow: ${(props) =>
    props.$active ? "0 2px 10px rgba(88, 101, 242, 0.3)" : "none"};

  &:hover {
    color: #fff;
    background: ${(props) =>
      props.$active
        ? "linear-gradient(135deg, #5865f2, #4752c4)"
        : "rgba(255,255,255,0.05)"};
  }
`;

/* ============================
   FORM ELEMENTS
   ============================ */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #b9bbbe;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  color: #72767d;
  display: flex;
  align-items: center;
  pointer-events: none;
  transition: color 0.2s;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 14px 12px 42px;
  background: rgba(32, 34, 37, 0.8);
  border: 1.5px solid rgba(64, 68, 75, 0.6);
  border-radius: 10px;
  color: #dcddde;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #4f545c;
  }

  &:focus {
    border-color: #5865f2;
    box-shadow: 0 0 0 3px rgba(88, 101, 242, 0.15);
  }

  &:focus ~ ${InputIcon}, &:focus + ${InputIcon} {
    color: #5865f2;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  color: #72767d;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  transition: color 0.2s;

  &:hover {
    color: #dcddde;
  }
`;

/* ============================
   BUTTONS
   ============================ */
const SubmitButton = styled.button`
  width: 100%;
  padding: 13px;
  font-size: 15px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #5865f2, #4752c4);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 4px;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(88, 101, 242, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(88, 101, 242, 0.45);
    background: linear-gradient(135deg, #6974f7, #5865f2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 4px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(64, 68, 75, 0.6);
  }

  span {
    font-size: 12px;
    color: #72767d;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  color: #dcddde;
  background: rgba(32, 34, 37, 0.8);
  border: 1.5px solid rgba(64, 68, 75, 0.6);
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(64, 68, 75, 0.5);
    border-color: rgba(88, 101, 242, 0.4);
  }
`;

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

/* ============================
   FOOTER
   ============================ */
const FooterText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #72767d;
`;

const SwitchLink = styled.button`
  color: #5865f2;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: #7b8cf9;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(240, 71, 71, 0.12);
  border: 1px solid rgba(240, 71, 71, 0.3);
  border-radius: 8px;
  padding: 10px 14px;
  color: #f04747;
  font-size: 13px;
  font-weight: 500;
  text-align: center;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

/* ============================
   COMPONENT
   ============================ */
const AuthPage = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const body =
        mode === "login"
          ? { email, password }
          : { email, password, username, nickname, phone };

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Xatolik yuz berdi");
      }

      // Save token and user
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = () => {
    // TODO: Google OAuth integration
    alert("Google Auth hali ulanmagan. Email/parol bilan kiring.");
  };

  return (
    <PageWrapper>
      <BackgroundOrb />
      <BackgroundOrb />
      <BackgroundOrb />

      <AuthCard>
        <LeftPanel>
          <LeftTitle>Jamm platformasiga xush kelibsiz!</LeftTitle>
          <LeftSubtitle>
            Zamonaviy muloqot va ta'lim platformasi. Do'stlaringiz bilan
            bog'laning va yangi bilimlar oling.
          </LeftSubtitle>
          <FeatureList>
            <FeatureItem>
              <FeatureIcon>
                <MessageSquare size={18} color="white" />
              </FeatureIcon>
              <FeatureText>Real-time chat va guruhlar</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <GraduationCap size={18} color="white" />
              </FeatureIcon>
              <FeatureText>Video kurslar va darsliklar</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <Zap size={18} color="white" />
              </FeatureIcon>
              <FeatureText>Tez va qulay interfeys</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <Shield size={18} color="white" />
              </FeatureIcon>
              <FeatureText>Xavfsiz va himoyalangan</FeatureText>
            </FeatureItem>
          </FeatureList>
        </LeftPanel>

        <RightPanel>
          <LogoContainer>
            <LogoIcon>
              <Hash size={26} color="white" />
            </LogoIcon>
            <LogoText>Jamm</LogoText>
          </LogoContainer>

          <Title>
            {mode === "login"
              ? "Qaytib kelganingizdan xursandmiz!"
              : "Akkaunt yarating"}
          </Title>
          <Subtitle>
            {mode === "login"
              ? "Hisobingizga kirish uchun ma'lumotlaringizni kiriting"
              : "Ro'yxatdan o'tib, platformaga qo'shiling"}
          </Subtitle>

          <TabRow>
            <Tab $active={mode === "login"} onClick={() => setMode("login")}>
              Kirish
            </Tab>
            <Tab $active={mode === "signup"} onClick={() => setMode("signup")}>
              Ro'yxatdan o'tish
            </Tab>
          </TabRow>

          <Form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <InputRow>
                <InputGroup>
                  <Label>Username</Label>
                  <InputWrapper>
                    <StyledInput
                      type="text"
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <InputIcon>
                      <AtSign size={16} />
                    </InputIcon>
                  </InputWrapper>
                </InputGroup>

                <InputGroup>
                  <Label>Nik (Laqab)</Label>
                  <InputWrapper>
                    <StyledInput
                      type="text"
                      placeholder="Nikingiz"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      required
                    />
                    <InputIcon>
                      <User size={16} />
                    </InputIcon>
                  </InputWrapper>
                </InputGroup>
              </InputRow>
            )}

            <InputGroup>
              <Label>Email</Label>
              <InputWrapper>
                <StyledInput
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <InputIcon>
                  <Mail size={16} />
                </InputIcon>
              </InputWrapper>
            </InputGroup>

            {mode === "signup" && (
              <InputGroup>
                <Label>Telefon raqam</Label>
                <InputWrapper>
                  <StyledInput
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <InputIcon>
                    <Phone size={16} />
                  </InputIcon>
                </InputWrapper>
              </InputGroup>
            )}

            <InputGroup>
              <Label>Parol</Label>
              <InputWrapper>
                <StyledInput
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <InputIcon>
                  <Lock size={16} />
                </InputIcon>
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </PasswordToggle>
              </InputWrapper>
            </InputGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit" disabled={loading}>
              {loading
                ? "Yuklanmoqda..."
                : mode === "login"
                  ? "Kirish"
                  : "Ro'yxatdan o'tish"}
              {!loading && <ArrowRight size={18} />}
            </SubmitButton>
          </Form>

          <Divider>
            <span>yoki</span>
          </Divider>

          <GoogleButton onClick={handleGoogleAuth}>
            <GoogleLogo />
            Google orqali {mode === "login" ? "kirish" : "ro'yxatdan o'tish"}
          </GoogleButton>

          <FooterText>
            {mode === "login" ? (
              <>
                Hisobingiz yo'qmi?{" "}
                <SwitchLink type="button" onClick={() => setMode("signup")}>
                  Ro'yxatdan o'ting
                </SwitchLink>
              </>
            ) : (
              <>
                Hisobingiz bormi?{" "}
                <SwitchLink type="button" onClick={() => setMode("login")}>
                  Kirish
                </SwitchLink>
              </>
            )}
          </FooterText>
        </RightPanel>
      </AuthCard>
    </PageWrapper>
  );
};

export default AuthPage;
