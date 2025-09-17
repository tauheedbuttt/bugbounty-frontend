import ProgramProtectedComponent from "@/components/ProgramProtectedComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReport } from "@/hooks/apis/use-report";
import { useTranslation } from "@/hooks/use-translation";
import { PROGRAM_ROLES } from "@/lib/enums";
import { formatNumber } from "@/lib/utils";
import { AlertTriangle, Clock, DollarSign, Users } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const ProgramAnalyticsStats = () => {
  const { t } = useTranslation();
  const { useGetProgramAnalytics } = useReport();

  const { data, isFetching } = useGetProgramAnalytics({});
  const stats = data?.data;

  console.log(stats);

  const analyticsData = [
    {
      id: "total_reports",
      title: t.common.buttons.total_reports,
      value: stats ? formatNumber(stats?.totalReports?.total, "comma") : 0,
      change: stats ? stats?.totalReports?.change : 0,
      changeText: `${stats?.totalReports?.change >= 0 ? "+" : ""}${
        stats?.totalReports?.change ?? 0
      }% ${t.common.buttons.from_last_month}`,
      icon: AlertTriangle,
      protected: false,
    },
    {
      id: "total_paid",
      title: t.common.buttons.total_paid,
      value: stats
        ? `$${formatNumber(stats?.totalPaid?.total, "comma")}`
        : "$0",
      change: stats ? stats?.totalPaid?.change : 0,
      changeText: `${stats?.totalPaid?.change >= 0 ? "+" : ""}${
        stats?.totalPaid?.change ?? 0
      }% ${t.common.buttons.from_last_month}`,
      icon: DollarSign,
      protected: true,
      allowedRoles: [
        PROGRAM_ROLES.SuperAdmin,
        PROGRAM_ROLES.Accountant,
        PROGRAM_ROLES.ViewerAdmin,
      ],
    },
    {
      id: "avg_response_time",
      title: t.common.buttons.avg_response_time,
      value: stats ? `${stats?.avgResponseTime?.toFixed(1)}d` : "0d",
      change: 0, // Placeholder since your backend does not compute change for this yet
      changeText: ` `,
      icon: Clock,
      protected: false,
    },
    {
      id: "total_researchers",
      title: t.common.buttons.total_researchers,
      value: stats ? formatNumber(stats?.totalResearchers?.total, "comma") : 0,
      change: stats ? stats?.totalResearchers?.change : 0,
      changeText: `${stats?.totalResearchers?.change >= 0 ? "+" : ""}${
        stats?.totalResearchers?.change ?? 0
      }% ${t.common.buttons.from_last_month}`,
      icon: Users,
      protected: false,
    },
  ];

  const renderCard = (item) => {
    const IconComponent = item.icon;

    const cardContent = (
      <Card className="w-full" key={item.id}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
          <IconComponent className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {isFetching ? (
            <Skeleton className="h-8 w-16" />
          ) : item.value ? (
            <div className="text-2xl font-bold">{item.value}</div>
          ) : (
            <span className="animate-pulse">-</span>
          )}

          {isFetching ? (
            <Skeleton className="h-3 w-24" />
          ) : (
            <p className="text-xs text-muted-foreground">{item.changeText}</p>
          )}
        </CardContent>
      </Card>
    );

    if (item.protected) {
      return (
        <ProgramProtectedComponent
          key={item.id}
          allowedRoles={item.allowedRoles}
        >
          {cardContent}
        </ProgramProtectedComponent>
      );
    }

    return cardContent;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {analyticsData.map(renderCard)}
    </div>
  );
};

export default ProgramAnalyticsStats;
