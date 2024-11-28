import { View, Text, Button } from "react-native";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";

interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
}

const Home = () => {
  const { authState, onProfile, onLogout } = useAuth();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const profile = async () => {
      const token = authState?.token;
      const res = await onProfile!(token as string);
      setUser(res.user);
    };
    profile();
  }, []);

  const logout = async () => {
    await onLogout!();
  }

  return (
    <View>
      <Text>Helo {user?.name}</Text>
      <Text>email: {user?.email}</Text>
      <Button title="sign out" onPress={logout}></Button>
    </View>
  );
};

export default Home;
