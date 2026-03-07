import React, { useEffect, useMemo, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Plus, Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import { useArena } from "../../../contexts/ArenaContext";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import { APP_LIMITS } from "../../../constants/appLimits";

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
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 10000;
  animation: ${fadeIn} 0.18s ease-out;
`;

const DialogBox = styled.div`
  width: min(100%, 860px);
  max-height: min(88vh, 920px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--secondary-color);
  border: 1px solid var(--border-color);
  border-radius: 22px;
  animation: ${dialogIn} 0.22s ease-out;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-color);

  h2 {
    margin: 0;
    font-size: 20px;
    color: var(--text-color);
  }
`;

export const CloseBtnWrapper = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background: var(--input-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  outline: none;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: ${(props) => props.$minHeight || "88px"};
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  outline: none;
  resize: vertical;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const Helper = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-muted-color);
  line-height: 1.5;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 18px;
`;

const ItemCard = styled.div`
  border: 1px solid var(--border-color);
  background: var(--tertiary-color);
  border-radius: 18px;
  padding: 18px;
`;

const ItemHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const ItemTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  color: var(--text-color);
`;

const RemoveBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TokenPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const TokenChip = styled.span`
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: ${(props) => props.$tone || "var(--secondary-color)"};
  color: var(--text-color);
  font-size: 12px;
  font-weight: 600;
`;

const AddBtn = styled.button`
  width: 100%;
  min-height: 52px;
  border-radius: 14px;
  border: 1px dashed var(--border-color);
  background: transparent;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 18px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 20px;
  border-top: 1px solid var(--border-color);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FooterInfo = styled.div`
  font-size: 13px;
  color: var(--text-muted-color);
  line-height: 1.5;
`;

