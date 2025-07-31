import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendUrl = import.meta.env.VITE_EXPENSE_BACKEND_URL;

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: backendUrl,
    credentials: "include",
    mode: "cors",
  }),
  tagTypes: ["Expenses"],
  endpoints: (builder) => ({
    addExpense: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `/add/${userId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Expenses"],
    }),
    suggestCategory: builder.mutation({
      query: (description) => ({
        url: "/suggest-category",
        method: "POST",
        body: { description },
      }),
    }),
  }),
});

export const { useAddExpenseMutation, useSuggestCategoryMutation } = expenseApi;
