// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Switch,
//   TouchableOpacity,
//   FlatList,
//   Alert,
// } from "react-native";

// interface Rider {
//   id: string;
//   name: string;
//   pickup: string;
//   dropOff: string;
//   distance: string;
// }

// const DriverDashboard: React.FC = () => {
//   const [startPoint, setStartPoint] = useState("");
//   const [destination, setDestination] = useState("");
//   const [isOnline, setIsOnline] = useState(false);
//   const [matchedRiders, setMatchedRiders] = useState<Rider[]>([]);
//   const [rideInProgress, setRideInProgress] = useState(false);
//   const [acceptedRiderName, setAcceptedRiderName] = useState<string | null>(
//     null
//   );

//   const toggleOnline = () => {
//     setIsOnline(!isOnline);
//     Alert.alert(
//       "Status Updated",
//       `Driver is now ${!isOnline ? "Online" : "Offline"}`
//     );
//   };

//   const handleFindRiders = () => {
//     if (startPoint && destination) {
//       const riders: Rider[] = [
//         {
//           id: "1",
//           name: "John Doe",
//           pickup: startPoint,
//           dropOff: destination,
//           distance: "5 km",
//         },
//         {
//           id: "2",
//           name: "Jane Smith",
//           pickup: startPoint,
//           dropOff: destination,
//           distance: "3 km",
//         },
//       ];
//       setMatchedRiders(riders);
//     } else {
//       Alert.alert("Error", "Please enter both Start Point and Destination");
//     }
//   };

//   const handleAcceptRider = (riderId: string, riderName: string) => {
//     setRideInProgress(true);
//     setAcceptedRiderName(riderName);
//     Alert.alert("Ride Accepted", `You accepted the ride for ${riderName}`);
//   };

//   return (
//     <View className="flex-1 bg-gray-100 p-4">
//       {/* Header */}
//       <Text className="text-2xl font-bold text-center text-blue-600 mb-4">
//         Driver Dashboard
//       </Text>

//       {/* Online/Offline Status */}
//       <View className="flex-row items-center justify-between bg-white p-4 rounded-lg shadow mb-4">
//         <Text className="text-lg font-medium text-gray-700">
//           {isOnline ? "You are Online" : "Go Online"}
//         </Text>
//         <Switch
//           trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
//           thumbColor={isOnline ? "#2563EB" : "#E5E7EB"}
//           value={isOnline}
//           onValueChange={toggleOnline}
//         />
//       </View>

//       {!rideInProgress && (
//         <>
//           {/* Start and Destination Inputs */}
//           <View className="mb-4">
//             <TextInput
//               className="bg-white p-3 rounded-lg border border-gray-300 mb-3 text-lg text-gray-800"
//               placeholder="Enter Start Point"
//               placeholderTextColor="#9CA3AF"
//               value={startPoint}
//               onChangeText={setStartPoint}
//             />
//             <TextInput
//               className="bg-white p-3 rounded-lg border border-gray-300 text-lg text-gray-800"
//               placeholder="Enter Destination"
//               placeholderTextColor="#9CA3AF"
//               value={destination}
//               onChangeText={setDestination}
//             />
//           </View>

//           {/* Find Riders Button */}
//           <TouchableOpacity
//             className="bg-blue-600 p-4 rounded-lg items-center shadow mb-4"
//             onPress={handleFindRiders}
//           >
//             <Text className="text-lg font-bold text-white">Find Riders</Text>
//           </TouchableOpacity>
//         </>
//       )}

//       {/* Ride In Progress Box */}
//       {rideInProgress ? (
//         <View className="bg-green-100 p-4 rounded-lg items-center">
//           <Text className="text-xl font-bold text-green-800">
//             Ride in Progress
//           </Text>
//           {acceptedRiderName && (
//             <Text className="text-lg text-green-700 text-center mt-2">
//               Currently driving {acceptedRiderName}. Please complete the ride
//               before taking a new request.
//             </Text>
//           )}
//         </View>
//       ) : matchedRiders.length > 0 ? (
//         <FlatList
//           data={matchedRiders}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View className="bg-white p-4 rounded-lg border border-gray-300 shadow mb-3">
//               <Text className="text-lg font-bold text-gray-800">
//                 {item.name}
//               </Text>
//               <Text className="text-gray-600 mt-1">Pickup: {item.pickup}</Text>
//               <Text className="text-gray-600 mt-1">Drop-off: {item.dropOff}</Text>
//               <Text className="text-gray-600 mt-1">Distance: {item.distance}</Text>
//               <TouchableOpacity
//                 className="bg-green-500 p-3 rounded-lg items-center mt-3"
//                 onPress={() => handleAcceptRider(item.id, item.name)}
//               >
//                 <Text className="text-white font-bold text-lg">Accept Ride</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       ) : (
//         <Text className="text-lg text-gray-500 text-center mt-4">
//           No matched riders yet. Enter route details and go online to see
//           matches.
//         </Text>
//       )}
//     </View>
//   );
// };

// export default DriverDashboard;
