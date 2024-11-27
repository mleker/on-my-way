import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
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
  const navigation = useNavigation<HomeScreenNavigationProp>(); // Use typed navigation

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello {user?.name || "User"}!</Text>
      <Text>Email: {user?.email || "Not available"}</Text>
      <Button
        title="Go to Driver Dashboard"
        onPress={() => navigation.navigate("DriverDashboard")} // Navigate to DriverDashboard
      />
    </View>
  );
};

export default Home;
