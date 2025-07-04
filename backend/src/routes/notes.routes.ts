import express from "express";
import {
  saveNote,
  getNotes,
  getNote,
  updateNote,
  checkNoteGrammar,
  deleteNote,
  convertMarkdownToHTML,
  checkGrammar,
} from "../controllers/notes.controller";

const router = express.Router();

router.get("/", getNotes);
router.get("/:noteId", getNote);
router.get("/:noteId/check-grammar", checkNoteGrammar);

router.post("/", saveNote);
router.put("/:noteId", updateNote);



router.delete("/:noteId", deleteNote);

export default router;
