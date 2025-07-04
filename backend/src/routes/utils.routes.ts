import express from "express";
import { convertMarkdownToHTML, checkGrammar } from "../controllers/utils.controller";

const router = express.Router();

router.post("/check-grammar", checkGrammar);
router.post("/convert", convertMarkdownToHTML);

export default router;
