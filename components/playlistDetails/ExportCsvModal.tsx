"use client";

import { useMemo, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Check,
    Copy,
    Download,
    FileSpreadsheet,
    RotateCcw,
    Sparkles,
    CheckSquare,
    Square,
    Eye,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import {
    CSV_COLUMNS,
    CsvColumnCategory,
    CsvColumnId,
    downloadCsv,
    generateCsvContent,
    sanitizeFilename,
} from "@/lib/exportCsv";
import type { VideoData } from "@/lib/types";

interface ExportCsvModalProps {
    isOpen: boolean;
    onClose: () => void;
    playlistTitle?: string;
    playlistId?: string;
    visibleVideos: VideoData[];
    selectedVideos: VideoData[];
    fullVideos?: VideoData[] | null;
}

export default function ExportCsvModal({
    isOpen,
    onClose,
    playlistTitle,
    playlistId,
    visibleVideos,
    selectedVideos,
    fullVideos,
}: ExportCsvModalProps) {
    // Initial column selection: based on defaultSelected
    const [selectedColumnIds, setSelectedColumnIds] = useState<Set<CsvColumnId>>(() => {
        const defaults = CSV_COLUMNS.filter((col) => col.defaultSelected).map((col) => col.id);
        return new Set(defaults);
    });

    // Scope selection: "selected" vs "visible" vs "full"
    const hasPartialSelection =
        selectedVideos.length > 0 && selectedVideos.length < visibleVideos.length;
    const hasDifferentFull =
        fullVideos && fullVideos.length > visibleVideos.length;

    const [scope, setScope] = useState<"selected" | "visible" | "full">(() => {
        if (hasPartialSelection) return "selected";
        return "visible";
    });

    const [includeHeaders, setIncludeHeaders] = useState<boolean>(true);
    const [customFilename, setCustomFilename] = useState<string>(() => {
        const base = playlistTitle ? playlistTitle : playlistId ? `playlist-${playlistId}` : "playlist";
        return `${sanitizeFilename(base)}-videos`;
    });
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);

    // Resolve target videos based on scope
    const targetVideos = useMemo(() => {
        if (scope === "selected") {
            return selectedVideos.length > 0 ? selectedVideos : visibleVideos;
        }
        if (scope === "full" && fullVideos && fullVideos.length > 0) {
            return fullVideos;
        }
        return visibleVideos;
    }, [scope, selectedVideos, visibleVideos, fullVideos]);

    // Active column definitions in original order
    const activeColumns = useMemo(() => {
        return CSV_COLUMNS.filter((col) => selectedColumnIds.has(col.id));
    }, [selectedColumnIds]);

    // First sample video for data preview badges
    const sampleVideo = targetVideos[0] || visibleVideos[0];

    // Toggle single column
    const toggleColumn = (id: CsvColumnId) => {
        setSelectedColumnIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) {
                if (next.size <= 1) {
                    toast.warning("At least one column must be selected.");
                    return prev;
                }
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    // Quick selection presets
    const handleSelectAll = () => {
        setSelectedColumnIds(new Set(CSV_COLUMNS.map((col) => col.id)));
    };

    const handleDeselectAll = () => {
        // Keep at least Title
        setSelectedColumnIds(new Set<CsvColumnId>(["title"]));
        toast.info("Selected only Title. Choose additional stats below.");
    };

    const handleResetDefaults = () => {
        setSelectedColumnIds(
            new Set(CSV_COLUMNS.filter((col) => col.defaultSelected).map((col) => col.id))
        );
    };

    const handleSelectAnalytics = () => {
        setSelectedColumnIds(
            new Set<CsvColumnId>([
                "title",
                "url",
                "views",
                "likes",
                "comments",
                "durationFormatted",
            ])
        );
    };

    // Generate current CSV content
    const csvContent = useMemo(() => {
        return generateCsvContent({
            videos: targetVideos,
            columns: activeColumns,
            playlistId,
            includeHeader: includeHeaders,
        });
    }, [targetVideos, activeColumns, playlistId, includeHeaders]);

    // Live preview rows (top 3)
    const previewCsvContent = useMemo(() => {
        return generateCsvContent({
            videos: targetVideos.slice(0, 3),
            columns: activeColumns,
            playlistId,
            includeHeader: includeHeaders,
        });
    }, [targetVideos, activeColumns, playlistId, includeHeaders]);

    const handleDownload = () => {
        if (targetVideos.length === 0) {
            toast.error("No videos available to export.");
            return;
        }
        if (activeColumns.length === 0) {
            toast.error("Please select at least one stat to export.");
            return;
        }

        const filename = customFilename.trim() ? customFilename.trim() : "playlist-videos";
        downloadCsv({
            content: csvContent,
            filename,
        });
        toast.success(`Exported ${targetVideos.length} videos to CSV!`);
        onClose();
    };

    const handleCopy = async () => {
        if (targetVideos.length === 0) {
            toast.error("No videos available to export.");
            return;
        }
        try {
            await navigator.clipboard.writeText(csvContent);
            setIsCopied(true);
            toast.success("CSV copied to clipboard!");
            setTimeout(() => setIsCopied(false), 2000);
        } catch {
            toast.error("Failed to copy CSV to clipboard.");
        }
    };

    // Categories grouping
    const categories: CsvColumnCategory[] = [
        "General",
        "Engagement",
        "Video Info",
        "Channel",
        "Media",
    ];

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col bg-zinc-950 text-white border-zinc-800 p-0 overflow-hidden shadow-2xl">
                {/* Header */}
                <DialogHeader className="p-5 pb-3 border-b border-zinc-800 bg-zinc-900/60">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                                <FileSpreadsheet className="w-5 h-5" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                                    Export Playlist to CSV
                                </DialogTitle>
                                <DialogDescription className="text-xs text-zinc-400 mt-0.5">
                                    Select the video stats and columns you want to include in the spreadsheet.
                                </DialogDescription>
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-xs bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 px-2.5 py-1 rounded-full font-medium">
                                {activeColumns.length} / {CSV_COLUMNS.length} stats selected
                            </span>
                        </div>
                    </div>
                </DialogHeader>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-5 divide-y divide-zinc-800/80">
                    {/* Video Scope Selection */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                1. Videos to Export
                            </label>
                            <span className="text-xs text-emerald-400 font-medium">
                                {targetVideos.length} {targetVideos.length === 1 ? "video" : "videos"} will be exported
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {hasPartialSelection && (
                                <button
                                    type="button"
                                    onClick={() => setScope("selected")}
                                    className={`flex flex-col text-left p-3 rounded-lg border transition-all cursor-pointer ${
                                        scope === "selected"
                                            ? "bg-blue-950/40 border-blue-500/80 ring-1 ring-blue-500/30 text-white"
                                            : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-300"
                                    }`}
                                >
                                    <span className="text-xs font-semibold flex items-center justify-between">
                                        Selected Videos
                                        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                                            {selectedVideos.length}
                                        </span>
                                    </span>
                                    <span className="text-[11px] text-zinc-400 mt-1">
                                        Only checked videos in list
                                    </span>
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => setScope("visible")}
                                className={`flex flex-col text-left p-3 rounded-lg border transition-all cursor-pointer ${
                                    scope === "visible"
                                        ? "bg-blue-950/40 border-blue-500/80 ring-1 ring-blue-500/30 text-white"
                                        : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-300"
                                }`}
                            >
                                <span className="text-xs font-semibold flex items-center justify-between">
                                    Current Range Videos
                                    <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                                        {visibleVideos.length}
                                    </span>
                                </span>
                                <span className="text-[11px] text-zinc-400 mt-1">
                                    All videos in visible filtered range
                                </span>
                            </button>

                            {hasDifferentFull && (
                                <button
                                    type="button"
                                    onClick={() => setScope("full")}
                                    className={`flex flex-col text-left p-3 rounded-lg border transition-all cursor-pointer ${
                                        scope === "full"
                                            ? "bg-blue-950/40 border-blue-500/80 ring-1 ring-blue-500/30 text-white"
                                            : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-300"
                                    }`}
                                >
                                    <span className="text-xs font-semibold flex items-center justify-between">
                                        Full Playlist
                                        <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                                            {fullVideos.length}
                                        </span>
                                    </span>
                                    <span className="text-[11px] text-zinc-400 mt-1">
                                        All loaded videos in entire playlist
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stats / Columns Selection */}
                    <div className="pt-4 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                2. Select Video Stats / Columns
                            </label>

                            {/* Presets */}
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleResetDefaults}
                                    className="h-7 text-xs px-2 text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                                >
                                    <RotateCcw className="w-3 h-3 mr-1" />
                                    Default
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSelectAnalytics}
                                    className="h-7 text-xs px-2 text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                                >
                                    <Sparkles className="w-3 h-3 mr-1 text-amber-400" />
                                    Analytics
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSelectAll}
                                    className="h-7 text-xs px-2 text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                                >
                                    <CheckSquare className="w-3 h-3 mr-1" />
                                    Select All
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleDeselectAll}
                                    className="h-7 text-xs px-2 text-zinc-300 hover:text-white hover:bg-zinc-800 cursor-pointer"
                                >
                                    <Square className="w-3 h-3 mr-1" />
                                    Clear
                                </Button>
                            </div>
                        </div>

                        {/* Column checklist by category */}
                        <div className="space-y-4">
                            {categories.map((category) => {
                                const cols = CSV_COLUMNS.filter((c) => c.category === category);
                                if (cols.length === 0) return null;

                                return (
                                    <div key={category} className="space-y-1.5">
                                        <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider px-1">
                                            {category}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {cols.map((col) => {
                                                const isSelected = selectedColumnIds.has(col.id);
                                                const sampleValue = sampleVideo
                                                    ? col.getValue(sampleVideo, playlistId)
                                                    : null;

                                                return (
                                                    <div
                                                        key={col.id}
                                                        onClick={() => toggleColumn(col.id)}
                                                        className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer select-none transition-all ${
                                                            isSelected
                                                                ? "bg-zinc-900/90 border-blue-500/60 text-white"
                                                                : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                                                        }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => {}}
                                                            className="mt-0.5 h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-blue-500 focus:ring-blue-500/50 cursor-pointer"
                                                            aria-label={`Select ${col.label}`}
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between gap-1">
                                                                <span className="text-xs font-semibold text-zinc-100 truncate">
                                                                    {col.label}
                                                                </span>
                                                                {sampleValue !== null && sampleValue !== "" && (
                                                                    <span
                                                                        className="text-[10px] text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded truncate max-w-[120px]"
                                                                        title={String(sampleValue)}
                                                                    >
                                                                        {String(sampleValue)}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                                                                {col.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* File & Formatting Settings */}
                    <div className="pt-4 space-y-3">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            3. Export Settings & Filename
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs text-zinc-400 block mb-1">
                                    File Name
                                </label>
                                <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 focus-within:border-blue-500">
                                    <input
                                        type="text"
                                        value={customFilename}
                                        onChange={(e) => setCustomFilename(e.target.value)}
                                        placeholder="playlist-videos"
                                        className="bg-transparent text-xs text-white outline-none w-full"
                                    />
                                    <span className="text-xs text-zinc-500 font-mono">.csv</span>
                                </div>
                            </div>

                            <div className="flex items-end pb-1.5">
                                <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                                    <input
                                        type="checkbox"
                                        checked={includeHeaders}
                                        onChange={(e) => setIncludeHeaders(e.target.checked)}
                                        className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-blue-500 focus:ring-blue-500/50"
                                    />
                                    <span>Include column header row</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Preview Toggle & Monospace Block */}
                    <div className="pt-3">
                        <button
                            type="button"
                            onClick={() => setShowPreview((prev) => !prev)}
                            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                        >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{showPreview ? "Hide CSV preview" : "Show CSV preview (first 3 rows)"}</span>
                            {showPreview ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {showPreview && (
                            <div className="mt-2.5 rounded-lg border border-zinc-800 bg-zinc-900/90 p-3 overflow-x-auto text-[11px] font-mono text-zinc-300 max-h-36">
                                <pre className="whitespace-pre">{previewCsvContent || "No columns selected"}</pre>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-zinc-400">
                        Ready to export <span className="font-semibold text-white">{targetVideos.length}</span> videos with{" "}
                        <span className="font-semibold text-white">{activeColumns.length}</span> stats.
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            disabled={targetVideos.length === 0 || activeColumns.length === 0}
                            className="dark cursor-pointer text-xs flex items-center gap-1.5"
                        >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            {isCopied ? "Copied" : "Copy to Clipboard"}
                        </Button>

                        <Button
                            type="button"
                            size="sm"
                            onClick={handleDownload}
                            disabled={targetVideos.length === 0 || activeColumns.length === 0}
                            className="dark cursor-pointer text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Download CSV
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
