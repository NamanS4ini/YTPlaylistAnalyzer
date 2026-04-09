"use client";

import { Settings } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import DisplaySettings from "./DisplaySettings";
import Link from "next/link";

export default function SettingsPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer text-white" title="Settings">
                    <Settings size={24} />
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                className="w-96 bg-zinc-950 border-zinc-800 text-white p-6 max-h-[80vh] overflow-y-auto"
            >
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Settings</h2>
                        <p className="text-sm text-zinc-400">
                            Customize your experience
                        </p>
                    </div>

                    <div className="space-y-6 border-t border-zinc-800 pt-6">
                        <div>
                            <DisplaySettings />
                        </div>
                    </div>

                    <div className="text-center text-sm pt-4">
                        <Link className="text-blue-400 hover:underline cursor-pointer" href="/settings">Show more settings</Link>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
