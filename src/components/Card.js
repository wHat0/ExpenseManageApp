import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { TouchableOpacity } from "react-native";

function Card({ id, price, name, date, onPress }) {
  //Date gives error for that you have to make formated function or just date.toString()

  function getformatedDate(ndate) {
    return `${ndate.getFullYear()}-${
      ndate.getMonth() < 9 ? "0" + [ndate.getMonth() + 1] : ndate.getMonth() + 1
    }-${ndate.getDate() < 9 ? "0" + ndate.getDate() : ndate.getDate()}`;
  }

  return (
    // <Pressable
    //   onPress={() => console.log("Price Pressed")}
    //   style={({ pressed }) => pressed && styles.press}
    // >
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View>
          <View style={styles.inner}>
            <Text
              style={{
                textAlign: "center",
                color: "purple",
                fontWeight: "bold",
              }}
            >
              {price}
            </Text>
          </View>
        </View>

        <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
          {name}
        </Text>
        <Text style={{ marginTop: 10, color: "white", fontSize: 15 }}>
          {getformatedDate(date)}
        </Text>
      </TouchableOpacity>
    </View>
    // </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "purple",
    width: "80%",
    height: 80,
    borderRadius: 8,
    padding: 10,
    margin: 5,
    elevation: 10,
    justifyContent: "center",
  },
  inner: {
    width: "30%",
    height: 50,
    backgroundColor: "white",
    position: "absolute",
    marginLeft: "65%",
    justifyContent: "center",
    elevation: 10,
    borderRadius: 8,
  },
  press: {
    opacity: 0.7,
  },
});

export default Card;
