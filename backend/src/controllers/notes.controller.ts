import { Request, Response } from "express";
import prisma from "../prisma";
import { marked } from "marked"; // For markdown parsing

export const createNote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;

    // Convert markdown to HTML
    const htmlContent = await marked(content);

    const note = await prisma.note.create({
      data: {
        title,
        content,
        htmlContent,
        userId,
      },
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    const notes = await prisma.note.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
