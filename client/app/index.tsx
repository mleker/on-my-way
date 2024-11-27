import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import Login from "./screens/login";
import Register from "./screens/register";
import DriverDashboard from "./screens/driverdashboard"; // Import DriverDashboard
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
      {/* If authenticated, show Home or DriverDashboard */}
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
