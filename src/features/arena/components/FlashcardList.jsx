import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import toast from "react-hot-toast";
import { useArena } from "../../../contexts/ArenaContext";
import {
  Plus,
  PlayCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  RefreshCw,
  Link2,
  Users,
  LogOut,
  User,
  Download,
  Eye,
  X,
  Pencil,
  Trash2,
  MoreHorizontal,
  RotateCcw,
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateFlashcardDialog from "./CreateFlashcardDialog";
import useAuthStore from "../../../store/authStore";
import PremiumUpgradeModal from "../../../app/components/PremiumUpgradeModal";
import ArenaHeader from "./ArenaHeader";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";
import FlashcardShooterGame from "./FlashcardShooterGame";

const FLASHCARD_PROMPT_SIDE_STORAGE_KEY = "jamm-flashcard-prompt-side-v1";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
    background-color: var(--background-color);
    animation: slideInFromRight 0.3s ease-out;
    padding: 20px;
    overflow-y: auto;
    box-sizing: border-box;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const dialogIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.18s ease-out;
`;

const Dialog = styled.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  height: min(80vh, 720px);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${dialogIn} 0.22s ease-out;
`;

const DialogContent = styled.div`
  flex: 1;
  min-height: 0;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SettingsGrid = styled.div`
  display: grid;
  gap: 10px;
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`;

const DirectionSelect = styled.select`
  width: 100%;
  min-height: 42px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 0 12px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const CreateBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    filter: brightness(1.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  position: relative;
  z-index: ${(props) => (props.$raised ? 12 : 1)};
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    border-color: var(--text-muted-color);
    transform: translateY(-2px);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
`;

const CardMetaText = styled.span`
  font-size: 13px;
  color: var(--text-muted-color);
`;

const CardDesc = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;

const CardHint = styled.div`
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 700;
`;

const MenuWrap = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const MenuButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-muted-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    color: var(--text-color);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 180px;
  padding: 8px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MenuItem = styled.button`
  min-height: 38px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${(props) =>
    props.$danger ? "rgba(239, 68, 68, 0.08)" : "transparent"};
  color: ${(props) => (props.$danger ? "#ef4444" : "var(--text-color)")};
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${(props) =>
      props.$danger ? "rgba(239, 68, 68, 0.12)" : "var(--tertiary-color)"};
  }
`;

const DeckPreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding: 4px;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
  }
`;

const PreviewItem = styled.div`
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PreviewRow = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
`;

const PreviewLabel = styled.span`
  color: var(--text-muted-color);
  min-width: 60px;
  font-weight: 500;
`;

const PreviewContent = styled.span`
  color: var(--text-color);
  word-break: break-word;
`;

const Meta = styled.div`
  font-size: 14px;
  color: var(--text-muted-color);
`;
const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`;
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    color: var(--text-color);
  }
`;

const StudyBtn = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

// --- Study Mode Styles ---
const StudyArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
  gap: 24px;
  box-sizing: border-box;
`;

const ModeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ModeCard = styled.button`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  color: var(--text-color);
  padding: 16px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;

  &:hover {
    border-color: var(--text-muted-color);
    background: var(--tertiary-color);
  }
`;

const ModeTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const ModeDesc = styled.span`
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted-color);
`;

const FlashcardBox = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-size: 24px;
  font-weight: 500;
  color: var(--text-color);
  box-sizing: border-box;
`;

const BackBtn = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  &:hover {
    color: var(--text-color);
  }
`;

const RevealBtn = styled.button`
  padding: 12px 24px;
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: var(--border-color);
  }
`;

const Ratings = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const RatingBtn = styled.button`
  flex: 1;
  min-height: 44px;
  border-radius: 10px;
  border: 1px solid
    ${(props) => {
      if (props.type === "fail") return "rgba(239, 68, 68, 0.35)";
      if (props.type === "hard") return "rgba(249, 115, 22, 0.35)";
      if (props.type === "good") return "rgba(59, 130, 246, 0.35)";
      if (props.type === "easy") return "rgba(34, 197, 94, 0.35)";
      return "var(--border-color)";
    }};
  background:
    ${(props) => {
      if (props.type === "fail") return "rgba(239, 68, 68, 0.12)";
      if (props.type === "hard") return "rgba(249, 115, 22, 0.12)";
      if (props.type === "good") return "rgba(59, 130, 246, 0.12)";
      if (props.type === "easy") return "rgba(34, 197, 94, 0.12)";
      return "var(--secondary-color)";
    }};
  color: var(--text-color);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.16s ease,
    filter 0.16s ease,
    background 0.16s ease;

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }
`;

const ClassicControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const ClassicActionBtn = styled.button`
  min-width: 52px;
  height: 46px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: ${(props) =>
    props.$variant === "fail"
      ? "rgba(239, 68, 68, 0.12)"
      : props.$variant === "success"
        ? "rgba(34, 197, 94, 0.12)"
        : "var(--secondary-color)"};
  color: ${(props) =>
    props.$variant === "fail"
      ? "#ef4444"
      : props.$variant === "success"
        ? "#22c55e"
        : "var(--text-color)"};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
  }
