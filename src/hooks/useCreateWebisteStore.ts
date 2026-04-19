import { create, ExtractState } from "zustand";
import { combine } from "zustand/middleware";

export type Step = "details" | "image";

export const useCreateWebsiteStore = create(
  combine(
    {
      isOpen: false,
      step: "details" as Step,
      websiteId: null as string | null,
    },
    (set) => ({
      setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      nextStep: (id: string) => set({ step: "image", websiteId: id }),
      closeAndClear: () =>
        set({ isOpen: false, step: "details", websiteId: null }),
    })
  )
);

export type CreateWebsiteStore = ExtractState<typeof useCreateWebsiteStore>;
