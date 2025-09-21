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
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ROUTE_PATHS } from "@/constants/routes";
import { useReport } from "@/hooks/apis/use-report";
import { useTranslation } from "@/hooks/use-translation";
import { BOUNTY_TYPE, REPORT_STATUS } from "@/lib/enums";
import { calculatePaginationDisplay, formatNumber } from "@/lib/utils";
import { useReportStore } from "@/stores/report";
import { HackerReportResponseData } from "@/types/hacker/report";
import { getSeverityColor } from "@/utils/programUtils";
import { getStatusColor } from "@/utils/reportUtils";
import { useDebounce } from "@uidotdev/usehooks";
import { Calendar, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reports() {
  const { t, currentLanguage } = useTranslation();
  const { reports } = useReportStore();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<REPORT_STATUS | undefined>();
  const [severity, setSeverity] = useState<BOUNTY_TYPE | undefined>();
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);
  const { useGetHackerReports } = useReport();

  const limit = 10;

  const { data, isFetching, isLoading } = useGetHackerReports({
    params: {
      limit,
      page,
      text: debouncedSearch,
      status,
      severity,
    },
  });

  const total = data?.data?.total ?? 0;
  const pages = data?.data?.pages ?? 0;
  const isEmpty = total === 0 && !isLoading;
  const { displayText } = calculatePaginationDisplay(
    page,
    limit,
    total,
    currentLanguage
  );

  const columns = [
    { label: t.common.buttons.report },
    { label: t.forms.labels.status },
    { label: t.forms.labels.severity },
    { label: t.common.buttons.rewards },
    { label: t.common.buttons.quantity },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.common.buttons.reports}
            </h1>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t.forms.placeholders.search_reports}
            isLoading={isLoading}
            isFetching={isFetching}
          />
          <Select onValueChange={(value) => setStatus(value as REPORT_STATUS)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(REPORT_STATUS).map((item) => (
                <SelectItem value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSeverity(value as BOUNTY_TYPE)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(BOUNTY_TYPE).map((item) => (
                <SelectItem value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            {t.common.buttons.date_range}
          </Button>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.common.buttons.reports}</CardTitle>
            <Badge variant="outline">
              {total} {t.common.buttons.reports}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {columns.map((col) => (
                      <th
                        key={col.label}
                        className="text-left p-4 font-medium text-muted-foreground"
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <TableBody>
                  {/* loading */}
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
                  {/* empty */}
                  {isEmpty && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center p-8 text-muted-foreground"
                      >
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No rows</p>
                      </TableCell>
                    </TableRow>
                  )}
                  {/* data */}
                  {!isEmpty &&
                    (reports as HackerReportResponseData[]).map((item) => (
                      <TableRow
                        onClick={() =>
                          navigate(
                            ROUTE_PATHS.REPORTS_DETAILS.replace(":id", item.id),
                            {
                              state: { reportId: item._id },
                            }
                          )
                        }
                        className="cursor-pointer"
                        key={item._id}
                      >
                        <TableCell>{item.name}</TableCell>

                        <TableCell>
                          <Badge variant={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(item.severity)}>
                            {item.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.reward
                            ? formatNumber(item.reward, "comma")
                            : "-"}
                        </TableCell>
                        <TableCell>{"-"}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">{displayText}</p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  {currentLanguage === "ar" ? (
                    <ChevronRight className="h-4 w-4" />
                  ) : (
                    <ChevronLeft className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pages === 0 || page === pages}
                  onClick={() => setPage(page + 1)}
                >
                  {currentLanguage === "ar" ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
