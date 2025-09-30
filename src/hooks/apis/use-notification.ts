import { queryKey } from "@/constants/queryKeys";
import useGetQuery from "../use-get-query";
import {
  getNotifications,
  getNotificationSeen,
  seenNotifications,
} from "@/apis/notification";
import {
  NotificationResponse,
  NotificationSeenResponse,
} from "@/types/notification";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";

const useNotification = () => {
  const queryClient = useQueryClient();

  const useGetNotification = ({
    onSuccess,
  }: {
    onSuccess?: (data: NotificationResponse) => void;
  }) => {
    return useGetQuery<NotificationResponse, {}>({
      queryKey: queryKey.NOTIFICATIONS,
      queryFn: getNotifications,
      params: {},
      onSuccess,
    });
  };

  const useGetNotificationSeen = ({
    onSuccess,
  }: {
    onSuccess?: (data: NotificationSeenResponse) => void;
  }) => {
    return useGetQuery<NotificationSeenResponse, {}>({
      queryKey: queryKey.NOTIFICATIONS_SEEN,
      queryFn: getNotificationSeen,
      params: {},
      onSuccess,
    });
  };

  const useViewNotification = useMutation({
    mutationFn: (data: { id: string }) => seenNotifications(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.NOTIFICATIONS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.NOTIFICATIONS_SEEN],
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "Please check your input and try again.",
        variant: "destructive",
      });
    },
  });

  return {
    useGetNotification,
    useGetNotificationSeen,
    useViewNotification,
  };
};

export default useNotification;
