import { IMarker } from "../screens/RequestRide";

export type StackParams = {
  Landing: undefined;
  CreateRide: undefined;
  RequestRide: undefined;
  Login: undefined;
  Register: undefined;
  RideStatus: {
    from: string;
    to: string;
    fromMarker: IMarker | null;
    toMarker: IMarker | null;
  };
  RequestStatus: {
    from: string;
    to: string;
    fromMarker: IMarker | null;
    toMarker: IMarker | null;
  };
  FinishRide: undefined;
  Search: { field: "From" | "To"; setField: (newValue: string) => void };
};
