import { ProjectsCarousel } from '@/projects'

import { CustomHeroBanner, LoaderDefault } from '@/components'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { getInvestigadorById, getProjectsByInvestigadorId } from '@/actions'

interface Props {
  params: {
    id: number
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = params
    const investigador = await getInvestigadorById(Number(id))

    return {
      title: `${investigador?.name ?? ''}|Proyectos`,
      description: `Proyectos de ${investigador?.name ?? ''}`,
    }
  } catch (error) {
    return {
      title: `Proyectos`,
      description: `Error : ${error}`,
    }
  }
}

export default async function InvestigadorPage({ params }: Props) {
  const { id } = params
  const [investigador, proyectos] = await Promise.all([
    getInvestigadorById(Number(id)),
    getProjectsByInvestigadorId(Number(id)),
  ])

  return (
    <main className={`pageDefault`}>
      <CustomHeroBanner
        preTitle={`${proyectos.length}` ?? ''}
        title={investigador?.name ?? 'INVESTIGADOR'}
        postTitle='Investigador responsable'
      />

      <Suspense fallback={<LoaderDefault />}>
        <ProjectsCarousel proyectos={proyectos} />
      </Suspense>
    </main>
  )
}
