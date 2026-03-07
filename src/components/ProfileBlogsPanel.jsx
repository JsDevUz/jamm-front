import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import {
  ArrowLeft,
  BookOpen,
  Eye,
  Heart,
  MessageCircle,
  PenSquare,
  Plus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../store/authStore";
import {
  createBlog,
  deleteBlog,
  fetchUserBlogs,
  getBlog,
  getBlogContent,
  likeBlog,
  updateBlog,
  viewBlog,
} from "../api/blogsApi";
import MarkdownRenderer from "./MarkdownRenderer";
import BlogComments from "./BlogComments";
import BlogEditorDialog from "./BlogEditorDialog";
import { ButtonWrapper } from "./BlogsSidebar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
`;

const Header = styled.div`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 84%, transparent),
    transparent
  );
  position: sticky;
  top: 0;
  z-index: 10;

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--text-color);
  }
`;

const MobileBackBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
  }
`;

const PlusBtn = styled.button`
  margin-left: auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #2563eb, #0f9d8f);
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

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

const Empty = styled.div`
  min-height: 340px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--text-muted-color);
  text-align: center;
`;

const BlogCard = styled.button`
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

const BlogTitle = styled.h3`
  margin: 0 0 4px;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.25;
`;

const BlogExcerpt = styled.p`
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

const ProfileBlogsPanel = ({
  profileUser,
  profileUserId,
  isOwnProfile,
  onBack,
  onCountChange,
}) => {
  const currentUser = useAuthStore((state) => state.user);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedContent, setSelectedContent] = useState("");
  const [contentLoading, setContentLoading] = useState(false);
  const [commentBlog, setCommentBlog] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showDetailOnly, setShowDetailOnly] = useState(false);
  const viewedRef = useRef(new Set());

  const identifier = useMemo(
    () => resolveIdentifier(profileUser, profileUserId),
    [profileUser, profileUserId],
  );

  const applyBlogPatch = (blogId, patch) => {
    setBlogs((prev) =>
      prev.map((blog) => (blog._id === blogId ? { ...blog, ...patch } : blog)),
    );
    setSelectedBlog((prev) =>
      prev && prev._id === blogId ? { ...prev, ...patch } : prev,
    );
  };

  const loadBlogs = async () => {
    if (!identifier) return;
    setLoading(true);
    try {
      const items = await fetchUserBlogs(identifier);
      setBlogs(items || []);
      onCountChange?.(items?.length || 0);

      if (selectedBlog?._id) {
        const nextSelected =
          items?.find((item) => item._id === selectedBlog._id) || null;
        setSelectedBlog(nextSelected);
        setShowDetailOnly(Boolean(nextSelected));
        if (!nextSelected) {
          setSelectedContent("");
        }
      } else {
        setShowDetailOnly(false);
      }

      if (!items?.length) {
        setSelectedBlog(null);
        setSelectedContent("");
        setShowDetailOnly(false);
      }
    } catch (error) {
      toast.error("Bloglarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [identifier]);

  useEffect(() => {
    if (!selectedBlog?._id) return;

    const loadDetail = async () => {
      setContentLoading(true);
      try {
        const [detail, content] = await Promise.all([
          getBlog(selectedBlog._id),
          getBlogContent(selectedBlog._id),
        ]);
        applyBlogPatch(detail._id, detail);
        setSelectedBlog(detail);
        setSelectedContent(content?.content || "");

        if (!viewedRef.current.has(selectedBlog._id)) {
          viewedRef.current.add(selectedBlog._id);
          const viewed = await viewBlog(selectedBlog._id);
          applyBlogPatch(selectedBlog._id, { views: viewed?.views || 0 });
        }
      } catch (error) {
        toast.error("Blog ochilmadi");
      } finally {
        setContentLoading(false);
      }
    };

    loadDetail();
  }, [selectedBlog?._id]);

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (editingBlog?._id) {
        const updated = await updateBlog(editingBlog._id, payload);
        applyBlogPatch(updated._id, updated);
        setSelectedBlog(updated);
        setSelectedContent(payload.markdown);
        toast.success("Blog yangilandi");
      } else {
        const created = await createBlog(payload);
        setBlogs((prev) => {
          const next = [created, ...prev];
          onCountChange?.(next.length);
          return next;
        });
        setSelectedBlog(created);
        setSelectedContent(payload.markdown);
        setShowDetailOnly(true);
        toast.success("Blog yaratildi");
      }

      setEditorOpen(false);
      setEditingBlog(null);
    } catch (error) {
      toast.error("Blogni saqlab bo'lmadi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedBlog?._id) return;
    if (!window.confirm("Blog o'chirilsinmi?")) return;

    try {
      await deleteBlog(selectedBlog._id);
      const nextBlogs = blogs.filter((item) => item._id !== selectedBlog._id);
      setBlogs(nextBlogs);
      setSelectedBlog(null);
      setSelectedContent("");
      setShowDetailOnly(false);
      onCountChange?.(nextBlogs.length);
      toast.success("Blog o'chirildi");
    } catch (error) {
      toast.error("Blogni o'chirib bo'lmadi");
    }
  };

  const handleLike = async (blogId) => {
    try {
      const response = await likeBlog(blogId);
      applyBlogPatch(blogId, response);
    } catch (error) {
      toast.error("Like yuborilmadi");
    }
  };

  const selectedEditorBlog =
    editingBlog && editingBlog._id
      ? {
          ...editingBlog,
          markdown:
            selectedBlog?._id === editingBlog._id ? selectedContent : "",
        }
      : null;

  return (
    <Wrapper>
      {!showDetailOnly && (
        <Header>
          <MobileBackBtn onClick={onBack}>
            <ArrowLeft size={20} />
          </MobileBackBtn>
          <BookOpen size={24} color="#60a5fa" />
          <h2>Bloglar</h2>
          {isOwnProfile && (
            <ButtonWrapper
              onClick={() => {
                setEditingBlog(null);
                setEditorOpen(true);
              }}
              title="Yangi blog"
            >
              <Plus size={18} />
            </ButtonWrapper>
          )}
        </Header>
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
            ) : blogs.length === 0 ? (
              <Empty>
                <BookOpen size={30} />
                <span>
                  {isOwnProfile
                    ? "Hali blog yo'q. Birinchi maqolangizni yarating."
                    : "Bu foydalanuvchining hali blogi yo'q."}
                </span>
              </Empty>
            ) : (
              blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  active={selectedBlog?._id === blog._id}
                  onClick={() => {
                    setSelectedBlog(blog);
                    setShowDetailOnly(true);
                  }}
                >
                  <CoverThumb>
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} />
                    ) : null}
                  </CoverThumb>
                  <BlogTitle>{blog.title}</BlogTitle>
                  <BlogExcerpt>{blog.excerpt || "Tavsif yo'q"}</BlogExcerpt>
                  <MetaRow>
                    <span>
                      {dayjs(blog.publishedAt || blog.createdAt).format(
                        "DD MMM YYYY",
                      )}
                    </span>
                    <span>{blog.likes} like</span>
                    <span>{blog.comments} izoh</span>
                    <span>{blog.views} ko'rish</span>
                  </MetaRow>
                </BlogCard>
              ))
            )}
          </ListPane>
        )}

        {showDetailOnly && selectedBlog && (
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
                      setSelectedBlog(null);
                      setSelectedContent("");
                    }}
                  >
                    <ArrowLeft size={16} />
                    Bloglar ro'yxati
                  </BackToListBtn>
                </DetailTopBar>
                {selectedBlog.coverImage ? (
                  <HeroImage
                    src={selectedBlog.coverImage}
                    alt={selectedBlog.title}
                  />
                ) : null}
                <DetailTitle>{selectedBlog.title}</DetailTitle>
                {selectedBlog.excerpt ? (
                  <DetailExcerpt>{selectedBlog.excerpt}</DetailExcerpt>
                ) : null}

                {selectedBlog.tags?.length > 0 && (
                  <Tags>
                    {selectedBlog.tags.map((tag) => (
                      <Tag key={tag}>#{tag}</Tag>
                    ))}
                  </Tags>
                )}

                <MetaRow>
                  <span>
                    {dayjs(
                      selectedBlog.publishedAt || selectedBlog.createdAt,
                    ).format("DD MMMM YYYY · HH:mm")}
                  </span>
                  <span>
                    {selectedBlog.author?.nickname ||
                      selectedBlog.author?.username ||
                      currentUser?.nickname}
                  </span>
                </MetaRow>

                <ActionRow>
                  <ActionBtn
                    active={selectedBlog.liked}
                    activeColor="#ef4444"
                    onClick={() => handleLike(selectedBlog._id)}
                  >
                    <Heart
                      size={16}
                      fill={selectedBlog.liked ? "#ef4444" : "none"}
                    />
                    {selectedBlog.likes}
                  </ActionBtn>
                  <SecondaryBtn onClick={() => setCommentBlog(selectedBlog)}>
                    <MessageCircle size={16} />
                    {selectedBlog.comments}
                  </SecondaryBtn>
                  <SecondaryBtn as="div">
                    <Eye size={16} />
                    {selectedBlog.views}
                  </SecondaryBtn>
                  {isOwnProfile && (
                    <SecondaryBtn
                      onClick={() => {
                        setEditingBlog({
                          ...selectedBlog,
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

      <BlogEditorDialog
        isOpen={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingBlog(null);
        }}
        onSubmit={handleSave}
        initialBlog={selectedEditorBlog}
        saving={saving}
      />

      {commentBlog && (
        <BlogComments
          blog={commentBlog}
          onClose={() => setCommentBlog(null)}
          onCommentsCountChange={(count) => {
            applyBlogPatch(commentBlog._id, { comments: count });
          }}
        />
      )}
    </Wrapper>
  );
};

export default ProfileBlogsPanel;
