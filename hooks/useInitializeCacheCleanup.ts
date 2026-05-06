"use client";

import { useEffect } from "react";
import { useSettings } from "./useSettings";
import { cleanupExpiredCache } from "@/lib/playlistCache";

export function useInitializeCacheCleanup() {
  const { settings } = useSettings();

  useEffect(() => {
    // Run cleanup once on mount
    const deletedCount = cleanupExpiredCache(settings.cacheExpireTime);

    if (deletedCount > 0) {
      console.log(
        `Cache cleanup: Deleted ${deletedCount} expired cache entries`
      );
    }
  }, []);
}
