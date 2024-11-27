import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home";
import DriverDashboard from "../screens/driverdashboard";

// Define the type for the navigation stack
export type RootStackParamList = {
  Home: undefined;
  DriverDashboard: undefined;
  Login: undefined;
  Register: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
