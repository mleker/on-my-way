import { IRequest } from './request';
import { IRide } from './ride';

export interface IRideRequestContext {
  rides: IRide[];
  requests: IRequest[];
  createRide: (ride: IRide) => void;
  createRequest: (request: IRequest) => void;
  fetchRides: () => Promise<void>;
  fetchRequests: () => Promise<void>;
}