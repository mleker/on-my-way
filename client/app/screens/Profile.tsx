import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../context/AuthContext"; // Assuming you have AuthContext for managing user state

const Profile: React.FC = () => {
  const { authState, onLogout } = useAuth(); // Use auth context for token and logout
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    gender: "",
    vehicleType: "",
    licenseNumber: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const token = authState?.token; // Use token from context
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUserData(data.user);
      } else {
        Alert.alert("Error", data.message || "Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      Alert.alert("Error", "Something went wrong while fetching your profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const token = authState?.token;
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Something went wrong while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Error", "Please fill in both password fields.");
      return;
    }
    try {
      setLoading(true);
      const token = authState?.token;
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BASE_URL}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Password updated successfully");
      } else {
        Alert.alert("Error", data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      Alert.alert(
        "Error",
        "Something went wrong while resetting your password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await onLogout?.(); // Logout using auth context
      Alert.alert("Success", "You have been logged out.");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Profile</Text>
      {loading ? (
        <Text className="text-center mb-4">Loading...</Text>
      ) : (
        <>
          <TextInput
            placeholder="Name"
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
            className="border-b border-gray-400 mb-4 py-2"
          />
          <TextInput
            placeholder="Surname"
            value={userData.surname}
            onChangeText={(text) => setUserData({ ...userData, surname: text })}
            className="border-b border-gray-400 mb-4 py-2"
          />
          <TextInput
            placeholder="Email"
            value={userData.email}
            editable={false}
            className="border-b border-gray-400 mb-4 py-2 bg-gray-200"
          />
          <TextInput
            placeholder="Gender"
            value={userData.gender}
            onChangeText={(text) => setUserData({ ...userData, gender: text })}
            className="border-b border-gray-400 mb-4 py-2"
          />
          <TextInput
            placeholder="Vehicle Type (Optional)"
            value={userData.vehicleType}
            onChangeText={(text) =>
              setUserData({ ...userData, vehicleType: text })
            }
            className="border-b border-gray-400 mb-4 py-2"
          />
          <TextInput
            placeholder="License Number (Optional)"
            value={userData.licenseNumber}
            onChangeText={(text) =>
              setUserData({ ...userData, licenseNumber: text })
            }
            className="border-b border-gray-400 mb-8 py-2"
          />
          <TouchableOpacity
            onPress={handleUpdateProfile}
            className="bg-black py-2 rounded-md mb-4"
          >
            <Text className="text-white text-center">Update Profile</Text>
          </TouchableOpacity>
          <Text className="text-xl font-bold mb-2">Reset Password</Text>
          <TextInput
            placeholder="Old Password"
            value={oldPassword}
            secureTextEntry
            onChangeText={setOldPassword}
            className="border-b border-gray-400 mb-4 py-2"
          />
          <TextInput
            placeholder="New Password"
            value={newPassword}
            secureTextEntry
            onChangeText={setNewPassword}
            className="border-b border-gray-400 mb-8 py-2"
          />
          <TouchableOpacity
            onPress={handleResetPassword}
            className="bg-black py-2 rounded-md mb-4"
          >
            <Text className="text-white text-center">Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 py-2 rounded-md"
          >
            <Text className="text-white text-center">Sign Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Profile;
