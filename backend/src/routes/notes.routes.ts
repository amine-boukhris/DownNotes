import express from 'express';
import { createNote, getNotes } from '../controllers/notes.controller';

const router = express.Router();

router.post('/', createNote);
router.get('/', getNotes);

export default router;