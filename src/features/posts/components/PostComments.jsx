import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { CornerDownRight, Send, Trash2, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePosts } from "../../../contexts/PostsContext";
import useAuthStore from "../../../store/authStore";
import MobileModalSheet, {
  useMobileSheetViewport,
} from "../../../components/ui/mobile-sheet";
import { SidebarIconButton as ButtonWrapper } from "../../../shared/ui/buttons/IconButton";
import ConfirmDialog from "../../../shared/ui/dialogs/ConfirmDialog";
import UserNameWithDecoration from "../../../shared/ui/users/UserNameWithDecoration";
import {
  AuthorName,
  AuthorRow,
  Avatar,
  CancelReplyButton,
  CommentBubble,
  CommentContent,
  CommentMeta,
  CommentRow,
  CommentsFeed,
  CommentsList,
  CommentText,
  CommentTime,
  DeleteButton,
  EmptyState,
  Header,
  HeaderTitle,
  Input,
  InputRow,
  InputWrapper,
  ListStatus,
  MentionTag,
  Modal,
  Overlay,
  RepliesContainer,
  ReplyBubble,
  ReplyButton,
  ReplyingToBar,
  ReplyRow,
  SendButton,
} from "../styles/PostComments.styles";

const avatarColors = [
  "var(--primary-color)",
  "var(--success-color)",
  "var(--warning-color)",
  "var(--danger-color)",
  "var(--accent-color, var(--primary-color))",
  "var(--link-color, var(--primary-color))",
];

const colorOf = (value) =>
  avatarColors[(value || "A").charCodeAt(0) % avatarColors.length];

const getEntityId = (value) => {
  if (!value) return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  return String(value._id || value.id || "");
};

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

