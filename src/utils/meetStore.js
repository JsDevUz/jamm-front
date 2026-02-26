/**
 * meetStore.js — localStorage helpers for meet history
 * Meets are stored as an array of { roomId, title, isPrivate, isCreator, joinedAt }
 */

const KEY = "jamm_meets";

export function getMeets() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveMeet({ roomId, title, isPrivate, isCreator }) {
  const meets = getMeets().filter((m) => m.roomId !== roomId); // dedupe
  meets.unshift({ roomId, title, isPrivate, isCreator, joinedAt: Date.now() });
  // Keep only last 20
  localStorage.setItem(KEY, JSON.stringify(meets.slice(0, 20)));
}

export function removeMeet(roomId) {
  const meets = getMeets().filter((m) => m.roomId !== roomId);
  localStorage.setItem(KEY, JSON.stringify(meets));
}

export function getMeetById(roomId) {
  return getMeets().find((m) => m.roomId === roomId) || null;
}

export function markAsCreator(roomId) {
  const meets = getMeets().map((m) =>
    m.roomId === roomId ? { ...m, isCreator: true } : m,
  );
  localStorage.setItem(KEY, JSON.stringify(meets));
}
