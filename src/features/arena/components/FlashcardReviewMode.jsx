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

const hotkeyHintRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "8px",
  marginTop: "-4px",
  marginBottom: "8px",
};

const hotkeyHintItemStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 12px",
  borderRadius: "999px",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  color: "rgba(255, 255, 255, 0.72)",
  fontSize: "13px",
  fontWeight: 600,
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

        {isDesktop ? (
          <div style={hotkeyHintRowStyle}>
            {!showingBack ? (
              <div style={hotkeyHintItemStyle}>
                <span style={hotkeyBadgeStyle}>Space</span>
                <span>Javobni ko'rish</span>
              </div>
            ) : (
              <div style={hotkeyHintItemStyle}>
                <span style={hotkeyBadgeStyle}>1-4</span>
                <span>Bahoni tanlash</span>
              </div>
            )}
          </div>
        ) : null}

        <FlashcardBox>
          {showingBack ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {getAnswerImage(currentCard) && (
                <img
                  src={getAnswerImage(currentCard)}
                  alt="back"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                />
              )}
              <div>{getAnswerText(currentCard) || "???"}</div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
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
              <div>{getPromptText(currentCard) || "???"}</div>
            </div>
          )}
        </FlashcardBox>

        {!showingBack ? (
          <RevealBtn onClick={() => setShowingBack(true)}>
            <span style={buttonHotkeyContentStyle}>
              {isDesktop ? <span style={hotkeyBadgeStyle}>Space</span> : null}
              <span>
                <RefreshCw size={16} style={{ marginRight: 8, display: "inline" }} />
                Javobni ko'rish
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
