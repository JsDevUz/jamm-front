import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { io } from "socket.io-client";

const PresenceContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const HEARTBEAT_INTERVAL = 20_000; // 20 seconds

export const usePresence = () => useContext(PresenceContext);

/**
 * PresenceProvider — manages WebSocket connection to /presence namespace.
 *
 * Features:
 *   - JWT-authenticated Socket.IO connection
 *   - Heartbeat every 20s to keep presence alive
 *   - Real-time online/offline status tracking for all users
 *   - Auto-reconnect on connection drop
 */
export const PresenceProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState(new Map());
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const heartbeatRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Connect to /presence namespace with JWT
    const socket = io(`${API_URL}/presence`, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 2000,
      reconnectionAttempts: 10,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);

      // Start heartbeat interval
      heartbeatRef.current = setInterval(() => {
        socket.emit("presence:ping");
      }, HEARTBEAT_INTERVAL);
    });

    socket.on("disconnect", () => {
      setConnected(false);

      // Clear heartbeat
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
    });

    // Listen for status broadcasts from server
    socket.on("user_online", ({ userId }) => {
      setOnlineUsers((prev) => {
        const next = new Map(prev);
        next.set(userId, true);
        return next;
      });
    });

    socket.on("user_offline", ({ userId }) => {
      setOnlineUsers((prev) => {
        const next = new Map(prev);
        next.delete(userId);
        return next;
      });
    });

    socket.on("connect_error", (err) => {
      console.error("Presence connection error:", err.message);
    });

    // Cleanup on unmount
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      socket.disconnect();
      socketRef.current = null;
    };
  }, []); // Runs once on mount

  /**
   * Check if a specific user is online.
   * Checks local cache first; falls back to REST API.
   */
  const isUserOnline = useCallback(
    (userId) => {
      return onlineUsers.has(userId);
    },
    [onlineUsers],
  );

  /**
   * Fetch bulk online statuses from the REST API.
   * Useful for rendering user lists.
   */
  const fetchBulkStatuses = useCallback(async (userIds) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/presence/status/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIds }),
      });
      if (!res.ok) return {};
      const data = await res.json();

      // Update local cache using functional updater to avoid dependency loop
      setOnlineUsers((prev) => {
        const newMap = new Map(prev);
        for (const [id, online] of Object.entries(data.statuses || {})) {
          if (online) newMap.set(id, true);
          else newMap.delete(id);
        }
        return newMap;
      });

      return data.statuses;
    } catch (err) {
      console.error("Failed to fetch bulk statuses:", err);
      return {};
    }
  }, []);

  /**
   * Count how many users from a list of member IDs are online.
   * Used for group chats to show "X online".
   */
  const getOnlineCount = useCallback(
    (memberIds = []) => {
      if (!memberIds || memberIds.length === 0) return 0;
      return memberIds.filter((id) => {
        const memberId = typeof id === "object" ? id._id : id;
        return onlineUsers.has(memberId);
      }).length;
    },
    [onlineUsers],
  );

  const value = {
    onlineUsers,
    connected,
    isUserOnline,
    getOnlineCount,
    fetchBulkStatuses,
  };

  return (
    <PresenceContext.Provider value={value}>
      {children}
    </PresenceContext.Provider>
  );
};
