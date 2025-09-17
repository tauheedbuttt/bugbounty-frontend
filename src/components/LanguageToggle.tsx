// components/LanguageToggle.tsx
import { useTranslation } from "@/hooks/use-translation";
import { Language, useLanguageStore } from "@/stores/language";
import { Languages } from "lucide-react";
import { Button } from "./ui/button";

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle = ({ className = "" }: LanguageToggleProps) => {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage: Language = currentLanguage === "en" ? "ar" : "en";
    setLanguage(newLanguage);
  };

  return (
    <Button
      titlePosition="bottom"
      onClick={toggleLanguage}
      variant="ghost"
      className={`
        relative p-2 rounded-lg transition-all duration-300 
        hover:bg-accent 
        flex items-center gap-2 
        ${className}
      `}
      aria-label={
        currentLanguage === "en"
          ? t.accessibility.switchToArabic
          : t.accessibility.switchToEnglish
      }
    >
      {/* <Languages size={16} /> */}
      <span className="text-xs font-medium min-w-[2ch]">
        {currentLanguage === "en" ? "AR" : "EN"}
      </span>
    </Button>
  );
};
