'use client'

import { Proyecto, Sello } from '@prisma/client'
import { ProjectCard } from '..'
import { useRef } from 'react'

import './scrollbar.css'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Props {
  proyectos: ({
    sellos: Sello[]
  } & Proyecto)[]
  baseColor?: string | null
}

export const ProjectsCarousel = ({ proyectos , baseColor}: Props) => {
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
    <div className='w-full bg-bg-300'>
      <div
        className={`overflow-x-scroll w-full mx-auto snap-x snap-mandatory py-2 lg:px-8 px-2   mt-1  scroll-container`}
        ref={scrollContainerRef}
      >
        <div className={`flex flex-row flex-nowrap gap-3 mt-2 mb-2 w-fit`}>
          {proyectos.map((proyecto) => (
            <ProjectCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      </div>

      <div className='mx-auto flex flex-row justify-center gap-4 bg-bg-300 w-full p-4'>

        <button
          style={{ color: baseColor ? baseColor : undefined }}
          onClick={() => scrollByDirection('left')}
        >
               <span className={`text-left opacity-50 saturate-200 hover:opacity-100 ${
              baseColor ? '' : 'text-primary-200'
            }` }>
            <FaChevronLeft size={20} />
          </span>
        </button>

        <button
          style={{ color: baseColor ? baseColor : undefined }}
          onClick={() => scrollByDirection('right')}
        >
          <span className={`text-left opacity-50 saturate-200 hover:opacity-100 ${
              baseColor ? '' : 'text-primary-200'
            }` }>
            <FaChevronRight size={20} />
          </span>
        </button>
      </div>
    </div>
  )
}
