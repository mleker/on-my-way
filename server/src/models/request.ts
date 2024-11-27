import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  riderId: { type: String, required: true },
  status: { type: String, required: true },
  location: { type: String, required: true },
  destination: { type: String, required: true },
  createdAt: { type: Date, required: true },
});
export default mongoose.model("Request", requestSchema);
