import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParams } from "../@types/stack";
import { RoutesEnum } from "../@types/routes";
import MapView from 'react-native-maps';

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
    <View className="flex-1 bg-white">
      {/* Placeholder for map */}
      <View className='h-72'>
        <MapView
          className="flex-1 h-full mb-4"
          initialRegion={{
            latitude: 52.520008,
            longitude: 13.404954,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        />
      </View>

      {/* Input fields */}
      <TextInput
        className="bg-white border border-black p-3 text-lg mx-4 mb-4"
        placeholder="From"
        placeholderTextColor="#9CA3AF"
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        className="bg-white border border-black p-3 text-lg mx-4 mb-4"
        placeholder="To"
        placeholderTextColor="#9CA3AF"
        value={to}
        onChangeText={setTo}
      />

      {/* Create Ride button */}
      <TouchableOpacity
        className="bg-black mx-4 p-4 items-center"
        onPress={handleCreateRide}
      >
        <Text className="text-lg font-bold text-white">CREATE RIDE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateRide;