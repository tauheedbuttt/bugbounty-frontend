export const extractSupabaseFilename = (url) => {
  // Split by '/public/' and take the part after it
  const parts = url.split("/public/");
  if (parts.length > 1) {
    // Remove bucket name (first part before '/')
    const pathAfterBucket = parts[1].split("/").slice(1).join("/");
    return decodeURIComponent(pathAfterBucket);
  }
  return null;
};
