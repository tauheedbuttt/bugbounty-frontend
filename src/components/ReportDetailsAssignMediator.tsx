import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit, UserPlus } from "lucide-react";
import { ADMIN_ROLES, ROLE_TYPES, USER_STATUS } from "@/lib/enums";
import { useFormik } from "formik";
import { useUser } from "@/hooks/apis/use-users";
import { useUserStore } from "@/stores/user";
import { useReport } from "@/hooks/apis/use-report";
import { AdminUserResponseData } from "@/types/admin/user";
import { ReportByIdResponseData } from "@/types/report";
import { useTranslation } from "@/hooks/use-translation";

const ReportDetailsAssignMediator = ({
  report,
  disabled,
}: {
  report?: ReportByIdResponseData;
  disabled?: boolean;
}) => {
  const { t } = useTranslation();
  const { users } = useUserStore();

  const { useGetAdminUsers } = useUser();
  const { useReportChanges } = useReport();

  const { mutate: submitChanges, isPending } = useReportChanges;
  useGetAdminUsers({
    params: {
      limit: 0,
      page: 1,
      role: ROLE_TYPES.Admin,
      adminRole: ADMIN_ROLES.Mediator,
      status: USER_STATUS.Active,
    },
  });

  const { values, setValues, dirty, handleSubmit } = useFormik({
    initialValues: {
      id: report?._id,
      assignedTo: report?.mediator?._id ?? "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      submitChanges({
        ...values,
        mediator: values.assignedTo,
      });
    },
  });

  const { assignedTo } = values;
  const setAssignedTo = (assignedTo: string) =>
    setValues({ ...values, assignedTo });

  const teamMembers = users as AdminUserResponseData[];
  // disabled = disabled || !!report.mediator;

  return (
    report.requestedMediator && (
      <form
        onSubmit={disabled ? undefined : handleSubmit}
        className="space-y-6"
      >
        {/* Assign Mediator Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t.common.buttons.assign_mediator}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Assigned To */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t.forms.labels.select_mediator}
              </label>
              <Select
                value={assignedTo}
                onValueChange={
                  disabled ? undefined : (val) => setAssignedTo(val)
                }
                disabled={disabled}
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
              disabled={disabled || isPending || !dirty}
              className="w-full"
              type="submit"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              {t.common.buttons.assign_mediator}
            </Button>
          </CardContent>
        </Card>
      </form>
    )
  );
};

export default ReportDetailsAssignMediator;
