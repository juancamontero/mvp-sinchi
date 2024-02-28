import {  Proyecto, Imagen } from '@prisma/client'
import { ProjectCard } from './ProjectCard'

interface Props {
  proyectos: ({
    imagen: Imagen
  } & Proyecto)[]
}

export const ProjectsGrid = ({ proyectos }: Props) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:p-16 lg:gap-16 z-0 '>
      {proyectos.map((proyecto) => (
        <ProjectCard key={proyecto.id} proyecto={proyecto} />
      ))}
    </div>
  )
}
