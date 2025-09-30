// components/LanguageProvider.tsx
import { useLanguageStore } from "@/stores/language";
import { useEffect } from "react";

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const initializeLanguage = useLanguageStore(
    (state) => state.initializeLanguage
  );

  useEffect(() => {
    // Initialize language on app start
    initializeLanguage();
  }, [initializeLanguage]);

  return <>{children}</>;
};
