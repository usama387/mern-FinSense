import OpenAI from "openai";
import prisma from "../utils/prisma.js";


const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.PUBLIC_APP_URL,
    "X-Title": "ExpenseTracker AI",
  },
});

// controller to call the AI service for expense categorization
export const suggestCategory = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || description.trim().length < 2) {
      return res
        .status(400)
        .json({ category: "Other", error: "Description too short" });
    }

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content:
            "You are an expense categorization AI. Categorize into one of: Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Healthcare, Travel, Other. Respond with only the category name.",
        },
        {
          role: "user",
          content: `Categorize this expense: "${description}"`,
        },
      ],
      temperature: 0.1,
      max_tokens: 20,
    });

    const category = completion.choices[0].message.content?.trim();

    const validCategories = [
      "Food & Dining",
      "Transportation",
      "Shopping",
      "Entertainment",
      "Bills & Utilities",
      "Healthcare",
      "Travel",
      "Other",
    ];

    const finalCategory = validCategories.includes(category)
      ? category
      : "Other";

    res.json({ category: finalCategory });
  } catch (error) {
    console.error("AI Suggestion Error:", error);
    res.status(500).json({
      category: "Other",
      error: "AI failed to suggest category",
    });
  }
};

// controller for ai insights 
export const getAIInsights = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    // Fetch last 30 days of expenses from DB
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const expenses = await prisma.record.findMany({
      where: {
        userId,
        createdAt: { gte: thirtyDaysAgo },
      },
      orderBy: { createdAt: "desc" },
      take: 50, // limit to 50 for performance
    });

    // No expenses? Send welcome insights
    if (expenses.length === 0) {
      return res.json([
        {
          id: "welcome-1",
          type: "info",
          title: "Welcome to ExpenseTracker AI!",
          message:
            "Start adding your expenses to get personalized AI insights about your spending patterns.",
          action: "Add your first expense",
          confidence: 1.0,
        },
        {
          id: "welcome-2",
          type: "tip",
          title: "Track Regularly",
          message:
            "For best results, try to log expenses daily. This helps our AI provide more accurate insights.",
          action: "Set daily reminders",
          confidence: 1.0,
        },
      ]);
    }

    // Prepare data for AI prompt
    const expensesSummary = expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category || "Other",
      description: expense.text,
      date: expense.createdAt.toISOString(),
    }));

    const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights.
Return a JSON array like:
[
  {
    "type": "warning|info|success|tip",
    "title": "Brief title",
    "message": "Detailed insight message",
    "action": "Actionable suggestion",
    "confidence": 0.8
  }
]
Data:
${JSON.stringify(expensesSummary, null, 2)}
Focus on patterns, budget alerts, and saving opportunities. Return only JSON.`;

    // Call OpenRouter
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content:
            "You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    // Clean AI response
    let response = completion.choices[0].message.content?.trim();
    if (!response) throw new Error("No response from AI");

    if (response.startsWith("```json")) {
      response = response.replace(/^```json/, "").replace(/```$/, "").trim();
    }

    // Parse and format
    const insights = JSON.parse(response).map((insight, index) => ({
      id: `ai-${Date.now()}-${index}`,
      type: insight.type || "info",
      title: insight.title || "AI Insight",
      message: insight.message || "Analysis complete",
      action: insight.action,
      confidence: insight.confidence || 0.8,
    }));

    res.json(insights);
  } catch (error) {
    console.error("Error generating AI insights:", error);
    res.status(500).json([
      {
        id: "error-1",
        type: "warning",
        title: "Insights Temporarily Unavailable",
        message:
          "We're having trouble analyzing your expenses right now. Please try again later.",
        action: "Retry analysis",
        confidence: 0.5,
      },
    ]);
  }
};
