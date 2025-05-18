import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter } from "expo-router";
import apiService from "../../services/user-images-service";

export default function GalleryScreen() {
  const [images, setImages] = useState<any[]>([]);
  const router = useRouter();

  const fetchImages = async () => {
    try {
      const response = await apiService.getAllImages();
      setImages(response.object || []);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch images.");
    }
  };

  const deleteImage = async (id: number) => {
    try {
      await apiService.deleteImage(id);
      Alert.alert("Deleted", "Image deleted successfully.");
      fetchImages();
    } catch (error) {
      Alert.alert("Error", "Failed to delete image.");
    }
  };

  const openCamera = () => {
    router.navigate("/(drawer)/camera-screen");
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => deleteImage(item.id)}>
            <Image source={{ uri: item.url }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
      <Pressable style={styles.cameraButton} onPress={openCamera}>
        <Ionicons name="camera" size={35} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
    width: "100%",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  cameraButton: {
    position: "absolute",
    bottom: 32,
    left: 33,
    backgroundColor: "#3A86FF",
    padding: 10,
    borderRadius: 15,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
});
