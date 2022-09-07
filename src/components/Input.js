import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";

function Input({
  label,
  input,
  type,
  TextValues,
  length,
  value,
  icon,
  secure,
  Endicon,
  EndPress,
  error,
  onFocus,
}) {
  const [isFocused, setIsFocused] = useState(true);
  console.log(error);
  return (
    <View style={{ padding: 5 }}>
      <Text style={{ color: "white" }}>
        {label} <Text style={{ color: "red" }}> {error && error}</Text>
      </Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: error ? "red" : isFocused ? "lightblue" : "white",
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Ionicons name={icon} size={20} style={{ padding: 5 }} />
        <TextInput
          placeholder={input ? input : label}
          keyboardType={type ? type : "default"}
          style={styles.InputContainer}
          secureTextEntry={secure}
          onChangeText={TextValues}
          maxLength={length}
          onFocus={() => {
            onFocus, setIsFocused(false);
          }}
          value={value}
        />
        <View style={{}}>
          <Ionicons name={Endicon} size={20} onPress={EndPress} />
        </View>
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  InputContainer: {
    width: "80%",
    height: 40,
  },
});
