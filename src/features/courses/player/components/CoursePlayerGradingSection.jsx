import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useCourses } from "../../../../contexts/CoursesContext";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import {
  Skeleton,
  SkeletonCircle,
} from "../../../../shared/ui/feedback/Skeleton";
import {
  ActionCell,
  Avatar,
  AvatarImage,
  CompactTable,
  EmptyState,
  GradingCard,
  GradingHeader,
  GradingMuted,
  GradingSection,
  GradingSectionTitle,
  GradingTitle,
  InlineField,
  InlineMuted,
  InlineSummary,
  InlineStack,
  InlineTextarea,
  MobileLabel,
  StatusBadge,
  SummaryBox,
  SummaryGrid,
  SummaryLabel,
  SummaryValue,
  TableHeader,
  TableRow,
  TinyButton,
  UserCell,
  UserMeta,
  UserName,
  UserSubMeta,
  ValueCell,
} from "./CoursePlayerGradingSection.styles";
import { Edit2 } from "lucide-react";

const getInitial = (value) => (value || "?").charAt(0).toUpperCase();
const hasAvatarImage = (value) =>
  typeof value === "string" &&
  /^(https?:\/\/|\/)/i.test(value.trim());

const CoursePlayerGradingSection = () => {
  const { t } = useTranslation();
  const { getLessonGrading, setLessonOralAssessment } = useCourses();
  const { admin, courseId, currentLessonData } = useCoursePlayerContext();
  const lessonId =
    currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;
  const [gradingData, setGradingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oralScores, setOralScores] = useState({});
  const [oralNotes, setOralNotes] = useState({});
  const [editingOral, setEditingOral] = useState({});

  useEffect(() => {
    if (!courseId || !lessonId) return;

    let cancelled = false;
    const loadGrading = async () => {
      try {
        setLoading(true);
        const data = await getLessonGrading(courseId, lessonId);
        if (!cancelled) {
          setGradingData(data);
        }
      } catch (error) {
        if (!cancelled) {
          setGradingData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadGrading();
    return () => {
      cancelled = true;
    };
  }, [courseId, getLessonGrading, lessonId]);

  const lessonSummary = gradingData?.lesson?.summary;
  const overview = gradingData?.overview;
  const lessonRows = gradingData?.lesson?.students || [];
  const selfLesson = gradingData?.lesson?.self || null;
  const selfOverall = gradingData?.overview?.self || null;

  const overviewRows = useMemo(
    () => gradingData?.overview?.students || [],
    [gradingData],
  );

  const handleSaveOralAssessment = async (userId) => {
    try {
      const data = await setLessonOralAssessment(courseId, lessonId, userId, {
        score:
          oralScores[userId] === "" || oralScores[userId] === undefined
            ? null
            : Number(oralScores[userId]),
        note: oralNotes[userId] || "",
      });
      setGradingData(data);
      setEditingOral((prev) => ({ ...prev, [userId]: false }));
      toast.success(t("coursePlayer.grading.oralSaved"));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || t("coursePlayer.grading.oralSaveError"),
      );
    }
  };

  return (
    <GradingSection>
      <GradingHeader>
        <GradingTitle>{t("coursePlayer.grading.title")}</GradingTitle>
        <GradingMuted>
          {loading
            ? t("common.loading")
            : admin
              ? t("coursePlayer.grading.adminHint")
              : t("coursePlayer.grading.studentHint")}
        </GradingMuted>
      </GradingHeader>

      {loading ? (
        <>
          <GradingCard>
            <Skeleton width="28%" height="14px" borderRadius="8px" />
            <SummaryGrid>
              {[0, 1, 2, 3].map((item) => (
                <SummaryBox key={item}>
                  <Skeleton width="60%" height="12px" borderRadius="8px" />
                  <Skeleton width="36%" height="20px" borderRadius="8px" mb="0" />
                </SummaryBox>
              ))}
            </SummaryGrid>
            <CompactTable>
              {[0, 1, 2].map((item) => (
                <TableRow key={item} $columns={7}>
                  <UserCell>
                    <SkeletonCircle size="34px" />
                    <div>
                      <Skeleton width="88px" height="13px" borderRadius="8px" />
                      <Skeleton width="64px" height="11px" borderRadius="8px" mb="0" />
                    </div>
                  </UserCell>
                  <Skeleton width="70px" height="12px" borderRadius="8px" mb="0" />
                  <Skeleton width="70px" height="12px" borderRadius="8px" mb="0" />
                  <Skeleton width="90px" height="36px" borderRadius="10px" mb="0" />
                  <Skeleton width="50px" height="12px" borderRadius="8px" mb="0" />
                  <Skeleton width="74px" height="26px" borderRadius="999px" mb="0" />
                  <Skeleton width="34px" height="34px" borderRadius="10px" mb="0" />
                </TableRow>
              ))}
            </CompactTable>
          </GradingCard>
          <GradingCard>
            <Skeleton width="32%" height="14px" borderRadius="8px" />
            <SummaryGrid>
              {[0, 1, 2, 3].map((item) => (
                <SummaryBox key={item}>
                  <Skeleton width="60%" height="12px" borderRadius="8px" />
                  <Skeleton width="36%" height="20px" borderRadius="8px" mb="0" />
                </SummaryBox>
              ))}
            </SummaryGrid>
          </GradingCard>
        </>
      ) : admin ? (
        <>
          <GradingCard>
            <GradingSectionTitle>
              {t("coursePlayer.grading.lessonSection")}
            </GradingSectionTitle>
            <SummaryGrid>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.averageScore")}</SummaryLabel>
                <SummaryValue>{lessonSummary?.averageScore || 0}%</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.excellent")}</SummaryLabel>
                <SummaryValue>{lessonSummary?.excellentCount || 0}</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.homeworkDone")}</SummaryLabel>
                <SummaryValue>{lessonSummary?.completedHomeworkCount || 0}</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.attendanceMarked")}</SummaryLabel>
                <SummaryValue>{lessonSummary?.attendanceMarkedCount || 0}</SummaryValue>
              </SummaryBox>
            </SummaryGrid>
            {lessonRows.length ? (
              <CompactTable>
                <TableHeader $columns={7}>
                  <div>{t("coursePlayer.grading.student")}</div>
                  <div>{t("coursePlayer.grading.attendance")}</div>
                  <div>{t("coursePlayer.grading.homework")}</div>
                  <div>{t("coursePlayer.grading.oral")}</div>
                  <div>{t("coursePlayer.grading.score")}</div>
                  <div>{t("coursePlayer.grading.status")}</div>
                  <div>{t("common.actions")}</div>
                </TableHeader>
                {lessonRows.map((row) => (
                  <TableRow key={String(row.userId)} $columns={7}>
                    <UserCell>
                      <Avatar>
                        {hasAvatarImage(row.userAvatar) ? (
                          <AvatarImage src={row.userAvatar} alt={row.userName} />
                        ) : (
                          getInitial(row.userName)
                        )}
                      </Avatar>
                      <UserMeta>
                        <UserName>{row.userName}</UserName>
                        <UserSubMeta>
                          {t("coursePlayer.grading.progressValue", {
                            percent: Math.round(row.attendanceProgress || 0),
                          })}
                        </UserSubMeta>
                      </UserMeta>
                    </UserCell>
                    <ValueCell>
                      <MobileLabel>{t("coursePlayer.grading.attendance")}</MobileLabel>
                      {t(`coursePlayer.attendance.status.${row.attendanceStatus}`)}
                    </ValueCell>
                    <ValueCell>
                      <MobileLabel>{t("coursePlayer.grading.homework")}</MobileLabel>
                      {row.homeworkEnabled
                        ? t(`coursePlayer.grading.homeworkState.${row.homeworkStatus}`)
                        : t("coursePlayer.grading.notEnabled")}
                    </ValueCell>
                    <ValueCell>
                      <MobileLabel>{t("coursePlayer.grading.oral")}</MobileLabel>
                      {!editingOral[row.userId] &&
                      (row.oralUpdatedAt ||
                        row.oralScore !== null ||
                        row.oralScore !== undefined ||
                        row.oralNote) ? (
                        <InlineStack>
                          <InlineSummary>{row.oralScore ?? "-"}</InlineSummary>
                          {row.oralNote ? <InlineMuted>{row.oralNote}</InlineMuted> : null}
                        </InlineStack>
                      ) : (
                        <InlineStack>
                          <InlineField
                            type="number"
                            min="0"
                            max="100"
                            value={oralScores[row.userId] ?? row.oralScore ?? ""}
                            placeholder={t("coursePlayer.grading.oralScore")}
                            onChange={(event) =>
                              setOralScores((prev) => ({
                                ...prev,
                                [row.userId]: event.target.value,
                              }))
                            }
                          />
                          <InlineTextarea
                            value={oralNotes[row.userId] ?? row.oralNote ?? ""}
                            placeholder={t("coursePlayer.grading.oralNote")}
                            onChange={(event) =>
                              setOralNotes((prev) => ({
                                ...prev,
                                [row.userId]: event.target.value,
                              }))
                            }
                          />
                        </InlineStack>
                      )}
                    </ValueCell>
                    <ValueCell>
                      <MobileLabel>{t("coursePlayer.grading.score")}</MobileLabel>
                      {row.lessonScore}%
                    </ValueCell>
                    <StatusBadge $status={row.performance}>
                      {t(`coursePlayer.grading.performance.${row.performance}`)}
                    </StatusBadge>
                    <ActionCell>
                      {!editingOral[row.userId] &&
                      (row.oralUpdatedAt ||
                        row.oralScore !== null ||
                        row.oralScore !== undefined ||
                        row.oralNote) ? (
                        <TinyButton
                          type="button"
                          onClick={() =>
                            setEditingOral((prev) => ({ ...prev, [row.userId]: true }))
                          }
                        >
                          <Edit2 size={12} />
                        </TinyButton>
                      ) : editingOral[row.userId] ? (
                        <TinyButton
                          type="button"
                          onClick={() => handleSaveOralAssessment(String(row.userId))}
                        >
                          {t("common.save")}
                        </TinyButton>
                      ) : null}
                    </ActionCell>
                  </TableRow>
                ))}
              </CompactTable>
            ) : (
              <EmptyState>{t("coursePlayer.grading.empty")}</EmptyState>
            )}
          </GradingCard>

          <GradingCard>
            <GradingSectionTitle>
              {t("coursePlayer.grading.courseSection")}
            </GradingSectionTitle>
            <SummaryGrid>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.totalStudents")}</SummaryLabel>
                <SummaryValue>{overview?.totalStudents || 0}</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.totalLessons")}</SummaryLabel>
                <SummaryValue>{overview?.totalLessons || 0}</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.averageScore")}</SummaryLabel>
                <SummaryValue>{overview?.averageScore || 0}%</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.needAttention")}</SummaryLabel>
                <SummaryValue>{overview?.attentionCount || 0}</SummaryValue>
              </SummaryBox>
            </SummaryGrid>
            {overviewRows.length ? (
              <CompactTable>
                <TableHeader>
                  <div>{t("coursePlayer.grading.student")}</div>
                  <div>{t("coursePlayer.grading.attendanceRate")}</div>
                  <div>{t("coursePlayer.grading.homeworkDone")}</div>
                  <div>{t("coursePlayer.grading.oral")}</div>
                  <div>{t("coursePlayer.grading.score")}</div>
                  <div>{t("coursePlayer.grading.status")}</div>
                </TableHeader>
                {overviewRows.map((row) => (
                  <TableRow key={String(row.userId)}>
                    <UserCell>
                      <Avatar>
                        {hasAvatarImage(row.userAvatar) ? (
                          <AvatarImage src={row.userAvatar} alt={row.userName} />
                        ) : (
                          getInitial(row.userName)
                        )}
                      </Avatar>
                      <UserMeta>
                        <UserName>{row.userName}</UserName>
                        <UserSubMeta>
                          {t("coursePlayer.grading.presentValue", {
                            present: row.presentCount || 0,
                            total: row.totalLessons || 0,
                          })}
                        </UserSubMeta>
                      </UserMeta>
                    </UserCell>
                    <ValueCell>
                      <MobileLabel>{t("coursePlayer.grading.attendanceRate")}</MobileLabel>
                      {row.attendanceRate || 0}%
                    </ValueCell>
                    <ValueCell>
                      <MobileLabel>{t("coursePlayer.grading.homeworkDone")}</MobileLabel>
                      {row.homeworkCompleted || 0}/{row.totalLessons || 0}
                    </ValueCell>
                    <ValueCell>
                      <MobileLabel>{t("coursePlayer.grading.oral")}</MobileLabel>
                      {row.oralAverage ?? "-"}
                    </ValueCell>
                    <ValueCell>
                      <MobileLabel>{t("coursePlayer.grading.score")}</MobileLabel>
                      {row.averageScore || 0}%
                    </ValueCell>
                    <StatusBadge $status={row.performance}>
                      {t(`coursePlayer.grading.performance.${row.performance}`)}
                    </StatusBadge>
                  </TableRow>
                ))}
              </CompactTable>
            ) : (
              <EmptyState>{t("coursePlayer.grading.empty")}</EmptyState>
            )}
          </GradingCard>
        </>
      ) : selfLesson && selfOverall ? (
        <>
          <GradingCard>
            <GradingSectionTitle>
              {t("coursePlayer.grading.lessonSection")}
            </GradingSectionTitle>
            <SummaryGrid>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.score")}</SummaryLabel>
                <SummaryValue>{selfLesson.lessonScore || 0}%</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.attendance")}</SummaryLabel>
                <SummaryValue>
                  {t(`coursePlayer.attendance.status.${selfLesson.attendanceStatus}`)}
                </SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.homework")}</SummaryLabel>
                <SummaryValue>
                  {selfLesson.homeworkEnabled
                    ? t(
                        `coursePlayer.grading.homeworkState.${selfLesson.homeworkStatus}`,
                      )
                    : t("coursePlayer.grading.notEnabled")}
                </SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.oral")}</SummaryLabel>
                <SummaryValue>{selfLesson.oralScore ?? "-"}</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.status")}</SummaryLabel>
                <StatusBadge $status={selfLesson.performance}>
                  {t(`coursePlayer.grading.performance.${selfLesson.performance}`)}
                </StatusBadge>
              </SummaryBox>
            </SummaryGrid>
          </GradingCard>

          <GradingCard>
            <GradingSectionTitle>
              {t("coursePlayer.grading.courseSection")}
            </GradingSectionTitle>
            <SummaryGrid>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.averageScore")}</SummaryLabel>
                <SummaryValue>{selfOverall.averageScore || 0}%</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.attendanceRate")}</SummaryLabel>
                <SummaryValue>{selfOverall.attendanceRate || 0}%</SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.homeworkDone")}</SummaryLabel>
                <SummaryValue>
                  {selfOverall.homeworkCompleted || 0}/{selfOverall.totalLessons || 0}
                </SummaryValue>
              </SummaryBox>
              <SummaryBox>
                <SummaryLabel>{t("coursePlayer.grading.status")}</SummaryLabel>
                <StatusBadge $status={selfOverall.performance}>
                  {t(`coursePlayer.grading.performance.${selfOverall.performance}`)}
                </StatusBadge>
              </SummaryBox>
            </SummaryGrid>
          </GradingCard>
        </>
      ) : (
        <EmptyState>{t("coursePlayer.grading.empty")}</EmptyState>
      )}
    </GradingSection>
  );
};

export default CoursePlayerGradingSection;
