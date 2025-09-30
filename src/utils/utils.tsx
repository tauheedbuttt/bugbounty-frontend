import { BOUNTY_REWARDS } from "@/constants/constants";
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
    case REWARD_TYPE.SwagBountyPoints: {
      return (
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">
            {!severityReward.points
              ? ""
              : `${formatNumber(severityReward.points, "comma")} pts`}
          </span>
          <span className="text-xs text-muted-foreground">
            {!severityReward.money
              ? "-"
              : `$${formatNumber(severityReward.money, "comma")}`}
          </span>
          <span className="text-xs text-muted-foreground">
            {!severityReward.swag ? "-" : severityReward.swag}
          </span>
        </div>
      );
    }
    case REWARD_TYPE.BountyPoints: {
      return (
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">
            {!severityReward.points
              ? ""
              : `${formatNumber(severityReward.points, "comma")} pts`}
          </span>
          <span className="text-xs text-muted-foreground">
            {!severityReward.money
              ? "-"
              : `$${formatNumber(severityReward.money, "comma")}`}
          </span>
        </div>
      );
    }
    case REWARD_TYPE.SwagPoints: {
      return (
        <div className="flex flex-col items-end">
          <span className="text-xs text-muted-foreground">
            {!severityReward.points
              ? ""
              : `${formatNumber(severityReward.points, "comma")} pts`}
          </span>
          <span className="text-xs text-muted-foreground">
            {!severityReward.swag ? "-" : severityReward.swag}
          </span>
        </div>
      );
    }
    case REWARD_TYPE.Points: {
      return (
        <span className="text-xs text-muted-foreground">
          {formatNumber(severityReward.points, "comma")} pts
        </span>
      );
    }
    default:
      return null;
  }
};

export const getSeverityLevels = (bounties: HackerProgramBounty[]) => {
  const severityLevels = BOUNTY_REWARDS.map((br) => {
    const item = bounties.find((b) => b.type === br.key);
    return {
      ...br,
      data: {
        money: item?.moneyReward || 0,
        points: item?.pointsReward || 0,
        swag: item?.swagReward || "",
      },
    };
  }).filter((item) => item.data.money || item.data.points || item.data.swag);

  return severityLevels;
};
