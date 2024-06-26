'use client'

import { MapasUbicacion } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Props {
  mapas: MapasUbicacion[]
}

export const MapasSlider = ({ mapas }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(1)

  const previous = () => {
    if (currentIndex > 1) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const forward = () => {
    if (currentIndex < mapas.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  if (mapas.length === 0) return
  return (
    <div className='lg:h-[80vh] h-[40vh]  w-full p-0'>
      <div className='relative mx-auto w-full overflow-hidden  p-2 sm:p-4 h-full'>
        {/* Mapa index */}
        {mapas.length > 1 && (
          <div className='absolute lg:right-5 right-0 top-5 z-10  bg-text-100 px-2 text-center text-sm text-white p-2'>
            <span>{currentIndex}</span>/<span>{mapas.length}</span>
          </div>
        )}

        {mapas.length > 1 && (
          <button
            onClick={previous}
            className='absolute sm:left-5 left-1 top-1/2 z-10 flex lg:h-14 lg:w-14 h-8 w-8 -translate-y-1/2 items-center justify-center hover:text-accent-100'
          >
            <FaChevronLeft size={48} />
          </button>
        )}

        {mapas.length > 1 && (
          <button
            onClick={forward}
            className='absolute sm:right-5 right-1 top-1/2 z-10 flex lg:h-14 lg:w-14 h-8 w-8 -translate-y-1/2 items-center justify-center hover:text-accent-100'
          >
            <FaChevronRight size={48} />
          </button>
        )}

        <div className='relative w-full h-full p-0'>
          {mapas.map((mapa, index) => (
            <div
              key={mapa.id}
              style={{ display: index + 1 === currentIndex ? 'block' : 'none' }}
              className={`absolute top-0 w-full h-full  flex-col justify-start transition duration-500 `}
            >
              <Image
                src={mapa.url ?? '/images/placeholder-img.jpeg'}
                alt='image'
                className={`object-contain  mx-auto transition duration-1000 w-full p-0 ${
                  index + 1 === currentIndex ? 'h-full lg:h-[90%]' : 'h-0 blur-sm'
                }`}
                width={1200}
                height={800}
              />
              {/* <div className='flex flex-col gap-0 justify-end items-center mt-2'>
                <h4 className='font-bold lg:text-xl text-base w-full text-center text-bg-100'>
                  {mapa.title}
                </h4>
                <h5 className='font-normal lg:text-base text-sm w-full text-center text-bg-100'>
                  {mapa.subTitle}
                </h5>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
