import { ILocation } from './location';

export enum RideStatusEnum {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished'
}

export interface IRide {
  id: string;
  driverId: string;
  riderId?: string;
  status: RideStatusEnum;
  from: ILocation;
  to: ILocation;
  time: string;
}

export interface IRoute {
  from: string;
  to: string;
}