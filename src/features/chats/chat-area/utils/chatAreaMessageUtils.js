import dayjs from "dayjs";

export const normalizeSenderId = (senderId) => {
  if (senderId && typeof senderId === "object") {
    return senderId._id || senderId.id;
  }

  return senderId;
};

export const normalizeReadByIds = (readBy = []) =>
  readBy
    .map((entry) => {
      if (entry && typeof entry === "object") {
        return entry._id || entry.id || null;
      }

      return entry ?? null;
    })
    .filter(Boolean)
    .map((entry) => String(entry));

export const groupMessagesByDate = (messages) => {
  const grouped = [];
  let currentDate = null;

  messages.forEach((message) => {
    let messageDate = message.date;

    if (!messageDate && message.timestamp) {
      const timestampDate = new Date(message.timestamp);
      messageDate = !Number.isNaN(timestampDate.getTime())
        ? timestampDate.toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];
    }

    if (messageDate !== currentDate) {
      currentDate = messageDate;
      grouped.push({ type: "date", date: currentDate });
    }

    grouped.push({
      ...message,
      type: "message",
      date: messageDate,
    });
  });

  return grouped;
};

export const mapIncomingMessage = (rawMessage) => ({
  id: rawMessage._id,
  user: rawMessage.senderId?.nickname || rawMessage.senderId?.username,
  avatar:
    rawMessage.senderId?.avatar ||
    (rawMessage.senderId?.nickname || rawMessage.senderId?.username)?.charAt(0) ||
    "U",
  senderId: rawMessage.senderId?._id || rawMessage.senderId,
  content: rawMessage.content,
  timestamp: dayjs(rawMessage.createdAt).format("HH:mm"),
  date: dayjs(rawMessage.createdAt).format("YYYY-MM-DD"),
  edited: rawMessage.isEdited,
  isDeleted: rawMessage.isDeleted,
  readBy: normalizeReadByIds(rawMessage.readBy),
  replayTo: rawMessage.replayTo
    ? {
        id: rawMessage.replayTo._id,
        user:
          rawMessage.replayTo.senderId?.nickname ||
          rawMessage.replayTo.senderId?.username,
        content: rawMessage.replayTo.content,
      }
    : null,
  createdAt: rawMessage.createdAt,
});

export const getUserAvatarInitials = (username) => {
  const names = username.split(" ");

  if (names.length >= 2) {
    return names[0][0] + names[names.length - 1][0];
  }

  return names[0].substring(0, 2).toUpperCase();
};
