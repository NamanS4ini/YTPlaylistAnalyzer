"use client";

import { ReactNode } from "react";
import { SettingsProvider } from "@/hooks/settingHook";

export default function Providers({ children }: { children: ReactNode }) {
    return <SettingsProvider>{children}</SettingsProvider>;
}
