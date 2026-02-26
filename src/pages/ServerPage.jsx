import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Hash,
  MessageSquare,
  Users,
  Users2,
  GraduationCap,
} from "lucide-react";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #dcddde;
  text-align: center;
  padding: 40px;
`;

const WelcomeIcon = styled.div`
  width: 120px;
  height: 120px;
  background-color: #7289da;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
`;

const WelcomeText = styled.p`
  font-size: 16px;
  color: #b9bbbe;
  margin-bottom: 32px;
  max-width: 400px;
  line-height: 1.5;
`;

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 800px;
  width: 100%;
  margin-top: 40px;
`;

const FeatureCard = styled.div`
  background-color: #2f3136;
  padding: 24px;
  border-radius: 8px;
  text-align: left;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #36393f;
    transform: translateY(-2px);
  }
`;

const FeatureLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeatureDescription = styled.p`
  color: #b9bbbe;
  line-height: 1.5;
`;

const ServerPage = () => {
  return (
    <PageContainer>
      <WelcomeIcon>
        <Hash size={60} color="white" />
      </WelcomeIcon>

      <WelcomeTitle>Welcome to Jamm</WelcomeTitle>
      <WelcomeText>
        This is a modern communication platform built with React, Vite, and
        styled-components. Experience real-time chat, voice channels, and a
        beautiful interface.
      </WelcomeText>

      <FeatureList>
        <FeatureLink to="/home">
          <FeatureCard>
            <FeatureTitle>
              <MessageSquare size={20} />
              All Chats
            </FeatureTitle>
            <FeatureDescription>
              View and manage all your conversations in one place. Switch
              between different chats and stay connected.
            </FeatureDescription>
          </FeatureCard>
        </FeatureLink>

        <FeatureLink to="/users">
          <FeatureCard>
            <FeatureTitle>
              <Users size={20} />
              Direct Messages
            </FeatureTitle>
            <FeatureDescription>
              Start one-on-one conversations with friends and colleagues.
              Private and secure messaging.
            </FeatureDescription>
          </FeatureCard>
        </FeatureLink>

        <FeatureLink to="/groups">
          <FeatureCard>
            <FeatureTitle>
              <Users2 size={20} />
              Group Chats
            </FeatureTitle>
            <FeatureDescription>
              Create and join group conversations with multiple participants.
              Perfect for teams and communities.
            </FeatureDescription>
          </FeatureCard>
        </FeatureLink>

        <FeatureCard>
          <FeatureTitle>
            <Hash size={20} />
            Modern UI
          </FeatureTitle>
          <FeatureDescription>
            Beautiful, responsive interface that works on all devices. Smooth
            animations and intuitive user experience.
          </FeatureDescription>
        </FeatureCard>

        <FeatureLink to="/courses">
          <FeatureCard>
            <FeatureTitle>
              <GraduationCap size={20} />
              Courses
            </FeatureTitle>
            <FeatureDescription>
              Watch video lessons, track your progress, and learn new skills.
              YouTube-like player with organized playlists.
            </FeatureDescription>
          </FeatureCard>
        </FeatureLink>
      </FeatureList>
    </PageContainer>
  );
};

export default ServerPage;
