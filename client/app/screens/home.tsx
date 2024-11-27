import { View, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import React, { useEffect, useState } from "react";

interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
}

const Home = () => {
  const { authState, onProfile } = useAuth();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const profile = async () => {
      const token = authState?.token;
      const res = await onProfile!(token as string);
      setUser(res.user);
    };
    profile();
  }, []);

  return (
    <View>
      <Text>Helo {user?.name}</Text>
      <Text>email: {user?.email}</Text>
    </View>
  );
};

export default Home;
