import express from "express";
import { getRequests, createRequest, deleteRequest, matchRequest, cancelRequest, getActiveRequests } from "../controllers/request";

const router = express.Router();

router.get("/", getRequests);
router.post("/", createRequest);
router.delete("/:requestId/delete", deleteRequest);
router.patch("/:requestId/match", matchRequest);
router.patch("/:requestId/cancel", cancelRequest);
router.get("/active/", getActiveRequests);

export default router;
