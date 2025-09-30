import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MessageSquare } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { useReport } from "@/hooks/apis/use-report";
import { useFormik } from "formik";
import { ReportByIdResponseData } from "@/types/report";
import { cn, programTimeLeft } from "@/lib/utils";
import { COMMENT_TYPES } from "@/types/comment";
import AdminProtectedComponent from "./AdminProtectedComponent";
import { ADMIN_ROLES, PROGRAM_ROLES, ROLE_TYPES } from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";
import ProgramProtectedComponent from "./ProgramProtectedComponent";
import useLocalStorage from "@/hooks/use-local-storage";
import { useTranslation } from "@/hooks/use-translation";
import { Badge } from "./ui/badge";

const ReportDetailsComments = ({
  report,
  disabled,
}: {
  report?: ReportByIdResponseData;
  disabled?: boolean;
}) => {
  const { t, currentLanguage } = useTranslation();
  const { role } = useLocalStorage();

  const ProtectedComponent =
    role === ROLE_TYPES.Admin
      ? AdminProtectedComponent
      : ProgramProtectedComponent;
  const allowedRoles =
    role === ROLE_TYPES.Admin
      ? [ADMIN_ROLES.SuperAdmin, ADMIN_ROLES.Mediator]
      : [PROGRAM_ROLES.SuperAdmin, PROGRAM_ROLES.Triager];

  const { useAddComment } = useReport();
  const { mutate: addComment, isPending } = useAddComment;
  const { values, setValues, dirty, handleSubmit, resetForm } = useFormik({
    initialValues: {
      reportId: report?._id,
      description: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      addComment(values);
      setValues({ ...values, description: "" });
    },
  });

  const comments = report?.comments?.map((item) => ({
    ...item,
    username:
      item.type === COMMENT_TYPES.COMMENT
        ? item.user.username
        : "BugBounty Syria",
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          {t.common.buttons.comments_communication}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Comments Section */}
        <ProtectedComponent allowedRoles={allowedRoles as any}>
          <form
            onSubmit={disabled ? undefined : handleSubmit}
            className="space-y-2"
          >
            <label className="text-sm font-medium">
              {t.common.buttons.add_comment}
            </label>
            <RichTextEditor
              disabled={disabled}
              content={values.description}
              onChange={(e) => setValues({ ...values, description: e })}
              placeholder={t.common.buttons.add_a_comment_or_update}
            />
            <Button
              isLoading={isPending}
              disabled={disabled || isPending || !dirty}
              size="sm"
              type="submit"
            >
              {t.common.buttons.post_comment}
            </Button>
          </form>
        </ProtectedComponent>

        {/* Comments */}
        <div className="-m-3">
          {comments.map((item, index) => {
            const isLast = index === report.comments.length - 1;
            const next = comments[index + 1];
            const prev = comments[index - 1];
            const isSameNextUser =
              (next?.user?._id === item.user?._id &&
                next?.username === item.username) ||
              next?.username === item.username;
            const isSamePreviousUser =
              (prev?.user?._id === item.user?._id &&
                prev?.username === item.username) ||
              prev?.username === item.username;
            const isSameUser = isSameNextUser || isSamePreviousUser;

            const badges = {
              [ROLE_TYPES.Hacker]: "Researcher",
              [ROLE_TYPES.Admin]: item.user.adminRole,
              [ROLE_TYPES.Program]:
                item.user.programRole === PROGRAM_ROLES.SuperAdmin
                  ? "Program Manager"
                  : item.user.programRole,
            };
            const badgeText = badges[item.user.role];
            return (
              <div className="flex w-full">
                {/* Thread out of comment card */}
                {/* <div
                  className={cn(
                    "flex-1 flex",
                    isSamePreviousUser ? "items-start" : "items-end",
                    currentLanguage === "ar" ? "scale-x-[-1]" : ""
                  )}
                >
                  <div
                    className={cn(
                      "h-1/2 w-3 border-[2px] rounded border-gray-400",
                      // removes the border if there is no same user found infront or back
                      isSameUser ? "" : "border-none",
                      // if only the previous user is same as current one, add a border on top
                      isSamePreviousUser
                        ? "border-r-0 border-t-0 rounded-br-none rounded-tl-none"
                        : "",
                      // if only the next user is same as current one, add a border below
                      isSameNextUser
                        ? "border-r-0 border-b-0 rounded-tr-none rounded-bl-none "
                        : "",
                      // if both users are same, previous and back, add a border in full-length
                      isSameNextUser && isSamePreviousUser ? "h-full" : ""
                    )}
                  />
                </div> */}

                {/* main comment card */}
                <div
                  key={item._id}
                  className={cn(" border rounded-lg w-full mb-3")}
                >
                  <div className="flex items-start gap-3 ">
                    {/* avatar */}
                    <div
                      className={cn(
                        " h-full pt-4  flex flex-col items-center",
                        currentLanguage === "ar" ? "pr-4" : "pl-4"
                      )}
                    >
                      {/* avatar url */}
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        {item.user.image ? (
                          <img
                            src={item.user.image}
                            alt="Profile Avatar"
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <User className="h-4 w-4 text-primary-foreground " />
                        )}
                      </div>
                    </div>
                    {/* comment details */}
                    <div
                      className={cn(
                        "flex-1 h-full py-4 ",
                        currentLanguage === "ar" ? " pl-4" : " pr-4"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {/* name */}
                        <span className="font-semibold">
                          {item.user?.role === ROLE_TYPES.Admin
                            ? item.user?.adminRole === ADMIN_ROLES.Mediator
                              ? item.user.username
                              : "BugBounty Syria"
                            : item.user?.username}
                        </span>
                        {/* badge */}
                        <Badge variant="outline">{badgeText}</Badge>
                        {/* posted date */}
                        <span className="text-xs text-muted-foreground">
                          {programTimeLeft(item.createdAt, currentLanguage)}
                        </span>
                      </div>
                      <div
                        className="text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportDetailsComments;
