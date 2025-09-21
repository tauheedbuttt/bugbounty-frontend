import { InstagramBlueBadge } from "@/components/InstagramBlueBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTE_PATHS } from "@/constants/routes";
import useNotification from "@/hooks/apis/use-notification";
import { useTranslation } from "@/hooks/use-translation";
import { NOTIFICATION_TYPES } from "@/types/notification";
import { Link } from "react-router-dom";

const NotificationPage = () => {
  const { t } = useTranslation();

  const { useGetNotification, useViewNotification } = useNotification();
  const { data, isFetching } = useGetNotification({});
  const { mutate: viewNotification } = useViewNotification;

  const topResearchers = [...(data?.data?.items ?? [])];

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {t.common.buttons.notifications}
              </h1>
              <p className="text-muted-foreground mt-1">
                {t.common.buttons.notifications_description}
              </p>
            </div>
            <div className="flex gap-2"></div>
          </div>
          {/* List */}
          <div className="rounded-3xl p-8 !bg-muted">
            {/* Researchers List */}
            <div className="space-y-2">
              {topResearchers.map((researcher, index) => (
                <Link
                  key={researcher._id}
                  className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-800/30 transition-colors cursor-pointer"
                  to={
                    researcher.type === NOTIFICATION_TYPES.PROGRAM
                      ? ROUTE_PATHS.HACKER_PROGRAM_DETAILS.replace(
                          ":id",
                          researcher.program?.[0]?.slug || ""
                        )
                      : ROUTE_PATHS.REPORTS_DETAILS.replace(
                          ":id",
                          researcher.report?.[0]?.id || ""
                        )
                  }
                  state={
                    researcher.type === NOTIFICATION_TYPES.COMMENT
                      ? { reportId: researcher.report?.[0]?._id }
                      : { programId: researcher.program?.[0]?._id }
                  }
                  onClick={() => viewNotification({ id: researcher._id })}
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-center text-primary font-light">
                      {index + 1}
                    </span>
                    <Avatar className="h-2 w-2">
                      {!researcher.seen && (
                        <AvatarFallback className="bg-success" />
                      )}
                    </Avatar>
                    <div className="flex items-center gap-2">
                      <span className="font-light text-primary">
                        {researcher.username} -
                      </span>
                    </div>
                  </div>
                  <div
                    className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: researcher.description }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationPage;
