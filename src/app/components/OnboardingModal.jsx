import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import {
  Rocket,
  Target,
  Zap,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  X,
  Code,
  BookOpen,
  Globe,
  Award,
  BarChart,
  AtSign,
  Hash,
  User,
  AlertCircle,
  Loader2,
} from "lucide-react";
import useAuthStore from "../../store/authStore";
import toast from "react-hot-toast";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 600px;
  background: #2f3136;
  border-radius: 24px;
  border: 1px solid rgba(88, 101, 242, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const ProgressHeader = styled.div`
  padding: 24px 32px 0;
  display: flex;
  gap: 8px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${(props) => props.$progress}%;
    background: linear-gradient(90deg, #5865f2, #7b6cf6);
    transition: width 0.4s ease;
  }
`;

const Content = styled.div`
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    rgba(88, 101, 242, 0.1),
    rgba(123, 108, 246, 0.1)
  );
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5865f2;
  margin-bottom: 24px;
  border: 1px solid rgba(88, 101, 242, 0.2);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #b9bbbe;
  line-height: 1.6;
  max-width: 400px;
  margin-bottom: 32px;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const OptionCard = styled.button`
  padding: 16px;
  background: ${(props) =>
    props.$active ? "rgba(88, 101, 242, 0.1)" : "#202225"};
  border: 2px solid ${(props) => (props.$active ? "#5865f2" : "transparent")};
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${(props) => (props.$active ? "#fff" : "#b9bbbe")};

  &:hover {
    background: ${(props) =>
      props.$active ? "rgba(88, 101, 242, 0.15)" : "rgba(255,255,255,0.05)"};
    transform: translateY(-2px);
  }

  svg {
    color: ${(props) => (props.$active ? "#5865f2" : "#72767d")};
  }
`;

const OptionLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const Footer = styled.div`
  padding: 24px 32px;
  background: rgba(32, 34, 37, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBtn = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.$primary
      ? `
    background: linear-gradient(135deg, #5865f2, #4752c4);
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(88, 101, 242, 0.3);
    &:hover { filter: brightness(1.1); transform: translateY(-1px); }
  `
      : `
    background: transparent;
    color: #b9bbbe;
    border: 1px solid transparent;
    &:hover { color: #fff; }
    &:disabled { opacity: 0; cursor: default; }
  `}
`;

const INTERESTS = [
  { id: "dev", label: "Dasturlash", icon: <Code size={24} /> },
  { id: "sci", label: "Fan va Texnika", icon: <Zap size={24} /> },
  { id: "lang", label: "Tillar", icon: <Globe size={24} /> },
  { id: "math", label: "Matematika", icon: <BookOpen size={24} /> },
];

const GOALS = [
  { id: "learn", label: "O'rganish", icon: <BookOpen size={24} /> },
  { id: "compete", label: "Musobaqalashish", icon: <Award size={24} /> },
  { id: "fun", label: "Ko'ngilochar", icon: <Rocket size={24} /> },
  { id: "social", label: "Muloqot", icon: <Target size={24} /> },
];

const LEVELS = [
  { id: "beg", label: "Boshlang'ich", icon: <BarChart size={24} /> },
  { id: "int", label: "O'rta daraja", icon: <BarChart size={24} /> },
  { id: "adv", label: "Kuchli bilim", icon: <BarChart size={24} /> },
];

const OnboardingModal = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    username: "",
    gender: "",
    age: "",
    interests: [],
    goals: [],
    level: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const updateUser = useAuthStore((state) => state.updateUser);
  const token = useAuthStore((state) => state.token);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  // Real-time username check with debounce
  useEffect(() => {
    const checkUsername = async () => {
      const u = data.username.trim();
      if (!u) {
        setUsernameError("");
        setUsernameAvailable(false);
        return;
      }

      const regex = /^[a-zA-Z0-9]{8,30}$/;
      if (!regex.test(u)) {
        setUsernameError("Kamida 8 harf/raqam");
        setUsernameAvailable(false);
        return;
      }

      setIsCheckingUsername(true);
      try {
        const res = await fetch(
          `http://localhost:3000/users/check-username/${u}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const d = await res.json();
        if (d.available) {
          setUsernameError("");
          setUsernameAvailable(true);
        } else {
          setUsernameError("Bu username band!");
          setUsernameAvailable(false);
        }
      } catch (err) {
        setUsernameError("Xatolik");
      } finally {
        setIsCheckingUsername(false);
      }
    };

    const timer = setTimeout(checkUsername, 500);
    return () => clearTimeout(timer);
  }, [data.username, token]);

  const toggleInterest = (id) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const toggleGoal = (id) => {
    setData((prev) => ({
      ...prev,
      goals: prev.goals.includes(id)
        ? prev.goals.filter((g) => g !== id)
        : [...prev.goals, id],
    }));
  };

  const handleFinish = async () => {
    if (!data.username) return toast.error("Username kiriting");
    if (!data.gender) return toast.error("Jinsingizni tanlang");
    if (!data.age) return toast.error("Yoshingizni kiriting");

    try {
      const res = await fetch(
        "http://localhost:3000/users/complete-onboarding",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Xatolik yuz berdi");
      }

      const updatedUser = await res.json();
      console.log(updatedUser);

      updateUser(updatedUser);
      toast.success("Muvaffaqiyatli! Platformaga xush kelibsiz. 🚀");
    } catch (err) {
      // Backenddan kelgan validation xatolari massiv bo'lishi mumkin
      const msg = Array.isArray(err.message) ? err.message[0] : err.message;
      toast.error(msg || "Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    }
  };

  const canGoNext = () => {
    if (step === 5) {
      if (!data.username || !usernameAvailable || !data.gender || !data.age)
        return false;
      const ageNum = Number(data.age);
      if (isNaN(ageNum) || ageNum < 4 || ageNum > 100) return false;
    }
    if (step === 2 && data.interests.length === 0) return false;
    if (step === 3 && data.goals.length === 0) return false;
    if (step === 4 && !data.level) return false;
    return true;
  };

  const nextStep = () => {
    if (!canGoNext() && step > 1) {
      let msg = "Maydonlarni to'ldiring";
      if (step === 5) {
        const ageNum = Number(data.age);
        if (!data.username) msg = "Username kiriting";
        else if (!usernameAvailable) msg = "Yaroqli username tanlang";
        else if (!data.gender) msg = "Jinsingizni tanlang";
        else if (!data.age) msg = "Yoshingizni kiriting";
        else if (ageNum < 4 || ageNum > 100)
          msg = "Yosh 4 va 100 oralig'ida bo'lishi kerak";
      } else if (step === 2) msg = "Kamida bitta qiziqish tanlang";
      else if (step === 3) msg = "Kamida bitta maqsad tanlang";
      else if (step === 4) msg = "Bilim darajangizni tanlang";

      return toast.error(msg);
    }
    step < totalSteps ? setStep((s) => s + 1) : handleFinish();
  };
  const prevStep = () => step > 1 && setStep((s) => s - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Content>
            <IconWrapper>
              <Rocket size={40} />
            </IconWrapper>
            <Title>Xush Kelibsiz!</Title>
            <Description>
              Platformamizga xush kelibsiz! Bu yerda siz o'z bilimlaringizni
              sinovdan o'tkazishingiz, boshqalar bilan bellashishingiz va
              qiziqarli muloqot qilishingiz mumkin.
              <br />
              <br />
              Tajribangizni mukammal darajada shaxsiylashtirish uchun bizga bir
              oz yordam berasizmi?
            </Description>
          </Content>
        );
      case 2:
        return (
          <Content>
            <IconWrapper>
              <Target size={40} />
            </IconWrapper>
            <Title>Qiziqishlaringiz?</Title>
            <Description>
              Sizni qaysi yo'nalishlar ko'proq qiziqtiradi? (Bir nechta tanlash
              mumkin)
            </Description>
            <OptionGrid>
              {INTERESTS.map((item) => (
                <OptionCard
                  key={item.id}
                  $active={data.interests.includes(item.id)}
                  onClick={() => toggleInterest(item.id)}
                >
                  {item.icon}
                  <OptionLabel>{item.label}</OptionLabel>
                </OptionCard>
              ))}
            </OptionGrid>
          </Content>
        );
      case 3:
        return (
          <Content>
            <IconWrapper>
              <Award size={40} />
            </IconWrapper>
            <Title>Asosiy Maqsadlar?</Title>
            <Description>
              Platformadan qaysi maqsadda foydalanmoqchisiz?
            </Description>
            <OptionGrid>
              {GOALS.map((item) => (
                <OptionCard
                  key={item.id}
                  $active={data.goals.includes(item.id)}
                  onClick={() => toggleGoal(item.id)}
                >
                  {item.icon}
                  <OptionLabel>{item.label}</OptionLabel>
                </OptionCard>
              ))}
            </OptionGrid>
          </Content>
        );
      case 4:
        return (
          <Content>
            <IconWrapper>
              <CheckCircle size={40} />
            </IconWrapper>
            <Title>Bilim Darajangiz?</Title>
            <Description>
              Hozirgi bilim darajangizni qanday baholaysiz?
            </Description>
            <OptionGrid>
              {LEVELS.map((item) => (
                <OptionCard
                  key={item.id}
                  $active={data.level === item.id}
                  onClick={() => setData({ ...data, level: item.id })}
                >
                  {item.icon}
                  <OptionLabel>{item.label}</OptionLabel>
                </OptionCard>
              ))}
            </OptionGrid>
          </Content>
        );

      case 5:
        return (
          <Content>
            <IconWrapper>
              <User size={40} />
            </IconWrapper>
            <Title>Shaxsiy ma'lumotlar</Title>
            <Description>Profilingizni to'ldiring</Description>
            <div
              style={{
                width: "100%",
                maxWidth: "360px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div style={{ position: "relative" }}>
                <AtSign
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#72767d",
                  }}
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value.toLowerCase() })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    background: "#202225",
                    border: usernameError
                      ? "1px solid #f04747"
                      : usernameAvailable
                        ? "1px solid #43b581"
                        : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
                {isCheckingUsername && (
                  <Loader2
                    size={16}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#b9bbbe",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                )}
                {!isCheckingUsername && usernameAvailable && data.username && (
                  <CheckCircle
                    size={16}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#43b581",
                    }}
                  />
                )}
              </div>
              {usernameError && (
                <div
                  style={{
                    color: "#f04747",
                    fontSize: "12px",
                    marginTop: "-12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <AlertCircle size={12} /> {usernameError}
                </div>
              )}

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setData({ ...data, gender: "male" })}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background:
                      data.gender === "male"
                        ? "rgba(88, 101, 242, 0.1)"
                        : "#202225",
                    border: `2px solid ${data.gender === "male" ? "#5865f2" : "transparent"}`,
                    borderRadius: "12px",
                    color: data.gender === "male" ? "white" : "#72767d",
                    cursor: "pointer",
                  }}
                >
                  Erkak
                </button>
                <button
                  type="button"
                  onClick={() => setData({ ...data, gender: "female" })}
                  style={{
                    flex: 1,
                    padding: "12px",
                    background:
                      data.gender === "female"
                        ? "rgba(88, 101, 242, 0.1)"
                        : "#202225",
                    border: `2px solid ${data.gender === "female" ? "#5865f2" : "transparent"}`,
                    borderRadius: "12px",
                    color: data.gender === "female" ? "white" : "#72767d",
                    cursor: "pointer",
                  }}
                >
                  Ayol
                </button>
              </div>

              <div style={{ position: "relative" }}>
                <Hash
                  size={16}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#72767d",
                  }}
                />
                <input
                  type="number"
                  placeholder="Yoshingiz"
                  value={data.age}
                  onChange={(e) => setData({ ...data, age: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    background: "#202225",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "white",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </Content>
        );

      default:
        return null;
    }
  };

  return (
    <Overlay>
      <ModalCard>
        <ProgressHeader>
          {[1, 2, 3, 4, 5].map((s) => (
            <ProgressBar key={s} $progress={step >= s ? 100 : 0} />
          ))}
        </ProgressHeader>

        {renderStep()}

        <Footer>
          <NavBtn onClick={prevStep} disabled={step === 1}>
            <ChevronLeft size={18} /> Orqaga
          </NavBtn>
          <NavBtn $primary onClick={nextStep}>
            {step === totalSteps ? "Boshlash" : "Keyingisi"}{" "}
            <ChevronRight size={18} />
          </NavBtn>
        </Footer>
      </ModalCard>
    </Overlay>
  );
};

export default OnboardingModal;
