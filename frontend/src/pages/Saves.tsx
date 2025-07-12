import { fetchNote, fetchNotes } from "@/api/notesApi";
import EditorNoteItem from "@/components/EditorNoteItem";
import NoteItem from "@/components/NoteItem";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Note, NoteFile } from "@/types";
import { Ellipsis, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Saves() {
  const [notes, setNotes] = useState<NoteFile[]>([]);
  const [editorNotes, setEditorNotes] = useState<NoteFile[]>([]);
  const [openNote, setOpenNote] = useState<string | null>(null);
  const [note, setNote] = useState<Note | null>(null);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    async function getNotes() {
      setNotes(await fetchNotes());
    }

    getNotes();
  }, []);

  useEffect(() => {
    async function getNote() {
      if (openNote) setNote(await fetchNote(openNote));
    }
    getNote();
  }, [openNote]);

  function handleNoteItemClick(note: NoteFile) {
    if (!editorNotes.includes(note)) setEditorNotes((prev) => [...prev, note]);
    setOpenNote(note.id);
  }

  function handleEditorNoteItemClick(note: NoteFile) {
    setOpenNote(note.id);
  }

  function handleEditorNoteItemClose(note: NoteFile) {
    setEditorNotes((prev) => prev.filter((item) => item.id != note.id));
    if (openNote == note.id) {
      setOpenNote(null);
      setNote(null);
    }
  }

  return (
    <div className="container mx-auto flex">
      <div className="max-w-xs min-w-3xs min-h-72 bg-muted">
        <div className="flex justify-between items-center pr-2">
          <div className="bg-muted px-5 py-4 flex gap-2">
            <Search className="rotate-y-180" />
            Explorer
          </div>
        </div>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            setOpenNote={setOpenNote}
            handleClick={handleNoteItemClick}
          />
        ))}
      </div>
      <div className="flex-1 bg-muted">
        <div className="h-12 flex items-center">
          <div className="flex-1 bg-muted flex items-center">
            {editorNotes.map((note) => (
              <EditorNoteItem
                note={note}
                handleClose={handleEditorNoteItemClose}
                handleClick={handleEditorNoteItemClick}
              />
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-2">
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Save note</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPreview(!preview)}>
                {preview ? "Content" : "Preview"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <textarea
            className="bg-muted w-full min-h-52 p-4 focus:outline-none"
            rows={20}
            value={preview ? note?.htmlContent : note?.content}
            disabled={preview}
            // onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
