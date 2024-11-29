export enum RequestStatusEnum {
  PENDING = 'pending',
  MATCHED = 'matched',
  CANCELLED = 'cancelled',
}

export interface IRequest {
  id: string;
  riderId: string;
  status: RequestStatusEnum;
  location: string;
  destination: string;
}