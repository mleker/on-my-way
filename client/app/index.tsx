import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import FinishRide from "./components/RideFinish";
import CreateRide from "./screens/CreateRide";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Register from "./screens/SignUp";
import RequestRide from "./screens/RequestRide";
import RideStatus from "./screens/RideStatus";
import RequestStatus from "./screens/RequestStatus";

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

  // Helper function to render a header right button
  const renderHeaderRight = (title: string, callback?: () => void) => (
    <TouchableOpacity onPress={callback || onLogout}>
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  // Toggle between Login and Register screens
  const toggleAuthScreen = () => {
    setAuthScreen((prevScreen) => (prevScreen === "login" ? "register" : "login"));
  };

  // Helper to configure screens
  const ScreenConfig = (
    name: string,
    component: React.ComponentType<any>,
    headerRight?: () => React.ReactNode
  ) => ({
    name,
    component,
    options: { headerRight },
  });

  // Authenticated screens with shared config
  const authenticatedScreens = [
    { name: "Landing", component: Landing },
    { name: "CreateRide", component: CreateRide },
    { name: "RequestRide", component: RequestRide },
    { name: "RequestStatus", component: RequestStatus },
    { name: "RideStatus", component: RideStatus },
    { name: "FinishRide", component: FinishRide },
  ];

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
        // Map through authenticated screens
        authenticatedScreens.map(({ name, component }) => (
          <Stack.Screen
            key={name}
            {...ScreenConfig(name, component, () => renderHeaderRight(SIGN_OUT))}
          />
        ))
      ) : (
        // Auth screens
        authScreen === "login" ? (
          <Stack.Screen
            {...ScreenConfig("Login", Login, () =>
              renderHeaderRight("Register", toggleAuthScreen)
            )}
          />
        ) : (
          <Stack.Screen
            {...ScreenConfig("Register", Register, () =>
              renderHeaderRight("Login", toggleAuthScreen)
            )}
          />
        )
      )}
    </Stack.Navigator>
  );
};

export default App;