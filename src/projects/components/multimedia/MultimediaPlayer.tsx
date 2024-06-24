'use client'

import { Suspense, useContext } from 'react'

import { LoaderDefault } from '@/components'
import { Multimedia } from '@prisma/client'
// import { VideoPlayer } from './VideoPlayer'
import Image from 'next/image'
import { MultimediaContext } from './MultimediaCarousel'

interface Props {
  index: number
  currentIndex: number
  multimedia: Multimedia
}

export const MultimediaPlayer = ({
  index,
  currentIndex,
  multimedia,
}: Props) => {
  const { isOpen } = useContext(MultimediaContext)

  if (index + 1 !== currentIndex) {
    return <></>
  }
  return (
    <div
      className={`absolute top-0 w-full h-[90vh] sm:h-screen flex-col justify-center sm:justify-start  items-center transition duration-300  ${
        index + 1 === currentIndex
          ? 'flex  translate-y-0 '
          : 'hidden translate-y-full'
      }`}
    >
      {/* TITLE + SUBTITLE */}
      <div className='flex flex-col justify-start items-center sm:items-start gap-0  w-11/12 mx-auto mb-2 lg:mb-12'>
        <h4
          className='lg:text-2xl text-xl font-medium sm:text-left text-center text-primary-300 leading-tight  title-italic'
          dangerouslySetInnerHTML={{ __html: multimedia.title }}
        />
        {multimedia.subTitle && (
          <h4
            className='lg:text-base text-sm font-normal sm:text-left text-center text-primary-300  leading-tigh  title-italic'
            dangerouslySetInnerHTML={{ __html: multimedia.subTitle }}
          />
        )}
      </div>

      {/* IMAGEN O VIDEO */}
      {isOpen && (
        <Suspense fallback={<LoaderDefault />}>
          {multimedia.mediaType === 'image' ? (
            <Image
              className={`lg:p-3 w-11/12 sm:h-[50vh] lg:h-[80vh] h-auto  object-scale-down object-center z-50 transition duration-1000  ${
                index + 1 === currentIndex
                  ? 'block  translate-y-0 blur-0'
                  : 'blur-md translate-y-full'
              }`}
              src={multimedia.url ?? '/images/placeholder-img.jpeg'}
              width={1200}
              height={800}
              alt={multimedia.title}
            />
          ) : (
            // <VideoPlayer url={multimedia.url} />
            <Video url={multimedia.url} />
          )}
        </Suspense>
      )}
    </div>
  )
}

interface VideoProps {
  url: string | null
}

const Video = ({ url }: VideoProps) => {
  if (!url) return <></>
  return (
    <iframe
      // id='videoIframe'
      className='w-5/6 mx-auto h-auto  sm:h-[50vh] lg:h-[70vh]  z-30 '
      src={url ?? ''}
      title='YouTube video player'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
    />
  )
}
