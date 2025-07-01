import {create} from 'zustand'
import {persist, createJSONStorage} from "zustand/middleware";
import type {Layout} from "@/types";

type SettingsStore = {
  layout: Layout
  setLayout: (layout: Layout) => void
}

export const useSettingsStore = create<SettingsStore>()(persist((set) => ({
  layout: 'vertical',
  setLayout: (layout: Layout) => set({layout}),
}), {name: 'settings-storage', storage: createJSONStorage(() => sessionStorage)}))