import React from "react";
import { CiBookmark } from "react-icons/ci";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const Faq = () => {
  return (
    <section className="w-full text-zinc-300">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="help-section" className="border-zinc-800">
          <AccordionTrigger className="text-xl cursor-pointer font-semibold text-white hover:text-zinc-200">
            Need help?
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible className="w-full dark">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-md cursor-pointer text-zinc-300 hover:text-white">
                  What kind of playlist URLs are supported?
                </AccordionTrigger>
                <AccordionContent className="text-md text-zinc-400">
                  Any public YouTube playlist link works - just paste the full URL and
                  hit Analyze.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-md cursor-pointer text-zinc-300 hover:text-white">
                  What does Start/End Range mean?
                </AccordionTrigger>
                <AccordionContent className="text-md text-zinc-400">
                  If you only want to analyze a portion of the playlist, set a custom
                  range. For example, from video 5 to 20 - great for huge playlists.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-md cursor-pointer text-zinc-300 hover:text-white">
                  Is there a browser extension available?
                </AccordionTrigger>
                <AccordionContent className="text-md text-zinc-400">
                  Yes! The extension is complete and available on{" "}
                  <a
                    href="https://addons.mozilla.org/en-US/firefox/addon/ytpla/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400 hover:text-blue-300"
                  >
                    Firefox
                  </a>
                  . For Chrome users, you&apos;ll need to install it manually from{" "}
                  <a
                    href="https://github.com/NamanS4ini/YTPLA-Extention?tab=readme-ov-file#installation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400 hover:text-blue-300"
                  >
                    GitHub
                  </a>{" "}
                  due to Chrome&apos;s developer fee requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-md cursor-pointer text-zinc-300 hover:text-white">
                  Can I sort videos or filter them?
                </AccordionTrigger>
                <AccordionContent className="text-md text-zinc-400">
                  Yes! Once analyzed, you can sort videos by{" "}
                  <span className="text-zinc-300 font-semibold">
                    length, likes, comments, views, and more
                  </span>
                  .
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-md cursor-pointer text-zinc-300 hover:text-white">
                  Is it mobile-friendly?
                </AccordionTrigger>
                <AccordionContent className="text-md text-zinc-400">
                  Absolutely, everything&apos;s responsive and optimized for both
                  desktops and phones.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-md cursor-pointer text-zinc-300 hover:text-white">
                  Can I save playlists for later?
                </AccordionTrigger>
                <AccordionContent className="text-md text-zinc-400">
                  Yep! While viewing a playlist, just press{" "}
                  <CiBookmark size={20} className="inline text-current" /> and
                  it&apos;ll be saved for quick access later.
                  <span className="block mt-2 text-zinc-500 text-sm">
                    All saved playlists stay only on{" "}
                    <span className="text-zinc-400 font-semibold">your device</span>,
                    nothing is uploaded or stored on our servers.
                  </span>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-md cursor-pointer text-zinc-300 hover:text-white">
                  How can I analyze Watch Later or private playlists?
                </AccordionTrigger>
                <AccordionContent className="text-md text-zinc-400">
                  YouTube&apos;s API doesn&apos;t allow access to Watch Later or private playlists. However, you can export your data from{" "}
                  <a
                    href="https://takeout.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-400 hover:text-blue-300"
                  >
                    Google Takeout
                  </a>{" "}
                  and{" "}
                  <Link
                    href="/upload"
                    className="underline text-orange-400 hover:text-orange-300 font-medium"
                  >
                    upload it here
                  </Link>{" "}
                  for analysis - completely in your browser!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-md cursor-pointer text-zinc-300 hover:text-white">
                  Found a bug or have a suggestion?
                </AccordionTrigger>
                <AccordionContent className="text-md text-zinc-400">
                  Feel free to open an issue on{" "}
                  <a
                    href="https://github.com/NamanS4ini/YTPlaylistLength"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-zinc-300 hover:text-zinc-200"
                  >
                    GitHub
                  </a>
                  . I will look into that.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Faq;
