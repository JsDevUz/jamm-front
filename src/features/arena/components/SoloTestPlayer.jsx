import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ArrowLeft, CheckCircle, XCircle, Timer } from "lucide-react";
import useAuthStore from "../../../store/authStore";
import { useArena } from "../../../contexts/ArenaContext";
import { submitTestAnswers } from "../../../api/arenaApi";
import axios from "axios";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 100%;
    border-radius: 0;
    border: none;
    padding: 16px;
    z-index: 100;
    overflow-y: auto;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color);
  flex-wrap: wrap; /* allow wrapping on mobile */

  position: sticky;
  top: -32px;
  margin-top: -32px;
  padding-top: 32px;
  background-color: var(--tertiary-color);
  z-index: 10;

  @media (max-width: 768px) {
    top: -16px;
    margin-top: -16px;
    padding-top: 16px;
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const BackBtn = styled.button`
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  &:hover {
    color: var(--text-color);
  }
`;

const Title = styled.h2`
  margin: 0;
  color: var(--text-color);
  font-size: 1.5rem;
  flex: 1 1 100%; /* take full width on mobile if it wraps */
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (min-width: 768px) {
    flex: 1; /* take remaining space next to back btn on desktop */
  }
`;

const QuestionBox = styled.div`
  background: var(--bg-color);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 16px;
  }
`;

const QuestionText = styled.h3`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: var(--text-color);
  font-weight: 500;
`;

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionBtn = styled.button`
  padding: 14px 20px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => {
      if (props.isRevealed && props.showResults) {
        if (props.isCorrect) return "#2ecc71"; // Green if correct
        if (props.isSelected) return "#e74c3c"; // Red if wrong and selected
      }
      return props.isSelected ? "var(--primary-color)" : "var(--border-color)";
    }};
  background-color: ${(props) => {
    if (props.isRevealed && props.showResults) {
      if (props.isCorrect) return "rgba(46, 204, 113, 0.05)";
      if (props.isSelected) return "rgba(231, 76, 60, 0.05)";
    }
    return props.isSelected
      ? "rgba(var(--primary-color-rgb), 0.05)"
      : "var(--bg-color)";
  }};
  color: var(--text-color);
  font-size: 1.05rem;
  text-align: left;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    border-color: ${(props) => (props.disabled ? "" : "var(--primary-color)")};
    background-color: ${(props) =>
      props.disabled ? "" : "rgba(var(--primary-color-rgb), 0.02)"};
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 12px;
  }
`;

const OptionLetter = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  font-weight: 600;
  flex-shrink: 0;
  border: 1px solid
    ${(props) => {
      if (props.isRevealed && props.showResults) {
        if (props.isCorrect) return "#2ecc71";
        if (props.isSelected) return "#e74c3c";
      }
      return props.isSelected ? "var(--primary-color)" : "var(--border-color)";
    }};
  background-color: ${(props) => {
    if (props.isRevealed && props.showResults) {
      if (props.isCorrect) return "#2ecc71";
      if (props.isSelected) return "#e74c3c";
    }
    return props.isSelected ? "var(--primary-color)" : "transparent";
  }};
  color: ${(props) => {
    if (
      props.isRevealed &&
      props.showResults &&
      (props.isCorrect || props.isSelected)
    )
      return "#fff";
    return props.isSelected ? "#fff" : "var(--text-muted-color)";
  }};
  transition: all 0.2s;
`;

const OptionText = styled.span`
  flex: 1;
  line-height: 1.5;
`;

const ResultScreen = styled.div`
  text-align: center;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const ScoreText = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: var(--primary-color);
`;

const ResultBreakdown = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
`;

const ResultQuestionCard = styled.div`
  background-color: var(--bg-color);
  border: 1px solid
    ${(props) => (props.$correct ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.28)")};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ResultQuestionTitle = styled.div`
  color: var(--text-color);
  font-weight: 700;
  line-height: 1.5;
`;

const ResultRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  color: var(--text-muted-color);
  font-size: 0.95rem;
`;

const ResultBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
  background-color: ${(props) =>
    props.$correct ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)"};
  color: ${(props) => (props.$correct ? "#22c55e" : "#ef4444")};
`;

const ResultOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResultOptionItem = styled.div`
  border: 1px solid
    ${(props) => {
      if (props.$isCorrect) return "rgba(34, 197, 94, 0.3)";
      if (props.$isSelected) return "rgba(239, 68, 68, 0.28)";
      return "var(--border-color)";
    }};
  background-color: ${(props) => {
    if (props.$isCorrect) return "rgba(34, 197, 94, 0.08)";
    if (props.$isSelected) return "rgba(239, 68, 68, 0.08)";
    return "var(--tertiary-color)";
  }};
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const ResultOptionText = styled.div`
  color: var(--text-color);
  line-height: 1.45;
`;

const ResultOptionMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const ResultOptionTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
  background-color: ${(props) => {
    if (props.$tone === "correct") return "rgba(34, 197, 94, 0.12)";
    if (props.$tone === "selected") return "rgba(239, 68, 68, 0.12)";
    if (props.$tone === "selected-correct") return "rgba(59, 130, 246, 0.12)";
    return "var(--secondary-color)";
  }};
  color: ${(props) => {
    if (props.$tone === "correct") return "#22c55e";
    if (props.$tone === "selected") return "#ef4444";
    if (props.$tone === "selected-correct") return "#60a5fa";
    return "var(--text-muted-color)";
  }};
`;

const PrimaryBtn = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
`;

const JoinBox = styled.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  padding: 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
`;

const Input = styled.input`
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${(props) => props.bgColor || "var(--primary-color)"};
  color: white;
  border: none;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;

/* ── Exit Confirmation Modal ── */
const ConfirmOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ConfirmBox = styled.div`
  background: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ConfirmTitle = styled.h3`
  margin: 0;
  color: var(--text-color);
  font-size: 1.2rem;
`;

const ConfirmText = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 0.95rem;
  line-height: 1.5;
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const ConfirmBtn = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    filter: brightness(1.1);
  }
`;

const ConfirmBtnPrimary = styled(ConfirmBtn)`
  background: var(--primary-color);
  color: white;
`;

const ConfirmBtnDanger = styled(ConfirmBtn)`
  background: rgba(240, 71, 71, 0.15);
  color: #f04747;
  border: 1px solid rgba(240, 71, 71, 0.3);
`;

const SoloTestPlayer = ({ test, onClose, shareShortCode = null }) => {
  const configuredTimeLimit = Number(test.timeLimit) || 0;
  const configuredShowResults = test.showResults ?? true;
  const displayMode = test.displayMode || "single";

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [tempGuestName, setTempGuestName] = useState("");
  const [serverResults, setServerResults] = useState(null); // { score, total, results: [{questionIndex, correct, correctOptionIndex}] }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);

  // Timer State
  const [timeLeft, setTimeLeft] = useState(configuredTimeLimit * 60);

  // Answers tracking (both modes)
  const [singleAnswers, setSingleAnswers] = useState([]);
  const [listAnswers, setListAnswers] = useState({});

  const { user, token } = useAuthStore();
  const { guestName, setGuestSession } = useArena();

  const questions = test.questions || [];
  const currentQ = questions[currentIdx];

  // Build current answers array
  const getCurrentAnswers = useCallback(() => {
    if (displayMode === "list") {
      return questions.map((_, idx) => listAnswers[idx] ?? -1);
    } else {
      return questions.map((_, i) => singleAnswers[i] ?? -1);
    }
  }, [displayMode, questions, listAnswers, singleAnswers]);

  // Handle exit confirmation — submit current answers and close
  const handleExitConfirm = useCallback(() => {
    setShowExitConfirm(false);
    const answers = getCurrentAnswers();
    submitToServer(answers);
  }, [getCurrentAnswers]);

  // Warn on browser refresh / tab close
  useEffect(() => {
    if (isFinished) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      // Submit current answers via fetch with keepalive
      const answers = getCurrentAnswers();
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const payload = JSON.stringify({
        answers,
        shareShortCode: shareShortCode || null,
      });

      const headers = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      console.log(test);

      fetch(`${API_URL}/arena/tests/${test._id}/submit`, {
        method: "POST",
        headers,
        body: payload,
        keepalive: true,
      }).catch(() => {});
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFinished, getCurrentAnswers, test._id, token]);

  // Submit answers to server for validation
  const submitToServer = async (answers) => {
    setIsSubmitting(true);
    setSubmittedAnswers(answers);
    try {
      const result = await submitTestAnswers(test._id, {
        answers,
        shareShortCode: shareShortCode || null,
      });
      setServerResults(result);
      setScore(result.score);
    } catch (err) {
      console.error("Failed to submit answers:", err);
      // Fallback: just show finished without score details
      setScore(0);
    } finally {
      setIsSubmitting(false);
      setIsFinished(true);
    }
  };

  // Timer Effect
  useEffect(() => {
    if (configuredTimeLimit > 0 && !isFinished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (configuredTimeLimit > 0 && timeLeft <= 0 && !isFinished) {
      if (displayMode === "list") {
        handleListSubmit();
      } else {
        // For single mode: submit whatever was answered so far
        const answers = questions.map((_, i) => singleAnswers[i] ?? -1);
        submitToServer(answers);
      }
    }
  }, [configuredTimeLimit, timeLeft, isFinished, displayMode]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  useEffect(() => {
    if (isFinished && !hasSaved) {
      const effectiveShowResults = serverResults?.showResults ?? configuredShowResults;
      if (effectiveShowResults && !serverResults) return;

      const isUser = !!user;
      const canSave = isUser || guestName;

      if (canSave) {
        setHasSaved(true);
        const saveHistory = async () => {
          try {
            const API_URL =
              import.meta.env.VITE_API_URL || "http://localhost:3000";

            await axios.post(
              `${API_URL}/arena/battles/save-solo`,
              {
                testId: test._id,
                score: score,
                totalQuestions: questions.length,
                guestName: isUser ? null : guestName,
                answers: submittedAnswers,
                results: effectiveShowResults ? serverResults?.results || [] : [],
                shareShortCode: shareShortCode || null,
              },
              {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
              },
            );
          } catch (error) {
            console.error("Yakkalik test natijasini saqlashda xatolik:", error);
          }
        };
        saveHistory();
      }
    }
  }, [
    isFinished,
    hasSaved,
    user,
    token,
    guestName,
    test._id,
    score,
    questions.length,
    submittedAnswers,
    serverResults,
    configuredShowResults,
    shareShortCode,
  ]);

  useEffect(() => {
    setTimeLeft(configuredTimeLimit * 60);
  }, [configuredTimeLimit, test._id]);

  const showResults = serverResults?.showResults ?? configuredShowResults;

  const handleSelect = (idx) => {
    if (isRevealed) return;
    setSelectedOption(idx);
    setIsRevealed(true);

    // Track answer (no local scoring)
    const newAnswers = [...singleAnswers];
    newAnswers[currentIdx] = idx;
    setSingleAnswers(newAnswers);

    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(currentIdx + 1);
        setSelectedOption(null);
        setIsRevealed(false);
      } else {
        // All questions done — submit to server
        const finalAnswers = questions.map((_, i) =>
          i === currentIdx ? idx : (newAnswers[i] ?? -1),
        );
        submitToServer(finalAnswers);
      }
    }, 300);
  };

  const handleListSelect = (qIndex, oIndex) => {
    if (isFinished) return;
    setListAnswers((prev) => ({ ...prev, [qIndex]: oIndex }));
  };

  const handleListSubmit = () => {
    if (isFinished) return;
    const answers = questions.map((_, idx) => listAnswers[idx] ?? -1);
    submitToServer(answers);
  };

  if (!token && !guestName) {
    return (
      <Container>
        <JoinBox>
          <h2>Ismingizni kiriting</h2>
          <p style={{ color: "var(--text-muted-color)", margin: 0 }}>
            Testda qatnashish uchun ismingizni kiriting.
          </p>
          <Input
            placeholder="Ismingiz..."
            value={tempGuestName}
            onChange={(e) => setTempGuestName(e.target.value)}
          />
          <Button
            onClick={() =>
              tempGuestName.trim() && setGuestSession(tempGuestName.trim())
            }
          >
            Kirish
          </Button>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted-color)",
              cursor: "pointer",
            }}
          >
            Bekor qilish
          </button>
        </JoinBox>
      </Container>
    );
  }

  if (isSubmitting) {
    return (
      <Container>
        <ResultScreen>
          <h2>Javoblar tekshirilmoqda...</h2>
        </ResultScreen>
      </Container>
    );
  }

  if (isFinished) {
    return (
      <Container>
        <ResultScreen>
          <h2>Test yakunlandi!</h2>
          {showResults && serverResults ? (
            <>
              <ScoreText>
                {serverResults.score} / {serverResults.total}
              </ScoreText>
              <p style={{ color: "var(--text-muted-color)" }}>
                To'g'ri javoblar
              </p>
              <ResultBreakdown>
                {questions.map((question, index) => {
                  const resultItem = serverResults.results?.find(
                    (item) => item.questionIndex === index,
                  );
                  const selectedIndex = submittedAnswers[index];

                  return (
                    <ResultQuestionCard
                      key={question._id || index}
                      $correct={Boolean(resultItem?.correct)}
                    >
                      <ResultRow>
                        <ResultQuestionTitle>
                          {index + 1}. {question.questionText}
                        </ResultQuestionTitle>
                        <ResultBadge $correct={Boolean(resultItem?.correct)}>
                          {resultItem?.correct ? (
                            <>
                              <CheckCircle size={14} /> To'g'ri
                            </>
                          ) : (
                            <>
                              <XCircle size={14} /> Xato
                            </>
                          )}
                        </ResultBadge>
                      </ResultRow>
                      <ResultRow>
                        <span>
                          Sizning javobingiz:{" "}
                          <strong style={{ color: "var(--text-color)" }}>
                            {selectedIndex >= 0
                              ? question.options?.[selectedIndex]
                              : "Javob berilmagan"}
                          </strong>
                        </span>
                      </ResultRow>
                      <ResultRow>
                        <span>
                          To'g'ri javob:{" "}
                          <strong style={{ color: "#22c55e" }}>
                            {resultItem?.correctOptionIndex >= 0
                              ? question.options?.[resultItem.correctOptionIndex]
                              : "Ma'lumot yo'q"}
                          </strong>
                        </span>
                      </ResultRow>
                      <ResultOptionsList>
                        {(question.options || []).map((option, optionIndex) => {
                          const isSelected = selectedIndex === optionIndex;
                          const isCorrect =
                            resultItem?.correctOptionIndex === optionIndex;
                          const tone =
                            isSelected && isCorrect
                              ? "selected-correct"
                              : isCorrect
                                ? "correct"
                                : isSelected
                                  ? "selected"
                                  : "default";

                          return (
                            <ResultOptionItem
                              key={`${question._id || index}-${optionIndex}`}
                              $isSelected={isSelected}
                              $isCorrect={isCorrect}
                            >
                              <ResultOptionText>
                                {String.fromCharCode(65 + optionIndex)}. {option}
                              </ResultOptionText>
                              {(isSelected || isCorrect) && (
                                <ResultOptionMeta>
                                  {isSelected && isCorrect ? (
                                    <ResultOptionTag $tone={tone}>
                                      <CheckCircle size={12} />
                                      Siz tanlagan va to'g'ri
                                    </ResultOptionTag>
                                  ) : (
                                    <>
                                      {isSelected && (
                                        <ResultOptionTag $tone="selected">
                                          <XCircle size={12} />
                                          Siz tanlagan
                                        </ResultOptionTag>
                                      )}
                                      {isCorrect && (
                                        <ResultOptionTag $tone="correct">
                                          <CheckCircle size={12} />
                                          To'g'ri javob
                                        </ResultOptionTag>
                                      )}
                                    </>
                                  )}
                                </ResultOptionMeta>
                              )}
                            </ResultOptionItem>
                          );
                        })}
                      </ResultOptionsList>
                    </ResultQuestionCard>
                  );
                })}
              </ResultBreakdown>
            </>
          ) : (
            <>
              <CheckCircle size={64} color="var(--primary-color)" />
              <p
                style={{ color: "var(--text-muted-color)", fontSize: "1.2rem" }}
              >
                Javoblaringiz saqlandi.
              </p>
            </>
          )}
          <PrimaryBtn onClick={onClose}>Testlar ro'yxatiga qaytish</PrimaryBtn>
        </ResultScreen>
      </Container>
    );
  }

  if (!currentQ) return null;

  return (
    <Container style={displayMode === "list" ? { maxWidth: "900px" } : {}}>
      <Header>
        <BackBtn onClick={() => setShowExitConfirm(true)}>
          <ArrowLeft size={20} /> Orqaga
        </BackBtn>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexShrink: 0 /* prevent shrinking */,
          }}
        >
          {configuredTimeLimit > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color:
                  timeLeft <= 60
                    ? "var(--danger-color)"
                    : "var(--primary-color)",
                fontWeight: "bold",
              }}
            >
              <Timer size={18} /> <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        <div style={{ color: "var(--text-muted-color)" }}>
          {displayMode === "single"
            ? `${currentIdx + 1} / ${questions.length}`
            : `${questions.length} ta savol`}
        </div>
        <Title>{test.title}</Title>
      </Header>

      {displayMode === "single" ? (
        <div>
          <QuestionBox>
            <QuestionText>{currentQ.questionText}</QuestionText>
          </QuestionBox>
          <OptionsGrid>
            {currentQ.options.map((opt, idx) => {
              const letter =
                ["A", "B", "D", "E", "F", "G"][idx] ||
                String.fromCharCode(65 + idx);
              return (
                <OptionBtn
                  key={idx}
                  disabled={isRevealed}
                  isSelected={selectedOption === idx}
                  isCorrect={false}
                  isRevealed={false}
                  showResults={false}
                  onClick={() => handleSelect(idx)}
                >
                  <OptionLetter
                    isSelected={selectedOption === idx}
                    isCorrect={false}
                    isRevealed={false}
                    showResults={false}
                  >
                    {letter}
                  </OptionLetter>
                  <OptionText>{opt}</OptionText>
                </OptionBtn>
              );
            })}
          </OptionsGrid>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {questions.map((q, qIndex) => (
            <div key={qIndex}>
              <QuestionBox>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "var(--primary-color)",
                      fontSize: "1.1rem",
                      marginTop: "2px",
                    }}
                  >
                    {qIndex + 1}.
                  </div>
                  <QuestionText>{q.questionText}</QuestionText>
                </div>
              </QuestionBox>
              <OptionsGrid>
                {q.options.map((opt, oIndex) => {
                  const letter =
                    ["A", "B", "D", "E", "F", "G"][oIndex] ||
                    String.fromCharCode(65 + oIndex);
                  const isSelected = listAnswers[qIndex] === oIndex;
                  return (
                    <OptionBtn
                      key={oIndex}
                      disabled={isFinished}
                      isSelected={isSelected}
                      isCorrect={false}
                      isRevealed={false}
                      showResults={false}
                      onClick={() => handleListSelect(qIndex, oIndex)}
                    >
                      <OptionLetter
                        isSelected={isSelected}
                        isCorrect={false}
                        isRevealed={false}
                        showResults={false}
                      >
                        {letter}
                      </OptionLetter>
                      <OptionText>{opt}</OptionText>
                    </OptionBtn>
                  );
                })}
              </OptionsGrid>
            </div>
          ))}
          <PrimaryBtn
            onClick={handleListSubmit}
            style={{
              marginTop: "16px",
              alignSelf: "center",
              minWidth: "200px",
            }}
          >
            Yakunlash
          </PrimaryBtn>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <ConfirmOverlay onClick={() => setShowExitConfirm(false)}>
          <ConfirmBox onClick={(e) => e.stopPropagation()}>
            <ConfirmTitle>Testni yakunlaysizmi?</ConfirmTitle>
            <ConfirmText>
              Hozirgi natijangiz qabul qilinadi. Javob bermagan savollaringiz 0
              ball hisoblanadi.
            </ConfirmText>
            <ConfirmActions>
              <ConfirmBtnPrimary onClick={() => setShowExitConfirm(false)}>
                Davom etish
              </ConfirmBtnPrimary>
              <ConfirmBtnDanger onClick={handleExitConfirm}>
                Chiqish
              </ConfirmBtnDanger>
            </ConfirmActions>
          </ConfirmBox>
        </ConfirmOverlay>
      )}
    </Container>
  );
};

export default SoloTestPlayer;
