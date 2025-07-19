import { create } from "zustand";

// Define the store state interface
interface ProgramState {
  programs?: any[];
  setPrograms: (programs: any[]) => void;
  insertProgram: (program: any) => void;
  updateProgram: (program: { _id: string }) => void;
  deleteProgram: (program: any) => void;
}

export const useProgramStore = create<ProgramState>((set, get) => ({
  programs: [],
  setPrograms: (programs: any[]) => set({ programs }),
  insertProgram: (program: any) =>
    set({ programs: [...(get().programs || []), program] }),
  updateProgram: (program: { _id: string }) =>
    set({
      programs: (get().programs || []).map((p) =>
        p._id === program._id ? { ...p, ...program } : p
      ),
    }),
  deleteProgram: (program: { _id: string }) =>
    set({
      programs: (get().programs || []).filter((p) => p._id !== program._id),
    }),
}));
