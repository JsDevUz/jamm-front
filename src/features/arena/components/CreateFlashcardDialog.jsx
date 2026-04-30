import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useArena } from "../../../contexts/ArenaContext";
import {
  Plus,
  X,
  Trash2,
  Image as ImageIcon,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import useAuthStore from "../../../store/authStore";
import { APP_LIMITS, getTierLimit } from "../../../constants/appLimits";
import Spinner from "../../../shared/ui/feedback/Spinner";
import {
  DialogActionButton,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPanel,
  ModalSubtitle,
  ModalTitle,
  ModalTitleBlock,
} from "../../../shared/ui/dialogs/ModalShell";

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

const Overlay = styled(ModalOverlay)`
  animation: ${fadeIn} 0.18s ease-out;
`;

const DialogBox = styled(ModalPanel).attrs({
  $width: "min(100%, 760px)",
  $maxWidth: "95vw",
  $maxHeight: "min(90vh, 920px)",
  $radius: "20px",
})`
  height: min(90vh, 860px);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${dialogIn} 0.22s ease-out;

  @media (max-width: 768px) {
    height: auto;
    max-height: calc(var(--visual-viewport-height, var(--app-height, 100dvh)) - max(24px, env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px)));
    border-radius: 18px;
  }
`;

const HeaderRow = styled(ModalHeader)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const HeaderText = styled(ModalTitleBlock)`
  min-width: 0;
`;

const HeaderTitle = styled(ModalTitle)`
  font-size: 18px;
`;

const HeaderSubtitle = styled(ModalSubtitle)`
  margin-top: 4px;
  line-height: 1.5;
`;

const Body = styled(ModalBody)`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-secondary-color);
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-color);
  font-size: 14px;
`;

const FolderRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const FolderChip = styled.button`
  flex: 0 0 auto;
  min-height: 38px;
  max-width: 180px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid
    ${(props) => (props.$active ? "var(--primary-color)" : "var(--border-color)")};
  background: ${(props) =>
    props.$active
      ? "color-mix(in srgb, var(--primary-color) 14%, transparent)"
      : "var(--input-color)"};
  color: ${(props) => (props.$active ? "var(--primary-color)" : "var(--text-color)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
  font-size: 13px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
`;

const Tab = styled.button`
  flex: 1;
  min-height: 42px;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  background-color: ${(props) =>
    props.active
      ? "color-mix(in srgb, var(--primary-color) 14%, transparent)"
      : "var(--input-color)"};
  color: ${(props) => (props.active ? "var(--primary-color)" : "var(--text-color)")};
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;

  &:hover {
    background: var(--hover-color);
  }
`;

// --- MANUAL MODE STYLES ---
const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const CardItem = styled.div`
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const CardInputs = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DeleteBtn = styled.button`
  background: transparent;
  color: #e74c3c;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  &:hover {
    background: rgba(231, 76, 60, 0.1);
  }
`;

const AddCardBtn = styled.button`
  width: 100%;
  min-height: 42px;
  padding: 0 16px;
  background: var(--input-color);
  color: var(--primary-color);
  border: 1px dashed var(--primary-color);
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover {
    background: color-mix(in srgb, var(--primary-color) 8%, var(--input-color));
  }
`;

// --- TEMPLATE MODE STYLES ---
const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 12px 14px;
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-color);
  font-size: 14px;
  resize: vertical;
  font-family: monospace;
`;

const HelperText = styled.p`
  font-size: 0.85rem;
  color: var(--text-muted-color);
  margin-top: 8px;
`;

const PreBlock = styled.div`
  background: var(--input-color);
  border: 1px solid var(--border-color);
  padding: 12px;
  border-radius: 12px;
  font-family: monospace;
  font-size: 0.85rem;
  color: var(--text-color);
  margin-top: 8px;
  white-space: pre-wrap;
`;

const Footer = styled(ModalFooter)`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const Button = styled(DialogActionButton)`
  min-height: 38px;
  padding: 0 14px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
`;

// --- IMAGE SEARCH STYLES ---
const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 4px 8px;

  &:focus-within {
    border-color: var(--primary-color);
    box-shadow: none;
  }
`;

const FlexInput = styled.input`
  flex: 1;
  padding: 6px;
  background: transparent;
  border: none;
  color: var(--text-color);
  outline: none;
  font-size: 0.95rem;
  width: 100%;

  &:focus,
  &:focus-visible {
    outline: none;
    box-shadow: none;
  }
`;

const ImgBtn = styled.button`
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
  &:hover {
    color: var(--primary-color);
    background: rgba(88, 101, 242, 0.1);
  }
`;

