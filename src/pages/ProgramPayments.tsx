
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, DollarSign, Clock, CheckCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { PaymentDialog } from "@/components/PaymentDialog";
import { useState } from "react";

export default function ProgramPayments() {
  const {
    programName
  } = useParams();

  // Payment state with MTCN and UI update on edit/send
  const [paymentRows, setPaymentRows] = useState([
    {
      id: "PAY001",
      reportId: "VR001",
      researcher: "john_hacker",
      amount: "$500",
      status: "Pending",
      dueDate: "2024-06-15",
      submittedDate: "2024-06-05",
      mtcnCode: "",
    },
    {
      id: "PAY002",
      reportId: "VR002",
      researcher: "security_pro",
      amount: "$200",
      status: "Paid",
      dueDate: "2024-06-10",
      submittedDate: "2024-06-04",
      mtcnCode: "1234567890",
    },
  ]);

  // Dialog UI state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "secondary";
      case "Pending":
        return "default";
      default:
        return "secondary";
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="h-4 w-4" />;
      case "Pending":
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
    setPaymentRows(rows => rows.map(p =>
      p.id === selectedPayment.id
        ? {
            ...p,
            mtcnCode: values.mtcnCode,
            amount: values.amount,
            status: "Paid",
          }
        : p
    ));
    setDialogOpen(false);

    // Here you could add toast or real backend update logic
    // toast({ title: "Payment marked as Paid!" });
  };

  // Filter helpers for totals
  const totalPending = paymentRows
    .filter((p) => p.status === "Pending")
    .reduce((acc, cur) => acc + Number(cur.amount.replace("$", "")), 0);
  const totalPaid = paymentRows
    .filter((p) => p.status === "Paid")
    .reduce((acc, cur) => acc + Number(cur.amount.replace("$", "")), 0);
  const thisMonth = paymentRows
    .reduce((acc, cur) => acc + Number(cur.amount.replace("$", "")), 0);

  return <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payment Management</h1>
            <p className="text-muted-foreground">Manage bounty payments for {programName}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">${totalPending}</div>
              <p className="text-xs text-muted-foreground">
                {paymentRows.filter(p => p.status === "Pending").length} payment{paymentRows.filter(p => p.status === "Pending").length !== 1 && "s"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${totalPaid}</div>
              <p className="text-xs text-muted-foreground">
                {paymentRows.filter(p => p.status === "Paid").length} payment{paymentRows.filter(p => p.status === "Paid").length !== 1 && "s"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${thisMonth}</div>
              <p className="text-xs text-muted-foreground">{paymentRows.length} payment{paymentRows.length !== 1 && "s"}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search payments..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
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
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Researcher</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentRows.map(payment => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono">{payment.id}</TableCell>
                        <TableCell className="font-mono">{payment.reportId}</TableCell>
                        <TableCell>{payment.researcher}</TableCell>
                        <TableCell className="font-medium">{payment.amount}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(payment.status)} className="flex items-center gap-1 w-fit">
                            {getStatusIcon(payment.status)}
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.dueDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {payment.status === "Pending" && (
                              <Button variant="outline" size="sm" onClick={() => handlePayNow(payment)}>
                                Pay Now
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => handleEditPayment(payment)}>
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Researcher</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentRows
                      .filter(payment => payment.status === "Pending")
                      .map(payment => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-mono">{payment.id}</TableCell>
                          <TableCell className="font-mono">{payment.reportId}</TableCell>
                          <TableCell>{payment.researcher}</TableCell>
                          <TableCell className="font-medium">{payment.amount}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(payment.status)} className="flex items-center gap-1 w-fit">
                              {getStatusIcon(payment.status)}
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {payment.status === "Pending" && (
                                <Button variant="outline" size="sm" onClick={() => handlePayNow(payment)}>
                                  Pay Now
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" onClick={() => handleEditPayment(payment)}>
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paid">
            <Card>
              <CardHeader>
                <CardTitle>Paid Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Researcher</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentRows
                      .filter(payment => payment.status === "Paid")
                      .map(payment => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-mono">{payment.id}</TableCell>
                          <TableCell className="font-mono">{payment.reportId}</TableCell>
                          <TableCell>{payment.researcher}</TableCell>
                          <TableCell className="font-medium">{payment.amount}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(payment.status)} className="flex items-center gap-1 w-fit">
                              {getStatusIcon(payment.status)}
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{payment.dueDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditPayment(payment)}>
                                Edit
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedPayment && (
        <PaymentDialog
          open={dialogOpen}
          mode={dialogMode}
          payment={selectedPayment}
          onSubmit={handleDialogSubmit}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </div>;
}
