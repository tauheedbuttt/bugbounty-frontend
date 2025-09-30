import { queryKey } from "@/constants/queryKeys";
import useGetQuery from "../use-get-query";
import {
  getAdminDashboard,
  getAdminDashboardHackers,
  getAdminDashboardMonthlyReports,
} from "@/apis/admin/dashboard";
import {
  AdminDashboardReportMonthlyResponse,
  AdminDashboardResponse,
} from "@/types/admin/dashboard";

export const useDashboard = () => {
  const useGetAdminDashboard = ({
    onSuccess,
  }: {
    onSuccess?: (data: AdminDashboardResponse) => void;
  }) => {
    return useGetQuery<AdminDashboardResponse, {}>({
      queryKey: queryKey.ADMIN_DASHBOARD,
      queryFn: getAdminDashboard,
      params: {},
      onSuccess,
    });
  };

  const useGetAdminDashboardMonthlyReports = ({
    onSuccess,
  }: {
    onSuccess?: (data: AdminDashboardReportMonthlyResponse) => void;
  }) => {
    return useGetQuery<AdminDashboardReportMonthlyResponse, {}>({
      queryKey: queryKey.ADMIN_DASHBOARD_MONTHLY,
      queryFn: getAdminDashboardMonthlyReports,
      params: {},
      onSuccess,
    });
  };

  const useGetAdminDashboardHackers = ({
    onSuccess,
  }: {
    onSuccess?: (data: AdminDashboardReportMonthlyResponse) => void;
  }) => {
    return useGetQuery<AdminDashboardReportMonthlyResponse, {}>({
      queryKey: queryKey.ADMIN_DASHBOARD_HACKERS,
      queryFn: getAdminDashboardHackers,
      params: {},
      onSuccess,
    });
  };

  return {
    useGetAdminDashboard,
    useGetAdminDashboardMonthlyReports,
    useGetAdminDashboardHackers,
  };
};
