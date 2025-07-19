import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { REWARD_TYPE } from "@/lib/enums";
import { formatNumber } from "@/lib/utils";
import { HackerProgramBounty } from "@/types/hacker/program";

interface RewardStructureProps {
  bounties: HackerProgramBounty[];
  rewardType: REWARD_TYPE;
}

export default function RewardStructure({
  bounties,
  rewardType,
}: RewardStructureProps) {
  const renderRewardValue = (severityReward: any) => {
    if (rewardType === REWARD_TYPE.Bounty && severityReward.money) {
      return (
        <span className="font-semibold text-sm text-foreground">
          $ {formatNumber(severityReward.money, "comma")}
        </span>
      );
    }

    if (rewardType === REWARD_TYPE.Points && severityReward.points) {
      return (
        <span className="font-semibold text-sm text-foreground">
          {formatNumber(severityReward.points, "comma")} pts
        </span>
      );
    }

    if (
      rewardType === REWARD_TYPE.Mixed &&
      severityReward.money &&
      severityReward.points
    ) {
      return (
        <div className="flex flex-col items-center">
          <span className="font-semibold text-sm text-foreground">
            {severityReward.money}
          </span>
          <span className="text-xs text-muted-foreground">
            {severityReward.points} pts
          </span>
        </div>
      );
    }

    return null;
  };

  // Calculate total rewards for percentage calculation
  const totalReward = bounties
    .map((item) => item.totalReward)
    .reduce((a, b) => a + b, 0);

  const severityLevels = bounties.map((item) => {
    let value = item.totalReward;

    const progress =
      totalReward > 0 ? Math.round((value / totalReward) * 100) : 0;

    return {
      key: item.type,
      label: item.type,
      data: { money: item.moneyReward, points: item.pointsReward },
      progress,
    };
  });

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-6">
        <CardTitle className="text-xl font-semibold text-foreground">
          Bounty Rewards
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Vulnerability severity levels and corresponding rewards
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Progress Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Reward Scale
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
                      className="w-20 h-1.5 bg-muted/50"
                    />
                    <span className="text-xs text-muted-foreground">
                      {level.progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Reward Value */}
              <div className="text-right">{renderRewardValue(level.data)}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            💡 Higher severity vulnerabilities receive better rewards
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
