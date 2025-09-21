import { create } from "zustand";

// Define the store state interface
interface PaymentState {
  payments?: any[];
  setPayments: (payments: any[]) => void;
  insertPayment: (payment: any) => void;
  updatePayment: (payment: { _id: string }) => void;
  deletePayment: (payment: any) => void;
}

export const usePaymentStore = create<PaymentState>((set, get) => ({
  payments: [],
  setPayments: (payments: any[]) => set({ payments }),
  insertPayment: (payment: any) =>
    set({ payments: [...(get().payments || []), payment] }),
  updatePayment: (payment: { _id: string }) =>
    set({
      payments: (get().payments || []).map((p) =>
        p._id === payment._id ? { ...p, ...payment } : p
      ),
    }),
  deletePayment: (payment: { _id: string }) =>
    set({
      payments: (get().payments || []).filter((p) => p._id !== payment._id),
    }),
}));
