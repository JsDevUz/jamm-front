import styled from "styled-components";

export const Screen = styled.div`
  min-height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

export const Card = styled.div`
  width: min(100%, 560px);
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 32px;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: 28px;
  color: var(--text-color);
`;

export const Description = styled.p`
  margin: 0;
  line-height: 1.7;
  color: var(--text-muted-color);
`;

export const CenteredMessage = styled(Screen)`
  font-size: 15px;
  width: 100%;
`;

export const InlineLoadingShell = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  background: var(--background-color);
`;

export const LoadingCard = styled.div`
  width: min(100%, 280px);
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 18px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 2px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  border-top-color: var(--primary-color);
  animation: systemStateSpin 0.8s linear infinite;

  @keyframes systemStateSpin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const LoadingTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`;

export const LoadingHint = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;
