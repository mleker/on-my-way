import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import CreateRide from "../screens/createride";
import RequestRide from "../screens/requestride"; // Import RequestRide
import RideStatus from "../screens/ridestatus";
import FinishRideScreen from "../screens/finishride";

// Define the type for the navigation stack
export type RootStackParamList = {
  Home: undefined;
  CreateRide: undefined;
  RequestRide: undefined;
  Login: undefined;
  Register: undefined;
  RideStatus: undefined;
  FinishRide: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="CreateRide"
        component={CreateRide}
        options={{
          title: "Create Ride",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="RequestRide"
        component={RequestRide}
        options={{
          title: "Request Ride",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="RideStatus"
        component={RideStatus}
        options={{
          title: "Ride Status",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name="FinishRide"
        component={FinishRideScreen}
        options={{
          title: "Finsh Ride",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
