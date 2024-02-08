// 'use client'
// import { useState } from 'react'

import { IoCloseSharp, IoFlowerOutline } from 'react-icons/io5'

import styles from '../../Defaults.module.css'
import { LineaModal, ProjectsCarousel, getProyectosByLineaId } from '..'
import { IconLinea } from './LineasIcons'
import Link from 'next/link'

export interface LineaCarouselProps {
  id: number
  slug: string
  name: string
}

export const LineaCarouselProjects = async ({
  id,
  slug,
  name,
}: LineaCarouselProps) => {
  // const [isOpen, setIsOpen] = useState(false)
  const onToggle = () => {
    // setIsOpen(!isOpen)
  }
  
const proyectos = await getProyectosByLineaId(id) || []
  return (
    <>
      <div
        className={`mt-4 w-full flex flex-col justify-start  items-start  bg-white py-8 ${styles.xBannerPaddings}`}
      >
        {/* Headers start */}
        <div className='w-full bg-bg-200 p-2'>
          <span className=' text-primary-200'>
            <IconLinea id={id} />
          </span>

          <h2 className='text-xl font-semibold text-text-100 text-left mt-1 text-wrap'>
            {name}
          </h2>
          <Link className={styles.buttonLink} href={`/linea/${id}`}
          //  onClick={onToggle}
           >
            Conocer más
          </Link>
        </div>
        {/* Headers End */}

        {/* Acá viene carousel de proyectos */}
        <ProjectsCarousel proyectos={proyectos} />
      </div>

    </>
  )
}
