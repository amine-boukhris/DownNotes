import type { NoteFile } from "@/types";

interface NoteItemProps {
  note: NoteFile;
  setOpenNote: (id: string) => void;
  handleClick: (note: NoteFile) => void;
}

export default function NoteItem({ note, setOpenNote, handleClick }: NoteItemProps) {
  return (
    <div
      className="px-4 py-3 border bg-background border-muted hover:cursor-pointer hover:bg-muted"
      onClick={() => {
        setOpenNote(note.id);
        handleClick(note);
      }}
    >
      {note.title}
    </div>
  );
}
