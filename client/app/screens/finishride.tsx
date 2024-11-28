import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const FinishRideScreen: React.FC = ({ navigation }: any) => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);

  const dropOffLocation = {
    latitude: 52.4934, // Example drop-off: Kreuzberg, Berlin
    longitude: 13.4233,
  };

  useEffect(() => {
    const fetchLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);

      // Calculate distance and time
      const distanceToDropOff = calculateDistance(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude,
        dropOffLocation.latitude,
        dropOffLocation.longitude
      );
      setDistance(distanceToDropOff);

      // Approximate time in minutes (assuming 50km/h average speed)
      const timeToDropOff = (distanceToDropOff / 50) * 60;
      setTime(Math.ceil(timeToDropOff));
    };

    fetchLocation();
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance.toFixed(1); // Round to 1 decimal place
  };

  const handleFinishRide = () => {
    Alert.alert("Ride Finished", "Thank you for completing the ride!");
    navigation.navigate("Home"); // Redirect to Create Ride/Request Ride page
  };

  return (
    <View style={styles.container}>
      {location ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You"
              description="Your current location"
              pinColor="blue"
            />
            <Marker
              coordinate={dropOffLocation}
              title="Drop-off"
              description="Passenger's drop-off location"
              pinColor="green"
            />
          </MapView>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Distance to drop-off: {distance} km
            </Text>
            <Text style={styles.infoText}>Time left: {time} mins</Text>
          </View>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishRide}
          >
            <Text style={styles.finishButtonText}>FINISH RIDE</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.loadingText}>
          {errorMsg || "Fetching your location..."}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  map: {
    flex: 1,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    margin: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  finishButton: {
    backgroundColor: "#000000",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  finishButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555555",
    marginTop: 16,
  },
});

export default FinishRideScreen;
