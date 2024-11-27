import express from "express";
import { getRides } from "../controllers/ride";

const router = express.Router();

router.get("/get", getRides);


export default router;
