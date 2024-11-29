import express from "express";
import userRoutes from "./routes/userRoutes";
import requestRoutes from "./routes/requestRoutes";
import rideRoutes from "./routes/rideRoutes";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the enviroment.");
}

const PORT = process.env.PORT || 3000;
const mongodbUri: string = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/rides", rideRoutes);

mongoose
  .connect(mongodbUri, {})
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error: Error) => {
    console.error("Error connecting to database:", error);
  });
