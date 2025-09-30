import { LeaderboardQueryParams } from "@/types/hacker/leaderboard";
import apiClient, { getErrorMessage } from "..";

export const getLeaderboard = async (params: LeaderboardQueryParams) => {
  try {
    const response = await apiClient.get(`hacker/leaderboard`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getLeaderboardYears = async () => {
  try {
    const response = await apiClient.get(`hacker/leaderboard/years`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
