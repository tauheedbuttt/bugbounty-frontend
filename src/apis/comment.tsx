import apiClient, { getErrorMessage } from ".";
import { CommentAddData } from "@/types/comment";

export const addComment = async (data: CommentAddData) => {
  try {
    const response = await apiClient.post(`comment/add`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(getErrorMessage(error));
  }
};
