import React, { useEffect, useMemo, useState } from "react";
import { Copy, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createBlog, fetchBlogs } from "../../../api/blogsApi";
import { RESOLVED_APP_BASE_URL } from "../../../config/env";
import BlogEditorDialog from "./BlogEditorDialog";
import { Skeleton } from "../../../shared/ui/feedback/Skeleton";
import {
  AddBlogButton,
  BlogItem,
  BlogCopyButton,
  BlogItemActions,
  BlogItemSkeleton,
  BlogItemSkeletonBody,
  BlogItemSkeletonThumb,
  BlogList,
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
} from "../styles/BlogsSidebar.styles";

const BlogsSidebar = ({ selectedBlogId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetchBlogs(1, 20);
      setBlogs(response?.data || []);
      setPage(1);
      setHasMore(1 < (response?.totalPages || 1));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadMore = async () => {
    const nextPage = page + 1;
    const response = await fetchBlogs(nextPage, 20);
    setBlogs((prev) => [...prev, ...(response?.data || [])]);
    setPage(nextPage);
    setHasMore(nextPage < (response?.totalPages || 1));
  };

  const filteredBlogs = useMemo(() => {
    if (!query.trim()) return blogs;
    const needle = query.trim().toLowerCase();

    return blogs.filter((blog) => {
      const author = blog.author?.nickname || blog.author?.username || "";
      return (
        blog.title?.toLowerCase().includes(needle) ||
        blog.excerpt?.toLowerCase().includes(needle) ||
        author.toLowerCase().includes(needle)
      );
    });
  }, [blogs, query]);

  const handleCreateBlog = async (payload) => {
    setSaving(true);
    try {
      const created = await createBlog(payload);
      setBlogs((prev) => [created, ...prev]);
      setEditorOpen(false);
      navigate(`/blogs/${created.slug || created._id}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyBlogLink = async (event, slug) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(`${RESOLVED_APP_BASE_URL}/blogs/${slug}`);
      toast.success("Blog havolasi nusxalandi");
    } catch {
      toast.error("Blog havolasini nusxalab bo'lmadi");
    }
  };

  const renderBlogSkeletons = (count = 6) =>
    [...Array(count)].map((_, index) => (
      <BlogItemSkeleton key={index}>
        <BlogItemSkeletonThumb />
        <BlogItemSkeletonBody>
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
        </BlogItemSkeletonBody>
      </BlogItemSkeleton>
    ));

  return (
    <SidebarContainer>
      <SearchWrap>
        <SearchInput
          placeholder={t("blogs.searchPlaceholder")}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <AddBlogButton
          onClick={() => setEditorOpen(true)}
          title={t("blogs.createTitle")}
        >
          <Plus size={16} />
        </AddBlogButton>
      </SearchWrap>

      <BlogList id="blogs-sidebar-scroll">
        {loading ? (
          <>{renderBlogSkeletons(1)}</>
        ) : filteredBlogs.length === 0 ? (
          <EmptyState>{t("blogs.notFound")}</EmptyState>
        ) : (
          <StyledInfiniteScroll
            dataLength={filteredBlogs.length}
            next={loadMore}
            hasMore={hasMore && !query.trim()}
            loader={<>{renderBlogSkeletons(2)}</>}
            scrollableTarget="blogs-sidebar-scroll"
          >
            {filteredBlogs.map((blog) => {
              const target = blog.slug || blog._id;
              return (
                <BlogItem
                  key={blog._id}
                  $active={String(selectedBlogId) === String(target)}
                  onClick={() => navigate(`/blogs/${target}`)}
                >
                  <Cover>
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} />
                    ) : null}
                  </Cover>
                  <Content>
                    <Title>{blog.title}</Title>
                    <Excerpt>{blog.excerpt || t("blogs.noExcerpt")}</Excerpt>
                    <Meta>
                      <span>
                        {blog.author?.nickname ||
                          blog.author?.username ||
                          t("blogs.author")}
                      </span>
                      <span>
                        {blog.likes} {t("common.like")}
                      </span>
                      <span>
                        {blog.comments} {t("blogs.comments")}
                      </span>
                    </Meta>
                  </Content>
                  <BlogItemActions>
                    <BlogCopyButton
                      title="Blog havolasini nusxalash"
                      onClick={(event) => handleCopyBlogLink(event, target)}
                    >
                      <Copy size={15} />
                    </BlogCopyButton>
                  </BlogItemActions>
                </BlogItem>
              );
            })}
          </StyledInfiniteScroll>
        )}
      </BlogList>

      <BlogEditorDialog
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSubmit={handleCreateBlog}
        saving={saving}
      />
    </SidebarContainer>
  );
};

export default BlogsSidebar;
