import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator"; // Use RootStackParamList from AppNavigator

interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  gender: string;
}

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const Home: React.FC = () => {
  const { authState, onProfile } = useAuth();
  const [user, setUser] = useState<IUser | null>(null);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const profile = async () => {
      const token = authState?.token;
      if (token) {
        const res = await onProfile!(token as string);
        setUser(res.user);
      }
    };
    profile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello {user?.name || "User"}!</Text>
      <Text style={styles.email}>Email: {user?.email || "Not available"}</Text>
      <Text style={styles.tagline}>
        Share Rides.{"\n"}Save Costs.{"\n"}Connect Freely.
      </Text>

      <TouchableOpacity
        style={styles.createRideButton}
        onPress={() => navigation.navigate("CreateRide")}
      >
        <Text style={styles.buttonText}>CREATE RIDE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.requestRideButton}
        onPress={() => navigation.navigate("RequestRide")}
      >
        <Text style={styles.buttonText}>REQUEST RIDE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 32,
  },
  tagline: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 32,
  },
  createRideButton: {
    backgroundColor: "#000000", // Black background
    padding: 16,
    borderRadius: 8,
    width: "80%",
    marginBottom: 16,
  },
  requestRideButton: {
    backgroundColor: "#000000", // Black background
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
    textAlign: "center",
  },
});

export default Home;
