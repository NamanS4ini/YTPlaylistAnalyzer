// app/about/page.tsx

import { Metadata } from "next";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart3,
  Zap,
  Shield,
  ToggleLeft,
  TrendingUp,
  Check,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About - YouTube Playlist Length Calculator",
  description:
    "Discover powerful playlist management features: sort by duration, views, likes, calculate watch times at different speeds, and get detailed playlist statistics - all while keeping your privacy first.",
  alternates: {
    canonical: "https://ytpla.in/about",
  },
  keywords: [
    "YouTube playlist",
    "playlist length",
    "video duration",
    "playlist calculator",
    "YouTube tools",
    "playlist analytics",
  ],
  openGraph: {
    title: "About - YouTube Playlist Length Calculator",
    description:
      "Take control of your YouTube playlists with advanced sorting, speed calculations, and detailed analytics.",
    type: "website",
    images: [
      {
        url: "/og-about.png",
        width: 1200,
        height: 630,
        alt: "YouTube Playlist Length Calculator - About Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - YouTube Playlist Length Calculator",
    description:
      "Discover powerful playlist management features and take control of your YouTube experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <main className="pt-20 min-h-screen bg-zinc-950 text-gray-100 px-4">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Take Control of Your Playlists
          </h1>
          <p className="text-lg md:text-xl text-zinc-400">
            See time, stats, and insights YouTube doesn&apos;t show.
          </p>
        </header>

        <Separator className="bg-zinc-800" />

        {/* What You Can Do Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white text-center">
            What you can do
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  <CardTitle className="text-white">Sort with Power</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400">
                  Sort any playlist by length, views, likes, or comments. Find
                  what matters fast.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <CardTitle className="text-white">
                    Smarter Watch Time
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400">
                  Calculate playlist duration at 1.25x, 1.5x, 2x, or any custom
                  speed instantly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-400" />
                  <CardTitle className="text-white">Playlist Stats</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400">
                  See total likes, views, comments, and average video duration
                  at a glance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ToggleLeft className="h-5 w-5 text-purple-400" />
                  <CardTitle className="text-white">
                    Data-Friendly Mode
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400">
                  Toggle off thumbnails for a lightweight, distraction-free
                  experience.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <CardTitle className="text-white">
                    Upload Analyzer
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-zinc-400">
                  Upload Watch Later data from Google Takeout and analyze it locally - no API needed!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="bg-zinc-800" />

        {/* Privacy Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-white text-center">
            Built with privacy in mind
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Anonymous analytics only</h3>
                <p className="text-zinc-400 text-sm">
                  We only use Vercel&apos;s anonymous analytics - no personal data or identifiable information is collected.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">
                  Optional authentication
                </h3>
                <p className="text-zinc-400 text-sm">
                  Sign in only needed for Liked Videos and private playlists. Public playlists work without an account.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Local-only storage</h3>
                <p className="text-zinc-400 text-sm">
                  Saved playlists and settings stay only on your device.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="bg-zinc-800" />

        {/* Browser Extension Callout */}
        <section className="space-y-6">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-700 rounded-xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">
                Browser Extension Available
              </h2>
            </div>

            <p className="text-zinc-300">
              Get instant playlist analysis right on YouTube with our browser
              extension.
            </p>

            <div className="flex flex-wrap gap-3 items-center">
              <Badge
                variant="secondary"
                className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-3 py-1"
              >
                <a
                  href="https://addons.mozilla.org/en-US/firefox/addon/ytpla/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Firefox - Install Now
                </a>
              </Badge>

              <Badge
                variant="secondary"
                className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-3 py-1"
              >
                <a
                  href="https://github.com/NamanS4ini/YTPLA-Extention?tab=readme-ov-file#installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Chrome - Manual Install
                </a>
              </Badge>
            </div>

            <p className="text-sm text-zinc-500">
              Chrome requires manual installation due to developer fee
              requirements.
            </p>
          </div>
        </section>

        <Separator className="bg-zinc-800" />

        {/* Open Source + Roadmap */}
        <section className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-300">
              Open Source
            </h2>
            <p className="text-zinc-400">
              Found a bug? Got a feature idea? Open an issue on{" "}
              <a
                href="https://github.com/NamanS4ini/YTPlaylistLength"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                GitHub
              </a>{" "}
              and help shape the project.
            </p>
          </div>

          <Accordion type="single" collapsible className="border-zinc-800">
            <AccordionItem value="roadmap" className="border-zinc-800">
              <AccordionTrigger className="text-zinc-300 hover:text-white">
                View Roadmap
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 space-y-2">
                <p className="font-medium text-zinc-300">Coming soon:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Favoriting playlists</li>
                  <li>Exporting data to CSV/JSON</li>
                  <li>Custom sort settings</li>
                  <li>More surprises 👀</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <Separator className="bg-zinc-800" />

        <footer className="pt-6 text-sm text-zinc-500 text-center">
          Built with ❤️, <span className="text-zinc-400">Next.js</span>,{" "}
          <span className="text-zinc-400">Tailwind CSS</span>, and the{" "}
          <span className="text-zinc-400">YouTube Data API</span>.
        </footer>
      </div>
    </main>
  );
}
