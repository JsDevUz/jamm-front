import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { io } from "socket.io-client";
import useAuthStore from "../store/authStore";
import { API_BASE_URL, buildSocketNamespaceUrl } from "../config/env";

const PresenceContext = createContext();
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
  const currentUser = useAuthStore((state) => state.user);
  const normalizeUserId = useCallback((userId) => {
    if (userId === null || userId === undefined) return null;
    return String(userId);
  }, []);
  const currentUserId = currentUser?._id || currentUser?.id || null;

  useEffect(() => {
    if (!currentUserId) {
      setConnected(false);
      setOnlineUsers(new Map());
      return;
    }

    const socket = io(buildSocketNamespaceUrl("/presence"), {
      withCredentials: true,
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
      const normalizedUserId = normalizeUserId(userId);
      if (!normalizedUserId) return;
      setOnlineUsers((prev) => {
        const next = new Map(prev);
        next.set(normalizedUserId, true);
        return next;
      });
    });

    socket.on("user_offline", ({ userId }) => {
      const normalizedUserId = normalizeUserId(userId);
      if (!normalizedUserId) return;
      setOnlineUsers((prev) => {
        const next = new Map(prev);
        next.delete(normalizedUserId);
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
  }, [currentUserId]); // Connect after auth bootstrap resolves

  /**
   * Check if a specific user is online.
   * Checks local cache first; falls back to REST API.
   */
  const isUserOnline = useCallback(
    (userId) => {
      const normalizedUserId = normalizeUserId(userId);
      if (!normalizedUserId) return false;
      return onlineUsers.has(normalizedUserId);
    },
    [normalizeUserId, onlineUsers],
  );

  /**
   * Fetch bulk online statuses from the REST API.
   * Useful for rendering user lists.
   */
  const fetchBulkStatuses = useCallback(
    async (userIds) => {
      if (!currentUserId) return {};
      try {
      const res = await fetch(`${API_BASE_URL}/presence/status/bulk`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userIds }),
      });
      if (!res.ok) return {};
      const data = await res.json();

      // Update local cache using functional updater to avoid dependency loop
      setOnlineUsers((prev) => {
        const newMap = new Map(prev);
        for (const [id, online] of Object.entries(data.statuses || {})) {
          const normalizedUserId = normalizeUserId(id);
          if (!normalizedUserId) continue;
          if (online) newMap.set(normalizedUserId, true);
          else newMap.delete(normalizedUserId);
        }
        return newMap;
      });

      return data.statuses;
      } catch (err) {
        console.error("Failed to fetch bulk statuses:", err);
        return {};
      }
    },
    [currentUserId, normalizeUserId],
  );

  /**
   * Count how many users from a list of member IDs are online.
   * Used for group chats to show "X online".
   */
  const getOnlineCount = useCallback(
    (memberIds = []) => {
      if (!memberIds || memberIds.length === 0) return 0;
      return memberIds.filter((id) => {
        const memberId =
          typeof id === "object" ? id?._id || id?.id : id;
        const normalizedUserId = normalizeUserId(memberId);
        return normalizedUserId ? onlineUsers.has(normalizedUserId) : false;
      }).length;
    },
    [normalizeUserId, onlineUsers],
  );

  const value = {
    onlineUsers,
    connected,
    isUserOnline,
    getOnlineCount,
    fetchBulkStatuses,
    socket: socketRef.current,
  };

  return (
    <PresenceContext.Provider value={value}>
      {children}
    </PresenceContext.Provider>
  );
};
