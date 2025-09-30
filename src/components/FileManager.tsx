import useStorage from "@/hooks/supabase/use-storage";

export default function FileManager() {
  const {
    uploading,
    updating,
    deleting,
    fileUrl,
    fileName,
    handleFileUpload,
    handleFileUpdate,
    handleFileDelete,
    clearCurrentFile,
  } = useStorage();

  return (
    <div>
      {/* Upload */}
      <input type="file" onChange={handleFileUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}

      {/* Current File */}
      {fileUrl && (
        <div>
          <img src={fileUrl} alt="Current file" />
          <p>File: {fileName}</p>

          {/* Update */}
          <input
            type="file"
            onChange={(e) => handleFileUpdate(e, fileName)}
            disabled={updating}
          />
          {updating && <p>Updating...</p>}

          {/* Delete */}
          <button
            onClick={() => handleFileDelete(fileName)}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

          {/* Clear */}
          <button onClick={clearCurrentFile}>Clear</button>
        </div>
      )}
    </div>
  );
}
