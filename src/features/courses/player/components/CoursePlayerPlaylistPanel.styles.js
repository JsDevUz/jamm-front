import styled from "styled-components";

export const PlaylistPanel = styled.div`
  width: 380px;
  height: 100vh;
  background-color: var(--secondary-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;

  @media (max-width: 1300px) {
    width: 100%;
    height: auto;
    border-left: none;
    border-top: 1px solid var(--border-color);
    flex: none;
  }
`;

export const PlaylistHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const PlaylistTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`;

export const MobileBackBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 4px;
  margin-right: 8px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PlaylistActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PlaylistCount = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted-color);
  background: var(--input-color);
  padding: 2px 8px;
  border-radius: 10px;
`;

export const AddLessonBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background: var(--primary-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.06);
  }
`;

export const PlaylistToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-secondary-color);
  cursor: pointer;
  padding: 4px;

  @media (max-width: 1300px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const LessonList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;

  @media (max-width: 1300px) {
    max-height: ${(props) => (props.$collapsed ? "0" : "500px")};
    overflow: ${(props) => (props.$collapsed ? "hidden" : "auto")};
    transition: max-height 0.3s ease;
  }
`;

export const EmptyLessons = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: var(--text-muted-color);
  font-size: 14px;
`;

export const EmptyLessonsHint = styled.span`
  font-size: 12px;
`;

export const LessonItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  gap: 12px;
  cursor: ${(props) => (props.$interactive ? "pointer" : "default")};
  transition: all 0.15s ease;
  position: relative;

  &:hover {
    background-color: var(--hover-color);
  }

  ${(props) =>
    props.$active &&
    `
      background-color: var(--active-color);

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 3px;
        background: var(--primary-color);
        border-radius: 0 2px 2px 0;
      }
    `}
`;

export const LessonNumber = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  background: ${(props) =>
    props.$active ? "var(--primary-color)" : "var(--input-color)"};
  color: ${(props) => (props.$active ? "white" : "var(--text-secondary-color)")};
`;

export const LessonInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const LessonTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  font-size: 14px;
  font-weight: ${(props) => (props.$active ? "600" : "500")};
  color: ${(props) =>
    props.$active ? "var(--text-color)" : "var(--text-secondary-color)"};
  margin-bottom: 2px;
`;

export const LessonTitleText = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FreeBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--success-color) 15%, transparent);
  color: var(--success-color);
  margin-left: 6px;
  vertical-align: middle;
`;

export const DraftBadge = styled.span`
  flex-shrink: 0;
  padding: 1px 6px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--warning-color) 14%, transparent);
  color: var(--warning-color);
  font-size: 10px;
  font-weight: 700;
`;

export const LessonMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const LessonMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const LockedLessonTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted-color);
  font-style: italic;
`;

export const DeleteLessonBtn = styled.button`
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 6px;
  background: none;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.15s;

  ${LessonItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background: color-mix(in srgb, var(--danger-color) 16%, transparent);
    color: var(--danger-color);
  }
`;

export const EditLessonBtn = styled(DeleteLessonBtn)`
  &:hover {
    background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    color: var(--primary-color);
  }
`;

export const PublishLessonBtn = styled(DeleteLessonBtn)`
  &:hover {
    background: color-mix(in srgb, var(--success-color) 14%, transparent);
    color: var(--success-color);
  }
`;
