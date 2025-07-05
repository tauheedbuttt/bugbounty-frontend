import { BaseQueryParams } from "@/lib/types";
import apiClient, { getErrorMessage } from "..";

export const getLeaderboard = async (params: BaseQueryParams) => {
  try {
    const response = await apiClient.get(`hacker/leaderboard`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
