"use client";
import { Settings } from "@/lib/types";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

const DEFAULT_SETTINGS: Settings = {
    thumbnail: true,
    cacheExpireTime: 24,
    recentPlaylistNumber: 5,
    navbarStyle: "default",
    navbarItems: {
        home: true,
        saved: true,
        about: true,
        settings: true,
        feedback: true,
        buyMeACoffee: true,
        upload: true,
        github: true,
        signIn: true,
    },
    showAnnouncement: true,
    videoStats: "rounded",

};
function getSettings(): Settings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;

    try {
        const stored = localStorage.getItem("settings");
        if (!stored) return DEFAULT_SETTINGS;

        const parsed = JSON.parse(stored);

        return {
            ...DEFAULT_SETTINGS,
            ...parsed,
            navbarItems: {
                ...DEFAULT_SETTINGS.navbarItems,
                ...(parsed.navbarItems || {}),
            },
        };
    } catch {
        return DEFAULT_SETTINGS;
    }
}

type SettingsContextValue = {
    settings: Settings;
    updateSettings: (updates: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, setSettings] = useState<Settings>(() => getSettings());

    const updateSettings = useCallback((updates: Partial<Settings>) => {
        setSettings((prev) => {
            const updated = {
                ...prev,
                ...updates,
                navbarItems: {
                    ...prev.navbarItems,
                    ...(updates.navbarItems || {}),
                },
            };

            localStorage.setItem("settings", JSON.stringify(updated));
            return updated;
        });
    }, []);

    const value = useMemo(
        () => ({ settings, updateSettings }),
        [settings, updateSettings]
    );

    return (
        <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error("useSettings must be used within SettingsProvider");
    }

    return context;
}