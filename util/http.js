import axios from "axios";
import { useContext, useState } from "react";
import { configureProps } from "react-native-reanimated/lib/reanimated2/core";
import { AuthContext } from "../src/store/AuthContext";

const LINK = "https://expense-managemen-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData) {
  const response = await axios.post(LINK + "expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function UpdateRequest(id, expenseData) {
  const response = await axios.put(LINK + `expenses/${id}.json`, expenseData);
}

export async function DeleteRequest(id) {
  const response = await axios.delete(LINK + `expenses/${id}.json`);
}

// function ContextCheck() {
//   const authContext = useContext(AuthContext);
//   token = authContext.token;
//   console.log("showexpense");
//   return token;
// }
const expense = [];

export async function showExpense(token) {
  console.log(token);
  const response = await axios.get(LINK + "expenses.json?auth=" + token);
  console.log(response);
  for (const key in response.data) {
    const listExpense = {
      id: key,
      date: new Date(response.data[key].date),
      name: response.data[key].name,
      price: response.data[key].price,
    };
    expense.push(listExpense);
  }

  return expense;
}
