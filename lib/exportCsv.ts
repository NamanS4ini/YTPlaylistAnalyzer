import type { VideoData } from "./types";

export type CsvColumnId =
    | "position"
    | "title"
    | "url"
    | "videoId"
    | "durationFormatted"
    | "durationSeconds"
    | "views"
    | "likes"
    | "comments"
    | "publishedAt"
    | "channelTitle"
    | "channelUrl"
    | "channelId"
    | "thumbnail";

export interface CsvColumnDefinition {
    id: CsvColumnId;
    label: string;
    category: "General" | "Engagement" | "Video Info" | "Channel";
    description: string;
    defaultSelected: boolean;
    getValue: (video: VideoData, playlistId?: string | null) => string | number;
}

export function formatDurationToHuman(seconds: number | string | null): string {
    if (seconds == null || seconds === "") return "";
    const secNum = Number(seconds);
    if (isNaN(secNum) || secNum <= 0) return "0s";

    const hours = Math.floor(secNum / 3600);
    const minutes = Math.floor((secNum % 3600) / 60);
    const secs = Math.floor(secNum % 60);

    const parts: string[] = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(" ");
}

export function formatPublishedDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return String(dateStr);
        return date.toISOString().replace("T", " ").replace(/\..+/, "");
    } catch {
        return String(dateStr || "");
    }
}

export const CSV_COLUMNS: CsvColumnDefinition[] = [
    {
        id: "position",
        label: "Position",
        category: "General",
        description: "Playlist item order number (1, 2, 3...)",
        defaultSelected: true,
        getValue: (video) => (typeof video.position === "number" ? video.position + 1 : ""),
    },
    {
        id: "title",
        label: "Title",
        category: "General",
        description: "Full title of the video",
        defaultSelected: true,
        getValue: (video) => video.title || "",
    },
    {
        id: "url",
        label: "Video URL",
        category: "General",
        description: "Direct link to watch the YouTube video",
        defaultSelected: true,
        getValue: (video, playlistId) =>
            playlistId && playlistId !== "uploaded"
                ? `https://www.youtube.com/watch?v=${video.id}&list=${playlistId}`
                : `https://www.youtube.com/watch?v=${video.id}`,
    },
    {
        id: "videoId",
        label: "Video ID",
        category: "General",
        description: "YouTube unique 11-character video ID",
        defaultSelected: false,
        getValue: (video) => video.id || "",
    },
    {
        id: "views",
        label: "Views",
        category: "Engagement",
        description: "Total view count (numeric)",
        defaultSelected: true,
        getValue: (video) => (video.views != null ? video.views : ""),
    },
    {
        id: "likes",
        label: "Likes",
        category: "Engagement",
        description: "Total like count (numeric)",
        defaultSelected: true,
        getValue: (video) => (video.likes != null ? video.likes : ""),
    },
    {
        id: "comments",
        label: "Comments",
        category: "Engagement",
        description: "Total comment count (numeric)",
        defaultSelected: true,
        getValue: (video) => (video.comments != null ? video.comments : ""),
    },
    {
        id: "durationFormatted",
        label: "Duration",
        category: "Video Info",
        description: "Readable runtime (e.g. 1h 24m 10s)",
        defaultSelected: true,
        getValue: (video) => formatDurationToHuman(video.duration),
    },
    {
        id: "durationSeconds",
        label: "Duration (Seconds)",
        category: "Video Info",
        description: "Raw runtime in seconds for calculations",
        defaultSelected: false,
        getValue: (video) => (video.duration != null && video.duration !== "" ? Number(video.duration) : ""),
    },
    {
        id: "publishedAt",
        label: "Published Date",
        category: "Video Info",
        description: "Upload date and time (UTC)",
        defaultSelected: true,
        getValue: (video) => formatPublishedDate(video.publishedAt),
    },
    {
        id: "channelTitle",
        label: "Channel Name",
        category: "Channel",
        description: "Name of the channel that uploaded the video",
        defaultSelected: true,
        getValue: (video) => video.channelTitle || "",
    },
    {
        id: "channelUrl",
        label: "Channel URL",
        category: "Channel",
        description: "Direct link to the creator's YouTube channel",
        defaultSelected: false,
        getValue: (video) =>
            video.channelId ? `https://www.youtube.com/channel/${video.channelId}` : "",
    },
    {
        id: "channelId",
        label: "Channel ID",
        category: "Channel",
        description: "Creator's YouTube channel ID",
        defaultSelected: false,
        getValue: (video) => video.channelId || "",
    },
    {
        id: "thumbnail",
        label: "Thumbnail URL",
        category: "Media",
        description: "Direct URL to video thumbnail image",
        defaultSelected: false,
        getValue: (video) => video.thumbnail || "",
    },
];

export function escapeCsvField(value: unknown): string {
    if (value === null || value === undefined) return "";
    const str = String(value);
    if (str.includes('"') || str.includes(",") || str.includes("\n") || str.includes("\r")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

export function generateCsvContent({
    videos,
    columns,
    playlistId,
    includeHeader = true,
}: {
    videos: VideoData[];
    columns: CsvColumnDefinition[];
    playlistId?: string | null;
    includeHeader?: boolean;
}): string {
    const rows: string[] = [];

    if (includeHeader && columns.length > 0) {
        rows.push(columns.map((col) => escapeCsvField(col.label)).join(","));
    }

    for (const video of videos) {
        const row = columns.map((col) => escapeCsvField(col.getValue(video, playlistId)));
        rows.push(row.join(","));
    }

    return rows.join("\r\n");
}

export function sanitizeFilename(name: string, fallback = "playlist-videos"): string {
    if (!name) return fallback;
    const sanitized = name
        .replace(/[\\/:*?"<>|]+/g, "-")
        .replace(/\s+/g, "_")
        .trim();
    return sanitized.length > 0 ? sanitized : fallback;
}

export function downloadCsv({
    content,
    filename,
}: {
    content: string;
    filename: string;
}): void {
    const finalFilename = filename.toLowerCase().endsWith(".csv") ? filename : `${filename}.csv`;
    // Prepend UTF-8 BOM so Microsoft Excel & LibreOffice reliably open UTF-8 without mojibake
    const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", finalFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
