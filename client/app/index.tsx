import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { RoutesEnum } from './@types/routes';
import { AuthProvider, useAuth } from "./context/AuthContext";
import AddressSearch from "./screens/AddressSearch";
import CreateRide from './screens/CreateRide';
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import RequestRide from "./screens/RequestRide";
import RequestStatus from "./screens/RequestStatus";
import RideStatus from "./screens/RideStatus";
import SignUp from "./screens/SignUp";
import { SocketProvider } from './context/SocketContext';
import { RideRequestProvider } from './services/ride-request';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SocketProvider>
          <RideRequestProvider>
            <Layout />
          </RideRequestProvider>
        </SocketProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
};

const Layout = () => {
  const { authState } = useAuth();

  // Updated header to show profile icon
  const renderHeaderRight = (navigation: NativeStackNavigationProp<ParamListBase>) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate(RoutesEnum.PROFILE)}>
        <Icon
          name="person-circle-outline"
          size={28}
          color="white"
          style={{ marginRight: 15 }}
        />
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
            options={({ navigation }) => ({
              headerRight: () => renderHeaderRight(navigation),
            })}
          />
          <Stack.Screen
            name="CreateRide"
            component={CreateRide}
            options={({ navigation }) => ({
              headerRight: () => renderHeaderRight(navigation),
            })}
          />
          <Stack.Screen
            name="RequestRide"
            component={RequestRide}
            options={({ navigation }) => ({
              headerRight: () => renderHeaderRight(navigation),
            })}
          />
          <Stack.Screen
            name="RequestStatus"
            component={RequestStatus}
            options={({ navigation }) => ({
              headerRight: () => renderHeaderRight(navigation),
            })}
          />
          <Stack.Screen
            name="RideStatus"
            component={RideStatus}
            options={({ navigation }) => ({
              headerRight: () => renderHeaderRight(navigation),
            })}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTitle: "Profile",
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
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default App;
