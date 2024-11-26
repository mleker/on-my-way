import express from "express";
import {
  getUsers,
  createUser,
  loginUser,
  deleteUser,
  profile,
} from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";
const router = express.Router();

router.get("/get", getUsers);
router.post("/reg", createUser);
router.post("/login", loginUser);
router.delete("/del", deleteUser);
router.get("/profile", authMiddleware, profile);

export default router;
