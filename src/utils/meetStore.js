import axios from "axios";
import useAuthStore from "../store/authStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const getHeaders = () => {
  const token = useAuthStore.getState().token;
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export async function getMeets() {
  try {
    const res = await axios.get(`${API_URL}/meets`, getHeaders());
    // All meets from GET /meets are created by the current user (findByCreator)
    return res.data.map((m) => ({ ...m, isCreator: true }));
  } catch (error) {
    console.error("Failed to fetch meets", error);
    return [];
  }
}

export async function saveMeet({ roomId, title, isPrivate, isCreator }) {
  if (!isCreator) return; // Only save if creator
  try {
    await axios.post(
      `${API_URL}/meets`,
      { roomId, title, isPrivate },
      getHeaders(),
    );
  } catch (error) {
    console.error("Failed to save meet", error);
  }
}

export async function removeMeet(roomId) {
  try {
    await axios.delete(`${API_URL}/meets/${roomId}`, getHeaders());
  } catch (error) {
    console.error("Failed to remove meet", error);
  }
}

export async function getMeetById(roomId) {
  // In a real generic app we might fetch from server, but for now we just filter local if needed
  // Alternatively return null if not fetched
  const meets = await getMeets();
  return meets.find((m) => m.roomId === roomId) || null;
}

export function markAsCreator(roomId) {
  // no-op, isCreator is set based on DB ownership now
}
