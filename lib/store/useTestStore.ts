import { create } from "zustand";

type Store = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useTestStore = create<Store>((set, get) => ({
  count: 0,

  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => (state: any) => ({ count: state.count - 1 }),
  reset: () => set({ count: 0 }),

}));
