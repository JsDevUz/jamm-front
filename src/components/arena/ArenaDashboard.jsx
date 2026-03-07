import React from "react";
import styled from "styled-components";
import TestList from "./TestList";
import FlashcardList from "./FlashcardList";
import BattleLobby from "./BattleLobby";
import SentenceBuilderList from "./SentenceBuilderList";
import { useArena } from "../../contexts/ArenaContext";
import useAuthStore from "../../store/authStore";

const ArenaContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--background-color);
  overflow-y: auto;
`;

const ContentArea = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ArenaDashboard = ({ activeTab = "tests", initialId, onBack }) => {
  const { fetchMyTests, fetchFlashcards } = useArena();

  // Fetches are now handled individually by TestList and FlashcardList components
  // to ensure they only happen when the respective tab is active.
  React.useEffect(() => {
    // No-op here
  }, []);

  return (
    <ArenaContainer>
      <ContentArea>
        {activeTab === "tests" && (
          <TestList initialTestId={initialId} onBack={onBack} />
        )}
        {activeTab === "flashcards" && (
          <FlashcardList initialDeckId={initialId} onBack={onBack} />
        )}
        {activeTab === "sentenceBuilders" && (
          <SentenceBuilderList initialDeckId={initialId} onBack={onBack} />
        )}
        {activeTab === "battles" && (
          <BattleLobby initialRoomId={initialId} onBack={onBack} />
        )}

        {!activeTab && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "var(--text-muted-color)",
              opacity: 0.8,
              textAlign: "center",
              marginTop: "100px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
              }}
            >
              🏟️
            </div>
            <h2 style={{ color: "var(--text-color)", marginBottom: "8px" }}>
              Bilimlar maydoniga xush kelibsiz!
            </h2>
            <p style={{ maxWidth: "400px" }}>
              Chap tomondagi menyudan o'zingizga kerakli bo'limni tanlang:
              testlar ishlash, lug'at yodlash yoki do'stlar bilan bellashuv.
            </p>
          </div>
        )}
      </ContentArea>
    </ArenaContainer>
  );
};

export default ArenaDashboard;
