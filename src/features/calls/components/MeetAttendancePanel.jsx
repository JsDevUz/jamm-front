import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  ClipboardList,
  GraduationCap,
  X,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";

const attendanceThemeTokens = `
  --lesson-bg: color-mix(in srgb, var(--meet-panel-bg, var(--background-color, #ffffff)) 96%, transparent);
  --lesson-bg-solid: var(--meet-panel-bg, var(--background-color, #ffffff));
  --lesson-bg-muted: color-mix(in srgb, var(--meet-panel-bg, #ffffff) 90%, var(--meet-text-color, #111827) 10%);
  --lesson-text: var(--meet-text-color, var(--text-color, #111827));
  --lesson-muted: var(--meet-text-muted-color, var(--text-muted-color, #6b7280));
  --lesson-border: var(--meet-border-color, var(--border-color, rgba(15, 23, 42, 0.12)));
  --lesson-hover: var(--meet-control-hover-bg, var(--hover-color, rgba(15, 23, 42, 0.06)));
  --lesson-active: var(--meet-control-active-bg, var(--active-color, rgba(88, 101, 242, 0.12)));
  --lesson-primary: var(--primary-color, #5865f2);
  --lesson-input: var(--input-color, color-mix(in srgb, var(--meet-panel-bg, #ffffff) 88%, var(--meet-text-color, #111827) 12%));
  --lesson-success: var(--success-color, #22c55e);
  --lesson-warning: var(--warning-color, #eab308);
  --lesson-danger: var(--danger-color, #ef4444);
  --lesson-shadow: var(--meet-shadow-color, 0 24px 60px rgba(15, 23, 42, 0.18));
`;

const Panel = styled.div`
  ${attendanceThemeTokens}
  position: absolute;
  top: 92px;
  right: 16px;
  z-index: 60;
  width: min(420px, calc(100vw - 32px));
  max-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  background: var(--lesson-bg);
  color: var(--lesson-text);
  border: 1px solid var(--lesson-border);
  border-radius: 14px;
  backdrop-filter: blur(18px);
  box-shadow: var(--lesson-shadow);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-bottom: 1px solid var(--lesson-border);
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const LessonTabs = styled.div`
  display: flex;
  gap: 6px;
  padding: 8px 10px;
  overflow-x: auto;
  border-bottom: 1px solid var(--lesson-border);
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: color-mix(in srgb, var(--lesson-muted) 42%, transparent);
    border-radius: 2px;
  }
`;

const LessonTab = styled.button`
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid
    ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--lesson-primary) 54%, transparent)"
        : "var(--lesson-border)"};
  background: ${(p) =>
    p.$active ? "color-mix(in srgb, var(--lesson-primary) 18%, transparent)" : "transparent"};
  color: ${(p) =>
    p.$active
      ? "color-mix(in srgb, var(--lesson-primary) 72%, var(--lesson-text) 28%)"
      : "var(--lesson-muted)"};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: color-mix(in srgb, var(--lesson-primary) 14%, transparent);
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid var(--lesson-border);
`;

const TabButton = styled.button`
  flex: 1;
  padding: 8px 10px;
  border-radius: 8px;
  border: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: ${(p) => (p.$active ? "var(--lesson-active)" : "transparent")};
  color: ${(p) => (p.$active ? "var(--lesson-text)" : "var(--lesson-muted)")};
  &:hover {
    background: var(--lesson-hover);
  }
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 6px 8px 10px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  padding: 4px 2px 10px;

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const StatCard = styled.div`
  min-width: 0;
  padding: 8px 9px;
  border-radius: 10px;
  border: 1px solid
    ${(p) =>
      p.$tone === "success"
        ? "color-mix(in srgb, var(--lesson-success) 28%, var(--lesson-border))"
        : p.$tone === "warning"
          ? "color-mix(in srgb, var(--lesson-warning) 28%, var(--lesson-border))"
          : p.$tone === "danger"
            ? "color-mix(in srgb, var(--lesson-danger) 28%, var(--lesson-border))"
            : "var(--lesson-border)"};
  background: ${(p) =>
    p.$tone === "success"
      ? "color-mix(in srgb, var(--lesson-success) 10%, transparent)"
      : p.$tone === "warning"
        ? "color-mix(in srgb, var(--lesson-warning) 10%, transparent)"
        : p.$tone === "danger"
          ? "color-mix(in srgb, var(--lesson-danger) 10%, transparent)"
          : "color-mix(in srgb, var(--lesson-text) 4%, transparent)"};
`;

