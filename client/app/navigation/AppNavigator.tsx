import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RoutesEnum } from '../@types/routes';
import { StackParams } from '../@types/stack';
import CreateRide from "../screens/CreateRide";
import Landing from "../screens/Landing";
import RideStatus from "../screens/RideStatus";
import RequestRide from '../screens/RequestRide';
import RequestStatus from '../screens/RequestStatus';

// Create the stack navigator
export const Stack = createNativeStackNavigator<StackParams>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={RoutesEnum.LANDING}>
      <Stack.Screen
        name={RoutesEnum.LANDING}
        component={Landing}
        options={{
          title: RoutesEnum.LANDING,
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      // how to pass RideStateEnum.
      <Stack.Screen
        name={RoutesEnum.CREATE_RIDE}
        
        component={CreateRide}
        options={{
          title: RoutesEnum.CREATE_RIDE,
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name={RoutesEnum.REQUEST_RIDE}
        component={RequestRide}
        options={{
          title: RoutesEnum.REQUEST_RIDE,
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name={RoutesEnum.RIDE_STATUS}
        component={RideStatus}
        options={{
          title: RoutesEnum.RIDE_STATUS,
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Stack.Screen
        name={RoutesEnum.REQUEST_STATUS}
        component={RequestStatus}
        options={{
          title: RoutesEnum.REQUEST_STATUS,
          headerStyle: { backgroundColor: "#000000" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;