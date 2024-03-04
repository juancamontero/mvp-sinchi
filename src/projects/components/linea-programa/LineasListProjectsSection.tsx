import { Imagen, Linea } from '@prisma/client'
import { LineaCarouselProjects } from './LineaCarouselProjects'

interface Props {
  lineas: (Linea & { imagen?: Imagen | null })[]
}

export const LineasListProjectsSection = ({ lineas }: Props) => {
  if (lineas.length === 0) return <h1>No hay proyectos en esa línea</h1>
  return (
    <div className={`lineaProgramProjectsSection`}>
      {lineas.map((linea) => (
        <LineaCarouselProjects key={linea.id} linea={linea} />
      ))}
    </div>
  )
}
