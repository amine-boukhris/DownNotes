import type { NoteFile } from "@/types";
import { X } from "lucide-react";

interface EditorNoteItemProps {
  note: NoteFile;
  handleClose: (note: NoteFile) => void;
  handleClick: (note: NoteFile) => void;
}

export default function EditorNoteItem({ note, handleClose, handleClick }: EditorNoteItemProps) {
  return (
    <div
      className="group pl-4 pr-2 py-3 border border-muted w-fit flex items-center gap-2 hover:cursor-pointer bg-background hover:bg-muted"
      onClick={() => handleClick(note)}
    >
      {note.title}
      <div
        className="hover:bg-background p-1 rounded opacity-0 group-hover:opacity-100"
        onClick={() => handleClose(note)}
      >
        <X className="size-4" />
      </div>
    </div>
  );
}
