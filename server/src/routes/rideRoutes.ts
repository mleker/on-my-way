import express from "express";
import {
  getRides,
  createRide,
  deleteRide,
  startRide,
  completeRide,
} from "../controllers/ride";

const router = express.Router();

router.get("/get", getRides);
router.post("create", createRide);
router.delete("/delete", deleteRide);
router.patch("/accept", startRide);
router.patch("/complete", completeRide);

export default router;
