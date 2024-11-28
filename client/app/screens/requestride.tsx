import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RequestRide: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request a Ride</Text>
      {/* Add your UI and functionality here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
});

export default RequestRide;
