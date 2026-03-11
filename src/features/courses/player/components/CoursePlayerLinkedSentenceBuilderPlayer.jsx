import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { checkSentenceBuilderAnswer } from "../../../../api/arenaApi";
import {
  DialogActionButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTitleBlock,
} from "../../../../shared/ui/dialogs/ModalShell";

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: min(78vh, 760px);
  background: var(--tertiary-color);
`;

const BackButton = styled.button`
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
  color: var(--text-muted-color);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: var(--secondary-color);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.$width || "0%"};
  background: linear-gradient(90deg, #22c55e 0%, #14b8a6 100%);
`;

const Card = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--input-color);
  padding: 16px;
  display: grid;
  gap: 14px;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted-color);
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const Prompt = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.4;
`;

const DropZone = styled.div`
  min-height: 72px;
  border: 1px dashed var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const TokensWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TokenButton = styled.button`
  min-height: 38px;
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid
    ${(props) =>
      props.$state === "correct"
        ? "rgba(34, 197, 94, 0.5)"
        : props.$state === "wrong"
          ? "rgba(239, 68, 68, 0.45)"
          : "var(--border-color)"};
  background: ${(props) =>
    props.$selected
      ? "color-mix(in srgb, var(--primary-color) 10%, transparent)"
      : props.$state === "correct"
        ? "rgba(34, 197, 94, 0.1)"
        : props.$state === "wrong"
          ? "rgba(239, 68, 68, 0.1)"
          : "var(--secondary-color)"};
  color: var(--text-color);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const Hint = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
`;

const Feedback = styled.div`
  border-radius: 14px;
  border: 1px solid
    ${(props) =>
      props.$correct ? "rgba(34, 197, 94, 0.35)" : "rgba(239, 68, 68, 0.32)"};
  background: ${(props) =>
    props.$correct ? "rgba(34, 197, 94, 0.08)" : "rgba(239, 68, 68, 0.08)"};
  padding: 14px;
  display: grid;
  gap: 10px;
`;

const FeedbackTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--input-color);
  padding: 14px;
  display: grid;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted-color);

  strong {
    font-size: 24px;
    color: var(--text-color);
  }
`;

const ResultList = styled.div`
  display: grid;
  gap: 10px;
`;

const ResultItem = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--input-color);
  padding: 14px;
  display: grid;
  gap: 8px;
`;

const ResultTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: var(--text-color);
`;

const makePoolTokens = (tokens = []) =>
  tokens.map((text, index) => ({
    id: `${String(text)}-${index}-${Math.random().toString(36).slice(2, 8)}`,
    text,
  }));

