import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  View
} from "react-native";
import { IRoute, RideStatusEnum } from '../@types/ride';
import { IRider } from '../@types/rider';
import { RoutesEnum } from '../@types/routes';
import { StackParams } from '../@types/stack';
import RideInProgress from '../components/RideInProgress';
import RidePending from '../components/RidePending';
import RidePickUp from '../components/RidePickUp';

const RideStatus: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParams>>();
  const [rideStatus, setRideStatus] = useState(RideStatusEnum.PENDING);
  const [selectedRider, setSelectedRider] = useState<IRider | null>(null);

  const handleCancelRide = () => {
    Alert.alert("Ride Cancelled", "Your ride has been cancelled.");
    setSelectedRider(null);
    setRideStatus(RideStatusEnum.PENDING);
  };

  const handleFinishRide = () => {
    setSelectedRider(null);
    setRideStatus(RideStatusEnum.FINISHED);
    navigation.navigate(RoutesEnum.LANDING);
    Alert.alert("Ride Finished", "Thank you for completing the ride!");
  };

  return (
    <View className="flex-1 bg-white">
      {(rideStatus === RideStatusEnum.PENDING) ? (
        <RidePending
          onRiderSelect={(rider: IRider) => {
            setSelectedRider(rider);
            setRideStatus(RideStatusEnum.PICK_UP);
          }}
        />
      ) : (rideStatus === RideStatusEnum.PICK_UP && selectedRider) ? (
        <RidePickUp
          onCancel={handleCancelRide}
          onStart={() => setRideStatus(RideStatusEnum.IN_PROGRESS)}
          rider={selectedRider}
        />
      ) : (rideStatus === RideStatusEnum.IN_PROGRESS && selectedRider) ? (
        <RideInProgress
          rider={selectedRider}
          onFinish={handleFinishRide}
        />
      ) : null
      }
    </View>
  );
};

export default RideStatus;