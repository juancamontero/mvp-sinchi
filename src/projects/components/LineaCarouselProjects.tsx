// 'use client'
// import { useState } from 'react'

import styles from '../../Defaults.module.css'
import { LineaProgramaCarouselContainer, getProyectosByLineaId } from '..'

import { Linea } from '@prisma/client'

export interface Props {
  linea: Linea
}

export const LineaCarouselProjects = async ({ linea }: Props) => {
  const { id, name, urlIcon } = linea

  const proyectos = (await getProyectosByLineaId(id)) || []

  return (
    <>
      <LineaProgramaCarouselContainer
        urlIcon={urlIcon}
        name={name}
        baseUrl={`/linea/${id}`}
        proyectos={proyectos}
      />
    </>
  )
}
