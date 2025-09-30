import LeaderboardUi from "@/components/LeaderboardUI";
import { useTranslation } from "@/hooks/use-translation";

export default function HackerLeaderboard() {
  const { t } = useTranslation();

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t.common.buttons.leaderboard}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t.common.buttons.researchers_ranking_across_bugbounty}
              </p>
            </div>
            <div className="flex gap-2"></div>
          </div>
          <LeaderboardUi container={"pt-6"} />
        </div>
      </div>
    </>
  );
}
