'use client'

import { ImagenIndicadores } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Props {
  indicadores: ImagenIndicadores[]
}

export const IndicadoresSlider = ({ indicadores }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1)

  const previous = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const forward = () => {
    if (currentIndex < indicadores.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  if (indicadores.length === 0) return
  return (
    <div className='h-full  w-full'>
      <div className='relative mx-auto w-full overflow-hidden  h-full'>
        {/* Mapa indexﬂ */}
        {indicadores.length > 1 && (
          <div className='absolute right-0 top-0 z-10  bg-bg-200 px-2 text-center text-sm text-text-200 p-2 shadow-sm'>
            <span>{currentIndex}</span>/<span>{indicadores.length}</span>
          </div>
        )}

        {indicadores.length > 1 && (
          <button
            onClick={previous}
            className='absolute left-1 top-1/2 z-10 flex lg:h-8 lg:w-8 h-6 w-6 -translate-y-1/2 items-center justify-center hover:text-accent-100'
          >
            <FaChevronLeft size={24} />
          </button>
        )}

        {indicadores.length > 1 && (
          <button
            onClick={forward}
            className='absolute  right-1 top-1/2 z-10 flex lg:h-14 lg:w-14 h-6 w-6 -translate-y-1/2 items-center justify-center hover:text-accent-100'
          >
            <FaChevronRight size={24} />
          </button>
        )}

        <div className='relative w-full lg:h-full min-h-[50vh]'>
          {indicadores.map((indicador, index) => (
            <div
              key={indicador.id}
              style={{ display: index + 1 === currentIndex ? 'block' : 'none' }}
              className='absolute top-0 w-full h-full flex flex-col justify-evenly'
            >
              <Image
                src={indicador.url ?? '/images/placeholder-img.jpeg'}
                alt='image'
                className='object-contain  mx-auto  transition-transform duration-300 h-5/6'
                width={800}
                height={800}
              />
              {/* <div className='flex flex-col justify-end items-center gap-0'>
                <h4 className='font-bold lg:text-xl text-base w-full text-center text-primary-200 leading-none'>
                  {indicador.title}
                </h4>
                <h5 className='font-normal lg:text-base text-sm w-full text-center text-primary-200'>
                  {indicador.subTitle}
                </h5>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
