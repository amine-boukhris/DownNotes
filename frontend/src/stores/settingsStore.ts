import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Layout } from "@/types";

type SettingsStore = {
  layout: Layout;
  livePreview: boolean;
  setLayout: (layout: Layout) => void;
  toggleLivePreview: () => void;
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      layout: "vertical",
      livePreview: false,
      toggleLivePreview: () => {
        const prev = get().livePreview;
        set({ livePreview: !prev });
      },
      setLayout: (layout: Layout) => set({ layout }),
    }),
    { name: "settings-storage", storage: createJSONStorage(() => sessionStorage) }
  )
);
