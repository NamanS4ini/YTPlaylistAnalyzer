"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaYoutube } from "react-icons/fa";
import Faq from "./Faq";
import Recent from "./Recent";

export default function Homepage() {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const validateURL = (url: string) => {
    if (Number(start) > Number(end) && end != "") {
      toast.warn('Start Can not be greater than end', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/playlist\?list=|youtu\.?be\/).+$/;
    if (regex.test(url)) {
      setValidated(true);
      const videoId = url.split("list=")[1]?.split("&")[0];
      const updatedStart: string = start === "" ? "0" : start;
      const updatedEnd: string = end === "" ? "5000" : end;
      router.push(`/${videoId}?start=${updatedStart}&end=${updatedEnd}`);
    } else {
      toast.warn('Invalid URL. Please recheck your URL', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  const handelStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 0) {
      setStart("0");
      return;
    }
    if (Number(e.target.value) >= 5000) {
      setStart("5000");
      return;
    }
    setStart(e.target.value)
  }

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
    setEnd(e.target.value)
  }

  const [url, setURL] = useState("")
  const [start, setStart] = useState<string>("")
  const [end, setEnd] = useState<string>("")

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateURL(url);
    }
  }

  return (
    <main className="min-h-screen max-w-4xl mx-auto bg-zinc-950 text-white px-6 py-24 flex flex-col items-center">
      <div className="flex flex-col items-center w-full">
        {/* YouTube Logo */}
        <FaYoutube color="red"  className="w-16 h-16 mb-4" />

        {/* Heading and Subtext */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
          YouTube Playlist Analyzer
        </h1>
        <h2 className="text-zinc-400 text-center max-w-xl mb-10">
          Instantly calculate total duration, likes, views, and more. Get insights before you even press play.
        </h2>

        {/* URL Input */}
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <div>
            <Label className="mb-2" htmlFor="url">YouTube Playlist URL</Label>
            <Input
              type="text"
              id="url"
              placeholder="Paste YouTube Playlist URL here"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              onKeyUp={handleKeyPress}
              className="w-full dark py-6"
            />
          </div>

          {/* Range Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="start" className="text-sm font-medium text-white block mb-1">
                Start Range (optional)
              </Label>
              <Input
                id="start"
                type="number"
                value={start}
                onChange={handelStart}
                onKeyUp={handleKeyPress}
                placeholder="0"
                className="w-full py-6 dark text-lg!"
              />
            </div>

            <div>
              <Label htmlFor="end" className="text-sm font-medium text-white block mb-1">
                End Range (optional)
              </Label>
              <Input
                id="end"
                type="number"
                value={end}
                onChange={handelEnd}
                onKeyUp={handleKeyPress}
                placeholder="5000"
                className="w-full py-6 dark text-lg!"
              />
            </div>
          </div>

          <div className="flex justify-center">

            {/* Button */}
            {validated ? (
              <Button className="w-48 p-4 text-lg mt-2 flex items-center justify-center" disabled>
                <Spinner className="mr-2" />
                Analyzing...
              </Button>
            ) : (
              <Button variant={"outline"}
                className="dark w-48 p-4 cursor-pointer bg-blue-700 hover:bg-blue-800 text-lg mt-2"
                onClick={() => validateURL(url)}
              >
                Analyze Playlist
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-10">
      <Recent />
      </div>
    </main>
  );
}
