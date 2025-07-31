import { expenseApi } from "@/features/api/expenseApi";
import { combineReducers } from "@reduxjs/toolkit";

// Combine all reducers into a single root reducer and the passed in store.js.
const rootReducer = combineReducers({
  [expenseApi.reducerPath]: expenseApi.reducer,
});

export default rootReducer;
