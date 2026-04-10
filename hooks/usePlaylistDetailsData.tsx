"use client";

import { useEffect, useRef, useState } from "react";
import { useSettings } from "@/hooks/settingHook";
import type { PlayListData, VideoData } from "@/lib/types";
import {
    formatCacheAge,
    getFullPlaylistEnd,
    getPlaylistCacheSnapshot,
    normalizeCacheExpireTime,
    savePlaylistCache,
    slicePlaylistVideos,
} from "@/lib/playlistCache";

type PlaylistDetailsState = {
    videoData: VideoData[] | null;
    playlistData: PlayListData | null;
    error: number | null;
    errorMsg: string | null;
    loading: boolean;
    isUsingCache: boolean;
    cacheAgeLabel: string | null;
};

const DEFAULT_STATE: PlaylistDetailsState = {
    videoData: null,
    playlistData: null,
    error: null,
    errorMsg: null,
    loading: true,
    isUsingCache: false,
    cacheAgeLabel: null,
};

function getFullFetchEndpoint(id: string) {
    const fullEnd = getFullPlaylistEnd();

    if (id === "WL" || id === "LL") {
        return `/api/special-playlist?type=${id}&start=1&end=${fullEnd}`;
    }

    return `/api/details?id=${id}&start=1&end=${fullEnd}`;
}

function applyFetchedPlaylistData(data: unknown) {
    const payload = data as Partial<{
        videoData: VideoData[];
        playlistData: PlayListData | null;
    }>;

    return {
        videoData: Array.isArray(payload.videoData) ? payload.videoData : null,
        playlistData: payload.playlistData ?? null,
    };
}

export function usePlaylistDetailsData({
    id,
    start,
    end,
}: {
    id?: string;
    start: string;
    end: string;
}) {
    const { settings } = useSettings();
    const cacheExpiryHours = normalizeCacheExpireTime(settings.cacheExpireTime);
    const [state, setState] = useState<PlaylistDetailsState>(DEFAULT_STATE);
    const [refreshKey, setRefreshKey] = useState(0);
    const forceRefreshRef = useRef(false);

    const refreshPlaylistData = () => {
        forceRefreshRef.current = true;
        setRefreshKey((prev) => prev + 1);
    };

    useEffect(() => {
        let isActive = true;
        const controller = new AbortController();

        async function loadPlaylistData() {
            const shouldBypassCache = forceRefreshRef.current;
            forceRefreshRef.current = false;

            setState({
                ...DEFAULT_STATE,
                loading: true,
            });

            if (!id) {
                if (!isActive) {
                    return;
                }

                setState({
                    ...DEFAULT_STATE,
                    loading: false,
                    error: 400,
                    errorMsg: "Missing playlist identifier.",
                });
                return;
            }

            if (Number.parseInt(start, 10) > Number.parseInt(end, 10)) {
                if (!isActive) {
                    return;
                }

                setState({
                    ...DEFAULT_STATE,
                    loading: false,
                    error: 400,
                    errorMsg: "Start greater than end",
                });
                return;
            }

            if (id === "uploaded") {
                try {
                    const data = localStorage.getItem("uploadedPlaylist");
                    const fileName = localStorage.getItem("uploadedPlaylistName");

                    if (!data) {
                        throw new Error("No playlist data found. Please upload a file first.");
                    }

                    const parsed = JSON.parse(data) as Array<{
                        videoId: string;
                        timestamp?: string;
                    }>;

                    const videos: VideoData[] = parsed.map((item, index) => ({
                        id: item.videoId,
                        title: "Loading...",
                        thumbnail: `https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`,
                        channelTitle: "Unknown Channel",
                        channelId: undefined,
                        publishedAt: item.timestamp || new Date().toISOString(),
                        position: index,
                        duration: null,
                        likes: null,
                        views: null,
                        comments: null,
                    }));

                    const playlistData: PlayListData = {
                        id: "uploaded",
                        title: fileName?.replace(".csv", "").replace(".json", "") || "Uploaded Playlist",
                        thumbnail: videos[0]?.thumbnail || null,
                        channelTitle: "Google Takeout",
                        channelId: "",
                        totalVideos: videos.length,
                        totalDuration: 0,
                    };

                    if (!isActive) {
                        return;
                    }

                    setState({
                        ...DEFAULT_STATE,
                        loading: false,
                        videoData: videos,
                        playlistData,
                    });
                    return;
                } catch (error) {
                    if (!isActive) {
                        return;
                    }

                    setState({
                        ...DEFAULT_STATE,
                        loading: false,
                        error: 400,
                        errorMsg:
                            error instanceof Error
                                ? error.message
                                : "Failed to parse uploaded file. Please ensure it's a valid format.",
                    });
                    return;
                }
            }

            if (!shouldBypassCache) {
                const cached = getPlaylistCacheSnapshot(id, cacheExpiryHours);

                if (cached) {
                    if (!isActive) {
                        return;
                    }

                    setState({
                        ...DEFAULT_STATE,
                        loading: false,
                        videoData: slicePlaylistVideos(cached.videoData, start, end),
                        playlistData: cached.playlistData,
                        isUsingCache: true,
                        cacheAgeLabel: formatCacheAge(cached.ageHours),
                    });
                    return;
                }
            }

            try {
                const response = await fetch(getFullFetchEndpoint(id), {
                    signal: controller.signal,
                });

                const payload = await response.json().catch(() => null);

                if (!response.ok) {
                    if (!isActive) {
                        return;
                    }

                    setState({
                        ...DEFAULT_STATE,
                        loading: false,
                        error: response.status,
                        errorMsg: payload?.message || "Something went wrong",
                    });
                    return;
                }

                const { videoData, playlistData } = applyFetchedPlaylistData(payload);

                if (!videoData) {
                    throw new Error("Invalid playlist data received from the server.");
                }

                savePlaylistCache(id, {
                    playlistData,
                    videoData,
                });

                if (!isActive) {
                    return;
                }

                setState({
                    ...DEFAULT_STATE,
                    loading: false,
                    videoData: slicePlaylistVideos(videoData, start, end),
                    playlistData,
                });
            } catch (error) {
                if (!isActive) {
                    return;
                }

                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }

                setState({
                    ...DEFAULT_STATE,
                    loading: false,
                    error: 500,
                    errorMsg:
                        error instanceof Error
                            ? error.message
                            : "Unable to load the playlist data.",
                });
            }
        }

        void loadPlaylistData();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, [cacheExpiryHours, end, id, start, refreshKey]);

    return {
        ...state,
        refreshPlaylistData,
        isRefreshing: state.loading && state.videoData !== null,
    };
}
