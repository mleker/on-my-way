import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { initializeSocket, disconnectSocket, IoEvents, SocketEvents } from "../services/socket-service";
import { IRequest, RequestStatusEnum } from "../@types/request";
import { IRide, RideStatusEnum } from "../@types/ride";

interface ISocketContext {
  requests: IRequest[];
  rides: IRide[];
  socket: Socket | null;
  sendCreateRequest: (data: IRequest) => void;
  sendAcceptRequest: (data: { requestId: string; driverId: string }) => void;
  sendStartRide: (data: { rideId: string }) => void;
  sendFinishRide: (data: { rideId: string }) => void;
}

const SocketContext = createContext<ISocketContext>({
  requests: [],
  rides: [],
  socket: null,
  sendCreateRequest: () => {},
  sendAcceptRequest: () => {},
  sendStartRide: () => {},
  sendFinishRide: () => {},
});

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [requests, setRequests] = useState<IRequest[]>([]);
  const [rides, setRides] = useState<IRide[]>([]);

  useEffect(() => {
    const newSocket = initializeSocket();
    setSocket(newSocket);

    // Handle incoming socket events
    newSocket.on(IoEvents.REQUEST_CREATED, (data: IRequest) => {
      console.log("Request created:", data);
      setRequests((prev) => [...prev, data]);
    });

    newSocket.on(IoEvents.REQUEST_MATCHED, (data: { requestId: string; driverId: string }) => {
      console.log("Request matched:", data);
      setRequests((prev) =>
        prev.map((req) =>
          req.id === data.requestId ? { ...req, status: RequestStatusEnum.MATCHED } : req
        )
      );
    });

    newSocket.on(IoEvents.RIDE_STARTED, (data: IRide) => {
      console.log("Ride started:", data);
      setRides((prev) =>
        prev.map((ride) =>
          ride.id === data.id ? { ...ride, status: RideStatusEnum.IN_PROGRESS } : ride
        )
      );
    });

    newSocket.on(IoEvents.RIDE_COMPLETED, (data: IRide) => {
      console.log("Ride completed:", data);
      setRides((prev) =>
        prev.map((ride) =>
          ride.id === data.id ? { ...ride, status: RideStatusEnum.FINISHED, endTime: data.to } : ride
        )
      );
    });

    newSocket.on(IoEvents.RIDE_CANCELED, (data: { rideId: string }) => {
      console.log("Ride canceled:", data);
      setRides((prev) => prev.filter((ride) => ride.id !== data.rideId));
    });

    return () => {
      newSocket.disconnect();
      disconnectSocket();
    };
  }, []);

  // Emit socket events
  const sendCreateRequest = (data: IRequest) => {
    if (socket) socket.emit(SocketEvents.CREATE_REQUEST, data);
  };

  const sendAcceptRequest = (data: { requestId: string; driverId: string }) => {
    if (socket) socket.emit(SocketEvents.ACCEPT_REQUEST, data);
  };

  const sendStartRide = (data: { rideId: string }) => {
    if (socket) socket.emit(SocketEvents.START_RIDE, data);
  };

  const sendFinishRide = (data: { rideId: string }) => {
    if (socket) socket.emit(SocketEvents.FINISH_RIDE, data);
  };

  const value = {
    requests,
    rides,
    socket,
    sendCreateRequest,
    sendAcceptRequest,
    sendStartRide,
    sendFinishRide,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
