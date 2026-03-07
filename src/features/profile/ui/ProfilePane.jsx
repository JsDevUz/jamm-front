import styled from "styled-components";

export const ProfilePaneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
`;

export const ProfilePaneHeader = styled.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--secondary-color);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const ProfilePaneTitle = styled.h2`
  margin: 0;
  color: var(--text-color);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
`;

export const ProfilePaneBody = styled.div`
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const ProfilePaneSection = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--secondary-color);
`;

export const ProfilePaneSectionHeader = styled.div`
  padding: 12px 14px 0;
`;

export const ProfilePaneSectionTitle = styled.h3`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 700;
`;

export const ProfilePaneSectionText = styled.p`
  margin: 0 0 12px;
  color: var(--text-muted-color);
  font-size: 12px;
  line-height: 1.45;
`;

export const ProfilePaneEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  padding: 24px 16px;
  color: var(--text-muted-color);
  font-size: 13px;
  gap: 10px;
  text-align: center;
`;

export const ProfilePaneEmptyIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--input-color);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.5;
`;
