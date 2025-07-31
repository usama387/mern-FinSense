import { expenseApi } from "@/features/api/expenseApi";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(expenseApi.middleware),
});