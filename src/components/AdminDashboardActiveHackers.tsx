import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import { groupBy } from "lodash";
import { useDashboard } from "@/hooks/apis/use-dashboard";
import { useTranslation } from "@/hooks/use-translation";

const AdminDashboardActiveHackers = () => {
  const { useGetAdminDashboardHackers } = useDashboard();
  const { t } = useTranslation();

  const { data } = useGetAdminDashboardHackers({});
  const monthly = (data?.data?.monthly ?? []).map((item) => ({
    ...item,
    createdAt: new Date(item.createdAt).getMonth(),
  }));
  const monthlyGrouped = groupBy(monthly, "createdAt");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get current month and calculate last 6 months
  const currentMonth = new Date().getMonth();
  const last6MonthsIndices = [];
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    last6MonthsIndices.push(monthIndex);
  }

  const reportsData = last6MonthsIndices.map((monthIndex) => {
    return {
      month: monthNames[monthIndex],
      hackers: monthlyGrouped[monthIndex]?.[0]?.count ?? 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.common.buttons.active_hackers_trend}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            hackers: { label: "Hackers", color: "hsl(var(--primary))" },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={reportsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="hackers"
                stroke="var(--color-hackers)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AdminDashboardActiveHackers;
