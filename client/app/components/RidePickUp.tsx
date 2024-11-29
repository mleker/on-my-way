import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { IRider } from '../@types/rider';
import { IDriver } from '../@types/driver';

interface IRidePickUp {
  rider?: IRider;
  driver?: IDriver;
  onStart: () => void;
  onCancel: () => void;
}

const RidePickUp: React.FC<IRidePickUp> = ({ rider, driver, onStart, onCancel }) => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);

  const handleDirections = () => {
    Alert.alert("Directions", "Open Google Maps for directions.");
  };

  const handleChat = (name: string) => {
    Alert.alert("Chat", `Start chatting with ${name}`);
  };

  const handleCall = (name: string) => {
    Alert.alert("Call", `Calling ${name}`);
  };

  const handleStartRide = () => {
    Alert.alert("Ride Started", "You have started the ride.");
    onStart();
  };

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

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (driver) {
      timeout = setTimeout(() => {
        onStart();
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [driver, onStart]);

  return (
    <>
      {/* Map Section */}
      <MapView
        className="flex-1 h-72 mb-4"
        initialRegion={{
          latitude: 52.520008,
          longitude: 13.404954,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: 52.520008,
            longitude: 13.404954,
          }}
          title="Driver"
          description="Your current location"
          pinColor="blue"
        />
        {rider && (
          <Marker
            coordinate={{
              latitude: 52.499508,
              longitude: 13.397634,
            }}
            title={rider.name}
            description="Passenger Pickup Location"
            pinColor="green"
          />
        )}
        {driver && (
          <Marker
            coordinate={{
              latitude: 52.499508,
              longitude: 13.397634,
            }}
            title={driver.name}
            description="Pickup Location"
            pinColor="green"
          />
        )}
        <Polyline
          coordinates={[
            { latitude: 52.520008, longitude: 13.404954 },
            { latitude: 52.499508, longitude: 13.397634 },
          ]}
          strokeColor="#0000FF"
          strokeWidth={3}
        />
      </MapView>

      {/* Rider Info Section */}
      <View className="p-4 mb-4 items-center">
        {rider && (
          <Text className="text-xl text-center">
            Your passenger {" "}
            <Text className='text-xl font-bold'>
              {rider?.name}{" "}
            </Text>
            is ~{rider.time} mins away and waiting for you
          </Text>
        )}

        {driver && (
          <Text className="text-xl text-center">
            Your driver {" "}
            <Text className='text-xl font-bold'>
              {driver?.name}{" "}
            </Text>
            is coming for you in ~{driver.time} mins
          </Text>
        )}

        <View className="flex-row justify-center mt-4 space-x-4">
          <TouchableOpacity
            className="bg-black rounded-full p-4"
            onPress={handleDirections}
          >
            <MaterialIcons name="directions" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-black rounded-full p-4"
            onPress={() => handleChat(rider ? (rider.name) : (driver?.name || "Driver"))}
          >
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-black rounded-full p-4"
            onPress={() => handleCall(rider ? (rider.name) : (driver?.name || "Driver"))}
          >
            <Ionicons name="call-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      {rider && (
        <View className="flex-row justify-between m-4 space-x-4">
          <TouchableOpacity
            className="flex-1 bg-black p-4 border-4 items-center"
            onPress={handleStartRide}
          >
            <Text className="text-white font-bold text-base">START RIDE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 border-red-500 border-solid border-4 p-4 items-center"
            onPress={onCancel}
          >
            <Text className="text-red-500 font-bold text-base">CANCEL RIDE</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default RidePickUp;