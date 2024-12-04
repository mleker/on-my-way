import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { authState, onLogout, onProfile } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleType: "",
    licenseNumber: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    const profile = async () => {
      const token = authState?.token;
      const res = await onProfile!(token as string);
      setUserData({
        name: res.user.name,
        email: res.user.email,
        phone: res.user.phone,
        vehicleType: res.user.vehicleType,
        licenseNumber: res.user.licenseNum,
      });
    };
    profile();
  }, []);

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
      await onLogout?.();
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
          {/* <Text>{user.name}</Text> */}
          <TextInput
            placeholder="Name"
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
            className="border-b border-gray-400 mb-4 py-2"
          />
          <TextInput
            placeholder="Email"
            value={userData.email}
            editable={false}
            className="border-b border-gray-400 mb-4 py-2 bg-gray-200"
          />
          <TextInput
            placeholder="Phone"
            value={userData.phone}
            onChangeText={(text) => setUserData({ ...userData, phone: text })}
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
