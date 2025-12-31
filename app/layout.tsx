import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Announcement from "@/components/Announcement";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ytpla.in"),

  title: {
    default: "YouTube Playlist Analyzer",
    template: "%s | YTPLA",
  },

  description:
    "Analyze YouTube playlists and calculate total duration, average video length, and playlist statistics.",

  authors: [{ name: "Naman Saini" }],
  creator: "Naman Saini",
  publisher: "YouTube Playlist Analyzer",

  openGraph: {
    siteName: "YouTube Playlist Analyzer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YouTube Playlist Analyzer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    creator: "@NamanS4ini",
    images: ["/og-image.png"],
  },

  robots: {
    follow: true,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-4CKFLK4PCF');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-zinc-900`}
      >
        <Navbar />
        {children}
        <Toaster className="dark" position="top-center" richColors />
        <Announcement />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
