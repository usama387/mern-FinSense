import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Activity } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { format } from "date-fns";

const WelcomeCard = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn || !user) {
    return null; // or a loading state if preferred
  }

  const userName = user.firstName || "User";
  const joinedDate = user.createdAt ? format(new Date(user.createdAt), "MM/dd/yyyy") : "Unknown";
  const lastActiveDate = user.lastSignInAt ? format(new Date(user.lastSignInAt), "MM/dd/yyyy") : "Unknown";
  const avatarUrl = user.imageUrl || "/placeholder.svg";

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={avatarUrl}
                alt={userName}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground">
              Welcome Back, {userName}!
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Here's a quick overview of your recent expense activity. Track your spending, analyze patterns, and manage your budget efficiently!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4">
          <Badge
            variant="secondary"
            className="flex items-center gap-2 px-3 py-2"
          >
            <CalendarDays className="h-4 w-4 text-green-600" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Joined</span>
              <span className="text-sm font-medium">{joinedDate}</span>
            </div>
          </Badge>
          <Badge
            variant="secondary"
            className="flex items-center gap-2 px-3 py-2"
          >
            <Activity className="h-4 w-4 text-green-600" />
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Last Active</span>
              <span className="text-sm font-medium">{lastActiveDate}</span>
            </div>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;