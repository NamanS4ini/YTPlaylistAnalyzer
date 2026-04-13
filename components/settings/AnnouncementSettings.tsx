"use client";

import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AnnouncementSettings() {
    const { settings, updateSettings } = useSettings();

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            </div>

            <div
                className={`flex items-center justify-between p-4 bg-zinc-900 rounded-lg cursor-pointer transition-opacity ${settings.showAnnouncement ? 'opacity-100' : 'opacity-60'
                    }`}
            onClick={() => updateSettings({ showAnnouncement: !settings.showAnnouncement })}
            >
                <div className="space-y-1">
                    <Label className="text-base font-medium text-white cursor-pointer">Show Announcements</Label>
                    <p className="text-sm text-zinc-400">
                        Display important updates and announcements
                    </p>
                </div>
                <Switch
                    checked={settings.showAnnouncement}
                    onCheckedChange={(checked) =>
                        updateSettings({ showAnnouncement: checked })
                    }
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    );
}
