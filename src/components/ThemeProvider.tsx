// components/ThemeProvider.tsx
import { useThemeStore } from "@/stores/theme";
import { useEffect } from "react";

export const ThemeProvider = ({ children }) => {
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    // Only initialize theme if not forced dark
    if (!document.documentElement.hasAttribute("data-force-dark")) {
      initializeTheme();
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (
        !localStorage.getItem("theme-storage") &&
        !document.documentElement.hasAttribute("data-force-dark")
      ) {
        useThemeStore.getState().setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [initializeTheme]);

  return <>{children}</>;
};
