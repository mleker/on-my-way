import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { TextInput, View, Text, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";

const initReg = {
  latitude: 51.1657,
  longitude: 10.4515,
  latitudeDelta: 6,
  longitudeDelta: 10,
};

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IMarker {
  latitude: number;
  longitude: number;
}

export default function Map({ navigation }: any) {
  const [reg, setReg] = useState<IRegion>(initReg);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [fromMarker, setFromMarker] = useState<IMarker | null>(null);
  const [toMarker, setToMarker] = useState<IMarker | null>(null);
  const [apiKey] = useState<string | undefined>(
    process.env.EXPO_PUBLIC_API_KEY
  );
  const getPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }
  };

  const getLocation = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    setReg({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const geocodeAddress = async (address: string): Promise<IMarker | null> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        Alert.alert("Error", `Could not find location for "${address}"`);
        return null;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch location");
      return null;
    }
  };

  const createRide = async () => {
    if (!from || !to) {
      Alert.alert("Error", "Please enter both From and To addresses");
      return;
    }
    const fromCoords = await geocodeAddress(from);
    const toCoords = await geocodeAddress(to);

    if (fromCoords) setFromMarker(fromCoords);
    if (toCoords) setToMarker(toCoords);

    if (fromCoords && toCoords) {
      setReg({
        latitude: (fromCoords.latitude + toCoords.latitude) / 2,
        longitude: (fromCoords.longitude + toCoords.longitude) / 2,
        latitudeDelta: Math.abs(fromCoords.latitude - toCoords.latitude) * 2,
        longitudeDelta: Math.abs(fromCoords.longitude - toCoords.longitude) * 2,
      });
    }
  };

  useEffect(() => {
    getPermission();
    getLocation();
  }, []);

  return (
    <View className="flex-1">
      <View className="bg-black flex-row justify-between items-center px-4 py-3">
        <Text className="text-white text-lg font-bold">ON MY WAY</Text>
        <TouchableOpacity
          className="bg-white rounded-full p-2"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-black text-center">👤</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        <MapView
          style={{ flex: 1 }}
          initialRegion={reg}
          region={reg}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsMyLocationButton
        >
          {fromMarker && (
            <Marker
              coordinate={fromMarker}
              title="From"
              description={from}
              pinColor="blue"
            />
          )}
          {toMarker && (
            <Marker
              coordinate={toMarker}
              title="To"
              description={to}
              pinColor="green"
            />
          )}
          {fromMarker && toMarker && (
            <MapViewDirections
              origin={fromMarker}
              destination={toMarker}
              apikey={apiKey as string}
              strokeWidth={4}
              strokeColor="black"
              onError={(errorMessage) =>
                console.error("Directions API error:", errorMessage)
              }
            />
          )}
        </MapView>
      </View>

      <View className="bg-white p-5">
        <TextInput
          className="border border-black rounded px-4 py-2 mb-4"
          placeholder="from"
          value={from}
          onChangeText={(text) => setFrom(text)}
        />
        <TextInput
          className="border border-black rounded px-4 py-2 mb-4"
          placeholder="to"
          value={to}
          onChangeText={(text) => setTo(text)}
        />
        <TouchableOpacity
          className="bg-gray-400 py-3 rounded items-center"
          onPress={createRide}
        >
          <Text className="text-white text-lg font-bold">CREATE RIDE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
