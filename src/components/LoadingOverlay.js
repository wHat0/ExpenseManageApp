import React from "react";
import { ActivityIndicator, View } from "react-native";

function LoadingOverlay(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "purple",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}

export default LoadingOverlay;
