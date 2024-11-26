import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import Login from "./screens/login";
import { Button } from "react-native";
import Register from "./screens/register";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
};

export default App;

export const Layout = () => {
  const { authState, onLogout } = useAuth();
  const [state, setState] = useState(0);
  return (
    <Stack.Navigator>
      {authState?.authenticated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: () => (
              <Button onPress={onLogout} title="Sign out"></Button>
            ),
          }}
        ></Stack.Screen>
      ) : state === 0 ? (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerRight: () => (
              <Button onPress={() => setState(1)} title="register"></Button>
            ),
          }}
        ></Stack.Screen>
      ) : (
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerRight: () => (
              <Button onPress={() => setState(0)} title="login"></Button>
            ),
          }}
        ></Stack.Screen>
      )}
    </Stack.Navigator>
  );
};
