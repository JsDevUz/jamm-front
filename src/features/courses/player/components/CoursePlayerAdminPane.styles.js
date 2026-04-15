import styled from "styled-components";
import {
  mobileFullscreenPane,
  mobileTopSafePadding,
} from "../../../../shared/styles/mobileSafeArea";

export const PaneOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10020;
  background: color-mix(in srgb, var(--background-color) 82%, black);
  display: flex;
  justify-content: flex-end;
  overflow: hidden;

  @media (max-width: 980px) {
    overflow-y: auto;
    align-items: stretch;
  }
`;

export const PaneShell = styled.div`
  width: 100vw;
  height: 100dvh;
  background: var(--background-color);
  border-left: 1px solid var(--border-color);
  display: block;
  overflow-y: auto;

  @media (max-width: 980px) {
    width: 100%;
    min-height: var(--app-height, 100dvh);
    height: auto;
  }

  @media (max-width: 768px) {
    ${mobileFullscreenPane};
    overflow-y: auto;
  }
`;

export const PaneSidebar = styled.div`
  border-right: 1px solid var(--border-color);
  background: var(--secondary-color);
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 0;

  @media (max-width: 980px) {
    display: none;
  }
`;

export const MobileLessonStrip = styled.div`
  display: block;
  border-bottom: 1px solid var(--border-color);
   overflow-x: auto;
  background: var(--background-color);
`;

export const PaneSidebarHeader = styled.div`
  padding: 12px 12px 10px;
  display: grid;
  gap: 4px;
`;

export const PaneTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
`;

export const PaneMuted = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const PaneLessonList = styled.div`
  padding: 10px;
  overflow-y: hidden;
  display: flex;
  gap: 6px;
  overflow-x: auto;
  flex-wrap: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 980px) {
    max-height: none;
    padding: 10px;
  }
`;

export const PaneLessonButton = styled.button`
  width: auto;
  min-width: 0;
  flex: 0 0 auto;
  text-align: left;
  padding: 8px 12px;
  border: 1px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "var(--border-color)")};
  border-radius: 12px;
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 8%, var(--input-color))"
      : "var(--input-color)"};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: border-color 0.18s ease, background 0.18s ease;
`;

export const PaneLessonTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PaneLessonMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: var(--text-muted-color);
  white-space: nowrap;
`;

export const MiniBadge = styled.span`
  padding: 3px 6px;
  border-radius: 999px;
  background: ${(props) =>
    props.$draft
      ? "color-mix(in srgb, var(--warning-color) 12%, transparent)"
      : "color-mix(in srgb, var(--success-color) 12%, transparent)"};
  color: ${(props) => (props.$draft ? "var(--warning-color)" : "var(--success-color)")};
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
  white-space: nowrap;
`;

export const PaneSidebarFooter = styled.div`
  padding: 10px 10px 10px;
  border-top: 1px solid var(--border-color);

  & > button {
    width: 100%;
  }
`;

export const PanePrimaryButton = styled.button`
  padding: 9px 11px;
  border-radius: 10px;
  border: 1px solid var(--primary-color);
  background: var(--primary-color);
  color: white;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const PaneMain = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
  min-height: 0;
`;

export const PaneTopBar = styled.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
 
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  ${mobileTopSafePadding(12, 16, 12, 16)};
`;

export const PaneTopActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PaneGhostButton = styled.button`
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const PaneDangerButton = styled(PaneGhostButton)`
  color: var(--danger-color);
  border-color: color-mix(in srgb, var(--danger-color) 24%, var(--border-color));
`;

export const PaneSummary = styled.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SummaryCard = styled.div`
  padding: 11px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
`;

export const SummaryLabel = styled.div`
  font-size: 11px;
  color: var(--text-muted-color);
`;

export const SummaryValue = styled.div`
  margin-top: 3px;
  font-size: 18px;
  font-weight: 700;
  color: var(--text-color);
`;

export const PaneTabs = styled.div`
  padding: 12px 18px 0;
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const PaneTabButton = styled.button`
  flex: 0 0 auto;
  padding: 8px 12px;
  border-radius: 999px;
  white-space: nowrap;
  border: 1px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 10%, transparent)"
      : "var(--input-color)"};
  color: ${(props) => (props.$active ? "var(--primary-color)" : "var(--text-secondary-color)")};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const PaneContent = styled.div`
  min-height: 0;
  overflow: visible;
`;

export const MembersSection = styled.div`
  padding: 16px 18px 20px;
  display: grid;
  gap: 16px;
`;

export const SectionTitle = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
`;

export const MemberTable = styled.div`
  display: grid;
  gap: 8px;
`;

export const MemberRow = styled.div`
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
  align-items: center;
`;

export const MemberMeta = styled.div`
  min-width: 0;
`;

export const MemberName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-color);
`;

export const MemberSub = styled.div`
  font-size: 11px;
  color: var(--text-muted-color);
  margin-top: 2px;
`;

export const MemberActions = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const TinyAction = styled.button`
  padding: 7px 9px;
  border-radius: 9px;
  border: 1px solid
    ${(props) =>
      props.$approve
        ? "color-mix(in srgb, var(--success-color) 24%, var(--border-color))"
        : "color-mix(in srgb, var(--danger-color) 24%, var(--border-color))"};
  background: ${(props) =>
    props.$approve
      ? "color-mix(in srgb, var(--success-color) 10%, transparent)"
      : "color-mix(in srgb, var(--danger-color) 10%, transparent)"};
  color: ${(props) => (props.$approve ? "var(--success-color)" : "var(--danger-color)")};
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const EmptyState = styled.div`
  padding: 12px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  font-size: 13px;
  color: var(--text-muted-color);
  text-align: center;
`;
