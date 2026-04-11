"use client";

import { Settings } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import DisplaySettings from "./DisplaySettings";
import HomepageSettings from "./HomepageSettings";
import CacheSettings from "./CacheSettings";
import Link from "next/link";

type SettingsPopoverProps = {
    currentPage?: "home" | "playlist";
};

export default function SettingsPopover({ currentPage = "playlist" }: SettingsPopoverProps) {
    const showHomepageSettings = currentPage === "home";
    const showPlaylistSettings = currentPage === "playlist";

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer text-white" title="Settings">
                    <Settings size={24} />
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="md:w-96 bg-zinc-950 border-zinc-800 text-white p-6 max-h-[80vh] overflow-y-auto"
            >
                <div className="space-y-6">
                    {showHomepageSettings && (
                        <div className="space-y-6 border-t border-zinc-800 pt-6">
                            <HomepageSettings showTitle={false} />
                        </div>
                    )}

                    {showPlaylistSettings && (
                        <div className="space-y-6 border-t border-zinc-800 pt-6">
                            <div>
                                <DisplaySettings showTitle={false} />
                            </div>
                            <div>
                                <CacheSettings showTitle={false} />
                            </div>
                        </div>
                    )}

                    <div className="text-center text-sm pt-4">
                        <Link className="text-blue-400 hover:underline cursor-pointer" href="/settings">Show more settings</Link>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
