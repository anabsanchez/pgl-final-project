import { View, Pressable, StyleSheet, Alert, Image } from "react-native";
import React, { useRef, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { globalStyles, colors } from "../styles/global-styles";

type CameraProps = {
  setLastPicture: (uri: string) => void;
  lastPicture: string | null;
};

const Camera = ({ setLastPicture, lastPicture }: CameraProps) => {
  const cameraRef = useRef<CameraView>(null);
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const router = useRouter();

  const toggleFacing = () =>
    setFacing((face) => (face === "back" ? "front" : "back"));

  const openGallery = () => {
    router.push("/(drawer)/photo-gallery-screen");
  };

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
    <CameraView
      style={styles.camera}
      facing={facing}
      mode="picture"
      ref={cameraRef}
      onCameraReady={() => console.log("Camera ready!")}
    >
      <View style={styles.buttonContainer}>
        {/* Botón de última foto capturada */}
        <Pressable style={styles.imageButton} onPress={openGallery}>
          {lastPicture ? (
            <Image source={{ uri: lastPicture }} style={styles.imageIcon} />
          ) : (
            <View style={styles.emptyImageIcon} />
          )}
        </Pressable>

        {/* Botón de captura */}
        <Pressable style={styles.pictureButton} onPress={takePicture} />

        {/* Botón de cambio de cámara */}
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
  imageButton: {
    backgroundColor: "rgba(58, 134, 255, 0.5)",
    width: 60,
    height: 60,
    borderRadius: 10,
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
  permissionButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#3A86FF",
    borderRadius: 10,
  },
});
