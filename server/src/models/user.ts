import mongoose, { Schema, Document } from "mongoose";
import { Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  vehicleType?: string;
  licenseNum?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, required: true},
  vehicleType: { type: String },
  licenseNum: { type: String },
});

export default mongoose.model("User", userSchema);

