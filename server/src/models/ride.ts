import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  status: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  createdAt: { type: Date, required: true },
});
export default mongoose.model("Ride", rideSchema);
