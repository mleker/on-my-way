import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { IDriver, MockDrivers } from "../@types/driver";
import { RequestStatusEnum } from "../@types/request";
import { RideStatusEnum } from "../@types/ride";
import { RoutesEnum } from "../@types/routes";
import { StackParams } from "../@types/stack";
import RequestPending from "../components/RequestPending";
import RideInProgress from "../components/RideInProgress";
import RidePickUp from "../components/RidePickUp";
import { useSocket } from '../context/SocketContext';
import { IoEvents } from '../services/socket-service';
import { fetchUser } from '../services/api-service';

const RequestStatus: React.FC = () => {
  const route = useRoute();
  const { socket } = useSocket();
  const { fromMarker }: any = route.params;
  const navigation = useNavigation<NavigationProp<StackParams>>();
  const [requestStatus, setRequestStatus] = useState(RequestStatusEnum.PENDING);
  const [driver, setDriver] = useState<IDriver | null>(null);
  const [rideStatus, setRideStatus] = useState<RideStatusEnum | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on(IoEvents.REQUEST_MATCHED, async (data: { requestId: string; driverId: string }) => {
        Alert.alert("Driver Matched", "A driver has accepted your ride request.");
        const driver = await fetchUser(data.driverId);
        setDriver(driver);
      });

      socket.on(IoEvents.RIDE_COMPLETED, () => {
        setRideStatus(RideStatusEnum.FINISHED);
        setDriver(null);
        setRideStatus(RideStatusEnum.FINISHED);
        navigation.navigate(RoutesEnum.LANDING);
        Alert.alert("Ride Completed", "Thank you for completing the ride!");
      });

      return () => {
        socket.off(IoEvents.REQUEST_MATCHED);
        socket.off(IoEvents.RIDE_COMPLETED);
      }
    };
  }, []);

  const handleCancelRequest = () => {
    Alert.alert("Request Cancelled", "Your ride request has been cancelled.");
    setRequestStatus(RequestStatusEnum.CANCELLED);
    navigation.navigate(RoutesEnum.LANDING);
  };

  const handleCancelRide = () => {
    Alert.alert("Ride Cancelled", "Your ride has been cancelled.");
    setDriver(null);
    setRequestStatus(RequestStatusEnum.CANCELLED);
    navigation.navigate(RoutesEnum.LANDING);
  };

  return (
    <View className="flex-1 bg-white">
      {requestStatus === RequestStatusEnum.PENDING && !driver ? (
        <RequestPending onCancel={handleCancelRequest} />
      ) : requestStatus === RequestStatusEnum.PENDING && driver ? (
        <RidePickUp
          onCancel={handleCancelRide}
          onStart={() => setRequestStatus(RequestStatusEnum.MATCHED)}
          driver={driver}
          riderLoc={fromMarker}
        />
      ) : requestStatus === RequestStatusEnum.MATCHED ? (
        <RideInProgress driver={driver} viewedByDriver={false} />
      ) : null}
    </View>
  );
};

export default RequestStatus;
