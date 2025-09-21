import LandingBackButton from "@/components/LandingBackButton";
import LeaderboardUi from "@/components/LeaderboardUI";
import { useTranslation } from "@/hooks/use-translation";
import { useLayoutEffect } from "react";

export default function Leaderboard() {
  const { t } = useTranslation();

  // Force dark mode for this page, even on reload
  useLayoutEffect(() => {
    document.documentElement.classList.add("dark");
    // Set a flag so ThemeProvider knows to skip
    document.documentElement.setAttribute("data-force-dark", "true");
    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.removeAttribute("data-force-dark");
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-900">
        <div className="container mx-auto px-6 py-8">
          <LandingBackButton />
          <h1 className="text-4xl font-light text-white mb-4">
            {t.common.buttons.leaderboard}
          </h1>
          <p className="text-gray-400 text-lg">
            {t.common.buttons.top_researchers_safer_world}
          </p>
        </div>
      </div>

      <LeaderboardUi />
    </div>
  );
}
