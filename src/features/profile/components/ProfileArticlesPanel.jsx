import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import {
  ArrowLeft,
  BookOpen,
  Copy,
  Eye,
  Heart,
  MessageCircle,
  PenSquare,
  Plus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../../../store/authStore";
import {
  createArticle,
  deleteArticle,
  fetchUserArticles,
  getArticle,
  getArticleContent,
  likeArticle,
  updateArticle,
  viewArticle,
} from "../../../api/articlesApi";
import {
  ArticleComments,
  ArticleEditorDialog,
  MarkdownRenderer,
} from "../../articles/components";
import {
  ProfileMobileBackButton,
  ProfilePaneEmptyState,
  ProfilePaneHeader,
  ProfilePaneTitle,
  ProfilePaneWrapper,
} from "../ui";
import { SidebarIconButton } from "../../../shared/ui/buttons/IconButton";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";

const MobileBackBtn = styled(ProfileMobileBackButton)`
  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

const ButtonWrapper = styled(SidebarIconButton)``;

const Shell = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
`;

const ListPane = styled.div`
  flex: 1;
  width: 100%;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
`;

const DetailPane = styled.div`
  flex: 1;
  overflow-y: auto;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 88%, transparent) 0%,
    color-mix(in srgb, var(--background-color) 76%, transparent) 100%
  );
`;

const DetailTopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const BackToListBtn = styled.button`
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
`;

const Empty = styled(ProfilePaneEmptyState)`
  min-height: 340px;
`;

const ArticleCard = styled.button`
  width: 100%;
  border: none;
  background: ${(p) =>
    p.active
      ? "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(15,157,143,0.1))"
      : "transparent"};
  border-bottom: 1px solid var(--border-color);
  padding: 12px 14px;
  text-align: left;
  cursor: pointer;
`;

const ArticleCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 4px;
`;

const ArticleCardCopyButton = styled(SidebarIconButton)`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 10px;
  margin-left: auto;
`;

const CoverThumb = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primary-color) 14%, transparent),
    color-mix(in srgb, var(--secondary-color) 82%, black 18%)
  );
  margin-bottom: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ArticleTitle = styled.h3`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.25;
`;

const ArticleExcerpt = styled.p`
  margin: 0 0 10px;
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.5;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 11px;
`;

const DetailWrap = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 18px 18px 40px;
`;

const HeroImage = styled.img`
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.18);
`;

const DetailTitle = styled.h1`
  margin: 0 0 10px;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  line-height: 1.04;
  color: var(--text-color);
`;

const DetailExcerpt = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary-color);
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 16px;
`;

const Tag = styled.span`
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.1);
  color: #60a5fa;
  font-size: 12px;
  font-weight: 700;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 18px 0 30px;
`;

const ActionBtn = styled.button`
  border: 1px solid
    ${(p) => (p.active ? p.activeColor || "#ef4444" : "var(--border-color)")};
  background: ${(p) =>
    p.active ? "rgba(239, 68, 68, 0.08)" : "rgba(255,255,255,0.04)"};
  color: ${(p) =>
    p.active ? p.activeColor || "#ef4444" : "var(--text-secondary-color)"};
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
`;

const SecondaryBtn = styled(ActionBtn)`
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
`;

const Divider = styled.div`
  height: 1px;
  background: var(--border-color);
  margin: 18px 0 28px;
