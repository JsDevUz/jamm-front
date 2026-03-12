import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Save,
  Plus,
  X,
  Trash2,
  Sparkles,
  Type,
  FileText,
  NutOffIcon,
  BookCopy,
} from "lucide-react";
import toast from "react-hot-toast";
import { useArena } from "../../../contexts/ArenaContext";
import * as arenaApi from "../../../api/arenaApi";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import { CloseBtnWrapper } from "./CreateSentenceBuilderDialog";
import { APP_LIMITS } from "../../../constants/appLimits";

const DialogOverlay = styled.div`
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
  backdrop-filter: blur(4px);
`;

const DialogContent = styled.div`
  background-color: var(--secondary-color);
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  border: 1px solid var(--border-color);
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--text-color);
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: var(--text-color);
    background-color: var(--hover-color);
  }
`;

const Body = styled.div`
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Footer = styled.div`
  padding: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--input-color);
  color: var(--text-color);
  font-size: 14px;
  min-height: 200px;
  resize: vertical;
  outline: none;
  transition: all 0.2s;
  font-family: monospace;
  white-space: pre-wrap;

  &:focus {
    border-color: var(--primary-color);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${(props) =>
    props.primary
      ? `
    background-color: var(--primary-color);
    color: white;
    border: none;

    &:hover {
      filter: brightness(1.1);
    }
    
    &:disabled {
      background-color: var(--border-color);
      color: var(--text-muted-color);
      cursor: not-allowed;
    }
  `
      : `
    background-color: transparent;
    color: var(--text-color);
    border: 1px solid var(--border-color);

    &:hover {
      background-color: var(--hover-color);
    }
  `}
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
`;

const Tab = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.active ? "var(--primary-color)" : "var(--border-color)"};
  background-color: ${(props) =>
    props.active ? "rgba(88, 101, 242, 0.1)" : "transparent"};
  color: ${(props) =>
    props.active ? "var(--primary-color)" : "var(--text-color)"};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.active ? "rgba(88, 101, 242, 0.15)" : "var(--hover-color)"};
  }
`;

const QuestionContainer = styled.div`
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Radio = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const Hint = styled.div`
  font-size: 12px;
  color: var(--text-muted-color);
  background: rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: 6px;
  line-height: 1.5;

  code {
    background: var(--tertiary-color);
    padding: 2px 4px;
    border-radius: 4px;
    color: var(--primary-color);
  }
`;

const createEmptyQuestion = () => ({
  questionText: "",
  options: ["", ""],
  correctOptionIndex: 0,
});

const CreateTestDialog = ({ isOpen, onClose, initialTest = null }) => {
  const { fetchMyTests, updateTest } = useArena();
  const isEditing = Boolean(initialTest?._id);
  const [mode, setMode] = useState("manual"); // 'manual' | 'template'
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayMode, setDisplayMode] = useState("single");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manual Mode State
  const [questions, setQuestions] = useState([
    createEmptyQuestion(),
  ]);

  // Template Mode State
  const [templateText, setTemplateText] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (isEditing) {
      setMode("manual");
      setTitle(initialTest?.title || "");
      setDescription(initialTest?.description || "");
      setDisplayMode(initialTest?.displayMode || "single");
      setQuestions(
        (initialTest?.questions || []).length
          ? initialTest.questions.map((question) => ({
              questionText: question.questionText || "",
              options: Array.isArray(question.options)
                ? [...question.options]
                : ["", ""],
              correctOptionIndex: Number(question.correctOptionIndex) || 0,
            }))
          : [createEmptyQuestion()],
      );
      setTemplateText("");
      return;
    }

    setMode("manual");
    setTitle("");
    setDescription("");
    setDisplayMode("single");
    setQuestions([createEmptyQuestion()]);
    setTemplateText("");
  }, [initialTest, isEditing, isOpen]);

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    if (questions.length >= 30) {
      toast.error("Maksimal 30 ta savol qo'shish mumkin!");
      return;
    }
    setQuestions([
      ...questions,
      createEmptyQuestion(),
    ]);
  };

  const handleRemoveQuestion = (index) => {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestionText = (index, value) => {
    const newQs = [...questions];
    newQs[index].questionText = value.slice(0, APP_LIMITS.testQuestionChars);
    setQuestions(newQs);
  };

  const handleAddOption = (qIndex) => {
    const newQs = [...questions];
    if (newQs[qIndex].options.length >= 4) return;
    newQs[qIndex].options.push("");
    setQuestions(newQs);
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const newQs = [...questions];
    if (newQs[qIndex].options.length <= 2) return;
    newQs[qIndex].options = newQs[qIndex].options.filter(
      (_, i) => i !== oIndex,
    );
    // Adjust correct index if needed
    if (newQs[qIndex].correctOptionIndex >= newQs[qIndex].options.length) {
      newQs[qIndex].correctOptionIndex = 0;
    } else if (newQs[qIndex].correctOptionIndex === oIndex) {
      newQs[qIndex].correctOptionIndex = 0;
    }
    setQuestions(newQs);
  };

  const updateOptionText = (qIndex, oIndex, value) => {
    const newQs = [...questions];
    newQs[qIndex].options[oIndex] = value.slice(0, APP_LIMITS.testOptionChars);
    setQuestions(newQs);
  };

  const setCorrectOption = (qIndex, oIndex) => {
    const newQs = [...questions];
    newQs[qIndex].correctOptionIndex = oIndex;
    setQuestions(newQs);
  };

  // Parser for Template Mode
  const parseTemplate = (text) => {
    const parsedQuestions = [];
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    let currentQ = null;

    for (let line of lines) {
      if (line.startsWith("$")) {
        // Safe push existing before starting new
        if (currentQ && currentQ.questionText && currentQ.options.length >= 2) {
          if (currentQ.correctOptionIndex === -1) {
            throw new Error(
              `Savolga to'g'ri javob belgilanmagan: ${currentQ.questionText}`,
            );
          }
          parsedQuestions.push(currentQ);
        }
        currentQ = {
          questionText: line.substring(1).trim(),
          options: [],
          correctOptionIndex: -1,
        };
      } else if (line.startsWith("+")) {
        if (!currentQ)
          throw new Error("Javobdan oldin savol yozilishi ($) kerak");
        currentQ.options.push(line.substring(1).trim());
        currentQ.correctOptionIndex = currentQ.options.length - 1;
      } else if (line.startsWith("-")) {
        if (!currentQ)
          throw new Error("Javobdan oldin savol yozilishi ($) kerak");
        currentQ.options.push(line.substring(1).trim());
      } else {
        throw new Error(`Tushunarsiz qator: ${line}. Faqat $, +, - ishlating.`);
      }
    }

    // Push last question
    if (currentQ) {
      if (currentQ.correctOptionIndex === -1) {
        throw new Error(
          `Savolga to'g'ri javob belgilanmagan: ${currentQ.questionText}`,
        );
      }
      if (currentQ.options.length < 2) {
        throw new Error(
          `Savolda kamida 2 ta javob bo'lishi kerak: ${currentQ.questionText}`,
        );
      }
      parsedQuestions.push(currentQ);
    }

    return parsedQuestions;
  };

  const handleSubmit = async () => {
    if (!title.trim()) return toast.error("Testga nom bering!");

    let payloadQuestions = [];

    if (mode === "manual") {
      // Validate Manual
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        if (!q.questionText.trim())
          return toast.error(`${i + 1}-shavol matni bo'sh!`);
        if (q.options.some((o) => !o.trim()))
          return toast.error(
            `${i + 1}-savolning barcha javoblarini to'ldiring!`,
          );
      }
      payloadQuestions = questions;
    } else {
      // Validate Template
      try {
        payloadQuestions = parseTemplate(templateText);
        if (payloadQuestions.length === 0) {
          return toast.error("Andazada hech qanday savol topilmadi.");
        }
        if (payloadQuestions.length > 30) {
          return toast.error(
            "Andazada savollar soni 30 tadan oshmasligi kerak!",
          );
        }
      } catch (err) {
        return toast.error(`Xato: ${err.message}`);
      }
    }

    try {
      setIsSubmitting(true);
      const payload = {
        title: title.trim(),
        description: description.trim(),
        isPublic: true,
        displayMode,
        questions: payloadQuestions,
      };
      if (isEditing) {
        await updateTest(initialTest._id, payload);
      } else {
        await arenaApi.createTest(payload);
      }
      await fetchMyTests();
      toast.success(isEditing ? "Test yangilandi" : "Test yaratildi");
      onClose();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Test yaratishda xatolik";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <h2>{isEditing ? "Testni Tahrirlash" : "Yangi Test Yaratish"}</h2>
          <ButtonWrapper onClick={onClose}>
            <X size={18} />
          </ButtonWrapper>
        </Header>

        <Body>
          <InputGroup>
            <Label>Test nomi</Label>
            <Input
              placeholder="Masalan: JavaScript Asoslari"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value.slice(0, APP_LIMITS.testTitleChars))
              }
              maxLength={APP_LIMITS.testTitleChars}
            />
          </InputGroup>

          <InputGroup>
            <Label>Test haqida (Ixtiyoriy)</Label>
            <Input
              placeholder="Qisqacha tavsif..."
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value.slice(0, APP_LIMITS.testDescriptionChars),
                )
              }
              maxLength={APP_LIMITS.testDescriptionChars}
            />
          </InputGroup>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "16px",
            }}
          >
            <InputGroup style={{ gridColumn: "span 1" }}>
              <Label>Test ko'rinishi</Label>
              <TabsContainer style={{ marginBottom: 0 }}>
                <Tab
                  active={displayMode === "single"}
                  onClick={() => setDisplayMode("single")}
                  type="button"
                  style={{ padding: "8px" }}
                >
                  <BookCopy size={14} /> 1-talab
                </Tab>
                <Tab
                  active={displayMode === "list"}
                  onClick={() => setDisplayMode("list")}
                  type="button"
                  style={{ padding: "8px" }}
                >
                  <FileText size={14} /> Ro'yxat
                </Tab>
              </TabsContainer>
            </InputGroup>
          </div>

          <TabsContainer>
            <Tab
              active={mode === "manual"}
              onClick={() => setMode("manual")}
              type="button"
            >
              <Plus size={16} /> Qo'lda kiritish
            </Tab>
            <Tab
              active={mode === "template"}
              onClick={() => setMode("template")}
              type="button"
            >
              <Type size={16} /> Maxsus Andaza
            </Tab>
          </TabsContainer>

          {mode === "manual" ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {questions.map((q, qIndex) => (
                <QuestionContainer key={qIndex}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Label>{qIndex + 1} - Savol</Label>
                    <ButtonWrapper
                      onClick={() => handleRemoveQuestion(qIndex)}
                      disabled={questions.length <= 1}
                      style={{ color: "var(--danger-color)" }}
                    >
                      <Trash2 size={18} />
                    </ButtonWrapper>
                  </div>
                  <Input
                    placeholder="Savol matni..."
                    value={q.questionText}
                    onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Label
                      style={{
                        fontSize: "12px",
                        color: "var(--text-muted-color)",
                      }}
                    >
                      Javob variantlari (To'g'ri javobni belgilang)
                    </Label>
                    {q.options.map((opt, oIndex) => (
                      <OptionRow key={oIndex}>
                        <Radio
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correctOptionIndex === oIndex}
                          onChange={() => setCorrectOption(qIndex, oIndex)}
                        />
                        <Input
                          style={{ flex: 1 }}
                          placeholder={`${oIndex + 1} - variant`}
                          value={opt}
                          onChange={(e) =>
                            updateOptionText(qIndex, oIndex, e.target.value)
                          }
                        />
                        <ButtonWrapper
                          onClick={() => handleRemoveOption(qIndex, oIndex)}
                          disabled={q.options.length <= 2}
                        >
                          <X size={18} />
                        </ButtonWrapper>
                      </OptionRow>
                    ))}
                  </div>
                  {q.options.length < 4 && (
                    <Button
                      type="button"
                      style={{
                        alignSelf: "flex-start",
                        marginTop: "8px",
                        fontSize: "12px",
                        padding: "6px 12px",
                      }}
                      onClick={() => handleAddOption(qIndex)}
                    >
                      <Plus size={14} /> Variant qo'shish
                    </Button>
                  )}
                </QuestionContainer>
              ))}

              <Button
                type="button"
                style={{ borderStyle: "dashed", padding: "16px" }}
                onClick={handleAddQuestion}
                disabled={questions.length >= 30}
              >
                <Plus size={18} />{" "}
                {questions.length >= 30
                  ? "Limitga yetildi (30/30)"
                  : "Yana savol qo'shish"}
              </Button>
            </div>
          ) : (
            <InputGroup>
              <Hint>
                <b>Andaza qoidalari:</b> <br />
                <code>$</code> belgisi bilan <b>Savol</b>ni boshlang. <br />
                <code>-</code> belgisi bilan <b>Xato javoblar</b>ni kiriting.{" "}
                <br />
                <code>+</code> belgisi bilan bitta <b>To'g'ri javob</b>ni
                kiriting. <br />
                Qator tashlab navbatdagi savolga o'tasiz.
              </Hint>
              <TextArea
                placeholder={`$ JavaScript qaysi yilda yaratilgan?\n- 1990\n- 1994\n+ 1995\n- 2000\n\n$ Const qanday o'zgaruvchi?\n- O'zgaruvchan\n+ O'zgarmas\n- Funksiya`}
                value={templateText}
                onChange={(e) => setTemplateText(e.target.value)}
              />
            </InputGroup>
          )}
        </Body>

        <Footer>
          <Button onClick={onClose} disabled={isSubmitting}>
            Bekor qilish
          </Button>
          <Button primary onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting
              ? "Saqlanmoqda..."
              : isEditing
                ? "O'zgarishlarni saqlash"
                : "Testni Yaratish"}
          </Button>
        </Footer>
      </DialogContent>
    </DialogOverlay>
  );
};

export default CreateTestDialog;
