import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, Gift } from "lucide-react";
import { PaymentDialog } from "@/components/PaymentDialog";
import { useState } from "react";
import { usePaymentStore } from "@/stores/payment";
import { PAYMENT_STATUS, PROGRAM_ROLES } from "@/lib/enums";
import { usePayment } from "@/hooks/apis/use-payment";
import { useDebounce } from "@uidotdev/usehooks";
import { groupBy } from "lodash";
import { formatNumber } from "@/lib/utils";
import { getStatusColor } from "@/utils/paymentUtils";
import SearchInput from "@/components/ui/search";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentData } from "@/types/payment";
import { useAuthStore } from "@/stores/auth";
import dayjs from "dayjs";
import { ProgramPaymentStatCard } from "@/components/ProgramPaymentStatCard";
import ProgramProtectedComponent from "@/components/ProgramProtectedComponent";
import { useTranslation } from "@/hooks/use-translation";

export default function ProgramPayments() {
  const { t } = useTranslation();
  const { programName } = useAuthStore();
  const { payments } = usePaymentStore();
  const paymentsData = payments as PaymentData[];

  const [status, setStatus] = useState<PAYMENT_STATUS | undefined>();
  const [search, setSearch] = useState<string>("");

  const { useGetPayments, useSendPayment } = usePayment();
  const debouncedSearch = useDebounce(search, 300);

  const { mutate: sendPayment, isPending: isSendPaymentPending } =
    useSendPayment(() => setDialogOpen(false));
  const { data, isLoading, isFetching } = useGetPayments({
    params: {
      limit: 0,
      page: 1,
      text: debouncedSearch,
      status: (status as any) === "all" ? undefined : status,
    },
  });

  const columns = [
    { label: t.forms.labels.payment_id },
    { label: t.forms.labels.report_id },
    { label: t.common.buttons.researcher },
    { label: t.forms.labels.amount },
    { label: t.forms.labels.status },
    { label: t.forms.labels.due_date },
    { label: t.common.buttons.actions },
  ];
  const statuses = [
    { label: t.common.buttons.all_payments, value: "all" },
    { label: t.common.buttons.pending, value: PAYMENT_STATUS.Pending },
    { label: t.common.buttons.paid, value: PAYMENT_STATUS.Paid },
  ];

  const stats = data?.data?.stats ?? [];
  const total = data?.data?.payment?.total ?? 0;
  const isEmpty = total === 0 && !isLoading;
  const statsGrouped = groupBy(stats, "status");
  const paid = statsGrouped[PAYMENT_STATUS.Paid]?.[0];
  const pending = statsGrouped[PAYMENT_STATUS.Pending]?.[0];
  const thisMonth = statsGrouped["This Month"]?.[0];

  // Dialog UI state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const getStatusIcon = (status: PAYMENT_STATUS) => {
    switch (status) {
      case PAYMENT_STATUS.Paid:
        return <CheckCircle className="h-4 w-4" />;
      case PAYMENT_STATUS.Pending:
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // UI logic for opening/closing dialogs
  const handlePayNow = (payment: any) => {
    setSelectedPayment(payment);
    setDialogMode("create");
    setDialogOpen(true);
  };
  const handleEditPayment = (payment: any) => {
    setSelectedPayment(payment);
    setDialogMode("edit");
    setDialogOpen(true);
  };
  const handleDialogSubmit = (values: {
    mtcnCode: string;
    amount: string;
    image: string;
  }) => {
    if (!selectedPayment) return;
    sendPayment({
      mtcnCode: values.mtcnCode,
      amount: Number(values.amount),
      paymentId: selectedPayment._id,
      image: values.image,
    });
  };

  const paymentStats = [
    {
      title: t.common.buttons.total_pending,
      value: pending?.amount ?? 0,
      colorClass: "text-warning",
      count: pending?.count ?? 0,
    },
    {
      title: t.common.buttons.total_paid,
      value: paid?.amount ?? 0,
      colorClass: "text-success",
      count: paid?.count ?? 0,
    },
    {
      title: t.common.buttons.this_month,
      value: thisMonth?.amount ?? 0,
      colorClass: "",
      count: thisMonth?.count ?? 0,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t.common.buttons.payment_management}
            </h1>
            <p className="text-muted-foreground">
              {t.common.buttons.manage_bounty_payments_for} {programName}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentStats.map((stat) => (
            <ProgramPaymentStatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              colorClass={stat.colorClass}
              countText={`${stat.count} ${
                stat.count !== 1
                  ? t.common.buttons.payments
                  : t.common.buttons.payment
              }`}
            />
          ))}
        </div>

        <Tabs
          value={status}
          onValueChange={(value) =>
            setStatus(value === "all" ? undefined : (value as PAYMENT_STATUS))
          }
          defaultValue="all"
          className="space-y-4"
        >
          <TabsList>
            {statuses.map((item) => (
              <TabsTrigger value={item.value}>{item.label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder={t.forms.placeholders.search_payments}
              isLoading={isLoading}
              isFetching={isFetching}
            />
            <Select
              value={status}
              onValueChange={(value: PAYMENT_STATUS) => setStatus(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder={t.forms.labels.status} />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((item) => (
                  <SelectItem key={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>{t.common.buttons.payment_history}</CardTitle>
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
                  {/* empty */}
                  {isEmpty && (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center p-8 text-muted-foreground"
                      >
                        <Gift className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No rows</p>
                      </TableCell>
                    </TableRow>
                  )}
                  {paymentsData.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono">{payment.id}</TableCell>
                      <TableCell className="font-mono">
                        {payment.report.id}
                      </TableCell>
                      <TableCell>{payment.researcher?.username}</TableCell>
                      <TableCell className="font-medium">
                        {formatNumber(payment.amount, "comma")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusColor(payment.status)}
                          className="flex items-center gap-1 w-fit"
                        >
                          {getStatusIcon(payment.status)}
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {dayjs(payment.createdAt).format("DD-MM-YYYY")}
                      </TableCell>
                      <ProgramProtectedComponent
                        allowedRoles={[
                          PROGRAM_ROLES.SuperAdmin,
                          PROGRAM_ROLES.Accountant,
                        ]}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {payment.status === PAYMENT_STATUS.Pending && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePayNow(payment)}
                              >
                                {t.common.buttons.pay_now}
                              </Button>
                            )}
                            {[
                              PAYMENT_STATUS.Paid,
                              PAYMENT_STATUS.Processing,
                            ].includes(payment.status) && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditPayment(payment)}
                              >
                                {t.common.buttons.edit}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </ProgramProtectedComponent>
                      <ProgramProtectedComponent
                        allowedRoles={[PROGRAM_ROLES.ViewerAdmin]}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPayment(payment)}
                            >
                              {t.common.buttons.view}
                            </Button>
                          </div>
                        </TableCell>
                      </ProgramProtectedComponent>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedPayment && (
        <PaymentDialog
          open={dialogOpen}
          mode={dialogMode}
          payment={selectedPayment}
          onSubmit={handleDialogSubmit}
          onClose={() => setDialogOpen(false)}
          isPending={isSendPaymentPending}
        />
      )}
    </div>
  );
}
