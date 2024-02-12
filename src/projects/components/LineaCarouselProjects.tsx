// 'use client'
// import { useState } from 'react'

import styles from '../../Defaults.module.css'
import { ProjectsCarousel, getProyectosByLineaId } from '..'
import { IconLinea } from './LineasIcons'
import Link from 'next/link'
import { Linea } from '@prisma/client'

export interface Props {
  linea: Linea
}

export const LineaCarouselProjects = async ({ linea }: Props) => {
  const { id, name, urlIcon } = linea

  const proyectos = (await getProyectosByLineaId(id)) || []

  return (
    <>
      <div
        className={`mt-4 w-full flex flex-col justify-start  items-start bg-bg-200 py-8 ${styles.xBannerPaddings}`}
      >
        {/* Headers start */}
        <div className='w-full  p-2'>
          <IconLinea urlIcon={urlIcon} name={name} size={52} />

          <h2 className='text-xl font-semibold text-text-100 text-left mt-1 text-wrap'>
            {name}
          </h2>
          <Link
            className={styles.buttonLink}
            href={`/linea/${id}`}
            //  onClick={onToggle}
          >
            Conocer más
          </Link>
        </div>
        {/* Headers End */}

        {/* Acá viene carousel de proyectos */}
      </div>
      <ProjectsCarousel proyectos={proyectos} />
    </>
  )
}
