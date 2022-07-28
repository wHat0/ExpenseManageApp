import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

function Input({ label, input, type, TextValues, length, value }) {
  return (
    <View style={{ flex: 1, padding: 5 }}>
      <Text style={{ color: "white" }}>{label} </Text>
      <TextInput
        placeholder={input ? input : label}
        keyboardType={type ? type : "default"}
        style={styles.InputContainer}
        onChangeText={TextValues}
        maxLength={length}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  InputContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
  },
});
