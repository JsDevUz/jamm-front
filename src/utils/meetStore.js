import axiosInstance from "../api/axiosInstance";
import { API_BASE_URL } from "../config/env";

export async function getMeets() {
  try {
    const res = await axiosInstance.get(`${API_BASE_URL}/meets`);
    // All meets from GET /meets are created by the current user (findByCreator)
    return res.data.map((m) => ({ ...m, isCreator: true }));
  } catch (error) {
    console.error("Failed to fetch meets", error);
    return [];
  }
}

export async function saveMeet({ roomId, title, isPrivate, isCreator }) {
  if (!isCreator) return null;
  try {
    const { data } = await axiosInstance.post(
      `${API_BASE_URL}/meets`,
      { roomId, title, isPrivate },
    );
    return data;
  } catch (error) {
    console.error("Failed to save meet", error);
    throw error;
  }
}

export async function removeMeet(roomId) {
  try {
    await axiosInstance.delete(`${API_BASE_URL}/meets/${roomId}`);
  } catch (error) {
    console.error("Failed to remove meet", error);
  }
}

export async function updateMeetPrivacy(roomId, isPrivate) {
  const { data } = await axiosInstance.patch(
    `${API_BASE_URL}/meets/${roomId}/privacy`,
    { isPrivate },
  );
  return data;
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
