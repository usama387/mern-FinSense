import express from "express";
import { addNewExpense, getUserExpensesForChart, getUserExpensesStats } from "../controllers/expense.controller.js";
import { getAIInsights, suggestCategory } from "../controllers/ai-features.controllers.js";

const expenseRouter = express.Router();

expenseRouter.post("/add/:userId", addNewExpense)
expenseRouter.get("/user-expenses/:userId", getUserExpensesForChart);
expenseRouter.get("/user-expnsestats/:userId", getUserExpensesStats);

// Ai Apis and Controllers
expenseRouter.post("/suggest-category", suggestCategory);
expenseRouter.get("/ai-insights/:userId", getAIInsights);

export default expenseRouter;
