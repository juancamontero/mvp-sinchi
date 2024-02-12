import { Programa } from '@prisma/client'
import { ProgramasCarouselProject } from '..'

interface Props {
  programas: Programa[]
}

export const ProgramasListProjectsSection = ({ programas = [] }: Props) => {
  if (programas.length === 0) return <h1>No hay proyectos en este programa</h1>
  return (
    <div className='w-full flex flex-col gap-2 justify-start items-start mt-6'>
      {programas.map((prog) => (
        //   <LineaCarouselProjects key={linea.id} linea={linea} />

        <ProgramasCarouselProject key={prog.id} programa={prog} />
      ))}
    </div>
  )
}
