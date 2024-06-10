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

  const programasTerm = linea.Programa.map((term) => {
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
        urlIcon={linea.imagen?.url}
        name={linea.name}
        baseUrl={'programa'}
        terms={programasTerm}
        subTitle={`Líneas de investigación responsables:`}
        baseColor={linea.baseColor ?? undefined}
      >
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
      </LineaProgramaBanner>
      {/* banner end */}
      <section className='h-full flex flex-col lg:justify-start justify-center items-center bg-bg-300 w-full  mt-0 '>
        <Suspense fallback={<LoaderDefault />}>
          <ProjectsCarousel proyectos={proyectos} />
        </Suspense>
      </section>
    </main>
  )
}
