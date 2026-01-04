import Image from "next/image";
import { ImageLoaderProps } from "next/image";
import { VideoData } from "@/lib/types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface VideoCardProps {
    item: VideoData;
    playlistId: string | null | undefined;
    thumbnail: boolean;
    convertToHrs: (seconds: number) => string;
    convertDate: (dateString: string) => string;
    wsrvLoader: (props: ImageLoaderProps) => string;
}

export default function VideoCard({ item, playlistId, thumbnail, convertToHrs, convertDate, wsrvLoader }: VideoCardProps) {
    return (
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-800/50 hover:from-zinc-850 hover:to-zinc-800 border border-zinc-700/50 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-zinc-700/20 transition-all duration-300 hover:border-zinc-600/50 group">
            <a
                href={`https://www.youtube.com/watch?v=${item.id}&list=${playlistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
            >
                {/* Thumbnail Section */}
                <div className="relative overflow-hidden">
                    {thumbnail ? (
                        <>
                            <Image
                                loader={wsrvLoader}
                                width={400}
                                height={225}
                                src={item.thumbnail || ""}
                                alt={item.title}
                                className="w-full aspect-video object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold">
                                {item.duration ? convertToHrs(Number(item.duration)) : "0:00"}
                            </div>
                            <div className="absolute top-2 left-2 bg-zinc-900/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-zinc-300">
                                #{item.position + 1}
                            </div>
                        </>
                    ) : (
                        <div className="w-full aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                            <div className="text-center p-4">
                                <svg className="w-12 h-12 mx-auto mb-2 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-xs text-zinc-500 font-medium">
                                    #{item.position + 1} • {item.duration ? convertToHrs(Number(item.duration)) : "0:00"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-4 space-y-3">
                    {/* Title */}
                    <h3 className="text-base font-semibold text-zinc-100 line-clamp-2 min-h-[2.5rem] group-hover:text-white transition-colors leading-snug">
                        {item.title}
                    </h3>

                    {/* Channel */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                            {item.channelTitle?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <a
                            href={`https://www.youtube.com/channel/${item.channelId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors truncate"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {item.channelTitle}
                        </a>
                    </div>

                    {/* Stats Grid */}
                    <TooltipProvider delayDuration={300}>
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-700/50">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-1.5 cursor-help w-fit">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="text-xs text-zinc-400 truncate">
                                            {item.views ? (item.views >= 1000000 ? (item.views / 1000000).toFixed(1) + "M" : item.views >= 1000 ? (item.views / 1000).toFixed(1) + "K" : item.views.toLocaleString("en-GB")) : "0"}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-semibold">{item.views?.toLocaleString("en-GB") || "0"} views</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-1.5 cursor-help w-fit">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        <span className="text-xs text-zinc-400 truncate">
                                            {item.likes ? (item.likes >= 1000000 ? (item.likes / 1000000).toFixed(1) + "M" : item.likes >= 1000 ? (item.likes / 1000).toFixed(1) + "K" : item.likes.toLocaleString("en-GB")) : "N/A"}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-semibold">{item.likes ? item.likes.toLocaleString("en-GB") + " likes" : "Likes disabled"}</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-1.5 cursor-help w-fit">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                        <span className="text-xs text-zinc-400 truncate">
                                            {item.comments != null ? (item.comments >= 1000000 ? (item.comments / 1000000).toFixed(1) + "M" : item.comments >= 1000 ? (item.comments / 1000).toFixed(1) + "K" : item.comments.toLocaleString("en-GB")) : "N/A"}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-semibold">{item.comments != null ? item.comments.toLocaleString("en-GB") + " comments" : "Comments disabled"}</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-1.5 cursor-help w-fit">
                                        <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-xs text-zinc-400 truncate">
                                            {new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-semibold">{convertDate(item.publishedAt)}</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                </div>
            </a>
        </div>
    );
}
