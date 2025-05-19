import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { globalStyles, colors } from "../../styles/global-styles";
import apiService from "../../services/user-images-service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await apiService.login(email, password);
      if (response?.object?.token) {
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
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Login</Text>
      <Text style={globalStyles.label}>Email</Text>
      <TextInput
        placeholder="Enter your email here"
        placeholderTextColor={colors.placeholder}
        value={email}
        onChangeText={setEmail}
        style={globalStyles.input}
      />
      <Text style={globalStyles.label}>Password</Text>
      <TextInput
        placeholder="Enter your password here"
        placeholderTextColor={colors.placeholder}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={globalStyles.input}
      />
      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <Link href="./register-screen" style={globalStyles.link}>
        Create an account
      </Link>
    </View>
  );
}
