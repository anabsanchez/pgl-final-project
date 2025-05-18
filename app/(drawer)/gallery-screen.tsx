import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect, useRouter } from "expo-router";
import apiService from "../../services/user-images-service";
import { colors } from "../../styles/global-styles";
import ImagePreview from "../../components/ImagePreview";

export default function GalleryScreen() {
  const [images, setImages] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
        setImages(formattedImages.reverse());
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch images.");
    }
  };
  const confirmDeleteImage = (id: number) => {
    Alert.alert(
      "Delete Image",
      "Are you sure you want to delete this image?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteImage(id),
        },
      ],
      { cancelable: true }
    );
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

  const openImagePreview = (uri: string) => {
    setSelectedImage(uri);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  useFocusEffect(
    useCallback(() => {
      fetchImages();
    }, [])
  );

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <ImagePreview uri={selectedImage} onClose={closeImagePreview} />
      ) : (
        <>
          <FlatList
            data={images}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => openImagePreview(item.uri)}
                onLongPress={() => confirmDeleteImage(item.id)}
              >
                <Image source={{ uri: item.uri }} style={styles.image} />
              </TouchableOpacity>
            )}
          />
          <Pressable style={styles.cameraButton} onPress={openCamera}>
            <Ionicons name="camera" size={35} />
          </Pressable>
        </>
      )}
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
