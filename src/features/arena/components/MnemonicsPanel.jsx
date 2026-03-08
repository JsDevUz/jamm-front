import React, { useEffect, useMemo, useRef, useState } from "react";
import { Brain, Hash, ListOrdered, RotateCcw, Timer } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Actions,
  Card,
  CardText,
  CardTitle,
  ConfigInput,
  Countdown,
  Description,
  ExerciseTab,
  ExerciseTabs,
  Field,
  FieldLabel,
  Grid,
  Hero,
  HintList,
  Input,
  NumberBox,
  OptionGrid,
  Panel,
  PrimaryButton,
  ResultBanner,
  ResultLine,
  ResultTitle,
  SecondaryButton,
  Select,
  Stage,
  StatChip,
  StatsRow,
  StatusPill,
  SummaryList,
  SummaryRow,
  SummaryValue,
  Title,
} from "../styles/MnemonicsPanel.styles";

const DIGIT_OPTIONS = [5, 7, 9, 12];
const ROUND_OPTIONS = [3, 5, 7];
const SEQUENCE_COUNT_OPTIONS = [4, 5, 6, 8];
const SEQUENCE_TIME_OPTIONS = [5, 8, 10, 12];

const randomDigits = (length) =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

const createExerciseSet = (digits, rounds) =>
  Array.from({ length: rounds }, () => randomDigits(digits));

const getRevealSeconds = (digits) =>
  Math.max(3, Math.min(8, Math.ceil(digits / 2)));

const createSequenceSet = (start, end, count) => {
  const min = Math.min(start, end);
  const max = Math.max(start, end);
  const pool = Array.from({ length: max - min + 1 }, (_, index) => min + index);

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }

  return pool.slice(0, Math.min(count, pool.length));
};

