import { NavigationProp } from '@react-navigation/native';
import * as Location from "expo-location";
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { RoutesEnum } from '../@types/routes';
import { StackParams } from '../@types/stack';

const RideFinish: React.FC = () => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const navigation = useNavigation<NavigationProp<StackParams>>();

  // Mock locations for Berlin Airport and Kreuzberg
  const dropOffLocation = {
    latitude: 52.4934, // Kreuzberg, Berlin
    longitude: 13.4233,
  };

  const driverLocation = {
    latitude: 52.5597, // Berlin Airport
    longitude: 13.2877,
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      setLocation(driverLocation); // Using mock driver's location

      // Calculate distance and time
      const distanceToDropOff = calculateDistance(
        driverLocation.latitude,
        driverLocation.longitude,
        dropOffLocation.latitude,
        dropOffLocation.longitude
      );
      const distanceToDropOffNumber = parseFloat(distanceToDropOff);
      setDistance(distanceToDropOffNumber);

      // Approximate time in minutes (assuming 50km/h average speed)
      const timeToDropOff = (distanceToDropOffNumber / 50) * 60;
      setTime(Math.ceil(timeToDropOff));
    };

    fetchLocation();
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(1); // Round to 1 decimal place
  };

  const handleFinishRide = () => {
    Alert.alert("Ride Finished", "Thank you for completing the ride!");
    navigation.navigate(RoutesEnum.LANDING);
  };

  return (
    <View className="flex-1 bg-white">
      {location ? (
        <>
          <MapView
            className="flex-1 h-72 rounded-lg mb-4 mx-4"
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You"
              description="Your current location"
              pinColor="blue"
            />
            <Marker
              coordinate={dropOffLocation}
              title="Drop-off"
              description="Passenger's drop-off location"
              pinColor="green"
            />
          </MapView>
          <View className="bg-white p-4 rounded-lg mx-4 mb-4 shadow-lg">
            <Text className="text-lg font-bold text-black mb-2">
              Distance to drop-off: {distance} km
            </Text>
            <Text className="text-lg font-bold text-black">
              Time left: {time} mins
            </Text>
          </View>
          <TouchableOpacity
            className="bg-black p-4 mx-4 mb-4 rounded-lg items-center"
            onPress={handleFinishRide}
          >
            <Text className="text-lg font-bold text-white">FINISH RIDE</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text className="text-center text-lg text-gray-500 mt-4">
          {errorMsg || "Fetching your location..."}
        </Text>
      )}
    </View>
  );
};

export default RideFinish;