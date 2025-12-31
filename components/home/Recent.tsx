"use client";
import Empty from "@/lib/Empty";
import React from "react";
import { useState, useEffect } from "react";
import type { PlaylistCard } from "@/lib/types";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const Recent = () => {
  const [recent, setRecent] = useState<PlaylistCard[]>();
  useEffect(() => {
    const recentPlaylists = JSON.parse(
      localStorage.getItem("recentPlaylists") || "[]"
    );
    setRecent(recentPlaylists);
  }, []);
  function handleDelete(id: string) {
    const updatedRecent = recent?.filter((playlist) => playlist.id !== id);
    setRecent(updatedRecent);
    localStorage.setItem("recentPlaylists", JSON.stringify(updatedRecent));
  }

  return (
    <div className="mt-10 w-full max-w-5xl mx-auto px-4">
      <h2 className="text-lg sm:text-2xl font-bold mb-10">
        Recently Analyzed Playlists
      </h2>
      <div className="flex flex-col gap-3">
        {recent?.length === 0 && (
          <Empty
            title="No Recent Playlists"
            desc="You haven't analyzed any playlists recently. Start by analyzing a playlist to see it here."
          />
        )}
        {recent?.map((playlist) => (
          <div
            key={playlist.id}
            className="bg-zinc-900 flex flex-col sm:flex-row items-stretch border w-full border-zinc-800 hover:bg-zinc-800 ease-in-out duration-200 transition rounded-lg shadow-lg overflow-hidden"
          >
            <Link
              href={`/${playlist.id}`}
              className="flex flex-1 items-start sm:items-center flex-col sm:flex-row"
            >
              <div className="relative h-36 sm:h-32 w-full sm:w-48 md:w-56 flex-shrink-0">
                <Image
                  src={playlist.thumbnail || "/default-thumbnail.jpg"}
                  fill
                  alt={playlist.title}
                  className="object-cover"
                />
              </div>
              <div className="px-4 py-3 flex-1">
                <h3 className="text-base sm:text-lg font-semibold line-clamp-2">
                  {playlist.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400 mt-1">
                  by {playlist.channelTitle}
                </p>
                {playlist.totalDuration && (
                  <p className="text-xs sm:text-sm text-zinc-500 mt-2">
                    <span className="text-zinc-300">
                      {playlist.totalDuration}
                    </span>
                  </p>
                )}
              </div>
            </Link>
            <div className="sm:border-l-2 border-zinc-700 flex items-center justify-center">
              <button
                onClick={() => handleDelete(playlist.id)}
                className="text-red-500 px-4 py-3 sm:px-6 w-full h-full cursor-pointer sm:w-auto hover:text-red-400 hover:bg-red-950/30 transition-colors flex items-center justify-center gap-2"
                aria-label="Delete playlist"
              >
                <Trash2 size={20} />
                <span className="sm:hidden text-sm">Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recent;
