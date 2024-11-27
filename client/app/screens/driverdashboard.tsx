import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

interface Rider {
  id: string;
  name: string;
  pickup: string;
  dropOff: string;
  distance: string;
}

const DriverDashboard: React.FC = () => {
  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [matchedRiders, setMatchedRiders] = useState<Rider[]>([]);
  const [rideInProgress, setRideInProgress] = useState(false);
  const [acceptedRiderName, setAcceptedRiderName] = useState<string | null>(
    null
  ); // State to store accepted rider's name

  const toggleOnline = () => {
    setIsOnline(!isOnline);
    Alert.alert(
      "Status Updated",
      `Driver is now ${!isOnline ? "Online" : "Offline"}`
    );
  };

  const handleFindRiders = () => {
    if (startPoint && destination) {
      const riders: Rider[] = [
        {
          id: "1",
          name: "John Doe",
          pickup: startPoint,
          dropOff: destination,
          distance: "5 km",
        },
        {
          id: "2",
          name: "Jane Smith",
          pickup: startPoint,
          dropOff: destination,
          distance: "3 km",
        },
      ];
      setMatchedRiders(riders);
    } else {
      Alert.alert("Error", "Please enter both Start Point and Destination");
    }
  };

  const handleAcceptRider = (riderId: string, riderName: string) => {
    setRideInProgress(true); // Start the ride
    setAcceptedRiderName(riderName); // Store accepted rider's name
    Alert.alert("Ride Accepted", `You accepted the ride for ${riderName}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.headerText}>Driver Dashboard</Text>

      {/* Online/Offline Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          {isOnline ? "You are Online" : "Go Online"}
        </Text>
        <Switch
          trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
          thumbColor={isOnline ? "#2563EB" : "#E5E7EB"}
          value={isOnline}
          onValueChange={toggleOnline}
        />
      </View>

      {!rideInProgress && (
        <>
          {/* Start and Destination Inputs */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Start Point"
              placeholderTextColor="#9CA3AF"
              value={startPoint}
              onChangeText={setStartPoint}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Destination"
              placeholderTextColor="#9CA3AF"
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          {/* Find Riders Button */}
          <TouchableOpacity
            style={styles.findRidersButton}
            onPress={handleFindRiders}
          >
            <Text style={styles.findRidersButtonText}>Find Riders</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Ride In Progress Box */}
      {rideInProgress ? (
        <View style={styles.rideInProgressContainer}>
          <Text style={styles.rideInProgressText}>Ride in Progress</Text>
          {acceptedRiderName && (
            <Text style={styles.rideInProgressSubText}>
              Currently driving {acceptedRiderName}. Please complete the ride
              before taking a new request.
            </Text>
          )}
        </View>
      ) : matchedRiders.length > 0 ? (
        <FlatList
          data={matchedRiders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.riderCard}>
              <Text style={styles.riderName}>{item.name}</Text>
              <Text style={styles.riderInfo}>Pickup: {item.pickup}</Text>
              <Text style={styles.riderInfo}>Drop-off: {item.dropOff}</Text>
              <Text style={styles.riderInfo}>Distance: {item.distance}</Text>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAcceptRider(item.id, item.name)}
              >
                <Text style={styles.acceptButtonText}>Accept Ride</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noRidersText}>
          No matched riders yet. Enter route details and go online to see
          matches.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 16,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2563EB",
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#374151",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  findRidersButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 16,
  },
  findRidersButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  rideInProgressContainer: {
    backgroundColor: "#D1FAE5",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  rideInProgressText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#047857",
  },
  rideInProgressSubText: {
    fontSize: 16,
    color: "#065F46",
    marginTop: 8,
    textAlign: "center",
  },
  riderCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  riderName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  riderInfo: {
    fontSize: 16,
    color: "#4B5563",
    marginTop: 4,
  },
  acceptButton: {
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  noRidersText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 16,
  },
});

export default DriverDashboard;
