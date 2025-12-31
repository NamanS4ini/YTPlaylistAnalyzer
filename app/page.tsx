import React from "react";
import { Metadata } from "next";
import Homepage from "@/components/home/Homepage";

export const metadata: Metadata = {
  title: "YouTube Playlist Analyzer | YTPLA",
  description:
    "Calculate the total duration of any YouTube playlist instantly. Paste the playlist link and get accurate total time.",
  alternates: {
    canonical: "https://ytpla.in/",
  },
};

const page = () => {
  return (
    <div className="bg-zinc-950">
      <Homepage />
    </div>
  );
};

export default page;
