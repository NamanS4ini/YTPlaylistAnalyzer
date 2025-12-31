import React from "react";
import { CiBookmark } from "react-icons/ci";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  return (
    <section className="mt-16  w-full text-zinc-300">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="w-full dark">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-md cursor-pointer text-white">
            What kind of playlist URLs are supported?
          </AccordionTrigger>
          <AccordionContent className="text-md text-white">
            Any public YouTube playlist link works - just paste the full URL and
            hit Analyze.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-md cursor-pointer text-white">
            What does Start/End Range mean?
          </AccordionTrigger>
          <AccordionContent className="text-md text-white">
            If you only want to analyze a portion of the playlist, set a custom
            range. For example, from video 5 to 20 - great for huge playlists.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-md cursor-pointer text-white">
            Is there a browser extension available?
          </AccordionTrigger>
          <AccordionContent className="text-md text-white">
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
          <AccordionTrigger className="text-md cursor-pointer text-white">
            Can I sort videos or filter them?
          </AccordionTrigger>
          <AccordionContent className="text-md text-white">
            Yes! Once analyzed, you can sort videos by{" "}
            <span className="text-white font-semibold">
              length, likes, comments, views, and more
            </span>
            .
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-md cursor-pointer text-white">
            Is it mobile-friendly?
          </AccordionTrigger>
          <AccordionContent className="text-md text-white">
            Absolutely, everything&apos;s responsive and optimized for both
            desktops and phones.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="text-md cursor-pointer text-white">
            Can I save playlists for later?
          </AccordionTrigger>
          <AccordionContent className="text-md text-white">
            Yep! While viewing a playlist, just press{" "}
            <CiBookmark size={20} className="inline text-current" /> and
            it&apos;ll be saved for quick access later.
            <span className="block mt-2 text-zinc-400 text-sm">
              All saved playlists stay only on{" "}
              <span className="text-white font-semibold">your device</span>,
              nothing is uploaded or stored on our servers.
            </span>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className="text-md cursor-pointer text-white">
            Found a bug or have a suggestion?
          </AccordionTrigger>
          <AccordionContent className="text-md text-white">
            Feel free to open an issue on{" "}
            <a
              href="https://github.com/NamanS4ini/YTPlaylistLength"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white hover:text-zinc-200"
            >
              GitHub
            </a>
            . I will look into that.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default Faq;