const StatValue = styled.div`
  color: var(--lesson-text);
  font-size: 16px;
  font-weight: 800;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
`;

const StatLabel = styled.div`
  margin-top: 3px;
  color: var(--lesson-muted);
  font-size: 10px;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Row = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid
    ${(p) =>
      p.$selected
        ? "color-mix(in srgb, var(--lesson-primary) 48%, transparent)"
        : "transparent"};
  background: ${(p) =>
    p.$selected ? "color-mix(in srgb, var(--lesson-primary) 12%, transparent)" : "transparent"};
  cursor: ${(p) => (p.$clickable ? "pointer" : "default")};
  transition: background 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
  box-shadow: ${(p) =>
    p.$selected ? "0 0 0 1px color-mix(in srgb, var(--lesson-primary) 12%, transparent)" : "none"};

  &:hover {
    background: ${(p) =>
      p.$selected
        ? "color-mix(in srgb, var(--lesson-primary) 16%, transparent)"
        : p.$clickable
          ? "var(--lesson-hover)"
          : "color-mix(in srgb, var(--lesson-text) 4%, transparent)"};
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--lesson-primary) 22%, transparent);
  color: color-mix(in srgb, var(--lesson-primary) 72%, var(--lesson-text) 28%);
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const RowInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const RowName = styled.div`
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowMeta = styled.div`
  font-size: 11px;
  color: var(--lesson-muted);
  display: flex;
  gap: 8px;
  align-items: center;
`;

const StatusButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const DetailBtn = styled.button`
  height: 28px;
  padding: 0 8px;
  border-radius: 8px;
  border: 1px solid
    ${(p) =>
      p.$active
        ? "color-mix(in srgb, var(--lesson-primary) 46%, transparent)"
        : "var(--lesson-border)"};
  background: ${(p) =>
    p.$active
      ? "color-mix(in srgb, var(--lesson-primary) 18%, transparent)"
      : "color-mix(in srgb, var(--lesson-text) 4%, transparent)"};
  color: ${(p) => (p.$active ? "var(--lesson-text)" : "var(--lesson-muted)")};
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: color-mix(in srgb, var(--lesson-primary) 18%, transparent);
    color: var(--lesson-text);
  }
`;

const StatusBtn = styled.button`
  padding: 4px 8px;
  border-radius: 6px;
  border: none;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  background: ${(p) =>
    p.$active
      ? p.$variant === "present"
        ? "var(--lesson-success)"
        : p.$variant === "late"
          ? "var(--lesson-warning)"
          : "var(--lesson-danger)"
      : "color-mix(in srgb, var(--lesson-text) 6%, transparent)"};
  color: ${(p) => (p.$active ? "#0a0a0a" : "var(--lesson-muted)")};
  &:hover {
    background: ${(p) =>
      p.$active
        ? undefined
        : p.$variant === "present"
          ? "color-mix(in srgb, var(--lesson-success) 18%, transparent)"
          : p.$variant === "late"
            ? "color-mix(in srgb, var(--lesson-warning) 18%, transparent)"
            : "color-mix(in srgb, var(--lesson-danger) 18%, transparent)"};
  }
`;

const ScoreInput = styled.input`
  width: 56px;
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid var(--lesson-border);
  background: var(--lesson-input);
  color: var(--lesson-text);
  font-size: 13px;
  text-align: center;
  outline: none;
  &:focus {
    border-color: var(--lesson-primary);
  }
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 999px;
  background: ${(p) => p.$bg || "color-mix(in srgb, var(--lesson-text) 6%, transparent)"};
  color: ${(p) => p.$color || "var(--lesson-muted)"};
  font-size: 11px;
  font-weight: 500;
`;

const CloseBtn = styled.button`
  padding: 4px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--lesson-muted);
  cursor: pointer;
  &:hover {
    background: var(--lesson-hover);
    color: var(--lesson-text);
  }
`;

const Empty = styled.div`
  padding: 24px 12px;
  text-align: center;
  color: var(--lesson-muted);
  font-size: 13px;
`;

// ─── Detail modal ────────────────────────────────────────────────────────────

const ModalBackdrop = styled.div`
  ${attendanceThemeTokens}
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--background-color, #000000) 58%, rgba(0, 0, 0, 0.65));
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const ModalShell = styled.div`
  ${attendanceThemeTokens}
  background: var(--lesson-bg-solid);
  color: var(--lesson-text);
  border-radius: 16px;
  width: min(680px, 100%);
  max-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  border: 1px solid var(--lesson-border);
  box-shadow: var(--lesson-shadow);
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid color-mix(in srgb, var(--lesson-primary) 18%, var(--lesson-border));
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--lesson-primary) 12%, transparent),
    transparent 58%
  );
