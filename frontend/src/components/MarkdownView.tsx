import { convert } from "@/api/utilsApi";
import { Button } from "@/components/ui/button";
import { useContentStore } from "@/stores/contentStore";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sampleMarkdown } from "@/lib/constants";
import { useEffect } from "react";
import { useSettingsStore } from "@/stores/settingsStore";
import { marked } from "marked";

export default function MarkdownView() {
  const { content, setContent, setHtmlContent } = useContentStore();
  const { livePreview } = useSettingsStore();

  useEffect(() => {
    const convertOnTheFly = async () => {
      if (livePreview) {
        setHtmlContent(await marked(content));
      }
    };
    convertOnTheFly();
  }, [content, livePreview]);

  const handleConvert = async () => {
    if (!content) {
      setHtmlContent("");
      return;
    }
    setHtmlContent(await convert(content));
  };

  const handleClear = () => {
    setContent("");
    setHtmlContent("");
  };

  const handleSampleContent = () => {
    setContent(sampleMarkdown);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-2xl">Markdown</h2>
      <textarea
        className="bg-muted w-full min-h-52 rounded-2xl p-4"
        rows={20}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="flex gap-2">
        <Button onClick={handleConvert}>Convert</Button>
        <Button>Upload</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>Clear</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>This action cannot be undone.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"secondary"}>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant={"destructive"} onClick={handleClear}>
                  Clear
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button variant={"secondary"} onClick={handleSampleContent}>
          Sample Markdown
        </Button>
      </div>
    </div>
  );
}
