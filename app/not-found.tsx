import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-4 flex items-center justify-center">
      <section className="w-full max-w-lg text-center rounded-xl border border-zinc-800 bg-zinc-900 p-8 sm:p-10">
        <p className="text-zinc-500 text-sm font-medium">404</p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">Page Not Found</h1>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base">
          The page you requested does not exist.
        </p>

        <div className="mt-7 flex items-center justify-center gap-3">
          <Button asChild className="bg-blue-700 hover:bg-blue-800 text-white">
            <Link href="/">Go home</Link>
          </Button>

          <Button asChild variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}