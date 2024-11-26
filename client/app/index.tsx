import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import login from "./screens/login";
import { Button } from "react-native";

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
  return (
    // <NavigationContainer>
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
      ) : (
        <Stack.Screen name="Login" component={login}></Stack.Screen>
      )}
    </Stack.Navigator>
    // </NavigationContainer>
  );
};
