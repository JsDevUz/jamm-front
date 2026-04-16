import styled from "styled-components";

export const ArenaContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  padding: 32px 10px;
  background-color: var(--background-color);
`;

export const ContentArea = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => (props.$hasSidebar ? "32px" : "0px")};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 100px;
  color: var(--text-muted-color);
  opacity: 0.8;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  margin-bottom: 16px;
  font-size: 48px;
`;

export const EmptyTitle = styled.h2`
  margin: 0 0 8px;
  color: var(--text-color);
`;

export const EmptyDescription = styled.p`
  max-width: 400px;
  margin: 0;
`;
