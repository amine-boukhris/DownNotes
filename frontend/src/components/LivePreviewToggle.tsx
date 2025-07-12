import { Switch } from "@/components/ui/switch"
import { Label } from "./ui/label"
import { useSettingsStore } from "@/stores/settingsStore"

export default function LivePreviewToggle() {

  const {livePreview, toggleLivePreview} = useSettingsStore()

  return (
    <div className="flex items-center space-x-2">
      <Switch id="live-preview" checked={livePreview} onCheckedChange={toggleLivePreview} />
      <Label htmlFor="airplane-mode">Live preview</Label>
    </div>
  )
}