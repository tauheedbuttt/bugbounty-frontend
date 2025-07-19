import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/apis/use-auth";
import { formatNumber } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { Trophy, Target, DollarSign, TrendingUp } from "lucide-react";

const DashboardStatCards = () => {
  const { role } = useAuthStore();
  const { useGetProfile } = useAuth(role);

  const { data } = useGetProfile({});

  const profile = data?.data;
  const stats = profile?.stats;

  const statCardData = [
    {
      label: "Rank",
      value: !stats?.rank ? "-" : `#${stats?.rank}`,
      icon: <Trophy className="h-8 w-8 text-slate-500" />,
      cardClass: "bg-slate-50 border-slate-200",
    },
    {
      label: "Total Points",
      value: formatNumber(stats?.points, "comma"),
      icon: <Target className="h-8 w-8 text-gray-500" />,
      cardClass: "bg-gray-50 border-gray-200",
    },
    {
      label: "Highest Bounty",
      value: `SAR ${formatNumber(stats?.maxBounty, "comma")}`,
      icon: <DollarSign className="h-8 w-8 text-zinc-500" />,
      cardClass: "bg-zinc-50 border-zinc-200",
    },
    {
      label: "Total Bounties",
      value: `SAR ${formatNumber(stats?.bounties, "comma")}`,
      icon: <TrendingUp className="h-8 w-8 text-stone-500" />,
      cardClass: "bg-stone-50 border-stone-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCardData.map((item) => (
        <Card key={item.label} className={item.cardClass}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={"text-sm font-medium text-gray-600"}>
                  {item.label}
                </p>
                <p className={`text-2xl font-bold text-gray-800`}>
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
