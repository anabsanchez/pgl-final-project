import { View, Text } from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { useEffect } from "react";
import { asyncStorageService } from "../services/async-storage-service";

export default async function App() {
  const USER_TOKEN_KEY = asyncStorageService.userToken;

  let destinationRoute = "";
  const token = await asyncStorageService.getToken();
  if (token !== null) {
    destinationRoute = "/(drawer)/welcome-page";
  } else {
    destinationRoute = "/user-management/login-page";
  }
}
