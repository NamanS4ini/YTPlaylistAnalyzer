"use client";
import Empty from '@/lib/Empty';
import React from 'react'
import { useState, useEffect } from 'react';
import type { PlaylistCard } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
const Recent = () => {
    const [recent, setRecent] = useState<PlaylistCard[]>()
    useEffect(() => {
        const recentPlaylists = JSON.parse(localStorage.getItem('recentPlaylists') || '[]');
        setRecent(recentPlaylists);
    }, [])

    return (
        <div className="mt-10 w-full">
            <h2 className="text-lg sm:text-2xl font-bold mb-4">Recently Analyzed Playlists</h2>
            <div className="flex flex-col gap-3">
                {recent?.length === 0 && <Empty title="No Recent Playlists" desc="You haven't analyzed any playlists recently. Start by analyzing a playlist to see it here." />}
                {recent?.map((playlist) => (
                    <div key={playlist.id} className='bg-zinc-900 border w-80 sm:w-full mx-auto  border-zinc-800 hover:bg-zinc-800 ease-in-out duration-200 transition rounded-lg shadow-lg'>
                        <Link href={`/${playlist.id}`} className="flex items-start sm:items-center sm:flex-row flex-col">
                            <div className="relative h-36 w-full sm:w-64">
                                <Image src={playlist.thumbnail || '/default-thumbnail.jpg'} fill alt={playlist.title} className="rounded-l-md" />
                            </div>
                            <div className="px-4 py-2">
                                <h3 className="text-lg font-semibold">{playlist.title}</h3>
                                <p className="text-zinc-400">by {playlist.channelTitle}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Recent