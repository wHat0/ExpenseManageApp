import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./src/routes/StackNav";
import ExpensesContextProvider from "./src/store/context";

export default function App() {
  return (
    <ExpensesContextProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}
