import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import StackNav, { AuthStack } from "./src/routes/StackNav";
import AuthContextProvider, { AuthContext } from "./src/store/AuthContext";
import ExpensesContextProvider, { ExpensesContext } from "./src/store/context";

export default function App() {
  return (
    <ExpensesContextProvider>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </ExpensesContextProvider>
  );
}

function Navigation() {
  const ContxAuth = useContext(AuthContext);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        ContxAuth.authenticate(token);
      }
      return;
    }
    getToken();
  }, []);

  return (
    <NavigationContainer>
      {ContxAuth.isTokenValide ? <StackNav /> : <AuthStack />}
    </NavigationContainer>
  );
}
