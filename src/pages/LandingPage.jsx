import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Video,
  BookOpen,
  Brain,
  ChevronRight,
  Check,
  Play,
  Users,
  Globe,
  Shield,
  Zap,
  Award,
  Clock,
  Star,
  ArrowRight,
  FileText,
  Layers,
  Swords,
  Type,
  Lightbulb,
} from "lucide-react";
import useAuthStore from "../store/authStore";

// Animations
const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(114, 137, 218, 0.4); }
  50% { box-shadow: 0 0 0 20px rgba(114, 137, 218, 0); }
`;

// Styled Components
const Page = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  color: #1e293b;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
`;

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.5px;
`;

const LogoIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s;
  &:hover {
    color: #1e293b;
    background: rgba(0, 0, 0, 0.04);
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Btn = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  ${(p) =>
    p.$primary
      ? `
    background: #7289da;
    color: white;
    &:hover { background: #677bc4; transform: translateY(-1px); }
  `
      : `
    background: transparent;
    color: #1e293b;
    border: 1px solid rgba(0, 0, 0, 0.15);
    &:hover { background: rgba(0, 0, 0, 0.04); border-color: rgba(0, 0, 0, 0.25); }
  `}
`;

// Hero Section
const Hero = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 100px 16px 60px;
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(114, 137, 218, 0.08), transparent),
    radial-gradient(ellipse 60% 40% at 80% 50%, rgba(114, 137, 218, 0.05), transparent);
`;

const HeroContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  z-index: 1;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroLeft = styled.div``;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(114, 137, 218, 0.15);
  border: 1px solid rgba(114, 137, 218, 0.25);
  color: #7289da;
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 24px;
  letter-spacing: -2px;
  background: linear-gradient(135deg, #1e293b 0%, #64748b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: #64748b;
  line-height: 1.7;
  margin: 0 0 32px;
  max-width: 540px;
  @media (max-width: 968px) {
    max-width: 100%;
  }
`;

const HeroCTA = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const HeroRight = styled.div`
  position: relative;
  @media (max-width: 968px) {
    display: none;
  }
`;

const HeroVisual = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  background: linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%);
  border-radius: 24px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  animation: ${float} 6s ease-in-out infinite;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.1);
`;

const VisualOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(114, 137, 218, 0.1) 0%, transparent 50%);
`;

const FeaturePreview = styled.div`
  position: absolute;
  inset: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PreviewCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PreviewIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${(p) => p.$bg || "rgba(114, 137, 218, 0.15)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.$color || "#7289da"};
`;

const PreviewText = styled.div``;
const PreviewTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
`;
const PreviewDesc = styled.div`
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
`;

// Stats
const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #7289da;
  letter-spacing: -1px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
`;

// Features Section
const FeaturesSection = styled.section`
  padding: 100px 24px;
  background: #ffffff;
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 800;
  margin: 0 0 16px;
  letter-spacing: -1px;
  color: #1e293b;
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
  &:hover {
    background: #ffffff;
    border-color: rgba(114, 137, 218, 0.3);
    transform: translateY(-4px);
  }
`;

const FeatureIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${(p) => p.$bg || "rgba(114, 137, 218, 0.15)"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.$color || "#7289da"};
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
  color: #1e293b;
`;

const FeatureDesc = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
`;

// How It Works
const HowItWorksSection = styled.section`
  padding: 100px 24px;
  background: #f8fafc;
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 60px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const Step = styled.div`
  text-align: center;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 40px;
    right: -20px;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, rgba(114, 137, 218, 0.5), transparent);
    @media (max-width: 768px) {
      display: none;
    }
  }
  &:last-child::after {
    display: none;
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(114, 137, 218, 0.2) 0%, rgba(114, 137, 218, 0.05) 100%);
  border: 2px solid rgba(114, 137, 218, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
  color: #7289da;
  margin: 0 auto 24px;
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
  color: #1e293b;
`;

const StepDesc = styled.p`
  font-size: 15px;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
`;

// Testimonials
const TestimonialsSection = styled.section`
  padding: 100px 24px;
  background: #ffffff;
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 60px;
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const TestimonialCard = styled.div`
  background: #f8fafc;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 32px;
`;

const TestimonialQuote = styled.p`
  font-size: 16px;
  color: #64748b;
  line-height: 1.7;
  margin: 0 0 24px;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AuthorAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7289da 0%, #677bc4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-weight: 600;
  color: #1e293b;
`;

const AuthorRole = styled.div`
  font-size: 13px;
  color: #64748b;
`;

// CTA Section
const CTASection = styled.section`
  padding: 100px 24px;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    padding: 60px 16px;
  }
`;

const CTABackground = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 80% at 50% 100%, rgba(114, 137, 218, 0.15), transparent);
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const CTATitle = styled.h2`
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  margin: 0 0 20px;
  letter-spacing: -1px;
  color: #1e293b;
`;

