const normalizeUrl = (value) => String(value || "").trim().replace(/\/+$/, "");

export const API_BASE_URL = normalizeUrl(import.meta.env.VITE_API_URL);

export const APP_BASE_URL = normalizeUrl(
  import.meta.env.VITE_APP_URL ||
    import.meta.env.VITE_FRONTEND_URL,
);

export const RESOLVED_APP_BASE_URL = APP_BASE_URL || window.location.origin;

export const buildSocketNamespaceUrl = (namespace = "") => {
  const normalizedNamespace = namespace
    ? `/${String(namespace).replace(/^\/+/, "")}`
    : "";
  return API_BASE_URL
    ? `${API_BASE_URL}${normalizedNamespace}`
    : normalizedNamespace;
};
