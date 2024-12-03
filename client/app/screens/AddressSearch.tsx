import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import "react-native-get-random-values";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AddressSearch: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [apiKey] = useState<string | undefined>(
    process.env.EXPO_PUBLIC_API_KEY
  );
  const route = useRoute();
  const { field, setField }: any = route.params;
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white p-4">
      <GooglePlacesAutocomplete
        styles={{ container: styles.container, textInput: styles.textInput }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        placeholder={field}
        query={{
          key: apiKey,
          language: "en",
        }}
        onPress={(data, details = null) => {
          setAddress(data.structured_formatting.main_text);
        }}
        fetchDetails={false}
        enablePoweredByContainer={false}
        minLength={2}
      />
      <TouchableOpacity
        className="bg-black py-3 mt-auto rounded flex items-center justify-center"
        onPress={() => {
          if (address.length < 2) {
            alert("Address is not valid!");
          } else {
            setField(address);
            navigation.goBack();
          }
        }}
      >
        <Text className="text-white text-lg font-bold">SELECT LOCATION</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  textInput: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
