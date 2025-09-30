// stores/themeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDarkMode: false,

      toggleDarkMode: () => {
        const newMode = !get().isDarkMode;
        set({ isDarkMode: newMode });
        updateDocumentTheme(newMode);
      },

      setDarkMode: (isDark: boolean) => {
        set({ isDarkMode: isDark });
        updateDocumentTheme(isDark);
      },

      initializeTheme: () => {
        const { isDarkMode } = get();
        // Check system preference if no saved preference
        if (isDarkMode === undefined || isDarkMode === null) {
          const systemPrefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          set({ isDarkMode: systemPrefersDark });
          updateDocumentTheme(systemPrefersDark);
        } else {
          updateDocumentTheme(isDarkMode);
        }
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);

// Helper function to update document class
const updateDocumentTheme = (isDark: boolean) => {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
