import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { IRequest } from "../@types/request";
import { IRide } from "../@types/ride";

interface IRideRequestContext {
  ride: IRide | null;
  rides: IRide[];
  requests: IRequest[];
  setRide: Dispatch<SetStateAction<IRide | null>>;
  setRides: React.Dispatch<React.SetStateAction<IRide[]>>;
  setRequests: React.Dispatch<React.SetStateAction<IRequest[]>>;
}

const RideRequestContext = createContext<IRideRequestContext>({
  ride: null,
  rides: [],
  requests: [],
  setRide: () => {},
  setRides: () => {},
  setRequests: () => {},
});

export const RideRequestProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ride, setRide] = useState<IRide | null>(null);
  const [rides, setRides] = useState<IRide[]>([]);
  const [requests, setRequests] = useState<IRequest[]>([]);

  return (
    <RideRequestContext.Provider value={{ ride, rides, requests, setRide, setRides, setRequests }}>
      {children}
    </RideRequestContext.Provider>
  );
};

export const useRideRequestContext = () => useContext(RideRequestContext);
