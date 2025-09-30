import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProgram } from "@/hooks/apis/use-program";
import { PROGRAM_STATUS } from "@/lib/enums";
import { Users } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { formatNumber } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

const AdminProgramStats = () => {
  const { t } = useTranslation();
  const { useGetAdminProgramStats } = useProgram();
  const { data, isFetching } = useGetAdminProgramStats({});
  const stats = data?.data?.stats;

  // Defaults if stats not loaded yet
  const totalPrograms = stats?.totalPrograms ?? 0;

  // Make a status count map for easy lookup
  const countsByStatus: Record<string, number> = {};
  (stats?.countsByStatus ?? []).forEach((s) => {
    countsByStatus[s.status] = s.count;
  });

  const STATUS_META = {
    [PROGRAM_STATUS.Active]: {
      badgeText: "Active",
      badgeColor: "bg-green-500/10 text-green-500",
      title: t.common.buttons.active_programs,
    },
    [PROGRAM_STATUS.Paused]: {
      badgeText: "Paused",
      badgeColor: "bg-yellow-500/10 text-yellow-500",
      title: t.common.buttons.paused_programs,
    },
  };

  // Define cards array
  const cards = [
    {
      title: t.common.buttons.total_programs,
      value: totalPrograms,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      badge: null,
      className: "",
    },
    {
      title: STATUS_META[PROGRAM_STATUS.Active].title,
      value: countsByStatus[PROGRAM_STATUS.Active] ?? 0,
      icon: null,
      badge: (
        <Badge className={STATUS_META[PROGRAM_STATUS.Active].badgeColor}>
          {STATUS_META[PROGRAM_STATUS.Active].badgeText}
        </Badge>
      ),
      className: "",
    },
    {
      title: STATUS_META[PROGRAM_STATUS.Paused].title,
      value: countsByStatus[PROGRAM_STATUS.Paused] ?? 0,
      icon: null,
      badge: (
        <Badge className={STATUS_META[PROGRAM_STATUS.Paused].badgeColor}>
          {STATUS_META[PROGRAM_STATUS.Paused].badgeText}
        </Badge>
      ),
      className: "sm:col-span-2 lg:col-span-1",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <Card className={card.className} key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
            {card.badge}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isFetching ? (
                <Skeleton className="h-8 w-16" />
              ) : card.value ? (
                formatNumber(card.value, "comma")
              ) : (
                <span className="animate-pulse">-</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminProgramStats;
