import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { StackParams } from "../@types/stack";
import { RoutesEnum } from "../@types/routes";
import MapViewDirections from "react-native-maps-directions";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface IMarker {
  latitude: number;
  longitude: number;
}

const initReg = {
  latitude: 51.1657,
  longitude: 10.4515,
  latitudeDelta: 6,
  longitudeDelta: 10,
};

const RequestRide: React.FC = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loca, setLoca] = useState<IMarker | null>(null);
  const navigation = useNavigation<NavigationProp<StackParams>>();
  const [reg, setReg] = useState<IRegion>(initReg);
  const [fromMarker, setFromMarker] = useState<IMarker | null>(null);
  const [toMarker, setToMarker] = useState<IMarker | null>(null);
  const [apiKey] = useState<string | undefined>(
    process.env.EXPO_PUBLIC_API_KEY
  );

  const handleCreateRequest = () => {
    if (from && to) {
      navigation.navigate(RoutesEnum.REQUEST_STATUS, {
        from,
        to,
        fromMarker,
        toMarker,
      });
    } else {
      alert("Please enter both From and To locations");
    }
  };

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
    setLoca({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
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
        return null;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch location");
      return null;
    }
  };

  const createMarkers = async () => {
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
    createMarkers();
  }, [from, to]);

  const navigateToSearch = (field: "From" | "To") => {
    navigation.navigate(RoutesEnum.SEARCH, {
      field,
      setField: (newValue: string) => {
        if (field === "From") setFrom(newValue);
        else setTo(newValue);
      },
    });
  };

  return (
    <View className="flex-1 bg-white">
      {/* Map placeholder */}
      <View className="h-1/2">
        <MapView
          className="flex-1 h-full mb-4"
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

      <TouchableOpacity
        className="bg-white border border-black p-3 text-lg mx-4 mb-4"
        onPress={() => navigateToSearch("From")}
      >
        <Text className="text-black">{from || "From"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-white border border-black p-3 text-lg mx-4 mb-4"
        onPress={() => navigateToSearch("To")}
      >
        <Text className="text-black">{to || "To"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-black mx-4 p-4 items-center"
        onPress={handleCreateRequest}
      >
        <Text className="text-lg font-bold text-white">REQUEST RIDE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestRide;
