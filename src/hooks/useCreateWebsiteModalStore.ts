import { create, ExtractState } from "zustand";
import { combine } from "zustand/middleware";

type Stage = "basic" | "assets";

export const useCreateWebsiteModalStore = create(
  combine(
    {
      isOpen: false,
      stage: "basic" as Stage,
      websiteId: null as null | string,
    },
    (set) => ({
      setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      setStage: (stage: Stage) => set({ stage }),
      setWebsiteId: (id: string | null) => set({ websiteId: id }),
    })
  )
);

export type UseCreateWebsiteModalStore = ExtractState<
  typeof useCreateWebsiteModalStore
>;
