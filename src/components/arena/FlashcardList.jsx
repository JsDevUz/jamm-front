import React, { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useArena } from "../../contexts/ArenaContext";
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
} from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateFlashcardDialog from "./CreateFlashcardDialog";
import useAuthStore from "../../store/authStore";
import PremiumUpgradeModal from "../PremiumUpgradeModal";
import ArenaHeader from "./ArenaHeader";
import { PlusBtn } from "../ProfilePage";

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
`;

const Dialog = styled.div`
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
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
          <PlusBtn onClick={handleCreateClick}>
            <Plus size={18} />
          </PlusBtn>
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

            return (
              <Card
                key={deck._id}
                onClick={() => setViewingDeck(deck)}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <CardTitle>{deck.title}</CardTitle>
                  <div
                    style={{ display: "flex", gap: "8px" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isOwner && (
                      <button
                        onClick={() => setShowMembersForDeck(deck)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--text-muted-color)",
                          cursor: "pointer",
                        }}
                        title="A'zolar"
                      >
                        <Users size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleCopyLink(deck._id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--text-muted-color)",
                        cursor: "pointer",
                      }}
                      title="Nusxalash"
                    >
                      <Link2 size={18} />
                    </button>
                    {!isOwner && (
                      <button
                        onClick={() => onLeave(deck._id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#e74c3c",
                          cursor: "pointer",
                        }}
                        title="Chiqish"
                      >
                        <LogOut size={18} />
                      </button>
                    )}
                  </div>
                </div>
                <Meta>Jami so'zlar: {deck.cards?.length || 0}</Meta>
                <Meta>
                  {isOwner
                    ? "Siz yaratgan"
                    : `Muallif: ${deck.createdBy?.nickname || "Noma'lum"}`}
                </Meta>
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
              <button
                onClick={() => setViewingDeck(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted-color)",
                  cursor: "pointer",
                }}
              >
                <ArrowLeft size={20} />
              </button>
            </HeaderRow>
            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
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
            </div>
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
              <button
                onClick={() => setShowMembersForDeck(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted-color)",
                  cursor: "pointer",
                }}
              >
                <ArrowLeft size={20} />
              </button>
            </HeaderRow>
            <div
              style={{ padding: "20px", maxHeight: "60vh", overflowY: "auto" }}
            >
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
            </div>
          </Dialog>
        </Overlay>
      )}

      {isCreateOpen && (
        <CreateFlashcardDialog onClose={() => setIsCreateOpen(false)} />
      )}

      <PremiumUpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onUpgrade={() => {
          setIsUpgradeModalOpen(false);
          window.location.href = "/premium";
        }}
      />
    </Container>
  );
};

export default FlashcardList;
