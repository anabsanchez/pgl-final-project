import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
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
    <View style={{ padding: 20 }}>
      <Text>Create an account</Text>
      <TextInput
        placeholder="Full name"
        value={fullname}
        onChangeText={setFullname}
        style={{
          marginVertical: 5,
          padding: 5,
          borderWidth: 1,
          borderRadius: 5,
        }}
      />
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
      <Button title="Sign up" onPress={handleRegister} />
      <Link href="./login-screen">Already have an account?</Link>
    </View>
  );
}
