import { REWARD_TYPE } from "@/lib/enums";
import { formatNumber } from "@/lib/utils";
import { HackerProgramBounty } from "@/types/hacker/program";

interface BountyData {
  money: number;
  points: number;
  swag: string;
}

export const renderRewardValue = (
  rewardType: REWARD_TYPE,
  severityReward: BountyData
) => {
  switch (rewardType) {
    case REWARD_TYPE.BountyPoints: {
      return (
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground">
            {!severityReward.points
              ? ""
              : `${formatNumber(severityReward.points, "comma")} pts`}
          </span>
          <span className="font-semibold text-sm text-foreground">
            {!severityReward.money
              ? "-"
              : `$${formatNumber(severityReward.money, "comma")}`}
          </span>
        </div>
      );
    }
    case REWARD_TYPE.SwagPoints: {
      return (
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground">
            {!severityReward.points
              ? ""
              : `${formatNumber(severityReward.points, "comma")} pts`}
          </span>
          <span className="font-semibold text-sm text-foreground">
            {!severityReward.swag ? "-" : severityReward.swag}
          </span>
        </div>
      );
    }
    case REWARD_TYPE.Points: {
      return (
        <span className="font-semibold text-sm text-foreground">
          {formatNumber(severityReward.points, "comma")} pts
        </span>
      );
    }
    default:
      return null;
  }
};

export const getSeverityLevels = (bounties: HackerProgramBounty[]) => {
  const totalReward = bounties
    .map((item) => item.totalReward)
    .reduce((a, b) => a + b, 0);
  const severityLevels = bounties
    .map((item) => {
      let value = item.totalReward;

      const progress =
        totalReward > 0 ? Math.round((value / totalReward) * 100) : 0;

      return {
        key: item.type,
        label: item.type,
        data: {
          money: item.moneyReward,
          points: item.pointsReward,
          swag: item.swagReward,
        },
        progress,
      };
    })
    .sort((a, b) => b.progress - a.progress);

  return severityLevels;
};
