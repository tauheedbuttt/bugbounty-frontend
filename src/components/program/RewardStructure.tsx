import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/use-translation";
import { REWARD_TYPE } from "@/lib/enums";
import { cn } from "@/lib/utils";
import { HackerProgramBounty } from "@/types/hacker/program";
import { getSeverityLevels, renderRewardValue } from "@/utils/utils";

interface RewardStructureProps {
  bounties: HackerProgramBounty[];
  rewardType: REWARD_TYPE;
}

export default function RewardStructure({
  bounties,
  rewardType,
}: RewardStructureProps) {
  const { t, currentLanguage } = useTranslation();

  // Calculate total rewards for percentage calculation

  const severityLevels = getSeverityLevels(bounties);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold text-foreground">
          {t.common.buttons.bounty_rewards}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {t.common.buttons.vulnerability_severity_and_rewards}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Progress Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {t.common.buttons.reward_scale}
            </span>
            <span className="text-sm font-medium text-foreground">100%</span>
          </div>
          <Progress value={100} className="h-2 bg-muted" />
        </div>

        {/* Severity Levels */}
        <div className="space-y-4">
          {severityLevels.map((level, index) => (
            <div
              key={level.key}
              className="flex items-center justify-between p-4 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Step Number */}
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    {index + 1}
                  </span>
                </div>

                {/* Severity Info */}
                <div className="space-y-1">
                  <p className="font-medium text-foreground">{level.label}</p>
                  <div className="flex items-center gap-2">
                    <Progress
                      value={level.progress}
                      className={cn(
                        "w-20 h-1.5 bg-muted/50",
                        currentLanguage === "ar" ? "scale-x-[-1]" : ""
                      )}
                    />
                    <span className="text-xs text-muted-foreground">
                      {level.progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Reward Value */}
              <div className="text-right">
                {renderRewardValue(rewardType, level.data)}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            {t.common.buttons.high_severity_better_rewards}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
