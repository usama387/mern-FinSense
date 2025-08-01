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
    getAIInsights: builder.query({
      query: (userId) => ({
        url: `/ai-insights/${userId}`,
        method: "GET",
      }),
    }),
    getUserExpenses: builder.query({
      query: (userId) => ({
        url: `/user-expenses/${userId}`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
    getUserExpensesStats: builder.query({
      query: (userId) => ({
        url: `/user-expnsestats/${userId}`,
        method: "GET",
      }),
      providesTags: ["Expenses"],
    }),
  }),
});

export const {
  useAddExpenseMutation,
  useSuggestCategoryMutation,
  useGetUserExpensesQuery,
  useGetUserExpensesStatsQuery,
  useGetAIInsightsQuery,
} = expenseApi;
