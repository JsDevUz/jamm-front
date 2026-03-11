import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Link2,
  Pencil,
  Play,
  Plus,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import {
  fetchSentenceBuilderDeck,
  fetchSharedSentenceBuilderDeck,
  fetchTestById,
} from "../../../../api/arenaApi";
import { useCourses } from "../../../../contexts/CoursesContext";
import ConfirmDialog from "../../../../shared/ui/dialogs/ConfirmDialog";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../../shared/ui/dialogs/ModalShell";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import SoloTestPlayer from "../../../arena/components/SoloTestPlayer";
import { APP_LIMITS, isPremiumUser } from "../../../../constants/appLimits";
import CoursePlayerLinkedSentenceBuilderPlayer from "./CoursePlayerLinkedSentenceBuilderPlayer";
import {
  ActionButton,
  Badge,
  Card,
  CardActions,
  CardMeta,
  CardTitle,
  CardTop,
  EmptyState,
  Field,
  FieldWide,
  FormGrid,
  HeaderActions,
  HeaderMeta,
  HeaderRow,
  HeaderTitle,
  IconActionButton,
  InlineMeta,
  Input,
  Label,
  List,
  MutedText,
  SectionWrap,
  SkeletonCard,
  ToggleButton,
  ToggleRow,
} from "./CoursePlayerLessonTestsSection.styles";

const EMPTY_FORM = {
  linkedTestId: "",
  url: "",
  minimumScore: 60,
  requiredToUnlock: true,
};

