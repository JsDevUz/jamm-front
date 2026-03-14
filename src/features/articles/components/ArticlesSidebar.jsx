import React, { useEffect, useMemo, useState } from "react";
import { Copy, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createArticle, fetchArticles } from "../../../api/articlesApi";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";
import ArticleEditorDialog from "./ArticleEditorDialog";
import { Skeleton } from "../../../shared/ui/feedback/Skeleton";
import {
  AddArticleButton,
  ArticleItem,
  ArticleCopyButton,
  ArticleItemActions,
  ArticleItemSkeleton,
  ArticleItemSkeletonBody,
  ArticleItemSkeletonThumb,
  ArticleList,
  Content,
  Cover,
  EmptyState,
  Excerpt,
  Meta,
  SearchInput,
  SearchWrap,
  SidebarContainer,
  StyledInfiniteScroll,
  Title,
} from "../styles/ArticlesSidebar.styles";

const ArticlesSidebar = ({ selectedArticleId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const response = await fetchArticles(1, 20);
      setArticles(response?.data || []);
      setPage(1);
      setHasMore(1 < (response?.totalPages || 1));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const loadMore = async () => {
    const nextPage = page + 1;
    const response = await fetchArticles(nextPage, 20);
    setArticles((prev) => [...prev, ...(response?.data || [])]);
    setPage(nextPage);
    setHasMore(nextPage < (response?.totalPages || 1));
  };

  const filteredArticles = useMemo(() => {
    if (!query.trim()) return articles;
    const needle = query.trim().toLowerCase();

    return articles.filter((article) => {
      const author = article.author?.nickname || article.author?.username || "";
      return (
        article.title?.toLowerCase().includes(needle) ||
        article.excerpt?.toLowerCase().includes(needle) ||
        author.toLowerCase().includes(needle)
      );
    });
  }, [articles, query]);

  const handleCreateArticle = async (payload) => {
    setSaving(true);
    try {
      const created = await createArticle(payload);
      setArticles((prev) => [created, ...prev]);
      setEditorOpen(false);
      navigate(`/articles/${created.slug || created._id}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyArticleLink = async (event, slug) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(`${RESOLVED_APP_BASE_URL}/articles/${slug}`);
      toast.success("Maqola havolasi nusxalandi");
    } catch {
      toast.error("Maqola havolasini nusxalab bo'lmadi");
    }
  };

  const renderArticleSkeletons = (count = 6) =>
    [...Array(count)].map((_, index) => (
      <ArticleItemSkeleton key={index}>
        <ArticleItemSkeletonThumb />
        <ArticleItemSkeletonBody>
          {/* Title - roughly 16px height + 6px bottom margin */}
          <Skeleton
            height="16px"
            width={index % 2 === 0 ? "72%" : "58%"}
            mb="6px"
          />
          {/* Excerpt - 2 lines roughly ~12px height each, 6px spacing */}
          <Skeleton height="12px" width="92%" mb="6px" />
          <Skeleton
            height="12px"
            width={index % 3 === 0 ? "76%" : "68%"}
            mb="12px"
          />
          {/* Meta - roughly 12px height */}
          <Skeleton height="12px" width="60%" mb="0" />
        </ArticleItemSkeletonBody>
      </ArticleItemSkeleton>
    ));

  return (
    <SidebarContainer>
      <SearchWrap>
        <SearchInput
          placeholder={t("articles.searchPlaceholder")}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <AddArticleButton
          onClick={() => setEditorOpen(true)}
          title={t("articles.createTitle")}
        >
          <Plus size={16} />
        </AddArticleButton>
      </SearchWrap>

      <ArticleList id="articles-sidebar-scroll">
        {loading ? (
          <>{renderArticleSkeletons(1)}</>
        ) : filteredArticles.length === 0 ? (
          <EmptyState>{t("articles.notFound")}</EmptyState>
        ) : (
          <StyledInfiniteScroll
            dataLength={filteredArticles.length}
            next={loadMore}
            hasMore={hasMore && !query.trim()}
            loader={<>{renderArticleSkeletons(2)}</>}
            scrollableTarget="articles-sidebar-scroll"
          >
            {filteredArticles.map((article) => {
              const target = article.slug || article._id;
              return (
                <ArticleItem
                  key={article._id}
                  $active={String(selectedArticleId) === String(target)}
                  onClick={() => navigate(`/articles/${target}`)}
                >
                  <Cover>
                    {article.coverImage ? (
                      <img src={article.coverImage} alt={article.title} />
                    ) : null}
                  </Cover>
                  <Content>
                    <Title>{article.title}</Title>
                    <Excerpt>{article.excerpt || t("articles.noExcerpt")}</Excerpt>
                    <Meta>
                      <span>
                        {article.author?.nickname ||
                          article.author?.username ||
                          t("articles.author")}
                      </span>
                      <span>
                        {article.likes} {t("common.like")}
                      </span>
                      <span>
                        {article.comments} {t("articles.comments")}
                      </span>
                    </Meta>
                  </Content>
                  <ArticleItemActions>
                    <ArticleCopyButton
                      title="Maqola havolasini nusxalash"
                      onClick={(event) => handleCopyArticleLink(event, target)}
                    >
                      <Copy size={15} />
                    </ArticleCopyButton>
                  </ArticleItemActions>
                </ArticleItem>
              );
            })}
          </StyledInfiniteScroll>
        )}
      </ArticleList>

      <ArticleEditorDialog
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSubmit={handleCreateArticle}
        saving={saving}
      />
    </SidebarContainer>
  );
};

export default ArticlesSidebar;
