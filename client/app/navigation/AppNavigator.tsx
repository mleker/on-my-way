import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RoutesEnum } from "../@types/routes";
import { StackParams } from "../@types/stack";
import CreateRide from "../screens/CreateRide";
import Landing from "../screens/Landing";
import RideStatus from "../screens/RideStatus";
import RequestRide from "../screens/RequestRide";
import RequestStatus from "../screens/RequestStatus";
import Profile from "../screens/Profile";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Create the stack navigator
export const Stack = createNativeStackNavigator<StackParams>();

// Fix: Profile button component with navigation
const ProfileButton: React.FC = () => {
  const navigation = useNavigation<NavigationProp<StackParams>>(); // Explicitly type navigation
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(RoutesEnum.PROFILE)} // Ensure the route exists in StackParams
      style={{ marginRight: 16 }}
    >
      <Ionicons name="person-circle-outline" size={28} color="#FFFFFF" />
    </TouchableOpacity>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={RoutesEnum.LANDING}>
      <Stack.Screen
        name={RoutesEnum.LANDING}
        component={Landing}
        options={{
          title: "Landing",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => <ProfileButton />, // Fix: Render ProfileButton here
        }}
      />
      <Stack.Screen
        name={RoutesEnum.CREATE_RIDE}
        component={CreateRide}
        options={{
          title: "Create Ride",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => <ProfileButton />, // Fix: Render ProfileButton here
        }}
      />
      <Stack.Screen
        name={RoutesEnum.REQUEST_RIDE}
        component={RequestRide}
        options={{
          title: "Request Ride",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => <ProfileButton />, // Fix: Render ProfileButton here
        }}
      />
      <Stack.Screen
        name={RoutesEnum.RIDE_STATUS}
        component={RideStatus}
        options={{
          title: "Ride Status",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => <ProfileButton />, // Fix: Render ProfileButton here
        }}
      />
      <Stack.Screen
        name={RoutesEnum.REQUEST_STATUS}
        component={RequestStatus}
        options={{
          title: "Request Status",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
          headerRight: () => <ProfileButton />, // Fix: Render ProfileButton here
        }}
      />
      <Stack.Screen
        name={RoutesEnum.PROFILE}
        component={Profile}
        options={{
          title: "Profile",
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
