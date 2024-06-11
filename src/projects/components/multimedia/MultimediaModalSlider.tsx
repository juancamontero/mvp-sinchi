'use client'

import { useContext } from 'react'

import { MultimediaContext } from './MultimediaCarousel'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

import { MultimediaPlayer } from './MultimediaPlayer'
import { LoaderDefault } from '@/components'

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
    <>
      {isOpen && (
        <div
          className={`z-[999] fixed top-0 left-0  w-screen h-screen overscroll-none bg-bg-300 sm:px-16 p-8 flex-col justify-center items-center transition flex duration-700 ease-in-out  ${
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
            onClick={() => {
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
            <div className='absolute lg:top-28 top-2 right-1 lg   z-10  bg-bg-400 px-2 text-center text-sm text-text-200 p-2 shadow-md'>
              <span>{currentIndex}</span>/<span>{multimedias.length}</span>
            </div>

            {/* INICIAL SLIDER */}
            <div className='relative w-full h-full'>
              {multimedias.map((multimedia, index) => (
                <MultimediaPlayer
                  key={multimedia.id}
                  index={index}
                  currentIndex={currentIndex}
                  multimedia={multimedia}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => toggleGallery()}
            className={`z-50 text-center hover:opacity-70  mx-auto text-text-100 absolute sm:left-1/2 bottom-20 sm:bottom-2 lg:bottom-2 hover:text-accent-100`}
          >
            <MdClose size={28} />
          </button>
        </div>
      )}
    </>
  )
}
