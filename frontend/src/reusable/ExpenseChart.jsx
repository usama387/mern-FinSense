import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { BarChart3 } from "lucide-react";

const chartData = [
  { date: "07/26", amount: 120 },
  { date: "07/27", amount: 85 },
  { date: "07/28", amount: 450 },
  { date: "07/29", amount: 200 },
  { date: "07/30", amount: 320 },
];

const chartConfig = {
  amount: {
    label: "Amount ($)",
    color: "hsl(var(--chart-1))",
  },
};

const ExpenseChart = () => {
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
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-muted-foreground" />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
