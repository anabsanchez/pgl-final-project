import React, { useEffect } from "react";
import { View, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ImagePreviewProps {
  uri: string;
  onClose: () => void;
}

export default function ImagePreview({ uri, onClose }: ImagePreviewProps) {
  useEffect(() => {
    console.log("URI:", uri);
  }, [uri]);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri }} style={styles.fullImage} resizeMode="contain" />
      </View>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Ionicons name="close" size={35} color="#fff" />
      </Pressable>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    padding: 8,
    zIndex: 1010,
  },
  imageWrapper: {
    width: width * 0.9,
    height: height * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
});
