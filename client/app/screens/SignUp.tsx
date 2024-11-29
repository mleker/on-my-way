import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

const initialState = {
  email: "",
  password: "",
  name: "",
  surname: "",
};

const SignUp = ({ navigation }: any) => {
  const [state, setState] = useState(initialState);
  const { onRegister } = useAuth();
  const handleChange = (value: string, name: string) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const register = async () => {
    const res = await onRegister!(
      state.email,
      state.password,
      state.name,
      state.surname,
    );
    console.log(res);
  };
  return (
    <View className="flex-1 bg-white px-8 py-10">
      <Text className="text-2xl font-bold mb-6 text-center">Sign Up</Text>
      <TextInput
        placeholder="Name"
        className="border-b border-gray-400 mb-4 py-2"
        onChangeText={(text) => handleChange(text, "name")}
        value={state.name}
      />
      <TextInput
        placeholder="Surname"
        className="border-b border-gray-400 mb-4 py-2"
        onChangeText={(text) => handleChange(text, "surname")}
        value={state.surname}
      />
      <TextInput
        placeholder="E-mail"
        className="border-b border-gray-400 mb-4 py-2"
        onChangeText={(text) => handleChange(text, "email")}
        value={state.email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border-b border-gray-400 mb-4 py-2"
        onChangeText={(text) => handleChange(text, "password")}
        value={state.password}
      />
      <TextInput
        placeholder="Confirm password"
        className="border-b border-gray-400 mb-4 py-2"
      />
      <TextInput
        placeholder="Vehicle Type (Optional)"
        className="border-b border-gray-400 mb-4 py-2"
      />
      <TextInput
        placeholder="License Number (Optional)"
        className="border-b border-gray-400 mb-8 py-2"
      />
      <TouchableOpacity
        onPress={register}
        className="bg-black px-10 py-4 rounded-md"
      >
        <Text className="text-white text-center text-lg">Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-4"
      >
        <Text className="text-center text-blue-500">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;