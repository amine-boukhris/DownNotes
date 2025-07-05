import { fakeCheckGrammarAPI } from "../utils/notes";
import { Request, Response } from "express";
import { marked } from "marked";

export const convertMarkdownToHTML = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ error: "Missing note content" });
      return;
    }

    const htmlContent = await marked(content);
    res.status(200).json({ message: "Content converted successfully", htmlContent });
  } catch (error) {
    res.status(500).json({ error: "Server error: convertMarkdownToHTML failed" });
  }
};

export const checkGrammar = (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) {
    res.status(400).json({ error: "Missing note content" });
    return;
  }

  const issues = fakeCheckGrammarAPI(content);
  res.status(200).json({ message: `${issues.length} issues found`, issues });
};
