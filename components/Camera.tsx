import { View, Pressable, StyleSheet, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { globalStyles, colors } from "../styles/global-styles";

type CameraProps = {
  setLastPicture: (uri: string) => void;
};

const Camera = ({ setLastPicture }: CameraProps) => {
  const cameraRef = useRef<CameraView>(null);
  const [hasPermission, setHasPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");

  const toggleFacing = () =>
    setFacing((face) => (face === "back" ? "front" : "back"));

  const takePicture = async () => {
    try {
      const picture = await cameraRef.current?.takePictureAsync({
        base64: true,
      });
      if (picture && picture.uri) {
        setLastPicture(picture.uri);
        Alert.alert("Photo captured!");
      } else {
        Alert.alert("Error", "Failed to capture the photo.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };
  const openGallery = async () => {};

  if (!hasPermission) {
    return <View />;
  } else if (!hasPermission.granted) {
    return (
      <Pressable onPress={setHasPermission} style={styles.permissionButton}>
        <Ionicons name="camera-outline" size={30} color={colors.button} />
      </Pressable>
    );
  }

  return (
    <CameraView
      style={styles.camera}
      facing={facing}
      mode="picture"
      ref={cameraRef}
      onCameraReady={() => console.log("Camera ready!")}
    >
      <View style={styles.buttonContainer}>
        <Pressable style={styles.galleryButton} onPress={openGallery} />
        <Pressable style={styles.pictureButton} onPress={takePicture} />
        <Pressable style={styles.iconButton} onPress={toggleFacing}>
          <Ionicons name="camera-reverse" size={32} color={colors.button} />
        </Pressable>
      </View>
    </CameraView>
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
    bottom: 20,
    width: "100%",
  },
  iconButton: {
    alignItems: "center",
    borderRadius: 15,
    borderColor: colors.button,
    borderWidth: 2,
    padding: 8,
  },
  pictureButton: {
    height: 80,
    width: 80,
    borderRadius: 20,
    borderColor: colors.button,
    borderWidth: 6,
  },
  galleryButton: {},
  permissionButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#3A86FF",
    borderRadius: 10,
  },
});
