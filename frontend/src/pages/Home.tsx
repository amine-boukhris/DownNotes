import MarkdownView from "@/components/MarkdownView.tsx";
import HTMLView from "@/components/HTMLView.tsx";
import { useSettingsStore } from "@/stores/settingsStore.ts";
import { cn } from "@/lib/utils.ts";
import LayoutToggle from "@/components/LayoutToggle.tsx";
import LivePreviewToggle from "@/components/LivePreviewToggle";

export default function Home() {
  const { layout } = useSettingsStore();
  return (
    <div className="container mx-auto min-h-screen space-y-3 py-3">
      <div className="flex items-center gap-3">
        <LayoutToggle />
        <LivePreviewToggle />
      </div>
      <div
        className={cn("grid gap-6", {
          "grid-cols-1": layout == "vertical",
          "grid-cols-2": layout == "horizontal",
        })}
      >
        <MarkdownView />
        <HTMLView />
      </div>
    </div>
  );
}
