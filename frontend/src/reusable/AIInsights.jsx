import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Lightbulb } from "lucide-react";
import { useEffect } from "react";
import { useGetAIInsightsQuery } from "@/features/api/expenseApi";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const AIInsights = () => {
  const { user } = useUser();
  const userId = user?.id;

  // Fetch AI insights
  const {
    data: aiInsights,
    isLoading,
    isFetching,
    refetch,
  } = useGetAIInsightsQuery(userId, {
    skip: !userId,
  });

  // Refetch when userId changes
  useEffect(() => {
    if (userId) {
      refetch?.();
    }
  }, [userId, refetch]);

  // Skeleton while loading
  if (isLoading) {
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
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
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
        {/* Generate Button */}
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="mb-4 w-full"
        >
          {isFetching ? "Generating Insights..." : "Generate AI Insights"}
        </Button>

        {(!aiInsights || aiInsights.length === 0) && (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Add some expenses to get AI-powered insights!
            </p>
          </div>
        )}

        {aiInsights && aiInsights.length > 0 && (
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4 mt-4">
              {aiInsights.map((insight) => {
                const colorMap = {
                  warning: "bg-red-500/10 border-red-500/20 text-red-500",
                  info: "bg-blue-500/10 border-blue-500/20 text-blue-500",
                  success: "bg-green-500/10 border-green-500/20 text-green-500",
                  tip: "bg-yellow-500/10 border-yellow-500/20 text-yellow-500",
                };

                return (
                  <Alert
                    key={insight.id}
                    className={`${colorMap[insight.type]} rounded-lg`}
                  >
                    <div className="font-medium mb-1">{insight.title}</div>
                    <AlertDescription className="text-muted-foreground">
                      {insight.message}
                      {insight.action && (
                        <span className="block mt-2 font-semibold">
                          Action: {insight.action}
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                );
              })}

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-purple-500" />
                  <span className="font-medium text-foreground">Smart Tip</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Track your expenses regularly to get more accurate AI insights
                  and personalized recommendations.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsights;
