"use client";

import { useState, useEffect } from "react";
import { X, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AnnouncementType } from "@/lib/types";



const Announcement = () => {
  // Edit this array to manage announcements
  const announcements: AnnouncementType[] = [
    {
      id: 1024,
      message: "You can now sign in to analyze your Liked Videos playlist.\nDuring sign-in, you may see a Google warning because the app is currently under review. This is expected and safe to proceed.",
      enabled: true,
    },
  ];

  const [dismissedIds, setDismissedIds] = useState<number[]>([]);
  useEffect(() => {
    const dismissed = localStorage.getItem("dismissedAnnouncements");
    if (dismissed) {
      setDismissedIds(JSON.parse(dismissed));
    }
  }, []);

  const handleClose = (id: number) => {
    const newDismissed = [...dismissedIds, id];
    setDismissedIds(newDismissed);
    localStorage.setItem(
      "dismissedAnnouncements",
      JSON.stringify(newDismissed)
    );
  };

  // Filter enabled and non-dismissed announcements, sorted by ID (highest first)
  const visibleAnnouncements = announcements
    .filter((a) => a.enabled && !dismissedIds.includes(a.id))

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-5xl mx-auto px-4 pb-4">
        <div className="flex flex-col gap-2 pointer-events-auto">
          {visibleAnnouncements.map((announcement, index) => (
            <Alert
              key={announcement.id}
              className="bg-zinc-900/95 flex items-center border-zinc-800 backdrop-blur-sm shadow-lg animate-in slide-in-from-bottom-5 duration-500"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="px-4">
              <Info color="aqua" />
              </div>
              <AlertDescription className="text-zinc-200 pr-8">
                <div
                  className="leading-relaxed text-sm sm:text-lg text-white"
                  dangerouslySetInnerHTML={{ __html: announcement.message }}
                />
              </AlertDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleClose(announcement.id)}
                className="absolute top-2 right-2 h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
                aria-label="Dismiss announcement"
              >
                <X className="h-4 w-4" />
              </Button>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
