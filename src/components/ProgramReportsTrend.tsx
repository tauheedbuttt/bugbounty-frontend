import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useReport } from "@/hooks/apis/use-report";
import dayjs from "dayjs";
import { XAxis, YAxis, LineChart, Line } from "recharts";
import groupBy from "lodash/groupBy";
import { useTranslation } from "@/hooks/use-translation";

const ProgramReportsTrend = () => {
  const { t } = useTranslation();
  const { useGetReportTrend } = useReport();

  const { data } = useGetReportTrend({});
  const trend = data?.data?.trend ?? [];

  const groupedTrend = groupBy(trend, "month");

  const months = Array(12)
    .fill(0)
    .map((_, index) =>
      dayjs()
        .month(index) // dayjs month is 0-based
        .format("MMM")
    );

  const monthlyReports = months.map((month, index) => ({
    month,
    reports: groupedTrend[index]?.[0]?.reports ?? 0,
    resolved: groupedTrend[index]?.[0]?.resolved ?? 0,
  }));

  const chartConfig = {
    reports: {
      label: t.common.buttons.reports,
      color: "hsl(var(--primary))",
    },
    resolved: {
      label: t.common.buttons.resolved,
      color: "hsl(var(--muted))",
    },
  };
  return (
    <Card className="w-full max-w-full overflow-x-auto">
      <CardHeader>
        <CardTitle>{t.common.buttons.monthly_reports_trend}</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div className="w-full min-w-[270px] md:min-w-[350px] xl:min-w-[390px]">
          <ChartContainer
            config={chartConfig}
            className="h-[260px] sm:h-[300px]"
          >
            <LineChart data={monthlyReports}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="reports"
                stroke="var(--color-reports)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="resolved"
                stroke="var(--color-resolved)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramReportsTrend;
