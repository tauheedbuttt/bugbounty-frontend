import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Eye } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useReportStore } from "@/stores/report";
import { useReport } from "@/hooks/apis/use-report";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminReportResponseData } from "@/types/admin/report";
import { getSeverityColor } from "@/utils/programUtils";
import { getStatusColor } from "@/utils/reportUtils";
import dayjs from "dayjs";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { BOUNTY_TYPE, PROGRAM_STATUS, REPORT_STATUS } from "@/lib/enums";
import { cn, formatNumber } from "@/lib/utils";
import SearchInput from "@/components/ui/search";
import { ROUTE_PATHS } from "@/constants/routes";

export default function ProgramReports() {
  const { programName } = useParams();
  const { reports } = useReportStore();

  const { useGetAdminReports } = useReport();

  const [status, setStatus] = useState<REPORT_STATUS | undefined>();
  const [severity, setSeverity] = useState<BOUNTY_TYPE | undefined>();
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading, isFetching } = useGetAdminReports({
    params: {
      limit: 0,
      page: 1,
      text: debouncedSearch,
      status,
      severity,
    },
  });

  const total = data?.data?.total ?? 0;
  const resolved = reports.filter((item) =>
    [REPORT_STATUS.Closed, REPORT_STATUS.Resolved].includes(item.status)
  ).length;
  const ongoing = reports.filter(
    (item) => item.status === REPORT_STATUS.Open
  ).length;
  const newReports = reports.filter(
    (item) =>
      item.status === REPORT_STATUS.Open &&
      dayjs().diff(dayjs(item.createdAt), "day") <= 1
  ).length;

  const columns = [
    { label: "Report ID" },
    { label: "Title" },
    { label: "Researcher" },
    { label: "Severity" },
    { label: "Status" },
    { label: "Submitted" },
    { label: "Reward" },
    { label: "Actions" },
  ];

  const stats = [
    { value: total, label: "Total Reports", className: "" },
    { value: newReports, label: "New Reports", className: "text-destructive" },
    { value: ongoing, label: "Ongoing", className: "text-warning" },
    { value: resolved, label: "Resolved", className: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Program Reports
            </h1>
            <p className="text-muted-foreground">
              Manage vulnerability reports for {programName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/${programName}/analytics`}></Link>
            <Link to={`/${programName}/payments`}></Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((item) => (
            <Card key={item.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={cn("text-2xl font-bold", item.className)}>
                  {item.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search programs..."
            isLoading={isLoading}
            isFetching={isFetching}
          />
          <Select onValueChange={(value) => setStatus(value as REPORT_STATUS)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(REPORT_STATUS).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSeverity(value as BOUNTY_TYPE)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(BOUNTY_TYPE).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Reports</CardTitle>
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
                    <TableCell>
                      <div className="flex items-center gap-2">
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
                      {formatNumber(report.reward ?? 0, "comma")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            to={ROUTE_PATHS.PROGRAM_REPORT_DETAILS.replace(
                              ":reportId",
                              report._id
                            )}
                          >
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
