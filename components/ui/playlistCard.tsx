import React from 'react'
import type { PlaylistCard } from '@/lib/types'
import Link from 'next/link';
import Image from 'next/image';

const PlaylistCard = ({ playlist, thumbnail }: { playlist: PlaylistCard, thumbnail: boolean }) => {
  return (
     <div key={playlist.id} className='bg-zinc-900 border flex flex-col justify-between border-zinc-800 hover:bg-zinc-800 ease-in-out duration-200 transition rounded-lg p-4 shadow-lg'>
              <Link href={`/${playlist.id}`} rel="noopener noreferrer">
                <div className='relative mb-2'>
                  {thumbnail && <Image
                    src={playlist.thumbnail}
                    width={400}
                    height={200}
                    alt={playlist.title}
                    className='w-full rounded-lg mb-2'
                  />}
                </div>
                <h3 className='text-xl hover:underline font-semibold mb-2'>
                  {playlist.title}
                </h3>
              </Link>
              <div>
                <p className='text-zinc-400'>
                  <Link
                    className='hover:underline text-zinc-300 hover:text-zinc-200'
                    href={`https://www.youtube.com/channel/${playlist.channelId}`}
                    target='_blank'
                    rel="noopener noreferrer"
                  >
                    {playlist.channelTitle}
                  </Link>
                </p>
              </div>
            </div>
  )
}

export default PlaylistCard