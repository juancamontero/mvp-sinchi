import { Imagen, Linea, Programa, Sello } from '@prisma/client'

export type SelloArray = {
  id: string
  order: number
  imageUrl?: string
  title: string
}

interface Props {
  sellos: (Sello & { imagen?: Imagen | null })[]
  linea: (Linea & { imagen?: Imagen | null }) | null
  programa: (Programa & { imagen?: Imagen | null }) | null
}

export const createSellosArray = ({
  linea,
  programa,
  sellos,
}: Props): SelloArray[] => {
  // *TODO CREATE EXTERNAL FUNCTION
  // * CREACION DE LOS SELLOS
  let sellosGrid: SelloArray[] = []

  // * adiciono programa y linea los sellos
  if (programa && linea) {
    sellosGrid.push({
      id: `prog-${programa.id}`,
      order: 0,
      imageUrl: linea.imagen?.url,
      title: `${linea.preTitle} - ${linea.name}`,
    })
    sellosGrid.push({
      id: `line-${linea.id}`,
      order: 1,
      imageUrl: programa.imagen?.url,
      title: `${programa.preTitle} - ${programa.name}`,
    })
  }

  sellos.forEach((sello) => {
    sellosGrid.push({
      id: `sello-${sello.id}`,
      order: sello.order + 1,
      imageUrl: sello.imagen?.url,
      title: sello.name,
    })
  })
  // Sort sellosGrid array based on the order property in ascending order
  sellosGrid.sort((a, b) => a.order - b.order)
  return sellosGrid
}
