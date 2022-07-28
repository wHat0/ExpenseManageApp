import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import Card from "../components/Card";
import { ExpensesContext } from "../store/context";

function RecentExpenses({ navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const [TotalPrice, setTotalPrice] = useState(0);

  function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  console.log(JSON.stringify(recentExpenses));

  function renderItem(itemData) {
    const item = itemData.item;

    TotalValues(item.price);
    return <Card {...item} onPress={() => CardClick(item)} />;
  }

  function CardClick(item) {
    navigation.navigate("EditScreen", item);
  }

  var sum = 0;
  function TotalValues(expense) {
    sum = sum + Number(expense);
    setTotalPrice(sum);
  }

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
          data={recentExpenses}
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

export default RecentExpenses;
