import { useContentStore } from "@/stores/contentStore";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { wrapHTML } from "@/lib/utils";

export default function DownloadButton() {
  const { htmlContent } = useContentStore();

  const downloadHTML = (htmlContent: string, filename = "note.html") => {
    if (!htmlContent) {
      toast.error("HTML content is empty");
      return;
    }

    const html = wrapHTML(htmlContent);

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };
  return <Button onClick={() => downloadHTML(htmlContent)}>Download</Button>;
}
