import { ApiResponse, PaginatedResponse } from "@/lib/types";
import { COMMENT_TYPES } from "./comment";

export enum NOTIFICATION_TYPES {
  COMMENT = "Comment",
  PROGRAM = "Program",
}

export interface INotification {
  _id: string;
  description?: string;
  username?: string;
  to?: string;
  from?: string;
  report?: [
    {
      id: string;
      _id: string;
    }
  ];
  program?: [
    {
      id: string;
      _id: string;
      slug: string;
    }
  ];
  commentType?: COMMENT_TYPES;
  type?: NOTIFICATION_TYPES;
  deleted: boolean;
  seen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotificationSeen {
  notifications: number;
}

export type NotificationResponse = ApiResponse<
  PaginatedResponse<INotification>
>;

export type NotificationSeenResponse = ApiResponse<INotificationSeen>;
