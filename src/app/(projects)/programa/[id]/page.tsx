import {
  AccordionFeature,
  IconLinea,
  LineaProgramaBanner,
  LineaProgramaRowGrid,
  ProjectsCarousel,
  TermsGrid,
} from '@/projects'

import { Suspense } from 'react'
import { LoaderDefault } from '@/components'
import { Metadata } from 'next'
import { getProgramaById, getProyectosByProgramaId } from '@/actions'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = params
    const programa = await getProgramaById(Number(id))

    return {
      title: `${programa?.name ?? ''}|Proyectos`,
      description: `Proyectos de ${programa?.name ?? ''}`,
    }
  } catch (error) {
    return {
      title: `Proyectos`,
      description: `Error : ${error}`,
    }
  }
}

export default async function ProgramaPage({ params }: Props) {
  const { id } = params

  const [programa, proyectos] = await Promise.all([
    await getProgramaById(Number(id)),
    await getProyectosByProgramaId(Number(id)),
  ])

  if (!programa) {
    return (
      <div>
        <h1>Programa no encontrado</h1>
      </div>
    )
  }

  const lineasTerm = programa.Linea.map((term) => {
    return {
      id: term.id,
      name: term.name,
      imageUrl: term.imagen?.url,
    }
  })

  return (
    <main className={`pageDefault`}>
      {/* banner start */}
      <LineaProgramaBanner
        urlIcon={programa.imagen?.url}
        name={programa.name}
        baseUrl={'linea'}
        terms={lineasTerm}
        subTitle={`Líneas de investigación responsables:`}
        baseColor={programa.baseColor ?? undefined}
      >
        <AccordionFeature
          title={'Descripción'}
          content={<p>{programa?.description}</p> ?? ''}
        />
      </LineaProgramaBanner>

      {/* banner end */}
      <section className='h-full flex flex-col justify-center items-center bg-bg-300 w-full mt-0'>
        <Suspense fallback={<LoaderDefault />}>
          <ProjectsCarousel proyectos={proyectos} />
        </Suspense>
      </section>
    </main>
  )
}
