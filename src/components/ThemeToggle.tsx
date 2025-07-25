// components/ThemeToggle.tsx
import { useThemeStore } from "@/stores/theme";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export const ThemeToggle = ({
  className = "",
  size = 20,
}: ThemeToggleProps) => {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative p-2 rounded-lg transition-all duration-300 
        hover:bg-accent 
        ${className}
      `}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <Sun
          size={size}
          className={`
            absolute inset-0 transition-all duration-300 transform
            ${
              isDarkMode
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }
          `}
        />
        <Moon
          size={size}
          className={`
            absolute inset-0 transition-all duration-300 transform
            ${
              isDarkMode
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }
          `}
        />
      </div>
    </button>
  );
};
