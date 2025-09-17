import { Badge } from "@/components/ui/badge";
import DashboardStatCards from "@/components/DashboardStatCards";
import DashboardRecentPrograms from "@/components/DashboardRecentPrograms";
import DashboardRecentReports from "@/components/DashboardRecentReports";
import DashboardVulnerabilityDistribution from "@/components/DashboardVulnerabilityDistribution";
import DashboardMonthlyReports from "@/components/DashboardMonthlyReports";
import { useTranslation } from "@/hooks/use-translation";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            {t.common.buttons.dashboard}
          </h1>
          <Badge variant="outline" className="text-primary border-primary">
            {t.common.buttons.welcome_back}
          </Badge>
        </div>

        {/* Stats Cards */}
        <DashboardStatCards />

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Vulnerability Distribution */}
          <DashboardVulnerabilityDistribution />

          {/* Monthly Reports */}
          <DashboardMonthlyReports />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Reports */}
          <DashboardRecentReports />

          {/* Recent Programs */}
          <DashboardRecentPrograms />
        </div>
      </div>
    </div>
  );
}
