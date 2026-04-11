"use client";

import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CacheSettings({
    showTitle = true,
}: {
    showTitle?: boolean;
}) {
    const { settings, updateSettings } = useSettings();

    const cacheExpiryOptions = [
        { label: "1 Day", value: "24" },
        { label: "2 Days", value: "48" },
        { label: "3 Days", value: "72" },
        { label: "1 Week", value: "168" },
        { label: "2 Weeks", value: "336" },
        { label: "1 Month", value: "720" },
    ];

    return (
        <div className="space-y-6">
            {showTitle && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Cache & Storage</h3>
                </div>
            )}

            <div className="space-y-3 p-4 bg-zinc-900 rounded-lg">
                <Label htmlFor="cache-time" className="text-base font-medium text-white">
                    Cache Expiration Time (hours)
                </Label>
                {settings.cacheExpireTime === 24 && (
                    <div className="mb-3 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2">
                        <p className="text-sm text-amber-200 font-medium">
                            Recommended: use a higher cache duration for faster repeat loads and lower API usage.
                        </p>
                        <p className="text-xs text-amber-300/90 mt-1">
                            Minimum allowed cache duration is 24 hours.
                        </p>
                    </div>
                )}
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
        </div>
    );
}