`;

const StudyMeta = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
`;

const ResultActions = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TestOptions = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const TestOptionBtn = styled.button`
  min-height: 54px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: var(--tertiary-color);
    border-color: var(--text-muted-color);
  }
`;

const floatOne = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  25% { transform: translate3d(16px, -18px, 0) scale(1.03); }
  50% { transform: translate3d(-10px, -34px, 0) scale(0.98); }
  75% { transform: translate3d(20px, -8px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const floatTwo = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  20% { transform: translate3d(-20px, -16px, 0) scale(0.98); }
  45% { transform: translate3d(10px, -30px, 0) scale(1.04); }
  75% { transform: translate3d(-14px, -10px, 0) scale(1.01); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const floatThree = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  30% { transform: translate3d(12px, -26px, 0) scale(1.02); }
  55% { transform: translate3d(-16px, -18px, 0) scale(0.99); }
  85% { transform: translate3d(6px, -4px, 0) scale(1.03); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const floatFour = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(1); }
  35% { transform: translate3d(-18px, -28px, 0) scale(1.04); }
  60% { transform: translate3d(14px, -12px, 0) scale(0.99); }
  85% { transform: translate3d(-10px, -2px, 0) scale(1.02); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
`;

const FlashcardList = ({ initialDeckId, onBack }) => {
  const {
    flashcardDecks,
    flashcardsPage,
    flashcardsHasMore,
    fetchFlashcards,
    reviewFlashcard,
    fetchFlashcardDeck,
    joinFlashcardDeck,
    leaveFlashcardDeck,
    deleteFlashcardDeck,
  } = useArena();
  const user = useAuthStore((state) => state.user);
  const [studyingDeck, setStudyingDeck] = useState(null);
  const [viewingDeck, setViewingDeck] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [reviewQueue, setReviewQueue] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showingBack, setShowingBack] = useState(false);
  const [showMembersForDeck, setShowMembersForDeck] = useState(null);
  const [joiningDeck, setJoiningDeck] = useState(null);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);
  const [deckToDelete, setDeckToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [trainingPickerDeck, setTrainingPickerDeck] = useState(null);
  const [classicDeck, setClassicDeck] = useState(null);
  const [classicQueue, setClassicQueue] = useState([]);
  const [classicIndex, setClassicIndex] = useState(0);
  const [classicShowBack, setClassicShowBack] = useState(false);
  const [classicAnswers, setClassicAnswers] = useState([]);
  const [classicCompleted, setClassicCompleted] = useState(false);
  const [testDeck, setTestDeck] = useState(null);
  const [testQueue, setTestQueue] = useState([]);
  const [testIndex, setTestIndex] = useState(0);
  const [testAnswers, setTestAnswers] = useState([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [gameDeck, setGameDeck] = useState(null);
  const [gameQueue, setGameQueue] = useState([]);
  const [promptSide, setPromptSide] = useState(() => {
    if (typeof window === "undefined") return "front";
    const saved = window.localStorage.getItem(
      FLASHCARD_PROMPT_SIDE_STORAGE_KEY,
    );
    return saved === "back" ? "back" : "front";
  });
  const gameBoardRef = useRef(null);

  const isPremium = user?.premiumStatus === "premium";
  const limit = isPremium ? 10 : 4;
  const myDecks = flashcardDecks.filter(
    (deck) =>
      (deck.createdBy?._id || deck.createdBy) === (user?._id || user?.id),
  );
  const currentCount = myDecks.length;

  const handleCreateClick = () => {
    if (currentCount >= limit) {
      if (!isPremium) {
        setIsUpgradeModalOpen(true);
      } else {
        toast.error("Siz maksimal limitga yetgansiz (10/10).");
      }
      return;
    }
    setIsCreateOpen(true);
  };

  const hasFetched = React.useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    if (flashcardDecks.length > 0) {
      hasFetched.current = true;
      return;
    }
    fetchFlashcards(1).finally(() => {
      hasFetched.current = true;
    });
  }, [fetchFlashcards, flashcardDecks.length]);

  const fetchMoreData = () => {
    if (flashcardsHasMore) {
      fetchFlashcards(flashcardsPage + 1);
    }
  };

  useEffect(() => {
    const checkDeepLink = async () => {
      if (initialDeckId && !studyingDeck) {
        const deckData = await fetchFlashcardDeck(initialDeckId);
        if (deckData) {
          setViewingDeck(deckData);
        }
      }
    };
    checkDeepLink();
  }, [initialDeckId]);

  useEffect(() => {
    if (!openMenuId) return undefined;
    const handleOutsideClick = () => setOpenMenuId(null);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openMenuId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(FLASHCARD_PROMPT_SIDE_STORAGE_KEY, promptSide);
  }, [promptSide]);

  const getPromptText = (card) =>
    promptSide === "front" ? card?.front : card?.back;
  const getPromptImage = (card) =>
    promptSide === "front" ? card?.frontImage : card?.backImage;
  const getAnswerText = (card) =>
    promptSide === "front" ? card?.back : card?.front;
  const getAnswerImage = (card) =>
    promptSide === "front" ? card?.backImage : card?.frontImage;

  const startStudy = async (deckMetadata, isRestart = false) => {
    // Fetch deck with personal progress
    const deck = await fetchFlashcardDeck(deckMetadata._id);
    if (!deck) return;

    // Filter cards that are due for review (nextReviewDate <= now)
    const now = new Date();
    const cardsToStudy = isRestart
      ? deck.cards
      : deck.cards.filter((c) => new Date(c.nextReviewDate) <= now);

    if (cardsToStudy.length === 0) {
      toast("Hozircha yodlash kerak bo'lgan so'zlar yo'q! Kutib turing.", {
        icon: "ℹ️",
      });
      return;
    }

    setViewingDeck(null);
    setStudyingDeck(deck);
    setReviewQueue(cardsToStudy);
    setCurrentCardIndex(0);
    setShowingBack(false);
  };

  const openTrainingPicker = async (deckMetadata) => {
    const deck = await fetchFlashcardDeck(deckMetadata._id);
    if (!deck) return;
    setTrainingPickerDeck(deck);
  };

  const resetClassicSession = (deck, cards) => {
    setViewingDeck(null);
    setTrainingPickerDeck(null);
    setStudyingDeck(null);
    setClassicDeck(deck);
    setClassicQueue(cards);
    setClassicIndex(0);
    setClassicShowBack(false);
    setClassicAnswers([]);
    setClassicCompleted(false);
  };

  const buildTestOptions = (deck, currentCard) => {
    const wrongOptions = (deck.cards || [])
      .filter(
        (card) =>
          card._id !== currentCard._id &&
          getAnswerText(card) !== getAnswerText(currentCard),
      )
      .map((card) => getAnswerText(card))
      .filter(Boolean);

    const uniqueWrongOptions = [...new Set(wrongOptions)];
    const shuffledWrong = uniqueWrongOptions.sort(() => Math.random() - 0.5);
    const options = [
      getAnswerText(currentCard),
      ...shuffledWrong.slice(0, 3),
    ].filter(Boolean);
    return options.sort(() => Math.random() - 0.5);
  };

  const resetTestSession = (deck, cards) => {
    setViewingDeck(null);
    setTrainingPickerDeck(null);
    setStudyingDeck(null);
    setClassicDeck(null);
    setTestDeck(deck);
    setTestQueue(cards);
    setTestIndex(0);
    setTestAnswers([]);
    setTestCompleted(false);
  };

  const resetGameSession = (deck, cards) => {
    setViewingDeck(null);
    setTrainingPickerDeck(null);
    setStudyingDeck(null);
    setClassicDeck(null);
    setTestDeck(null);
    setGameDeck(deck);
    setGameQueue(cards);
  };

  const startTestStudy = (deckMetadata) => {
    const deck =
      trainingPickerDeck?._id === deckMetadata._id
        ? trainingPickerDeck
        : viewingDeck?._id === deckMetadata._id
          ? viewingDeck
          : deckMetadata;
    resetTestSession(deck, [...(deck.cards || [])]);
  };

  const startGameStudy = (deckMetadata) => {
    const deck =
      trainingPickerDeck?._id === deckMetadata._id
        ? trainingPickerDeck
        : viewingDeck?._id === deckMetadata._id
          ? viewingDeck
          : deckMetadata;
    resetGameSession(deck, [...(deck.cards || [])]);
  };

  const handleTestAnswer = (selectedOption) => {
    const currentCard = testQueue[testIndex];
    if (!currentCard) return;

    const isCorrect = selectedOption === getAnswerText(currentCard);
    const nextAnswers = [
      ...testAnswers,
      {
        card: currentCard,
        selectedOption,
        isCorrect,
      },
    ];
    setTestAnswers(nextAnswers);

    if (testIndex + 1 >= testQueue.length) {
      setTestCompleted(true);
      return;
    }

    setTestIndex((prev) => prev + 1);
  };

  const restartTestMissed = () => {
    if (!testDeck) return;
    const missedCards = testAnswers
      .filter((item) => !item.isCorrect)
      .map((item) => item.card);
    if (missedCards.length === 0) {
      toast("Hamma javob to'g'ri topildi.", { icon: "👏" });
      return;
    }
    resetTestSession(testDeck, missedCards);
  };

  const restartTestAll = () => {
    if (!testDeck) return;
    resetTestSession(testDeck, [...(testDeck.cards || [])]);
  };

  const restartGameAll = () => {
    if (!gameDeck) return;
    resetGameSession(gameDeck, [...(gameDeck.cards || [])]);
  };

  const startClassicStudy = (deckMetadata) => {
    const deck =
      trainingPickerDeck?._id === deckMetadata._id
        ? trainingPickerDeck
        : viewingDeck?._id === deckMetadata._id
          ? viewingDeck
          : deckMetadata;
    resetClassicSession(deck, [...(deck.cards || [])]);
  };

  const handleClassicAnswer = (known) => {
    const currentCard = classicQueue[classicIndex];
    if (!currentCard) return;

    const nextAnswers = [
      ...classicAnswers,
      {
        card: currentCard,
        known,
      },
    ];
    setClassicAnswers(nextAnswers);
    setClassicShowBack(false);

    if (classicIndex + 1 >= classicQueue.length) {
      setClassicCompleted(true);
      return;
    }

    setClassicIndex((prev) => prev + 1);
  };

  const handleClassicReplay = () => {
    if (classicIndex === 0 || classicAnswers.length === 0) return;
    const nextAnswers = [...classicAnswers];
    nextAnswers.pop();
    setClassicAnswers(nextAnswers);
    setClassicIndex((prev) => Math.max(prev - 1, 0));
    setClassicShowBack(false);
    setClassicCompleted(false);
  };

  const restartClassicMissed = () => {
    if (!classicDeck) return;
    const missedCards = classicAnswers
      .filter((item) => !item.known)
      .map((item) => item.card);
    if (missedCards.length === 0) {
      toast("Hamma kartani topdingiz.", { icon: "👏" });
      return;
    }
    resetClassicSession(classicDeck, missedCards);
  };

  const restartClassicAll = () => {
    if (!classicDeck) return;
    resetClassicSession(classicDeck, [...(classicDeck.cards || [])]);
  };

  const handleCopyLink = (deckIdentifier) => {
    if (!deckIdentifier) {
      toast.error("Lug'at havolasi hali tayyor emas.");
      return;
    }
    const url = `${RESOLVED_APP_BASE_URL}/arena/flashcards/${deckIdentifier}`;
    navigator.clipboard.writeText(url);
    toast.success("Lug'at havolasi nusxalandi!");
  };

  const handleDeleteDeck = async () => {
    if (!deckToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteFlashcardDeck(deckToDelete._id);
      if (viewingDeck?._id === deckToDelete._id) setViewingDeck(null);
      if (studyingDeck?._id === deckToDelete._id) setStudyingDeck(null);
      if (showMembersForDeck?._id === deckToDelete._id) {
        setShowMembersForDeck(null);
      }
      toast.success("Lug'at va unga tegishli progresslar o'chirildi.");
      setDeckToDelete(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Lug'atni o'chirishda xatolik yuz berdi.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const onJoin = async (deckId) => {
    const res = await joinFlashcardDeck(deckId);
    if (res.success) {
      setJoiningDeck(null);
      fetchFlashcards();
      // If we were viewing the deck, update it to reflect membership
      if (viewingDeck && viewingDeck._id === deckId) {
        const updatedDeck = await fetchFlashcardDeck(deckId);
        setViewingDeck(updatedDeck);
      }
    }
  };

  const onLeave = async (deckId) => {
    if (
      window.confirm(
        "Haqiqatdan ham ushbu lug'atdan chiqmoqchimisiz? Progressingiz o'chib ketadi.",
      )
    ) {
      const res = await leaveFlashcardDeck(deckId);
      if (res.success) {
        fetchFlashcards();
        if (viewingDeck && viewingDeck._id === deckId) {
          setViewingDeck(null); // Close detail view if leaving the current one
        }
      }
    }
  };

  const handleRating = async (quality) => {
    const currentCard = reviewQueue[currentCardIndex];
    if (!currentCard) return;

    const cardId = currentCard._id;
    const deckId = studyingDeck._id;

    // Async save to backend
    reviewFlashcard(deckId, cardId, quality).catch((err) => console.error(err));

    // Determine what happens next in the queue
    if (quality < 3) {
      // Repeat this card: add it to the end of the queue
      setReviewQueue((prev) => [...prev, currentCard]);
      setCurrentCardIndex((prev) => prev + 1);
      setShowingBack(false);
    } else {
      // Mastered this card (Oson)
      if (currentCardIndex + 1 < reviewQueue.length) {
        // Move to next card in the remaining queue
        setCurrentCardIndex((prev) => prev + 1);
        setShowingBack(false);
      } else {
        // Finished all cards in the queue
        toast.success("Barakalla! Ushbu to'plamni yodlashni tugatdingiz.", {
          duration: 4000,
        });
        setStudyingDeck(null);
        fetchFlashcards();
      }
    }
  };

  if (studyingDeck) {
    const currentCard = reviewQueue[currentCardIndex];
    return (
      <Container>
        <StudyArea>
          <BackBtn onClick={() => setStudyingDeck(null)}>
            <ArrowLeft size={20} /> Orqaga
          </BackBtn>
          <Title>
            {studyingDeck.title} - Qolgan:{" "}
            {reviewQueue.length - currentCardIndex}
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
              <RefreshCw
                size={16}
                style={{ marginRight: 8, display: "inline" }}
              />
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

  if (classicDeck) {
    const currentCard = classicQueue[classicIndex];
    const foundCount = classicAnswers.filter((item) => item.known).length;
    const missedCount = classicAnswers.filter((item) => !item.known).length;
    const totalAnswered = classicAnswers.length;

    return (
      <Container>
        <StudyArea>
          <BackBtn
            onClick={() => {
              setClassicDeck(null);
              setClassicQueue([]);
              setClassicAnswers([]);
              setClassicCompleted(false);
            }}
          >
            <ArrowLeft size={20} /> Orqaga
          </BackBtn>

          <Title>{classicDeck.title} - Flashcards</Title>
          <StudyMeta>
            <span>
              {classicCompleted
                ? `Natija: ${foundCount}/${classicQueue.length}`
                : `Karta: ${classicIndex + 1}/${classicQueue.length}`}
            </span>
            <span>
              Topdi: {foundCount} · Topolmadi: {missedCount}
            </span>
          </StudyMeta>

          <FlashcardBox onClick={() => setClassicShowBack((prev) => !prev)}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                width: "100%",
              }}
            >
              {!classicCompleted &&
                (classicShowBack
                  ? getAnswerImage(currentCard)
                  : getPromptImage(currentCard)) && (
                  <img
                    src={
                      classicShowBack
                        ? getAnswerImage(currentCard)
                        : getPromptImage(currentCard)
                    }
                    alt={classicShowBack ? "answer" : "prompt"}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      objectFit: "contain",
                    }}
                  />
                )}

              {classicCompleted ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {classicAnswers.map((item, index) => (
                    <PreviewItem key={`${item.card._id || index}-${index}`}>
                      <PreviewRow>
                        <PreviewLabel>{index + 1}.</PreviewLabel>
                        <PreviewContent>
                          {getPromptText(item.card)}
                        </PreviewContent>
                      </PreviewRow>
                      <PreviewRow>
                        <PreviewLabel>Javob:</PreviewLabel>
                        <PreviewContent>
                          {getAnswerText(item.card)}
                        </PreviewContent>
                      </PreviewRow>
                      <PreviewRow>
                        <PreviewLabel>Holat:</PreviewLabel>
                        <PreviewContent
                          style={{
                            color: item.known ? "#22c55e" : "#ef4444",
                            fontWeight: 700,
                          }}
                        >
                          {item.known ? "Topdi" : "Topolmadi"}
                        </PreviewContent>
                      </PreviewRow>
                    </PreviewItem>
                  ))}
                </div>
              ) : (
                <div>
                  {classicShowBack
                    ? getAnswerText(currentCard) || "???"
                    : getPromptText(currentCard) || "???"}
                </div>
              )}
            </div>
          </FlashcardBox>

          {!classicCompleted ? (
            <ClassicControls>
              <ClassicActionBtn
                onClick={handleClassicReplay}
                disabled={classicIndex === 0 || totalAnswered === 0}
                title="Oldingi karta"
              >
                <RotateCcw size={18} />
              </ClassicActionBtn>
              <ClassicActionBtn
                $variant="fail"
                onClick={() => handleClassicAnswer(false)}
                title="Topolmadi"
              >
                <ChevronLeft size={20} />
              </ClassicActionBtn>
              <ClassicActionBtn
                $variant="success"
                onClick={() => handleClassicAnswer(true)}
                title="Topdi"
              >
                <ChevronRight size={20} />
              </ClassicActionBtn>
            </ClassicControls>
          ) : (
            <ResultActions>
              <StudyBtn
                onClick={restartClassicMissed}
                disabled={missedCount === 0}
                style={{ marginTop: 0 }}
              >
                Topilmaganlarni ishlash
              </StudyBtn>
              <StudyBtn
                onClick={restartClassicAll}
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
                  setClassicDeck(null);
                  setClassicQueue([]);
                  setClassicAnswers([]);
                  setClassicCompleted(false);
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

  if (testDeck) {
    const currentCard = testQueue[testIndex];
    const correctCount = testAnswers.filter((item) => item.isCorrect).length;

    return (
      <Container>
        <StudyArea>
          <BackBtn
            onClick={() => {
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
                      <PreviewContent>
                        {getPromptText(item.card)}
                      </PreviewContent>
                    </PreviewRow>
                    <PreviewRow>
                      <PreviewLabel>To'g'ri:</PreviewLabel>
                      <PreviewContent>
                        {getAnswerText(item.card)}
                      </PreviewContent>
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
            <TestOptions>
              {buildTestOptions(testDeck, currentCard).map((option) => (
                <TestOptionBtn
                  key={option}
                  onClick={() => handleTestAnswer(option)}
                >
                  {option}
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

  if (gameDeck) {
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

  return (
    <Container>
      <ArenaHeader
        title="Flashcards"
        count={currentCount}
        // limit={limit}
        onBack={() => onBack && onBack()}
        rightContent={
          <ButtonWrapper onClick={handleCreateClick}>
            <Plus size={18} />
          </ButtonWrapper>
        }
      />

      <InfiniteScroll
        dataLength={flashcardDecks.length}
        next={fetchMoreData}
        hasMore={flashcardsHasMore}
        loader={
          <h4
            style={{
              textAlign: "center",
              color: "var(--text-muted-color)",
              marginTop: "16px",
            }}
          >
            Yuklanmoqda...
          </h4>
        }
        style={{ overflow: "visible" }} // Ensures grid layout doesn't break
      >
        <Grid>
          {flashcardDecks.map((deck) => {
            const isOwner =
              (deck.createdBy?._id || deck.createdBy) ===
              (user?._id || user?.id);
            const creatorName = deck.createdBy?.nickname || "Noma'lum";

            return (
              <Card
                key={deck._id}
                $raised={openMenuId === deck._id}
                onClick={() => {
                  setOpenMenuId(null);
                  openTrainingPicker(deck);
                }}
              >
                <CardTop>
                  <CardTitle>{deck.title}</CardTitle>
                  <MenuWrap
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <MenuButton
                      onClick={() =>
                        setOpenMenuId((prev) =>
                          prev === deck._id ? null : deck._id,
                        )
                      }
                    >
                      <MoreHorizontal size={16} />
                    </MenuButton>
                    {openMenuId === deck._id && (
                      <MenuDropdown
                        onClick={(event) => event.stopPropagation()}
                      >
                        <MenuItem
                          onClick={() => {
                            setViewingDeck(deck);
                            setOpenMenuId(null);
                          }}
                        >
                          <Eye size={14} />
                          Ko'rish
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleCopyLink(deck.urlSlug);
                            setOpenMenuId(null);
                          }}
                        >
                          <Link2 size={14} />
                          Havola nusxalash
                        </MenuItem>
                        {isOwner ? (
                          <>
                            <MenuItem
                              onClick={() => {
                                setShowMembersForDeck(deck);
                                setOpenMenuId(null);
                              }}
                            >
                              <Users size={14} />
                              A'zolar
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setEditingDeck(deck);
                                setOpenMenuId(null);
                              }}
                            >
                              <Pencil size={14} />
                              Tahrirlash
                            </MenuItem>
                            <MenuItem
                              $danger
                              onClick={() => {
                                setDeckToDelete(deck);
                                setOpenMenuId(null);
                              }}
                            >
                              <Trash2 size={14} />
                              O'chirish
                            </MenuItem>
                          </>
                        ) : (
                          <MenuItem
                            onClick={() => {
                              onLeave(deck._id);
                              setOpenMenuId(null);
                            }}
                          >
                            <LogOut size={14} />
                            Lug'atdan chiqish
                          </MenuItem>
                        )}
                      </MenuDropdown>
                    )}
                  </MenuWrap>
                </CardTop>
                <Meta>Jami so'zlar: {deck.cards?.length || 0}</Meta>
                <Meta>
                  {isOwner ? "Siz yaratgan" : `Muallif: ${creatorName}`}
                </Meta>
                <CardHint>
                  <PlayCircle size={14} />
                  Boshlash uchun kartani bosing
                </CardHint>
              </Card>
            );
          })}
          {flashcardDecks.length === 0 && (
            <Meta>Sizda hozircha lug'atlar yo'q.</Meta>
          )}
        </Grid>
      </InfiniteScroll>

      {viewingDeck && (
        <Overlay onClick={() => setViewingDeck(null)}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <HeaderRow
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <Title>{viewingDeck.title}</Title>
              <ButtonWrapper onClick={() => setViewingDeck(null)}>
                <X size={20} />
              </ButtonWrapper>
            </HeaderRow>
            <DialogContent>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <img
                  src={
                    viewingDeck.createdBy?.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <div
                    style={{ color: "var(--text-color)", fontWeight: "600" }}
                  >
                    {viewingDeck.createdBy?.nickname || "Noma'lum"}
                  </div>
                  <div
                    style={{
                      color: "var(--text-muted-color)",
                      fontSize: "13px",
                    }}
                  >
                    Lug'at yaratuvchisi
                  </div>
                </div>

                {!(
                  viewingDeck.createdBy?._id === (user?._id || user?.id) ||
                  viewingDeck.members?.some(
                    (m) =>
                      (m.userId?._id || m.userId) === (user?._id || user?.id),
                  )
                ) && (
                  <button
                    onClick={() => onJoin(viewingDeck._id)}
                    style={{
                      marginLeft: "auto",
                      background: "var(--primary-color)",
                      color: "white",
                      border: "none",
                      padding: "8px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    title="Yuklab olish (Qo'shilish)"
                  >
                    <Download size={20} />
                  </button>
                )}
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                {viewingDeck.cards?.some(
                  (c) => new Date(c.nextReviewDate) <= new Date(),
                ) ? (
                  <StudyBtn
                    style={{ flex: 1 }}
                    onClick={() => openTrainingPicker(viewingDeck)}
                  >
                    <PlayCircle size={18} /> O'qishni boshlash
                  </StudyBtn>
                ) : (
                  <StudyBtn
                    style={{
                      flex: 1,
                      background: "var(--secondary-color)",
                      color: "var(--text-color)",
                      border: "1px solid var(--border-color)",
                    }}
                    onClick={() => openTrainingPicker(viewingDeck)}
                  >
                    <RefreshCw size={18} /> Yana mashiq qilish
                  </StudyBtn>
                )}
              </div>

              <div>
                <div
                  style={{
                    color: "var(--text-color)",
                    fontWeight: "600",
                    marginBottom: "8px",
                    fontSize: "15px",
                  }}
                >
                  To'plamdagi so'zlar ({viewingDeck.cards?.length || 0})
                </div>
                <DeckPreviewList>
                  {viewingDeck.cards?.map((card, idx) => (
                    <PreviewItem key={card._id || idx}>
                      <PreviewRow style={{ alignItems: "center" }}>
                        <PreviewLabel>Oldi:</PreviewLabel>
                        <PreviewContent
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {card.frontImage && (
                            <img
                              src={card.frontImage}
                              alt="f"
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 4,
                                objectFit: "cover",
                              }}
                            />
                          )}
                          {card.front}
                        </PreviewContent>
                      </PreviewRow>
                      <PreviewRow style={{ alignItems: "center" }}>
                        <PreviewLabel>Orqa:</PreviewLabel>
                        <PreviewContent
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {card.backImage && (
                            <img
                              src={card.backImage}
                              alt="b"
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 4,
                                objectFit: "cover",
                              }}
                            />
                          )}
                          {card.back}
                        </PreviewContent>
                      </PreviewRow>
                    </PreviewItem>
                  ))}
                </DeckPreviewList>
              </div>
            </DialogContent>
          </Dialog>
        </Overlay>
      )}

      {showMembersForDeck && (
        <Overlay onClick={() => setShowMembersForDeck(null)}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <HeaderRow
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <Title>A'zolar ro'yxati</Title>

              <ButtonWrapper onClick={() => setShowMembersForDeck(null)}>
                <X size={20} />
              </ButtonWrapper>
            </HeaderRow>
            <DialogContent>
              {showMembersForDeck.members?.length > 0 ? (
                showMembersForDeck.members.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "10px 0",
                      borderBottom: "1px solid var(--border-color)",
                    }}
                  >
                    <img
                      src={
                        m.userId?.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                      }
                      alt="avatar"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <span style={{ color: "var(--text-color)" }}>
                      {m.userId?.nickname || "Noma'lum"}
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: "12px",
                        color: "var(--text-muted-color)",
                      }}
                    >
                      Joined: {new Date(m.joinedAt).toLocaleDateString()}
                    </span>
                  </div>
                ))
              ) : (
                <p
                  style={{
                    textAlign: "center",
                    color: "var(--text-muted-color)",
                  }}
                >
                  Hozircha hech kim qo'shilmagan.
                </p>
              )}
            </DialogContent>
          </Dialog>
        </Overlay>
      )}

      {(isCreateOpen || editingDeck) && (
        <CreateFlashcardDialog
          onClose={() => {
            setIsCreateOpen(false);
            setEditingDeck(null);
          }}
          initialDeck={editingDeck}
        />
      )}

      {trainingPickerDeck && (
        <Overlay onClick={() => setTrainingPickerDeck(null)}>
          <Dialog onClick={(event) => event.stopPropagation()}>
            <HeaderRow
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border-color)",
              }}
            >
              <Title>Mashq turini tanlang</Title>
              <ButtonWrapper onClick={() => setTrainingPickerDeck(null)}>
                <X size={20} />
              </ButtonWrapper>
            </HeaderRow>
            <DialogContent>
              <SettingsGrid>
                <FieldLabel htmlFor="flashcard-prompt-side">
                  Qaysi tomoni so'ralsin?
                </FieldLabel>
                <DirectionSelect
                  id="flashcard-prompt-side"
                  value={promptSide}
                  onChange={(event) => setPromptSide(event.target.value)}
                >
                  <option value="front">Old tomoni so'ralsin</option>
                  <option value="back">Orqa tomoni so'ralsin</option>
                </DirectionSelect>
              </SettingsGrid>
              <ModeOptions>
                <ModeCard
                  onClick={() => {
                    startStudy(trainingPickerDeck, true);
                    setTrainingPickerDeck(null);
                  }}
                >
                  <ModeTitle>Eslab qolish</ModeTitle>
                  <ModeDesc>
                    {promptSide === "front"
                      ? "Old tomoni ko'rsatiladi, orqa tomon bo'yicha baholaysiz."
                      : "Orqa tomoni ko'rsatiladi, old tomon bo'yicha baholaysiz."}
                  </ModeDesc>
                </ModeCard>
                <ModeCard onClick={() => startClassicStudy(trainingPickerDeck)}>
                  <ModeTitle>Flashcards</ModeTitle>
                  <ModeDesc>
                    {promptSide === "front"
                      ? "Old tomondan boshlanadi, aylantirib orqa tomonni topasiz."
                      : "Orqa tomondan boshlanadi, aylantirib old tomonni topasiz."}
                  </ModeDesc>
                </ModeCard>
                <ModeCard onClick={() => startTestStudy(trainingPickerDeck)}>
                  <ModeTitle>Test mashqi</ModeTitle>
                  <ModeDesc>
                    {promptSide === "front"
                      ? "Old tomon ko'rinadi, variantlarda mos orqa tomonni tanlaysiz."
                      : "Orqa tomon ko'rinadi, variantlarda mos old tomonni tanlaysiz."}
                  </ModeDesc>
                </ModeCard>
                <ModeCard onClick={() => startGameStudy(trainingPickerDeck)}>
                  <ModeTitle>Shooter o'yin</ModeTitle>
                  <ModeDesc>
                    {promptSide === "front"
                      ? "Old tomoni bo'yicha mos orqa tomonga o'q uzasiz."
                      : "Orqa tomoni bo'yicha mos old tomonga o'q uzasiz."}
                  </ModeDesc>
                </ModeCard>
              </ModeOptions>
            </DialogContent>
          </Dialog>
        </Overlay>
      )}

      <PremiumUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={() => {
          setIsUpgradeModalOpen(false);
          window.location.href = "/premium";
        }}
      />

      <ConfirmDialog
        isOpen={Boolean(deckToDelete)}
        onClose={() => {
          if (!isDeleting) setDeckToDelete(null);
        }}
        title="Lug'atni o'chirish"
        description={`${
          deckToDelete?.title || "Bu lug'at"
        } o'chirilsa, unga tegishli barcha progresslar ham o'chadi. Bu amalni bekor qilib bo'lmaydi.`}
        confirmText={isDeleting ? "O'chirilmoqda..." : "O'chirish"}
        cancelText="Bekor qilish"
        onConfirm={handleDeleteDeck}
        isDanger
      />
    </Container>
  );
};

export default FlashcardList;
