import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { ArrowLeft, Eye, Heart, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  getArticle,
  getArticleContent,
  likeArticle,
  viewArticle,
} from "../../../api/articlesApi";
import ArticleComments from "./ArticleComments";
import MarkdownRenderer from "./MarkdownRenderer";
import UserNameWithDecoration from "../../../shared/ui/users/UserNameWithDecoration";
import {
  ActionButton,
  Actions,
  BackButton,
  CoverButton,
  CoverImage,
  Divider,
  Empty,
  Excerpt,
  LightboxImage,
  LightboxOverlay,
  Meta,
  Pane,
  Title,
  Wrap,
} from "../styles/ArticleReaderPane.styles";

const ArticleReaderPane = ({ articleIdentifier, onBack }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const viewedRef = useRef(new Set());
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentOpen, setCommentOpen] = useState(false);
  const [coverLightboxOpen, setCoverLightboxOpen] = useState(false);

  useEffect(() => {
    if (!articleIdentifier || articleIdentifier === "0") {
      setArticle(null);
      setContent("");
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setArticle(null);
      setContent("");
      try {
        const [detail, markdown] = await Promise.all([
          getArticle(articleIdentifier),
          getArticleContent(articleIdentifier),
        ]);
        setArticle(detail);
        setContent(markdown?.content || "");

        if (detail.previouslySeen) {
          viewedRef.current.add(detail._id);
        } else if (!viewedRef.current.has(detail._id)) {
          viewedRef.current.add(detail._id);
          const viewStats = await viewArticle(detail._id);
          setArticle((prev) =>
            prev
              ? {
                  ...prev,
                  views: viewStats?.views || prev.views,
                  previouslySeen: true,
                }
              : prev,
          );
        }
      } catch {
        setArticle(null);
        setContent("");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [articleIdentifier]);

  useEffect(() => {
    if (!article?._id) return;

    const preferredSlug = article.slug || article._id;
    const currentPath = window.location.pathname;
    const nextPath = `/articles/${preferredSlug}`;

    if (currentPath !== nextPath) {
      window.history.replaceState(null, "", nextPath);
    }
  }, [article?._id, article?.slug]);

  const handleLike = async () => {
    if (!article?._id) return;
    const response = await likeArticle(article._id);
    setArticle((prev) => (prev ? { ...prev, ...response } : prev));
  };

  if (!articleIdentifier || articleIdentifier === "0") {
    return <Empty>{t("articles.selectToRead")}</Empty>;
  }

  if (loading) {
    return <Empty>{t("common.loading")}</Empty>;
  }

  if (!article) {
    return <Empty>{t("articles.notFound")}</Empty>;
  }

  return (
    <Pane>
      <Wrap>
        <BackButton
          onClick={() => {
            onBack?.();
            navigate("/articles");
          }}
        >
          <ArrowLeft size={16} />
          {t("articles.backToList")}
        </BackButton>

        {article.coverImage ? (
          <CoverButton type="button" onClick={() => setCoverLightboxOpen(true)}>
            <CoverImage src={article.coverImage} alt={article.title} />
          </CoverButton>
        ) : null}

        <Title>{article.title}</Title>
        {article.excerpt ? <Excerpt>{article.excerpt}</Excerpt> : null}

        <Meta>
          <UserNameWithDecoration
            user={article.author}
            fallback={t("articles.author")}
            showPremiumBadge={false}
          />
          <span>{dayjs(article.publishedAt || article.createdAt).format("DD MMM YYYY · HH:mm")}</span>
        </Meta>

        <Actions>
          <ActionButton $active={article.liked} onClick={handleLike}>
            <Heart size={16} fill={article.liked ? "currentColor" : "none"} />
            {article.likes}
          </ActionButton>
          <ActionButton onClick={() => setCommentOpen(true)}>
            <MessageCircle size={16} />
            {article.comments}
          </ActionButton>
          <ActionButton as="div">
            <Eye size={16} />
            {article.views}
          </ActionButton>
        </Actions>

        <Divider />
        <MarkdownRenderer content={content} enableImageLightbox />
      </Wrap>

      {commentOpen && (
        <ArticleComments
          article={article}
          onClose={() => setCommentOpen(false)}
          onCommentsCountChange={(count) =>
            setArticle((prev) => (prev ? { ...prev, comments: count } : prev))
          }
        />
      )}

      {coverLightboxOpen && article.coverImage && (
        <LightboxOverlay
          type="button"
          onClick={() => setCoverLightboxOpen(false)}
          aria-label={t("articles.coverClose")}
        >
          <LightboxImage src={article.coverImage} alt={article.title} />
        </LightboxOverlay>
      )}
    </Pane>
  );
};

export default ArticleReaderPane;
