import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { io } from "socket.io-client";
import useAuthStore from "../store/authStore";
import * as arenaApi from "../api/arenaApi";
import { toast } from "react-hot-toast";
import { buildSocketNamespaceUrl, buildSocketOptions } from "../config/env";

const ArenaContext = createContext(null);

export const ArenaProvider = ({ children }) => {
  const [tests, setTests] = useState([]);
  const [myTests, setMyTests] = useState([]);
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  const [flashcardsPage, setFlashcardsPage] = useState(1);
  const [flashcardsHasMore, setFlashcardsHasMore] = useState(true);
  const [sentenceBuilderDecks, setSentenceBuilderDecks] = useState([]);
  const [sentenceBuildersPage, setSentenceBuildersPage] = useState(1);
  const [sentenceBuildersHasMore, setSentenceBuildersHasMore] = useState(true);
  const [activeBattle, setActiveBattle] = useState(null);
  const [battleHistory, setBattleHistory] = useState([]);
  const [activeBattles, setActiveBattles] = useState([]);
  const [activeBattlesPage, setActiveBattlesPage] = useState(1);
  const [activeBattlesHasMore, setActiveBattlesHasMore] = useState(true);

  const [myTestsPage, setMyTestsPage] = useState(1);
  const [myTestsHasMore, setMyTestsHasMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [guestName, setGuestName] = useState(
    localStorage.getItem("jamm_guest_name") || null,
  );
  const socketRef = useRef(null);
  const authUser = useAuthStore((state) => state.user);

  // --- API Methods: Tests ---
  const fetchTests = useCallback(async () => {
    try {
      const data = await arenaApi.fetchTests();
      setTests(data);
    } catch (err) {
      console.error("Error fetching arena tests:", err);
    }
  }, []);

  const createTest = async (payload) => {
    try {
      const data = await arenaApi.createTest(payload);
      // fetchTests();
      fetchMyTests();
      return data;
    } catch (err) {
      console.error("Error creating test:", err);
    }
  };

  const updateTest = async (testId, payload) => {
    try {
      const data = await arenaApi.updateTest(testId, payload);
      setMyTests((prev) =>
        prev.map((test) => (test._id === testId ? { ...test, ...data } : test)),
      );
      setTests((prev) =>
        prev.map((test) => (test._id === testId ? { ...test, ...data } : test)),
      );
      return data;
    } catch (err) {
      console.error("Error updating test:", err);
      throw err;
    }
  };

  const deleteTest = async (testId) => {
    const previousMyTests = myTests;
    const previousTests = tests;

    setMyTests((prev) => prev.filter((test) => test._id !== testId));
    setTests((prev) => prev.filter((test) => test._id !== testId));

    try {
      const data = await arenaApi.deleteTest(testId);
      return { success: true, ...data };
    } catch (err) {
      setMyTests(previousMyTests);
      setTests(previousTests);
      console.error("Error deleting test:", err);
      throw err;
    }
  };

  const fetchMyTests = useCallback(async (page = 1) => {
    try {
      const res = await arenaApi.fetchMyTests(page, 15);
      const data = res.data || [];
      const totalPages = res.totalPages || 1;
      setMyTests((prev) => (page === 1 ? data : [...prev, ...data]));
      setMyTestsPage(page);
      setMyTestsHasMore(page < totalPages);
    } catch (err) {
      console.error("Error fetching my tests:", err);
    }
  }, []);

  // --- API Methods: Flashcards (Anki) ---
  const fetchFlashcards = useCallback(async (page = 1) => {
    try {
      const res = await arenaApi.fetchFlashcards(page, 20);
      const data = res.data || [];
      const totalPages = res.totalPages || 1;
      setFlashcardDecks((prev) => (page === 1 ? data : [...prev, ...data]));
      setFlashcardsPage(page);
      setFlashcardsHasMore(page < totalPages);
    } catch (err) {
      console.error("Error fetching flashcards:", err);
    }
  }, []);

  const createFlashcardDeck = async (payload) => {
    try {
      const data = await arenaApi.createFlashcardDeck(payload);
      fetchFlashcards(1); // Reset to page 1 to see new deck
      return data;
    } catch (err) {
      console.error("Error creating flashcard deck:", err);
    }
  };

  const updateFlashcardDeck = async (deckId, payload) => {
    try {
      const data = await arenaApi.updateFlashcardDeck(deckId, payload);
      fetchFlashcards(1);
      return data;
    } catch (err) {
      console.error("Error updating flashcard deck:", err);
      throw err;
    }
  };

  const deleteFlashcardDeck = async (deckId) => {
    const previousDecks = flashcardDecks;
    setFlashcardDecks((prev) => prev.filter((deck) => deck._id !== deckId));

    try {
      const data = await arenaApi.deleteFlashcardDeck(deckId);
      return { success: true, ...data };
    } catch (err) {
      setFlashcardDecks(previousDecks);
      console.error("Error deleting flashcard deck:", err);
      throw err;
    }
  };

  const reviewFlashcard = async (deckId, cardId, quality) => {
    try {
      await arenaApi.reviewFlashcard({ deckId, cardId, quality });
      // Can't just call fetchFlashcards(1) because that blows away loaded data if they're on page 3.
      // Usually reviewing doesn't change position but we should fetch current if needed. For now, doing nothing or refreshing only the deck details is better in FlashcardList.
      // However we will reload page 1 just to be safe as previously implemented.
      fetchFlashcards(1);
    } catch (err) {
      console.error("Error reviewing flashcard:", err);
    }
  };

  // --- API Methods: Sentence builders ---
  const fetchSentenceBuilders = useCallback(async (page = 1) => {
    try {
      const res = await arenaApi.fetchSentenceBuilders(page, 20);
      const data = res.data || [];
      const totalPages = res.totalPages || 1;
      setSentenceBuilderDecks((prev) => (page === 1 ? data : [...prev, ...data]));
      setSentenceBuildersPage(page);
      setSentenceBuildersHasMore(page < totalPages);
    } catch (err) {
      console.error("Error fetching sentence builders:", err);
    }
  }, []);

  const createSentenceBuilderDeck = async (payload) => {
    try {
      const data = await arenaApi.createSentenceBuilderDeck(payload);
      fetchSentenceBuilders(1);
      return data;
    } catch (err) {
      console.error("Error creating sentence builder deck:", err);
      throw err;
    }
  };

  const updateSentenceBuilderDeck = async (deckId, payload) => {
    try {
      const data = await arenaApi.updateSentenceBuilderDeck(deckId, payload);
      fetchSentenceBuilders(1);
      return data;
    } catch (err) {
      console.error("Error updating sentence builder deck:", err);
      throw err;
    }
  };

  const deleteSentenceBuilderDeck = async (deckId) => {
    const previousDecks = sentenceBuilderDecks;
    setSentenceBuilderDecks((prev) => prev.filter((deck) => deck._id !== deckId));

    try {
      const data = await arenaApi.deleteSentenceBuilderDeck(deckId);
      return { success: true, ...data };
    } catch (err) {
      setSentenceBuilderDecks(previousDecks);
      console.error("Error deleting sentence builder deck:", err);
      throw err;
    }
  };

  const fetchSharedSentenceBuilderDeck = useCallback(async (shortCode) => {
    return await arenaApi.fetchSharedSentenceBuilderDeck(shortCode);
  }, []);

  const fetchSentenceBuilderResults = useCallback(async (deckId, params = {}) => {
    return await arenaApi.fetchSentenceBuilderResults(deckId, params);
  }, []);

  const fetchSentenceBuilderShareLinks = useCallback(async (deckId) => {
    return await arenaApi.fetchSentenceBuilderShareLinks(deckId);
  }, []);

  const createSentenceBuilderShareLink = useCallback(
    async (deckId, payload) => {
      return await arenaApi.createSentenceBuilderShareLink(deckId, payload);
    },
    [],
  );

  const deleteSentenceBuilderShareLink = useCallback(
    async (deckId, shareLinkId) => {
      return await arenaApi.deleteSentenceBuilderShareLink(deckId, shareLinkId);
    },
    [],
  );

  const submitSentenceBuilderAttempt = useCallback(
    async (deckId, payload) => {
      return await arenaApi.submitSentenceBuilderAttempt(deckId, payload);
    },
    [],
  );

  // --- API Methods: Battle History ---
  const fetchBattleHistory = useCallback(async (params = {}) => {
    try {
      const data = await arenaApi.fetchBattleHistory(params);
      setBattleHistory(data.data || data); // Keep internal state for legacy compatibility if needed
      return data;
    } catch (err) {
      console.error("Error fetching battle history:", err);
      return { data: [], total: 0 };
    }
  }, []);

  const fetchActiveBattles = useCallback(async (page = 1) => {
    try {
      const res = await arenaApi.fetchActiveBattles(page, 15);
      const data = res.data || [];
      const totalPages = res.totalPages || 1;
      setActiveBattles((prev) => (page === 1 ? data : [...prev, ...data]));
      setActiveBattlesPage(page);
      setActiveBattlesHasMore(page < totalPages);
    } catch (err) {
      console.error("Error fetching active battles:", err);
    }
  }, []);

  // --- WebSockets: Bilimlar Bellashuvi ---
  useEffect(() => {
    // Moved to ArenaDashboard for lazy loading
  }, []);

  useEffect(() => {
      if ((!authUser?._id && !authUser?.id) && !guestName) {
        if (socketRef.current) socketRef.current.disconnect();
        return;
      }

      const socketUrl = buildSocketNamespaceUrl("/arena");
      socketRef.current = io(
        socketUrl,
        buildSocketOptions({
          auth: guestName ? { guestName } : undefined,
          forceNew: true,
        }),
      );

    socketRef.current.on("connect", () => {
      console.log("Arena Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("Arena Socket connection error:", err);
    });

    socketRef.current.on("battle_created", (data) => {
      console.log("Battle created:", data);
    });

    socketRef.current.on("battle_update", (data) => {
      console.log("Battle updated:", data);
      setActiveBattle(data);
    });

    socketRef.current.on("battle_started", (data) => {
      setActiveBattle(data);
    });

    socketRef.current.on("next_question_started", (data) => {
      setActiveBattle(data);
    });

    socketRef.current.on("battle_finished", (data) => {
      setActiveBattle(data);
    });

    socketRef.current.on("error", (msg) => {
      toast.error("Xatolik: " + msg);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, [authUser, guestName]);

  const setGuestSession = (name) => {
    localStorage.setItem("jamm_guest_name", name);
    setGuestName(name);
  };

  const createBattle = (
    testId,
    roomName = "Yangi Bellashuv",
    mode = "solo",
    visibility = "public",
  ) => {
    if (socketRef.current)
      socketRef.current.emit("create_battle", {
        testId,
        roomName,
        mode,
        visibility,
      });
  };

  const joinBattle = (roomId) => {
    console.log("Emitting join_battle:", roomId);
    if (socketRef.current) socketRef.current.emit("join_battle", { roomId });
    else console.warn("Socket not connected, cannot join battle");
  };

  const startBattle = (roomId) => {
    if (socketRef.current) socketRef.current.emit("start_battle", { roomId });
  };

  const submitAnswer = (roomId, answerIndex) => {
    if (socketRef.current)
      socketRef.current.emit("submit_answer", { roomId, answerIndex });
  };

  const nextQuestion = (roomId) => {
    if (socketRef.current) socketRef.current.emit("next_question", { roomId });
  };

  const endBattle = (roomId) => {
    if (socketRef.current) socketRef.current.emit("end_battle", { roomId });
  };

  const leaveBattle = (roomId) => {
    const idToLeave = roomId || activeBattle?.roomId;
    if (idToLeave && socketRef.current) {
      socketRef.current.emit("leave_battle", { roomId: idToLeave });
    }
    setActiveBattle(null);
  };

  return (
    <ArenaContext.Provider
      value={{
        tests,
        myTests,
        myTestsPage,
        myTestsHasMore,
        flashcardDecks,
        flashcardsPage,
        flashcardsHasMore,
        sentenceBuilderDecks,
        sentenceBuildersPage,
        sentenceBuildersHasMore,
        activeBattle,
        fetchTests,
        fetchMyTests,
        createTest,
        deleteTest,
        updateTest,
        fetchFlashcards,
        createFlashcardDeck,
        updateFlashcardDeck,
        deleteFlashcardDeck,
        reviewFlashcard,
        fetchSentenceBuilders,
        createSentenceBuilderDeck,
        updateSentenceBuilderDeck,
        deleteSentenceBuilderDeck,
        fetchSharedSentenceBuilderDeck,
        fetchSentenceBuilderResults,
        fetchSentenceBuilderShareLinks,
        createSentenceBuilderShareLink,
        deleteSentenceBuilderShareLink,
        submitSentenceBuilderAttempt,
        createBattle,
        joinBattle,
        startBattle,
        submitAnswer,
        nextQuestion,
        endBattle,
        leaveBattle,
        battleHistory,
        fetchBattleHistory,
        activeBattles,
        activeBattlesPage,
        activeBattlesHasMore,
        fetchActiveBattles,
        fetchTestResults: async (testId, params = {}) => {
          try {
            return await arenaApi.fetchTestResults(testId, params);
          } catch (err) {
            console.error(err);
            return { data: [], total: 0 };
          }
        },
        fetchFlashcardDeck: async (deckId) => {
          try {
            return await arenaApi.fetchFlashcardDeck(deckId);
          } catch (err) {
            console.error(err);
            return null;
          }
        },
        fetchFlashcardFolder: async (folderId) => {
          try {
            return await arenaApi.fetchFlashcardFolder(folderId);
          } catch (err) {
            console.error(err);
            return null;
          }
        },
        joinFlashcardDeck: async (deckId) => {
          try {
            await arenaApi.joinFlashcardDeck(deckId);
            return { success: true };
          } catch (err) {
            console.error(err);
            return { success: false };
          }
        },
        joinFlashcardFolder: async (folderId) => {
          try {
            const data = await arenaApi.joinFlashcardFolder(folderId);
            return { success: true, data };
          } catch (err) {
            console.error(err);
            return { success: false };
          }
        },
        leaveFlashcardDeck: async (deckId) => {
          try {
            await arenaApi.leaveFlashcardDeck(deckId);
            return { success: true };
          } catch (err) {
            console.error(err);
            return { success: false };
          }
        },
        leaveFlashcardFolder: async (folderId) => {
          try {
            const data = await arenaApi.leaveFlashcardFolder(folderId);
            return { success: true, data };
          } catch (err) {
            console.error(err);
            return { success: false };
          }
        },
        fetchSentenceBuilderDeck: async (deckId) => {
          try {
            return await arenaApi.fetchSentenceBuilderDeck(deckId);
          } catch (err) {
            console.error(err);
            return null;
          }
        },
        checkSentenceBuilderAnswer: async (
          deckId,
          questionIndex,
          selectedTokens,
        ) => {
          try {
            return await arenaApi.checkSentenceBuilderAnswer(
              deckId,
              questionIndex,
              selectedTokens,
            );
          } catch (err) {
            console.error(err);
            throw err;
          }
        },
        guestName,
        setGuestSession,
        socketRef,
      }}
    >
      {children}
    </ArenaContext.Provider>
  );
};

export const useArena = () => {
  const ctx = useContext(ArenaContext);
  if (!ctx) throw new Error("useArena must be used within ArenaProvider");
  return ctx;
};
