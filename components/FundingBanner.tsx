"use client";

import { useState, useEffect } from "react";
import { X, HeartHandshake, Coffee } from "lucide-react";
import { useFundingBanner } from "@/contexts/FundingBannerContext";

const BANNER_STORAGE_KEY = "fundingBannerDismissed";
const VISIT_COUNT_KEY = "ytpla_visit_count";

const FundingBanner = () => {
  const [visible, setVisible] = useState(false);
  const { setIsBannerVisible } = useFundingBanner();

  useEffect(() => {
    const visitCount = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || "0", 10);
    const dismissedAt = localStorage.getItem(BANNER_STORAGE_KEY);
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const isStillDismissed =
      dismissedAt !== null &&
      Date.now() - parseInt(dismissedAt, 10) < SEVEN_DAYS_MS;

    if (visitCount === 0) {
      // First-time visitor: mark them and don't show the banner
      localStorage.setItem(VISIT_COUNT_KEY, "1");
    } else {
      // Return visitor: show banner only if not dismissed within the last 7 days
      if (!isStillDismissed) {
        setVisible(true);
        setIsBannerVisible(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setIsBannerVisible(false);
    // Store dismissal timestamp so it re-shows after 7 days
    localStorage.setItem(BANNER_STORAGE_KEY, Date.now().toString());
  };

  if (!visible) return null;

  return (
    <div
      id="funding-banner"
      role="banner"
      aria-label="Support banner"
      style={{
        background: "#991b1b",
        borderBottom: "1px solid rgba(239,68,68,0.3)",
      }}
      className="fixed top-0 left-0 right-0 w-full z-[60] flex items-center justify-center px-4 py-1 text-white"
    >


      {/* Content */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center text-sm pr-8">
        <span className="flex items-center gap-1.5 font-semibold text-white">
          <HeartHandshake className="h-4 w-4 shrink-0 text-white/70" />
          This site may shut down - it costs&nbsp;<strong>$30/month</strong>&nbsp;to run.{" "}
          <a href="/support" className="underline underline-offset-2 text-white/80 hover:text-white transition-colors text-xs font-normal">Learn why</a>
        </span>

        <span className="text-red-300 hidden sm:inline">·</span>

        <span className="text-zinc-200 text-xs sm:text-sm">Help keep it alive:</span>

        {/* Buy Me a Coffee */}
        <a
          id="funding-banner-bmc-link"
          href="https://buymeacoffee.com/namansaini"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-xs px-3 py-1 transition-all duration-200 hover:scale-105 shadow-md"
          aria-label="Support via Buy Me a Coffee"
        >
          <Coffee className="h-3.5 w-3.5" />
          Buy me a coffee
        </a>

        {/* UPI */}
        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300">
          or UPI:&nbsp;
          <button
            id="funding-banner-upi-copy"
            type="button"
            title="Click to copy UPI ID"
            onClick={() => {
              navigator.clipboard.writeText("ytpla@axl").catch(() => {});
            }}
            className="font-mono font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded px-2 py-0.5 cursor-pointer transition-colors duration-150"
            aria-label="Copy UPI ID ytpla@axl"
          >
            ytpla@axl
          </button>
        </span>
      </div>

      {/* Dismiss button */}
      <button
        id="funding-banner-close"
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss funding banner"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-red-300 hover:text-white hover:bg-white/10 transition-colors duration-150"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default FundingBanner;
