import { ReportByIdResponseData } from "@/types/report";
import Notification from "./Notification";
import { programTimeLeft } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";

const ReportDetailsMediatorNotification = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
  const { t } = useTranslation();
  return (
    report.requestedMediator && (
      <Notification
        title={`${report.researcher.username} requested a mediator`}
        message={
          <>
            {t.common.buttons.mediator_requested_notice}
            {report.requestedMediatorDate && (
              <div className="mt-2 text-xs text-slate-300">
                {t.common.buttons.requested}{" "}
                {programTimeLeft(report.requestedMediatorDate)}
              </div>
            )}
          </>
        }
      />
    )
  );
};

export default ReportDetailsMediatorNotification;
