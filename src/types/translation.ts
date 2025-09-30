import { translations } from "@/locales/translations";

// Type helper to create nested object structure from translation keys
type CreateNestedObject<T> = {
  [K in keyof T]: T[K] extends Record<string, any>
    ? CreateNestedObject<T[K]>
    : string;
};

export type TranslationType = CreateNestedObject<typeof translations.en>;
