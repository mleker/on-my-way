import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  vehicleType: { type: String },
  licenseNum: { type: String },
});
export default mongoose.model("User", userSchema);
