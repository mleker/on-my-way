import express from "express";
import {
  getRides,
  createRide,
  deleteRide,
  startRide,
  completeRide,
} from "../controllers/ride";

const router = express.Router();

router.get("/", getRides);
router.post("/", createRide);
router.delete("/:rideId", deleteRide);
router.patch("/:rideId/start", startRide);
router.patch("/:rideId/complete", completeRide);

export default router;

