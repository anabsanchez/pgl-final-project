import { View, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import Camera from "../../components/Camera";

const CameraScreen = () => {
  const [lastPicture, setLastPicture] = useState<string>("");

  return (
    <View style={styles.pageContainer}>
      {lastPicture ? (
        <View style={styles.lastImageContainer}>
          <Image
            style={styles.lastImage}
            source={{ uri: lastPicture }}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={styles.placeholder}>
          <Image
            style={styles.placeholderIcon}
            source={require("../../assets/icon.png")}
          />
        </View>
      )}
      <Camera setLastPicture={setLastPicture} />
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
  },
  lastImageContainer: {
    position: "absolute",
    bottom: 80,
    left: 20,
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  lastImage: {
    width: 65,
    height: 65,
    borderRadius: 8,
  },
  placeholder: {
    position: "absolute",
    bottom: 80,
    left: 20,
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "rgba(58, 134, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    tintColor: "#FFF",
  },
});
