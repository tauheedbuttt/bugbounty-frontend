// hooks/useTranslation.ts
import { useLanguageStore } from "@/stores/language";
import { translations } from "../locales/translations";
import { TranslationType } from "@/types/translation";

// Helper function to create nested translation object
const createTranslationObject = (
  translations: any,
  currentLanguage: string,
  path: string[] = []
): any => {
  const currentTranslations = translations[currentLanguage];
  const englishFallback = translations.en;

  const buildNestedObject = (
    obj: any,
    fallbackObj: any,
    currentPath: string[] = []
  ): any => {
    if (typeof obj === "string") {
      return obj;
    }

    if (typeof obj === "object" && obj !== null) {
      const result: any = {};

      // Get all keys from both current language and English fallback
      const allKeys = new Set([
        ...Object.keys(obj || {}),
        ...Object.keys(fallbackObj || {}),
      ]);

      for (const key of allKeys) {
        const currentValue = obj?.[key];
        const fallbackValue = fallbackObj?.[key];
        const newPath = [...currentPath, key];

        if (typeof currentValue === "string") {
          result[key] = currentValue;
        } else if (typeof fallbackValue === "string") {
          result[key] = fallbackValue;
        } else if (
          typeof currentValue === "object" ||
          typeof fallbackValue === "object"
        ) {
          result[key] = buildNestedObject(currentValue, fallbackValue, newPath);
        } else {
          // Return the path as string if no translation found
          result[key] = newPath.join(".");
        }
      }

      return result;
    }

    return path.join(".");
  };

  return buildNestedObject(currentTranslations, englishFallback);
};

export const useTranslation = () => {
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);

  // Create the nested translation object
  const t = createTranslationObject(
    translations,
    currentLanguage
  ) as TranslationType;

  return { t, currentLanguage };
};
