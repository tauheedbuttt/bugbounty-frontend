import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useReport } from "@/hooks/apis/use-report";
import { useTranslation } from "@/hooks/use-translation";
import { vulnerabilityColorMap } from "@/utils/reportUtils";
import { PieChart, Pie, Cell } from "recharts";

const ProgramSeverityDistribution = () => {
  const { t } = useTranslation();
  const { useGetReportsSeverities } = useReport();

  const { data } = useGetReportsSeverities({});

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

  const severites = (data?.data?.severites ?? []).map((item) => ({
    name: item.severity,
    value: item.count,
    color: vulnerabilityColorMap[item.severity],
  }));

  return (
    <Card className="w-full max-w-full overflow-x-auto">
      <CardHeader>
        <CardTitle>{t.common.buttons.severity_distribution}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex justify-center items-center min-w-0">
          <ChartContainer
            config={chartConfig}
            className="h-[300px] xs:h-[400px] w-full min-w-0 max-w-full flex-1"
          >
            <PieChart width={undefined} height={undefined}>
              <Pie
                data={severites}
                cx="50%"
                cy="50%"
                outerRadius="90%"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                isAnimationActive
              >
                {severites.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramSeverityDistribution;
