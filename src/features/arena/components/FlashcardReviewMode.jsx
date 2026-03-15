import React from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";

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

  return (
    <Container>
      <StudyArea>
        <BackBtn onClick={() => setStudyingDeck(null)}>
          <ArrowLeft size={20} /> Orqaga
        </BackBtn>
        <Title>
          {studyingDeck.title} - Qolgan: {reviewQueue.length - currentCardIndex}
        </Title>

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
            <RefreshCw size={16} style={{ marginRight: 8, display: "inline" }} />
            Javobni ko'rish
          </RevealBtn>
        ) : (
          <Ratings>
            <RatingBtn type="fail" onClick={() => handleRating(0)}>
              Topolmadim
            </RatingBtn>
            <RatingBtn type="hard" onClick={() => handleRating(1)}>
              Qiyin
            </RatingBtn>
            <RatingBtn type="good" onClick={() => handleRating(2)}>
              Biroz qiynaldim
            </RatingBtn>
            <RatingBtn type="easy" onClick={() => handleRating(3)}>
              Oson
            </RatingBtn>
          </Ratings>
        )}
      </StudyArea>
    </Container>
  );
}
