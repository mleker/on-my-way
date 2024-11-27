import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import RegistrationForm from "@/components/RegistrationForm";
import React, {useState} from "react";

const Register = () => {

  return (
    <View style={styles.container}>
      <RegistrationForm></RegistrationForm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

});

export default Register;
