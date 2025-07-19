import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReport } from "@/hooks/apis/use-report";
import { AlertTriangle, Calendar, Shield } from "lucide-react";

const AdminReportsStats = () => {
  const { useGetAdminReportStats } = useReport();
  const { data, isFetching } = useGetAdminReportStats({});
  // The API response structure contains `stats` of type ReportStats
  const stats = data?.data?.stats;

  // Cards configuration dynamically driven by stats
  const cards = [
    {
      title: "Total Reports",
      value: stats?.totalReports ?? 0,
      icon: <Shield className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Pending Review",
      value: stats?.pendingReview ?? 0,
      icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
      textClass: "text-destructive",
    },
    {
      title: "This Month",
      value: stats?.thisMonth ?? 0,
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Critical",
      value: stats?.critical ?? 0,
      icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
      textClass: "text-destructive",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map(({ title, value, icon, textClass }, idx) => (
        <Card key={idx}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${textClass ?? ""}`}>
              {isFetching ? <span className="animate-pulse">-</span> : value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminReportsStats;