const CTASubtitle = styled.p`
  font-size: 18px;
  color: #64748b;
  margin: 0 0 40px;
  line-height: 1.6;
`;

const CTAButton = styled.button`
  padding: 18px 40px;
  background: #7289da;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  animation: ${pulse} 2s infinite;
  &:hover {
    background: #677bc4;
    transform: translateY(-2px);
  }
`;

// Footer
const Footer = styled.footer`
  padding: 60px 24px 40px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  @media (max-width: 768px) {
    padding: 40px 16px 32px;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  @media (max-width: 968px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const FooterBrand = styled.div``;

const FooterText = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.6;
  margin: 16px 0 0;
  max-width: 300px;
`;

const FooterColumn = styled.div``;

const FooterTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FooterLink = styled.a`
  color: #64748b;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  &:hover {
    color: #1e293b;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 40px auto 0;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  text-align: center;
  font-size: 13px;
  color: #64748b;
`;

// Component
const LandingPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/chats", { replace: true });
    }
  }, [user, navigate]);

  const features = [
    {
      icon: BookOpen,
      title: "Kurslar",
      description: "O'zbek tilida kurslar yaratish va o'rganish. Darslar, video va vazifalar bilan to'liq ta'lim jarayoni.",
      bg: "rgba(250, 166, 26, 0.15)",
      color: "#faa61a",
    },
    {
      icon: Brain,
      title: "Arena (Maydon)",
      description: "Flashcardlar, testlar, gap tuzish, minemonika va janglar bilan o'z bilimlaringizni mustahkamlang.",
      bg: "rgba(244, 114, 182, 0.15)",
      color: "#f472b6",
    },
    {
      icon: MessageCircle,
      title: "Chatlar",
      description: "Shaxsiy va guruh chatlar. Video qo'ng'iroqlar bilan real-time muloqot qiling.",
      bg: "rgba(114, 137, 218, 0.15)",
      color: "#7289da",
    },
    {
      icon: FileText,
      title: "Maqolalar",
      description: "O'zbek tilida maqolalar yozish va o'qish. Bilimlaringizni gurunglarda baham ko'ring.",
      bg: "rgba(67, 181, 129, 0.15)",
      color: "#43b581",
    },
  ];

  const arenaFeatures = [
    {
      icon: Layers,
      title: "Flashcardlar",
      description: "Klassik, test va o'yin rejimlari. Swipe bilan o'rganish va spaced repetition.",
    },
    {
      icon: Check,
      title: "Testlar",
      description: "Ko'p variantli testlar va quizlar. Bilimlaringizni tekshiring.",
    },
    {
      icon: Type,
      title: "Gap Tuzish",
      description: "Sentence builders bilan gaplar to'g'ri tuzishni o'rganing.",
    },
    {
      icon: Lightbulb,
      title: "Minemonika",
      description: "Mnemonics yordamida so'zlarni osongina yodlang.",
    },
    {
      icon: Swords,
      title: "Janglar",
      description: "Boshqa foydalanuvchilar bilan bilim jangida qatnashing.",
    },
  ];

  const testimonials = [
    {
      quote: "Jamm Arena bilan ingliz tilidagi 2000+ so'zni 3 oyda yodladim. Flashcardlar juda qulay!",
      name: "Azizbek K.",
      role: "Talaba",
      initial: "A",
    },
    {
      quote: "Guruh chatlar va video qo'ng'iroqlar bilan dars guruhimiz bilan samarali ishlashimiz osonlashdi.",
      name: "Nilufar R.",
      role: "O'qituvchi",
      initial: "N",
    },
    {
      quote: "Kurslar yaratish va darslarni qo'shish juda oson. O'quvchilarim uchun mukammal platforma.",
      name: "Jasur M.",
      role: "Kurs muallifi",
      initial: "J",
    },
  ];

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Page>
      <Navbar>
        <Logo>
          <LogoIcon>
            <img src="/fav.png" alt="Jamm" />
          </LogoIcon>
          jamm
        </Logo>
        <NavLinks>
          <NavLink href="#features" onClick={(e) => { e.preventDefault(); scrollToFeatures(); }}>
            Features
          </NavLink>
          <NavLink href="#how-it-works" onClick={(e) => { e.preventDefault(); document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" }); }}>
            How it Works
          </NavLink>
          <NavLink href="#testimonials" onClick={(e) => { e.preventDefault(); document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" }); }}>
            Testimonials
          </NavLink>
        </NavLinks>
        <NavButtons>
          <Btn onClick={() => navigate("/login")}>Kirish</Btn>
          <Btn $primary onClick={() => navigate("/login")}>
            Boshlash <ChevronRight size={16} />
          </Btn>
        </NavButtons>
      </Navbar>

      <Hero>
        <HeroBackground />
        <HeroContent>
          <HeroLeft>
            <HeroBadge>
              <Star size={14} fill="#7289da" /> O'zbek tilida ta'lim platformasi
            </HeroBadge>
            <HeroTitle>
              O'qing, Muloqot qiling, O'sing — Barchasi Bir Joyda
            </HeroTitle>
            <HeroSubtitle>
              Jamm - bu kurslar, Arena flashcardlar, chatlar va video qo'ng'iroqlar birlashgan zamonaviy ta'lim platformasi. 
              O'zbek tilida o'rganish, darslar va guruhlar bilan hamkorlik qiling.
            </HeroSubtitle>
            <HeroCTA>
              <Btn $primary onClick={() => navigate("/login")}>
                <Play size={18} fill="currentColor" /> Bepul boshlash
              </Btn>
              <Btn onClick={() => navigate("/login")}>
                <Globe size={18} /> Demo ko'rish
              </Btn>
            </HeroCTA>
            <Stats>
              <Stat>
                <StatValue>10K+</StatValue>
                <StatLabel>Foydalanuvchilar</StatLabel>
              </Stat>
              <Stat>
                <StatValue>500+</StatValue>
                <StatLabel>Kurslar</StatLabel>
              </Stat>
              <Stat>
                <StatValue>50K+</StatValue>
                <StatLabel>Flashcardlar</StatLabel>
              </Stat>
              <Stat>
                <StatValue>99%</StatValue>
                <StatLabel>Mamnunlik</StatLabel>
              </Stat>
            </Stats>
          </HeroLeft>
          <HeroRight>
            <HeroVisual>
              <VisualOverlay />
              <FeaturePreview>
                <PreviewCard>
                  <PreviewIcon><MessageCircle size={20} /></PreviewIcon>
                  <PreviewText>
                    <PreviewTitle>Yangi xabar</PreviewTitle>
                    <PreviewDesc>Dars bo'yicha materiallar yuborildi</PreviewDesc>
                  </PreviewText>
                </PreviewCard>
                <PreviewCard>
                  <PreviewIcon $bg="rgba(67, 181, 129, 0.15)" $color="#43b581"><Video size={20} /></PreviewIcon>
                  <PreviewText>
                    <PreviewTitle>Video call boshlandi</PreviewTitle>
                    <PreviewDesc>4 ishtirokchi qo'shildi</PreviewDesc>
                  </PreviewText>
                </PreviewCard>
                <PreviewCard>
                  <PreviewIcon $bg="rgba(250, 166, 26, 0.15)" $color="#faa61a"><BookOpen size={20} /></PreviewIcon>
                  <PreviewText>
                    <PreviewTitle>Kurs tugatildi</PreviewTitle>
                    <PreviewDesc>Tabriklaymiz! Sertifikat tayyor</PreviewDesc>
                  </PreviewText>
                </PreviewCard>
              </FeaturePreview>
            </HeroVisual>
          </HeroRight>
        </HeroContent>
      </Hero>

      <FeaturesSection id="features">
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Asosiy Xususiyatlar</SectionTitle>
            <SectionSubtitle>
              O'zbek tilida ta'lim va hamkorlik uchun barcha vositalar. 
              Kurslar, Arena, chatlar va maqolalar - barchasi Jamm'da.
            </SectionSubtitle>
          </SectionHeader>
          <FeaturesGrid>
            {features.map((feature, idx) => (
              <FeatureCard key={idx}>
                <FeatureIcon $bg={feature.bg} $color={feature.color}>
                  <feature.icon size={28} />
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDesc>{feature.description}</FeatureDesc>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </SectionContainer>
      </FeaturesSection>

      <HowItWorksSection id="how-it-works">
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Arena - Bilimlarni Mustahkamlang</SectionTitle>
            <SectionSubtitle>
              5 ta kuchli o'quv vositasi bilan har qanday mavzuni o'zlashtiring
            </SectionSubtitle>
          </SectionHeader>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '40px' }}>
            {arenaFeatures.map((feature, idx) => (
              <FeatureCard key={idx}>
                <FeatureIcon $bg={feature.bg || 'rgba(114, 137, 218, 0.15)'} $color={feature.color || '#7289da'}>
                  <feature.icon size={24} />
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDesc>{feature.description}</FeatureDesc>
              </FeatureCard>
            ))}
          </div>
        </SectionContainer>
      </HowItWorksSection>

      <TestimonialsSection id="testimonials">
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Foydalanuvchilar nima deydi?</SectionTitle>
            <SectionSubtitle>
              Butun dunyo bo'ylab minglab foydalanuvchilar Jamm bilan o'rganishni tanlashmoqda
            </SectionSubtitle>
          </SectionHeader>
          <TestimonialsGrid>
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx}>
                <TestimonialQuote>"{t.quote}"</TestimonialQuote>
                <TestimonialAuthor>
                  <AuthorAvatar>{t.initial}</AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{t.name}</AuthorName>
                    <AuthorRole>{t.role}</AuthorRole>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </SectionContainer>
      </TestimonialsSection>

      <CTASection>
        <CTABackground />
        <CTAContent>
          <CTATitle>O'z imkoniyatlaringizni kashf eting</CTATitle>
          <CTASubtitle>
            Hoziroq Jammga qo'shiling va o'qish, muloqot va o'sish uchun 
            zamonaviy platformadan foydalaning.
          </CTASubtitle>
          <CTAButton onClick={() => navigate("/login")}>
            Bepul boshlash <ArrowRight size={20} />
          </CTAButton>
        </CTAContent>
      </CTASection>

      <Footer>
        <FooterContent>
          <FooterBrand>
            <Logo>
              <LogoIcon>J</LogoIcon>
              jamm
            </Logo>
            <FooterText>
              Zamonaviy ta'lim va hamkorlik platformasi. O'qish, muloqot va 
              o'sish uchun barcha vositalar bir joyda.
            </FooterText>
          </FooterBrand>
          <FooterColumn>
            <FooterTitle>Platforma</FooterTitle>
            <FooterLinks>
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#how-it-works">How it Works</FooterLink>
              <FooterLink href="#testimonials">Testimonials</FooterLink>
              <FooterLink href="#">Pricing</FooterLink>
            </FooterLinks>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Resurslar</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">Help Center</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Community</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
            </FooterLinks>
          </FooterColumn>
          <FooterColumn>
            <FooterTitle>Legal</FooterTitle>
            <FooterLinks>
              <FooterLink href="#">Privacy</FooterLink>
              <FooterLink href="#">Terms</FooterLink>
              <FooterLink href="#">Cookies</FooterLink>
            </FooterLinks>
          </FooterColumn>
        </FooterContent>
        <FooterBottom>
          © 2024 Jamm. Barcha huquqlar himoyalangan.
        </FooterBottom>
      </Footer>
    </Page>
  );
};

export default LandingPage;
