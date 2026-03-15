import React from "react";
import FlashcardShooterGame from "./FlashcardShooterGame";

export default function FlashcardGameMode({
  ui,
  gameDeck,
  gameQueue,
  promptSide,
  setGameDeck,
  setGameQueue,
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
            setGameDeck(null);
            setGameQueue([]);
          }}
          onFinish={() => {
            setGameDeck(null);
            setGameQueue([]);
          }}
        />
      </StudyArea>
    </Container>
  );
}
