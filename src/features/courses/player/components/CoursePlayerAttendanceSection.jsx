import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCourses } from "../../../../contexts/CoursesContext";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonRow,
} from "../../../../shared/ui/feedback/Skeleton";
import {
  AttendanceActionButton,
  AttendanceActions,
  AttendanceAvatar,
  AttendanceAvatarImage,
  AttendanceHeader,
  AttendanceMuted,
  AttendanceRow,
  AttendanceSection,
  AttendanceStatusBadge,
  AttendanceSubMeta,
  AttendanceTable,
  AttendanceTitle,
  AttendanceUser,
  AttendanceUserMeta,
  AttendanceUserName,
  EmptyAttendance,
  SelfAttendanceCard,
  SummaryCard,
  SummaryGrid,
  SummaryLabel,
  SummaryValue,
} from "./CoursePlayerAttendanceSection.styles";

const getInitial = (value) => (value || "?").charAt(0).toUpperCase();
const hasAvatarImage = (value) =>
  typeof value === "string" &&
  /^(https?:\/\/|\/)/i.test(value.trim());

const CoursePlayerAttendanceSection = () => {
  const { t } = useTranslation();
  const { getLessonAttendance, setLessonAttendanceStatus } = useCourses();
  const { admin, courseId, currentLessonData } = useCoursePlayerContext();
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const lessonId =
    currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;

  useEffect(() => {
    if (!courseId || !lessonId) return;

    let cancelled = false;
    const loadAttendance = async () => {
      try {
        setLoading(true);
        const data = await getLessonAttendance(courseId, lessonId);
        if (!cancelled) {
          setAttendanceData(data);
        }
      } catch (error) {
        if (!cancelled) {
          setAttendanceData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadAttendance();
    return () => {
      cancelled = true;
    };
  }, [courseId, getLessonAttendance, lessonId]);

  const summary = useMemo(() => {
    if (admin) {
      return (
        attendanceData?.summary || {
          present: 0,
          late: 0,
          absent: 0,
        }
      );
    }

    const selfStatus = attendanceData?.self?.status;
    return {
      present: selfStatus === "present" ? 1 : 0,
      late: selfStatus === "late" ? 1 : 0,
      absent: !selfStatus || selfStatus === "absent" ? 1 : 0,
    };
  }, [admin, attendanceData]);

  const handleAdminStatusChange = async (userId, status) => {
    try {
      const next = await setLessonAttendanceStatus(courseId, lessonId, userId, status);
      setAttendanceData(next);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AttendanceSection>
      <AttendanceHeader>
        <AttendanceTitle>{t("coursePlayer.attendance.title")}</AttendanceTitle>
        <AttendanceMuted>
          {loading
            ? t("common.loading")
            : admin
              ? t("coursePlayer.attendance.adminHint")
              : t("coursePlayer.attendance.studentHint")}
        </AttendanceMuted>
      </AttendanceHeader>

      {loading ? (
        <>
          <SummaryGrid>
            {[0, 1, 2].map((item) => (
              <SummaryCard key={item}>
                <Skeleton width="55%" height="12px" borderRadius="8px" />
                <Skeleton width="38%" height="20px" borderRadius="8px" mb="0" />
              </SummaryCard>
            ))}
          </SummaryGrid>
          <AttendanceTable>
            {[0, 1, 2].map((item) => (
              <AttendanceRow key={item}>
                <SkeletonRow gap="10px" mb="0">
                  <SkeletonCircle size="34px" />
                  <div>
                    <Skeleton width="42%" height="13px" borderRadius="8px" />
                    <Skeleton width="26%" height="11px" borderRadius="8px" mb="0" />
                  </div>
                </SkeletonRow>
                <Skeleton width="76px" height="26px" borderRadius="999px" mb="0" />
                <SkeletonRow gap="6px" mb="0">
                  <Skeleton width="74px" height="30px" borderRadius="8px" mb="0" />
                  <Skeleton width="74px" height="30px" borderRadius="8px" mb="0" />
                  <Skeleton width="74px" height="30px" borderRadius="8px" mb="0" />
                </SkeletonRow>
              </AttendanceRow>
            ))}
          </AttendanceTable>
        </>
      ) : (
        <SummaryGrid>
          <SummaryCard>
            <SummaryLabel>{t("coursePlayer.attendance.present")}</SummaryLabel>
            <SummaryValue>{summary.present || 0}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>{t("coursePlayer.attendance.late")}</SummaryLabel>
            <SummaryValue>{summary.late || 0}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>{t("coursePlayer.attendance.absent")}</SummaryLabel>
            <SummaryValue>{summary.absent || 0}</SummaryValue>
          </SummaryCard>
        </SummaryGrid>
      )}

      {!loading && admin ? (
        attendanceData?.members?.length ? (
          <AttendanceTable>
            {attendanceData.members.map((member) => (
              <AttendanceRow key={String(member.userId)}>
                <AttendanceUser>
                  <AttendanceAvatar>
                    {hasAvatarImage(member.userAvatar) ? (
                      <AttendanceAvatarImage
                        src={member.userAvatar}
                        alt={member.userName}
                      />
                    ) : (
                      getInitial(member.userName)
                    )}
                  </AttendanceAvatar>
                  <AttendanceUserMeta>
                    <AttendanceUserName>{member.userName}</AttendanceUserName>
                    <AttendanceSubMeta>
                      {t("coursePlayer.attendance.progress", {
                        percent: Math.round(member.progressPercent || 0),
                      })}
                    </AttendanceSubMeta>
                  </AttendanceUserMeta>
                </AttendanceUser>

                <AttendanceStatusBadge $status={member.status}>
                  {t(`coursePlayer.attendance.status.${member.status}`)}
                </AttendanceStatusBadge>

                <AttendanceActions>
                  {["present", "late", "absent"].map((status) => (
                    <AttendanceActionButton
                      key={status}
                      type="button"
                      $status={status}
                      $active={member.status === status}
                      onClick={() =>
                        handleAdminStatusChange(String(member.userId), status)
                      }
                    >
                      {t(`coursePlayer.attendance.status.${status}`)}
                    </AttendanceActionButton>
                  ))}
                </AttendanceActions>
              </AttendanceRow>
            ))}
          </AttendanceTable>
        ) : (
          <EmptyAttendance>{t("coursePlayer.attendance.empty")}</EmptyAttendance>
        )
      ) : !loading && attendanceData?.self ? (
        <SelfAttendanceCard>
          <AttendanceStatusBadge $status={attendanceData.self.status}>
            {t(`coursePlayer.attendance.status.${attendanceData.self.status}`)}
          </AttendanceStatusBadge>
          <AttendanceMuted>
            {t("coursePlayer.attendance.progress", {
              percent: Math.round(attendanceData.self.progressPercent || 0),
            })}
          </AttendanceMuted>
        </SelfAttendanceCard>
      ) : !loading ? (
        <EmptyAttendance>{t("coursePlayer.attendance.noRecord")}</EmptyAttendance>
      ) : null}
    </AttendanceSection>
  );
};

export default CoursePlayerAttendanceSection;
