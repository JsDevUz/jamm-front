import React from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

const hotkeyBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "24px",
  height: "24px",
  padding: "0 8px",
  borderRadius: "8px",
  background: "rgba(255, 255, 255, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.14)",
  color: "rgba(255, 255, 255, 0.88)",
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: 1,
  flexShrink: 0,
};

const buttonHotkeyContentStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
};

export default function FlashcardReviewMode({
  ui,
  studyingDeck,
  reviewQueue,
  currentCardIndex,
  showingBack,
  setStudyingDeck,
  setShowingBack,
  getPromptImage,
  getPromptText,
  getAnswerImage,
  getAnswerText,
  handleRating,
}) {
  const {
    Container,
    StudyArea,
    BackBtn,
    Title,
    FlashcardBox,
    RevealBtn,
    Ratings,
    RatingBtn,
  } = ui;

  const currentCard = reviewQueue[currentCardIndex];
  const isDesktop = typeof window !== "undefined" && window.innerWidth > 768;
  const answerText = getAnswerText(currentCard) || "???";

  useHotkeys(
    "space",
    (event) => {
      event.preventDefault();
      if (currentCard && !showingBack) {
        setShowingBack(true);
      }
    },
    {
      enabled: isDesktop && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, currentCard, showingBack, setShowingBack],
  );

  useHotkeys(
    "1",
    (event) => {
      event.preventDefault();
      if (showingBack && currentCard) {
        handleRating(0);
      }
    },
    {
      enabled: isDesktop && showingBack && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, showingBack, currentCard, handleRating],
  );

  useHotkeys(
    "2",
    (event) => {
      event.preventDefault();
      if (showingBack && currentCard) {
        handleRating(1);
      }
    },
    {
      enabled: isDesktop && showingBack && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, showingBack, currentCard, handleRating],
  );

  useHotkeys(
    "3",
    (event) => {
      event.preventDefault();
      if (showingBack && currentCard) {
        handleRating(2);
      }
    },
    {
      enabled: isDesktop && showingBack && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, showingBack, currentCard, handleRating],
  );

  useHotkeys(
    "4",
    (event) => {
      event.preventDefault();
      if (showingBack && currentCard) {
        handleRating(3);
      }
    },
    {
      enabled: isDesktop && showingBack && Boolean(currentCard),
      preventDefault: true,
    },
    [isDesktop, showingBack, currentCard, handleRating],
  );

  return (
    <Container>
      <StudyArea>
        <BackBtn onClick={() => setStudyingDeck(null)}>
          <ArrowLeft size={20} /> Orqaga
        </BackBtn>
        <Title>
          {studyingDeck.title} - Qolgan: {reviewQueue.length - currentCardIndex}
        </Title>

        <FlashcardBox onClick={() => currentCard && setShowingBack((value) => !value)} style={{ cursor: "pointer" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "18px",
              position: "relative",
              overflow: "hidden",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
                position: "relative",
                zIndex: 1,
                transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms ease",
                transform: "translateY(0)",
                filter: "none",
              }}
            >
              {getPromptImage(currentCard) && (
                <img
                  src={getPromptImage(currentCard)}
                  alt="prompt"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                />
              )}
              <div style={{ textAlign: "center", zIndex: 1 }}>
                {getPromptText(currentCard) || "???"}
              </div>
            </div>

            <div
              aria-hidden={!showingBack}
              style={{
                position: "absolute",
                left: "50%",
                bottom: "clamp(20px, 5vh, 42px)",
                width: "min(100% - 36px, 480px)",
                textAlign: "center",
                color: "var(--muted-text-color, rgba(255,255,255,0.72))",
                fontSize: "18px",
                lineHeight: 1.5,
                fontWeight: 700,
                letterSpacing: "0.01em",
                transform: `translate(-50%, ${showingBack ? "0" : "18px"})`,
                opacity: showingBack ? 1 : 0,
                filter: showingBack ? "blur(0)" : "blur(6px)",
                transition:
                  "opacity 220ms ease, transform 280ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms ease",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              {answerText}
            </div>
          </div>
        </FlashcardBox>

        {!showingBack ? (
          <RevealBtn onClick={() => setShowingBack(true)}>
            <span style={buttonHotkeyContentStyle}>
              {isDesktop ? <span style={hotkeyBadgeStyle}>Space</span> : null}
              <span>
                <RefreshCw size={16} style={{ marginRight: 8, display: "inline" }} />
                Javobni ochish
              </span>
            </span>
          </RevealBtn>
        ) : (
          <Ratings>
            <RatingBtn type="fail" onClick={() => handleRating(0)}>
              <span style={buttonHotkeyContentStyle}>
                {isDesktop ? <span style={hotkeyBadgeStyle}>1</span> : null}
                <span>Topolmadim</span>
              </span>
            </RatingBtn>
            <RatingBtn type="hard" onClick={() => handleRating(1)}>
              <span style={buttonHotkeyContentStyle}>
                {isDesktop ? <span style={hotkeyBadgeStyle}>2</span> : null}
                <span>Qiyin</span>
              </span>
            </RatingBtn>
            <RatingBtn type="good" onClick={() => handleRating(2)}>
              <span style={buttonHotkeyContentStyle}>
                {isDesktop ? <span style={hotkeyBadgeStyle}>3</span> : null}
                <span>Biroz qiynaldim</span>
              </span>
            </RatingBtn>
            <RatingBtn type="easy" onClick={() => handleRating(3)}>
              <span style={buttonHotkeyContentStyle}>
                {isDesktop ? <span style={hotkeyBadgeStyle}>4</span> : null}
                <span>Oson</span>
              </span>
            </RatingBtn>
          </Ratings>
        )}
      </StudyArea>
    </Container>
  );
}
