import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/uz-latn";

dayjs.extend(relativeTime);

/**
 * Formats date for chat sidebar:
 * - Today: HH:mm
 * - Yesterday: Kecha
 * - This Year: D-MMM
 * - Older: DD.MM.YYYY
 */
export const formatChatTime = (date) => {
  if (!date) return "";
  const d = dayjs(date);
  const now = dayjs();

  if (d.isSame(now, "day")) {
    return d.format("HH:mm");
  } else if (d.isSame(now.subtract(1, "day"), "day")) {
    return "Kecha";
  } else if (d.isSame(now, "year")) {
    return d.format("D-MMMM");
  } else {
    return d.format("DD.MM.YYYY");
  }
};

/**
 * Formats date for chat dividers:
 * - Today: Bugun
 * - Yesterday: Kecha
 * - Otherwise: D-MMMM YYYY (uz)
 */
export const formatMessageDate = (date) => {
  if (!date) return "";
  const d = dayjs(date);
  const now = dayjs();

  if (d.isSame(now, "day")) {
    return "Bugun";
  } else if (d.isSame(now.subtract(1, "day"), "day")) {
    return "Kecha";
  } else {
    return d.format("D-MMMM YYYY");
  }
};
