"use client";

import { useInitializeCacheCleanup } from "@/hooks/useInitializeCacheCleanup";

export function CacheCleanupInitializer() {
    useInitializeCacheCleanup();
    return null;
}
