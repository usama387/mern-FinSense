import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Brain, Lightbulb } from "lucide-react";
import { useEffect, useRef } from "react";
import { useGetAIInsightsQuery } from "@/features/api/expenseApi";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const AIInsights = () => {
  const { user } = useUser();
  const userId = user?.id;

  const {
    data: aiInsights,
    isLoading,
    isFetching,
    refetch,
  } = useGetAIInsightsQuery(userId, {
    skip: !userId,
  });

  // Use ref to track initial mount
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (userId) {
      refetch?.();
    }
  }, [userId, refetch]);

  if (isLoading) {
    return (
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            AI Insights
          </CardTitle>
          <CardDescription className="text-muted-foreground text-xs sm:text-sm">
            Intelligent analysis of your spending patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 sm:h-20 w-full rounded-lg" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
          <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-purple-600 flex items-center justify-center">
            <Brain className="h-4 w-4 text-white" />
          </div>
          AI Insights
        </CardTitle>
        <CardDescription className="text-muted-foreground text-xs sm:text-sm">
          Intelligent analysis of your spending patterns
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="w-full mb-3 sm:mb-4 text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 text-white py-2 sm:py-2.5"
        >
          {isFetching ? "Generating Insights..." : "Generate AI Insights"}
        </Button>

        {(!aiInsights || aiInsights.length === 0) && (
          <div className="text-center py-6 sm:py-8">
            <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-sm sm:text-base">
              Add some expenses and click Generate to get AI-powered insights!
            </p>
          </div>
        )}

        {aiInsights && aiInsights.length > 0 && (
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="grid w-full grid-cols-1 mb-3 sm:mb-4">
              <TabsTrigger value="insights" className="text-xs sm:text-sm">
                Insights
              </TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-3 sm:space-y-4 mt-0">
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
                    className={`${colorMap[insight.type]} rounded-lg p-3 sm:p-4`}
                  >
                    <div className="font-medium text-xs sm:text-sm mb-1 sm:mb-2">{insight.title}</div>
                    <AlertDescription className="text-muted-foreground text-xs sm:text-sm">
                      {insight.message}
                      {insight.action && (
                        <span className="block mt-1 sm:mt-2 font-semibold text-xs sm:text-sm">
                          Action: {insight.action}
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                );
              })}

              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                  <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                  <span className="font-medium text-foreground text-xs sm:text-sm">Smart Tip</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
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