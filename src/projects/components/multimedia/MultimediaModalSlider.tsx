'use client'

import { useContext } from 'react'

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
      className={`z-50 fixed top-0 left-0  w-screen h-screen overscroll-none bg-bg-300 sm:px-16 p-8  flex-col justify-evenly items-center transition flex duration-700 ease-in-out  ${
        !isOpen
          ? 'translate-x-full z-0 bg-opacity-0'
          : 'translate-x-0 z-[999] bg-opacity-100'
      } `}
    >
      {/* BOTONES NAVEGACION */}
      <button
        onClick={previous}
        className='absolute  left-1 top-1/2 z-10 flex lg:h-14 lg:w-14 h-8 w-8 -translate-y-1/2 items-center justify-center hover:text-accent-100 text-primary-100'
      >
        <FaChevronLeft size={48} />
      </button>

      <button
        onClick={forward}
        className='absolute  right-1 top-1/2 z-10 flex lg:h-14 lg:w-14 h-8 w-8 -translate-y-1/2 items-center justify-center hover:text-accent-100 text-primary-100'
      >
        <FaChevronRight size={48} />
      </button>

      <div
        className={`flex flex-col justify-center items-center relative m-0 h-full w-full`}
      >
        {/* Multimedia index */}
        <div className='absolute  right-8 top-8 z-10  bg-bg-400 px-2 text-center text-sm text-text-200 p-2 shadow-md'>
          <span>{currentIndex}</span>/<span>{multimedias.length}</span>
        </div>

        {/* INICIAL SLIDER */}
        <div className='relative w-full h-full '>
          {multimedias.map((multimedia, index) => (
            <div
              key={multimedia.id}
              
              className={`absolute top-0 w-full h-[90vh]  flex-col justify-evenly items-center transition duration-300 ${index + 1 === currentIndex ? 'block  translate-y-0 ' : 'hidden translate-y-full'}`}
            >
              {/* TITLE + SUBTITLE */}
              <div className='flex flex-col justify-start items-center gap-0 mt-8 w-11/12 mx-auto mb-8'>
                <h4 className='text-2xl font-medium text-center text-primary-300'>
                  {multimedia.title}
                </h4>
                {multimedia.subTitle && (
                  <h4 className='text-base font-normal text-center text-primary-300'>
                    {multimedia.subTitle}
                  </h4>
                )}
              </div>
              {/* IMAGEN O VIDEO */}
              {multimedia.type === 'image' ? (
                <Image
                  className={`w-full h-[75vh] object-cover object-center z-50 transition duration-1000  ${index + 1 === currentIndex ? 'block  translate-y-0 blur-0' : 'blur-md translate-y-full'}`}
                  src={multimedia.url ?? '/images/placeholder-img.jpeg'}
                  width={600}
                  height={450}
                  alt='hero background image'
                />
              ) : (
                <Video url={multimedia.url} />
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => toggleGallery()}
        className={`z-50 text-center hover:opacity-70  mx-auto text-text-100 absolute left-1/2 bottom-8`}
      >
        <MdClose size={32} />
      </button>
    </div>
  )
}

interface VideoProps {
  url: string
}

const Video = ({ url }: VideoProps) => {
  return (
    <iframe
      className=' w-full h-[70vh] z-30 '
      src={url}
      title='YouTube video player'
      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      allowFullScreen
      // width={1200}
      // height={700}
    />
  )
}
