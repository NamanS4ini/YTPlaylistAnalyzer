"use client";
import { BookmarkIcon } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { ImageLoaderProps } from "next/image";
import { VideoData, PlayListData, PlaylistCard } from "@/lib/types";
import DetailsSkeleton from "./DetailsSkeleton";
import { toast } from "sonner";
import StatisticsCards from "./StatisticsCards";
import VideoCard from "./VideoCard";
import SortControls from "./SortControls";
import ErrorDisplay from "./ErrorDisplay";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PlaylistDetails({ id, start, end }: { id?: string, start?: string, end?: string }) {
  start = start || "0";
  end = end || "5000";

  const [videoData, setVideoData] = useState<VideoData[] | null>(null);
  const [playlistData, setPlaylistData] = useState<PlayListData | null>(null);
  const [error, setError] = useState<number | null>(null);
  const [Reversed, setReversed] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [speed, setSpeed] = useState<string>("1");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const videosPerPage = 30;

  // Use custom image loader to optimize thumbnail loading
  const wsrvLoader = ({ src, width, quality }: ImageLoaderProps) => {
    const encoded = encodeURIComponent(src);
    return `https://wsrv.nl/?url=${encoded}&w=${width}&q=${quality || 75}`;
  };

  function convertToHrs(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60) || 0;
    const secs = seconds % 60 || 0;
    const time =
      hours > 0 ? `${hours}h ${minutes}m ${secs}s` : `${minutes}m ${secs}s`;
    return time;
  }

  function handelThumb() {
    setThumbnail(!thumbnail);
    localStorage.setItem("thumbnail", JSON.stringify(!thumbnail));
  }

  function handelSort(e: React.ChangeEvent<HTMLSelectElement>) {
    if (!videoData) return;

    const sortFunctions: Record<
      string,
      (a: VideoData, b: VideoData) => number
    > = {
      position: (a, b) => a.position - b.position,
      title: (a, b) => a.title.localeCompare(b.title),
      newest: (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      oldest: (a, b) =>
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime(),
      views: (a, b) => (b.views || 0) - (a.views || 0),
      likes: (a, b) => (b.likes || 0) - (a.likes || 0),
      comments: (a, b) => (b.comments || 0) - (a.comments || 0),
      duration: (a, b) => Number(b.duration || 0) - Number(a.duration || 0),
    };
    setReversed(false);
    setCurrentPage(1); // Reset to first page when sorting
    const sortFunction = sortFunctions[e.target.value];
    if (sortFunction) {
      setVideoData([...videoData].sort(sortFunction));
    }
  }

  function handelReverse() {
    if (!videoData) return;
    setVideoData([...videoData].reverse());
    setReversed(!Reversed);
    setCurrentPage(1); // Reset to first page when reversing
  }

  // Handle bookmark
  function handleBookmark() {
    const savedPlaylists = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    const isBookmarked = savedPlaylists.some(
      (playlist: { id: string }) => playlist.id === id
    );
    if (isBookmarked) {
      // Remove from bookmarks
      const updatedPlaylists = savedPlaylists.filter(
        (playlist: { id: string }) => playlist.id !== id
      );
      localStorage.setItem("bookmarks", JSON.stringify(updatedPlaylists));
    } else {
      // Add to bookmarks
      if (playlistData) {
        savedPlaylists.push(playlistData);
        localStorage.setItem("bookmarks", JSON.stringify(savedPlaylists));
      }
    }
    setIsBookmarked(!isBookmarked);
  }

  function convertDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", options);
  }

  //Fetch videoData from backend
  useEffect(() => {
    if (parseInt(start) > parseInt(end)) {
      setError(400);
      setErrorMsg("Start greater than end");
      return;
    }

    let toastId: string | number | undefined;

    // Set a timeout to show toast if loading takes too long
    const loadingTimeout = setTimeout(() => {
      toastId = toast.info("This playlist seems large and will take some time to load. Please wait...", {
        duration: Infinity, // Keep toast until manually dismissed
      });
    }, 3000); // Show toast after 3 seconds

    // Handle uploaded playlists from Google Takeout
    if (id === "uploaded") {
      const data = localStorage.getItem("uploadedPlaylist");
      const fileName = localStorage.getItem("uploadedPlaylistName");

      if (!data) {
        clearTimeout(loadingTimeout);
        setError(404);
        setErrorMsg("No playlist data found. Please upload a file first.");
        return;
      }

      try {
        const parsed = JSON.parse(data);

        // Parse Google Takeout CSV format: [{videoId, timestamp}]
        const videos: VideoData[] = parsed.map((item: { videoId: string; timestamp?: string }, index: number) => ({
          id: item.videoId,
          title: "Loading...",
          thumbnail: `https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`,
          channelTitle: "Unknown Channel",
          channelId: null,
          publishedAt: item.timestamp || new Date().toISOString(),
          position: index,
          duration: null,
          likes: null,
          views: null,
          comments: null,
        }));

        setVideoData(videos);
        setPlaylistData({
          id: "uploaded",
          title: fileName?.replace(".csv", "").replace(".json", "") || "Uploaded Playlist",
          thumbnail: videos[0]?.thumbnail || "",
          channelTitle: "Google Takeout",
          channelId: "",
          totalVideos: videos.length,
          totalDuration: 0,
        });

        // Fetch video details from YouTube API
        const videoIds = videos.map(v => v.id).filter(Boolean);
        const batchSize = 50;
        const batches: string[] = [];

        for (let i = 0; i < videoIds.length; i += batchSize) {
          batches.push(videoIds.slice(i, i + batchSize).join(","));
        }

        Promise.all(
          batches.map(async (ids) => {
            const res = await fetch(`/api/videos?ids=${ids}`);
            const data = await res.json();
            return data.items || [];
          })
        )
          .then((details) => {
            clearTimeout(loadingTimeout);
            if (toastId) toast.dismiss(toastId);

            const flatDetails = details.flat();
            let totalDuration = 0;

            const updatedVideos = videos.map((video) => {
              const detail = flatDetails.find((d: { id: string }) => d.id === video.id);
              if (detail) {
                const duration = detail.duration || 0;
                totalDuration += duration;
                return {
                  ...video,
                  title: detail.title || video.title,
                  thumbnail: detail.thumbnail || video.thumbnail,
                  channelTitle: detail.channelTitle || video.channelTitle,
                  channelId: detail.channelId || video.channelId,
                  duration,
                  likes: detail.likes,
                  views: detail.views,
                  comments: detail.comments,
                };
              }
              return video;
            });

            setVideoData(updatedVideos);
            setPlaylistData(prev => prev ? { ...prev, totalDuration } : null);
          })
          .catch(() => {
            clearTimeout(loadingTimeout);
            if (toastId) toast.dismiss(toastId);
            console.error("Failed to fetch video details");
          });
      } catch {
        clearTimeout(loadingTimeout);
        setError(400);
        setErrorMsg("Failed to parse uploaded file. Please ensure it's a valid format.");
      }

      return () => {
        clearTimeout(loadingTimeout);
        if (toastId) toast.dismiss(toastId);
      };
    }

    // Detect if it's a special playlist (Watch Later or Liked Videos)
    const isSpecialPlaylist = id === "WL" || id === "LL";
    const apiEndpoint = isSpecialPlaylist
      ? `/api/special-playlist?type=${id}&start=${start}&end=${end}`
      : `/api/details?id=${id}&start=${start}&end=${end}`;

    fetch(apiEndpoint)
      .then(async (res) => {
        clearTimeout(loadingTimeout); // Clear timeout when response arrives
        if (toastId) toast.dismiss(toastId); // Dismiss toast if it was shown
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          setError(res.status);
          setErrorMsg(err?.message || "Something went wrong");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        setVideoData(data.videoData);
        setPlaylistData(data.playlistData);
      })
      .catch((err) => {
        clearTimeout(loadingTimeout); // Clear timeout on error
        if (toastId) toast.dismiss(toastId); // Dismiss toast on error
        setError(err.message);
      });

    // Cleanup timeout and toast on unmount
    return () => {
      clearTimeout(loadingTimeout);
      if (toastId) toast.dismiss(toastId);
    };
  }, [id, start, end]);

  useEffect(() => {
    // check if current playlist is bookmarked
    setThumbnail(JSON.parse(localStorage.getItem("thumbnail") || "false"));
    const savedPlaylists = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    );
    const isBookmarked = savedPlaylists.some(
      (playlist: { id: string }) => playlist.id === id
    );
    setIsBookmarked(isBookmarked);
  }, [id, start, end]);

  useEffect(() => {
    if (!playlistData) return;
    document.title = `${playlistData.title} - YTPLA`;
    const currentPlaylist: PlaylistCard = {
      id: playlistData.id,
      title: playlistData.title,
      thumbnail: playlistData.thumbnail || "",
      channelTitle: playlistData.channelTitle,
      channelId: playlistData.channelId || "",
      totalDuration: videoData
        ? convertToHrs(
          videoData.reduce(
            (acc, item) => acc + (item.duration ? Number(item.duration) : 0),
            0
          )
        )
        : "Unknown",
    };
    // Save to recent playlists in localStorage
    const recentPlaylists = JSON.parse(
      localStorage.getItem("recentPlaylists") || "[]"
    );
    // Remove if already exists
    const filteredPlaylists = recentPlaylists.filter(
      (playlist: { id: string }) => playlist.id !== currentPlaylist.id
    );
    // Add to the start
    filteredPlaylists.unshift(currentPlaylist);
    // Keep only latest 10
    const limitedPlaylists = filteredPlaylists.slice(0, 10);
    localStorage.setItem("recentPlaylists", JSON.stringify(limitedPlaylists));
  }, [playlistData, videoData]);

  if (videoData === null && error === null) {
    return (
      <div className="flex flex-col items-center justify-center bg-zinc-950 text-white px-4">
        <DetailsSkeleton />
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay error={error} errorMsg={errorMsg || ""} id={id} />;
  }

  if (videoData) {
    return (
      <div className="flex flex-col pt-16 items-center bg-zinc-950 text-white px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-4 py-5">
            <h1 className="text-2xl md:text-4xl font-bold">
              {id === "uploaded" ? (
                playlistData?.title
              ) : (
                <a
                  className="hover:underline"
                  href={`https://www.youtube.com/playlist?list=${playlistData?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {playlistData?.title}
                </a>
              )}
            </h1>
            {id !== "uploaded" && (
              <div>
                <Toggle
                  onClick={handleBookmark}
                  size="lg"
                  variant="outline"
                  className="dark text-lg cursor-pointer"
                >
                  <BookmarkIcon fill={isBookmarked ? "white" : "black"} />
                  {isBookmarked ? " Bookmarked" : " Bookmark"}
                </Toggle>
              </div>
            )}
          </div>

          <StatisticsCards
            videoData={videoData}
            speed={speed}
            setSpeed={setSpeed}
            convertToHrs={convertToHrs}
          />
        </div>
        <div>
          <SortControls
            thumbnail={thumbnail}
            handelThumb={handelThumb}
            handelSort={handelSort}
            handelReverse={handelReverse}
            Reversed={Reversed}
          />

          {/* Pagination Info */}
          <div className="flex justify-center items-center gap-2 text-sm text-zinc-400 mt-4">
            <span>
              Showing {Math.min((currentPage - 1) * videosPerPage + 1, videoData.length)}-
              {Math.min(currentPage * videosPerPage, videoData.length)} of {videoData.length} videos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 max-w-6xl w-full mx-auto">
            {videoData
              .slice((currentPage - 1) * videosPerPage, currentPage * videosPerPage)
              .map((item) => (
                <VideoCard
                  key={`${item.id}${item.position}`}
                  item={item}
                  playlistId={playlistData?.id}
                  thumbnail={thumbnail}
                  convertToHrs={convertToHrs}
                  convertDate={convertDate}
                  wsrvLoader={wsrvLoader}
                />
              ))}
          </div>

          {/* Pagination Controls */}
          {videoData.length > videosPerPage && (
            <div className="flex justify-center mt-8 mb-28">
              <Pagination className="dark">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {(() => {
                    const totalPages = Math.ceil(videoData.length / videosPerPage);
                    const pages = [];
                    const showEllipsisStart = currentPage > 3;
                    const showEllipsisEnd = currentPage < totalPages - 2;

                    // Always show first page
                    pages.push(
                      <PaginationItem key={1}>
                        <PaginationLink
                          onClick={() => setCurrentPage(1)}
                          isActive={currentPage === 1}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    );

                    // Show ellipsis or page 2
                    if (totalPages === 2) {
                      // For 2 pages, just show page 2 and skip to the end
                      pages.push(
                        <PaginationItem key={2}>
                          <PaginationLink
                            onClick={() => setCurrentPage(2)}
                            isActive={currentPage === 2}
                            className="cursor-pointer"
                          >
                            2
                          </PaginationLink>
                        </PaginationItem>
                      );
                      return pages;
                    }

                    if (showEllipsisStart) {
                      pages.push(
                        <PaginationItem key="ellipsis-start">
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    } else if (totalPages > 2) {
                      // Only add page 2 if we have more than 2 pages
                      pages.push(
                        <PaginationItem key={2}>
                          <PaginationLink
                            onClick={() => setCurrentPage(2)}
                            isActive={currentPage === 2}
                            className="cursor-pointer"
                          >
                            2
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    // Show current page and neighbors (if not already shown)
                    if (currentPage > 2 && currentPage < totalPages - 1) {
                      if (currentPage > 3) {
                        pages.push(
                          <PaginationItem key={currentPage - 1}>
                            <PaginationLink
                              onClick={() => setCurrentPage(currentPage - 1)}
                              className="cursor-pointer"
                            >
                              {currentPage - 1}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      pages.push(
                        <PaginationItem key={currentPage}>
                          <PaginationLink
                            onClick={() => setCurrentPage(currentPage)}
                            isActive={true}
                            className="cursor-pointer"
                          >
                            {currentPage}
                          </PaginationLink>
                        </PaginationItem>
                      );

                      if (currentPage < totalPages - 2) {
                        pages.push(
                          <PaginationItem key={currentPage + 1}>
                            <PaginationLink
                              onClick={() => setCurrentPage(currentPage + 1)}
                              className="cursor-pointer"
                            >
                              {currentPage + 1}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                    }

                    // Show ellipsis or second-to-last page
                    if (showEllipsisEnd) {
                      pages.push(
                        <PaginationItem key="ellipsis-end">
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    } else if (totalPages > 3 && currentPage !== totalPages - 1) {
                      // Only add second-to-last page if we have more than 3 pages and it's not already shown
                      pages.push(
                        <PaginationItem key={totalPages - 1}>
                          <PaginationLink
                            onClick={() => setCurrentPage(totalPages - 1)}
                            isActive={currentPage === totalPages - 1}
                            className="cursor-pointer"
                          >
                            {totalPages - 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    // Always show last page (if more than 2 pages and not already shown)
                    if (totalPages > 2) {
                      pages.push(
                        <PaginationItem key={totalPages}>
                          <PaginationLink
                            onClick={() => setCurrentPage(totalPages)}
                            isActive={currentPage === totalPages}
                            className="cursor-pointer"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    return pages;
                  })()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, Math.ceil(videoData.length / videosPerPage))
                        )
                      }
                      className={
                        currentPage === Math.ceil(videoData.length / videosPerPage)
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    );
  }
}