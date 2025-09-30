import { queryKey } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import useGetQuery from "../use-get-query";
import { useReportStore } from "@/stores/report";
import {
  HackerReportCreateData,
  HackerReportCreateResponse,
  HackerReportMonthlyResponse,
  HackerReportResponse,
  HackerReportSeveritiesResponse,
  HackerReportStatusResponse,
  ReportsQuery,
  ReportTrendResponse,
} from "@/types/hacker/report";
import {
  addHackerReport,
  getHackerReports,
  getHackerReportsMonthly,
  getHackerReportsSeverities,
} from "@/apis/hacker/report";
import {
  getAdminReports,
  getAdminReportStats,
  getProgramAnalytics,
  getProgramReportStats,
} from "@/apis/admin/report";
import {
  AdminReportResponse,
  AdminReportStatsResponse,
  AnalyticsStatsResponse,
  ProgramReportStatsResponse,
  UnseenReportsResponse,
} from "@/types/admin/report";
import {
  approveReport,
  changesReport,
  getReportById,
  getSeverities,
  getStatus,
  getTrend,
  requestMediator,
  unseenReports,
  viewReport,
} from "@/apis/report";
import {
  ApproveReportData,
  ChangesReportData,
  ReportByIdResponse,
  RequestMediatorData,
  ViewReportData,
} from "@/types/report";
import { addComment } from "@/apis/comment";
import { CommentAddData } from "@/types/comment";

