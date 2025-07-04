import { Request, Response } from "express";
import prisma from "../prisma";
import { marked } from "marked";
import { fakeCheckGrammarAPI } from "../utils/notes";

export const getNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const notes = await prisma.note.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({ message: "Notes fetched successfully", notes });
  } catch (error) {
    res.status(500).json({ error: "Server error: getNotes failed" });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user?.userId;

    const note = await prisma.note.findUnique({ where: { id: noteId } });

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    if (note?.userId != userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    res.status(200).json({ message: "Note fetched successfully", note });
  } catch (error) {
    res.status(500).json({ error: "Server error: getNote failed" });
  }
};

export const saveNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: "Missing note data" });
      return;
    }
    const userId = req.user!.userId;

    const htmlContent = await marked(content);

    const note = await prisma.note.create({
      data: {
        title,
        content,
        htmlContent,
        userId,
      },
    });

    res.status(201).json({ message: "Note saved", note });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user?.userId;
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: "Missing note data" });
      return;
    }

    const note = await prisma.note.findUnique({ where: { id: noteId } });

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    if (note?.userId != userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const htmlContent = await marked(content);

    const updated = await prisma.note.update({
      where: { id: note.id },
      data: {
        title,
        content,
        htmlContent,
      },
    });

    res.status(200).json({ message: "Note updated successfully", note: updated });
  } catch (error) {
    res.status(500).json({ error: "Server error: udpateNote failed" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user?.userId;

    const note = await prisma.note.findUnique({ where: { id: noteId } });

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    if (note?.userId != userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await prisma.note.delete({ where: { id: note.id } });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error: deleteNote failed" });
  }
};

export const checkNoteGrammar = async (req: Request, res: Response) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user?.userId;

    const note = await prisma.note.findUnique({ where: { id: noteId } });

    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    if (note?.userId != userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const issues = fakeCheckGrammarAPI(note.content);
    res.status(200).json({ message: "Note grammar checked successfully", issues });
  } catch (error) {
    res.status(500).json({ error: "Server error: checkNoteGrammar failed" });
  }
};

