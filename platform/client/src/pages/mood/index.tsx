import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoodCheckDialog } from "@/components/mood/mood-check-dialog";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { useClientId } from "@/hooks/useClientId";
import { useState } from "react";
import { Heart, Smile } from "lucide-react";

export default function MoodPage() {
  const clientId = useClientId();
  const [showMoodDialog, setShowMoodDialog] = useState(false);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 pb-24 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">Mood Check</h1>
        <p className="text-muted-foreground">
          Track how you're feeling and understand your emotional wellbeing
        </p>
      </div>

      <AnnouncementBanner
        apiEndpoint="/api/mood/announcements"
        queryKey="/api/mood/announcements"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smile className="w-5 h-5" />
            Check In With Yourself
          </CardTitle>
          <CardDescription>
            Your mood check is completely anonymous and helps us understand how we can better support you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Check in once a week to help us track your emotional wellbeing. Your responses are private and never shared.
          </p>
          <Button
            onClick={() => setShowMoodDialog(true)}
            className="w-full"
            data-testid="button-mood-check"
          >
            <Heart className="w-4 h-4 mr-2" />
            How are you feeling?
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Mood Checks?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-sm mb-1">Track Your Wellbeing</h3>
              <p className="text-sm text-muted-foreground">
                Regular mood checks help you recognize patterns in your emotional health.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Anonymous & Private</h3>
              <p className="text-sm text-muted-foreground">
                Your mood data is completely anonymous and never shared with anyone else.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Safety Support</h3>
              <p className="text-sm text-muted-foreground">
                If we notice concerning patterns, we'll gently offer support resources.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Your mood checks are completely anonymous</li>
            <li>✓ We never collect or store personal information</li>
            <li>✓ Data is only used in aggregate form</li>
            <li>✓ You can check in as often or as little as you want</li>
          </ul>
        </CardContent>
      </Card>

      <MoodCheckDialog
        open={showMoodDialog}
        onOpenChange={setShowMoodDialog}
      />
    </div>
  );
}
