import { queryKey } from "@/constants/queryKeys";
import useGetQuery from "../use-get-query";
import { getLeaderboard } from "@/apis/hacker/leaderboard";
import { LeaderboardDataResponse } from "@/types/hacker/leaderboard";
import { BaseQueryParams } from "@/lib/types";

export const useLeaderboard = () => {
  const useGetLeaderboard = ({
    params,
    onSuccess,
  }: {
    params: BaseQueryParams;
    onSuccess?: (data: LeaderboardDataResponse) => void;
  }) => {
    return useGetQuery<LeaderboardDataResponse, BaseQueryParams>({
      queryKey: queryKey.HACKER_REPORTS,
      queryFn: getLeaderboard,
      params,
      onSuccess,
    });
  };

  return {
    useGetLeaderboard,
  };
};
