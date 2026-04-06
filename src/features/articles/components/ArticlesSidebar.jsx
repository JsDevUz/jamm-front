import React, { useEffect, useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createArticle, fetchArticles } from "../../../api/articlesApi";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";
import ArticleEditorDialog from "./ArticleEditorDialog";
import { Skeleton } from "../../../shared/ui/feedback/Skeleton";
import SectionHeader from "../../../shared/ui/navigation/SectionHeader";
import {
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
  SidebarContainer,
  SortTab,
  StyledInfiniteScroll,
  TabsRow,
  Title,
} from "../styles/ArticlesSidebar.styles";

const ArticlesSidebar = ({ selectedArticleId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSort, setActiveSort] = useState("newest");
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const sortTabs = useMemo(
    () => [
      { key: "newest", label: t("articles.tabs.newest") },
      { key: "views", label: t("articles.tabs.views") },
      { key: "likes", label: t("articles.tabs.likes") },
      { key: "comments", label: t("articles.tabs.commentsTop") },
    ],
    [t],
  );

  const loadArticles = async (targetPage = 1, append = false) => {
    if (!append) {
      setLoading(true);
    }
    try {
      const response = await fetchArticles(targetPage, 20, activeSort);
      const nextArticles = response?.data || [];
      setArticles((prev) => (append ? [...prev, ...nextArticles] : nextArticles));
      setPage(targetPage);
      setHasMore(targetPage < (response?.totalPages || 1));
    } finally {
      if (!append) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    void loadArticles(1, false);
  }, [activeSort]);

  const loadMore = async () => {
    const nextPage = page + 1;
    await loadArticles(nextPage, true);
  };

  const handleCreateArticle = async (payload) => {
    setSaving(true);
    try {
      const created = await createArticle(payload);
      if (activeSort === "newest") {
        setArticles((prev) => [created, ...prev]);
      } else {
        void loadArticles(1, false);
      }
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
      <SectionHeader
        title={t("navigation.articles")}
        onSearch={() =>
          navigate("/search?tab=articles", {
            state: { from: `${location.pathname}${location.search}` },
          })
        }
        onAdd={() => setEditorOpen(true)}
        searchTitle={t("articles.searchPlaceholder")}
        addTitle={t("articles.createTitle")}
      />

      <TabsRow>
        {sortTabs.map((tab) => (
          <SortTab
            key={tab.key}
            $active={activeSort === tab.key}
            onClick={() => setActiveSort(tab.key)}
          >
            {tab.label}
          </SortTab>
        ))}
      </TabsRow>

      <ArticleList id="articles-sidebar-scroll">
        {loading ? (
          <>{renderArticleSkeletons(1)}</>
        ) : articles.length === 0 ? (
          <EmptyState>{t("articles.notFound")}</EmptyState>
        ) : (
          <StyledInfiniteScroll
            dataLength={articles.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<>{renderArticleSkeletons(2)}</>}
            scrollableTarget="articles-sidebar-scroll"
          >
            {articles.map((article) => {
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
