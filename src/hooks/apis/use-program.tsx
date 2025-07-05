import {
  actionsAdminProgram,
  addAdminProgram,
  deleteAdminProgram,
  getAdminPrograms,
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

export const useProgram = () => {
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
      toast({
        title: "Program created successfully",
        description: `The ${data.data.program.name} has been added.`,
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

  const useActionsAdminProgram = useMutation({
    mutationFn: (data: AdminProgramActionsData) => actionsAdminProgram(data),
    onSuccess: (data: AdminProgramActionResponse) => {
      updateProgram(data.data.program);
      // queryClient.invalidateQueries({ queryKey: [queryKey.ADMIN_PROGRAMS] });
      if (data.data.action === "status") {
        toast({
          title: "Status Updated",
          description: `Program is now ${data.data.program.status}`,
        });
      } else {
        toast({
          title: "Visibility Updated",
          description: `Program is now ${data.data.program.visibility}`,
        });
      }
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    },
  });

  const useDeleteAdminProgram = useMutation({
    mutationFn: (data: AdminProgramDeleteData) => deleteAdminProgram(data),
    onSuccess: (data: AdminProgramActionResponse) => {
      deleteProgram(data.data.program);
      toast({
        title: "Program Deleted",
        description: "Program has been permanently deleted",
        variant: "destructive",
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
    useGetAdminPrograms,
    useGetHackerPrograms,
    useGetHackerProgramById,
    useAddAdminProgram,
    useActionsAdminProgram,
    useDeleteAdminProgram,
  };
};
