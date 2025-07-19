import { queryKey } from "@/constants/queryKeys";
import useGetQuery from "../use-get-query";
import { useUserStore } from "@/stores/user";
import {
  AdminBlueBadgResponse,
  AdminDeleteData,
  AdminInviteResponse,
  AdminInviteUserData,
  AdminResearcherStatsResponse,
  AdminRoleData,
  AdminUserBanData,
  AdminUserBanResponse,
  AdminUserBlueBadgeData,
  UsersQuery,
} from "@/types/admin/user";
import {
  banAdminUser,
  deleteAdminUser,
  getAdminUsers,
  getAdminUsersResearcherStats,
  inviteAdminUser,
  roleAdminUser,
  updateAdminBlueBadge,
} from "@/apis/admin/user";
import { AdminUserResponse } from "@/types/admin/user";
import { toast } from "../use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_STATUS } from "@/lib/enums";
import {
  ProgramDeleteData,
  ProgramInviteResponse,
  ProgramInviteUserData,
  ProgramResearcherResponse,
  ProgramRoleData,
  ProgramUserResponse,
} from "@/types/program/user";
import {
  deleteProgramUser,
  getProgramResearchers,
  getProgramUsers,
  inviteProgramUser,
  updateProgramUser,
} from "@/apis/program/user";
import { BaseQueryParams } from "@/lib/types";

export const useUser = () => {
  const { setUsers, updateUser, insertUser, deleteUser } = useUserStore();
  const queryClient = useQueryClient();

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

  const useGetAdminUserStats = ({
    onSuccess,
  }: {
    onSuccess?: (data: AdminResearcherStatsResponse) => void;
  }) => {
    return useGetQuery<AdminResearcherStatsResponse, {}>({
      queryKey: queryKey.ADMIN_USERS_STATS,
      queryFn: getAdminUsersResearcherStats,
      params: {},
      onSuccess,
    });
  };

  const useGetProgramUsers = ({
    params,
    onSuccess,
  }: {
    params: BaseQueryParams;
    onSuccess?: (data: ProgramUserResponse) => void;
  }) => {
    return useGetQuery<ProgramUserResponse, BaseQueryParams>({
      queryKey: queryKey.PROGRAM_USERS,
      queryFn: getProgramUsers,
      params,
      onSuccess,
      setItems: setUsers,
      extractItems: (data) => data?.data?.items ?? [],
    });
  };

  const useGetProgramResearchers = ({
    onSuccess,
  }: {
    onSuccess?: (data: ProgramResearcherResponse) => void;
  }) => {
    return useGetQuery<ProgramResearcherResponse, any>({
      queryKey: queryKey.PROGRAM_RESEARCHERS,
      queryFn: getProgramResearchers,
      params: {},
      onSuccess,
    });
  };

  const useAdminBlueBadgeUser = useMutation({
    mutationFn: (data: AdminUserBlueBadgeData) => updateAdminBlueBadge(data),
    onSuccess: (data: AdminBlueBadgResponse) => {
      queryClient.invalidateQueries({ queryKey: [queryKey.ADMIN_USERS_STATS] });
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
      queryClient.invalidateQueries({ queryKey: [queryKey.ADMIN_USERS_STATS] });
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

  const useAdminInviteUser = (resetForm: VoidFunction) =>
    useMutation({
      mutationFn: (data: AdminInviteUserData) => inviteAdminUser(data),
      onSuccess: (data: AdminInviteResponse) => {
        queryClient.invalidateQueries({
          queryKey: [queryKey.ADMIN_USERS_STATS],
        });
        insertUser(data.data.user);
        resetForm();

        toast({
          title: "Success",
          description: `Invited admin: ${data.data.user.email} (${data.data.user.adminRole})`,
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

  const useProgramInviteUser = (resetForm: VoidFunction) =>
    useMutation({
      mutationFn: (data: ProgramInviteUserData) => inviteProgramUser(data),
      onSuccess: (data: ProgramInviteResponse) => {
        resetForm();
        queryClient.invalidateQueries({ queryKey: [queryKey.PROGRAM_USERS] });

        toast({
          title: "Success",
          description: `Invited member: ${data.data.user.email}`,
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

  const useAdminRemoveUser = useMutation({
    mutationFn: (data: AdminDeleteData) => deleteAdminUser(data),
    onSuccess: (data: AdminInviteResponse) => {
      deleteUser(data.data.user);
      queryClient.invalidateQueries({ queryKey: [queryKey.ADMIN_USERS_STATS] });
      toast({ title: "Removed", description: "Admin removed" });
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    },
  });

  const useProgramRemoveUser = (onClose: VoidFunction) =>
    useMutation({
      mutationFn: (data: ProgramDeleteData) => deleteProgramUser(data),
      onSuccess: (data: ProgramInviteResponse) => {
        deleteUser(data.data.user);
        toast({ title: "Removed", description: "Program member removed" });
        onClose();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
      },
    });

  const useAdminRoleUser = (close: VoidFunction) =>
    useMutation({
      mutationFn: (data: AdminRoleData) => roleAdminUser(data),
      onSuccess: (data: AdminInviteResponse) => {
        updateUser(data.data.user);
        toast({ title: "Updated", description: "Permissions updated" });
        close();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: "Please check your internet connection and try again.",
          variant: "destructive",
        });
      },
    });

  const useProgramUpdateUser = useMutation({
    mutationFn: (data: ProgramRoleData) => updateProgramUser(data),
    onSuccess: (data: ProgramInviteResponse) => {
      updateUser(data.data.user);
      toast({ title: "Updated", description: "Role updated" });
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
    useAdminInviteUser,
    useAdminRemoveUser,
    useAdminRoleUser,
    useGetProgramUsers,
    useProgramInviteUser,
    useProgramRemoveUser,
    useProgramUpdateUser,
    useGetProgramResearchers,
    useGetAdminUserStats,
  };
};
