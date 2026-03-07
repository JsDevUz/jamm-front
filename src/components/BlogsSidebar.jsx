import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { BookOpen, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { createBlog, fetchBlogs } from "../api/blogsApi";
import BlogEditorDialog from "./BlogEditorDialog";
import SidebarSearchField from "./SidebarSearchField";
import { Skeleton } from "./Skeleton";

const SidebarContainer = styled.div`
  width: 340px;
  height: 100vh;
  background-color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TopHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    margin: 0;
    color: var(--text-color);
    font-size: 16px;
    font-weight: 700;
  }
`;

export const ButtonWrapper = styled.button`
  margin-left: auto;
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  border-radius: 15px;
  border: none;
  background: var(--input-color);
  color: var(--text-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`;

const SearchWrap = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border-color);
`;

const SearchInput = styled(SidebarSearchField)``;

const BlogList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const BlogItem = styled.button`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--border-color);
  background: ${(p) => (p.active ? "var(--active-color)" : "transparent")};
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  color: inherit;
  transition: background 0.2s ease;

  &:hover {
    background: var(--hover-color);
  }
`;

const Cover = styled.div`
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--primary-color) 14%, transparent),
    color-mix(in srgb, var(--secondary-color) 82%, black 18%)
  );

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.div`
  color: var(--text-color);
  font-size: 15px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 6px;
`;

const Excerpt = styled.div`
  color: var(--text-secondary-color);
  font-size: 13px;
  line-height: 1.55;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: var(--text-muted-color);
  font-size: 12px;
`;

const EmptyState = styled.div`
  padding: 40px 24px;
  text-align: center;
  color: var(--text-muted-color);
`;

const BlogItemSkeleton = styled.div`
  padding: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
`;

const BlogItemSkeletonThumb = styled(Skeleton)`
  width: 72px;
  min-width: 72px;
  height: 72px;
  border-radius: 14px;
  margin-bottom: 0;
`;

const BlogItemSkeletonBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const BlogsSidebar = ({ selectedChannel }) => {
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

  const renderBlogSkeletons = (count = 6) =>
    [...Array(count)].map((_, index) => (
      <BlogItemSkeleton key={index}>
        <BlogItemSkeletonThumb />
        <BlogItemSkeletonBody>
          <Skeleton
            height="15px"
            width={index % 2 === 0 ? "72%" : "58%"}
            mb="8px"
          />
          <Skeleton height="12px" width="92%" mb="6px" />
          <Skeleton
            height="12px"
            width={index % 3 === 0 ? "76%" : "68%"}
            mb="10px"
          />
          <Skeleton height="11px" width="54%" mb="0" />
        </BlogItemSkeletonBody>
      </BlogItemSkeleton>
    ));

  return (
    <SidebarContainer>
      <SearchWrap>
        <SearchInput
          placeholder="Blog qidirish..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ButtonWrapper onClick={() => setEditorOpen(true)} title="Yangi blog">
          <Plus size={16} />
        </ButtonWrapper>
      </SearchWrap>

      <BlogList id="blogs-sidebar-scroll">
        {loading ? (
          <>{renderBlogSkeletons(1)}</>
        ) : filteredBlogs.length === 0 ? (
          <EmptyState>Blog topilmadi.</EmptyState>
        ) : (
          <InfiniteScroll
            dataLength={filteredBlogs.length}
            next={loadMore}
            hasMore={hasMore && !query.trim()}
            loader={<>{renderBlogSkeletons(2)}</>}
            scrollableTarget="blogs-sidebar-scroll"
            style={{ overflow: "visible" }}
          >
            {filteredBlogs.map((blog) => {
              const target = blog.slug || blog._id;
              return (
                <BlogItem
                  key={blog._id}
                  active={String(selectedChannel) === String(target)}
                  onClick={() => navigate(`/blogs/${target}`)}
                >
                  <Cover>
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} />
                    ) : null}
                  </Cover>
                  <Content>
                    <Title>{blog.title}</Title>
                    <Excerpt>{blog.excerpt || "Tavsif yo'q"}</Excerpt>
                    <Meta>
                      <span>
                        {blog.author?.nickname ||
                          blog.author?.username ||
                          "Muallif"}
                      </span>
                      <span>{blog.likes} like</span>
                      <span>{blog.comments} izoh</span>
                    </Meta>
                  </Content>
                </BlogItem>
              );
            })}
          </InfiniteScroll>
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
