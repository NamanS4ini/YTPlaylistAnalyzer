import { Metadata } from "next";
import SavedPlaylist from "@/components/SavedPlaylist";

export const metadata: Metadata = {
  title: "Saved Playlists",
  description: "View, manage, and track the total duration of your saved YouTube playlists. Keep all your favorite playlists organized in one place with detailed analytics and quick access controls.",
  keywords: ["YouTube playlists", "saved playlists", "playlist duration", "playlist manager", "YouTube tools"],
  openGraph: {
    title: "Saved Playlists",
    description: "Manage and track your saved YouTube playlists with detailed duration analytics.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saved Playlists",
    description: "Manage and track your saved YouTube playlists with detailed duration analytics.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SavedPlaylistPage() {
  return (
    <div className="min-h-dvh bg-zinc-950">
      <SavedPlaylist />
    </div>
  )
}
