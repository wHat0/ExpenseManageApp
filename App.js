import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./src/routes/StackNav";
import TabNav from "./src/routes/TabNav";

import Allexpenses from "./src/Screen/Allexpenses";
import EditExpenses from "./src/Screen/EditExpenses";
import RecentExpenses from "./src/Screen/RecentExpenses";
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
