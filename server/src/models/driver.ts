//Using Scheme and Document libraries to store driver's interface and schema as structured objects

import mongoose, { Schema, Document, model } from 'mongoose'; //

// Define an interface for the Driver
interface IDriver extends Document {
  name: string;
  email: string;
  vehicle: string;
  isOnline: boolean;
  route: {
    startPoint: string;
    destination: string;
  };
}

// Create a Mongoose schema using the interface
const DriverSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  vehicle: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  route: {
    startPoint: { type: String },
    destination: { type: String },
  },
});

// Create the Mongoose model
const Driver = model<IDriver>('Driver', DriverSchema);

export default Driver;
