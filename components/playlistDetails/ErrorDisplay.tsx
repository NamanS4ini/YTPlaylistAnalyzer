import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorDisplayProps {
    error: number;
    errorMsg: string;
    id?: string;
}

export default function ErrorDisplay({ error, errorMsg, id }: ErrorDisplayProps) {
    return (
        <main className="min-h-dvh md:min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center px-6 text-center">
            <FaExclamationTriangle className="text-yellow-500 text-5xl mb-6" />

            <h1 className="text-3xl font-bold mb-2">
                {error === 403 && id === "WL" ? "Watch Later Not Accessible" : "Something went wrong!"}
            </h1>

            <p className="text-zinc-400 mb-4 max-w-md">
                {error === 404
                    ? "The playlist could not be found. It may be private, deleted, or the URL might be incorrect."
                    : error === 400
                        ? "Please confirm that the playlist ID and range parameters are correct and valid."
                        : error === 403 && id === "WL"
                            ? "YouTube's API does not allow access to Watch Later playlists due to privacy restrictions. This is a limitation of YouTube's API, not this app."
                            : "Unable to load the playlist data. This might be caused by connectivity issues or incorrect request parameters."}
            </p>

            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6 min-w-60 max-w-md">
                <p className="text-sm text-zinc-500 font-bold mb-2">
                    {error === 403 && id === "WL" ? "YouTube API Limitation:" : "Error Details:"}
                </p>
                <code className="text-red-400 text-sm font-bold wrap-break-word">
                    {error}: {errorMsg}
                </code>
            </div>

            <p className="text-sm text-zinc-400 mb-6 max-w-md">
                {error === 404
                    ? "Double-check the link and make sure it's a valid public playlist."
                    : error === 403 && id === "WL"
                        ? "Only Liked Videos (LL) can be accessed. Watch Later remains private by design."
                        : "Please try again or check your input parameters."}
            </p>

            {/* Upload Alternative for Private/WL Playlists */}
            {(error === 404 || error === 403) && (
                <div className="bg-orange-950/30 border border-orange-900/50 rounded-lg p-4 mb-6 max-w-md">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-orange-300 mb-1">
                                Alternative Solution
                            </p>
                            <p className="text-xs text-orange-200 mb-3">
                                Export your playlist data from Google Takeout and upload it here for analysis - works for Watch Later and private playlists!
                            </p>
                            <Link href="/upload">
                                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs">
                                    Upload from Takeout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex gap-3 flex-col sm:flex-row">
                <Button
                    className="cursor-pointer dark"
                    onClick={() => window.location.reload()}
                >
                    Reload Page
                </Button>

                <Link href="/">
                    <Button className="cursor-pointer">Back to Home</Button>
                </Link>
            </div>
        </main>
    );
}
