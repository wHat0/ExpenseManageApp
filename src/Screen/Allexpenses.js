import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, ImageBackground, Alert } from "react-native";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import Card from "../components/Card";
import { ExpensesContext } from "../store/context";
import { showExpense } from "../../util/http";
import LoadingOverlay from "../components/LoadingOverlay";
import { AuthContext } from "../store/AuthContext";
import Button from "../components/Button";
import { useIsFocused } from "@react-navigation/native";

function Allexpenses({ navigation }) {
  const Container = useContext(ExpensesContext);
  const isFocused = useIsFocused();

  const [Loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const token = authContext.token;
  const Details = Container.expenses;

  useEffect(() => {
    async function getDataBase() {
      setLoading(true);
      try {
        console.log("called Data");
        const data = await showExpense(token);
        Container.resetExpense();
        Container.setExpense(data);
      } catch {
        return Alert.alert("NETWORK ERROR"), setLoading(false);
      }
      setLoading(false);
    }
    if (isFocused) {
      getDataBase();
    }
  }, []);

  // function onPress() {
  //   console.log("RESETCALLED");
  //   Container.resetExpense();
  // }

  // console.log(!Details);
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

  function TotalValues(expense) {
    sum = sum + Number(expense);
    setTotalPrice(sum);
  }

  if (Loading) {
    return <LoadingOverlay />;
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
        {/* {Details ? (
          <View>
            <Text>YOU have it</Text>
          </View>
        ) : (
          <View>
            <Text>DONE YOU Don't have Details</Text>
          </View>
        )} */}
        {Details ? (
          <View style={{ marginBottom: 25 }}>
            <View
              style={{
                backgroundColor: "grey",
                width: "50%",
                height: 35,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Total Expenses:{"    "} {TotalPrice.toFixed(2)}
              </Text>
            </View>
            <FlatList
              data={Details}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>
        ) : (
          <Text>Data Not Available</Text>
        )}
        {/* <Button onPress={onPress} /> */}
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
