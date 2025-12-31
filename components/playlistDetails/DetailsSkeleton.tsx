import React from "react";
import { Skeleton } from "../ui/skeleton";

const DetailsSkeleton = () => {
  return (
    <div className="flex flex-col pt-16 items-center bg-zinc-950 text-white px-4 w-full">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header with title and bookmark button */}
        <div className="flex items-center justify-between gap-4 py-5">
          <Skeleton className="h-10 w-3/4 md:w-1/2 bg-zinc-800" />
          <Skeleton className="h-10 w-32 bg-zinc-800" />
        </div>

        {/* Stats cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-w-6xl w-full mx-auto">
          {/* Card 1 - Total stats */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl w-full max-w-md space-y-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-5 w-32 mb-2 bg-zinc-700" />
                <Skeleton className="h-8 w-24 bg-zinc-700" />
              </div>
              <div>
                <Skeleton className="h-5 w-36 mb-2 bg-zinc-700" />
                <Skeleton className="h-8 w-28 bg-zinc-700" />
              </div>
              <div>
                <Skeleton className="h-5 w-40 mb-2 bg-zinc-700" />
                <Skeleton className="h-8 w-32 bg-zinc-700" />
              </div>
            </div>
          </div>

          {/* Card 2 - Likes and views */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl w-full max-w-md space-y-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-5 w-28 mb-2 bg-zinc-700" />
                <Skeleton className="h-8 w-32 bg-zinc-700" />
              </div>
              <div>
                <Skeleton className="h-5 w-28 mb-2 bg-zinc-700" />
                <Skeleton className="h-8 w-36 bg-zinc-700" />
              </div>
            </div>
          </div>

          {/* Card 3 - Playback speeds */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-xl w-full max-w-md space-y-6">
            <Skeleton className="h-6 w-48 mb-4 bg-zinc-700" />
            <div className="space-y-3">
              <Skeleton className="h-5 w-full bg-zinc-700" />
              <Skeleton className="h-5 w-full bg-zinc-700" />
              <Skeleton className="h-5 w-full bg-zinc-700" />
              <Skeleton className="h-5 w-full bg-zinc-700" />
              <Skeleton className="h-10 w-full bg-zinc-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Videos section */}
      <div className="w-full max-w-6xl mx-auto">
        {/* Section header with thumbnail toggle */}
        <div className="flex md:flex-row items-center gap-5 flex-col justify-between py-5">
          <Skeleton className="h-10 w-64 bg-zinc-800" />
          <Skeleton className="h-10 w-40 bg-zinc-800" />
        </div>

        {/* Sort controls */}
        <div className="flex gap-10 justify-center md:justify-start items-center p-5">
          <Skeleton className="h-8 w-24 bg-zinc-800" />
          <div className="flex gap-4 justify-center items-center">
            <Skeleton className="h-10 w-40 bg-zinc-800" />
            <Skeleton className="h-6 w-6 bg-zinc-800" />
          </div>
        </div>

        {/* Video cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-w-6xl w-full mx-auto">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 shadow-lg"
            >
              {/* Position and duration */}
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-16 bg-zinc-700" />
                <Skeleton className="h-4 w-12 bg-zinc-700" />
              </div>

              {/* Thumbnail */}
              <Skeleton className="h-48 w-full rounded-lg mb-2 bg-zinc-700" />

              {/* Title */}
              <Skeleton className="h-6 w-full mb-2 bg-zinc-700" />
              <Skeleton className="h-6 w-3/4 mb-3 bg-zinc-700" />

              {/* Channel name */}
              <Skeleton className="h-4 w-2/3 mb-2 bg-zinc-700" />

              {/* Views and date */}
              <Skeleton className="h-4 w-full mb-1 bg-zinc-700" />

              {/* Likes and comments */}
              <Skeleton className="h-4 w-5/6 bg-zinc-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
