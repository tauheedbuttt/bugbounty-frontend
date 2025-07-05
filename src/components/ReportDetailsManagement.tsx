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
import { User, Calendar, Edit } from "lucide-react";
import {
  BOUNTY_TYPE,
  REPORT_STATUS,
  ROLE_TYPES,
  USER_STATUS,
} from "@/lib/enums";
import dayjs from "dayjs";
import { getSeverityColor } from "@/utils/programUtils";
import { useFormik } from "formik";
import { useUser } from "@/hooks/apis/use-users";
import { useUserStore } from "@/stores/user";
import { useReport } from "@/hooks/apis/use-report";
import { AdminUserResponseData } from "@/types/admin/user";
import { ReportByIdResponseData } from "@/types/report";
import { getStatusColor } from "@/utils/reportUtils";

const ReportDetailsManagement = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
  const { users } = useUserStore();

  const { useGetAdminUsers } = useUser();
  const { useReportChanges } = useReport();

  const { mutate: submitChanges, isPending } = useReportChanges;
  useGetAdminUsers({
    params: {
      limit: 0,
      page: 1,
      role: ROLE_TYPES.Admin,
      status: USER_STATUS.Active,
    },
  });

  const { values, setValues, dirty, handleSubmit } = useFormik({
    initialValues: {
      id: report?._id,
      severity: report?.severity ?? "",
      status: report?.status ?? "",
      assignedTo: report?.mediator?._id ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      submitChanges({
        ...values,
        status: status as REPORT_STATUS,
        severity: severity as BOUNTY_TYPE,
        mediator: values.assignedTo,
      });
    },
  });

  const { severity, status, assignedTo } = values;
  const setSeverity = (severity: string) => setValues({ ...values, severity });
  const setStatus = (status: string) => setValues({ ...values, status });
  const setAssignedTo = (assignedTo: string) =>
    setValues({ ...values, assignedTo });

  const statusOptions = Object.values(REPORT_STATUS);

  const severityOptions = Object.values(BOUNTY_TYPE);

  const teamMembers = users as AdminUserResponseData[];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Report Management Card */}
      <Card>
        <CardHeader>
          <CardTitle>Report Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Researcher */}
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Researcher: {report?.researcher?.username}
            </span>
          </div>
          {/* Submitted */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Submitted: {dayjs(report?.createdAt).format("YYYY-MM-DD")}
            </span>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Status</label>
              <Badge variant={getStatusColor(status)} className="ml-3">
                {status}
              </Badge>
            </div>
            <Select
              value={status}
              onValueChange={(val) => {
                setStatus(val);
              }}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((statusOpt) => (
                  <SelectItem key={statusOpt} value={statusOpt}>
                    {statusOpt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Severity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Severity</label>
              <Badge className={`ml-3 ${getSeverityColor(severity)}`}>
                {severity}
              </Badge>
            </div>
            <Select
              value={severity}
              onValueChange={(val) => {
                setSeverity(val);
              }}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {severityOptions.map((severityOption) => (
                  <SelectItem key={severityOption} value={severityOption}>
                    {severityOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assigned To */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Assign Triager</label>
            <Select
              value={assignedTo}
              onValueChange={(val) => setAssignedTo(val)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member._id} value={member._id}>
                    {member.firstName} {member.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            isLoading={isPending}
            disabled={isPending || !dirty}
            className="w-full"
            type="submit"
          >
            <Edit className="h-4 w-4 mr-2" />
            Submit Changes
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default ReportDetailsManagement;
