import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import LandingScreen from "./screens/Start";
import SignUpScreen from "./screens/Register";
import LoginScreen from "./screens/Login";
import "../global.css";

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
  const { authState } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {authState?.authenticated ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
