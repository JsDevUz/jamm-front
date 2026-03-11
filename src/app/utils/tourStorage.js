const readCookie = (key) => {
  if (typeof document === "undefined") return null;
  const prefix = `${encodeURIComponent(key)}=`;
  const entry = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(prefix));

  if (!entry) return null;
  return decodeURIComponent(entry.slice(prefix.length));
};

const writeCookie = (key, value) => {
  if (typeof document === "undefined") return;
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(
    value,
  )}; path=/; max-age=31536000; SameSite=Lax`;
};

export const getTourFlag = (key) => {
  try {
    const value = window.localStorage.getItem(key);
    if (value) return value;
  } catch {}

  return readCookie(key);
};

export const setTourFlag = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {}

  writeCookie(key, value);
};
