import MarkdownView from "@/components/MarkdownView.tsx";
import HTMLView from "@/components/HTMLView.tsx";
import {useSettingsStore} from "@/stores/settingsStore.ts";
import {cn} from "@/lib/utils.ts";
import LayoutToggle from "@/components/LayoutToggle.tsx";

export default function Home() {
  const {layout} = useSettingsStore()
  return <div className='container mx-auto min-h-screen space-y-3'>
    <LayoutToggle/>
    <div className={cn('grid gap-6', {'grid-cols-1': layout == 'vertical', 'grid-cols-2': layout == 'horizontal'})}>
      <MarkdownView/>
      <HTMLView/>
    </div>
  </div>;
}