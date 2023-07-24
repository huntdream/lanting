import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'
import commonZH from './zh/common.json';
import commonEN from './en/common.json';

export const resources = {
  en: {
    translation: commonEN,
  },
  zh: {
    translation: commonZH,
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
      skipOnVariables: false,
    }
  });

export default i18n;