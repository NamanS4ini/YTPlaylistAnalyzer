"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Faq from "./Faq";
import Recent from "./Recent";
import Image from "next/image";

export default function Homepage() {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const validateURL = (url: string) => {
    if (Number(start) > Number(end) && end != "") {
      toast.error("Start range cannot be greater than end range.", {});
      return;
    }
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/playlist\?list=|youtu\.?be\/).+$/;
    if (regex.test(url)) {
      setValidated(true);
      const videoId = url.split("list=")[1]?.split("&")[0];
      const updatedStart: string = start === "" ? "0" : start;
      const updatedEnd: string = end === "" ? "5000" : end;
      router.push(`/${videoId}?start=${updatedStart}&end=${updatedEnd}`);
    } else {
      toast.error("Invalid URL. Please recheck your URL");
    }
  };

  const handelStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      setStart("0");
      return;
    }
    if (Number(e.target.value) >= 5000) {
      setStart("5000");
      return;
    }
    setStart(e.target.value);
  };

  const handelEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setEnd("");
      return;
    }
    if (Number(e.target.value) < 0) {
      setEnd("0");
      return;
    }
    if (Number(e.target.value) >= 5000) {
      setEnd("5000");
      return;
    }
    setEnd(e.target.value);
  };

  const [url, setURL] = useState("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      validateURL(url);
    }
  };

  // Keyboard shortcut: Cmd/Ctrl + K to focus URL input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("url")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen max-w-4xl mx-auto bg-zinc-950 text-white px-6 py-24 flex flex-col items-center relative">
      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col items-center w-full relative z-10">
        {/* YouTube Logo */}
        <Image src="/youtube.svg" alt="YouTube Logo" width={64} height={64} />

        {/* Heading and Subtext */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center my-2">
          YouTube Playlist Analyzer
        </h1>
        <h2 className="text-zinc-400 text-center max-w-xl mb-2">
          Instantly calculate total duration, likes, views, and more. Get
          insights before you even press play.
        </h2>
        <p className="text-blue-400 text-center max-w-lg mb-10 font-medium">
          Know if a playlist is worth finishing before you commit hours of time.
        </p>

        {/* URL Input */}
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <div>
            <Label className="mb-2" htmlFor="url">
              YouTube Playlist URL
            </Label>
            <Input
              type="text"
              id="url"
              placeholder="Paste YouTube Playlist URL here"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              onKeyUp={handleKeyPress}
              className="w-full dark py-6 transition-all duration-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
            />
            <p className="text-xs text-zinc-500 mt-2">
              Press <kbd className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs">⌘K</kbd> or <kbd className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-xs">Ctrl+K</kbd> to focus or click the input.
            </p>
          </div>

          {/* Advanced Options Toggle */}
          <div className="border border-zinc-800 rounded-lg overflow-hidden transition-all duration-300">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-zinc-900 transition-colors text-sm font-medium text-zinc-300"
            >
              <span>Advanced Options</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${showAdvanced ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${showAdvanced
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                }`}
            >
              <div className="overflow-hidden">
                <div className="px-4 py-4 border-t border-zinc-800 bg-zinc-900/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="start"
                        className="text-sm font-medium text-zinc-400 block mb-2"
                      >
                        Start Range
                      </Label>
                      <Input
                        id="start"
                        type="number"
                        value={start}
                        onChange={handelStart}
                        onKeyUp={handleKeyPress}
                        placeholder="0"
                        className="w-full py-5 dark transition-all duration-200 focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="end"
                        className="text-sm font-medium text-zinc-400 block mb-2"
                      >
                        End Range
                      </Label>
                      <Input
                        id="end"
                        type="number"
                        value={end}
                        onChange={handelEnd}
                        onKeyUp={handleKeyPress}
                        placeholder="5000"
                        className="w-full py-5 dark transition-all duration-200 focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-zinc-500 mt-3">
                    Analyze specific portions of large playlists (e.g., videos 10-50)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Button */}
            {validated ? (
              <Button
                className="w-48 p-4 text-lg mt-2 flex items-center justify-center"
                disabled
              >
                <Spinner className="mr-2" />
                Analyzing...
              </Button>
            ) : (
              <Button
                variant={"outline"}
                className="dark w-48 p-4 cursor-pointer bg-blue-700 hover:bg-blue-800 text-lg mt-2 transition-all duration-200 hover:scale-105 active:scale-95"
                onClick={() => validateURL(url)}
              >
                Analyze Playlist
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-2xl my-8 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="w-full relative z-10">
        <Recent />
      </div>

      {/* Divider */}
      <div className="w-full max-w-2xl mt-16 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="w-full relative z-10">
        <Faq />
      </div>
    </main>
  );
}
