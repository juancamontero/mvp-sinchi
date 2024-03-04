import {
  AccordionFeature,
  IconLinea,
  ProjectsCarousel,
  TermsGrid,
} from '@/projects'

import { Suspense } from 'react'
import { LoaderDefault } from '@/components'
import { Metadata } from 'next'
import { getLineaById, getProyectosByLineaId } from '@/actions'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = params
    const linea = await getLineaById(Number(id))

    return {
      title: `${linea?.name ?? ''}|Proyectos`,
      description: `Proyectos de ${linea?.name ?? ''}`,
    }
  } catch (error) {
    return {
      title: `Proyectos`,
      description: `Error : ${error}`,
    }
  }
}

export default async function LineaPage({ params }: Props) {
  const { id } = params
  const [linea, proyectos] = await Promise.all([
    getLineaById(Number(id)),
    getProyectosByLineaId(Number(id)),
  ])

  if (!linea) {
    return (
      <main className={`pageDefault`}>
        <h1 className='text-3xl font-bold text-text-100 text-left mt-1 text-wrap'>
          Linea no encontrada
        </h1>
      </main>
    )
  }

  return (
    <main className={`pageDefault`}>
      {/* banner start */}
      <div
        className={`xBannerPaddings sm:sticky sm:top-0 h-fit flex flex-col gap-2 flex-wrap items-start bg-bg-200 w-full py-6  z-10 sm:mb-4`}
      >
        <IconLinea urlIcon={linea.imagen?.url} name={linea.name} size={62} />

        <h2 className='text-2xl font-semibold text-primary-300 text-left mx-1 text-wrap'>
          {linea?.name}
        </h2>
        <TermsGrid
          items={linea.Programa.map(({ id, name }) => ({ id, name }))}
          urlBase='/programa'
        />

        <AccordionFeature
          title={'Descripción'}
          content={<p>{linea?.description}</p> ?? ''}
        />
        <AccordionFeature
          title={'Propósito'}
          content={<p>{linea?.purpose}</p> ?? ''}
        />
        <AccordionFeature
          title={'Hitos'}
          content={
            (
              <div className='flex flex-col gap-3 justify-start items-stretch w-full'>
                <ul>
                  {linea.millestone1 && linea.millestone1?.length > 3 && (
                    <li className='mb-2 list-disc m-6'>
                      <p>{linea.millestone1}</p>
                    </li>
                  )}
                  {linea.millestone2 && linea.millestone2?.length > 3 && (
                    <li className='mb-2 list-disc m-6'>
                      <p>{linea.millestone2}</p>
                    </li>
                  )}
                  {linea.millestone3 && linea.millestone3?.length > 3 && (
                    <li className='mb-2 list-disc m-6'>
                      <p>{linea.millestone3}</p>
                    </li>
                  )}
                </ul>
              </div>
            ) ?? ''
          }
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
