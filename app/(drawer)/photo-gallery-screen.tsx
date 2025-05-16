import { View, Text, Button } from "react-native";
import React from "react";
import { globalStyles } from "../../styles/global-styles";

export default function PhotoGalleryScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Photo Gallery</Text>
      <View style={globalStyles.button}>
        <Button title="Open Camera" color="#FFFFFF" onPress={() => {}} />
      </View>
    </View>
  );
}
