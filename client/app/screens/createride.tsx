import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParams } from "../@types/stack";
import { RoutesEnum } from "../@types/routes";

const CreateRide: React.FC = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigation = useNavigation<NavigationProp<StackParams>>();

  const handleCreateRide = () => {
    if (from && to) {
      navigation.navigate(RoutesEnum.RIDE_STATUS, { from, to });
    } else {
      alert("Please enter both From and To locations");
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Placeholder for map */}
      <View className="bg-gray-200 h-52 justify-center items-center mb-4 rounded-lg">
        <Text className="text-lg text-gray-500">MAP</Text>
      </View>

      {/* Input fields */}
      <TextInput
        className="bg-white border border-black rounded-lg p-3 text-lg mb-4"
        placeholder="From"
        placeholderTextColor="#9CA3AF"
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        className="bg-white border border-black rounded-lg p-3 text-lg mb-4"
        placeholder="To"
        placeholderTextColor="#9CA3AF"
        value={to}
        onChangeText={setTo}
      />

      {/* Create Ride button */}
      <TouchableOpacity
        className="bg-black p-4 rounded-lg items-center"
        onPress={handleCreateRide}
      >
        <Text className="text-lg font-bold text-white">CREATE RIDE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRide;