import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Calendar, User, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { useReport } from "@/hooks/apis/use-report";
import { useReportStore } from "@/stores/report";
import { AdminReportResponseData } from "@/types/admin/report";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import { getSeverityColor } from "@/utils/programUtils";
import { getStatusColor } from "@/utils/reportUtils";
import AdminReportsStats from "@/components/AdminReportsStats";

export default function AdminReports() {
  const { reports } = useReportStore();

  const { useGetAdminReports } = useReport();

  const { isLoading } = useGetAdminReports({
    params: {
      limit: 0,
      page: 1,
    },
  });

  const columns = [
    { label: "Report ID" },
    { label: "Title" },
    { label: "Program" },
    { label: "Researcher" },
    { label: "Severity" },
    { label: "Status" },
    { label: "Submitted" },
    { label: "Actions" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">All Reports</h1>
          <Badge variant="outline">Live Updates</Badge>
        </div>

        {/* Quick Stats */}
        <AdminReportsStats />

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((item) => (
                    <TableHead key={item.label}>{item.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  columns.map((item) => (
                    <TableRow key={item.label}>
                      {columns.map((col) => (
                        <TableCell>
                          <Skeleton className={"h-[10px]"} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                {(reports as AdminReportResponseData[]).map((report) => (
                  <TableRow key={report._id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.program.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {report.researcher.username}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(report.severity)}>
                        {report.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {dayjs(report.createdAt).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/reports/${report._id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
