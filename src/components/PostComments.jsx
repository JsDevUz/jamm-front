import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { X, Send, CornerDownRight } from "lucide-react";
import { usePosts } from "../contexts/PostsContext";
import useAuthStore from "../store/authStore";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";

/* ── Animations ── */
const fadeIn = keyframes`from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); }`;

/* ── Overlay / Modal ── */
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  @media (min-width: 600px) {
    align-items: center;
  }
`;

const Modal = styled.div`
  background: var(--secondary-color);
  width: 100%;
  max-width: 520px;
  height: 85vh;
  border-radius: 16px 16px 0 0;
  @media (min-width: 600px) {
    height: auto;
    max-height: 80vh;
    border-radius: 16px;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -4px 40px rgba(0, 0, 0, 0.4);
  animation: ${fadeIn} 0.25s ease;
`;

/* ── Header ── */
const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.span`
  font-weight: 700;
  font-size: 17px;
  color: var(--text-color);
`;

const CloseBtn = styled.button`
  background: var(--hover-color);
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  &:hover {
    color: var(--text-color);
    background: var(--input-color);
  }
`;

/* ── Comments List ── */
const CommentsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }
`;

/* ── Comment Item ── */
const CommentRow = styled.div`
  display: flex;
  gap: 12px;
  animation: ${fadeIn} 0.2s ease;
`;

const COLORS = [
  "#5865f2",
  "#3ba55d",
  "#faa61a",
  "#ed4245",
  "#9b59b6",
  "#00b0f4",
];
const colorOf = (str) => COLORS[(str || "A").charCodeAt(0) % COLORS.length];

const Avatar = styled.div`
  width: ${(p) => p.size || 36}px;
  height: ${(p) => p.size || 36}px;
  min-width: ${(p) => p.size || 36}px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${(p) => p.color || "#5865f2"}, #9b59b6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(p) => (p.size ? Math.floor(p.size * 0.38) : 13)}px;
  font-weight: 700;
  color: white;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommentContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const CommentBubble = styled.div`
  background: var(--background-color);
  padding: 10px 14px;
  border-radius: 4px 14px 14px 14px;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const AuthorName = styled.span`
  font-weight: 700;
  font-size: 13px;
  color: var(--text-color);
`;

const CommentTime = styled.span`
  font-size: 11px;
  color: var(--text-muted-color);
`;

const CommentText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-secondary-color);
  white-space: pre-wrap;
  word-break: break-word;
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 6px;
  padding-left: 2px;
`;

const ReplyBtn = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 0;
  display: flex;
  align-items: center;
  gap: 4px;
  &:hover {
    color: var(--primary-color);
  }
`;

/* ── Replies ── */
const RepliesContainer = styled.div`
  margin-top: 10px;
  padding-left: 4px;
  border-left: 2px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ReplyRow = styled.div`
  display: flex;
  gap: 10px;
  animation: ${fadeIn} 0.2s ease;
`;

const ReplyBubble = styled.div`
  background: var(--background-color);
  padding: 8px 12px;
  border-radius: 4px 12px 12px 12px;
`;

const MentionTag = styled.span`
  color: var(--primary-color);
  font-weight: 600;
  font-size: 13px;
  margin-right: 4px;
`;

/* ── Input Area ── */
const InputWrapper = styled.div`
  border-top: 1px solid var(--border-color);
  padding: 12px 20px;
`;

const ReplyingToBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  margin-bottom: 8px;
  background: var(--hover-color);
  border-radius: 8px;
  font-size: 13px;
  color: var(--text-muted-color);
  span {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

const CancelReplyBtn = styled.button`
  background: none;
  border: none;
  color: var(--text-muted-color);
  cursor: pointer;
  padding: 2px;
  display: flex;
  &:hover {
    color: var(--text-color);
  }
`;

const InputRow = styled.form`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  background: var(--input-color);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 10px 18px;
  color: var(--text-color);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  &:focus {
    border-color: var(--primary-color);
  }
  &::placeholder {
    color: var(--text-muted-color);
  }
`;

const SendBtn = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  opacity: ${(p) => (p.disabled ? 0.4 : 1)};
  pointer-events: ${(p) => (p.disabled ? "none" : "auto")};
  &:hover {
    background: #4752c4;
    transform: scale(1.05);
  }
`;

/* ── Empty State ── */
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  gap: 8px;
  color: var(--text-muted-color);
  font-size: 14px;
  text-align: center;
