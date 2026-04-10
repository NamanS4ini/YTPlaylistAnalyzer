import { Metadata } from "next";
import DisplaySettings from "@/components/settings/DisplaySettings";
import CacheSettings from "@/components/settings/CacheSettings";
import NavbarSettings from "@/components/settings/NavbarSettings";
import AnnouncementSettings from "@/components/settings/AnnouncementSettings";

export const metadata: Metadata = {
  title: "Settings",
  description: "Customize your YouTube Playlist Analyzer preferences",
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="pt-20 pb-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">Settings</h1>
            <p className="text-zinc-400 mt-2">
              Customize your YouTube Playlist Analyzer experience
            </p>
            <p className="text-red-500">Note: Some settings may not be available for now as they are still being developed.</p>
          </div>

          <div className="space-y-8 mb-12">
            <section className="border-b border-zinc-800 pb-8">
              <DisplaySettings />
            </section>

            <section className="border-b border-zinc-800 pb-8">
              <CacheSettings />
            </section>

            <section className="border-b border-zinc-800 pb-8">
              <NavbarSettings />
            </section>

            <section className="pb-8">
              <AnnouncementSettings />
            </section>
          </div>

          <div className="text-center text-sm text-zinc-400">
            <p>Settings are saved locally on your device</p>
          </div>
        </div>
      </div>
    </div>
  );
}