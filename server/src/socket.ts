import { Socket } from 'socket.io';
import Request, { RequestStatus } from './models/request';
import { Server } from 'socket.io';
import Ride, { RideStatus } from './models/ride';
import { request } from 'http';

enum SocketEvents {
  CREATE_REQUEST = "create_request",
  ACCEPT_REQUEST = "accept_request",
  DRIVER_ARRIVED = "driver_arrived",
  START_RIDE = "start_ride",
  FINISH_RIDE = "finish_ride",
}

enum IoEvents {
  REQUEST_CREATED = "request_created",
  REQUEST_MATCHED = "request_matched",
  DRIVER_ARRIVED = "driver_arrived",
  RIDE_STARTED = "ride_started",
  RIDE_COMPLETED = "ride_completed",
}

export const onSocketConnection = (socket: Socket, io: Server) => {
  console.log(`User connected: ${socket.id}`);

  socket.on(SocketEvents.CREATE_REQUEST, async (data) => {
    try {
      const req = await Request.create({
        riderId: data.riderId,
        from: data.from,
        to: data.to,
        status: RequestStatus.PENDING,
      });
      io.emit(IoEvents.REQUEST_CREATED, req); // Notify all connected drivers
    } catch (err) {
      socket.emit("error", { message: "Error creating request", error: err });
    }
  });

  // Accept request logic
  socket.on(SocketEvents.ACCEPT_REQUEST, async (data) => {
    try {
      const request = await Request.findById(data.requestId);
      if (!request || request.status !== RequestStatus.PENDING) {
        socket.emit("error", { message: "Request not found or already matched" });
        return;
      }

      request.status = RequestStatus.MATCHED;
      await request.save();

      const ride = await Ride.create({
        driverId: data.driverId,
        riderId: request.riderId,
        from: request.from,
        to: request.to,
        status: RideStatus.PENDING,
      });

      io.emit(IoEvents.REQUEST_MATCHED, { requestId: request._id, driverId: data.driverId });
    } catch (err) {
      socket.emit("error", { message: "Error accepting request", error: err });
    }
  });

  // Driver arrived logic
  socket.on(SocketEvents.DRIVER_ARRIVED, async (data) => {
    try {
      const ride = await Ride.findById(data.rideId);
      if (!ride || ride.status !== RideStatus.PENDING) {
        socket.emit("error", { message: "Ride not created or not pending" });
        return;
      }

      ride.driverId = data.driverId;
      await ride.save();

      io.emit(IoEvents.DRIVER_ARRIVED, { rideId: ride._id });
    } catch (err) {
      socket.emit("error", { message: "Error updating ride status", error: err });
    }
  });

  // Логика начала поездки
  socket.on(SocketEvents.START_RIDE, async (data) => {
    try {
      const ride = await Ride.findById(data.rideId);
      if (!ride || ride.status !== RideStatus.PENDING) {
        socket.emit("error", { message: "Ride not ready for starting" });
        return;
      }

      ride.status = RideStatus.IN_PROGRESS;
      await ride.save();

      io.emit(IoEvents.RIDE_STARTED, ride);
    } catch (err) {
      socket.emit("error", { message: "Error starting ride", error: err });
    }
  });

  // Finish ride logic
  socket.on(SocketEvents.FINISH_RIDE, async (data) => {
    try {
      const ride = await Ride.findById(data.rideId);
      if (!ride || ride.status !== RideStatus.IN_PROGRESS) {
        socket.emit("error", { message: "Ride not in progress" });
        return;
      }

      ride.status = RideStatus.FINISHED;
      ride.endTime = new Date();
      await ride.save();

      io.emit(IoEvents.RIDE_COMPLETED, ride);
    } catch (err) {
      socket.emit("error", { message: "Error finishing ride", error: err });
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
}
