"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import type { VideoData } from "@/lib/types";

type PlaylistRangeControlsProps = {
    videoData: VideoData[] | null;
    playlistLength: number;
    initialStart: number;
    initialEnd: number;
    disabled?: boolean;
    onFilteredVideosChange: (videos: VideoData[] | null) => void;
};

function clampRangeValue(value: number, playlistLength: number) {
    if (!Number.isFinite(value)) {
        return 1;
    }

    return Math.min(Math.max(playlistLength, 1), Math.max(1, value));
}

function normalizeRange(
    start: number,
    end: number,
    playlistLength: number
): [number, number] {
    const normalizedStart = clampRangeValue(start, playlistLength);
    const normalizedEnd = Math.max(
        normalizedStart,
        clampRangeValue(end, playlistLength)
    );

    return [normalizedStart, normalizedEnd];
}

export default function PlaylistRangeControls({
    videoData,
    playlistLength,
    initialStart,
    initialEnd,
    disabled = false,
    onFilteredVideosChange,
}: PlaylistRangeControlsProps) {
    const [draftRange, setDraftRange] = useState<[number, number]>(() =>
        normalizeRange(initialStart, initialEnd, playlistLength)
    );
    const [appliedRange, setAppliedRange] = useState<[number, number]>(() =>
        normalizeRange(initialStart, initialEnd, playlistLength)
    );
    const [draftStart, setDraftStart] = useState<string>(String(initialStart));
    const [draftEnd, setDraftEnd] = useState<string>(String(initialEnd));
    const lastValidRangeRef = useRef<[number, number]>(
        normalizeRange(initialStart, initialEnd, playlistLength)
    );

    useEffect(() => {
        const nextRange = normalizeRange(initialStart, initialEnd, playlistLength);
        setDraftRange(nextRange);
        setAppliedRange(nextRange);
        setDraftStart(String(nextRange[0]));
        setDraftEnd(String(nextRange[1]));
        lastValidRangeRef.current = nextRange;
    }, [initialStart, initialEnd, playlistLength]);

    useEffect(() => {
        if (!videoData) {
            onFilteredVideosChange(null);
            return;
        }

        onFilteredVideosChange(videoData.slice(appliedRange[0] - 1, appliedRange[1]));
    }, [appliedRange, onFilteredVideosChange, videoData]);

    const commitRange = (start: number, end: number) => {
        const nextRange = normalizeRange(start, end, playlistLength);
        setDraftRange(nextRange);
        setAppliedRange(nextRange);
        setDraftStart(String(nextRange[0]));
        setDraftEnd(String(nextRange[1]));
        lastValidRangeRef.current = nextRange;

        if (typeof window === "undefined") {
            return;
        }

        const url = new URL(window.location.href);
        url.searchParams.set("start", String(nextRange[0]));
        url.searchParams.set("end", String(nextRange[1]));
        window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}${url.hash}`);
    };

    const handleStartChange = (value: string) => {
        setDraftStart(value);

        if (value === "") {
            return;
        }

        const nextStart = Number.parseInt(value, 10);
        commitRange(Number.isFinite(nextStart) ? nextStart : lastValidRangeRef.current[0], draftRange[1]);
    };

    const handleEndChange = (value: string) => {
        setDraftEnd(value);

        if (value === "") {
            return;
        }

        const nextEnd = Number.parseInt(value, 10);
        commitRange(draftRange[0], Number.isFinite(nextEnd) ? nextEnd : lastValidRangeRef.current[1]);
    };

    const restoreStart = () => {
        if (draftStart === "") {
            setDraftStart(String(lastValidRangeRef.current[0]));
        }
    };

    const restoreEnd = () => {
        if (draftEnd === "") {
            setDraftEnd(String(lastValidRangeRef.current[1]));
        }
    };

    return (
        <div className={`w-full max-w-4xl mx-auto px-5 mt-4 mb-6 ${disabled ? "opacity-60" : ""}`}>
            <div className="grid items-center gap-4 md:grid-cols-[120px_minmax(0,1fr)_120px]">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Start</label>
                    <Input
                        type="number"
                        min={1}
                        max={playlistLength}
                        value={draftStart}
                        onChange={(event) => handleStartChange(event.target.value)}
                        onBlur={restoreStart}
                        disabled={disabled}
                        className="dark bg-zinc-900 border-zinc-800 text-white"
                    />
                </div>

                <div className="space-y-2">
                    <div className="mx-auto w-full max-w-lg px-2">
                        <Slider
                            value={draftRange}
                            min={1}
                            max={playlistLength}
                            step={1}
                            minStepsBetweenThumbs={0}
                            disabled={disabled}
                            onValueChange={(value: number[]) => setDraftRange([value[0], value[1]])}
                            onValueCommit={(value: number[]) => commitRange(value[0], value[1])}
                            aria-label="Playlist range"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">End</label>
                    <Input
                        type="number"
                        min={1}
                        max={playlistLength}
                        value={draftEnd}
                        onChange={(event) => handleEndChange(event.target.value)}
                        onBlur={restoreEnd}
                        disabled={disabled}
                        className="dark bg-zinc-900 border-zinc-800 text-white"
                    />
                </div>
            </div>
        </div>
    );
}
