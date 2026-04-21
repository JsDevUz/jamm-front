import React from "react";
import { ArrowLeft } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

const hotkeyBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "24px",
  height: "24px",
  padding: "0 8px",
  borderRadius: "8px",
  background: "color-mix(in srgb, var(--text-color) 8%, transparent)",
  border: "1px solid var(--border-color)",
  color: "var(--text-color)",
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: 1,
  flexShrink: 0,
};

const hotkeyHintStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  alignSelf: "center",
  marginTop: "-4px",
  marginBottom: "8px",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "color-mix(in srgb, var(--text-color) 6%, transparent)",
  border: "1px solid var(--border-color)",
  color: "var(--text-muted-color)",
  fontSize: "13px",
  fontWeight: 600,
};

const buttonHotkeyContentStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
};

export default function FlashcardTestMode({
  ui,
  testDeck,
  testQueue,
  testAnswers,
  testCompleted,
  testIndex,
  currentTestCard,
  currentTestOptions,
  selectedTestOption,
  setTestDeck,
  setTestQueue,
  setTestAnswers,
  setTestCompleted,
  onClose,
  handleTestAnswer,
  restartTestMissed,
  restartTestAll,
  getPromptImage,
  getPromptText,
  getAnswerText,
}) {
  const {
    Container,
    StudyArea,
    BackBtn,
    Title,
    StudyMeta,
    FlashcardBox,
    PreviewItem,
    PreviewRow,
    PreviewLabel,
    PreviewContent,
    TestOptions,
    TestOptionBtn,
    ResultActions,
    StudyBtn,
  } = ui;

  const currentCard = currentTestCard;
  const correctCount = testAnswers.filter((item) => item.isCorrect).length;
  const isDesktop = typeof window !== "undefined" && window.innerWidth > 768;

  useHotkeys(
    "1",
    (event) => {
      event.preventDefault();
      if (!testCompleted && !selectedTestOption && currentTestOptions[0]) {
        handleTestAnswer(currentTestOptions[0]);
      }
    },
    {
      enabled: isDesktop && !testCompleted && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, testCompleted, currentCard, selectedTestOption, currentTestOptions, handleTestAnswer],
  );

  useHotkeys(
    "2",
    (event) => {
      event.preventDefault();
      if (!testCompleted && !selectedTestOption && currentTestOptions[1]) {
        handleTestAnswer(currentTestOptions[1]);
      }
    },
    {
      enabled: isDesktop && !testCompleted && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, testCompleted, currentCard, selectedTestOption, currentTestOptions, handleTestAnswer],
  );

  useHotkeys(
    "3",
    (event) => {
      event.preventDefault();
      if (!testCompleted && !selectedTestOption && currentTestOptions[2]) {
        handleTestAnswer(currentTestOptions[2]);
      }
    },
    {
      enabled: isDesktop && !testCompleted && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, testCompleted, currentCard, selectedTestOption, currentTestOptions, handleTestAnswer],
  );

  useHotkeys(
    "4",
    (event) => {
      event.preventDefault();
      if (!testCompleted && !selectedTestOption && currentTestOptions[3]) {
        handleTestAnswer(currentTestOptions[3]);
      }
    },
    {
      enabled: isDesktop && !testCompleted && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, testCompleted, currentCard, selectedTestOption, currentTestOptions, handleTestAnswer],
  );

  return (
    <Container>
      <StudyArea>
        <BackBtn
          onClick={() => {
            if (onClose) {
              onClose();
              return;
            }
            setTestDeck(null);
            setTestQueue([]);
            setTestAnswers([]);
            setTestCompleted(false);
          }}
        >
          <ArrowLeft size={20} /> Orqaga
        </BackBtn>

        <Title>{testDeck.title} - Test</Title>
        <StudyMeta>
          <span>
            {testCompleted
              ? `Natija: ${correctCount}/${testQueue.length}`
              : `Savol: ${testIndex + 1}/${testQueue.length}`}
          </span>
          <span>To'g'ri: {correctCount}</span>
        </StudyMeta>

        {isDesktop && !testCompleted ? (
          <div style={hotkeyHintStyle}>
            <span style={hotkeyBadgeStyle}>1-4</span>
            <span>Variantni klaviaturadan tanlash</span>
          </div>
        ) : null}

        <FlashcardBox>
          {testCompleted ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {testAnswers.map((item, index) => (
                <PreviewItem key={`${item.card._id || index}-${index}`}>
                  <PreviewRow>
                    <PreviewLabel>{index + 1}.</PreviewLabel>
                    <PreviewContent>{getPromptText(item.card)}</PreviewContent>
                  </PreviewRow>
                  <PreviewRow>
                    <PreviewLabel>To'g'ri:</PreviewLabel>
                    <PreviewContent>{getAnswerText(item.card)}</PreviewContent>
                  </PreviewRow>
                  <PreviewRow>
                    <PreviewLabel>Tanlangan:</PreviewLabel>
                    <PreviewContent
                      style={{
                        color: item.isCorrect ? "#22c55e" : "#ef4444",
                        fontWeight: 700,
                      }}
                    >
                      {item.selectedOption || "-"}
                    </PreviewContent>
                  </PreviewRow>
                </PreviewItem>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "18px",
                width: "100%",
              }}
            >
              {getPromptImage(currentCard) && (
                <img
                  src={getPromptImage(currentCard)}
                  alt="prompt"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "180px",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                />
              )}
              <div style={{ fontSize: "28px", fontWeight: 700 }}>
                {getPromptText(currentCard) || "???"}
              </div>
            </div>
          )}
        </FlashcardBox>

        {!testCompleted ? (
          <TestOptions key={`flashcard-test-options-${currentCard?._id || testIndex}`}>
            {currentTestOptions.map((option, index) => (
              <TestOptionBtn
                key={option}
                type="button"
                disabled={Boolean(selectedTestOption)}
                $selected={selectedTestOption === option}
                onClick={() => handleTestAnswer(option)}
              >
                <span style={buttonHotkeyContentStyle}>
                  {isDesktop && index < 4 ? (
                    <span style={hotkeyBadgeStyle}>{index + 1}</span>
                  ) : null}
                  <span>{option}</span>
                </span>
              </TestOptionBtn>
            ))}
          </TestOptions>
        ) : (
          <ResultActions>
            <StudyBtn
              onClick={restartTestMissed}
              disabled={correctCount === testQueue.length}
              style={{ marginTop: 0 }}
            >
              Topilmaganlarni ishlash
            </StudyBtn>
            <StudyBtn
              onClick={restartTestAll}
              style={{
                marginTop: 0,
                background: "var(--secondary-color)",
                color: "var(--text-color)",
                border: "1px solid var(--border-color)",
              }}
            >
              To'liq qayta ishlash
            </StudyBtn>
            <StudyBtn
              onClick={() => {
                if (onClose) {
                  onClose();
                  return;
                }
                setTestDeck(null);
                setTestQueue([]);
                setTestAnswers([]);
                setTestCompleted(false);
              }}
              style={{
                marginTop: 0,
                background: "var(--secondary-color)",
                color: "var(--text-color)",
                border: "1px solid var(--border-color)",
              }}
            >
              Asosiy oynaga qaytish
            </StudyBtn>
          </ResultActions>
        )}
      </StudyArea>
    </Container>
  );
}
