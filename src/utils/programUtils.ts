export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "High":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "Medium":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "Low":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20";
  }
};
