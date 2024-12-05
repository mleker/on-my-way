import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IRider } from '../@types/rider';
import { fetchRequests, fetchUser } from "../services/api-service";
import { useRideRequestContext } from '../services/ride-request';
import { calculateDistance } from "../utils/distance";

interface IRidePending {
  onRiderSelect: (rider: IRider) => void;
  onCancel: () => void;
}

interface INearbyRider {
  id: string;
  name: string;
  from: string;
  to: string;
  time: number;
}

const RidePending: React.FC<IRidePending> = ({ onRiderSelect, onCancel }) => {
  const [loading, setLoading] = useState(true);
  const [nearbyRiders, setNearbyRiders] = useState<INearbyRider[]>([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const { ride, requests, setRequests } = useRideRequestContext();

  const spinAnim = useRef(new Animated.Value(0)).current; // Animation state for rotation
  const scaleAnim = useRef(new Animated.Value(1)).current; // Animation state for scaling

  useEffect(() => {
    // Spin animation
    const spin = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    spin.start();

    // Pulsing animation
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();

    const fetchNearbyRiders = async () => {
      try {
        const requests = await fetchRequests();
        setRequests(requests);

        if (!ride) {
          throw new Error("Ride not found");
        }

        const { from, to } = ride;

        const nearbyRequests = requests
          .filter((req) => {
            const distance = calculateDistance(
              from.latitude,
              from.longitude,
              req.from.latitude,
              req.from.longitude
            );
            return distance <= 2; // Filter within 2 km radius
          })
          .sort((a, b) => {
            const distA = calculateDistance(
              from.latitude,
              from.longitude,
              a.from.latitude,
              a.from.longitude
            );
            const distB = calculateDistance(
              from.latitude,
              from.longitude,
              b.from.latitude,
              b.from.longitude
            );
            return distA - distB; // Sort by proximity
          });
        
        // Get nearby riders
        let nearbyRiders: INearbyRider[] = [];
        await Promise.all(
          nearbyRequests.map(async (req) => {
            const rider = await fetchUser(req.riderId);
            nearbyRiders.push({
              id: rider._id,
              name: rider.name,
              from: req.from.name,
              to: req.to.name,
              time: Math.round(
                calculateDistance(
                  from.latitude,
                  from.longitude,
                  req.from.latitude,
                  req.from.longitude
                ) / 0.5 // Average speed of 30 km/h
              ),
            });
          })
        );
        setNearbyRiders(nearbyRiders);
      } catch (error) {
        console.error("Error fetching riders:", error);
        Alert.alert("Error", "Failed to fetch nearby riders.");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyRiders();

    return () => {
      spin.stop();
      pulse.stop();
    };
  }, [spinAnim, scaleAnim]);

  const handleSelectRider = (rider: any) => {
    onRiderSelect(rider);
    setSelectedRider(rider.id);
    Alert.alert("Rider Selected", `You selected ${rider.name}`);
  };

  // Interpolating spin animation to rotate
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (loading) {
    // Loader screen
    return (
      <View className="flex flex-grow items-center justify-center bg-white m-4">
        <View className="flex flex-grow items-center">
          <Text className="text-xl font-bold text-center mt-32 mb-12">
            Searching for a passenger...
          </Text>
          {/* Animated Loader */}
          <View className="relative">
            {/* Outer rotating circle */}
            <Animated.View
              style={{
                transform: [{ rotate: spin }],
              }}
              className="w-16 h-16 border-4 border-black rounded-full"
            />
            {/* Inner pulsing circle */}
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
              }}
              className="absolute w-8 h-8 bg-black rounded-full top-4 left-4"
            />
          </View>
        </View>
        <TouchableOpacity
          className="flex w-full border-red-500 border-solid border-4 p-4 self-end items-center"
          onPress={onCancel}
        >
          <Text className="text-red-500 font-bold text-base">CANCEL RIDE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Passenger selection screen
  return (
    <>
      <View className="p-4">
        <Text className="text-2xl font-bold text-center my-4">
          Choose your passenger
        </Text>
      </View>
      <FlatList
        className="p-4"
        data={nearbyRiders}
        keyExtractor={(rider) => rider.id}
        renderItem={({ item: rider }) => (
          <TouchableOpacity
            className={`border-solid border-black border-4 p-4 mb-4
                ${selectedRider === rider.id ? "bg-black text-white" : "text-black bg-white"}`
            }
            onPress={() => handleSelectRider(rider)}
          >
            <View>
              <View className="flex-row justify-between mb-8">
                <Text className="text-lg font-bold">{rider.name}</Text>
                <Text className="text-lg font-bold">~{rider.time} MIN AWAY</Text>
              </View>
              <View className="text-sm mt-1">
                <Text>
                  from{" "}
                  <Text className="font-bold">{rider.from || ''}</Text>
                </Text>
                <Text>
                  to{" "}
                  <Text className="font-bold">{rider.to || ''}</Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className="absolute bottom-2 right-2 bg-black rounded-full p-2 m-2"
              onPress={() =>
                Alert.alert("Chat", `Start chatting with ${rider.name}`)
              }
            >
              <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default RidePending;
