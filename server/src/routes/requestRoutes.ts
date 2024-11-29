import express from "express";
import { getRequests, createRequest, deleteRequest, acceptRequest } from "../controllers/request";

const router = express.Router();

router.get("/get", getRequests);
router.post("/create", createRequest);
router.delete("/delete", deleteRequest);
router.patch("/accept", acceptRequest);

export default router;
