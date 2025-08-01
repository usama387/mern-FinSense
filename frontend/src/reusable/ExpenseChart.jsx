import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { BarChart3 } from "lucide-react";
import { useGetUserExpensesQuery } from "@/features/api/expenseApi";
import { useUser } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton"; // Shadcn skeleton
import { useEffect, useMemo } from "react";
import { format } from "date-fns";

const chartConfig = {
  amount: {
    label: "Amount (PKR)",
    color: "hsl(var(--chart-1))",
  },
};

const ExpenseChart = () => {
  const user = useUser();
  const userId = user?.user?.id;

  // Fetch user expenses dynamically
  const {
    data: expenses = [],
    isLoading,
    refetch,
  } = useGetUserExpensesQuery(userId, {
    skip: !userId,
  });

  // Refetch when userId changes
  useEffect(() => {
    if (userId) {
      refetch?.(); // Only call if refetch exists
    }
  }, [userId, refetch]);

  // Transform backend data -> chart-friendly format
  const chartData = useMemo(() => {
    if (!expenses || expenses.length === 0) return [];

    return expenses.map((expense) => ({
      date: format(new Date(expense.date), "MM/dd"), // Convert ISO to MM/DD
      amount: expense.amount,
    }));
  }, [expenses]);

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          Expense Chart
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Visual representation of your spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // Skeleton loader while chart loads
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
                tickFormatter={(value) => `PKR ${value}`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              />
              <Bar
                dataKey="amount"
                fill="var(--color-amount)"
                radius={[4, 4, 0, 0]}
                barSize={50}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
