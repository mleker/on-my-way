import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:3000";

export enum SocketEvents {
  CREATE_REQUEST = "create_request",
  ACCEPT_REQUEST = "accept_request",
  DRIVER_ARRIVED = "driver_arrived",
  START_RIDE = "start_ride",
  FINISH_RIDE = "finish_ride",
  CANSEL_RIDE = "cancel_ride",
}

export enum IoEvents {
  REQUEST_CREATED = "request_created",
  REQUEST_MATCHED = "request_matched",
  DRIVER_ARRIVED = "driver_arrived",
  RIDE_STARTED = "ride_started",
  RIDE_COMPLETED = "ride_completed",
  RIDE_CANCELED = "ride_canceled",
}

let socket: Socket | null = null;

// Initialize and return the socket instance
export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("WebSocket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  }

  return socket;
};

// Close the WebSocket connection
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
