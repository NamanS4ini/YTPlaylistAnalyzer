import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback - YouTube Playlist Analyzer",
  description:
    "Provide your valuable feedback to help improve YouTube Playlist Analyzer. Share your thoughts and suggestions to enhance your playlist management experience.",
  keywords: [
    "YouTube playlists",
    "feedback",
    "playlist duration",
    "playlist manager",
    "YouTube tools",
  ],
  openGraph: {
    title: "Feedback - YouTube Playlist Analyzer",
    description:
      "Provide your valuable feedback to help improve YouTube Playlist Analyzer. Share your thoughts and suggestions to enhance your playlist management experience.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedback - YouTube Playlist Analyzer",
    description:
      "Provide your valuable feedback to help improve YouTube Playlist Analyzer. Share your thoughts and suggestions to enhance your playlist management experience.",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const Feedback = () => {
  return (
    <>
      <main className="pt-20  bg-zinc-950 min-h-screen flex justify-center">
        <iframe
          className="invert hue-rotate-180"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdPaVJ0_2mfaJ69e5A1JkskNnF9NMc1iIbigHD2VHYCKDNhsQ/viewform?embedded=true"
          width="700"
          height="screen"
        >
          Loading…
        </iframe>
      </main>
    </>
  );
};

export default Feedback;
