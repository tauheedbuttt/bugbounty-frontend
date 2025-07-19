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

export default function ProgramPayments() {
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
      status,
    },
  });

  const columns = [
    { label: "Payment ID" },
    { label: "Report ID" },
    { label: "Researcher" },
    { label: "Amount" },
    { label: "Status" },
    { label: "Due Date" },
    { label: "Actions" },
  ];
  const statuses = [PAYMENT_STATUS.Pending, PAYMENT_STATUS.Paid];

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
  const handleDialogSubmit = (values: { mtcnCode: string; amount: string }) => {
    if (!selectedPayment) return;
    sendPayment({
      mtcnCode: values.mtcnCode,
      amount: Number(values.amount),
      paymentId: selectedPayment._id,
    });
  };

  const paymentStats = [
    {
      title: "Total Pending",
      value: pending?.amount ?? 0,
      colorClass: "text-warning",
      count: pending?.count ?? 0,
    },
    {
      title: "Total Paid",
      value: paid?.amount ?? 0,
      colorClass: "text-success",
      count: paid?.count ?? 0,
    },
    {
      title: "This Month",
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
              Payment Management
            </h1>
            <p className="text-muted-foreground">
              Manage bounty payments for {programName}
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
              countText={`${stat.count} payment${stat.count !== 1 ? "s" : ""}`}
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
            <TabsTrigger value="all">All Payments</TabsTrigger>
            {statuses.map((item) => (
              <TabsTrigger value={item}>{item}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search payments..."
              isLoading={isLoading}
              isFetching={isFetching}
            />
            <Select
              value={status}
              onValueChange={(value: PAYMENT_STATUS) => setStatus(value)}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
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
                                Pay Now
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditPayment(payment)}
                            >
                              Edit
                            </Button>
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
                              View
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
