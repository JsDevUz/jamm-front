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

export const fetchMyTests = async (page = 1, limit = 15) => {
  const { data } = await axiosInstance.get(
    `/arena/tests/my?page=${page}&limit=${limit}`,
  );
  return data;
};

export const fetchTestResults = async (testId, params = {}) => {
  const { data } = await axiosInstance.get(`/arena/tests/${testId}/results`, {
    params,
  });
  return data;
};

export const submitTestAnswers = async (testId, answers) => {
  const { data } = await axiosInstance.post(`/arena/tests/${testId}/submit`, {
    answers,
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
