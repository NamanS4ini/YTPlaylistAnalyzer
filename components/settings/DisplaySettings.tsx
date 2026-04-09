"use client";

import { useSettings } from "@/hooks/settingHook";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function DisplaySettings() {
    const { settings, updateSettings } = useSettings();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Display Settings</h3>
            </div>

            <div
                className={`flex items-center justify-between p-4 bg-zinc-900 rounded-lg cursor-pointer transition-opacity ${settings.thumbnail ? 'opacity-100' : 'opacity-60'
                    }`}
                onClick={() => updateSettings({ thumbnail: !settings.thumbnail })}
            >
                <div className="space-y-1">
                    <Label className="text-base font-medium text-white cursor-pointer">Show Thumbnails</Label>
                    <p className="text-sm text-zinc-400">
                        Display playlist and video thumbnails
                    </p>
                </div>
                <Switch
                    checked={settings.thumbnail}
                    onCheckedChange={(checked) =>
                        updateSettings({ thumbnail: checked })
                    }
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            <div className="space-y-3">
                <Label className="text-base font-medium text-white">Video Statistics Display</Label>
                <p className="text-sm text-zinc-400 mb-3">
                    Choose how to display video statistics
                </p>
                <Select
                    value={settings.videoStats}
                    onValueChange={(value) =>
                        updateSettings({ videoStats: value as "rounded" | "exact" })
                    }
                >
                    <SelectTrigger className="w-full bg-zinc-900 border-zinc-800 text-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        <SelectItem value="rounded" className="text-white focus:bg-zinc-800 focus:text-white">Rounded (e.g., 1.2K views)</SelectItem>
                        <SelectItem value="exact" className="text-white focus:bg-zinc-800 focus:text-white">Exact (e.g., 1234 views)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
