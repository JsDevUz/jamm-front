import React from "react";
import styled from "styled-components";
import { X, Star, Check, X as XIcon, Zap } from "lucide-react";
import PremiumBadgeIcon from "./PremiumBadge";
import { ButtonWrapper } from "./BlogsSidebar";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  z-index: 10005;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: #23272a;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid #36393f;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #2c2f33 0%, #1e2124 100%);
  padding: 32px 24px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #36393f;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.2);
  border: none;
  color: #b9bbbe;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
  }
`;

const Title = styled.h2`
  color: #fff;
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.p`
  color: #b9bbbe;
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.5;
`;

const Content = styled.div`
  padding: 32px 24px;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PlanCard = styled.div`
  background: ${(p) => (p.$premium ? "rgba(255, 170, 0, 0.05)" : "#2f3136")};
  border: 1px solid
    ${(p) => (p.$premium ? "rgba(255, 170, 0, 0.3)" : "#40444b")};
  border-radius: 12px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PlanName = styled.h3`
  color: ${(p) => (p.$premium ? "#ffaa00" : "#fff")};
  font-size: 18px;
  margin: 0 0 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FeatureItem = styled.li`
  color: #dcddde;
  font-size: 14px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.4;
`;

const UpgradeButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #ffaa00 0%, #d48e00 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(255, 170, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 170, 0, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const PremiumUpgradeModal = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <ButtonWrapper onClick={onClose}>
            <X size={18} />
          </ButtonWrapper>
          <Title>
            <PremiumBadgeIcon width={32} height={32} />
            Jamm Premium
          </Title>
          <Subtitle>
            Siz limitga yetdingiz! <br />
            Cheklovlarni olib tashlash va qo'shimcha imkoniyatlarga ega bo'lish
            uchun Premium obunaga o'ting.
          </Subtitle>
        </Header>

        <Content>
          <ComparisonGrid>
            {/* Free Plan */}
            <PlanCard>
              <PlanName>Oddiy</PlanName>
              <FeatureList>
                <FeatureItem>
                  <Check
                    size={16}
                    color="#2ecc71"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  Maksimal 3 ta test yaratish
                </FeatureItem>
                <FeatureItem>
                  <Check
                    size={16}
                    color="#2ecc71"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  Maksimal 4 ta lug'at yaratish
                </FeatureItem>
                <FeatureItem>
                  <XIcon
                    size={16}
                    color="#ed4245"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  Har bir to'plamda max 30 ta savol
                </FeatureItem>
                <FeatureItem>
                  <XIcon
                    size={16}
                    color="#ed4245"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  Oddiy avatar va fonlar
                </FeatureItem>
              </FeatureList>
            </PlanCard>

            {/* Premium Plan */}
            <PlanCard $premium>
              <PlanName $premium>
                <PremiumBadgeIcon width={18} height={18} /> Premium
              </PlanName>
              <FeatureList>
                <FeatureItem>
                  <Check
                    size={16}
                    color="#ffaa00"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <span style={{ color: "#fff", fontWeight: 500 }}>
                    Maksimal 10 ta test yaratish
                  </span>
                </FeatureItem>
                <FeatureItem>
                  <Check
                    size={16}
                    color="#ffaa00"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <span style={{ color: "#fff", fontWeight: 500 }}>
                    Maksimal 10 ta lug'at yaratish
                  </span>
                </FeatureItem>
                <FeatureItem>
                  <Check
                    size={16}
                    color="#ffaa00"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  Maxsus oltin belgi (badge)
                </FeatureItem>
                <FeatureItem>
                  <Check
                    size={16}
                    color="#ffaa00"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  Reklamasiz va cheksiz imkoniyatlar
                </FeatureItem>
              </FeatureList>
            </PlanCard>
          </ComparisonGrid>

          <UpgradeButton onClick={onUpgrade}>
            <Zap size={18} fill="#fff" />
            Obunani ko'rish va faollashtirish
          </UpgradeButton>
        </Content>
      </ModalContainer>
    </Overlay>
  );
};

export default PremiumUpgradeModal;
