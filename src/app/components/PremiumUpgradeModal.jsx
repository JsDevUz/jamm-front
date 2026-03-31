import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Crown, ShieldAlert, X } from "lucide-react";
import OfficalBadge from "../../shared/ui/badges/OfficalBadge";
import { APP_LIMITS } from "../../constants/appLimits";
import useAuthStore from "../../store/authStore";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
} from "../../shared/ui/dialogs/ModalShell";
import {
  AlertBox,
  FooterNote,
  Hero,
  HeroRow,
  HeroText,
  HeroTitle,
  LimitsTable,
  PlanCard,
  PlanMeta,
  PlanName,
  PlansGrid,
  RowLabel,
  RowValue,
  SectionCard,
  SectionDescription,
  SectionHeader,
  SectionList,
  SectionTitle,
  TableHead,
  TableHeadCell,
  TableRow,
} from "./PremiumUpgradeModal.styles";

const formatMb = (value) => `${Math.round(value / (1024 * 1024))}MB`;
const formatChars = (t, value) => t("premiumModal.chars", { count: value });
const formatWords = (t, value) => t("premiumModal.words", { count: value });

const PremiumUpgradeModal = ({
  isOpen,
  onClose,
  onUpgrade,
  message = "",
}) => {
  const { t } = useTranslation();
  const currentUser = useAuthStore((state) => state.user);
  const isPremiumActive = currentUser?.premiumStatus === "active";

  const sections = useMemo(
    () => [
      {
        key: "posts",
        title: t("premiumModal.sections.posts.title"),
        description: t("premiumModal.sections.posts.description"),
        items: [
          {
            label: t("premiumModal.items.postsPerDay"),
            ordinary: APP_LIMITS.postsPerDay.ordinary,
            premium: APP_LIMITS.postsPerDay.premium,
          },
          {
            label: t("premiumModal.items.postCommentsPerPost"),
            ordinary: APP_LIMITS.postCommentsPerPost.ordinary,
            premium: APP_LIMITS.postCommentsPerPost.premium,
          },
          {
            label: t("premiumModal.items.postWords"),
            ordinary: formatWords(t, APP_LIMITS.postWords),
            premium: formatWords(t, APP_LIMITS.postWords),
          },
          {
            label: t("premiumModal.items.postCommentChars"),
            ordinary: formatChars(t, APP_LIMITS.postCommentChars),
            premium: formatChars(t, APP_LIMITS.postCommentChars),
          },
        ],
      },
      {
        key: "articles",
        title: t("premiumModal.sections.articles.title"),
        description: t("premiumModal.sections.articles.description"),
        items: [
          {
            label: t("premiumModal.items.articlesPerUser"),
            ordinary: APP_LIMITS.articlesPerUser.ordinary,
            premium: APP_LIMITS.articlesPerUser.premium,
          },
          {
            label: t("premiumModal.items.articleCommentsPerArticle"),
            ordinary: APP_LIMITS.articleCommentsPerArticle.ordinary,
            premium: APP_LIMITS.articleCommentsPerArticle.premium,
          },
          {
            label: t("premiumModal.items.articleImagesPerArticle"),
            ordinary: APP_LIMITS.articleImagesPerArticle.ordinary,
            premium: APP_LIMITS.articleImagesPerArticle.premium,
          },
          {
            label: t("premiumModal.items.articleWords"),
            ordinary: formatWords(t, APP_LIMITS.articleWords.ordinary),
            premium: formatWords(t, APP_LIMITS.articleWords.premium),
          },
          {
            label: t("premiumModal.items.articleTitleChars"),
            ordinary: formatChars(t, APP_LIMITS.articleTitleChars),
            premium: formatChars(t, APP_LIMITS.articleTitleChars),
          },
          {
            label: t("premiumModal.items.articleExcerptChars"),
            ordinary: formatChars(t, APP_LIMITS.articleExcerptChars),
            premium: formatChars(t, APP_LIMITS.articleExcerptChars),
          },
          {
            label: t("premiumModal.items.articleTagChars"),
            ordinary: `${APP_LIMITS.articleTagCount} × ${formatChars(t, APP_LIMITS.articleTagChars)}`,
            premium: `${APP_LIMITS.articleTagCount} × ${formatChars(t, APP_LIMITS.articleTagChars)}`,
          },
          {
            label: t("premiumModal.items.articleCommentChars"),
            ordinary: formatChars(t, APP_LIMITS.articleCommentChars),
            premium: formatChars(t, APP_LIMITS.articleCommentChars),
          },
        ],
      },
      {
        key: "groups",
        title: t("premiumModal.sections.groups.title"),
        description: t("premiumModal.sections.groups.description"),
        items: [
          {
            label: t("premiumModal.items.groupsCreated"),
            ordinary: APP_LIMITS.groupsCreated.ordinary,
            premium: APP_LIMITS.groupsCreated.premium,
          },
          {
            label: t("premiumModal.items.groupsJoined"),
            ordinary: APP_LIMITS.groupsJoined.ordinary,
            premium: APP_LIMITS.groupsJoined.premium,
          },
          {
            label: t("premiumModal.items.messageChars"),
            ordinary: formatChars(t, APP_LIMITS.messageChars),
            premium: formatChars(t, APP_LIMITS.messageChars),
          },
          {
            label: t("premiumModal.items.groupNameChars"),
            ordinary: formatChars(t, APP_LIMITS.groupNameChars),
            premium: formatChars(t, APP_LIMITS.groupNameChars),
          },
          {
            label: t("premiumModal.items.groupDescriptionChars"),
            ordinary: formatChars(t, APP_LIMITS.groupDescriptionChars),
            premium: formatChars(t, APP_LIMITS.groupDescriptionChars),
          },
        ],
      },
      {
        key: "meets",
        title: t("premiumModal.sections.meets.title"),
        description: t("premiumModal.sections.meets.description"),
        items: [
          {
            label: t("premiumModal.items.meetsCreated"),
            ordinary: APP_LIMITS.meetsCreated.ordinary,
            premium: APP_LIMITS.meetsCreated.premium,
          },
          {
            label: t("premiumModal.items.meetParticipants"),
            ordinary: APP_LIMITS.meetParticipants.ordinary,
            premium: APP_LIMITS.meetParticipants.premium,
          },
          {
            label: t("premiumModal.items.meetTitleChars"),
            ordinary: formatChars(t, APP_LIMITS.meetTitleChars),
            premium: formatChars(t, APP_LIMITS.meetTitleChars),
          },
          {
            label: t("premiumModal.items.meetDescriptionChars"),
            ordinary: formatChars(t, APP_LIMITS.meetDescriptionChars),
            premium: formatChars(t, APP_LIMITS.meetDescriptionChars),
          },
        ],
      },
      {
        key: "courses",
        title: t("premiumModal.sections.courses.title"),
        description: t("premiumModal.sections.courses.description"),
        items: [
          {
            label: t("premiumModal.items.coursesCreated"),
            ordinary: APP_LIMITS.coursesCreated.ordinary,
            premium: APP_LIMITS.coursesCreated.premium,
          },
          {
            label: t("premiumModal.items.lessonsPerCourse"),
            ordinary: APP_LIMITS.lessonsPerCourse.ordinary,
            premium: APP_LIMITS.lessonsPerCourse.premium,
          },
          {
            label: t("premiumModal.items.lessonVideosPerLesson"),
            ordinary: APP_LIMITS.lessonVideosPerLesson.ordinary,
            premium: APP_LIMITS.lessonVideosPerLesson.premium,
          },
          {
            label: t("premiumModal.items.lessonMediaBytes"),
            ordinary: formatMb(APP_LIMITS.lessonMediaBytes),
            premium: formatMb(APP_LIMITS.lessonMediaBytes),
          },
          {
            label: t("premiumModal.items.lessonTestsPerLesson"),
            ordinary: APP_LIMITS.lessonTestsPerLesson.ordinary,
            premium: APP_LIMITS.lessonTestsPerLesson.premium,
          },
          {
            label: t("premiumModal.items.lessonHomeworkPerLesson"),
            ordinary: APP_LIMITS.lessonHomeworkPerLesson.ordinary,
            premium: APP_LIMITS.lessonHomeworkPerLesson.premium,
          },
          {
            label: t("premiumModal.items.homeworkTextChars"),
            ordinary: formatChars(t, APP_LIMITS.homeworkTextChars),
            premium: formatChars(t, APP_LIMITS.homeworkTextChars),
          },
          {
            label: t("premiumModal.items.homeworkLinkChars"),
            ordinary: formatChars(t, APP_LIMITS.homeworkLinkChars),
            premium: formatChars(t, APP_LIMITS.homeworkLinkChars),
          },
          {
            label: t("premiumModal.items.homeworkPhotoBytes"),
            ordinary: formatMb(APP_LIMITS.homeworkPhotoBytes),
            premium: formatMb(APP_LIMITS.homeworkPhotoBytes),
          },
          {
            label: t("premiumModal.items.homeworkAudioBytes"),
            ordinary: formatMb(APP_LIMITS.homeworkAudioBytes),
            premium: formatMb(APP_LIMITS.homeworkAudioBytes),
          },
          {
            label: t("premiumModal.items.homeworkVideoBytes"),
            ordinary: formatMb(APP_LIMITS.homeworkVideoBytes),
            premium: formatMb(APP_LIMITS.homeworkVideoBytes),
          },
          {
            label: t("premiumModal.items.homeworkPdfBytes"),
            ordinary: formatMb(APP_LIMITS.homeworkPdfBytes),
            premium: formatMb(APP_LIMITS.homeworkPdfBytes),
          },
          {
            label: t("premiumModal.items.courseNameChars"),
            ordinary: formatChars(t, APP_LIMITS.courseNameChars),
            premium: formatChars(t, APP_LIMITS.courseNameChars),
          },
          {
            label: t("premiumModal.items.courseDescriptionChars"),
            ordinary: formatChars(t, APP_LIMITS.courseDescriptionChars),
            premium: formatChars(t, APP_LIMITS.courseDescriptionChars),
          },
          {
            label: t("premiumModal.items.lessonTitleChars"),
            ordinary: formatChars(t, APP_LIMITS.lessonTitleChars),
            premium: formatChars(t, APP_LIMITS.lessonTitleChars),
          },
          {
            label: t("premiumModal.items.lessonDescriptionChars"),
            ordinary: formatChars(t, APP_LIMITS.lessonDescriptionChars),
            premium: formatChars(t, APP_LIMITS.lessonDescriptionChars),
          },
        ],
      },
      {
        key: "arena",
        title: t("premiumModal.sections.arena.title"),
        description: t("premiumModal.sections.arena.description"),
        items: [
          {
            label: t("premiumModal.items.testsCreated"),
            ordinary: APP_LIMITS.testsCreated.ordinary,
            premium: APP_LIMITS.testsCreated.premium,
          },
          {
            label: t("premiumModal.items.testShareLinksPerTest"),
            ordinary: APP_LIMITS.testShareLinksPerTest.ordinary,
            premium: APP_LIMITS.testShareLinksPerTest.premium,
          },
          {
            label: t("premiumModal.items.flashcardsCreated"),
            ordinary: APP_LIMITS.flashcardsCreated.ordinary,
            premium: APP_LIMITS.flashcardsCreated.premium,
          },
          {
            label: t("premiumModal.items.sentenceBuildersCreated"),
            ordinary: APP_LIMITS.sentenceBuildersCreated.ordinary,
            premium: APP_LIMITS.sentenceBuildersCreated.premium,
          },
          {
            label: t("premiumModal.items.sentenceBuilderShareLinksPerDeck"),
            ordinary: APP_LIMITS.sentenceBuilderShareLinksPerDeck.ordinary,
            premium: APP_LIMITS.sentenceBuilderShareLinksPerDeck.premium,
          },
          {
            label: t("premiumModal.items.testTitleChars"),
            ordinary: formatChars(t, APP_LIMITS.testTitleChars),
            premium: formatChars(t, APP_LIMITS.testTitleChars),
          },
          {
            label: t("premiumModal.items.testDescriptionChars"),
            ordinary: formatChars(t, APP_LIMITS.testDescriptionChars),
            premium: formatChars(t, APP_LIMITS.testDescriptionChars),
          },
          {
            label: t("premiumModal.items.testQuestionChars"),
            ordinary: formatChars(t, APP_LIMITS.testQuestionChars),
            premium: formatChars(t, APP_LIMITS.testQuestionChars),
          },
          {
            label: t("premiumModal.items.testOptionChars"),
            ordinary: formatChars(t, APP_LIMITS.testOptionChars),
            premium: formatChars(t, APP_LIMITS.testOptionChars),
          },
          {
            label: t("premiumModal.items.flashcardSideChars"),
            ordinary: formatChars(t, APP_LIMITS.flashcardSideChars),
            premium: formatChars(t, APP_LIMITS.flashcardSideChars),
          },
          {
            label: t("premiumModal.items.sentenceBuilderPromptChars"),
            ordinary: formatChars(t, APP_LIMITS.sentenceBuilderPromptChars),
            premium: formatChars(t, APP_LIMITS.sentenceBuilderPromptChars),
          },
          {
            label: t("premiumModal.items.sentenceBuilderAnswerChars"),
            ordinary: formatChars(t, APP_LIMITS.sentenceBuilderAnswerChars),
            premium: formatChars(t, APP_LIMITS.sentenceBuilderAnswerChars),
          },
        ],
      },
      {
        key: "profile",
        title: t("premiumModal.sections.profile.title"),
        description: t("premiumModal.sections.profile.description"),
        items: [
          {
            label: t("premiumModal.items.nicknameChars"),
            ordinary: formatChars(t, APP_LIMITS.nicknameChars),
            premium: formatChars(t, APP_LIMITS.nicknameChars),
          },
          {
            label: t("premiumModal.items.usernameChars"),
            ordinary: formatChars(t, APP_LIMITS.usernameChars),
            premium: formatChars(t, APP_LIMITS.usernameChars),
          },
          {
            label: t("premiumModal.items.bioChars"),
            ordinary: formatChars(t, APP_LIMITS.bioChars),
            premium: formatChars(t, APP_LIMITS.bioChars),
          },
        ],
      },
    ],
    [t],
  );

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose} $zIndex={10060} $overlay="rgba(0, 0, 0, 0.78)">
      <ModalPanel
        onClick={(event) => event.stopPropagation()}
        $width="min(100%, 980px)"
        $maxWidth="100%"
        $maxHeight="92vh"
      >
        <ModalHeader>
          <Hero>
            <HeroRow>
              <OfficalBadge width={28} height={28} variant="premium" />
              <HeroTitle>{t("premiumModal.title")}</HeroTitle>
            </HeroRow>
            <HeroText>{t("premiumModal.subtitle")}</HeroText>
          </Hero>
          <ModalCloseButton type="button" onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          {message ? (
            <AlertBox>
              <HeroRow>
                <ShieldAlert size={16} />
                <strong>{t("premiumModal.limitReachedTitle")}</strong>
              </HeroRow>
              <div>{message}</div>
            </AlertBox>
          ) : null}

          {!isPremiumActive ? (
            <PlansGrid>
              <PlanCard>
                <PlanName>{t("premiumModal.freePlan")}</PlanName>
                <PlanMeta>{t("premiumModal.freePlanDescription")}</PlanMeta>
              </PlanCard>
              <PlanCard $premium>
                <PlanName $premium>
                  <Crown size={16} />
                  {t("premiumModal.premiumPlan")}
                </PlanName>
                <PlanMeta>{t("premiumModal.premiumPlanDescription")}</PlanMeta>
              </PlanCard>
            </PlansGrid>
          ) : null}

          <SectionList>
            {sections.map((section) => (
              <SectionCard key={section.key}>
                <SectionHeader>
                  <div>
                    <SectionTitle>{section.title}</SectionTitle>
                    <SectionDescription>{section.description}</SectionDescription>
                  </div>
                </SectionHeader>

                <LimitsTable>
                  <TableHead>
                    <TableHeadCell>
                      {t("premiumModal.columns.feature")}
                    </TableHeadCell>
                    <TableHeadCell $alignRight>
                      {t("premiumModal.columns.free")}
                    </TableHeadCell>
                    <TableHeadCell $alignRight>
                      {t("premiumModal.columns.premium")}
                    </TableHeadCell>
                  </TableHead>
                  {section.items.map((item) => (
                    <TableRow key={item.label}>
                      <RowLabel>{item.label}</RowLabel>
                      <RowValue>{item.ordinary}</RowValue>
                      <RowValue $premium>{item.premium}</RowValue>
                    </TableRow>
                  ))}
                </LimitsTable>
              </SectionCard>
            ))}
          </SectionList>
        </ModalBody>

        {/* <ModalFooter>
          <FooterNote>{t("premiumModal.footerNote")}</FooterNote>
          <DialogActionButton type="button" onClick={onUpgrade}>
            {t("common.cancel")}
          </DialogActionButton>
        </ModalFooter> */}
      </ModalPanel>
    </ModalOverlay>
  );
};

export default PremiumUpgradeModal;
