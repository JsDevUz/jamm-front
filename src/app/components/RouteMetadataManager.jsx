import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_BASE_URL } from "../../config/env";
import { useChats } from "../../contexts/ChatsContext";

const DEFAULT_META = {
  title: "Jamm | Chat, Kurslar va Musobaqa Platformasi",
  description:
    "Chatlar, kurslar, arena mashqlari, maqolalar va video uchrashuvlar uchun yagona platforma.",
  image: "/fav.png",
};

const NAV_META = [
  {
    pattern: /^\/(?:home|feed)?$/,
    title: "Feed | Jamm",
    description: "Jamm feedida yangiliklar, postlar va muhokamalarni kuzating.",
  },
  {
    pattern: /^\/(?:chats|users|groups)(?:\/.*)?$/,
    title: "Chatlar | Jamm",
    description:
      "Jamm ichida shaxsiy va guruh chatlarini boshqaring, tezkor muloqot qiling.",
  },
  {
    pattern: /^\/articles(?:\/.*)?$/,
    title: "Maqolalar | Jamm",
    description: "Jamm maqolalari, yozuvlar va bilimlar bazasini o'qing.",
  },
  {
    pattern: /^\/courses(?:\/.*)?$/,
    title: "Kurslar | Jamm",
    description:
      "Jamm kurslari, darslar va topshiriqlarini bir joyda boshqaring.",
  },
  {
    pattern: /^\/arena(?:\/.*)?$/,
    title: "Arena | Jamm",
    description:
      "Testlar, flashcards, sentence builder va battle mashqlari Jamm Arena'da.",
  },
  {
    pattern: /^\/profile(?:\/.*)?$/,
    title: "Profil | Jamm",
    description: "Jamm profilingiz, sozlamalar va akkaunt boshqaruvi.",
  },
  {
    pattern: /^\/admin(?:\/.*)?$/,
    title: "Admin Panel | Jamm",
    description: "Jamm boshqaruv paneli va monitoring oynasi.",
  },
];

const DYNAMIC_PREVIEW_PATTERNS = [
  /^\/[-:+][^/]+$/,
  /^\/groups\/[^/]+$/,
  /^\/users\/[^/]+$/,
  /^\/articles\/[^/]+$/,
  /^\/courses\/[^/]+(?:\/[^/]+)?$/,
  /^\/join\/[^/]+$/,
  /^\/arena\/quiz-link\/[^/]+$/,
  /^\/arena\/quiz\/[^/]+(?:\/[^/]+)?$/,
  /^\/arena\/flashcards\/[^/]+$/,
  /^\/arena\/flashcard-folders\/[^/]+$/,
  /^\/arena\/sentence-builder\/[^/]+$/,
  /^\/arena\/battle\/[^/]+$/,
];

function ensureMeta(selector, attribute, key, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

function ensureCanonical(href) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function applyMetadata(meta, pathname) {
  const resolvedUrl = new URL(pathname || "/", window.location.origin).toString();
  const resolvedImage = new URL(meta.image || DEFAULT_META.image, window.location.origin).toString();

  document.title = meta.title || DEFAULT_META.title;
  ensureMeta(
    'meta[name="description"]',
    "name",
    "description",
    meta.description || DEFAULT_META.description,
  );
  ensureMeta(
    'meta[property="og:title"]',
    "property",
    "og:title",
    meta.title || DEFAULT_META.title,
  );
  ensureMeta(
    'meta[property="og:description"]',
    "property",
    "og:description",
    meta.description || DEFAULT_META.description,
  );
  ensureMeta('meta[property="og:url"]', "property", "og:url", resolvedUrl);
  ensureMeta('meta[property="og:image"]', "property", "og:image", resolvedImage);
  ensureMeta(
    'meta[name="twitter:title"]',
    "name",
    "twitter:title",
    meta.title || DEFAULT_META.title,
  );
  ensureMeta(
    'meta[name="twitter:description"]',
    "name",
    "twitter:description",
    meta.description || DEFAULT_META.description,
  );
  ensureMeta('meta[name="twitter:image"]', "name", "twitter:image", resolvedImage);
  ensureCanonical(resolvedUrl);
}

function getStaticMeta(pathname) {
  return NAV_META.find((item) => item.pattern.test(pathname)) || DEFAULT_META;
}

function matchesChatRoute(chat, targetId) {
  if (!chat || !targetId) return false;

  const normalizedTargetId = String(targetId);
  return [
    chat.urlSlug,
    chat.privateurl,
    chat.jammId,
    chat.id,
    chat._id,
    chat.username,
  ]
    .filter(Boolean)
    .some((value) => String(value) === normalizedTargetId);
}

async function fetchPreviewMeta(pathname) {
  const baseUrl = String(API_BASE_URL || "").replace(/\/+$/, "");
  if (!baseUrl) {
    return null;
  }

  const response = await fetch(`${baseUrl}/link-preview${pathname}`, {
    method: "GET",
    headers: { Accept: "text/html" },
  });

  if (!response.ok) {
    return null;
  }

  const html = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return {
    title:
      doc.querySelector('meta[property="og:title"]')?.getAttribute("content") ||
      doc.querySelector("title")?.textContent ||
      DEFAULT_META.title,
    description:
      doc.querySelector('meta[property="og:description"]')?.getAttribute("content") ||
      doc.querySelector('meta[name="description"]')?.getAttribute("content") ||
      DEFAULT_META.description,
    image:
      doc.querySelector('meta[property="og:image"]')?.getAttribute("content") ||
      doc.querySelector('meta[name="twitter:image"]')?.getAttribute("content") ||
      DEFAULT_META.image,
  };
}

export default function RouteMetadataManager() {
  const location = useLocation();
  const { chats = [] } = useChats();

  useEffect(() => {
    let cancelled = false;
    const pathname = location.pathname || "/";
    const apply = async () => {
      const fallbackMeta = getStaticMeta(pathname);
      applyMetadata(fallbackMeta, pathname);

      if (!DYNAMIC_PREVIEW_PATTERNS.some((pattern) => pattern.test(pathname))) {
        return;
      }

      const chatRouteMatch = pathname.match(/^\/(users|groups)\/([^/]+)$/);
      if (chatRouteMatch) {
        const [, , resourceId] = chatRouteMatch;
        const matchedChat = chats.find((chat) => matchesChatRoute(chat, resourceId));
        if (matchedChat) {
          return;
        }
      }

      try {
        const previewMeta = await fetchPreviewMeta(pathname);
        if (!cancelled && previewMeta) {
          applyMetadata(previewMeta, pathname);
        }
      } catch {
        // Static fallback is already applied above.
      }
    };

    apply();

    return () => {
      cancelled = true;
    };
  }, [chats, location.pathname]);

  return null;
}
