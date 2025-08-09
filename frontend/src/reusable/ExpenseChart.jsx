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
import { Skeleton } from "@/components/ui/skeleton";
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

  const {
    data: expenses = [],
    isLoading,
    refetch,
  } = useGetUserExpensesQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (userId) {
      refetch?.();
    }
  }, [userId, refetch]);

  const chartData = useMemo(() => {
    if (!expenses || expenses.length === 0) return [];

    return expenses.map((expense) => ({
      date: format(new Date(expense.date), "MM/dd"),
      amount: expense.amount,
    }));
  }, [expenses]);

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-green-600 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          Expense Chart
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs sm:text-sm">
          Visual representation of your spending
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {isLoading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-6 sm:h-8 w-1/3" />
            <Skeleton className="h-[150px] sm:h-[200px] w-full" />
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="min-h-[150px] sm:min-h-[200px] w-full">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs sm:text-sm"
                tick={{ fontSize: 10, transform: 'translate(0, 5)' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground text-xs sm:text-sm"
                tickFormatter={(value) => `PKR ${value}`}
                tick={{ fontSize: 10 }}
                width={50}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              />
              <Bar
                dataKey="amount"
                fill="var(--color-amount)"
                radius={[4, 4, 0, 0]}
                barSize={30} // Reduced for mobile
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;