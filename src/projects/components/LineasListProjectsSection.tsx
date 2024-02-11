import { Linea } from '@prisma/client'
import {
  LineaCarouselProjects,
} from './LineaCarouselProjects'

interface Props {
  lineas: Linea[]
}

export const LineasListProjectsSection = ({ lineas =[] }: Props) => {
  if (lineas.length===0) return <h1>No hay proyectos en esa línea</h1>
  return (
    <div className='w-full flex flex-col gap-2 justify-start items-start mt-6'>
      {lineas.map((linea) => (
        <LineaCarouselProjects key={linea.id} linea={linea} />
      ))}
    </div>
  )
}
