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

const ArenaContext = createContext(null);
const API_URL = "http://localhost:3000";

export const ArenaProvider = ({ children }) => {
  const [tests, setTests] = useState([]);
  const [myTests, setMyTests] = useState([]);
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  const [flashcardsPage, setFlashcardsPage] = useState(1);
  const [flashcardsHasMore, setFlashcardsHasMore] = useState(true);
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
  const token = useAuthStore((state) => state.token);

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

  const fetchMyTests = useCallback(
    async (page = 1) => {
      if (!token) return;
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
    },
    [token],
  );

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
    if (!token && !guestName) {
      if (socketRef.current) socketRef.current.disconnect();
      return;
    }

    const socketUrl = API_URL.replace("http", "ws") + "/arena";
    socketRef.current = io(socketUrl, {
      auth: { token, guestName },
      transports: ["websocket"],
      forceNew: true,
    });

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
  }, [token, guestName]);

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
        activeBattle,
        fetchTests,
        fetchMyTests,
        createTest,
        fetchFlashcards,
        createFlashcardDeck,
        reviewFlashcard,
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
            const token = useAuthStore.getState().token;
            if (!token) return { data: [], total: 0 };
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
        joinFlashcardDeck: async (deckId) => {
          try {
            const token = useAuthStore.getState().token;
            if (!token) return { success: false };
            await arenaApi.joinFlashcardDeck(deckId);
            return { success: true };
          } catch (err) {
            console.error(err);
            return { success: false };
          }
        },
        leaveFlashcardDeck: async (deckId) => {
          try {
            const token = useAuthStore.getState().token;
            if (!token) return { success: false };
            await arenaApi.leaveFlashcardDeck(deckId);
            return { success: true };
          } catch (err) {
            console.error(err);
            return { success: false };
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