`;

/* ── Time helper ── */
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

/* ════════════════════════════════ Component ════════════════════════════ */
const PostComments = ({ post, onClose }) => {
  const { getComments, addComment, addReply } = usePosts();
  const currentUser = useAuthStore((s) => s.user);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // replyingTo = { commentId, nickname }
  const [replyingTo, setReplyingTo] = useState(null);
  const inputRef = useRef(null);

  const fetchComments = async (pageNum = 1) => {
    if (pageNum === 1) setLoading(true);
    try {
      const resp = await getComments(post._id, pageNum, 10);
      const newComments = resp?.data || [];
      const totalPages = resp?.totalPages || 1;

      setComments((prev) =>
        pageNum === 1 ? newComments : [...prev, ...newComments],
      );
      setPage(pageNum);
      setHasMore(pageNum < totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      if (pageNum === 1) setLoading(false);
    }
  };

  useEffect(() => {
    if (!post) return;
    fetchComments(1);
  }, [post, getComments]);

  const fetchMoreData = () => fetchComments(page + 1);

  const handleReply = (commentId, nickname) => {
    setReplyingTo({ commentId, nickname });
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const cancelReply = () => setReplyingTo(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    setSending(true);

    if (replyingTo) {
      // Add reply
      await addReply(
        post._id,
        replyingTo.commentId,
        text.trim(),
        replyingTo.nickname,
      );

      const localReply = {
        _id: Date.now().toString(),
        user: {
          _id: currentUser._id,
          username: currentUser.username,
          nickname: currentUser.nickname,
          avatar: currentUser.avatar,
        },
        content: text.trim(),
        replyToUser: replyingTo.nickname,
        createdAt: new Date().toISOString(),
      };

      setComments((prev) =>
        prev.map((c) =>
          c._id === replyingTo.commentId
            ? { ...c, replies: [...(c.replies || []), localReply] }
            : c,
        ),
      );
      setReplyingTo(null);
    } else {
      // Add comment
      await addComment(post._id, text.trim());

      const localComment = {
        _id: Date.now().toString(),
        user: {
          _id: currentUser._id,
          username: currentUser.username,
          nickname: currentUser.nickname,
          avatar: currentUser.avatar,
        },
        content: text.trim(),
        createdAt: new Date().toISOString(),
        replies: [],
      };
      setComments((prev) => [...prev, localComment]);
    }

    setText("");
    setSending(false);
  };

  if (!post) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <HeaderTitle>Izohlar</HeaderTitle>
          <CloseBtn onClick={onClose}>
            <X size={18} />
          </CloseBtn>
        </Header>

        <CommentsList id="scrollableComments">
          <InfiniteScroll
            dataLength={comments.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div
                style={{
                  textAlign: "center",
                  padding: "16px",
                  color: "var(--text-muted-color)",
                  fontSize: "14px",
                }}
              >
                Yuklanmoqda...
              </div>
            }
            endMessage={
              comments.length > 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "16px",
                    color: "var(--text-muted-color)",
                    fontSize: "13px",
                  }}
                >
                  Barcha izohlar ko'rsatildi.
                </div>
              ) : null
            }
            scrollableTarget="scrollableComments"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              overflow: "visible",
            }}
          >
            {loading && comments.length === 0 ? (
              <EmptyState>Yuklanmoqda...</EmptyState>
            ) : comments.length === 0 ? (
              <EmptyState>
                Hali izohlar yo'q. Birinchi bo'lib yozing! 💬
              </EmptyState>
            ) : (
              comments.map((c) => {
                const u = c.user || {};
                const name = u.nickname || u.username || "Foydalanuvchi";
                return (
                  <div key={c._id}>
                    <CommentRow>
                      <Avatar color={colorOf(name)} size={36}>
                        {u.avatar ? (
                          <img src={u.avatar} alt={name} />
                        ) : (
                          name.charAt(0).toUpperCase()
                        )}
                      </Avatar>
                      <CommentContent>
                        <CommentBubble>
                          <AuthorRow>
                            <AuthorName>{name}</AuthorName>
                            <CommentTime>{timeAgo(c.createdAt)}</CommentTime>
                          </AuthorRow>
                          <CommentText>{c.content}</CommentText>
                        </CommentBubble>
                        <CommentMeta>
                          <ReplyBtn onClick={() => handleReply(c._id, name)}>
                            <CornerDownRight size={12} /> Javob berish
                          </ReplyBtn>
                        </CommentMeta>

                        {/* ── Replies ── */}
                        {c.replies && c.replies.length > 0 && (
                          <RepliesContainer>
                            {c.replies.map((r) => {
                              const ru = r.user || {};
                              const rname =
                                ru.nickname || ru.username || "Foydalanuvchi";
                              return (
                                <ReplyRow key={r._id}>
                                  <Avatar color={colorOf(rname)} size={28}>
                                    {ru.avatar ? (
                                      <img src={ru.avatar} alt={rname} />
                                    ) : (
                                      rname.charAt(0).toUpperCase()
                                    )}
                                  </Avatar>
                                  <CommentContent>
                                    <ReplyBubble>
                                      <AuthorRow>
                                        <AuthorName>{rname}</AuthorName>
                                        <CommentTime>
                                          {timeAgo(r.createdAt)}
                                        </CommentTime>
                                      </AuthorRow>
                                      <CommentText>
                                        {r.replyToUser && (
                                          <MentionTag>
                                            @{r.replyToUser}
                                          </MentionTag>
                                        )}
                                        {r.content}
                                      </CommentText>
                                    </ReplyBubble>
                                    <CommentMeta>
                                      <ReplyBtn
                                        onClick={() =>
                                          handleReply(c._id, rname)
                                        }
                                      >
                                        <CornerDownRight size={12} /> Javob
                                        berish
                                      </ReplyBtn>
                                    </CommentMeta>
                                  </CommentContent>
                                </ReplyRow>
                              );
                            })}
                          </RepliesContainer>
                        )}
                      </CommentContent>
                    </CommentRow>
                  </div>
                );
              })
            )}
          </InfiniteScroll>
        </CommentsList>

        <InputWrapper>
          {replyingTo && (
            <ReplyingToBar>
              <div>
                Javob: <span>@{replyingTo.nickname}</span>
              </div>
              <CancelReplyBtn onClick={cancelReply}>
                <X size={14} />
              </CancelReplyBtn>
            </ReplyingToBar>
          )}
          <InputRow onSubmit={handleSubmit}>
            <Input
              ref={inputRef}
              placeholder={
                replyingTo
                  ? `@${replyingTo.nickname} ga javob...`
                  : "Izoh yozing..."
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <SendBtn type="submit" disabled={!text.trim() || sending}>
              <Send size={16} />
            </SendBtn>
          </InputRow>
        </InputWrapper>
      </Modal>
    </Overlay>
  );
};

export default PostComments;
