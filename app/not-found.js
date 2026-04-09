// app/not-found.js
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 pt-24 pb-12 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center shadow-xl">
        <p className="text-sm font-semibold tracking-widest text-blue-400">
          ERROR
        </p>
        <h1 className="text-7xl sm:text-8xl font-bold mt-2">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold mt-3">
          Page Not Found
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-4 mb-8">
          The page you&apos;re looking for does not exist, was moved, or the URL
          is incorrect.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 font-semibold hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Return Home
          </Link>
          <Link
            href="/saved"
            className="inline-flex items-center px-4 py-2 rounded-lg border border-zinc-700 text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            Open Saved
          </Link>
        </div>
      </div>
    </main>
  );
}
