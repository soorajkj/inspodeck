import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useAuthModalStore = create(
  combine({ isOpen: false }, (set) => ({
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  }))
);
