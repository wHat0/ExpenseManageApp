import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Allexpenses from "../Screen/Allexpenses";
import RecentExpenses from "../Screen/RecentExpenses";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../store/AuthContext";

const Tab = createBottomTabNavigator();

function TabNav(props) {
  const AuthContx = useContext(AuthContext);
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Expenses") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Recent Expenses") {
            iconName = focused
              ? "ios-file-tray-stacked-sharp"
              : "ios-file-tray-stacked-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerStyle: { backgroundColor: "black" },
        tabBarStyle: { backgroundColor: "black" },
        headerTitleAlign: "center",
        headerTintColor: "white",
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("EditScreen")}>
            <Ionicons name="add" size={30} color="white" />
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => AuthContx.logout()}>
            <Ionicons name="log-out" size={30} color="white" />
          </TouchableOpacity>
        ),
      })}
    >
      <Tab.Screen name="Expenses" component={Allexpenses} />
      <Tab.Screen name="Recent Expenses" component={RecentExpenses} />
    </Tab.Navigator>
  );
}

export default TabNav;
