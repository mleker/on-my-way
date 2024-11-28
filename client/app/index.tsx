import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import Login from "./screens/login";
import Register from "./screens/register";
import DriverDashboard from "./screens/driverdashboard";
import CreateRide from "./screens/createride";
import RequestRide from "./screens/requestride"; // Import RequestRide
import RideStatus from "./screens/ridestatus"; // Import RideStatus
import FinishRideScreen from "./screens/finishride"; // Import FinishRideScreen
import { Button } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

export default App;

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  const [state, setState] = useState(0); // Tracks whether user is on Login (0) or Register (1)

  return (
    <Stack.Navigator>
      {/* If authenticated, show authenticated screens */}
      {authState?.authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Home",
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
          <Stack.Screen
            name="DriverDashboard"
            component={DriverDashboard}
            options={{
              title: "Driver Dashboard",
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
          <Stack.Screen
            name="CreateRide"
            component={CreateRide}
            options={{
              title: "Create Ride",
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
          <Stack.Screen
            name="RequestRide"
            component={RequestRide}
            options={{
              title: "Request Ride",
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
          <Stack.Screen
            name="RideStatus"
            component={RideStatus}
            options={{
              title: "Ride Status",
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
          <Stack.Screen
            name="FinishRide"
            component={FinishRideScreen}
            options={{
              title: "Finish Ride",
              headerRight: () => <Button onPress={onLogout} title="Sign out" />,
            }}
          />
        </>
      ) : // If not authenticated, show Login or Register based on state
      state === 0 ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "Login",
            headerRight: () => (
              <Button onPress={() => setState(1)} title="Register" />
            ),
          }}
        />
      ) : (
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: "Register",
            headerRight: () => (
              <Button onPress={() => setState(0)} title="Login" />
            ),
          }}
        />
      )}
    </Stack.Navigator>
  );
};
