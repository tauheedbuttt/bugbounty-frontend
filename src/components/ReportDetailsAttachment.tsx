import { ReportByIdResponseData } from "@/types/report";
import { formatFileSize } from "@/utils/reportUtils";
import { ChevronDown, ChevronUp, Download, MessageSquare } from "lucide-react";
import { useState } from "react";
import ReportAttachementViewer from "./ReportAttachementViewer";
import { getFileIcon } from "./ReportAttachmentsUpload";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTranslation } from "@/hooks/use-translation";

const ReportDetailsAttachment = ({
  report,
}: {
  report?: ReportByIdResponseData;
}) => {
  const { t } = useTranslation();
  const [expandedAttachment, setExpandedAttachment] = useState<string | null>(
    null
  );

  const handleViewClick = (attachmentId: string) => {
    setExpandedAttachment(
      expandedAttachment === attachmentId ? null : attachmentId
    );
  };

  return (
    report?.attachments?.length > 0 && (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {t.common.buttons.attachments} ({report.attachments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Attachments Preview */}
          <div className="mt-4 space-y-2">
            <div className="space-y-2">
              {report.attachments.map((attachment) => (
                <div
                  key={attachment.supabaseId}
                  className="bg-muted/50 rounded-lg border overflow-hidden"
                >
                  {/* Attachment Header */}
                  <div className="flex items-center gap-3 p-3">
                    {/* File Icon/Preview */}
                    <div className="flex-shrink-0">
                      {attachment.url &&
                      attachment.type.startsWith("image/") ? (
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          className="h-10 w-10 object-cover rounded"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                          {getFileIcon?.(attachment.type, attachment.name)}
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize?.(attachment.size)}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1">
                      {/* View/Expand Button */}
                      {attachment.url && (
                        <button
                          onClick={() => handleViewClick(attachment.supabaseId)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                          title={
                            expandedAttachment === attachment.supabaseId
                              ? "Hide preview"
                              : "View attachment"
                          }
                        >
                          {expandedAttachment === attachment.supabaseId ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      )}

                      {/* Download Button */}
                      {attachment.url && (
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 hover:bg-muted rounded transition-colors"
                          title="Download attachment"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Expandable Preview */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedAttachment === attachment.supabaseId
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="px-3 pb-3">
                      <div className="border-t pt-3">
                        <ReportAttachementViewer attachment={attachment} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default ReportDetailsAttachment;
