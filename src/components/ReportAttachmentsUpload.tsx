import useStorage from "@/hooks/supabase/use-storage";
import { toast } from "@/hooks/use-toast";
import {
  HackerReportCreateData,
  ReportAttachments,
} from "@/types/hacker/report";
import { FormikProps } from "formik";
import {
  Upload,
  X,
  File,
  Image,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useRef, useState } from "react";
import ReportAttachementViewer from "./ReportAttachementViewer";
import { useTranslation } from "@/hooks/use-translation";

interface ReportAttachmentsUploadProps {
  formik: FormikProps<HackerReportCreateData>;
}

export const getFileIcon = (type: string, name: string) => {
  const extension = name.split(".").pop()?.toLowerCase();

  if (
    type.startsWith("image/") ||
    ["png", "jpg", "jpeg"].includes(extension || "")
  ) {
    return <Image className="h-4 w-4" />;
  } else if (extension === "pdf") {
    return <FileText className="h-4 w-4" />;
  } else {
    return <File className="h-4 w-4" />;
  }
};

const ReportAttachmentsUpload = ({ formik }: ReportAttachmentsUploadProps) => {
  const { t } = useTranslation();
  const { values, setValues, setFieldValue } = formik;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFileUpload, handleFileDelete, uploading } = useStorage();
  const [expandedAttachment, setExpandedAttachment] = useState<string | null>(
    null
  );

  // Use formik values for attachments
  const attachments = values.attachments || [];

  const MAX_FILES = 10;
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = [
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg",
    ".txt",
    ".doc",
    ".docx",
  ];

  const handleViewClick = (attachmentId: string) => {
    setExpandedAttachment(
      expandedAttachment === attachmentId ? null : attachmentId
    );
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_TYPES.includes(fileExtension)) {
      return `File type ${fileExtension} is not allowed`;
    }

    // Check file size
    if (file.size > MAX_SIZE) {
      return t.common.errors.file_size_must_be_less_than_5mb;
    }

    return null;
  };

  const handleFileSelection = async (files: FileList) => {
    const newFiles = Array.from(files);

    // Check total file count
    if (attachments.length + newFiles.length > MAX_FILES) {
      toast({
        title: t.common.errors.maximum_attachments_allowed.replace(
          "${MAX_FILES}",
          `${MAX_FILES}`
        ),
      });
      return;
    }

    // validate files
    for (const file of newFiles) {
      const validationError = validateFile(file);
      if (validationError) {
        toast({ title: validationError });
        continue;
      }
    }

    // store in state
    const newAttachments = newFiles.map((file) => ({
      id: `temp-${Date.now()}-${Math.random()}`,
      name: file.name,
      fileName: "",
      url: "",
      type: file.type,
      size: file.size,
      uploading: true,
      file,
    }));

    setValues({ ...values, attachments: [...newAttachments, ...attachments] });

    // attachmentsWithUrl
    await Promise.all(
      newAttachments.map(async (tempAttachment, index) => {
        // Upload file
        const uploadResult = await handleFileUpload(
          {
            target: { files: [tempAttachment.file] },
          },
          "attachments"
        );

        if (uploadResult?.success) {
          setFieldValue(`attachments[${index}]`, {
            ...tempAttachment,
            fileName: uploadResult.data.path,
            url: uploadResult.url,
            uploading: false,
          });
        } else {
          setValues((prev) => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index),
          }));
          toast({
            title: t.common.errors.failed_to_upload.replace(
              "${tempAttachment.name}",
              tempAttachment.name
            ),
          });
        }
      })
    );

    // setValues({ ...values, attachments: urlAttachments });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files) {
      handleFileSelection(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemoveFile = async (attachment: ReportAttachments) => {
    if (attachment.fileName) {
      const deleteResult = await handleFileDelete(attachment.fileName);
      if (!deleteResult?.success) {
        alert(`Failed to delete ${attachment.name}`);
        return;
      }
    }

    const filteredAttachments = attachments.filter(
      (att) => att.id !== attachment.id
    );
    setFieldValue("attachments", filteredAttachments);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getPreviewUrl = (attachment: ReportAttachments) => {
    if (attachment.type.startsWith("image/") && attachment.url) {
      return attachment.url;
    }
    return null;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        {t.common.buttons.attachments}
      </h3>

      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          <span className="font-medium">
            {t.common.buttons.attach_files_by_dragging_dropping}
          </span>
        </p>
        <p className="text-xs text-muted-foreground">
          {t.common.buttons.max_attachments_info.replace(
            "{MAX_FILES}",
            String(MAX_FILES)
          )}
          <br />
          {t.common.buttons.allowed_file_types} (.pdf, .png, .jpg, .txt, .doc,
          .docx)
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* File List */}
      {attachments.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-medium">
            {t.common.buttons.selected_files} ({attachments.length}/{MAX_FILES})
          </h4>
          <div className="space-y-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="bg-muted/50 rounded-lg border overflow-hidden"
              >
                {/* Attachment Header */}
                <div className="flex items-center gap-3 p-3">
                  {/* File Icon/Preview */}
                  <div className="flex-shrink-0">
                    {getPreviewUrl(attachment) ? (
                      <img
                        src={getPreviewUrl(attachment)!}
                        alt={attachment.name}
                        className="h-10 w-10 object-cover rounded"
                      />
                    ) : (
                      <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                        {getFileIcon(attachment.type, attachment.name)}
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>

                  {/* Status/Actions */}
                  <div className="flex items-center gap-2">
                    {attachment.uploading ? (
                      <div className="text-xs text-muted-foreground">
                        {t.common.buttons.uploading}
                      </div>
                    ) : (
                      <>
                        {/* View/Expand Button */}
                        {attachment.url && (
                          <button
                            type="button"
                            onClick={() => handleViewClick(attachment.id)}
                            className="p-1 hover:bg-muted rounded transition-colors"
                            title={
                              expandedAttachment === attachment.id
                                ? t.common.buttons.hide_preview
                                : t.common.buttons.view_attachment
                            }
                          >
                            {expandedAttachment === attachment.id ? (
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

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(attachment)}
                          className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors"
                          disabled={attachment.uploading}
                          title="Remove attachment"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expandable Preview */}
                {!attachment.uploading && (
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      expandedAttachment === attachment.id
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
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportAttachmentsUpload;
