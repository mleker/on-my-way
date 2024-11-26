import express from "express";
import {
  getUsers,
  createUser,
  loginUser,
  deleteUser,
} from "../controllers/user";
const router = express.Router();

router.get("/get", getUsers);
router.post("/reg", createUser);
router.post("/login", loginUser);
router.delete("/del", deleteUser);

export default router;
