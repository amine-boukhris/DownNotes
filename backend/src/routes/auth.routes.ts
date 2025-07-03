import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getuser,
  refreshAccessToken,
} from "../controllers/auth.controller";
import { protect } from "../middleware/protect";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshAccessToken);
router.get("/me", protect, getuser)

export default router;
