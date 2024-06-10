'use client'

import {useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import { MultimediaContext } from './MultimediaCarousel'

interface Props {
  url: string | null
}

export const VideoPlayer = ({ url}: Props) => {

    const {
        handlePlay,
        isPlaying,
      } = useContext(MultimediaContext)

  const [isClient, setIsClient] = useState(false)


  useEffect(() => {
    setIsClient(true)
  }, [])

  const videoPlayer = useRef<ReactPlayer>(null)

  if (!url) return

  const handlePlayLocal = () => {
    handlePlay()
  }


  const handlePause = () => {
    //  setIsPlaying(!isPlaying)
  }

  return (
    <>
      {isClient ? (
        <div className='h-[100px] bg-red-600'>
          <ReactPlayer
            url={url}
            ref={videoPlayer}
            playing={isPlaying}
            onPlay={handlePlayLocal}
            controls={true}
            onPause={handlePause}
            height={250}
          
          />
     
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
