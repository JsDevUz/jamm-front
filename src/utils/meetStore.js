import axiosInstance from "../api/axiosInstance";
import { API_BASE_URL } from "../config/env";

export const MEET_ROOM_ID_PATTERN = /^[a-zA-Z0-9_-]{4,128}$/;

export function isValidMeetRoomId(roomId) {
  return (
    typeof roomId === "string" &&
    MEET_ROOM_ID_PATTERN.test(roomId.trim())
  );
}

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

export async function saveMeet({
  roomId,
  title,
  isPrivate,
  isCreator,
  courseId,
  lessonId,
}) {
  if (!isCreator) return null;
  try {
    const body = { roomId, title, isPrivate };
    if (courseId) body.courseId = courseId;
    if (lessonId) body.lessonId = lessonId;
    const { data } = await axiosInstance.post(`${API_BASE_URL}/meets`, body);
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
  try {
    const { data } = await axiosInstance.get(`${API_BASE_URL}/meets/public/${roomId}`);
    return data || null;
  } catch (error) {
    if (error?.response?.status === 404) {
      return null;
    }
    console.error("Failed to fetch public meet", error);
    return null;
  }
}

export function markAsCreator(roomId) {
  // no-op, isCreator is set based on DB ownership now
}
