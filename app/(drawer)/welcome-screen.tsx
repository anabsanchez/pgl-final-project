import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/global-styles";
import { asyncStorageService } from "../../services/async-storage-service";
import { router } from "expo-router";

export default function WelcomeScreen() {
  const handleLogout = async () => {
    await asyncStorageService.removeToken();
    router.push("/auth/login-screen");
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.welcomeMessage}>Welcome aboard!</Text>
      <TouchableOpacity style={globalStyles.button} onPress={handleLogout}>
        <Text style={globalStyles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
