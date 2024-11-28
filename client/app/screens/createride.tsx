import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const CreateRide: React.FC = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigation = useNavigation();

  const handleCreateRide = () => {
    if (from && to) {
      // Navigate to RideStatus screen with from and to locations
      navigation.navigate("RideStatus", { from, to });
    } else {
      alert("Please enter both From and To locations");
    }
  };

  return (
    <View style={styles.container}>
      {/* Placeholder for map */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>MAP</Text>
      </View>

      {/* Input fields */}
      <TextInput
        style={styles.input}
        placeholder="From"
        placeholderTextColor="#9CA3AF"
        value={from}
        onChangeText={setFrom}
      />
      <TextInput
        style={styles.input}
        placeholder="To"
        placeholderTextColor="#9CA3AF"
        value={to}
        onChangeText={setTo}
      />

      {/* Create Ride button */}
      <TouchableOpacity
        style={styles.createRideButton}
        onPress={handleCreateRide}
      >
        <Text style={styles.createRideText}>CREATE RIDE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  mapPlaceholder: {
    backgroundColor: "#E5E5E5",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  mapText: {
    fontSize: 18,
    color: "#9CA3AF",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  createRideButton: {
    backgroundColor: "#000000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  createRideText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default CreateRide;
