'use client'

import { useRef } from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa6'
import { MultimediaCard } from './MultimediaCard'

interface Props {
  multimedias: {
    id: number
    type: 'video' | 'image'
    title: string
    subTitle: string
    order: number
    url: string
  }[]
}

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

  if (multimedias.length === 0) return <></>

  return (
    <div className='w-full'>
      <div
        className={`overflow-x-scroll w-full mx-auto snap-x snap-mandatory py-2 xBannerPaddings  mt-1  scroll-container-sinchi-carousel`}
        ref={scrollContainerRef}
      >
        <div className={`flex flex-row flex-nowrap gap-3 mt-2 mb-2 w-fit`}>
          {multimedias.map((multimedia) => (
            <MultimediaCard key={multimedia.id} multimedia={multimedia} />
          ))}
        </div>
      </div>

      <div className='mx-auto flex flex-row justify-center gap-4  w-full p-4'>
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
    </div>
  )
}
