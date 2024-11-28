import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

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
  const navigation = useNavigation();
  const { from, to } = route.params as RouteParams;

  const [isSearching, setIsSearching] = useState(true); // Added state for searching
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

  useEffect(() => {
    if (isSearching) {
      // Simulate a delay for the "searching" process
      const timeout = setTimeout(() => {
        setIsSearching(false);
      }, 5000); // 5 seconds delay
      return () => clearTimeout(timeout); // Clean up timeout
    }
  }, [isSearching]);

  const handleSelectRider = (id: string) => {
    setSelectedRider(id);
    setRideInProgress(true);
  };

  const handleCancelRide = () => {
    Alert.alert("Ride Cancelled", "Your ride has been cancelled.");
    setSelectedRider(null);
    setRideInProgress(false);
    navigation.navigate("Home"); // Navigate back to Home
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

  const selectedRiderData = riders.find((rider) => rider.id === selectedRider);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FIND A PASSENGER FOR YOUR RIDE</Text>
      <Text style={styles.subtitle}>
        from {from} to {to}
      </Text>

      {isSearching ? (
        <View style={styles.searchingContainer}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={styles.searchingText}>Searching for a rider...</Text>
          <View style={styles.cancelButtonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancelRide}
            >
              <Text style={styles.cancelButtonText}>CANCEL RIDE</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : rideInProgress ? (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 52.520008,
              longitude: 13.404954,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={{
                latitude: 52.520008,
                longitude: 13.404954,
              }}
              title="Driver"
              description="Your current location"
              pinColor="blue"
            />
            {selectedRiderData && (
              <Marker
                coordinate={{
                  latitude: 52.499508,
                  longitude: 13.397634,
                }}
                title={selectedRiderData.name}
                description="Passenger Pickup Location"
                pinColor="green"
              />
            )}
            <Polyline
              coordinates={[
                { latitude: 52.520008, longitude: 13.404954 },
                { latitude: 52.499508, longitude: 13.397634 },
              ]}
              strokeColor="#0000FF"
              strokeWidth={3}
            />
          </MapView>

          <View style={styles.rideInProgress}>
            <Text style={styles.rideInProgressText}>Selected Rider</Text>
            <Text style={styles.rideInProgressSubText}>
              You are driving with {selectedRiderData?.name}
            </Text>
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

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartRide}
            >
              <Text style={styles.startButtonText}>START RIDE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButtonSecondary}
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
  searchingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  searchingText: {
    fontSize: 16,
    color: "#555555",
    marginTop: 8,
    marginBottom: 16,
  },
  cancelButtonContainer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    paddingHorizontal: 16,
  },
  cancelButton: {
    backgroundColor: "#FF0000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  cancelButtonSecondary: {
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
    borderColor: "#FFD700",
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
    paddingHorizontal: 16,
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
});

export default RideStatus;
