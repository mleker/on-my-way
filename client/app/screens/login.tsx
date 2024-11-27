import { View, StyleSheet, TextInput, Button} from "react-native";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, authState } = useAuth();

  const login = async () => {
    await onLogin!(email, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
        />
        <Button onPress={login} title="Sign in"></Button>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