const SaveBtn = styled.button`
  min-width: 180px;
  height: 46px;
  border-radius: 12px;
  border: none;
  background: var(--primary-color);
  color: white;
  font-weight: 700;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const splitAnswerTokens = (value = "") =>
  String(value)
    .split(/[\s,]+/)
    .map((token) => token.trim())
    .filter(Boolean);

const createEmptyItem = () => ({
  prompt: "",
  answer: "",
  extraTokens: "",
});

const parsePatternToItems = (pattern = "") =>
  String(pattern)
    .split(/\n\s*\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const promptLine = lines.find((line) => line.startsWith("$"));
      const answerLine = lines.find(
        (line) =>
          (line.startsWith('"') && line.endsWith('"')) ||
          (line.startsWith("'") && line.endsWith("'")),
      );
      const extraLine = lines.find(
        (line) => line.startsWith("`") && line.endsWith("`"),
      );

      return {
        prompt: promptLine ? promptLine.replace(/^\$\s*/, "").trim() : "",
        answer: answerLine ? answerLine.slice(1, -1).trim() : "",
        extraTokens: extraLine ? extraLine.slice(1, -1).trim() : "",
      };
    })
    .filter((item) => item.prompt && item.answer);

const CreateSentenceBuilderDialog = ({ onClose, initialDeck = null }) => {
  const { createSentenceBuilderDeck, updateSentenceBuilderDeck } = useArena();
  const isEditing = Boolean(initialDeck?._id);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pattern, setPattern] = useState("");
  const [items, setItems] = useState([createEmptyItem()]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setTitle(initialDeck?.title || "");
      setDescription(initialDeck?.description || "");
      setPattern("");
      setItems(
        (initialDeck?.items || []).length
          ? initialDeck.items.map((item) => ({
              prompt: item.prompt || "",
              answer: Array.isArray(item.answerTokens)
                ? item.answerTokens.join(" ")
                : item.answer || "",
              extraTokens: Array.isArray(item.extraTokens)
                ? item.extraTokens.join(", ")
                : "",
            }))
          : [createEmptyItem()],
      );
      return;
    }

    setTitle("");
    setDescription("");
    setPattern("");
    setItems([createEmptyItem()]);
  }, [initialDeck, isEditing]);

  const totalValidItems = useMemo(
    () =>
      items.filter((item) => item.prompt.trim() && item.answer.trim()).length,
    [items],
  );

  const handleItemChange = (index, field, value) => {
    const limitMap = {
      prompt: APP_LIMITS.sentenceBuilderPromptChars,
      answer: APP_LIMITS.sentenceBuilderAnswerChars,
      extraTokens: APP_LIMITS.sentenceBuilderDescriptionChars,
    };
    setItems((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: limitMap[field]
                ? value.slice(0, limitMap[field])
                : value,
            }
          : item,
      ),
    );
  };

  const handleAddItem = () => {
    if (items.length >= 30) {
      toast.error("Bitta to'plamga maksimal 30 ta savol qo'shiladi");
      return;
    }
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  const handleRemoveItem = (index) => {
    setItems((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("To'plam nomini kiriting");
      return;
    }

    const finalItems = items
      .map((item) => ({
        prompt: item.prompt.trim(),
        answer: item.answer.trim(),
        extraTokens: item.extraTokens
          .split(",")
          .map((token) => token.trim())
          .filter(Boolean),
      }))
      .filter((item) => item.prompt && item.answer);

    const parsedPatternItems = parsePatternToItems(pattern);

    if (!finalItems.length && !parsedPatternItems.length) {
      toast.error("Kamida bitta savol kiriting");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        items: parsedPatternItems.length ? undefined : finalItems,
        pattern: parsedPatternItems.length ? pattern : "",
      };

      if (isEditing) {
        await updateSentenceBuilderDeck(initialDeck._id, payload);
      } else {
        await createSentenceBuilderDeck(payload);
      }
      toast.success(
        isEditing
          ? "Gap tuzish to'plami yangilandi"
          : "Gap tuzish to'plami yaratildi",
      );
      onClose();
    } catch (error) {
      const message = Array.isArray(error?.response?.data?.message)
        ? error.response.data.message[0]
        : error?.response?.data?.message || "Saqlashda xatolik yuz berdi";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <DialogBox onClick={(event) => event.stopPropagation()}>
        <Header>
          <h2>{isEditing ? "Gap Tuzish To'plamini Tahrirlash" : "Yangi Gap Tuzish To'plami"}</h2>
          <ButtonWrapper onClick={onClose}>
            <X size={18} />
          </ButtonWrapper>
        </Header>

        <Body>
          <FormGroup>
            <Label>To'plam nomi</Label>
            <Input
              placeholder="Masalan: Past Simple gaplari"
              value={title}
              onChange={(event) =>
                setTitle(
                  event.target.value.slice(
                    0,
                    APP_LIMITS.sentenceBuilderTitleChars,
                  ),
                )
              }
              maxLength={APP_LIMITS.sentenceBuilderTitleChars}
            />
          </FormGroup>

          <FormGroup>
            <Label>Tavsif</Label>
            <Textarea
              $minHeight="74px"
              placeholder="Bu to'plam nima haqida?"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value.slice(
                    0,
                    APP_LIMITS.sentenceBuilderDescriptionChars,
                  ),
                )
              }
              maxLength={APP_LIMITS.sentenceBuilderDescriptionChars}
            />
          </FormGroup>

          <FormGroup>
            <Label>Pattern orqali qo'shish</Label>
            <Textarea
              $minHeight="180px"
              placeholder={`$Men kecha maktabga bordim.\n"I went to school yesterday"\n\`my,are,today,tomorrow,go,will\`\n\n$U bugun ishlayapti.\n"She is working today"\n\`was,were,tomorrow,goes\``}
              value={pattern}
              onChange={(event) =>
                setPattern(
                  event.target.value.slice(
                    0,
                    APP_LIMITS.sentenceBuilderDescriptionChars * 10,
                  ),
                )
              }
            />
            <Helper>
              Pattern to'ldirilsa, shu formatdagi bloklardan savollar avtomatik
              olinadi.
            </Helper>
          </FormGroup>

          <Helper>
            Har savolda siz prompt yozasiz, to'g'ri javobni kiritasiz. Javob
            avtomatik bo'laklarga ajratiladi. Istasangiz qo'shimcha
            chalg'ituvchi bo'laklarni ham vergul bilan kiriting.
          </Helper>

          <ItemList>
            {items.map((item, index) => {
              const answerTokens = splitAnswerTokens(item.answer);
              const extraTokens = item.extraTokens
                .split(",")
                .map((token) => token.trim())
                .filter(Boolean);

              return (
                <ItemCard key={index}>
                  <ItemHead>
                    <ItemTitle>Savol #{index + 1}</ItemTitle>
                    {items.length > 1 && (
                      <RemoveBtn onClick={() => handleRemoveItem(index)}>
                        <Trash2 size={16} />
                      </RemoveBtn>
                    )}
                  </ItemHead>

                  <FormGroup>
                    <Label>Savol / Prompt</Label>
                    <Textarea
                      $minHeight="88px"
                      placeholder="Masalan: Men kecha maktabga bordim."
                      value={item.prompt}
                      onChange={(event) =>
                        handleItemChange(index, "prompt", event.target.value)
                      }
                      maxLength={APP_LIMITS.sentenceBuilderPromptChars}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>To'g'ri javob</Label>
                    <Input
                      placeholder="Masalan: I went to school yesterday"
                      value={item.answer}
                      onChange={(event) =>
                        handleItemChange(index, "answer", event.target.value)
                      }
                      maxLength={APP_LIMITS.sentenceBuilderAnswerChars}
                    />
                    {answerTokens.length > 0 && (
                      <TokenPreview>
                        {answerTokens.map((token, tokenIndex) => (
                          <TokenChip
                            key={`${token}-${tokenIndex}`}
                            $tone="rgba(59, 130, 246, 0.12)"
                          >
                            {token}
                          </TokenChip>
                        ))}
                      </TokenPreview>
                    )}
                  </FormGroup>

                  <FormGroup style={{ marginBottom: 0 }}>
                    <Label>Chalg'ituvchi bo'laklar</Label>
                    <Input
                      placeholder="Masalan: my, are, today, tomorrow, go, will"
                      value={item.extraTokens}
                      onChange={(event) =>
                        handleItemChange(
                          index,
                          "extraTokens",
                          event.target.value,
                        )
                      }
                      maxLength={APP_LIMITS.sentenceBuilderDescriptionChars}
                    />
                    {extraTokens.length > 0 && (
                      <TokenPreview>
                        {extraTokens.map((token, tokenIndex) => (
                          <TokenChip
                            key={`${token}-${tokenIndex}`}
                            $tone="rgba(244, 114, 182, 0.12)"
                          >
                            {token}
                          </TokenChip>
                        ))}
                      </TokenPreview>
                    )}
                  </FormGroup>
                </ItemCard>
              );
            })}
          </ItemList>

          <AddBtn onClick={handleAddItem}>
            <Plus size={18} />
            Yana savol qo'shish
          </AddBtn>
        </Body>

        <Footer>
          <FooterInfo>
            Tayyor savollar: {totalValidItems}. Bitta to'plamda ko'p savol
            saqlashingiz mumkin.
          </FooterInfo>
          <SaveBtn onClick={handleSave} disabled={saving}>
            {saving
              ? "Saqlanmoqda..."
              : isEditing
                ? "Saqlash"
                : "Yaratish"}
          </SaveBtn>
        </Footer>
      </DialogBox>
    </Overlay>
  );
};

export default CreateSentenceBuilderDialog;
