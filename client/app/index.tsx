import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button } from "react-native";
import FinishRide from "./components/RideFinish";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CreateRide from "./screens/CreateRide";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Register from "./screens/SignUp";
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
  const [authScreen, setAuthScreen] = useState<"login" | "register">("register");

  const renderHeaderRight = (title: string, callback?: () => void) => {
    return (
      <Button
        onPress={callback || onLogout}
        title={callback ? title : "Sign out"}
      />
    );
  };

  const toggleAuthScreen = () => {
    setAuthScreen((prevScreen) => (prevScreen === "login" ? "register" : "login"));
  };

  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{
              title: "Landing",
              headerRight: () => renderHeaderRight("Sign out"),
            }}
          />
          <Stack.Screen
            name="CreateRide"
            component={CreateRide}
            options={{
              title: "Create Ride",
              headerRight: () => renderHeaderRight("Sign out"),
            }}
          />
          <Stack.Screen
            name="RequestRide"
            component={RequestRide}
            options={{
              title: "Request Ride",
              headerRight: () => renderHeaderRight("Sign out"),
            }}
          />
          <Stack.Screen
            name="RequestStatus"
            component={RequestStatus}
            options={{
              title: "Request Status",
              headerRight: () => renderHeaderRight("Sign out"),
            }}
          />
          <Stack.Screen
            name="RideStatus"
            component={RideStatus}
            options={{
              title: "Ride Status",
              headerRight: () => renderHeaderRight("Sign out"),
            }}
          />
          <Stack.Screen
            name="FinishRide"
            component={FinishRide}
            options={{
              title: "Finish Ride",
              headerRight: () => renderHeaderRight("Sign out"),
            }}
          />
        </>
      ) : (
        authScreen === "login" ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Login",
              headerRight: () =>
                renderHeaderRight("Register", toggleAuthScreen),
            }}
          />
        ) : (
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: "Register",
              headerRight: () =>
                renderHeaderRight("Login", toggleAuthScreen),
            }}
          />
        )
      )}
    </Stack.Navigator>
  );
};

export default App;