const CoursePlayerLinkedSentenceBuilderPlayer = ({
  deck,
  linkedTest,
  onClose,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [poolTokens, setPoolTokens] = useState([]);
  const [checkedResult, setCheckedResult] = useState(null);
  const [answerMap, setAnswerMap] = useState({});
  const [sessionResults, setSessionResults] = useState([]);
  const [summary, setSummary] = useState(null);
  const [checking, setChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, Number(linkedTest?.timeLimit || 0) * 60),
  );

  const currentQuestion = deck?.items?.[questionIndex] || null;
  const progressWidth = useMemo(() => {
    if (!deck?.items?.length) return "0%";
    return `${((questionIndex + 1) / deck.items.length) * 100}%`;
  }, [deck, questionIndex]);

  useEffect(() => {
    if (!currentQuestion || summary) return;
    setSelectedTokens([]);
    setPoolTokens(makePoolTokens(currentQuestion.poolTokens || []));
    setCheckedResult(null);
  }, [currentQuestion, summary]);

  useEffect(() => {
    if (!timeLeft || summary || submitting) return undefined;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [summary, submitting, timeLeft]);

  const handleSubmit = useCallback(async () => {
    if (!deck?._id || !linkedTest?.linkedTestId || submitting) return;

    setSubmitting(true);
    try {
      const mergedAnswerMap = {
        ...answerMap,
        ...(currentQuestion && selectedTokens.length
          ? { [questionIndex]: selectedTokens.map((token) => token.text) }
          : {}),
      };

      const sentenceBuilderAnswers = Object.entries(mergedAnswerMap).map(
        ([idx, selected]) => ({
          questionIndex: Number(idx),
          selectedTokens: selected,
        }),
      );

      const result = await onSubmit({ sentenceBuilderAnswers });
      setSummary(result);
      if (Array.isArray(result?.results) && result.results.length) {
        setSessionResults(result.results);
      }
    } finally {
      setSubmitting(false);
    }
  }, [
    answerMap,
    currentQuestion,
    linkedTest?.linkedTestId,
    onSubmit,
    questionIndex,
    selectedTokens,
    submitting,
    deck?._id,
  ]);

  useEffect(() => {
    if (timeLeft === 0 && Number(linkedTest?.timeLimit || 0) > 0 && !summary) {
      handleSubmit().catch(() => {
        toast.error(t("coursePlayer.lessonTests.submitError"));
      });
    }
  }, [handleSubmit, linkedTest?.timeLimit, summary, t, timeLeft]);

  const handleChooseToken = (token) => {
    if (checkedResult) return;
    setPoolTokens((prev) => prev.filter((item) => item.id !== token.id));
    setSelectedTokens((prev) => [...prev, token]);
  };

  const handleRemoveToken = (token) => {
    if (checkedResult) return;
    setSelectedTokens((prev) => prev.filter((item) => item.id !== token.id));
    setPoolTokens((prev) => [...prev, token]);
  };

  const handleCheck = async () => {
    if (!deck?._id || !currentQuestion) return;
    if (!selectedTokens.length) {
      toast.error(t("coursePlayer.lessonTests.builderComposeHint"));
      return;
    }

    setChecking(true);
    try {
      const result = await checkSentenceBuilderAnswer(
        deck._id,
        questionIndex,
        selectedTokens.map((token) => token.text),
      );
      setCheckedResult(result);
      setAnswerMap((prev) => ({
        ...prev,
        [questionIndex]: selectedTokens.map((token) => token.text),
      }));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || t("coursePlayer.lessonTests.loadError"),
      );
    } finally {
      setChecking(false);
    }
  };

  const handleNext = async () => {
    if (!checkedResult || !currentQuestion) return;

    const nextResults = [
      ...sessionResults,
      {
        prompt: currentQuestion.prompt,
        ...checkedResult,
      },
    ];
    setSessionResults(nextResults);

    if (questionIndex >= (deck?.items?.length || 0) - 1) {
      await handleSubmit();
      return;
    }

    setQuestionIndex((prev) => prev + 1);
  };

  return (
    <Shell>
      <ModalHeader>
        <ModalTitleBlock>
          <BackButton type="button" onClick={onClose}>
            <ArrowLeft size={16} />
            {t("coursePlayer.lessonTests.builderBack")}
          </BackButton>
          <ModalTitle>{linkedTest?.title || deck?.title}</ModalTitle>
        </ModalTitleBlock>
      </ModalHeader>

      <ModalBody style={{ display: "grid", gap: 14 }}>
        {summary ? (
          <>
            <SummaryGrid>
              <SummaryCard>
                {t("coursePlayer.lessonTests.builderCorrectCount")}
                <strong>{Number(summary?.score || 0)}</strong>
              </SummaryCard>
              <SummaryCard>
                {t("coursePlayer.lessonTests.builderTotalCount")}
                <strong>{Number(summary?.total || 0)}</strong>
              </SummaryCard>
              <SummaryCard>
                {t("coursePlayer.lessonTests.builderAccuracy")}
                <strong>{Number(summary?.percent || 0)}%</strong>
              </SummaryCard>
            </SummaryGrid>

            {summary?.showResults !== false ? (
              <ResultList>
                {sessionResults.map((item, index) => (
                  <ResultItem key={`${item.prompt || "item"}-${index}`}>
                    <ResultTitle>
                      {t("coursePlayer.lessonTests.builderQuestionLabel", {
                        number: index + 1,
                      })}
                      : {item.prompt}
                    </ResultTitle>
                    <Hint>
                      {item.isCorrect
                        ? t("coursePlayer.lessonTests.builderCorrect")
                        : t("coursePlayer.lessonTests.builderWrong")}
                    </Hint>
                    <TokensWrap>
                      {(item.expectedTokens || item.expected || []).map(
                        (token, tokenIndex) => (
                          <TokenButton key={`${token}-${tokenIndex}`} type="button">
                            {token}
                          </TokenButton>
                        ),
                      )}
                    </TokensWrap>
                  </ResultItem>
                ))}
              </ResultList>
            ) : (
              <Hint>{t("coursePlayer.lessonTests.builderNoBreakdown")}</Hint>
            )}
          </>
        ) : (
          <>
            <MetaRow>
              <span>
                {t("coursePlayer.lessonTests.builderProgress", {
                  current: questionIndex + 1,
                  total: deck?.items?.length || 0,
                })}
              </span>
              {Number(linkedTest?.timeLimit || 0) > 0 ? (
                <span>
                  <Clock3 size={14} style={{ marginRight: 6 }} />
                  {Math.floor(timeLeft / 60)}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </span>
              ) : null}
            </MetaRow>
            <ProgressBar>
              <ProgressFill $width={progressWidth} />
            </ProgressBar>

            <Card>
              <div>
                <Label>{t("coursePlayer.lessonTests.builderPromptTitle")}</Label>
                <Prompt>{currentQuestion?.prompt}</Prompt>
              </div>

              <div>
                <Label>{t("coursePlayer.lessonTests.builderAnswerTitle")}</Label>
                <DropZone>
                  {selectedTokens.length ? (
                    selectedTokens.map((token, index) => {
                      const state = checkedResult
                        ? token.text === checkedResult.expected?.[index]
                          ? "correct"
                          : "wrong"
                        : null;

                      return (
                        <TokenButton
                          key={token.id}
                          type="button"
                          $selected
                          $state={state}
                          onClick={() => handleRemoveToken(token)}
                        >
                          {token.text}
                        </TokenButton>
                      );
                    })
                  ) : (
                    <Hint>{t("coursePlayer.lessonTests.builderComposeHint")}</Hint>
                  )}
                </DropZone>
              </div>

              <div>
                <Label>{t("coursePlayer.lessonTests.builderPoolTitle")}</Label>
                <TokensWrap>
                  {poolTokens.map((token) => (
                    <TokenButton
                      key={token.id}
                      type="button"
                      onClick={() => handleChooseToken(token)}
                    >
                      {token.text}
                    </TokenButton>
                  ))}
                </TokensWrap>
              </div>

              {checkedResult ? (
                <Feedback $correct={checkedResult.isCorrect}>
                  <FeedbackTitle>
                    {checkedResult.isCorrect ? (
                      <>
                        <CheckCircle2 size={16} />
                        {t("coursePlayer.lessonTests.builderCorrect")}
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={16} />
                        {t("coursePlayer.lessonTests.builderWrong")}
                      </>
                    )}
                  </FeedbackTitle>
                  <Hint>{t("coursePlayer.lessonTests.builderExpected")}</Hint>
                  <TokensWrap>
                    {(checkedResult.expected || []).map((token, index) => (
                      <TokenButton key={`${token}-${index}`} type="button">
                        {token}
                      </TokenButton>
                    ))}
                  </TokensWrap>
                </Feedback>
              ) : null}
            </Card>
          </>
        )}
      </ModalBody>

      <ModalFooter>
        <DialogActionButton type="button" $variant="ghost" onClick={onClose}>
          {summary ? t("common.close") : t("common.cancel")}
        </DialogActionButton>
        {summary ? null : checkedResult ? (
          <DialogActionButton
            type="button"
            onClick={handleNext}
            disabled={submitting}
          >
            {questionIndex >= (deck?.items?.length || 0) - 1
              ? t("coursePlayer.lessonTests.builderFinish")
              : t("coursePlayer.lessonTests.builderNext")}
          </DialogActionButton>
        ) : (
          <DialogActionButton
            type="button"
            onClick={handleCheck}
            disabled={checking || submitting}
          >
            {checking
              ? t("coursePlayer.lessonTests.builderChecking")
              : t("coursePlayer.lessonTests.builderCheck")}
          </DialogActionButton>
        )}
      </ModalFooter>
    </Shell>
  );
};

export default CoursePlayerLinkedSentenceBuilderPlayer;
