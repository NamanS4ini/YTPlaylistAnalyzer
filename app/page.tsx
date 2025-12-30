import React from 'react'
import { Metadata } from 'next'
import { ToastContainer, Bounce } from 'react-toastify';
import Homepage from '@/components/home/Homepage'

export const metadata: Metadata = {
  title: "YouTube Playlist Duration Calculator | YTPLA",
  description:
    "Calculate the total duration of any YouTube playlist instantly. Paste the playlist link and get accurate total time.",
  alternates: {
    canonical: "https://ytpla.in/"
  }
};

const page = () => {
  return (
    <div className='bg-zinc-950'>
      <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
    <Homepage />
    </div>
  )
}

export default page