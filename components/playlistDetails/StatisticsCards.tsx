import { VideoData } from "@/lib/types";

interface StatisticsCardsProps {
    videoData: VideoData[];
    speed: string;
    setSpeed: (speed: string) => void;
    convertToHrs: (seconds: number) => string;
}

export default function StatisticsCards({ videoData, speed, setSpeed, convertToHrs }: StatisticsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 max-w-6xl w-full mx-auto">
            {/* Total Statistics Card */}
            <div className="bg-zinc-950  hover:bg-zinc-900  border border-zinc-700/50 rounded-2xl p-6 shadow-2xl w-full transition-all duration-300 hover:shadow-zinc-800/20 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100">Statistics</h3>
                </div>
                <div className="space-y-5">
                    <div className="group">
                        <p className="text-sm text-zinc-400 mb-1">Total Videos</p>
                        <p className="text-3xl font-bold text-blue-400">
                            {videoData.length.toLocaleString("en-GB")}
                        </p>
                    </div>
                    <div className="h-px"></div>
                    <div className="group">
                        <p className="text-sm text-zinc-400 mb-1">Total Duration</p>
                        <p className="text-2xl font-bold text-zinc-100">
                            {convertToHrs(
                                videoData.reduce(
                                    (acc, item) =>
                                        acc + (item.duration ? Number(item.duration) : 0),
                                    0
                                )
                            )}
                        </p>
                    </div>
                    <div className="h-px"></div>
                    <div className="group">
                        <p className="text-sm text-zinc-400 mb-1">Average Duration</p>
                        <p className="text-2xl font-bold text-zinc-100">
                            {convertToHrs(
                                Math.round(
                                    videoData.reduce(
                                        (acc, item) =>
                                            acc + (item.duration ? Number(item.duration) : 0),
                                        0
                                    ) / videoData.length
                                )
                            )}
                        </p>
                    </div>
                </div>
            </div>

            {/* Engagement Card */}
            <div className="bg-zinc-950  hover:bg-zinc-900  border border-zinc-700/50 rounded-2xl p-6 shadow-2xl w-full transition-all duration-300 hover:shadow-zinc-800/20 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-pink-500/10 rounded-xl">
                        <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100">Engagement</h3>
                </div>
                <div className="space-y-5">
                    <div className="group">
                        <p className="text-sm text-zinc-400 mb-1">Total Likes</p>
                        <p className="text-3xl font-bold  text-pink-400">
                            {videoData
                                .reduce((acc, item) => acc + (item.likes || 0), 0)
                                .toLocaleString("en-GB")}
                        </p>
                    </div>
                    <div className="h-px"></div>
                    <div className="group">
                        <p className="text-sm text-zinc-400 mb-1">Total Views</p>
                        <p className="text-3xl font-bold text-indigo-400">
                            {videoData
                                .reduce((acc, item) => acc + (item.views || 0), 0)
                                .toLocaleString("en-GB")}
                        </p>
                    </div>
                    <div className="h-px"></div>
                    <div className="group">
                        <p className="text-sm text-zinc-400 mb-1">Total Comments</p>
                        <p className="text-3xl font-bold text-cyan-400">
                            {videoData
                                .reduce((acc, item) => acc + (item.comments || 0), 0)
                                .toLocaleString("en-GB")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Playback Speed Card */}
            <div className="bg-zinc-950  hover:bg-zinc-900  border border-zinc-700/50 rounded-2xl p-6 shadow-2xl w-full transition-all duration-300 hover:shadow-zinc-800/20 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100">Playback Speed</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                        <span className="text-sm font-medium text-zinc-300">1.25x</span>
                        <span className="text-sm font-bold text-zinc-100">
                            {convertToHrs(
                                Math.round(
                                    videoData.reduce(
                                        (acc, item) =>
                                            acc + (item.duration ? Number(item.duration) : 0),
                                        0
                                    ) / 1.25
                                )
                            )}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                        <span className="text-sm font-medium text-zinc-300">1.50x</span>
                        <span className="text-sm font-bold text-zinc-100">
                            {convertToHrs(
                                Math.round(
                                    videoData.reduce(
                                        (acc, item) =>
                                            acc + (item.duration ? Number(item.duration) : 0),
                                        0
                                    ) / 1.5
                                )
                            )}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                        <span className="text-sm font-medium text-zinc-300">1.75x</span>
                        <span className="text-sm font-bold text-zinc-100">
                            {convertToHrs(
                                Math.round(
                                    videoData.reduce(
                                        (acc, item) =>
                                            acc + (item.duration ? Number(item.duration) : 0),
                                        0
                                    ) / 1.75
                                )
                            )}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                        <span className="text-sm font-medium text-zinc-300">2.00x</span>
                        <span className="text-sm font-bold text-zinc-100">
                            {convertToHrs(
                                Math.round(
                                    videoData.reduce(
                                        (acc, item) =>
                                            acc + (item.duration ? Number(item.duration) : 0),
                                        0
                                    ) / 2.0
                                )
                            )}
                        </span>
                    </div>
                    <div className="pt-2 border-t border-zinc-700/50">
                        <div className="flex items-center gap-2">
                            <input
                                className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
                                type="number"
                                step="0.25"
                                min="0.25"
                                max="5"
                                placeholder="Custom"
                                onChange={(e) => setSpeed(e.target.value)}
                                value={speed}
                            />
                            <span className="text-sm font-bold text-zinc-100 min-w-[80px] text-right">
                                {convertToHrs(
                                    Math.round(
                                        videoData.reduce(
                                            (acc, item) =>
                                                acc + (item.duration ? Number(item.duration) : 0),
                                            0
                                        ) / (parseFloat(speed) || 1)
                                    )
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
