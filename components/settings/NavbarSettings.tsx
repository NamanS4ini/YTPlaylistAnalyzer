"use client";

import { useSettings } from "@/hooks/useSettings";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function NavbarSettings() {
    const { settings, updateSettings } = useSettings();

    const navbarItemLabels: Record<string, string> = {
        home: "Home",
        saved: "Saved Playlists",
        about: "About",
        settings: "Settings",
        feedback: "Feedback",
        buyMeACoffee: "Buy Me A Coffee",
        upload: "Upload",
        github: "GitHub",
        signIn: "Sign In",
    };

    const navbarStyleOptions = [
        { value: "default", label: "Default (Icon + Text)" },
        { value: "icon", label: "Icon Only" },
        { value: "icon-text", label: "Icon + Text Compact" },
        { value: "text", label: "Text Only" },
    ];

    return (
        <div className="space-y-6 opacity-50">
            <div>
                <h3 className="text-lg font-semibold mb-4">Navbar Settings</h3>
            </div>

            <div className="space-y-3 p-4 bg-zinc-900 rounded-lg">
                <Label className="text-base font-medium text-white">Navbar Style</Label>
                <p className="text-sm text-zinc-400 mb-3">
                    Choose how navigation items are displayed
                </p>
                <Select
                    disabled
                    value={settings.navbarStyle}
                    onValueChange={(value) =>
                        updateSettings({
                            navbarStyle: value as
                                | "icon"
                                | "icon-text"
                                | "text"
                                | "default",
                        })
                    }
                >
                    <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        {navbarStyleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-white focus:bg-zinc-800 focus:text-white">
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                <Label className="text-base font-medium text-white">Navbar Items</Label>
                <p className="text-sm text-zinc-400 mb-4">
                    Toggle visibility of navigation items
                </p>
                <div className="space-y-2">
                    {Object.entries(settings.navbarItems).map(([key, value]) => (
                        <div
                            key={key}
                            className={`flex items-center justify-between p-3 bg-zinc-900 rounded-lg cursor-pointer transition-opacity ${value ? 'opacity-100' : 'opacity-60'
                                }`}
                        // onClick={() =>
                        //     updateSettings({
                        //         navbarItems: {
                        //             ...settings.navbarItems,
                        //             [key]: !value,
                        //         },
                        //     })
                        // }
                        >
                            <Label className="font-normal cursor-pointer text-white">
                                {navbarItemLabels[key as keyof typeof navbarItemLabels]}
                            </Label>
                            <Switch
                                disabled
                                checked={value}
                                onCheckedChange={(checked) =>
                                    updateSettings({
                                        navbarItems: {
                                            ...settings.navbarItems,
                                            [key]: checked,
                                        },
                                    })
                                }
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
