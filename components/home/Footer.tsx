import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="w-full max-w-2xl mt-16 pt-8 border-t border-zinc-800">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-zinc-400">
                <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                </Link>
                <span className="hidden sm:inline text-zinc-700">•</span>
                <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                </Link>
                <span className="hidden sm:inline text-zinc-700">•</span>
                <a
                    href="https://github.com/NamanS4ini/YTPlaylistAnalyzer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                >
                    GitHub
                </a>
            </div>
            <p className="text-center text-xs text-zinc-500 mt-4">
                © {new Date().getFullYear()}  YTPLA. All rights reserved.
            </p>
        </footer>
  )
}

export default Footer