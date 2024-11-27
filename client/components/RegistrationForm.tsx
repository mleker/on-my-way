import { View, TextInput, StyleSheet, Button } from "react-native";
import { useAuth } from "@/app/context/AuthContext";
import React, { useState } from "react";

const initialState = {
  email: "",
  password: "",
  name: "",
  surname: "",
  gender: "",
};

const RegistrationForm = () => {
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
      state.gender
    );
    console.log(res);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => handleChange(text, "email")}
        value={state.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => handleChange(text, "password")}
        value={state.password}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => handleChange(text, "name")}
        value={state.name}
      />
      <TextInput
        style={styles.input}
        placeholder="Surname"
        onChangeText={(text) => handleChange(text, "surname")}
        value={state.surname}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        onChangeText={(text) => handleChange(text, "gender")}
        value={state.gender}
      />
      <Button onPress={register} title="Sign up"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    gap: 10,
    width: "60%",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
});

export default RegistrationForm;
