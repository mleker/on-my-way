import { IRequest } from './request';
import { IRide } from './ride';

export interface ISocketContext {
  requests: IRequest[];
  rides: IRide[];
  sendCreateRequest: (data: IRequest) => void;
  sendAcceptRequest: (data: { requestId: string; driverId: string }) => void;
  sendStartRide: (data: { rideId: string }) => void;
  sendFinishRide: (data: { rideId: string }) => void;
}