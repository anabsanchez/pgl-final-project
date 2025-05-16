import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { asyncStorageService } from "../../services/async-storage-service";
import apiService from "../../services/user-images-service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await apiService.login(email, password);
      if (response?.object?.token) {
        await asyncStorageService.saveToken(response.object.token);
        Alert.alert("Login successful!");
        router.push("/(drawer)/welcome-screen");
      } else {
        Alert.alert("Login failed!", response?.message || "Unknown error");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          marginVertical: 5,
          padding: 5,
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={{
          marginVertical: 5,
          padding: 5,
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
      <Button title="Sign in" onPress={handleLogin} />
      <Link href="./register-screen">Create an account</Link>
    </View>
  );
}
