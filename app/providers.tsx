"use client";

import { ReactNode } from "react";
import { SettingsProvider } from "@/hooks/useSettings";

export default function Providers({ children }: { children: ReactNode }) {
    return <SettingsProvider>{children}</SettingsProvider>;
}
