import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useCourses } from "../../../../contexts/CoursesContext";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import CoursePlayerAttendanceSection from "./CoursePlayerAttendanceSection";
import CoursePlayerGradingSection from "./CoursePlayerGradingSection";
import CoursePlayerHomeworkSection from "./CoursePlayerHomeworkSection";
import CoursePlayerLessonTestsSection from "./CoursePlayerLessonTestsSection";
import {
  EmptyState,
  MemberActions,
  MemberMeta,
  MemberName,
  MembersSection,
  MemberRow,
  MemberSub,
  MemberTable,
  MiniBadge,
  MobileLessonStrip,
  PaneContent,
  PaneGhostButton,
  PaneLessonButton,
  PaneLessonList,
  PaneLessonMeta,
  PaneLessonTitle,
  PaneMain,
  PaneMuted,
  PaneOverlay,
  PanePrimaryButton,
  PaneShell,
  PaneSummary,
  PaneTabButton,
  PaneTabs,
  PaneTitle,
  PaneTopActions,
  PaneTopBar,
  SectionTitle,
  SummaryCard,
  SummaryLabel,
  SummaryValue,
  TinyAction,
} from "./CoursePlayerAdminPane.styles";

const CoursePlayerAdminPane = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { approveUser, removeUser } = useCourses();
  const {
    course,
    courseId,
    currentLessonData,
    handleLessonClick,
    handlePublishLesson,
  } = useCoursePlayerContext();
  const [activeTab, setActiveTab] = useState("homework");

  const approvedMembers = useMemo(
    () => (course?.members || []).filter((member) => member.status === "approved"),
    [course],
  );
  const pendingMembers = useMemo(
    () => (course?.members || []).filter((member) => member.status === "pending"),
    [course],
  );
  const lessons = course?.lessons || [];
  const selectedLessonId =
    currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;

  if (!isOpen || !course) return null;

  const draftCount = lessons.filter(
    (lesson) => (lesson.status || "published") === "draft",
  ).length;
  const publishedCount = lessons.length - draftCount;
  const selectedHasMedia = Boolean(
    (Array.isArray(currentLessonData?.mediaItems) &&
      currentLessonData.mediaItems.length) ||
      currentLessonData?.videoUrl ||
      currentLessonData?.fileUrl,
  );

  const renderLessonButtons = () =>
    lessons.map((lesson, index) => {
      const lessonId = lesson._id || lesson.id || lesson.urlSlug;
      return (
        <PaneLessonButton
          key={String(lessonId)}
          type="button"
          $active={String(lessonId) === String(selectedLessonId)}
          onClick={() => handleLessonClick(index)}
        >
          <PaneLessonTitle>{lesson.title}</PaneLessonTitle>
          <PaneLessonMeta>
            <span>
              {t("coursePlayer.adminPane.lessonNumber", {
                index: index + 1,
              })}
            </span>
            <MiniBadge $draft={(lesson.status || "published") === "draft"}>
              {(lesson.status || "published") === "draft"
                ? t("coursePlayer.playlist.draft")
                : t("coursePlayer.adminPane.published")}
            </MiniBadge>
          </PaneLessonMeta>
        </PaneLessonButton>
      );
    });

  return (
    <PaneOverlay onClick={onClose}>
      <PaneShell onClick={(event) => event.stopPropagation()}>
        <PaneMain>
          <PaneTopBar>
            <div>
              <PaneTitle>{currentLessonData?.title || course.name}</PaneTitle>
              <PaneMuted>{t("coursePlayer.adminPane.currentLesson")}</PaneMuted>
            </div>
            <PaneTopActions>
              {currentLessonData ? (
                <>
                  {(currentLessonData.status || "published") === "draft" &&
                  selectedHasMedia ? (
                    <PanePrimaryButton
                      type="button"
                      onClick={() =>
                        handlePublishLesson(
                          currentLessonData._id ||
                            currentLessonData.id ||
                            currentLessonData.urlSlug,
                        )
                      }
                    >
                      {t("coursePlayer.adminPane.publish")}
                    </PanePrimaryButton>
                  ) : null}
                </>
              ) : null}
              <PaneGhostButton type="button" onClick={onClose}>
                <X size={16} />
              </PaneGhostButton>
            </PaneTopActions>
          </PaneTopBar>

          <MobileLessonStrip>
            <PaneLessonList>{renderLessonButtons()}</PaneLessonList>
          </MobileLessonStrip>

          <PaneSummary>
            <SummaryCard>
              <SummaryLabel>{t("coursePlayer.adminPane.totalLessons")}</SummaryLabel>
              <SummaryValue>{lessons.length}</SummaryValue>
            </SummaryCard>
            <SummaryCard>
              <SummaryLabel>{t("coursePlayer.adminPane.published")}</SummaryLabel>
              <SummaryValue>{publishedCount}</SummaryValue>
            </SummaryCard>
            <SummaryCard>
              <SummaryLabel>{t("coursePlayer.playlist.draft")}</SummaryLabel>
              <SummaryValue>{draftCount}</SummaryValue>
            </SummaryCard>
            <SummaryCard>
              <SummaryLabel>{t("coursePlayer.adminPane.students")}</SummaryLabel>
              <SummaryValue>{approvedMembers.length}</SummaryValue>
            </SummaryCard>
          </PaneSummary>

          <PaneTabs>
            {["tests", "homework", "attendance", "grading", "members"].map((tab) => (
              <PaneTabButton
                key={tab}
                type="button"
                $active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              >
                {t(`coursePlayer.adminPane.tabs.${tab}`)}
              </PaneTabButton>
            ))}
          </PaneTabs>

          <PaneContent>
            {activeTab === "tests" ? (
              <CoursePlayerLessonTestsSection adminMode />
            ) : activeTab === "homework" ? (
              <CoursePlayerHomeworkSection />
            ) : activeTab === "attendance" ? (
              <CoursePlayerAttendanceSection />
            ) : activeTab === "grading" ? (
              <CoursePlayerGradingSection />
            ) : (
              <MembersSection>
                <div>
                  <SectionTitle>
                    {t("coursePlayer.members.pendingTitle", {
                      count: pendingMembers.length,
                    })}
                  </SectionTitle>
                  {pendingMembers.length ? (
                    <MemberTable>
                      {pendingMembers.map((member) => (
                        <MemberRow key={member.userId || member._id || member.id}>
                          <MemberMeta>
                            <MemberName>{member.name}</MemberName>
                            <MemberSub>{t("coursePlayer.members.pending")}</MemberSub>
                          </MemberMeta>
                          <MemberActions>
                            <TinyAction
                              type="button"
                              $approve
                              onClick={() =>
                                approveUser(
                                  courseId,
                                  member.userId || member._id || member.id,
                                )
                              }
                            >
                              {t("coursePlayer.actions.approve")}
                            </TinyAction>
                            <TinyAction
                              type="button"
                              onClick={() =>
                                removeUser(
                                  courseId,
                                  member.userId || member._id || member.id,
                                )
                              }
                            >
                              {t("coursePlayer.actions.reject")}
                            </TinyAction>
                          </MemberActions>
                        </MemberRow>
                      ))}
                    </MemberTable>
                  ) : (
                    <EmptyState>{t("coursePlayer.adminPane.noPending")}</EmptyState>
                  )}
                </div>

                <div>
                  <SectionTitle>
                    {t("coursePlayer.members.approvedTitle", {
                      count: approvedMembers.length,
                    })}
                  </SectionTitle>
                  {approvedMembers.length ? (
                    <MemberTable>
                      {approvedMembers.map((member) => (
                        <MemberRow key={member.userId || member._id || member.id}>
                          <MemberMeta>
                            <MemberName>{member.name}</MemberName>
                            <MemberSub>{t("coursePlayer.members.approved")}</MemberSub>
                          </MemberMeta>
                          <MemberActions>
                            <TinyAction
                              type="button"
                              onClick={() =>
                                removeUser(
                                  courseId,
                                  member.userId || member._id || member.id,
                                )
                              }
                            >
                              {t("coursePlayer.actions.remove")}
                            </TinyAction>
                          </MemberActions>
                        </MemberRow>
                      ))}
                    </MemberTable>
                  ) : (
                    <EmptyState>{t("coursePlayer.members.empty")}</EmptyState>
                  )}
                </div>
              </MembersSection>
            )}
          </PaneContent>
        </PaneMain>
      </PaneShell>
    </PaneOverlay>
  );
};

export default CoursePlayerAdminPane;
