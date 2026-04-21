import React from "react";
import FlashcardShooterGame from "./FlashcardShooterGame";

export default function FlashcardGameMode({
  ui,
  gameDeck,
  gameQueue,
  promptSide,
  setGameDeck,
  setGameQueue,
  onClose,
}) {
  const { Container, StudyArea } = ui;

  return (
    <Container>
      <StudyArea style={{ maxWidth: "800px" }}>
        <FlashcardShooterGame
          deck={gameDeck}
          queue={gameQueue}
          promptSide={promptSide}
          onBack={() => {
            if (onClose) {
              onClose();
              return;
            }
            setGameDeck(null);
            setGameQueue([]);
          }}
          onFinish={() => {
            if (onClose) {
              onClose();
              return;
            }
            setGameDeck(null);
            setGameQueue([]);
          }}
        />
      </StudyArea>
    </Container>
  );
}
