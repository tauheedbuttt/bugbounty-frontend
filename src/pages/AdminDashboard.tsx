import { Badge } from "@/components/ui/badge";
import AdminDashboardStats from "@/components/AdminDashboardStats";
import AdminDashboardMonthlyReports from "@/components/AdminDashboardMonthlyReports";
import AdminDashboardActiveHackers from "@/components/AdminDashboardActiveHackers";
import { useTranslation } from "@/hooks/use-translation";

export default function AdminDashboard() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            {t.common.buttons.admin_dashboard}
          </h1>
          <Badge variant="secondary" className="text-sm">
            {t.common.buttons.live_data}
          </Badge>
        </div>

        {/* Key Metrics */}
        <AdminDashboardStats />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminDashboardMonthlyReports />

          <AdminDashboardActiveHackers />
        </div>
      </div>
    </div>
  );
}
