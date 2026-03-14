import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CornerDownRight, Send, X } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import useAuthStore from "../../../store/authStore";
import {
  addArticleComment,
  addArticleReply,
  getArticleComments,
} from "../../../api/articlesApi";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import UserNameWithDecoration from "../../../shared/ui/users/UserNameWithDecoration";

const fadeIn = keyframes`from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); }`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(8, 15, 28, 0.62);
  backdrop-filter: blur(6px);
  z-index: 12000;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  @media (min-width: 720px) {
    align-items: center;
  }
`;

const Modal = styled.div`
  width: min(100%, 560px);
  height: min(82vh, 760px);
  background: var(--secondary-color);
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -16px 60px rgba(15, 23, 42, 0.28);
  animation: ${fadeIn} 0.2s ease;

  @media (min-width: 720px) {
    height: min(78vh, 760px);
    border-radius: 24px;
  }
`;

const Header = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: var(--text-color);
`;

const CloseBtn = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: var(--hover-color);
  color: var(--text-muted-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CommentsBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
`;

const CommentRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
`;

const Avatar = styled.div`
  width: ${(p) => p.size || 38}px;
  height: ${(p) => p.size || 38}px;
  min-width: ${(p) => p.size || 38}px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #2d6cdf, #0f9d8f);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommentCard = styled.div`
  flex: 1;
  min-width: 0;
`;

const Bubble = styled.div`
  background: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  padding: 12px 14px;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const Author = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Meta = styled.span`
  font-size: 12px;
  color: var(--text-muted-color);
`;

const Text = styled.div`
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
`;

const ReplyBtn = styled.button`
  margin-top: 8px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

const Replies = styled.div`
  margin-top: 10px;
  margin-left: 8px;
  padding-left: 12px;
  border-left: 2px solid var(--border-color);
`;

const InputWrap = styled.div`
  border-top: 1px solid var(--border-color);
  padding: 14px 18px 18px;
  background: var(--secondary-color);
`;

const Replying = styled.div`
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 12px;
  background: var(--hover-color);
  color: var(--text-muted-color);
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  height: 42px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: var(--input-color);
  color: var(--text-color);
  padding: 0 16px;
  outline: none;
`;

const SendBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  background: #2d6cdf;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? 0.45 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
`;

const Empty = styled.div`
  padding: 48px 0;
  text-align: center;
  color: var(--text-muted-color);
`;

const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Hozir";
  if (mins < 60) return `${mins}d`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}s`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}k`;
  return dayjs(iso).format("D MMM");
};

const avatarInitial = (name) => (name || "U").charAt(0).toUpperCase();

