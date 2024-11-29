import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const LandingScreen = ({ navigation }: any) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold mb-6">ON MY WAY</Text>
      <Text className="text-center text-lg mb-8">
        Share Rides. Save Costs. Connect Freely.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp")}
        className="bg-black px-10 py-4 mb-4 rounded-md"
      >
        <Text className="text-white text-lg">SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="border border-black px-10 py-4 rounded-md"
      >
        <Text className="text-black text-lg">LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;