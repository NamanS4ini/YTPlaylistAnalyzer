import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy - YTPLA",
    description: "Privacy Policy for YouTube Playlist Analyzer - Learn how we handle your data",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white pt-20 px-4 pb-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/">
                    <Button variant="ghost" className="mb-6 text-zinc-400 hover:text-white">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>

                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                        <p className="text-zinc-400">Last updated: January 4, 2026</p>
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                YouTube Playlist Analyzer respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
                            <div className="space-y-4 text-zinc-300">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">2.1 Authentication Data</h3>
                                    <p className="leading-relaxed">
                                        When you sign in with Google to access your Liked Videos playlist, we receive:
                                    </p>
                                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                        <li>Your Google account email address</li>
                                        <li>Your profile picture</li>
                                        <li>Access token to retrieve your YouTube data</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">2.2 YouTube Data</h3>
                                    <p className="leading-relaxed">
                                        We access the following YouTube data through the YouTube Data API:
                                    </p>
                                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                        <li>Public playlist information (title, description, video count)</li>
                                        <li>Video details (title, duration, views, likes, comments)</li>
                                        <li>Your Liked Videos playlist (when authenticated)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-2">2.3 Local Storage</h3>
                                    <p className="leading-relaxed">
                                        We store the following data locally in your browser:
                                    </p>
                                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                                        <li>Recently viewed playlists</li>
                                        <li>Bookmarked playlists</li>
                                        <li>User preferences (thumbnail display settings)</li>
                                        <li>Uploaded Google Takeout data (stored only in your browser)</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
                            <div className="text-zinc-300 space-y-2">
                                <p className="leading-relaxed">We use the collected information to:</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>Calculate and display playlist statistics and analytics</li>
                                    <li>Authenticate you to access your Liked Videos playlist</li>
                                    <li>Save your preferences and recently viewed playlists</li>
                                    <li>Provide personalized features like bookmarks</li>
                                    <li>Improve our service and user experience</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">4. Data Storage and Security</h2>
                            <div className="text-zinc-300 space-y-3">
                                <p className="leading-relaxed">
                                    <strong className="text-white">Local Storage:</strong> Most of your data is stored locally in your browser and never leaves your device. This includes bookmarks, recent playlists, preferences, and uploaded Google Takeout files.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">Server-Side:</strong> We only temporarily process YouTube API data on our servers to calculate statistics. This data is not permanently stored.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">Authentication:</strong> Google OAuth tokens are handled securely and are only used to access your YouTube data with your explicit permission.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">5. Data Sharing</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                We do not sell, trade, or otherwise transfer your personal information to third parties. Your data is only shared with:
                            </p>
                            <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-zinc-300">
                                <li><strong className="text-white">YouTube Data API:</strong> To retrieve playlist and video information</li>
                                <li><strong className="text-white">Google OAuth:</strong> For secure authentication</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">6. Google API Services User Data Policy</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                YTPLA&apos;s use and transfer of information received from Google APIs adheres to the{" "}
                                <a
                                    href="https://developers.google.com/terms/api-services-user-data-policy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    Google API Services User Data Policy
                                </a>
                                , including the Limited Use requirements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">7. Your Rights</h2>
                            <div className="text-zinc-300 space-y-2">
                                <p className="leading-relaxed">You have the right to:</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>Access your data stored in local storage</li>
                                    <li>Delete your local data by clearing browser storage</li>
                                    <li>Revoke access to your Google account at any time via{" "}
                                        <a
                                            href="https://myaccount.google.com/permissions"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline"
                                        >
                                            Google Account Permissions
                                        </a>
                                    </li>
                                    <li>Sign out to stop sharing your YouTube data with us</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">8. Cookies and Tracking</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                We use essential cookies for authentication and session management. We do not use tracking cookies or analytics that collect personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">9. Children&apos;s Privacy</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                Our service is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">10. Changes to This Policy</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">11. Contact Us</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us through our{" "}
                                <Link href="/feedback" className="text-blue-400 hover:underline">
                                    feedback page
                                </Link>
                                {" "}or via our{" "}
                                <a
                                    href="https://github.com/NamanS4ini/YTPlaylistAnalyzer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    GitHub repository
                                </a>
                                .
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
