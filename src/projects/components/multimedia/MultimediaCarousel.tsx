'use client'

import { createContext, useEffect, useRef } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa6'
import { MultimediaCard } from './MultimediaCard'
import { MultimediaModalSlider } from './MultimediaModalSlider'

import { useMultimedia } from './useMultimedia'
import { Multimedia } from '@prisma/client'

interface Props {
  multimedias: Multimedia[]
}

//* CREACION DE CONTEXTO

export interface MultimediaContextProps {
  isOpen: boolean
  currentIndex: number
  multimedias: Multimedia[]
  isPlaying: boolean

  toggleGallery: (index?: number) => void
  previous: () => void
  forward: () => void
  getIndexById: (id: number) => number
  setIndex: (index: number) => void
  handlePlay: () => void
}

export const MultimediaContext = createContext({} as MultimediaContextProps)
const { Provider } = MultimediaContext

export const MultimediaCarousel = ({ multimedias }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollByDirection = (direction: 'left' | 'right') => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      const scrollAmount = 400 // Adjust the scroll amount
      const scrollDuration = 600 // Adjust the scroll duration (in milliseconds)

      const start = scrollContainer.scrollLeft
      let target
      if (direction === 'left') {
        target = Math.max(start - scrollAmount, 0)
      } else {
        target = Math.min(
          start + scrollAmount,
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        )
      }
      const distance = target - start
      const startTime = performance.now()

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime
        const progress = Math.min(elapsedTime / scrollDuration, 1)
        const easing = (t: number) => t * t * t // Cubic easing function

        scrollContainer.scrollLeft = start + distance * easing(progress)

        if (elapsedTime < scrollDuration) {
          requestAnimationFrame(animateScroll)
        }
      }
      requestAnimationFrame(animateScroll)
    }
  }

  const {
    isOpen,
    isPlaying,
    toggleGallery,
    previous,
    forward,
    getIndexById,
    setIndex,
    currentIndex,
    handlePlay,
  } = useMultimedia({
    isOpen: false,
    currentIndex: 1,
    multimedias,
    isPlaying: false,
  })

  if (multimedias.length === 0) return <></>

  return (
    <Provider
      value={{
        isOpen,
        currentIndex,
        multimedias,
        isPlaying,
        toggleGallery,
        previous,
        forward,
        getIndexById,
        setIndex,
        handlePlay,
      }}
    >
      <div className='w-full'>
        <div
          className={`overflow-x-scroll w-full mx-auto snap-x snap-mandatory py-2 xBannerPaddings  mt-1  scroll-container-sinchi-carousel z-50 `}
          ref={scrollContainerRef}
        >
          <div className={`flex flex-row flex-nowrap gap-3 mt-2 mb-2 w-fit`}>
            {multimedias.map((multimedia) => (
              <div key={multimedia.id} className='p-0'>
                <MultimediaCard multimedia={multimedia} />
              </div>
            ))}
          </div>
        </div>
        <div className='mx-auto flex flex-row justify-center gap-4  w-full p-4 '>
          <button onClick={() => scrollByDirection('left')}>
            <span
              className={`text-left opacity-50 saturate-200 hover:opacity-100  text-primary-200`}
            >
              <FaChevronLeft size={20} />
            </span>
          </button>

          <button onClick={() => scrollByDirection('right')}>
            <span
              className={`text-left opacity-50 saturate-200 hover:opacity-100  text-primary-200`}
            >
              <FaChevronRight size={20} />
            </span>
          </button>
        </div>

        <MultimediaModalSlider />
      </div>
    </Provider>
  )
}
