import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReport } from "@/hooks/apis/use-report";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { groupBy } from "lodash";
import { useTranslation } from "@/hooks/use-translation";

const DashboardMonthlyReports = () => {
  const { t } = useTranslation();
  const { useGetHackerReportsMonthly } = useReport();

  const { data } = useGetHackerReportsMonthly({});
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

  const currentMonth = new Date().getMonth();
  const last6MonthsIndices = [];
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    last6MonthsIndices.push(monthIndex);
  }
  const reportsData = last6MonthsIndices.map((monthIndex) => {
    return {
      month: monthNames[monthIndex],
      reports: monthlyGrouped[monthIndex]?.[0]?.count ?? 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.common.buttons.monthly_reports}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reportsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="reports"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardMonthlyReports;
