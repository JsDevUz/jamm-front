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
`;