export const useReport = () => {
  const { setReports, insertReport } = useReportStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const useGetReportById = ({
    id,
    onSuccess,
  }: {
    id: string;
    onSuccess?: (data: ReportByIdResponse) => void;
  }) => {
    return useGetQuery<ReportByIdResponse, { id: string }>({
      queryKey: queryKey.REPORT_DETAILS,
      queryFn: () => getReportById(id),
      params: { id },
      onSuccess,
    });
  };

  const useGetReportsSeverities = ({
    onSuccess,
  }: {
    onSuccess?: (data: HackerReportSeveritiesResponse) => void;
  }) => {
    return useGetQuery<HackerReportSeveritiesResponse, {}>({
      queryKey: queryKey.REPORTS_SEVERIRTIES,
      queryFn: () => getSeverities(),
      params: {},
      onSuccess,
    });
  };

  const useGetReportsStatus = ({
    onSuccess,
  }: {
    onSuccess?: (data: HackerReportStatusResponse) => void;
  }) => {
    return useGetQuery<HackerReportStatusResponse, {}>({
      queryKey: queryKey.REPORTS_SEVERIRTIES,
      queryFn: () => getStatus(),
      params: {},
      onSuccess,
    });
  };

  const useGetReportTrend = ({
    onSuccess,
  }: {
    onSuccess?: (data: ReportTrendResponse) => void;
  }) => {
    return useGetQuery<ReportTrendResponse, {}>({
      queryKey: queryKey.REPORTS_TREND,
      queryFn: () => getTrend(),
      params: {},
      onSuccess,
    });
  };

  const useGetAdminReports = ({
    params,
    onSuccess,
  }: {
    params: ReportsQuery;
    onSuccess?: (data: AdminReportResponse) => void;
  }) => {
    return useGetQuery<AdminReportResponse, ReportsQuery>({
      queryKey: queryKey.ADMIN_REPORTS,
      queryFn: getAdminReports,
      params,
      onSuccess,
      setItems: setReports,
      extractItems: (data) => data?.data?.items ?? [],
    });
  };

  const useGetAdminReportStats = ({
    onSuccess,
  }: {
    onSuccess?: (data: AdminReportStatsResponse) => void;
  }) => {
    return useGetQuery<AdminReportStatsResponse, {}>({
      queryKey: queryKey.ADMIN_REPORTS_STATS,
      queryFn: getAdminReportStats,
      params: {},
      onSuccess,
    });
  };

  const useGetProgramReportStats = ({
    onSuccess,
  }: {
    onSuccess?: (data: ProgramReportStatsResponse) => void;
  }) => {
    return useGetQuery<ProgramReportStatsResponse, {}>({
      queryKey: queryKey.PROGRAM_REPORTS_STATS,
      queryFn: getProgramReportStats,
      params: {},
      onSuccess,
    });
  };

  const useGetProgramAnalytics = ({
    onSuccess,
  }: {
    onSuccess?: (data: AnalyticsStatsResponse) => void;
  }) => {
    return useGetQuery<AnalyticsStatsResponse, {}>({
      queryKey: queryKey.PROGRAM_ANALYTICS,
      queryFn: getProgramAnalytics,
      params: {},
      onSuccess,
    });
  };

  const useGetUnseenReports = ({
    onSuccess,
  }: {
    onSuccess?: (data: UnseenReportsResponse) => void;
  }) => {
    return useGetQuery<UnseenReportsResponse, {}>({
      queryKey: queryKey.UNSEEN_REPORTS,
      queryFn: unseenReports,
      params: {},
      onSuccess,
    });
  };

  const useGetHackerReports = ({
    params,
    onSuccess,
  }: {
    params: ReportsQuery;
    onSuccess?: (data: HackerReportResponse) => void;
  }) => {
    return useGetQuery<HackerReportResponse, ReportsQuery>({
      queryKey: queryKey.HACKER_REPORTS,
      queryFn: getHackerReports,
      params,
      onSuccess,
      setItems: setReports,
      extractItems: (data) => data?.data?.items ?? [],
    });
  };

  const useGetHackerReportsSeverities = ({
    onSuccess,
  }: {
    onSuccess?: (data: HackerReportSeveritiesResponse) => void;
  }) => {
    return useGetQuery<HackerReportSeveritiesResponse, {}>({
      queryKey: queryKey.HACKER_REPORTS,
      queryFn: () => getHackerReportsSeverities(),
      params: {},
      onSuccess,
    });
  };

  const useGetHackerReportsMonthly = ({
    onSuccess,
  }: {
    onSuccess?: (data: HackerReportMonthlyResponse) => void;
  }) => {
    return useGetQuery<HackerReportMonthlyResponse, {}>({
      queryKey: queryKey.HACKER_REPORTS,
      queryFn: () => getHackerReportsMonthly(),
      params: {},
      onSuccess,
    });
  };

  const useAddHackerReport = useMutation({
    mutationFn: (data: HackerReportCreateData) => addHackerReport(data),
    onSuccess: (data: HackerReportCreateResponse) => {
      insertReport(data.data.report);
      navigate(ROUTE_PATHS.REPORTS);
      queryClient.invalidateQueries({ queryKey: [queryKey.HACKER_REPORTS] });
      toast({
        title: "Report created successfully",
        description: `The ${data.data.report.name} report has been submited.`,
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

  const useReportChanges = useMutation({
    mutationFn: (data: ChangesReportData) => changesReport(data),
    onSuccess: (data: HackerReportCreateResponse) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.REPORT_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.ADMIN_REPORTS_STATS],
      });
      toast({
        title: "Report updated successfully",
        description: `The report has been updated.`,
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

  const useReportApprove = useMutation({
    mutationFn: (data: ApproveReportData) => approveReport(data),
    onSuccess: (data: HackerReportCreateResponse) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.REPORT_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.ADMIN_REPORTS_STATS],
      });
      toast({
        title: "Report approved successfully",
        description: `The report has been approved.`,
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        description: "Please wait and try again after 2hrs.",
        variant: "destructive",
      });
    },
  });

  const useRequestMediator = useMutation({
    mutationFn: (data: RequestMediatorData) => requestMediator(data),
    onSuccess: (data: HackerReportCreateResponse) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.REPORT_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.ADMIN_REPORTS_STATS],
      });
      toast({
        title: "Mediator requested successfully",
        description: `The report has been updated.`,
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

  const useViewReport = useMutation({
    mutationFn: (data: ViewReportData) => viewReport(data),
    onSuccess: (data: HackerReportCreateResponse) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.REPORT_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.ADMIN_REPORTS_STATS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.UNSEEN_REPORTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.ADMIN_REPORTS],
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

  const useAddComment = useMutation({
    mutationFn: (data: CommentAddData) => addComment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.REPORT_DETAILS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.ADMIN_REPORTS_STATS],
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
    useGetReportById,
    useGetReportsSeverities,
    useGetReportsStatus,
    useGetReportTrend,
    useGetHackerReports,
    useGetHackerReportsSeverities,
    useGetHackerReportsMonthly,
    useGetAdminReports,
    useGetAdminReportStats,
    useGetProgramReportStats,
    useGetProgramAnalytics,
    useGetUnseenReports,
    useAddComment,
    useAddHackerReport,
    useReportChanges,
    useReportApprove,
    useRequestMediator,
    useViewReport,
  };
};
