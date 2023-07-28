import { configureStore } from "@reduxjs/toolkit";
import { expenseConfig } from "./Expense/expenseConfig";

const store = configureStore({
  reducer: {
    dataSearch: expenseConfig.reducer,
  },
});

export default store;
