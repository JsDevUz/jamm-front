import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  Bold,
  ChevronsDownUp,
  Code2,
  Eye,
  Heading1,
  Heading2,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  PanelRight,
  Quote,
  Sparkles,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import MarkdownRenderer from "./MarkdownRenderer";
import { uploadArticleImage } from "../../../api/articlesApi";
import useAuthStore from "../../../store/authStore";
import {
  APP_LIMITS,
  countMarkdownImages,
  countWords,
  isPremiumUser,
} from "../../../constants/appLimits";

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
  background: rgba(8, 15, 28, 0.72);
  backdrop-filter: blur(8px);
  z-index: 12000;
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 12px;
  overflow: hidden;
  animation: ${fadeIn} 0.18s ease-out;

  @media (min-width: 960px) {
    padding: 28px;
  }

  @media (max-width: 640px) {
    padding: 0;
  }
`;

const Dialog = styled.div`
  --article-editor-text: var(--text-color);
  --article-editor-muted: var(--text-muted-color);
  --article-editor-surface: color-mix(
    in srgb,
    var(--secondary-color) 84%,
    black 16%
  );
  --article-editor-surface-2: color-mix(
    in srgb,
    var(--tertiary-color) 86%,
    black 14%
  );
  --article-editor-surface-3: color-mix(
    in srgb,
    var(--input-color) 88%,
    black 12%
  );
  --article-editor-border: color-mix(in srgb, var(--border-color) 80%, white 20%);
  --article-editor-soft: color-mix(
    in srgb,
    var(--background-color) 76%,
    transparent
  );
  --article-editor-primary: var(--primary-color);

  width: min(1320px, 100%);
  max-width: 100vw;
  height: 100%;
  min-width: 0;
  box-sizing: border-box;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--article-editor-surface) 92%, white 8%) 0%,
    var(--article-editor-surface-2) 100%
  );
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.3);
  animation: ${dialogIn} 0.22s ease-out;

  @media (max-width: 640px) {
    width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
  box-sizing: border-box;
  gap: 16px;
  padding: 18px 22px;
  border-bottom: 1px solid var(--article-editor-border);
  background: color-mix(in srgb, var(--article-editor-surface) 86%, transparent);
  backdrop-filter: blur(16px);

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
    gap: 14px;
  }

  @media (max-width: 640px) {
    padding: 14px 12px 12px;
  }
