import { RESOLVED_APP_BASE_URL } from "../config/env";

const DESKTOP_NOTIFICATIONS_KEY = "jamm.desktopNotifications";
const SOUND_NOTIFICATIONS_KEY = "jamm.soundNotifications";
const DESKTOP_NOTIFICATIONS_BANNER_DISMISSED_KEY =
  "jamm.desktopNotificationsBannerDismissed";

const readBooleanSetting = (key, fallback = true) => {
  if (typeof window === "undefined") return fallback;

  const rawValue = window.localStorage.getItem(key);
  if (rawValue === null) return fallback;
  return rawValue === "true";
};

const writeBooleanSetting = (key, value) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, String(Boolean(value)));
};

export const getDesktopNotificationsEnabled = () =>
  readBooleanSetting(DESKTOP_NOTIFICATIONS_KEY, true);

export const setDesktopNotificationsEnabled = (value) =>
  writeBooleanSetting(DESKTOP_NOTIFICATIONS_KEY, value);

export const getSoundNotificationsEnabled = () =>
  readBooleanSetting(SOUND_NOTIFICATIONS_KEY, true);

export const setSoundNotificationsEnabled = (value) =>
  writeBooleanSetting(SOUND_NOTIFICATIONS_KEY, value);

export const getDesktopNotificationsBannerDismissed = () =>
  readBooleanSetting(DESKTOP_NOTIFICATIONS_BANNER_DISMISSED_KEY, false);

export const setDesktopNotificationsBannerDismissed = (value) =>
  writeBooleanSetting(DESKTOP_NOTIFICATIONS_BANNER_DISMISSED_KEY, value);

export const requestDesktopNotificationPermission = async () => {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    return "denied";
  }

  if (Notification.permission === "granted") {
    return "granted";
  }

  if (Notification.permission === "denied") {
    return "denied";
  }

  return Notification.requestPermission();
};

export const shouldShowDesktopNotification = () => {
  if (typeof window === "undefined" || typeof Notification === "undefined") {
    return false;
  }

  if (!getDesktopNotificationsEnabled()) {
    return false;
  }

  if (Notification.permission !== "granted") {
    return false;
  }

  return document.hidden || !document.hasFocus();
};

export const showDesktopChatNotification = ({
  title,
  body,
  icon,
  tag,
  path,
}) => {
  if (!shouldShowDesktopNotification()) {
    return null;
  }

  const notification = new Notification(title, {
    body,
    icon: icon || `${RESOLVED_APP_BASE_URL}/fav.png`,
    badge: `${RESOLVED_APP_BASE_URL}/fav.png`,
    tag,
    silent: !getSoundNotificationsEnabled(),
  });

  notification.onclick = () => {
    notification.close();
    window.focus?.();

    if (path) {
      window.location.href = path;
    }
  };

  return notification;
};
