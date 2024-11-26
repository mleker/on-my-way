import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const initialState = {
  email: "",
  password: "",
  name: "",
  surname: "",
  gender: ""
};

const Register = () => {
  const [state, setState] = useState(initialState);
  const { onRegister } = useAuth();
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const register = async () => {
    const res = await onRegister!(state.email, state.password, state.name, state.surname, state.gender);
    console.log(res)
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={handleChange}
          value={state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={handleChange}
          value={state.password}
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={handleChange}
          value={state.name}
        />
        <TextInput
          style={styles.input}
          placeholder="Surname"
          onChangeText={handleChange}
          value={state.surname}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          onChangeText={handleChange}
          value={state.gender}
        />
        <Button onPress={register} title="Sign up"></Button>
      </View>
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

export default Register;
