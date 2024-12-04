import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialState = {
  email: "",
  password: "",
  name: "",
  vehicleType: "",
  licenseNum: "",
  confirm: "",
  phone: "",
};

const SignUp = ({ navigation }: any) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState<null | string>(null);
  const { onRegister } = useAuth();
  const handleChange = (value: string, name: string) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const register = async () => {
    if (state.password !== state.confirm) {
      setError("Passwords do not match");
    } else if (!emailRegex.test(state.email)) {
      setError("Email is not valid");
    } else {
      const res = await onRegister!(
        state.email,
        state.password,
        state.name,
        state.phone,
        state.vehicleType,
        state.licenseNum
      );
      if (!res.ok) {
        setError(res.message);
      } else {
        console.log(res);
      }
    }
  };

  const isDisabled =
    !state.name ||
    !state.email ||
    !state.password ||
    !state.confirm ||
    !state.phone;

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
        secureTextEntry
        className="border-b border-gray-400 mb-4 py-2"
        onChangeText={(text) => handleChange(text, "confirm")}
        value={state.confirm}
      />
      <TextInput
        placeholder="Phone number"
        className="border-b border-gray-400 mb-4 py-2"
        onChangeText={(text) => handleChange(text, "phone")}
        value={state.phone}
      />
      <TextInput
        placeholder="Vehicle Type (Optional)"
        className="border-b border-gray-400 mb-4 py-2"
        onChangeText={(text) => handleChange(text, "vehicleType")}
        value={state.vehicleType}
      />
      <TextInput
        placeholder="License Number (Optional)"
        className="border-b border-gray-400 mb-8 py-2"
        onChangeText={(text) => handleChange(text, "licenseNum")}
        value={state.licenseNum}
      />
      {error && <Text className="text-red-500 text-sm mb-4">{error}</Text>}
      <TouchableOpacity
        onPress={register}
        className="bg-black px-10 py-4 rounded-md"
        disabled={isDisabled}
      >
        <Text className="text-white text-center text-lg">Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-4"
      >
        <Text className="text-center text-black">Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
