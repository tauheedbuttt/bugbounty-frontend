import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReport } from "@/hooks/apis/use-report";
import { ReportByIdResponseData } from "@/types/report";
import { useFormik } from "formik";
import { REPORT_STATUS } from "@/lib/enums";

const ReportDetailsBountyDecision = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Bounty Decision Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Bounty Decision
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Set bounty amount if the vulnerability is confirmed as valid.
          </p>

          <div className="space-y-2">
            <label className="text-sm font-medium">Set Amount</label>
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

          <Button
            isLoading={isPending}
            disabled={
              isPending || !dirty || report.status === REPORT_STATUS.Closed
            }
            className="w-full"
            type="submit"
          >
            Approve Bounty
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default ReportDetailsBountyDecision;
