import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Lightbulb,
  Target,
  Calendar,
  DollarSign,
  PieChart,
} from "lucide-react"

const AIInsights = ({ expenses }) => {
  // AI Analysis Functions
  const analyzeSpendingPatterns = () => {
    if (expenses.length === 0) return null

    const categoryTotals = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    }, {})

    const topCategory = Object.entries(categoryTotals).reduce((a, b) =>
      categoryTotals[a[0]] > categoryTotals[b[0]] ? a : b
    )

    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const avgExpense = totalSpent / expenses.length

    return {
      topCategory: topCategory[0],
      topCategoryAmount: topCategory[1],
      topCategoryPercentage: (topCategory[1] / totalSpent) * 100,
      totalSpent,
      avgExpense,
      categoryTotals,
    }
  }

  const generatePredictions = () => {
    if (expenses.length < 3) return null

    const analysis = analyzeSpendingPatterns()
    if (!analysis) return null

    const dailyAvg = analysis.totalSpent / expenses.length
    const monthlyProjection = dailyAvg * 30
    const weeklyProjection = dailyAvg * 7

    return {
      monthlyProjection,
      weeklyProjection,
      dailyAvg,
      trend:
        expenses.length > 1
          ? expenses[expenses.length - 1].amount > expenses[expenses.length - 2].amount
            ? "up"
            : "down"
          : "stable",
    }
  }

  const generateRecommendations = () => {
    const analysis = analyzeSpendingPatterns()
    if (!analysis) return []

    const recommendations = []

    // High spending category recommendation
    if (analysis.topCategoryPercentage > 40) {
      recommendations.push({
        type: "warning",
        title: "High Category Spending",
        description: `${analysis.topCategory} accounts for ${analysis.topCategoryPercentage.toFixed(1)}% of your spending. Consider setting a budget limit.`,
        icon: AlertTriangle,
      })
    }

    // Average expense recommendation
    if (analysis.avgExpense > 200) {
      recommendations.push({
        type: "tip",
        title: "Large Average Expenses",
        description: `Your average expense is $${analysis.avgExpense.toFixed(2)}. Look for opportunities to reduce high-cost items.`,
        icon: Lightbulb,
      })
    }

    // Spending frequency recommendation
    if (expenses.length > 5) {
      recommendations.push({
        type: "insight",
        title: "Frequent Spending",
        description: "You have frequent transactions. Consider consolidating purchases to reduce impulse spending.",
        icon: Target,
      })
    }

    // Budget recommendation
    const predictions = generatePredictions()
    if (predictions && predictions.monthlyProjection > 1000) {
      recommendations.push({
        type: "budget",
        title: "Monthly Budget Alert",
        description: `Projected monthly spending: $${predictions.monthlyProjection.toFixed(2)}. Consider setting spending limits.`,
        icon: DollarSign,
      })
    }

    return recommendations
  }

  const analysis = analyzeSpendingPatterns()
  const predictions = generatePredictions()
  const recommendations = generateRecommendations()

  if (expenses.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            AI Insights
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Intelligent analysis of your spending patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Add some expenses to get AI-powered insights!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <div className="h-8 w-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <Brain className="h-4 w-4 text-white" />
          </div>
          AI Insights
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Intelligent analysis of your spending patterns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="recommendations">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="space-y-4 mt-4">
            {analysis && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <PieChart className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium text-blue-500">Top Category</span>
                    </div>
                    <div className="text-xl font-bold text-foreground">{analysis.topCategory}</div>
                    <div className="text-sm text-muted-foreground">
                      ${analysis.topCategoryAmount.toFixed(2)} ({analysis.topCategoryPercentage.toFixed(1)}%)
                    </div>
                  </div>

                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-green-500">Average Expense</span>
                    </div>
                    <div className="text-xl font-bold text-foreground">${analysis.avgExpense.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Per transaction</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Category Breakdown</h4>
                  {Object.entries(analysis.categoryTotals)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([category, amount]) => {
                      const percentage = (amount / analysis.totalSpent) * 100
                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-foreground">{category}</span>
                            <span className="text-muted-foreground">${amount.toFixed(2)}</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="predictions" className="space-y-4 mt-4">
            {predictions ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
                    <Calendar className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-foreground">${predictions.weeklyProjection.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Weekly Projection</div>
                  </div>

                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center">
                    <Calendar className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-foreground">${predictions.monthlyProjection.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">Monthly Projection</div>
                  </div>

                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-center">
                    {predictions.trend === "up" ? (
                      <TrendingUp className="h-6 w-6 text-red-500 mx-auto mb-2" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    )}
                    <div className="text-lg font-bold text-foreground capitalize">{predictions.trend}</div>
                    <div className="text-sm text-muted-foreground">Spending Trend</div>
                  </div>
                </div>

                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    Based on your current spending pattern, you're projected to spend{" "}
                    <strong>${predictions.monthlyProjection.toFixed(2)}</strong> this month. Your daily average is{" "}
                    <strong>${predictions.dailyAvg.toFixed(2)}</strong>.
                  </AlertDescription>
                </Alert>
              </>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Need more data to generate predictions</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4 mt-4">
            {recommendations.length > 0 ? (
              <div className="space-y-4">
                {recommendations.map((rec, index) => {
                  const Icon = rec.icon
                  const colorClasses = {
                    warning: "bg-red-500/10 border-red-500/20 text-red-500",
                    tip: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
                    insight: "bg-blue-500/10 border-blue-500/20 text-blue-500",
                    budget: "bg-purple-500/10 border-purple-500/20 text-purple-500",
                  }

                  return (
                    <Alert key={index} className={colorClasses[rec.type]}>
                      <Icon className="h-4 w-4" />
                      <div>
                        <div className="font-medium mb-1">{rec.title}</div>
                        <AlertDescription className="text-muted-foreground">{rec.description}</AlertDescription>
                      </div>
                    </Alert>
                  )
                })}

                <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5 text-purple-500" />
                    <span className="font-medium text-foreground">Smart Tip</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Track your expenses for at least a week to get more accurate AI insights and personalized
                    recommendations.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Keep tracking expenses to get personalized recommendations!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default AIInsights
