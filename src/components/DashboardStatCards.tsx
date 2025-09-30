import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/apis/use-auth";
import { useTranslation } from "@/hooks/use-translation";
import { formatNumber } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { useThemeStore } from "@/stores/theme";
import { Trophy, Target, DollarSign, TrendingUp } from "lucide-react";

const DashboardStatCards = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeStore();
  const { role } = useAuthStore();
  const { useGetProfile } = useAuth(role);

  const { data } = useGetProfile({});

  const profile = data?.data;
  const stats = profile?.stats;

  const statCardData = [
    {
      label: t.common.buttons.rank,
      value: !stats?.rank ? "-" : `#${stats?.rank}`,
      icon: <Trophy className="h-8 w-8 text-slate-500" />,
      cardClass: isDarkMode
        ? "bg-zinc-800 border-zinc-700"
        : "bg-slate-50 border-slate-200",
    },
    {
      label: t.forms.labels.total_points,
      value: formatNumber(stats?.points, "comma"),
      icon: <Target className="h-8 w-8 text-gray-500" />,
      cardClass: isDarkMode
        ? "bg-zinc-800 border-zinc-700"
        : "bg-gray-50 border-gray-200",
    },
    {
      label: t.forms.labels.highest_bounty,
      value: `USD ${formatNumber(stats?.maxBounty, "comma")}`,
      icon: <DollarSign className="h-8 w-8 text-zinc-500" />,
      cardClass: isDarkMode
        ? "bg-zinc-800 border-zinc-700"
        : "bg-zinc-50 border-zinc-200",
    },
    {
      label: t.forms.labels.total_bounties,
      value: `USD ${formatNumber(stats?.bounties, "comma")}`,
      icon: <TrendingUp className="h-8 w-8 text-stone-500" />,
      cardClass: isDarkMode
        ? "bg-zinc-800 border-zinc-700"
        : "bg-stone-50 border-stone-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCardData.map((item) => (
        <Card key={item.label} className={item.cardClass}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={
                    isDarkMode
                      ? "text-sm font-medium text-gray-400"
                      : "text-sm font-medium text-gray-600"
                  }
                >
                  {item.label}
                </p>
                <p
                  className={
                    isDarkMode
                      ? "text-2xl font-bold text-gray-100"
                      : "text-2xl font-bold text-gray-800"
                  }
                >
                  {item.value}
                </p>
              </div>
              {item.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStatCards;
