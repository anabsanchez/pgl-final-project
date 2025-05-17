import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
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
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 5,
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#3A86FF",
    padding: 10,
    borderRadius: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
});
