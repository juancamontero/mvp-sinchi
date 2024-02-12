'use client'

import { Proyecto, Sello } from '@prisma/client'
import { ProjectCard } from '..'
import { useRef } from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'


import buttonStyles from './Buttons.module.css'

interface Props {
  proyectos: ({
    sellos: Sello[]
  } & Proyecto)[]
}

export const ProjectsCarousel = ({ proyectos }: Props) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollByDirection = (direction: 'left' | 'right') => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      const scrollAmount = 500 // Adjust the scroll amount
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

  if (proyectos.length === 0) return <h1>No hay proyectos para esa línea</h1>

  return (
    <>
      <div
        className='mt-1 overflow-x-scroll w-full mx-auto snap-x snap-mandatory py-2 lg:px-8 px-2 shadow-inner'
        ref={scrollContainerRef}
      >
        <div className='flex flex-row flex-nowrap gap-5 mt-6 mb-8 w-fit'>
          {proyectos.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      </div>{' '}
      <div className='mx-auto flex flex-row justify-center gap-3 mt-4'>
        <button 
        className={buttonStyles.navButton}
        onClick={()=>scrollByDirection('left')}>
          <TfiArrowCircleLeft size={24} />
        </button>
        <button 
        className={buttonStyles.navButton}
        onClick={()=>scrollByDirection('right')}>
          <TfiArrowCircleRight size={24} />
        </button>
      </div>
    </>
  )
}