const ArticleComments = ({ article, onClose, onCommentsCountChange }) => {
  const currentUser = useAuthStore((state) => state.user);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const inputRef = useRef(null);

  const loadComments = async (nextPage = 1) => {
    const response = await getArticleComments(article._id, nextPage, 10);
    const items = response?.data || [];
    setComments(items);
    setPage(nextPage);
    setHasMore(nextPage < (response?.totalPages || 1));
    return response;
  };

  useEffect(() => {
    if (!article?._id) return;

    const load = async () => {
      setLoading(true);
      try {
        await loadComments(1);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [article?._id]);

  const fetchMore = async () => {
    const nextPage = page + 1;
    const response = await getArticleComments(article._id, nextPage, 10);
    setComments((prev) => [...prev, ...(response?.data || [])]);
    setPage(nextPage);
    setHasMore(nextPage < (response?.totalPages || 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim() || sending) return;

    setSending(true);
    try {
      if (replyingTo) {
        await addArticleReply({
          articleId: article._id,
          commentId: replyingTo.commentId,
          content: text.trim(),
          replyToUser: replyingTo.nickname,
        });
        await loadComments(1);
        setReplyingTo(null);
      } else {
        const response = await addArticleComment({
          articleId: article._id,
          content: text.trim(),
        });
        await loadComments(1);
        onCommentsCountChange?.(response?.comments || comments.length + 1);
      }

      setText("");
    } finally {
      setSending(false);
    }
  };

  if (!article) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(event) => event.stopPropagation()}>
        <Header>
          <Title>Article izohlari</Title>
          <ButtonWrapper onClick={onClose}>
            <X size={18} />
          </ButtonWrapper>
        </Header>

        <CommentsBody id="article-comments-scroll">
          <InfiniteScroll
            dataLength={comments.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<Empty>Yuklanmoqda...</Empty>}
            scrollableTarget="article-comments-scroll"
            style={{ overflow: "visible" }}
          >
            {loading && comments.length === 0 ? (
              <Empty>Yuklanmoqda...</Empty>
            ) : comments.length === 0 ? (
              <Empty>Hali izoh yo'q.</Empty>
            ) : (
              comments.map((comment) => {
                const user = comment.user || {};
                const name = user.nickname || user.username || "Foydalanuvchi";

                return (
                  <CommentRow key={comment._id}>
                    <Avatar>
                      {user.avatar ? (
                        <img src={user.avatar} alt={name} />
                      ) : (
                        avatarInitial(name)
                      )}
                    </Avatar>
                    <CommentCard>
                      <Bubble>
                        <AuthorRow>
                          <Author>
                            <UserNameWithDecoration user={user} fallback="Foydalanuvchi" />
                          </Author>
                          <Meta>{timeAgo(comment.createdAt)}</Meta>
                        </AuthorRow>
                        <Text>{comment.content}</Text>
                      </Bubble>
                      <ReplyBtn
                        onClick={() => {
                          setReplyingTo({
                            commentId: comment._id,
                            nickname: name,
                          });
                          setTimeout(() => inputRef.current?.focus(), 50);
                        }}
                      >
                        <CornerDownRight size={13} />
                        Javob
                      </ReplyBtn>

                      {comment.replies?.length > 0 && (
                        <Replies>
                          {comment.replies.map((reply) => {
                            const replyUser = reply.user || {};
                            const replyName =
                              replyUser.nickname ||
                              replyUser.username ||
                              "Foydalanuvchi";

                            return (
                              <CommentRow key={reply._id}>
                                <Avatar size={30}>
                                  {replyUser.avatar ? (
                                    <img
                                      src={replyUser.avatar}
                                      alt={replyName}
                                    />
                                  ) : (
                                    avatarInitial(replyName)
                                  )}
                                </Avatar>
                                <CommentCard>
                                  <Bubble>
                                    <AuthorRow>
                                      <Author>{replyName}</Author>
                                      <Meta>{timeAgo(reply.createdAt)}</Meta>
                                    </AuthorRow>
                                    <Text>
                                      {reply.replyToUser
                                        ? `@${reply.replyToUser} `
                                        : ""}
                                      {reply.content}
                                    </Text>
                                  </Bubble>
                                  <ReplyBtn
                                    onClick={() => {
                                      setReplyingTo({
                                        commentId: comment._id,
                                        nickname: replyName,
                                      });
                                      setTimeout(
                                        () => inputRef.current?.focus(),
                                        50,
                                      );
                                    }}
                                  >
                                    <CornerDownRight size={13} />
                                    Javob
                                  </ReplyBtn>
                                </CommentCard>
                              </CommentRow>
                            );
                          })}
                        </Replies>
                      )}
                    </CommentCard>
                  </CommentRow>
                );
              })
            )}
          </InfiniteScroll>
        </CommentsBody>

        <InputWrap>
          {replyingTo && (
            <Replying>
              <span>@{replyingTo.nickname} ga javob</span>
              <ButtonWrapper onClick={() => setReplyingTo(null)}>
                <X size={14} />
              </ButtonWrapper>
            </Replying>
          )}
          <Form onSubmit={handleSubmit}>
            <Input
              ref={inputRef}
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder={
                replyingTo ? `@${replyingTo.nickname} ga yozing` : "Izoh yozing"
              }
            />
            <SendBtn type="submit" disabled={!text.trim() || sending}>
              <Send size={16} />
            </SendBtn>
          </Form>
        </InputWrap>
      </Modal>
    </Overlay>
  );
};

export default ArticleComments;
