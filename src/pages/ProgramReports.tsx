import ProgramReportStats from "@/components/ProgramReportStats";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchInput from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTE_PATHS } from "@/constants/routes";
import { useReport } from "@/hooks/apis/use-report";
import { useTranslation } from "@/hooks/use-translation";
import { BOUNTY_TYPE, REPORT_STATUS } from "@/lib/enums";
import { cn, formatNumber } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { useReportStore } from "@/stores/report";
import { AdminReportResponseData } from "@/types/admin/report";
import { getSeverityColor } from "@/utils/programUtils";
import { getStatusColor } from "@/utils/reportUtils";
import { useDebounce } from "@uidotdev/usehooks";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProgramReports() {
  const { t } = useTranslation();
  const { programName } = useAuthStore();
  const { reports } = useReportStore();

  const { useGetAdminReports, useViewReport } = useReport();

  const { mutate: viewReport } = useViewReport;

  const [status, setStatus] = useState<REPORT_STATUS | undefined>();
  const [severity, setSeverity] = useState<BOUNTY_TYPE | undefined>();
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, 300);
  const { isLoading, isFetching } = useGetAdminReports({
    params: {
      limit: 0,
      page: 1,
      text: debouncedSearch,
      status,
      severity,
    },
  });

  const columns = [
    { label: t.forms.labels.report_id },
    { label: t.common.buttons.title },
    { label: t.common.buttons.researcher },
    { label: t.common.buttons.severity },
    { label: t.forms.labels.status },
    { label: t.common.buttons.submitted },
    { label: t.common.buttons.reward },
    { label: t.common.buttons.actions },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.common.buttons.program_reports}
            </h1>
            <p className="text-muted-foreground">
              {t.common.buttons.manage_vulnerability_reports_for} {programName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to={`/${programName}/analytics`}></Link>
            <Link to={`/${programName}/payments`}></Link>
          </div>
        </div>

        <ProgramReportStats />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t.common.buttons.search_programs_placeholder}
            isLoading={isLoading}
            isFetching={isFetching}
          />
          <Select onValueChange={(value) => setStatus(value as REPORT_STATUS)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t.forms.labels.status} />
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
              <SelectValue placeholder={t.common.buttons.severity} />
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
            <CardTitle>{t.common.buttons.vulnerability_reports}</CardTitle>
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

                    <TableCell className="whitespace-nowrap">
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
                              ":id",
                              report.id
                            )}
                            state={{ reportId: report._id }}
                            onClick={() => viewReport({ id: report._id })}
                          >
                            <Eye
                              className={cn(
                                "h-4 w-4",
                                !report.seen ? "text-success" : ""
                              )}
                            />
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