const CoursePlayerLessonTestsSection = ({
  adminMode = false,
  forceExpanded = false,
  showCollapseToggle = true,
}) => {
  const { t } = useTranslation();
  const {
    getLessonLinkedTests,
    upsertLessonLinkedTest,
    deleteLessonLinkedTest,
    submitLessonLinkedTestAttempt,
  } = useCourses();
  const { courseId, currentLessonData, currentUser } = useCoursePlayerContext();

  const lessonId =
    currentLessonData?._id || currentLessonData?.id || currentLessonData?.urlSlug;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [linkedTestToDelete, setLinkedTestToDelete] = useState(null);
  const [, setIsDeleting] = useState(false);
  const [activeLinkedTest, setActiveLinkedTest] = useState(null);
  const [activeTestPayload, setActiveTestPayload] = useState(null);
  const [activeSentenceBuilderPayload, setActiveSentenceBuilderPayload] =
    useState(null);
  const [isSectionOpen, setIsSectionOpen] = useState(adminMode);

  const loadItems = useCallback(async () => {
    if (!courseId || !lessonId) {
      setItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const result = await getLessonLinkedTests(courseId, lessonId);
      setItems(Array.isArray(result?.items) ? result.items : []);
    } catch (error) {
      console.error(error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [courseId, getLessonLinkedTests, lessonId]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    setIsSectionOpen(adminMode);
  }, [adminMode]);

  useEffect(() => {
    if (forceExpanded) {
      setIsSectionOpen(true);
    }
  }, [forceExpanded]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
    setForm(EMPTY_FORM);
  }, []);

  const openCreateDialog = useCallback(() => {
    setForm(EMPTY_FORM);
    setIsDialogOpen(true);
  }, []);

  const openEditDialog = useCallback((item) => {
    setForm({
      linkedTestId: item.linkedTestId || "",
      url: item.url || "",
      minimumScore: Number(item.minimumScore || 0),
      requiredToUnlock: item.requiredToUnlock !== false,
    });
    setIsDialogOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!courseId || !lessonId) return;

    try {
      setIsSaving(true);
      const result = await upsertLessonLinkedTest(courseId, lessonId, form);
      setItems(Array.isArray(result?.items) ? result.items : []);
      closeDialog();
      toast.success(t("coursePlayer.lessonTests.saved"));
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || t("coursePlayer.lessonTests.saveError"),
      );
    } finally {
      setIsSaving(false);
    }
  }, [
    closeDialog,
    courseId,
    form,
    lessonId,
    t,
    upsertLessonLinkedTest,
  ]);

  const handleDelete = useCallback(async () => {
    if (!courseId || !lessonId || !linkedTestToDelete?.linkedTestId) return;

    try {
      setIsDeleting(true);
      const result = await deleteLessonLinkedTest(
        courseId,
        lessonId,
        linkedTestToDelete.linkedTestId,
      );
      setItems(Array.isArray(result?.items) ? result.items : []);
      setLinkedTestToDelete(null);
      toast.success(t("coursePlayer.lessonTests.deleted"));
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || t("coursePlayer.lessonTests.deleteError"),
      );
    } finally {
      setIsDeleting(false);
    }
  }, [courseId, deleteLessonLinkedTest, lessonId, linkedTestToDelete, t]);

  const handleStart = useCallback(
    async (linkedTest) => {
      try {
        if (linkedTest.resourceType === "sentenceBuilder") {
          const response = linkedTest.shareShortCode
            ? await fetchSharedSentenceBuilderDeck(linkedTest.shareShortCode)
            : await fetchSentenceBuilderDeck(
                linkedTest.resourceId || linkedTest.testId,
              );
          const deck = response?.deck || response;

          setActiveLinkedTest(linkedTest);
          setActiveSentenceBuilderPayload({
            ...deck,
            timeLimit: Number(linkedTest.timeLimit || 0),
            showResults: linkedTest.showResults !== false,
          });
          setActiveTestPayload(null);
          return;
        }

        const test = await fetchTestById(linkedTest.testId);
        setActiveLinkedTest(linkedTest);
        setActiveTestPayload({
          ...test,
          timeLimit: Number(linkedTest.timeLimit || 0),
          showResults: linkedTest.showResults !== false,
        });
        setActiveSentenceBuilderPayload(null);
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message || t("coursePlayer.lessonTests.loadError"),
        );
      }
    },
    [t],
  );

  const handleFinished = useCallback(
    async ({ answers, sentenceBuilderAnswers } = {}) => {
      if (!courseId || !lessonId || !activeLinkedTest?.linkedTestId) return;

      try {
        const result = await submitLessonLinkedTestAttempt(
          {
            courseId,
            lessonId,
            linkedTestId: activeLinkedTest.linkedTestId,
            answers,
            sentenceBuilderAnswers,
          },
        );
        await loadItems();

        if (result?.passed) {
          toast.success(t("coursePlayer.lessonTests.passed"));
        } else {
          toast.error(
            t("coursePlayer.lessonTests.failed", {
              score: Number(result?.percent || 0),
              minimum: Number(result?.minimumScore || 0),
            }),
          );
        }
        return result;
      } catch (error) {
        console.error(error);
        toast.error(
          error?.response?.data?.message || t("coursePlayer.lessonTests.submitError"),
        );
        throw error;
      }
    },
    [
      activeLinkedTest,
      courseId,
      lessonId,
      loadItems,
      submitLessonLinkedTestAttempt,
      t,
    ],
  );

  const completedCount = useMemo(
    () => items.filter((item) => item?.selfProgress?.passed).length,
    [items],
  );
  const linkedTestLimit = useMemo(
    () =>
      isPremiumUser(currentUser)
        ? APP_LIMITS.lessonTestsPerLesson.premium
        : APP_LIMITS.lessonTestsPerLesson.ordinary,
    [currentUser],
  );
  const canAddLinkedTest = items.length < linkedTestLimit;

  return (
    <>
      <SectionWrap>
        <HeaderRow>
          <HeaderMeta>
            <HeaderTitle>{t("coursePlayer.lessonTests.title")}</HeaderTitle>
            <MutedText>
              {adminMode
                ? t("coursePlayer.lessonTests.adminHint")
                : t("coursePlayer.lessonTests.studentHint", {
                    count: completedCount,
                    total: items.length,
                  })}
            </MutedText>
          </HeaderMeta>
          <HeaderActions>
            {adminMode ? (
              <IconActionButton
                type="button"
                onClick={openCreateDialog}
                title={t("coursePlayer.lessonTests.add")}
                aria-label={t("coursePlayer.lessonTests.add")}
                disabled={!canAddLinkedTest}
              >
                <Plus size={16} />
              </IconActionButton>
            ) : null}
            {showCollapseToggle ? (
              <IconActionButton
                type="button"
                onClick={() => setIsSectionOpen((prev) => !prev)}
                title={
                  isSectionOpen
                    ? t("coursePlayer.lessonTests.collapse")
                    : t("coursePlayer.lessonTests.expand")
                }
                aria-label={
                  isSectionOpen
                    ? t("coursePlayer.lessonTests.collapse")
                    : t("coursePlayer.lessonTests.expand")
                }
              >
                {isSectionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </IconActionButton>
            ) : null}
          </HeaderActions>
        </HeaderRow>

        {(forceExpanded || isSectionOpen) ? loading ? (
          <List>
            <SkeletonCard />
            <SkeletonCard />
          </List>
        ) : items.length ? (
          <List>
            {items.map((item) => (
              <Card key={item.linkedTestId}>
                <CardTop>
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardMeta>
                      <span>
                        {item.resourceType === "sentenceBuilder"
                          ? t("coursePlayer.lessonTests.typeSentenceBuilder")
                          : t("coursePlayer.lessonTests.typeTest")}
                      </span>
                      <span>
                        {t("coursePlayer.lessonTests.minScoreMeta", {
                          score: Number(item.minimumScore || 0),
                        })}
                      </span>
                      <span>
                        {Number(item.timeLimit || 0) > 0
                          ? t("coursePlayer.lessonTests.timeLimitMeta", {
                              count: Number(item.timeLimit || 0),
                            })
                          : t("coursePlayer.lessonTests.noTimeLimit")}
                      </span>
                    </CardMeta>
                  </div>
                  {adminMode ? (
                    <CardActions>
                      <IconActionButton
                        type="button"
                        onClick={() => openEditDialog(item)}
                        title={t("coursePlayer.lessonTests.edit")}
                        aria-label={t("coursePlayer.lessonTests.edit")}
                      >
                        <Pencil size={15} />
                      </IconActionButton>
                      <IconActionButton
                        type="button"
                        onClick={() => setLinkedTestToDelete(item)}
                        title={t("coursePlayer.lessonTests.delete")}
                        aria-label={t("coursePlayer.lessonTests.delete")}
                      >
                        <Trash2 size={15} />
                      </IconActionButton>
                    </CardActions>
                  ) : item?.selfProgress?.passed ? (
                    <Badge $tone="success">
                      <CheckCircle2 size={13} />
                      {t("coursePlayer.lessonTests.completed")}
                    </Badge>
                  ) : item.requiredToUnlock !== false ? (
                    <Badge $tone="warning">
                      <ShieldCheck size={13} />
                      {t("coursePlayer.lessonTests.required")}
                    </Badge>
                  ) : null}
                </CardTop>

                <InlineMeta>
                  <span>
                    {item.showResults
                      ? t("coursePlayer.lessonTests.resultsShown")
                      : t("coursePlayer.lessonTests.resultsHidden")}
                  </span>
                  {adminMode ? (
                  <span>
                    {t("coursePlayer.lessonTests.requiredToggle", {
                      value:
                        item.requiredToUnlock !== false
                            ? t("coursePlayer.lessonTests.unlockRequiredShort")
                            : t("coursePlayer.lessonTests.unlockOptionalShort"),
                      })}
                    </span>
                  ) : null}
                  {item?.selfProgress ? (
                    <span>
                      {t("coursePlayer.lessonTests.latestScoreMeta", {
                        score: Number(item.selfProgress.percent || 0),
                        attempts: Number(item.selfProgress.attemptsCount || 0),
                      })}
                    </span>
                  ) : null}
                </InlineMeta>

                {!adminMode ? (
                  <CardActions>
                    <ActionButton
                      type="button"
                      $primary
                      onClick={() => handleStart(item)}
                    >
                      <Play size={14} />
                      {item?.selfProgress?.passed
                        ? t("coursePlayer.lessonTests.retry")
                        : t("coursePlayer.lessonTests.start")}
                    </ActionButton>
                  </CardActions>
                ) : (
                  <CardActions>
                    <ActionButton
                      as="a"
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={14} />
                      {t("coursePlayer.lessonTests.openArena")}
                    </ActionButton>
                  </CardActions>
                )}
              </Card>
            ))}
          </List>
        ) : (
          <EmptyState>
            {adminMode
              ? t("coursePlayer.lessonTests.emptyAdmin")
              : t("coursePlayer.lessonTests.emptyStudent")}
          </EmptyState>
        ) : null}
        {adminMode && !canAddLinkedTest ? (
          <MutedText>{t("coursePlayer.lessonTests.limitReached")}</MutedText>
        ) : null}
      </SectionWrap>

      {isDialogOpen ? (
        <ModalOverlay onClick={closeDialog} $zIndex={10030}>
          <ModalPanel
            onClick={(event) => event.stopPropagation()}
            $width="min(100%, 520px)"
            $mobileFull={false}
          >
            <ModalHeader>
              <ModalTitleBlock>
                <ModalTitle>
                  {form.linkedTestId
                    ? t("coursePlayer.lessonTests.editDialogTitle")
                    : t("coursePlayer.lessonTests.newDialogTitle")}
                </ModalTitle>
                <ModalSubtitle>
                  {t("coursePlayer.lessonTests.dialogSubtitle")}
                </ModalSubtitle>
              </ModalTitleBlock>
              <ModalCloseButton type="button" onClick={closeDialog}>
                <X size={15} />
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <FormGrid>
                <FieldWide>
                  <Label>{t("coursePlayer.lessonTests.urlLabel")}</Label>
                  <Input
                    value={form.url}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, url: event.target.value }))
                    }
                    placeholder={t("coursePlayer.lessonTests.urlPlaceholder")}
                  />
                </FieldWide>
                <Field>
                  <Label>{t("coursePlayer.lessonTests.minimumScoreLabel")}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={form.minimumScore}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        minimumScore: Number(event.target.value || 0),
                      }))
                    }
                  />
                </Field>
                <FieldWide>
                  <Label>{t("coursePlayer.lessonTests.unlockRuleLabel")}</Label>
                  <ToggleRow>
                    <ToggleButton
                      type="button"
                      $active={form.requiredToUnlock}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          requiredToUnlock: true,
                        }))
                      }
                    >
                      {t("coursePlayer.lessonTests.unlockRequired")}
                    </ToggleButton>
                    <ToggleButton
                      type="button"
                      $active={!form.requiredToUnlock}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          requiredToUnlock: false,
                        }))
                      }
                    >
                      {t("coursePlayer.lessonTests.unlockOptional")}
                    </ToggleButton>
                  </ToggleRow>
                </FieldWide>
              </FormGrid>
            </ModalBody>
            <ModalFooter>
              <DialogActionButton
                type="button"
                $variant="ghost"
                onClick={closeDialog}
              >
                {t("common.cancel")}
              </DialogActionButton>
              <DialogActionButton
                type="button"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Link2 size={14} />
                {isSaving ? t("common.saving") : t("common.save")}
              </DialogActionButton>
            </ModalFooter>
          </ModalPanel>
        </ModalOverlay>
      ) : null}

      {activeTestPayload ? (
        <ModalOverlay
          onClick={() => {
            setActiveLinkedTest(null);
            setActiveTestPayload(null);
            setActiveSentenceBuilderPayload(null);
          }}
          $zIndex={10035}
        >
          <ModalPanel
            onClick={(event) => event.stopPropagation()}
            $width="min(100%, 920px)"
            $mobileFull
          >
            <SoloTestPlayer
              test={activeTestPayload}
              onClose={() => {
                setActiveLinkedTest(null);
                setActiveTestPayload(null);
                setActiveSentenceBuilderPayload(null);
              }}
              onFinishedResult={handleFinished}
            />
          </ModalPanel>
        </ModalOverlay>
      ) : null}

      {activeSentenceBuilderPayload ? (
        <ModalOverlay
          onClick={() => {
            setActiveLinkedTest(null);
            setActiveSentenceBuilderPayload(null);
            setActiveTestPayload(null);
          }}
          $zIndex={10035}
        >
          <ModalPanel
            onClick={(event) => event.stopPropagation()}
            $width="min(100%, 920px)"
            $mobileFull
          >
            <CoursePlayerLinkedSentenceBuilderPlayer
              deck={activeSentenceBuilderPayload}
              linkedTest={activeLinkedTest}
              onClose={() => {
                setActiveLinkedTest(null);
                setActiveSentenceBuilderPayload(null);
                setActiveTestPayload(null);
              }}
              onSubmit={handleFinished}
            />
          </ModalPanel>
        </ModalOverlay>
      ) : null}

      <ConfirmDialog
        isOpen={Boolean(linkedTestToDelete)}
        title={t("coursePlayer.lessonTests.deleteConfirmTitle")}
        description={t("coursePlayer.lessonTests.deleteConfirmDescription")}
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        onClose={() => setLinkedTestToDelete(null)}
        onConfirm={handleDelete}
        isDanger
      />
    </>
  );
};

export default CoursePlayerLessonTestsSection;
