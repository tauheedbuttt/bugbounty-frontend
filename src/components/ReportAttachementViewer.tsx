interface ReportAttachementViewerProps {
  attachment: {
    url?: string;
    name: string;
    type?: string;
    size?: number;
  };
  className?: string;
}

const ReportAttachementViewer = ({
  attachment,
  className = "",
}: ReportAttachementViewerProps) => {
  const getFileExtension = (fileName: string) => {
    return fileName.toLowerCase().substring(fileName.lastIndexOf("."));
  };

  if (!attachment.url) {
    return (
      <div
        className={`flex items-center justify-center h-32 bg-muted rounded-lg ${className}`}
      >
        <p className="text-muted-foreground">No preview available</p>
      </div>
    );
  }

  const fileExtension = getFileExtension(attachment.name);
  console.log(fileExtension);

  switch (fileExtension) {
    case ".png":
    case ".jpg":
    case ".jpeg":
      return (
        <div className={className}>
          <img
            src={attachment.url}
            alt={attachment.name}
            className="max-w-full max-h-96 object-contain rounded-lg mx-auto"
            loading="lazy"
          />
        </div>
      );

    case ".pdf":
      return (
        <div className={className}>
          <iframe
            src={attachment.url}
            className="w-full h-96 rounded-lg border"
            title={attachment.name}
          />
        </div>
      );

    case ".txt":
      return (
        <div className={className}>
          <div className="bg-white p-4 rounded-lg border max-h-96 overflow-y-auto">
            <iframe
              src={attachment.url}
              className="w-full h-80 border-none"
              title={attachment.name}
            />
          </div>
        </div>
      );

    case ".doc":
    case ".docx":
      return (
        <div
          className={`flex flex-col items-center justify-center h-32 bg-muted rounded-lg ${className}`}
        >
          <div className="text-center">
            <p className="text-muted-foreground mb-2">
              Document preview not available
            </p>
            <p className="text-sm text-muted-foreground">
              Click download to view the document
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div
          className={`flex items-center justify-center h-32 bg-muted rounded-lg ${className}`}
        >
          <p className="text-muted-foreground">
            Preview not available for this file type. Click download to view.
          </p>
        </div>
      );
  }
};

export default ReportAttachementViewer;
