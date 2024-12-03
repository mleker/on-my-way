import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import requestRoutes from "./routes/requestRoutes";
import rideRoutes from "./routes/rideRoutes";
import userRoutes from "./routes/userRoutes";
import seedDb from './seed';
import { onSocketConnection } from './socket';

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the enviroment.");
}

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/rides", rideRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/onmywaydb");
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

// Socket.io connection logic
io.on("connection", (socket) => onSocketConnection(socket, io));

const startServer = async () => {
  await connectDB();
  await seedDb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();



