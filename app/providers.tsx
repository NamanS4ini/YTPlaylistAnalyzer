"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { SettingsProvider } from "@/hooks/useSettings";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <SettingsProvider>{children}</SettingsProvider>
        </SessionProvider>
    );
}
