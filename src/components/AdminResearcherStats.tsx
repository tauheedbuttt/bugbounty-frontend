import { InstagramBlueBadge } from "@/components/InstagramBlueBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/hooks/apis/use-users";
import { useTranslation } from "@/hooks/use-translation";
import { USER_STATUS } from "@/lib/enums";
import { Shield } from "lucide-react";

// Map USER_STATUS to badge details & card title

const AdminResearcherStats = () => {
  const { t } = useTranslation();
  const { useGetAdminUserStats } = useUser();
  const { data, isFetching } = useGetAdminUserStats({});
  const stats = data?.data?.stats;

  // Create a status counts map by merging TempBan and PermBan under "Banned"
  const countsByStatusMap: Record<string, number> = {};
  stats?.countsByStatus.forEach(({ status, count }) => {
    countsByStatusMap[status] = (countsByStatusMap[status] || 0) + count;
  });

  // Calculate total banned count by summing TempBan and PermBan:
  const bannedCount =
    (countsByStatusMap[USER_STATUS.TempBan] ?? 0) +
    (countsByStatusMap[USER_STATUS.PermBan] ?? 0);

  const STATUS_META: Record<
    string,
    { badgeText: string; badgeColor: string; title: string }
  > = {
    [USER_STATUS.Active]: {
      badgeText: "Active",
      badgeColor: "bg-green-500/10 text-green-500",
      title: t.common.buttons.active,
    },
    TempBan: {
      badgeText: "Banned",
      badgeColor: "bg-red-500/10 text-red-500",
      title: t.common.buttons.banned,
    },
    PermBan: {
      badgeText: "Banned",
      badgeColor: "bg-red-500/10 text-red-500",
      title: t.common.buttons.banned,
    },
  };

  // Cards config array
  const cards = [
    {
      title: t.common.buttons.total_researchers,
      value: stats?.totalResearchers ?? 0,
      badge: null,
      icon: <Shield className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: STATUS_META[USER_STATUS.Active].title,
      value: countsByStatusMap[USER_STATUS.Active] ?? 0,
      badge: (
        <Badge className={STATUS_META[USER_STATUS.Active].badgeColor}>
          {STATUS_META[USER_STATUS.Active].badgeText}
        </Badge>
      ),
      icon: null,
    },
    {
      title: t.common.buttons.banned,
      value: bannedCount,
      badge: <Badge className="bg-red-500/10 text-red-500">Banned</Badge>,
      icon: null,
    },
    {
      title: t.common.buttons.blue_badge,
      value: stats?.blueBadge ?? 0,
      badge: null,
      icon: <InstagramBlueBadge size={22} className="mr-1" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <Card key={idx}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.badge}
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isFetching ? (
                <span className="animate-pulse">-</span>
              ) : (
                card.value
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminResearcherStats;
