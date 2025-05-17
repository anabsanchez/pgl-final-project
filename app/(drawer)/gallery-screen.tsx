import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import apiService from "../../services/user-images-service";
import { globalStyles } from "../../styles/global-styles";

export default function GalleryScreen() {
  const [images, setImages] = useState<any[]>([]);

  const fetchImages = async () => {
    try {
      const response = await apiService.getAllImages();
      setImages(response.object || []);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch images.");
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const deleteImage = async (id: number) => {
    try {
      await apiService.deleteImage(id);
      Alert.alert("Deleted", "Image deleted successfully.");
      fetchImages();
    } catch (error) {
      Alert.alert("Error", "Failed to delete image.");
    }
  };

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.url }} style={styles.image} />
            <Button title="Delete" onPress={() => deleteImage(item.id)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  imageContainer: { marginBottom: 15, alignItems: "center" },
  image: { width: 100, height: 100, borderRadius: 10 },
});
