import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IRider, MockRiders } from '../@types/rider';
import { useRoute } from '@react-navigation/native';
import { IRoute } from '../@types/ride';

interface IRidePending {
  onRiderSelect: (rider: IRider) => void;
  onCancel: () => void;
}

const RidePending: React.FC<IRidePending> = ({ onRiderSelect, onCancel }) => {
  const [loading, setLoading] = useState(true); // State to control the screen
  const [selectedRider, setSelectedRider] = useState(null);
  const { from, to } = useRoute().params as IRoute;

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

    // Timeout to stop loading after 4 seconds
    const timeout = setTimeout(() => {
      setLoading(false); // Stop showing the loader
      spin.stop();
      pulse.stop();
    }, 4000);

    return () => {
      clearTimeout(timeout);
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
        data={MockRiders}
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
                  <Text className="font-bold">{from}</Text>
                </Text>
                <Text>
                  to{" "}
                  <Text className="font-bold">{to}</Text>
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