`;

const HeaderMeta = styled.div`
  min-width: 0;
  color: var(--article-editor-text);

  h3 {
    margin: 0 0 4px;
    font-size: 18px;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: var(--article-editor-muted);
  }

  @media (max-width: 640px) {
    h3 {
      font-size: 16px;
    }

    p {
      font-size: 12px;
      line-height: 1.5;
    }
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  box-sizing: border-box;
  gap: 10px;

  @media (max-width: 820px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
    align-items: start;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ModeSwitch = styled.div`
  display: flex;
  min-width: 0;
  box-sizing: border-box;
  padding: 4px;
  background: color-mix(in srgb, var(--article-editor-soft) 74%, transparent);
  border-radius: 999px;

  @media (max-width: 820px) {
    width: 100%;
  }

  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-radius: 18px;
    gap: 4px;
  }
`;

const ModeBtn = styled.button`
  min-width: 0;
  border: none;
  background: ${(p) =>
    p.active
      ? "color-mix(in srgb, var(--article-editor-surface) 82%, white 18%)"
      : "transparent"};
  color: ${(p) =>
    p.active ? "var(--article-editor-text)" : "var(--article-editor-muted)"};
  padding: 9px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  @media (max-width: 640px) {
    padding: 10px 8px;
    border-radius: 14px;
    font-size: 12px;
  }
`;

const GhostBtn = styled.button`
  border: none;
  background: color-mix(in srgb, var(--article-editor-soft) 74%, transparent);
  color: var(--article-editor-text);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 820px) {
    justify-self: end;
  }

  @media (max-width: 640px) {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }
`;

const SaveBtn = styled.button`
  border: none;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--article-editor-primary) 84%, #2563eb 16%),
    #0f9d8f
  );
  color: white;
  height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.55 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};

  @media (max-width: 820px) {
    width: 100%;
  }
`;

const Body = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${(p) =>
    p.mode === "split" ? "minmax(0, 1.1fr) minmax(0, 0.9fr)" : "1fr"};

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const EditorPane = styled.div`
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  display: ${(p) =>
    p.mode === "preview" ? "none" : p.mode === "write" ? "flex" : "flex"};
  flex-direction: column;
  background: color-mix(in srgb, var(--article-editor-surface) 82%, transparent);
`;

const PreviewPane = styled.div`
  min-height: 0;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  display: ${(p) =>
    p.mode === "write" ? "none" : p.mode === "preview" ? "block" : "block"};

  border-left: ${(p) =>
    p.mode === "split" ? "1px solid var(--article-editor-border)" : "none"};
  overflow-y: auto;

  @media (max-width: 960px) {
    border-left: none;
  }
`;

const Toolbar = styled.div`
  min-width: 0;
  box-sizing: border-box;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  border-bottom: 1px solid var(--article-editor-border);
  background: color-mix(in srgb, var(--article-editor-surface) 84%, transparent);

  @media (max-width: 640px) {
    padding: 10px 12px;
    gap: 6px;
    position: sticky;
    top: 0;
    z-index: 4;
  }
`;

const ToolBtn = styled.button`
  min-width: 38px;
  height: 38px;
  padding: 0 12px;
  border: 1px solid var(--article-editor-border);
  background: color-mix(in srgb, var(--article-editor-surface) 80%, white 20%);
  color: var(--article-editor-text);
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;

  @media (max-width: 640px) {
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 12px;
  }
`;

const EditorScroll = styled.div`
  flex: 1;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 22px;

  @media (max-width: 640px) {
    padding: 14px 12px 24px;
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 16px;
  min-width: 0;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: grid;
  gap: 8px;
  min-width: 0;
  color: var(--article-editor-muted);
  font-size: 13px;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  border: 1px solid var(--article-editor-border);
  background: var(--article-editor-surface-3);
  border-radius: 16px;
  padding: 14px 16px;
  color: var(--article-editor-text);
  font-size: 15px;
  outline: none;

  @media (max-width: 640px) {
    border-radius: 14px;
    padding: 13px 14px;
    font-size: 14px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  min-height: ${(p) => p.minHeight || "120px"};
  border: 1px solid var(--article-editor-border);
  background: var(--article-editor-surface-3);
  border-radius: 18px;
  padding: 16px;
  color: var(--article-editor-text);
  font-size: 15px;
  line-height: 1.75;
  resize: vertical;
  outline: none;

  @media (max-width: 640px) {
    border-radius: 16px;
    padding: 14px;
    font-size: 14px;
    line-height: 1.65;
  }
`;

const CoverCard = styled.button`
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed
    color-mix(in srgb, var(--article-editor-primary) 36%, transparent);
  background:
    linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(15, 157, 143, 0.08)),
    color-mix(in srgb, var(--article-editor-surface) 78%, transparent);
  min-height: 180px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 640px) {
    min-height: 148px;
    border-radius: 18px;
  }
`;

const CoverHint = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  box-sizing: border-box;
  gap: 10px;
  color: var(--article-editor-text);
`;

const PreviewWrap = styled.div`
  max-width: 880px;
  min-width: 0;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 36px 28px 60px;

  @media (max-width: 640px) {
    padding: 18px 14px 36px;
  }
`;

const PreviewHero = styled.div`
  margin-bottom: 28px;

  img {
    width: 100%;
    border-radius: 28px;
    margin-bottom: 24px;
    max-height: 360px;
    object-fit: cover;
  }

  h1 {
    margin: 0 0 12px;
    font-size: clamp(2rem, 5vw, 3.8rem);
    line-height: 1.05;
    color: var(--article-editor-text);
  }

  p {
    margin: 0;
    color: var(--article-editor-muted);
    font-size: 17px;
    line-height: 1.7;
  }

  @media (max-width: 640px) {
    margin-bottom: 22px;

    img {
      border-radius: 18px;
      margin-bottom: 16px;
      max-height: 220px;
    }

    h1 {
      font-size: 1.9rem;
      line-height: 1.08;
    }

    p {
      font-size: 14px;
      line-height: 1.6;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const Tag = styled.span`
  padding: 7px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--article-editor-primary) 16%, transparent);
  color: color-mix(in srgb, var(--article-editor-primary) 76%, white 24%);
  font-size: 12px;
  font-weight: 700;
`;

const buildInitialState = (article) => ({
  title: article?.title || "",
  excerpt: article?.excerpt || "",
  coverImage: article?.coverImage || "",
  tags: Array.isArray(article?.tags) ? article.tags.join(", ") : "",
  markdown: article?.markdown || "",
});

const ArticleEditorDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialArticle,
  saving,
}) => {
  const currentUser = useAuthStore((state) => state.user);
  const [mode, setMode] = useState(
    window.innerWidth <= 960 ? "write" : "split",
  );
  const [form, setForm] = useState(buildInitialState(initialArticle));
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef(null);
  const coverInputRef = useRef(null);
  const inlineInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setForm(buildInitialState(initialArticle));
  }, [initialArticle, isOpen]);

  if (!isOpen) return null;

  const tags = form.tags
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const articleWordLimit = isPremiumUser(currentUser)
    ? APP_LIMITS.articleWordsPremium
    : APP_LIMITS.articleWordsOrdinary;
  const articleImageLimit = isPremiumUser(currentUser)
    ? APP_LIMITS.articleImagesPremium
    : APP_LIMITS.articleImagesOrdinary;

  const patchForm = (key, value) =>
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

  const insertAroundSelection = (prefix, suffix = "", placeholder = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = form.markdown.slice(start, end) || placeholder;
    const nextValue =
      form.markdown.slice(0, start) +
      prefix +
      selected +
      suffix +
      form.markdown.slice(end);

    patchForm("markdown", nextValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + prefix.length + selected.length + suffix.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const insertLine = (value) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const nextValue =
      form.markdown.slice(0, start) + value + form.markdown.slice(start);
    patchForm("markdown", nextValue);
    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + value.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const handleUpload = async (file, modeType) => {
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadArticleImage(file);
      if (!response?.url) throw new Error("Upload failed");

      if (modeType === "cover") {
        patchForm("coverImage", response.url);
      } else {
        insertLine(`\n![${file.name}](${response.url})\n`);
      }
    } catch (error) {
      toast.error("Rasmni yuklab bo'lmadi");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      toast.error("Sarlavha kiriting");
      return;
    }

    if (!form.markdown.trim()) {
      toast.error("Article matni bo'sh bo'lmasin");
      return;
    }

    if (countWords(form.markdown) > articleWordLimit) {
      toast.error(`Article matni maksimal ${articleWordLimit} ta so'z bo'lishi kerak`);
      return;
    }

    if (
      countMarkdownImages(form.markdown) + (form.coverImage ? 1 : 0) >
      articleImageLimit
    ) {
      toast.error(
        `Har bir article uchun maksimal ${articleImageLimit} ta rasm ishlatish mumkin`,
      );
      return;
    }

    await onSubmit({
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      coverImage: form.coverImage,
      tags,
      markdown: form.markdown,
    });
  };

  return (
    <Overlay onClick={onClose}>
      <Dialog onClick={(event) => event.stopPropagation()}>
        <Header>
          <HeaderMeta>
            <h3>{initialArticle?._id ? "Articleni tahrirlash" : "Yangi article"}</h3>
            <p>
              Medium uslubidagi markdown editor: cover, inline image, preview va
              publish.
            </p>
          </HeaderMeta>
          <HeaderActions>
            <ModeSwitch>
              <ModeBtn
                active={mode === "write"}
                onClick={() => setMode("write")}
              >
                <Sparkles size={14} />
                Write
              </ModeBtn>
              <ModeBtn
                active={mode === "split"}
                onClick={() => setMode("split")}
              >
                <PanelRight size={14} />
                Split
              </ModeBtn>
              <ModeBtn
                active={mode === "preview"}
                onClick={() => setMode("preview")}
              >
                <Eye size={14} />
                Preview
              </ModeBtn>
            </ModeSwitch>
            <SaveBtn disabled={saving || uploading} onClick={handleSubmit}>
              {saving
                ? "Saqlanmoqda..."
                : initialArticle?._id
                  ? "Yangilash"
                  : "Publish"}
            </SaveBtn>
            <GhostBtn onClick={onClose}>
              <X size={18} />
            </GhostBtn>
          </HeaderActions>
        </Header>

        <Body mode={mode}>
          <EditorPane mode={mode}>
            <Toolbar>
              <ToolBtn onClick={() => insertLine("# ")}>
                <Heading1 size={16} />
              </ToolBtn>
              <ToolBtn onClick={() => insertLine("## ")}>
                <Heading2 size={16} />
              </ToolBtn>
              <ToolBtn
                onClick={() => insertAroundSelection("**", "**", "Qalin")}
              >
                <Bold size={16} />
              </ToolBtn>
              <ToolBtn
                onClick={() => insertAroundSelection("_", "_", "Kursiv")}
              >
                <Italic size={16} />
              </ToolBtn>
              <ToolBtn onClick={() => insertLine("- ")}>
                <List size={16} />
              </ToolBtn>
              <ToolBtn onClick={() => insertLine("1. ")}>
                <ListOrdered size={16} />
              </ToolBtn>
              <ToolBtn onClick={() => insertLine("> ")}>
                <Quote size={16} />
              </ToolBtn>
              <ToolBtn
                onClick={() =>
                  insertLine(
                    "\n:::dropdown Dropdown sarlavhasi\nBu yerga yashirin kontent yoziladi.\n:::\n",
                  )
                }
              >
                <ChevronsDownUp size={16} />
              </ToolBtn>
              <ToolBtn
                onClick={() =>
                  insertAroundSelection("\n```txt\n", "\n```\n", "Kod bloki")
                }
              >
                <Code2 size={16} />
              </ToolBtn>
              <ToolBtn onClick={() => inlineInputRef.current?.click()}>
                <ImagePlus size={16} />
                Rasm
              </ToolBtn>
            </Toolbar>

            <EditorScroll>
              <FormGrid>
                <Label>
                  Cover image
                  <CoverCard onClick={() => coverInputRef.current?.click()}>
                    {form.coverImage ? (
                      <img src={form.coverImage} alt="Article cover" />
                    ) : (
                      <CoverHint>
                        <ImagePlus size={28} />
                        <span>
                          {uploading
                            ? "Yuklanmoqda..."
                            : "Cover rasm yuklash uchun bosing"}
                        </span>
                      </CoverHint>
                    )}
                  </CoverCard>
                </Label>

                <Label>
                  Sarlavha
                  <Input
                    value={form.title}
                    onChange={(event) =>
                      patchForm(
                        "title",
                        event.target.value.slice(0, APP_LIMITS.articleTitleChars),
                      )
                    }
                    placeholder="Masalan: Design systems nega chiroyli bo'lmaydi?"
                    maxLength={APP_LIMITS.articleTitleChars}
                  />
                </Label>

                <Label>
                  Qisqa tavsif
                  <TextArea
                    minHeight="88px"
                    value={form.excerpt}
                    onChange={(event) =>
                      patchForm(
                        "excerpt",
                        event.target.value.slice(0, APP_LIMITS.articleExcerptChars),
                      )
                    }
                    placeholder="Kartochkada ko'rinadigan qisqa intro..."
                    maxLength={APP_LIMITS.articleExcerptChars}
                  />
                </Label>

                <Label>
                  Teglar
                  <Input
                    value={form.tags}
                    onChange={(event) =>
                      patchForm(
                        "tags",
                        event.target.value
                          .split(",")
                          .slice(0, APP_LIMITS.articleTagCount)
                          .map((item) =>
                            item.trim().slice(0, APP_LIMITS.articleTagChars),
                          )
                          .join(", "),
                      )
                    }
                    placeholder="frontend, product, design"
                  />
                </Label>

                <Label>
                  Markdown
                  <TextArea
                    ref={textareaRef}
                    minHeight="420px"
                    value={form.markdown}
                    onChange={(event) =>
                      patchForm("markdown", event.target.value)
                    }
                    placeholder="# Birinchi sarlavha

Intro paragraf...

## Bo'lim
- punkt
- yana punkt

![Rasm](https://...)
"
                  />
                </Label>
              </FormGrid>
            </EditorScroll>
          </EditorPane>

          <PreviewPane mode={mode}>
            <PreviewWrap>
              <PreviewHero>
                {form.coverImage ? (
                  <img src={form.coverImage} alt={form.title || "Article cover"} />
                ) : null}
                <h1>{form.title || "Sarlavha shu yerda ko'rinadi"}</h1>
                <p>
                  {form.excerpt ||
                    "Qisqa tavsif yozilsa shu yerda chiqadi. Preview publish oldidan real ko'rinishni beradi."}
                </p>
                {tags.length > 0 && (
                  <Tags>
                    {tags.map((tag) => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </Tags>
                )}
              </PreviewHero>
              <MarkdownRenderer content={form.markdown} />
            </PreviewWrap>
          </PreviewPane>
        </Body>

        <input
          ref={coverInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => handleUpload(event.target.files?.[0], "cover")}
        />
        <input
          ref={inlineInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => handleUpload(event.target.files?.[0], "inline")}
        />
      </Dialog>
    </Overlay>
  );
};

export default ArticleEditorDialog;
