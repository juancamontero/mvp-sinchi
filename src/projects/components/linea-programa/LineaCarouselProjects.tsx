// 'use client'
// import { useState } from 'react'


import { getProyectosByLineaId } from '@/actions'
import { LineaProgramaCarouselContainer } from '../..'

import { Imagen, Linea } from '@prisma/client'

export interface Props {
  linea: Linea & { imagen?: Imagen | null }
}

export const LineaCarouselProjects = async ({ linea }: Props) => {
  const { id, name, imagen , preTitle, baseColor} = linea


  const proyectos = (await getProyectosByLineaId(id)) || []

  return (
    <>
      <LineaProgramaCarouselContainer
        urlIcon={imagen?.url ?? '/images/placeholder-img.jpeg'}
        name={name}
        baseUrl={`/linea/${id}`}
        proyectos={proyectos}
        preTitle={preTitle}
        baseColor={baseColor}
        
      />
    </>
  )
}
