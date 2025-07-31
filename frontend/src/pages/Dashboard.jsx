import { useState } from "react";
import AddExpenseForm from "@/reusable/AddExpenseForm";
import ExpenseChart from "@/reusable/ExpenseChart";
import ExpenseStatistics from "@/reusable/ExpenseStatistics";
import WelcomeCard from "@/reusable/welcomeCard";
import AIInsights from "@/reusable/AiInsights";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  // Calculate statistics
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const averageDaily =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;
  const highestExpense =
    expenses.length > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0;
  const lowestExpense =
    expenses.length > 0 ? Math.min(...expenses.map((e) => e.amount)) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 flex flex-row h-full">
        {/* Sidebar (Left Column) */}
        <div className="w-1/3 pr-4 space-y-6">
          <WelcomeCard />
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </div>

        {/* Main Content (Right Column) */}
        <div className="w-2/3 pl-4 space-y-6">
          <ExpenseChart />
          <ExpenseStatistics
            averageDaily={averageDaily}
            highestExpense={highestExpense}
            lowestExpense={lowestExpense}
            daysWithExpenses={expenses.length}
          />
          <AIInsights expenses={expenses} />
          {expenses.length > 0 && (
            <div className="mt-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Recent Expenses
                </h3>
                <div className="space-y-2">
                  {expenses
                    .slice(-5)
                    .reverse()
                    .map((expense) => (
                      <div
                        key={expense.id}
                        className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-foreground">
                            {expense.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {expense.category}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">
                            ${expense.amount.toFixed(2)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {expense.date.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;