const PostComments = ({ post, onClose }) => {
  const { t } = useTranslation();
  const { getComments, addComment, addReply, deleteComment } = usePosts();
  const currentUser = useAuthStore((state) => state.user);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState("");
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [replyingTo, setReplyingTo] = useState(null);

  const inputRef = useRef(null);
  const currentUserId = getEntityId(currentUser);
  const isMobileSheet = useMobileSheetViewport();

  const fetchComments = async (pageNum = 1) => {
    if (pageNum === 1) setLoading(true);

    try {
      const response = await getComments(post._id, pageNum, 10);
      const nextComments = response?.data || [];
      const totalPages = response?.totalPages || 1;

      setComments((prev) =>
        pageNum === 1 ? nextComments : [...prev, ...nextComments],
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

  const handleReply = (commentId, replyToUserId, nickname) => {
    setReplyingTo({ commentId, replyToUserId, nickname });
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!text.trim() || sending) return;

    setSending(true);
    try {
      if (replyingTo) {
        await addReply(
          post._id,
          replyingTo.commentId,
          text.trim(),
          replyingTo.replyToUserId,
        );
        await fetchComments(1);
        setReplyingTo(null);
      } else {
        await addComment(post._id, text.trim());
        await fetchComments(1);
      }

      setText("");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!commentToDelete?._id || !post?._id || deletingCommentId) return;

    setDeletingCommentId(commentToDelete._id);
    try {
      await deleteComment(post._id, commentToDelete._id);
      if (replyingTo?.commentId === commentToDelete._id) {
        setReplyingTo(null);
      }
      setCommentToDelete(null);
      await fetchComments(1);
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingCommentId("");
    }
  };

  if (!post) return null;

  const commentsPanel = (
    <>
      <Header>
        <HeaderTitle>{t("comments.title")}</HeaderTitle>
        <ButtonWrapper onClick={onClose}>
          <X size={18} />
        </ButtonWrapper>
      </Header>

      <CommentsList id="scrollableComments">
        <CommentsFeed
          dataLength={comments.length}
          next={() => fetchComments(page + 1)}
          hasMore={hasMore}
          loader={<ListStatus>{t("common.loading")}</ListStatus>}
          endMessage={
            comments.length > 0 ? (
              <ListStatus $small>{t("comments.allShown")}</ListStatus>
            ) : null
          }
          scrollableTarget="scrollableComments"
        >
          {loading && comments.length === 0 ? (
            <EmptyState>{t("common.loading")}</EmptyState>
          ) : comments.length === 0 ? (
            <EmptyState>{t("comments.empty")}</EmptyState>
          ) : (
            comments.map((comment) => {
              const user = comment.user || {};
              const name =
                user.nickname || user.username || t("common.userFallback");
              const isOwnComment = getEntityId(user) === currentUserId;

              return (
                <div key={comment._id}>
                  <CommentRow>
                    <Avatar $color={colorOf(name)} $size={36}>
                      {user.avatar ? (
                        <img src={user.avatar} alt={name} />
                      ) : (
                        name.charAt(0).toUpperCase()
                      )}
                    </Avatar>
                    <CommentContent>
                      <CommentBubble>
                        <AuthorRow>
                          <AuthorName>
                            <UserNameWithDecoration
                              user={user}
                              fallback={t("common.userFallback")}
                            />
                          </AuthorName>
                          <CommentTime>{timeAgo(comment.createdAt)}</CommentTime>
                        </AuthorRow>
                        <CommentText>{comment.content}</CommentText>
                      </CommentBubble>
                      <CommentMeta>
                        <ReplyButton
                          onClick={() =>
                            handleReply(comment._id, getEntityId(user), name)
                          }
                        >
                          <CornerDownRight size={12} /> {t("comments.reply")}
                        </ReplyButton>
                        {isOwnComment && (
                          <DeleteButton
                            onClick={() => setCommentToDelete(comment)}
                            disabled={deletingCommentId === comment._id}
                          >
                            <Trash2 size={12} /> {t("common.delete")}
                          </DeleteButton>
                        )}
                      </CommentMeta>

                      {comment.replies?.length > 0 && (
                        <RepliesContainer>
                          {comment.replies.map((reply) => {
                            const replyUser = reply.user || {};
                            const replyName =
                              replyUser.nickname ||
                              replyUser.username ||
                              t("common.userFallback");
                            const isOwnReply =
                              getEntityId(replyUser) === currentUserId;

                            return (
                              <ReplyRow key={reply._id}>
                                <Avatar $color={colorOf(replyName)} $size={28}>
                                  {replyUser.avatar ? (
                                    <img src={replyUser.avatar} alt={replyName} />
                                  ) : (
                                    replyName.charAt(0).toUpperCase()
                                  )}
                                </Avatar>
                                <CommentContent>
                                  <ReplyBubble>
                                    <AuthorRow>
                                      <AuthorName>{replyName}</AuthorName>
                                      <CommentTime>
                                        {timeAgo(reply.createdAt)}
                                      </CommentTime>
                                    </AuthorRow>
                                    <CommentText>
                                      {reply.replyToUser && (
                                        <MentionTag>@{reply.replyToUser}</MentionTag>
                                      )}
                                      {reply.content}
                                    </CommentText>
                                  </ReplyBubble>
                                  <CommentMeta>
                                    <ReplyButton
                                      onClick={() =>
                                        handleReply(
                                          comment._id,
                                          getEntityId(replyUser),
                                          replyName,
                                        )
                                      }
                                    >
                                      <CornerDownRight size={12} />{" "}
                                      {t("comments.reply")}
                                    </ReplyButton>
                                    {isOwnReply && (
                                      <DeleteButton
                                        onClick={() => setCommentToDelete(reply)}
                                        disabled={deletingCommentId === reply._id}
                                      >
                                        <Trash2 size={12} /> {t("common.delete")}
                                      </DeleteButton>
                                    )}
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
        </CommentsFeed>
      </CommentsList>

      <InputWrapper>
        {replyingTo && (
          <ReplyingToBar>
            <div>
              {t("comments.replyingTo")}: <span>@{replyingTo.nickname}</span>
            </div>
            <CancelReplyButton onClick={() => setReplyingTo(null)}>
              <X size={14} />
            </CancelReplyButton>
          </ReplyingToBar>
        )}
        <InputRow onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            placeholder={
              replyingTo
                ? t("comments.replyPlaceholder", { name: replyingTo.nickname })
                : t("comments.commentPlaceholder")
            }
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <SendButton type="submit" $disabled={!text.trim() || sending}>
            <Send size={16} />
          </SendButton>
        </InputRow>
      </InputWrapper>
    </>
  );

  return (
    <>
      {isMobileSheet ? (
        <MobileModalSheet open={Boolean(post)} onClose={onClose}>
          {commentsPanel}
        </MobileModalSheet>
      ) : (
        <Overlay onClick={onClose}>
          <Modal onClick={(event) => event.stopPropagation()}>{commentsPanel}</Modal>
        </Overlay>
      )}
      <ConfirmDialog
        isOpen={Boolean(commentToDelete)}
        onClose={() => setCommentToDelete(null)}
        title={t("comments.deleteTitle")}
        description={t("comments.deleteDescription")}
        confirmText={
          deletingCommentId ? t("common.saving") : t("common.delete")
        }
        cancelText={t("common.cancel")}
        onConfirm={handleDeleteComment}
        isDanger
      />
    </>
  );
};

export default PostComments;
