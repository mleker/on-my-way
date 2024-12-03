import express from "express";
import {
  createUser,
  loginUser,
  deleteUser,
  getUser,
  resetPassword,
} from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";
const router = express.Router();

router.post("/reg", createUser);
router.post("/login", loginUser);
router.delete("/del", deleteUser);
router.get("/profile", authMiddleware, getUser);
router.post("/reset-password", resetPassword);

export default router;
