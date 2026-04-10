"use client";

import { useSettings } from "@/hooks/settingHook";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CacheSettings() {
    const { settings, updateSettings } = useSettings();

    const cacheExpiryOptions = [
        { label: "1 Day", value: "24" },
        { label: "2 Days", value: "48" },
        { label: "3 Days", value: "72" },
        { label: "1 Week", value: "168" },
        { label: "2 Weeks", value: "336" },
        { label: "1 Month", value: "720" },
    ];

    const handleRecentChange = (value: string) => {
        const num = parseInt(value) || 0;
        if (num >= 0) {
            updateSettings({ recentPlaylistNumber: num });
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Cache & Storage</h3>
            </div>

            <div className="space-y-3 p-4 bg-zinc-900 rounded-lg">
                <Label htmlFor="cache-time" className="text-base font-medium text-white">
                    Cache Expiration Time (hours)
                </Label>
                <p className="text-sm text-zinc-400 mb-3">
                    How long to cache playlist data before refreshing. Minimum is 24 hours.
                </p>
                <Select
                    value={String(settings.cacheExpireTime)}
                    onValueChange={(value) => updateSettings({ cacheExpireTime: parseInt(value, 10) })}
                >
                    <SelectTrigger id="cache-time" className="bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue placeholder="Select cache duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        {cacheExpiryOptions.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-white focus:bg-zinc-800 focus:text-white"
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3 p-4 opacity-50 bg-zinc-900 rounded-lg">
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
