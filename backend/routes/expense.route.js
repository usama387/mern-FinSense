import express from "express";
import { addNewExpense } from "../controllers/expense.controller.js";
import { suggestCategory } from "../controllers/suggest-category.controller.js";

const expenseRouter = express.Router();

expenseRouter.post("/add/:userId", addNewExpense)
expenseRouter.post("/suggest-category", suggestCategory);

export default expenseRouter;
