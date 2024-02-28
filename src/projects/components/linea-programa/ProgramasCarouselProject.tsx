import { Programa } from '@prisma/client'

import { LineaProgramaCarouselContainer,  } from '../..'
import { getProyectosByProgramaId } from '@/actions'
interface Props {
  programa: Programa
}

export const ProgramasCarouselProject = async ({ programa }: Props) => {
  const { id, name, urlIcon } = programa
  const proyectos = (await getProyectosByProgramaId(id)) || []

  return (
    <>
      <LineaProgramaCarouselContainer
        urlIcon={urlIcon}
        name={name}
        baseUrl={`/programa/${id}`}
        proyectos={proyectos}
      />
    </>
  )
}
