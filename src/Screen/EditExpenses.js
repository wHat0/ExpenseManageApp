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
  });

  const [nDate, setnDate] = useState("");

  let price = InputData.Price.toString(),
    name = InputData.Name.toString(),
    valdate = data ? data.date.toString().slice(8, 18) : nDate;

  function ChangeValue(value, input) {
    setInputData((curInput) => {
      return { ...curInput, [input]: value };
    });
  }

  function Update() {
    console.log("Update");
    validate();

    if (validateI) {
      Container.addExpense({
        name: InputData.Name,
        price: InputData.Price,
        date: new Date(nDate),
      });
      console.log("DATA =" + JSON.stringify(InputData, nDate));
      navigation.goBack();
    }
  }

  function Addfunc() {
    console.log("Add");
    validate();

    if (validateI) {
      console.log("DATA =" + JSON.stringify(InputData) + { Date: nDate });

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

  function validate() {
    if (!InputData.Price) {
      return Alert.alert("Emprty Price");
    }
    if (!InputData.Name) {
      return Alert.alert("Emprty Tittle");
    }
    if (!nDate && nDate.length == 10) {
      return Alert.alert("Empty Date");
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
