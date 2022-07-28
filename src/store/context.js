import { createContext, useReducer } from "react";

const Details = [
  { id: 1, price: "150", name: "Book", date: new Date("2021-05-19") },
  { id: 2, price: "650", name: "Cat Food", date: new Date("2021-05-20") },
  { id: 3, price: "350", name: "Book Stall", date: new Date("2021-05-29") },
  { id: 4, price: "50", name: "Bat", date: new Date("2021-05-09") },
  { id: 5, price: "250", name: "Book 2", date: new Date("2021-06-19") },
  { id: 9, price: "550", name: "Book 6", date: new Date("2021-08-19") },
  { id: 8, price: "950", name: "Book1", date: new Date("2021-05-17") },
  { id: 6, price: "1150", name: "Book 008", date: new Date("2021-06-20") },
  { id: 7, price: "10", name: "Book", date: new Date("2021-05-18") },

  { id: 99, price: "250", name: "Recent Bills", date: new Date("2022-07-25") },
  { id: 10, price: "150", name: "Book-009", date: new Date("2022-07-26") },
  { id: 11, price: "350", name: "Electric", date: new Date("2022-07-24") },
  { id: 13, price: "550", name: "Cab", date: new Date("2022-07-22") },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ name, price, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { name, price, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, Details);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
