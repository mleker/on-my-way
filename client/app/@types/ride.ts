export enum RideStatusEnum {
  PENDING = 'pending',
  PICK_UP = 'pick_up',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished'
}

export interface IRide {
  id: string;
  driverId: string;
  riderId: string;
  status: RideStatusEnum;
  pickup: string;
  dropOff: string;
  time: string;
}

export interface IRoute {
  from: string;
  to: string;
}