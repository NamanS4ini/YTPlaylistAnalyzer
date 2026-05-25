"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type PlaylistSelectionControlsProps = {
    visibleCount: number;
    selectedCount: number;
    disabled?: boolean;
    onToggleAll: (checked: boolean) => void;
    onInvertSelection: () => void;
};

export default function PlaylistSelectionControls({
    visibleCount,
    selectedCount,
    disabled = false,
    onToggleAll,
    onInvertSelection,
}: PlaylistSelectionControlsProps) {
    const checkboxRef = useRef<HTMLInputElement>(null);
    const allSelected = visibleCount > 0 && selectedCount === visibleCount;
    const someSelected = selectedCount > 0 && selectedCount < visibleCount;

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = someSelected;
        }
    }, [someSelected]);

    return (
        <div className="mx-auto w-full max-w-6xl px-5 mt-4">
            <div className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 md:flex-row md:items-center md:justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                    <input
                        ref={checkboxRef}
                        type="checkbox"
                        checked={allSelected}
                        onChange={(event) => onToggleAll(event.target.checked)}
                        disabled={disabled || visibleCount === 0}
                        className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-blue-500 focus:ring-blue-500/50"
                        aria-label="Select all videos in the current range"
                    />
                    <div>
                        <p className="text-sm font-medium text-zinc-100">Select visible range</p>
                        <p className="text-xs text-zinc-400">
                            {selectedCount} of {visibleCount} videos selected
                        </p>
                    </div>
                </label>

                <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-500">
                        {allSelected ? "All selected" : someSelected ? "Partial selection" : "Nothing selected"}
                    </span>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onInvertSelection}
                        disabled={disabled || visibleCount === 0}
                        className="dark cursor-pointer"
                    >
                        Invert selection
                    </Button>
                </div>
            </div>
        </div>
    );
}
