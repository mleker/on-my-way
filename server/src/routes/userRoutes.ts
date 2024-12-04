import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  resetPassword,
} from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUser);
router.get("/:userId", getUser);
router.patch("/:userId", updateUser);
router.post("/reset-password", resetPassword);

export default router;
