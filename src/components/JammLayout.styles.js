import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;

  @media (max-width: 700px) {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    padding-bottom: 88px;
    box-sizing: border-box;
  }
`;

export const ContentPane = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const ScrollPane = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const EmptyPane = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-muted-color);
`;
