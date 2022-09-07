import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";
import { ExpensesContext } from "./context";

export const AuthContext = createContext({
  token: "",
  isTokenValide: false,
  authenticate: (token) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const Container = useContext(ExpensesContext);
  const [AuthToken, setAuthToken] = useState();

  async function authenticate(token) {
    setAuthToken(token);
    await AsyncStorage.setItem("token", token);
  }
  function logout() {
    Container.resetExpense();
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }

  const value = {
    token: AuthToken,
    isTokenValide: !!AuthToken,
    logout: logout,
    authenticate: authenticate,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
