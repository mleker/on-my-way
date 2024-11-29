import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { IRider, MockRiders } from '../@types/rider';

const RidePending = ({ onRiderSelect }: { onRiderSelect: (rider: IRider) => void }) => {
  const [selectedRider, setSelectedRider] = useState<IRider | null>(null);

  const handleSelectRider = (rider: IRider) => {
    setSelectedRider(rider);
    onRiderSelect(rider);
  }

  return (
    <>
      <View className='p-4'>
        <Text className="text-2xl font-bold text-center my-4">
          Choose your passenger
        </Text>
      </View>
      <FlatList
        className='p-4'
        data={MockRiders}
        keyExtractor={(rider) => rider.id}
        renderItem={({ item: rider }) => (
          <TouchableOpacity
            className={`border-solid border-black border-4 p-4 mb-4 
                ${selectedRider === rider ? "bg-black text-white" : "text-black bg-white"}`
            }
            onPress={() => handleSelectRider(rider)}
          >
            <View>
              <View className="flex-row justify-between mb-8">
                <Text className="text-lg font-bold">{rider.name} MIN AWAY</Text>
                <Text className="text-lg font-bold">~{rider.time} MIN AWAY</Text>
              </View>
              <View className="text-sm mt-1">
                <Text>
                  from {" "}
                  <Text className="font-bold">{rider.pickup}</Text>
                </Text>
                <Text>
                  to {" "}
                  <Text className="font-bold">{rider.dropOff}</Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity
              className="absolute bottom-2 right-2 bg-black rounded-full p-2 m-2"
              onPress={() =>
                Alert.alert("Chat", `Start chatting with ${rider.name}`)
              }
            >
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </>
  )
}

export default RidePending;