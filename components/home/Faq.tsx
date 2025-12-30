import React from 'react'
import { CiBookmark } from "react-icons/ci"

const Faq = () => {
  return (
    <section className="mt-16 max-w-3xl w-full text-zinc-300 space-y-8">
        <h2 className="text-2xl font-semibold text-white">Frequently Asked Questions</h2>

        <div>
          <h3 className="font-medium text-white mb-1"><span className="text-blue-400">Q:</span> What kind of playlist URLs are supported?</h3>
          <p><span className="text-green-400">A:</span> Any public YouTube playlist link works - just paste the full URL and hit Analyze.</p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1"><span className="text-blue-400">Q:</span> What does Start/End Range mean?</h3>
          <p>
            <span className="text-green-400">A:</span> If you only want to analyze a portion of the playlist, set a custom range.
            For example, from video 5 to 20 - great for huge playlists.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1"><span className="text-blue-400">Q:</span> Is there a browser extension available?</h3>
          <p>
            <span className="text-green-400">A:</span> Yes! The extension is complete and available on{" "}
            <a
              href="https://addons.mozilla.org/en-US/firefox/addon/ytpla/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400"
            >
              Firefox
            </a>
            . For Chrome users, you&apos;ll need to install it manually from{" "}
            <a
              href="https://github.com/NamanS4ini/YTPLA-Extention?tab=readme-ov-file#installation"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400"
            >
              GitHub
            </a>
            {" "}due to Chrome&apos;s developer fee requirements.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1"><span className="text-blue-400">Q:</span> Can I sort videos or filter them?</h3>
          <p>
            <span className="text-green-400">A:</span> Yes! Once analyzed, you can sort videos by <span className="text-white font-semibold">length, likes, comments, views, and more</span>.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1"><span className="text-blue-400">Q:</span> Is it mobile-friendly?</h3>
          <p><span className="text-green-400">A:</span> Absolutely, everything&apos;s responsive and optimized for both desktops and phones.</p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1"><span className="text-blue-400">Q:</span> Can I save playlists for later?</h3>
          <p>
            <span className="text-green-400">A:</span> Yep! While viewing a playlist, just press{" "}
            <CiBookmark size={20} className="inline text-current" />
            and it&apos;ll be saved for quick access later.
            <span className="block mt-1 text-zinc-400 text-sm">
              All saved playlists stay only on <span className="text-white font-semibold">your device</span>,
              nothing is uploaded or stored on our servers.
            </span>
          </p>
        </div>

        <div>
          <h3 className="font-medium text-white mb-1"><span className="text-blue-400">Q:</span> Found a bug or have a suggestion?</h3>
          <p>
            <span className="text-green-400">A:</span> Feel free to open an issue on{" "}
            <a
              href="https://github.com/NamanS4ini/YTPlaylistLength"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-white"
            >
              GitHub
            </a>
            . I will look into that.
          </p>
        </div>
      </section>
  )
}

export default Faq