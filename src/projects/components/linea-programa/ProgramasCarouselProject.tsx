import { Imagen, Programa } from '@prisma/client'

import { LineaProgramaCarouselContainer,  } from '../..'
import { getProyectosByProgramaId } from '@/actions'
interface Props {
  programa: Programa& { imagen?: Imagen | null }
}

export const ProgramasCarouselProject = async ({ programa }: Props) => {
  const { id, name,  } = programa
  const proyectos = (await getProyectosByProgramaId(id)) || []

  return (
    <>
      <LineaProgramaCarouselContainer
        urlIcon={programa.imagen?.url}
        name={name}
        baseUrl={`/programa/${id}`}
        proyectos={proyectos}
        preTitle={programa.preTitle}
        baseColor={programa.baseColor}
      />
    </>
  )
}
