import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ContentStore = {
  content: string;
  setContent: (content: string) => void;
  htmlContent: string;
  setHtmlContent: (htmlContent: string) => void;
};

export const useContentStore = create<ContentStore>()(
  persist(
    (set) => ({
      content: "",
      setContent: (content: string) => set({ content }),
      htmlContent: "",
      setHtmlContent: (htmlContent: string) => set({ htmlContent }),
    }),
    {
      name: "content-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
