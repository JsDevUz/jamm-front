import styled from "styled-components";

export const HomeworkSection = styled.div`
  padding: 18px 24px 24px;
`;

export const HomeworkHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const HomeworkTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-color);
`;

export const HomeworkHint = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const HomeworkCard = styled.div`
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  gap: 10px;
  margin-bottom: 14px;
`;

export const HomeworkMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const AssignmentTabs = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const AssignmentTabButton = styled.button`
  padding: 7px 10px;
  border-radius: 999px;
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

export const HomeworkBody = styled.div`
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-secondary-color);
      overflow-wrap: anywhere;
  white-space: pre-wrap;
`;

export const HomeworkForm = styled.div`
  display: grid;
  gap: 8px;
`;

export const HomeworkField = styled.label`
  display: grid;
  gap: 5px;
  min-width: 0;
`;

export const HomeworkFieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const HomeworkFieldLabel = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted-color);
  line-height: 1.2;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

export const HomeworkInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid var(--border-color);
  border-radius: 9px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const HomeworkSelect = styled.select`
  width: 100%;
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid var(--border-color);
  border-radius: 9px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const HomeworkTextarea = styled.textarea`
  width: 100%;
  min-width: 0;
  min-height: 78px;
  padding: 8px 10px;
  border: 1px solid var(--border-color);
  border-radius: 9px;
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 13px;
  line-height: 1.5;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

export const HomeworkFileInput = styled.input`
  display: none;
`;

export const HomeworkFileLabel = styled.label`
  display: grid;
  justify-items: center;
  gap: 6px;
  padding: 16px 12px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  background: var(--secondary-color);
  color: var(--text-secondary-color);
  cursor: pointer;
  text-align: center;

  &:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`;

export const HomeworkFileMeta = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const HomeworkActions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 6px;
  justify-content: flex-end;
`;

export const HomeworkButton = styled.button`
  padding: ${(props) => (props.$iconOnly ? "8px" : "9px 12px")};
  min-width: ${(props) => (props.$iconOnly ? "34px" : "auto")};
  min-height: ${(props) => (props.$iconOnly ? "34px" : "auto")};
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.$primary ? "var(--primary-color)" : "var(--border-color)")};
  background: ${(props) => (props.$primary ? "var(--primary-color)" : "var(--secondary-color)")};
  color: ${(props) => (props.$primary ? "white" : "var(--text-color)")};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:disabled {
    opacity: 0.56;
    cursor: not-allowed;
  }
`;

export const SubmissionList = styled.div`
  display: grid;
  gap: 10px;
`;

export const SubmissionRow = styled.div`
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  gap: 10px;
`;

export const SubmissionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const SubmissionName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`;

export const SubmissionStatus = styled.div`
  padding: 5px 9px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: ${(props) =>
    props.$status === "reviewed"
      ? "var(--success-color)"
      : props.$status === "needs_revision"
        ? "var(--warning-color)"
        : "var(--primary-color)"};
  background: ${(props) =>
    props.$status === "reviewed"
      ? "color-mix(in srgb, var(--success-color) 12%, transparent)"
      : props.$status === "needs_revision"
        ? "color-mix(in srgb, var(--warning-color) 12%, transparent)"
        : "color-mix(in srgb, var(--primary-color) 12%, transparent)"};
`;

export const SubmissionText = styled.div`
  font-size: 13px;
  line-height: 1.5;
      overflow-wrap: anywhere;

  color: var(--text-secondary-color);
  white-space: pre-wrap;
`;

export const SubmissionFileMeta = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const SubmissionLink = styled.a`
  font-size: 13px;
  color: var(--primary-color);
  word-break: break-all;
`;

export const SubmissionPreview = styled.div`
  display: grid;
  gap: 8px;
`;

export const SubmissionImage = styled.img`
  width: 100%;
  max-width: 320px;
  max-height: 220px;
  object-fit: contain;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
`;

export const SubmissionAudio = styled.audio`
  width: 100%;
  max-width: 360px;
`;

export const SubmissionVideo = styled.video`
  width: 100%;
  max-width: 420px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: black;
`;

export const SubmissionPdf = styled.iframe`
  width: 100%;
  max-width: 520px;
  height: 320px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--secondary-color);
`;

export const EmptyHomework = styled.div`
  padding: 14px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
  text-align: center;
`;