const normalizeSequenceAnswer = (value) =>
  value
    .split(/[\s,;-]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join(" ");

const MnemonicsPanel = () => {
  const { t } = useTranslation();

  const [exerciseType, setExerciseType] = useState("digits");

  const [digitCount, setDigitCount] = useState(7);
  const [roundCount, setRoundCount] = useState(5);
  const [phase, setPhase] = useState("idle");
  const [items, setItems] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);

  const [sequenceStart, setSequenceStart] = useState(10);
  const [sequenceEnd, setSequenceEnd] = useState(99);
  const [sequenceCount, setSequenceCount] = useState(5);
  const [sequenceRevealSeconds, setSequenceRevealSeconds] = useState(8);
  const [sequencePhase, setSequencePhase] = useState("idle");
  const [sequenceItems, setSequenceItems] = useState([]);
  const [sequenceRemainingSeconds, setSequenceRemainingSeconds] = useState(0);
  const [sequenceAnswer, setSequenceAnswer] = useState("");
  const [sequenceResult, setSequenceResult] = useState(null);

  const answerInputRef = useRef(null);
  const sequenceInputRef = useRef(null);

  const currentValue = items[currentRound] || "";
  const revealSeconds = useMemo(
    () => getRevealSeconds(digitCount),
    [digitCount],
  );
  const currentSequenceValue = sequenceItems.join(" ");
  const rangeSize = Math.abs(sequenceEnd - sequenceStart) + 1;
  const sequenceCountLimit = Math.max(1, Math.min(sequenceCount, rangeSize));

  useEffect(() => {
    if (phase !== "memorize" || remainingSeconds <= 0) return undefined;

    const timeoutId = window.setTimeout(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setPhase("answer");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [phase, remainingSeconds]);

  useEffect(() => {
    if (sequencePhase !== "memorize" || sequenceRemainingSeconds <= 0) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setSequenceRemainingSeconds((prev) => {
        if (prev <= 1) {
          setSequencePhase("answer");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [sequencePhase, sequenceRemainingSeconds]);

  useEffect(() => {
    if (phase === "answer") {
      answerInputRef.current?.focus();
    }
  }, [phase]);

  useEffect(() => {
    if (sequencePhase === "answer") {
      sequenceInputRef.current?.focus();
    }
  }, [sequencePhase]);

  const startDigitsExercise = () => {
    setItems(createExerciseSet(digitCount, roundCount));
    setResults([]);
    setCurrentRound(0);
    setAnswer("");
    setRemainingSeconds(revealSeconds);
    setPhase("memorize");
  };

  const startSequenceExercise = () => {
    const nextItems = createSequenceSet(
      sequenceStart,
      sequenceEnd,
      sequenceCountLimit,
    );
    setSequenceItems(nextItems);
    setSequenceAnswer("");
    setSequenceResult(null);
    setSequenceRemainingSeconds(sequenceRevealSeconds);
    setSequencePhase("memorize");
  };

  const handleCheck = () => {
    const normalizedAnswer = answer.replace(/\s+/g, "");
    const isCorrect = normalizedAnswer === currentValue;
    const nextResults = [
      ...results,
      {
        round: currentRound + 1,
        expected: currentValue,
        actual: normalizedAnswer,
        correct: isCorrect,
      },
    ];

    setResults(nextResults);
    setPhase("review");
  };

  const handleSequenceCheck = () => {
    const actual = normalizeSequenceAnswer(sequenceAnswer);
    const expected = sequenceItems.join(" ");
    setSequenceResult({
      expected,
      actual,
      correct: actual === expected,
    });
    setSequencePhase("finished");
  };

  const handleNext = () => {
    const isLastRound = currentRound >= items.length - 1;
    if (isLastRound) {
      setPhase("finished");
      return;
    }

    setCurrentRound((prev) => prev + 1);
    setAnswer("");
    setRemainingSeconds(revealSeconds);
    setPhase("memorize");
  };

  const handleDigitsReset = () => {
    setPhase("idle");
    setItems([]);
    setCurrentRound(0);
    setRemainingSeconds(0);
    setAnswer("");
    setResults([]);
  };

  const handleSequenceReset = () => {
    setSequencePhase("idle");
    setSequenceItems([]);
    setSequenceRemainingSeconds(0);
    setSequenceAnswer("");
    setSequenceResult(null);
  };

  const correctCount = results.filter((item) => item.correct).length;
  const percent = results.length
    ? Math.round((correctCount / results.length) * 100)
    : 0;
  const latestResult = results[results.length - 1];

  return (
    <Panel>
      <Hero>
        <Title>{t("mnemonics.title")}</Title>
        <Description>{t("mnemonics.description")}</Description>
      </Hero>

      <Grid>
        <Card>
          <ExerciseTabs>
            <ExerciseTab
              type="button"
              $active={exerciseType === "digits"}
              onClick={() => setExerciseType("digits")}
            >
              <Hash size={14} />
              {t("mnemonics.numberMemory.title")}
            </ExerciseTab>
            <ExerciseTab
              type="button"
              $active={exerciseType === "sequence"}
              onClick={() => setExerciseType("sequence")}
            >
              <ListOrdered size={14} />
              {t("mnemonics.sequenceMemory.title")}
            </ExerciseTab>
          </ExerciseTabs>

          {exerciseType === "digits" ? (
            <>
              <CardTitle>{t("mnemonics.numberMemory.title")}</CardTitle>
              <CardText>{t("mnemonics.numberMemory.description")}</CardText>

              {phase === "idle" && (
                <>
                  <OptionGrid>
                    <Field>
                      <FieldLabel>{t("mnemonics.fields.digits")}</FieldLabel>
                      <Select
                        value={digitCount}
                        onChange={(e) => setDigitCount(Number(e.target.value))}
                      >
                        {DIGIT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {t("mnemonics.fields.digitsOption", { count: option })}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel>{t("mnemonics.fields.rounds")}</FieldLabel>
                      <Select
                        value={roundCount}
                        onChange={(e) => setRoundCount(Number(e.target.value))}
                      >
                        {ROUND_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {t("mnemonics.fields.roundsOption", { count: option })}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field>
                      <FieldLabel>{t("mnemonics.fields.showTime")}</FieldLabel>
                      <Select value={revealSeconds} disabled>
                        <option value={revealSeconds}>
                          {t("mnemonics.fields.showTimeValue", {
                            count: revealSeconds,
                          })}
                        </option>
                      </Select>
                    </Field>
                  </OptionGrid>

                  <PrimaryButton onClick={startDigitsExercise}>
                    {t("mnemonics.actions.start")}
                  </PrimaryButton>
                </>
              )}

              {phase !== "idle" && (
                <Stage>
                  <StatsRow>
                    <StatChip>
                      <Hash size={14} />
                      {t("mnemonics.stats.round", {
                        current: Math.min(currentRound + 1, items.length || 1),
                        total: items.length || roundCount,
                      })}
                    </StatChip>
                    <StatChip>
                      <Timer size={14} />
                      {t("mnemonics.stats.correct", {
                        count: correctCount,
                        total: results.length,
                      })}
                    </StatChip>
                  </StatsRow>

                  {phase === "memorize" && (
                    <>
                      <CardText>{t("mnemonics.memorizePrompt")}</CardText>
                      <NumberBox>{currentValue}</NumberBox>
                      <Countdown>
                        {t("mnemonics.countdown", { count: remainingSeconds })}
                      </Countdown>
                    </>
                  )}

                  {phase === "answer" && (
                    <>
                      <CardText>{t("mnemonics.answerPrompt")}</CardText>
                      <Input
                        ref={answerInputRef}
                        value={answer}
                        onChange={(e) =>
                          setAnswer(e.target.value.replace(/[^\d\s]/g, ""))
                        }
                        placeholder={t("mnemonics.answerPlaceholder")}
                        inputMode="numeric"
                      />
                      <Actions>
                        <PrimaryButton
                          onClick={handleCheck}
                          disabled={!answer.trim()}
                        >
                          {t("mnemonics.actions.check")}
                        </PrimaryButton>
                      </Actions>
                    </>
                  )}

                  {phase === "review" && latestResult && (
                    <>
                      <ResultBanner $correct={latestResult.correct}>
                        <ResultTitle $correct={latestResult.correct}>
                          {latestResult.correct
                            ? t("mnemonics.review.correct")
                            : t("mnemonics.review.wrong")}
                        </ResultTitle>
                        <ResultLine>
                          {t("mnemonics.review.yourAnswer")}:{" "}
                          {latestResult.actual || t("mnemonics.review.empty")}
                        </ResultLine>
                        <ResultLine>
                          {t("mnemonics.review.correctAnswer")}:{" "}
                          {latestResult.expected}
                        </ResultLine>
                      </ResultBanner>

                      <Actions>
                        <PrimaryButton onClick={handleNext}>
                          {currentRound >= items.length - 1
                            ? t("mnemonics.actions.finish")
                            : t("mnemonics.actions.next")}
                        </PrimaryButton>
                      </Actions>
                    </>
                  )}

                  {phase === "finished" && (
                    <>
                      <ResultBanner $correct={percent >= 60}>
                        <ResultTitle $correct={percent >= 60}>
                          {t("mnemonics.summary.title")}
                        </ResultTitle>
                        <ResultLine>
                          {t("mnemonics.summary.score", {
                            correct: correctCount,
                            total: results.length,
                            percent,
                          })}
                        </ResultLine>
                      </ResultBanner>

                      <SummaryList>
                        {results.map((item) => (
                          <SummaryRow key={item.round}>
                            <SummaryValue>
                              {t("mnemonics.summary.roundLabel", {
                                count: item.round,
                              })}
                            </SummaryValue>
                            <SummaryValue>{item.expected}</SummaryValue>
                            <SummaryValue>
                              {item.actual || t("mnemonics.review.empty")}
                            </SummaryValue>
                            <StatusPill $correct={item.correct}>
                              {item.correct
                                ? t("mnemonics.review.correct")
                                : t("mnemonics.review.wrong")}
                            </StatusPill>
                          </SummaryRow>
                        ))}
                      </SummaryList>

                      <Actions>
                        <PrimaryButton onClick={startDigitsExercise}>
                          {t("mnemonics.actions.retry")}
                        </PrimaryButton>
                        <SecondaryButton onClick={handleDigitsReset}>
                          <RotateCcw size={14} />
                          {t("mnemonics.actions.reset")}
                        </SecondaryButton>
                      </Actions>
                    </>
                  )}
                </Stage>
              )}
            </>
          ) : (
            <>
              <CardTitle>{t("mnemonics.sequenceMemory.title")}</CardTitle>
              <CardText>{t("mnemonics.sequenceMemory.description")}</CardText>

              {sequencePhase === "idle" && (
                <>
                  <OptionGrid>
                    <Field>
                      <FieldLabel>{t("mnemonics.sequenceMemory.startFrom")}</FieldLabel>
                      <ConfigInput
                        type="number"
                        value={sequenceStart}
                        onChange={(e) => setSequenceStart(Number(e.target.value))}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>{t("mnemonics.sequenceMemory.endAt")}</FieldLabel>
                      <ConfigInput
                        type="number"
                        value={sequenceEnd}
                        onChange={(e) => setSequenceEnd(Number(e.target.value))}
                      />
                    </Field>
                    <Field>
                      <FieldLabel>{t("mnemonics.sequenceMemory.totalNumbers")}</FieldLabel>
                      <Select
                        value={sequenceCount}
                        onChange={(e) => setSequenceCount(Number(e.target.value))}
                      >
                        {SEQUENCE_COUNT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {t("mnemonics.sequenceMemory.totalOption", {
                              count: option,
                            })}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field>
                      <FieldLabel>{t("mnemonics.sequenceMemory.showTime")}</FieldLabel>
                      <Select
                        value={sequenceRevealSeconds}
                        onChange={(e) =>
                          setSequenceRevealSeconds(Number(e.target.value))
                        }
                      >
                        {SEQUENCE_TIME_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {t("mnemonics.fields.showTimeValue", { count: option })}
                          </option>
                        ))}
                      </Select>
                    </Field>
                  </OptionGrid>

                  <CardText>
                    {t("mnemonics.sequenceMemory.helper", {
                      count: sequenceCountLimit,
                      start: Math.min(sequenceStart, sequenceEnd),
                      end: Math.max(sequenceStart, sequenceEnd),
                    })}
                  </CardText>

                  <PrimaryButton onClick={startSequenceExercise}>
                    {t("mnemonics.actions.start")}
                  </PrimaryButton>
                </>
              )}

              {sequencePhase !== "idle" && (
                <Stage>
                  <StatsRow>
                    <StatChip>
                      <ListOrdered size={14} />
                      {t("mnemonics.sequenceMemory.countLabel", {
                        count: sequenceItems.length,
                      })}
                    </StatChip>
                    <StatChip>
                      <Brain size={14} />
                      {t("mnemonics.sequenceMemory.rangeLabel", {
                        start: Math.min(sequenceStart, sequenceEnd),
                        end: Math.max(sequenceStart, sequenceEnd),
                      })}
                    </StatChip>
                  </StatsRow>

                  {sequencePhase === "memorize" && (
                    <>
                      <CardText>
                        {t("mnemonics.sequenceMemory.memorizePrompt")}
                      </CardText>
                      <NumberBox>{currentSequenceValue}</NumberBox>
                      <Countdown>
                        {t("mnemonics.countdown", {
                          count: sequenceRemainingSeconds,
                        })}
                      </Countdown>
                    </>
                  )}

                  {sequencePhase === "answer" && (
                    <>
                      <CardText>
                        {t("mnemonics.sequenceMemory.answerPrompt")}
                      </CardText>
                      <Input
                        ref={sequenceInputRef}
                        value={sequenceAnswer}
                        onChange={(e) =>
                          setSequenceAnswer(e.target.value.replace(/[^\d\s,;-]/g, ""))
                        }
                        placeholder={t(
                          "mnemonics.sequenceMemory.answerPlaceholder",
                        )}
                        inputMode="numeric"
                      />
                      <Actions>
                        <PrimaryButton
                          onClick={handleSequenceCheck}
                          disabled={!sequenceAnswer.trim()}
                        >
                          {t("mnemonics.actions.check")}
                        </PrimaryButton>
                      </Actions>
                    </>
                  )}

                  {sequencePhase === "finished" && sequenceResult && (
                    <>
                      <ResultBanner $correct={sequenceResult.correct}>
                        <ResultTitle $correct={sequenceResult.correct}>
                          {sequenceResult.correct
                            ? t("mnemonics.review.correct")
                            : t("mnemonics.review.wrong")}
                        </ResultTitle>
                        <ResultLine>
                          {t("mnemonics.review.yourAnswer")}:{" "}
                          {sequenceResult.actual || t("mnemonics.review.empty")}
                        </ResultLine>
                        <ResultLine>
                          {t("mnemonics.review.correctAnswer")}:{" "}
                          {sequenceResult.expected}
                        </ResultLine>
                      </ResultBanner>

                      <Actions>
                        <PrimaryButton onClick={startSequenceExercise}>
                          {t("mnemonics.actions.retry")}
                        </PrimaryButton>
                        <SecondaryButton onClick={handleSequenceReset}>
                          <RotateCcw size={14} />
                          {t("mnemonics.actions.reset")}
                        </SecondaryButton>
                      </Actions>
                    </>
                  )}
                </Stage>
              )}
            </>
          )}
        </Card>

        <Card>
          <CardTitle>{t("mnemonics.howItWorks.title")}</CardTitle>
          <HintList>
            <li>{t("mnemonics.howItWorks.step1")}</li>
            <li>{t("mnemonics.howItWorks.step2")}</li>
            <li>{t("mnemonics.howItWorks.step3")}</li>
            <li>{t("mnemonics.howItWorks.step4")}</li>
          </HintList>

          <StatsRow>
            <StatChip>
              <Brain size={14} />
              {t("mnemonics.tags.frontOnly")}
            </StatChip>
            <StatChip>
              <Timer size={14} />
              {t("mnemonics.tags.notSaved")}
            </StatChip>
          </StatsRow>
        </Card>
      </Grid>
    </Panel>
  );
};

export default MnemonicsPanel;
