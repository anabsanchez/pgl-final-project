import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { router } from "expo-router";
import { asyncStorageService } from "../../services/async-storage-service";

export default function Welcome() {
  const handleLogout = async () => {
    await asyncStorageService.removeToken();
    Alert.alert("Logged out!");
    router.replace("/auth/login-screen");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome aboard!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
