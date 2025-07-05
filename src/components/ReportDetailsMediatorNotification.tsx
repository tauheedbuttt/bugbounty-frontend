import { ReportByIdResponseData } from "@/types/report";
import Notification from "./Notification";
import { programTimeLeft } from "@/lib/utils";

const ReportDetailsMediatorNotification = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
  return (
    report.requestedMediator && (
      <Notification
        title={`${report.researcher.username} requested a mediator`}
        message={
          <>
            A mediator has been requested for this report. Please review the
            request and take appropriate action.
            {report.requestedMediatorDate && (
              <div className="mt-2 text-xs text-slate-300">
                Requested {programTimeLeft(report.requestedMediatorDate)}
              </div>
            )}
          </>
        }
      />
    )
  );
};

export default ReportDetailsMediatorNotification;
