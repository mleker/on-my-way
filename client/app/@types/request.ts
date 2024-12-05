import { ILocation } from './location';

export enum RequestStatusEnum {
  PENDING = 'pending',
  MATCHED = 'matched',
  CANCELLED = 'cancelled',
  PICK_UP = 'pick_up',
}

export interface IRequest {
  id: string;
  riderId: string;
  status: RequestStatusEnum;
  from: ILocation;
  to: ILocation;
}