"use client";

import { usePathname } from "next/navigation";
import SettingsPopover from "@/components/settings/SettingsPopover";

export default function HomepageSettingsNavButton() {
    const pathname = usePathname();

    if (pathname !== "/") {
        return null;
    }

    return <SettingsPopover currentPage="home" />;
}
