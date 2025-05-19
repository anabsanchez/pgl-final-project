import { Redirect } from "expo-router";
import React, { useState, useEffect } from "react";
import { asyncStorageService } from "../services/async-storage-service";

export default function App() {
  const [destinationRoute, setDestinationRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await asyncStorageService.getToken();
      if (token) {
        setDestinationRoute("/(drawer)/welcome-screen");
      } else {
        setDestinationRoute("/auth/login-screen");
      }
    };
    checkAuth();
  }, []);

  if (destinationRoute) {
    return <Redirect href={destinationRoute} />;
  }

  return null;
}
