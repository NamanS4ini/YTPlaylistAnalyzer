"use client";

import { BookmarkIcon, Clock3, RefreshCw } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useEffect, useState } from "react";
import { ImageLoaderProps } from "next/image";
import type { VideoData, PlaylistCard } from "@/lib/types";
import DetailsSkeleton from "./DetailsSkeleton";
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
import { useSettings } from "@/hooks/settingHook";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePlaylistDetailsData } from "@/hooks/usePlaylistDetailsData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PlaylistDetails({
    id,
    start,
    end,
}: {
    id?: string;
    start?: string;
    end?: string;
}) {
    const normalizedStart = start || "0";
    const normalizedEnd = end || "5000";
    const { settings } = useSettings();
    const thumbnail = settings.thumbnail;

    const [Reversed, setReversed] = useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [speed, setSpeed] = useState<string>("1");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [displayVideoData, setDisplayVideoData] = useState<VideoData[] | null>(null);
    const videosPerPage = 30;

    const {
        videoData,
        playlistData,
        error,
        errorMsg,
        loading,
        isUsingCache,
        cacheAgeLabel,
        refreshPlaylistData,
        isRefreshing,
    } = usePlaylistDetailsData({
        id,
        start: normalizedStart,
        end: normalizedEnd,
    });
    const activeVideoData = displayVideoData ?? videoData;

    const wsrvLoader = ({ src, width, quality }: ImageLoaderProps) => {
        const encoded = encodeURIComponent(src);
        return `https://wsrv.nl/?url=${encoded}&w=${width}&q=${quality || 75}`;
    };

    function convertToHrs(seconds: number) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60) || 0;
        const secs = seconds % 60 || 0;
        return hours > 0 ? `${hours}h ${minutes}m ${secs}s` : `${minutes}m ${secs}s`;
    }

    function handelSort(e: React.ChangeEvent<HTMLSelectElement>) {
        if (!activeVideoData) return;

        const sortFunctions: Record<string, (a: VideoData, b: VideoData) => number> = {
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
        setCurrentPage(1);

        const sortFunction = sortFunctions[e.target.value];

        if (sortFunction) {
            setDisplayVideoData([...activeVideoData].sort(sortFunction));
        }
    }

    function handelReverse() {
        if (!activeVideoData) return;

        setDisplayVideoData([...activeVideoData].reverse());
        setReversed(!Reversed);
        setCurrentPage(1);
    }

    function handleBookmark() {
        const savedPlaylists = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        const bookmarked = savedPlaylists.some((playlist: { id: string }) => playlist.id === id);

        if (bookmarked) {
            const updatedPlaylists = savedPlaylists.filter(
                (playlist: { id: string }) => playlist.id !== id
            );
            localStorage.setItem("bookmarks", JSON.stringify(updatedPlaylists));
        } else if (playlistData) {
            savedPlaylists.push(playlistData);
            localStorage.setItem("bookmarks", JSON.stringify(savedPlaylists));
        }

        setIsBookmarked(!bookmarked);
    }

    function convertDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };

        return new Date(dateString).toLocaleDateString("en-IN", options);
    }

    useEffect(() => {
        if (!id) return;

        const savedPlaylists = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        const bookmarked = savedPlaylists.some((playlist: { id: string }) => playlist.id === id);
        setIsBookmarked(bookmarked);
    }, [id]);

    useEffect(() => {
        if (!playlistData || !videoData) return;

        document.title = playlistData.title;

        const currentPlaylist: PlaylistCard = {
            id: playlistData.id,
            title: playlistData.title,
            thumbnail: playlistData.thumbnail || "",
            channelTitle: playlistData.channelTitle,
            channelId: playlistData.channelId || "",
            totalDuration: convertToHrs(
                videoData.reduce(
                    (accumulator, item) => accumulator + (item.duration ? Number(item.duration) : 0),
                    0
                )
            ),
        };

        const recentPlaylists = JSON.parse(localStorage.getItem("recentPlaylists") || "[]");
        const filteredPlaylists = recentPlaylists.filter(
            (playlist: { id: string }) => playlist.id !== currentPlaylist.id
        );

        filteredPlaylists.unshift(currentPlaylist);
        localStorage.setItem("recentPlaylists", JSON.stringify(filteredPlaylists.slice(0, 10)));
    }, [playlistData, videoData]);

    useEffect(() => {
        setDisplayVideoData(null);
    }, [id, normalizedStart, normalizedEnd]);

    useEffect(() => {
        setDisplayVideoData(videoData);
    }, [videoData]);

    useEffect(() => {
        if (!(loading && activeVideoData === null && error === null)) {
            return;
        }

        let toastId: string | number | undefined;
        const loadingTimeout = setTimeout(() => {
            toastId = toast.info(
                "This playlist seems large and will take some time to load. Please wait...",
                { duration: Infinity }
            );
        }, 3000);

        return () => {
            clearTimeout(loadingTimeout);
            if (toastId) {
                toast.dismiss(toastId);
            }
        };
    }, [loading, activeVideoData, error]);

    if (loading && activeVideoData === null && error === null) {
        return (
            <div className="flex flex-col items-center justify-center bg-zinc-950 text-white px-4">
                <DetailsSkeleton />
            </div>
        );
    }

    if (error) {
        return <ErrorDisplay error={error} errorMsg={errorMsg || ""} id={id} />;
    }

    if (activeVideoData) {
        return (
            <div className="flex flex-col pt-16 items-center bg-zinc-950 text-white px-4">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="flex items-center justify-between md:flex-row flex-col gap-4 py-5">
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <h1 className="text-xl md:text-4xl text-center font-bold">
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

                            {isUsingCache && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge
                                            variant="secondary"
                                            className="cursor-default border-blue-500/40 bg-blue-500/10 text-blue-200"
                                        >
                                            <Clock3 className="h-10 w-10" />
                                            Cached
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Loaded from local cache{cacheAgeLabel ? ` (${cacheAgeLabel})` : ""}. Refreshes after {Math.max(24, settings.cacheExpireTime)} hours.
                                    </TooltipContent>
                                </Tooltip>
                            )}

                            {id !== "uploaded" && isUsingCache && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={refreshPlaylistData}
                                    disabled={isRefreshing}
                                    className="dark cursor-pointer"
                                >
                                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
                                    {isRefreshing ? "Refreshing" : "Refresh"}
                                </Button>
                            )}
                        </div>

                        {id !== "uploaded" && (
                            <div className="flex items-center gap-2">
                                <Toggle
                                    onClick={handleBookmark}
                                    size="lg"
                                    variant="outline"
                                    className="dark text-lg cursor-pointer"
                                >
                                    <BookmarkIcon fill={isBookmarked ? "white" : "black"} />
                                    <p className="text-sm md:text-base">
                                        {isBookmarked ? " Bookmarked" : " Bookmark"}
                                    </p>
                                </Toggle>
                            </div>
                        )}
                    </div>

                    <StatisticsCards
                        videoData={activeVideoData}
                        speed={speed}
                        setSpeed={setSpeed}
                        convertToHrs={convertToHrs}
                    />
                </div>

                <div>
                    <SortControls
                        handelSort={handelSort}
                        handelReverse={handelReverse}
                        Reversed={Reversed}
                    />

                    <div className="flex justify-center items-center gap-2 text-sm text-zinc-400 mt-4">
                        <span>
                            Showing {Math.min((currentPage - 1) * videosPerPage + 1, activeVideoData.length)}-
                            {Math.min(currentPage * videosPerPage, activeVideoData.length)} of {activeVideoData.length} videos
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 max-w-6xl w-full mx-auto">
                        {activeVideoData
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

                    {activeVideoData.length > videosPerPage && (
                        <div className="flex justify-center mt-8 mb-28">
                            <Pagination className="dark">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: Math.ceil(activeVideoData.length / videosPerPage) }, (_, index) => {
                                        const pageNumber = index + 1;

                                        if (
                                            pageNumber === 1 ||
                                            pageNumber === Math.ceil(activeVideoData.length / videosPerPage) ||
                                            Math.abs(pageNumber - currentPage) <= 1
                                        ) {
                                            return (
                                                <PaginationItem key={pageNumber}>
                                                    <PaginationLink
                                                        onClick={() => setCurrentPage(pageNumber)}
                                                        isActive={currentPage === pageNumber}
                                                        className="cursor-pointer"
                                                    >
                                                        {pageNumber}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            );
                                        }

                                        if (Math.abs(pageNumber - currentPage) === 2) {
                                            return (
                                                <PaginationItem key={pageNumber}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            );
                                        }

                                        return null;
                                    })}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(activeVideoData.length / videosPerPage)))
                                            }
                                            className={
                                                currentPage === Math.ceil(activeVideoData.length / videosPerPage)
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

    return null;
}
