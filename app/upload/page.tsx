"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Upload, FileJson, Info, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function UploadAnalyzer() {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Check if it's a CSV file
            if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
                setFile(selectedFile);
                setError(null);
            } else {
                setError("Please upload a CSV file from Google Takeout");
                setFile(null);
            }
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);

        try {
            const text = await file.text();

            // Parse CSV format: Video ID,Playlist Video Creation Timestamp
            const lines = text.split('\n').filter(line => line.trim());

            // Skip header row
            const dataLines = lines.slice(1);

            const data = dataLines.map(line => {
                const [videoId, timestamp] = line.split(',');
                return {
                    videoId: videoId?.trim(),
                    timestamp: timestamp?.trim()
                };
            }).filter(item => item.videoId); // Filter out empty lines

            // Store in localStorage for the upload details page
            localStorage.setItem("uploadedPlaylist", JSON.stringify(data));
            localStorage.setItem("uploadedPlaylistName", file.name);

            // Redirect to upload details page
            window.location.href = "/upload/details";
        } catch {
            setError("Failed to parse CSV file. Please ensure it's a valid Google Takeout file.");
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 pb-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-3">Upload Analyzer</h1>
                    <p className="text-zinc-400 text-lg">
                        Analyze your Watch Later and other playlists from Google Takeout
                    </p>
                </div>

                {/* Instructions Card */}
                <Card className="dark bg-zinc-900 border-zinc-800 mb-6">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Info className="h-5 w-5 text-blue-400" />
                            How to Get Your Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-zinc-300">
                        <div>
                            <h3 className="font-semibold text-white mb-2">Step 1: Request Your Data</h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm">
                                <li>Go to <a href="https://takeout.google.com" target="_blank" className="text-blue-400 hover:underline">Google Takeout</a></li>
                                <li>Click &quot;Deselect all&quot; and then select only &quot;YouTube and YouTube Music&quot;</li>
                                <li>Click &quot;All YouTube data included&quot; and select only:
                                    <ul className="list-disc list-inside ml-6 mt-1">
                                        <li>playlists</li>
                                    </ul>
                                </li>
                                <li>Click &quot;Next step&quot; and choose your export options</li>
                                <li>Click &quot;Create export&quot; and wait for the download link</li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-2">Step 2: Extract and Upload</h3>
                            <ol className="list-decimal list-inside space-y-2 text-sm">
                                <li>Download and extract the ZIP file from Google</li>
                                <li>Navigate to <code className="bg-zinc-800 px-1 rounded">Takeout/YouTube and YouTube Music/playlists/</code></li>
                                <li>Find CSV files like <code className="bg-zinc-800 px-1 rounded">Watch Later.csv</code> or <code className="bg-zinc-800 px-1 rounded">Likes.csv</code></li>
                                <li>Upload it below for analysis</li>
                            </ol>
                        </div>

                        <Alert className="dark bg-blue-950/30 border-blue-900/50">
                            <Info className="h-4 w-4 text-blue-400" />
                            <div className="text-sm text-blue-200">
                                Your data is processed entirely in your browser. Nothing is uploaded to any server.
                            </div>
                        </Alert>
                    </CardContent>
                </Card>

                {/* Upload Card */}
                <Card className="dark bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Upload className="h-5 w-5" />
                            Upload Your File
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                            Select a CSV file from your Google Takeout
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* File Upload Area */}
                        <div className="border-2 border-dashed border-zinc-700 rounded-lg p-8 text-center hover:border-zinc-600 transition-colors">
                            <input
                                type="file"
                                id="file-upload"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col items-center gap-3"
                            >
                                <FileJson className="h-12 w-12 text-zinc-500" />
                                <div>
                                    <p className="text-white font-medium mb-1">
                                        {file ? file.name : "Click to select a CSV file"}
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        Watch Later.csv, Likes.csv, or any playlist CSV
                                    </p>
                                </div>
                            </label>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <Alert className="dark bg-red-950/30 border-red-900/50">
                                <AlertCircle className="h-4 w-4 text-red-400" />
                                <div className="text-sm text-red-200">{error}</div>
                            </Alert>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 flex-col sm:flex-row">
                            <Button
                                onClick={handleUpload}
                                disabled={!file || isProcessing}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500"
                            >
                                {isProcessing ? "Processing..." : "Analyze Playlist"}
                            </Button>
                            <Link href="/" className="flex-1">
                                <Button variant="outline" className="w-full dark">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
