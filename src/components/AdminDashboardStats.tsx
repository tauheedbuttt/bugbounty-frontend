import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Users,
  Shield,
  AlertTriangle,
  TrendingUp,
  FileText,
  TrendingDown,
  Minus,
} from "lucide-react";
import { useDashboard } from "@/hooks/apis/use-dashboard";
import { formatNumber } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

const AdminDashboardStats = () => {
  const { useGetAdminDashboard } = useDashboard();
  const { t } = useTranslation();

  const { data, isFetching } = useGetAdminDashboard({});

  const liveStats = data?.data;

  const changeDirection =
    liveStats?.monthReport?.percentage > 0
      ? "increase"
      : liveStats?.monthReport?.percentage < 0
      ? "decrease"
      : "neutral";

  const getChangeMessage = (percentage: number) => {
    switch (true) {
      case percentage > 0:
        return `+${formatNumber(percentage, "comma")}% ${
          t.common.buttons.from_last_month
        }`;
      case percentage < 0:
        return `${formatNumber(percentage, "comma")}% ${
          t.common.buttons.from_last_month
        }`;
      case percentage === 0:
        return t.common.buttons.no_change_from_last_month;
      default:
        return t.common.buttons.no_data_available;
    }
  };

  const formattedChange = getChangeMessage(
    liveStats?.monthReport?.percentage || 0
  );

  const getTrendIcon = () => {
    switch (changeDirection) {
      case "increase":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "decrease":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "neutral":
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const dashboardCards = [
    {
      id: "programs",
      title: t.common.buttons.total_programs,
      value: liveStats?.programs ?? 0,
      description: t.common.buttons.active_bug_bounty_programs,
      icon: <Shield className="h-4 w-4 text-muted-foreground" />,
      valueClassName: "text-2xl font-bold",
    },
    {
      id: "hackers",
      title: t.common.buttons.active_hackers,
      value: liveStats?.hackers ?? 0,
      description: t.common.buttons.currently_participating,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      valueClassName: "text-2xl font-bold",
    },
    {
      id: "pendingReports",
      title: t.common.buttons.pending_reports,
      value: liveStats?.pendingReports ?? 0,
      description: t.common.buttons.awaiting_review,
      icon: <FileText className="h-4 w-4 text-muted-foreground" />,
      valueClassName: "text-2xl font-bold",
    },
    {
      id: "monthReport",
      title: t.common.buttons.this_month_reports,
      value: liveStats?.monthReport?.count ?? 0,
      description: formattedChange,
      icon: getTrendIcon(),
      valueClassName: "text-2xl font-bold",
    },
    {
      id: "criticalReports",
      title: t.common.buttons.critical_reports,
      value: liveStats?.criticalReports ?? 0,
      description: t.common.buttons.require_immediate_attention,
      icon: <AlertTriangle className="h-4 w-4 text-destructive" />,
      valueClassName: "text-2xl font-bold text-destructive",
    },
    {
      id: "bannedHackers",
      title: t.common.buttons.banned_hackers,
      value: liveStats?.bannedHackers ?? 0,
      description: t.common.buttons.temporarily_or_permanently,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      valueClassName: "text-2xl font-bold",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardCards.map((card) => (
        <Card key={card.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className={card.valueClassName}>
              {isFetching ? (
                <Skeleton className="h-8 w-16" />
              ) : card.value ? (
                formatNumber(card.value, "comma")
              ) : (
                <span className="animate-pulse">-</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {isFetching ? (
                <Skeleton className="h-3 w-24" />
              ) : (
                card.description
              )}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminDashboardStats;
