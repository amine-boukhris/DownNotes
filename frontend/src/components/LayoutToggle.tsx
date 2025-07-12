import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button.tsx";
import {Check} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {useSettingsStore} from "@/stores/settingsStore.ts";

export default function LayoutToggle() {
  const {layout, setLayout} = useSettingsStore()

  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline">Layout</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => setLayout('horizontal')}><Check
          className={cn('opacity-0', {'opacity-100': layout == 'horizontal'})}/> Horizontal</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setLayout('vertical')}><Check
          className={cn('opacity-0', {'opacity-100': layout == 'vertical'})}/> Vertical</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}