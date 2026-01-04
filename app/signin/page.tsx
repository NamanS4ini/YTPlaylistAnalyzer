import React from 'react'
import SignIn from '@/components/auth/signin'
import { SignOut } from '@/components/auth/signout'
import Image from 'next/image'
import { auth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Shield, Lock, Eye, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function UserAvatar() {
    const session = await auth()

    return (
        <div className='min-h-screen w-full py-20 bg-zinc-950 flex justify-center items-center p-4 relative'>
            {/* Background gradient */}
            <div className="absolute top-0 w-full overflow-hidden left-1/2 -translate-x-1/2 max-w-150 h-75 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

            <Card className="dark bg-zinc-900 border-zinc-800 max-w-2xl w-full relative z-10">
                {session ? (
                    <>
                        <CardHeader className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="relative">
                                    <Image
                                        src={session.user?.image || ""}
                                        alt="User Avatar"
                                        width={100}
                                        height={100}
                                        className="rounded-full border-4 border-zinc-800"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5">
                                        <CheckCircle className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <CardTitle className="text-white text-3xl">Welcome Back!</CardTitle>
                                <CardDescription className="text-zinc-400 text-lg mt-2">
                                    Signed in as <span className="text-white font-medium">{session.user?.email}</span>
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <Separator className="bg-zinc-800" />

                        <CardContent className="pt-6 space-y-6">
                            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 space-y-4">
                                <h3 className="text-white font-semibold text-lg">You now have access to:</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-zinc-300">
                                        <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                                        <span>Liked Videos playlist analysis</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-zinc-300">
                                        <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                                        <span>All your private playlists</span>
                                    </div>
                                </div>
                                <div className="bg-orange-950/30 border border-orange-900/50 rounded-lg p-3 mt-3">
                                    <div className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <div>
                                            <p className="text-xs text-orange-300 mb-1">
                                                <strong>Watch Later workaround:</strong> YouTube&apos;s API doesn&apos;t allow access to Watch Later.
                                            </p>
                                            <Link href="/upload" className="text-xs text-orange-400 hover:underline">
                                                Upload from Google Takeout instead →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/" className="flex-1">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 hover:scale-105">
                                        Start Analyzing
                                    </Button>
                                </Link>
                                <SignOut />
                            </div>
                        </CardContent>
                    </>
                ) : (
                    <>
                        <CardHeader className="text-center space-y-4">
                            <CardTitle className="text-white text-3xl">Sign In Required</CardTitle>
                            <CardDescription className="text-zinc-400 text-lg">
                                Access your Liked Videos playlist
                            </CardDescription>
                        </CardHeader>

                        <Separator className="bg-zinc-800" />

                        <CardContent className="pt-6 space-y-6">
                            {/* Privacy Notice */}
                            <div className="bg-blue-950/30 border border-blue-900/50 rounded-lg p-6 space-y-4">
                                <div className="flex items-center gap-2 text-blue-400 font-semibold text-lg">
                                    <Shield className="h-6 w-6" />
                                    <span>Your Privacy is Protected</span>
                                </div>

                                <div className="space-y-3 text-sm text-zinc-300">
                                    <div className="flex items-start gap-3">
                                        <Lock className="h-5 w-5 mt-0.5 text-green-400 flex-shrink-0" />
                                        <p>We <strong className="text-white">do not collect</strong> your email or profile picture</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Eye className="h-5 w-5 mt-0.5 text-green-400 flex-shrink-0" />
                                        <p>No personal data is stored on our servers</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 mt-0.5 text-green-400 flex-shrink-0" />
                                        <p>All data stays in your browser&apos;s local storage</p>
                                    </div>
                                </div>
                            </div>

                            {/* Why Sign In */}
                            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-6 space-y-3">
                                <h4 className="font-semibold text-white mb-3 text-lg">Why sign in?</h4>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    YouTube restricts access to <span className="text-white font-medium">Liked Videos</span> playlist.
                                    Authentication is required to analyze this special playlist.
                                </p>
                                <div className="bg-orange-950/30 border border-orange-900/50 rounded-lg p-3">
                                    <div className="flex items-start gap-2">
                                        <svg className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <div>
                                            <p className="text-xs text-orange-300 leading-relaxed mb-1">
                                                <strong>Watch Later workaround:</strong> YouTube&apos;s API doesn&apos;t allow access to Watch Later playlists due to privacy restrictions.
                                            </p>
                                            <Link href="/upload" className="text-xs text-orange-400 hover:underline font-medium">
                                                Export from Google Takeout & upload here instead →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sign In Component */}
                            <div className="flex justify-center">
                                <SignIn />
                            </div>

                            {/* Back to Home */}
                            <div className="text-center">
                                <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
                                    ← Back to Home
                                </Link>
                            </div>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    )
}