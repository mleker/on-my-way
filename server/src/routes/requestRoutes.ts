import express from "express";
import { getRequests, createRequest, deleteRequest, matchRequest, cancelRequest, getActiveRequests } from "../controllers/request";

const router = express.Router();

router.get("/get", getRequests);
router.post("/create", createRequest);
router.delete("/delete/:riderId", deleteRequest);
router.patch("/match", matchRequest);
router.patch("/cancel/:riderId", cancelRequest);
router.get("/active/", getActiveRequests);

export default router;
