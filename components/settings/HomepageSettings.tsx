"use client";

import { useEffect, useMemo, useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type HomepageSettingsProps = {
    showTitle?: boolean;
};

export default function HomepageSettings({ showTitle = true }: HomepageSettingsProps) {
    const { settings, updateSettings } = useSettings();
    const [recentCountDraft, setRecentCountDraft] = useState(String(settings.recentPlaylistNumber));

    useEffect(() => {
        setRecentCountDraft(String(settings.recentPlaylistNumber));
    }, [settings.recentPlaylistNumber]);

    const parsedRecentCount = useMemo(() => Number.parseInt(recentCountDraft, 10), [recentCountDraft]);
    const isRecentCountValid = Number.isInteger(parsedRecentCount) && parsedRecentCount >= 0 && parsedRecentCount <= 10;

    const handleRecentSave = () => {
        if (!isRecentCountValid) return;
        updateSettings({ recentPlaylistNumber: parsedRecentCount });
    };

    const toggleCardClass = (enabled: boolean) =>
        `space-y-3 p-4 rounded-lg transition-colors cursor-pointer ${enabled ? "bg-zinc-900 opacity-100" : "bg-zinc-900/70 opacity-70"}`;

    return (
        <div className="space-y-6">
            {showTitle && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Homepage Settings</h3>
                </div>
            )}

            <div
                className={`space-y-3 p-4 rounded-lg transition-colors cursor-pointer ${settings.showRecentPlaylists ? "bg-zinc-900 opacity-100" : "bg-zinc-900/70 opacity-70"}`}
                onClick={() => updateSettings({ showRecentPlaylists: !settings.showRecentPlaylists })}
                role="button"
                tabIndex={0}
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <Label className="text-base font-medium text-white cursor-pointer">Recent Playlists</Label>
                        <p className="text-sm text-zinc-400">Show the recently analyzed playlists section on the homepage.</p>
                    </div>
                    <Switch
                        checked={settings.showRecentPlaylists}
                        onCheckedChange={(checked) => updateSettings({ showRecentPlaylists: checked })}
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>

                <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${settings.showRecentPlaylists
                        ? "max-h-56 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="pt-3 border-t border-zinc-800/80">
                        <Label htmlFor="recent-count" className="text-sm font-medium text-white">
                            Recent Playlists Count
                        </Label>
                        <p className="text-xs text-zinc-400 mt-1 mb-3">
                            Choose how many recent playlists to show on the home page, from 0 to 10.
                        </p>
                        <Input
                            id="recent-count"
                            type="number"
                            min="0"
                            max="10"
                            value={recentCountDraft}
                            onChange={(event) => setRecentCountDraft(event.target.value)}
                            onClick={(event) => event.stopPropagation()}
                            className={`bg-zinc-800 text-white ${isRecentCountValid ? "border-zinc-700 focus-visible:ring-blue-500/50" : "border-red-500 text-red-300 focus-visible:ring-red-500/50"}`}
                        />
                        <div className="mt-3 flex items-center justify-between gap-3">
                            <p className={`text-xs ${isRecentCountValid ? "text-zinc-500" : "text-red-400"}`}>
                                {isRecentCountValid
                                    ? `Saved value: ${settings.recentPlaylistNumber}`
                                    : "Value must be between 0 and 10"}
                            </p>
                            <Button
                                type="button"
                                size="default"
                                variant="secondary"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleRecentSave();
                                }}
                                disabled={!isRecentCountValid}
                                className="dark cursor-pointer"
                                
                            >
                                Save Count
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={toggleCardClass(settings.showNeedHelp)} onClick={() => updateSettings({ showNeedHelp: !settings.showNeedHelp })} role="button" tabIndex={0}>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <Label className="text-base font-medium text-white cursor-pointer">Need Help Section</Label>
                        <p className="text-sm text-zinc-400">Show the help and FAQ section on the homepage.</p>
                    </div>
                    <Switch
                        checked={settings.showNeedHelp}
                        onCheckedChange={(checked) => updateSettings({ showNeedHelp: checked })}
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            </div>

            <div className={toggleCardClass(settings.showFooter)} onClick={() => updateSettings({ showFooter: !settings.showFooter })} role="button" tabIndex={0}>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <Label className="text-base font-medium text-white cursor-pointer">Footer</Label>
                        <p className="text-sm text-zinc-400">Show the footer links and copyright section.</p>
                    </div>
                    <Switch
                        checked={settings.showFooter}
                        onCheckedChange={(checked) => updateSettings({ showFooter: checked })}
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            </div>

        </div>
    );
}
