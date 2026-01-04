import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service - YTPLA",
    description: "Terms of Service for YouTube Playlist Analyzer",
};

export default function TermsPage() {
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
                        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                        <p className="text-zinc-400">Last updated: January 4, 2026</p>
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                By accessing or using YouTube Playlist Analyzer, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                YTPLA is a web-based tool that allows users to analyze YouTube playlists by calculating statistics such as total duration, video count, engagement metrics, and playback speeds. The Service uses the YouTube Data API v3 and Google OAuth for authentication.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">3. User Accounts and Authentication</h2>
                            <div className="text-zinc-300 space-y-3">
                                <p className="leading-relaxed">
                                    <strong className="text-white">3.1 Google Sign-In:</strong> You may use Google OAuth to sign in and access your Liked Videos playlist. By signing in, you grant us permission to access your YouTube data as specified in our Privacy Policy.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">3.2 Account Security:</strong> You are responsible for maintaining the security of your Google account. We are not responsible for unauthorized access to your account.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">3.3 Revocation:</strong> You may revoke access at any time through your{" "}
                                    <a
                                        href="https://myaccount.google.com/permissions"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Google Account Permissions
                                    </a>
                                    .
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">4. Acceptable Use</h2>
                            <div className="text-zinc-300 space-y-2">
                                <p className="leading-relaxed">You agree NOT to:</p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>Use the Service for any illegal or unauthorized purpose</li>
                                    <li>Attempt to gain unauthorized access to any part of the Service</li>
                                    <li>Use automated means (bots, scripts) to access the Service excessively</li>
                                    <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                                    <li>Abuse or misuse the YouTube Data API through our Service</li>
                                    <li>Violate YouTube&apos;s Terms of Service or API Terms of Service</li>
                                    <li>Share or redistribute user data obtained through the Service</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">5. YouTube API Services</h2>
                            <div className="text-zinc-300 space-y-3">
                                <p className="leading-relaxed">
                                    <strong className="text-white">5.1 API Usage:</strong> This Service uses YouTube API Services. By using YTPLA, you are also agreeing to be bound by the{" "}
                                    <a
                                        href="https://www.youtube.com/t/terms"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        YouTube Terms of Service
                                    </a>
                                    .
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">5.2 API Limitations:</strong> The Service is subject to YouTube API quota limits. We may implement rate limiting or usage restrictions to comply with these limits.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">5.3 Data Policy:</strong> Our use of YouTube data complies with the{" "}
                                    <a
                                        href="https://developers.google.com/youtube/terms/api-services-terms-of-service"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        YouTube API Services Terms of Service
                                    </a>
                                    {" "}and the{" "}
                                    <a
                                        href="https://developers.google.com/terms/api-services-user-data-policy"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Google API Services User Data Policy
                                    </a>
                                    .
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
                            <div className="text-zinc-300 space-y-3">
                                <p className="leading-relaxed">
                                    <strong className="text-white">6.1 Service Ownership:</strong> The Service, including its design, code, and functionality, is owned by YTPLA and is protected by copyright and other intellectual property laws.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">6.2 YouTube Content:</strong> All YouTube content, including video titles, thumbnails, and metadata, remains the property of their respective owners.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">6.3 Open Source:</strong> Parts of this Service may be open-sourced under specific licenses. Check our{" "}
                                    <a
                                        href="https://github.com/NamanS4ini/YTPlaylistAnalyzer"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        GitHub repository
                                    </a>
                                    {" "}for details.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">7. Disclaimer of Warranties</h2>
                            <div className="text-zinc-300 space-y-3">
                                <p className="leading-relaxed">
                                    THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                                </p>
                                <ul className="list-disc list-inside ml-4 space-y-1">
                                    <li>Accuracy of playlist statistics and calculations</li>
                                    <li>Availability and uptime of the Service</li>
                                    <li>Compatibility with all browsers and devices</li>
                                    <li>Error-free operation</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, YTPLA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">9. Service Modifications and Termination</h2>
                            <div className="text-zinc-300 space-y-3">
                                <p className="leading-relaxed">
                                    <strong className="text-white">9.1 Modifications:</strong> We reserve the right to modify, suspend, or discontinue the Service at any time without prior notice.
                                </p>
                                <p className="leading-relaxed">
                                    <strong className="text-white">9.2 Termination:</strong> We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including violation of these Terms.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">10. Privacy</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                Your use of the Service is also governed by our{" "}
                                <Link href="/privacy" className="text-blue-400 hover:underline">
                                    Privacy Policy
                                </Link>
                                . Please review it to understand how we collect, use, and protect your information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">11. Third-Party Services</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                The Service integrates with third-party services (YouTube, Google OAuth). We are not responsible for the availability, accuracy, or content of these third-party services. Your use of these services is subject to their respective terms and policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">12. Governing Law</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where the Service is operated, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">13. Changes to Terms</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                We reserve the right to modify these Terms at any time. We will notify users of any material changes by updating the &quot;Last updated&quot; date. Your continued use of the Service after changes constitutes acceptance of the new Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-3">14. Contact Information</h2>
                            <p className="text-zinc-300 leading-relaxed">
                                If you have any questions about these Terms of Service, please contact us through our{" "}
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

                        <section className="border-t border-zinc-800 pt-6">
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                By using YouTube Playlist Analyzer, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
