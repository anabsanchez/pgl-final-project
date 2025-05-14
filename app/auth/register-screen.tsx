import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

export default function Register() {
  const onRegister = () => {
    router.navigate("./login-page");
  };

  return (
    <View>
      <Text>Create an account</Text>
      <Button onPress={onRegister} title="Sign up" />
      <Link href="./register-page">Already have an account?</Link>
    </View>
  );
}
