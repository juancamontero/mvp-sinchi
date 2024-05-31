'use client'

import { useContext, useEffect, useRef } from 'react'

import Image from 'next/image'

import { MultimediaContext } from './MultimediaCarousel'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

export const MultimediaModalSlider = () => {
  const {
    toggleGallery,
    multimedias,
    isOpen,
    previous,
    forward,
    currentIndex,
  } = useContext(MultimediaContext)



  return (
    <div
      className={`z-[999] fixed top-0 left-0  w-screen h-screen overscroll-none bg-bg-300 sm:px-16 p-8  flex-col justify-evenly items-center transition flex duration-700 ease-in-out  ${
        !isOpen
          ? 'translate-x-full z-0 bg-opacity-0'
          : 'translate-x-0 z-[999] bg-opacity-100'
      } `}
    >
      {/* BOTONES NAVEGACION */}
      <button
        onClick={previous}
        className='absolute  left-12 sm:left-1 bottom-20 sm:bottom-0 sm:top-1/2 z-10 flex lg:h-14 lg:w-14 h-8 w-8 -translate-y-1/2 items-center justify-center hover:text-accent-100 text-primary-100'
      >
        <FaChevronLeft size={48} />
      </button>

      <button
        onClick={()=>{
          forward()
          // stopVideo()
        }}
        className='absolute  right-12 sm:right-1 bottom-20 sm:bottom-0 sm:top-1/2 z-10 flex lg:h-14 lg:w-14 h-8 w-8 -translate-y-1/2 items-center justify-center hover:text-accent-100 text-primary-100'
      >
        <FaChevronRight size={48} />
      </button>

      <div
        className={`flex flex-col justify-center items-center relative h-full w-screen lg:w-full`}
      >
        {/* Multimedia index */}
        <div className='absolute   -top-2 right-1 lg:right-2  z-10  bg-bg-400 px-2 text-center text-sm text-text-200 p-2 shadow-md'>
          <span>{currentIndex}</span>/<span>{multimedias.length}</span>
        </div>

        {/* INICIAL SLIDER */}
        <div className='relative w-full h-full'>
          {multimedias.map((multimedia, index) => (
            <div
              key={multimedia.id}
              className={`absolute top-0 w-full h-[90vh] sm:h-screen flex-col justify-center sm:justify-start  items-center transition duration-300  ${
                index + 1 === currentIndex
                  ? 'flex  translate-y-0 '
                  : 'hidden translate-y-full'
              }`}
            >
              {/* TITLE + SUBTITLE */}
              <div className='flex flex-col justify-start items-center sm:items-start gap-0  w-11/12 mx-auto mb-2 lg:mb-12'>
                <h4 className='lg:text-2xl text-xl font-medium sm:text-left text-center text-primary-300 leading-tight'>
                  {multimedia.title}
                </h4>
                {multimedia.subTitle && (
                  <h4 className='lg:text-base text-sm font-normal sm:text-left text-center text-primary-300 italic leading-tight'>
                    {multimedia.subTitle}
                  </h4>
                )}
              </div>

              {/* IMAGEN O VIDEO */}
              {multimedia.mediaType === 'image' ? (
                <Image
                  className={`w-11/12 sm:h-[50vh] lg:h-[80vh] h-auto  object-contain object-center z-50 transition duration-1000  ${
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
                <iframe
                  // id='videoIframe'
                  className='w-5/6 mx-auto h-auto lg:w-full  sm:h-[50vh] lg:h-[70vh]  z-30 '
                  src={multimedia.url ?? ''}
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                />
                // <Video url={multimedia.url} />
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => toggleGallery()}
        className={`z-50 text-center hover:opacity-70  mx-auto text-text-100 absolute sm:left-1/2 bottom-20  sm:bottom-12 hover:text-accent-100`}
      >
        <MdClose size={28} />
      </button>
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
      className='w-5/6 mx-auto h-auto lg:w-full  sm:h-[50vh] lg:h-[70vh]  z-30 '
      src={url}
      title='YouTube video player'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
    />
  )
}
