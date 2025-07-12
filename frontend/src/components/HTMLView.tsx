import { useContentStore } from "@/stores/contentStore";
import DownloadButton from "./DownloadButton";
import SaveButton from "./SaveButton";

export default function HTMLView() {
  const { htmlContent } = useContentStore();

  return (
    <div className="space-y-3">
      <h2 className="text-2xl">HTML</h2>
      <textarea
        className="bg-muted w-full min-h-52 rounded-2xl p-4"
        rows={20}
        disabled={true}
        value={htmlContent}
        onChange={() => null}
      ></textarea>
      <div className="flex gap-2">
        <SaveButton />
        <DownloadButton />
      </div>
    </div>
  );
}
