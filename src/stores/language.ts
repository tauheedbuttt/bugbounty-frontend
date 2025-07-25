// stores/languageStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

interface LanguageState {
  currentLanguage: Language;
  direction: Direction;
  setLanguage: (language: Language) => void;
  initializeLanguage: () => void;
}

const languageConfig = {
  en: { direction: "ltr" as Direction, name: "English" },
  ar: { direction: "rtl" as Direction, name: "العربية" },
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: "en",
      direction: "ltr",

      setLanguage: (language: Language) => {
        const config = languageConfig[language];
        set({
          currentLanguage: language,
          direction: config.direction,
        });
        updateDocumentLanguage(language, config.direction);
      },

      initializeLanguage: () => {
        const { currentLanguage } = get();
        const config = languageConfig[currentLanguage];
        updateDocumentLanguage(currentLanguage, config.direction);
      },
    }),
    {
      name: "language-storage",
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
      }),
    }
  )
);

// Helper function to update document attributes
const updateDocumentLanguage = (language: Language, direction: Direction) => {
  document.documentElement.lang = language;
  document.documentElement.dir = direction;
  document.body.style.fontFamily =
    language === "ar"
      ? 'Cairo, Amiri, "Noto Sans Arabic", sans-serif'
      : "Inter, system-ui, sans-serif";
};
