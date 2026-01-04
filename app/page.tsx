import React from "react";
import { Metadata } from "next";
import Homepage from "@/components/home/Homepage";
import Announcement from "@/components/Announcement";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "YouTube Playlist Analyzer | YTPLA",
  description:
    "Calculate the total duration of any YouTube playlist instantly. Paste the playlist link and get accurate total time.",
  alternates: {
    canonical: "https://ytpla.in/",
  },
};

const page = async () => {
  const session = await auth();

  return (
    <div className="bg-zinc-950">
      <Homepage session={session} />
      <Announcement />
    </div>
  );
};

export default page;
