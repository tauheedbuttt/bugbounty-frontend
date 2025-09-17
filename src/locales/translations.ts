import { arabic } from "./arabic";
import { english } from "./english";

// locales/translations.ts
export const translations = {
  en: english,
  ar: arabic,
};

export type TranslationKey = keyof typeof translations.en;
