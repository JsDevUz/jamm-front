import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { ArrowLeft, Eye, Heart, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  getBlog,
  getBlogContent,
  likeBlog,
  viewBlog,
} from "../../../api/blogsApi";
import BlogComments from "./BlogComments";
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
} from "../styles/BlogReaderPane.styles";

const BlogReaderPane = ({ blogIdentifier, onBack }) => {
  const { t } = useTranslation();
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

        if (detail.previouslySeen) {
          viewedRef.current.add(detail._id);
        } else if (!viewedRef.current.has(detail._id)) {
          viewedRef.current.add(detail._id);
          const viewStats = await viewBlog(detail._id);
          setBlog((prev) =>
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
        setBlog(null);
        setContent("");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [blogIdentifier]);

  useEffect(() => {
    if (!blog?._id) return;

    const preferredSlug = blog.slug || blog._id;
    const currentPath = window.location.pathname;
    const nextPath = `/blogs/${preferredSlug}`;

    if (currentPath !== nextPath) {
      window.history.replaceState(null, "", nextPath);
    }
  }, [blog?._id, blog?.slug]);

  const handleLike = async () => {
    if (!blog?._id) return;
    const response = await likeBlog(blog._id);
    setBlog((prev) => (prev ? { ...prev, ...response } : prev));
  };

  if (!blogIdentifier || blogIdentifier === "0") {
    return <Empty>{t("blogs.selectToRead")}</Empty>;
  }

  if (loading) {
    return <Empty>{t("common.loading")}</Empty>;
  }

  if (!blog) {
    return <Empty>{t("blogs.notFound")}</Empty>;
  }

  return (
    <Pane>
      <Wrap>
        <BackButton
          onClick={() => {
            onBack?.();
            navigate("/blogs");
          }}
        >
          <ArrowLeft size={16} />
          {t("blogs.backToList")}
        </BackButton>

        {blog.coverImage ? (
          <CoverButton type="button" onClick={() => setCoverLightboxOpen(true)}>
            <CoverImage src={blog.coverImage} alt={blog.title} />
          </CoverButton>
        ) : null}

        <Title>{blog.title}</Title>
        {blog.excerpt ? <Excerpt>{blog.excerpt}</Excerpt> : null}

        <Meta>
          <UserNameWithDecoration
            user={blog.author}
            fallback={t("blogs.author")}
            showPremiumBadge={false}
          />
          <span>{dayjs(blog.publishedAt || blog.createdAt).format("DD MMM YYYY · HH:mm")}</span>
        </Meta>

        <Actions>
          <ActionButton $active={blog.liked} onClick={handleLike}>
            <Heart size={16} fill={blog.liked ? "currentColor" : "none"} />
            {blog.likes}
          </ActionButton>
          <ActionButton onClick={() => setCommentOpen(true)}>
            <MessageCircle size={16} />
            {blog.comments}
          </ActionButton>
          <ActionButton as="div">
            <Eye size={16} />
            {blog.views}
          </ActionButton>
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
          aria-label={t("blogs.coverClose")}
        >
          <LightboxImage src={blog.coverImage} alt={blog.title} />
        </LightboxOverlay>
      )}
    </Pane>
  );
};

export default BlogReaderPane;
