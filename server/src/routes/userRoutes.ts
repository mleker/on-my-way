import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  resetPassword,
} from "../controllers/user";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", getUser);
router.patch("/:userId", updateUser);
router.post("/reset-password", resetPassword);

export default router;
