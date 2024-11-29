import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button } from "react-native";
import FinishRide from "./components/RideFinish";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CreateRide from "./screens/CreateRide";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Register from "./screens/Register";
import RequestRide from "./screens/RequestRide";
import RideStatus from "./screens/RideStatus";
import RequestStatus from './screens/RequestStatus';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

const Layout = () => {
  const { authState, onLogout } = useAuth();
  const [state, setState] = useState(0);

  return (
    <Stack.Navigator>
      {/* If authenticated, show authenticated screens */}
      {!authState?.authenticated ? (
        <>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{
              title: "Landing",
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
            name="RequestStatus"
            component={RequestStatus}
            options={{
              title: "Request Status",
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
            component={FinishRide}
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

export default App;