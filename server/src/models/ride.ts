import mongoose from "mongoose";

export enum RideStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  FINISHED = "finished",
}

const rideSchema = new mongoose.Schema({
    riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicle: { type: String, required: true },
    status: { type: String, enum: [RideStatus.PENDING, RideStatus.IN_PROGRESS, RideStatus.FINISHED], default: RideStatus.PENDING },
    from: {
      name: { type: String, required: true },
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true }
    },
    to: {
      name: { type: String, required: true },
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true }
    },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
  }, { timestamps: true });

export default mongoose.model('Ride', rideSchema);

