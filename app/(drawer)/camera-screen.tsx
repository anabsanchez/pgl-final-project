import { View, Pressable, StyleSheet, Alert, Image } from "react-native";
import React, { useRef, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { colors } from "../../styles/global-styles";
import apiService from "../../services/user-images-service";
import { useIsFocused } from "@react-navigation/native";

const Camera = () => {
  const cameraRef = useRef<CameraView>(null);
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [lastPicture, setLastPicture] = useState<string>("");
  const router = useRouter();
  const isFocused = useIsFocused();

  const toggleFacing = () =>
    setFacing((face) => (face === "back" ? "front" : "back"));

  const openGallery = () => {
    router.navigate("/(drawer)/gallery-screen");
  };

  const takePicture = async () => {
    try {
      const picture = await cameraRef.current?.takePictureAsync({
        base64: true,
      });
      if (picture && picture.uri) {
        setLastPicture(picture.uri);
        apiService.saveImage(picture.width, picture.height, picture.uri);
      } else {
        Alert.alert("Error", "Failed to capture the photo.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  if (!hasPermission) {
    return <View />;
  } else if (!hasPermission.granted) {
    return (
      <Pressable onPress={requestPermission} style={styles.permissionButton}>
        <Ionicons name="camera-outline" size={30} color={colors.button} />
      </Pressable>
    );
  }

  return (
    isFocused && (
      <CameraView
        style={styles.camera}
        facing={facing}
        mode="picture"
        ref={cameraRef}
        onCameraReady={() => console.log("Camera ready!")}
      >
        <View style={styles.buttonContainer}>
          <Pressable style={styles.galleryButton} onPress={openGallery}>
            {lastPicture ? (
              <Image source={{ uri: lastPicture }} style={styles.imageIcon} />
            ) : (
              <View style={styles.emptyImageIcon} />
            )}
          </Pressable>
          <Pressable style={styles.takePictureButton} onPress={takePicture} />
          <Pressable style={styles.switchCameraButton} onPress={toggleFacing}>
            <Ionicons name="camera-reverse" size={32} color={colors.button} />
          </Pressable>
        </View>
      </CameraView>
    )
  );
};

export default Camera;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 55,
    width: "100%",
  },
  galleryButton: {
    backgroundColor: "rgba(58, 134, 255, 0.5)",
    width: 55,
    height: 55,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.button,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imageIcon: {
    width: "100%",
    height: "100%",
  },
  emptyImageIcon: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(58, 134, 255, 0.5)",
  },
  switchCameraButton: {
    alignItems: "center",
    width: 55,
    height: 55,
    borderRadius: 15,
    borderColor: colors.button,
    borderWidth: 2,
    padding: 8,
  },
  takePictureButton: {
    height: 80,
    width: 80,
    borderRadius: 20,
    borderColor: colors.button,
    borderWidth: 6,
  },
  permissionButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#3A86FF",
    borderRadius: 10,
  },
});
