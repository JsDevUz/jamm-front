import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

const LANGUAGE_MAP = {
  uz: "uz",
  "uz-uz": "uz",
  "uz-latn": "uz",
  en: "en",
  "en-us": "en",
  ru: "ru",
  "ru-ru": "ru",
};

export const normalizeLanguageCode = (value) => {
  if (!value) return "uz";
  return LANGUAGE_MAP[String(value).trim().toLowerCase()] || "uz";
};

const resources = {
  uz: { translation: uz },
  en: { translation: en },
  ru: { translation: ru },
};

const syncDayjsLocale = (language) => {
  const localeMap = {
    uz: "uz-latn",
    en: "en",
    ru: "ru",
  };

  dayjs.locale(localeMap[language] || "uz-latn");
};

const initialLanguage = normalizeLanguageCode(
  localStorage.getItem("language") || window.navigator.language,
);

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false,
  },
});

syncDayjsLocale(initialLanguage);
localStorage.setItem("language", initialLanguage);

i18n.on("languageChanged", (language) => {
  const nextLanguage = normalizeLanguageCode(language);
  syncDayjsLocale(nextLanguage);
  localStorage.setItem("language", nextLanguage);
});

export default i18n;
