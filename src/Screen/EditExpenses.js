import { Ionicons } from "@expo/vector-icons";
import { validatePathConfig } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import { ExpensesContext } from "../store/context";

function EditExpenses({ route, navigation }) {
  const Container = useContext(ExpensesContext);

  const data = route.params;

  let validateI = false;

  const [InputData, setInputData] = useState({
    Price: data ? data.price : "",
    Name: data ? data.name : "",
    Date: data ? data.date.toString().slice(0, 15) : "",
  });

  const [nDate, setnDate] = useState(data ? getformatedDate(data.date) : "");

  function getformatedDate(ndate) {
    return `${ndate.getFullYear()}-${
      ndate.getMonth() < 9 ? "0" + [ndate.getMonth() + 1] : ndate.getMonth() + 1
    }-${ndate.getDate() < 9 ? "0" + ndate.getDate() : ndate.getDate()}`;
  }

  let price = InputData.Price.toString(),
    name = InputData.Name.toString(),
    valdate = nDate;

  function ChangeValue(value, input) {
    setInputData((curInput) => {
      return { ...curInput, [input]: value };
    });
  }

  function Update() {
    validate();
    // console.log("DATA =" + JSON.stringify(InputData));
    // console.log("Date:", new Date(nDate));

    if (validateI) {
      Container.updateExpense(data.id, {
        name: InputData.Name,
        price: InputData.Price,
        date: new Date(nDate),
      });

      navigation.goBack();
    }
  }

  function Addfunc() {
    console.log("Add");
    validate();

    if (validateI) {
      Container.addExpense({
        name: InputData.Name,
        price: InputData.Price,
        date: new Date(nDate),
      });
      navigation.goBack();
    }
  }

  function Delete() {
    Container.deleteExpense(data.id);
    navigation.goBack();
  }

  //Validation
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/;

  function validate() {
    console.log("value=" + nDate.charAt(7));

    console.log(format.test(InputData.Price));

    if (!InputData.Price) {
      return Alert.alert("Empty Price");
    }
    if (!format.test(InputData.Price)) {
      return Alert.alert("Empty Price");
    }

    if (!InputData.Name) {
      return Alert.alert("Empty Tittle");
    }
    if (!nDate || nDate.length < 10) {
      return Alert.alert(
        "Wrong Or Empty Date",
        "Kindly Follow the Defined Formate as: \n\n YYYY-MM-DD"
      );
    }
    if (nDate.charAt(4) != "-" || nDate.charAt(7) != "-") {
      return Alert.alert(
        "Invalid formate",
        "Kindly Follow the Defined Formate as: \n\n YYYY-MM-DD"
      );
    }
    validateI = true;
  }

  return (
    <LinearGradient
      colors={["#4e0329", "#ddf", "#4e0329"]}
      style={{
        flex: 1,
        marginTop: 30,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Input
          label={"Price"}
          input={"Dollars"}
          type={"number-pad"}
          TextValues={(value) => ChangeValue(value, "Price")}
          value={price}
        />
        <Input
          label={"Tittle"}
          TextValues={(value) => ChangeValue(value, "Name")}
          value={name}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          label="Date"
          input="YYYY-MM-DD"
          type={"number-pad"}
          TextValues={(value) => setnDate(value)}
          value={valdate}
        />
      </View>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {InputData.Date}
      </Text>
      <View style={styles.ButtonContainer}>
        {data ? (
          <TouchableOpacity onPress={Delete}>
            <Ionicons
              name="trash-bin"
              size={35}
              color="red"
              style={{ marginRight: 19 }}
            />
          </TouchableOpacity>
        ) : (
          <Button
            tittle={"Cancel"}
            onPress={() => navigation.goBack()}
            color={"red"}
          />
        )}
        <Button
          tittle={data ? "Update" : "Add"}
          onPress={data ? Update : Addfunc}
        />
      </View>
    </LinearGradient>
  );
}

export default EditExpenses;

const styles = StyleSheet.create({
  ButtonContainer: {
    borderTopWidth: 2,
    borderColor: "white",
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
});