`;

const Skeleton = styled.div`
  height: ${(p) => p.height || "18px"};
  border-radius: 12px;
  background: linear-gradient(
    90deg,
    rgba(148, 163, 184, 0.08),
    rgba(148, 163, 184, 0.18),
    rgba(148, 163, 184, 0.08)
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite linear;
  margin-bottom: 12px;

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`;

const resolveIdentifier = (profileUser, explicitId) =>
  explicitId || String(profileUser?._id || profileUser?.id || "");

const ProfileArticlesPanel = ({
  profileUser,
  profileUserId,
  isOwnProfile,
  onBack,
  onCountChange,
}) => {
  const currentUser = useAuthStore((state) => state.user);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedContent, setSelectedContent] = useState("");
  const [contentLoading, setContentLoading] = useState(false);
  const [commentArticle, setCommentArticle] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showDetailOnly, setShowDetailOnly] = useState(false);
  const viewedRef = useRef(new Set());

  const identifier = useMemo(
    () => resolveIdentifier(profileUser, profileUserId),
    [profileUser, profileUserId],
  );

  const applyArticlePatch = (articleId, patch) => {
    setArticles((prev) =>
      prev.map((article) => (article._id === articleId ? { ...article, ...patch } : article)),
    );
    setSelectedArticle((prev) =>
      prev && prev._id === articleId ? { ...prev, ...patch } : prev,
    );
  };

  const loadArticles = async () => {
    if (!identifier) return;
    setLoading(true);
    try {
      const items = await fetchUserArticles(identifier);
      setArticles(items || []);
      onCountChange?.(items?.length || 0);

      if (selectedArticle?._id) {
        const nextSelected =
          items?.find((item) => item._id === selectedArticle._id) || null;
        setSelectedArticle(nextSelected);
        setShowDetailOnly(Boolean(nextSelected));
        if (!nextSelected) {
          setSelectedContent("");
        }
      } else {
        setShowDetailOnly(false);
      }

      if (!items?.length) {
        setSelectedArticle(null);
        setSelectedContent("");
        setShowDetailOnly(false);
      }
    } catch (error) {
      toast.error("Maqolalarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [identifier]);

  useEffect(() => {
    if (!selectedArticle?._id) return;

    const loadDetail = async () => {
      setContentLoading(true);
      try {
        const [detail, content] = await Promise.all([
          getArticle(selectedArticle._id),
          getArticleContent(selectedArticle._id),
        ]);
        applyArticlePatch(detail._id, detail);
        setSelectedArticle(detail);
        setSelectedContent(content?.content || "");

        if (detail.previouslySeen) {
          viewedRef.current.add(detail._id);
        } else if (!viewedRef.current.has(selectedArticle._id)) {
          viewedRef.current.add(selectedArticle._id);
          const viewed = await viewArticle(selectedArticle._id);
          applyArticlePatch(selectedArticle._id, {
            views: viewed?.views || 0,
            previouslySeen: true,
          });
        }
      } catch (error) {
        toast.error("Article ochilmadi");
      } finally {
        setContentLoading(false);
      }
    };

    loadDetail();
  }, [selectedArticle?._id]);

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (editingArticle?._id) {
        const updated = await updateArticle(editingArticle._id, payload);
        applyArticlePatch(updated._id, updated);
        setSelectedArticle(updated);
        setSelectedContent(payload.markdown);
        toast.success("Article yangilandi");
      } else {
        const created = await createArticle(payload);
        setArticles((prev) => {
          const next = [created, ...prev];
          onCountChange?.(next.length);
          return next;
        });
        setSelectedArticle(created);
        setSelectedContent(payload.markdown);
        setShowDetailOnly(true);
        toast.success("Article yaratildi");
      }

      setEditorOpen(false);
      setEditingArticle(null);
    } catch (error) {
      toast.error("Articleni saqlab bo'lmadi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedArticle?._id) return;
    if (!window.confirm("Article o'chirilsinmi?")) return;

    try {
      await deleteArticle(selectedArticle._id);
      const nextArticles = articles.filter((item) => item._id !== selectedArticle._id);
      setArticles(nextArticles);
      setSelectedArticle(null);
      setSelectedContent("");
      setShowDetailOnly(false);
      onCountChange?.(nextArticles.length);
      toast.success("Article o'chirildi");
    } catch (error) {
      toast.error("Articleni o'chirib bo'lmadi");
    }
  };

  const handleLike = async (articleId) => {
    try {
      const response = await likeArticle(articleId);
      applyArticlePatch(articleId, response);
    } catch (error) {
      toast.error("Like yuborilmadi");
    }
  };

  const handleCopyArticleLink = async (event, slug) => {
    event?.stopPropagation?.();
    try {
      await navigator.clipboard.writeText(`${RESOLVED_APP_BASE_URL}/articles/${slug}`);
      toast.success("Maqola havolasi nusxalandi");
    } catch {
      toast.error("Maqola havolasini nusxalab bo'lmadi");
    }
  };

  const selectedEditorArticle =
    editingArticle && editingArticle._id
      ? {
          ...editingArticle,
          markdown:
            selectedArticle?._id === editingArticle._id ? selectedContent : "",
        }
      : null;

  return (
    <ProfilePaneWrapper data-tour="profile-pane-articles">
      {!showDetailOnly && (
        <ProfilePaneHeader>
          <MobileBackBtn onClick={onBack}>
            <ArrowLeft size={20} />
          </MobileBackBtn>
          <ProfilePaneTitle>Maqolalar</ProfilePaneTitle>
          {isOwnProfile && (
            <ButtonWrapper
              onClick={() => {
                setEditingArticle(null);
                setEditorOpen(true);
              }}
              title="Yangi maqola"
            >
              <Plus size={18} />
            </ButtonWrapper>
          )}
        </ProfilePaneHeader>
      )}

      <Shell>
        {!showDetailOnly && (
          <ListPane>
            {loading ? (
              <div style={{ padding: "20px" }}>
                <Skeleton height="190px" />
                <Skeleton height="24px" />
                <Skeleton height="16px" />
                <Skeleton height="16px" />
              </div>
            ) : articles.length === 0 ? (
              <Empty>
                <BookOpen size={30} />
                <span>
                  {isOwnProfile
                    ? "Hali maqola yo'q. Birinchi maqolangizni yarating."
                    : "Bu foydalanuvchining hali maqolasi yo'q."}
                </span>
              </Empty>
            ) : (
              articles.map((article) => (
                <ArticleCard
                  key={article._id}
                  active={selectedArticle?._id === article._id}
                  onClick={() => {
                    setSelectedArticle(article);
                    setShowDetailOnly(true);
                  }}
                >
                  <CoverThumb>
                    {article.coverImage ? (
                      <img src={article.coverImage} alt={article.title} />
                    ) : null}
                  </CoverThumb>
                  <ArticleCardHeader>
                    <ArticleTitle>{article.title}</ArticleTitle>
                    <ArticleCardCopyButton
                      title="Maqola havolasini nusxalash"
                      onClick={(event) =>
                        handleCopyArticleLink(event, article.slug || article._id)
                      }
                    >
                      <Copy size={15} />
                    </ArticleCardCopyButton>
                  </ArticleCardHeader>
                  <ArticleExcerpt>{article.excerpt || "Tavsif yo'q"}</ArticleExcerpt>
                  <MetaRow>
                    <span>
                      {dayjs(article.publishedAt || article.createdAt).format(
                        "DD MMM YYYY",
                      )}
                    </span>
                    <span>{article.likes} like</span>
                    <span>{article.comments} izoh</span>
                    <span>{article.views} ko'rish</span>
                  </MetaRow>
                </ArticleCard>
              ))
            )}
          </ListPane>
        )}

        {showDetailOnly && selectedArticle && (
          <DetailPane>
            {contentLoading ? (
              <DetailWrap>
                <Skeleton height="320px" />
                <Skeleton height="56px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </DetailWrap>
            ) : (
              <DetailWrap>
                <DetailTopBar>
                  <BackToListBtn
                    onClick={() => {
                      setShowDetailOnly(false);
                      setSelectedArticle(null);
                      setSelectedContent("");
                    }}
                  >
                    <ArrowLeft size={16} />
                    Maqolalar ro'yxati
                  </BackToListBtn>
                </DetailTopBar>
                {selectedArticle.coverImage ? (
                  <HeroImage
                    src={selectedArticle.coverImage}
                    alt={selectedArticle.title}
                  />
                ) : null}
                <DetailTitle>{selectedArticle.title}</DetailTitle>
                {selectedArticle.excerpt ? (
                  <DetailExcerpt>{selectedArticle.excerpt}</DetailExcerpt>
                ) : null}

                {selectedArticle.tags?.length > 0 && (
                  <Tags>
                    {selectedArticle.tags.map((tag) => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </Tags>
                )}

                <MetaRow>
                  <span>
                    {dayjs(
                      selectedArticle.publishedAt || selectedArticle.createdAt,
                    ).format("DD MMMM YYYY · HH:mm")}
                  </span>
                  <span>
                    {selectedArticle.author?.nickname ||
                      selectedArticle.author?.username ||
                      currentUser?.nickname}
                  </span>
                </MetaRow>

                <ActionRow>
                  <ActionBtn
                    active={selectedArticle.liked}
                    activeColor="#ef4444"
                    onClick={() => handleLike(selectedArticle._id)}
                  >
                    <Heart
                      size={16}
                      fill={selectedArticle.liked ? "#ef4444" : "none"}
                    />
                    {selectedArticle.likes}
                  </ActionBtn>
                  <SecondaryBtn onClick={() => setCommentArticle(selectedArticle)}>
                    <MessageCircle size={16} />
                    {selectedArticle.comments}
                  </SecondaryBtn>
                  <SecondaryBtn as="div">
                    <Eye size={16} />
                    {selectedArticle.views}
                  </SecondaryBtn>
                  <SecondaryBtn
                    onClick={(event) =>
                      handleCopyArticleLink(
                        event,
                        selectedArticle.slug || selectedArticle._id,
                      )
                    }
                  >
                    <Copy size={16} />
                    Havola
                  </SecondaryBtn>
                  {isOwnProfile && (
                    <SecondaryBtn
                      onClick={() => {
                        setEditingArticle({
                          ...selectedArticle,
                          markdown: selectedContent,
                        });
                        setEditorOpen(true);
                      }}
                    >
                      <PenSquare size={16} />
                      Tahrirlash
                    </SecondaryBtn>
                  )}
                  {isOwnProfile && (
                    <SecondaryBtn onClick={handleDelete}>
                      <Trash2 size={16} />
                      O'chirish
                    </SecondaryBtn>
                  )}
                </ActionRow>

                <Divider />
                <MarkdownRenderer content={selectedContent} />
              </DetailWrap>
            )}
          </DetailPane>
        )}
      </Shell>

      <ArticleEditorDialog
        isOpen={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingArticle(null);
        }}
        onSubmit={handleSave}
        initialArticle={selectedEditorArticle}
        saving={saving}
      />

      {commentArticle && (
        <ArticleComments
          article={commentArticle}
          onClose={() => setCommentArticle(null)}
          onCommentsCountChange={(count) => {
            applyArticlePatch(commentArticle._id, { comments: count });
          }}
        />
      )}
    </ProfilePaneWrapper>
  );
};

export default ProfileArticlesPanel;
