import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Check, ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../../store/authStore";
import UserNameWithDecoration from "../../../shared/ui/users/UserNameWithDecoration";
import {
  fetchMnemonicLeaderboard,
  saveMnemonicBestResult,
} from "../../../api/arenaApi";
import ArenaHeader from "./ArenaHeader";
import   {SidebarIconButton}  from "../../../shared/ui/buttons/IconButton";
import { getMnemonicWords, MNEMONIC_WORD_POOL_SIZE } from "../data/mnemonicWordPool";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../shared/ui/dialogs/ModalShell";
import {
  ConfigActions,
  ConfigGrid,
  ConfigHint,
  ConfigInput,
  ConfigLabel,
  ConfigRow,
  DigitCell,
  DigitGrid,
  DigitIndex,
  FinishedButton,
  Keypad,
  KeypadButton,
  LeaderboardAvatar,
  LeaderboardCard,
  LeaderboardEmpty,
  LeaderboardHeader,
  LeaderboardHint,
  LeaderboardList,
  LeaderboardMetric,
  LeaderboardName,
  LeaderboardRank,
  LeaderboardRow,
  LeaderboardTitle,
  LeaderboardUser,
  MnemonicsPanelShell,
  ModeTab,
  ModeTabs,
  NumberStage,
  NumberValue,
  ResultCell,
  ResultGrid,
  ResultPanel,
  SecondaryAction,
  SetupCard,
  SetupTitle,
  StageHeader,
  StageMeta,
  StageMetaValue,
  StagePanel,
  StageTitle,
  TopActionButton,
  TrainingCanvas,
  WordInput,
  WordInputGrid,
  WordInputRow,
  WordPreviewColumn,
  WordPreviewItem,
  WordStage,
} from "../styles/MnemonicsPanel.styles";

