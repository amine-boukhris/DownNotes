import { marked } from "marked";
import { fakeCheckGrammarAPI } from "../utils/notes";
import { Request, Response } from "express";

export const convertMarkdownToHTML = async (req: Request, res: Response) => {
  const { content } = req.body;
  if (!content) {
    res.status(400).json({ error: "Missing note content" });
    return;
  }

  const htmlContent = await marked(content);
  res.status(200).json({ htmlContent });
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
