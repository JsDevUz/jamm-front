import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import toast from "react-hot-toast";
import { useArena } from "../../../contexts/ArenaContext";
import {
  Plus,
  PlayCircle,
  ArrowLeft,
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
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateFlashcardDialog from "./CreateFlashcardDialog";
import useAuthStore from "../../../store/authStore";
import PremiumUpgradeModal from "../../../app/components/PremiumUpgradeModal";
import ArenaHeader from "./ArenaHeader";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";

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
  margin-bottom: 24px;

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
`;

const RatingBtn = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  color: white;
  background-color: ${(props) => {
    if (props.type === "fail") return "#e74c3c";
    if (props.type === "hard") return "#e67e22";
    if (props.type === "good") return "#3498db";
    if (props.type === "easy") return "#2ecc71";
    return "gray";
  }};
  &:hover {
    filter: brightness(1.1);
  }
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
  const token = useAuthStore((state) => state.token);
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
    if (token && !hasFetched.current && flashcardDecks.length === 0) {
      fetchFlashcards(1);
      hasFetched.current = true;
    }
  }, [fetchFlashcards, token, flashcardDecks.length]);

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

  const handleCopyLink = (deckId) => {
    const url = `${window.location.origin}/arena/flashcards/${deckId}`;
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
        error?.response?.data?.message || "Lug'atni o'chirishda xatolik yuz berdi.",
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
                {currentCard?.backImage && (
                  <img
                    src={currentCard.backImage}
                    alt="back"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      objectFit: "contain",
                    }}
                  />
                )}
                <div>{currentCard?.back || "???"}</div>
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
                {currentCard?.frontImage && (
                  <img
                    src={currentCard.frontImage}
                    alt="front"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      objectFit: "contain",
                    }}
                  />
                )}
                <div>{currentCard?.front || "???"}</div>
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
                  startStudy(deck, true);
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
                            setViewingDeck(deck);
                            setOpenMenuId(null);
                          }}
                        >
                          <Eye size={14} />
                          Ko'rish
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleCopyLink(deck._id);
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
                    onClick={() => startStudy(viewingDeck)}
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
                    onClick={() => startStudy(viewingDeck, true)}
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
