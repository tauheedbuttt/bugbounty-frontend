import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReport } from "@/hooks/apis/use-report";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

const ProgramReportStats = () => {
  const { t } = useTranslation();
  const { useGetProgramReportStats } = useReport();

  const { data, isFetching } = useGetProgramReportStats({});

  const stats = data?.data?.stats;

  const statsData = [
    {
      value: stats?.total ?? 0,
      label: t.common.buttons.total_reports,
      className: "",
    },
    {
      value: stats?.new ?? 0,
      label: t.common.buttons.new_reports,
      className: "text-destructive",
    },
    {
      value: stats?.ongoing ?? 0,
      label: t.common.buttons.ongoing,
      className: "text-warning",
    },
    {
      value: stats?.resolved ?? 0,
      label: t.common.buttons.resolved,
      className: "text-success",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statsData.map((item) => (
        <Card key={item.label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn("text-2xl font-bold", item.className)}>
              {isFetching ? (
                <span className="animate-pulse">-</span>
              ) : (
                item.value
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProgramReportStats;
