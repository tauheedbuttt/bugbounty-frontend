import { queryKey } from "@/constants/queryKeys";
import useGetQuery from "../use-get-query";
import { getLeaderboard, getLeaderboardYears } from "@/apis/hacker/leaderboard";
import {
  LeaderboardDataResponse,
  LeaderboardYearsDataResponse,
} from "@/types/hacker/leaderboard";
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
      queryKey: queryKey.LEADERBOARD,
      queryFn: getLeaderboard,
      params,
      onSuccess,
    });
  };

  const useGetLeaderboardYears = ({
    onSuccess,
  }: {
    onSuccess?: (data: LeaderboardYearsDataResponse) => void;
  }) => {
    return useGetQuery<LeaderboardYearsDataResponse, {}>({
      queryKey: queryKey.LEADERBOARD_YEARS,
      queryFn: getLeaderboardYears,
      params: {},
      onSuccess,
    });
  };

  return {
    useGetLeaderboard,
    useGetLeaderboardYears,
  };
};
