import mongoose from "mongoose";

export enum RequestStatus {
  PENDING = "pending",
  MATCHED = "matched",
  CANCELED = "canceled",
}

const requestSchema = new mongoose.Schema({
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
  status: { type: String, enum: [RequestStatus.PENDING, RequestStatus.MATCHED, RequestStatus.CANCELED], default: RequestStatus.PENDING },
  estimatedFare: { type: Number }
});

export default mongoose.model('RideRequest', requestSchema);