const MAX_ITEMS = 40;
const PREPARE_SECONDS = 10;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const formatCountdown = (value) => {
  const safeValue = Math.max(0, value);
  const minutes = Math.floor(safeValue / 60);
  const seconds = safeValue % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const formatMemorizeSeconds = (value, t) =>
  `${(Math.max(0, value) / 1000).toFixed(2)} ${t("mnemonics.secondsShort")}`;

const createDigits = (count) =>
  Array.from({ length: count }, () => String(Math.floor(Math.random() * 10)));

const normalizeWord = (value) => value.trim().replace(/\s+/g, " ").toLowerCase();

const chunkItems = (items, size) => {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
};

const ModalHeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const TimerBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 10px;
  background: color-mix(in srgb, var(--input-color) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--border-color) 78%, transparent);
  color: var(--text-color);
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
`;

const MnemonicsPanel = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const authToken = useAuthStore((state) => state.token);
  const currentUser = useAuthStore((state) => state.user);
  const digitCellRefs = useRef([]);
  const [mode, setMode] = useState("digits");
  const [itemCount, setItemCount] = useState(8);
  const [memorizeSeconds, setMemorizeSeconds] = useState(60);
  const [recallSeconds, setRecallSeconds] = useState(240);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState("");

  const [phase, setPhase] = useState("setup");
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enteredItems, setEnteredItems] = useState([]);
  const [stageSeconds, setStageSeconds] = useState(PREPARE_SECONDS);
  const [elapsedMemorizeMs, setElapsedMemorizeMs] = useState(0);
  const [result, setResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUserBest, setCurrentUserBest] = useState(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const parsedAutoAdvance = useMemo(() => {
    if (!autoAdvanceSeconds) return null;
    const numeric = Number(autoAdvanceSeconds);
    if (!Number.isFinite(numeric) || numeric <= 0) return null;
    return numeric;
  }, [autoAdvanceSeconds]);

  const normalizedLanguage = useMemo(
    () => (i18n.resolvedLanguage || i18n.language || "en").split("-")[0],
    [i18n.language, i18n.resolvedLanguage],
  );

  const currentItem = items[currentIndex] || "";
  const wordColumns = useMemo(() => chunkItems(items, 10), [items]);
  const recallColumns = useMemo(() => chunkItems(enteredItems, 10), [enteredItems]);
  const headerTimerValue = useMemo(() => {
    if (
      phase === "prepare-memorize" ||
      phase === "memorize" ||
      phase === "prepare-recall" ||
      phase === "recall"
    ) {
      return formatCountdown(stageSeconds);
    }

    if (phase === "result") {
      const elapsedSeconds = Math.max(1, Math.ceil(elapsedMemorizeMs / 1000));
      return `${elapsedSeconds} ${t("mnemonics.secondsShort")}`;
    }

    return null;
  }, [elapsedMemorizeMs, phase, stageSeconds, t]);

  const loadLeaderboard = async (nextMode = mode) => {
    try {
      setLeaderboardLoading(true);
      const data = await fetchMnemonicLeaderboard(nextMode);
      setLeaderboard(Array.isArray(data?.leaderboard) ? data.leaderboard : []);
      setCurrentUserBest(data?.currentUserBest || null);
    } catch {
      setLeaderboard([]);
      setCurrentUserBest(null);
    } finally {
      setLeaderboardLoading(false);
    }
  };

  useEffect(() => {
    if (
      phase !== "prepare-memorize" &&
      phase !== "memorize" &&
      phase !== "prepare-recall" &&
      phase !== "recall"
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setStageSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);

          if (phase === "prepare-memorize") {
            setPhase("memorize");
            return memorizeSeconds;
          }

          if (phase === "memorize") {
            setPhase("prepare-recall");
            setCurrentIndex(0);
            return PREPARE_SECONDS;
          }

          if (phase === "prepare-recall") {
            setPhase("recall");
            setCurrentIndex(0);
            return recallSeconds;
          }

          if (phase === "recall") {
            finishRecall();
            return 0;
          }
        }

        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [phase, memorizeSeconds, recallSeconds]);

  useEffect(() => {
    if (phase !== "memorize") return undefined;

    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      setElapsedMemorizeMs(Date.now() - startedAt);
    }, 100);

    return () => window.clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "memorize" || !parsedAutoAdvance || items.length <= 1) {
      return undefined;
    }

    const perItemMs = Math.max(
      500,
      Math.round((parsedAutoAdvance * 1000) / items.length),
    );

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, perItemMs);

    return () => window.clearInterval(interval);
  }, [phase, parsedAutoAdvance, items.length]);

  useEffect(() => {
    if (mode !== "digits") return;
    if (phase !== "memorize" && phase !== "recall") return;

    const activeNode = digitCellRefs.current[currentIndex];
    if (!activeNode) return;

    activeNode.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: "smooth",
    });
  }, [currentIndex, mode, phase]);

  useEffect(() => {
    loadLeaderboard(mode);
  }, [mode]);

  const createTrainingItems = (count) => {
    if (mode === "words") {
      return getMnemonicWords(normalizedLanguage, count);
    }
    return createDigits(count);
  };

  const startTraining = () => {
    const safeCount = clamp(Number(itemCount) || 8, 1, MAX_ITEMS);
    const safeMemorize = clamp(Number(memorizeSeconds) || 60, 5, 3600);
    const safeRecall = clamp(Number(recallSeconds) || 240, 5, 3600);
    const nextItems = createTrainingItems(safeCount);

    setItemCount(safeCount);
    setMemorizeSeconds(safeMemorize);
    setRecallSeconds(safeRecall);
    setItems(nextItems);
    setEnteredItems(Array.from({ length: safeCount }, () => ""));
    setCurrentIndex(0);
    setElapsedMemorizeMs(0);
    setResult(null);
    setStageSeconds(PREPARE_SECONDS);
    setPhase("prepare-memorize");
    setIsDialogOpen(true);
  };

  const finishMemorize = () => {
    setPhase("prepare-recall");
    setCurrentIndex(0);
    setStageSeconds(PREPARE_SECONDS);
  };

  const finishRecall = () => {
    const score = items.reduce((acc, item, index) => {
      if (mode === "words") {
        return acc + (normalizeWord(enteredItems[index]) === normalizeWord(item) ? 1 : 0);
      }
      return acc + (enteredItems[index] === item ? 1 : 0);
    }, 0);

    const nextResult = {
      score,
      total: items.length,
      expected: items,
      actual: enteredItems,
      elapsedMemorizeMs,
    };

    setResult(nextResult);
    setPhase("result");

    if (authToken) {
      saveMnemonicBestResult({
        mode,
        score: nextResult.score,
        total: nextResult.total,
        elapsedMemorizeMs: nextResult.elapsedMemorizeMs,
      })
        .then(() => loadLeaderboard(mode))
        .catch(() => undefined);
    }
  };

  const resetTraining = () => {
    setPhase("setup");
    setItems([]);
    setEnteredItems([]);
    setCurrentIndex(0);
    setStageSeconds(PREPARE_SECONDS);
    setElapsedMemorizeMs(0);
    setResult(null);
    setIsDialogOpen(false);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setPhase("setup");
    setItems([]);
    setEnteredItems([]);
    setCurrentIndex(0);
    setStageSeconds(PREPARE_SECONDS);
    setElapsedMemorizeMs(0);
    setResult(null);
  };

  const moveCurrentIndex = (direction) => {
    setCurrentIndex((prev) => clamp(prev + direction, 0, items.length - 1));
  };

  const handleDigitInput = (digit) => {
    if (phase !== "recall" || mode !== "digits") return;

    setEnteredItems((prev) => {
      const next = [...prev];
      next[currentIndex] = String(digit);
      return next;
    });

    setCurrentIndex((prev) => Math.min(prev + 1, items.length - 1));
  };

  const clearCurrentItem = () => {
    if (phase !== "recall") return;

    setEnteredItems((prev) => {
      const next = [...prev];
      next[currentIndex] = "";
      return next;
    });
  };

  const skipToNextPhase = () => {
    if (phase === "prepare-memorize") {
      setPhase("memorize");
      setStageSeconds(memorizeSeconds);
      return;
    }

    if (phase === "prepare-recall") {
      setPhase("recall");
      setCurrentIndex(0);
      setStageSeconds(recallSeconds);
    }
  };

  const renderModeTabs = () => (
    <ModeTabs>
      <ModeTab
        type="button"
        $active={mode === "digits"}
        onClick={() => setMode("digits")}
      >
        {t("mnemonics.modes.digits")}
      </ModeTab>
      <ModeTab
        type="button"
        $active={mode === "words"}
        onClick={() => setMode("words")}
      >
        {t("mnemonics.modes.words")}
      </ModeTab>
    </ModeTabs>
  );

  const renderLeaderboard = () => (
    <LeaderboardCard>
      <LeaderboardHeader>
        <LeaderboardTitle>{t("mnemonics.leaderboard.title")}</LeaderboardTitle>
        <LeaderboardHint>{t("mnemonics.leaderboard.sorting")}</LeaderboardHint>
      </LeaderboardHeader>

      {currentUserBest ? (
        <LeaderboardRow $highlight>
          <LeaderboardRank>#{currentUserBest.rank}</LeaderboardRank>
          <LeaderboardUser>
            <LeaderboardAvatar>
              {(currentUserBest.user?.avatar || currentUser?.avatar) ? (
                <img
                  src={currentUserBest.user?.avatar || currentUser?.avatar}
                  alt={
                    currentUserBest.user?.nickname ||
                    currentUserBest.user?.username ||
                    currentUser?.nickname ||
                    currentUser?.username ||
                    "You"
                  }
                />
              ) : (
                (
                  currentUserBest.user?.nickname ||
                  currentUserBest.user?.username ||
                  currentUser?.nickname ||
                  currentUser?.username ||
                  "Y"
                )
                  .slice(0, 1)
                  .toUpperCase()
              )}
            </LeaderboardAvatar>
            <LeaderboardName>
              <UserNameWithDecoration
                user={currentUserBest.user || currentUser}
                fallback={t("common.you")}
                size="sm"
              />
              <span>{t("mnemonics.leaderboard.yourBest")}</span>
            </LeaderboardName>
          </LeaderboardUser>
          <LeaderboardMetric>
            {currentUserBest.score}/{currentUserBest.total}
          </LeaderboardMetric>
          <LeaderboardMetric>
            {formatMemorizeSeconds(currentUserBest.elapsedMemorizeMs, t)}
          </LeaderboardMetric>
        </LeaderboardRow>
      ) : null}

      {leaderboardLoading ? (
        <LeaderboardEmpty>{t("mnemonics.leaderboard.loading")}</LeaderboardEmpty>
      ) : leaderboard.length ? (
        <LeaderboardList>
          {leaderboard.slice(0, 10).map((item) => {
            const user = item.user || {};
            const isCurrent =
              String(user?._id || "") === String(currentUser?._id || currentUser?.id || "");

            return (
              <LeaderboardRow key={`${item.rank}-${user?._id || "guest"}`} $highlight={isCurrent}>
                <LeaderboardRank>#{item.rank}</LeaderboardRank>
                <LeaderboardUser>
                  <LeaderboardAvatar>
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.nickname || user.username || "U"}
                      />
                    ) : (
                      (user?.nickname || user?.username || "U").slice(0, 1).toUpperCase()
                    )}
                  </LeaderboardAvatar>
                  <LeaderboardName>
                    <UserNameWithDecoration
                      user={user}
                      fallback="User"
                      size="sm"
                    />
                    <span>{item.accuracy}%</span>
                  </LeaderboardName>
                </LeaderboardUser>
                <LeaderboardMetric>
                  {item.score}/{item.total}
                </LeaderboardMetric>
                <LeaderboardMetric>
                  {formatMemorizeSeconds(item.elapsedMemorizeMs, t)}
                </LeaderboardMetric>
              </LeaderboardRow>
            );
          })}
        </LeaderboardList>
      ) : (
        <LeaderboardEmpty>{t("mnemonics.leaderboard.empty")}</LeaderboardEmpty>
      )}
    </LeaderboardCard>
  );

  const renderSetup = () => (
    <SetupCard>
      {renderModeTabs()}

      <SetupTitle>
        {mode === "digits"
          ? t("mnemonics.numbers.title")
          : t("mnemonics.words.title")}
      </SetupTitle>

      <ConfigGrid>
        <ConfigRow>
          <ConfigLabel>
            {mode === "digits"
              ? t("mnemonics.fields.digitsToMemorize")
              : t("mnemonics.fields.wordsToMemorize")}
          </ConfigLabel>
          <ConfigInput
            type="number"
            min="1"
            max={MAX_ITEMS}
            value={itemCount}
            onChange={(event) => setItemCount(event.target.value)}
          />
        </ConfigRow>

        <ConfigRow>
          <ConfigLabel>{t("mnemonics.fields.maxMemorizationTime")}</ConfigLabel>
          <ConfigInput
            type="number"
            min="5"
            max="3600"
            value={memorizeSeconds}
            onChange={(event) => setMemorizeSeconds(event.target.value)}
          />
        </ConfigRow>

        <ConfigRow>
          <ConfigLabel>{t("mnemonics.fields.maxRecallTime")}</ConfigLabel>
          <ConfigInput
            type="number"
            min="5"
            max="3600"
            value={recallSeconds}
            onChange={(event) => setRecallSeconds(event.target.value)}
          />
        </ConfigRow>

        <ConfigRow>
          <ConfigLabel>{t("mnemonics.fields.autoAdvanceTotalTime")}</ConfigLabel>
          <ConfigInput
            type="number"
            min="1"
            max="3600"
            placeholder={t("mnemonics.fields.optional")}
            value={autoAdvanceSeconds}
            onChange={(event) => setAutoAdvanceSeconds(event.target.value)}
          />
        </ConfigRow>
      </ConfigGrid>

      <ConfigHint>
        {mode === "digits"
          ? t("mnemonics.setupHintDigits", { count: MAX_ITEMS })
          : t("mnemonics.setupHintWords", {
              count: MAX_ITEMS,
              total: MNEMONIC_WORD_POOL_SIZE,
            })}
      </ConfigHint>

      <ConfigActions>
        <TopActionButton type="button" onClick={startTraining}>
          {t("mnemonics.actions.start")}
        </TopActionButton>
      </ConfigActions>
    </SetupCard>
  );

  const renderDigitMemorize = () => (
    <>
      <DigitGrid>
        {items.map((item, index) => (
          <div
            key={`digit-memorize-${index}`}
            ref={(node) => {
              digitCellRefs.current[index] = node;
            }}
          >
            <DigitIndex>{index + 1}</DigitIndex>
            <DigitCell $active={index === currentIndex}>{item}</DigitCell>
          </div>
        ))}
      </DigitGrid>

      <NumberStage>
        <NumberValue>{currentItem}</NumberValue>
      </NumberStage>
    </>
  );

  const renderWordMemorize = () => (
    <WordStage>
      {wordColumns.map((column, columnIndex) => (
        <WordPreviewColumn key={`word-column-${columnIndex}`}>
          {column.map((item, itemIndex) => {
            const absoluteIndex = columnIndex * 10 + itemIndex;
            return (
              <WordPreviewItem
                key={`${item}-${absoluteIndex}`}
                $active={absoluteIndex === currentIndex}
              >
                <span>{absoluteIndex + 1}.</span>
                <strong>{item}</strong>
              </WordPreviewItem>
            );
          })}
        </WordPreviewColumn>
      ))}
    </WordStage>
  );

  const renderRecallInputs = () => (
    <WordInputGrid>
      {recallColumns.map((column, columnIndex) => (
        <div key={`recall-column-${columnIndex}`}>
          {column.map((value, itemIndex) => {
            const absoluteIndex = columnIndex * 10 + itemIndex;
            return (
              <WordInputRow key={`word-input-${absoluteIndex}`}>
                <DigitIndex>{absoluteIndex + 1}.</DigitIndex>
                <WordInput
                  type="text"
                  value={value}
                  $active={absoluteIndex === currentIndex}
                  onFocus={() => setCurrentIndex(absoluteIndex)}
                  onChange={(event) => {
                    const nextValue = event.target.value;
                    setEnteredItems((prev) => {
                      const next = [...prev];
                      next[absoluteIndex] = nextValue;
                      return next;
                    });
                  }}
                />
              </WordInputRow>
            );
          })}
        </div>
      ))}
    </WordInputGrid>
  );

  const renderRecallContent = () => {
    if (mode === "digits") {
      return (
        <>
          <DigitGrid>
            {enteredItems.map((item, index) => (
              <div
                key={`digit-recall-${index}`}
                ref={(node) => {
                  digitCellRefs.current[index] = node;
                }}
              >
                <DigitIndex>{index + 1}</DigitIndex>
                <DigitCell $active={index === currentIndex}>{item || ""}</DigitCell>
              </div>
            ))}
          </DigitGrid>

          <Keypad>
            {Array.from({ length: 10 }, (_, index) => (
              <KeypadButton
                key={index}
                type="button"
                onClick={() => handleDigitInput(index)}
              >
                {index}
              </KeypadButton>
            ))}
            <KeypadButton type="button" onClick={() => moveCurrentIndex(-1)}>
              <ChevronLeft size={22} />
            </KeypadButton>
            <KeypadButton type="button" onClick={() => moveCurrentIndex(1)}>
              <ChevronRight size={22} />
            </KeypadButton>
            <KeypadButton type="button" onClick={clearCurrentItem}>
              {t("mnemonics.actions.clear")}
            </KeypadButton>
          </Keypad>
        </>
      );
    }

    return renderRecallInputs();
  };

  const renderResult = () => (
    <ResultPanel>
      <ResultGrid $wide={mode === "words"}>
        {result.expected.map((item, index) => {
          const isCorrect =
            mode === "words"
              ? normalizeWord(result.actual[index]) === normalizeWord(item)
              : result.actual[index] === item;

          return (
            <ResultCell key={`result-${index}`} $correct={isCorrect} $wide={mode === "words"}>
              <span>{item}</span>
              <span>{result.actual[index] || ""}</span>
            </ResultCell>
          );
        })}
      </ResultGrid>

      <ConfigActions>
        <TopActionButton type="button" onClick={resetTraining}>
          {t("mnemonics.actions.continue")}
        </TopActionButton>
      </ConfigActions>
    </ResultPanel>
  );

  const renderStage = () => {
    const elapsedSeconds = (elapsedMemorizeMs / 1000).toFixed(2);
    const headerMeta =
      phase === "prepare-memorize"
        ? [
            {
              label: t("mnemonics.stage.memorizationStartsIn"),
              value: formatCountdown(stageSeconds),
            },
          ]
        : phase === "memorize"
          ? [
              {
                label: t("mnemonics.stage.memorizationEndsIn"),
                value: formatCountdown(stageSeconds),
              },
            ]
          : phase === "prepare-recall"
            ? [
                {
                  label: t("mnemonics.stage.time"),
                  value: `${elapsedSeconds} ${t("mnemonics.secondsShort")}`,
                },
                {
                  label: t("mnemonics.stage.recallStartsIn"),
                  value: formatCountdown(stageSeconds),
                },
              ]
            : phase === "recall"
              ? [
                  {
                    label: t("mnemonics.stage.time"),
                    value: `${elapsedSeconds} ${t("mnemonics.secondsShort")}`,
                  },
                  {
                    label: t("mnemonics.stage.recallEndsIn"),
                    value: formatCountdown(stageSeconds),
                  },
                ]
              : [
                  { label: t("mnemonics.stage.score"), value: result?.score ?? 0 },
                  {
                    label: t("mnemonics.stage.time"),
                    value: `${elapsedSeconds} ${t("mnemonics.secondsShort")}`,
                  },
                  {
                    label: t("mnemonics.stage.completed"),
                    value: t("mnemonics.stage.done"),
                  },
                ];

    return (
      <StagePanel>
        <StageHeader>
          <StageTitle>
            {mode === "digits"
              ? t("mnemonics.modes.digits")
              : t("mnemonics.modes.words")}
          </StageTitle>
          <StageMeta>
            {headerMeta.map((item) => (
              <div key={item.label}>
                {item.label}: <StageMetaValue>{item.value}</StageMetaValue>
              </div>
            ))}
          </StageMeta>
          {phase === "prepare-memorize" || phase === "prepare-recall" ? (
            <TopActionButton type="button" onClick={skipToNextPhase}>
              {t("mnemonics.actions.skip")}
            </TopActionButton>
          ) : phase === "result" ? (
            <TopActionButton type="button" onClick={resetTraining}>
              {t("mnemonics.actions.continue")}
            </TopActionButton>
          ) : (
            <FinishedButton
              type="button"
              onClick={phase === "recall" ? finishRecall : finishMemorize}
            >
              <Check size={18} />
              {t("mnemonics.actions.finished")}
            </FinishedButton>
          )}
        </StageHeader>

        <TrainingCanvas>
          {phase === "memorize" &&
            (mode === "digits" ? renderDigitMemorize() : renderWordMemorize())}
          {phase === "recall" && renderRecallContent()}
          {phase === "result" && renderResult()}
        </TrainingCanvas>

        {phase === "memorize" && (
          <Keypad>
            <KeypadButton
              type="button"
              onClick={() => moveCurrentIndex(-1)}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={22} />
            </KeypadButton>
            <KeypadButton
              type="button"
              onClick={() => moveCurrentIndex(1)}
              disabled={currentIndex === items.length - 1}
            >
              <ChevronRight size={22} />
            </KeypadButton>
          </Keypad>
        )}
      </StagePanel>
    );
  };

  return (
    <MnemonicsPanelShell>
      <ArenaHeader
        title={t("mnemonics.title")}
        onBack={onBack}
        rightContent={
          <SidebarIconButton type="button" onClick={() => setIsDialogOpen(true)}>
            <Play size={16} />
          </SidebarIconButton>
        }
      />
      {renderModeTabs()}
      {renderLeaderboard()}

      {isDialogOpen && (
        <ModalOverlay onClick={closeDialog} $zIndex={10030}>
          <ModalPanel
            role="dialog"
            aria-modal="true"
            $width={phase === "setup" ? "min(100%, 760px)" : "min(100%, 1320px)"}
            $maxHeight="92vh"
            $mobileFull
            onClick={(event) => event.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitleBlock>
                <ModalTitle>{t("mnemonics.title")}</ModalTitle>
                <ModalSubtitle>
                  {phase === "setup"
                    ? t("mnemonics.description")
                    : mode === "digits"
                      ? t("mnemonics.numbers.title")
                      : t("mnemonics.words.title")}
                </ModalSubtitle>
              </ModalTitleBlock>
              <ModalHeaderActions>
                {headerTimerValue ? <TimerBadge>{headerTimerValue}</TimerBadge> : null}
                <ModalCloseButton type="button" onClick={closeDialog}>
                  <X size={18} />
                </ModalCloseButton>
              </ModalHeaderActions>
            </ModalHeader>
            <ModalBody $padding={phase === "setup" ? "16px" : "16px 16px 20px"}>
              {phase === "setup" ? renderSetup() : renderStage()}
            </ModalBody>
          </ModalPanel>
        </ModalOverlay>
      )}
    </MnemonicsPanelShell>
  );
};

export default MnemonicsPanel;
