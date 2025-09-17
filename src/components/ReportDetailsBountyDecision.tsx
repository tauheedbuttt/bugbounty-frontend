import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReport } from "@/hooks/apis/use-report";
import { ReportByIdResponseData } from "@/types/report";
import { useFormik } from "formik";
import { PROGRAM_ROLES, REPORT_STATUS } from "@/lib/enums";
import ProgramProtectedComponent from "./ProgramProtectedComponent";
import { useTranslation } from "@/hooks/use-translation";

const ReportDetailsBountyDecision = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
  const { t } = useTranslation();
  const { useReportApprove } = useReport();
  const { mutate: approveBounty, isPending } = useReportApprove;

  const { values, setValues, dirty, handleSubmit } = useFormik({
    initialValues: {
      id: report?._id,
      reward: report?.reward ?? 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      approveBounty(values);
    },
  });

  const reward = values?.reward;
  const setReward = (reward: number) => setValues({ ...values, reward });

  return (
    <ProgramProtectedComponent
      allowedRoles={[
        PROGRAM_ROLES.SuperAdmin,
        PROGRAM_ROLES.Triager,
        PROGRAM_ROLES.ViewerAdmin,
      ]}
      disabled
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Bounty Decision Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {t.common.buttons.bounty_decision}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.common.buttons.set_bounty_amount_if_the_vulnerability}
            </p>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t.forms.labels.set_amount}
              </label>
              <div className="flex items-center rounded-md border border-input bg-background px-3 py-2">
                <span className="text-base text-muted-foreground mr-2 select-none">
                  $
                </span>
                <Input
                  type="number"
                  min="0"
                  value={reward.toString().replace(/^\$/, "")}
                  onChange={(e) =>
                    setReward(Number(e.target.value.replace(/^\$/, "")))
                  }
                  aria-label="Bounty Amount"
                  className="border-none outline-none h-8 px-2 py-1 bg-transparent shadow-none focus-visible:ring-0 text-base"
                  style={{
                    width: "100%",
                  }}
                  placeholder="0"
                  disabled={report.status === REPORT_STATUS.Closed}
                />
              </div>
            </div>

            <ProgramProtectedComponent
              allowedRoles={[PROGRAM_ROLES.SuperAdmin, PROGRAM_ROLES.Triager]}
            >
              <Button
                isLoading={isPending}
                disabled={
                  isPending || !dirty || report.status === REPORT_STATUS.Closed
                }
                className="w-full"
                type="submit"
              >
                {t.common.buttons.approve_bounty}
              </Button>
            </ProgramProtectedComponent>
          </CardContent>
        </Card>
      </form>
    </ProgramProtectedComponent>
  );
};

export default ReportDetailsBountyDecision;
