import supabase from "@/lib/supabase";
import { useState } from "react";

const BUCKET_NAME = import.meta.env.VITE_SUPABASE_BUCKET;

const useStorage = () => {
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (event, folder = "") => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const newFileName = `${folder}/${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(newFileName, file);

    if (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      return { success: false, error };
    } else {
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(newFileName);

      setFileUrl(urlData.publicUrl);
      setFileName(newFileName);
      setUploading(false);
      return { success: true, data, url: urlData.publicUrl };
    }
  };

  const handleFileUpdate = async (event, existingFileName) => {
    const file = event.target.files[0];
    if (!file) return;

    setUpdating(true);

    // Delete the existing file first
    const { error: deleteError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([existingFileName]);

    if (deleteError) {
      console.error("Error deleting existing file:", deleteError);
      setUpdating(false);
      return { success: false, error: deleteError };
    }

    // Upload the new file with the same name or a new name
    const newFileName = existingFileName || `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(newFileName, file);

    if (error) {
      console.error("Error updating file:", error);
      setUpdating(false);
      return { success: false, error };
    } else {
      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(newFileName);

      setFileUrl(urlData.publicUrl);
      setFileName(newFileName);
      setUpdating(false);
      return { success: true, data, url: urlData.publicUrl };
    }
  };

  const handleFileDelete = async (fileNameToDelete) => {
    if (!fileNameToDelete) return;

    setDeleting(true);

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([fileNameToDelete]);

    if (error) {
      console.error("Error deleting file:", error);
      setDeleting(false);
      return { success: false, error };
    } else {
      // Clear the file URL and name if this was the current file
      if (fileNameToDelete === fileName) {
        setFileUrl("");
        setFileName("");
      }
      setDeleting(false);
      return { success: true };
    }
  };

  const getFileUrl = (fileNameToGet) => {
    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileNameToGet);

    return data.publicUrl;
  };

  const clearCurrentFile = () => {
    setFileUrl("");
    setFileName("");
  };

  return {
    uploading,
    updating,
    deleting,
    fileUrl,
    fileName,
    handleFileUpload,
    handleFileUpdate,
    handleFileDelete,
    getFileUrl,
    clearCurrentFile,
  };
};

export default useStorage;
