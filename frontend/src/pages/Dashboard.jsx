import { useState } from "react";
import AddExpenseForm from "@/reusable/AddExpenseForm";
import ExpenseChart from "@/reusable/ExpenseChart";
import ExpenseStatistics from "@/reusable/ExpenseStatistics";
import WelcomeCard from "@/reusable/welcomeCard";
import AIInsights from "@/reusable/AIInsights";

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
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          {/* Sidebar (Left Column) */}
          <div className="w-full lg:w-1/3 space-y-6">
            <WelcomeCard />
            <AddExpenseForm onAddExpense={handleAddExpense} />
          </div>

          {/* Main Content (Right Column) */}
          <div className="w-full lg:w-2/3 space-y-6">
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
                <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4">
                    Recent Expenses
                  </h3>
                  <div className="space-y-2 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                    {expenses
                      .slice(-5)
                      .reverse()
                      .map((expense) => (
                        <div
                          key={expense.id}
                          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="mb-2 sm:mb-0">
                            <div className="font-medium text-foreground text-sm sm:text-base">
                              {expense.description}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
                              {expense.category}
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="font-semibold text-foreground text-sm sm:text-base">
                              Rs {expense.amount.toFixed(2)}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground">
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
    </div>
  );
};

export default Dashboard;