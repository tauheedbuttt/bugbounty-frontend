import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useReport } from "@/hooks/apis/use-report";
import { useReportStore } from "@/stores/report";
import { formatNumber } from "@/lib/utils";
import { HackerReportResponseData } from "@/types/hacker/report";
import DashboardRecentSkeleton from "./DashboardRecentSkeleton";
import { getSeverityColor } from "@/utils/programUtils";
import { getStatusColor } from "@/utils/reportUtils";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { useTranslation } from "@/hooks/use-translation";

const DashboardRecentReports = () => {
  const { t } = useTranslation();
  const { reports } = useReportStore();
  const { useGetHackerReports } = useReport();

  const { data, isFetching } = useGetHackerReports({
    params: {
      limit: 3,
      page: 1,
    },
  });
  const total = data?.data?.total ?? 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.common.buttons.recent_reports}</CardTitle>
        <Link to={ROUTE_PATHS.REPORTS}>
          <Badge variant="outline">
            {total} {t.common.buttons.reports}
          </Badge>
        </Link>
      </CardHeader>
      {isFetching && <DashboardRecentSkeleton />}
      <CardContent className="space-y-4">
        {(reports as HackerReportResponseData[]).map((report) => (
          <div
            key={report._id}
            className="flex items-center justify-between p-3 rounded-lg bg-accent/50"
          >
            <div className="space-y-1">
              <p className="font-medium">{report.name}</p>
              <div className="flex items-center gap-2">
                <Badge
                  className={`text-xs ${getSeverityColor(report.severity)}`}
                >
                  {report.severity}
                </Badge>
                <Badge
                  variant={getStatusColor(report.status)}
                  className="text-xs"
                >
                  {report.status}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-primary">
                $ {formatNumber(report.reward)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DashboardRecentReports;
