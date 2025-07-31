import prisma from "../utils/prisma.js";

export const addNewExpense = async (req, res) => {
  try {
    const { amount, text, category, date } = req.body;
    const { userId } = req.params;

    // Validate required fields
    if (!text || !amount || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Parse amount to Float and validate
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount < 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    // Convert date string to DateTime if provided, otherwise use default (now)
    const expenseDate = date ? new Date(date) : new Date();
    if (isNaN(expenseDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    // Directly save Clerk userId
    const newRecord = await prisma.record.create({
      data: {
        text,
        amount: parsedAmount,
        category: category || "Other",
        date: expenseDate,
        userId, // Clerk user ID
      },
    });

    res.status(201).json({
      message: "Expense added successfully",
      record: newRecord,
    });
  } catch (error) {
    console.log("Error adding new expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
