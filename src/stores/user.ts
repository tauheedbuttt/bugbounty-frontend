import { create } from "zustand";

// Define the store state interface
interface UserState {
  users?: any[];
  setUsers: (users: any[]) => void;
  insertUser: (user: any) => void;
  updateUser: (user: { _id: string }) => void;
  deleteUser: (user: any) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  setUsers: (users: any[]) => set({ users }),
  insertUser: (user: any) => set({ users: [...(get().users || []), user] }),
  updateUser: (user: { _id: string }) => {
    const users = get().users || [];
    const updated = users.map((p) =>
      p._id === user._id ? { ...p, ...user } : p
    );
    set({
      users: updated,
    });
  },
  deleteUser: (user: { _id: string }) =>
    set({
      users: (get().users || []).filter((p) => p._id !== user._id),
    }),
}));
