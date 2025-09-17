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
import { Gift, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { usePaymentStore } from "@/stores/payment";
import { usePayment } from "@/hooks/apis/use-payment";
import { useState } from "react";
import { PAYMENT_STATUS } from "@/lib/enums";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import SearchInput from "@/components/ui/search";
import { useDebounce } from "@uidotdev/usehooks";
import { calculatePaginationDisplay, formatNumber } from "@/lib/utils";
import { PaymentData } from "@/types/payment";
import { getStatusColor } from "@/utils/paymentUtils";
import { groupBy } from "lodash";
import { useTranslation } from "@/hooks/use-translation";
import { PaymentDialog } from "@/components/PaymentDialog";

export default function Bounties() {
  const { t, currentLanguage } = useTranslation();
  const { payments } = usePaymentStore();

  const [status, setStatus] = useState<PAYMENT_STATUS | undefined>();
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  // Dialog UI state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const limit = 10;

  const { useGetPayments } = usePayment();
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isFetching } = useGetPayments({
    params: {
      limit,
      page,
      text: debouncedSearch,
      status,
    },
  });

  const columns = [
    { label: t.common.buttons.report },
    { label: t.forms.labels.status },
    { label: t.common.buttons.bounty },
    { label: t.common.buttons.view },
  ];

  const stats = data?.data?.stats ?? [];
  const total = data?.data?.payment?.total ?? 0;
  const pages = data?.data?.payment?.pages ?? 0;
  const isEmpty = total === 0 && !isLoading;
  const { displayText } = calculatePaginationDisplay(
    page,
    limit,
    total,
    currentLanguage
  );

  const statsGrouped = groupBy(stats, "status");
  const paid = statsGrouped[PAYMENT_STATUS.Paid]?.[0]?.amount ?? 0;
  const pending = statsGrouped[PAYMENT_STATUS.Pending]?.[0]?.amount ?? 0;
  const totalAmount = stats
    .map((item) => item.amount)
    .reduce((a, b) => a + b, 0);

  const bountyStats = [
    {
      label: t.common.buttons.total,
      value: formatNumber(totalAmount, "comma"),
      color: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    {
      label: t.common.buttons.paid,
      value: formatNumber(paid, "comma"),
      color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    {
      label: t.common.buttons.not_paid_yet,
      value: formatNumber(pending, "comma"),
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
  ];

  const handleEditPayment = (payment: any) => {
    setSelectedPayment(payment);
    setDialogMode("edit");
    setDialogOpen(true);
  };
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.common.buttons.bounties}
            </h1>
          </div>
        </div>

        {/* Bounty Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bountyStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">USD {stat.value}</p>
                  </div>
                  <Badge className={stat.color}>({stat.value})</Badge>
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
            placeholder={t.forms.placeholders.search_payments}
            isLoading={isLoading}
            isFetching={isFetching}
          />
          <Select onValueChange={(value: PAYMENT_STATUS) => setStatus(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t.forms.labels.status} />
            </SelectTrigger>
            <SelectContent>
              {Object.values(PAYMENT_STATUS).map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bounties Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>{t.common.buttons.bounties}</CardTitle>
            </div>
            <Badge variant="outline">{total}</Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {columns.map((item) => (
                      <th
                        key={item.label}
                        className="text-left p-4 font-medium text-muted-foreground"
                      >
                        {item.label}
                      </th>
                    ))}
                  </tr>
                </thead>

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
                        <Gift className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No rows</p>
                      </TableCell>
                    </TableRow>
                  )}
                  {/* data */}
                  {!isEmpty &&
                    (payments as PaymentData[]).map((item) => (
                      <TableRow
                        onClick={() => handleEditPayment(item)}
                        className="cursor-pointer"
                        key={item._id}
                      >
                        <TableCell>{item.report.name}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatNumber(item.amount, "comma")}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPayment(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
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

      {selectedPayment && (
        <PaymentDialog
          open={dialogOpen}
          mode={dialogMode}
          payment={selectedPayment}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </div>
  );
}
