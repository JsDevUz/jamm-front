import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { ClipboardList, GraduationCap, X } from "lucide-react";
import { Sheet, SheetContent } from "../../../components/ui/sheet";

const Panel = styled.div`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  color: var(--meet-text-color);
  background: transparent;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--meet-border-color);
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: var(--meet-text-color);
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--meet-border-color);
`;

const TabButton = styled.button`
  flex: 1;
  min-height: 40px;
  padding: 8px 10px;
  border-radius: 14px;
  border: 1px solid ${(p) => (p.$active ? "#8ab4f8" : "var(--meet-border-color)")};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  background: ${(p) =>
    p.$active ? "var(--meet-control-active-bg)" : "var(--meet-control-bg)"};
  color: ${(p) =>
    p.$active ? "var(--meet-text-color)" : "var(--meet-text-muted-color)"};
  transition: background 0.15s;
  &:hover {
    background: var(--meet-control-hover-bg);
  }
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--meet-border-color);
  border-radius: 16px;
  background: var(--meet-control-bg);
  margin-bottom: 10px;
  &:hover {
    background: var(--meet-control-hover-bg);
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--meet-control-active-bg);
  color: var(--meet-text-color);
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
  color: var(--meet-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RowMeta = styled.div`
  font-size: 11px;
  color: var(--meet-text-muted-color);
`;

const StatusButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const StatusBtn = styled.button`
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid
    ${(p) =>
      p.$active
        ? "transparent"
        : p.$variant === "present"
          ? "rgba(34, 197, 94, 0.22)"
          : p.$variant === "late"
            ? "rgba(234, 179, 8, 0.22)"
            : "rgba(239, 68, 68, 0.22)"};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  background: ${(p) =>
    p.$active
      ? p.$variant === "present"
        ? "#22c55e"
        : p.$variant === "late"
          ? "#eab308"
          : "#ef4444"
      : "var(--meet-shell-bg)"};
  color: ${(p) => (p.$active ? "#0a0a0a" : "var(--meet-text-muted-color)")};
  transition: all 0.15s;
  &:hover {
    background: ${(p) =>
      p.$active
        ? undefined
        : p.$variant === "present"
          ? "rgba(34, 197, 94, 0.2)"
          : p.$variant === "late"
            ? "rgba(234, 179, 8, 0.2)"
            : "rgba(239, 68, 68, 0.2)"};
  }
`;

const ScoreInput = styled.input`
  width: 56px;
  padding: 4px 6px;
  border-radius: 6px;
  border: 1px solid var(--meet-border-color);
  background: var(--meet-shell-bg);
  color: var(--meet-text-color);
  font-size: 13px;
  text-align: center;
  outline: none;
  &:focus {
    border-color: #8ab4f8;
  }
`;

const CloseBtn = styled.button`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 1px solid var(--meet-border-color);
  background: var(--meet-control-bg);
  color: var(--meet-text-color);
  cursor: pointer;
  &:hover {
    background: var(--meet-control-hover-bg);
  }
`;

const Empty = styled.div`
  padding: 24px 12px;
  text-align: center;
  color: var(--meet-text-muted-color);
  font-size: 13px;
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

export default function MeetAttendancePanel({
  open = true,
  onOpenChange,
  lessonMeet,
  onSetAttendance,
  onSetGrade,
  onClose,
}) {
  const [tab, setTab] = useState("attendance");
  const attendanceList = useMemo(
    () => extractAttendanceList(lessonMeet?.attendance),
    [lessonMeet?.attendance],
  );
  const gradingList = useMemo(
    () => extractGradingList(lessonMeet?.grading),
    [lessonMeet?.grading],
  );

  const renderAttendanceRow = (row) => {
    const status = row.status || "absent";
    const userId = String(row.userId || row._id || "");
    return (
      <Row key={userId}>
        <Avatar>{getInitials(row.userName || row.name)}</Avatar>
        <RowInfo>
          <RowName>{row.userName || row.name || "—"}</RowName>
          <RowMeta>
            {row.source === "manual" ? "qo'lda" : "auto"} ·{" "}
            {STATUS_LABEL[status] || status}
          </RowMeta>
        </RowInfo>
        <StatusButtons>
          {["present", "late", "absent"].map((variant) => (
            <StatusBtn
              key={variant}
              $variant={variant}
              $active={status === variant}
              onClick={() => onSetAttendance?.(userId, variant)}
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
    const score = row.oralScore ?? row.score ?? "";
    return (
      <Row key={userId}>
        <Avatar>{getInitials(row.userName || row.name)}</Avatar>
        <RowInfo>
          <RowName>{row.userName || row.name || "—"}</RowName>
          <RowMeta>Og'zaki baho (0-100)</RowMeta>
        </RowInfo>
        <ScoreInput
          type="number"
          min="0"
          max="100"
          defaultValue={score === null || score === undefined ? "" : score}
          onBlur={(e) => {
            const raw = e.target.value.trim();
            const next = raw === "" ? null : Math.max(0, Math.min(100, Number(raw)));
            const prev = score === "" || score === null ? null : Number(score);
            if (next !== prev) {
              onSetGrade?.(userId, { score: next });
            }
          }}
          placeholder="—"
        />
      </Row>
    );
  };

  const handleClose = () => {
    onOpenChange?.(false);
    onClose?.();
  };

  const content = (
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
        <CloseBtn type="button" onClick={handleClose} aria-label="Yopish">
          <X size={16} />
        </CloseBtn>
      </Header>
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
          attendanceList.length ? (
            attendanceList.map(renderAttendanceRow)
          ) : (
            <Empty>Hozircha qatnashchi yo'q</Empty>
          )
        ) : gradingList.length ? (
          gradingList.map(renderGradingRow)
        ) : (
          <Empty>Hozircha baholanadigan a'zo yo'q</Empty>
        )}
      </Body>
    </Panel>
  );

  if (onOpenChange) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent>{content}</SheetContent>
      </Sheet>
    );
  }

  return content;
}
