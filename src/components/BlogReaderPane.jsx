import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { ArrowLeft, Eye, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getBlog,
  getBlogContent,
  likeBlog,
  viewBlog,
} from "../api/blogsApi";
import BlogComments from "./BlogComments";
import MarkdownRenderer from "./MarkdownRenderer";

const Pane = styled.div`
  display: flex;
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--secondary-color) 88%, transparent) 0%,
    color-mix(in srgb, var(--background-color) 76%, transparent) 100%
  );

  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(100%, calc(100% - 72px));
    z-index: 10;
    background-color: var(--secondary-color);
    box-shadow: -4px 0 18px rgba(0, 0, 0, 0.22);
    animation: slideInFromRight 0.28s ease-out;
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const Empty = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  color: var(--text-muted-color);
  text-align: center;
  padding: 40px;
`;

const Wrap = styled.div`
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 28px 28px 72px;

  @media (max-width: 768px) {
    padding: 18px 16px 96px;
  }
`;

const BackBtn = styled.button`
  display: none;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
  background: rgba(255,255,255,0.05);
  color: var(--text-color);
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`;

const CoverButton = styled.button`
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
`;

const Cover = styled.img`
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 28px;
  margin-bottom: 26px;
`;

const Title = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.05;
  color: var(--text-color);
`;

const Excerpt = styled.p`
  margin: 0 0 16px;
  color: var(--text-secondary-color);
  font-size: 17px;
  line-height: 1.7;
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--text-muted-color);
  font-size: 13px;
  margin-bottom: 20px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
`;

const ActionBtn = styled.button`
  border: 1px solid
    ${(p) => (p.active ? "#ef4444" : "var(--border-color)")};
  background: ${(p) => (p.active ? "rgba(239,68,68,0.08)" : "transparent")};
  color: ${(p) => (p.active ? "#ef4444" : "var(--text-secondary-color)")};
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

const Divider = styled.div`
  height: 1px;
  background: var(--border-color);
  margin-bottom: 28px;
`;

const LightboxOverlay = styled.button`
  position: fixed;
  inset: 0;
  border: none;
  background: rgba(3, 7, 18, 0.88);
  backdrop-filter: blur(6px);
  z-index: 12000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
`;

const LightboxImage = styled.img`
  max-width: min(94vw, 1600px);
  max-height: 90vh;
  width: auto;
  height: auto;
  border-radius: 18px;
  object-fit: contain;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
`;

const BlogReaderPane = ({ blogIdentifier, onBack }) => {
  const navigate = useNavigate();
  const viewedRef = useRef(new Set());
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentOpen, setCommentOpen] = useState(false);
  const [coverLightboxOpen, setCoverLightboxOpen] = useState(false);

  useEffect(() => {
    if (!blogIdentifier || blogIdentifier === "0") {
      setBlog(null);
      setContent("");
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      setBlog(null);
      setContent("");
      try {
        const [detail, markdown] = await Promise.all([
          getBlog(blogIdentifier),
          getBlogContent(blogIdentifier),
        ]);
        setBlog(detail);
        setContent(markdown?.content || "");

        if (!viewedRef.current.has(detail._id)) {
          viewedRef.current.add(detail._id);
          const viewStats = await viewBlog(detail._id);
          setBlog((prev) =>
            prev ? { ...prev, views: viewStats?.views || prev.views } : prev,
          );
        }
      } catch {
        setBlog(null);
        setContent("");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [blogIdentifier]);

  const handleLike = async () => {
    if (!blog?._id) return;
    const response = await likeBlog(blog._id);
    setBlog((prev) => (prev ? { ...prev, ...response } : prev));
  };

  if (!blogIdentifier || blogIdentifier === "0") {
    return <Empty>O‘qish uchun blog tanlang.</Empty>;
  }

  if (loading) {
    return <Empty>Yuklanmoqda...</Empty>;
  }

  if (!blog) {
    return <Empty>Blog topilmadi.</Empty>;
  }

  return (
    <Pane>
      <Wrap>
        <BackBtn
          onClick={() => {
            onBack?.();
            navigate("/blogs");
          }}
        >
          <ArrowLeft size={16} />
          Bloglar
        </BackBtn>

        {blog.coverImage ? (
          <CoverButton type="button" onClick={() => setCoverLightboxOpen(true)}>
            <Cover src={blog.coverImage} alt={blog.title} />
          </CoverButton>
        ) : null}
        <Title>{blog.title}</Title>
        {blog.excerpt ? <Excerpt>{blog.excerpt}</Excerpt> : null}
        <Meta>
          <span>{blog.author?.nickname || blog.author?.username || "Muallif"}</span>
          <span>{dayjs(blog.publishedAt || blog.createdAt).format("DD MMM YYYY · HH:mm")}</span>
        </Meta>
        <Actions>
          <ActionBtn active={blog.liked} onClick={handleLike}>
            <Heart size={16} fill={blog.liked ? "#ef4444" : "none"} />
            {blog.likes}
          </ActionBtn>
          <ActionBtn onClick={() => setCommentOpen(true)}>
            <MessageCircle size={16} />
            {blog.comments}
          </ActionBtn>
          <ActionBtn as="div">
            <Eye size={16} />
            {blog.views}
          </ActionBtn>
        </Actions>
        <Divider />
        <MarkdownRenderer content={content} enableImageLightbox />
      </Wrap>

      {commentOpen && (
        <BlogComments
          blog={blog}
          onClose={() => setCommentOpen(false)}
          onCommentsCountChange={(count) =>
            setBlog((prev) => (prev ? { ...prev, comments: count } : prev))
          }
        />
      )}

      {coverLightboxOpen && blog.coverImage && (
        <LightboxOverlay
          type="button"
          onClick={() => setCoverLightboxOpen(false)}
          aria-label="Cover rasmni yopish"
        >
          <LightboxImage src={blog.coverImage} alt={blog.title} />
        </LightboxOverlay>
      )}
    </Pane>
  );
};

export default BlogReaderPane;
