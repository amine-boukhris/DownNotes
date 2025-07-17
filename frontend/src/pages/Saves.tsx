import { fetchNote, fetchNotes, updateNote } from "@/api/notesApi";
import EditorNoteItem from "@/components/EditorNoteItem";
import NoteItem from "@/components/NoteItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Note, NoteFile } from "@/types";
import { Ellipsis, Search } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";

export default function Saves() {
  const [notes, setNotes] = useState<NoteFile[]>([]);
  const [editorNotes, setEditorNotes] = useState<NoteFile[]>([]);
  const [openNoteId, setOpenNoteId] = useState<string | null>(null);
  const [openNote, setOpenNote] = useState<Note | null>(null);
  const [preview, setPreview] = useState(false);
  const [inputs, setInputs] = useState<Note[]>([]);
  const [unsaved, setUnsaved] = useState(false);

  async function getNotes() {
    setNotes(await fetchNotes());
  }

  useEffect(() => {
    getNotes();
  }, []);

  async function getNote() {
    if (openNoteId) {
      const note = await fetchNote(openNoteId);
      setOpenNote(note);
      if (!inputs.find((n) => n.id == note.id)) {
        setInputs((prev) => [...prev, note]);
      }
    }
  }

  useEffect(() => {
    getNote();
  }, [openNoteId]);

  function checkUnsaved() {
    const note: Note | undefined = inputs.find((note) => note.id == openNoteId);
    if (!note || !openNote) return;
    if (note.content != openNote.content) {
      setUnsaved(true);
    } else {
      setUnsaved(false);
    }
  }

  useEffect(() => {
    checkUnsaved();
  }, [inputs]);

  useEffect(() => {
    checkUnsaved();
  }, [editorNotes, openNoteId, openNote]);

  function handleNoteItemClick(note: NoteFile) {
    if (!editorNotes.includes(note)) {
      setEditorNotes((prev) => [...prev, note]);
    }
    setOpenNoteId(note.id);
  }

  function handleEditorNoteItemClick(note: NoteFile) {
    setOpenNoteId(note.id);
  }

  function handleEditorNoteItemClose(note: NoteFile) {
    setEditorNotes((prev) => prev.filter((item) => item.id != note.id));
    if (openNoteId == note.id) {
      setOpenNoteId(null);
      setOpenNote(null);
    }
  }

  function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    if (!openNote) return;

    setInputs((prev) => {
      return prev.map((note) => {
        if (note.id == openNote.id) {
          return { ...note, content: e.target.value };
        } else {
          return note;
        }
      });
    });
  }

  async function saveNote() {
    if (!openNoteId || !openNote) return;
    const note: Note | undefined = inputs.find((n) => n.id == openNoteId);
    if (!note) return;
    await updateNote(openNoteId, openNote.title, note.content);
    await getNotes();
    await getNote();
    setUnsaved(false);
  }

  return (
    <div className="container mx-auto flex">
      <div className="max-w-xs min-w-3xs min-h-72 bg-muted">
        <div className="flex justify-between items-center pr-2">
          <div className="bg-muted px-5 py-4 flex gap-2">
            <Search className="rotate-y-180" />
            Explorer
          </div>
          {unsaved && <div className="size-2 bg-foreground rounded-full" onClick={saveNote}></div>}
        </div>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            setOpenNote={setOpenNoteId}
            handleClick={handleNoteItemClick}
          />
        ))}
      </div>
      <div className="flex-1 bg-muted">
        <div className="h-12 flex items-center">
          <div className="flex-1 bg-muted flex items-center">
            {editorNotes.map((note) => (
              <EditorNoteItem
                key={note.id}
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
              <DropdownMenuItem onClick={saveNote}>Save note</DropdownMenuItem>
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
            value={
              preview
                ? openNote?.htmlContent
                : openNote
                ? inputs.find((n) => n.id == openNote.id)?.content
                : ""
            }
            disabled={preview || !openNote}
            onChange={handleInput}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
