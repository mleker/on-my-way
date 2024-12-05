import express from "express";
import {
  getRides,
  createRide,
  deleteRide,
  startRide,
  completeRide,
  cancelRider
} from "../controllers/ride";

const router = express.Router();

router.get("/", getRides);
router.post("/", createRide);
router.delete("/:rideId", deleteRide);
router.patch("/:rideId/cancel-rider", cancelRider);
router.patch("/:rideId/start", startRide);
router.patch("/:rideId/complete", completeRide);

export default router;

