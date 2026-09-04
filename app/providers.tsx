"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { SettingsProvider } from "@/hooks/useSettings";
import { CacheCleanupInitializer } from "@/components/CacheCleanupInitializer";
import { FundingBannerProvider } from "@/contexts/FundingBannerContext";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <SettingsProvider>
                <FundingBannerProvider>
                    <CacheCleanupInitializer />
                    {children}
                </FundingBannerProvider>
            </SettingsProvider>
        </SessionProvider>
    );
}
