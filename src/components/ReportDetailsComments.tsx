import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MessageSquare } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { useReport } from "@/hooks/apis/use-report";
import { useFormik } from "formik";
import { ReportByIdResponseData } from "@/types/report";
import { programTimeLeft } from "@/lib/utils";
import { COMMENT_TYPES } from "@/types/comment";
import AdminProtectedComponent from "./AdminProtectedComponent";
import { ADMIN_ROLES, PROGRAM_ROLES, ROLE_TYPES } from "@/lib/enums";
import { useAuthStore } from "@/stores/auth";
import ProgramProtectedComponent from "./ProgramProtectedComponent";
import useLocalStorage from "@/hooks/use-local-storage";
import { useTranslation } from "@/hooks/use-translation";

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
        <div className="space-y-4">
          {report?.comments.map((item) => (
            <div key={item._id} className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  {item.user.image ? (
                    <img
                      src={item.user.image}
                      alt="Profile Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">
                      {item.type === COMMENT_TYPES.COMMENT
                        ? item.user.username
                        : "BugBounty"}
                    </span>
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportDetailsComments;
