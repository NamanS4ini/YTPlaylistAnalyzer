import PlaylistDetails from "@/components/playlistDetails/PlaylistDetails";
import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Playlist Details",
  description:
    "Calculate the total duration of your YouTube playlist. Get detailed information about video count, total runtime, and estimated watch time.",
  keywords: [
    "YouTube",
    "playlist",
    "duration",
    "calculator",
    "video length",
    "watch time",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

const page = async ({ params, searchParams }: { params: Promise<{ url: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
  const session = await auth()
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  let id = resolvedParams.url;

  // Check if playlist ID is in query parameters first
  const listParam = resolvedSearchParams.list as string | undefined;
  if (listParam) {
    id = listParam;
  } else if (id.includes("list%3D")) {
    // %3D means '='
    // Clean the URL by removing playlist identifiers
    id = id.split("list%3D")[1];
  }

  if ((id == "WL" || id == "LL") && !session) {
    redirect("/signin");
  }
  return (
    <>
      <PlaylistDetails id={id} start={(resolvedSearchParams.start as string) || "0"} end={(resolvedSearchParams.end as string) || "5000"} />
    </>
  );
};

export default page;
