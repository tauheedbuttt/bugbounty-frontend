import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/apis/use-auth";
import useStorage from "@/hooks/supabase/use-storage";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { useAuthStore } from "@/stores/auth";
import { UpdateProfileData } from "@/types/auth";
import { useRef } from "react";

interface AvatarUploadProps {
  profile: UpdateProfileData;
  isFetching: boolean;
}
const AvatarUpload = ({ profile, isFetching }: AvatarUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const { role } = useAuthStore();
  const { useUpdateProfileImage } = useAuth(role);
  const { handleFileUpload, handleFileDelete, uploading, deleting } =
    useStorage();

  const { mutate: updateImage, isPending: isUpdatePending } =
    useUpdateProfileImage;

  const isLoading = uploading || isUpdatePending || isFetching || deleting;

  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = [".png", ".jpg", ".jpeg"];

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

  const handleFileUploadLocal = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      toast({ title: validationError });
      return;
    }
    const uploadResult = await handleFileUpload(
      {
        target: { files: [file] },
      },
      "user"
    );

    const image = uploadResult.url;
    updateImage({ image });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files?.[0];
    handleFileUploadLocal(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files?.[0];
      handleFileUploadLocal(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDeleteImage = async () => {
    if (profile.image) {
      try {
        await handleFileDelete(profile.image);
        updateImage({ image: "" });
      } catch (error) {
        toast({ title: "Failed to delete image" });
      }
    }
  };

  return (
    <Card
      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <CardHeader>
        <CardTitle>{t.common.buttons.avatar}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-gray-200 overflow-hidden">
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            ) : profile.image ? (
              <img
                src={profile.image}
                alt="Profile Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-4xl">🔧</span>
            )}
          </div>
          <div
            onClick={profile.image ? handleDeleteImage : openFileDialog}
            className={`absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs cursor-pointer transition-colors ${
              profile.image
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {profile.image ? "×" : "+"}
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <p>{t.common.buttons.attach_files_by_dragging_dropping}</p>
          <p>
            {t.common.buttons.max_attachments_info.replace("{MAX_FILES}", "1")}
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={ALLOWED_TYPES.join(",")}
          onChange={handleFileInputChange}
          className="hidden"
        />
        <Button onClick={openFileDialog} variant="outline" disabled={isLoading}>
          {isLoading ? "Uploading..." : t.common.buttons.upload_avatar}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AvatarUpload;
