import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useReport } from "@/hooks/apis/use-report";
import { REPORT_STATUS } from "@/lib/enums";
import { getStatusColorCodes } from "@/utils/reportUtils";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";

import groupBy from "lodash/groupBy";
import { useTranslation } from "@/hooks/use-translation";

const ProgramReportSatusDistribution = () => {
  const { t } = useTranslation();
  const { useGetReportsStatus } = useReport();

  const { data } = useGetReportsStatus({});

  const status = data?.data?.status ?? [];
  const grouped = groupBy(status, "status");

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

  const statusData = Object.values(REPORT_STATUS).map((item) => ({
    name: item,
    value: grouped[item]?.[0]?.count ?? 0,
    color: getStatusColorCodes(item),
  }));

  return (
    <Card className="w-full max-w-full overflow-x-auto">
      <CardHeader>
        <CardTitle>{t.common.buttons.report_status_distribution}</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div className="w-full min-w-[270px] md:min-w-[350px] xl:min-w-[390px]">
          <ChartContainer
            config={chartConfig}
            className="h-[260px] sm:h-[300px]"
          >
            <BarChart data={statusData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value">
                {statusData.map((entry, idx) => (
                  <Cell key={`cell-status-${idx}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {statusData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2 text-xs">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ backgroundColor: entry.color }}
                ></span>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramReportSatusDistribution;
