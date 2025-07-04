import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";
import utilsRoutes from "./routes/utils.routes";
import { protect } from "./middleware/protect";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", protect, notesRoutes);
app.use("/api/utils", utilsRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use((error: Error, req: Request, res: Response) => {
  console.error(error.stack);
  console.error(error.name);
  console.error(error.message);
  res.status(500).json({ error: "Server error: app failed" });
});

export default app;
