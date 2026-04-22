export const APP_LIMITS = {
  postsPerDay: { ordinary: 10, premium: 20 },
  postCommentsPerPost: { ordinary: 5, premium: 10 },
  postImagesPerPost: { ordinary: 0, premium: 3 },
  postImageBytes: 5 * 1024 * 1024,
  courseImageBytes: 5 * 1024 * 1024,
  articlesPerUser: { ordinary: 10, premium: 30 },
  articleCommentsPerArticle: { ordinary: 5, premium: 10 },
  articleImagesPerArticle: { ordinary: 2, premium: 5 },
  articleWords: { ordinary: 1000, premium: 2000 },
  groupsCreated: { ordinary: 3, premium: 6 },
  groupsJoined: { ordinary: 10, premium: 20 },
  meetsCreated: { ordinary: 2, premium: 4 },
  meetParticipants: { ordinary: 10, premium: 40 },
  coursesCreated: { ordinary: 2, premium: 6 },
  lessonsPerCourse: { ordinary: 10, premium: 30 },
  lessonVideosPerLesson: { ordinary: 3, premium: 3 },
  lessonTimedNotesPerLesson: { ordinary: 10, premium: 30 },
  testsCreated: { ordinary: 30, premium: 100 },
  testShareLinksPerTest: { ordinary: 2, premium: 4 },
  testsPerDeck: { ordinary: 30, premium: 50 },
  flashcardsCreated: { ordinary: 30, premium: 100 },
  flashcardsPerDeck: { ordinary: 30, premium: 100 },
  sentenceBuildersCreated: { ordinary: 30, premium: 100 },
  sentenceBuilderShareLinksPerDeck: { ordinary: 2, premium: 4 },
  sentenceBuilderItemsPerDeck: { ordinary: 30, premium: 50 },
  whiteboardPdfTabs: { ordinary: 1, premium: 3 },
  whiteboardPdfLibraryBytes: {
    ordinary: 50 * 1024 * 1024,
    premium: 200 * 1024 * 1024,
  },
  articleTitleChars: 120,
  articleExcerptChars: 220,
  articleTagChars: 24,
  articleTagCount: 8,
  postCommentChars: 400,
  articleCommentChars: 400,
  groupNameChars: 60,
  groupDescriptionChars: 240,
  messageChars: 400,
  meetTitleChars: 80,
  meetDescriptionChars: 240,
  courseNameChars: 120,
  courseDescriptionChars: 500,
  lessonTitleChars: 120,
  lessonDescriptionChars: 1000,
  homeworkAnswerChars: 2000,
  homeworkLinkChars: 300,
  nicknameChars: 30,
  usernameChars: 24,
  bioChars: 160,
  testTitleChars: 120,
  testDescriptionChars: 300,
  testQuestionChars: 240,
  testOptionChars: 140,
  flashcardTitleChars: 120,
  flashcardSideChars: 220,
  sentenceBuilderTitleChars: 120,
  sentenceBuilderDescriptionChars: 300,
  sentenceBuilderPromptChars: 240,
  sentenceBuilderAnswerChars: 240,
  sentenceBuilderTokenChars: 40,
  articleWordsOrdinary: 1000,
  articleWordsPremium: 2000,
  articleImagesOrdinary: 2,
  articleImagesPremium: 5,
  postWords: 100,
  lessonMediaBytes: 200 * 1024 * 1024,
  lessonHomeworkPerLesson: {
    ordinary: 3,
    premium: 3,
  },
  lessonTestsPerLesson: {
    ordinary: 1,
    premium: 1,
  },
  homeworkTextChars: 2000,
  homeworkLinkChars: 300,
  homeworkPhotoBytes: 10 * 1024 * 1024,
  homeworkAudioBytes: 20 * 1024 * 1024,
  homeworkVideoBytes: 100 * 1024 * 1024,
  homeworkPdfBytes: 20 * 1024 * 1024,
};

export const isPremiumUser = (user) =>
  user?.premiumStatus === "active" || user?.premiumStatus === "premium";

export const getTierLimit = (limits, user) =>
  isPremiumUser(user) ? limits.premium : limits.ordinary;

export const countWords = (value = "") =>
  String(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

export const countMarkdownImages = (value = "") =>
  Array.from(String(value || "").matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g))
    .length;
