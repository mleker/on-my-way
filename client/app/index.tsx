import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Button, Text, TouchableOpacity } from "react-native";
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
const SIGN_OUT = "SIGN OUT";

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
      <TouchableOpacity onPress={callback || onLogout}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          {callback ? title : "SIGN OUT"}
        </Text>
      </TouchableOpacity>
    );
  };

  const toggleAuthScreen = () => {
    setAuthScreen((prevScreen) => (prevScreen === "login" ? "register" : "login"));
  };

  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#000",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
      headerTitle: "", 
      headerShadowVisible: false,
    }}
    >
      {authState?.authenticated ? (
        <>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{
              headerRight: () => renderHeaderRight(SIGN_OUT),
            }}
          />
          <Stack.Screen
            name="CreateRide"
            component={CreateRide}
            options={{
              headerRight: () => renderHeaderRight(SIGN_OUT),
            }}
          />
          <Stack.Screen
            name="RequestRide"
            component={RequestRide}
            options={{
              headerRight: () => renderHeaderRight(SIGN_OUT),
            }}
          />
          <Stack.Screen
            name="RequestStatus"
            component={RequestStatus}
            options={{
              headerRight: () => renderHeaderRight(SIGN_OUT),
            }}
          />
          <Stack.Screen
            name="RideStatus"
            component={RideStatus}
            options={{
              headerRight: () => renderHeaderRight(SIGN_OUT),
            }}
          />
          <Stack.Screen
            name="FinishRide"
            component={FinishRide}
            options={{
              headerRight: () => renderHeaderRight(SIGN_OUT),
            }}
          />
        </>
      ) : (
        authScreen === "login" ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerRight: () =>
                renderHeaderRight("Register", toggleAuthScreen),
            }}
          />
        ) : (
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
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