import mongoose, { Schema, Document, model } from 'mongoose';

// Define an interface for the Rider
export interface IRider extends Document {
  name: string;
  email: string;
  pickup: string;
  dropOff: string;
}

// Create the Mongoose schema for Rider
const RiderSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pickup: { type: String, required: true },
  dropOff: { type: String, required: true },
});

// Create the Mongoose model for Rider
const Rider = model<IRider>('Rider', RiderSchema);

export default Rider;
