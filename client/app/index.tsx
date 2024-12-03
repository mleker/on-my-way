import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import CreateRide from "./screens/CreateRide";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import RequestRide from "./screens/RequestRide";
import RequestStatus from "./screens/RequestStatus";
import RideStatus from "./screens/RideStatus";
import SignUp from "./screens/SignUp";
import AddressSearch from "./screens/AddressSearch";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Layout />
      </SafeAreaProvider>
    </AuthProvider>
  );
};

const Layout = () => {
  const { authState, onLogout } = useAuth();

  const renderHeaderRight = () => {
    return (
      <TouchableOpacity onPress={onLogout}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          SIGN OUT
        </Text>
      </TouchableOpacity>
    );
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
              headerRight: () => renderHeaderRight(),
            }}
          />
          <Stack.Screen
            name="CreateRide"
            component={CreateRide}
            options={{
              headerRight: () => renderHeaderRight(),
            }}
          />
          <Stack.Screen
            name="RequestRide"
            component={RequestRide}
            options={{
              headerRight: () => renderHeaderRight(),
            }}
          />
          <Stack.Screen
            name="RequestStatus"
            component={RequestStatus}
            options={{
              headerRight: () => renderHeaderRight(),
            }}
          />
          <Stack.Screen
            name="RideStatus"
            component={RideStatus}
            options={{
              headerRight: () => renderHeaderRight(),
            }}
          />
          <Stack.Screen
            name={"Search"}
            component={AddressSearch}
            options={{ title: "Search Address" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              headerBackVisible: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
