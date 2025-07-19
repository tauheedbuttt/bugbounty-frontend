import { create } from "zustand";

// Define the store state interface
interface ReportState {
  reports?: any[];
  setReports: (reports: any[]) => void;
  insertReport: (report: any) => void;
  updateReport: (report: { _id: string }) => void;
  deleteReport: (report: any) => void;
}

export const useReportStore = create<ReportState>((set, get) => ({
  reports: [],
  setReports: (reports: any[]) => set({ reports }),
  insertReport: (report: any) =>
    set({ reports: [...(get().reports || []), report] }),
  updateReport: (report: { _id: string }) =>
    set({
      reports: (get().reports || []).map((p) =>
        p._id === report._id ? { ...p, ...report } : p
      ),
    }),
  deleteReport: (report: { _id: string }) =>
    set({
      reports: (get().reports || []).filter((p) => p._id !== report._id),
    }),
}));
