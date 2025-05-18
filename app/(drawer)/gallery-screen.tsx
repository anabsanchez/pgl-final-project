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
import { colors } from "../../styles/global-styles";

export default function GalleryScreen() {
  const [images, setImages] = useState<any[]>([]);
  const router = useRouter();

  const fetchImages = async () => {
    try {
      const response = await apiService.getAllImages();
      if (response.object) {
        const formattedImages = response.object.map((image) => {
          let uri = image.encodedData;

          if (uri.startsWith("file://")) {
            return { ...image, uri };
          } else if (!uri.startsWith("data:image")) {
            uri = `data:image/jpeg;base64,${image.encodedData}`;
          }

          return { ...image, uri };
        });
        setImages(formattedImages);
      }
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
            <Image source={{ uri: item.uri }} style={styles.image} />
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
    backgroundColor: colors.background,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 110,
    height: 110,
    margin: 5,
    borderRadius: 5,
  },
  cameraButton: {
    position: "absolute",
    bottom: 67,
    left: 33,
    backgroundColor: "#3A86FF",
    padding: 10,
    borderRadius: 15,
  },
});
