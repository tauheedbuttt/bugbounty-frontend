import { queryKey } from "@/constants/queryKeys";
import useGetQuery from "../use-get-query";
import { useUserStore } from "@/stores/user";
import {
  AdminBlueBadgResponse,
  AdminUserBanData,
  AdminUserBanResponse,
  AdminUserBlueBadgeData,
  UsersQuery,
} from "@/types/admin/user";
import {
  banAdminUser,
  getAdminUsers,
  updateAdminBlueBadge,
} from "@/apis/admin/user";
import { AdminUserResponse } from "@/types/admin/user";
import { toast } from "../use-toast";
import { useMutation } from "@tanstack/react-query";
import { USER_STATUS } from "@/lib/enums";

export const useUser = () => {
  const { setUsers, updateUser } = useUserStore();

  const useGetAdminUsers = ({
    params,
    onSuccess,
  }: {
    params: UsersQuery;
    onSuccess?: (data: AdminUserResponse) => void;
  }) => {
    return useGetQuery<AdminUserResponse, UsersQuery>({
      queryKey: queryKey.ADMIN_USERS,
      queryFn: getAdminUsers,
      params,
      onSuccess,
      setItems: setUsers,
      extractItems: (data) => data?.data?.items ?? [],
    });
  };

  const useAdminBlueBadgeUser = useMutation({
    mutationFn: (data: AdminUserBlueBadgeData) => updateAdminBlueBadge(data),
    onSuccess: (data: AdminBlueBadgResponse) => {
      updateUser(data.data.user);
      toast({
        title: "Blue Badge Updated",
        description: `Blue badge ${
          data.data.user.isBlueBadge ? "granted to" : "removed from"
        } researcher`,
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    },
  });

  const useAdminBanUser = useMutation({
    mutationFn: (data: AdminUserBanData) => banAdminUser(data),
    onSuccess: (data: AdminUserBanResponse) => {
      updateUser(data.data.user);
      const title =
        data.data.user.status === USER_STATUS.TempBan
          ? `User Temporarily Banned`
          : data.data.user.status === USER_STATUS.PermBan
          ? `User Permanently Banned`
          : "Researcher Unbanned";
      const description =
        data.data.user.status === USER_STATUS.TempBan
          ? `Researcher has been temporarily banned${
              data.data.user.banDays
                ? ` for ${data.data.user.banDays} day(s)`
                : ""
            }.`
          : data.data.user.status === USER_STATUS.PermBan
          ? `Researcher has been permanently banned`
          : "The researcher has been unbanned and restored to active status.";

      toast({
        title,
        description,
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    },
  });

  return {
    useGetAdminUsers,
    useAdminBlueBadgeUser,
    useAdminBanUser,
  };
};
