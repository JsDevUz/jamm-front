import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useArena } from "../../../contexts/ArenaContext";
import {
  Save,
  Plus,
  X,
  Trash2,
  Image as ImageIcon,
  Search,
} from "lucide-react";
import toast from "react-hot-toast";
import { CloseBtnWrapper } from "./CreateSentenceBuilderDialog";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import useAuthStore from "../../../store/authStore";
import { APP_LIMITS, getTierLimit } from "../../../constants/appLimits";
import Spinner from "../../../shared/ui/feedback/Spinner";

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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.18s ease-out;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const DialogBox = styled.div`
  background-color: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  height: min(90vh, 860px);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${dialogIn} 0.22s ease-out;

  @media (max-width: 768px) {
    max-height: calc(100vh - 24px);
    border-radius: 18px;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 18px;
  border-bottom: 1px solid var(--border-color);

  h2 {
    margin: 0;
    color: var(--text-color);
  }
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 18px;

  @media (max-width: 768px) {
    padding: 14px 16px;
  }
`;

const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  &:hover {
    background: var(--tertiary-color);
    color: var(--text-color);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: var(--text-muted-color);
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
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
    props.$active ? "var(--primary-color)" : "var(--tertiary-color)"};
  color: ${(props) => (props.$active ? "#fff" : "var(--text-color)")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  background-color: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--tertiary-color)"};
  color: ${(props) => (props.active ? "white" : "var(--text-color)")};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    filter: brightness(1.1);
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
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
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
  padding: 12px;
  background: transparent;
  color: var(--primary-color);
  border: 1px dashed var(--primary-color);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(var(--primary-color-rgb), 0.1);
  }
`;

// --- TEMPLATE MODE STYLES ---
const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 12px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-color);
  font-size: 1rem;
  resize: vertical;
  font-family: monospace;
`;

const HelperText = styled.p`
  font-size: 0.85rem;
  color: var(--text-muted-color);
  margin-top: 8px;
`;

const PreBlock = styled.div`
  background: #111;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.85rem;
  color: #ddd;
  margin-top: 8px;
  white-space: pre-wrap;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 14px 18px 18px;
  border-top: 1px solid var(--border-color);

  @media (max-width: 768px) {
    padding: 12px 16px 16px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${(props) =>
    props.primary ? "var(--primary-color)" : "var(--tertiary-color)"};
  color: ${(props) => (props.primary ? "white" : "var(--text-color)")};

  &:hover {
    filter: brightness(1.1);
  }
`;

// --- IMAGE SEARCH STYLES ---
const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--tertiary-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
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
  border-radius: 12px;
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

const CreateFlashcardDialog = ({ onClose, initialDeck = null, folders = [] }) => {
  const { createFlashcardDeck, updateFlashcardDeck } = useArena();
  const currentUser = useAuthStore((state) => state.user);
  const isEditing = Boolean(initialDeck?._id);
  const maxCardsPerDeck = getTierLimit(APP_LIMITS.flashcardsPerDeck, currentUser);
  const [title, setTitle] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [inputMode, setInputMode] = useState("manual"); // 'manual' | 'template'

  // Manual State
  const [cards, setCards] = useState([
    { front: "", back: "", frontImage: "", backImage: "" },
  ]);

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
    if (isEditing) {
      setTitle(initialDeck?.title || "");
      setSelectedFolderId(
        typeof initialDeck?.folderId === "string"
          ? initialDeck.folderId
          : initialDeck?.folderId?._id || initialDeck?.folderId?.id || null,
      );
      setInputMode("manual");
      setCards(
        (initialDeck?.cards || []).length
          ? initialDeck.cards.map((card) => ({
              front: card.front || "",
              back: card.back || "",
              frontImage: card.frontImage || "",
              backImage: card.backImage || "",
            }))
          : [{ front: "", back: "", frontImage: "", backImage: "" }],
      );
      setTemplateText(buildTemplateTextFromCards(initialDeck?.cards || []));
      return;
    }

    setTitle("");
    setSelectedFolderId(null);
    setInputMode("manual");
    setCards([{ front: "", back: "", frontImage: "", backImage: "" }]);
    setTemplateText("");
  }, [initialDeck, isEditing]);

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
      { front: "", back: "", frontImage: "", backImage: "" },
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
        await updateFlashcardDeck(initialDeck._id, payload);
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
          <h2>{isEditing ? "Lug'atni Tahrirlash" : "Yangi Lug'at (Flashcards)"}</h2>
          <ButtonWrapper onClick={onClose}>
            <X size={18} />
          </ButtonWrapper>
        </HeaderRow>

        <Body>
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
        </Body>

        <Footer>
          <Button onClick={onClose}>Bekor qilish</Button>
          <Button primary onClick={handleSave}>
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
