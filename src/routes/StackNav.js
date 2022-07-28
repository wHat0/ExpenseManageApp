import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditExpenses from "../Screen/EditExpenses";
import Allexpenses from "../Screen/Allexpenses";
import TabNav from "./TabNav";

import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

function StackNav(props) {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditExpenses}
          options={{
            headerStyle: { backgroundColor: "black" },
            headerTitleAlign: "center",
            headerTintColor: "white",
            presentation: "modal",
            contentStyle: { backgroundColor: "black" },
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default StackNav;
