// components/ThemeProvider.tsx
import { useThemeStore } from "@/stores/theme";
import { useEffect } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    // Initialize theme on app start
    initializeTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      const hasManualPreference = localStorage.getItem("theme-storage");
      if (!hasManualPreference) {
        useThemeStore.getState().setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [initializeTheme]);

  return <>{children}</>;
};
