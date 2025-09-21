import apiClient, { getErrorMessage } from "..";
import { ProgramsQuery } from "@/types/admin/program";

export const getHackerPrograms = async (params: ProgramsQuery) => {
  try {
    const response = await apiClient.get(`hacker/program`, {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};

export const getHackerProgramById = async (id: string) => {
  try {
    const response = await apiClient.get(`hacker/program/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
