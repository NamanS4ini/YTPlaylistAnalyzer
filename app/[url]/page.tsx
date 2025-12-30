import PlaylistDetails from '@/components/playlistDetails/PlaylistDetails'
import {Metadata} from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: "Playlist Details",
  description: "Calculate the total duration of your YouTube playlist. Get detailed information about video count, total runtime, and estimated watch time.",
  keywords: ["YouTube", "playlist", "duration", "calculator", "video length", "watch time"],
  robots: {
    index: false,
    follow: false,
  },
};


const page = () => {
  return (
    <>
      <PlaylistDetails />
    </>
  )
}

export default page