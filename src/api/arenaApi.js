import axiosInstance from "./axiosInstance";

// --- Tests ---
export const fetchTests = async () => {
  const { data } = await axiosInstance.get("/arena/tests");
  return data;
};

export const fetchTestById = async (testId) => {
  const { data } = await axiosInstance.get(`/arena/tests/${testId}`);
  return data;
};

export const createTest = async (payload) => {
  const { data } = await axiosInstance.post("/arena/tests", payload);
  return data;
};

export const updateTest = async (testId, payload) => {
  const { data } = await axiosInstance.patch(`/arena/tests/${testId}`, payload);
  return data;
};

export const fetchMyTests = async (page = 1, limit = 15) => {
  const { data } = await axiosInstance.get(
    `/arena/tests/my?page=${page}&limit=${limit}`,
  );
  return data;
};

export const deleteTest = async (testId) => {
  const { data } = await axiosInstance.delete(`/arena/tests/${testId}`);
  return data;
};

export const fetchTestResults = async (testId, params = {}) => {
  const { data } = await axiosInstance.get(`/arena/tests/${testId}/results`, {
    params,
  });
  return data;
};

export const fetchSharedTestByCode = async (shortCode) => {
  const { data } = await axiosInstance.get(`/arena/tests/shared/${shortCode}`);
  return data;
};

export const fetchTestShareLinks = async (testId) => {
  const { data } = await axiosInstance.get(`/arena/tests/${testId}/share-links`);
  return data;
};

export const createTestShareLink = async (testId, payload) => {
  const { data } = await axiosInstance.post(
    `/arena/tests/${testId}/share-links`,
    payload,
  );
  return data;
};

export const deleteTestShareLink = async (testId, shareLinkId) => {
  const { data } = await axiosInstance.delete(
    `/arena/tests/${testId}/share-links/${shareLinkId}`,
  );
  return data;
};

export const submitTestAnswers = async (testId, payload) => {
  const { data } = await axiosInstance.post(`/arena/tests/${testId}/submit`, {
    answers: payload?.answers || [],
    shareShortCode: payload?.shareShortCode || null,
  });
  return data;
};

// --- Flashcards ---
export const fetchFlashcards = async (page = 1, limit = 20) => {
  const { data } = await axiosInstance.get(
    `/arena/flashcards?page=${page}&limit=${limit}`,
  );
  return data;
};

export const createFlashcardDeck = async (payload) => {
  const { data } = await axiosInstance.post("/arena/flashcards", payload);
  return data;
};

export const updateFlashcardDeck = async (deckId, payload) => {
  const { data } = await axiosInstance.patch(
    `/arena/flashcards/${deckId}`,
    payload,
  );
  return data;
};

export const fetchFlashcardDeck = async (deckId) => {
  const { data } = await axiosInstance.get(`/arena/flashcards/${deckId}`);
  return data;
};

export const reviewFlashcard = async ({ deckId, cardId, quality }) => {
  const { data } = await axiosInstance.patch(
    `/arena/flashcards/${deckId}/cards/${cardId}/review`,
    { quality },
  );
  return data;
};

export const joinFlashcardDeck = async (deckId) => {
  const { data } = await axiosInstance.post(`/arena/flashcards/${deckId}/join`);
  return data;
};

export const leaveFlashcardDeck = async (deckId) => {
  const { data } = await axiosInstance.delete(
    `/arena/flashcards/${deckId}/leave`,
  );
  return data;
};

export const deleteFlashcardDeck = async (deckId) => {
  const { data } = await axiosInstance.delete(`/arena/flashcards/${deckId}`);
  return data;
};

// --- Sentence builders ---
export const fetchSentenceBuilders = async (page = 1, limit = 20) => {
  const { data } = await axiosInstance.get(
    `/arena/sentence-builders?page=${page}&limit=${limit}`,
  );
  return data;
};

export const createSentenceBuilderDeck = async (payload) => {
  const { data } = await axiosInstance.post("/arena/sentence-builders", payload);
  return data;
};

export const updateSentenceBuilderDeck = async (deckId, payload) => {
  const { data } = await axiosInstance.patch(
    `/arena/sentence-builders/${deckId}`,
    payload,
  );
  return data;
};

export const fetchSentenceBuilderDeck = async (deckId) => {
  const { data } = await axiosInstance.get(`/arena/sentence-builders/${deckId}`);
  return data;
};

export const fetchSharedSentenceBuilderDeck = async (shortCode) => {
  const { data } = await axiosInstance.get(
    `/arena/sentence-builders/shared/${shortCode}`,
  );
  return data;
};

export const checkSentenceBuilderAnswer = async (
  deckId,
  questionIndex,
  selectedTokens,
) => {
  const { data } = await axiosInstance.post(
    `/arena/sentence-builders/${deckId}/check`,
    {
      questionIndex,
      selectedTokens,
    },
  );
  return data;
};

export const deleteSentenceBuilderDeck = async (deckId) => {
  const { data } = await axiosInstance.delete(`/arena/sentence-builders/${deckId}`);
  return data;
};

export const fetchSentenceBuilderResults = async (deckId, params = {}) => {
  const { data } = await axiosInstance.get(
    `/arena/sentence-builders/${deckId}/results`,
    { params },
  );
  return data;
};

export const fetchSentenceBuilderShareLinks = async (deckId) => {
  const { data } = await axiosInstance.get(
    `/arena/sentence-builders/${deckId}/share-links`,
  );
  return data;
};

export const createSentenceBuilderShareLink = async (deckId, payload) => {
  const { data } = await axiosInstance.post(
    `/arena/sentence-builders/${deckId}/share-links`,
    payload,
  );
  return data;
};

export const deleteSentenceBuilderShareLink = async (deckId, shareLinkId) => {
  const { data } = await axiosInstance.delete(
    `/arena/sentence-builders/${deckId}/share-links/${shareLinkId}`,
  );
  return data;
};

export const submitSentenceBuilderAttempt = async (deckId, payload) => {
  const { data } = await axiosInstance.post(
    `/arena/sentence-builders/${deckId}/submit`,
    payload,
  );
  return data;
};

// --- Battles ---
export const fetchBattleHistory = async (params = {}) => {
  const { data } = await axiosInstance.get("/arena/battles/history", {
    params,
  });
  return data;
};

export const fetchActiveBattles = async (page = 1, limit = 15) => {
  const { data } = await axiosInstance.get(
    `/arena/battles/active?page=${page}&limit=${limit}`,
  );
  return data;
};

// --- Mnemonics ---
export const fetchMnemonicLeaderboard = async (mode = "digits") => {
  const { data } = await axiosInstance.get("/arena/mnemonics/leaderboard", {
    params: { mode },
  });
  return data;
};

export const saveMnemonicBestResult = async (payload) => {
  const { data } = await axiosInstance.post("/arena/mnemonics/result", payload);
  return data;
};
