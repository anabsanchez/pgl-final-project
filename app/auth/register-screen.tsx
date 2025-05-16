import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { globalStyles, colors } from "../../styles/global-styles";
import apiService from "../../services/user-images-service";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await apiService.register(fullname, email, password);
      if (response?.statusCode === 200) {
        Alert.alert("Registration successful!");
        router.push("./login-screen");
      } else {
        Alert.alert(
          "Registration failed!",
          response?.message || "Unknown error"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to register");
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Create an account</Text>
      <Text style={globalStyles.label}>Full name</Text>
      <TextInput
        placeholder="Enter your full name here"
        placeholderTextColor={colors.placeholder}
        value={fullname}
        onChangeText={setFullname}
        style={globalStyles.input}
      />
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

      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <Link href="./login-screen" style={globalStyles.link}>
        Already have an account?
      </Link>
    </View>
  );
}
