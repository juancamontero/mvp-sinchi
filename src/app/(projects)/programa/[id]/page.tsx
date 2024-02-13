import {
  AccordionFeature,
  IconLinea,
  ProjectsCarousel,
  TermsGrid,
  getProgramaById,
  getProyectosByProgramaId,
} from '@/projects'

import styles from './../../../../Defaults.module.css'
import { Suspense } from 'react'
import { LoaderDefault } from '@/components'
import { Metadata } from 'next'

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
      title: `${programa?.name ??  ''}|Proyectos`,
      description: `Proyectos de ${programa?.name ??  ''}`,
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
  const programa = await getProgramaById(Number(id))
  const proyectos = await getProyectosByProgramaId(Number(id))

  if (!programa) {
    return (
      <div>
        <h1>Programa no encontrado</h1>
      </div>
    )
  }

  return (
    <main className={`${styles.pageDefault}`}>
      {/* banner start */}
      <div
        className={`${styles.xBannerPaddings} sm:sticky sm:top-0 h-fit flex flex-col gap-2 flex-wrap items-start bg-bg-200 w-full py-6  z-10 sm:mb-4`}
      >
        <IconLinea urlIcon={programa.urlIcon} name={programa.name} size={62} />

        <h2 className='text-2xl font-semibold text-primary-300 text-left mx-1 text-wrap'>
          {programa?.name}
        </h2>
        <TermsGrid
          items={programa.Linea.map(({ id, name }) => ({ id, name }))}
          urlBase='/linea'
        />

        <AccordionFeature
          title={'Descripción'}
          content={<p>{programa?.description}</p> ?? ''}
        />

        {/* hitos */}
      </div>
      {/* banner end */}
      <Suspense fallback={<LoaderDefault />}>
        <ProjectsCarousel proyectos={proyectos} />
      </Suspense>
      {/* <ProjectsGrid proyectos={proyectos} /> */}
    </main>
  )
}
