import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useAuth } from "../context/AuthContext";

const initialState = {
  email: "",
  password: "",
  name: "",
  surname: "",
  gender: "",
};

const Register = () => {
  const [state, setState] = useState(initialState);
  const { onRegister } = useAuth();

  const handleChange = (value: string, name: string) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const register = async () => {
    if (
      !state.email ||
      !state.password ||
      !state.name ||
      !state.surname ||
      !state.gender
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const res = await onRegister!(
      state.email,
      state.password,
      state.name,
      state.surname,
      state.gender
    );
    console.log(res);
    Alert.alert("Success", "Registration successful!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          onChangeText={(text) => handleChange(text, "email")}
          value={state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          onChangeText={(text) => handleChange(text, "password")}
          value={state.password}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#9CA3AF"
          onChangeText={(text) => handleChange(text, "name")}
          value={state.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Surname"
          placeholderTextColor="#9CA3AF"
          onChangeText={(text) => handleChange(text, "surname")}
          value={state.surname}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          placeholderTextColor="#9CA3AF"
          onChangeText={(text) => handleChange(text, "gender")}
          value={state.gender}
        />
        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    paddingHorizontal: 16,
    gap: 20,
  },
  input: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000000",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  button: {
    backgroundColor: "#000000",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default Register;
