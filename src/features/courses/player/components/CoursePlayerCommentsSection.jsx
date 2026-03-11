import React from "react";
import { ChevronUp, Send } from "lucide-react";
import { useCoursePlayerContext } from "../context/CoursePlayerContext";
import {
  AdminBadge,
  AvatarImage,
  CollapseButton,
  CollapseRow,
  CollapsedPlaceholder,
  CommentAuthor,
  CommentAvatar,
  CommentBody,
  CommentBtn,
  CommentHeader,
  CommentInput,
  CommentInputActions,
  CommentInputArea,
  CommentInputWrapper,
  CommentItem,
  CommentText,
  CommentThread,
  CommentTime,
  CommentsCount,
  CommentsFeed,
  CommentsLoader,
  CommentsSection,
  CommentsSectionHeader,
  CommentsTitle,
  MinimapCommentsBox,
  RepliesContainer,
  ReplyButton,
  ReplyInput,
  ReplyInputArea,
  SendBtn,
} from "./CoursePlayerCommentsSection.styles";

const getNameInitial = (name) => (name || "?").charAt(0).toUpperCase();

const Avatar = ({ src, label, isAdmin, small = false }) => (
  <CommentAvatar $small={small} $isAdmin={isAdmin}>
    {src?.length > 1 ? <AvatarImage src={src} alt={label} /> : getNameInitial(label)}
  </CommentAvatar>
);

const CoursePlayerCommentsSection = () => {
  const {
    addComment,
    addReply,
    admin,
    commentText,
    commentsExpanded,
    commentsHasMore,
    commentsPage,
    course,
    courseId,
    currentLessonData,
    currentUser,
    fetchComments,
    formatCommentTime,
    paginatedComments,
    replyingTo,
    replyText,
    setCommentText,
    setCommentsExpanded,
    setReplyText,
    setReplyingTo,
    setShowCommentInput,
    showCommentInput,
  } = useCoursePlayerContext();

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    await addComment(courseId, currentLessonData._id, commentText.trim());
    await fetchComments(1);
    setCommentText("");
    setShowCommentInput(false);
  };

  const handleSubmitReply = async (commentId) => {
    if (!replyText.trim()) return;

    await addReply(courseId, currentLessonData._id, commentId, replyText.trim());
    await fetchComments(1);
    setReplyText("");
    setReplyingTo(null);
  };

  return (
    <CommentsSection>
      <CommentsSectionHeader>
        <CommentsTitle>Izohlar</CommentsTitle>
        <CommentsCount>
          {Number(
            currentLessonData.commentsCount ??
              currentLessonData.comments?.length ??
              paginatedComments.length ??
              0,
          )}
        </CommentsCount>
      </CommentsSectionHeader>

      {!commentsExpanded ? (
        <MinimapCommentsBox onClick={() => setCommentsExpanded(true)}>
          <CollapsedPlaceholder>Izoh yozing...</CollapsedPlaceholder>
        </MinimapCommentsBox>
      ) : (
        <>
          <CollapseRow>
            <CollapseButton onClick={() => setCommentsExpanded(false)}>
              <ChevronUp size={16} /> Yig'ish
            </CollapseButton>
          </CollapseRow>

          <CommentInputArea>
            <Avatar
              src={currentUser.avatar}
              label={currentUser.name || currentUser.username}
              isAdmin={admin}
            />
            <CommentInputWrapper>
              <CommentInput
                placeholder="Izoh qoldiring..."
                value={commentText}
                onChange={(event) => {
                  setCommentText(event.target.value);
                  if (!showCommentInput && event.target.value) {
                    setShowCommentInput(true);
                  }
                }}
                onFocus={() => setShowCommentInput(true)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && commentText.trim()) {
                    handleSubmitComment();
                  }
                }}
              />
              {showCommentInput && (
                <CommentInputActions>
                  <CommentBtn
                    onClick={() => {
                      setShowCommentInput(false);
                      setCommentText("");
                    }}
                  >
                    Bekor qilish
                  </CommentBtn>
                  <CommentBtn
                    $primary
                    disabled={!commentText.trim()}
                    onClick={handleSubmitComment}
                  >
                    Yuborish
                  </CommentBtn>
                </CommentInputActions>
              )}
            </CommentInputWrapper>
          </CommentInputArea>

          <CommentsFeed
            dataLength={paginatedComments.length}
            next={() => fetchComments(commentsPage + 1)}
            hasMore={commentsHasMore}
            loader={<CommentsLoader>Yuklanmoqda...</CommentsLoader>}
          >
            {paginatedComments.map((comment) => (
              <CommentThread key={comment._id}>
                <CommentItem>
                  <Avatar
                    src={comment.userAvatar}
                    label={comment.userName}
                    isAdmin={comment.userId === course.createdBy}
                  />
                  <CommentBody>
                    <CommentHeader>
                      <CommentAuthor $isAdmin={comment.userId === course.createdBy}>
                        {comment.userName}
                      </CommentAuthor>
                      {comment.userId === course.createdBy && <AdminBadge>Admin</AdminBadge>}
                      <CommentTime>{formatCommentTime(comment.createdAt)}</CommentTime>
                    </CommentHeader>
                    <CommentText>{comment.text}</CommentText>
                    <ReplyButton
                      onClick={() =>
                        setReplyingTo(replyingTo === comment._id ? null : comment._id)
                      }
                    >
                      Javob berish
                    </ReplyButton>
                  </CommentBody>
                </CommentItem>

                {comment.replies?.length > 0 && (
                  <RepliesContainer>
                    {comment.replies.map((reply) => (
                      <CommentItem key={reply._id}>
                        <Avatar
                          src={reply.userAvatar}
                          label={reply.userName}
                          isAdmin={reply.userId === course.createdBy}
                          small
                        />
                        <CommentBody>
                          <CommentHeader>
                            <CommentAuthor $isAdmin={reply.userId === course.createdBy}>
                              {reply.userName}
                            </CommentAuthor>
                            {reply.userId === course.createdBy && (
                              <AdminBadge>Admin</AdminBadge>
                            )}
                            <CommentTime>{formatCommentTime(reply.createdAt)}</CommentTime>
                          </CommentHeader>
                          <CommentText>{reply.text}</CommentText>
                        </CommentBody>
                      </CommentItem>
                    ))}
                  </RepliesContainer>
                )}

                {replyingTo === comment._id && (
                  <ReplyInputArea>
                    <Avatar
                      src={currentUser.avatar}
                      label={currentUser.name || currentUser.username}
                      isAdmin={admin}
                      small
                    />
                    <ReplyInput
                      placeholder="Javob yozing..."
                      value={replyText}
                      onChange={(event) => setReplyText(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && replyText.trim()) {
                          handleSubmitReply(comment._id);
                        }
                      }}
                      autoFocus
                    />
                    <SendBtn
                      disabled={!replyText.trim()}
                      onClick={() => handleSubmitReply(comment._id)}
                    >
                      <Send size={14} />
                    </SendBtn>
                  </ReplyInputArea>
                )}
              </CommentThread>
            ))}
          </CommentsFeed>
        </>
      )}
    </CommentsSection>
  );
};

export default CoursePlayerCommentsSection;
