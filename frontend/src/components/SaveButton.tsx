import { Button } from "@/components/ui/button.tsx";
import { useContentStore } from "@/stores/contentStore";
import DownloadButton from "./DownloadButton";
import { createNote } from "@/api/notesApi";
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
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

export default function SaveButton() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { content } = useContentStore();

  const handleSave = async () => {
    if (!title) {
      toast.error("Note title is required");
      return;
    }
    await createNote(title, content);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Save</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter note title</DialogTitle>
          <DialogDescription>Keep it short 🙏</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <Label htmlFor="title">Name</Label>
          <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>

          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
