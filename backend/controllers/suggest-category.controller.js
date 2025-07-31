import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.PUBLIC_APP_URL,
    "X-Title": "ExpenseTracker AI",
  },
});

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
