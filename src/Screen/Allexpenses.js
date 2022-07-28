import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import Card from "../components/Card";
import { ExpensesContext } from "../store/context";

function Allexpenses({ navigation }) {
  const Container = useContext(ExpensesContext);

  // console.log(Container.expenses); //Details Fetched from context

  const Details = Container.expenses;

  // const Details = [
  //   { id: 1, price: "150", name: "Book", date: new Date("2021-05-19") },
  //   { id: 2, price: "650", name: "Cat Food", date: new Date("2021-05-20") },
  //   { id: 3, price: "350", name: "Book Stall", date: new Date("2021-05-29") },
  //   { id: 4, price: "50", name: "Bat", date: new Date("2021-05-09") },
  //   { id: 5, price: "250", name: "Book 2", date: new Date("2021-06-19") },
  //   { id: 9, price: "550", name: "Book 6", date: new Date("2021-08-19") },
  //   { id: 8, price: "950", name: "Book1", date: new Date("2021-05-17") },
  //   { id: 6, price: "1150", name: "Book 008", date: new Date("2021-06-20") },
  //   { id: 7, price: "10", name: "Book", date: new Date("2021-05-18") },
  // ];

  const [TotalPrice, setTotalPrice] = useState(0);

  function renderItem(itemData) {
    const item = itemData.item;

    // const DetailsList = {
    //   id: item.id,
    //   price: item.price,
    //   name: item.name,
    //   date: item.date,
    // };
    {
      TotalValues(item.price);
    }

    return <Card {...item} onPress={() => CardClick(item)} />;
  }

  function CardClick(item) {
    navigation.navigate("EditScreen", item);
  }
  var sum = 0;

  const TotalValues = (expense) => {
    sum = sum + Number(expense);
    setTotalPrice(sum);
  };

  return (
    <LinearGradient
      colors={["#4e329a", "#000428", "#004e92", "#4e329a"]}
      style={styles.container}
    >
      <ImageBackground
        source={require("../../assets/expenses.jpg")}
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.3, resizeMode: "cover" }}
      >
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              backgroundColor: "grey",
              width: "80%",
              height: 35,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Total Expenses:{"    "} ${TotalPrice}
            </Text>
          </View>
        </View>

        <FlatList
          data={Details}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Allexpenses;
