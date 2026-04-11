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

const MIN_CACHE_EXPIRY_HOURS = 24;
const DEFAULT_CACHE_EXPIRY_HOURS = 48;

const DEFAULT_SETTINGS: Settings = {
    thumbnail: true,
    cacheExpireTime: DEFAULT_CACHE_EXPIRY_HOURS,
    recentPlaylistNumber: 5,
    showRecentPlaylists: true,
    showNeedHelp: true,
    showFooter: true,
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

function normalizeCacheExpireTime(value: number | undefined | null) {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue) || parsedValue < MIN_CACHE_EXPIRY_HOURS) {
        return MIN_CACHE_EXPIRY_HOURS;
    }

    return Math.floor(parsedValue);
}

function getSettings(): Settings {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;

    try {
        const stored = localStorage.getItem("settings");
        if (!stored) return DEFAULT_SETTINGS;

        const parsed = JSON.parse(stored);

        return {
            ...DEFAULT_SETTINGS,
            ...parsed,
            cacheExpireTime: normalizeCacheExpireTime(parsed.cacheExpireTime),
            showRecentPlaylists: parsed.showRecentPlaylists ?? DEFAULT_SETTINGS.showRecentPlaylists,
            showNeedHelp: parsed.showNeedHelp ?? DEFAULT_SETTINGS.showNeedHelp,
            showFooter: parsed.showFooter ?? DEFAULT_SETTINGS.showFooter,
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
                cacheExpireTime: normalizeCacheExpireTime(
                    updates.cacheExpireTime ?? prev.cacheExpireTime
                ),
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