// 'use client'
// import { useState } from 'react'


import { getProyectosByLineaId } from '@/actions'
import { LineaProgramaCarouselContainer } from '../..'

import { Linea } from '@prisma/client'

export interface Props {
  linea: Linea
}

export const LineaCarouselProjects = async ({ linea }: Props) => {
  const { id, name, urlIcon , preTitle, baseColor} = linea

  const proyectos = (await getProyectosByLineaId(id)) || []

  return (
    <>
      <LineaProgramaCarouselContainer
        urlIcon={urlIcon}
        name={name}
        baseUrl={`/linea/${id}`}
        proyectos={proyectos}
        preTitle={preTitle}
        baseColor={baseColor}
        
      />
    </>
  )
}
