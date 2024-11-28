import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native"; // Added useNavigation
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Added MaterialIcons for directions

interface RouteParams {
  from: string;
  to: string;
}

interface User {
  id: string;
  name: string;
  pickup: string;
  dropOff: string;
  time: string;
}

const RideStatus: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Used for navigation
  const { from, to } = route.params as RouteParams;

  const [riders, setRiders] = useState<User[]>([
    {
      id: "1",
      name: "Pavlo",
      pickup: from,
      dropOff: to,
      time: "5 MIN AWAY",
    },
    {
      id: "2",
      name: "Adil",
      pickup: from,
      dropOff: to,
      time: "6 MIN AWAY",
    },
  ]);

  const [selectedRider, setSelectedRider] = useState<string | null>(null);
  const [rideInProgress, setRideInProgress] = useState(false);

  const handleSelectRider = (id: string) => {
    setSelectedRider(id);
    setRideInProgress(true);
  };

  const handleCancelRide = () => {
    Alert.alert("Ride Cancelled", "Your ride has been cancelled.");
    setSelectedRider(null);
    setRideInProgress(false);
  };

  const handleDirections = () => {
    Alert.alert("Directions", "Open Google Maps for directions.");
  };

  const handleChat = (name: string) => {
    Alert.alert("Chat", `Start chatting with ${name}`);
  };

  const handleCall = (name: string) => {
    Alert.alert("Call", `Calling ${name}`);
  };

  const handleStartRide = () => {
    Alert.alert("Ride Started", "You have started the ride.");
    navigation.navigate("FinishRide");
  };

  // Get selected rider's data
  const selectedRiderData = riders.find((rider) => rider.id === selectedRider);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FIND A PASSENGER FOR YOUR RIDE</Text>
      <Text style={styles.subtitle}>
        from {from} to {to}
      </Text>

      {rideInProgress ? (
        <>
          {/* Map with Marker for the selected rider */}
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 52.520008, // Latitude for Berlin
              longitude: 13.404954, // Longitude for Berlin
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {/* Driver's location */}
            <Marker
              coordinate={{
                latitude: 52.520008,
                longitude: 13.404954,
              }}
              title="Driver"
              description="Your current location"
              pinColor="blue"
            />
            {/* Selected Rider's location */}
            {selectedRiderData && (
              <Marker
                coordinate={{
                  latitude: 52.499508, // Example pickup coordinates
                  longitude: 13.397634,
                }}
                title={selectedRiderData.name}
                description="Passenger Pickup Location"
                pinColor="green"
              />
            )}
            {/* Polyline for route */}
            <Polyline
              coordinates={[
                { latitude: 52.520008, longitude: 13.404954 }, // Driver's location
                { latitude: 52.499508, longitude: 13.397634 }, // Rider's location
              ]}
              strokeColor="#0000FF"
              strokeWidth={3}
            />
          </MapView>

          {/* Ride in Progress Details */}
          <View style={styles.rideInProgress}>
            <Text style={styles.rideInProgressText}>Selected Rider</Text>
            <Text style={styles.rideInProgressSubText}>
              You are driving with {selectedRiderData?.name}
            </Text>
            {/* Directions, Chat, and Call Buttons */}
            <View style={styles.contactButtons}>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={handleDirections}
              >
                <MaterialIcons name="directions" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => handleChat(selectedRiderData?.name || "Rider")}
              >
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.contactButton}
                onPress={() => handleCall(selectedRiderData?.name || "Rider")}
              >
                <Ionicons name="call-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Start and Cancel Buttons */}
          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartRide} // Navigate to FinishRide
            >
              <Text style={styles.startButtonText}>START RIDE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelRide}
            >
              <Text style={styles.cancelButtonText}>CANCEL RIDE</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <FlatList
          data={riders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.riderCard,
                selectedRider === item.id && styles.selectedRiderCard,
              ]}
              onPress={() => handleSelectRider(item.id)}
            >
              <View>
                <Text style={styles.riderName}>{item.name}</Text>
                <Text style={styles.riderDetails}>
                  from {item.pickup} to {item.dropOff}
                </Text>
                <Text style={styles.riderTime}>{item.time}</Text>
              </View>
              <TouchableOpacity
                style={styles.chatIconContainer}
                onPress={() =>
                  Alert.alert("Chat", `Start chatting with ${item.name}`)
                }
              >
                <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555555",
    marginBottom: 16,
  },
  map: {
    flex: 1,
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  riderCard: {
    backgroundColor: "#000000",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    position: "relative",
  },
  selectedRiderCard: {
    borderWidth: 2,
    borderColor: "#FFD700", // Highlight with gold border when selected
  },
  riderName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  riderDetails: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 4,
  },
  riderTime: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 4,
  },
  chatIconContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#333333",
    borderRadius: 16,
    padding: 8,
  },
  rideInProgress: {
    padding: 16,
    backgroundColor: "#E5E5E5",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  rideInProgressText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
  },
  rideInProgressSubText: {
    fontSize: 14,
    color: "#555555",
    textAlign: "center",
  },
  contactButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  contactButton: {
    backgroundColor: "#000000",
    borderRadius: 32,
    padding: 16,
    marginHorizontal: 8,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  startButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF0000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default RideStatus;
