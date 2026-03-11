import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CheckCircle,
  Eye,
  Link2,
  Pencil,
  PlayCircle,
  Plus,
  RefreshCw,
  Timer,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { useArena } from "../../../contexts/ArenaContext";
import useAuthStore from "../../../store/authStore";
import PremiumUpgradeModal from "../../../app/components/PremiumUpgradeModal";
import ArenaHeader from "./ArenaHeader";
import CreateSentenceBuilderDialog from "./CreateSentenceBuilderDialog";
import ArenaResultsPane from "./ArenaResultsPane";
import ShareLinksDialog from "./ShareLinksDialog";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

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
    padding-bottom: 24px;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  position: relative;
  z-index: ${(props) => (props.$raised ? 12 : 1)};
  background: var(--tertiary-color);
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
  margin: 0;
  color: var(--text-color);
  font-size: 18px;
`;

const CardDesc = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;

const Meta = styled.div`
  color: var(--text-muted-color);
  font-size: 13px;
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

const EmptyState = styled.div`
  border: 1px dashed var(--border-color);
  border-radius: 20px;
  padding: 48px 24px;
  text-align: center;
  color: var(--text-muted-color);
  background: rgba(148, 163, 184, 0.04);

  h3 {
    color: var(--text-color);
    margin-bottom: 8px;
  }
`;

const LoadMoreBtn = styled.button`
  align-self: center;
  min-width: 180px;
  min-height: 44px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-weight: 700;
  cursor: pointer;
`;

const DetailWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const DetailTop = styled.div`
  padding: 24px;
  border-radius: 22px;
  border: 1px solid var(--border-color);
  background: linear-gradient(
    135deg,
    rgba(34, 197, 94, 0.12),
    rgba(20, 184, 166, 0.08)
  );
`;

const BackBtn = styled.button`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted-color);
  cursor: pointer;
  font-weight: 700;
`;

const DetailTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 28px;
  color: var(--text-color);
`;

const QuestionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const QuestionCard = styled.div`
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  border-radius: 18px;
  padding: 18px;
`;

const QuestionTitle = styled.div`
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-color);
`;

const PromptBox = styled.div`
  padding: 12px 14px;
  border-radius: 12px;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  line-height: 1.6;
`;

const TokenRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const TokenChip = styled.span`
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: ${(props) => props.$bg || "var(--secondary-color)"};
  color: var(--text-color);
  font-size: 12px;
  font-weight: 700;
`;

const PracticeWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
`;

const PracticeCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background: var(--tertiary-color);
  padding: 24px;

  @media (max-width: 768px) {
    padding: 18px;
  }
`;

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
  color: var(--text-muted-color);
  font-size: 14px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  border-radius: 999px;
  background: var(--secondary-color);
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${(props) => props.$width || "0%"};
  background: linear-gradient(90deg, #22c55e, #14b8a6);
`;

const StageTitle = styled.h3`
  margin: 0 0 12px;
  color: var(--text-color);
  font-size: 18px;
`;

const PromptTitle = styled.h2`
  margin: 0 0 18px;
  color: var(--text-color);
  font-size: 28px;
  line-height: 1.35;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const BuilderArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const SentenceDropZone = styled.div`
  min-height: 94px;
  border-radius: 18px;
  border: 1px dashed var(--border-color);
  background: var(--secondary-color);
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-content: flex-start;
`;

const TokenBtn = styled.button`
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid
    ${(props) => {
      if (props.$state === "correct") return "rgba(34,197,94,0.55)";
      if (props.$state === "wrong") return "rgba(239,68,68,0.55)";
      return "var(--border-color)";
    }};
  background: ${(props) => {
    if (props.$selected) return "rgba(59,130,246,0.14)";
    if (props.$state === "correct") return "rgba(34,197,94,0.16)";
    if (props.$state === "wrong") return "rgba(239,68,68,0.14)";
    return "var(--secondary-color)";
  }};
  color: var(--text-color);
  font-weight: 700;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const TokensPool = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const AnswerPanel = styled.div`
  border-radius: 18px;
  border: 1px solid var(--border-color);
  background: ${(props) =>
    props.$correct ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.08)"};
  padding: 16px;
`;

const AnswerLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const MistakesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 14px;
`;

const MistakeItem = styled.div`
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.5;
`;

const FooterActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  flex-wrap: wrap;
`;
const PrimaryBtn = styled.button`
  min-height: 46px;
  padding: 0 18px;
  border-radius: 12px;
  border: none;
  background: var(--primary-color);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;
`;

const SecondaryBtn = styled.button`
  min-height: 46px;
  padding: 0 18px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--secondary-color);
  color: var(--text-color);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
`;

const SummaryCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 18px;
  background: var(--secondary-color);
  padding: 18px;

  strong {
    display: block;
    font-size: 28px;
    color: var(--text-color);
    margin-top: 8px;
  }
`;

const SummaryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const SummaryItem = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--secondary-color);
  padding: 14px;
`;

const DialogText = styled.p`
  margin: 0;
  color: var(--text-muted-color);
  font-size: 14px;
  line-height: 1.55;
`;

const ResultMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;

const ResultMetaCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--secondary-color);
  padding: 12px;

  span {
    display: block;
    font-size: 12px;
    color: var(--text-muted-color);
  }

  strong {
    display: block;
    margin-top: 6px;
    color: var(--text-color);
    font-size: 18px;
  }
`;

const ResultAttemptCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--secondary-color);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const ResultQuestionCard = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--tertiary-color);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const formatAttemptDate = (value) => {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString("uz-UZ");
  } catch {
    return "";
  }
};

const shuffleArray = (items) => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const buildOptionTokens = (question) => {
  const sourceTokens = question?.poolTokens || [
    ...(question?.answerTokens || []),
    ...(question?.extraTokens || []),
  ];

  return shuffleArray(sourceTokens).map((token, index) => ({
    id: `pool-${index}-${token}`,
    text: token,
  }));
};

const SentenceBuilderList = ({ initialDeckId, onBack }) => {
  const {
    sentenceBuilderDecks,
    sentenceBuildersPage,
    sentenceBuildersHasMore,
    fetchSentenceBuilders,
    fetchSentenceBuilderDeck,
    fetchSharedSentenceBuilderDeck,
    checkSentenceBuilderAnswer,
    deleteSentenceBuilderDeck,
    fetchSentenceBuilderResults,
    fetchSentenceBuilderShareLinks,
    createSentenceBuilderShareLink,
    deleteSentenceBuilderShareLink,
    submitSentenceBuilderAttempt,
    guestName,
  } = useArena();
  const user = useAuthStore((state) => state.user);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [viewingDeck, setViewingDeck] = useState(null);
  const [practicingDeck, setPracticingDeck] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [poolTokens, setPoolTokens] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [checkedResult, setCheckedResult] = useState(null);
  const [sessionResults, setSessionResults] = useState([]);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [checking, setChecking] = useState(false);
  const [editingDeck, setEditingDeck] = useState(null);
  const [deckToDelete, setDeckToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeShareShortCode, setActiveShareShortCode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answerMap, setAnswerMap] = useState({});
  const [attemptSummary, setAttemptSummary] = useState(null);
  const [isSubmittingAttempt, setIsSubmittingAttempt] = useState(false);
  const [shareDeck, setShareDeck] = useState(null);
  const [shareMode, setShareMode] = useState("persist");
  const [shareGroupName, setShareGroupName] = useState("");
  const [shareShowResults, setShareShowResults] = useState(true);
  const [shareTimeLimit, setShareTimeLimit] = useState(0);
  const [shareLinks, setShareLinks] = useState([]);
  const [loadingShareLinks, setLoadingShareLinks] = useState(false);
  const [creatingShareLink, setCreatingShareLink] = useState(false);
  const [deletingShareLinkId, setDeletingShareLinkId] = useState(null);
  const [resultsDeck, setResultsDeck] = useState(null);
  const [resultsData, setResultsData] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const hasFetched = useRef(false);

  const isPremium =
    user?.premiumStatus === "active" || user?.premiumStatus === "premium";
  const limit = isPremium ? 10 : 4;
  const shareLimit = isPremium ? 4 : 2;
  const currentCount = sentenceBuilderDecks.filter(
    (deck) =>
      (deck.createdBy?._id || deck.createdBy) === (user?._id || user?.id),
  ).length;

  useEffect(() => {
    if (hasFetched.current) return;
    if (sentenceBuilderDecks.length > 0) {
      hasFetched.current = true;
      return;
    }
    fetchSentenceBuilders(1).finally(() => {
      hasFetched.current = true;
    });
  }, [fetchSentenceBuilders, sentenceBuilderDecks.length]);

  useEffect(() => {
    if (!openMenuId) return undefined;
    const handleOutsideClick = () => setOpenMenuId(null);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openMenuId]);

  useEffect(() => {
    const loadInitialDeck = async () => {
      if (!initialDeckId || viewingDeck || practicingDeck) return;
      try {
        const deck = await fetchSentenceBuilderDeck(initialDeckId);
        if (deck) {
          setActiveShareShortCode(null);
          setViewingDeck(deck);
          return;
        }
      } catch {}

      try {
        const shared = await fetchSharedSentenceBuilderDeck(initialDeckId);
        if (shared?.deck) {
          setActiveShareShortCode(shared.shareLink?.shortCode || initialDeckId);
          setViewingDeck(shared.deck);
        }
      } catch {}
    };

    loadInitialDeck();
  }, [
    fetchSentenceBuilderDeck,
    fetchSharedSentenceBuilderDeck,
    initialDeckId,
    practicingDeck,
    viewingDeck,
  ]);

  const currentQuestion = practicingDeck?.items?.[questionIndex] || null;

  useEffect(() => {
    if (!currentQuestion || sessionComplete) return;
    setPoolTokens(buildOptionTokens(currentQuestion));
    setSelectedTokens([]);
    setCheckedResult(null);
  }, [currentQuestion, sessionComplete]);

  useEffect(() => {
    if (!practicingDeck || sessionComplete) return;
    const limitInSeconds = Number(practicingDeck.timeLimit || 0) * 60;
    setTimeLeft(limitInSeconds);
  }, [practicingDeck, sessionComplete]);

  useEffect(() => {
    if (!practicingDeck || sessionComplete || !timeLeft) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [practicingDeck, sessionComplete, timeLeft]);

  const handleCreateClick = () => {
    if (currentCount >= limit) {
      if (!isPremium) {
        setIsUpgradeModalOpen(true);
      } else {
        toast.error("Siz maksimal limitga yetgansiz");
      }
      return;
    }
    setIsCreateOpen(true);
  };

  const handleViewDeck = async (deckId) => {
    const deck = await fetchSentenceBuilderDeck(deckId);
    if (deck) {
      setViewingDeck(deck);
      setPracticingDeck(null);
      setSessionComplete(false);
    }
  };

  const handleStartPractice = async (deckOrId) => {
    let deck = typeof deckOrId === "string" ? null : deckOrId;
    if (!deck && typeof deckOrId === "string") {
      try {
        deck = await fetchSentenceBuilderDeck(deckOrId);
        setActiveShareShortCode(null);
      } catch {
        const shared = await fetchSharedSentenceBuilderDeck(deckOrId);
        deck = shared?.deck || null;
        setActiveShareShortCode(shared?.shareLink?.shortCode || deckOrId);
      }
    }

    if (!deck?.items?.length) {
      toast.error("Bu to'plamda savollar topilmadi");
      return;
    }

    setViewingDeck(null);
    setPracticingDeck(deck);
    setQuestionIndex(0);
    setSessionResults([]);
    setSessionComplete(false);
    setAnswerMap({});
    setAttemptSummary(null);
  };

  const openShareDialog = async (deck) => {
    setShareDeck(deck);
    setShareMode("persist");
    setShareGroupName("");
    setShareShowResults(true);
    setShareTimeLimit(0);
    setLoadingShareLinks(true);
    try {
      const data = await fetchSentenceBuilderShareLinks(deck._id);
      setShareLinks(Array.isArray(data) ? data : []);
    } finally {
      setLoadingShareLinks(false);
    }
  };

  const handleDeleteDeck = async () => {
    if (!deckToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteSentenceBuilderDeck(deckToDelete._id);
      if (viewingDeck?._id === deckToDelete._id) setViewingDeck(null);
      if (practicingDeck?._id === deckToDelete._id) setPracticingDeck(null);
      toast.success("Gap tuzish to'plami o'chirildi.");
      setDeckToDelete(null);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "To'plamni o'chirishda xatolik yuz berdi.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChooseToken = (tokenItem) => {
    if (checkedResult) return;
    setPoolTokens((prev) => prev.filter((item) => item.id !== tokenItem.id));
    setSelectedTokens((prev) => [...prev, tokenItem]);
  };

  const handleRemoveSelected = (tokenItem) => {
    if (checkedResult) return;
    setSelectedTokens((prev) =>
      prev.filter((item) => item.id !== tokenItem.id),
    );
    setPoolTokens((prev) => [...prev, tokenItem]);
  };

  const handleCheck = async () => {
    if (!currentQuestion) return;
    if (!selectedTokens.length) {
      toast.error("Avval bo'laklardan gap tuzing");
      return;
    }

    setChecking(true);
    try {
      const result = await checkSentenceBuilderAnswer(
        practicingDeck._id,
        questionIndex,
        selectedTokens.map((token) => token.text),
      );
      setCheckedResult(result);
      setAnswerMap((prev) => ({
        ...prev,
        [questionIndex]: selectedTokens.map((token) => token.text),
      }));
    } catch (error) {
      toast.error("Javobni tekshirishda xatolik yuz berdi");
    } finally {
      setChecking(false);
    }
  };

  const handleNext = () => {
    if (!checkedResult || !currentQuestion) return;

    const nextResults = [
      ...sessionResults,
      {
        prompt: currentQuestion.prompt,
        ...checkedResult,
      },
    ];

    setSessionResults(nextResults);

    if (questionIndex >= practicingDeck.items.length - 1) {
      handleFinishPractice();
      return;
    }

    setQuestionIndex((prev) => prev + 1);
  };

  const handleFinishPractice = async () => {
    if (!practicingDeck || isSubmittingAttempt) return;
    setIsSubmittingAttempt(true);
    try {
      const mergedAnswerMap = {
        ...answerMap,
        ...(currentQuestion && selectedTokens.length && !checkedResult
          ? { [questionIndex]: selectedTokens.map((token) => token.text) }
          : {}),
      };
      const answers = Object.entries(mergedAnswerMap).map(([idx, selected]) => ({
        questionIndex: Number(idx),
        selectedTokens: selected,
      }));
      const result = await submitSentenceBuilderAttempt(practicingDeck._id, {
        answers,
        guestName: user ? null : guestName,
        shareShortCode: activeShareShortCode || null,
      });
      setAttemptSummary(result);
      setSessionResults(result?.items || []);
      setSessionComplete(true);
    } catch (error) {
      toast.error("Natijani saqlashda xatolik yuz berdi");
    } finally {
      setIsSubmittingAttempt(false);
    }
  };

  const handleRestart = () => {
    if (!practicingDeck) return;
    setQuestionIndex(0);
    setSessionResults([]);
    setSessionComplete(false);
    setAnswerMap({});
    setAttemptSummary(null);
    setCheckedResult(null);
    setSelectedTokens([]);
  };

  const handleLoadResults = async (deck) => {
    setResultsDeck(deck);
    setLoadingResults(true);
    try {
      const response = await fetchSentenceBuilderResults(deck._id, {
        page: 1,
        limit: 500,
      });
      setResultsData(response?.data || []);
    } finally {
      setLoadingResults(false);
    }
  };

  const handleCreateShareLink = async () => {
    if (!shareDeck || creatingShareLink) return;
    if (shareMode === "persist" && !shareGroupName.trim()) {
      toast.error("Guruh nomini kiriting");
      return;
    }

    setCreatingShareLink(true);
    try {
      const created = await createSentenceBuilderShareLink(shareDeck._id, {
        persistResults: shareMode === "persist",
        groupName: shareMode === "persist" ? shareGroupName.trim() : "",
        showResults: shareShowResults,
        timeLimit: Number(shareTimeLimit) || 0,
      });
      setShareLinks((prev) => [created, ...prev]);
      const url = `${RESOLVED_APP_BASE_URL}/arena/sentence-builder/${created.shortCode}`;
      await navigator.clipboard.writeText(url);
      toast.success("Havola yaratildi va nusxalandi.");
      setShareGroupName("");
      setShareShowResults(true);
      setShareTimeLimit(0);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Havolani yaratishda xatolik yuz berdi",
      );
    } finally {
      setCreatingShareLink(false);
    }
  };

  const handleCopyShareLink = async (shortCode) => {
    try {
      await navigator.clipboard.writeText(
        `${RESOLVED_APP_BASE_URL}/arena/sentence-builder/${shortCode}`,
      );
      toast.success("Havola nusxalandi.");
    } catch {
      toast.error("Havolani nusxalab bo'lmadi");
    }
  };

  const handleDeleteShareLink = async (shareLinkId) => {
    if (!shareDeck || deletingShareLinkId) return;
    setDeletingShareLinkId(shareLinkId);
    try {
      await deleteSentenceBuilderShareLink(shareDeck._id, shareLinkId);
      setShareLinks((prev) => prev.filter((item) => item._id !== shareLinkId));
      toast.success("Havola o'chirildi.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Havolani o'chirishda xatolik yuz berdi",
      );
    } finally {
      setDeletingShareLinkId(null);
    }
  };

  useEffect(() => {
    if (
      practicingDeck &&
      Number(practicingDeck.timeLimit || 0) > 0 &&
      timeLeft <= 0 &&
      !sessionComplete &&
      !isSubmittingAttempt
    ) {
      handleFinishPractice();
    }
  }, [practicingDeck, timeLeft, sessionComplete, isSubmittingAttempt]);

  const progressWidth = useMemo(() => {
    if (!practicingDeck?.items?.length) return "0%";
    return `${((questionIndex + 1) / practicingDeck.items.length) * 100}%`;
  }, [practicingDeck, questionIndex]);

  const correctCount = sessionResults.filter((item) => item.isCorrect).length;
  const accuracy = sessionResults.length
    ? Math.round((correctCount / sessionResults.length) * 100)
    : 0;
  const normalizedResultItems = useMemo(
    () =>
      (resultsData || []).map((attempt, attemptIndex) => ({
        id: attempt._id || `${attempt.participantName}-${attempt.createdAt}-${attemptIndex}`,
        participantName: attempt.participantName || "Foydalanuvchi",
        groupName: attempt.groupName || "",
        createdAt: attempt.createdAt,
        score: Number(attempt.score || 0),
        total: Number(attempt.total || 0),
        accuracy: Number(attempt.accuracy || 0),
        breakdowns: (attempt.items || []).map((item, itemIndex) => ({
          questionIndex:
            item.questionIndex !== undefined ? item.questionIndex : itemIndex,
          prompt: item.prompt || `Savol #${itemIndex + 1}`,
          isCorrect: Boolean(item.isCorrect),
          selectedTokens: item.selectedTokens || [],
          expectedTokens: item.expectedTokens || [],
          mistakes: item.mistakes || [],
        })),
      })),
    [resultsData],
  );

  if (sessionComplete && practicingDeck) {
    return (
      <Container>
        <PracticeWrap>
          <BackBtn onClick={() => setPracticingDeck(null)}>
            <ArrowLeft size={18} />
            To'plamga qaytish
          </BackBtn>

          <PracticeCard>
            <StageTitle>Yakuniy natija</StageTitle>
            <DetailTitle>{practicingDeck.title}</DetailTitle>
            <SummaryGrid>
              <SummaryCard>
                To'g'ri javoblar
                <strong>{attemptSummary?.score ?? correctCount}</strong>
              </SummaryCard>
              <SummaryCard>
                Jami savollar
                <strong>{attemptSummary?.total ?? sessionResults.length}</strong>
              </SummaryCard>
              <SummaryCard>
                Reyting
                <strong>{attemptSummary?.accuracy ?? accuracy}%</strong>
              </SummaryCard>
            </SummaryGrid>

            {attemptSummary?.showResults !== false ? (
              <SummaryList>
                {sessionResults.map((result, index) => (
                  <SummaryItem key={`${result.prompt}-${index}`}>
                    <QuestionTitle>
                      Savol #{index + 1}: {result.prompt}
                    </QuestionTitle>
                    <Meta>{result.isCorrect ? "To'g'ri" : "Noto'g'ri"}</Meta>
                    <AnswerLine>
                      {(result.expectedTokens || result.expected || []).map(
                        (token, tokenIndex) => (
                          <TokenChip
                            key={`${token}-${tokenIndex}`}
                            $bg="rgba(59,130,246,0.12)"
                          >
                            {token}
                          </TokenChip>
                        ),
                      )}
                    </AnswerLine>
                  </SummaryItem>
                ))}
              </SummaryList>
            ) : (
              <DialogText>
                Bu havola uchun natija breakdowni talabalarga ko'rsatilmaydi.
              </DialogText>
            )}

            <FooterActions>
              <PrimaryBtn onClick={handleRestart}>
                <RefreshCw size={16} />
                Qayta boshlash
              </PrimaryBtn>
              <SecondaryBtn onClick={() => setPracticingDeck(null)}>
                Orqaga
              </SecondaryBtn>
            </FooterActions>
          </PracticeCard>
        </PracticeWrap>
      </Container>
    );
  }

  if (practicingDeck && currentQuestion) {
    return (
      <Container>
        <PracticeWrap>
          <BackBtn onClick={() => setPracticingDeck(null)}>
            <ArrowLeft size={18} />
            To'plamga qaytish
          </BackBtn>

          <PracticeCard>
            <ProgressRow>
              <div>
                {practicingDeck.title} • Savol {questionIndex + 1} /{" "}
                {practicingDeck.items.length}
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {Number(practicingDeck.timeLimit || 0) > 0 && (
                  <span>
                    <Timer size={14} style={{ marginRight: 6 }} />
                    {Math.max(0, Math.floor(timeLeft / 60))}:
                    {String(Math.max(0, timeLeft % 60)).padStart(2, "0")}
                  </span>
                )}
                <span>{checkedResult?.isCorrect ? "To'g'ri" : "Gapni tuzing"}</span>
              </div>
            </ProgressRow>
            <ProgressBar>
              <ProgressFill $width={progressWidth} />
            </ProgressBar>

            <BuilderArea>
              <div>
                <StageTitle>Savol</StageTitle>
                <PromptTitle>{currentQuestion.prompt}</PromptTitle>
              </div>

              <div>
                <StageTitle>Sizning gapingiz</StageTitle>
                <SentenceDropZone>
                  {selectedTokens.length ? (
                    selectedTokens.map((token, index) => {
                      const state = checkedResult
                        ? token.text === checkedResult.expected[index]
                          ? "correct"
                          : "wrong"
                        : null;

                      return (
                        <TokenBtn
                          key={token.id}
                          $selected
                          $state={state}
                          disabled={Boolean(checkedResult)}
                          onClick={() => handleRemoveSelected(token)}
                        >
                          {token.text}
                        </TokenBtn>
                      );
                    })
                  ) : (
                    <Meta>Bo'laklarni bosib gap tuzing</Meta>
                  )}
                </SentenceDropZone>
              </div>

              <div>
                <StageTitle>Bo'laklar</StageTitle>
                <TokensPool>
                  {poolTokens.map((token) => (
                    <TokenBtn
                      key={token.id}
                      onClick={() => handleChooseToken(token)}
                      disabled={Boolean(checkedResult)}
                    >
                      {token.text}
                    </TokenBtn>
                  ))}
                </TokensPool>
              </div>

              {checkedResult && practicingDeck.showResults !== false && (
                <AnswerPanel $correct={checkedResult.isCorrect}>
                  <StageTitle>
                    {checkedResult.isCorrect ? (
                      <>
                        <CheckCircle size={18} style={{ marginRight: 8 }} />
                        Javob to'g'ri
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={18} style={{ marginRight: 8 }} />
                        Javobda xato bor
                      </>
                    )}
                  </StageTitle>

                  <Meta>To'g'ri javob bo'laklari</Meta>
                  <AnswerLine>
                    {checkedResult.expected.map((token, index) => (
                      <TokenChip
                        key={`${token}-${index}`}
                        $bg="rgba(34,197,94,0.14)"
                      >
                        {token}
                      </TokenChip>
                    ))}
                  </AnswerLine>

                  {!checkedResult.isCorrect && (
                    <MistakesList>
                      {checkedResult.mistakes.map((mistake) => (
                        <MistakeItem key={mistake.position}>
                          {mistake.position}-bo'lakda siz{" "}
                          <strong>{mistake.actual || "hech narsa"}</strong>{" "}
                          tanladingiz.
                          <br />
                          To'g'risi:{" "}
                          <strong>
                            {mistake.expected || "ortiqcha bo'lak"}
                          </strong>
                        </MistakeItem>
                      ))}
                    </MistakesList>
                  )}
                </AnswerPanel>
              )}

              <FooterActions>
                {!checkedResult ? (
                  <PrimaryBtn onClick={handleCheck}>
                    {checking ? "Tekshirilmoqda..." : "Tekshirish"}
                  </PrimaryBtn>
                ) : (
                  <PrimaryBtn onClick={handleNext}>
                    {questionIndex >= practicingDeck.items.length - 1
                      ? "Yakunlash"
                      : "Keyingi savol"}
                  </PrimaryBtn>
                )}
                {questionIndex >= practicingDeck.items.length - 1 && (
                  <SecondaryBtn onClick={handleFinishPractice}>
                    Yakunlash
                  </SecondaryBtn>
                )}
              </FooterActions>
            </BuilderArea>
          </PracticeCard>
        </PracticeWrap>
      </Container>
    );
  }

  if (viewingDeck) {
    return (
      <Container>
        <DetailWrap>
          <BackBtn onClick={() => setViewingDeck(null)}>
            <ArrowLeft size={18} />
            Ro'yxatga qaytish
          </BackBtn>

          <DetailTop>
            <DetailTitle>{viewingDeck.title}</DetailTitle>
            <CardDesc>
              {viewingDeck.description || "Tavsif kiritilmagan"}
            </CardDesc>
            <Meta style={{ marginTop: 10 }}>
              Savollar soni: {viewingDeck.items?.length || 0}
            </Meta>
            <FooterActions>
              <PrimaryBtn onClick={() => handleStartPractice(viewingDeck)}>
                <PlayCircle size={16} />
                Mashq qilish
              </PrimaryBtn>
              {viewingDeck.canViewAnswers && (
                <>
                  <SecondaryBtn onClick={() => openShareDialog(viewingDeck)}>
                    <Link2 size={16} />
                    Havolalar
                  </SecondaryBtn>
                  <SecondaryBtn onClick={() => handleLoadResults(viewingDeck)}>
                    <BarChart3 size={16} />
                    Natijalar
                  </SecondaryBtn>
                </>
              )}
            </FooterActions>
          </DetailTop>

          <QuestionsList>
            {(viewingDeck.items || []).map((item, index) => (
              <QuestionCard key={item._id || index}>
                <QuestionTitle>Savol #{index + 1}</QuestionTitle>
                <PromptBox>{item.prompt}</PromptBox>

                {viewingDeck.canViewAnswers ? (
                  <>
                    <Meta style={{ marginTop: 14 }}>To'g'ri bo'laklar</Meta>
                    <TokenRow>
                      {(item.answerTokens || []).map((token, tokenIndex) => (
                        <TokenChip
                          key={`${token}-${tokenIndex}`}
                          $bg="rgba(59,130,246,0.12)"
                        >
                          {token}
                        </TokenChip>
                      ))}
                    </TokenRow>

                    {(item.extraTokens || []).length > 0 && (
                      <>
                        <Meta style={{ marginTop: 14 }}>
                          Chalg'ituvchi bo'laklar
                        </Meta>
                        <TokenRow>
                          {item.extraTokens.map((token, tokenIndex) => (
                            <TokenChip
                              key={`${token}-${tokenIndex}`}
                              $bg="rgba(244,114,182,0.12)"
                            >
                              {token}
                            </TokenChip>
                          ))}
                        </TokenRow>
                      </>
                    )}
                  </>
                ) : (
                  <Meta style={{ marginTop: 14 }}>
                    Javoblar faqat creator uchun ko'rinadi.
                  </Meta>
                )}
              </QuestionCard>
            ))}
          </QuestionsList>
        </DetailWrap>
      </Container>
    );
  }

  return (
    <Container>
      <ArenaHeader
        title="Gap tuzish"
        count={currentCount}
        onBack={onBack}
        rightContent={
          <ButtonWrapper onClick={handleCreateClick}>
            <Plus size={16} />
          </ButtonWrapper>
        }
      />

      {sentenceBuilderDecks.length === 0 ? (
        <EmptyState>
          <h3>Hozircha to'plam yo'q</h3>
          Gap bo'laklaridan mashq qilish uchun birinchi to'plamni yarating.
        </EmptyState>
      ) : (
        <>
          <Grid>
            {sentenceBuilderDecks.map((deck) => (
              <Card
                key={deck._id}
                $raised={openMenuId === deck._id}
                onClick={() => {
                  setOpenMenuId(null);
                  handleStartPractice(deck._id);
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
                        setOpenMenuId((prev) => (prev === deck._id ? null : deck._id))
                      }
                    >
                      <MoreHorizontal size={16} />
                    </MenuButton>
                    {openMenuId === deck._id && (
                      <MenuDropdown onClick={(event) => event.stopPropagation()}>
                        <MenuItem
                          onClick={() => {
                            handleViewDeck(deck._id);
                            setOpenMenuId(null);
                          }}
                        >
                          <Eye size={14} />
                          Ko'rish
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            openShareDialog(deck);
                            setOpenMenuId(null);
                          }}
                        >
                          <Link2 size={14} />
                          Havolalar
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleLoadResults(deck);
                            setOpenMenuId(null);
                          }}
                        >
                          <BarChart3 size={14} />
                          Natijalar
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
                      </MenuDropdown>
                    )}
                  </MenuWrap>
                </CardTop>
                <CardDesc>{deck.description || "Tavsif yo'q"}</CardDesc>
                <Meta>Savollar: {deck.items?.length || 0}</Meta>
                <CardHint>
                  <PlayCircle size={14} />
                  Boshlash uchun kartani bosing
                </CardHint>
              </Card>
            ))}
          </Grid>

          {sentenceBuildersHasMore && (
            <LoadMoreBtn
              onClick={() => fetchSentenceBuilders(sentenceBuildersPage + 1)}
            >
              Yana yuklash
            </LoadMoreBtn>
          )}
        </>
      )}

      {(isCreateOpen || editingDeck) && (
        <CreateSentenceBuilderDialog
          onClose={() => {
            setIsCreateOpen(false);
            setEditingDeck(null);
          }}
          initialDeck={editingDeck}
        />
      )}

      {isUpgradeModalOpen && (
        <PremiumUpgradeModal
          isOpen={isUpgradeModalOpen}
          onClose={() => setIsUpgradeModalOpen(false)}
        />
      )}

      <ConfirmDialog
        isOpen={Boolean(deckToDelete)}
        onClose={() => {
          if (!isDeleting) setDeckToDelete(null);
        }}
        title="To'plamni o'chirish"
        description={`${
          deckToDelete?.title || "Bu to'plam"
        } butunlay o'chiriladi. Bu amalni bekor qilib bo'lmaydi.`}
        confirmText={isDeleting ? "O'chirilmoqda..." : "O'chirish"}
        cancelText="Bekor qilish"
        onConfirm={handleDeleteDeck}
        isDanger
      />

      <ShareLinksDialog
        isOpen={Boolean(shareDeck)}
        onClose={() => {
          setShareDeck(null);
          setShareMode("persist");
          setShareGroupName("");
          setShareShowResults(true);
          setShareTimeLimit(0);
        }}
        title="Gap tuzish havolasini yaratish"
        itemTitle={shareDeck?.title || ""}
        limit={shareLimit}
        currentCount={shareLinks.length}
        mode={shareMode}
        onModeChange={setShareMode}
        groupName={shareGroupName}
        onGroupNameChange={setShareGroupName}
        showResults={shareShowResults}
        onShowResultsChange={setShareShowResults}
        timeLimit={shareTimeLimit}
        onTimeLimitChange={setShareTimeLimit}
        onCreate={handleCreateShareLink}
        isCreating={creatingShareLink}
        links={shareLinks}
        loadingLinks={loadingShareLinks}
        onCopyLink={handleCopyShareLink}
        onDeleteLink={handleDeleteShareLink}
        deletingLinkId={deletingShareLinkId}
        linkPrefix="/arena/sentence-builder/"
      />

      {resultsDeck && (
        <ArenaResultsPane
          title="Gap tuzish natijalari"
          subtitle={`"${resultsDeck.title}" bo'yicha ishlagan talabalar, ularning to'g'ri javoblari va har bir bo'lakdagi xatolari.`}
          searchPlaceholder="Talaba yoki guruh qidirish..."
          loading={loadingResults}
          results={normalizedResultItems}
          onClose={() => setResultsDeck(null)}
        />
      )}
    </Container>
  );
};

export default SentenceBuilderList;
