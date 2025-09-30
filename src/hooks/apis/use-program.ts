import {
  actionsAdminProgram,
  addAdminProgram,
  deleteAdminProgram,
  getAdminPrograms,
  getAdminProgramStats,
  updateAdminProgram,
} from "@/apis/admin/program";
import { queryKey } from "@/constants/queryKeys";
import { useProgramStore } from "@/stores/program";
import {
  AdminProgramActionResponse,
  AdminProgramActionsData,
  AdminProgramCreateData,
  AdminProgramCreateResponse,
  AdminProgramDeleteData,
  AdminProgramResponse,
  AdminProgramStatsResponse,
  ProgramsQuery,
} from "@/types/admin/program";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import {
  HackerProgramByIdResponse,
  HackerProgramResponse,
} from "@/types/hacker/program";
import { getHackerProgramById, getHackerPrograms } from "@/apis/hacker/program";
import useGetQuery from "../use-get-query";
import { useTranslation } from "../use-translation";

export const useProgram = () => {
  const { t } = useTranslation();
  const { setPrograms, insertProgram, updateProgram, deleteProgram } =
    useProgramStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const useGetAdminPrograms = ({
    params,
    onSuccess,
  }: {
    params: ProgramsQuery;
    onSuccess?: (data: AdminProgramResponse) => void;
  }) => {
    return useGetQuery<AdminProgramResponse, ProgramsQuery>({
      queryKey: queryKey.ADMIN_PROGRAMS,
      queryFn: getAdminPrograms,
      params,
      onSuccess,
      setItems: setPrograms,
      extractItems: (data) => data?.data?.items ?? [],
    });
  };

  const useGetAdminProgramStats = ({
    onSuccess,
  }: {
    onSuccess?: (data: AdminProgramStatsResponse) => void;
  }) => {
    return useGetQuery<AdminProgramStatsResponse, {}>({
      queryKey: queryKey.ADMIN_PROGRAMS_STATS,
      queryFn: getAdminProgramStats,
      params: {},
      onSuccess,
    });
  };

  const useGetHackerPrograms = ({
    params,
    onSuccess,
  }: {
    params: ProgramsQuery;
    onSuccess?: (data: HackerProgramResponse) => void;
  }) => {
    return useGetQuery<HackerProgramResponse, ProgramsQuery>({
      queryKey: queryKey.HACKER_PROGRAMS,
      queryFn: getHackerPrograms,
      params,
      onSuccess,
      setItems: setPrograms,
      extractItems: (data) => data?.data?.items ?? [],
    });
  };

  const useGetHackerProgramById = ({
    id,
    onSuccess,
  }: {
    id: string;
    onSuccess?: (data: HackerProgramByIdResponse) => void;
  }) => {
    return useGetQuery<HackerProgramByIdResponse, any>({
      queryKey: queryKey.HACKER_PROGRAMS,
      queryFn: () => getHackerProgramById(id),
      params: {},
      onSuccess,
    });
  };

  const useAddAdminProgram = useMutation({
    mutationFn: (data: AdminProgramCreateData) => addAdminProgram(data),
    onSuccess: (data: AdminProgramCreateResponse) => {
      insertProgram(data.data.program);
      navigate(ROUTE_PATHS.ADMIN_PROGRAMS);
      queryClient.invalidateQueries({ queryKey: [queryKey.ADMIN_PROGRAMS] });
      queryClient.invalidateQueries({
        queryKey: [queryKey.ADMIN_PROGRAMS_STATS],
      });
      toast({
        title: t.common.messages.program_created_successfully,
        description: t.common.messages.the_program_has_been_added.replace(
          "${data.data.program.name}",
          data.data.program.name
        ),
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: t.common.messages.please_check_your_input_and_try_again,
        variant: "destructive",
      });
    },
  });

  const useUpdateAdminProgram = (
    values: AdminProgramCreateData,
    onClose: VoidFunction
  ) =>
    useMutation({
      mutationFn: (data: AdminProgramCreateData) => updateAdminProgram(data),
      onSuccess: (data: AdminProgramCreateResponse) => {
        queryClient.invalidateQueries({ queryKey: [queryKey.ADMIN_PROGRAMS] });
        queryClient.invalidateQueries({
          queryKey: [queryKey.ADMIN_PROGRAMS_STATS],
        });
        updateProgram(values as any);
        toast({
          title: t.common.messages.program_updated_successfully,
          description: t.common.messages.the_program_has_been_updated.replace(
            "${values.name}",
            values.name
          ),
        });
        onClose();
      },
      onError: (error) => {
        toast({
          title: error.message,
          description: t.common.messages.please_check_your_input_and_try_again,
          variant: "destructive",
        });
      },
    });

  const useActionsAdminProgram = useMutation({
    mutationFn: (data: AdminProgramActionsData) => actionsAdminProgram(data),
    onSuccess: (data: AdminProgramActionResponse) => {
      updateProgram(data.data.program);
      queryClient.invalidateQueries({
        queryKey: [queryKey.ADMIN_PROGRAMS_STATS],
      });
      if (data.data.action === "status") {
        toast({
          title: t.common.messages.status_updated,
          description: t.common.messages.program_is_now_status.replace(
            "${data.data.program.status}",
            data.data.program.status
          ),
        });
      } else {
        toast({
          title: t.common.messages.visibility_updated,
          description: t.common.messages.program_is_now_visible.replace(
            "${data.data.program.visibility}",
            data.data.program.visibility
          ),
        });
      }
    },
    onError: (error) => {
      toast({
        title: error.message,
        description:
          t.common.messages.please_check_your_internet_connection_and_try_again,
        variant: "destructive",
      });
    },
  });

  const useDeleteAdminProgram = useMutation({
    mutationFn: (data: AdminProgramDeleteData) => deleteAdminProgram(data),
    onSuccess: (data: AdminProgramActionResponse) => {
      deleteProgram(data.data.program);
      toast({
        title: t.common.messages.program_deleted,
        description: t.common.messages.program_has_been_permanently_deleted,
        variant: "destructive",
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        description:
          t.common.messages.please_check_your_internet_connection_and_try_again,
        variant: "destructive",
      });
    },
  });

  return {
    useGetAdminPrograms,
    useGetAdminProgramStats,
    useGetHackerPrograms,
    useGetHackerProgramById,
    useAddAdminProgram,
    useUpdateAdminProgram,
    useActionsAdminProgram,
    useDeleteAdminProgram,
  };
};
