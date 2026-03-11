import styled from "styled-components";

export const AttendanceSection = styled.div`
  padding: 18px 24px 24px;
  border-top: 0;
`;

export const AttendanceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
`;

export const AttendanceTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);
`;

export const AttendanceMuted = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
`;

export const SummaryCard = styled.div`
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
`;

export const SummaryLabel = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const SummaryValue = styled.div`
  margin-top: 4px;
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
`;

export const AttendanceTable = styled.div`
  display: grid;
  gap: 8px;
`;

export const AttendanceRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) auto auto;
  gap: 10px;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const AttendanceUser = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AttendanceAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--tertiary-color);
  color: white;
  font-size: 12px;
  font-weight: 700;
`;

export const AttendanceAvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AttendanceUserMeta = styled.div`
  min-width: 0;
`;

export const AttendanceUserName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`;

export const AttendanceSubMeta = styled.div`
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-muted-color);
`;

export const AttendanceStatusBadge = styled.div`
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  color: ${(props) =>
    props.$status === "present"
      ? "var(--success-color)"
      : props.$status === "late"
        ? "var(--warning-color)"
        : "var(--danger-color)"};
  background: ${(props) =>
    props.$status === "present"
      ? "color-mix(in srgb, var(--success-color) 12%, transparent)"
      : props.$status === "late"
        ? "color-mix(in srgb, var(--warning-color) 12%, transparent)"
        : "color-mix(in srgb, var(--danger-color) 12%, transparent)"};
`;

export const AttendanceActions = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const AttendanceActionButton = styled.button`
  padding: 7px 10px;
  border: 1px solid
    ${(props) =>
      props.$active
        ? props.$status === "present"
          ? "var(--success-color)"
          : props.$status === "late"
            ? "var(--warning-color)"
            : "var(--danger-color)"
        : "var(--border-color)"};
  border-radius: 999px;
  white-space: nowrap;
  background: ${(props) =>
    props.$active
      ? props.$status === "present"
        ? "color-mix(in srgb, var(--success-color) 12%, transparent)"
        : props.$status === "late"
          ? "color-mix(in srgb, var(--warning-color) 12%, transparent)"
          : "color-mix(in srgb, var(--danger-color) 12%, transparent)"
      : "var(--secondary-color)"};
  color: ${(props) =>
    props.$active
      ? props.$status === "present"
        ? "var(--success-color)"
        : props.$status === "late"
          ? "var(--warning-color)"
          : "var(--danger-color)"
      : "var(--text-secondary-color)"};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

export const SelfAttendanceCard = styled.div`
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--input-color);
  display: grid;
  gap: 10px;
`;

export const EmptyAttendance = styled.div`
  padding: 14px;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
  text-align: center;
`;
