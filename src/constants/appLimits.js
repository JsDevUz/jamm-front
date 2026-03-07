export const APP_LIMITS = {
  blogTitleChars: 120,
  blogExcerptChars: 220,
  blogTagChars: 24,
  blogTagCount: 8,
  groupNameChars: 60,
  groupDescriptionChars: 240,
  messageChars: 400,
  meetTitleChars: 80,
  meetDescriptionChars: 240,
  courseNameChars: 120,
  courseDescriptionChars: 500,
  lessonTitleChars: 120,
  lessonDescriptionChars: 1000,
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
  blogWordsOrdinary: 1000,
  blogWordsPremium: 2000,
  blogImagesOrdinary: 2,
  blogImagesPremium: 5,
  postWords: 100,
};

export const isPremiumUser = (user) =>
  user?.premiumStatus === "active" || user?.premiumStatus === "premium";

export const countWords = (value = "") =>
  String(value)
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

export const countMarkdownImages = (value = "") =>
  Array.from(String(value || "").matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g))
    .length;
