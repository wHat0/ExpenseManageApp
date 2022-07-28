import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function Button({ tittle, onPress, color }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: color ? color : "lightblue" },
      ]}
    >
      <Text style={{ fontWeight: "bold", color: "white" }}>{tittle}</Text>
    </TouchableOpacity>
  );
}

export default Button;
const styles = StyleSheet.create({
  container: {
    width: "60%",
    borderRadius: 8,
    alignItems: "center",
    height: 40,
    margin: 5,
    justifyContent: "center",
  },
});
