import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useGetUserExpensesStatsQuery } from "@/features/api/expenseApi";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ExpenseStatistics = () => {
  const user = useUser();
  const userId = user?.user?.id;

  const {
    data: expenses = [],
    isLoading,
    refetch,
  } = useGetUserExpensesStatsQuery(userId, {
    skip: !userId,
  });

  React.useEffect(() => {
    if (userId) refetch();
  }, [userId, refetch]);

  if (isLoading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            Expense Statistics
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Your spending insights and ranges
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-muted/50 rounded-lg">
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-8 w-24 mx-auto" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!expenses.length) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            Expense Statistics
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            No expense data available yet
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Calculate stats
  const amounts = expenses.map((e) => e.amount);
  const totalAmount = amounts.reduce((acc, val) => acc + val, 0);
  const highestExpense = Math.max(...amounts);
  const lowestExpense = Math.min(...amounts);
  const uniqueDays = new Set(
    expenses.map((e) => new Date(e.date).toDateString())
  ).size;
  const averageDaily = totalAmount / uniqueDays;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="h-8 w-8 rounded-lg bg-green-600 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          Expense Statistics
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Your spending insights and ranges
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground mb-2">
            AVERAGE DAILY SPENDING
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">
            ₨{averageDaily.toFixed(2)}
          </div>
          <Badge variant="secondary" className="text-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            Based on {uniqueDays} days with expenses
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-500">Highest</span>
            </div>
            <div className="text-2xl font-bold text-red-500">
              ₨{highestExpense}
            </div>
          </div>

          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-500">Lowest</span>
            </div>
            <div className="text-2xl font-bold text-green-500">
              ₨{lowestExpense}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseStatistics;
