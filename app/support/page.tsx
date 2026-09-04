import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Globe, Coffee, HeartHandshake } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support YTPLA",
  description:
    "Learn why YTPLA costs $30/month to run and how you can help keep it alive.",
  alternates: {
    canonical: "https://ytpla.in/support",
  },
  robots: { index: true, follow: true },
};

export default function SupportPage() {
  return (
    <main className="pt-20 min-h-screen bg-zinc-950 text-gray-100 px-4">
      <div className="max-w-2xl mx-auto space-y-12 pb-20">

        {/* Hero */}
        <header className="text-center space-y-3 pt-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-900/40 border border-red-800/60 mb-2">
            <HeartHandshake className="h-7 w-7 text-red-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Help Keep YTPLA Running
          </h1>
          <p className="text-zinc-300 text-base md:text-lg max-w-lg mx-auto">
            YTPLA is free, ad-free, and open source. But keeping it online
            costs real money every month.
          </p>
        </header>

        <Separator className="bg-zinc-800" />

        {/* Why it costs money */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-white">
            Why does it cost ~$30/month?
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Running a website sounds cheap and it can be. But YTPLA needs a
            bit more than what free tiers offer. Here&apos;s exactly where the
            money goes:
          </p>

          <div className="space-y-3">
            {/* Vercel */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-blue-400 shrink-0" />
                  <CardTitle className="text-white text-base">
                    Vercel Hosting ~$20/month
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-zinc-300 text-sm space-y-2">
                <p>
                  Vercel offers a generous <strong className="text-zinc-300">free plan</strong>, but
                  YTPLA outgrows it. Every time you analyze a playlist, the
                  server runs a function to fetch data from YouTube&apos;s API.
                  With thousands of visitors, the number of function executions
                  and the amount of data transferred exceeds Vercel&apos;s free
                  limits.
                </p>
                <p>
                  Upgrading to Vercel Pro removes those limits and keeps the
                  site fast and reliable for everyone.
                </p>
              </CardContent>
            </Card>

            {/* Domain */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-green-400 shrink-0" />
                  <CardTitle className="text-white text-base">
                    Domain (ytpla.in) ~$10/year ≈ &lt;$1/month
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-zinc-300 text-sm">
                <p>
                  The custom domain <strong className="text-zinc-300">ytpla.in</strong> needs to be
                  renewed every year. It&apos;s the smallest part of the cost,
                  but still a real one.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="bg-zinc-800" />

        {/* How to help */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-white">How you can help</h2>
          <p className="text-zinc-300 text-sm">
            Even a small contribution goes a long way. If YTPLA has saved you
            time, consider buying me a coffee or sending a small amount via UPI.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Buy Me a Coffee */}
            <a
              href="https://buymeacoffee.com/namansaini"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-3 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Coffee className="h-4 w-4" />
              Buy me a coffee
            </a>

            {/* UPI */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3">
              <span className="text-zinc-300 text-xs">UPI (India)</span>
              <span className="font-mono font-semibold text-white text-sm tracking-wide">
                ytpla@axl
              </span>
              <span className="text-zinc-400 text-xs">
                Copy and paste in any UPI app
              </span>
            </div>
          </div>
        </section>

        <Separator className="bg-zinc-800" />

        {/* Thank you */}
        <section className="text-center space-y-2">
          <p className="text-zinc-300 font-medium">Thank you 🙏</p>
          <p className="text-zinc-400 text-sm">
            Every contribution big or small directly keeps this site alive
            and free for everyone.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
          >
            ← Back to YTPLA
          </Link>
        </section>

      </div>
    </main>
  );
}
