import type { PlayListData, VideoData } from "@/lib/types";

export const MIN_CACHE_EXPIRY_HOURS = 24;
const PLAYLIST_CACHE_PREFIX = "ytpla:playlist-cache:";
const FULL_PLAYLIST_END = 1000000;

export type PlaylistCacheEntry = {
  playlistData: PlayListData | null;
  videoData: VideoData[];
  cachedAt: string;
};

export type PlaylistCacheSnapshot = PlaylistCacheEntry & {
  ageHours: number;
};

export function normalizeCacheExpireTime(value: number | undefined | null) {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue) || parsedValue < MIN_CACHE_EXPIRY_HOURS) {
    return MIN_CACHE_EXPIRY_HOURS;
  }

  return Math.floor(parsedValue);
}

export function getFullPlaylistEnd() {
  return FULL_PLAYLIST_END;
}

export function getPlaylistCacheKey(id: string) {
  return `${PLAYLIST_CACHE_PREFIX}${id}`;
}

export function getPlaylistCacheAgeHours(cachedAt: string) {
  const cachedTime = new Date(cachedAt).getTime();

  if (Number.isNaN(cachedTime)) {
    return Number.POSITIVE_INFINITY;
  }

  return (Date.now() - cachedTime) / (1000 * 60 * 60);
}

export function formatCacheAge(ageHours: number) {
  if (!Number.isFinite(ageHours) || ageHours <= 0) {
    return "just now";
  }

  if (ageHours < 1) {
    const minutes = Math.max(1, Math.round(ageHours * 60));
    return `${minutes}m ago`;
  }

  if (ageHours < 24) {
    return `${ageHours.toFixed(1)}h ago`;
  }

  const days = ageHours / 24;
  if (days < 7) {
    return `${days.toFixed(1)}d ago`;
  }

  return `${Math.floor(days)}d ago`;
}

export function getPlaylistCacheSnapshot(id: string, maxAgeHours: number) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = localStorage.getItem(getPlaylistCacheKey(id));

    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as Partial<PlaylistCacheEntry>;

    if (!Array.isArray(parsed.videoData)) {
      localStorage.removeItem(getPlaylistCacheKey(id));
      return null;
    }

    const cachedAt = typeof parsed.cachedAt === "string" ? parsed.cachedAt : "";
    const ageHours = getPlaylistCacheAgeHours(cachedAt);

    if (!Number.isFinite(ageHours) || ageHours >= maxAgeHours) {
      return null;
    }

    return {
      playlistData: (parsed.playlistData ?? null) as PlayListData | null,
      videoData: parsed.videoData,
      cachedAt,
      ageHours,
    } satisfies PlaylistCacheSnapshot;
  } catch {
    localStorage.removeItem(getPlaylistCacheKey(id));
    return null;
  }
}

export function savePlaylistCache(
  id: string,
  entry: Omit<PlaylistCacheEntry, "cachedAt">
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload: PlaylistCacheEntry = {
    ...entry,
    cachedAt: new Date().toISOString(),
  };

  localStorage.setItem(getPlaylistCacheKey(id), JSON.stringify(payload));
}

export function slicePlaylistVideos(
  videoData: VideoData[],
  start: string,
  end: string
) {
  const normalizedStart = Math.max(Number.parseInt(start, 10) || 1, 1);
  const normalizedEnd = Number.parseInt(end, 10);
  const startIndex = normalizedStart - 1;

  if (Number.isFinite(normalizedEnd)) {
    return videoData.filter(
      (_, index) => index >= startIndex && index <= normalizedEnd - 1
    );
  }

  if (startIndex > 0) {
    return videoData.filter((_, index) => index >= startIndex);
  }

  return videoData;
}

export function deletePlaylistCache(id: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(getPlaylistCacheKey(id));
}

export function getAllCachedPlaylistIds() {
  if (typeof window === "undefined") {
    return [];
  }

  const ids: string[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key?.startsWith(PLAYLIST_CACHE_PREFIX)) {
      const id = key.substring(PLAYLIST_CACHE_PREFIX.length);
      ids.push(id);
    }
  }

  return ids;
}

export function cleanupExpiredCache(maxAgeHours: number) {
  if (typeof window === "undefined") {
    return 0;
  }

  const cachedIds = getAllCachedPlaylistIds();
  let deletedCount = 0;

  for (const id of cachedIds) {
    try {
      const stored = localStorage.getItem(getPlaylistCacheKey(id));

      if (!stored) {
        continue;
      }

      const parsed = JSON.parse(stored) as Partial<PlaylistCacheEntry>;
      const cachedAt =
        typeof parsed.cachedAt === "string" ? parsed.cachedAt : "";
      const ageHours = getPlaylistCacheAgeHours(cachedAt);

      if (!Number.isFinite(ageHours) || ageHours >= maxAgeHours) {
        deletePlaylistCache(id);
        deletedCount++;
      }
    } catch {
      // If parsing fails, delete the corrupted entry
      deletePlaylistCache(id);
      deletedCount++;
    }
  }

  return deletedCount;
}
