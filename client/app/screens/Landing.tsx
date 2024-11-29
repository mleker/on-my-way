import { useNavigation, NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StackParams } from '../@types/stack';
import { IUser } from '../@types/user';
import { useAuth } from "../context/AuthContext";
import { RoutesEnum } from '../@types/routes';

const Landing: React.FC = () => {
  const { authState, onProfile } = useAuth();
  const [user, setUser] = useState<IUser | null>(null);
  const navigation = useNavigation<NavigationProp<StackParams>>();

  useEffect(() => {
    const getProfile = async () => {
      const token = authState?.token;
      if (token) {
        const res = await onProfile!(token as string);
        setUser(res.user);
      }
    };

    getProfile();
  }, [user]);

  return (
    <View className="flex-1 bg-white items-center p-4 pt-20">
      <Text className="text-4xl font-black text-center mb-8">
        Share Rides.{"\n"}Save Costs.{"\n"}Connect Freely.
      </Text>

      <TouchableOpacity
        className="bg-black py-4 w-full h-1/4 justify-center"
        onPress={() => navigation.navigate(RoutesEnum.CREATE_RIDE)}
      >
        <Text className="text-white text-center font-bold text-2xl">
          CREATE RIDE
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="py-4 w-full border-4 border-black border-solid h-1/4 justify-center"
        onPress={() => navigation.navigate(RoutesEnum.REQUEST_RIDE)}
      >
        <Text className="text-center font-bold text-2xl">
          REQUEST RIDE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Landing;