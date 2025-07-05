import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MessageSquare } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { useReport } from "@/hooks/apis/use-report";
import { useFormik } from "formik";
import { ReportByIdResponseData } from "@/types/report";
import { programTimeLeft } from "@/lib/utils";
import { COMMENT_TYPES } from "@/types/comment";

const ReportDetailsComments = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
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
          Comments & Communication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {report?.comments.map((item) => (
            <div key={item._id} className="border rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">
                      {item.type === COMMENT_TYPES.COMMENT
                        ? item.user.username
                        : "BugBounty"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {programTimeLeft(item.createdAt)}
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

        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="text-sm font-medium">Add Comment</label>
          <RichTextEditor
            content={values.description}
            onChange={(e) => setValues({ ...values, description: e })}
            placeholder="Add a comment or update..."
          />
          <Button
            isLoading={isPending}
            disabled={isPending || !dirty}
            size="sm"
            type="submit"
          >
            Post Comment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReportDetailsComments;
