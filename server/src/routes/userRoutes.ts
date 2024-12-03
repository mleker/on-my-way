import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser
} from "../controllers/user";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", getUser);
router.patch("/:userId", updateUser);

export default router;
