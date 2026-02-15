import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";
import { ArrowLeft, Bell } from "lucide-react";
import type { MoodCheck } from "@shared/schema";

export default function MoodAdmin() {
  // Fetch recent mood checks to display statistics
  const { data: moodChecks = [], isLoading } = useQuery<MoodCheck[]>({
    queryKey: [`/api/mood/checks/stats`], // This endpoint would need to be added to the backend
    // For now, we'll show a message that data is being gathered
  });

  const recentDays = 7;
  const moodCounts = {
    1: moodChecks.filter(m => m.moodValue === 1).length,
    2: moodChecks.filter(m => m.moodValue === 2).length,
    3: moodChecks.filter(m => m.moodValue === 3).length,
    4: moodChecks.filter(m => m.moodValue === 4).length,
    5: moodChecks.filter(m => m.moodValue === 5).length,
  };

  const moodLabels: Record<number, string> = {
    1: "Very Sad 😢",
    2: "Sad 😔",
    3: "Neutral 😐",
    4: "Happy 🙂",
    5: "Very Happy 😊",
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <Link href="/apps">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Mood Analytics</h1>
          <p className="text-muted-foreground">
            Monitor mood check submissions and manage announcements
          </p>
        </div>
      </div>

      {/* Statistics Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Mood Check Statistics</CardTitle>
          <CardDescription>
            Distribution of mood submissions in the last {recentDays} days
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {Object.entries(moodLabels).map(([value, label]) => (
              <div key={value} className="text-center">
                <div className="text-2xl font-semibold text-primary">
                  {moodCounts[parseInt(value)] || 0}
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Total submissions: <span className="font-semibold text-foreground">{moodChecks.length}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Announcement Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Announcements
          </CardTitle>
          <CardDescription>
            Create and manage announcements for mood check users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/apps/mood/admin/announcements">
            <Button className="w-full">
              <Bell className="w-4 h-4 mr-2" />
              Manage Announcements
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Info */}
      <Card>
        <CardHeader>
          <CardTitle>About Mood Checks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Mood checks are completely anonymous with no user tracking</p>
          <p>• Users can check in once every 7 days</p>
          <p>• Safety alerts trigger on 3+ very sad (1/5) moods in 7 days</p>
          <p>• All data is aggregate-only and never personalized</p>
        </CardContent>
      </Card>
    </div>
  );
}
