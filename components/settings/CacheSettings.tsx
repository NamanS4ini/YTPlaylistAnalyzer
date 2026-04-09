"use client";

import { useSettings } from "@/hooks/settingHook";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CacheSettings() {
    const { settings, updateSettings } = useSettings();

    const handleCacheTimeChange = (value: string) => {
        const num = parseInt(value) || 0;
        if (num >= 0) {
            updateSettings({ cacheExpireTime: num });
        }
    };

    const handleRecentChange = (value: string) => {
        const num = parseInt(value) || 0;
        if (num >= 0) {
            updateSettings({ recentPlaylistNumber: num });
        }
    };

    return (
        <div className="space-y-6 opacity-50">
            <div>
                <h3 className="text-lg font-semibold mb-4">Cache & Storage</h3>
            </div>

            <div className="space-y-3 p-4 bg-zinc-900 rounded-lg">
                <Label htmlFor="cache-time" className="text-base font-medium text-white">
                    Cache Expiration Time (hours)
                </Label>
                <p className="text-sm text-zinc-400 mb-3">
                    How long to cache playlist data before refreshing
                </p>
                <Input
                    disabled
                    id="cache-time"
                    type="number"
                    min="0"
                    value={settings.cacheExpireTime}
                    onChange={(e) => handleCacheTimeChange(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                />
            </div>

            <div className="space-y-3 p-4 bg-zinc-900 rounded-lg">
                <Label htmlFor="recent-count" className="text-base font-medium text-white">
                    Recent Playlists Count
                </Label>
                <p className="text-sm text-zinc-400 mb-3">
                    Number of recent playlists to show on the home page
                </p>
                <Input
                    disabled
                    id="recent-count"
                    type="number"
                    min="0"
                    value={settings.recentPlaylistNumber}
                    onChange={(e) => handleRecentChange(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                />
            </div>
        </div>
    );
}