`;

const ModalTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  flex: 1;
`;

const ModalBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--lesson-primary) 28%, transparent);
  background: color-mix(in srgb, var(--lesson-primary) 14%, transparent);
  color: color-mix(in srgb, var(--lesson-primary) 72%, var(--lesson-text) 28%);
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
`;

const ModalBody = styled.div`
  overflow-y: auto;
  padding: 14px 18px;
`;

const Section = styled.div`
  margin-bottom: 18px;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--lesson-muted);
  margin-bottom: 8px;
  letter-spacing: 0.05em;
`;

const Card = styled.div`
  padding: 10px 12px;
  background: color-mix(in srgb, var(--lesson-text) 3%, transparent);
  border: 1px solid var(--lesson-border);
  border-radius: 10px;
  margin-bottom: 8px;
  font-size: 13px;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
  &:not(:last-child) {
    margin-bottom: 6px;
  }
`;

const Muted = styled.span`
  color: var(--lesson-muted);
  font-size: 12px;
`;

const STATUS_LABEL = { present: "Bor", late: "Kech", absent: "Yo'q" };

function getInitials(name = "") {
  return name.trim().slice(0, 2).toUpperCase() || "??";
}

function extractAttendanceList(attendance) {
  if (!attendance) return [];
  if (Array.isArray(attendance.members)) return attendance.members;
  if (Array.isArray(attendance.records)) return attendance.records;
  if (Array.isArray(attendance.attendance)) return attendance.attendance;
  if (Array.isArray(attendance.rows)) return attendance.rows;
  return [];
}

function extractGradingList(grading) {
  if (!grading) return [];
  if (Array.isArray(grading.lesson?.students)) return grading.lesson.students;
  if (Array.isArray(grading.students)) return grading.students;
  if (Array.isArray(grading.rows)) return grading.rows;
  if (Array.isArray(grading.records)) return grading.records;
  return [];
}

function getHomeworkAssignments(homework) {
  return Array.isArray(homework?.assignments) ? homework.assignments : [];
}

function getTests(tests) {
  return Array.isArray(tests?.items) ? tests.items : [];
}

function findHomeworkSubmissionFor(assignment, userId) {
  const submissions = Array.isArray(assignment?.submissions)
    ? assignment.submissions
    : [];
  return (
    submissions.find((s) => String(s.userId) === String(userId)) ||
    (assignment.selfSubmission &&
    String(assignment.selfSubmission.userId) === String(userId)
      ? assignment.selfSubmission
      : null)
  );
}

function findTestProgressFor(test, userId) {
  const list = Array.isArray(test?.progress) ? test.progress : [];
  return list.find((p) => String(p.userId) === String(userId)) || null;
}

function summarizeHomeworkForUser(homework, userId) {
  const assignments = getHomeworkAssignments(homework);
  if (!assignments.length) return null;
  const submitted = assignments.filter((a) =>
    findHomeworkSubmissionFor(a, userId),
  ).length;
  return { total: assignments.length, submitted };
}

function summarizeTestsForUser(tests, userId) {
  const list = getTests(tests);
  if (!list.length) return null;
  const taken = list.filter((t) => findTestProgressFor(t, userId)).length;
  let correct = 0;
  let total = 0;
  list.forEach((test) => {
    const progress = findTestProgressFor(test, userId);
    if (progress) {
      correct += Number(progress.correctCount || 0);
      total += Number(progress.totalQuestions || 0);
    }
  });
  return { taken, total: list.length, correctCount: correct, totalQuestions: total };
}

function getRowScore(row) {
  const raw = row?.oralScore ?? row?.score;
  if (raw === "" || raw === null || raw === undefined) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

// ─── Detail modal ────────────────────────────────────────────────────────────

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString();
}

function getFileExtension(url, name) {
  const candidate = String(name || url || "").split("?")[0].split("#")[0];
  const dot = candidate.lastIndexOf(".");
  return dot >= 0 ? candidate.slice(dot + 1).toLowerCase() : "";
}

function detectMediaType(submission, assignmentType) {
  // Priority: explicit assignment type → URL extension → text fallback.
  const ext = getFileExtension(
    submission?.fileUrl || submission?.link,
    submission?.fileName,
  );
  const explicit = (assignmentType || "").toLowerCase();
  if (explicit === "video" || ["mp4", "mov", "webm", "m4v"].includes(ext)) {
    return "video";
  }
  if (
    explicit === "audio" ||
    ["mp3", "wav", "ogg", "m4a", "aac", "weba"].includes(ext)
  ) {
    return "audio";
  }
  if (explicit === "pdf" || ext === "pdf") return "pdf";
  if (
    explicit === "photo" ||
    ["png", "jpg", "jpeg", "gif", "webp", "avif", "heic"].includes(ext)
  ) {
    return "image";
  }
  return "other";
}

function HomeworkSubmissionPreview({ submission, assignmentType }) {
  if (!submission) return null;
  const mediaType = detectMediaType(submission, assignmentType);
  const fileUrl = submission.fileUrl || submission.link || "";
  if (!fileUrl) return null;
  const previewStyle = {
    width: "100%",
    maxHeight: 320,
    borderRadius: 10,
    background: "#0a0a0a",
    marginTop: 6,
  };
  if (mediaType === "video") {
    return (
      <video
        controls
        preload="metadata"
        style={previewStyle}
        src={fileUrl}
      />
    );
  }
  if (mediaType === "audio") {
    return (
      <audio
        controls
        preload="metadata"
        style={{ width: "100%", marginTop: 6 }}
        src={fileUrl}
      />
    );
  }
  if (mediaType === "image") {
    return (
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        <img
          src={fileUrl}
          alt={submission.fileName || "Rasm"}
          style={{ ...previewStyle, objectFit: "contain" }}
        />
      </a>
    );
  }
  if (mediaType === "pdf") {
    return (
      <iframe
        title={submission.fileName || "PDF"}
        src={fileUrl}
        style={{
          width: "100%",
          height: 420,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          background: "#0a0a0a",
          marginTop: 6,
        }}
      />
    );
  }
  return null;
}

function TestQuestionList({ detail }) {
  if (!detail) return null;
  const questions = Array.isArray(detail.questions) ? detail.questions : [];
  if (!questions.length) {
    return (
      <Muted>Savol-javob ma'lumotlari saqlanmagan (eski natija).</Muted>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {questions.map((q) => {
        const correctIdx = Number(q.correctOptionIndex);
        const userIdx = q.userAnswerIndex;
        return (
          <div
            key={q.questionIndex}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${q.correct ? "rgba(34,197,94,0.35)" : "rgba(239,68,68,0.35)"}`,
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>
              {q.questionIndex + 1}. {q.questionText}
            </div>
            {(q.options || []).map((opt, i) => {
              const isCorrect = i === correctIdx;
              const isUser = i === userIdx;
              const bg = isCorrect
                ? "rgba(34,197,94,0.16)"
                : isUser
                  ? "rgba(239,68,68,0.16)"
                  : "transparent";
              const color = isCorrect
                ? "#86efac"
                : isUser
                  ? "#fca5a5"
                  : "rgba(243,244,246,0.75)";
              return (
                <div
                  key={i}
                  style={{
                    padding: "4px 8px",
                    borderRadius: 6,
                    background: bg,
                    color,
                    fontSize: 12,
                    marginTop: 2,
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  {isUser ? <strong>→</strong> : <span style={{ width: 10 }} />}
                  <span style={{ flex: 1 }}>{opt}</span>
                  {isCorrect ? <CheckCircle2 size={12} /> : null}
                  {isUser && !isCorrect ? <XCircle size={12} /> : null}
                </div>
              );
            })}
            {userIdx === null || userIdx === undefined ? (
              <div
                style={{
                  fontSize: 11,
                  color: "rgba(243,244,246,0.5)",
                  marginTop: 4,
                }}
              >
                Javob bermagan
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function StudentDetailModal({
  student,
  homework,
  tests,
  attendance,
  testDetails,
  onFetchTestDetail,
  onClose,
}) {
  const userId = String(student?.userId || student?._id || "");
  const homeworkAssignments = getHomeworkAssignments(homework);
  const testList = getTests(tests);
  const attendanceList = extractAttendanceList(attendance);
  const studentAttendance = attendanceList.find(
    (row) => String(row.userId) === userId,
  );

  // Auto-fetch test detail for every test the user has progress on, once when
  // the modal opens or when the user changes.
  useEffect(() => {
    if (!onFetchTestDetail || !userId) return;
    testList.forEach((test) => {
      const progress = findTestProgressFor(test, userId);
      if (!progress) return;
      const testId = test.testId || test.resourceId || test._id || test.id;
      if (!testId) return;
      const cacheKey = `${testId}:${userId}`;
      if (!testDetails || !(cacheKey in testDetails)) {
        onFetchTestDetail(testId, userId);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, testList.length]);

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalShell onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Avatar>{getInitials(student?.userName)}</Avatar>
          <ModalTitle>{student?.userName || "—"}</ModalTitle>
          <ModalBadge>
            <ExternalLink size={12} />
            Tafsilot oynasi
          </ModalBadge>
          <CloseBtn type="button" onClick={onClose} aria-label="Yopish">
            <X size={18} />
          </CloseBtn>
        </ModalHeader>
        <ModalBody>
          <Section>
            <SectionTitle>Davomat</SectionTitle>
            <Card>
              <CardRow>
                <span>Status</span>
                <Pill
                  $bg={
                    studentAttendance?.status === "present"
                      ? "color-mix(in srgb, var(--lesson-success) 18%, transparent)"
                      : studentAttendance?.status === "late"
                        ? "color-mix(in srgb, var(--lesson-warning) 18%, transparent)"
                        : "color-mix(in srgb, var(--lesson-danger) 18%, transparent)"
                  }
                  $color={
                    studentAttendance?.status === "present"
                      ? "var(--lesson-success)"
                      : studentAttendance?.status === "late"
                        ? "var(--lesson-warning)"
                        : "var(--lesson-danger)"
                  }
                >
                  {STATUS_LABEL[studentAttendance?.status] || "Yo'q"}
                </Pill>
              </CardRow>
              {studentAttendance?.progressPercent !== undefined ? (
                <CardRow>
                  <span>Video ko'rilgan</span>
                  <Muted>
                    {Math.round(studentAttendance.progressPercent || 0)}%
                  </Muted>
                </CardRow>
              ) : null}
              {studentAttendance?.source ? (
                <CardRow>
                  <span>Manba</span>
                  <Muted>
                    {studentAttendance.source === "manual"
                      ? "Qo'lda"
                      : "Avtomatik"}
                  </Muted>
                </CardRow>
              ) : null}
            </Card>
          </Section>

          <Section>
            <SectionTitle>
              Uy vazifalari ({homeworkAssignments.length})
            </SectionTitle>
            {homeworkAssignments.length === 0 ? (
              <Muted>Bu darsda uy vazifa yo'q</Muted>
            ) : (
              homeworkAssignments.map((assignment) => {
                const submission = findHomeworkSubmissionFor(
                  assignment,
                  userId,
                );
                return (
                  <Card key={assignment.assignmentId}>
                    <CardRow>
                      <strong>{assignment.title || "Vazifa"}</strong>
                      {submission ? (
                        <Pill
                          $bg="color-mix(in srgb, var(--lesson-success) 18%, transparent)"
                          $color="var(--lesson-success)"
                        >
                          <CheckCircle2 size={12} />
                          Topshirilgan
                        </Pill>
                      ) : (
                        <Pill
                          $bg="color-mix(in srgb, var(--lesson-danger) 16%, transparent)"
                          $color="var(--lesson-danger)"
                        >
                          <XCircle size={12} />
                          Topshirilmagan
                        </Pill>
                      )}
                    </CardRow>
                    {submission ? (
                      <>
                        {submission.submittedAt ? (
                          <CardRow>
                            <span>Topshirilgan</span>
                            <Muted>{formatDateTime(submission.submittedAt)}</Muted>
                          </CardRow>
                        ) : null}
                        {submission.text ? (
                          <CardRow>
                            <span>Javob</span>
                            <Muted
                              style={{
                                flex: 1,
                                textAlign: "right",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {submission.text}
                            </Muted>
                          </CardRow>
                        ) : null}
                        <HomeworkSubmissionPreview
                          submission={submission}
                          assignmentType={assignment.type}
                        />
                        {submission.fileUrl ? (
                          <CardRow>
                            <span>{submission.fileName || "Fayl"}</span>
                            <a
                              href={submission.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "var(--lesson-primary)",
                                fontSize: 12,
                                display: "inline-flex",
                                gap: 4,
                                alignItems: "center",
                              }}
                            >
                              Yuklab olish <ExternalLink size={12} />
                            </a>
                          </CardRow>
                        ) : null}
                        {submission.link && !submission.fileUrl ? (
                          <CardRow>
                            <span>Havola</span>
                            <a
                              href={submission.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "var(--lesson-primary)",
                                fontSize: 12,
                              }}
                            >
                              {submission.link.slice(0, 60)}
                            </a>
                          </CardRow>
                        ) : null}
                        {submission.score !== undefined &&
                        submission.score !== null ? (
                          <CardRow>
                            <span>Baho</span>
                            <Muted>
                              {submission.score} / {assignment.maxScore || 100}
                            </Muted>
                          </CardRow>
                        ) : null}
                        {submission.status ? (
                          <CardRow>
                            <span>Holat</span>
                            <Muted>{submission.status}</Muted>
                          </CardRow>
                        ) : null}
                      </>
                    ) : null}
                  </Card>
                );
              })
            )}
          </Section>

          <Section>
            <SectionTitle>Testlar ({testList.length})</SectionTitle>
            {testList.length === 0 ? (
              <Muted>Bu darsda biriktirilgan test yo'q</Muted>
            ) : (
              testList.map((test) => {
                const progress = findTestProgressFor(test, userId);
                return (
                  <Card key={test._id || test.id || test.url}>
                    <CardRow>
                      <strong>{test.title || "Test"}</strong>
                      {progress ? (
                        <Pill
                          $bg="color-mix(in srgb, var(--lesson-success) 18%, transparent)"
                          $color="var(--lesson-success)"
                        >
                          {progress.score || 0}%
                        </Pill>
                      ) : (
                        <Pill
                          $bg="color-mix(in srgb, var(--lesson-danger) 16%, transparent)"
                          $color="var(--lesson-danger)"
                        >
                          Ishlamagan
                        </Pill>
                      )}
                    </CardRow>
                    {progress ? (
                      <>
                        <CardRow>
                          <span>To'g'ri</span>
                          <Muted>
                            {progress.score ?? progress.correctCount ?? 0} /{" "}
                            {progress.total ?? progress.totalQuestions ?? 0}
                          </Muted>
                        </CardRow>
                        {Number.isFinite(Number(progress.attemptsCount)) ? (
                          <CardRow>
                            <span>Urinishlar</span>
                            <Muted>{progress.attemptsCount}</Muted>
                          </CardRow>
                        ) : null}
                        {progress.completedAt ? (
                          <CardRow>
                            <span>Oxirgi urinish</span>
                            <Muted>
                              {formatDateTime(progress.completedAt)}
                            </Muted>
                          </CardRow>
                        ) : null}
                        {(() => {
                          const testId =
                            test.testId ||
                            test.resourceId ||
                            test._id ||
                            test.id;
                          const cacheKey = `${testId}:${userId}`;
                          const detail = testDetails?.[cacheKey];
                          if (detail === undefined) {
                            return (
                              <Muted style={{ display: "block", marginTop: 8 }}>
                                Yuklanmoqda...
                              </Muted>
                            );
                          }
                          if (!detail) {
                            return (
                              <Muted style={{ display: "block", marginTop: 8 }}>
                                Savol-javoblar topilmadi.
                              </Muted>
                            );
                          }
                          return (
                            <div style={{ marginTop: 10 }}>
                              <TestQuestionList detail={detail} />
                            </div>
                          );
                        })()}
                      </>
                    ) : null}
                  </Card>
                );
              })
            )}
          </Section>
        </ModalBody>
      </ModalShell>
    </ModalBackdrop>
  );
}

// ─── Main panel ──────────────────────────────────────────────────────────────

export default function MeetAttendancePanel({
  open = true,
  lessonMeet,
  onSetAttendance,
  onSetGrade,
  onSelectLesson,
  onFetchTestDetail,
  onOpenChange,
  onClose,
}) {
  const [tab, setTab] = useState("attendance");
  const [detailUserId, setDetailUserId] = useState(null);

  const selectedLessonId =
    lessonMeet?.selectedLessonId || lessonMeet?.lessonId || "";
  const courseLessons = lessonMeet?.courseLessons?.lessons || [];

  const attendanceList = useMemo(
    () => extractAttendanceList(lessonMeet?.attendance),
    [lessonMeet?.attendance],
  );
  const gradingList = useMemo(
    () => extractGradingList(lessonMeet?.grading),
    [lessonMeet?.grading],
  );
  const attendanceStats = useMemo(() => {
    const total = attendanceList.length;
    const present = attendanceList.filter((row) => row.status === "present").length;
    const late = attendanceList.filter((row) => row.status === "late").length;
    const absent = Math.max(0, total - present - late);
    const presentRate = total ? Math.round((present / total) * 100) : 0;
    return { total, present, late, absent, presentRate };
  }, [attendanceList]);
  const gradingStats = useMemo(() => {
    const total = gradingList.length;
    const scores = gradingList
      .map((row) => getRowScore(row))
      .filter((score) => score !== null);
    const graded = scores.length;
    const remaining = Math.max(0, total - graded);
    const average = graded
      ? Math.round(scores.reduce((sum, score) => sum + score, 0) / graded)
      : 0;
    return { total, graded, remaining, average };
  }, [gradingList]);
  const handleClose = () => {
    onOpenChange?.(false);
    onClose?.();
  };

  // Reset detail when switching lessons
  useEffect(() => {
    setDetailUserId(null);
  }, [selectedLessonId]);

  const detailStudent = useMemo(() => {
    if (!detailUserId) return null;
    return (
      gradingList.find((row) => String(row.userId) === String(detailUserId)) ||
      attendanceList.find((row) => String(row.userId) === String(detailUserId))
    );
  }, [detailUserId, gradingList, attendanceList]);

  const renderAttendanceStats = () => (
    <StatsGrid aria-label="Davomat statistikasi">
      <StatCard>
        <StatValue>{attendanceStats.total}</StatValue>
        <StatLabel>Jami</StatLabel>
      </StatCard>
      <StatCard $tone="success">
        <StatValue>{attendanceStats.present}</StatValue>
        <StatLabel>Bor · {attendanceStats.presentRate}%</StatLabel>
      </StatCard>
      <StatCard $tone="warning">
        <StatValue>{attendanceStats.late}</StatValue>
        <StatLabel>Kech</StatLabel>
      </StatCard>
      <StatCard $tone="danger">
        <StatValue>{attendanceStats.absent}</StatValue>
        <StatLabel>Yo'q</StatLabel>
      </StatCard>
    </StatsGrid>
  );

  const renderGradingStats = () => (
    <StatsGrid aria-label="Baholash statistikasi">
      <StatCard>
        <StatValue>{gradingStats.total}</StatValue>
        <StatLabel>Jami</StatLabel>
      </StatCard>
      <StatCard $tone="success">
        <StatValue>{gradingStats.graded}</StatValue>
        <StatLabel>Baholangan</StatLabel>
      </StatCard>
      <StatCard>
        <StatValue>{gradingStats.average}</StatValue>
        <StatLabel>O'rtacha</StatLabel>
      </StatCard>
      <StatCard $tone={gradingStats.remaining ? "warning" : "success"}>
        <StatValue>{gradingStats.remaining}</StatValue>
        <StatLabel>Qolgan</StatLabel>
      </StatCard>
    </StatsGrid>
  );

  const renderAttendanceRow = (row) => {
    const status = row.status || "absent";
    const userId = String(row.userId || row._id || "");
    const name = row.userName || row.name || "—";
    const selected = String(detailUserId || "") === userId;
    return (
      <Row
        key={userId}
        $clickable
        $selected={selected}
        onClick={(e) => {
          if (e.target.closest?.("button,input,a")) return;
          setDetailUserId(userId);
        }}
      >
        <Avatar>{getInitials(name)}</Avatar>
        <RowInfo>
          <RowName>{name}</RowName>
          <RowMeta>
            {row.source === "manual" ? "qo'lda" : "auto"} ·{" "}
            {STATUS_LABEL[status] || status}
          </RowMeta>
        </RowInfo>
        <DetailBtn
          type="button"
          $active={selected}
          onClick={(e) => {
            e.stopPropagation();
            setDetailUserId(userId);
          }}
          aria-label={`${name} tafsilotlarini ochish`}
          title="Tafsilot oynasini ochish"
        >
          <ExternalLink size={12} />
          Tafsilot
        </DetailBtn>
        <StatusButtons>
          {["present", "late", "absent"].map((variant) => (
            <StatusBtn
              key={variant}
              $variant={variant}
              $active={status === variant}
              onClick={() =>
                onSetAttendance?.(userId, variant, selectedLessonId)
              }
              type="button"
            >
              {STATUS_LABEL[variant]}
            </StatusBtn>
          ))}
        </StatusButtons>
      </Row>
    );
  };

  const renderGradingRow = (row) => {
    const userId = String(row.userId || row._id || "");
    const name = row.userName || row.name || "—";
    const selected = String(detailUserId || "") === userId;
    const score = row.oralScore ?? row.score ?? "";
    const homeworkSummary = summarizeHomeworkForUser(
      lessonMeet?.homework,
      userId,
    );
    const testSummary = summarizeTestsForUser(lessonMeet?.tests, userId);
    return (
      <Row
        key={userId}
        $clickable
        $selected={selected}
        onClick={(e) => {
          if (e.target.closest?.("button,input,a")) return;
          setDetailUserId(userId);
        }}
      >
        <Avatar>{getInitials(name)}</Avatar>
        <RowInfo>
          <RowName>{name}</RowName>
          <RowMeta>
            {homeworkSummary ? (
              <Pill
                $bg={
                  homeworkSummary.submitted === homeworkSummary.total
                    ? "color-mix(in srgb, var(--lesson-success) 18%, transparent)"
                    : "color-mix(in srgb, var(--lesson-warning) 18%, transparent)"
                }
                $color={
                  homeworkSummary.submitted === homeworkSummary.total
                    ? "var(--lesson-success)"
                    : "var(--lesson-warning)"
                }
              >
                Vazifa {homeworkSummary.submitted}/{homeworkSummary.total}
              </Pill>
            ) : null}
            {testSummary ? (
              <Pill
                $bg={
                  testSummary.taken === testSummary.total
                    ? "color-mix(in srgb, var(--lesson-success) 18%, transparent)"
                    : "color-mix(in srgb, var(--lesson-text) 6%, transparent)"
                }
                $color={
                  testSummary.taken === testSummary.total
                    ? "var(--lesson-success)"
                    : "var(--lesson-muted)"
                }
              >
                Test {testSummary.correctCount}/{testSummary.totalQuestions}
              </Pill>
            ) : null}
          </RowMeta>
        </RowInfo>
        <DetailBtn
          type="button"
          $active={selected}
          onClick={(e) => {
            e.stopPropagation();
            setDetailUserId(userId);
          }}
          aria-label={`${name} tafsilotlarini ochish`}
          title="Tafsilot oynasini ochish"
        >
          <ExternalLink size={12} />
          Tafsilot
        </DetailBtn>
        <ScoreInput
          type="number"
          min="0"
          max="100"
          defaultValue={score === null || score === undefined ? "" : score}
          onClick={(e) => e.stopPropagation()}
          onBlur={(e) => {
            const raw = e.target.value.trim();
            const next =
              raw === "" ? null : Math.max(0, Math.min(100, Number(raw)));
            const prev = score === "" || score === null ? null : Number(score);
            if (next !== prev) {
              onSetGrade?.(userId, { score: next, lessonId: selectedLessonId });
            }
          }}
          placeholder="—"
        />
      </Row>
    );
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <Panel>
        <Header>
          <HeaderTitle>
            {tab === "attendance" ? (
              <ClipboardList size={16} />
            ) : (
              <GraduationCap size={16} />
            )}
            <span>Dars boshqaruvi</span>
          </HeaderTitle>
          {onOpenChange || onClose ? (
            <CloseBtn type="button" onClick={handleClose} aria-label="Yopish">
              <X size={16} />
            </CloseBtn>
          ) : null}
        </Header>
        {courseLessons.length > 1 ? (
          <LessonTabs>
            {courseLessons.map((l) => (
              <LessonTab
                key={l.lessonId}
                type="button"
                $active={String(l.lessonId) === String(selectedLessonId)}
                onClick={() => onSelectLesson?.(l.lessonId)}
                title={l.title}
              >
                {l.title || "—"}
              </LessonTab>
            ))}
          </LessonTabs>
        ) : null}
        <Tabs>
          <TabButton
            type="button"
            $active={tab === "attendance"}
            onClick={() => setTab("attendance")}
          >
            Davomat
          </TabButton>
          <TabButton
            type="button"
            $active={tab === "grading"}
            onClick={() => setTab("grading")}
          >
            Baholash
          </TabButton>
        </Tabs>
        <Body>
          {tab === "attendance" ? (
            <>
              {renderAttendanceStats()}
              {attendanceList.length ? (
                attendanceList.map(renderAttendanceRow)
              ) : (
                <Empty>Hozircha qatnashchi yo'q</Empty>
              )}
            </>
          ) : (
            <>
              {renderGradingStats()}
              {gradingList.length ? (
                gradingList.map(renderGradingRow)
              ) : (
                <Empty>Hozircha baholanadigan a'zo yo'q</Empty>
              )}
            </>
          )}
        </Body>
      </Panel>
      {detailStudent ? (
        <StudentDetailModal
          student={detailStudent}
          homework={lessonMeet?.homework}
          tests={lessonMeet?.tests}
          attendance={lessonMeet?.attendance}
          testDetails={lessonMeet?.testDetails}
          onFetchTestDetail={onFetchTestDetail}
          onClose={() => setDetailUserId(null)}
        />
      ) : null}
    </>
  );
}
