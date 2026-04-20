"use client";

import { useEffect, useRef, useState } from "react";
import { useSettings } from "@/hooks/useSettings";
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
    fullVideoData: VideoData[] | null;
    playlistData: PlayListData | null;
    totalVideos: number | null;
    loadedVideos: number;
    remainingVideos: number;
    isProgressiveLoading: boolean;
    error: number | null;
    errorMsg: string | null;
    loading: boolean;
    isUsingCache: boolean;
    cacheAgeLabel: string | null;
};

const DEFAULT_STATE: PlaylistDetailsState = {
    videoData: null,
    fullVideoData: null,
    playlistData: null,
    totalVideos: null,
    loadedVideos: 0,
    remainingVideos: 0,
    isProgressiveLoading: false,
    error: null,
    errorMsg: null,
    loading: true,
    isUsingCache: false,
    cacheAgeLabel: null,
};

function getLegacyFullFetchEndpoint(id: string) {
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

function getPlaylistMetadataEndpoint(id: string) {
    return `/api/details?id=${id}&mode=playlist`;
}

function getPlaylistBatchEndpoint(id: string, pageToken?: string | null) {
    const query = new URLSearchParams({
        id,
        mode: "batch",
    });

    if (pageToken) {
        query.set("pageToken", pageToken);
    }

    return `/api/details?${query.toString()}`;
}

function applyPlaylistMetadata(data: unknown) {
    const payload = data as Partial<{
        playlistData: PlayListData | null;
    }>;

    return {
        playlistData: payload.playlistData ?? null,
        totalVideos: Number(payload.playlistData?.totalVideos || 0),
    };
}

function applyPlaylistBatch(data: unknown) {
    const payload = data as Partial<{
        videoData: VideoData[];
        nextPageToken: string | null;
        rawBatchSize: number;
    }>;

    return {
        videoData: Array.isArray(payload.videoData) ? payload.videoData : [],
        nextPageToken:
            typeof payload.nextPageToken === "string" ? payload.nextPageToken : null,
        rawBatchSize:
            typeof payload.rawBatchSize === "number" && Number.isFinite(payload.rawBatchSize)
                ? payload.rawBatchSize
                : 0,
    };
}

function isSpecialPlaylist(id: string) {
    return id === "WL" || id === "LL";
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
                        fullVideoData: videos,
                        playlistData,
                        totalVideos: videos.length,
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
                        fullVideoData: cached.videoData,
                        playlistData: cached.playlistData,
                        totalVideos:
                            cached.playlistData?.totalVideos ?? cached.videoData.length,
                        loadedVideos: cached.videoData.length,
                        remainingVideos: 0,
                        isProgressiveLoading: false,
                        isUsingCache: true,
                        cacheAgeLabel: formatCacheAge(cached.ageHours),
                    });
                    return;
                }
            }

            let accumulatedVideos: VideoData[] = [];

            try {
                if (isSpecialPlaylist(id)) {
                    const response = await fetch(getLegacyFullFetchEndpoint(id), {
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
                        fullVideoData: videoData,
                        playlistData,
                        totalVideos: playlistData?.totalVideos ?? videoData.length,
                        loadedVideos: videoData.length,
                        remainingVideos: 0,
                    });
                    return;
                }

                const metadataResponse = await fetch(getPlaylistMetadataEndpoint(id), {
                    signal: controller.signal,
                });
                const metadataPayload = await metadataResponse.json().catch(() => null);

                if (!metadataResponse.ok) {
                    if (!isActive) {
                        return;
                    }

                    setState({
                        ...DEFAULT_STATE,
                        loading: false,
                        error: metadataResponse.status,
                        errorMsg: metadataPayload?.message || "Something went wrong",
                    });
                    return;
                }

                const { playlistData, totalVideos } = applyPlaylistMetadata(metadataPayload);

                if (!isActive) {
                    return;
                }

                setState((prev) => ({
                    ...prev,
                    videoData: [],
                    fullVideoData: [],
                    playlistData,
                    totalVideos,
                    loadedVideos: 0,
                    remainingVideos: totalVideos,
                    isProgressiveLoading: true,
                    loading: true,
                }));

                accumulatedVideos = [];
                let processedVideoCount = 0;
                let nextPageToken: string | null = null;

                do {
                    const batchResponse = await fetch(
                        getPlaylistBatchEndpoint(id, nextPageToken),
                        {
                            signal: controller.signal,
                        }
                    );
                    const batchPayload = await batchResponse.json().catch(() => null);

                    if (!batchResponse.ok) {
                        if (!isActive) {
                            return;
                        }

                        const hasLoadedData = accumulatedVideos.length > 0;
                        if (hasLoadedData) {
                            setState((prev) => ({
                                ...prev,
                                loading: false,
                                isProgressiveLoading: false,
                            }));
                            break;
                        }

                        setState({
                            ...DEFAULT_STATE,
                            loading: false,
                            error: batchResponse.status,
                            errorMsg: batchPayload?.message || "Something went wrong",
                        });
                        return;
                    }

                    const {
                        videoData: batchVideos,
                        nextPageToken: nextToken,
                        rawBatchSize,
                    } =
                        applyPlaylistBatch(batchPayload);

                    accumulatedVideos.push(...batchVideos);
                    processedVideoCount += rawBatchSize;
                    nextPageToken = nextToken;

                    if (!isActive) {
                        return;
                    }

                    const loadedVideos = accumulatedVideos.length;
                    const remainingVideos = Math.max(totalVideos - processedVideoCount, 0);

                    setState((prev) => ({
                        ...prev,
                        loading: true,
                        isProgressiveLoading: nextPageToken !== null,
                        fullVideoData: [...accumulatedVideos],
                        videoData: slicePlaylistVideos(accumulatedVideos, start, end),
                        loadedVideos,
                        remainingVideos,
                    }));
                } while (nextPageToken);

                try {
                    savePlaylistCache(id, {
                        playlistData,
                        videoData: accumulatedVideos,
                    });
                } catch (_cacheError) {
                    console.warn("Failed to save playlist cache, continuing anyway");
                }

                if (!isActive) {
                    return;
                }

                setState((prev) => ({
                    ...prev,
                    loading: false,
                    isProgressiveLoading: false,
                    fullVideoData: accumulatedVideos,
                    videoData: slicePlaylistVideos(accumulatedVideos, start, end),
                    totalVideos: playlistData?.totalVideos ?? accumulatedVideos.length,
                    loadedVideos: accumulatedVideos.length,
                    remainingVideos: 0,
                }));
            } catch (error) {
                if (!isActive) {
                    return;
                }

                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }

                const hasLoadedData = accumulatedVideos.length > 0;
                if (hasLoadedData) {
                    setState((prev) => ({
                        ...prev,
                        loading: false,
                        isProgressiveLoading: false,
                    }));
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