const MiniThumb = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  object-fit: cover;
`;

const SearchModalContent = styled.div`
  background: var(--secondary-color);
  width: 100%;
  max-width: 500px;
  border-radius: 18px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--border-color);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 8px;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-height: 350px;
  overflow-y: auto;
  padding: 4px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
  }
`;

const GridImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.03);
    border: 2px solid var(--primary-color);
  }
`;

const buildTemplateTextFromCards = (cards = []) =>
  cards
    .map((card) => {
      const front = String(card?.front || "").trim();
      const back = String(card?.back || "").trim();
      if (!front || !back) return "";
      return `${front},${back};`;
    })
    .filter(Boolean)
    .join("\n");

const createEmptyCard = () => ({
  front: "",
  back: "",
  frontImage: "",
  backImage: "",
});

const CreateFlashcardDialog = ({ onClose, initialDeck = null, folders = [] }) => {
  const { createFlashcardDeck, updateFlashcardDeck, fetchFlashcardDeck } = useArena();
  const currentUser = useAuthStore((state) => state.user);
  const isEditing = Boolean(initialDeck?._id || initialDeck?.id || initialDeck?.urlSlug);
  const maxCardsPerDeck = getTierLimit(APP_LIMITS.flashcardsPerDeck, currentUser);
  const activeDeckId =
    initialDeck?._id || initialDeck?.id || initialDeck?.urlSlug || null;
  const [title, setTitle] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [inputMode, setInputMode] = useState("manual"); // 'manual' | 'template'
  const [isHydratingDeck, setIsHydratingDeck] = useState(false);

  // Manual State
  const [cards, setCards] = useState([createEmptyCard()]);

  // Template State
  const [templateText, setTemplateText] = useState("");

  // Image Modal State
  const [imgModal, setImgModal] = useState({
    isOpen: false,
    cardIndex: null,
    side: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const applyDeck = (deck) => {
      setTitle(deck?.title || "");
      setSelectedFolderId(
        typeof deck?.folderId === "string"
          ? deck.folderId
          : deck?.folderId?._id || deck?.folderId?.id || null,
      );
      setInputMode("manual");
      setCards(
        (deck?.cards || []).length
          ? deck.cards.map((card) => ({
              front: card.front || "",
              back: card.back || "",
              frontImage: card.frontImage || "",
              backImage: card.backImage || "",
            }))
          : [createEmptyCard()],
      );
      setTemplateText(buildTemplateTextFromCards(deck?.cards || []));
    };

    if (isEditing && activeDeckId) {
      setIsHydratingDeck(true);
      void (async () => {
        const fullDeck =
          Array.isArray(initialDeck?.cards) && initialDeck.cards.length
            ? initialDeck
            : await fetchFlashcardDeck(activeDeckId);

        if (cancelled) return;
        applyDeck(fullDeck || initialDeck || null);
        setIsHydratingDeck(false);
      })();
      return () => {
        cancelled = true;
      };
    }

    setIsHydratingDeck(false);
    setTitle("");
    setSelectedFolderId(null);
    setInputMode("manual");
    setCards([createEmptyCard()]);
    setTemplateText("");

    return () => {
      cancelled = true;
    };
  }, [activeDeckId, fetchFlashcardDeck, initialDeck, isEditing]);

  const handleSearchImages = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const params = new URLSearchParams({
        action: "query",
        format: "json",
        origin: "*",
        generator: "search",
        gsrsearch: searchQuery.trim(),
        gsrnamespace: "6",
        gsrlimit: "9",
        prop: "imageinfo",
        iiprop: "url",
        iiurlwidth: "320",
        iiurlheight: "240",
      });

      const response = await fetch(
        `https://commons.wikimedia.org/w/api.php?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error("Image search request failed");
      }

      const data = await response.json();
      const pages = Object.values(data?.query?.pages || {});
      const results = pages
        .map((page) => page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url || "")
        .filter(Boolean)
        .slice(0, 9);

      setSearchResults(results);

      if (!results.length) {
        toast.error("Mos rasm topilmadi");
      }
    } catch (error) {
      console.error("Image search error:", error);
      toast.error("Rasm qidirib bo'lmadi");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectImage = (url) => {
    handleCardChange(imgModal.cardIndex, imgModal.side, url);
    setImgModal({ isOpen: false, cardIndex: null, side: null });
    setSearchQuery("");
    setSearchResults([]);
  };

  const openImageModal = (index, side) => {
    setImgModal({ isOpen: true, cardIndex: index, side });
    const querySuggest = cards[index][side.replace("Image", "")];
    if (querySuggest) {
      setSearchQuery(querySuggest);
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleAddCard = () => {
    if (cards.length >= maxCardsPerDeck) {
      toast.error(`Maksimal ${maxCardsPerDeck} ta so'z qo'shish mumkin!`);
      return;
    }
    setCards([
      ...cards,
      createEmptyCard(),
    ]);
  };

  const handleRemoveCard = (index) => {
    setCards(cards.filter((_, i) => i !== index));
  };

  const handleCardChange = (index, field, value) => {
    const newCards = [...cards];
    newCards[index][field] =
      field === "front" || field === "back"
        ? value.slice(0, APP_LIMITS.flashcardSideChars)
        : value;
    setCards(newCards);
  };

  const parseTemplate = () => {
    if (!templateText.trim()) return [];

    // Split by semicolon, filter out empty strings
    const blocks = templateText.split(";").filter((b) => b.trim());

    const parsedCards = [];
    for (const block of blocks) {
      // Split by first comma
      const commaIndex = block.indexOf(",");
      if (commaIndex > -1) {
        const front = block.substring(0, commaIndex).trim();
        const back = block.substring(commaIndex + 1).trim();
        if (front && back) {
          parsedCards.push({ front, back });
        }
      }
    }
    return parsedCards;
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Lug'at sarlavhasini kiriting");
      return;
    }

    let finalCards = [];
    if (inputMode === "manual") {
      finalCards = cards.filter(
        (c) => c.front.trim() !== "" && c.back.trim() !== "",
      );
    } else {
      finalCards = parseTemplate();
    }

    if (finalCards.length === 0) {
      toast.error("Kamida bitta to'g'ri karta kiriting");
      return;
    }

    if (finalCards.length > maxCardsPerDeck) {
      toast.error(`Maksimal ${maxCardsPerDeck} ta so'z qo'shish mumkin!`);
      return;
    }

    const payload = {
      title: title.trim(),
      cards: finalCards,
      folderId: selectedFolderId || null,
    };

    try {
      if (isEditing) {
        await updateFlashcardDeck(activeDeckId, payload);
      } else {
        await createFlashcardDeck(payload);
      }
      toast.success(
        isEditing ? "Lug'at yangilandi" : "Lug'at muvaffaqiyatli yaratildi",
      );
      onClose();
    } catch (err) {
      toast.error("Xatolik yuz berdi");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <DialogBox onClick={(e) => e.stopPropagation()}>
        <HeaderRow>
          <HeaderText>
            <HeaderTitle>
              {isEditing ? "Lug'atni tahrirlash" : "Yangi lug'at (Flashcards)"}
            </HeaderTitle>
            <HeaderSubtitle>
              Qo'lda ham, andaza orqali ham kartalarni bir xil oqimda boshqarishingiz mumkin.
            </HeaderSubtitle>
          </HeaderText>
          <ModalCloseButton onClick={onClose}>
            <X size={18} />
          </ModalCloseButton>
        </HeaderRow>

        <Body>
          {isHydratingDeck ? (
            <div
              style={{
                minHeight: 240,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner size={24} />
            </div>
          ) : (
            <>
          <FormGroup>
            <Label>To'plam nomi</Label>
            <Input
              placeholder="Masalan: Ingliz tili - 1-dars"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value.slice(0, APP_LIMITS.flashcardTitleChars),
                )
              }
              maxLength={APP_LIMITS.flashcardTitleChars}
            />
          </FormGroup>

          <FormGroup>
            <Label>Folder</Label>
            <FolderRow>
              <FolderChip
                type="button"
                $active={!selectedFolderId}
                onClick={() => setSelectedFolderId(null)}
              >
                Foldersiz
              </FolderChip>
              {folders.map((folder) => {
                const folderId = folder?._id || folder?.urlSlug;
                if (!folderId) return null;
                return (
                  <FolderChip
                    key={folderId}
                    type="button"
                    $active={selectedFolderId === folderId}
                    onClick={() => setSelectedFolderId(folderId)}
                    title={folder.title || "Folder"}
                  >
                    {folder.title || "Folder"}
                  </FolderChip>
                );
              })}
            </FolderRow>
          </FormGroup>

          <Tabs>
            <Tab
              active={inputMode === "manual"}
              onClick={() => setInputMode("manual")}
            >
              Qo'lda kiritish
            </Tab>
            <Tab
              active={inputMode === "template"}
              onClick={() => setInputMode("template")}
            >
              Andaza (Shablon)
            </Tab>
          </Tabs>

          {inputMode === "manual" ? (
            <>
              <CardList>
                {cards.map((c, idx) => (
                  <CardItem key={idx}>
                    <CardInputs>
                      <InputRow>
                        {c.frontImage && (
                          <MiniThumb src={c.frontImage} alt="f" />
                        )}
                        <FlexInput
                          placeholder={`So'z (front) ${idx + 1}`}
                          value={c.front}
                          onChange={(e) =>
                            handleCardChange(idx, "front", e.target.value)
                          }
                        />
                        <ImgBtn
                          onClick={() => openImageModal(idx, "frontImage")}
                          title="Rasm qidirish"
                        >
                          <ImageIcon size={16} />
                        </ImgBtn>
                      </InputRow>
                      <InputRow>
                        {c.backImage && <MiniThumb src={c.backImage} alt="b" />}
                        <FlexInput
                          placeholder={`Ma'nosi (back) ${idx + 1}`}
                          value={c.back}
                          onChange={(e) =>
                            handleCardChange(idx, "back", e.target.value)
                          }
                        />
                        <ImgBtn
                          onClick={() => openImageModal(idx, "backImage")}
                          title="Rasm qidirish"
                        >
                          <ImageIcon size={16} />
                        </ImgBtn>
                      </InputRow>
                    </CardInputs>
                    {cards.length > 1 && (
                      <DeleteBtn onClick={() => handleRemoveCard(idx)}>
                        <Trash2 size={20} />
                      </DeleteBtn>
                    )}
                  </CardItem>
                ))}
              </CardList>
              <AddCardBtn
                onClick={handleAddCard}
                disabled={cards.length >= maxCardsPerDeck}
              >
                <Plus size={18} />{" "}
                {cards.length >= maxCardsPerDeck
                  ? `Limitga yetildi (${maxCardsPerDeck}/${maxCardsPerDeck})`
                  : "Yangi so'z qo'shish"}
              </AddCardBtn>
            </>
          ) : (
            <FormGroup>
              <Label>Shablon matni</Label>
              <TextArea
                placeholder="Apple,Olma;Book,Kitob;"
                value={templateText}
                onChange={(e) => setTemplateText(e.target.value)}
              />
              <HelperText>
                So'z va uning ma'nosini vergul (<b>,</b>) bilan ajrating. Har
                bir so'z juftligini nuqtali-vergul (<b>;</b>) bilan ajrating.
              </HelperText>
              <PreBlock>
                Apple,Olma;
                <br />
                Book,Kitob;
                <br />
                Car,Mashina;
              </PreBlock>
            </FormGroup>
          )}
            </>
          )}
        </Body>

        <Footer>
          <Button $variant="ghost" onClick={onClose}>Bekor qilish</Button>
          <Button onClick={handleSave} disabled={isHydratingDeck}>
            {isEditing ? "O'zgarishlarni saqlash" : "Saqlash"}
          </Button>
        </Footer>
      </DialogBox>

      {/* IMAGE SEARCH MODAL */}
      {imgModal.isOpen && (
        <Overlay
          onClick={() =>
            setImgModal({ isOpen: false, cardIndex: null, side: null })
          }
          style={{ zIndex: 1100 }}
        >
          <SearchModalContent onClick={(e) => e.stopPropagation()}>
            <HeaderRow style={{ marginBottom: 8 }}>
              <h2>Rasm Qidirish</h2>
              <ButtonWrapper
                onClick={() =>
                  setImgModal({ isOpen: false, cardIndex: null, side: null })
                }
              >
                <X size={28} />
              </ButtonWrapper>
            </HeaderRow>

            <SearchForm onSubmit={handleSearchImages}>
              <Input
                placeholder="Rasm qidirish uchun so'z yozing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <Button
                primary
                type="submit"
                disabled={isSearching || !searchQuery.trim()}
              >
                {isSearching ? (
                  <Spinner size={18} />
                ) : (
                  <Search size={18} />
                )}
              </Button>
            </SearchForm>

            <ImageGrid>
              {searchResults.length === 0 && !isSearching && (
                <div
                  style={{
                    gridColumn: "span 3",
                    textAlign: "center",
                    padding: "40px 0",
                    color: "var(--text-muted-color)",
                  }}
                >
                  Qidirish tugmasini bosing
                </div>
              )}
              {searchResults.map((url, i) => (
                <GridImage
                  key={i}
                  src={url}
                  alt="result"
                  onClick={() => handleSelectImage(url)}
                />
              ))}
            </ImageGrid>
          </SearchModalContent>
        </Overlay>
      )}
    </Overlay>
  );
};

export default CreateFlashcardDialog;
