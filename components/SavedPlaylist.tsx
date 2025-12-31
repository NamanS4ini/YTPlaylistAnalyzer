"use client"
import { useEffect, useState } from "react";
import Empty from "@/lib/Empty";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import PlaylistCard from "./ui/playlistCard";
import { Playlist } from "@/lib/types";



export default function SavedPlaylist() {
  const [thumbnail, setThumbnail] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<Playlist[]>([]);
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    setThumbnail(JSON.parse(localStorage.getItem("thumbnail") || "false"));
    setBookmarks(savedBookmarks);
  }, [])

  function handleThumbnail() {
    setThumbnail(!thumbnail);
    localStorage.setItem("thumbnail", JSON.stringify(!thumbnail));
  }

  if (bookmarks?.length === 0) {
    return (
      <div className="flex h-dvh justify-center items-center">
      <Empty title="No Saved Playlists" desc="You haven't saved any playlists yet. Start by exploring and saving a playlist to keep it here for quick access." />
      </div>
    );
  }
  return (
    <div className="bg-zinc-950">

      <div className="min-h-dvh pt-20 mx-auto md:min-h-screen w-fit bg-zinc-950 text-white flex flex-col ">
        <div className="flex items-center w-full justify-between px-6 pt-6">
          <h1 className="text-2xl md:text-3xl font-bold">Your Saved Playlists
          </h1>
            <span>
              <Switch id='thumbnail' onClick={() => { handleThumbnail() }} defaultChecked={thumbnail} className='dark cursor-pointer' />
              <Label htmlFor='thumbnail' className="inline-flex items-center cursor-pointer">
                <span className="ms-3 text-2xl font-medium dark">Thumbnails</span>
              </Label>
            </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5 max-w-6xl w-full mx-auto'>
          {bookmarks?.map((playlist) => (
           <PlaylistCard key={playlist.id} playlist={playlist} thumbnail={thumbnail} />
          ))}
        </div>
      </div>
    </div>
  )
}
