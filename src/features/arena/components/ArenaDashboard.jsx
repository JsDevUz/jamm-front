import React from "react";
import { useTranslation } from "react-i18next";
import TestList from "./TestList";
import FlashcardList from "./FlashcardList";
import BattleLobby from "./BattleLobby";
import SentenceBuilderList from "./SentenceBuilderList";
import MnemonicsPanel from "./MnemonicsPanel";
import {
  ArenaContainer,
  ContentArea,
  EmptyDescription,
  EmptyIcon,
  EmptyState,
  EmptyTitle,
} from "../styles/ArenaDashboard.styles";

const ArenaDashboard = ({ activeTab = "tests", initialId, onBack }) => {
  const { t } = useTranslation();

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
        {activeTab === "mnemonics" && <MnemonicsPanel onBack={onBack} />}

        {!activeTab && (
          <EmptyState>
            <EmptyIcon>🏟️</EmptyIcon>
            <EmptyTitle>{t("arena.dashboard.welcomeTitle")}</EmptyTitle>
            <EmptyDescription>
              {t("arena.dashboard.welcomeDescription")}
            </EmptyDescription>
          </EmptyState>
        )}
      </ContentArea>
    </ArenaContainer>
  );
};

export default ArenaDashboard;
